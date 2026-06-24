package services

import (
	"backend/internal/db"
	"context"
	"log"
)

func NewDeletetodoprojectService(q *db.Queries) *DeletetodoprojectService {
	return &DeletetodoprojectService{
		repo: q,
	}
}

type DeletetodoprojectService struct {
	repo *db.Queries
}

func (service *DeletetodoprojectService) DeleteProject(ctx context.Context, DeleteRequest db.DeleteProjectByIDParams) error {	
	_, err := service.repo.DeleteProjectByID(ctx, DeleteRequest)
	if err != nil {
		log.Println(err.Error())
		return err
	}

	return nil
}