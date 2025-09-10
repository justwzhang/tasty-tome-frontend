import { createContext, useState, useContext, useEffect } from "react"
import {testRecipes} from "../util/example-data"
import { getAllRecipes, updateRecipes, createRecipe, deleteRecipe } from "../api";
import useAuth from "../auth";
import { storeReducer } from "./reducer";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
export const GlobalStoreContext = createContext({});

function useStore(){
    const store = useContext(GlobalStoreContext);
    if(!store){
        throw new Error("Store did not init");
    }
    return store; 
}
export const GlobalStoreActionType = {
    GET_ALL_RECIPES: "GET_ALL_RECIPES",
    CREATE_RECIPE: "CREATE_RECIPE",
    SAVE_RECIPE: "SAVE_RECIPE",
    DELETE_RECIPE: "DELETE_RECIPE"
}
function GlobalStoreContextProvider(props){
    const auth = useAuth();
    const navigate = useNavigate();
    const [store, setStore] = useState({
        // recipes: [...testRecipes]
        recipes: []
    });

    useEffect(()=>{
        if(auth.user){
            store.getAllRecipes();
        }
    },[auth.user] )

    store.saveRecipe = async function(recipe){
        const response = await updateRecipes(recipe._id, recipe);
        if (response.status === 200 || response.status === 201) {
            // Replace the updated recipe in the recipes array
            const updatedRecipes = store.recipes.map(r =>
                r._id === recipe._id ? recipe : r
            );
            storeReducer({
                type: GlobalStoreActionType.GET_ALL_RECIPES,
                payload: { recipes: updatedRecipes }
            }, setStore);
            navigate("/view/" + recipe._id);
            enqueueSnackbar("Recipe Updated!", { variant: 'success' });
        }else{
            enqueueSnackbar("Error Updating Recipe!", { variant: 'error' });
        }
    }

    store.createRecipe = async function(newRecipe){
        const response = await createRecipe(newRecipe);
        if(response.status === 201 || response.status === 200){
            // Add the new recipe to the recipes array
            storeReducer({
                type: GlobalStoreActionType.GET_ALL_RECIPES,
                payload: { recipes: [...store.recipes, response.data.recipe] }
            }, setStore);
            enqueueSnackbar("Recipe Created!", { variant: 'success' });
            navigate("/view/" + response.data.recipe._id);
        }else{
            enqueueSnackbar("Error Creating Recipe!", { variant: 'error' });
        }
    }

    store.getAllRecipes = async function(){
        const response = await getAllRecipes();
        if(response.status === 200){
            console.log(response);
            storeReducer({
                type: GlobalStoreActionType.GET_ALL_RECIPES,
                payload: {recipes: [...response.data.data]}}, setStore);
        }
    }

    return (
        <GlobalStoreContext.Provider value={{ store }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default useStore;
export { GlobalStoreContextProvider, useStore };
