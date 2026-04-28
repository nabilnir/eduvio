const mongoose = require('mongoose');
const { unique } = require('next/dist/build/utils');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, erum: ['teacher', 'student'], require: true },
    institution: { type: String },
}, { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);

