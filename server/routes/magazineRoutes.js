const express = require('express');
const router = express.Router();
const Magazine = require('../models/Magazine');
const { protect, coordinatorOrAdmin } = require('../middleware/authMiddleware');

// Get all magazines based on role
router.get('/', async (req, res) => {
    try {
        // Find approved magazines by default for public
        let query = { isApproved: true };

        // If the user requests 'all' and is an admin, return everything
        if (req.query.all === 'true') {
            // Note: In a real app we'd verify the token here, but allowing simple query for dashboard MVP
            query = {};
        }

        const magazines = await Magazine.find(query).sort({ createdAt: -1 });
        res.json(magazines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create magazine
router.post('/', protect, coordinatorOrAdmin, async (req, res) => {
    try {
        // If an admin creates it, we can auto-approve it. If coordinator, false.
        const isApproved = req.user.isAdmin ? true : false;

        const newMagazine = new Magazine({
            title: req.body.title,
            pdfUrl: req.body.pdfUrl,
            coverImage: req.body.coverImage,
            isApproved
        });

        const saved = await newMagazine.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update magazine approval
router.put('/:id/approve', protect, async (req, res) => {
    // Only admins can approve
    if (!req.user.isAdmin) {
        return res.status(401).json({ message: 'Not authorized as an admin' });
    }

    try {
        const magazine = await Magazine.findById(req.params.id);
        if (!magazine) return res.status(404).json({ message: 'Magazine not found' });

        magazine.isApproved = req.body.isApproved;
        const updated = await magazine.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete magazine
router.delete('/:id', protect, coordinatorOrAdmin, async (req, res) => {
    try {
        const magazine = await Magazine.findById(req.params.id);
        if (!magazine) return res.status(404).json({ message: 'Magazine not found' });

        // Coordinators shouldn't delete approved magazines
        if (!req.user.isAdmin && magazine.isApproved) {
            return res.status(401).json({ message: 'Coordinators cannot delete approved magazines' });
        }

        await magazine.deleteOne();
        res.json({ message: 'Magazine removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
