const Contact = require('../models/Contact');

// @desc    Create contact message
// @route   POST /api/contact
// @access   Public
exports.createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, subject, message } = req.body;

        const contact = await Contact.create({
            firstName,
            lastName,
            email,
            phone,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            data: contact,
            message: 'Contact message sent successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access   Private (Admin)
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
