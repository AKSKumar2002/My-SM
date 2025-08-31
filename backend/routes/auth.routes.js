import express from "express"
import { resetPassword, sendOtp, signIn, signOut, signUp, verifyOtp } from "../controllers/auth.controllers.js"

const authRouter = express.Router();

authRouter.post("/signup", (req, res, next) => {
    console.log("Signup request received:", req.body);
    next();
}, signUp);

authRouter.post("/signin", signIn);
authRouter.post("/sendOtp", sendOtp);
authRouter.post("/verifyOtp", verifyOtp);
authRouter.post("/resetPassword", resetPassword);
authRouter.get("/signout", signOut);

export default authRouter;