const { Resend } = require("resend");
require("dotenv").config();

// Initialize Resend Email Client
const resend = new Resend(process.env.RESEND_API_KEY);

// --------------------------------------------------------
// SEND USER CONFIRMATION EMAIL
// --------------------------------------------------------
const sendUserConfirmation = async (donation) => {
    try {
        await resend.emails.send({
            from: "Support Circle <onboarding@resend.dev>",
            to: donation.email,
            subject: "Thank You for Your Donation! ❤️",
            html: `
                <h2>Hello ${donation.name},</h2>
                <p>Thank you for supporting our mission.</p>
                <p><strong>Category:</strong> ${donation.category}</p>
                <p><strong>Mobile:</strong> ${donation.mobile}</p>
                <p><strong>Address:</strong> ${donation.address}</p>
                <p>Our team will contact you soon.</p>
                <br>
                <i>सेवा का संकल्प, समाज का समर्थन।</i>
            `
        });

        console.log("📨 User confirmation email sent to:", donation.email);
    } catch (error) {
        console.error("❌ User email failed:", error);
    }
};

// --------------------------------------------------------
// SEND ADMIN NOTIFICATION EMAIL
// --------------------------------------------------------
const sendAdminNotification = async (donation) => {
    try {
        await resend.emails.send({
            from: "Support Circle <onboarding@resend.dev>",
            to: process.env.ADMIN_EMAIL,
            subject: `New Donation Request - ${donation.category}`,
            html: `
                <h2>New Donation Received</h2>
                <p><b>Name:</b> ${donation.name}</p>
                <p><b>Email:</b> ${donation.email}</p>
                <p><b>Mobile:</b> ${donation.mobile}</p>
                <p><b>Category:</b> ${donation.category}</p>
                <p><b>Address:</b> ${donation.address}</p>
                <p><b>Message:</b> ${donation.message || "N/A"}</p>
            `
        });

        console.log("📨 Admin notified at:", process.env.ADMIN_EMAIL);
    } catch (error) {
        console.error("❌ Admin email failed:", error);
    }
};

module.exports = { sendUserConfirmation, sendAdminNotification };
