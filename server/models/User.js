import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    passwork: String,
    
    name: String,
    avatar: String,
    favourites: [String],
    reviews : [String],
    
    
    phoneNumber: String,


    createAt: {
        type: Date,
        default: new Date(),
    }
})
 
const User = mongoose.model('User', UserSchema)

export default User;