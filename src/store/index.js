import { createContext, useState } from "react"

export const GlobalStoreContext = createContext({});
export const GlobalStoreActionType = {

}
function GlobalStoreContextProvider(props){
    const [store, setStore] = useState({
        
    });



    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
