package services

import (
	"backend/internal/db"
	"context"
	"log"
)

func NewGetusertodoService(q *db.Queries) *GetusertodoService {
	return &GetusertodoService{
		repo: q,
	}
}

type GetusertodoService struct {
	repo *db.Queries
}

func (service *GetusertodoService) GetTodo(ctx context.Context, ProjectID int32, UserID int32)([]db.GetUserToDoByProjectIDRow, error){
	ToDoLists, err := service.repo.GetUserToDoByProjectID(ctx,db.GetUserToDoByProjectIDParams{
		ProjectID: ProjectID,
		UserID: UserID,
	})
	if err != nil{
		log.Println(err.Error())
		return nil, err
	}

	return ToDoLists, nil
} 