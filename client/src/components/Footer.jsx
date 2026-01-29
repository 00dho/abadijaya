import { Link } from 'react-router-dom';

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
              <div className="w-16 h-16 bg-gray-800 rounded-lg"></div>
              <div className="w-16 h-16 bg-gray-800 rounded-lg"></div>
              <div className="w-16 h-16 bg-gray-800 rounded-lg"></div>
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