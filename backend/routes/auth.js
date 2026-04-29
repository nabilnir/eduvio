const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const router = express.Router();

console.log('--- Auth Router Loaded ---');


let db;
const client = new MongoClient(process.env.MONGO_URI);

async function getDb() {
    if (db) return db;
    await client.connect();
    db = client.db('eduvio');
    return db;
}

// ── REGISTER ──────────────────────────────
router.post('/register', async (req, res) => {
    const { fullName, email, password, role, institution } = req.body;

    try {
        const database = await getDb();
        const users = database.collection('users');
        
        // Checking if user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await users.insertOne({
            fullName, 
            email,
            password: hashedPassword,
            role,
            institution,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Create JWT token 
        const token = jwt.sign(
            { id: result.insertedId, role: role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({ token, role, name: fullName });
    } catch (err) {
        console.error('Register Error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ── LOGIN ─────────────────────────────────
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const database = await getDb();
        const users = database.collection('users');
        
        // Find user by email
        const user = await users.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token, role: user.role, name: user.fullName });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ── SOCIAL LOGIN (GOOGLE/MICROSOFT) ────────
router.post('/social-login', async (req, res) => {
    const { fullName, email, profilePic, provider } = req.body;

    try {
        const database = await getDb();
        const users = database.collection('users');

        // Find or create user
        let user = await users.findOne({ email });

        if (!user) {
            const result = await users.insertOne({
                fullName,
                email,
                profilePic,
                provider, 
                role: 'student', 
                createdAt: new Date(),
                updatedAt: new Date()
            });
            user = { _id: result.insertedId, fullName, email, role: 'student' };
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token, role: user.role, name: user.fullName });
    } catch (err) {
        console.error('Social Login Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
