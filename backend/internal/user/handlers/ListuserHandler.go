package handlers

import(
	"backend/internal/user/services"
	"backend/internal/db"
	"github.com/gin-gonic/gin"
)

func NewListuserHandler(q *db.Queries) *ListuserHandler{
	return &ListuserHandler{
		service: services.NewListuserHandler(q),
	}
}

type ListuserHandler struct {
	service *services.ListuserService
}

func (handler *ListuserHandler) Listuser(c *gin.Context){
	ctx := c.Request.Context()

	users, err := handler.service.GetUser(ctx)


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