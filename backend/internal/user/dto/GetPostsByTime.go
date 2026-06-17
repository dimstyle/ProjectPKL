package dto

type GetPostsByTimeRequest struct {
	Range string `json:"range" binding:"required"`
}