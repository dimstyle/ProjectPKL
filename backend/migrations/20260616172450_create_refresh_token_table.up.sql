CREATE TABLE refresh_token(
    id SERIAL PRIMARY KEY,
    user_id INT,
    token TEXT
);
