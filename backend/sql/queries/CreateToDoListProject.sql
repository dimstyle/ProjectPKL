-- name: CreateToDoListProject :one
INSERT INTO projects_todo_list(
    user_id, title, description
) VALUES ($1, $2, $3)
RETURNING *;
