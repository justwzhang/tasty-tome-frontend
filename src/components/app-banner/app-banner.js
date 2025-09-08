import "./app-banner.scss"
import { useNavigate } from 'react-router-dom';
export default function AppBanner(){
    const navigate = useNavigate();
    return (
        <div className="app-banner">
            <button className="title-card" onClick={()=>{navigate("/home")}}>The Tasty Tome</button>
        </div>
    )
}