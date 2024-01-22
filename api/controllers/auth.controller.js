import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import  jwt  from "jsonwebtoken";

export const signup  = async (req,res,next)=>{

    const{username,email,password} = req.body;

    if(!username || !email || !password || username === "" || email === "" || password === ""){
       next(errorHandler(400,"Please enter all fields"))
    }

    const hashPassword = bcryptjs.hashSync(password,10);
     const newUser = new User({
        username,email,password:hashPassword
     })

     try {
        await newUser.save();
        res.status(201).json({message:"User created successfully"})
     } catch (error) {
        next(error)
     }
}


 export const signin = async (req,res,next)=>{
      const {email,password} = req.body;
      
      if(!email || !password || email === "" || password === ""){
        next(errorHandler(400,"Please enter all fields"))
      }
      try {
         const validUser = await User.findOne({email});

         if(!validUser){
            next(errorHandler(404,"User not found"))
         }
         const validPassword = bcryptjs.compareSync(password,validUser.password)
         if(!validPassword){
            return next(errorHandler(400,"Invalid password"))
         }
         // create jwt token
         const token = jwt.sign({id:validUser._id},process.env.JWT_SECREC_KEY);

         // remove password from response
         const {password:pass,...others} = validUser._doc

         res.status(200).cookie('access_token,token',{httpOnly:true}).json(others)
      } catch (error) {
         next(error)
      }
      
 }