import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // <--- Import ini
import Home from './pages/Home';
import CekGaransiPage from './pages/CekGaransiPage';
import LoginPage from './pages/LoginPage';  
import Dashboard from './pages/Dashboard';
import InputGaransi from './pages/InputGaransi';
import KelolaKonsumen from './pages/KelolaKonsumen';
import DokumentasiPage from './pages/DokumentasiPage';

function App() {
  const location = useLocation();

  return (
    // mode="wait" artinya: tunggu halaman lama hilang, baru munculkan halaman baru
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cek-garansi" element={<CekGaransiPage />} />
        <Route path="/dokumentasi" element={<DokumentasiPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/tambah" element={<InputGaransi />} />
        <Route path="/admin/konsumen" element={<KelolaKonsumen />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;