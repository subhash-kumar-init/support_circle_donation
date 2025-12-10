const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');

dotenv.config();

console.log('--- Diagnostic Start ---');
console.log('MONGO_URI Length:', process.env.MONGO_URI ? process.env.MONGO_URI.length : 0);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS Length:', process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.length : 0);

async function runDiagnostics() {
    try {
        // 1. Check MongoDB
        console.log('\n1. Testing MongoDB Connection...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected Successfully');

        // 2. Check Admin User
        console.log('\n2. Checking Admin User...');
        const admin = await Admin.findOne({ username: 'admin' });
        if (admin) {
            console.log('✅ Admin user "admin" found in database.');
        } else {
            console.log('❌ Admin user "admin" NOT found. Attempting to seed...');
            const newAdmin = new Admin({
                username: 'admin',
                password: 'password123',
            });
            await newAdmin.save();
            console.log('✅ Admin user created successfully.');
        }

        // 3. Check Email Configuration
        console.log('\n3. Testing Email Configuration...');
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.verify();
        console.log('✅ Email Credentials verified successfully.');

    } catch (error) {
        console.error('\n❌ DIAGNOSTIC FAILURE:', error.message);
        if (error.code === 'EAUTH') {
            console.error('   -> This is an authentication error. Check EMAIL_USER and EMAIL_PASSWORD.');
        }
    } finally {
        console.log('\n--- Diagnostic End ---');
        mongoose.disconnect();
    }
}

runDiagnostics();
