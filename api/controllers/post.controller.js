import Post from "../models/post.model.js"
import { errorHandler } from "../utils/error.js"

export const createPost = async (req,res,next)=>{


        if(!req.user.isAdmin){
            return next(errorHandler(403,"you are not allowed to create a post"))
        }
        if(!req.body.title || !req.body.content){
            return next(errorHandler(400,"Please enter all fields"))
        }
        const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g,"")

        const newPost = new Post({
            ...req.body,slug,userId:req.user.id
        })

        try {
            const savePost = await newPost.save();
            res.status(201).json({
                message:"Post created successfully",
                post:savePost
            })
        } catch (error) {
            next(error)
        }

}