import express from 'express'
import { createPost, getposts } from "../controllers/post.controller.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()


router.post('/create-post', verifyToken,createPost)
router.get('/get-posts', getposts)

export default router