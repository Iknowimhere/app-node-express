import express from 'express'
let app=express();
import { dbConnection } from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import userRoutes from './routes/userRoutes.js'
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
dbConnection()

//register template engine
app.set("view engine","ejs");

//middlewares
app.use(cookieParser())
app.use(methodOverride("_method"))
//to process incoming json data
app.use(express.json());
//to serve static resources
app.use(express.static("public"))
//to process incoming urlencoded data
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res,next)=>{
    res.render("index")
})

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/todo",todoRoutes);

// app.get("/set-cookie",(req,res,next)=>{
//     res.cookie("name","tony",{
//         maxAge:60*60*24*1000,
//         httpOnly:true
//         // secure:true
//     })
//     res.send("cookie-set")
// })

// app.get("/get-cookie",(req,res,next)=>{
//     console.log(req.cookies);
//     res.send(req.cookies.name)
// })

// app.get("/update-cookie",(req,res,next)=>{
//     res.cookie("name","stark",{
//         maxAge:60*60*24*1000,
//         httpOnly:true
//         // secure:true
//     })
//     res.send("cookie-upated")
// })

// app.get("/delete-cookie",(req,res,next)=>{
//     // res.cookie("name","",{
//     //     maxAge:5,
//     //     httpOnly:true
//     //     // secure:true
//     // })
//     res.clearCookie("name")
//     res.send("cookie-deleted")
// })
export default app;