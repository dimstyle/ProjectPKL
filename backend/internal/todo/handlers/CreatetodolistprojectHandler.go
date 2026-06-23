package handlers

import (
	"backend/internal/db"
	"backend/internal/todo/dto"
	"backend/internal/todo/services"
	"backend/pkg/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func NewCreatetodolistprojectHandler(q *db.Queries) *CreatetodolistprojectHandler {
	return &CreatetodolistprojectHandler{
		service: services.NewCreatetodolistprojectService(q),
	}
}

type CreatetodolistprojectHandler struct {
	service *services.CreatetodolistprojectService
}


func (handler *CreatetodolistprojectHandler) CreateProject(c *gin.Context){
	ctx := c.Request.Context()
	var CreateRequest dto.CreateToDoListProjectRequest

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

	err := c.ShouldBindJSON(&CreateRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message" : "bad request",
		})
		return
	}
	
	err = handler.service.CreateProject(ctx, db.CreateToDoListProjectParams{
		Title: CreateRequest.Title,
		UserID: JwtClaims.UserID,
		Description: CreateRequest.Description,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError,gin.H{
			"message" : "internal server error",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message" : "success to create project",
	})
}