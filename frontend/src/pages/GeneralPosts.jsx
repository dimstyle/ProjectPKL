import Navbar from '../components/navbar'
import PostCard from '../components/postsCard'
import Error from './Error'
import Loading from './Loading'
import { useEffect, useState } from 'react'
import '../App.css'
import '../css/GeneralPosts.css'

function GeneralPosts() {
    const [users, setUsers] = useState([])
    const [filteredUser, setFilteredUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const [range, setRange] = useState('last_24h')

    useEffect(() => {
        ;(async () => {
            setError('')
            try {
                const endpoint = `/api/users/posts?range=${encodeURIComponent(range)}`
                const response = await fetch(endpoint)

                if (!response.ok) {
                    throw new Error('posts not found')
                }

                const postsdata = await response.json()
                setFilteredUser(postsdata.posts)
                setUsers(postsdata.posts)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        })()
    }, [range])

    if (loading) return <Loading />
    if (error) return <Error />

    return (
        <>
            <div className='home'>
                <Navbar search={search} setSearch={setSearch} />
                <main>
                    <div className='posts-header'>
                        <div className='posts-header__top'>
                            <div>
                                <h1>General Posts</h1>
                            </div>
                            <div className='posts-range-wrapper'>
                                <label htmlFor='post-range' className='posts-range-label'>Filter Range</label>
                                <select
                                    id='post-range'
                                    className='posts-range-select'
                                    value={range}
                                    onChange={(event) => setRange(event.target.value)}
                                >
                                    <option value='last_hour'>Last Hour</option>
                                    <option value='last_24h'>Last 24 Hours</option>
                                    <option value='last_week'>Last Week</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='posts-list'>
                        {filteredUser.length > 0 ? (
                            filteredUser.map((post, index) => (
                                <PostCard
                                    key={`${post.user_id}-${index}`}
                                    userId={post.user_id}
                                    title={post.title}
                                    content={post.content}
                                />
                            ))
                        ) : (
                            <div className='notfound'>
                                <h1>No post found.</h1>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    )
}

export default GeneralPosts
