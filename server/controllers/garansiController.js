// server/controllers/garansiController.js
const db = require('../config/db');

// LOGIKA 1: Cek Garansi via Nomor HP (Untuk User Umum)
exports.cekGaransiByHP = async (req, res) => {
    try {
        const { no_hp } = req.query; // Ambil no_hp dari URL (?no_hp=0812...)

        if (!no_hp) {
            return res.status(400).json({ msg: "Nomor HP wajib diisi!" });
        }

        // Query JOIN untuk menggabungkan data Pelanggan & Garansi
        const query = `
            SELECT 
                p.nama, 
                p.no_hp,
                p.alamat,
                g.plat_nomor, 
                g.tipe_mobil, 
                g.film_depan, 
                g.film_samping, 
                g.film_belakang,
                g.tgl_pasang,
                g.masa_berlaku,
                g.keterangan
            FROM pelanggan p
            JOIN garansi g ON p.id = g.pelanggan_id
            WHERE p.no_hp = ?
        `;

        const [results] = await db.query(query, [no_hp]);

        if (results.length === 0) {
            return res.status(404).json({ msg: "Data tidak ditemukan. Cek kembali nomor HP Anda." });
        }

        res.json({
            status: "Sukses",
            total_mobil: results.length,
            pemilik: results[0].nama,
            data: results
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};

// 2. TAMBAH GARANSI BARU (Untuk Admin)
exports.tambahGaransi = async (req, res) => {
    try {
        const { 
            pelanggan_id,         // <-- Kita terima ID-nya saja
            plat_nomor, 
            tipe_mobil, 
            film_depan, 
            film_samping, 
            film_belakang, 
            tgl_pasang,           // <-- Tanggal pasang input manual
            keterangan 
        } = req.body;

        // Validasi
        if (!pelanggan_id || !plat_nomor || !tgl_pasang) {
            return res.status(400).json({ msg: "Pelanggan, Plat Nomor, dan Tanggal Pasang wajib diisi!" });
        }

        // HITUNG MASA BERLAKU (5 Tahun dari Tanggal Pasang yang diinput)
        const dateObj = new Date(tgl_pasang);
        dateObj.setFullYear(dateObj.getFullYear() + 5); 
        // Format ke YYYY-MM-DD
        const masa_berlaku = dateObj.toISOString().split('T')[0];

        // SIMPAN DATA
        await db.query(
            `INSERT INTO garansi 
            (pelanggan_id, plat_nomor, tipe_mobil, film_depan, film_samping, film_belakang, tgl_pasang, masa_berlaku, keterangan) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [pelanggan_id, plat_nomor, tipe_mobil, film_depan, film_samping, film_belakang, tgl_pasang, masa_berlaku, keterangan]
        );

        res.json({ msg: "Data Garansi Berhasil Disimpan!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Gagal menyimpan data", error: error.message });
    }
};

exports.getAllGaransi = async (req, res) => {
    try {
        const query = `
            SELECT 
                g.id,
                p.nama, 
                p.no_hp, 
                p.alamat,       /* <-- Tambah Alamat */
                g.plat_nomor, 
                g.tipe_mobil, 
                g.film_depan,   /* <-- Tambah Film Depan */
                g.film_samping, /* <-- Tambah Film Samping */
                g.film_belakang,/* <-- Tambah Film Belakang */
                g.tgl_pasang,   /* <-- Tambah Tgl Pasang */
                g.masa_berlaku,
                g.keterangan    /* <-- Tambah Keterangan */
            FROM garansi g
            JOIN pelanggan p ON g.pelanggan_id = p.id
            ORDER BY g.id DESC
        `;
        const [results] = await db.query(query);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Gagal mengambil data" });
    }
};


exports.deleteGaransi = async (req, res) => {
    try {
        const { id } = req.params; // Ambil ID dari URL
        
        // Hapus data dari tabel garansi
        await db.query('DELETE FROM garansi WHERE id = ?', [id]);

        res.json({ msg: "Data garansi berhasil dihapus!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Gagal menghapus data" });
    }
};