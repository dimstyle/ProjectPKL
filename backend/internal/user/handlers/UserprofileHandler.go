package handlers

import (
	"backend/internal/db"
	"backend/internal/user/services"
	"backend/pkg/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
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

	user, err := handler.service.GetUserProfile(ctx, JwtClaims.UserID)
	if err != nil{
		c.JSON(http.StatusNotFound, gin.H{
			"message" : "user not found",
		})
	}

	c.JSON(http.StatusOK,gin.H{
		"message" : "user found",
		"user" : user,
	})
}