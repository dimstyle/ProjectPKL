package services

import (
	"backend/internal/user/repositories"
)


func NewListuserHandler() *ListuserService{
	return &ListuserService{}
}

type ListuserService struct {
	repo *repositories.UserRepository
}

func (s *ListuserService) getuser(){
	s.repo.GetAllUser()
}