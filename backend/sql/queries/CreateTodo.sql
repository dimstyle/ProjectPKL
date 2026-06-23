-- name: CreateTodo :one
INSERT INTO todo_list(
  user_id, project_id, title, description
) VALUES ($1, $2, $3, $4)
RETURNING *;   