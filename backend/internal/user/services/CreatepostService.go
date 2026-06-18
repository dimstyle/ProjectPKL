package services

import (
	"backend/internal/db"
	"context"
	"log"
)

func NewCreatepostService(q *db.Queries) *CreatepostService{
	return &CreatepostService{
		repo: q,
	}
}

type CreatepostService struct{
	repo *db.Queries
}

func (service *CreatepostService) MakePostForUser(ctx context.Context, postdata db.CreatePostForUserParams) error {

	_, err := service.repo.CreatePostForUser(ctx, postdata)
	if err != nil {
		log.Println(err.Error())
		return err
	}

	return nil
}	