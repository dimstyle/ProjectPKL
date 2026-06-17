-- name: GetTextPostsByTime :many
SELECT user_id, title, content
FROM text_posts
WHERE created_at BETWEEN sqlc.arg(start_time)
                    AND sqlc.arg(end_time); 