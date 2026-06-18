-- name: GetTextPostsByTime :many
SELECT 
user_id, -- Will generate `json:"user_id"`
title, -- Will generate `json:"title"`
content -- Will generate `json:"content"`
username -- Will generate `json:"username"`
FROM text_posts
WHERE created_at BETWEEN sqlc.arg(start_time)
                    AND sqlc.arg(end_time); 