package jwt 

import(
	"github.com/golang-jwt/jwt/v5"
	"time"
	"os"
)

type JWTToken struct{
	AccessToken string
	RefreshToken string
	Authorized bool
}

func GenerateAccessToken(UserID int32, Role string)(string, error){
	AccessTokenLife := 15 * time.Minute
	
	secret_key := os.Getenv("JWT_SECRET")
	
	AccessTokenClaims := Claims{
		UserID: UserID,
		Role: Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(AccessTokenLife)),
			IssuedAt: jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, AccessTokenClaims)
	
	return token.SignedString([]byte(secret_key))
}

func GenerateRefreshToken(UserID int32, Role string)(string, error){
	RefreshTokenLife := 30 * 24 * time.Hour
	secret_key := os.Getenv("JWT_SECRET")

	RefreshTokenClaims := Claims{
		UserID: UserID,
		Role: Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(RefreshTokenLife)),
			IssuedAt: jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, RefreshTokenClaims)

	return token.SignedString([]byte(secret_key))
}