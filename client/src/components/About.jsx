import { CheckCircle, Award, PenTool, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion'; // <--- Import wajib

export default function About() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* KOLOM KIRI: TEKS (Muncul dari Kiri) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }} // Animasi jalan sekali saja biar ga pusing
          >
            <div className="mb-6">
              <h2 className="font-display text-4xl font-bold text-slate-900 mb-4 leading-tight">
                Terima Kasih Telah Memilih <span className="text-blue-600">Abadi Jaya</span>
              </h2>
              <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
            </div>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed text-justify">
              Kami menghargai kepercayaan Anda. Misi kami bukan sekadar memasang kaca film, tapi memberikan <strong>ketenangan pikiran</strong> saat Anda berkendara.
            </p>

            <h3 className="font-bold text-xl text-slate-900 mb-6">Mengapa Harus Kami?</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Poin-poin dengan animasi delay */}
              {[ 
                { icon: PenTool, title: "Pemasangan Rapi", desc: "Teknik potong presisi." },
                { icon: Award, title: "100% Original", desc: "Jaminan produk resmi." },
                { icon: CheckCircle, title: "Garansi 5 Tahun", desc: "Klaim mudah & cepat." },
                { icon: ThumbsUp, title: "Harga Jujur", desc: "Tanpa biaya tersembunyi." }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }} // Muncul gantian
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* KOLOM KANAN: GAMBAR (Muncul dari Kanan + Efek Hover) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-blue-600/10 rounded-2xl transform rotate-3 -z-10"></div>
            
            <motion.img 
              whileHover={{ scale: 1.02 }} // Efek zoom dikit pas kursor lewat
              src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000&auto=format&fit=crop" 
              alt="Proses Pemasangan" 
              className="rounded-xl shadow-2xl w-full object-cover h-[500px]"
            />
            
            {/* Badge Testimoni (Muncul Pop Up) */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute bottom-8 left-8 bg-white p-4 rounded-lg shadow-lg max-w-xs border-l-4 border-blue-600"
            >
              <p className="text-sm font-bold text-gray-800">"Mobil jadi jauh lebih adem, kerjanya rapi banget!"</p>
              <p className="text-xs text-gray-500 mt-1">- Budi Santoso, Customer</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}