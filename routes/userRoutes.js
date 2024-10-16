import { Router } from "express";
import { getLoginForm, getRegisterForm, login, logout, register } from "../controllers/userControllers.js";
let router =Router()

router.get("/register",getRegisterForm)
router.get("/login",getLoginForm)

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)

export default router;