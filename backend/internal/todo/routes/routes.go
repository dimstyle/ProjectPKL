package routes

import (
	"backend/internal/db"
	"backend/internal/middleware"
	"backend/internal/todo/handlers"

	"github.com/gin-gonic/gin"
)

func TodoRoutes(r *gin.RouterGroup, q *db.Queries){
	eachUser := r.Group("/user");

	eachUser.POST("/createtodoproject",middleware.VerifiedAccessTokenhMiddleware(),handlers.NewCreatetodolistprojectHandler(q).CreateProject)
	eachUser.POST("/createtodo", middleware.VerifiedAccessTokenhMiddleware(), handlers.NewCreatetodoHandler(q).CreateTodo)
	eachUser.PATCH("/updatetodo",middleware.VerifiedAccessTokenhMiddleware(), handlers.NewUpdatecompletetodoHandler(q).UpdateComplete)
	eachUser.DELETE("/deletetodo",middleware.VerifiedAccessTokenhMiddleware())
}