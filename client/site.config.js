// ============================================================================
// PUSAT DATA SEO & IDENTITAS BISNIS
// ----------------------------------------------------------------------------
// INI SATU-SATUNYA FILE YANG PERLU DIUBAH kalau ganti domain, alamat,
// nomor telepon, atau jam buka. Isinya otomatis dipakai oleh:
//   - index.html        (title, meta description, Open Graph, structured data)
//   - robots.txt        (dibuat otomatis saat build)
//   - sitemap.xml       (dibuat otomatis saat build)
//   - komponen <Seo />  (judul & deskripsi per halaman)
//   - Footer            (alamat, telepon, jam buka)
//
// Kolom yang masih kosong ('') akan dilewati dengan aman, TIDAK akan
// menghasilkan data palsu di Google. Isi kalau datanya sudah pasti.
// ============================================================================

export const SITE = {
  // --- WAJIB DIGANTI SEBELUM DEPLOY ---------------------------------------
  // Alamat website tanpa garis miring di belakang.
  url: 'https://abadijayafilm.com', // <<< GANTI dengan domain asli Anda

  // --- IDENTITAS BISNIS ---------------------------------------------------
  name: 'Abadi Jaya Film',
  legalName: 'Abadi Jaya Film',
  shortDescription:
    'Spesialis pemasangan kaca film mobil di Bekasi. Produk 100% original, pengerjaan rapi, garansi resmi hingga 5 tahun.',

  // Dipakai sebagai meta description halaman utama (ideal 150-160 karakter).
  description:
    'Pasang kaca film mobil di Bekasi bersama Abadi Jaya Film. Kaca film 3M, Solar Premium & Illusion 100% original, tolak panas hingga 99%, garansi resmi 5 tahun. Cek garansi online.',

  // --- KONTAK -------------------------------------------------------------
  phone: '+6285880202593', // format internasional, untuk Google & tombol telepon
  phoneDisplay: '0858-8020-2593', // format yang ditampilkan ke pengunjung
  whatsapp: '6285880202593', // untuk link wa.me
  email: '', // opsional, contoh: 'halo@abadijayafilm.com'

  // --- ALAMAT (PENTING UNTUK SEO LOKAL) -----------------------------------
  // Alamat di website HARUS sama persis dengan yang ada di Google Business
  // Profile. Beda penulisan bisa menurunkan peringkat pencarian lokal.
  address: {
    street: '', // <<< ISI, contoh: 'Jl. Raya Pekayon No. 12'
    district: '', // <<< ISI kecamatan, contoh: 'Bekasi Selatan'
    city: 'Bekasi',
    region: 'Jawa Barat',
    postalCode: '', // <<< ISI kode pos
    country: 'ID',
  },

  // Koordinat lokasi bengkel. Ambil dari Google Maps: klik kanan pada titik
  // lokasi -> angka paling atas adalah "latitude, longitude".
  geo: {
    latitude: '', // <<< ISI, contoh: '-6.264610'
    longitude: '', // <<< ISI, contoh: '106.992416'
  },

  // Kota/kecamatan lain yang ikut dilayani. Membantu muncul di pencarian
  // sekitar, tapi jangan diisi kota yang tidak benar-benar dilayani.
  areaServed: ['Bekasi', 'Kota Bekasi', 'Kabupaten Bekasi', 'Cikarang', 'Jakarta Timur'],

  // --- JAM OPERASIONAL ----------------------------------------------------
  // Format 24 jam. Hapus baris hari kalau tutup di hari tersebut.
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '17:00' },
    { days: ['Sunday'], opens: '09:00', closes: '15:00' },
  ],
  openingHoursDisplay: 'Senin - Sabtu 08.00 - 17.00 | Minggu 09.00 - 15.00',

  priceRange: 'Rp 800.000 - Rp 3.000.000',

  // --- PROFIL LAIN (dipakai Google untuk memverifikasi bisnis) ------------
  // Isi yang ada saja, sisanya biarkan kosong.
  profiles: {
    googleBusiness: '', // <<< ISI link Google Business Profile / Google Maps
    instagram: '',
    facebook: '',
    tiktok: '',
  },

  // --- GAMBAR PREVIEW SAAT LINK DIBAGIKAN --------------------------------
  // Muncul di WhatsApp, Facebook, Instagram DM. Idealnya 1200x630 piksel.
  // File diambil dari folder client/public/.
  ogImage: '/logo.png',
  ogImageWidth: '1749',
  ogImageHeight: '807',
};

// ----------------------------------------------------------------------------
// JUDUL & DESKRIPSI TIAP HALAMAN
// Inilah teks yang muncul di hasil pencarian Google.
//   title       : usahakan di bawah 60 karakter, kata kunci di depan.
//   description : usahakan 150-160 karakter, tulis seperti mengajak orang.
// ----------------------------------------------------------------------------
export const PAGE_SEO = {
  home: {
    title: 'Kaca Film Mobil Bekasi - Abadi Jaya Film | Garansi 5 Tahun',
    description: SITE.description,
  },
  cekGaransi: {
    title: 'Cek Garansi Kaca Film Online - Abadi Jaya Film Bekasi',
    description:
      'Cek masa berlaku garansi kaca film mobil Anda secara online. Masukkan nomor HP terdaftar dan unduh kartu garansi resmi Abadi Jaya Film Bekasi berbentuk PDF.',
  },
  dokumentasi: {
    title: 'Dokumentasi Pemasangan Kaca Film - Abadi Jaya Film Bekasi',
    description:
      'Galeri hasil pemasangan kaca film mobil oleh Abadi Jaya Film Bekasi. Lihat sendiri kerapian pengerjaan dan testimoni pelanggan sebelum Anda memutuskan.',
  },
};

// ----------------------------------------------------------------------------
// DAFTAR HALAMAN PUBLIK
// Dipakai untuk membuat sitemap.xml otomatis. Halaman admin sengaja TIDAK
// dimasukkan supaya tidak terindeks Google.
//   priority   : seberapa penting halaman ini (0.0 - 1.0)
//   changefreq : perkiraan seberapa sering isinya berubah
// ----------------------------------------------------------------------------
export const PUBLIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/cek-garansi', priority: '0.8', changefreq: 'monthly' },
  { path: '/dokumentasi', priority: '0.7', changefreq: 'weekly' },
];

// Halaman yang tidak boleh masuk hasil pencarian Google.
export const PRIVATE_ROUTES = ['/login', '/admin'];

// ----------------------------------------------------------------------------
// KATALOG LAYANAN (untuk structured data)
// Membantu Google menampilkan daftar produk & harga di hasil pencarian.
// ----------------------------------------------------------------------------
export const SERVICE_CATALOG = [
  { name: 'Kaca Film Illusion Black', price: '800000' },
  { name: 'Kaca Film Illusion Chrome Silver', price: '950000' },
  { name: 'Kaca Film Solar Premium Black Dazzling', price: '1200000' },
  { name: 'Kaca Film 3M Black Beauty', price: '1700000' },
  { name: 'Kaca Film Solar Premium Abbysal Black', price: '2000000' },
  { name: 'Kaca Film Solar Premium Ice Diamonds', price: '3000000' },
];
