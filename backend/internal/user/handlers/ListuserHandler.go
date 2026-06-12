package handlers

import(
	"backend/internal/user/services"

	"github.com/gin-gonic/gin"
)

func NewListuserHandler() *ListuserHandler{
	return &ListuserHandler{
		service: services.NewListuserHandler(),
	}
}

type ListuserHandler struct {
	service *services.ListuserService
}

func (handler *ListuserHandler) Listuser(c *gin.Context){
	users, err := handler.service.GetUser()

	if(err != nil){
		c.JSON(404,gin.H{
			"message" : "user not found",
			"users"	: nil,
		})
		return
	}


	c.JSON(200,gin.H{
		"message" : "users found",
		"users" : users,
	})
}