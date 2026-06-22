import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import { useAuthStore } from "../stores/authStore";
import profileIcon from "../assets/download-removebg-preview.png"
import "../css/Dashboard.css";

function Dashboard() {
    const accessToken = useAuthStore(state => state.accessToken);
    const user = useAuthStore(state => state.user);
    const setUser = useAuthStore(state => state.setUser);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(false);
    const [showTodoForm, setShowTodoForm] = useState(false);
    const [todoTitle, setTodoTitle] = useState("");
    const [todoDescription, setTodoDescription] = useState("");
    const [todoLoading, setTodoLoading] = useState(false);
    const [todoError, setTodoError] = useState("");
    const [todoSuccess, setTodoSuccess] = useState("");

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
                    <img src={profileIcon} alt="icon" />
                    <div className="dashboardinfo">
                        <h1>{user.username}</h1>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    {user.id && (
                        <p>
                            <strong>User ID:</strong> {user.id}
                        </p>
                    )}
                    </div>
                </div>
                <div className="dashboardbuttons">
                    <Link className="dashboard-button" to="/create-post">
                        Create New Post
                    </Link>
                    <button
                        className="dashboard-button dashboard-button--secondary"
                        onClick={() => setShowTodoForm(s => !s)}
                        type="button"
                    >
                        Create To Do List
                    </button>
                </div>
            </div>

            {showTodoForm && (
                <div className="dashboard-card dashboard-todo">
                    <h2>Create To Do List</h2>
                    {todoError && <p className="error">{todoError}</p>}
                    {todoSuccess && <p className="success">{todoSuccess}</p>}
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setTodoError("");
                            setTodoSuccess("");
                            if (!todoTitle || !todoDescription) {
                                setTodoError("Title and description are required.");
                                return;
                            }
                            setTodoLoading(true);
                            try {
                                const res = await fetch("/api/user/createtodolist", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: accessToken,
                                    },
                                    body: JSON.stringify({ user_id: user.id, title: todoTitle, description: todoDescription }),
                                });

                                if (!res.ok) {
                                    const err = await res.json().catch(() => ({}));
                                    throw new Error(err.message || "Could not create todo list.");
                                }

                                const data = await res.json();
                                setTodoSuccess("To do list created.");
                                setTodoTitle("");
                                setTodoDescription("");
                                setShowTodoForm(false);
                            } catch (err) {
                                setTodoError(err.message);
                            } finally {
                                setTodoLoading(false);
                            }
                        }}
                    >
                        <div>
                            <label>Title</label>
                            <input value={todoTitle} onChange={e => setTodoTitle(e.target.value)} />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea value={todoDescription} onChange={e => setTodoDescription(e.target.value)} />
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <button className="dashboard-button" type="submit" disabled={todoLoading}>{todoLoading ? "Creating..." : "Create"}</button>
                            <button type="button" className="dashboard-button dashboard-button--muted" onClick={() => setShowTodoForm(false)} style={{ marginLeft: 8 }}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

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