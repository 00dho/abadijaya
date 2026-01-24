import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, UserCheck, Car, Calendar, FileText, Search, ChevronDown, X } from 'lucide-react';

export default function InputGaransi() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listPelanggan, setListPelanggan] = useState([]); 
  
  // State Khusus Pencarian Pelanggan
  const [searchTerm, setSearchTerm] = useState(''); // Apa yang diketik
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Buka/tutup list
  const dropdownRef = useRef(null); // Biar kalau klik di luar, dropdown nutup

  // State Form Garansi
  const [form, setForm] = useState({
    pelanggan_id: '',       
    plat_nomor: '', 
    tipe_mobil: '',
    tgl_pasang: new Date().toISOString().split('T')[0], 
    film_depan: '3M Crystalline 40',
    film_samping: '3M Black Beauty 20',
    film_belakang: '3M Black Beauty 20',
    keterangan: ''
  });

  // 1. Ambil Data Pelanggan
  useEffect(() => {
    fetch('https://abadijaya-production.up.railway.app/api/pelanggan')
      .then(res => res.json())
      .then(data => setListPelanggan(data))
      .catch(err => console.error("Gagal ambil pelanggan"));
  }, []);

  // 2. Tutup dropdown kalau klik di luar area
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Logika Filter Pencarian
  const filteredPelanggan = listPelanggan.filter(p => 
    p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.no_hp.includes(searchTerm)
  );

  // Saat Pelanggan Dipilih dari List
  const handleSelectPelanggan = (pelanggan) => {
    setForm({ ...form, pelanggan_id: pelanggan.id });
    setSearchTerm(`${pelanggan.nama} - ${pelanggan.no_hp}`); // Tampilkan nama di input
    setIsDropdownOpen(false); // Tutup list
  };

  // Reset Pilihan (Tombol X)
  const handleResetPelanggan = () => {
    setForm({ ...form, pelanggan_id: '' });
    setSearchTerm('');
    setIsDropdownOpen(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.pelanggan_id) return alert("Pilih pelanggan dulu!");

    setLoading(true);
    try {
      const res = await fetch('https://abadijaya-production.up.railway.app/api/garansi/tambah', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        alert('✅ Data Garansi Berhasil Disimpan!');
        navigate('/admin/dashboard'); 
      } else {
        const data = await res.json();
        alert('Gagal: ' + data.msg);
      }
    } catch (err) {
      alert('Error koneksi server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-slate-600 mb-6 hover:text-blue-600 font-bold transition">
          <ArrowLeft size={20} /> Kembali ke Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-blue-600 p-6 text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Car className="text-blue-200"/> Input Garansi Kendaraan
            </h2>
            <p className="text-blue-100 text-sm mt-1">Pastikan konsumen sudah terdaftar di menu "Kelola Konsumen".</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* BAGIAN 1: PILIH KONSUMEN (SEARCHABLE DROPDOWN) */}
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 relative z-50">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <UserCheck size={20} className="text-yellow-600"/> Pilih Pemilik Kendaraan
                </h3>
                
                <div ref={dropdownRef} className="relative">
                  <label className="text-sm font-bold text-slate-600 mb-2 block">Cari Nama / No HP</label>
                  
                  {/* Input Pencarian */}
                  <div 
                    className="flex items-center bg-white border border-slate-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 cursor-pointer"
                    onClick={() => setIsDropdownOpen(true)}
                  >
                    <Search size={18} className="text-slate-400 mr-2" />
                    <input 
                        type="text"
                        placeholder="Ketik nama pelanggan..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsDropdownOpen(true);
                            setForm({ ...form, pelanggan_id: '' }); // Reset ID kalau user ngetik ulang
                        }}
                        className="w-full outline-none bg-transparent font-medium text-slate-700"
                    />
                    {searchTerm ? (
                        <X size={18} className="text-slate-400 hover:text-red-500 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleResetPelanggan(); }} />
                    ) : (
                        <ChevronDown size={18} className="text-slate-400" />
                    )}
                  </div>

                  {/* Dropdown List (Muncul saat diklik/diketik) */}
                  {isDropdownOpen && (
                    <div className="absolute w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-50">
                        {filteredPelanggan.length > 0 ? (
                            filteredPelanggan.map((p) => (
                                <div 
                                    key={p.id} 
                                    onClick={() => handleSelectPelanggan(p)}
                                    className="p-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-0 transition"
                                >
                                    <p className="font-bold text-slate-800">{p.nama}</p>
                                    <p className="text-xs text-slate-500">{p.no_hp}</p>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-slate-500 text-sm">
                                Pelanggan tidak ditemukan. <br/>
                                <span className="text-blue-600 font-bold cursor-pointer hover:underline" onClick={() => navigate('/admin/konsumen')}>+ Tambah Baru</span>
                            </div>
                        )}
                    </div>
                  )}

                  <p className="text-xs text-slate-500 mt-2">
                    *Ketik nama atau nomor HP untuk mencari.
                  </p>
                </div>
            </div>

            {/* BAGIAN 2: DATA MOBIL (SAMA SEPERTI SEBELUMNYA) */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative z-0">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Car size={20} className="text-blue-600"/> Spesifikasi Kendaraan & Garansi
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Tipe Mobil</label>
                    <input type="text" name="tipe_mobil" onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="Cth: Pajero Sport" required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Plat Nomor</label>
                    <input type="text" name="plat_nomor" onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="B 1234 CD" required />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block flex items-center gap-1">
                       <Calendar size={14}/> Tanggal Pemasangan
                    </label>
                    <input 
                        type="date" 
                        name="tgl_pasang" 
                        value={form.tgl_pasang}
                        onChange={handleChange} 
                        className="w-full p-3 border rounded-lg font-bold text-slate-700" 
                        required 
                    />
                    <p className="text-[10px] text-slate-400 mt-1">*Garansi otomatis dihitung 5 tahun dari tanggal ini.</p>
                  </div>

                  <div className="md:col-span-2 space-y-4 pt-2 border-t border-slate-200 mt-2">
                     <p className="font-bold text-sm text-blue-600">Detail Kaca Film</p>
                     <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Kaca Depan</label>
                            <input type="text" name="film_depan" value={form.film_depan} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Kaca Samping</label>
                            <input type="text" name="film_samping" value={form.film_samping} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Kaca Belakang</label>
                            <input type="text" name="film_belakang" value={form.film_belakang} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
                        </div>
                     </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block flex items-center gap-1"><FileText size={14}/> Catatan Pengerjaan</label>
                    <textarea name="keterangan" onChange={handleChange} className="w-full p-3 border rounded-lg h-24" placeholder="Cth: Pemasangan full body..."></textarea>
                  </div>
                </div>
            </div>

            <button disabled={loading} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition shadow-lg transform active:scale-[0.99] flex justify-center gap-2">
               <Save /> {loading ? 'Menyimpan Data...' : 'SIMPAN DATA GARANSI'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}