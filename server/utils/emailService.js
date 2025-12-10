const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter with explicit configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Verify transporter configuration
transporter.verify(function (error, success) {
    if (error) {
        console.error('Email transporter verification failed:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Send confirmation email to user
const sendUserConfirmation = async (donationData) => {
    const { name, email, category, mobile, address, message, timingSlot } = donationData;

    let emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #ff6b35; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0;">Thank You for Your Contribution!</h1>
            </div>
            <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <p style="font-size: 16px; color: #333;">Dear <strong>${name}</strong>,</p>
                <p style="font-size: 14px; color: #666; line-height: 1.6;">
                    Thank you for your generous contribution to our cause. We have received your donation request and our team will contact you shortly.
                </p>
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #ff6b35; margin-top: 0;">Donation Details:</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: bold;">Category:</td>
                            <td style="padding: 8px 0; color: #333;">${category}</td>
                        </tr>
                        ${timingSlot ? `
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: bold;">Preferred Timing:</td>
                            <td style="padding: 8px 0; color: #333;">${timingSlot}</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: bold;">Mobile:</td>
                            <td style="padding: 8px 0; color: #333;">${mobile}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: bold;">Address:</td>
                            <td style="padding: 8px 0; color: #333;">${address}</td>
                        </tr>
                        ${message ? `
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: bold; vertical-align: top;">Message:</td>
                            <td style="padding: 8px 0; color: #333;">${message}</td>
                        </tr>
                        ` : ''}
                    </table>
                </div>
                <p style="font-size: 14px; color: #666; line-height: 1.6;">
                    Our team will review your request and get in touch with you within 24-48 hours.
                </p>
                <p style="font-size: 14px; color: #666; line-height: 1.6;">
                    If you have any questions, feel free to reply to this email.
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #999; text-align: center;">
                    "सेवा का संकल्प, समाज का समर्थन।"<br>
                    <em>(A pledge to serve, support for society.)</em>
                </p>
            </div>
        </div>
    `;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank You for Your Donation - Confirmation',
        html: emailContent,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Confirmation email sent to user:', email);
        console.log('Message ID:', info.messageId);
        return { success: true };
    } catch (error) {
        console.error('❌ Error sending user confirmation email to:', email);
        console.error('Error details:', error.message);
        if (error.code) console.error('Error code:', error.code);
        if (error.response) console.error('SMTP Response:', error.response);
        return { success: false, error };
    }
};

// Send notification email to admin
const sendAdminNotification = async (donationData) => {
    const { name, email, category, mobile, address, message, timingSlot, createdAt } = donationData;

    let emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #2c3e50; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0;">New Donation Request Received</h1>
            </div>
            <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <p style="font-size: 16px; color: #333;">A new donation request has been submitted.</p>
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #ff6b35; margin-top: 0;">Donor Information:</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: bold;">Name:</td>
                            <td style="padding: 8px 0; color: #333;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                            <td style="padding: 8px 0; color: #333;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: bold;">Mobile:</td>
                            <td style="padding: 8px 0; color: #333;">${mobile}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: bold;">Category:</td>
                            <td style="padding: 8px 0; color: #333;"><strong>${category}</strong></td>
                        </tr>
                        ${timingSlot ? `
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: bold;">Preferred Timing:</td>
                            <td style="padding: 8px 0; color: #333;">${timingSlot}</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: bold;">Address:</td>
                            <td style="padding: 8px 0; color: #333;">${address}</td>
                        </tr>
                        ${message ? `
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: bold; vertical-align: top;">Message:</td>
                            <td style="padding: 8px 0; color: #333;">${message}</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td style="padding: 8px 0; color: #666; font-weight: bold;">Submitted At:</td>
                            <td style="padding: 8px 0; color: #333;">${new Date(createdAt).toLocaleString()}</td>
                        </tr>
                    </table>
                </div>
                <p style="font-size: 14px; color: #666; line-height: 1.6;">
                    Please follow up with the donor within 24-48 hours.
                </p>
            </div>
        </div>
    `;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Donation Request - ${category} - ${name}`,
        html: emailContent,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Notification email sent to admin:', process.env.ADMIN_EMAIL);
        console.log('Message ID:', info.messageId);
        return { success: true };
    } catch (error) {
        console.error('❌ Error sending admin notification email to:', process.env.ADMIN_EMAIL);
        console.error('Error details:', error.message);
        if (error.code) console.error('Error code:', error.code);
        if (error.response) console.error('SMTP Response:', error.response);
        return { success: false, error };
    }
};

module.exports = {
    sendUserConfirmation,
    sendAdminNotification,
};
