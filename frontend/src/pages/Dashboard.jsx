import { useEffect } from "react";

function Dashboard(){
    useEffect(()=>{
        (async ()=>{
            const response = fetch("/api/user/profile")
        })()
    })
    return(
        <>
            <h1>hello world</h1>
        </>
    )

}

export default Dashboard;