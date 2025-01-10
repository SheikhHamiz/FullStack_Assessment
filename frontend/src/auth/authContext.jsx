import { createContext, useContext, useState } from "react";
import { api } from "../config/api";
import { userRegister, userLogin } from "../service/userService";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    
    const login = async (username, password) => {
        try{
        const response = await userLogin(username, password);
        const baToken = response.data.token;
        console.log(response);
        if(response.status === 200) {
            setUser(response.data._id);
            setAuthenticated(true);
            setToken(baToken);
            api.interceptors.request.use((config) => {
                config.headers.Authorization = baToken;
                return config;
            });
            return true;
        } else {
            return logout();
            
        }
        } catch(err) {
            console.log(err);
        }

    }
    const register = async (username, password) => {
        try{
        const response = await userRegister(username, password);
        const baToken = response.data.token;
        console.log(response);
        if(response.status === 200) {
            setUser(response.data._id);
            setAuthenticated(true);
            setToken(baToken);
            api.interceptors.request.use((config) => {
                config.headers.Authorization = baToken;
                return config;
            }
        );
            return true;
        } else {
            logout();
        }
        } catch(err) {
            console.log(err);
        }

    }
    const logout = () => {
        setAuthenticated(false);
        setUser(null);
        setToken(null);
        return false;
    }
    return(
        <AuthContext.Provider value={{ authenticated, login, register,logout, user, token}}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;