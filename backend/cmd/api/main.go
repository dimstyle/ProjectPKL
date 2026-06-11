package main

import (
	"backend/config"
	"backend/internal/auth"
	"backend/internal/database"

	"github.com/gin-gonic/gin"
)

func main(){
	config.LoadEnv()
	database.ConnectDB()

	router := gin.Default()

	auth.RegisterRoutes(router)

	router.Run()
}