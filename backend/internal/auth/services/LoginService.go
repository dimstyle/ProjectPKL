package services

import (
	"context"
	"fmt"
	"log"

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

	user, err := service.repo.GetUserWithEmail(ctx, email)

	if err != nil{
		return jwt.JWTToken{}, err
	}

	hashedPassword := user.Password
	requestPassword := userLogin.Password

	if !checkPassword(hashedPassword, requestPassword){
		fmt.Println("salah")
		return jwt.JWTToken{
			AccessToken: "",
			RefreshToken: "",
			Authorized: false,
		}, nil
	}


	// generate accesstoken
	AccessToken, err := jwt.GenerateAccessToken(user.ID,"user")
	if err != nil{
		log.Println(err.Error())
		return jwt.JWTToken{}, err
	}

	// generate refresh token
	RefreshToken, err := jwt.GenerateRefreshToken(user.ID, "user")
	if err != nil{
		log.Println(err.Error())
		return jwt.JWTToken{}, err
	}

	_, err = service.repo.SetRefreshToken(ctx, db.SetRefreshTokenParams{
		Token: RefreshToken,
		UserID: user.ID,
	})
	if err != nil {
		log.Println(err.Error())
		return jwt.JWTToken{}, err
	}


	return jwt.JWTToken{
		AccessToken: AccessToken,
		RefreshToken: RefreshToken,
		Authorized: true,
	}, nil
	
}


func checkPassword(hashedPassword string, plainPassword string) bool{
	err :=  bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
	return err == nil
}