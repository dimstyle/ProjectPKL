import { useEffect, useState } from "react";
import Loading from "./Loading";
import Error from "./Error";
import { useAuthStore } from "../stores/authStore";

function Dashboard(){
    const accessToken = useAuthStore(state => state.accessToken)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [user, setUser] = useState("")

    useEffect(()=>{
        (async ()=>{
            setError("")
            try{
                if (!accessToken) {
                    throw new Error("Missing access token")
                }

                const response = await fetch("/api/user/profile", {
                    headers: {
                        Authorization: accessToken
                    }
                })

                if(!response.ok){
                    throw new Error("users not found")
                }

                const userdata = await response.json();
                setUser(userdata.users)
            }catch(error){
                setError(error.message)
            }finally{
                setLoading(false)
            }
        })()
    }, [accessToken])

    if(loading) return <Loading />

    if(error) return <Error />
    return(
        <>
            <h1>haha</h1>
        </>
    )
}

export default Dashboard;