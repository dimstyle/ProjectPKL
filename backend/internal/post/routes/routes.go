package routes

import (
	"github.com/gin-gonic/gin"
	"backend/internal/db"
	"backend/internal/post/handlers"
	"backend/internal/middleware"
)

func PostRoutes(r *gin.Engine, q *db.Queries){
	users := r.Group("/users")
	users.GET("/posts", handlers.NewListpostsHandler(q).GetPostsByTimeRange)
	users.GET("/post/:id")

	eachUser := r.Group("/user")
	eachUser.POST("/createpost",middleware.VerifiedAccessTokenhMiddleware(), handlers.NewCreatepostHandler(q).CreateUserPost)	
}