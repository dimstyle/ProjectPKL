import "../css/posts.css"

export default function Posts({ id, name, date }) {
    return (
        <>
            <div key={id} className="posts">
                <div>
                    <p>{name}</p>
                    <p>{date}</p>
                </div>
            </div>
        </>
    )
}