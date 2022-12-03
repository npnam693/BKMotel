import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import * as ReviewController from '../controllers/ReviewController.js'
const router = express.Router();


router.post('/add',verifyToken, ReviewController.AddReview)
router.get('/reviewuser',verifyToken,ReviewController.GetReviewUser)
router.get('/reviewroom',verifyToken,ReviewController.GetReviewRoom)
router.put('/updatereview/:id',verifyToken,ReviewController.UpdateReview)
router.delete('/deletereview/:id',verifyToken,ReviewController.DeleteReview)

export default router;
