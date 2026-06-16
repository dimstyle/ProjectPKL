-- name: CreateRefreshToken :one
INSERT INTO refresh_token(
user_id, token)
VALUES ( $1, $2 )
RETURNING *;