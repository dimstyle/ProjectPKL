package handlers

import (
	"backend/internal/db"
	"backend/internal/todo/dto"
	"backend/internal/todo/services"
	"backend/pkg/jwt"
	"fmt"
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
		fmt.Println("haha")
		c.JSON(http.StatusInternalServerError, gin.H{
		"message" : "internal server error",
		})
		return
	}

	JwtClaims, ok := tokenobj.(*jwt.Claims)
	if !ok{
		fmt.Println(tokenobj)
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

	Todolist, err := handler.service.CreateTodo(ctx,db.CreateTodoParams{
		UserID: JwtClaims.UserID,
		ProjectID: CreateRequest.ProjectID,
		Title: CreateRequest.Title,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message"  : "internal server error",
		})
		return
	}

	c.JSON(http.StatusCreated,gin.H{
		"message" : "todo successfully created",
		"todo_lists" : dto.CreateToDoResponse{
			ID: Todolist.ID,
			Title: Todolist.Title,
			Completed: Todolist.Completed,
		},
	})

}