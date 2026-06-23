package handlers

import (
	"backend/internal/db"
	"backend/internal/todo/dto"
	"backend/internal/todo/services"
	"backend/pkg/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func NewDeletetodoHandler(q *db.Queries) *DeletetodoHandler {
	return &DeletetodoHandler{
		service: services.NewDeletetodoService(q),
	}
}

type DeletetodoHandler struct {
	service *services.DeletetodoService
}

func (handler *DeletetodoHandler) DeleteList(c *gin.Context){
	ctx := c.Request.Context()
	var DeleteRequest dto.DeleteToDoListRequest

	tokenobj, exists := c.Get("jwt_claims")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{
		"message" : "internal server error",
		})
	}

	JwtClaims, ok := tokenobj.(*jwt.Claims)
	if !ok{
		c.JSON(http.StatusInternalServerError, gin.H{
			"message" : "internal server error",
		})
	}

	err := c.ShouldBindJSON(&DeleteRequest)
	if err != nil{
		c.JSON(http.StatusBadRequest,gin.H{
			"message" : "bad request",
		})
		return
	}

	err = handler.service.DeleteList(ctx, db.DeleteToDoByIDParams{
		UserID: JwtClaims.UserID,
		ID: DeleteRequest.ListID,
	})
	if err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{
			"message" : "internal server error",
		})
		return
	}

	c.JSON(http.StatusOK,gin.H{
		"message" : "List has deleted",
	})
}
