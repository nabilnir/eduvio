const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// ── REGISTER ──────────────────────────────
router.post('/register', async (req, res) => {
    const { fullName, email, password, role, institution } = req.body;

    try {
        // Checking if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with role
        const user = await User.create({
            fullName, email,
            password: hashedPassword,
            role,       // <-- "teacher" or "student" from the form
            institution
        });

        // Create JWT token 
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({ token, role: user.role, name: user.fullName });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ── LOGIN ─────────────────────────────────
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Create JWT token (includes role!)
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token, role: user.role, name: user.fullName });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
