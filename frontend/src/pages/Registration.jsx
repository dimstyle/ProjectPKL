import '../css/registration.css'
import { useRef } from 'react'

function Registration(){
    const username = useRef()
    const email = useRef()
    const password = useRef()

    const signupAction = async ()=>{
        if (!(username.current || email.current || password.current)) return

        if (!(username.current.value || email.current.value || password.current.value)) return

        const registrationRequest = {
            username : username.current.value,
            email: email.current.value,
            password: password.current.value    
        }

        try{    
            const res = await fetch("/api/auth/registration",{
                method : "POST",
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationRequest)
            })
            
            if (!res.ok) {
                throw new Error(`Gagal! Status: ${res.status}`);
            }

            alert("succes to create user")
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className="registrationBody">
            <div className="regiscard">
                <h1>Register</h1>
                <div className="inputs">
                    <input ref={username} type="text" placeholder="username"/>
                    <input ref={email} type="text" placeholder="email"/>
                    <input ref={password} type="password" placeholder="password"/>
                    <button onClick={signupAction}>Sign up</button>
                    <div>
                        <p>Already have an account?</p>
                        <a href="/My-first-php/page/login.php">Log In</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration