import mongoose from "mongoose";
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,  
        lowercase: true, 
        match: [/^[a-z0-9]+$/, 'Username must only contain lowercase letters and numbers'], 
        trim: true,
    },
    college: {
        type: String,
        required: true,  
    },
    password: {
        type: String,
        required: true,  
        minlength: [6, 'Password must be at least 6 characters long'], 
    },
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) { // Hash the password only if it's modified
        try {
            const salt = await bcrypt.genSalt(10); 
            this.password = await bcrypt.hash(this.password, salt); 
            next(); 
        } catch (error) {
            next(error); 
        }
    } else {
        next();
    }
});

export const userModel = mongoose.model("user", userSchema);