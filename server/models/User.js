import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    email: {type: String, trim: true, unique: true, required: true},
    password: {type: String, trim: true, require: true, minLength: 8},
    name: {type: String, required: true, minLength: 5},
    avatar: String,
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],
    reviews : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    phoneNumber: String,
}, {
    timestamps: true
})

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
 
const User = mongoose.model('User', UserSchema)

export default User;