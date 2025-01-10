const Todo = require("../models/Todo");
const asyncHandler = require("express-async-handler");


const getAllTodosOfUser = asyncHandler(async (req, res) => {
    const {user} = req.query;
    if(!user) {
        return res.status(400).json({message: "userId required"});
    }
    const todos =  await Todo.find({user}).lean();
    if(!todos) {
        return res.status(400).json({ message: "No Todos found"});
    }
    res.json(todos);
});
const getTodoById = asyncHandler( async (req,res) => {
    const {id} = req.query;
    if(!id) {
        return res.status(400).json({message: "todo Id required"});
    }
    const todo = await Todo.findById(id).exec();
    if(!todo) {
        return res.status(400).json({message: "no such todo found"});
    }
    res.json(todo);

});
const getConditionalTodosOfUser = asyncHandler(async (req,res) => {
    const {user,done} = req.query;
    if(!user) {
        return res.status(400).json({message: "userId required"});
    }
    const todos =  await Todo.find({user,done}).lean();
    if(!todos) {
        return res.status(400).json({ message: "No Todos found"});
    }
    res.json(todos);
});
const createTodoOfUser = asyncHandler(async (req, res) => {
    const {user,  title, description} = req.body;
    if(!user || !title || !description) {
        return res.status(400).json({message: "All fields required"});
    }
    const todoObject = {user,title,description};
    const todo = await Todo.create(todoObject);

    if(todo) {
        res.status(201).json({
            "title": todo.title,
            "description": todo.title,
        });
    } else {
        res.status(400).json(`invalid user data`);
    }
});

const updateTodo = asyncHandler(async (req, res) => {
    const {id,title, description} = req.body;
    if(!id || !title || !description) {
        return res.status(400).json({message: "All fields required"});
    }
    const todo = await Todo.findById(id).exec();
    if(!todo) {
        res.status(400).json({message: "no such Todo found"});
    }
    todo.title = title;
    todo.description = description;

    const updatedTodo = await todo.save();
    res.json({
        "title": updatedTodo.title,
        "description": updatedTodo.description,
    });
});

const updateTodoStatus = asyncHandler(async (req,res) => {
    const {id, done} = req.body;
    if(!id || typeof done !== "boolean") {
        return res.status(400).json({message: "All fields required"});
    }
    const todo = await Todo.findById(id).exec();
    if(!todo) {
        res.status(400).json({message: "no such Todo found"});
    }
    todo.done = done;
    const updatedTodo = await todo.save();
    res.json({
        "title": updatedTodo.title,
        "description": updatedTodo.description,
        "done": updatedTodo.done
    });
});

const deleteTodo = asyncHandler(async (req, res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(400).json({message: "todo Id required"});
    }
    const todo = await Todo.findById(id).exec();
    if(!todo) {
        return res.status(400).json({message: "no such todo found"});
    }
    const result = await todo.deleteOne();
    res.json(result);

});

module.exports = {
    getAllTodosOfUser,
    getConditionalTodosOfUser,
    createTodoOfUser,
    updateTodoStatus,
    updateTodo,
    deleteTodo
};