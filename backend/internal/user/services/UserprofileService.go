package services

import (
	"backend/internal/db"
	"context"
	"log"
)

func NewUserprofileService(q *db.Queries) *UserprofileService{
	return &UserprofileService{
		repo: q,
	}
}

type UserprofileService struct {
	repo *db.Queries
}

func (service *UserprofileService) GetProfileWithId(ctx context.Context, id int32)(db.GetUserDataByIdRow, error){
	user, err := service.repo.GetUserDataById(ctx, id)
	if err != nil {
		log.Println(err.Error())
		return db.GetUserDataByIdRow{}, err
	}

	return user, nil
} 