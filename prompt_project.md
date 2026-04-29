# Prompt Template Project Portfolio

Pakai prompt ini setiap kali mau bikin `project.md` baru untuk folder project lain.

Prompt ini sudah menyesuaikan struktur portfolio sekarang:
- card project tampilkan chip `Personal/Work`
- card dan detail project tampilkan chip `Mobile/Web/REST API`
- data project dibaca dari frontmatter + section markdown

## Prompt

Bantu saya menulis file `project.md` untuk portfolio pribadi saya.

Tulis dalam bahasa Indonesia, ringkas, jelas, profesional, dan fokus ke portfolio engineering. Hindari filler, pengulangan, gaya terlalu marketing, dan narasi interview.

Format wajib markdown dan ikuti struktur ini persis:

````md
---
featured: [true atau false]
projectType: [personal atau work]
appType: [mobile, web, atau rest-api]
---

# [Nama Project]

## Periode Project
[Contoh: Agustus 2025 - September 2025]

## Ringkasan Singkat
[1 paragraf singkat. Jelaskan project ini apa, untuk siapa, dan tujuan utamanya.]

## Problem yang Diselesaikan
- [masalah 1]
- [masalah 2]
- [masalah 3]

## Fitur Utama
- [fitur utama 1]
- [fitur utama 2]
- [fitur utama 3]
- [fitur utama 4]
- [fitur utama 5]

## Tech Stack
- [teknologi 1]
- [teknologi 2]
- [teknologi 3]
- [teknologi 4]

## Repository
- GitHub: <https://github.com/...>
- Play Store: <https://play.google.com/...>
- Live Demo: <https://...>
- API Docs: <https://...>

## Arsitektur Project
[1 paragraf singkat tentang pendekatan arsitektur, pembagian module, atau alasan struktur codebase.]

## Struktur Project
```text
[tree folder utama project]
```

## Tantangan Teknis
### [Tantangan 1]
[1 paragraf singkat.]

### [Tantangan 2]
[1 paragraf singkat.]

### [Tantangan 3]
[1 paragraf singkat.]

## Impact
- [impact 1]
- [impact 2]
- [impact 3]
````

## Aturan Isi

- Frontmatter wajib ada di paling atas.
- Nilai `projectType` hanya boleh:
  - `personal`
  - `work`
- Nilai `appType` hanya boleh:
  - `mobile`
  - `web`
  - `rest-api`
- Nilai `featured` hanya `true` atau `false`.
- `Periode Project` wajib tetap dalam format teks biasa, bukan bullet.
- `Ringkasan Singkat` harus 1 paragraf pendek.
- `Problem yang Diselesaikan`, `Fitur Utama`, `Tech Stack`, dan `Impact` wajib berbentuk bullet list.
- `Repository` boleh berisi item yang relevan saja. Tidak semua link wajib ada.
- Jika tidak ada repo publik, tetap buat section `Repository` dan isi link relevan yang tersedia.
- `Struktur Project` pakai block code `text` hanya jika memang ada struktur yang layak ditampilkan.
- `Tantangan Teknis` idealnya 2-3 subbagian dengan judul yang spesifik, bukan generik.
- Fokus pada hasil, scope engineering, keputusan teknis, dan value project.
- Maksimal 1 paragraf untuk tiap section naratif.
- Nada tulisan harus terasa seperti portfolio engineer yang rapi dan to the point.

## Jangan Buat Section Ini

- `Versi Singkat untuk Portofolio`
- `Versi Menengah untuk CV atau LinkedIn`
- `Poin yang Sebaiknya Dipakai Saat Presentasi`
- `Contoh Narasi Siap Pakai`
- `Kalau Mau Diposisikan Sebagai Hasil Belajar`
- `Ringkasan Akhir`

## Jangan Lakukan Ini

- jangan tambahkan saran presentasi
- jangan tambahkan saran interview
- jangan tambahkan keyword SEO
- jangan terlalu akademik
- jangan terlalu menjual
- jangan membuat section kosong

## Input yang Akan Saya Berikan

Saya biasanya akan memberi:

- nama project
- apakah featured atau tidak
- project ini `personal` atau `work`
- project ini `mobile`, `web`, atau `rest-api`
- periode project
- tujuan project
- problem yang diselesaikan
- fitur utama
- stack yang dipakai
- link repository / Play Store / demo / docs
- arsitektur atau pola yang dipakai
- struktur folder project jika relevan
- tantangan teknis
- impact atau hasil

Kalau ada informasi yang belum lengkap, tetap bantu susun versi terbaik tanpa membuat bagian terlalu panjang atau mengarang detail yang tidak didukung input.
