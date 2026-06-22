-- name: CreateToDoListProject :one
INSERT INTO projects_todo_list(
    user_id, title
) VALUES ($1, $2)
RETURNING *;
