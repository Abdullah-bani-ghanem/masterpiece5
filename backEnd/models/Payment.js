const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentIntentId: String,
  amount: Number,
  currency: String,
  status: String,
  vehicalId: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  customerEmail: String, 
});

module.exports = mongoose.model('Payment', paymentSchema);