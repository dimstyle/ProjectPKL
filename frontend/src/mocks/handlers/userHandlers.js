import { http, HttpResponse } from "msw";
import { posts } from '../userdata'
import { getById } from '../authStorage'

export const userHandlers = [
    // get user profile from access token
    http.get("/api/user/profile", ({ request }) => {
        const auth = request.headers.get("Authorization") || ""

        if (!auth) {
            return HttpResponse.json({ message: "Authorization header missing" }, { status: 401 })
        }

        const match = auth.match(/^access_token_(\d+)$/)
        if (!match) {
            return HttpResponse.json({ message: "Invalid token format" }, { status: 401 })
        }

        const id = Number(match[1])
        const user = getById(id)

        if (!user) {
            return HttpResponse.json({ message: "Invalid token user" }, { status: 401 })
        }

        return HttpResponse.json({
            message: "success",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        })
    }),

    // get user posts from access token
    http.get("/api/user/posts", ({ request }) => {
        const auth = request.headers.get("Authorization") || ""

        if (!auth) {
            return HttpResponse.json({ message: "Authorization header missing" }, { status: 401 })
        }

        const match = auth.match(/^access_token_(\d+)$/)
        if (!match) {
            return HttpResponse.json({ message: "Invalid token format" }, { status: 401 })
        }

        const id = Number(match[1])
        const user = getById(id)

        if (!user) {
            return HttpResponse.json({ message: "Invalid token user" }, { status: 401 })
        }

        const userPosts = posts
            .filter(post => post.user_id === id)
            .map(post => ({
                title: post.title,
                content: post.content,
                username: user.username,
                created_at: post.created_at
            }))

        return HttpResponse.json({
            message: "success",
            posts: userPosts
        })
    }),

    // create user post
    http.post("/api/user/createpost", async ({ request }) => {
        const auth = request.headers.get("Authorization") || ""

        if (!auth) {
            return HttpResponse.json({ message: "Authorization header missing" }, { status: 401 })
        }

        const match = auth.match(/^access_token_(\d+)$/)
        if (!match) {
            return HttpResponse.json({ message: "Invalid token format" }, { status: 401 })
        }

        const id = Number(match[1])
        const user = getById(id)

        if (!user) {
            return HttpResponse.json({ message: "Invalid token user" }, { status: 401 })
        }

        const body = await request.json().catch(() => ({}))
        const { title, content, username } = body

        if (!title || !content || !username) {
            return HttpResponse.json({ message: "title, content, and username are required" }, { status: 400 })
        }

        if (username !== user.username) {
            return HttpResponse.json({ message: "Username must match authenticated user" }, { status: 403 })
        }

        const newPost = {
            user_id: id,
            title,
            content,
            created_at: new Date().toISOString()
        }

        posts.push(newPost)

        return HttpResponse.json({ message: "success", post: newPost }, { status: 201 })
    }),

        http.post("/api/user/createtodolist", async ({ request }) => {
            const auth = request.headers.get("Authorization") || ""

            if (!auth) {
                return HttpResponse.json({ message: "Authorization header missing" }, { status: 401 })
            }

            const match = auth.match(/^access_token_(\d+)$/)
            if (!match) {
                return HttpResponse.json({ message: "Invalid token format" }, { status: 401 })
            }

            const id = Number(match[1])
            const user = getById(id)

            if (!user) {
                return HttpResponse.json({ message: "Invalid token user" }, { status: 401 })
            }

            const body = await request.json().catch(() => ({}))
            const { user_id, title, description } = body

            if (user_id !== id || !title || !description) {
                return HttpResponse.json({ message: "user_id, title and description are required and must match authenticated user" }, { status: 400 })
            }

            const newTodo = {
                user_id: id,
                title,
                description,
                created_at: new Date().toISOString(),
            }

            return HttpResponse.json({ message: "success", todo: newTodo }, { status: 201 })
        })
]
