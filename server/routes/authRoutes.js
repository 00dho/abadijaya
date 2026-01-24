const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Jalur Login: POST /api/auth/login
router.post('/login', authController.login);

// Jalur Bikin Admin: POST /api/auth/register
router.post('/register', authController.registerAdmin);

module.exports = router;