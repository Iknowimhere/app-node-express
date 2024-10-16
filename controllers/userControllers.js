import User from "../models/User.js";
import { genToken } from "../utils/genToken.js";

export const register=async (req,res,next)=>{
    const {username,email,password}=req.body
    try {
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).render("login",{message:"User already exists,Please login" })
        }
        const newUser=await User.create({username,email,password})
        let token=await genToken(newUser._id);
        res.cookie("token",`Bearer ${token}`,{
            maxAge:60*60*24*1000,
            httpOnly:true
        })
        res.status(201).redirect("/api/v1/todo")
    } catch (error) {
        res.status(500).render("register",{message:error.message})
    }
} 


export const login=async (req,res,next)=>{
    const {email,password}=req.body
    try {
        const existingUser=await User.findOne({email})
        if(!existingUser || !(await existingUser.verifyPassword(password,existingUser.password))){
            return res.status(400).render("login",{message:"User doens't exist or password is incorrect"})
        }
        let token=await genToken(existingUser._id);
        res.cookie("token",`Bearer ${token}`,{
            maxAge:60*60*24*1000,
            httpOnly:true
        })
        res.status(201).redirect("/api/v1/todo")
    } catch (error) {
        res.status(500).render("login",{error:error.message})
    }
} 

export const getRegisterForm=(req,res,next)=>{
    res.render("register.ejs")
}

export const getLoginForm=(req,res,next)=>{
    res.render("login.ejs")
}

export const logout=(req,res,next)=>{
    // res.cookie("token","",{
    //     maxAge:5,
    //     httpOnly:true
    // })
    res.clearCookie("token")
    res.redirect("/"); 
}