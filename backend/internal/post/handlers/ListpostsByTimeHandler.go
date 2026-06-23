package handlers

import (
	"backend/internal/db"
	"backend/internal/post/services"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
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

	rangeTime, exists := c.GetQuery("range") 

	if !exists{
		c.JSON(http.StatusBadRequest, gin.H{
			"message" : "bad request",
			"posts" : nil,
		})
		return
	}

	posts, err := handler.service.GetPosts(ctx, rangeTime)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows){
			c.JSON(http.StatusNotFound,gin.H{
				"message" : "posts not found",
				"posts" : nil,
			})
			return
		}
		c.JSON(http.StatusInternalServerError,gin.H{
			"message" : "internal server error",
			"posts" : nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message" : "posts found",
		"posts" : posts,
	})

	
}