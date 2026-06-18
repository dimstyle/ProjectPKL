-- name: GetUsernameById :one

SELECT username
FROM users
WHERE id = $1;