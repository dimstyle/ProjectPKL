import { http, HttpResponse } from "msw";
import { posts } from '../userdata'

export const postsHandlers = [
    http.get("/api/users/posts", ({ request }) => {
        const url = new URL(request.url)
        const queryRange = url.searchParams.get('range')
        const range = queryRange || 'last_hour'
        const now = new Date()

        let startTime
        switch (range) {
            case 'last_hour':
                startTime = new Date(now.getTime() - 1 * 60 * 60 * 1000)
                break
            case 'last_24h':
                startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
                break
            case 'last_week':
                startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
                break
            default:
                startTime = new Date(now.getTime() - 1 * 60 * 60 * 1000)
                break
        }

        const filteredPosts = posts.filter((post) => {
            const createdAt = new Date(post.created_at)
            return createdAt >= startTime && createdAt <= now
        })

        return HttpResponse.json({
            message: "success to fetch posts",
            posts: filteredPosts
        })
    })
]
