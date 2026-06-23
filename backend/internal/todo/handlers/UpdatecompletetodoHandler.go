package handlers

import (
	"backend/internal/db"
	"backend/internal/todo/dto"
	"backend/internal/todo/services"
	"backend/pkg/jwt"
	"net/http"
	"github.com/gin-gonic/gin"
)

func NewUpdatecompletetodoHandler(q *db.Queries) *UpdatecompletetodoHandler {
	return &UpdatecompletetodoHandler{
		service: services.NewUpdatecompletetodoService(q),
	}
}

type UpdatecompletetodoHandler struct {
	service *services.UpdatecompletetodoService
}

func(handler *UpdatecompletetodoHandler) UpdateComplete(c *gin.Context){
	ctx := c.Request.Context()
	var UpdateRequest dto.UpdateCompleteToDoRequest

	tokenobj, exists := c.Get("jwt_claims")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{
		"message" : "internal server error",
		})
		return
	}

	JwtClaims, ok := tokenobj.(*jwt.Claims)
	if !ok{
		c.JSON(http.StatusInternalServerError, gin.H{
			"message" : "internal server error",
		})
		return
	}
	err := c.ShouldBindJSON(&UpdateRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message" : "bad request",
		})
		return
	}

	Updated, err := handler.service.UpdateComplete(ctx, db.UpdateCompleteToDoParams{
		ID: UpdateRequest.ID,
		UserID: JwtClaims.UserID,
		Completed: *UpdateRequest.Completed,
	})
	if err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{
			"message" : "internal server error",
		})
		return 
	}

	c.JSON(http.StatusOK, gin.H{
		"message" : "success to update",
		"todo_lists" : dto.UpdateCompleteToDoResponse{
			ID: Updated.ID,
			Completed: &Updated.Completed,
		},
	})
}