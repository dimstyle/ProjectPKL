package services

import (
	"backend/internal/db"
	"context"
	"log"
)

func NewCreatetodoService(q *db.Queries) *CreatetodoService {
	return &CreatetodoService{
		repo: q,
	}
}

type CreatetodoService struct {
	repo *db.Queries
}

func (service *CreatetodoService) CreateTodo(ctx context.Context, CreateParam db.CreateTodoParams) (db.TodoList, error) {
	TodoList, err := service.repo.CreateTodo(ctx, CreateParam)
	if err != nil {
		log.Println(err.Error())
		return db.TodoList{}, err	
	}

	return TodoList, nil
}