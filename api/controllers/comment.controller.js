import Comment from "../models/comment.model.js"
import { errorHandler } from "../utils/error.js"

export const createComment = async (req,res,next)=>{
    const {content,postId,userId} = req.body

    try {
            if(!content || !postId || !userId){
                return next(errorHandler(400,"Please enter all fields"))
            }
            if(userId !== req.user.id){
                return next(errorHandler(403,"Unathoraized"))
            }

            const newComment = new Comment({
                content,
                postId,
                userId
            })
            await newComment.save()
            res.status(201).json({
                message:"Comment created successfully",
                comment:newComment
            })
    } catch (error) {
        next(error)
    }
}