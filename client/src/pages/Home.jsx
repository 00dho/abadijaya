import { motion } from 'framer-motion'; // <--- Import Framer Motion
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Products from '../components/Products';
import Warranty from '../components/Warranty';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { PAGE_SEO } from '../../site.config';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}      // Awal muncul transparan
      animate={{ opacity: 1 }}      // Pelan-pelan jadi jelas
      exit={{ opacity: 0 }}         // Kalau ditinggalkan, jadi transparan lagi
      transition={{ duration: 0.5 }} // Durasi animasi setengah detik
      className="bg-gray-50 font-sans"
    >
      <Seo title={PAGE_SEO.home.title} description={PAGE_SEO.home.description} path="/" />
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Products />
      <Warranty />
      <Footer />
    </motion.div>
  );
}