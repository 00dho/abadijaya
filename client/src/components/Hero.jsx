import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // <--- Import Wajib

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
      
      {/* Background Image (Zoom effect dikit biar hidup) */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }} // Efek bernafas
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop" 
          alt="Luxury Car Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-slate-900"></div>
      </div>

      {/* KONTEN TENGAH */}
      <div className="relative z-10 max-w-5xl mx-auto mt-16">
        
        {/* Badge: Muncul dari atas */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 text-blue-300 text-sm font-bold tracking-wider mb-6 border border-blue-500/30 backdrop-blur-md">
            AUTO FILM SPECIALIST
          </span>
        </motion.div>
        
        {/* Judul: Muncul pelan dari bawah */}
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }} // Delay biar gantian munculnya
          className="font-display text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl"
        >
          Kenyamanan & Perlindungan <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
            Kelas Premium
          </span>
        </motion.h1>
        
        {/* Deskripsi */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Selamat datang di <strong>Abadi Jaya Film</strong>. Pusat pemasangan kaca film original dengan standar pengerjaan detil untuk mobil kesayangan Anda.
        </motion.p>
        
        {/* Tombol: Pop-up */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <button 
            onClick={() => navigate('/cek-garansi')}
            className="group px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition shadow-[0_0_20px_rgba(37,99,235,0.5)] flex items-center gap-2"
          >
            Cek Garansi Resmi
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
          </button>
          
          <a 
            href="#produk"
            className="px-8 py-4 border border-gray-500 text-white font-bold rounded-full hover:bg-white hover:text-black transition backdrop-blur-sm"
          >
            Lihat Pilihan Kaca Film
          </a>
        </motion.div>
      </div>
    </section>
  );
}