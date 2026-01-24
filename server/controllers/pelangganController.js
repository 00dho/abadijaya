const db = require('../config/db');

// 1. AMBIL SEMUA DATA PELANGGAN
exports.getAllPelanggan = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM pelanggan ORDER BY id DESC");
        res.json(results);
    } catch (error) {
        res.status(500).json({ msg: "Gagal mengambil data pelanggan" });
    }
};

// 2. TAMBAH PELANGGAN BARU (Sesuai Flowchart: Nama, HP, Alamat)
exports.tambahPelanggan = async (req, res) => {
    try {
        const { nama, no_hp, alamat } = req.body;

        // Validasi
        if (!nama || !no_hp) {
            return res.status(400).json({ msg: "Nama dan Nomor HP wajib diisi!" });
        }

        // Cek No HP kembar
        const [existing] = await db.query("SELECT id FROM pelanggan WHERE no_hp = ?", [no_hp]);
        if (existing.length > 0) {
            return res.status(400).json({ msg: "Nomor HP sudah terdaftar!" });
        }

        // Simpan
        await db.query(
            "INSERT INTO pelanggan (nama, no_hp, alamat) VALUES (?, ?, ?)",
            [nama, no_hp, alamat]
        );

        res.json({ msg: "Pelanggan berhasil ditambahkan!" });
    } catch (error) {
        res.status(500).json({ msg: "Gagal menyimpan data" });
    }
};