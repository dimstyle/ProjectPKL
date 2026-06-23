package handlers

import (
	"backend/internal/db"
	"backend/internal/todo/services"
	"backend/pkg/jwt"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

func NewGetuserprojectHandler(q *db.Queries) *GetuserprojectHandler {
	return &GetuserprojectHandler{
		service: services.NewGetuserprojectService(q),
	}
}

type GetuserprojectHandler struct {
	service *services.GetuserprojectService
}

func (handler *GetuserprojectHandler) GetProject(c *gin.Context){
	ctx := c.Request.Context()

	tokenobj, exists := c.Get("jwt_claims")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{
		"message" : "internal server error",
		})
	}

	JwtClaims, ok := tokenobj.(*jwt.Claims)
	if !ok{
		c.JSON(http.StatusInternalServerError, gin.H{
			"message" : "internal server error",
		})
	}


	projects, err := handler.service.GetProject(ctx,JwtClaims.UserID)
	if err != nil{
		if errors.Is(err, pgx.ErrNoRows){
			c.JSON(http.StatusNotFound, gin.H{
				"message" : "no projects found",
			})
			return
		}
		c.JSON(http.StatusInternalServerError,gin.H{
			"message" : "internal server error",
		})
		return 
	}

	c.JSON(http.StatusOK, gin.H{
		"message" : "all projects found",
		"projects" : projects,

	})
	
}