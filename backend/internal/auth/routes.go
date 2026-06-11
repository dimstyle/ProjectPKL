package auth

import (
	"backend/internal/auth/handlers"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.RouterGroup){
	auth := r.Group("/auth")

	// Regist Registration Routes
	auth.POST("/registration",handlers.NewRegistrationHandler().Registration)

	// Regist Login Routes
	auth.POST("/login",handlers.NewLoginHandler().Login)

}