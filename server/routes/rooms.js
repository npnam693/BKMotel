import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import * as RoomController from '../controllers/RoomController.js'

const router = express.Router();

router.get('/', RoomController.roomMenu)
router.get('/:id', RoomController.getRoom)
router.get('/find', verifyToken, RoomController.findRooms)

export default router;
