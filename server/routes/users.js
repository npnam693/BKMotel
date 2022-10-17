import express, { response } from 'express';
import * as UserController from '../controllers/UserController.js'

const router = express.Router();

router.get('/:username', UserController.showUser)

export default router;
