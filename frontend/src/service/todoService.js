import { api } from "../config/api";
const url = "todos";
export const getAllTodosOfuser = (userId) => {
    return api.get(url,{user:userId});
}
export const createTodosOfuser = (todo) => {
    return api.get(url,todo);
}
export const updateTodosOfuser = (todo) => {
    return api.put(url,todo);
}
export const updateStatusOfUser = (id,status) => {
    return api.patch(url,{id,status});
}