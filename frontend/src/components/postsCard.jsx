import '../css/postsCard.css'

export default function PostCard({ userId, title, content }) {
    return (
        <article className='postcard'>
            <div className='postcard__meta'>
                <span className='postcard__user'>User #{userId}</span>
            </div>
            <h2 className='postcard__title'>{title}</h2>
            <p className='postcard__content'>{content}</p>
        </article>
    )
}
