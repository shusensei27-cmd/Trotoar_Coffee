# Deployment Guide — Trotoar Coffee

## A. Deploy ke GitHub

```bash
# 1. Inisialisasi repository
cd D:\web\WEB TROTOAR
git init
git add .
git commit -m "Initial commit: Trotoar Coffee website"

# 2. Buat repository di GitHub (via browser), lalu:
git remote add origin https://github.com/username/trotoar-coffee.git
git branch -M main
git push -u origin main
```

## B. Deploy ke Netlify

### Via Netlify Dashboard:

1. Login ke [Netlify](https://app.netlify.com)
2. Klik **"Add new site" → "Import an existing project"**
3. Pilih **GitHub** dan authorize
4. Pilih repository `trotoar-coffee`
5. **Build settings:**
   - Build command: `leave empty` (static site)
   - Publish directory: `.` (root directory)
6. Klik **"Deploy site"**

### Konfigurasi Site Name:

1. Setelah deploy, buka **Site settings → General → Site details**
2. Ubah **Site name** menjadi: `trotoarcoffee`
3. URL: `https://trotoarcoffee.netlify.app`

### Konfigurasi netlify.toml:

File `netlify.toml` sudah ada di root project dengan konfigurasi:
- Redirects untuk clean URL (/menu → /pages/menu.html)
- Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)

## C. Google Search Console

### 1. Tambahkan Property:

1. Buka [Google Search Console](https://search.google.com/search-console)
2. Pilih **"URL prefix"**
3. Masukkan: `https://trotoarcoffee.netlify.app`

### 2. Verifikasi:

#### Metode Meta Tag (direkomendasikan):
1. Pilih metode **"HTML tag"**
2. Copy meta tag: `<meta name="google-site-verification" content="YOUR_CODE">`
3. Buka `index.html` dan cari `<!-- Google Search Console Verification -->`
4. Ganti `YOUR_VERIFICATION_CODE` dengan kode dari Google
5. Commit dan push perubahan
6. Klik **"Verify"** di Search Console

#### Metode HTML File (alternatif):
1. Download file `googlexxxxxxxxxxxx.html` dari Search Console
2. Letakkan di root project (`D:\web\WEB TROTOAR\`)
3. Commit dan push
4. Klik **"Verify"** di Search Console

### 3. Submit Sitemap:

1. Di Search Console, buka **Sitemaps** (sidebar kiri)
2. Masukkan: `https://trotoarcoffee.netlify.app/sitemap.xml`
3. Klik **"Submit"**

### 4. Request Indexing:

1. Buka **URL Inspection** (sidebar kiri)
2. Masukkan: `https://trotoarcoffee.netlify.app/`
3. Klik **"Request Indexing"**
4. Ulangi untuk halaman penting:
   - `https://trotoarcoffee.netlify.app/pages/menu.html`
   - `https://trotoarcoffee.netlify.app/pages/about.html`
   - `https://trotoarcoffee.netlify.app/pages/contact.html`
   - `https://trotoarcoffee.netlify.app/pages/gallery.html`

## D. File SEO yang Ditambahkan

| File | Fungsi |
|------|--------|
| `robots.txt` | Mengizinkan crawler Google mengakses seluruh konten |
| `sitemap.xml` | Daftar semua halaman untuk Google indexing |
| `favicon.svg` | Favicon vector (modern browsers) |
| `site.webmanifest` | PWA manifest untuk mobile |
| `browserconfig.xml` | Konfigurasi tile untuk Windows |
| `netlify.toml` | Konfigurasi deploy Netlify |

## E. SEO yang Diterapkan

### Setiap halaman memiliki:
- **Title tag** yang unik per halaman
- **Meta description** yang relevan
- **Meta keywords** untuk konteks
- **Canonical URL** untuk mencegah duplicate content
- **Open Graph** untuk sharing ke Facebook/WhatsApp/LinkedIn
- **Twitter Card** untuk sharing ke Twitter
- **Structured Data (JSON-LD)** dengan tipe `CafeOrCoffeeShop`

### Struktur Data (Schema.org):
- Nama, alamat, telepon, email
- Jam buka (per hari)
- Link Instagram
- Logo dan gambar

## F. Final Checklist

- [ ] GitHub repository sudah dibuat dan dipush
- [ ] Netlify site sudah terdeploy
- [ ] Site name sudah diubah ke `trotoarcoffee`
- [ ] Google Search Console property sudah terverifikasi
- [ ] Sitemap sudah disubmit
- [ ] Halaman utama sudah di-request indexing
- [ ] Canonical URL sudah benar
- [ ] robots.txt bisa diakses (https://trotoarcoffee.netlify.app/robots.txt)
- [ ] sitemap.xml bisa diakses (https://trotoarcoffee.netlify.app/sitemap.xml)
- [ ] Semua halaman memiliki meta description
- [ ] Semua gambar memiliki alt text
- [ ] Mobile responsive
