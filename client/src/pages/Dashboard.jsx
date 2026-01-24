import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Search, Car, Calendar, User, Trash2, AlertCircle, CheckCircle } from 'lucide-react'; // Tambah Trash2, AlertCircle, CheckCircle

export default function Dashboard() {
  const navigate = useNavigate();
  const [dataGaransi, setDataGaransi] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fungsi Refresh Data
  const fetchData = () => {
    fetch('https://abadijaya-production.up.railway.app/api/garansi/all')
      .then(res => res.json())
      .then(data => setDataGaransi(data))
      .catch(err => console.error("Gagal ambil data:", err));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    fetchData(); // Panggil fungsi fetch pertama kali
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // --- LOGIKA HAPUS DATA ---
  const handleDelete = async (id, nama, mobil) => {
    // Konfirmasi dulu biar gak kehapus ga sengaja
    if (window.confirm(`Yakin mau hapus data garansi ${nama} (${mobil})?`)) {
      try {
        const res = await fetch(`https://abadijaya-production.up.railway.app/api/garansi/${id}`, {
          method: 'DELETE',
        });
        
        if (res.ok) {
          alert("Data berhasil dihapus!");
          fetchData(); // Refresh tabel otomatis
        } else {
          alert("Gagal menghapus data.");
        }
      } catch (err) {
        alert("Error koneksi server.");
      }
    }
  };

  // --- LOGIKA CEK STATUS GARANSI ---
  const getStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    // Kalau expired, return false. Kalau aktif, return true.
    return expiry >= today; 
  };

  const filteredData = Array.isArray(dataGaransi) ? dataGaransi.filter(item => 
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.plat_nomor.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <h1 className="font-bold text-xl tracking-wider text-blue-500">ADMIN PANEL</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
          <LogOut size={16} /> Keluar
        </button>
      </nav>

      <div className="max-w-[95%] mx-auto py-10 px-4">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Admin Dashboard</h2>
                <p className="text-slate-500">Pusat kendali data Abadi Jaya.</p>
            </div>
            
            <div className="flex gap-3">
                <button 
                    onClick={() => navigate('/admin/konsumen')} 
                    className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition"
                >
                    <User size={20} /> Kelola Konsumen
                </button>

                <button 
                    onClick={() => navigate('/admin/tambah')} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition"
                >
                    <Plus size={20} /> Tambah Garansi
                </button>
            </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-3 border border-slate-200">
            <Search className="text-slate-400" />
            <input 
                type="text" 
                placeholder="Cari nama, nomor HP, atau plat nomor..." 
                className="flex-1 outline-none text-slate-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Tabel Data Lengkap */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-800 text-white uppercase text-xs font-bold">
                        <tr>
                            <th className="px-4 py-4 w-1/12">Data Pelanggan</th>
                            <th className="px-4 py-4 w-1/12">Mobil</th>
                            <th className="px-4 py-4 w-3/12">Spesifikasi Kaca Film</th>
                            <th className="px-4 py-4 w-2/12">Periode & Status</th> {/* Header Diupdate */}
                            <th className="px-4 py-4 w-2/12">Keterangan</th>
                            <th className="px-4 py-4 text-center">Aksi</th> {/* Header Aksi */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => {
                                const isAktif = getStatus(item.masa_berlaku);

                                return (
                                <tr key={item.id} className="hover:bg-blue-50/50 transition odd:bg-white even:bg-slate-50">
                                    <td className="px-4 py-4 align-top">
                                        <p className="font-bold text-slate-900 text-base">{item.nama}</p>
                                        <p className="text-blue-600 font-medium">{item.no_hp}</p>
                                        <p className="text-xs text-slate-500 mt-1">{item.alamat || '-'}</p>
                                    </td>
                                    <td className="px-4 py-4 align-top">
                                        <div className="font-bold text-slate-800">{item.tipe_mobil}</div>
                                        <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-xs font-bold mt-1 inline-block">
                                            {item.plat_nomor}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 align-top">
                                        <div className="space-y-1">
                                            <div className="text-xs text-slate-500">Depan:</div>
                                            <div className="font-medium text-slate-900 border-b border-slate-100 pb-1 mb-1">{item.film_depan}</div>
                                            <div className="text-xs text-slate-500">Samping:</div>
                                            <div className="font-medium text-slate-900 border-b border-slate-100 pb-1 mb-1">{item.film_samping}</div>
                                            <div className="text-xs text-slate-500">Belakang:</div>
                                            <div className="font-medium text-slate-900">{item.film_belakang}</div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 align-top">
                                        <div className="flex flex-col gap-3">
                                            {/* TAMPILAN STATUS (BARU) */}
                                            {isAktif ? (
                                                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-md w-fit text-xs font-bold border border-green-200">
                                                    <CheckCircle size={12} /> AKTIF
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-md w-fit text-xs font-bold border border-red-200">
                                                    <AlertCircle size={12} /> HABIS (EXPIRED)
                                                </div>
                                            )}

                                            <div>
                                                <div className="flex items-center gap-1 text-slate-700 font-medium text-xs">
                                                    <Calendar size={12}/> Pasang: {new Date(item.tgl_pasang).toLocaleDateString('id-ID')}
                                                </div>
                                                <div className="flex items-center gap-1 text-red-600 font-medium text-xs mt-1">
                                                    <Calendar size={12}/> Habis: {new Date(item.masa_berlaku).toLocaleDateString('id-ID')}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 align-top">
                                        <p className="text-slate-600 italic text-xs bg-yellow-50 p-2 rounded border border-yellow-100">
                                            "{item.keterangan || 'Tidak ada catatan.'}"
                                        </p>
                                    </td>
                                    
                                    {/* TOMBOL HAPUS (BARU) */}
                                    <td className="px-4 py-4 align-top text-center">
                                        <button 
                                            onClick={() => handleDelete(item.id, item.nama, item.tipe_mobil)}
                                            className="text-slate-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-full"
                                            title="Hapus Data"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            )})
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                    Belum ada data. Silakan tambah data baru.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    </div>
  );
}