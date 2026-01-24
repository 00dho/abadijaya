const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// 1. LOGIKA LOGIN
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cari user berdasarkan username
        const [users] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);

        if (users.length === 0) {
            return res.status(404).json({ msg: "Username tidak ditemukan" });
        }

        const user = users[0];

        // Cek Password (Bandingkan password input vs hash di DB)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Password salah!" });
        }

        // Kalau benar, buat Token (Kunci Masuk Digital)
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1d' // Token berlaku 1 hari
        });

        res.json({
            status: "Sukses",
            msg: "Login berhasil",
            token: token,
            user: { id: user.id, username: user.username }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

// 2. FITUR BANTUAN: DAFTAR ADMIN BARU (Hanya dipakai sekali buat setup)
exports.registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Enkripsi password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Simpan ke DB
        await db.query('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hashedPassword]);

        res.json({ msg: "Admin berhasil dibuat! Silakan login." });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};