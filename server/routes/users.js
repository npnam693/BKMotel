
import express from 'express';
import * as UserController from '../controllers/UserController.js'
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(UserController.registerUser).get(verifyToken, UserController.getAllUsers)
router.post('/login', UserController.authUser)

export default router;