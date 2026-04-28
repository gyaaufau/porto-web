---
featured: true
---

# Litbang AU App

## Periode Project
Agustus 2025 - September 2025

## Ringkasan Singkat
Litbang AU App adalah aplikasi Flutter internal untuk mendukung distribusi, tindak lanjut, persetujuan, dan pelacakan dokumen antarrole di lingkungan Litbang AU.

## Problem yang Diselesaikan
- distribusi dokumen internal masih lambat karena banyak proses manual
- status dokumen sulit dipantau end-to-end
- koordinasi antarrole untuk membaca, menyetujui, dan menindaklanjuti dokumen belum efisien
- file dan histori respons tersebar sehingga rawan miskomunikasi

## Fitur Utama
- autentikasi dan session handling dengan secure storage
- daftar dokumen dengan kategori seperti `TANDA_TANGAN`, `INFORMASI`, dan `TINDAK_LANJUT`
- detail dokumen berisi file, pihak terlibat, dan riwayat proses
- workflow berbasis role untuk accept, sign, response, forward, dan add people
- download dan open file langsung dari perangkat
- multi-environment `development`, `staging`, dan `production`

## Tech Stack
- Flutter
- Dart
- `flutter_bloc`
- `go_router`
- `dio`
- `get_it`
- `flutter_secure_storage`
- `shared_preferences`
- `sqflite`
- Firebase Core
- Cloud Firestore

## Arsitektur Project
Project ini memakai pendekatan modular berbasis feature. Layer utama dipisah antara area feature, shared utilities, resources, dan konfigurasi app, sehingga logic bisnis, dependency, storage, dan komponen UI lebih mudah dipelihara dan dikembangkan. Pendekatan ini membantu project tetap scalable saat jumlah module, workflow, dan role bertambah.

## Struktur Project
Struktur folder utama:

```text
lib/
├── app.dart
├── main.dart
├── main_dev.dart
├── main_staging.dart
├── main_prod.dart
├── di.dart
├── config/
│   └── flavor_config.dart
├── features/
│   ├── account/
│   │   └── presentation/
│   ├── archive/
│   │   └── presentation/
│   ├── auth/
│   │   ├── data/
│   │   ├── di/
│   │   ├── domain/
│   │   └── presentation/
│   ├── document/
│   │   ├── data/
│   │   ├── di/
│   │   ├── helper/
│   │   └── presentation/
│   ├── home/
│   │   ├── data/
│   │   ├── domain/
│   │   └── presentation/
│   └── splash/
│       └── presentation/
├── resources/
│   ├── gen/
│   └── theme/
└── shared/
    ├── commons/
    ├── components/
    ├── core/
    ├── utils/
    └── widgets/
```

## Tantangan Teknis
### Sinkronisasi state setelah action
Setelah user accept, sign, forward, atau response dokumen, detail harus di-refresh agar UI tetap konsisten dengan status terbaru.

### File download lifecycle
Flow download perlu menangani retry, pengecekan cache lokal, penentuan lokasi simpan, dan membuka file langsung dari device.

### Auth-driven routing
Navigasi harus menyesuaikan hasil pengecekan token saat startup, sehingga splash, login, dan main shell tetap sinkron dengan state autentikasi.

## Impact
- mendigitalisasi alur dokumen internal dengan workflow berbasis role
- mempercepat distribusi dan tindak lanjut dokumen
- meningkatkan visibilitas status baca, approval, dan histori proses
- menunjukkan kemampuan membangun aplikasi Flutter internal dengan arsitektur modular dan business flow yang kompleks
