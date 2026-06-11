import Navbar from '../components/navbar'
import UserCard from '../components/userCard'
import { useState} from "react";
import "../App.css"

function Home(){
    

    const users = [
    {id: 1, name: 'Dimas Hytam', email: 'dimhytam1945@gmail.com'},
    {id: 2, name: 'Dimas Coklat', email: 'dimhytam1955@gmail.com'},
    {id: 3, name: 'Dimas Abu-abu', email: 'dimhytam1965@gmail.com'}
    ]

    const [search, setSearch] = useState('');

    const filtereduser = users.filter((user) => user.name.toLowerCase().includes(search.toLocaleLowerCase()))

    return (
        <>
            <Navbar search={search} setSearch={setSearch}></Navbar>
            <main>
                <div className='userlist'>{filtereduser.length > 0 ? (filtereduser.map((user) => (
                <UserCard key={user.id} name={user.name} email={user.email}/>
                ))) : ( <div className='notfound'><h1>No user found.</h1></div> )}
                </div>
            </main>
        </>
    )
}

export default Home;