package handlers

import (
	"backend/internal/db"
	"backend/internal/post/dto"
	"backend/internal/post/services"
	"backend/pkg/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func NewCreatepostHandler(q *db.Queries) *CreatepostHandler{
	return &CreatepostHandler{
		service: services.NewCreatepostService(q),
	}
}

type CreatepostHandler struct {
	service *services.CreatepostService
}

func (handler *CreatepostHandler) CreateUserPost(c *gin.Context){
	ctx := c.Request.Context()

	token, exists := c.Get("jwt_claims")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message" : "internal server error",
		})
		return
	}

	JwtClaims, ok := token.(*jwt.Claims)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message" : "internal server error",
		})
		return
	}

	var createReq dto.CreatepostRequest

	err := c.ShouldBindJSON(&createReq)
	if err != nil {
		c.JSON(http.StatusBadRequest,gin.H{
			"message" : "bad request",
		})
		return
	}

	err = handler.service.MakePostForUser(ctx, db.CreatePostForUserParams{
		UserID: JwtClaims.UserID,
		Title: createReq.Title,
		Content: createReq.Content,
		Username: createReq.Username,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError,gin.H{
			"message" : "internal server error",
		})
		return
	}
	
	c.JSON(http.StatusOK,gin.H{
		"message" : "succes to create content",
	})

}