import { Link } from 'react-router-dom'
import '../css/login.css'
import { useRef } from 'react'

function Login(){
    const email = useRef()
    const password = useRef()

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
                body: JSON.stringify(loginRequest)
            })
            if (!response.ok) {
                throw new Error(`Gagal! Status: ${response.status}`);
            }

             alert("succes to login")
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