package dto

type CreateToDoListProjectRequest struct{
	Title string `json:"title" binding:"required"`
}