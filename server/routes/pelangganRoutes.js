const express = require('express');
const router = express.Router();
const pelangganController = require('../controllers/pelangganController');

router.get('/', pelangganController.getAllPelanggan);
router.post('/', pelangganController.tambahPelanggan);

module.exports = router;