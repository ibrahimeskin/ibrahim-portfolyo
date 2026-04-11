# 🚀 Portfolyo Sitesi — Kurulum & Çalıştırma Rehberi

## 1. Gereksinimler
- **Node.js** (v18 veya üstü) → https://nodejs.org adresinden indir

## 2. Bağımlılıkları Kur
Proje klasörünü terminalde aç ve şu komutu çalıştır:

```bash
npm install
```

## 3. Siteyi Başlat
```bash
npm run dev
```
Tarayıcında `http://localhost:5173` adresini aç — site çalışıyor!

---

## 🔐 Admin Paneli Nasıl Kullanılır?

### Giriş
- Adres: `http://localhost:5173/admin`
- E-posta ve şifreni gir → Dashboard'a geçersin

### Dashboard'a direkt erişim artık KAPALI
`/admin/dashboard` adresine direkt gitmeye çalışırsan otomatik olarak `/admin` login sayfasına yönlendirilirsin. ✅

---

## 📋 Dashboard Özellikleri

### Projeler Sekmesi
- **Yeni proje ekle** — formu doldur, Ekle'ye bas
- **Projeyi düzenle** — listede kalem ikonuna tıkla, form dolup güncelleme moduna geçer
- **Sıra değiştir** — sol taraftaki ≡ ikonunu tutup sürükle-bırak yap
- **Sil** — çöp kutusu ikonuna tıkla

### Site Ayarları Sekmesi
- Hakkımda, üniversite katkıları, trading vizyonu ve dersler metinlerini buradan güncelle
- Kaydet'e bastığında hem Firebase'e yazılır hem `/hakkimda` sayfasında anında görünür

### Mesajlar Sekmesi
- İletişim formundan gelen mesajları gör ve sil

---

## 🖼️ Görsel URL Nasıl Alınır?

Proje görselleri için URL girmen gerekiyor. İşte en kolay 3 yöntem:

### Yöntem 1 — ImgBB (Ücretsiz, önerilen)
1. https://imgbb.com adresine git
2. "Start uploading" ile görseli yükle
3. Yükleme bittikten sonra **"Direct link"** kısmındaki URL'yi kopyala
4. Bu URL'yi dashboard'daki görsel alanına yapıştır

### Yöntem 2 — Cloudinary (Ücretsiz, profesyonel)
1. https://cloudinary.com adresine git, ücretsiz hesap oluştur
2. Media Library'e görseli yükle
3. Görsele tıkla → "Copy URL" ile linki al

### Yöntem 3 — GitHub (Zaten biliyorsan)
1. GitHub'da bir repo veya issue aç
2. Görseli sürükle-bırak ile yorum kutusuna at
3. Otomatik oluşan `https://github.com/.../...` linkini kopyala

> ⚠️ Google Drive veya OneDrive linkleri çalışmaz — direkt görsel linki (jpg/png ile biten) olması şart.

---

## 🏗️ Yayına Alma (Build)
Siteyi internete yüklemeden önce:

```bash
npm run build
```

Bu komut `dist/` klasörü oluşturur. Bu klasörü Netlify/Vercel/GitHub Pages'e yükleyebilirsin.

