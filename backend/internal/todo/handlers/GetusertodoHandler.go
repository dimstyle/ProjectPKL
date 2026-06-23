package handlers

import (
	"backend/internal/db"
	"backend/internal/todo/services"
	"backend/pkg/jwt"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

func NewGetusertodoHandler(q *db.Queries) *GetusertodoHandler {
	return &GetusertodoHandler{
		service: services.NewGetusertodoService(q),
	}
}

type GetusertodoHandler struct {
	service *services.GetusertodoService
}

func (handler *GetusertodoHandler) GetTodo(c *gin.Context){
	ctx := c.Request.Context()

	ProjectID := c.Query("project_id")


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


	intProjectID, err := strconv.Atoi(ProjectID)
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{
			"message" : "bad request",
		})
		return
	}

	ToDoLists, err := handler.service.GetTodo(ctx, int32(intProjectID), JwtClaims.UserID)
	if err != nil{
		if errors.Is(err, pgx.ErrNoRows){
			c.JSON(http.StatusNotFound, gin.H{
				"message" : "to do lists not found",
			})
			return 
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"message" : "internal server error",
		})
		return 
	}

	c.JSON(http.StatusOK, gin.H{
		"message" : "to do list found",
		"todo_lists" : ToDoLists,
	})
}