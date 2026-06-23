package dto

type CreateToDoResponse struct{
	ID int32 `json:"id" binding:"required"`
	Completed bool `json:"completed" binding:"required"`
	Title string `json:"title" binding:"required"`

}