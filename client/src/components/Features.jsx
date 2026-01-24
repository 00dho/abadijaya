import { Shield, Sun, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
  
  // Settingan animasi biar codingan rapi
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1, 
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 } // Delay bertingkat (0.2s, 0.4s, 0.6s)
    })
  };

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }} // Animasi jalan pas di-scroll
            viewport={{ once: true }} // Cuma jalan sekali (biar ga pusing naik turun)
            className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Mengapa Kaca Film Itu <span className="text-blue-600">Penting?</span>
          </motion.h2>
          <p className="text-gray-600">
            Bukan sekadar aksesoris, tapi kebutuhan utama untuk kenyamanan dan keamanan berkendara.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <motion.div 
            custom={0} // Urutan ke-0
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 group"
          >
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition">
              <Sun size={28} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">Tolak Panas Maksimal</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mengurangi suhu dalam kabin secara signifikan dan melindungi kulit dari sinar UV.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            custom={1} // Urutan ke-1 (muncul agak telat)
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 group"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
              <Shield size={28} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">Keamanan Kaca</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Menahan serpihan kaca agar tidak berhamburan saat terjadi benturan.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            custom={2} // Urutan ke-2 (muncul paling akhir)
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 group"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 text-gray-700 group-hover:bg-gray-800 group-hover:text-white transition">
              <EyeOff size={28} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">Privasi Terjaga</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Menghalangi pandangan orang asing ke dalam kabin dan mencegah kejahatan.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}