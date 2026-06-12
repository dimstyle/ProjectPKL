package services

import (
	"backend/internal/user/repositories"
	"backend/internal/user/dto"
)


func NewListuserHandler() *ListuserService{
	return &ListuserService{}
}

type ListuserService struct {
	repo *repositories.UserRepository
}

func (s *ListuserService) GetUser() ([]dto.GetUserList, error){
	return s.repo.GetAllUser()
}