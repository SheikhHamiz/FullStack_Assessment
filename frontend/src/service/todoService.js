import { api } from "../config/api";
const url = "todos";
export const getAllTodosOfuser = (user) => {
    return api.get(url, {params:{user}});
}
export const getConditionalUserTodosOfUser = (user,done) => {
    return api.get(`${url}/completed`,{params:{user,done}});
}
export const getTodoById = (id) => {
    return api.get(`${url}/${id}`);
}
export const createTodosOfuser = (todo) => {
    return api.post(url,todo);
}
export const updateTodosOfuser = (todo) => {
    return api.put(url,todo);
}
export const updateStatusOfTodo = (id,done) => {
    return api.patch(url,{id,done});
}

export const deleteTodo = (id) => {
    return api.delete(`${url}/${id}`);
}