const express = require("express")
const app = express();
app.use(express.json());

const {UserModel} = require("./models/UserModel")
const {connection } = require("./config/db")
const bcrypt = require('bcrypt');
const { authentication } = require("./middleware/authentication");
const { todoRouter } = require("./router/todo.router");

const PORT = process.env.PORT || 5000

app.use("/todo",todoRouter)

app.get("/",(req,res)=>{
    res.send("Welcome Aboard")
})

app.post("/signup",async (req,res)=>{
    const {name , email, password} = req.body
     //console.log(name,email,password)
     const isUser = await UserModel.findOne({email})
     if(isUser){
        res.send("User already exists,try loggin in")
     }
    bcrypt.hash(password, 5, async function(err, hash) {
        // Store hash in your password DB.
        if(err){
            res.send("something went wrong,Please try again")
        }
        else{
            const new_user = new UserModel({
                name,
                email,
                password : hash
            })
        }
        try{
            await new_user.save()
            res.send("Sign ip successfull")
        }
        catch(err){
            res.send("something went wrong,Please try again")
        }
    });   
  
})

app.post("/login",async(req,res)=>{
    const { email, password} = req.body
    const user = await UserModel.findOne({email})
    const hashed_password = user.password;
    const user_id = user._id;
    console.log(user,user_id)
    bcrypt.compare(password, hashed_password, function(err, result){
     if(err){
      res.send({"msg":"Something went wrong,try agaon later"})  
     }
     if(result){
        const token = jwt.sign({user_id},process.env.KEY);
        res.send({message:"Login successfull",token})
     }
     else{
        res.send({"msg":"Login failed"})
     }
    })

})




app.listen(PORT, async ()=>{
     try{
        await connection
        console.log(`Listening on Port ${PORT}`)
     }
     catch(error){
        console.log(error)
     }
    
})

