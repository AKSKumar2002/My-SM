import express from "express";
import { resetPassword, sendOtp, signIn, signOut, signUp, verifyOtp } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res, next) => {
    try {
        console.log("Signup request received:", req.body);
        await signUp(req, res);
    } catch (error) {
        console.error("Error in signup route:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

authRouter.post("/signin", signIn);
authRouter.post("/sendOtp", sendOtp);
authRouter.post("/verifyOtp", verifyOtp);
authRouter.post("/resetPassword", resetPassword);
authRouter.get("/signout", signOut);

export default authRouter;