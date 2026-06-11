package auth

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) *gin.Engine{
	r.Group("/auth")

	// Regist Registration Routes

	RService := NewRegistrationService()
	RHandler := NewRegistrationHandler(RService)
	_ = r.POST("/login",RHandler.Registration)

	// Regist Login Routes
	LService := NewLoginService()
	LHandler := NewLoginHandler(LService)
	_ = r.POST("/login",LHandler.Login)

	return r

}