import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload);
export const loginUser = (payload) => api.post(`/login/`, payload, { withCredentials: true });
export const logoutUser = () => api.get(`/logout/`);

export const getAllRecipes = () => api.get(`/recipes/`);
export const updateRecipes = (id, payload) => api.put(`/recipe/${id}`, payload);
export const createRecipe = (payload) => api.post(`/recipe/`, payload);
export const deleteRecipe = (id) => api.delete(`/recipe/${id}`);

const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
};

export default apis;