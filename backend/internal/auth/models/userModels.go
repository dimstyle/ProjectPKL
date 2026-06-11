package models

type User struct{
	id uint `gorm:"column:id;primaryKey;autoIncrement"`
	Username string `gorm:"column:Username"`
	Email string `gorm:"uniqueIndex;column:Email"`
	Password string `gorm:"column:Password"`
}