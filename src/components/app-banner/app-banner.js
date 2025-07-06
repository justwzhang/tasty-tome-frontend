import "./app-banner.scss"
export default function AppBanner(){

    return (
        <div className="app-banner">
            <button className="title-card" onClick={()=>{console.log("test")}}>The Tasty Tome</button>
        </div>
    )
}