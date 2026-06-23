-- name: GetPostByUserID :many
SELECT 
user_id, -- Will generate `json:"user_id"`
title, -- Will generate `json:"title"`
content -- Will generate `json:"content"`
username -- Will generate `json:"username"`
FROM text_posts
WHERE user_id = $1
AND created_at BETWEEN $2 AND $3;