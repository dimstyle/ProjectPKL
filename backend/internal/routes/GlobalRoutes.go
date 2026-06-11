package routes

import (
	"backend/internal/auth"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine{
	r := gin.Default()
	
	auth.RegisterRoutes(r)

	return r
}