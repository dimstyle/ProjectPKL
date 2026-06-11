package main

import (
	"backend/config"
	"backend/internal/routes"
	"backend/internal/database"
)

func main(){
	config.LoadEnv()
	database.ConnectDB()

	router := routes.SetupRoutes()
	router.Run()
}