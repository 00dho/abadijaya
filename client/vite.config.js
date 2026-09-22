import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE, PAGE_SEO, PUBLIC_ROUTES, PRIVATE_ROUTES, SERVICE_CATALOG } from './site.config.js'

// Buang kolom yang masih kosong biar tidak ada data palsu yang dikirim ke Google.
const bersihkan = (obj) => {
  const hasil = {}
  for (const [key, value] of Object.entries(obj)) {
    const kosong =
      value === '' ||
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    if (!kosong) hasil[key] = value
  }
  return hasil
}

// Structured data (JSON-LD) supaya Google paham ini bisnis lokal, bukan blog.
// Inilah yang bikin nama, alamat, jam buka, dan rentang harga bisa muncul
// langsung di hasil pencarian.
const buatStructuredData = () => {
  const { address, geo } = SITE

  const alamatLengkap = [address.street, address.district].filter(Boolean).join(', ')

  const business = bersihkan({
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.shortDescription,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    image: `${SITE.url}${SITE.ogImage}`,
    logo: `${SITE.url}${SITE.ogImage}`,
    priceRange: SITE.priceRange,
    currenciesAccepted: 'IDR',

    address: bersihkan({
      '@type': 'PostalAddress',
      streetAddress: alamatLengkap,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    }),

    geo:
      geo.latitude && geo.longitude
        ? { '@type': 'GeoCoordinates', latitude: geo.latitude, longitude: geo.longitude }
        : '',

    areaServed: SITE.areaServed.map((kota) => ({ '@type': 'City', name: kota })),

    openingHoursSpecification: SITE.openingHours.map((jadwal) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: jadwal.days,
      opens: jadwal.opens,
      closes: jadwal.closes,
    })),

    sameAs: Object.values(SITE.profiles).filter(Boolean),

    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Pemasangan Kaca Film Mobil',
      itemListElement: SERVICE_CATALOG.map((layanan) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: layanan.name },
        price: layanan.price,
        priceCurrency: 'IDR',
        availability: 'https://schema.org/InStock',
      })),
    },
  })

  return JSON.stringify(business)
}

const buatRobotsTxt = () => {
  const larangan = PRIVATE_ROUTES.map((rute) => `Disallow: ${rute}`).join('\n')
  return [
    'User-agent: *',
    'Allow: /',
    larangan,
    '',
    `Sitemap: ${SITE.url}/sitemap.xml`,
    '',
  ].join('\n')
}

const buatSitemapXml = () => {
  const hariIni = new Date().toISOString().split('T')[0]
  const entri = PUBLIC_ROUTES.map((rute) =>
    [
      '  <url>',
      `    <loc>${SITE.url}${rute.path === '/' ? '/' : rute.path}</loc>`,
      `    <lastmod>${hariIni}</lastmod>`,
      `    <changefreq>${rute.changefreq}</changefreq>`,
      `    <priority>${rute.priority}</priority>`,
      '  </url>',
    ].join('\n'),
  ).join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entri,
    '</urlset>',
    '',
  ].join('\n')
}

// Plugin SEO: mengisi placeholder di index.html, menyuntikkan structured data,
// lalu membuat robots.txt & sitemap.xml otomatis saat "npm run build".
// Semua sumbernya satu: site.config.js
const seoPlugin = () => ({
  name: 'abadijaya-seo',

  transformIndexHtml(html) {
    const isian = {
      __SITE_URL__: SITE.url,
      __SITE_NAME__: SITE.name,
      __SITE_TITLE__: PAGE_SEO.home.title,
      __SITE_DESCRIPTION__: PAGE_SEO.home.description,
      __OG_IMAGE__: `${SITE.url}${SITE.ogImage}`,
      __OG_IMAGE_WIDTH__: SITE.ogImageWidth,
      __OG_IMAGE_HEIGHT__: SITE.ogImageHeight,
    }

    const hasil = Object.entries(isian).reduce(
      (acc, [token, nilai]) => acc.replaceAll(token, nilai),
      html,
    )

    return {
      html: hasil,
      tags: [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: buatStructuredData(),
          injectTo: 'head',
        },
      ],
    }
  },

  // Supaya bisa dicek juga saat "npm run dev", bukan cuma setelah build.
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/robots.txt') {
        res.setHeader('Content-Type', 'text/plain')
        return res.end(buatRobotsTxt())
      }
      if (req.url === '/sitemap.xml') {
        res.setHeader('Content-Type', 'application/xml')
        return res.end(buatSitemapXml())
      }
      next()
    })
  },

  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buatRobotsTxt() })
    this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buatSitemapXml() })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin()],
})
