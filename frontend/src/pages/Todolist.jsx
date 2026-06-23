import { useState } from "react"
import "../css/todolist.css"

export default function ToDoList() {
    const [todos, setTodos] = useState([])
    const [task, setTask] = useState('')

    const addTodo = (e) => {
        e.preventDefault();
        if (!task.trim()) return;

        const newTodo = {
            id : crypto.randomUUID(),
            text: task,
            completed: false
        }

        setTodos([...todos, newTodo])
        setTask('')
    }

    const toggleComplete = (id) => {
        setTodos(todos.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(item => item.id !== id))
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