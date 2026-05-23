// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); // Import koneksi db tadi

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Configure CORS to allow your frontend domain
app.use(cors({
  origin: [
    'https://www.abadijayafilm.com',
    'https://abadijayafilm.com',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Agar bisa baca data JSON dari frontend

// Route Test Sederhana
app.get('/', (req, res) => {
    res.send('Server Abadijaya Berjalan Normal! 🚀');
});

// Route Test Database (Coba ambil data admin dummy tadi)
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM admins');
        res.json({ status: 'Sukses', data: rows });
    } catch (error) {
        res.status(500).json({ status: 'Gagal', error: error.message });
    }
});

const garansiRoutes = require('./routes/garansiRoutes');
app.use('/api/garansi', garansiRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const pelangganRoutes = require('./routes/pelangganRoutes');
app.use('/api/pelanggan', pelangganRoutes);

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
