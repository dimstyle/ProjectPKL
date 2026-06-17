-- name: GetUserPasswordWithEmail :one
SELECT id,password
FROM users
WHERE email = $1;
