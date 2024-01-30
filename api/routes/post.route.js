import express from 'express'
import { createPost, deletepost, getposts, updatepost } from "../controllers/post.controller.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()


router.post('/create-post', verifyToken,createPost)
router.get('/get-posts', getposts)
router.delete('/delete-post/:postId/:userId', verifyToken ,deletepost)
router.put('/update-post/:postId/:userId', verifyToken ,updatepost)

export default router