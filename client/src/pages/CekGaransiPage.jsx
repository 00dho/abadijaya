import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WarrantyResult from '../components/WarrantyResult'; // <--- Import Komponen Baru
import { Search, AlertCircle } from 'lucide-react';

export default function CekGaransiPage() {
  const [noHp, setNoHp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      const response = await fetch(`http://localhost:5000/api/garansi/cek?no_hp=${noHp}`);
      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setErrorMsg(data.msg || "Data tidak ditemukan");
      }
    } catch (err) {
      setErrorMsg("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen bg-gray-50 font-sans"
    >
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-24 bg-slate-900 relative min-h-[80vh]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-slate-900 to-blue-900/20 opacity-50 z-0"></div>
        
        <div className="relative z-10 w-full max-w-2xl space-y-8">
          
          {/* BAGIAN 1: FORM PENCARIAN (Tetap di sini biar logic-nya dekat) */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="bg-blue-600 p-6 text-center">
              <h1 className="text-2xl font-bold text-white">Cek Status Garansi</h1>
              <p className="text-blue-100 text-sm mt-1">Masukkan nomor Handphone yang terdaftar</p>
            </div>

            <div className="p-8">
              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nomor WhatsApp / HP</label>
                  <input
                    type="text"
                    placeholder="Contoh: 08123456789"
                    value={noHp}
                    onChange={(e) => setNoHp(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition transform active:scale-95 disabled:bg-gray-400"
                >
                  {loading ? <span className="animate-pulse">Sedang Mencari...</span> : <><Search size={20} /> Cek Data Sekarang</>}
                </button>
              </form>

              {errorMsg && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2 text-sm font-medium">
                  <AlertCircle size={18} /> {errorMsg}
                </motion.div>
              )}
            </div>
          </div>

          {/* BAGIAN 2: HASIL PENCARIAN (Sudah dipisah, jadi tinggal panggil satu baris ini aja) */}
          <AnimatePresence>
            {result && <WarrantyResult data={result} />}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </motion.div>
  );
}