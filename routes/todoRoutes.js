import { Router } from "express"
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo, updateTodoStatus } from "../controllers/todoControllers.js";
//routes
let router = Router();
import {auth} from '../middlewares/auth.js'

router.post("/",auth, createTodo)
router.get("/", auth,getTodos)
router.get("/:id", auth,getTodo)
router.patch("/:id", auth,updateTodo)
router.patch("/status/:id", auth,updateTodoStatus)
router.delete("/:id", auth,deleteTodo)

export default router;