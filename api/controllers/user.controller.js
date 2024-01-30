import bcryptjs from "bcryptjs"
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"


export const users = (req, res) => {
    res.json({message:"users route is working correctly 😀"})
}



export const updateUser = async (req,res,next)=>{

    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,"Unathoraized"))
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
          return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return next(errorHandler(400,"Username must be between 7 and 20 characters"))
        }
        if(req.body.username.includes(" ")){
            return next(errorHandler(400,"Username must not contain spaces"))
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400,"Username must not contain uppercase"))
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400,"Username must not contain special characters"))
        }
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                image:req.body.image
            },

        },{
            new:true
        }
        );
            const {password, ...rest} = updateUser._doc;
            res.status(200).json({
                message:"User updated successfully",
                rest
            });
    } catch (error) {
        next(error)
    }

}

export const deleteUser = async(req,res,next)=>{
        if(req.user.id !== req.params.userId){
            return next(errorHandler(403,"Unathoraized"))
        }
        try {
            await User.findByIdAndDelete(req.params.userId)
            res.status(200).json({
                message:"User deleted successfully"
            })
        } catch (error) {
            next(error)
        }
}




export const signout = async(req,res,next)=>{
    try {
        res.clearCookie("access_token").status(200).json({
            message:"Signout successfull"
        })
    } catch (error) {
        next(error)
    }
}




export const getallusers = async(req,res,next)=>{

    if(!req.user.isAdmin){
        return next(errorHandler(403,"you are not allowed to see all users!"))
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort ==="asc" ? 1 : -1;  
        
        const users = await User.find()
        .sort({createdAt:sortDirection})
        .skip(startIndex)
        .limit(limit);

        const removeUsersPassword = users.map((user)=>{
            const {password, ...rest} = user._doc
            return rest
        })

        const totalUsers = await User.countDocuments();
        
        const now = new Date();

        const onMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

        const lastMonthUsers = await User.countDocuments({createdAt:{$gte:onMonthAgo}});

        res.status(200).json({
            message:"Users fetched successfully",
            users:removeUsersPassword,
            totalUsers,
            lastMonthUsers
        })
        
    } catch (error) {
        next(error)
    }
}