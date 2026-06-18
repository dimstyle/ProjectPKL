package handlers

import (
	"backend/internal/db"
	"backend/internal/user/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func NewListuserHandler(q *db.Queries) *ListuserHandler{
	return &ListuserHandler{
		service: services.NewListuserHandler(q),
	}
}

type ListuserHandler struct {
	service *services.ListuserService
}

func (handler *ListuserHandler) Listuser(c *gin.Context){
	ctx := c.Request.Context()

	users, err := handler.service.GetUser(ctx)


	if(err != nil){
		c.JSON(http.StatusNotFound,gin.H{
			"message" : "user not found",
			"users"	: nil,
		})
		return
	}


	c.JSON(http.StatusOK,gin.H{
		"message" : "users found",
		"users" : users,
	})
}