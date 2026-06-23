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


func (service *DeletetodoService) DeleteList(ctx context.Context, DeleteRequest db.DeleteToDoByIDParams) error {
	_, err := service.repo.DeleteToDoByID(ctx, DeleteRequest)
	if err != nil{
		log.Println(err.Error())
		return err
	}
	return nil
}