package handlers

import (
	"github.com/gin-gonic/gin"
	"backend/internal/db"
	"backend/internal/user/services"
)

func NewUserprofileHandler(q *db.Queries) *UserprofileHandler{
	return &UserprofileHandler{
		service: services.NewUserprofileService(q),
	}
}

type UserprofileHandler struct{
	service *services.UserprofileService
}

func (handler *UserprofileHandler) GetUserProfile(c *gin.Context){
	ctx := c.Request.Context()

	UserID := c.GetInt32("user_id")

	user, err := handler.service.GetUserProfile(ctx, UserID)
	if err != nil{
		c.JSON(404, gin.H{
			"message" : "user not found",
		})
	}

	c.JSON(200,gin.H{
		"message" : "user found",
		"user" : user,
	})
}