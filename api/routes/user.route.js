import express from 'express'

const router = express.Router()

router.get('/users', (req, res) => {
    res.json({message:"users route is working correctly 😀"}) 
})

export default router