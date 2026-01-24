import { Shield, AlertCircle, Wrench, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Warranty() {
  const navigate = useNavigate();

  return (
    <section id="garansi" className="py-20 px-4 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Informasi <span className="text-blue-500">Garansi</span>
          </h2>
          <p className="text-gray-400">
            Perlindungan lengkap untuk investasi kaca film Anda
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Garansi Meliputi */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-8 rounded-2xl border border-green-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield size={32} className="text-green-500" />
              <h3 className="text-2xl font-bold">Garansi 5 Tahun</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">Kami memberikan garansi kaca film selama 5 tahun.</p>
            
            <h4 className="text-lg font-semibold text-green-400 mb-3">Garansi meliputi :</h4>
            <ul className="space-y-3 ml-2">
              <li className="flex items-start gap-3 text-gray-300">
                <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span>Bersifat mengurangi/menolak panas matahari</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span>Melekat dengan sempurna</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span>Tidak berubah warna</span>
              </li>
            </ul>
          </motion.div>

          {/* Garansi Tidak Berlaku */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-8 rounded-2xl border border-red-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle size={32} className="text-red-500" />
              <h3 className="text-2xl font-bold">Pengecualian</h3>
            </div>
            
            <h4 className="text-lg font-semibold text-red-400 mb-3">Garansi tidak berlaku apabila :</h4>
            <ul className="space-y-3 ml-2">
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="text-red-500 font-bold flex-shrink-0">•</span>
                <span>Dipindah tangankan dari pembeli pertama</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="text-red-500 font-bold flex-shrink-0">•</span>
                <span>Kerusakan akibat kesalahan atau kelalaian pengguna, baik disengaja maupun tidak</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <span className="text-red-500 font-bold flex-shrink-0">•</span>
                <span>Pemasangan bukan oleh teknisi Abadi Jaya Film</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-blue-500/10 border-l-4 border-blue-500 p-6 rounded-lg mb-12"
        >
          <p className="text-gray-300 text-sm">
            <span className="font-bold text-blue-400">Catatan :</span> Garansi berlaku 5 Tahun terhitung dari tanggal pemasangan dan hanya berlaku bagi pembeli pertama serta tidak dapat dialihkan
          </p>
        </motion.div>

        {/* Perhatian Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500 p-8 rounded-2xl mb-12"
        >
          <h3 className="text-3xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <AlertCircle size={32} />
            PERHATIAN!!!
          </h3>
          <p className="text-gray-200">
            <span className="text-yellow-300 font-semibold">Sesudah Pemasangan kemungkinan kaca film akan tampak berkabut dan bergelembung.</span> Hal ini disebabkan karena kelembaban yang terjadi saat pemasangan. Pengaruh ini akan hilang dengan sendirinya setelah film benar-benar kering.
          </p>
        </motion.div>

        {/* Petunjuk Perawatan */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <Wrench size={32} className="text-purple-400" />
            <h3 className="text-2xl font-bold">Petunjuk Perawatan Kaca Film</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
              <div>
                <p className="text-gray-300"><span className="text-yellow-300 font-semibold">Setelah pemasangan jangan turunkan kaca selama 3 hari</span></p>
                <p className="text-gray-400 text-sm mt-1">Biarkan film mengering dengan sempurna</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
              <div>
                <p className="text-gray-300"><span className="text-yellow-300 font-semibold">Jangan mengelap kaca film dengan kanebo atau lap kotor</span></p>
                <p className="text-gray-400 text-sm mt-1">Gunakan lap halus yang bersih</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
              <div>
                <p className="text-gray-300">Jangan menyemprotkan cairan <span className="text-yellow-300 font-semibold">pembersih yang mengandung bahan kimia</span> ke kaca film</p>
                <p className="text-gray-400 text-sm mt-1">Gunakan air bersih atau pembersih khusus film</p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={() => navigate('/cek-garansi')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Cek Garansi Anda Sekarang
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}