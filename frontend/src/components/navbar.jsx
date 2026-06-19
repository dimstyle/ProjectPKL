import "../css/navbar.css"
import profileIcon from "../assets/download-removebg-preview.png"
import { Link } from "react-router-dom"

export default function Navbar({search, setSearch}) {
    return (
        <>
            <nav>
                <h1 className="akadub">Akadub</h1>
                <Link to="/">
                    <input className="usersearch" type="text" placeholder="Search user" value={search} onChange={(e) => setSearch(e.target.value)} />
                </Link>
                <div className="links">
                    <Link className="postlink" to="/posts">Post</Link>
                    <Link className="loginlink" to="/login">Log In</Link>
                    <Link className="signuplink" to="/registration">sign up</Link>
                </div>
            </nav>
        </>
    )
}