package dto

type CreateUserRequest struct {
	Username string `json:"Username" binding:"required"`
	Email string `json:"Email" binding:"required,email"`
	Password string `json:"Password" binding:"required"`
}