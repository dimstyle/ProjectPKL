import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import Loading from "./Loading";
import Error from "./Error";
import "../css/CreatePosts.css";

function CreatePosts() {
    const accessToken = useAuthStore(state => state.accessToken);
    const user = useAuthStore(state => state.user);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [username, setUsername] = useState(user?.username || "");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setUsername(user?.username || "");

        if (!accessToken) {
            setError("Please log in first.");
        } else if (!user) {
            setError("User profile is not loaded. Visit your dashboard first.");
        }

        setLoading(false);
    }, [accessToken, user]);

    const submitPost = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!title.trim() || !content.trim() || !username.trim()) {
            setError("Title, content, and username are required.");
            return;
        }

        try {
            const response = await fetch("/api/user/createpost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: accessToken,
                },
                body: JSON.stringify({ title, content, username }),
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({}));
                throw new Error(errorBody.message || "Failed to create post.");
            }

            setSuccess("Post created successfully.");
            setTitle("");
            setContent("");

            setTimeout(() => {
                navigate("/dashboard");
            }, 700);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <Loading />;
    if (error) return <Error errormessage={error} />;

    return (
        <div className="create-post-body">
            <div className="create-post-card">
                <h1>Create Post</h1>
                <p className="create-post-hint">Use the JSON shape: title, content, username</p>
                <form onSubmit={submitPost} className="create-post-form">
                    <label>
                        Title
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Post title"
                        />
                    </label>
                    <label>
                        Content
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your post content"
                            rows={6}
                        />
                    </label>
                    <label>
                        Username
                        <input type="text" value={username} disabled />
                    </label>
                    <button type="submit">Create Post</button>
                    {success && <p className="success-message">{success}</p>}
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default CreatePosts;
