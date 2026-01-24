// server/config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Kita buat Pool (Kolam Koneksi)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Cek koneksi sekedar untuk info di terminal
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Gagal koneksi ke Database:', err.message);
    } else {
        console.log('✅ Berhasil koneksi ke Database MySQL!');
        connection.release();
    }
});

// PENTING: Kita harus export versi "promise()" agar bisa pakai "await" di index.js
module.exports = pool.promise();