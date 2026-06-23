CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE text_posts(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    username TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE refresh_token(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    token TEXT NOT NULL
);

CREATE TABLE projects_todo_list(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE todo_list(
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);