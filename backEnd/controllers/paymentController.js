const Payment = require('../models/Payment');
const Car = require('../models/Car');
const Bike = require('../models/bikeModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.createPayment = async (req, res) => {
  const { amount, customerEmail, vehicalId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      receipt_email: customerEmail, // optional
    }); 

    // ✅ Save to MongoDB
    const savedPayment = new Payment({
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency, 
      status: paymentIntent.status,
      customerEmail: customerEmail || '',
      vehicalId
    });

    await savedPayment.save();

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(400).json({ error: error.message });
  }
};





exports.saveTransactionStatus = async (req, res) => {
  const { paymentIntentId, status, vehicalId } = req.body;

  try {
    // تحديث سجل الدفع
    const payment = await Payment.findOneAndUpdate(
      { paymentIntentId },
      { status }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // نحاول نجيب السيارة أو الدراجة حسب المعرف
    const isCar = await Car.findById(vehicalId);
    const isBike = await Bike.findById(vehicalId);

    // تحديث حالة الدفع حسب النوع
    if (isCar) {
      if (status === 'succeeded') {
        await Car.findByIdAndUpdate(vehicalId, { payment: true });
      }
    } else if (isBike) {
      if (status === 'succeeded') {
        await Bike.findByIdAndUpdate(vehicalId, { payment: true });
      }
    } else {
      return res.status(404).json({ message: 'Neither Car nor Bike found with the provided ID' });
    }

    res.json({ message: 'Payment status updated successfully', payment });
  } catch (error) {
    console.error('❌ Error in saveTransactionStatus:', error);
    res.status(500).json({ error: error.message });
  }
};
