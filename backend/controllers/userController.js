const User = require("../models/User");
const Todo = require("../models/Todo");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getAllUsers = asyncHandler(async (req, res) => {
    const users =  await User.find().select("-password").lean();
    if(!users) {
        return res.status(400).json({ message: "No user found"});
    }
    res.json(users);
});

const createUser = asyncHandler(async (req, res) => {
    const {username , password, roles} = req.body;
    if(!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({message: "All fields required"});
    }
    const duplicate = await User.findOne({username}).lean().exec();

    if(duplicate) {
        return res.status(409).json({message: "Duplicate user"});
    }
    const hashpassword = await bcrypt.hash(password,10);
    const userObject = {username, "password":hashpassword, roles};
    const user = await User.create(userObject);
    if(user) {
        res.status(201).json(`New user ${username} created`);
    } else {
        res.status(400).json({message:"Invalid user data"});
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const {id, username , password, roles} = req.body;
    if(!id || !username || !password || !Array.isArray(roles) || !roles.length || typeof active !== "boolean") {
        return res.status(400).json({message: "All fields required"});
    }
    const user = await User.findById(id).exec();
    if(!user) {
        res.status(400).json({message:"User not found"});
    }
    const duplicate = await User.findOne({username}).lean().exec();
    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicate username" });
    }
    user.username = username;
    user.roles = roles;
    user.active = active;

    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json(`${updatedUser.username} updated`);
});

const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body;
    if(!id) {
        return res.status(400).json({message: "UserID required"});
    }
    const todos = await Todo.find({user:id}).exec();
    if(todos?.length) {
        todos.delete();
    }
    const user = await User.findById(id).exec();
    if(!user) {
        return res.status(400).json({message: "User not found"});
    }
    const result = await user.deleteOne();
    const reply = `Username ${result.username} with ID ${result._id} deleted`;
    res.json(reply);
});

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};