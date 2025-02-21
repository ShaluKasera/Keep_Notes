import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        enum: [
            'General', 
            'Work', 
            'Personal', 
            'Education', 
            'Ideas', 
            'To-Do', 
            'Projects', 
            'Reminders'
        ],
        default: 'General', 
    },
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);
