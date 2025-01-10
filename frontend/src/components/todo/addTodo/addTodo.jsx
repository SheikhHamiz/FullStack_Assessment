import { useEffect, useState } from "react";
import { createTodosOfuser, getTodoById, updateTodosOfuser } from "../../../service/todoService";
import {useParams, useNavigate} from "react-router-dom";
import "./addTodo.css";
import { useAuth } from "../../../auth/authContext";

const AddTodo = () => {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const {user} = useAuth();
    const navigate =useNavigate();

    useEffect(() => {
        console.log(id);
        if(id != -1) {
            getTodoById(id).then(
                res => {
                    setTitle(res.data.title);
                    setDescription(res.data.description);
                }
            )
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        const todo = { user,title, description};
        if(id == -1) {
            createTodosOfuser(todo).then( res => console.log(res.data)).then(res => navigate("/"));
        }else {
            updateTodosOfuser({id, title,description}).then(res => navigate("/"));
        }
        
    }
    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className="form">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={title} onChange={(e) => handleTitle(e)} />
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" value={description} onChange={(e) => handleDescription(e)} />
            <button type="submit" className="btn btn-save">Submit</button>
        </form>
    );
}
export default AddTodo;