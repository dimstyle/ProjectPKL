package handlers

import (
	"backend/internal/auth/services"
	"backend/internal/db"

	"os"
	"github.com/gin-gonic/gin"
)

func NewRefreshTokenHandler(q *db.Queries) *RefreshTokenHandler{
	return &RefreshTokenHandler{
		service: services.NewRefreshTokenService(q),
	}
}

type RefreshTokenHandler struct {
	service *services.RefreshTokenService
}

func (handler *RefreshTokenHandler) RecreateToken(c *gin.Context){
	ctx := c.Request.Context()

	refreshToken := c.GetString("refresh_token")

	token, err := handler.service.GetNewToken(ctx, refreshToken)
	if err != nil {
		c.JSON(500,gin.H{
			"message" : "internal server error",
		})
		return
	}
	
	if !token.Authorized {
		c.JSON(401,gin.H{
			"message" : "invalid refresh token",
		})
		return
	}

	server_domain := os.Getenv("HOST_ADDR")
	c.SetCookie(
		"refresh_token",
		token.RefreshToken,
		86400,
		"/",server_domain,
		false,
		true,
	)

	c.Header("Authorization", "Bearer "+token.AccessToken)
	c.JSON(200,gin.H{
		"message" : "regenerete token succesfull",
	})

	
}

