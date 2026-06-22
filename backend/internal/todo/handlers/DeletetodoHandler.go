package handlers

import (
	"backend/internal/db"
	"backend/internal/todo/dto"
	"backend/internal/todo/services"
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

	err := c.ShouldBindJSON(&DeleteRequest)
	if err != nil{
		c.JSON(http.StatusBadRequest,gin.H{
			"message" : "bad request",
		})
		return
	}

	err = handler.service.DeleteList(ctx, DeleteRequest.ListID)
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
