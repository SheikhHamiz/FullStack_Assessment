import { useState } from "react";
import { useAuth } from "../../auth/authContext";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
    const {login:userLogin, register:userRegister}  =useAuth();
    const [username, setUsername]  = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const handleLoginOrRegister =async (e) => {
        e.preventDefault();
        if(login) {
            if(await userLogin(username, password)) {
                navigate("/");
            } else {
                setErrMsg("Invalid credentials");
            }

        } else {
            if(await userRegister(username, password)) {
                navigate("/");
            } else {
                setErrMsg("Duplicate username");
            }
        }

    }
    return (
        <form  className ="form" onSubmit={(e) => handleLoginOrRegister(e)}>
            <p style={{color:"Red"}}>{errMsg}</p>
            <lable htmlFor="username">Username</lable>
            <input className="title" type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <lable htmlFor="password">Password</lable>
            <input className="title" type="text" name="password" id="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button className="btn btn-save">Submit</button>
            <p style={{textAlign:"center"}} onClick={(e) => setLogin(!login)}>{login ? "Don't have account? register" : "Already have account? Login" }</p>
        </form>
    );
}
export default Login;