import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
    ratingPoint : Number,
    description : String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    },
    createAt: {
        type: Date,
        default: new Date(),
    }
})
 
const Review = mongoose.model('Review', roomSchema)

export default Review;