package routes

import (
	"backend/internal/auth"
	"backend/internal/db"
	"backend/internal/user"

	"github.com/gin-gonic/gin"
)

func rootRoutes(r *gin.Engine){
	// r.Static("/assets","./frontend/assets")
	// r.NoRoute(func(c *gin.Context){
	// 	c.File("./frontend/index.html")
	// })

	r.GET("/",func(c *gin.Context){
		c.JSON(200,gin.H{
			"message" : "successfull",
		})
	})
}


func SetupRoutes(q *db.Queries) *gin.Engine{
	r := gin.Default()
	api := r.Group("/api")
	rootRoutes(r)

	auth.AuthRoutes(api, q)
	user.UserRoutes(api, q)
	
	return r
}