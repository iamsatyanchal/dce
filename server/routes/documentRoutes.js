const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const { protect, coordinatorOrAdmin } = require('../middleware/authMiddleware');

// Get documents (publicly accessible)
router.get('/', async (req, res) => {
    try {
        let query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Sort by newest first
        const documents = await Document.find(query).sort({ createdAt: -1 });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create document (Admin only)
router.post('/', protect, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).json({ message: 'Not authorized as an admin' });
    }

    try {
        const newDoc = new Document({
            title: req.body.title,
            fileUrl: req.body.fileUrl,
            category: req.body.category
        });

        const saved = await newDoc.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete document (Admin only)
router.delete('/:id', protect, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(401).json({ message: 'Not authorized as an admin' });
    }

    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Document not found' });

        await doc.deleteOne();
        res.json({ message: 'Document removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
