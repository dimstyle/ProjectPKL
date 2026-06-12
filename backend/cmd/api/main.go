package main

import (
	"backend/internal/routes"
	"backend/internal/database"
)

func main(){

	database.ConnectDB()

	router := routes.SetupRoutes()
	router.Run()
}