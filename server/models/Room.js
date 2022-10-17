import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';

const roomSchema = mongoose.Schema({
    title: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    image: [String],
    
    ratingCount: Number,
    ratingPoint: Number,
    area: Number,
    description: String,
    
    slug: {type: String, slug: 'title', unique: true},

    createAt: {
        type: Date,
        default: new Date(),
    }
})


 
const Room = mongoose.model('Room', roomSchema)

export default Room;