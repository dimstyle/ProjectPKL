package handlers

import (
	"github.com/gin-gonic/gin"

	"backend/internal/auth/dto"
	"backend/internal/auth/services"

	"log"
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
	var userLogin dto.LoginUserRequest

	err := c.ShouldBindJSON(&userLogin)
	if(err!=nil){
		log.Println(err.Error())
		c.JSON(500,gin.H{
			"message" : "internal server error",
		})
	}
	
	err = handler.service.Login(userLogin)
	if(err!=nil){
		c.JSON(400, gin.H{
			"message" : err.Error(),
		})
		return
	}

	c.JSON(200,gin.H{
		"message" : "login succesfull",
	})

}