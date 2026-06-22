package dto

type CreatepostRequest struct {
	Title string `json:"title" binding:"required"`
	Content string `json:"content" binding:"required"`
	Username string `json:"username" binding:"required"`
}

