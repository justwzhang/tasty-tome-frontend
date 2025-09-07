import "./login.scss";
import logo from "../../util/images/tasty-tomes-logo.png"
import { useMemo, useState } from "react";
import { SECURITY_QUESTIONS } from "../../util/constants/constants";
export default function Login(){
    const [isLogin, setLogin] = useState(true);
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
                <label className="login-label">Username</label>
                <input placeholder=""/>
            </div>
            <div className="login-input">
                <label className="login-label">Password</label>
                <input type="password"/>
            </div>
            <button className="login-button">Sign In</button>
            <button className="forgot-password">Forgot Your Password?</button>
            <div className="dont-have-account">
                <div className="dont-have-label">Dont Have an Account?</div>
                <button className="create-account" onClick={()=>{setLogin(false)}}>Create Account</button>
            </div>
            </>
        )
        
    },[]);
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
                        <input placeholder=""/>
                    </div>
                    <div className="login-input">
                        <label className="login-label">Last Name</label>
                        <input placeholder=""/>
                    </div>
                </div>
                <div className="login-input create">
                    <label className="login-label">Email</label>
                    <input placeholder=""/>
                </div>
                <div className="login-input create">
                    <label className="login-label">Password</label>
                    <input placeholder="" type="password"/>
                </div>
                <div className="login-input create">
                    <label className="login-label">Confirm Password</label>
                    <input placeholder="" type="password"/>
                </div>
                <div className="login-input create">
                    <label className="login-label" htmlFor="security-question-1">Security Question 1</label>
                    <select id="security-question-1" className="security-select">
                        <option value="">Select a question...</option>
                        {securityOptions}
                    </select>
                    <input className="security-answer" placeholder="Your Answer" type="text" />
                </div>
                <div className="login-input create">
                    <label className="login-label" htmlFor="security-question-2">Security Question 2</label>
                    <select id="security-question-2" className="security-select">
                        <option value="">Select a question...</option>
                        {securityOptions}
                    </select>
                    <input className="security-answer" placeholder="Your Answer" type="text" />
                </div>
                <div className="login-input create btn-group">
                    <button className="create-account-btn-type" onClick={()=>{setLogin(true)}}>Login</button>
                    <button className="create-account-btn-type">Create</button>
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