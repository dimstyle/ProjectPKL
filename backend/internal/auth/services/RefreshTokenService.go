package services

import (
	"backend/internal/db"
	"backend/pkg/jwt"
	"context"
	"log"
	"errors"

	"github.com/jackc/pgx/v5"
)

func NewRefreshTokenService(q *db.Queries) *RefreshTokenService{
	return &RefreshTokenService{
		repo: q,
	}
}

type RefreshTokenService struct {
	repo *db.Queries
}

func (service *RefreshTokenService) GetNewToken(ctx context.Context, token string)(jwt.JWTToken, error){
	UserID, err := service.repo.GetUserIDByToken(ctx, token)
	if err != nil{
		// if token not found
		if errors.Is(err, pgx.ErrNoRows){
			return jwt.JWTToken{
				AccessToken: "",
				RefreshToken: "",
				Authorized: false,
			}, nil
		}
		
		log.Println(err.Error())
		return jwt.JWTToken{}, err
	}

	jwttoken, err := GenerateToken(ctx, service.repo, UserID)	
	if err != nil{
		log.Println(err.Error())
		return jwt.JWTToken{}, err
	}

	return jwt.JWTToken{
		AccessToken: jwttoken.AccessToken,
		RefreshToken: jwttoken.RefreshToken,
		Authorized: true,
	},nil
}