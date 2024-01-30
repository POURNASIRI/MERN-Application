import express from 'express'
import { deleteUser, getallusers, signout, updateUser, users } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router()

router.get('/users', users );
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/allusers', verifyToken, getallusers);

export default router