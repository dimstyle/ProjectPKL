package auth

type User struct{
	id uint `gorm:"column:id;primaryKey;autoIncrement"`
	username string `gorm:"column:username"`
	email string `gorm:"column:email"`
	password string `gorm:"column:password"`
}