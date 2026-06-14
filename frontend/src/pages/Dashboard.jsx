import { useParams, Link } from "react-router-dom";
import profileIcon from "../assets/download-removebg-preview.png"
import "../css/dashboard.css"

const userData = {
    '1' : { name: 'Hytam', email: 'Hytam@gmail.com', age: '1945', skin: 'black'},
    '2' : { name: 'Putyh', email: 'Putyh@gmail.com', age: '1899', skin: 'white'}
}

export default function Dashboard() {
    const { userId } = useParams()
    const user = userData[userId]
    
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
                    <img src={profileIcon} alt="profileIcon" width={"100rem"} />
                    <h1>{user.name}</h1>
                    <Link to="/">Back</Link>
                </div>
                <div className="userinfo">
                    <h1>User Info</h1>
                    <p>name: {user.name}</p>
                    <p>email: {user.email}</p>
                    <p>age: {user.age}</p>
                    <p>skin: {user.skin}</p>
                </div>
            </div>
        </>
    )
}