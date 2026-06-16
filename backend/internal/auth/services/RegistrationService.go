package services

import (
	"backend/internal/auth/dto"
	"backend/internal/db"
	"context"
	"log"

	"golang.org/x/crypto/bcrypt"
)

func NewRegistrationService(q *db.Queries) *RegistrationService{
	return &RegistrationService{
		repo: q,
	}
}

type RegistrationService struct{
	repo *db.Queries
}

func (service *RegistrationService) Registration(c context.Context ,user dto.CreateUserRequest) error{

	hashed , err := bcrypt.GenerateFromPassword([]byte(user.Password),14)
	if(err != nil){
		log.Println(err.Error())
		return err
	}

	user.Password = string(hashed)

	userModel := db.CreateUserDataParams{
		Username: user.Username,
		Email: user.Email,
		Password: user.Password ,
	}
	
	userData, err := service.repo.CreateUserData(c, userModel)
	if(err != nil){
		log.Println(err.Error())
		return err
	}


	// Generate Token Field
	_, err = service.repo.CreateRefreshToken(c, db.CreateRefreshTokenParams{
		UserID: userData.ID,
		Token: "",
	})
	if err != nil{
		log.Println(err.Error())
		return err
	}


	return nil
}

