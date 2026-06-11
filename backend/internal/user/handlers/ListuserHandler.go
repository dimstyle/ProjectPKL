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
	
}