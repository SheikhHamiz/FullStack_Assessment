import "./todoList.css";
import { getAllTodosOfuser, getConditionalUserTodosOfUser, updateStatusOfTodo } from "../../../service/todoService";
import { useState, useEffect } from "react";

const TodoList = () => {
     const user = "677ea976c6559342e0fa9b5d";
    const [todos, setTodos] = useState([]);
    const [allTodos, setAllTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [pendingTodos, setPendingTodos] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const options = ["All", "Completed", "Pending"];
    const [kind, setKind] = useState("");

    useEffect(() => {
        setKind("All");
        getAllTodosOfuser(user).then(res => {
            setTodos([...res.data]);
            setAllTodos([...res.data]);
        });
        getConditionalUserTodosOfUser(user,true).then(res => {
            setCompletedTodos([...res.data]);
        });
        getConditionalUserTodosOfUser(user,false).then(res => {
            setPendingTodos([...res.data]);
        });
    },[refreshKey]);

    const handleFilter = (e) => {
        switch(e.target.value) {
            case "All":
                setTodos([...allTodos]);
                break;
            case "Completed":
                setTodos([...completedTodos]);
                break;
            case "Pending":
                setTodos([...pendingTodos]);
                break;
            default:
                console.info("Unknown filter passed {}",e.target.value)    
        }
    };

    const handleStatus = (e,id) => {
        updateStatusOfTodo(id,e.target.checked).then(res =>  setRefreshKey(k => k+1));
    }
    return (
    <>
        <label htmlFor="filter">Filter</label>
        <select id = "filter" onClick={(e) => handleFilter(e)}
            options= {options}
            onChange={(e) => setKind(e.target.value)}
            defaultValue={"All"} 
            value={kind}   
        >
            <option value="All" selected>All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
        </select>
        <table>
            <thead>
                <tr>
                    <td>SNO.</td>
                    <td>Title</td>
                    <td>Description</td>
                    <td>Done</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
            </thead>
            <tbody>
                { todos?.map( (t,i) => (
                        <tr key={t._id}>
                            <td>{i+1}</td>
                            <td>{t.title}</td>
                            <td>{t.description}</td>
                            <td>
                                <input type="checkbox" name="done" id="done" checked={t.done} onClick={(e)=> handleStatus(e,t._id,)}/>
                            </td>
                            <td><button className="btn btn-edit">Edit</button></td>
                            <td><button className="btn btn-delete">Delete</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </>
    );
}
export default TodoList;