package handlers

import (
	"github.com/gin-gonic/gin"
	"backend/internal/auth/services"
)

func NewLoginHandler() *LoginHandler{
	return &LoginHandler{
		service: services.NewLoginService(),
	}
}

type LoginHandler struct {
	service *services.LoginService
}

func (handler *LoginHandler) Login(c *gin.Context){
	
}