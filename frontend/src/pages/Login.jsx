import { Link } from 'react-router-dom'
import '../css/login.css'

function Login(){
    return(
        <div class="loginbody">
            <div class="logincard">
                <h1>Login</h1>
                <div class="inputs" method="post" action="/My-first-php/services/auth.php">
                    <input type="hidden" name="form_type" value="login" />
                    <input name="nama" type="text" placeholder="Nama"/>
                    <input name="password" type="password" placeholder="Password" />
                    <button type="submit">Login</button>
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