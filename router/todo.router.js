
const { Router } = require("express")
const todoRouter = Router()
require("dotenv").config()
const {TodoModel } = require("../models/todo.model")
const { authentication } = require("../middleware/authentication");


todoRouter.get("/getTodo",authentication, async (req,res)=>{
  const {userId} = req.body
  const user_tasks = await TodoModel.findOne({_id:userId})
//   const { name, email } = user;
  res.send({ user_tasks })

})

todoRouter.post("/addTodo",authentication, async (req,res)=>{
  const { userId } =req.body;
  console.log(user)
  const new_task = new TodoModel({ ...req.body,userId })
  res.send({new_task : "Task added"})
})

todoRouter.patch("/updateTodo/:taskId",authentication, async (req,res)=>{
    const { userId } =req.body;
    const { taskId } = req.params;
    const payload = req.body;

    const update_task = new TodoModel.findOneAndUpdate({userId:userId,_id:req.params.taskId },{...payload})
    res.send({update_task : "Task updated"})
  })

  todoRouter.delete("/removeTodo/:taskId",authentication, async (req,res)=>{
    const { userId } =req.body;
    const { taskId } = req.params;
    const payload = req.body;

    const update_task = new TodoModel.findOneAndUpdate({userId:userId,_id:req.params.taskId },{...payload})
    res.send({delete_task : "Task deleted"})
  })

  module.exports = { todoRouter }
