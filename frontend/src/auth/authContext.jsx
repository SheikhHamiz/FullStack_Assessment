import { createContext, useContext, useState } from "react";
import { api } from "../config/api";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    
    const login = async (username, password) => {
        const response = await basicAuth(username, password);
        const baToken = "Basic " + response.token;
        console.log(response);
        if(response.status === 200) {
            setUser(response._id);
            setAuthenticated(true);
            setToken(baToken);
            api.interceptors.request.use((config) => {
                config.headers.Authorization = baToken;
            });
        } else {
            logout();
        }

    }
    const logout = () => {
        setAuthenticated(false);
        setUser(null);
        setToken(null);
    }
    return(
        <AuthContext.Provider value={{ authenticated, login, logout, user, token}}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;