-- name: DeleteToDoByID :one
DELETE FROM todo_list 
WHERE id = $1
RETURNING *;