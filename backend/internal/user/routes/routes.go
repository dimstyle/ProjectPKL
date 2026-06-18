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
	users.GET("/posts", handlers.NewListpostsHandler(q).GetPostsByTimeRange)

	eachUser := r.Group("/user")

	// Regist account Routes
	eachUser.GET("/profile",middleware.VerifiedAccessTokenhMiddleware(),handlers.NewUserprofileHandler(q).GetUserProfile)
	eachUser.POST("/createpost",middleware.VerifiedAccessTokenhMiddleware(), handlers.NewCreatepostHandler(q).CreateUserPost)
}