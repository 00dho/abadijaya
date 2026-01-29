import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import doc1 from '../assets/documentation/doc1.jpeg';
import doc2 from '../assets/documentation/doc2.jpeg';
import doc3 from '../assets/documentation/doc3.jpeg';
import doc4 from '../assets/documentation/doc4.jpeg';
import doc5 from '../assets/documentation/doc5.jpeg';
import doc6 from '../assets/documentation/doc6.jpeg';
import doc7 from '../assets/documentation/doc7.jpeg';
import doc8 from '../assets/documentation/doc8.jpeg';
import doc9 from '../assets/documentation/doc9.jpeg';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DokumentasiPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll ke atas saat page dimuat
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dokumentasi = [
    { id: 1, src: doc1, title: 'Dokumentasi 1' },
    { id: 2, src: doc2, title: 'Dokumentasi 2' },
    { id: 3, src: doc3, title: 'Dokumentasi 3' },
    { id: 4, src: doc4, title: 'Dokumentasi 4' },
    { id: 5, src: doc5, title: 'Dokumentasi 5' },
    { id: 6, src: doc6, title: 'Dokumentasi 6' },
    { id: 7, src: doc7, title: 'Dokumentasi 7' },
    { id: 8, src: doc8, title: 'Dokumentasi 8' },
    { id: 9, src: doc9, title: 'Dokumentasi 9' },
  ];

  const openModal = (index) => {
    setCurrentIndex(index);
    setSelectedImage(dokumentasi[index]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % dokumentasi.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(dokumentasi[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + dokumentasi.length) % dokumentasi.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(dokumentasi[prevIndex]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 font-sans"
    >
      <Navbar />
      
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-5xl font-bold text-slate-900 mb-4">
              Dokumentasi & Testimoni
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Hasil kerja terbaik kami di lapangan
            </p>
            <div className="h-1 w-20 bg-blue-600 rounded-full mx-auto"></div>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dokumentasi.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="cursor-pointer group"
                onClick={() => openModal(index)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg h-72">
                  <img
                    src={doc.src}
                    alt={doc.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Overlay Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="text-white text-center"
                    >
                      <p className="text-lg font-semibold">{doc.title}</p>
                      <p className="text-sm">Klik untuk lihat detail</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>

              {/* Image */}
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full rounded-lg shadow-2xl"
              />

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-white hover:text-blue-400 transition-colors"
              >
                <ChevronLeft size={40} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-white hover:text-blue-400 transition-colors"
              >
                <ChevronRight size={40} />
              </button>

              {/* Image Counter */}
              <div className="text-center mt-4 text-white">
                <p className="text-lg">
                  {currentIndex + 1} / {dokumentasi.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </motion.div>
  );
}

// AnimatePresence component untuk exit animation
import { AnimatePresence } from 'framer-motion';
