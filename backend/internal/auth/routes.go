package auth

import (
	"backend/internal/auth/handlers"
	"backend/internal/db"
	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.RouterGroup, q *db.Queries){
	auth := r.Group("/auth")

	// Regist Registration Routes
	auth.POST("/registration",handlers.NewRegistrationHandler(q).Registration)

	// Regist Login Routes
	auth.POST("/login",handlers.NewLoginHandler(q).Login)

}