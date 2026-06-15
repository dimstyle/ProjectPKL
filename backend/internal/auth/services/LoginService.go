package services

import (
	"context"

	"golang.org/x/crypto/bcrypt"

	"backend/internal/auth/dto"
	"backend/internal/db"
)

func NewLoginService(q *db.Queries) *LoginService{
	return &LoginService{
		repo: q,
	}
}

type LoginService struct{
	repo *db.Queries
}

func (service *LoginService) Login(ctx context.Context, userLogin dto.LoginUserRequest) error {
	email := userLogin.Email

	user, err := service.repo.GetUserWithEmail(ctx, email)

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
