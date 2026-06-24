package dto

type DeleteToDoProjectRequest struct {
	ID int32 `json:"id" binding:"required"`
}