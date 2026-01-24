import { motion } from 'framer-motion';
import { generateWarrantyPDF } from '../utils/pdfGenerator'; // Import Generator PDF
import { 
  ShieldCheck, 
  Car, 
  Calendar, 
  RectangleHorizontal, 
  RectangleVertical, 
  PanelBottom, 
  MapPin, 
  CalendarCheck, 
  FileText, 
  Download 
} from 'lucide-react';

export default function WarrantyResult({ data }) {
  // Kalau data kosong, jangan tampilkan apa-apa
  if (!data) return null;

  // Ambil alamat dari data pertama (karena alamat nempel di pelanggan)
  const alamatPelanggan = data.data[0]?.alamat || "Alamat tidak tercatat"; 

  // Fungsi helper format tanggal Indonesia (Contoh: 10 Januari 2024)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="bg-white rounded-2xl shadow-2xl border-t-8 border-green-500 overflow-hidden mb-8"
    >
      <div className="p-8">
        
        {/* --- BAGIAN 1: HEADER (NAMA & ALAMAT) --- */}
        <div className="flex flex-col md:flex-row justify-between mb-8 border-b border-gray-100 pb-6 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Pemilik Kendaraan</p>
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight mb-2">{data.pemilik}</h2>
            
            {/* Alamat Pelanggan */}
            <div className="flex items-start gap-2 text-gray-600 bg-gray-50 p-2 rounded-lg inline-flex">
              <MapPin size={18} className="mt-0.5 text-red-500 shrink-0" />
              <p className="text-sm font-medium">{alamatPelanggan}</p>
            </div>
          </div>

          {/* Badge Status Garansi */}
          <div className="flex items-center gap-3 bg-green-50 px-4 py-3 rounded-xl border border-green-100 h-fit">
            <div className="bg-green-500 p-2 rounded-full text-white shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <div>
               <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Status Garansi</p>
               <p className="text-green-700 font-bold">Terdaftar Resmi</p>
            </div>
          </div>
        </div>

        {/* --- BAGIAN 2: LIST KENDARAAN (LOOPING) --- */}
        <div className="space-y-8">
          {data.data.map((item, index) => (
            <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden">
              
              {/* Hiasan Ikon Mobil Transparan di Background */}
              <Car className="absolute -right-6 -bottom-6 text-slate-200/50 w-32 h-32" />
              
              <div className="relative z-10">
                 {/* Judul Tipe Mobil & Plat Nomor */}
                 <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                    <Car size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">{item.tipe_mobil}</h3>
                    <p className="text-slate-500 font-medium bg-slate-200/50 px-2 py-0.5 rounded text-sm inline-block mt-1">{item.plat_nomor}</p>
                  </div>
                </div>
                
                {/* Detail Kaca Film (Grid 3 Kolom) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
                  
                  {/* Kaca Depan */}
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3 text-blue-600 border-b border-gray-50 pb-2">
                      <RectangleHorizontal size={18} />
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Kaca Depan</p>
                    </div>
                    <p className="font-bold text-slate-900 text-base leading-relaxed">{item.film_depan}</p>
                  </div>

                   {/* Kaca Samping */}
                   <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3 text-blue-600 border-b border-gray-50 pb-2">
                      <RectangleVertical size={18} />
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Kaca Samping</p>
                    </div>
                    <p className="font-bold text-slate-900 text-base leading-relaxed">{item.film_samping}</p>
                  </div>

                   {/* Kaca Belakang */}
                   <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3 text-blue-600 border-b border-gray-50 pb-2">
                      <PanelBottom size={18} />
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Kaca Belakang</p>
                    </div>
                    <p className="font-bold text-slate-900 text-base leading-relaxed">{item.film_belakang}</p>
                  </div>
                </div>

                {/* Info Tanggal & Keterangan */}
                <div className="grid md:grid-cols-2 gap-4">
                    
                    {/* Kolom Kiri: Durasi Garansi */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
                            <div className="p-2 bg-slate-100 rounded-full text-slate-600">
                                <CalendarCheck size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">Tanggal Pemasangan</p>
                                <p className="font-bold text-slate-800">{formatDate(item.tgl_pasang)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-red-50 p-3 rounded-xl border border-red-100">
                            <div className="p-2 bg-red-100 rounded-full text-red-600">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] text-red-500 font-bold uppercase">Garansi Berakhir</p>
                                <p className="font-bold text-red-700">{formatDate(item.masa_berlaku)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan: Catatan / Keterangan */}
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-2 text-blue-600">
                            <FileText size={18} />
                            <p className="text-xs font-bold uppercase tracking-wider">Keterangan Pengerjaan</p>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed italic">
                            "{item.keterangan || 'Tidak ada catatan khusus.'}"
                        </p>
                    </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* --- BAGIAN 3: FOOTER & TOMBOL PDF --- */}
      <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 font-medium text-center md:text-left max-w-lg">
          Bukti garansi digital ini sah dan dapat digunakan untuk klaim di seluruh cabang Abadi Jaya.
        </p>

        <button 
          onClick={() => generateWarrantyPDF(data)} 
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-800 transition shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
        >
          <Download size={18} />
          Simpan sebagai PDF
        </button>
      </div>

    </motion.div>
  );
}