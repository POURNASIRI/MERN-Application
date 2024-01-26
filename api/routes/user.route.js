import express from 'express'
import { updateUser, users } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router()

router.get('/users', users );
router.put('/update/:userId', verifyToken, updateUser);

export default router