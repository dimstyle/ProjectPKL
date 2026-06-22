package dto


type CreateToDoRequest struct {
	ProjectID int32 `json:"project_id" required:"binding"`
	Title string  `json:"title" required:"binding"`
	Description string  `json:"description" required:"binding"`
}