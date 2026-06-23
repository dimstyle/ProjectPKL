-- name: DeleteToDoByID :one
DELETE FROM todo_list 
WHERE id = $1 AND user_id = $2
RETURNING *;