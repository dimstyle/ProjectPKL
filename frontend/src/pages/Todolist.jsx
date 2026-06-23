import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAuthStore } from "../stores/authStore"
import "../css/todolist.css"

export default function ToDoList() {
    const { projectId } = useParams()
    const { accessToken } = useAuthStore(state => state.accessToken)
    const [todos, setTodos] = useState([])
    const [task, setTask] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [refreshTodos, setRefreshTodos] = useState(0)

    // Fetch todos for this project
    useEffect(() => {
        if (!projectId || !accessToken || !user) return

        (async () => {
            setLoading(true)
            setError("")
            try {
                const res = await fetch(`/api/user/gettodolist?project_id=${projectId}`, {
                    headers: { Authorization: accessToken }
                })
                if (!res.ok) throw new Error("Failed to fetch todos")
                const data = await res.json()
                setTodos(data.todos || [])
            } catch (err) {
                setError(err.message)
                console.error(err)
            } finally {
                setLoading(false)
            }
        })()
    }, [projectId, accessToken, refreshTodos])

    const addTodo = (e) => {
        e.preventDefault()
        if (!task.trim()) return

        if (!accessToken) {
            setError("Please log in to add todos")
            return
        }

        (async () => {
            try {
                const res = await fetch("/api/user/createtodolist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: accessToken,
                    },
                    body: JSON.stringify({
                        projectid: Number(projectId),
                        title: task,
                        description: task,
                        completed: false,
                    }),
                })
                if (!res.ok) throw new Error((await res.json()).message || "Failed to create todo")
                const data = await res.json()
                setTodos([...todos, data.todo])
                setTask("")
            } catch (err) {
                setError(err.message)
                console.error(err)
            }
        })()
    }

    const toggleComplete = (id) => {
        const item = todos.find((t) => t.id === id)
        if (!item) return

        (async () => {
            try {
                const res = await fetch("/api/user/updatetodo", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: accessToken,
                    },
                    body: JSON.stringify({ id, completed: !item.completed }),
                })
                if (!res.ok) throw new Error("Failed to update todo")
                const data = await res.json()
                setTodos(todos.map((t) => (t.id === id ? data.todo : t)))
            } catch (err) {
                console.error(err)
            }
        })()
    }

    const deleteTodo = (id) => {
        (async () => {
            try {
                const res = await fetch("/api/user/deletetodo", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: accessToken,
                    },
                    body: JSON.stringify({ id }),
                })
                if (!res.ok) throw new Error("Failed to delete todo")
                setTodos(todos.filter((item) => item.id !== id))
            } catch (err) {
                console.error(err)
            }
        })()
    }

    return (
        <>
            <div className="todobody">
                <h1 className="todoh1">My to do list</h1>
                <form onSubmit={addTodo} className="todoform">
                    <input type="text" placeholder="Add new task..." value={task} onChange={(e) => setTask(e.target.value)} />
                    <button type="submit">Add</button>
                </form>
                <ul className="todolist">
                    {todos.map((item) => (
                        <li key={item.id} className={item.completed ? 'completed' : ''}>
                            <div className="todocontent" onClick={() => toggleComplete(item.id)}>
                                <span className={`checkmark ${item.completed ? 'checked' : ''}`}>
                                    {item.completed ? '✓' : ''}
                                </span>
                                <span className="texttask" onClick={() => toggleComplete(item.id)}>
                                    {item.text}
                                </span>
                            </div>
                            <button onClick={() => deleteTodo(item.id)} className="tododeletebtn">
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}