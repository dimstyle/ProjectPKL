import { http, HttpResponse } from "msw";
import { addUser, findByEmailAndPassword, getById } from '../authStorage'

export const authHandlers = [
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

    // refresh access token using HttpOnly refresh cookie

    http.get("/api/auth/refresh_token", ({ request, cookies }) => {
        const match = cookies.refresh_token.match(/refresh_token_(\d+)/)
        if (!match) {
            return HttpResponse.json({ message: "Refresh token missing or invalid" }, { status: 401 })
        }

        const id = Number(match[1])
        const user = getById(id)
        if (!user) {
            return HttpResponse.json({ message: "Invalid refresh token user" }, { status: 401 })
        }

        // return a fresh access token in Authorization response header
        return HttpResponse.json({ message: "success to refresh" }, { headers: { Authorization: `access_token_${user.id}` } })
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

        // In development mock, set an HttpOnly refresh cookie and return an access token header
        return HttpResponse.json(
            { message: "success to login" },
            { headers: { Authorization: `access_token_${user.id}`, "Set-Cookie": `refresh_token=refresh_token_${user.id}; HttpOnly; Path=/` } }
        )
    })
]
