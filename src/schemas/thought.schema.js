import mongoose from 'mongoose';

const ThoughtSchema = new mongoose.Schema({
    thought: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',
        required: true
    },
    college:{
        type:String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
});

export const Thought = mongoose.model('Thought', ThoughtSchema);


