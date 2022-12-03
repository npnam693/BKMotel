
import Room from '../models/Room.js'
import Review from '../models/Review.js'
import User from '../models/User.js'


// @create review 
// [POST] /api/reviews/add
// push review to array of Room and to array of User
export const AddReview = async (req,res) =>{
    const {ratingPoint,description,roomId} = req.body
    const userId = req.user._id
    console.log(roomId)
   try {
    const newReview = new Review({
        ratingPoint,
        description,
       creator:userId,
       room:roomId,
    }) 
    await newReview.save()
    const reviewId=newReview.id
   /* let query 
    query=  {
        $push: { reviews: reviewId }
    }
    
    User.findByIdAndUpdate(userId,
        query,
        {new: true}
        ).populate('reviews')*/
    
    res.json({ success: true, review: newReview })
   } catch (error) {
    console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
   }
   
    
}
//get review
// [GET] /api/reviews/reviewuser
export const GetReviewUser = async (req,res)=>{
    const userId = req.user._id
    try {
        //sort trừ password
        const reviews= await Review.find({creator:userId}).populate('room')
        //const room= await Review.find()
        //const reviewsRoom= await Review.find({creator:userId}).populate('room')
        res.json({success:true, reviews})
    } catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }

}
//[GET] /api/reviews/reviewroom
export const GetReviewRoom =async (req,res)=>{
    const roomId = req.body
    try {
        //sort -password
        const reviews =await Review.find({room:roomId}).populate('creator',['name'])
        console.log(reviews)
        res.json({success:true, reviews})
    } catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
//put UpdateReview
// [PUT] [GET] /api/reviews/updatereview/:id
export const UpdateReview =async (req,res)=>{
    const {ratingPoint,description} = req.body
    const userId = req.user._id
    try {
        let updateReview = {
            ratingPoint,
            description: description ||'',
            creator:userId
           
        }
        const ReviewUpdateCondition ={_id:req.params.id,creator:userId}
        updateReview = await Review.findOneAndUpdate(ReviewUpdateCondition,updateReview,{new:true})
        if(!updateReview)
        {
            return res.status(401).json({success: false, message: 'Review not found or user not authorised'})
        }
        res.json({success:true, message:'Update success',review:updateReview})
    } catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }

}
export const DeleteReview = async(req,res) => {
    const userId = req.user._id
    try {
        const ReviewDeleteCondition ={_id:req.params.id,creator:userId}
        const deleteReview= await Review.findOneAndDelete(ReviewDeleteCondition)
        if(!deleteReview)
        {
            return res.status(401).json({success: false, message: 'Review not found or user not authorised'})
        }
        res.json({success:true, message:'Delete success',review:deleteReview})
    } catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
    
}
