package services

import (
	"backend/internal/db"
	"backend/pkg/jwt"
	"context"
	"log"
)

type AccessAndRefreshToken struct {
	AccessToken string
	RefreshToken string
}

func GenerateToken(ctx context.Context, q *db.Queries , userID int32)(AccessAndRefreshToken, error){
	AccessToken, err := jwt.GenerateAccessToken(userID,"user")
	if err != nil{
		log.Println(err.Error())
		return AccessAndRefreshToken{}, err
	}

	// generate refresh token
	RefreshToken, err := jwt.GenerateRefreshToken(userID, "user")
	if err != nil{
		log.Println(err.Error())
		return AccessAndRefreshToken{}, err
	}

	_, err =  q.SetRefreshToken(ctx, db.SetRefreshTokenParams{
		Token: RefreshToken,
		UserID: userID,
	})
	if err != nil {
		log.Println(err.Error())
		return AccessAndRefreshToken{}, err
	}


	return AccessAndRefreshToken{
		AccessToken: AccessToken,
		RefreshToken: RefreshToken,
	}, nil
}