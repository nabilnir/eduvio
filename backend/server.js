const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json());

// Global DB variable for connection persistence
let db;
const client = new MongoClient(process.env.MONGO_URI);

// Middleware to ensure DB connection
const connectDB = async (req, res, next) => {
    if (!db) {
        try {
            await client.connect();
            db = client.db('eduvio');
            console.log('✅ MongoDB Connected');
        } catch (err) {
            return res.status(500).json({ message: 'DB Connection Error' });
        }
    }
    next();
};

app.use(connectDB);

// ── AUTH ROUTES ────────────────────────────────
app.post('/api/auth/social-login', async (req, res) => {
    const { fullName, email, profilePic, provider } = req.body;
    try {
        const users = db.collection('users');
        let user = await users.findOne({ email });
        if (!user) {
            const result = await users.insertOne({ fullName, email, profilePic, provider, role: 'student', createdAt: new Date() });
            user = { _id: result.insertedId, fullName, email, role: 'student' };
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, role: user.role, name: user.fullName, profilePic: user.profilePic });
    } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

app.post('/api/auth/register', async (req, res) => {
    const { fullName, email, password, role, institution } = req.body;
    try {
        const users = db.collection('users');
        const existingUser = await users.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await users.insertOne({ fullName, email, password: hashedPassword, role, institution, createdAt: new Date() });
        const token = jwt.sign({ id: result.insertedId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ token, role, name: fullName });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = db.collection('users');
        const user = await users.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, role: user.role, name: user.fullName, profilePic: user.profilePic });
    } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// ── SLOTS ROUTES ────────────────────────────────
app.get('/api/slots', async (req, res) => {
    try {
        const now = new Date();
        const slotsCollection = db.collection('slots');
        const allSlots = await slotsCollection.find({}).toArray();
        const pastSlotIds = allSlots.filter(slot => new Date(`${slot.date}T${slot.startTime}`) < now).map(slot => slot._id);
        if (pastSlotIds.length > 0) await slotsCollection.deleteMany({ _id: { $in: pastSlotIds } });
        const validSlots = await slotsCollection.find({}).toArray();
        res.json(validSlots);
    } catch (err) { res.status(500).json({ message: 'Error' }); }
});

app.post('/api/slots', async (req, res) => {
    const { date, startTime, endTime, displayDate } = req.body;
    try {
        const slots = db.collection('slots');
        const now = new Date();
        const slotStart = new Date(`${date}T${startTime}`);
        if (slotStart < now) return res.status(400).json({ message: 'Cannot create slots in the past!' });
        const existingSlot = await slots.findOne({ date, $or: [{ startTime: { $lt: endTime, $gte: startTime } }, { endTime: { $gt: startTime, $lte: endTime } }, { startTime: startTime }] });
        if (existingSlot) return res.status(400).json({ message: 'Time conflict! Slot already exists.' });
        const newSlot = { date, startTime, endTime, displayDate, status: 'Available', createdAt: new Date() };
        await slots.insertOne(newSlot);
        res.status(201).json(newSlot);
    } catch (err) { res.status(500).json({ message: 'Error' }); }
});

app.put('/api/slots/:id', async (req, res) => {
    const { date, startTime, endTime, displayDate } = req.body;
    try {
        if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
        const slot = await db.collection('slots').findOne({ _id: new ObjectId(req.params.id) });
        if (!slot) return res.status(404).json({ message: 'Not found' });
        if (slot.status === 'Booked') return res.status(400).json({ message: 'Cannot update booked slot!' });

        await db.collection('slots').updateOne({ _id: new ObjectId(req.params.id) }, { $set: { date, startTime, endTime, displayDate, updatedAt: new Date() } });
        res.json({ message: 'Updated' });
    } catch (err) { res.status(500).json({ message: 'Error' }); }
});

app.delete('/api/slots/:id', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
        await db.collection('slots').deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ message: 'Error' }); }
});

app.patch('/api/slots/book/:id', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
        const result = await db.collection('slots').updateOne({ _id: new ObjectId(req.params.id), status: 'Available' }, { $set: { status: 'Booked' } });
        if (result.matchedCount === 0) return res.status(400).json({ message: 'Already booked' });
        res.json({ message: 'Success' });
    } catch (err) { res.status(500).json({ message: 'Error' }); }
});

// For Vercel, we export the app
module.exports = app;

// For local development, we still allow app.listen
if (process.env.NODE_ENV !== 'production') {
    app.listen(5000, () => console.log('🚀 Local Server on Port 5000'));
}