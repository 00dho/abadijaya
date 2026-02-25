import { Check, MessageCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Helper function untuk load gambar dari assets folder
const getAssetImage = (filename) => {
  return new URL(`../assets/${filename}`, import.meta.url).href;
};

// Helper function untuk highlight text tertentu dengan warna
const highlightSpecText = (text) => {
  if (text.includes("Medium")) {
    return text.replace("Medium", "<span class='text-yellow-400 font-semibold'>Medium</span>");
  }
  if (text.includes("UV 400 Technology")) {
    return text.replace("UV 400 Technology", "<span class='text-cyan-400 font-semibold'>UV 400 Technology</span>");
  }
  if (text.includes("High")) {
    return text.replace("High", "<span class='text-green-400 font-semibold'>High</span>");
  }
  return text;
};

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Illusion",
      type: "Black",
      price: "Rp 800.000",
      image: "illusionblack1.png",
      specs: ["Tingkat Kegelapan: 40%, 60%, 80%", "Tolak Panas 50%", "Awet Hingga 3 Tahun", "Garansi 3 Tahun"]
    },
    {
      id: 2,
      name: "Illusion",
      type: "Chrome Silver",
      price: "Rp 950.000",
      image: "illusionchromesilver1.png",
      specs: ["Tingkat Kegelapan: 40%, 60%, 80%", "Tolak Panas 65%", "Awet Hingga 3 Tahun", "Garansi 3 Tahun"]
    },
    {
      id: 3,
      name: "Solar Premium",
      type: "Black Dazzling",
      price: "Rp 1.200.000",
      image: "blackdazzling.png",
      specs: ["Tingkat Kegelapan: 40%, 60%, 80%", "Tolak Panas 70%", "Awet Hingga 5 Tahun", "Garansi 5 Tahun"]
    },
    {
      id: 4,
      name: "3M",
      type: "Black Beauty",
      price: "Rp 1.700.000",
      image: "blackbeauty.png",
      specs: ["Tingkat Kegelapan: 40%, 60%, 80%", "Tolak Panas 78%", "Awet Hingga 5 Tahun", "Garansi 5 Tahun", "Night Vision: Medium"]
    },
    {
      id: 5,
      name: "Solar Premium",
      type: "Abbysal Black",
      price: "Rp 2.000.000",
      image: "abbysalblack.png",
      specs: ["Tingkat Kegelapan: 40%, 60%, 80%", "Tolak Panas 99%", "Awet Hingga 5 Tahun", "Garansi 5 Tahun", "Night Vision: Medium", "UV 400 Technology"]
    },
    {
      id: 6,
      name: "Solar Premium",
      type: "Ice Diamonds",
      price: "Rp 3.000.000",
      image: "icediamond.png",
      specs: ["Tingkat Kegelapan: 40%, 60%, 80%", "Tolak Panas 99%", "Awet Hingga 5 Tahun", "Garansi 5 Tahun", "Night Vision: High", "UV 400 Technology"]
    },
  ];

  const whatsappNumber = "6285880202593"; 

  return (
    <section id="produk" className="py-20 px-4 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header (Fade Down) */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Pilihan Kaca Film <span className="text-blue-500">Terbaik</span>
          </h2>
          <p className="text-gray-400">
            Geser untuk melihat berbagai pilihan merk dan paket harga.
          </p>
        </motion.div>

        {/* Slider Container */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory hide-scrollbar"
        >
          {products.map((product, index) => (
            <motion.div 
              key={product.id} 
              whileHover={{ y: -10 }} // Efek kartu naik pas di-hover
              className="min-w-[300px] md:min-w-[350px] bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-xl snap-center flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={getAssetImage(product.image)}
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{product.type}</p>
                
                <div className="mb-6 space-y-2">
                  {product.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check size={16} className="text-green-500" />
                      <span dangerouslySetInnerHTML={{ __html: highlightSpecText(spec) }} />
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500 mb-1">Mulai dari</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">{product.price}</span>
                    <a 
                      href={`https://wa.me/${whatsappNumber}?text=Halo, saya tertarik dengan ${product.name}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 p-2 rounded-full transition text-white"
                    >
                      <MessageCircle size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Indikator Geser */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
        </div>

      </div>
    </section>
  );
}