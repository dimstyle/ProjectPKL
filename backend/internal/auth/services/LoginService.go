package services

import (
	"context"
	"golang.org/x/crypto/bcrypt"

	"backend/internal/auth/dto"
	"backend/internal/db"

	"backend/pkg/jwt"
)

func NewLoginService(q *db.Queries) *LoginService{
	return &LoginService{
		repo: q,
	}
}

type LoginService struct{
	repo *db.Queries
}

func (service *LoginService) Login(ctx context.Context, userLogin dto.LoginUserRequest) (jwt.JWTToken, error) {
	email := userLogin.Email

	user, err := service.repo.GetUserPasswordWithEmail(ctx, email)

	if err != nil{
		return jwt.JWTToken{}, err
	}

	hashedPassword := user.Password
	requestPassword := userLogin.Password

	if !checkPassword(hashedPassword, requestPassword){
		return jwt.JWTToken{
			AccessToken: "",
			RefreshToken: "",
			Authorized: false,
		}, nil
	}

	jwttoken, err := GenerateToken(ctx, service.repo, user.ID)
	if err != nil{
		return jwt.JWTToken{}, err
	}

	return jwt.JWTToken{
		AccessToken: jwttoken.AccessToken,
		RefreshToken: jwttoken.RefreshToken,
		Authorized: true,
	}, nil
}


func checkPassword(hashedPassword string, plainPassword string) bool{
	err :=  bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
	return err == nil
}