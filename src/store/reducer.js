import { GlobalStoreActionType } from ".";

export function storeReducer(action, setStore){
    const { type, payload } = action;
    switch (type) {
        case GlobalStoreActionType.GET_ALL_RECIPES: {
            return setStore({
                recipes: payload.recipes
            });
        }

    }
}