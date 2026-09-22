import { useEffect } from 'react';
import { SITE, PAGE_SEO } from '../../site.config';

// Helper: buat tag <meta> kalau belum ada, kalau sudah ada tinggal diubah isinya.
const pasangMeta = (kunci, atribut, isi) => {
  let el = document.head.querySelector(`meta[${atribut}="${kunci}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(atribut, kunci);
    document.head.appendChild(el);
  }
  el.setAttribute('content', isi);
};

// Helper: atur <link rel="canonical"> supaya Google tahu alamat resmi halaman ini.
const pasangCanonical = (url) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
};

/**
 * Mengatur judul & deskripsi khusus untuk tiap halaman.
 *
 * Karena website ini Single Page Application, semua halaman awalnya memakai
 * judul yang sama dari index.html. Komponen ini yang membedakannya, supaya
 * setiap halaman punya judul sendiri di hasil pencarian Google.
 *
 * Catatan: preview link di WhatsApp/Facebook tetap mengambil data dari
 * index.html (mereka tidak menjalankan JavaScript), jadi preview-nya sama
 * untuk semua halaman. Itu normal untuk SPA.
 *
 * @param {string}  title       Judul lengkap halaman (apa adanya, tidak ditambahi).
 * @param {string}  description Ringkasan halaman, idealnya 150-160 karakter.
 * @param {string}  path        Path halaman, contoh '/cek-garansi'.
 * @param {boolean} noindex     true untuk halaman admin agar tidak masuk Google.
 */
export default function Seo({ title, description, path = '/', noindex = false }) {
  useEffect(() => {
    const judulLengkap = title || PAGE_SEO.home.title;
    const url = `${SITE.url}${path}`;
    const deskripsi = description || SITE.description;

    document.title = judulLengkap;

    pasangMeta('description', 'name', deskripsi);
    pasangMeta(
      'robots',
      'name',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1',
    );

    pasangMeta('og:title', 'property', judulLengkap);
    pasangMeta('og:description', 'property', deskripsi);
    pasangMeta('og:url', 'property', url);

    pasangMeta('twitter:title', 'name', judulLengkap);
    pasangMeta('twitter:description', 'name', deskripsi);

    pasangCanonical(url);
  }, [title, description, path, noindex]);

  return null;
}
