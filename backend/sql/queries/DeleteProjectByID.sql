-- name: DeleteProjectByID :one
DELETE FROM projects_todo_list
WHERE id = $1 AND user_id = $2
RETURNING *;