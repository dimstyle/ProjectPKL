import Navbar from '../components/navbar'
import UserCard from '../components/userCard'
import Error from './Error';
import Loading from './Loading';
import { useEffect, useState} from "react";
import "../App.css"
import { useAuthStore } from '../stores/authStore';

function Home(){

    const [users,setUsers] = useState([]) //list of users
    const [filteredUser, setFilteredUser] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState('');

    useEffect(()=>{
        (async()=>{
            setError("")
            try{
                const response = await fetch("/api/users/profiles")  

                if(!response.ok){
                    throw new Error("users not found")
                }

                const usersdata = await response.json(); //list of users
               
                setFilteredUser(usersdata.users)        
                setUsers(usersdata.users)
            }catch(error){
                setError(error.message) 
            }finally{
                setLoading(false)
            }
        })()
    },[])

    useEffect(()=>{
        const users_before_filtered = users;
        const filtered_user = users_before_filtered.filter( user => (new RegExp(search.toLowerCase()).test(user.username.toLowerCase())))
        setFilteredUser(filtered_user)
        
    },[search])

    
    if(loading) return (<Loading />)

    if(error) return (<Error />)

    return (
        <>
            <div className='home'>
                <Navbar search={search} setSearch={setSearch}></Navbar>
            <main>
                <div className='userlist'>
                    {filteredUser.length > 0? filteredUser.map(user => (
                        <UserCard id={user.id} name={user.username} email={user.email} />
                    )) : ( <div className='notfound'><h1>No user found.</h1></div> ) }
                </div>
            </main>
            </div>
        </>
    )
}

export default Home;