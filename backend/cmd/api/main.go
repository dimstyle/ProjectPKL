package main

import (
	"backend/configs"
	"backend/internal/database"
	"backend/internal/routes"
	"backend/internal/db"

	"log"
)

func main(){
	configs.Loadenv()

	dbConn, err := database.ConnectDB()
	if err != nil{
		log.Fatal(err)
	}
	queries := db.New(dbConn)


	router := routes.SetupRoutes(queries)
	router.Run()
}
