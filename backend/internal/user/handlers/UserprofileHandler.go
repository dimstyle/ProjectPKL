package handlers

import (
	"backend/internal/db"
	"backend/internal/user/services"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"

	"strconv"
)

func NewUserprofileHandler(q *db.Queries) *UserprofileHandler{
	return &UserprofileHandler{
		service: services.NewUserprofileService(q),
	}
}

type UserprofileHandler struct {
	service *services.UserprofileService
}

func (handler *UserprofileHandler) GetProfile(c *gin.Context){
	ctx := c.Request.Context()
	UserID := c.Param("id")

	intid, err := strconv.Atoi(UserID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message" : "bad request",
		})
		return
	}

	user, err := handler.service.GetProfileWithId(ctx, int32(intid))
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows){
			c.JSON(http.StatusNotFound, gin.H{
				"message" : "User is not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError,gin.H{
			"message" : "internal server error",
		})

	}

	c.JSON(http.StatusOK, gin.H{
		"message" : "success to fetch user", 
		"user" : user,
	})
}