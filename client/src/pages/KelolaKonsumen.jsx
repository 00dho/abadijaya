import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Phone, Save, ArrowLeft, Search } from 'lucide-react';

export default function KelolaKonsumen() {
  const navigate = useNavigate();
  const [konsumen, setKonsumen] = useState([]);
  const [form, setForm] = useState({ nama: '', no_hp: '', alamat: '' });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Ambil Data Konsumen saat halaman dibuka
  useEffect(() => {
    fetchKonsumen();
  }, []);

  const fetchKonsumen = async () => {
    try {
      const res = await fetch('https://abadijaya-production.up.railway.app/api/pelanggan');
      const data = await res.json();
      setKonsumen(data);
    } catch (err) {
      console.error("Gagal ambil data");
    }
  };

  // Handle Simpan Data Baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://abadijaya-production.up.railway.app/api/pelanggan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      
      if (res.ok) {
        alert("✅ Konsumen Berhasil Ditambahkan!");
        setForm({ nama: '', no_hp: '', alamat: '' }); // Reset form
        fetchKonsumen(); // Refresh tabel
      } else {
        alert("Gagal: " + data.msg);
      }
    } catch (err) {
      alert("Error koneksi server");
    } finally {
      setLoading(false);
    }
  };

  // Filter Pencarian
  const filteredData = konsumen.filter(k => 
    k.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
    k.no_hp.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Tombol Kembali */}
        <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-slate-600 mb-6 hover:text-blue-600 font-bold transition">
          <ArrowLeft size={20} /> Kembali ke Dashboard
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI: FORM INPUT (Sesuai Flowchart) */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 sticky top-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <User className="text-blue-600"/> Tambah Konsumen
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-slate-600 mb-1 block">Nama Lengkap</label>
                  <input 
                    type="text" 
                    value={form.nama}
                    onChange={(e) => setForm({...form, nama: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Contoh: Budi Santoso"
                    required 
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-600 mb-1 block">Nomor HP</label>
                  <div className="relative">
                    <Phone size={18} className="absolute top-3.5 left-3 text-slate-400" />
                    <input 
                      type="text" 
                      value={form.no_hp}
                      onChange={(e) => setForm({...form, no_hp: e.target.value})}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="08123456789"
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-600 mb-1 block">Alamat</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute top-3.5 left-3 text-slate-400" />
                    <textarea 
                      value={form.alamat}
                      onChange={(e) => setForm({...form, alamat: e.target.value})}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24"
                      placeholder="Jl. Merdeka No. 1"
                    ></textarea>
                  </div>
                </div>

                <button disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg flex justify-center items-center gap-2">
                  <Save size={20} /> {loading ? "Menyimpan..." : "Simpan Konsumen"}
                </button>
              </form>
            </div>
          </div>

          {/* KOLOM KANAN: DAFTAR KONSUMEN (Tabel) */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Daftar Konsumen</h2>
                <div className="relative">
                    <Search size={18} className="absolute top-2.5 left-3 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Cari nama / HP..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 p-2 text-sm border rounded-lg outline-none focus:ring-1 focus:ring-blue-500 w-48"
                    />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-600 text-xs font-bold uppercase">
                    <tr>
                      <th className="px-6 py-4">Nama</th>
                      <th className="px-6 py-4">Kontak</th>
                      <th className="px-6 py-4">Alamat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredData.length > 0 ? (
                      filteredData.map((k) => (
                        <tr key={k.id} className="hover:bg-blue-50/50 transition">
                          <td className="px-6 py-4 font-bold text-slate-800">{k.nama}</td>
                          <td className="px-6 py-4 text-blue-600 font-medium">{k.no_hp}</td>
                          <td className="px-6 py-4 text-slate-500 text-sm truncate max-w-xs">{k.alamat || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-500">Data tidak ditemukan.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}