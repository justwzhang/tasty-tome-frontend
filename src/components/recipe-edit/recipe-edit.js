import "./recipe-edit.scss"
import { useState, useMemo } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUser,faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faStar, faUpRightFromSquare, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import useStore from "../../store";
export default function EditRecipe(){
    const {id} = useParams();
    const navigate = useNavigate();
    const {store} = useStore();
    const [paper, setPaper] = useState("lined");
    const recipe = useMemo(()=>{return store.recipes.filter((recipe)=>{return recipe.id === parseInt(id)})[0]}, store.recipes);
    const ingredientsJSX = useMemo(()=>{ return recipe.ingredients.map((item)=>{return <li>{item}</li>})}, [recipe.ingredients]); // creates all the instructions for recipe
    const instructionsJSX = useMemo(()=>{ return recipe.instructions.map((step)=>{return <li>{step}</li>})}, [recipe.instructions]); // creates all the instructions for recipe
    return (
    <div className="background">
        <div className="header">
            <button onClick={()=>{navigate("/")}}><FontAwesomeIcon className="fa-icon" icon={faArrowLeft} /> Back To Recipes</button>
            <div className="left-aligned">
                <select onChange={(e)=>{ setPaper(e.target.value) }}>
                    <option value="lined" selected={paper=="lined"?true:false}>Lined</option>
                    <option value="graph" selected={paper=="graph"?true:false}>Graph</option>
                    <option value="blank" selected={paper=="blank"?true:false}>Blank</option>
                </select>
                <button onClick={()=>{navigate("/edit/"+id)}}><FontAwesomeIcon className="fa-icon" icon={faPenToSquare}/></button>
            </div>
            
        </div>
        <div className={`paper ${paper}`}>
            <div className="inner-container">
                <div class="title-container">
                    <div className="title-container">
                        <div className="image-container">
                            <img src={recipe.photosrc}/>
                        </div>
                        <div className="title-section">
                            <div className="title-card">{recipe.name}</div>
                            <div className="description">{recipe.description}</div>
                            <div className="info-container">
                                <div className="card prep">
                                    <FontAwesomeIcon className="fa-icon" icon={faClock} />
                                    <div className="text">Prep: {recipe.prepTime}</div>
                                </div>
                                <div className="card cook">
                                    <FontAwesomeIcon className="fa-icon" icon={faClock} />
                                    <div className="text">Cook: {recipe.cookTime}</div>
                                </div>
                                <div className="card serves">
                                    <FontAwesomeIcon className="fa-icon" icon={faUser} />
                                    <div className="text">Serves {recipe.serves}</div>
                                </div>
                                <div className="card raiting">
                                    <FontAwesomeIcon className="fa-icon" icon={faStar} />
                                    <div className="text">{recipe.raiting}/5</div>
                                </div>
                                <div className="card type">
                                    <div className="text">{recipe.type}</div>
                                </div>
                                <a className="card link" href={recipe.link} target="_">
                                    <FontAwesomeIcon className="fa-icon" icon={faUpRightFromSquare} />
                                    <div className="text">Original Link</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    
    )
}