-- name: UpdateCompleteToDo :one
UPDATE todo_list 
SET 
    completed = $2,
    updated_at = NOW()
WHERE id = $1 AND user_id = $3
RETURNING *;