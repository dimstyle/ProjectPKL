-- name: GetUserProjectByUserID :many

SELECT 
id, -- Will generate `json:"id"`
title, -- Will generate `json:"title"`
created_at -- Will generate `json:"created_at"`
FROM projects_todo_list
WHERE user_id = $1;