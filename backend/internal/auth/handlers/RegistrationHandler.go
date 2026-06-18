package handlers

import (
	"backend/internal/auth/dto"
	"backend/internal/auth/services"
	"backend/internal/db"
	"net/http"

	"github.com/gin-gonic/gin"
)

func NewRegistrationHandler(q *db.Queries) *RegistrationHandler{
	return &RegistrationHandler{
		service: services.NewRegistrationService(q),
	}
}

type RegistrationHandler struct{
	service *services.RegistrationService
}

func (handler *RegistrationHandler) Registration(c *gin.Context){
	var userData dto.CreateUserRequest
	var err error

	err = c.ShouldBindJSON(&userData)
	if err != nil{
		c.JSON(http.StatusBadRequest,gin.H{
			"message" : "bad request",
		})
		return
	}

	err = handler.service.Registration(c, userData)

	if err != nil {
		c.JSON(http.StatusInternalServerError,gin.H{
			"message" : "internal server error",
		})
		return
	}

	c.JSON(http.StatusCreated,gin.H{
		"message" : "success to create user",
	})
}