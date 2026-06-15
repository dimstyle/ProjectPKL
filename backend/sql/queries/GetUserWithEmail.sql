-- name: GetUserWithEmail :one
SELECT *
FROM users
WHERE email = $1;
