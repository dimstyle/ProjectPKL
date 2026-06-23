package handlers

import (
	"backend/internal/db"
	"backend/internal/todo/dto"
	"backend/internal/todo/services"
	"backend/pkg/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func NewCreatetodoHandler(q *db.Queries) *CreatetodoHandler {
	return &CreatetodoHandler{
		service: services.NewCreatetodoService(q),
	}
}

type CreatetodoHandler struct {
	service *services.CreatetodoService
}

func (handler *CreatetodoHandler) CreateTodo(c *gin.Context){
	ctx := c.Request.Context()
	var CreateRequest dto.CreateToDoRequest


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


	err := c.ShouldBindJSON(&CreateRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message" : "bad request",
			"list_id" : nil,
			"completed" : nil,
		})
	}

	Todolist, err := handler.service.CreateTodo(ctx,db.CreateTodoParams{
		UserID: JwtClaims.UserID,
		ProjectID: CreateRequest.ProjectID,
		Title: CreateRequest.Title,
		Description: CreateRequest.Description,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message"  : "internal server error",
			"list_id" : nil,
			"completed" : nil,
		})
		return
	}

	c.JSON(http.StatusCreated,gin.H{
		"message" : "todo successfully created",
		"list_id" : Todolist.ID,
		"completed" : Todolist.Completed,
	})

}