package auth

import(
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine){
	_ = r.Group("/auth")

}