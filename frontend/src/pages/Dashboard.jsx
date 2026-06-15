import { useParams, Link, Outlet } from "react-router-dom";
import profileIcon from "../assets/download-removebg-preview.png"
import "../css/dashboard.css"

export default function Dashboard() {
    const userData = {
        '1' : { name: 'Hytam', email: 'Hytam@gmail.com', age: '1945', skin: 'black'},
        '2' : { name: 'Putyh', email: 'Putyh@gmail.com', age: '1899', skin: 'white'},
        '3' : { name: 'Abu-abu', email: 'Abu-abu@gmail.com', age: '1511', skin: 'warna-warni'}
    }
    
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
                    <div className="userprofile">
                        <img src={profileIcon} alt="profileIcon" width={"100rem"} />
                        <h1 className="username">{user.name}</h1>
                    </div>
                    <div className="navigation">
                        <Link className="navlink" to={`/dashboard/${userId}`}>User Info</Link>
                        <Link className="navlink" to={`/dashboard/${userId}/settings`}>Settings</Link>
                    </div>
                    <Link className="logout" to="/">Back</Link>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}