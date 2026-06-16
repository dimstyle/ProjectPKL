package jwt

import(
	"github.com/golang-jwt/jwt/v5"
)

type Claims struct{
	UserID int32 `json:"user_id"`
	Role string `json:"role"`

	jwt.RegisteredClaims
}

