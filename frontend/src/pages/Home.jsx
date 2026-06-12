import Navbar from '../components/navbar'
import UserCard from '../components/userCard'
import Error from './Error';
import Loading from './Loading';
import { useEffect, useState} from "react";
import "../App.css"

function Home(){
    

    // const users = {
    //     message : "succes to fetch user",
    //     users : [
    //         {id: 1,Username: 'Dimas Hytam', Email: 'dimhytam1945@gmail.com'},
    //         {id: 2,Username: 'Dimas Coklat', Email: 'dimhytam1955@gmail.com'},
    //         {id: 3,Username: 'Dimas Abu-abu', Email: 'dimhytam1965@gmail.com'}
    // ]}

    //     const users = [
    //         {id: 1,Username: 'Dimas Hytam', Email: 'dimhytam1945@gmail.com'},
    //         {id: 2,Username: 'Dimas Coklat', Email: 'dimhytam1955@gmail.com'},
    //         {id: 3,Username: 'Dimas Abu-abu', Email: 'dimhytam1965@gmail.com'}
    // ]

    const [users,setUsers] = useState([]) //list of users
    const [filteredUser, setFilteredUser] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState('');

    useEffect(()=>{
        (async()=>{
            setError("")
            try{
                const response = await fetch("/api/user/list")

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
        setLoading(false)
    },[])

    useEffect(()=>{
        const users_before_filtered = users;
        const filtered_user = users_before_filtered.filter( user => (new RegExp(search.toLowerCase()).test(user.Username.toLowerCase())))
        setFilteredUser(filtered_user)

    },[search])

    
    if(loading) return (<Loading />)

    if(error) return (<Error />)

    return (
        <>
            <Navbar search={search} setSearch={setSearch}></Navbar>
            <main>
                <div className='userlist'>
                    {filteredUser.length > 0? filteredUser.map(user => (
                        <UserCard key={user.id} name={user.Username} email={user.Email} />
                    )) : ( <div className='notfound'><h1>No user found.</h1></div> ) }
                </div>
            </main>
        </>
    )
}

export default Home;