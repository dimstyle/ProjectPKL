import "../css/userCard.css"
import profileIcon from "../assets/download-removebg-preview.png"
import { Link } from "react-router-dom"

export default function UserCard({id, name, email}) {
    return (
        <>
            <div className="usercard">
                <img src={profileIcon} alt="profileIcon" width={"100rem"} />
                <h1 className="username">{name}</h1>
                <h2 className="useremail">{email}</h2>
                <Link className="userlink" to={`/user/${id}`}>View Account</Link>
            </div>
        </>
    )
}