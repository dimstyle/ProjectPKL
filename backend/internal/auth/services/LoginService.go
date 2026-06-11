package services

import(
	"backend/internal/auth/repositories"
)

func NewLoginService() *LoginService{
	return &LoginService{
		repo: repositories.AuthRepository{},
	}
}

type LoginService struct{
	repo repositories.AuthRepository
}

func (s *LoginService) login(){
}
