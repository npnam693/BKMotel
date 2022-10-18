import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';

const RoomSchema = new mongoose.Schema({
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
}, {
    timestamps: true
})


 
const Room = mongoose.model('Room', RoomSchema)

export default Room;