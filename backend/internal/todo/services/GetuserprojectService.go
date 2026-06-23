package services

import (
	"backend/internal/db"
	"context"
	"log"
)

func NewGetuserprojectService(q *db.Queries) *GetuserprojectService {
	return &GetuserprojectService{
		repo: q,
	}
}

type GetuserprojectService struct {
	repo *db.Queries
}

func (service *GetuserprojectService) GetProject(ctx context.Context, UserID int32)([]db.GetUserProjectByUserIDRow, error){
	projects, err := service.repo.GetUserProjectByUserID(ctx, UserID)
	if err != nil{
		log.Println(err.Error())
		return nil, err
	}

	return projects, nil
}
