// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/payment', paymentController.createPayment);

router.post('/updatePaymentStatus', paymentController.saveTransactionStatus);

module.exports = router;  
