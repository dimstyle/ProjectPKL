package handlers

import (
	"net/http"
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
		c.JSON(http.StatusBadRequest,gin.H{
			"message" : "bad request",
		})
		return
	}
	
	token, err := handler.service.Login(c, userLogin)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message" : "internal server error",
		})
		return
	}

	if !token.Authorized {
		c.JSON(http.StatusUnauthorized,gin.H{
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
	c.JSON(http.StatusOK,gin.H{
		"message" : "login succesfull",
	})

}