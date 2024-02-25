import express from 'express'
import { deleteUser, deleteusers, getUser, getallusers, signout, updateUser, users } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router()

router.get('/users', users );
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/allusers', verifyToken, getallusers);
router.get('/:userId', getUser)
router.delete('/delete-users/:userId/:adminId', verifyToken, deleteusers);

export default router