package dto

type DeleteToDoListRequest struct{
	ListID int32 `json:"id" binding:"required"`
}