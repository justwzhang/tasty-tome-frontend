import "./home.scss";
import { useState, useMemo, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPlus, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import RecipeCard from "../recipe-card/recipe-card";
import useStore from "../../store";
import useAuth from "../../auth";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    const {store} = useStore();
    const [yoursSelected, setYoursSelected] = useState(true);
    const auth = useAuth();
    // const [recipes, setRecipes] = useState(store.recipes);
    const recipesJSX = useMemo(()=>{return store.recipes.map((recipe)=>{return <RecipeCard recipe={recipe}/>})}, store.recipes)
    return(
        <div className="home-background">
            <div className="home-query-bar">
                <div className="inner-container">
                    <div className="button-group">
                        <button className={yoursSelected?"selected-left":""} onClick={()=>{setYoursSelected(true)}}> <FontAwesomeIcon icon={faUser} className={"icon" + yoursSelected?"selected":""}/>Yours</button>
                        <button className={!yoursSelected?"selected-right":""} onClick={()=>{setYoursSelected(false)}}> <FontAwesomeIcon icon={faUsers} className={"icon" + !yoursSelected?"selected":""}/>Others</button>
                    </div>
                    <input className="search-bar" placeholder="Search Recipe Names"/>
                    <div className="button-group">
                        <button> <FontAwesomeIcon icon={faFilter} className="icon"/> Filter</button>
                        <button> <FontAwesomeIcon icon={faPlus} className="icon"/> Create</button>
                    </div>

                </div>
               
            </div>
            <div className="home-card-list">
                <div className="inner-container">
                    {recipesJSX}
                </div>
            </div>
        </div>
    );
}