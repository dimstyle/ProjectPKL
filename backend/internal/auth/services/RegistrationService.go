package services

import (
	"backend/internal/auth/dto"
	"backend/internal/auth/models"
	"backend/internal/auth/repositories"

	"golang.org/x/crypto/bcrypt"
)

func NewRegistrationService() *RegistrationService{
	return &RegistrationService{}
}

type RegistrationService struct{
	repo *repositories.AuthRepository
}

func (s *RegistrationService) Registration(user dto.CreateUserRequest) error{

	hashed , err := bcrypt.GenerateFromPassword([]byte(user.Password),14)
	if(err != nil){
		return err
	}

	user.Password = string(hashed)

	userModel := models.User{
		Username: user.Username,
		Email: user.Email,
		Password: user.Password ,
	}
	
	err = s.repo.CreateUserData(userModel)

	if(err != nil){
		return err
	}

	return nil
}

