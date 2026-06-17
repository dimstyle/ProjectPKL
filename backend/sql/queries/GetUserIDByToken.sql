-- name: GetUserIDByToken :one
SELECT user_id
FROM refresh_token
WHERE token = $1;