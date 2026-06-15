import { http, HttpResponse } from "msw";
import { users, userProfile} from './userdata'

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