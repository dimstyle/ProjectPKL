-- name: CreateTodo :one
INSERT INTO todo_list(
   project_id, title, description
) VALUES ($1, $2, $3)
RETURNING *;   