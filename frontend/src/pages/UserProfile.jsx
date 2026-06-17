import { useParams, Link, Outlet } from "react-router-dom";
import profileIcon from "../assets/download-removebg-preview.png"
import "../css/userprofile.css"
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Error from "./Error";

export default function UserProfile() {
    // const userData = {
    //     '1' : { name: 'Hytam', email: 'Hytam@gmail.com', age: '1945', skin: 'black'},
    //     '2' : { name: 'Putyh', email: 'Putyh@gmail.com', age: '1899', skin: 'white'}
    // }
    
    const { userId } = useParams()
    const [error, setError] = useState()
    const [loading,setLoading] = useState(true)
    const [user, setUser] = useState()

    useEffect(()=>{
        (async ()=>{
            try{
                const response = await fetch(`/api/user/${userId}`)

                if(!response.ok){
                    throw new Error("er")
                }

                const userData = await response.json()
                
                setUser(userData)
                
            }catch(err){
                setError(err)
            }finally{
                setLoading(false)
            }
        })()
    },[])

    if(loading) return <Loading />

    if(error) return <Error />
    
    
    if (!user) {
        return (
            <>
                <div className="notexist">
                    <h1>User is not exist</h1>
                    <Link to="/">Back</Link>
                </div>
            </>
        )
    }

    return(
        <>
            <div className="dashboardbody">
                <div className="sidebar">
                    <div className="userprofile">
                        <img src={profileIcon} alt="profileIcon" width={"100rem"} />
                        <h1 className="username">{user.username}</h1>
                    </div>
                    <div className="navigation">
                        <Link className="navlink" to={`/user/${userId}`}>User Info</Link>
                        <Link className="navlink" to={`/user/${userId}/settings`}>Settings</Link>
                        <Link className="navlink" to={`/user/${userId}/post`}>Post</Link>
                    </div>
                    <Link className="logout" to="/">Back</Link>
                </div>
                <div>
                    <Outlet context={user}/>
                </div>
            </div>
        </>
    )
}