import { useState } from 'react';
import { Menu, X, MessageCircle, ShieldCheck, FileText, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'; // PENTING: Import ini

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();   // Untuk pindah halaman
  const location = useLocation();   // Untuk cek kita lagi di halaman mana

  // --- LOGIKA NAVIGASI PINTAR ---
  const handleNavigation = (target) => {
    setIsMenuOpen(false); // Tutup menu mobile jika sedang terbuka

    if (target === 'home') {
      // Tombol Beranda
      if (location.pathname !== '/') {
        navigate('/'); // Kalau bukan di Home, pindah ke Home
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Kalau sudah di Home, scroll ke atas
      }
    } 
    else if (target === 'garansi') {
      // Tombol Cek Garansi (Selalu pindah ke halaman baru)
      navigate('/cek-garansi');
    } 
    else if (target === 'produk') {
      // Tombol Produk
      if (location.pathname !== '/') {
        // Kalau kita lagi di halaman Cek Garansi
        navigate('/'); // 1. Pindah ke Home dulu
        setTimeout(() => {
          // 2. Tunggu 100ms biar halaman Home loading selesai, baru scroll
          const element = document.getElementById('produk');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // Kalau sudah di Home, langsung scroll
        const element = document.getElementById('produk');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Settingan WhatsApp
  const whatsappNumber = "6285880202593"; // Nomor Asli
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Halo Admin Abadi Jaya, saya mau pesan kaca film mobil.`;
  return (
    <>
      {/* NAVBAR FIXED */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md text-white z-50 border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo (Klik balik ke home) */}
            <div 
              onClick={() => handleNavigation('home')}
              className="flex-shrink-0 font-display font-bold text-xl tracking-wider text-blue-500 cursor-pointer hover:text-blue-400 transition"
            >
              ABADI JAYA
            </div>
            
            {/* Burger Menu (Mobile) */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(true)} className="text-gray-300 hover:text-white p-2">
                <Menu size={28} />
              </button>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <button onClick={() => handleNavigation('home')} className="hover:text-blue-400 transition font-medium">Beranda</button>
                <button onClick={() => handleNavigation('garansi')} className="hover:text-blue-400 transition font-medium">Cek Garansi</button>
                <button onClick={() => handleNavigation('produk')} className="hover:text-blue-400 transition font-medium">Produk</button>
                
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition flex items-center gap-2 shadow-lg shadow-blue-900/50"
                >
                  <MessageCircle size={18} />
                  Pesan Kaca Film
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU SIDEBAR (OFF-CANVAS) */}
      
      {/* 1. Overlay Hitam (Background) */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* 2. Panel Menu */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-gray-900 z-[70] shadow-2xl transform transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          
          {/* Header Menu */}
          <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
            <span className="font-display font-bold text-white text-lg">Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-white"><X size={28} /></button>
          </div>

          {/* Isi Menu Mobile */}
          <div className="space-y-4 flex-1">
            <button 
              onClick={() => handleNavigation('home')}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition text-left"
            >
              <span className="font-medium">🏠 Beranda</span>
            </button>

            <button 
              onClick={() => handleNavigation('garansi')}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition text-left"
            >
              <ShieldCheck size={20} className="text-blue-500" />
              <span className="font-medium">Cek Garansi</span>
            </button>

             <button 
              onClick={() => handleNavigation('produk')}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition text-left"
            >
              <FileText size={20} className="text-blue-500" />
              <span className="font-medium">Daftar Kaca Film</span>
            </button>

            <div className="border-t border-gray-800 my-2"></div>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 p-4 rounded-xl bg-green-600 text-white hover:bg-green-500 transition shadow-lg shadow-green-900/20 group">
              <MessageCircle size={24} />
              <span className="font-bold">Pesan ke WhatsApp</span>
              <ChevronRight size={16} className="ml-auto group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-auto pt-6 text-center"><p className="text-xs text-gray-500">© 2024 Abadi Jaya Film</p></div>
        </div>
      </div>
    </>
  );
}