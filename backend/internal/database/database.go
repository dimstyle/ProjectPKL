package database

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func ConnectDB() (*pgxpool.Pool,error){
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

	db, err := pgxpool.New(context.Background(),dsn)

	if(err != nil){
		log.Println("failed to connect postgres database")
		return nil, err
	}

	if err := db.Ping(context.Background()); err != nil{
		log.Println("failed to connect postgres database")
		return nil, err
	}

	log.Println("database connected")

	return db, nil

}