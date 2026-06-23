import { http, HttpResponse } from "msw";
import { userProfile } from '../userdata'
import { registeredUsers } from '../authStorage'

export const usersHandlers = [
    http.get("/api/users/profiles", () => {
        return HttpResponse.json({
            message: "success to fetch user",
            users: registeredUsers.map(u => ({ id: u.id, username: u.username, email: u.email }))
        })
    }),

    http.get("/api/users/profile/:id", ({ params }) => {
        const { id } = params

        return HttpResponse.json(userProfile[id - 1])
    })
]
