import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import doc1 from '../assets/documentation/doc1.jpeg';
import doc2 from '../assets/documentation/doc2.jpeg';
import doc3 from '../assets/documentation/doc3.jpeg';
import { SITE } from '../../site.config';

export default function Footer() {
  const previewDokumentasi = [doc1, doc2, doc3];

  // Susun alamat dari site.config.js, lewati bagian yang belum diisi.
  const alamatLengkap = [
    SITE.address.street,
    SITE.address.district,
    SITE.address.city,
    SITE.address.region,
    SITE.address.postalCode,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <footer className="bg-slate-950 text-gray-400 py-12 px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-8">

          {/* ============================================================
              KOLOM 1: NAMA - ALAMAT - TELEPON (NAP)
              Google memakai blok ini untuk mencocokkan website dengan
              Google Business Profile. Tulisannya HARUS sama persis
              dengan yang terdaftar di Google Maps.
              ============================================================ */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4">{SITE.name}</h2>
            <p className="text-sm mb-5 leading-relaxed">{SITE.shortDescription}</p>

            <address className="not-italic space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>{alamatLengkap}</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <a href={`tel:${SITE.phone}`} className="hover:text-white transition-colors">
                  {SITE.phoneDisplay}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Chat via WhatsApp
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>{SITE.openingHoursDisplay}</span>
              </div>
            </address>
          </div>

          {/* KOLOM 2: DOKUMENTASI */}
          <div>
            <Link
              to="/dokumentasi"
              className="text-white font-bold text-lg mb-4 hover:text-blue-400 transition-colors inline-block"
            >
              Dokumentasi & Testimoni
            </Link>
            <div className="flex gap-4">
              {previewDokumentasi.map((foto, i) => (
                <Link
                  key={i}
                  to="/dokumentasi"
                  className="overflow-hidden rounded-lg hover:opacity-80 transition"
                >
                  <img
                    src={foto}
                    alt={`Hasil pemasangan kaca film mobil di ${SITE.name} ${SITE.address.city} - foto ${i + 1}`}
                    loading="lazy"
                    width="64"
                    height="64"
                    className="w-16 h-16 object-cover"
                  />
                </Link>
              ))}
            </div>
            <p className="text-sm mt-3">"Hasil rapi dan pelayanan ramah!" - Customer</p>
          </div>

          {/* KOLOM 3: AREA LAYANAN
              Menyebut nama wilayah secara eksplisit membantu website muncul
              pada pencarian "kaca film [nama daerah]". */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4">Area Layanan</h2>
            <ul className="text-sm space-y-2">
              {SITE.areaServed.map((wilayah) => (
                <li key={wilayah} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                  {wilayah}
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="text-center text-xs pt-8 border-t border-slate-900">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
