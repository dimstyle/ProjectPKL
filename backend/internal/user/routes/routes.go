package routes

import (
	"backend/internal/user/handlers"
	"backend/internal/db"
	"backend/internal/middleware"
	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.RouterGroup,q *db.Queries){
	users := r.Group("/users")

	// Regist list user Routes
	users.GET("/profiles",handlers.NewListuserHandler(q).Listuser)
	users.GET("/profile/:id", handlers.NewUserprofileHandler(q).GetProfile)
	

	eachUser := r.Group("/user")

	// Regist account Routes
	eachUser.GET("/profile",middleware.VerifiedAccessTokenhMiddleware(),handlers.NewMyprofileHandler(q).GetMyProfile)
}