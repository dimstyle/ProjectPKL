package dto

type UpdateCompleteToDoResponse struct{
	ID int32 `json:"id" binding:"required"`
	Completed *bool `json:"completed" binding:"required"`
}