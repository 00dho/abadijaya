import { Link } from 'react-router-dom';
import doc1 from '../assets/documentation/doc1.jpeg';
import doc2 from '../assets/documentation/doc2.jpeg';
import doc3 from '../assets/documentation/doc3.jpeg';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-400 py-12 px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <Link to="/dokumentasi" className="text-white font-bold text-lg mb-4 hover:text-blue-400 transition-colors inline-block">
              Dokumentasi & Testimoni
            </Link>
            <div className="flex gap-4">
              <Link to="/dokumentasi" className="overflow-hidden rounded-lg hover:opacity-80 transition">
                <img src={doc1} alt="Dokumentasi 1" className="w-16 h-16 object-cover" />
              </Link>
              <Link to="/dokumentasi" className="overflow-hidden rounded-lg hover:opacity-80 transition">
                <img src={doc2} alt="Dokumentasi 2" className="w-16 h-16 object-cover" />
              </Link>
              <Link to="/dokumentasi" className="overflow-hidden rounded-lg hover:opacity-80 transition">
                <img src={doc3} alt="Dokumentasi 3" className="w-16 h-16 object-cover" />
              </Link>
            </div>
            <p className="text-sm mt-2">"Hasil rapi dan pelayanan ramah!" - Customer</p>
          </div>
          <div className="text-right">
            <h4 className="text-white font-bold text-lg mb-4">Partner & Sponsor</h4>
            <div className="flex gap-4 justify-end">
               {/* Placeholder Sponsor */}
              <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
              <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="text-center text-xs pt-8 border-t border-slate-900">
          &copy; 2026 Abadi Jaya Film. All rights reserved.
        </div>
      </div>
    </footer>
  );
}