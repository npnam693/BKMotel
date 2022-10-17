import express, { response } from 'express';
import * as RoomController from '../controllers/RoomController.js'

const router = express.Router();

router.get('/', RoomController.RoomMenu)
router.get('/getRooms', RoomController.getRooms )
// router.post('/store', courseController.store);


export default router;
