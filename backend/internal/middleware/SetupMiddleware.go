package middleware

import(
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func SetupMiddleware(r *gin.Engine){
	// Logger 
	r.Use(gin.Logger())

	// cors
	r.Use(cors.New(cors.DefaultConfig()))
}