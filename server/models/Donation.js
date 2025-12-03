const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['teaching', 'Requirements of NGOs', 'Footware', 'Books', 'Fund', 'Ele. Gadgets'],
  },
  email: {
    type: String,
    required: true,
  },
  timingSlot: {
    type: String,
    required: false,
  },
  gadgetType: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  address: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Donation', donationSchema);
