package models

type User struct{
	ID uint `gorm:"column:ID;primaryKey;autoIncrement"`
	Username string `gorm:"column:Username"`
	Email string `gorm:"uniqueIndex;column:Email"`
	Password string `gorm:"column:Password"`
}