package config

import (
	"log"
	"github.com/joho/godotenv"
)


func LoadEnv(){
	err := godotenv.Load()
	if(err != nil){
		log.Fatal("can't load env file")
	}
}

