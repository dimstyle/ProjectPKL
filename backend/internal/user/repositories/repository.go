package repositories

import (
	"backend/internal/database"
	"backend/internal/user/dto"

	"backend/internal/auth/models"

	"log"
)

type UserRepository struct {}

func (repo *UserRepository) GetAllUser() ([]dto.GetUserList, error){
	var users []dto.GetUserList

	db := database.ConnectDB()

	err := db.Model(&models.User{}).Select("ID","Username","Email").Find(&users).Error

	if(err != nil){
		log.Println(err)
	}

	return users, err
}