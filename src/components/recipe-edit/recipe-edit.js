import "./recipe-edit.scss"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUser, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faStar, faUpRightFromSquare, faArrowLeft, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from 'react-router-dom';
import useStore from "../../store";

export default function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { store } = useStore();
    const originalRecipe = store.recipes.find((recipe) => recipe.id === parseInt(id));
    // Local state for editing
    const [paper, setPaper] = useState("lined");
    const [name, setName] = useState(originalRecipe.name);
    const [description, setDescription] = useState(originalRecipe.description);
    const [photosrc, setPhotosrc] = useState(originalRecipe.photosrc);
    const [prepTime, setPrepTime] = useState(originalRecipe.prepTime);
    const [cookTime, setCookTime] = useState(originalRecipe.cookTime);
    const [serves, setServes] = useState(originalRecipe.serves);
    const [raiting, setRaiting] = useState(originalRecipe.raiting);
    const [type, setType] = useState(originalRecipe.type);
    const [link, setLink] = useState(originalRecipe.link);
    const [ingredients, setIngredients] = useState([...originalRecipe.ingredients]);
    const [instructions, setInstructions] = useState([...originalRecipe.instructions]);
    const [note, setNote] = useState(originalRecipe.note);

    // Add/Remove ingredient
    const handleAddIngredient = () => setIngredients([...ingredients, ""]);
    const handleRemoveIngredient = (idx) => setIngredients(ingredients.filter((_, i) => i !== idx));
    const handleIngredientChange = (idx, value) => setIngredients(ingredients.map((item, i) => i === idx ? value : item));

    // Add/Remove instruction
    const handleAddInstruction = () => setInstructions([...instructions, ""]);
    const handleRemoveInstruction = (idx) => setInstructions(instructions.filter((_, i) => i !== idx));
    const handleInstructionChange = (idx, value) => setInstructions(instructions.map((item, i) => i === idx ? value : item));

    // Save handler (stub)
    const handleSave = () => {
        // TODO: Save logic (update store or call API)
        alert("Recipe saved! (implement save logic)");
        navigate("/recipe/" + id);
    };

    return (
        <div className="background">
            <div className="header">
                <button onClick={() => { navigate("/") }}><FontAwesomeIcon className="fa-icon" icon={faArrowLeft} /> Back To Recipes</button>
                <div className="left-aligned">
                    <select onChange={(e) => { setPaper(e.target.value) }} value={paper}>
                        <option value="lined">Lined</option>
                        <option value="graph">Graph</option>
                        <option value="blank">Blank</option>
                    </select>
                    <button onClick={handleSave} style={{marginLeft: 8}}><FontAwesomeIcon className="fa-icon" icon={faPenToSquare} /> Save</button>
                </div>
            </div>
            <div className={`paper ${paper}`}>
                <div className="inner-container">
                    <div className="title-container">
                        <div className="image-container">
                            <img src={photosrc} alt="Recipe" style={{marginBottom: 8}}/>
                            {/* <input type="text" value={photosrc} onChange={e => setPhotosrc(e.target.value)} placeholder="Image URL" style={{width: '100%', marginTop: 8}} /> */}
                        </div>
                        <div className="title-section">
                            <input className="title-card" value={name} onChange={e => setName(e.target.value)} placeholder="Recipe Name" />
                            <textarea className="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" style={{resize: 'vertical'}} />
                            <div className="info-container">
                                <div className="card prep">
                                    <FontAwesomeIcon className="fa-icon" icon={faClock} />
                                    <input className="text" value={prepTime} onChange={e => setPrepTime(e.target.value)} placeholder="Prep Time" />
                                </div>
                                <div className="card cook">
                                    <FontAwesomeIcon className="fa-icon" icon={faClock} />
                                    <input className="text" value={cookTime} onChange={e => setCookTime(e.target.value)} placeholder="Cook Time" />
                                </div>
                                <div className="card serves">
                                    <FontAwesomeIcon className="fa-icon" icon={faUser} />
                                    <input className="text" value={serves} onChange={e => setServes(e.target.value)} placeholder="Serves" />
                                </div>
                                <div className="card raiting">
                                    <FontAwesomeIcon className="fa-icon" icon={faStar} />
                                    <input className="text" type="number" min="0" max="5" value={raiting} onChange={e => setRaiting(e.target.value)} placeholder="Rating" style={{width: 40}} />/5
                                </div>
                                <div className="card type">
                                    <input className="text" value={type} onChange={e => setType(e.target.value)} placeholder="Type" />
                                </div>
                                <div className="card link" style={{display: 'flex', alignItems: 'center'}}>
                                    <FontAwesomeIcon className="fa-icon" icon={faUpRightFromSquare} />
                                    <input className="text" value={link} onChange={e => setLink(e.target.value)} placeholder="Original Link" style={{width: '100%'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-section">
                        <div className="sub-title">Ingredients</div>
                        <ul className="ingredients" style={{gridTemplateColumns: '1fr'}}>
                            {ingredients.map((item, idx) => (
                                <li key={idx} style={{display: 'flex', alignItems: 'center', gap: 8}}>
                                    <input type="text" value={item} onChange={e => handleIngredientChange(idx, e.target.value)} style={{flex: 1}} />
                                    <button type="button" onClick={() => handleRemoveIngredient(idx)} title="Remove ingredient" style={{background: 'none', border: 'none', color: '#d11a2a', fontSize: 18}}><FontAwesomeIcon icon={faTrash} /></button>
                                </li>
                            ))}
                        </ul>
                        <button type="button" onClick={handleAddIngredient} style={{marginTop: 8}}><FontAwesomeIcon icon={faPlus} /> Add Ingredient</button>
                    </div>
                    <div className="main-section">
                        <div className="sub-title">Instructions</div>
                        <ol className="steps">
                            {instructions.map((step, idx) => (
                                <li key={idx} style={{display: 'flex', alignItems: 'center', gap: 8}}>
                                    <textarea value={step} onChange={e => handleInstructionChange(idx, e.target.value)} style={{flex: 1, resize: 'vertical'}} />
                                    <button type="button" onClick={() => handleRemoveInstruction(idx)} title="Remove step" style={{background: 'none', border: 'none', color: '#d11a2a', fontSize: 18}}><FontAwesomeIcon icon={faTrash} /></button>
                                </li>
                            ))}
                        </ol>
                        <button type="button" onClick={handleAddInstruction} style={{marginTop: 8}}><FontAwesomeIcon icon={faPlus} /> Add Step</button>
                    </div>
                    <div className="note">
                        <div className="note-title">Chefs Notes</div>
                        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Notes" style={{width: '100%', resize: 'vertical'}} />
                    </div>
                </div>
            </div>
        </div>
    );
}