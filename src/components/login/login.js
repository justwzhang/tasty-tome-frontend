import "./login.scss";
import logo from "../../util/images/tasty-tomes-logo.png"
import { useMemo, useState, useEffect } from "react";
import { useAuth } from "../../auth";
import { SECURITY_QUESTIONS } from "../../util/constants/constants";
import { useParams, useNavigate } from 'react-router-dom';
export default function Login(){
    const auth =  useAuth();
    const navigate = useNavigate();
    const [isLogin, setLogin] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [securityQuestion1, setSecurityQuestion1] = useState("");
    const [securityQuestion2, setSecurityQuestion2] = useState("");
    const [securityAnswer1, setSecurityAnswer1] = useState("");
    const [securityAnswer2, setSecurityAnswer2] = useState("");
    useEffect(() => {
        if (!auth.user == null) {
            navigate("/home");
        }
    }, [auth.user]);
    function handleCreate(){
        let data = {
            firstName: firstName,
            lastName: lastName,
            user: username,
            email: email,
            password: password,
            passwordVerify: confirmPassword,
            answer1: securityAnswer1,
            answer2: securityAnswer2,
            security1: securityQuestion1,
            security2: securityQuestion2
        }

        auth.registerUser(data);
    }
    function handleLogin(){
        let data = {
            password: password,
            email: email
        }
        auth.logInUser(data)
    }

    const securityOptions = useMemo(() =>
        SECURITY_QUESTIONS.map((q, idx) => (
            <option key={idx} value={q}>{q}</option>
        ))
    , []);
    const loginJsx = useMemo(()=>{
        return(
            <>
            <div>
                <div className="welcome">Welcome Back</div>
                <div className="subText">Sign in to access your recipe collection</div>
            </div>
            
            <div className="login-input">
                <label className="login-label">Email</label>
                <input placeholder="" onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="login-input">
                <label className="login-label">Password</label>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <button className="login-button" onClick={()=>{handleLogin()}}>Sign In</button>
            <button className="forgot-password">Forgot Your Password?</button>
            <div className="dont-have-account">
                <div className="dont-have-label">Dont Have an Account?</div>
                <button className="create-account" onClick={()=>{setLogin(false)}}>Create Account</button>
            </div>
            </>
        )
        
    });
    const createJsx = useMemo(()=>{
        return(
            <>
                <div>
                    <div className="welcome">Create Account</div>
                    <div className="subText">Join our community of food lovers</div>
                </div>
                <div className="name-group">
                    <div className="login-input">
                        <label className="login-label">First Name</label>
                        <input placeholder="" onChange={(e)=>{setFirstName(e.target.value)}}/>
                    </div>
                    <div className="login-input">
                        <label className="login-label">Last Name</label>
                        <input placeholder="" onChange={(e)=>{setLastName(e.target.value)}}/>
                    </div>
                    <div className="login-input">
                        <label className="login-label">Username</label>
                        <input placeholder="" onChange={(e)=>{setUsername(e.target.value)}}/>
                    </div>
                </div>
                <div className="login-input create">
                    <label className="login-label" >Email</label>
                    <input placeholder="" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="login-input create">
                    <label className="login-label">Password</label>
                    <input placeholder="" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="login-input create">
                    <label className="login-label">Confirm Password</label>
                    <input placeholder="" type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                </div>
                <div className="login-input create">
                    <label className="login-label" htmlFor="security-question-1">Security Question 1</label>
                    <select id="security-question-1" className="security-select" onChange={(e)=>{setSecurityQuestion1(e.target.value)}}>
                        <option value="">Select a question...</option>
                        {securityOptions}
                    </select>
                    <input className="security-answer" placeholder="Your Answer" type="text" onChange={(e)=>{setSecurityAnswer1(e.target.value)}}/>
                </div>
                <div className="login-input create">
                    <label className="login-label" htmlFor="security-question-2">Security Question 2</label>
                    <select id="security-question-2" className="security-select" onChange={(e)=>{setSecurityQuestion2(e.target.value)}}>
                        <option value="">Select a question...</option>
                        {securityOptions}
                    </select>
                    <input className="security-answer" placeholder="Your Answer" type="text" onChange={(e)=>{setSecurityAnswer2(e.target.value)}}/>
                </div>
                <div className="login-input create btn-group">
                    <button className="create-account-btn-type" onClick={()=>{setLogin(true)}}>Login</button>
                    <button className="create-account-btn-type" onClick={()=>{handleCreate()}}>Create</button>
                </div>
            </>
        )
    })
    return (
    <div className="background">
        <div className="login-center-container">
            <div className="login-left">
                <img src={logo}/>
            </div>
            <div className="login-right">
                {isLogin?loginJsx:createJsx}
                
            </div>
        </div>
    </div>
    );
}