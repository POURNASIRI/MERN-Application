import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './routes/user.route.js'
import signup from './routes/auth.route.js'
import signin from './routes/auth.route.js'
import postRoute from './routes/post.route.js'
import commentRoute from './routes/comment.route.js'
import cookieParser from 'cookie-parser'

dotenv.config()

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('MongoDB connected')
})
.catch(err => {
    console.log(err)
})

const app = express()
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})



app.use(cookieParser())
app.use('/api/user/',users)
app.use('/api/auth', signup)
app.use('/api/auth', signin)
app.use('/api/post', postRoute)
app.use('/api/comment', commentRoute)



// we use middleware to handle Errors and get dynamic errors
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})