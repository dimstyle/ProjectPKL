package services

import (
	"backend/internal/db"
	"context"
	"log"
)

func NewMyprofileService(q *db.Queries) *MyprofileService{
	return &MyprofileService{
		repo: q,
	}
}

type MyprofileService struct {
	repo *db.Queries
}

func (service *MyprofileService) GetMyProfile(ctx context.Context, ID int32)(db.GetUserDataByIdRow, error){
	user, err := service.repo.GetUserDataById(ctx, ID)
	if err != nil {
		log.Println(err.Error())
		return db.GetUserDataByIdRow{}, err
	}
	
	return user, nil
}