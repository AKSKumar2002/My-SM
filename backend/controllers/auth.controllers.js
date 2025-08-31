import sendMail from "../config/Mail.js"
import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signUp = async (req, res) => {
    try {
        console.log("Processing signup for:", req.body);
        const { name, email, password, userName } = req.body
        const findByEmail = await User.findOne({ email })
        if (findByEmail) {
            return res.status(400).json({ message: "Email already exist !" })
        }
        const findByUserName = await User.findOne({ userName })
        if (findByUserName) {
            return res.status(400).json({ message: "UserName already exist !" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "password must be atleast 6 characters " })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            userName,
            email,
            password: hashedPassword
        })

        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
            secure: false,
            sameSite: "Strict"
        })

        return res.status(201).json(user)

    } catch (error) {
        console.error("Error in signUp controller:", error.message);
        res.status(500).json({
            message: "Failed to process signup",
            error: error.message // Include error details for debugging
        });
    }
}

export const signIn = async (req, res) => {
    try {
        const { password, userName } = req.body
und !" })
        const user = await User.findOne({ userName })        }
        if (!user) {
     const isMatch=await bcrypt.compare(password,user.password)

       if(!isMatch){        if (!isMatch) {
         return res.status(400).json({message:"Incorrect Password !"})ssage: "Incorrect Password !" })
       }        }

        const token=await genToken(user._id)t genToken(user._id)

        res.cookie("token",token,{", token, {
            httpOnly:true,
            maxAge:10*365*24*60*60*1000,  maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
            secure:false,            secure: false,
            sameSite:"Strict"
        })        })

        return res.status(200).json(user)

    } catch (error) {   } catch (error) {
        return res.status(500).json({message:`signin error ${error}`})        return res.status(500).json({ message: `signin error ${error}` })
    }    }
}


export const signOut=async (req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"sign out successfully"})   return res.status(200).json({ message: "sign out successfully" })
    } catch (error) {   } catch (error) {
        return res.status(500).json({message:`signout error ${error}`})        return res.status(500).json({ message: `signout error ${error}` })
    }
}

export const sendOtp=async (req,res)=>{
    try {
        const {email}=req.body
        const user =await User.findOne({email})onst user = await User.findOne({ email })
        if(!user){        if (!user) {
            return res.status(400).json({message:"User not found"})})
        }        }

        const otp=Math.floor(1000 + Math.random() * 9000).toString()dom() * 9000).toString()

        user.resetOtp=otp,        user.resetOtp = otp,
        user.otpExpires=Date.now() + 5*60*1000res = Date.now() + 5 * 60 * 1000
        user.isOtpVerified=falsese

       await user.save()        await user.save()
       await sendMail(email,otp)l(email, otp)
       return res.status(200).json({message:"email successfully send"})})

    } catch (error) {   } catch (error) {
         return res.status(500).json({message:`send otp error ${error}`})        return res.status(500).json({ message: `send otp error ${error}` })
    }    }
}


export const verifyOtp=async (req,res)=>{ {
    try {    try {
       const {email,otp}=req.body
     const user =await User.findOne({email})

     if(!user || user.resetOtp!==otp || user.otpExpires < Date.now() ){        if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({message:"invalid/expired otp"})s(400).json({ message: "invalid/expired otp" })
     }

     user.isOtpVerified=truepVerified = true
     user.resetOtp=undefined
     user.otpExpires=undefinedes = undefined
await user.save()
return res.status(200).json({message:"otp verified"})   return res.status(200).json({ message: "otp verified" })
    } catch (error) {   } catch (error) {
         return res.status(500).json({message:`verify otp error ${error}`})        return res.status(500).json({ message: `verify otp error ${error}` })
    }
}

export const resetPassword=async (req,res)=>{> {
    try {
        const {email,password}=req.body
        const user =await User.findOne({email})onst user = await User.findOne({ email })
        if(!user || !user.isOtpVerified){        if (!user || !user.isOtpVerified) {
            return res.status(400).json({message:"otp verfication required"})fication required" })
        }

        const hashedPassword=await bcrypt.hash(password,10)hedPassword = await bcrypt.hash(password, 10)
        user.password=hashedPassword        user.password = hashedPassword
        user.isOtpVerified=false
await user.save()        await user.save()

return res.status(200).json({message:"password reset successfully"})y" })

    } catch (error) {   } catch (error) {
         return res.status(500).json({message:`reset otp error ${error}`})        return res.status(500).json({ message: `reset otp error ${error}` })



}    }    }
}
