import mongoose from 'mongoose';

const ThoughtSchema = new mongoose.Schema({
  thought: {
    type: String,
    required: true,
    trim: true,
    maxlength: [60, 'Thought cannot be longer than 60 characters.'], // Max length validation
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User',
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a TTL index for the `createdAt` field to expire after 86400 seconds (24 hours)
ThoughtSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

export const Thought = mongoose.model('Thought', ThoughtSchema);
