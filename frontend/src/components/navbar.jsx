import "../css/navbar.css"
import profileIcon from "../assets/download-removebg-preview.png"

export default function Navbar({search, setSearch}) {
    return (
        <>
            <nav>
                <h1 className="akadub">Akadub</h1>
                <input type="text" placeholder="Search user" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <img src={profileIcon} alt="profileIcon" width={"90rem"} />
            </nav>
        </>
    )
}