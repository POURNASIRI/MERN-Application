import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './routes/user.route.js'
import signup from './routes/auth.route.js'

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


app.use('/api/user/',users)
app.use('/api/auth', signup)