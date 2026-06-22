package services

import (
	"backend/internal/db"
	"context"
	"log"
)

func NewCreatetodolistprojectService(q *db.Queries) *CreatetodolistprojectService {
	return &CreatetodolistprojectService{
		repo: q,
	}
}

type CreatetodolistprojectService struct {
	repo *db.Queries
}

func (service *CreatetodolistprojectService) CreateProject(ctx context.Context, CreateParam db.CreateToDoListProjectParams) error {
	_, err := service.repo.CreateToDoListProject(ctx, CreateParam)
	if err != nil{
		log.Println(err.Error())
		return err
	}
	
	return nil
}