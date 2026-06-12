import Navbar from '../components/navbar'
import UserCard from '../components/userCard'
import { useEffect, useState} from "react";
import "../App.css"

function Home(){
    

    // const users = [
    // {id: 1, name: 'Dimas Hytam', email: 'dimhytam1945@gmail.com'},
    // {id: 2, name: 'Dimas Coklat', email: 'dimhytam1955@gmail.com'},
    // {id: 3, name: 'Dimas Abu-abu', email: 'dimhytam1965@gmail.com'}
    // ]
    const [users,setUsers] = useState([]) //list of users
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState('');

    useEffect(()=>{
        (async()=>{
            try{
                const response = await fetch("/api/user/list")
                console.log(response)
                if(!response.ok){
                    throw new Error("users not found")
                }

                const usersdata = await response.json(); //list of users
                console.log(usersdata)
                setUsers(usersdata.users)
            }catch(error){
                setError(error.message) 
            }finally{
                setLoading(false)
            }
        })()
    },[])


    // const filtereduser = users.filter((user) => user.name.toLowerCase().includes(search.toLocaleLowerCase()))
    
    if(loading) return (<h1>Loading</h1>)

    if(error) return (<h1>error</h1>)

    return (
        <>
            <Navbar search={search} setSearch={setSearch}></Navbar>
            <main>
                {/* <div className='userlist'>{filtereduser.length > 0 ? (filtereduser.map((user) => (
                <UserCard key={user.id} name={user.name} email={user.email}/>
                ))) : ( <div className='notfound'><h1>No user found.</h1></div> )}
                </div> */}
                <div className='userlist'>
                    {users.length > 0? users.map(user => (
                        <UserCard key={user.id} name={user.Username} email={user.Email} />
                    )) : ( <div className='notfound'><h1>No user found.</h1></div> ) }
                </div>
            </main>
        </>
    )
}

export default Home;