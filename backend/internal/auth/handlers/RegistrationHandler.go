package handlers

import (
	"backend/internal/auth/dto"
	"backend/internal/auth/services"
	
	"github.com/gin-gonic/gin"
)

func NewRegistrationHandler() *RegistrationHandler{
	return &RegistrationHandler{
		service: services.NewRegistrationService(),
	}
}

type RegistrationHandler struct{
	service *services.RegistrationService
}

func (handler *RegistrationHandler) Registration(c *gin.Context){
	var userData dto.CreateUserRequest
	var err error

	err = c.ShouldBindJSON(&userData)

	if(err != nil){
		c.JSON(400,gin.H{
			"message" : err.Error(),
		})
		return
	}

	err = handler.service.Registration(userData)

	if(err != nil){
		c.JSON(500,gin.H{
			"message" : err.Error(),
		})
		return
	}

	c.JSON(201,gin.H{
		"message" : "success to create user",
	})
}