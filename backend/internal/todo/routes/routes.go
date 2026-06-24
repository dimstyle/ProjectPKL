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
	eachUser.POST("/createtodolist", middleware.VerifiedAccessTokenhMiddleware(), handlers.NewCreatetodoHandler(q).CreateTodo)
	eachUser.PATCH("/updatetodo",middleware.VerifiedAccessTokenhMiddleware(), handlers.NewUpdatecompletetodoHandler(q).UpdateComplete)
	eachUser.DELETE("/deletetodo",middleware.VerifiedAccessTokenhMiddleware(), handlers.NewDeletetodoHandler(q).DeleteList)
	eachUser.DELETE("/deletetodoproject", middleware.VerifiedAccessTokenhMiddleware(), handlers.NewDeletetodoprojectHandler(q).DeleteProject)

	eachUser.GET("/getuserproject", middleware.VerifiedAccessTokenhMiddleware(),handlers.NewGetuserprojectHandler(q).GetProject)
	eachUser.GET("/gettodolist", middleware.VerifiedAccessTokenhMiddleware(), handlers.NewGetusertodoHandler(q).GetTodo)
}
