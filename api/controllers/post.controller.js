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

export const getposts = async (req,res,next)=>{

    try {
        
        const startIndex = parseInt(req.query.startIndex) || 0; 
        const limit = parseInt(req.query.limit) || 10; 
        const sortDirection = req.query.order ==="asc" ? 1 : -1;
        const posts = await Post.find({ //find all posts 
            ...(req.query.userId && {userId:req.query.userId}),
            ...(req.query.category && {category:req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postId && {_id:req.query.postId}),
            ...(req.query.searchTerm && {
                $or:[
                    {title:{$regex:req.query.searchTerm,$options:"i"}},
                    {content:{$regex:req.query.searchTerm,$options:"i"}}
                ],
            }),
        }).sort({updateAt:sortDirection}).skip(startIndex).limit(limit); // get posts with pagination

        // get all posts
        const totalPosts = await Post.countDocuments();

        // show last month posts
        const now = new Date()
        const onMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const lastMonthPosts = await Post.countDocuments({createdAt:{$gte:onMonthAgo}});

        res.status(200).json({
            message:"Posts fetched successfully",
            posts,
            totalPosts,
            lastMonthPosts
        })

    } catch (error) {
        next(error)
    }
}




export const deletepost = async(req,res,next)=>{

      if(!req.user.isAdmin || !req.user.id === req.params.userId){
          return next(errorHandler(403,"you are not allowed to delete a post"))
      }
      try {
          await Post.findByIdAndDelete(req.params.postId)
          res.status(200).json({
              message:"Post deleted successfully"
          })
      } catch (error) {
          next(error)
      }
}





export const updatepost = async (req,res,next)=>{

    if(!req.user.isAdmin || !req.user.id === req.params.userId){
        return next(errorHandler(403,"you are not allowed to update a post"))
    }
    try{
        
        const updatePost = await Post.findByIdAndUpdate(req.params.postId,{
            $set:{
                title:req.body.title,
                content:req.body.content,
                category:req.body.category,
                image:req.body.image
            }
        },{new:true})
         res.status(200).json({
             message:"Post updated successfully",
             post:updatePost
         })
    }catch (error) {
        next(error)
    }

}