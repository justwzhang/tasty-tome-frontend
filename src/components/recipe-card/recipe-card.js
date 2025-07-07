import "./recipe-card.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClock } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
export default function RecipeCard(props){
    const {recipe} = props;
    const navigate = useNavigate();
    function naviageRecipe (){
        navigate("/view/" + recipe.id);
    }
    console.log(recipe)
    return (
        <a className="recipe-card" onClick={()=>{naviageRecipe()}}>
            <div className="image-section">
                <img src={recipe.photosrc}/>
            </div>
            <div className="recipe-info">
                <div className="title">
                    {recipe.name}
                </div>
                <div className="description">
                    {recipe.description}
                </div>
                <div className="tags">
                    <div className="tag">
                        {recipe.type}
                    </div>
                </div>
                <div className="footer">
                    <div className="left">
                        <div className="footer-group">
                            <FontAwesomeIcon icon={faClock}/>
                            {recipe.cookTime}
                        </div>
                        <div className="footer-group">
                            <FontAwesomeIcon icon={faUser}/>
                            {recipe.serves}
                        </div>
                    </div>
                    <div className="right">
                        <div className="footer-group">
                            <FontAwesomeIcon className="star" icon={faStar}/>
                            {recipe.raiting}
                        </div>
                    </div>
                </div>
            </div>
        </a>

    );
}