package auth

// import (
// 	"github.com/gin-gonic/gin"
// )

func NewLoginService() *LoginService{
	return &LoginService{}
}

type LoginService struct{}

func (s *LoginService) login(){

}


func NewRegistrationService() *RegistrationService{
	return &RegistrationService{}
}

type RegistrationService struct{}

func (s *RegistrationService) Registration(){

}

