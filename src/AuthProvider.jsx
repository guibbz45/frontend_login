import React, {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const AuthProvider =({children}) => {
    const [token, setToken] = useState(null);
    
    const login =(userToken) => {
        setToken(userToken);
        localStorage.setItem('access_token', userToken);
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('access_token');
    }

    const getToken = () =>{
        return !!token || !!localStorage.getItem('access_token');
    }

    const isAuthenticated = getToken;

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
