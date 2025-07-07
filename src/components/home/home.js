import "./home.scss";
import { useState, useMemo } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import RecipeCard from "../recipe-card/recipe-card";
import useStore from "../../store";
export default function Home(){
    const {store} = useStore();
    // const [recipes, setRecipes] = useState(store.recipes);
    const recipesJSX = useMemo(()=>{return store.recipes.map((recipe)=>{return <RecipeCard recipe={recipe}/>})}, store.recipes)
    return(
        <div className="home-background">
            <div className="home-query-bar">
                <div className="inner-container">
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