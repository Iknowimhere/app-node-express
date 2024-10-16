import Todo from "../models/Todo.js"

export let createTodo=async (req,res,next)=>{
    let {todo}=req.body
    try {
        if(!todo){
            return res.status(400).render("home",{error:"todo is required"})
        }
        await Todo.create({todo})
        res.status(201).redirect("/api/v1/todo")
    } catch (error) {
        res.status(500).render("home",{error:error.message})
    }
}

export let getTodos=async (req,res,next)=>{
    try {
        const todos=await Todo.find()
        res.status(201).render("home",{todos,user:req.user})
    } catch (error) {
        res.status(500).render("home",{error:error.message})
    }
}

export let getTodo=async (req,res,next)=>{
    const {id}=req.params;
    try {
        let todo=await Todo.findById(id)
        if(!todo){
            return res.sendStatus(400)
        }
        res.status(200).render("update",{todo,user:req.user})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export let updateTodo=async (req,res,next)=>{
    const {id}=req.params;
    const {todo}=req.body
    try {
        await Todo.findByIdAndUpdate(id,{todo})
        res.status(200).redirect("/api/v1/todo")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const updateTodoStatus=async (req,res,next)=>{
    const {id}=req.params;
    const {isCompleted}=req.body
    try {
        await Todo.findByIdAndUpdate(id,{isCompleted:isCompleted})
        res.status(200).redirect("/api/v1/todo")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const deleteTodo=async (req,res,next)=>{
    const {id}=req.params;
    try {
        await Todo.findByIdAndDelete(id)
        res.status(200).redirect("/api/v1/todo")
    } catch (error) {
        res.status(500).send(error.message)
    }
}