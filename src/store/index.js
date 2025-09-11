    
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
        try{
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
        }catch(err){
            // console.log(err);
            enqueueSnackbar("Title and type are required", { variant: 'error' });
        }
        
    }

    store.createRecipe = async function(newRecipe){
        
        try{
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
        }catch(err){
            // console.log(err);
            enqueueSnackbar("Title and type are required", { variant: 'error' });
        }
    }

    store.getAllRecipes = async function(){
        try{
            const response = await getAllRecipes();
            if(response.status === 200){
                // console.log(response);
                storeReducer({
                    type: GlobalStoreActionType.GET_ALL_RECIPES,
                    payload: {recipes: [...response.data.data]}}, setStore);
            }else{
                enqueueSnackbar("Error Retrieving Recipes!", { variant: 'error' });
            }
        }catch(err){
            enqueueSnackbar("Error Retrieving Recipes!", { variant: 'error' });
        }
        
    }

    store.deleteRecipe = async function(id) {
        try {
            const response = await deleteRecipe(id);
            if (response.status === 200 || response.status === 204) {
                // Remove the recipe from the recipes array
                const updatedRecipes = store.recipes.filter(r => r._id !== id);
                storeReducer({
                    type: GlobalStoreActionType.GET_ALL_RECIPES,
                    payload: { recipes: updatedRecipes }
                }, setStore);
                enqueueSnackbar("Recipe Deleted!", { variant: 'success' });
                navigate("/home");
            } else {
                enqueueSnackbar("Error Deleting Recipe!", { variant: 'error' });
            }
        } catch (err) {
            // console.log(err);
            enqueueSnackbar("Error Deleting Recipe!", { variant: 'error' });
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
