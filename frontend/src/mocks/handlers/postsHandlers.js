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
    }),

    http.get("/api/users/post/:id", ({ request, params }) => {
        const url = new URL(request.url)
        const userId = Number(params?.id || url.pathname.split('/').pop())

        if (Number.isNaN(userId)) {
            return HttpResponse.json({ message: "Invalid user id" }, { status: 400 })
        }

        const startDateParam = url.searchParams.get('start_date')
        const endDateParam = url.searchParams.get('end_date')
        console.log(posts)

        const filteredPosts = posts
            .filter((post) => post.user_id === userId)
            .filter((post) => {
                if (!startDateParam && !endDateParam) return true

                const createdAt = new Date(post.created_at)
                const startDate = startDateParam ? new Date(`${startDateParam}T00:00:00.000Z`) : null
                const endDate = endDateParam ? new Date(`${endDateParam}T23:59:59.999Z`) : null

                if (startDate && endDate) {
                    return createdAt >= startDate && createdAt <= endDate
                }
                if (startDate) {
                    return createdAt >= startDate
                }
                if (endDate) {
                    return createdAt <= endDate
                }

                return true
            })
            .map((post, index) => ({
                id: index + 1,
                username: post.username,
                title: post.title,
                content: post.content,
                created_at: post.created_at
            }))

        console.log(filteredPosts)

        return HttpResponse.json({
            message: "success to fetch user posts",
            posts: filteredPosts
        })
    })
]
