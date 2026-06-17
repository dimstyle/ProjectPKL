import { http, HttpResponse } from "msw";
import { users, userProfile, posts} from './userdata'

export const handler = [
    http.get("/api/users/profiles",()=>{
        return HttpResponse.json({
            message : "success to fetch user",
            users: users
        })
    }),
    
    http.get("/api/users/profiles/:id", ({params}) => {
        const {id} = params

        return HttpResponse.json(userProfile[id-1])
    }),

    http.get("/api/users/posts",()=>{
        return HttpResponse.json({
            message: "success to fetch posts",
            posts: posts
        })
    }),

    // auth
    http.post("/api/auth/registration", () => {
        return HttpResponse.json({
            message : "success to create user"
        }, {status: 201})
    }),
    http.post("/api/auth/login", () => {
        return HttpResponse.json({
            message : "success to login"
        })
    })
]