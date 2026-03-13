const express = require('express');
const router = express.Router();
const Carousel = require('../models/Carousel');
const { protect, coordinatorOrAdmin } = require('../middleware/authMiddleware');

// Get all carousel items based on role
router.get('/', async (req, res) => {
    try {
        // Find approved carousel items by default for public
        let query = { isApproved: true };

        // If the query asks for all items
        if (req.query.all === 'true') {
            query = {};
        }

        const items = await Carousel.find(query).sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create carousel item
router.post('/', protect, coordinatorOrAdmin, async (req, res) => {
    try {
        // If an admin creates it, auto-approve it. If coordinator, false.
        const isApproved = req.user.isAdmin ? true : false;

        const newItem = new Carousel({
            title: req.body.title,
            subtitle: req.body.subtitle,
            imageUrl: req.body.imageUrl,
            isApproved
        });

        const saved = await newItem.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update carousel approval
router.put('/:id/approve', protect, async (req, res) => {
    // Only admins can approve
    if (!req.user.isAdmin) {
        return res.status(401).json({ message: 'Not authorized as an admin' });
    }

    try {
        const item = await Carousel.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Carousel item not found' });

        item.isApproved = req.body.isApproved;
        const updated = await item.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete carousel item
router.delete('/:id', protect, coordinatorOrAdmin, async (req, res) => {
    try {
        const item = await Carousel.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Carousel item not found' });

        // Coordinators shouldn't delete approved items
        if (!req.user.isAdmin && item.isApproved) {
            return res.status(401).json({ message: 'Coordinators cannot delete approved items' });
        }

        await item.deleteOne();
        res.json({ message: 'Carousel item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
