package handlers

import (
	"os"

	"github.com/gin-gonic/gin"

	"backend/internal/auth/dto"
	"backend/internal/auth/services"
	"backend/internal/db"
)

func NewLoginHandler(q *db.Queries) *LoginHandler{
	return &LoginHandler{
		service: services.NewLoginService(q),
	}
}

type LoginHandler struct {
	service *services.LoginService
}

func (handler *LoginHandler) Login(c *gin.Context){
	var userLogin dto.LoginUserRequest

	err := c.ShouldBindJSON(&userLogin)
	if err!=nil {
		c.JSON(400,gin.H{
			"message" : "bad request",
		})
	}
	
	token, err := handler.service.Login(c, userLogin)
	if err != nil {
		c.JSON(500, gin.H{
			"message" : "internal server error",
		})
		return
	}

	if !token.Authorized {
		c.JSON(401,gin.H{
			"message": "login failed",
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
		"message" : "login succesfull",
	})

}