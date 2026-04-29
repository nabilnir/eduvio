const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
    teacherId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    teacherName: { type: String, required: true },
    subject: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true }, // e.g., "10:00 AM"
    duration: { type: Number, default: 60 }, // in minutes
    maxStudents: { type: Number, default: 5 },
    enrolledStudents: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    status: { 
        type: String, 
        enum: ['available', 'full', 'completed', 'cancelled'], 
        default: 'available' 
    }
}, { timestamps: true });

module.exports = SlotSchema;
