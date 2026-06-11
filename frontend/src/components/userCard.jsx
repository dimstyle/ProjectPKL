import "../css/userCard.css"
import profileIcon from "../assets/download-removebg-preview.png"

export default function UserCard({name, email}) {
    return (
        <>
            <div className="usercard">
                <img src={profileIcon} alt="profileIcon" width={"100rem"} />
                <h1 className="username">{name}</h1>
                <h2 className="useremail">{email}</h2>
            </div>
        </>
    )
}