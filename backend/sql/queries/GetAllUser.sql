-- name: GetAllUser :many
SELECT id, username, email 
FROM users;