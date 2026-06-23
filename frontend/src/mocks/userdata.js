const userProfile = [
    {user: {id: 1, username: "dummy1", email: "dummy1@gmail.com", age:1945,  skin: "none"}},
    {user: {id: 2, username: "dummy2", email: "dummy2@gmail.com", age:1899 , skin: "unknown"}},
    {user:{id: 3, username: "dummy3", email: "dummy3@gmail.com", age:1511 , skin: "dimas"}}
]

const posts = [
    {
        user_id: 1,
        username :"unknown",
        title: "Post within the last hour",
        content: "This post was created less than one hour ago and should appear only in the last_hour range.",
        created_at: "2026-06-17T13:45:00.000Z"
    },
    {
        user_id: 2,
        username :"unknown",
        title: "Post within the last 24 hours",
        content: "This post was created earlier today and should appear in last_24h and last_week ranges.",
        created_at: "2026-06-17T05:30:00.000Z"
    },
    {
        user_id: 3,
         username :"unknown",
        title: "Post from two days ago",
        content: "This post is older than 24 hours but still within the last week.",
        created_at: "2026-06-15T11:20:00.000Z"
    },
    {
        user_id: 1,
         username :"unknown",
        title: "Post from five days ago",
        content: "This post is within the last week and will show up only for last_week.",
        created_at: "2026-06-12T09:10:00.000Z"
    },
    {
        user_id: 2,
         username :"unknown",
        title: "Older post beyond last week",
        content: "This post is older than seven days and should not show in any current filter.",
        created_at: "2026-06-08T14:00:00.000Z"
    }
]
const posts_data = [
    { id: 1, name: "Chicken on the road", date: "2026-06-01"},
    { id: 2, name: "A man killed in action", date: "2026-06-05"},
    { id: 3, name: "Plane crashing again at twin tower", date: "2026-06-10"},
    { id: 4, name: "Dimas got knock out by cockroaches", date: "2026-06-15"},
    { id: 5, name: "Gunner unconsious!", date: "2026-06-17"}
]


export { userProfile, posts, posts_data}