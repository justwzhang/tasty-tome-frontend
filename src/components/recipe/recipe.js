import "./recipe.scss"
import { useState, useMemo } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUser,faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faStar, faUpRightFromSquare, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth";
import useStore from "../../store";
import Modal from "react-modal";
export default function Recipe(){
    const {id} = useParams();
    const navigate = useNavigate();
    const auth = useAuth();
    const {store} = useStore();
    const [paper, setPaper] = useState("graph");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    console.log(store.recipes)
    const recipe = useMemo(()=>{return store.recipes.filter((recipe)=>{return recipe._id === id})[0]}, store.recipes);
    if(auth.user && auth.user.id != recipe.owner && !recipe.published){
        navigate("/home");
    }
    const ingredientsJSX = useMemo(()=>{ return recipe.ingredients.map((item)=>{return <li>{item}</li>})}, [recipe.ingredients]); // creates all the instructions for recipe
    const instructionsJSX = useMemo(()=>{ return recipe.instructions.map((step)=>{return <li>{step}</li>})}, [recipe.instructions]); // creates all the instructions for recipe

    function publish(){
        recipe.published = true;
        store.saveRecipe(recipe);
    }

    return (
        <>
        <div className="background">
            <div className="header">
                <button onClick={()=>{navigate("/home")}}><FontAwesomeIcon className="fa-icon" icon={faArrowLeft} /> Back To Recipes</button>
                <div className="left-aligned">
                    {auth.user && auth.user.id == recipe.owner?
                    <>
                        <button className="delete" onClick={()=>{setDeleteModalOpen(true)}}>Delete</button>
                        {!recipe.published?
                        <button className="publish" onClick={()=>{publish()}}>Publish</button>:<></>
                        }
                    </>
                    :<></>
                    }
                    <select onChange={(e)=>{ setPaper(e.target.value) }}>
                        <option value="lined" selected={paper=="lined"?true:false}>Lined</option>
                        <option value="graph" selected={paper=="graph"?true:false}>Graph</option>
                        <option value="blank" selected={paper=="blank"?true:false}>Blank</option>
                    </select>
                    {auth.user && auth.user.id == recipe.owner?
                    <button onClick={()=>{navigate("/edit/"+id)}}><FontAwesomeIcon className="fa-icon" icon={faPenToSquare}/></button>:<></>}
                </div>
                
            </div>
            <div className={`paper ${paper}`}>
                <div className="inner-container">
                    <div className="title-container">
                        {/* <div className="image-container">
                            <img src={recipe.photosrc}/>
                        </div> */}
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
        <Modal
            isOpen={deleteModalOpen}
            nRequestClose={() => setDeleteModalOpen(false)} 
            style={{
                content: {
                    maxWidth: '600px',
                    maxHeight: '200px',
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
                    <h2>Are You Sure?</h2>
                    <button onClick={() => setDeleteModalOpen(false)}>X</button>
                </div>
                 <div className="modal-body">
                    This is Perminent!
                    {/* <div className="button-group"> */}
                    <div className="modal-button-group">
                        <button className="delete-confirm" onClick={()=>{
                            store.deleteRecipe(recipe._id);
                            navigate("/home");
                        }}>Delete</button>
                        <button className="cancel" onClick={()=>{setDeleteModalOpen(false)}}>Cancel</button>
                    </div>
                        
                    {/* </div> */}
                 </div>
            </div>
        </Modal>
        </>
    )
}

