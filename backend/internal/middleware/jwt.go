package middleware

import (
	"backend/pkg/jwt"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func VerifiedAccessTokenhMiddleware() gin.HandlerFunc{
	return func(c *gin.Context) {
		Autheader := c.GetHeader("Authorization")

		
		if Autheader == ""{
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message" : "missing token",
			})
			return
		}
		
		AccessToken := strings.TrimPrefix(Autheader,"Bearer ")
		
		claims, err := jwt.ValidateTokenWithClaim(AccessToken)
		if err != nil{
			c.AbortWithStatusJSON(http.StatusUnauthorized,gin.H{
				"message" : "invalid token",
			}) 
			return 
		}

		c.Set("jwt_claims",claims)
		c.Next()
	}
}

func VerifiedRefreshTokenMiddleware() gin.HandlerFunc{
	return func(c *gin.Context){
		refreshToken, err := c.Cookie("refresh_token")
		if refreshToken == "" || err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized,gin.H{
				"message" : "missing token",
			})
			return
		}

		if !jwt.ValidateToken(refreshToken){
			c.AbortWithStatusJSON(http.StatusUnauthorized,gin.H{
				"message" : "invalid token",
			}) 
			return 
		}

		fmt.Println(refreshToken)

		c.Set("refresh_token", refreshToken)
		c.Next()
	}
}