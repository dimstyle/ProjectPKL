import "../css/posts.css"

export default function Posts({ id,username, title,content, date }) {
    console.log(username)
    return (
        <>
            <div key={id} className="posts">
                <div>
                    <p>{username}</p>
                    <p>{title}</p>
                    <p>{content}</p>
                    <p>{date.split('T')[0]}</p>
                </div>
            </div>
        </>
    )
}