import "./recipe-edit.scss"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUser, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faStar, faUpRightFromSquare, faArrowLeft, faPlus, faTrash, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from 'react-router-dom';
import useStore from "../../store";
import useAuth from "../../auth";
import { CATEGORIES } from "../../util/constants/constants";
export default function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const auth = useAuth();
    const { store } = useStore();
    let originalRecipe = store.recipes.length>0?store.recipes.find((recipe) => recipe._id === id):null;
    if (!originalRecipe) {
        originalRecipe = {
            name: "",
            description: "",
            // photosrc: "",
            prepTime: "",
            cookTime: "",
            serves: "",
            raiting: "",
            type: "",
            link: "",
            ingredients: [],
            instructions: [],
            note: ""
        };
    }
    // Local state for editing
    const [paper, setPaper] = useState("graph");
    const [name, setName] = useState(originalRecipe.name);
    const [description, setDescription] = useState(originalRecipe.description);
    // const [photosrc, setPhotosrc] = useState(originalRecipe.photosrc);
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

    // Save handler
    const handleSave = () => {
        let servesInt = parseInt(serves, 10);
        let raitingFloat = parseFloat(raiting);
        if (isNaN(servesInt)) servesInt = 0;
        if (isNaN(raitingFloat)) raitingFloat = 0;
        const recipe = {
            // id: id,
            published:originalRecipe.published,
            name,
            description,
            prepTime,
            cookTime,
            serves: servesInt,
            raiting: raitingFloat,
            type,
            link,
            ingredients,
            instructions,
            note,
            owner: auth.user.id 
        };
        console.log(recipe)
        if (id === "-1") {
            store.createRecipe(recipe);
        } else {
            recipe._id = id;
            store.saveRecipe(recipe);
        }
        // navigate("/view/" + id);
    };

    return (
        <div className="background">
            <div className="header">
                <button onClick={() => { navigate("/home") }}><FontAwesomeIcon className="fa-icon" icon={faArrowLeft} /> Back To Recipes</button>
                <div className="left-aligned">
                    <select onChange={(e) => { setPaper(e.target.value) }} value={paper}>
                        <option value="lined">Lined</option>
                        <option value="graph">Graph</option>
                        <option value="blank">Blank</option>
                    </select>
                    <button onClick={handleSave} style={{marginLeft: 8}}><FontAwesomeIcon className="fa-icon" icon={faFloppyDisk} /></button>
                </div>
            </div>
            <div className={`paper ${paper}`}>
                <div className="inner-container">
                    <div className="title-container">
                        
                        <div className="title-section">
                            <label className="edit-recipe-label">
                                Title
                                <input className="title-card text-box" value={name} onChange={e => setName(e.target.value)} placeholder="Recipe Name" />
                            </label>
                            <label className="edit-recipe-label">
                                Description
                                <textarea className="description text-box" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" style={{resize: 'vertical'}} />
                            </label>
                            <div className="tag-edits">
                                <label className="edit-recipe-label prep">
                                    {/* <FontAwesomeIcon className="fa-icon" icon={faClock} /> */}
                                    Prep Time
                                    <input className="text-box" value={prepTime} onChange={e => setPrepTime(e.target.value)} placeholder="Prep Time" />
                                </label>
                                <label className="edit-recipe-label cook">
                                    Cook Time
                                    {/* <FontAwesomeIcon className="fa-icon" icon={faClock} /> */}
                                    <input className="text-box" value={cookTime} onChange={e => setCookTime(e.target.value)} placeholder="Cook Time" />
                                </label>
                                <label className="edit-recipe-label serves">
                                    Serves
                                    {/* <FontAwesomeIcon className="fa-icon" icon={faUser} /> */}
                                    <input className="text-box" type="number" value={serves} onChange={e => setServes(e.target.value)} placeholder="Serves" />
                                </label>
                                <label className="edit-recipe-label raiting">
                                    Raiting
                                    {/* <FontAwesomeIcon className="fa-icon" icon={faStar} /> */}
                                    <input className="text-box" type="number" min="0" max="5" value={raiting} onChange={e => setRaiting(e.target.value)} placeholder="Rating" style={{width: 40}} />
                                </label>
                                <label className="edit-recipe-label type">
                                    Type
                                    <select className="text-box" value={type} onChange={e => setType(e.target.value)}>
                                        <option value="">Select Category</option>
                                        {CATEGORIES.map((cat, idx) => (
                                            <option key={idx} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="edit-recipe-label link" >
                                    {/* <FontAwesomeIcon className="fa-icon" icon={faUpRightFromSquare} /> */}
                                    Link
                                    <input className="text-box" value={link} onChange={e => setLink(e.target.value)} placeholder="Original Link" style={{width: '100%'}} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="main-section">
                        <div className="sub-title">Ingredients 
                            <button type="button" className="add-btn" onClick={handleAddIngredient}><FontAwesomeIcon icon={faPlus} /> Add</button>
                        </div>
                        <ul className="ingredients" style={{gridTemplateColumns: '1fr'}}>
                            {ingredients.map((item, idx) => (
                                <li key={idx} style={{display: 'flex', alignItems: 'center', gap: 8}}>
                                    <input className="text-box" type="text" value={item} onChange={e => handleIngredientChange(idx, e.target.value)} style={{flex: 1}} />
                                    <button type="button" onClick={() => handleRemoveIngredient(idx)} title="Remove ingredient" style={{background: 'none', border: 'none', color: '#d11a2a', fontSize: 18}}><FontAwesomeIcon icon={faTrash} /></button>
                                </li>
                            ))}
                        </ul>
                        {/* <button type="button" onClick={handleAddIngredient} style={{marginTop: 8}}><FontAwesomeIcon icon={faPlus} /> Add Ingredient</button> */}
                    </div>
                    <div className="main-section">
                        <div className="sub-title">Instructions
                            <button type="button" className="add-btn"onClick={handleAddInstruction}><FontAwesomeIcon icon={faPlus} /> Add</button>
                        </div>
                        <ol className="steps">
                            {instructions.map((step, idx) => (
                                <li key={idx} style={{display: 'flex', alignItems: 'center', gap: 8}}>
                                    <textarea className="text-box" value={step} onChange={e => handleInstructionChange(idx, e.target.value)} style={{flex: 1, resize: 'vertical'}} />
                                    <button type="button" onClick={() => handleRemoveInstruction(idx)} title="Remove step" style={{background: 'none', border: 'none', color: '#d11a2a', fontSize: 18}}><FontAwesomeIcon icon={faTrash} /></button>
                                </li>
                            ))}
                        </ol>
                        
                    </div>
                    <div className="note">
                        <div className="note-title">Chefs Notes</div>
                        <textarea className="text-box" value={note} onChange={e => setNote(e.target.value)} placeholder="Notes" style={{width: '100%', resize: 'vertical'}} />
                    </div>
                </div>
            </div>
        </div>
    );
}