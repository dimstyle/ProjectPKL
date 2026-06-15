import { http, HttpResponse } from "msw";

const users = [
                {id: 1, username: "dummy1", email: "dummy1@gmail.com"},
                {id: 2, username: "dummy2", email: "dummy2@gmail.com"},
                {id: 3, username: "dummy3", email: "dummy3@gmail.com"}
            ]

const userProfile = [
    {id: 1, username: "dummy1", email: "dummy1@gmail.com"},
    {id: 2, username: "dummy2", email: "dummy2@gmail.com"},
    {id: 3, username: "dummy3", email: "dummy3@gmail.com"}
]


export const handler = [
    http.get("/api/user/list",()=>{
        return HttpResponse.json({
            message : "success to fetch user",
            users: users
        })
    }),
    
    http.get("/api/user/:id", ({params}) => {
        const {id} = params

        return HttpResponse.json(userProfile[id-1])
    })
]