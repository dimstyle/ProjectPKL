package auth

import (
	"github.com/gin-gonic/gin"
)

func NewLoginHandler(s *LoginService) *LoginHandler{
	return &LoginHandler{
		s: s,
	}
}

type LoginHandler struct {
	s *LoginService
}

func (h *LoginHandler) Login(c *gin.Context){

}




func NewRegistrationHandler(s *RegistrationService) *RegistrationHandler{
	return &RegistrationHandler{
		s: s,
	}
}

type RegistrationHandler struct{
	s *RegistrationService
}

func (h *RegistrationHandler) Registration(c *gin.Context){

}