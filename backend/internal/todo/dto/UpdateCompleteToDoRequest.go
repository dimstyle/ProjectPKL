package dto

type UpdateCompleteToDoRequest struct{
	ID int32 `json:"id" binding:"required"`
	Complete bool `json:"complete" binding:"required"`
}