package services

import (
	"backend/internal/db"
	"context"
)

func NewUpdatecompletetodoService(q *db.Queries) *UpdatecompletetodoService {
	return &UpdatecompletetodoService{
		repo: q,
	}
}

type UpdatecompletetodoService struct {
	repo *db.Queries
}

func (service *UpdatecompletetodoService) UpdateComplete(ctx context.Context) (db.UpdateCompleteToDoParams, error) {

	return db.UpdateCompleteToDoParams{}, nil
}