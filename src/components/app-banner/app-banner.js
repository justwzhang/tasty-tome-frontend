import "./app-banner.scss"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../auth";
import logo from "../../util/images/tasty-tomes-logo.png"
import { useRef, useState, useEffect } from "react";
export default function AppBanner(){
    const auth = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();
    const accountBtn = <button className="account-button" onClick={()=>{}}><img src={logo}/></button>
    useEffect(() => {
        if (auth.user == null) {
            navigate("/");
        }
    }, [auth.user, navigate]);
    useEffect(() => {
        
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);
    return (
        <div className="app-banner">
            <button className="title-card" onClick={()=>{navigate("/home")}}>The Tasty Tome</button>
             {auth.user != null && (
                <div className="account-dropdown-container" ref={dropdownRef} style={{ position: "relative" }}>
                    <button
                        className="account-button"
                        onClick={() => setShowDropdown((prev) => !prev)}
                        aria-haspopup="true"
                        aria-expanded={showDropdown}
                    >
                        <img src={logo} alt="Account" />
                    </button>
                    {showDropdown && (
                        <div className="account-dropdown-menu">
                            <div className="account-dropdown-item" onClick={()=>{auth.logoutUser()}}>Logout</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}