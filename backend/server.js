const express = require("express");
const connectDB = require("./config/dbConnection");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions  = require("./config/corsOptions");
const User = require("./models/User");

const app = express();
const PORT = 5000;
connectDB();
app.use(express.json());
app.use(cors(corsOptions))
app.get("/",(req,res) => res.send("Hello world"));
app.use("/users",require("./routes/userRoutes"));
app.use("/todos",async (req,res,next) => {
    const  token =  req.headers["authorization"];
    if(!token) {
        return res.status(405).json({message:"Forbidden no header found"});
    }
    const decodedString = atob(token);
    const [username, password] = decodedString.split(":");
    if(!username || !password) {
        return res.status(405).json({message: "forbidden"});
    }
    const user = await User.findOne({username}).lean().exec();
    if(!user) {
        return res.status(405).json({message: "forbidden as no user found"});
    }
    if(password !== user.password) {
        return res.status(405).json({message: "forbidden password was wrong"});
    } 
    next();
},require("./routes/todoRoutes"));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

mongoose.connection.on('error', err => {
    console.log(err);
})