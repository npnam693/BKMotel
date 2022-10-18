import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    ratingPoint : Number,
    description : String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    }
}, {
    timestamps: true
})
 
const Review = mongoose.model('Review', ReviewSchema)

export default Review;