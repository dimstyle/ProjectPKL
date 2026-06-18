import { http, HttpResponse } from "msw";
import { userProfile, posts} from './userdata'
import { registeredUsers, addUser, findByEmailAndPassword, getById } from './authStorage'

export const handler = [
    http.get("/api/users/profiles",()=>{
        return HttpResponse.json({
            message : "success to fetch user",
            users: registeredUsers.map(u => ({ id: u.id, username: u.username, email: u.email }))
        })
    }),
    
    http.get("/api/users/profiles/:id", ({params}) => {
        const {id} = params

        return HttpResponse.json(userProfile[id-1])
    }),

    http.get("/api/users/posts", ({ request }) => {
        const url = new URL(request.url)
        const queryRange = url.searchParams.get('range')
        const range = queryRange || 'last_hour'
        const now = new Date()

        let startTime
        switch (range) {
            case 'last_hour':
                startTime = new Date(now.getTime() - 1 * 60 * 60 * 1000)
                break
            case 'last_24h':
                startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
                break
            case 'last_week':
                startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
                break
            default:
                startTime = new Date(now.getTime() - 1 * 60 * 60 * 1000)
                break
        }

        const filteredPosts = posts.filter((post) => {
            const createdAt = new Date(post.created_at)
            return createdAt >= startTime && createdAt <= now
        })

        return HttpResponse.json({
            message: "success to fetch posts",
            posts: filteredPosts
        })
    }),

    // get single user from access token
    http.get("/api/user/post", ({ request }) => {
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
                username: user.username,
                email: user.email,
                user_id: user.id
            }
        })
    }),

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
        const profile = userProfile[id - 1]

        if (!user || !profile) {
            return HttpResponse.json({ message: "Invalid token user" }, { status: 401 })
        }

        return HttpResponse.json({
            message: "success",
            profile: {
                id: profile.id,
                username: profile.username,
                email: profile.email,
                age: profile.age,
                skin: profile.skin
            }
        })
    }),

    // auth
    http.post("/api/auth/registration", async ({ request }) => {
        const body = await request.json().catch(() => ({}))
        const { email, password, username } = body

        if (!email || !password) {
            return HttpResponse.json({ message: "email and password required" }, { status: 400 })
        }

        const user = addUser({ email, password, username })
        if (!user) {
            return HttpResponse.json({ message: "email already registered" }, { status: 409 })
        }

        return HttpResponse.json({ message: "success to create user", user: { id: user.id, email: user.email, username: user.username } }, { status: 201 })
    }),

    http.post("/api/auth/login", async ({ request }) => {
        const body = await request.json().catch(() => ({}))
        const { email, password } = body

        if (!email || !password) {
            return HttpResponse.json({ message: "email and password required" }, { status: 400 })
        }

        const user = findByEmailAndPassword(email, password)
        if (!user) {
            return HttpResponse.json({ message: "invalid credentials" }, { status: 401 })
        }

        return HttpResponse.json({ message: "success to login" }, { headers: { Authorization: `access_token_${user.id}` } })
    })
]