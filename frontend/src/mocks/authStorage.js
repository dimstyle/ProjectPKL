let registeredUsers = [
    { id: 1, email: "dummy1@gmail.com", password: "pass1", username: "dummy1" },
    { id: 2, email: "dummy2@gmail.com", password: "pass2", username: "dummy2" }
]

function addUser({ email, password, username }) {
    const exists = registeredUsers.find(u => u.email === email)
    if (exists) return null
    const id = registeredUsers.length ? Math.max(...registeredUsers.map(u => u.id)) + 1 : 1
    const user = { id, email, password, username: username || `user${id}` }
    registeredUsers.push(user)
    return user
}

function findByEmailAndPassword(email, password) {
    return registeredUsers.find(u => u.email === email && u.password === password) || null
}

function getById(id) {
    return registeredUsers.find(u => u.id === id) || null
}

export { registeredUsers, addUser, findByEmailAndPassword, getById }
