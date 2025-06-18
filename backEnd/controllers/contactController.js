const Contact = require('../models/Contact');

// إرسال نموذج الاتصال
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please fill out all fields' });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();
    
    res.status(201).json({ message: 'The form has been submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred, please try again later', error });
  }
};

// جلب جميع الرسائل (للمسؤول)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching data', error });
  }
};



//لحذف الرسالة
exports.deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    await Contact.findByIdAndDelete(contactId);
    res.status(200).json({ message: 'The message has been successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting', error });
  }
};




//للرد على رسالة
exports.replyToContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const { reply } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { reply },
      { new: true }
    );
    res.status(200).json({ message: 'Reply sent successfully', updatedContact });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while responding', error });
  }
};