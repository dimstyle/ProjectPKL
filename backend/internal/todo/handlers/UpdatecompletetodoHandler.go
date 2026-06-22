package handlers

import (
	"backend/internal/db"
	"backend/internal/todo/services"
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

	Updated, err := handler.service.UpdateComplete(ctx)
	if err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{
			"message" : "internal server error",
		})
		return 
	}

	c.JSON(http.StatusOK, gin.H{
		"message" : "success to update",
		"id" : Updated.ID,
		"completed" : Updated.Completed,
	})
}