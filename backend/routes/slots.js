const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// ── GET all slots (authenticated) ─────────────────────────────
router.get('/', authMiddleware, async (req, res) => {
    try {
       
        res.json({ message: 'GET /api/slots — list all slots', user: req.user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ── GET a single slot by ID ────────────────────────────────────
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        res.json({ message: `GET /api/slots/${req.params.id}` });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ── CREATE a new slot (teachers only) ─────────────────────────
router.post('/', authMiddleware, async (req, res) => {
    if (req.user.role !== 'teacher') {
        return res.status(403).json({ message: 'Only teachers can create slots' });
    }
    try {
        
        res.status(201).json({ message: 'POST /api/slots — slot created', body: req.body });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ── UPDATE a slot ──────────────────────────────────────────────
router.put('/:id', authMiddleware, async (req, res) => {
    if (req.user.role !== 'teacher') {
        return res.status(403).json({ message: 'Only teachers can update slots' });
    }
    try {
        res.json({ message: `PUT /api/slots/${req.params.id}` });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ── DELETE a slot ──────────────────────────────────────────────
router.delete('/:id', authMiddleware, async (req, res) => {
    if (req.user.role !== 'teacher') {
        return res.status(403).json({ message: 'Only teachers can delete slots' });
    }
    try {
        res.json({ message: `DELETE /api/slots/${req.params.id}` });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
