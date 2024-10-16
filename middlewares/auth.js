import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function auth(req, res, next) {
    try {
        let token;
        if(!req.cookies.token){
           return res.redirect("/")
        }
        if (req.cookies.token?.startsWith("Bearer")) {
            token = req.cookies.token.split(" ")[1]
        }
        let decodedToken = await jwt.verify(token, "Topsecret")
        const user = await User.findById(decodedToken.id)
        req.user = user?._id
        next()
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}