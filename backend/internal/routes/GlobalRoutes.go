package routes

import (
	authroutes "backend/internal/auth/routes"
	userroutes "backend/internal/user/routes"
	"backend/internal/middleware"
	"backend/internal/db"

	"github.com/gin-gonic/gin"
)

func rootRoutes(r *gin.Engine){
	 r.Static("/assets","./frontend/assets")
	 r.NoRoute(func(c *gin.Context){
	 	c.File("./frontend/index.html")
	})

	r.GET("/test",func(c *gin.Context){
		c.JSON(200,gin.H{
			"message" : "successfull",
		})
	})
}


func SetupRoutes(q *db.Queries) *gin.Engine{
	r := gin.Default()
	r.SetTrustedProxies(nil)

	middleware.SetupMiddleware(r)

	api := r.Group("/api")
	rootRoutes(r)

	authroutes.AuthRoutes(api, q)
	userroutes.UserRoutes(api, q)
	
	return r
}
