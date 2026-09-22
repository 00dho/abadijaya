import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Search, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';

// Halaman untuk alamat yang tidak dikenal.
// Tanpa ini, link salah ketik menampilkan halaman kosong, dan Google
// menganggapnya sebagai "soft 404" yang merugikan peringkat situs.
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen bg-gray-50 font-sans"
    >
      <Seo
        title="Halaman Tidak Ditemukan | Abadi Jaya Film"
        description="Halaman yang Anda cari tidak tersedia di website Abadi Jaya Film."
        noindex
      />

      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-32 bg-slate-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-blue-900/20 opacity-50"></div>

        <div className="relative z-10 text-center max-w-lg">
          <div className="inline-flex p-4 bg-blue-600/20 rounded-2xl border border-blue-500/30 mb-6">
            <AlertTriangle size={40} className="text-blue-400" />
          </div>

          <h1 className="font-display text-6xl font-extrabold text-white mb-4">404</h1>
          <p className="text-xl font-bold text-white mb-3">Halaman tidak ditemukan</p>
          <p className="text-gray-400 mb-10">
            Alamat yang Anda buka mungkin salah ketik atau sudah dipindahkan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
            >
              <Home size={20} /> Kembali ke Beranda
            </button>
            <button
              onClick={() => navigate('/cek-garansi')}
              className="px-6 py-3 border border-gray-600 text-white font-bold rounded-xl hover:bg-white hover:text-slate-900 transition flex items-center justify-center gap-2"
            >
              <Search size={20} /> Cek Garansi
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
