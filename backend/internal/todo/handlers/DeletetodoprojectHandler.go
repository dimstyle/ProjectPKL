package handlers

import (
	"backend/internal/db"
	"backend/internal/todo/dto"
	"backend/internal/todo/services"
	"backend/pkg/jwt"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

func NewDeletetodoprojectHandler(q *db.Queries) *DeletetodoprojectHandler {
	return &DeletetodoprojectHandler{
		service: services.NewDeletetodoprojectService(q),
	}
}

type DeletetodoprojectHandler struct {
	service *services.DeletetodoprojectService
}

func (handler *DeletetodoprojectHandler) DeleteProject(c *gin.Context){
	ctx := c.Request.Context()
	var DeleteRequest dto.DeleteToDoProjectRequest

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

	err := c.ShouldBindJSON(&DeleteRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message" : "bad request",
		})
		return 
	}

	err = handler.service.DeleteProject(ctx, db.DeleteProjectByIDParams{
		ID: DeleteRequest.ID,
		UserID: JwtClaims.UserID,
	})
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows){
			c.JSON(http.StatusNotFound, gin.H{
				"message" : "project not found",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{
			"message" : "internal server error",
		})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"message" : "project deleted successfully",
	})
}