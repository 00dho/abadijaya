const express = require('express');
const router = express.Router();
const garansiController = require('../controllers/garansiController');

// 1. Jalur Cek Garansi (GET)
router.get('/cek', garansiController.cekGaransiByHP);

// 2. Jalur Ambil Semua Data untuk Dashboard (GET)
router.get('/all', garansiController.getAllGaransi);

// 3. JALUR TAMBAH GARANSI (POST) <-- INI YANG HILANG/ERROR
// Pastikan baris ini ada!
router.post('/tambah', garansiController.tambahGaransi);

router.delete('/:id', garansiController.deleteGaransi);

module.exports = router;