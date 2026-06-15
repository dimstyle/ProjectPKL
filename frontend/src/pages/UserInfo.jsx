import { useParams } from "react-router-dom"
import "../css/userinfo.css"

export default function UserInfo() {
    const userData = {
        '1' : { name: 'Hytam', email: 'Hytam@gmail.com', age: '1945', skin: 'black'},
        '2' : { name: 'Putyh', email: 'Putyh@gmail.com', age: '1899', skin: 'white'},
        '3' : { name: 'Abu-abu', email: 'Abu-abu@gmail.com', age: '1511', skin: 'warna-warni'}
    }
    const { userId } = useParams();
    const user = userData[userId]
    return (
        <>
            <div className="userinfo">
                <h1>User Info</h1>
                <p>name: {user.name}</p>
                <p>email: {user.email}</p>
                <p>age: {user.age}</p>
                <p>skin: {user.skin}</p>
            </div>
        </>
    )
}