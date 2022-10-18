<<<<<<< HEAD

=======
>>>>>>> 31394c55e938d4ef56676320213eca249c025ecf
import express from 'express';
import * as UserController from '../controllers/UserController.js'
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(UserController.registerUser).get(verifyToken, UserController.getAllUsers)
router.post('/login', UserController.authUser)

export default router;