package handlers

import (
	"backend/internal/db"
	"backend/internal/post/services"
)

func NewUserpostHandler(q *db.Queries) *UserpostHandler {
	return &UserpostHandler{
		service: services.NewUserpostService(q),
	}
}

type UserpostHandler struct {
	service *services.UserpostService
}
