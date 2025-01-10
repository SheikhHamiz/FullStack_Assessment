const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    title: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Todo",  todoSchema);