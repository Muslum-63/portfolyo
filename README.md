# Diyetisyen Portfolyo Sitesi

Kişisel portfolyo sitesi — GitHub Pages üzerinde statik olarak yayınlanır.

## Hızlı Başlangıç (Yerel Test)

```bash
cd portfolyo
python -m http.server 8000
# Tarayıcıda: http://localhost:8000
```

---

## İçerik Doldurma Rehberi

### 1. İsim / Marka

Tüm dosyalarda `Dyt. Ayşen Yetim` ifadesini kendi adınızla değiştirin:
- `index.html` → Ctrl+H (Replace All)
- `blog.html`
- `post.html`
- `404.html`

### 2. Portre Fotoğrafı

`assets/images/portrait.jpg` dosyasına kendi fotoğrafınızı koyun, ardından `index.html` içindeki ilgili satırı aktif edin (yorumdaki `<img>` etiketini).

### 3. Formspree (İletişim Formu)

1. [formspree.io](https://formspree.io) → Ücretsiz hesap aç
2. Yeni form oluştur → form ID'yi kopyala (örn. `xpzgkqvr`)
3. `index.html` içinde `YOUR_FORM_ID` → kendi ID'niz

### 4. Calendly (Online Randevu)

1. [calendly.com](https://calendly.com) → Ücretsiz hesap + etkinlik oluştur
2. Etkinlik linkini kopyala (örn. `https://calendly.com/adsoyadiniz/30dk`)
3. `index.html` içinde `YOUR_CALENDLY_URL` → kendi linkiniz

### 5. Sosyal Medya

`index.html` ve `blog.html` içinde:
- `INSTAGRAM_URL` → `https://instagram.com/kullaniciadi`
- `LINKEDIN_URL` → `https://linkedin.com/in/kullaniciadi`
- `YOUTUBE_URL` → `https://youtube.com/@kullaniciadi` (yoksa o `<a>` etiketini silin)

### 6. Hizmetler

`data/services.json` dosyasını kendi hizmetlerinize göre düzenleyin.

### 7. Danışan Yorumları

`data/testimonials.json` dosyasına gerçek yorumları ekleyin.
> **Önemli:** KVKK gereği danışanlardan yazılı onay alın.

### 8. Başarı Hikayeleri (Öncesi / Sonrası Görselleri)

`index.html` içindeki placeholder alanlarına gerçek görselleri ekleyin.
> **Uyarı:** Gerçek görsel eklerken danışandan **yazılı izin** almak yasal zorunluluktur.

### 9. Yeni Blog Yazısı Ekleme

1. `posts/` klasörüne `yeni-slug.md` dosyası oluşturun (markdown formatında)
2. `data/posts.json` dosyasına şu satırı ekleyin:
   ```json
   {
     "slug": "yeni-slug",
     "title": "Yazı Başlığı",
     "excerpt": "Kısa açıklama (150 karakter).",
     "date": "2026-05-01",
     "readMin": 5,
     "category": "Obezite",
     "cover": "https://images.unsplash.com/..."
   }
   ```

---

## GitHub Pages'e Yayınlama

```bash
cd portfolyo
git init
git add .
git commit -m "Initial portfolio"
```

GitHub'da:
1. Yeni **public** repo aç: `portfolyo`
2. Remote ekle ve push:
   ```bash
   git remote add origin https://github.com/KULLANICIADI/portfolyo.git
   git branch -M main
   git push -u origin main
   ```
3. Repo → Settings → Pages → Branch: `main`, folder: `/ (root)` → Save
4. 1-2 dakika bekleyin → `https://KULLANICIADI.github.io/portfolyo/`

### Özel Domain Eklemek İstersen (opsiyonel)

`CNAME` dosyasına alan adınızı yazın (tek satır):
```
dytadsoyad.com
```
Domain yönetim panelinizde CNAME kaydı: `KULLANICIADI.github.io`

---

## Dosya Yapısı

```
portfolyo/
├── index.html          # Ana tek-sayfa site
├── blog.html           # Blog yazıları listesi
├── post.html           # Tek yazı görüntüleyici
├── 404.html            # Hata sayfası
├── .nojekyll           # GitHub Pages Jekyll'ı devre dışı bırakır
├── CNAME               # Özel domain için (boş bırakın veya doldurun)
├── css/custom.css      # Özel stiller
├── js/
│   ├── app.js          # Ana JS (navbar, slider, form, services)
│   ├── blog.js         # Blog listesi
│   └── post.js         # Blog yazısı render
├── data/
│   ├── services.json   # Hizmet paketleri
│   ├── testimonials.json # Danışan yorumları
│   └── posts.json      # Blog yazısı meta listesi
├── posts/              # Markdown blog yazıları
└── assets/images/      # Görseller
```
