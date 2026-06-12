package routes

import (
	"backend/internal/auth"
	"backend/internal/user"

	"github.com/gin-gonic/gin"
)

func rootRoutes(r *gin.Engine){
	r.Static("/assets","./frontend/assets")
	r.NoRoute(func(c *gin.Context){
		c.File("./frontend/index.html")
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