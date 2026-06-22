package services

import (
	"backend/internal/db"
	"context"
	"log"
)

func NewUpdatecompletetodoService(q *db.Queries) *UpdatecompletetodoService {
	return &UpdatecompletetodoService{
		repo: q,
	}
}

type UpdatecompletetodoService struct {
	repo *db.Queries
}

func (service *UpdatecompletetodoService) UpdateComplete(ctx context.Context, UpdateRequest db.UpdateCompleteToDoParams) (db.TodoList, error) {
	Updated, err := service.repo.UpdateCompleteToDo(ctx, UpdateRequest)
	if err != nil {
		log.Println(err.Error())
		return db.TodoList{}, err
	}
	
	return Updated, nil
}