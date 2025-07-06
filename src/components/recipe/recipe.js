import { useState, useMemo } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUser,faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faStar, faUpRightFromSquare, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./recipe.scss"
export default function Recipe(){
    const [paper, setPaper] = useState("lined");
    const [recipe, setRecipe] = useState({
        name:"Creamy Tuscan Chicken",
        description:"Rich and creamy chicken with sun-dried tomatoes and spinach",
        note:"For best results, use room temperature heavy cream to prevent curdling. You can substitute spinach with kale if preferred.",
        prepTime:"15 min",
        cookTime:"30min",
        serves: 4,
        raiting: 4.8,
        link:"https://www.google.com/",
        type:"Main Course",
        ingredients: [
            "4 boneless chicken breasts",
            "2 tbsp olive oil",
            "3 cloves garlic, minced",
            "1 cup heavy cream",
            "1/2 cup sun-dried tomatoes, chopped",
            "2 cups fresh spinach",
            "1/2 cup parmesan cheese, grated",
            "1 tsp Italian seasoning",
            "Salt and pepper to taste"
        ],
        instructions: [
            "Season chicken breasts with salt, pepper, and Italian seasoning.",
            "Heat olive oil in a large skillet over medium-high heat.",
            "Cook chicken breasts for 6-7 minutes per side until golden brown and cooked through. Remove and set aside.",
            "In the same skillet, add minced garlic and cook for 1 minute until fragrant.",
            "Pour in heavy cream and bring to a gentle simmer.",
            "Add sun-dried tomatoes and let simmer for 2-3 minutes.",
            "Add spinach and cook until wilted.",
            "Stir in parmesan cheese until melted and sauce is creamy.",
            "Return chicken to the skillet and coat with the creamy sauce.",
            "Serve immediately with pasta or rice."
        ],
    });
    const ingredientsJSX = useMemo(()=>{ return recipe.ingredients.map((item)=>{return <li>{item}</li>})}, [recipe.ingredients]); // creates all the instructions for recipe
    const instructionsJSX = useMemo(()=>{ return recipe.instructions.map((step)=>{return <li>{step}</li>})}, [recipe.instructions]); // creates all the instructions for recipe

    return (
        <div className="background">
            <div className="header">
                <button><FontAwesomeIcon className="fa-icon" icon={faArrowLeft} /> Back To Recipes</button>
                <div className="left-aligned">
                    <select onChange={(e)=>{
                        console.log(e)
                        setPaper(e.target.value)
                        }}>
                        <option value="lined" selected={paper=="lined"?true:false}>Lined</option>
                        <option value="graph" selected={paper=="graph"?true:false}>Graph</option>
                        <option value="blank" selected={paper=="blank"?true:false}>Blank</option>
                    </select>
                    <button><FontAwesomeIcon className="fa-icon" icon={faPenToSquare}/></button>
                </div>
                
            </div>
            <div className={`paper ${paper}`}>
                <div className="inner-container">
                    <div className="title-container">
                        <div className="image-container">
                            <img src="test"/>
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
                    
                    <div className="main-section">
                        <div className="sub-title">Ingredients</div>
                        <ul className="ingredients">
                            {ingredientsJSX}
                        </ul>
                    </div>

                    <div className="main-section">
                        <div className="sub-title">Instructions</div>
                        <ol className="steps">
                            {instructionsJSX}
                        </ol>
                    </div>
                    {
                    <div className="note">
                        <div className="note-title">Chefs Notes</div>
                        <div> {recipe.note}</div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

