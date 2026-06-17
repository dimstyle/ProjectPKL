package services

import (
	"backend/internal/db"
	"context"
	"log"
)


func NewListuserHandler(q *db.Queries) *ListuserService{
	return &ListuserService{
		repo: q,
	}
}

type ListuserService struct {
	repo *db.Queries
}

func (service *ListuserService) GetUser(ctx context.Context) ([]db.GetAllUserRow, error){
	users, err := service.repo.GetAllUser(ctx)
	if err != nil{
		log.Println(err.Error())
		return []db.GetAllUserRow{}, err
	}
	
	return users, nil
}