const express = require("express");
const connectDB = require("./config/dbConnection");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;
connectDB();
app.use(express.json());
app.get("/",(req,res) => res.send("Hello world"));
app.use("/users",require("./routes/userRoutes"));
app.use("/todos",require("./routes/todoRoutes"));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

mongoose.connection.on('error', err => {
    console.log(err);
})