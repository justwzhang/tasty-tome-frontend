import "./home.scss";
import { useState, useMemo, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPlus, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import RecipeCard from "../recipe-card/recipe-card";
import useStore from "../../store";
import useAuth from "../../auth";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { CATEGORIES } from "../../util/constants/constants";

export default function Home(){
    const navigate = useNavigate();
    const {store} = useStore();
    const [yoursSelected, setYoursSelected] = useState(true);
    const [nameFilter, setNameFilter] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);


    const [type, setType] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [serves, setServes] = useState("");
    const [raiting, setRaiting] = useState("");


    const auth = useAuth();
    let recipes = store.recipes.filter((recipe)=>{
        const isMine = recipe.owner == auth.user.id;
        return (
            ((yoursSelected && isMine) || (!yoursSelected && !isMine)) && // whether it is yours or not
            (recipe.name.toLowerCase().includes(nameFilter.toLowerCase()) || nameFilter == "") && // name filter
            (type == "" || recipe.type == type) && // type filter
            (ingredient == "" || recipe.ingredients.some(ing=>ing.toLowerCase().includes(ingredient.toLowerCase()))) && // ingredient filter
            (prepTime == "" || recipe.prepTime.toLowerCase().includes(prepTime.toLowerCase())) && // prep time filter
            (cookTime == "" || recipe.cookTime.toLowerCase().includes(cookTime.toLowerCase())) && // cook time filter
            (serves == "" || recipe.serves == serves) && // serves filter
            (raiting == "" || recipe.raiting >= raiting) // raiting filter
        )
            
            
    });
    
    let recipesJSX = useMemo(()=>{
        if(recipes.length > 0)
            return recipes.map((recipe)=>{return <RecipeCard recipe={recipe}/>}) 
        else return<></>
    }, [recipes, yoursSelected]);
    return(
        <>
        <div className="home-background">
            <div className="home-query-bar">
                <div className="inner-container">
                    <div className="button-group">
                        <button className={yoursSelected?"selected-left":""} onClick={()=>{setYoursSelected(true)}}> <FontAwesomeIcon icon={faUser} className={"icon" + yoursSelected?"selected":""}/>Yours</button>
                        <button className={!yoursSelected?"selected-right":""} onClick={()=>{setYoursSelected(false)}}> <FontAwesomeIcon icon={faUsers} className={"icon" + !yoursSelected?"selected":""}/>Others</button>
                    </div>
                    <input className="search-bar" placeholder="Search Recipe Names" onChange={(e)=>{setNameFilter(e.target.value)}}/>
                    <div className="button-group">
                        <button onClick={()=>{setFilterOpen(true)}}> <FontAwesomeIcon icon={faFilter} className="icon"/> Filter</button>
                        <button onClick={()=>{navigate("/edit/-1")}}> <FontAwesomeIcon icon={faPlus} className="icon"/> Create</button>
                    </div>

                </div>
               
            </div>
            <div className="home-card-list">
                <div className="inner-container">
                    {recipesJSX}
                </div>
            </div>
        </div>
        <Modal isOpen={filterOpen} onRequestClose={() => setFilterOpen(false)} 
            style={{
                content: {
                    maxWidth: '600px',
                    maxHeight: '500px',
                    height: "90%",
                    width: '90%',
                    margin: 'auto',
                    borderRadius: '10px',
                    padding: '15px',
                },
                overlay: {
                    backgroundColor: 'rgba(0,0,0,0.4)'
                }
            }}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Filter Options</h2>
                        <button onClick={() => setFilterOpen(false)}>X</button>
                    </div>
                    
                    <div className="modal-body">
                        <label>
                            Includes Ingredient:
                            <input type="text" onChange={(e)=>{setIngredient(e.target.value)}}/>
                        </label>
                        <label>
                            Type
                            <select className="text-box" value={type} onChange={e => setType(e.target.value)}>
                                <option value="">Select Category</option>
                                {CATEGORIES.map((cat, idx) => (
                                    <option key={idx} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </label>
                        <div className="two-column">
                            <label>
                                Prep Time
                                <input type="text" onChange={(e)=>{setPrepTime(e.target.value)}}/>
                            </label>
                            <label>
                                Cook Time
                                <input type="text" onChange={(e)=>{setCookTime(e.target.value)}}/>
                            </label>
                            <label>
                                Serves
                                <input type="number" onChange={(e)=>{setServes(e.target.value)}}/>
                            </label>
                            <label>
                                Raiting
                                <input type="number" onChange={(e)=>{setRaiting(e.target.value)}}/>
                            </label>
                        </div>
                    </div>
            
                </div>
            
        </Modal>
        </>
    );
}