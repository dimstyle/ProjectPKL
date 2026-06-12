package dto

type LoginUserRequest struct{
	Email string `json:"Email";binding:"required,email"`
	Password string `json:"Password";binding:"required"`
}