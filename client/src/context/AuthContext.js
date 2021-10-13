import { createContext } from "react";

function noop() {};

export const AuthContext = createContext({
    userLogin:null ,
    key: null,
    isAdmin: false,
    isValidPass: false,
    login : noop,
    logout: noop,
    isAuthenticated: false,
})