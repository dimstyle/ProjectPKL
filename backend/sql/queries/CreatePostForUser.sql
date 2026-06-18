-- name: CreatePostForUser :one
INSERT INTO text_posts(
title, content, user_id, username)
VALUES ($1,$2,$3, $4)
RETURNING *;