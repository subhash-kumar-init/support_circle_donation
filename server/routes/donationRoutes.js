const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const { sendUserConfirmation, sendAdminNotification } = require('../utils/emailService');

// @route   POST /api/donations
// @desc    Create a new donation
// @access  Public
router.post('/', async (req, res) => {
    const { name, mobile, category, address, message, email, timingSlot, gadgetType } = req.body;

    try {
        const newDonation = new Donation({
            name,
            mobile,
            category,
            address,
            message,
            email,
            timingSlot: category === 'teaching' ? timingSlot : undefined,
            gadgetType: category === 'Ele. Gadgets' ? gadgetType : undefined,
        });

        const donation = await newDonation.save();

        // Send emails (don't fail the request if email fails)
        try {
            await sendUserConfirmation(donation);
            await sendAdminNotification(donation);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Continue even if email fails
        }

        res.json({
            success: true,
            message: 'Donation request submitted successfully! Check your email for confirmation.',
            donation
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   GET /api/donations
// @desc    Get all donations
// @access  Private (TODO: Add auth middleware)
router.get('/', async (req, res) => {
    try {
        const donations = await Donation.find().sort({ createdAt: -1 });
        res.json(donations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/donations/:id/status
// @desc    Update donation status
// @access  Private
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const donation = await Donation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(donation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
