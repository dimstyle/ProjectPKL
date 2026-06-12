package routes

import (
	"backend/internal/auth"
	"backend/internal/user"

	"github.com/gin-gonic/gin"
)

func rootRoutes(r *gin.Engine){
	r.Static("/assets","./frontend/dist/assets")
	r.NoRoute(func(c *gin.Context){
		c.File("./frontend/dist/index.html")
	})
}

func SetupRoutes() *gin.Engine{
	r := gin.Default()
	api := r.Group("/api")
	rootRoutes(r)

	auth.AuthRoutes(api)
	user.UserRoutes(api)
	
	return r
}