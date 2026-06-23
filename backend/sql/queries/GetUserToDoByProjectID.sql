-- name: GetUserToDoByProjectID :many
SELECT
id, -- Will generate `json:"id"`
title, -- Will generate `json:"title"`
description, -- Will generate `json:"description"`
completed -- Will generate `json:"completed"`
FROM todo_list 
WHERE project_id = $1 AND user_id = $2;
