---
featured: true
---

# OtoLog

## Periode Project

Maret 2026 - April 2026

## Ringkasan Singkat

OtoLog adalah aplikasi mobile Flutter untuk membantu pemilik kendaraan mencatat riwayat servis, memantau biaya perawatan, dan mengelola beberapa kendaraan dalam satu aplikasi. Project ini dibuat untuk menghadirkan pencatatan maintenance yang lebih rapi, mudah dicari, dan tetap bisa digunakan secara lokal tanpa bergantung pada backend.

## Problem yang Diselesaikan

- Riwayat servis kendaraan sering tersebar di chat, nota fisik, atau catatan manual yang sulit dilacak kembali.
- Pemilik kendaraan kesulitan melihat total biaya perawatan dan pola servis dari waktu ke waktu.
- Pengelolaan beberapa kendaraan dalam satu tempat membutuhkan alur yang tetap sederhana dan cepat digunakan.

## Fitur Utama

- Manajemen multi-vehicle dengan detail kendaraan, kendaraan utama, dan pencarian kendaraan.
- Pencatatan servis lengkap meliputi jenis servis, tanggal, odometer, biaya, mekanik, dan catatan tambahan.
- Dashboard ringkas untuk melihat kendaraan aktif, ringkasan servis, dan quick actions.
- Halaman service logs dengan pencarian, filter kendaraan, dan filter rentang tanggal.
- Statistik servis per kendaraan menggunakan chart untuk total biaya, frekuensi, distribusi servis, dan tren pengeluaran.

## Tech Stack

- Flutter
- flutter_bloc (Cubit)
- Drift + SQLite
- GetIt + GoRouter

## Repository

- GitHub: <https://github.com/gyaaufau/otolog>
- Play Store: <https://play.google.com/store/apps/details?id=com.gialoop.otolog>

## Arsitektur Project

Project ini memakai pendekatan modular ringan dengan pemisahan `screens`, `widgets`, `cubit`, `repositories`, `database`, dan `shared`. State management ditangani oleh Cubit, dependency injection memakai GetIt, navigasi memakai GoRouter, dan persistence lokal dibangun di atas Drift/SQLite agar alur data tetap sederhana, testable, dan cocok untuk aplikasi offline-first.

## Struktur Project

```text
lib/
├── main.dart
├── router.dart
├── cubit/
├── database/
├── repositories/
├── resources/
├── screens/
│   ├── garage/
│   ├── home/
│   ├── logs/
│   ├── onboarding/
│   └── settings/
├── shared/
│   ├── commons/
│   ├── constants/
│   ├── core/
│   └── localization/
└── widgets/
```

## Tantangan Teknis

### Sinkronisasi state antar screen

Karena data kendaraan, detail kendaraan, service logs, dan dashboard saling terhubung, tantangan utamanya adalah menjaga state tetap konsisten setelah create, update, delete, dan pergantian kendaraan aktif. Solusi yang dipakai adalah pemisahan Cubit berdasarkan tanggung jawab layar dan pemanggilan reload data yang terarah di flow navigasi utama.

### Evolusi schema database lokal

Project ini berkembang dari fitur dasar menjadi aplikasi dengan kendaraan utama dan pencatatan odometer pada servis, sehingga schema database perlu ikut berubah tanpa merusak data lama. Drift dipakai bersama migration strategy bertahap agar perubahan tabel tetap aman saat versi aplikasi meningkat.

### Menyajikan statistik yang tetap ringan di device

Statistik biaya dan frekuensi servis perlu informatif, tetapi tetap cepat dirender di aplikasi lokal. Data diolah dari record servis per kendaraan lalu divisualisasikan dengan `fl_chart`, sehingga user bisa membaca pola maintenance tanpa perlu integrasi analytics eksternal.

## Impact

- Membuat riwayat perawatan kendaraan lebih terstruktur dan mudah dicari dalam satu aplikasi.
- Memberikan visibilitas yang lebih jelas terhadap total biaya servis dan tren maintenance.
- Menghasilkan aplikasi portfolio Flutter yang menunjukkan kemampuan pada state management, local database, routing, localization, dan data visualization.
