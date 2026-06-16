package routes

import (
	"backend/internal/user/handlers"
	"backend/internal/db"
	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.RouterGroup,q *db.Queries){
	user := r.Group("/user")

	// Regist list user Routes
	user.GET("/list",handlers.NewListuserHandler(q).Listuser)

}