package services

import (
	"backend/internal/db"
	"context"
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
	return service.repo.GetAllUser(ctx)
}