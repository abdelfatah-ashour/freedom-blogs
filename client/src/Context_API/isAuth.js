/* eslint-disable react/prop-types */
import React, {createContext, useState} from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [AuthUser, setIsAuth] = useState({
        isLogin: false,
        isAuth: false,
        isAdmin: false,
        username: "",
        email: "",
        role: false,
    });
    return (
        <AuthContext.Provider value={{AuthUser, setIsAuth}}>
            {children}
        </AuthContext.Provider>
    );
}
