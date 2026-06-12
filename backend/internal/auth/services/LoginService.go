package services

import (
	"golang.org/x/crypto/bcrypt"

	"backend/internal/auth/dto"
	"backend/internal/auth/repositories"

)

func NewLoginService() *LoginService{
	return &LoginService{
		repo: repositories.AuthRepository{},
	}
}

type LoginService struct{
	repo repositories.AuthRepository
}

func (service *LoginService) Login(userLogin dto.LoginUserRequest) error {
	email := userLogin.Email

	user, err := service.repo.GetUserWithEmail(email)

	if (err != nil){
		return err
	}

	hashedPassword := user.Password
	requestPassword := userLogin.Password

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(requestPassword))

	if(err!=nil){
		return err
	}

	return nil
	
}
