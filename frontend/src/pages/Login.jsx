import { Link, useNavigate } from 'react-router-dom'
import '../css/login.css'
import { useRef } from 'react'
import { useAuthStore } from '../stores/authStore'
import { User } from 'lucide-react'


function Login(){
    const email = useRef()
    const password = useRef()
    const navigate = useNavigate()
    const { setAccessToken } = useAuthStore()

    const loginAction = async ()=>{
        if(!(email.current || password.current)) return
        if(!(email.current.value || password.current.value)) return

        const loginRequest = {
            email: email.current.value,
            password: password.current.value
        }

   
        try{
            const response = await fetch("/api/auth/login",{
                method : "POST",
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginRequest),
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error(`Gagal! Status: ${response.status}`);
            }
            
            const token = response.headers.get("Authorization")
            setAccessToken(token)
    
            alert("succes to login")
            navigate("/dashboard")
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className="loginbody">
            <div className="logincard">
                <h1 className='h1login'>Login</h1>
                <div className="inputs">
                    <input ref={email} type="text" placeholder="Email"/>
                    <input ref={password} type="password" placeholder="Password" />
                    <button onClick={loginAction}>Login</button>
                    <div>
                        <p>Didn't have an account?</p>
                        <Link to="/registration">Create an account </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login