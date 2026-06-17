package middleware

import (
	"strings"
	"backend/pkg/jwt"

	"github.com/gin-gonic/gin"
)

func VerifiedAccessTokenhMiddleware() gin.HandlerFunc{
	return func(c *gin.Context) {
		Autheader := c.GetHeader("Authorization")

		
		if Autheader == ""{
			c.AbortWithStatusJSON(401, gin.H{
				"message" : "missing token",
			})
			return
		}
		
		AccessToken := strings.TrimPrefix(Autheader,"Bearer ")
		
		claims, err := jwt.ValidateToken(AccessToken)
		if err != nil{
			c.AbortWithStatusJSON(401,gin.H{
				"message" : "invalid token",
			}) 
			return 
		}

		c.Set("user_id",claims.UserID)
		c.Next()
	}
}

func VerifiedRefreshTokenMiddleware() gin.HandlerFunc{
	return func(c *gin.Context){
		
	}
}