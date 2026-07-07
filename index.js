const express =require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Todo =require("./models/todo");
console.log("todo model =", Todo);


const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//GET HOME Route

app.get("/", (req, res) =>{
    console.log("Test route loaded");
    res.send("server is working");
});

//GET All Todos
app.get("/todos", async (req, res) => {
    try{
        const todos = await Todo.find();

        res.status(200).json({
            success: true,
            data: todos
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

console.log("GLOBAL TODO =", Todo);

app.post("/todos", async(req, res) =>{
    console.log("Todo name = ", Todo);
    console.log("BODY", req.body);
    try{
        const newTodo = await Todo.create(req.body);

        res.status(201).json({
            success:true,
            data:newTodo
        });

    }catch(err){
        console.log(err);

        res.status(400).json({
            success:false,
            message: err.message
        });
    }
    
});

mongoose.connect(process.env.MONGO_URI)
.then( () => {
    console.log("Database connected successfully");
})
.catch(err => {
    console.log("error" , err);
})





app.listen(process.env.PORT || 3000, () =>{
    console.log("server connected");
});