package handlers

import (
	"backend/internal/db"
	"backend/internal/post/services"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

func NewUserpostHandler(q *db.Queries) *UserpostHandler {
	return &UserpostHandler{
		service: services.NewUserpostService(q),
	}
}

type UserpostHandler struct {
	service *services.UserpostService
}

func (handler *UserpostHandler) GetPost(c *gin.Context){
	ctx := c.Request.Context()
	start := c.Query("start_date")
	end := c.Query("end_date")
	
	UserID := c.Param("id")

	intID, err := strconv.Atoi(UserID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message" : "bad request",
			"posts" : nil,
		})
		return 
	}

	posts, err := handler.service.GetPost(ctx, int32(intID), start, end) 
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows){
			c.JSON(http.StatusNotFound,gin.H{
				"message" : "posts not found",
				"posts" : posts,
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