import React, { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from "notistack";
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    SET_ERROR: "SET_ERROR",
    LOGOUT_USER: "LOGOUT_USER",
    LOGOUT_USER_GUEST: "LOGOUT_USER_GUEST"
}
function useAuth(){
    const auth = useContext(AuthContext);
    if(!auth){
        throw new Error("Auth did not init");
    }
    return auth; 
}
function AuthContextProvider(props) {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: null,
        error: false,
        isGuest: false
    });

    useEffect(() => {
        // if(auth.loggedIn)
        try{
            auth.getLoggedIn();
        }catch(err){
            // console.log(err);
        }
            // auth.createGuest();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: null,
                    error: false,
                    isGuest: false
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: null,
                    error: false,
                    isGuest: false
                })
            }
            case AuthActionType.LOGIN_USER:{
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: null,
                    error: false,
                    isGuest: false
                })
            }
            case AuthActionType.SET_ERROR:{
                return setAuth({
                    user:auth.user,
                    loggedIn: auth.loggedIn,
                    errorMessage: payload.errorMessage,
                    error: payload.error,
                    isGuest: false
                })
            }
            case AuthActionType.LOGOUT_USER:{
                return setAuth({
                    user:null,
                    loggedIn: false,
                    errorMessage: null,
                    error:false,
                    isGuest: false
                });
            }
            case AuthActionType.LOGIN_USER_GUEST:{
                return setAuth({
                    user:payload.user,
                    loggedIn: true,
                    errorMessage: null,
                    error:false,
                    isGuest: true
                });
            }
            default:
                return auth;
        }
    }

    auth.continueAsGuest= async function(userInfo, store){
        try{
            const response = await api.loginUser(userInfo);
            if (response.status === 200){
                authReducer({
                    type:AuthActionType.LOGIN_USER_GUEST,
                    payload:{
                        user:response.data.user
                    }
                })
                navigate("/home");
                store.loadIdNamePairs();
            }
        }catch(err){
            authReducer({
                type: AuthActionType.SET_ERROR,
                payload: {
                    errorMessage: err.response.data.errorMessage,
                    error: true
                }
            });
        }
    }

    auth.createGuest = async function(){
        let guest = {
            firstName: "Guest",
            lastName: "Guest",
            user: "Guest",
            email: "Guest@guest.com",
            password: "password",
            passwordVerify: "password"
        }
        try{
            const response = await api.registerUser(guest);
        }catch(err){
            
        }
    }

    auth.logoutUser = function(){
        let asyncLogout = async function(){
            const response = api.logoutUser();
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: null
            });
            navigate("/")
        }
        asyncLogout();
    }

    auth.removeError = function(){
        authReducer({
            type: AuthActionType.SET_ERROR,
            payload: {
                errorMessage: null,
                error: false
            }
        })
    }

    auth.logInUser = function(user, store){
        let asyncLogInUser = async function(userInfo){
            try{
                const response = await api.loginUser(userInfo);
                if (response.status === 200){
                    authReducer({
                        type:AuthActionType.LOGIN_USER,
                        payload:{
                            user:response.data.user
                        }
                    })
                    navigate("/home");
                    // store.loadIdNamePairs();
                }
            }catch(err){
                authReducer({
                    type: AuthActionType.SET_ERROR,
                    payload: {
                        errorMessage: err.response.data.errorMessage,
                        error: true
                    }
                });
            }
        }
        asyncLogInUser(user)
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(userData) {      
        try{
            const response = await api.registerUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        //user: response.data.user
                    }
                })
                navigate("/");
                enqueueSnackbar("Account Created", {variant:"success"});
                //store.loadIdNamePairs();
            }
        }catch(err){
            enqueueSnackbar(err.response.data.errorMessage, {variant:"success"});
            authReducer({
                type: AuthActionType.SET_ERROR,
                payload: {
                    errorMessage: err.response.data.errorMessage,
                    error:true
                }
            });
        }
    }

    return (
        <AuthContext.Provider value={
            auth
        }>
            {props.children}
        </AuthContext.Provider>
    );
}

export default useAuth;
export { AuthContextProvider, useAuth };