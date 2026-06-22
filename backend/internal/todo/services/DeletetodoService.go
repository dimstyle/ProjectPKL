package services

import (
	"backend/internal/db"
	"context"
	"log"
)

func NewDeletetodoService(q *db.Queries) *DeletetodoService {
	return &DeletetodoService{
		repo: q,
	}
}

type DeletetodoService struct {
	repo *db.Queries
}


func (service *DeletetodoService) DeleteList(ctx context.Context, ToDoID int32) error {
	_, err := service.repo.DeleteToDoByID(ctx, ToDoID)
	if err != nil{
		log.Println(err.Error())
		return err
	}
	return nil
}