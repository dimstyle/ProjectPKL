package dto


type CreateToDoRequest struct {
	ProjectID int32 `json:"project_id" binding:"required"`
	Title string  `json:"title" binding:"required"`
}