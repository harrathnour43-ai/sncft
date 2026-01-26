const express = require('express');
const router = express.Router();
const {
    createContact,
    getContacts
} = require('../controllers/contactController');

router.route('/').post(createContact);
router.route('/').get(getContacts);

module.exports = router;
