import axios from "axios";

export const userRegister = (username, password) => {
    return axios.post("http://localhost:5000/users/register",{username,password});
}
export const userLogin = (username, password) => {
    return axios.post("http://localhost:5000/users/login",{username,password});
}