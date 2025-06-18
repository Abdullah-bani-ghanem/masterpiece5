const express = require('express');
const { submitContactForm, getAllContacts ,deleteContact,replyToContact} = require('../controllers/contactController');
const router = express.Router();

router.post('/contact', submitContactForm);
router.get('/contacts', getAllContacts);

router.delete('/contacts/:id', deleteContact);
router.put('/contacts/:id/reply', replyToContact);

module.exports = router;
