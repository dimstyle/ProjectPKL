package user

import (
	"backend/internal/user/handlers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.RouterGroup){
	user := r.Group("/user")

	// Regist list user Routes
	user.GET("/list",handlers.NewListuserHandler().Listuser)

}