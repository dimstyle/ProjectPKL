package repositories

import (
	"backend/internal/auth/models"
	"backend/internal/database"
	
	"log"
)

type AuthRepository struct{}

func (repo *AuthRepository) CreateUserData(user models.User) error {
	db := database.ConnectDB()
	err := db.Create(&user).Error

	if(err != nil){
		log.Println(err)
		return err
	}

	return nil
}

func(repo *AuthRepository) GetUserWithEmail(Email string) (*models.User,error) {
	var user models.User

	db := database.ConnectDB()
	err := db.Where("\"Email\" = ?",Email).Find(&user).Error

	if(err != nil){
		log.Println(err)
		return nil,err
	}
	
	return &user,err
}