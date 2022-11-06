
const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    userId:{type:String,required:true},
    task:{type:String},
    status:{type:Boolean , default:false},
})

const TodoModel = mongoose.model("todo",todoSchema)

module.exports = { TodoModel }