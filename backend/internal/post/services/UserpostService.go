package services

import (
	"backend/internal/db"
)

func NewUserpostService(q *db.Queries) *UserpostService {
	return &UserpostService{
		repo: q,
	}
}

type UserpostService struct {
	repo *db.Queries
}
