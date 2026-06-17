package handlers

import (
	"backend/internal/db"
	"backend/internal/user/dto"
	"backend/internal/user/services"

	"github.com/gin-gonic/gin"
)

func NewListpostsHandler(q *db.Queries) *ListpostsHandler{
	return &ListpostsHandler{
		service: services.NewListpostsService(q),
	}
}

type ListpostsHandler struct {
	service *services.ListpostsService
}

func (handler *ListpostsHandler) GetPostsByTimeRange(c *gin.Context){
	ctx  := c.Request.Context()
	var timeRequest dto.GetPostsByTimeRequest

	err := c.ShouldBindJSON(&timeRequest)
	if err != nil{
		c.JSON(400, gin.H{
			"message" : "bad request",
			"posts" : nil,
		})
		return
	}

	posts, err := handler.service.GetPosts(ctx, timeRequest.Range)
	if err != nil {
		c.JSON(404,gin.H{
			"message" : "posts not found",
			"posts" : nil,
		})
		return
	}

	c.JSON(200, gin.H{
		"message" : "posts found",
		"posts" : posts,
	})

	
}