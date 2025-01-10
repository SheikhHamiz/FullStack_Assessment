const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
    const {username , password} = req.body;
    if(!username || !password) {
        return res.status(400).json({message: "All fields required"});
    }
    const duplicate = await User.findOne({username}).lean().exec();

    if(duplicate) {
        return res.status(409).json({message: "Duplicate user"});
    }
    const user = await User.create(user);
    const token = btoa(`${username}:${password}`);
    if(user) {
        const {_id} = user;
        res.status(201).json({token,_id});
    } else {
        res.status(400).json({message:"Invalid user data"});
    }
});
const loginUser = asyncHandler(async (req,res) => {
    const {username , password} = req.body;
    if(!username || !password) {
        return res.status(400).json({message: "All fields required"});
    }
    const user = await User.findOne({username}).lean().exec();
    if(!user) {
        return res.status(409).json({message: "wrong  username"});
    }
    if(password !== user.password) {
        return res.status(409).json({message: "wrong password"});
    } else {
        const token = btoa(`${username}:${password}`);
        const {_id} = user;
        return res.status(200).json({token,_id});
    }
})


module.exports = {
    registerUser,
    loginUser
};