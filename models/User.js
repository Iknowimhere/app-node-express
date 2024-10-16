import {Schema,model} from 'mongoose'
import bcrypt from 'bcryptjs';

const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"username field is required"]
    },
    email:{
        type:String,
        required:[true,"email field is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[8,"Min length of characters is 8"]
    }
},{
    timestamps:true
})

//pre middleware given by mongoose
//before we save a document, "this.password" field is hashed using bcrypt
userSchema.pre("save",async function(next){
    let salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})
//methods---functions applied on instances of model
//statics---functions applied on model directly

userSchema.methods.verifyPassword=async function(pwd,pwdDb){
    return await bcrypt.compare(pwd,pwdDb)
}

let User=model("user",userSchema);

export default User;