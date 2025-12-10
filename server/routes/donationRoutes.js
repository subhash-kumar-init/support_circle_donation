const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");
const { sendUserConfirmation, sendAdminNotification } = require("../utils/emailService");

// ---------------------------------------------
// CREATE DONATION (POST)
// ---------------------------------------------
router.post("/", async (req, res) => {
    try {
        const { name, mobile, category, address, message, email, timingSlot, gadgetType } = req.body;

        // Build Donation Object
        const donationData = {
            name,
            mobile,
            category,
            address,
            message,
            email,
            timingSlot: category === "teaching" ? timingSlot : undefined,
            gadgetType: category === "Ele. Gadgets" ? gadgetType : undefined,
        };

        // Save to DB
        const donation = await new Donation(donationData).save();

        // Send Emails (non-blocking so API does not get slow)
        sendUserConfirmation(donation).catch(err =>
            console.error("User email send failed:", err)
        );

        sendAdminNotification(donation).catch(err =>
            console.error("Admin email send failed:", err)
        );

        // Response
        return res.status(201).json({
            success: true,
            status: 201,
            title: "🙏 Thank you for your support!",
            message:
                "Your donation request has been received successfully. Our team will contact you shortly.",
            note: "A confirmation email has been sent to your inbox.",
            donationId: donation._id,
            data: {
                name: donation.name,
                email: donation.email,
                category: donation.category,
                mobile: donation.mobile,
            },
        });

    } catch (err) {
        console.error("❌ Error creating donation:", err);

        return res.status(500).json({
            success: false,
            status: 500,
            title: "Something went wrong 💔",
            message: "We couldn't submit your donation request. Please try again.",
            error: err.message,
        });
    }
});

// ---------------------------------------------
// GET ALL DONATIONS (Admin Panel)
// ---------------------------------------------
router.get("/", async (req, res) => {
    try {
        const donations = await Donation.find().sort({ createdAt: -1 });
        return res.json(donations);

    } catch (err) {
        console.error("❌ Error fetching donations:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch donations.",
        });
    }
});

// ---------------------------------------------
// UPDATE DONATION STATUS
// ---------------------------------------------
router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        const donation = await Donation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found",
            });
        }

        return res.json({
            success: true,
            message: "Donation status updated successfully",
            updatedDonation: donation,
        });

    } catch (err) {
        console.error("❌ Error updating status:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to update donation status.",
        });
    }
});

module.exports = router;
