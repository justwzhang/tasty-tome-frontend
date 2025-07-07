import { createContext, useState, useContext } from "react"
import {testRecipes} from "../util/example-data"

export const GlobalStoreContext = createContext({});

function useStore(){
    const store = useContext(GlobalStoreContext);
    if(!store){
        throw new Error("Store did not init");
    }
    return store; 
}
export const GlobalStoreActionType = {

}
function GlobalStoreContextProvider(props){
    const [store, setStore] = useState({
        recipes: [...testRecipes]
    });



    return (
        <GlobalStoreContext.Provider value={{ store }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default useStore;
export { GlobalStoreContextProvider, useStore };
