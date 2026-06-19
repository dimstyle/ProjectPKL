import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import { useAuthStore } from "../stores/authStore";
import "../css/Dashboard.css";

function Dashboard() {
    const accessToken = useAuthStore(state => state.accessToken);
    const user = useAuthStore(state => state.user);
    const setUser = useAuthStore(state => state.setUser);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setLoading(false);
            return;
        }

        (async () => {
            setError("");
            try {
                if (!accessToken) {
                    throw new Error("Please log in to view the dashboard.");
                }

                const response = await fetch("/api/user/profile", {
                    headers: {
                        Authorization: accessToken,
                    },
                });

                if (!response.ok) {
                    throw new Error("Could not load user profile.");
                }

                const userdata = await response.json();
                const currentUser = userdata.user || userdata;
                setUser(currentUser);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [accessToken, setUser, user]);

    useEffect(() => {
        if (!user || !accessToken) return;

        setPostsLoading(true);

        (async () => {
            try {
                const response = await fetch("/api/user/posts", {
                    headers: {
                        Authorization: accessToken,
                    },
                });

                if (!response.ok) {
                    throw new Error("Could not load your posts.");
                }

                const data = await response.json();
                setUserPosts(data.posts || []);
            } catch (err) {
                console.error(err);
            } finally {
                setPostsLoading(false);
            }
        })();
    }, [accessToken, user]);

    if (loading) return <Loading />;
    if (error) return <Error errormessage={error} />;
    if (!user) return <Error errormessage="User data is not available." />;

    return (
        <div className="dashboard-body">
            <div className="dashboard-card">
                <div className="dashboard-card__header">
                    <h1>Welcome, {user.username}</h1>
                    <Link className="dashboard-button" to="/create-post">
                        Create New Post
                    </Link>
                </div>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                {user.id && (
                    <p>
                        <strong>User ID:</strong> {user.id}
                    </p>
                )}
            </div>

            {/* <div className="dashboard-posts">
                <div className="dashboard-posts-header">
                    <h2>Your Posts</h2>
                    {postsLoading && <span>Loading posts...</span>}
                </div>

                {userPosts.length === 0 && !postsLoading ? (
                    <p className="dashboard-empty">No posts yet. Create your first post.</p>
                ) : (
                    userPosts.map((post, index) => (
                        <div key={`${post.title}-${index}`} className="dashboard-post">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <div className="dashboard-post-meta">
                                <span>{post.username}</span>
                                <span>{new Date(post.created_at).toLocaleString()}</span>
                            </div>
                        </div>
                    ))
                )}
            </div> */}
        </div>
    );
}

export default Dashboard;