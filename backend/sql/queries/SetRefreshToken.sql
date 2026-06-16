-- name: SetRefreshToken :one
UPDATE refresh_token
SET token = $1
WHERE user_id = $2
RETURNING *;