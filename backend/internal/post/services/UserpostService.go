package services

import (
	"backend/internal/db"
	"context"
	"log"
	"time"
)

func NewUserpostService(q *db.Queries) *UserpostService {
	return &UserpostService{
		repo: q,
	}
}

type UserpostService struct {
	repo *db.Queries
}

func (service *UserpostService) GetPost(ctx context.Context, UserID int32, StartDate string, EndDate string)([]db.GetPostByUserIDRow, error) {
	StartTime, err := time.Parse("2006-01-02", StartDate)
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}

	EndTime, err := time.Parse("2006-01-02", EndDate)
	if err != nil {
		log.Println(err.Error())	
		return nil, err
	}

	Posts, err := service.repo.GetPostByUserID(ctx, db.GetPostByUserIDParams{
		UserID: UserID,
		CreatedAt: StartTime,
		CreatedAt_2: EndTime,
	})
	if err != nil{
		log.Println(err.Error())
		return nil ,err 
	}

	return Posts, nil
}  	