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
    const [todoProjects, setTodoProjects] = useState([]);
    const [projectsLoading, setProjectsLoading] = useState(false);
    const [refreshProjects, setRefreshProjects] = useState(0);

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

    // useEffect(() => {
    //     if (!user || !accessToken) return;

    //     setPostsLoading(true);

    //     (async () => {
    //         try {
    //             const response = await fetch("/api/user/posts", {
    //                 headers: {
    //                     Authorization: accessToken,
    //                 },
    //             });

    //             if (!response.ok) {
    //                 throw new Error("Could not load your posts.");
    //             }

    //             const data = await response.json();
    //             setUserPosts(data.posts || []);
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             setPostsLoading(false);
    //         }
    //     })();
    // }, [accessToken, user]);

    useEffect(() => {
        if (!user || !accessToken) return;

        setProjectsLoading(true);

        (async () => {
            try {
                const response = await fetch("/api/user/getuserproject", {
                    headers: {
                        Authorization: accessToken,
                    },
                });

                if (!response.ok) {
                    throw new Error("Could not load projects.");
                }

                const data = await response.json();
                setTodoProjects(data.projects || []);
            } catch (err) {
                console.error(err);
            } finally {
                setProjectsLoading(false);
            }
        })();
    }, [accessToken, user, refreshProjects]);

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
                        Create To Do Project
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
                            if (!todoTitle ) {
                                setTodoError("Title is required.");
                                return;
                            }
                            setTodoLoading(true);
                            try {
                                const res = await fetch("/api/user/createtodoproject", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: accessToken,
                                    },
                                    body: JSON.stringify({ title: todoTitle , description: todoDescription}),
                                });

                                if (!res.ok) {
                                    const err = await res.json().catch(() => ({}));
                                    throw new Error(err.message || "Could not create todo list.");
                                }

                                const data = await res.json();
                                setTodoSuccess("To do project created.");
                                setTodoTitle("");
                                setTodoDescription("");
                                setShowTodoForm(false);
                                setRefreshProjects(prev => prev + 1);
                            } catch (err) {
                                setTodoError(err.message);
                            } finally {
                                setTodoLoading(false);
                            }
                        }}
                    >
                        <div className="todotitlearea">
                            <label>Title</label>
                            <input className="todotitle" value={todoTitle} onChange={e => setTodoTitle(e.target.value)} />
                        </div>
                        <div className="tododescarea">
                            <label>Description</label>
                            <textarea className="tododesc" value={todoDescription} onChange={e => setTodoDescription(e.target.value)} />
                        </div>
                        <div className="todobuttons">
                            <button className="dashboard-button" type="submit" disabled={todoLoading}>{todoLoading ? "Creating..." : "Create"}</button>
                            <button type="button" className="dashboard-button dashboard-button--muted" onClick={() => setShowTodoForm(false)} style={{ marginLeft: 8 }}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="dashboard-card">
                <h2>Your Todo Projects</h2>
                {projectsLoading && <p>Loading projects...</p>}
                {todoProjects.length === 0 && !projectsLoading && (
                    <p>No projects yet. Create one to get started!</p>
                )}
                {todoProjects.length > 0 && (
                    <ul className="projects-list" style={{ listStyle: 'none', padding: 0 }}>
                        {todoProjects.map((project) => (
                            <li key={project.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                <Link
                                    to={`/to_do_list/${project.id}`}
                                    style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}
                                >
                                    {project.title}
                                    {" - "} 
                                    {project.description}
                                </Link>
                                <p style={{ margin: '5px 0 0 0', fontSize: '0.85em', color: '#666' }}>
                                    Created: {new Date(project.created_at).toLocaleDateString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Dashboard;