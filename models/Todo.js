import mongoose from 'mongoose';
//schema(structure) to store data
const todoSchema=new mongoose.Schema({
    todo:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
})

//model
let Todo=mongoose.model("todo",todoSchema)

export default Todo;