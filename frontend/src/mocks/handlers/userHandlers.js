import { http, HttpResponse } from "msw";
import { posts } from '../userdata'
import { getById } from '../authStorage'

const todoProjects = []
const todoLists = []

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

    http.post("/api/user/createtodoproject", async ({ request }) => {
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
        const { title, description } = body

        if (!title || !description) {
            return HttpResponse.json({ message: "title and description are required" }, { status: 400 })
        }

        const newProject = {
            id: todoProjects.length ? Math.max(...todoProjects.map(p => p.id)) + 1 : 1,
            user_id: id,
            title,
            description,
            created_at: new Date().toISOString()
        }

        todoProjects.push(newProject)

        return HttpResponse.json({ message: "success", project: newProject }, { status: 201 })
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
        const { projectid, title } = body

        if (projectid == null ) {
            return HttpResponse.json({ message: "projectid is required" }, { status: 400 })
        }

        if (!title || typeof completed !== 'boolean') {
            return HttpResponse.json({ message: "title, and completed(boolean) are required" }, { status: 400 })
        }

        let project = null
        if (projectid != null) {
            const projectIdNumber = Number(projectid)
            if (Number.isNaN(projectIdNumber)) {
                return HttpResponse.json({ message: "projectid must be a number" }, { status: 400 })
            }
            project = todoProjects.find(p => p.id === projectIdNumber)
            if (!project) {
                return HttpResponse.json({ message: "Project not found" }, { status: 404 })
            }
            if (project.user_id !== id) {
                return HttpResponse.json({ message: "Project does not belong to authenticated user" }, { status: 403 })
            }
        }

        const newTodo = {
            id: todoLists.length ? Math.max(...todoLists.map(t => t.id)) + 1 : 1,
            user_id: id,
            project_id: project ? project.id : null,
            title,
            completed,
            created_at: new Date().toISOString(),
        }

        todoLists.push(newTodo)

        return HttpResponse.json({ message: "success", todo_lists: newTodo }, { status: 201 })
    }),

    http.patch("/api/user/updatetodo", async ({ request }) => {
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
        const { id: todoId, completed } = body

        if (todoId == null || typeof completed !== 'boolean') {
            return HttpResponse.json({ message: "id and completed(boolean) are required" }, { status: 400 })
        }

        const todo = todoLists.find(t => t.id === Number(todoId))
        if (!todo) {
            return HttpResponse.json({ message: "Todo not found" }, { status: 404 })
        }

        if (todo.user_id !== id) {
            return HttpResponse.json({ message: "Todo does not belong to authenticated user" }, { status: 403 })
        }

        todo.completed = completed

        return HttpResponse.json({ message: "success", todo }, { status: 200 })
    }),

    http.delete("/api/user/deletetodo", async ({ request }) => {
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
        const { id: todoId } = body

        if (todoId == null) {
            return HttpResponse.json({ message: "id is required" }, { status: 400 })
        }

        const todoIndex = todoLists.findIndex(t => t.id === Number(todoId))
        if (todoIndex === -1) {
            return HttpResponse.json({ message: "Todo not found" }, { status: 404 })
        }

        const todo = todoLists[todoIndex]
        if (todo.user_id !== id) {
            return HttpResponse.json({ message: "Todo does not belong to authenticated user" }, { status: 403 })
        }

        todoLists.splice(todoIndex, 1)

        return HttpResponse.json({ message: "success", deletedId: todoId }, { status: 200 })
    })
    ,

    http.get("/api/user/gettodolist", ({ request }) => {
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

        const url = new URL(request.url)
        const projectIdParam = url.searchParams.get('project_id')

        let results = todoLists.filter(t => t.user_id === id)

        if (projectIdParam != null) {
            const pid = Number(projectIdParam)
            if (Number.isNaN(pid)) {
                return HttpResponse.json({ message: "project_id must be a number" }, { status: 400 })
            }
            results = results.filter(t => t.project_id === pid)
        }

        return HttpResponse.json({ message: "success", todo_lists: results }, { status: 200 })
    })

    ,

    http.get("/api/user/getuserproject", ({ request }) => {
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

        const results = todoProjects.filter(p => p.user_id === id)

        return HttpResponse.json({ message: "success", projects: results }, { status: 200 })
    })

]

