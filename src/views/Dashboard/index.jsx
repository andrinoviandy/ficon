import React, { useMemo, useState } from 'react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import {
  FaFilter,
  FaSyncAlt,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaClock,
  FaExclamationTriangle,
  FaChartBar,
  FaBuilding,
  FaHospital,
  FaBox,
  FaBoxOpen,
  FaUsers,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
} from 'react-icons/fa';


/* =========================================================
   DUMMY MASTER DATA
========================================================= */

const principalOptions = [
  'Semua Principal',
  'BIOFARMA',
  'KIMIA FARMA',
  'PHAPROS, PT',
  'AMAROX PHARMA GLOBAL, PT',
  'SANBE',
];

const cabangOptions = [
  'Semua Cabang',
  'KFTD Jakarta 1',
  'KFTD Jakarta 2',
  'KFTD Bandung',
  'KFTD Surabaya',
  'KFTD Semarang',
  'KFTD Medan',
  'KFTD Palembang',
  'KFTD Makassar',
  'KFTD Denpasar',
  'KFTD Jayapura',
];

const channelOptions = [
  'RS Pemerintah',
  'RS Swasta',
  'Apotek',
  'Klinik',
  'Puskesmas',
  'PBF',
  'Dinkes',
];


/* =========================================================
   DUMMY DATA UTAMA
========================================================= */

const dummyData = [

  {
    id: 1,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-07-15',
    principal: 'BIOFARMA',
    cabang: 'KFTD Jakarta 1',
    customerGroup: 'RS Pemerintah',
    customer: 'RSUP Nasional',
    channel: 'RS Pemerintah',
    invoice: 1250,
    sales: 18500000000,
    piutang: 7200000000,
    collection: 4800000000,
    outstanding: 2400000000,
    aging: 0,
  },

  {
    id: 2,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-07-03',
    principal: 'BIOFARMA',
    cabang: 'KFTD Bandung',
    customerGroup: 'RS Pemerintah',
    customer: 'RSUD Kota Bandung',
    channel: 'RS Pemerintah',
    invoice: 980,
    sales: 13200000000,
    piutang: 5800000000,
    collection: 3500000000,
    outstanding: 2300000000,
    aging: 0,
  },

  {
    id: 3,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-06-20',
    principal: 'BIOFARMA',
    cabang: 'KFTD Surabaya',
    customerGroup: 'RS Swasta',
    customer: 'RS Siloam Surabaya',
    channel: 'RS Swasta',
    invoice: 820,
    sales: 9800000000,
    piutang: 4200000000,
    collection: 3100000000,
    outstanding: 1100000000,
    aging: 10,
  },

  {
    id: 4,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-07-30',
    principal: 'KIMIA FARMA',
    cabang: 'KFTD Jakarta 2',
    customerGroup: 'Apotek',
    customer: 'Apotek Kimia Sehat',
    channel: 'Apotek',
    invoice: 1560,
    sales: 7600000000,
    piutang: 3900000000,
    collection: 2800000000,
    outstanding: 1100000000,
    aging: 0,
  },

  {
    id: 5,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-06-28',
    principal: 'KIMIA FARMA',
    cabang: 'KFTD Semarang',
    customerGroup: 'Klinik',
    customer: 'Klinik Medika Utama',
    channel: 'Klinik',
    invoice: 730,
    sales: 5400000000,
    piutang: 2800000000,
    collection: 1800000000,
    outstanding: 1000000000,
    aging: 2,
  },

  {
    id: 6,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-07-05',
    principal: 'PHAPROS, PT',
    cabang: 'KFTD Medan',
    customerGroup: 'Apotek',
    customer: 'Apotek Sehat Bersama',
    channel: 'Apotek',
    invoice: 620,
    sales: 4300000000,
    piutang: 2100000000,
    collection: 1600000000,
    outstanding: 500000000,
    aging: 0,
  },

  {
    id: 7,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-06-10',
    principal: 'PHAPROS, PT',
    cabang: 'KFTD Palembang',
    customerGroup: 'Puskesmas',
    customer: 'Puskesmas Sehat Makmur',
    channel: 'Puskesmas',
    invoice: 540,
    sales: 3800000000,
    piutang: 1800000000,
    collection: 1100000000,
    outstanding: 700000000,
    aging: 20,
  },

  {
    id: 8,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-07-02',
    principal: 'AMAROX PHARMA GLOBAL, PT',
    cabang: 'KFTD Surabaya',
    customerGroup: 'RS Swasta',
    customer: 'RS Mitra Keluarga',
    channel: 'RS Swasta',
    invoice: 450,
    sales: 3200000000,
    piutang: 1600000000,
    collection: 1200000000,
    outstanding: 400000000,
    aging: 0,
  },

  {
    id: 9,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-06-15',
    principal: 'BIOFARMA',
    cabang: 'KFTD Makassar',
    customerGroup: 'Dinkes',
    customer: 'Dinas Kesehatan Sulsel',
    channel: 'Dinkes',
    invoice: 390,
    sales: 2900000000,
    piutang: 1300000000,
    collection: 800000000,
    outstanding: 500000000,
    aging: 15,
  },

  {
    id: 10,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-07-20',
    principal: 'SANBE',
    cabang: 'KFTD Denpasar',
    customerGroup: 'Apotek',
    customer: 'Apotek Bali Farma',
    channel: 'Apotek',
    invoice: 340,
    sales: 2400000000,
    piutang: 1100000000,
    collection: 900000000,
    outstanding: 200000000,
    aging: 0,
  },

  {
    id: 11,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-06-01',
    principal: 'BIOFARMA',
    cabang: 'KFTD Jayapura',
    customerGroup: 'PBF',
    customer: 'PBF Papua Sehat',
    channel: 'PBF',
    invoice: 280,
    sales: 1900000000,
    piutang: 900000000,
    collection: 500000000,
    outstanding: 400000000,
    aging: 29,
  },

  {
    id: 12,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-07-01',
    principal: 'KIMIA FARMA',
    cabang: 'KFTD Jakarta 1',
    customerGroup: 'RS Swasta',
    customer: 'RS Harapan Kita',
    channel: 'RS Swasta',
    invoice: 710,
    sales: 6200000000,
    piutang: 2900000000,
    collection: 2100000000,
    outstanding: 800000000,
    aging: 0,
  },

  {
    id: 13,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-08-15',
    principal: 'BIOFARMA',
    cabang: 'KFTD Jakarta 1',
    customerGroup: 'RS Pemerintah',
    customer: 'RS Pusat Jakarta',
    channel: 'RS Pemerintah',
    invoice: 1120,
    sales: 16800000000,
    piutang: 6800000000,
    collection: 4200000000,
    outstanding: 2600000000,
    aging: 0,
  },

  {
    id: 14,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-08-05',
    principal: 'KIMIA FARMA',
    cabang: 'KFTD Bandung',
    customerGroup: 'Apotek',
    customer: 'Apotek Bandung Sehat',
    channel: 'Apotek',
    invoice: 860,
    sales: 11400000000,
    piutang: 5100000000,
    collection: 3000000000,
    outstanding: 2100000000,
    aging: 0,
  },

  {
    id: 15,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-07-25',
    principal: 'PHAPROS, PT',
    cabang: 'KFTD Surabaya',
    customerGroup: 'RS Swasta',
    customer: 'RS Mitra Surabaya',
    channel: 'RS Swasta',
    invoice: 790,
    sales: 9200000000,
    piutang: 4000000000,
    collection: 2700000000,
    outstanding: 1300000000,
    aging: 6,
  },

  {
    id: 16,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-08-02',
    principal: 'BIOFARMA',
    cabang: 'KFTD Semarang',
    customerGroup: 'Klinik',
    customer: 'Klinik Sehat Utama',
    channel: 'Klinik',
    invoice: 640,
    sales: 5100000000,
    piutang: 2500000000,
    collection: 1600000000,
    outstanding: 900000000,
    aging: 0,
  },

  {
    id: 17,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-07-10',
    principal: 'KIMIA FARMA',
    cabang: 'KFTD Medan',
    customerGroup: 'Puskesmas',
    customer: 'Puskesmas Medan Sehat',
    channel: 'Puskesmas',
    invoice: 520,
    sales: 4100000000,
    piutang: 1900000000,
    collection: 1200000000,
    outstanding: 700000000,
    aging: 21,
  },

  {
    id: 18,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-08-30',
    principal: 'SANBE',
    cabang: 'KFTD Denpasar',
    customerGroup: 'Apotek',
    customer: 'Apotek Bali Farma',
    channel: 'Apotek',
    invoice: 410,
    sales: 2800000000,
    piutang: 1300000000,
    collection: 1000000000,
    outstanding: 300000000,
    aging: 0,
  },

  {
    id: 19,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-07-15',
    principal: 'AMAROX PHARMA GLOBAL, PT',
    cabang: 'KFTD Makassar',
    customerGroup: 'Dinkes',
    customer: 'Dinas Kesehatan Sulsel',
    channel: 'Dinkes',
    invoice: 360,
    sales: 3000000000,
    piutang: 1400000000,
    collection: 900000000,
    outstanding: 500000000,
    aging: 16,
  },

  {
    id: 20,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-08-04',
    principal: 'BIOFARMA',
    cabang: 'KFTD Palembang',
    customerGroup: 'PBF',
    customer: 'PBF Sumatera Sehat',
    channel: 'PBF',
    invoice: 310,
    sales: 2200000000,
    piutang: 1000000000,
    collection: 600000000,
    outstanding: 400000000,
    aging: 0,
  },

  {
    id: 21,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-06-25',
    principal: 'BIOFARMA',
    cabang: 'KFTD Jakarta 2',
    customerGroup: 'RS Pemerintah',
    customer: 'RSUD Jakarta Selatan',
    channel: 'RS Pemerintah',
    invoice: 480,
    sales: 5200000000,
    piutang: 2400000000,
    collection: 1500000000,
    outstanding: 900000000,
    aging: 5,
  },

  {
    id: 22,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-06-18',
    principal: 'KIMIA FARMA',
    cabang: 'KFTD Bandung',
    customerGroup: 'RS Swasta',
    customer: 'RS Hermina Bandung',
    channel: 'RS Swasta',
    invoice: 530,
    sales: 6100000000,
    piutang: 2800000000,
    collection: 1700000000,
    outstanding: 1100000000,
    aging: 12,
  },

  {
    id: 23,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-06-10',
    principal: 'PHAPROS, PT',
    cabang: 'KFTD Surabaya',
    customerGroup: 'Apotek',
    customer: 'Apotek Sehat Surabaya',
    channel: 'Apotek',
    invoice: 390,
    sales: 3500000000,
    piutang: 1700000000,
    collection: 900000000,
    outstanding: 800000000,
    aging: 20,
  },

  {
    id: 24,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-05-25',
    principal: 'BIOFARMA',
    cabang: 'KFTD Jakarta 1',
    customerGroup: 'RS Pemerintah',
    customer: 'RSUP Persahabatan',
    channel: 'RS Pemerintah',
    invoice: 420,
    sales: 4800000000,
    piutang: 2100000000,
    collection: 1200000000,
    outstanding: 900000000,
    aging: 36,
  },

  {
    id: 25,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-05-20',
    principal: 'KIMIA FARMA',
    cabang: 'KFTD Semarang',
    customerGroup: 'Puskesmas',
    customer: 'Puskesmas Semarang Barat',
    channel: 'Puskesmas',
    invoice: 350,
    sales: 3200000000,
    piutang: 1500000000,
    collection: 800000000,
    outstanding: 700000000,
    aging: 41,
  },

  {
    id: 26,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-05-05',
    principal: 'PHAPROS, PT',
    cabang: 'KFTD Medan',
    customerGroup: 'RS Swasta',
    customer: 'RS Columbia Medan',
    channel: 'RS Swasta',
    invoice: 460,
    sales: 4300000000,
    piutang: 1900000000,
    collection: 1000000000,
    outstanding: 900000000,
    aging: 56,
  },

  {
    id: 27,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-04-30',
    principal: 'SANBE',
    cabang: 'KFTD Denpasar',
    customerGroup: 'Apotek',
    customer: 'Apotek Dewata Farma',
    channel: 'Apotek',
    invoice: 280,
    sales: 2600000000,
    piutang: 1200000000,
    collection: 700000000,
    outstanding: 500000000,
    aging: 60,
  },

  {
    id: 28,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-04-15',
    principal: 'BIOFARMA',
    cabang: 'KFTD Makassar',
    customerGroup: 'Dinkes',
    customer: 'Dinas Kesehatan Makassar',
    channel: 'Dinkes',
    invoice: 310,
    sales: 3700000000,
    piutang: 1800000000,
    collection: 800000000,
    outstanding: 1000000000,
    aging: 76,
  },

  {
    id: 29,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-03-30',
    principal: 'KIMIA FARMA',
    cabang: 'KFTD Palembang',
    customerGroup: 'PBF',
    customer: 'PBF Sumatera Selatan',
    channel: 'PBF',
    invoice: 290,
    sales: 2900000000,
    piutang: 1400000000,
    collection: 600000000,
    outstanding: 800000000,
    aging: 90,
  },

  {
    id: 30,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-02-10',
    principal: 'PHAPROS, PT',
    cabang: 'KFTD Jakarta 2',
    customerGroup: 'RS Pemerintah',
    customer: 'RSUD Jakarta Timur',
    channel: 'RS Pemerintah',
    invoice: 270,
    sales: 3100000000,
    piutang: 1600000000,
    collection: 600000000,
    outstanding: 1000000000,
    aging: 140,
  },

  {
    id: 31,
    tanggal: '2026-06-30',
    jatuhTempo: '2026-01-15',
    principal: 'BIOFARMA',
    cabang: 'KFTD Jayapura',
    customerGroup: 'Puskesmas',
    customer: 'Puskesmas Jayapura',
    channel: 'Puskesmas',
    invoice: 230,
    sales: 2400000000,
    piutang: 1100000000,
    collection: 400000000,
    outstanding: 700000000,
    aging: 166,
  },

  {
    id: 32,
    tanggal: '2026-06-30',
    jatuhTempo: '2025-10-15',
    principal: 'KIMIA FARMA',
    cabang: 'KFTD Medan',
    customerGroup: 'PBF',
    customer: 'PBF Medan Sejahtera',
    channel: 'PBF',
    invoice: 180,
    sales: 1900000000,
    piutang: 900000000,
    collection: 250000000,
    outstanding: 650000000,
    aging: 258,
  },

  {
    id: 33,
    tanggal: '2026-06-30',
    jatuhTempo: '2025-09-20',
    principal: 'SANBE',
    cabang: 'KFTD Bandung',
    customerGroup: 'Apotek',
    customer: 'Apotek Prima Bandung',
    channel: 'Apotek',
    invoice: 160,
    sales: 1700000000,
    piutang: 800000000,
    collection: 200000000,
    outstanding: 600000000,
    aging: 283,
  },

  {
    id: 34,
    tanggal: '2026-06-30',
    jatuhTempo: '2025-03-15',
    principal: 'BIOFARMA',
    cabang: 'KFTD Surabaya',
    customerGroup: 'RS Swasta',
    customer: 'RS Swasta Surabaya',
    channel: 'RS Swasta',
    invoice: 140,
    sales: 1500000000,
    piutang: 750000000,
    collection: 150000000,
    outstanding: 600000000,
    aging: 472,
  },

  {
    id: 35,
    tanggal: '2026-06-30',
    jatuhTempo: '2024-12-10',
    principal: 'PHAPROS, PT',
    cabang: 'KFTD Semarang',
    customerGroup: 'PBF',
    customer: 'PBF Jawa Tengah',
    channel: 'PBF',
    invoice: 120,
    sales: 1300000000,
    piutang: 650000000,
    collection: 100000000,
    outstanding: 550000000,
    aging: 567,
  },

  {
    id: 36,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-08-20',
    principal: 'BIOFARMA',
    cabang: 'KFTD Jakarta 1',
    customerGroup: 'RS Pemerintah',
    customer: 'RS Pusat Jakarta',
    channel: 'RS Pemerintah',
    invoice: 500,
    sales: 5800000000,
    piutang: 2700000000,
    collection: 1600000000,
    outstanding: 1100000000,
    aging: 0,
  },

  {
    id: 37,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-08-03',
    principal: 'KIMIA FARMA',
    cabang: 'KFTD Bandung',
    customerGroup: 'Apotek',
    customer: 'Apotek Bandung Farma',
    channel: 'Apotek',
    invoice: 450,
    sales: 4200000000,
    piutang: 1900000000,
    collection: 1100000000,
    outstanding: 800000000,
    aging: 0,
  },

  {
    id: 38,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-06-20',
    principal: 'PHAPROS, PT',
    cabang: 'KFTD Surabaya',
    customerGroup: 'RS Swasta',
    customer: 'RS Siloam Surabaya',
    channel: 'RS Swasta',
    invoice: 390,
    sales: 3600000000,
    piutang: 1700000000,
    collection: 800000000,
    outstanding: 900000000,
    aging: 41,
  },

  {
    id: 39,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-06-01',
    principal: 'BIOFARMA',
    cabang: 'KFTD Semarang',
    customerGroup: 'Klinik',
    customer: 'Klinik Medika Semarang',
    channel: 'Klinik',
    invoice: 330,
    sales: 2900000000,
    piutang: 1400000000,
    collection: 600000000,
    outstanding: 800000000,
    aging: 60,
  },

  {
    id: 40,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-05-20',
    principal: 'KIMIA FARMA',
    cabang: 'KFTD Medan',
    customerGroup: 'Puskesmas',
    customer: 'Puskesmas Medan Utara',
    channel: 'Puskesmas',
    invoice: 280,
    sales: 2700000000,
    piutang: 1300000000,
    collection: 500000000,
    outstanding: 800000000,
    aging: 72,
  },

  {
    id: 41,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-03-01',
    principal: 'PHAPROS, PT',
    cabang: 'KFTD Palembang',
    customerGroup: 'PBF',
    customer: 'PBF Palembang Sehat',
    channel: 'PBF',
    invoice: 250,
    sales: 2400000000,
    piutang: 1200000000,
    collection: 350000000,
    outstanding: 850000000,
    aging: 152,
  },

  {
    id: 42,
    tanggal: '2026-07-31',
    jatuhTempo: '2025-11-01',
    principal: 'SANBE',
    cabang: 'KFTD Denpasar',
    customerGroup: 'Apotek',
    customer: 'Apotek Bali Sejahtera',
    channel: 'Apotek',
    invoice: 170,
    sales: 1800000000,
    piutang: 850000000,
    collection: 200000000,
    outstanding: 650000000,
    aging: 272,
  },

  {
    id: 43,
    tanggal: '2026-07-31',
    jatuhTempo: '2025-04-01',
    principal: 'BIOFARMA',
    cabang: 'KFTD Jayapura',
    customerGroup: 'RS Pemerintah',
    customer: 'RSUD Jayapura',
    channel: 'RS Pemerintah',
    invoice: 130,
    sales: 1400000000,
    piutang: 700000000,
    collection: 100000000,
    outstanding: 600000000,
    aging: 486,
  },

  {
    id: 44,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-08-01',
    principal: 'AMAROX PHARMA GLOBAL, PT',
    cabang: 'KFTD Makassar',
    customerGroup: 'Dinkes',
    customer: 'Dinas Kesehatan Makassar',
    channel: 'Dinkes',
    invoice: 210,
    sales: 2100000000,
    piutang: 1000000000,
    collection: 500000000,
    outstanding: 500000000,
    aging: 0,
  },

  {
    id: 45,
    tanggal: '2026-07-31',
    jatuhTempo: '2026-07-28',
    principal: 'KIMIA FARMA',
    cabang: 'KFTD Jakarta 2',
    customerGroup: 'RS Swasta',
    customer: 'RS Harapan Jakarta',
    channel: 'RS Swasta',
    invoice: 300,
    sales: 3000000000,
    piutang: 1400000000,
    collection: 700000000,
    outstanding: 700000000,
    aging: 3,
  },
];


/* =========================================================
   DUMMY PRODUK
========================================================= */

const produkData = [

  {
    id: 1,
    tanggal: '2026-06-30',
    salesOffice: '1010',
    descSalesOffice: 'KFTD Jakarta 1',
    billingNo: '2809361541',
    material: '13076374',
    namaProduk: 'ARTESUNATE INJ',
    principal: 'BIOFARMA',
    customer: 'RSUP Nasional',
    customerGroup: 'RS Pemerintah',
    channel: 'RS Pemerintah',
    quantity: 25,
    salesUnit: 'VIAL',
    unitPrice: 109998,
    totalDiscount: 0,
    totalPenjualan: 2749950,
    taxAmount: 302495,
    totalCogs: 2406205,
    sled: '31/10/2028',
  },

  {
    id: 2,
    tanggal: '2026-06-30',
    salesOffice: '1010',
    descSalesOffice: 'KFTD Jakarta 1',
    billingNo: '2809361542',
    material: '11001530',
    namaProduk: 'NITROKAF RETARD',
    principal: 'KIMIA FARMA',
    customer: 'RS Harapan Kita',
    customerGroup: 'RS Swasta',
    channel: 'RS Swasta',
    quantity: 12,
    salesUnit: 'DUS',
    unitPrice: 264450,
    totalDiscount: 176653,
    totalPenjualan: 3173400,
    taxAmount: 349074,
    totalCogs: 1772382,
    sled: '06/04/2028',
  },

  {
    id: 3,
    tanggal: '2026-06-30',
    salesOffice: '1010',
    descSalesOffice: 'KFTD Jakarta 1',
    billingNo: '2809361543',
    material: '11002323',
    namaProduk: 'MARCKS CLASSIC CREME 40GR',
    principal: 'KIMIA FARMA',
    customer: 'Apotek Kimia Sehat',
    customerGroup: 'Apotek',
    channel: 'Apotek',
    quantity: 35,
    salesUnit: 'PCS',
    unitPrice: 17300,
    totalDiscount: 5709,
    totalPenjualan: 605500,
    taxAmount: 66605,
    totalCogs: 448500,
    sled: '04/06/2031',
  },

  {
    id: 4,
    tanggal: '2026-06-30',
    salesOffice: '1020',
    descSalesOffice: 'KFTD Bandung',
    billingNo: '2809361544',
    material: '12004567',
    namaProduk: 'VAKSIN DASAR ANAK',
    principal: 'BIOFARMA',
    customer: 'RSUD Kota Bandung',
    customerGroup: 'RS Pemerintah',
    channel: 'RS Pemerintah',
    quantity: 50,
    salesUnit: 'VIAL',
    unitPrice: 350000,
    totalDiscount: 150000,
    totalPenjualan: 17500000,
    taxAmount: 1925000,
    totalCogs: 14500000,
    sled: '15/12/2029',
  },
];


/* =========================================================
   AGING
========================================================= */

const agingLabels = [
  '0 - 30 Hari',
  '31 - 45 Hari',
  '46 - 60 Hari',
  '61 - 90 Hari',
  '91 - 180 Hari',
  '181 - 360 Hari',
  '> 360 Hari',
];


/* =========================================================
   HELPER
========================================================= */

const formatNumber = (value) => {

  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(value || 0);

};


const formatRupiah = (value) => {

  return `Rp ${formatNumber(value)}`;

};


const formatShortRupiah = (value) => {

  if (value >= 1000000000000) {
    return `Rp ${(value / 1000000000000).toFixed(1)} T`;
  }

  if (value >= 1000000000) {
    return `Rp ${(value / 1000000000).toFixed(1)} M`;
  }

  if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(1)} Jt`;
  }

  if (value >= 1000) {
    return `Rp ${(value / 1000).toFixed(1)} Rb`;
  }

  return `Rp ${formatNumber(value)}`;

};


const formatDate = (date) => {

  if (!date) {
    return '-';
  }

  const [year, month, day] =
    date.split('-');

  return `${day}/${month}/${year}`;

};


const getAgingCategory = (aging) => {

  if (aging <= 30) {
    return '0 - 30 Hari';
  }

  if (aging <= 45) {
    return '31 - 45 Hari';
  }

  if (aging <= 60) {
    return '46 - 60 Hari';
  }

  if (aging <= 90) {
    return '61 - 90 Hari';
  }

  if (aging <= 180) {
    return '91 - 180 Hari';
  }

  if (aging <= 360) {
    return '181 - 360 Hari';
  }

  return '> 360 Hari';

};


/* =========================================================
   COLORS
========================================================= */

const chartColors = [
  '#2563eb',
  '#1d4ed8',
  '#3b82f6',
  '#60a5fa',
  '#fb923c',
  '#f97316',
  '#ea580c',
];


/* =========================================================
   COMPONENT
========================================================= */

const Dashboard = () => {

  /* =======================================================
     FILTER STATE
  ======================================================= */

  const defaultFilter = {
    cabang: 'Semua Cabang',
    principal: 'Semua Principal',
    channel: 'Semua Channel',
    customer: 'Semua Customer',
    tanggal: '2026-06-30',
  };


  const [filter, setFilter] =
    useState(defaultFilter);


  const [appliedFilter, setAppliedFilter] =
    useState(defaultFilter);


  const [activeTable, setActiveTable] =
    useState('principal');


  /* =======================================================
     PERFORMANCE CHART DIMENSION
  ======================================================= */

  const [
    performanceDimension,
    setPerformanceDimension
  ] = useState('principal');


  /* =======================================================
     COLLECTION CHART DIMENSION
  ======================================================= */

  const [
    collectionDimension,
    setCollectionDimension
  ] = useState('principal');


  /* =======================================================
     CUSTOMER OPTIONS
     
     CUSTOMER MENGIKUTI CHANNEL
  ======================================================= */

  const customerOptions = useMemo(() => {

    let sourceData = dummyData;


    if (
      filter.channel &&
      filter.channel !== 'Semua Channel'
    ) {

      sourceData = dummyData.filter(
        (item) =>
          item.channel ===
          filter.channel
      );

    }


    const customers = [
      ...new Set(
        sourceData
          .map(
            (item) =>
              item.customer
          )
          .filter(Boolean)
      ),
    ];


    return customers.sort();

  }, [filter.channel]);


  /* =======================================================
     HANDLE FILTER
  ======================================================= */

  const handleFilterChange = (
    name,
    value
  ) => {

    setFilter((prev) => {

      const nextFilter = {
        ...prev,
        [name]: value,
      };


      if (name === 'channel') {

        nextFilter.customer =
          'Semua Customer';

      }


      return nextFilter;

    });

  };


  /* =======================================================
     APPLY FILTER
  ======================================================= */

  const applyFilter = () => {

    setAppliedFilter({
      ...filter,
    });

  };


  /* =======================================================
     RESET FILTER
  ======================================================= */

  const resetFilter = () => {

    const newDefaultFilter = {
      cabang: 'Semua Cabang',
      principal: 'Semua Principal',
      channel: 'Semua Channel',
      customer: 'Semua Customer',
      tanggal: '2026-06-30',
    };


    setFilter(newDefaultFilter);

    setAppliedFilter(
      newDefaultFilter
    );

  };


  /* =======================================================
     FILTERED DATA
  ======================================================= */

  const filteredData = useMemo(() => {

    return dummyData.filter((item) => {

      const cabangMatch =
        appliedFilter.cabang ===
        'Semua Cabang' ||
        item.cabang ===
        appliedFilter.cabang;


      const principalMatch =
        appliedFilter.principal ===
        'Semua Principal' ||
        item.principal ===
        appliedFilter.principal;


      const channelMatch =
        appliedFilter.channel ===
        'Semua Channel' ||
        item.channel ===
        appliedFilter.channel;


      const customerMatch =
        appliedFilter.customer ===
        'Semua Customer' ||
        item.customer ===
        appliedFilter.customer;


      const tanggalMatch =
        !appliedFilter.tanggal ||
        item.tanggal ===
        appliedFilter.tanggal;


      return (
        cabangMatch &&
        principalMatch &&
        channelMatch &&
        customerMatch &&
        tanggalMatch
      );

    });

  }, [appliedFilter]);


  /* =======================================================
     SUMMARY
  ======================================================= */

  const summary = useMemo(() => {

    return filteredData.reduce(
      (acc, item) => {

        acc.totalPenjualan +=
          item.sales;

        acc.totalPiutang +=
          item.piutang;

        acc.totalCollection +=
          item.collection;

        acc.saldoPiutang +=
          item.outstanding;

        acc.jumlahInvoice +=
          item.invoice;


        if (item.outstanding > 0) {

          acc.invoiceOutstanding +=
            item.invoice;

        }


        return acc;

      },
      {
        totalPenjualan: 0,
        totalPiutang: 0,
        totalCollection: 0,
        saldoPiutang: 0,
        jumlahInvoice: 0,
        invoiceOutstanding: 0,
      }
    );

  }, [filteredData]);


  const collectionRatio =
    summary.totalPiutang > 0
      ? (
        summary.totalCollection /
        summary.totalPiutang
      ) * 100
      : 0;


  const outstandingRatio =
    summary.totalPiutang > 0
      ? (
        summary.saldoPiutang /
        summary.totalPiutang
      ) * 100
      : 0;


  /* =======================================================
     SALDO AKHIR BY JATUH TEMPO
  ======================================================= */

  const saldoJatuhTempoData =
    useMemo(() => {

      const result = [
        {
          name: 'Belum JTO',
          value: 0,
        },
        {
          name: 'Segera JTO',
          value: 0,
        },
        {
          name: 'Sudah JTO',
          value: 0,
        },
      ];


      const today = new Date(
        `${appliedFilter.tanggal}T00:00:00`
      );


      const batasSegeraJTO =
        new Date(today);


      batasSegeraJTO.setDate(
        batasSegeraJTO.getDate() + 7
      );


      filteredData.forEach((item) => {

        if (!item.jatuhTempo) {
          return;
        }


        const jatuhTempo = new Date(
          `${item.jatuhTempo}T00:00:00`
        );


        if (jatuhTempo < today) {

          result[2].value +=
            item.outstanding;

        } else if (
          jatuhTempo <=
          batasSegeraJTO
        ) {

          result[1].value +=
            item.outstanding;

        } else {

          result[0].value +=
            item.outstanding;

        }

      });


      return result;

    }, [
      filteredData,
      appliedFilter.tanggal,
    ]);


  const totalSaldoJatuhTempo =
    useMemo(() => {

      return saldoJatuhTempoData.reduce(
        (sum, item) =>
          sum + item.value,
        0
      );

    }, [saldoJatuhTempoData]);


  /* =======================================================
     PERFORMANCE DIMENSION CONFIG
  ======================================================= */

  const performanceDimensionConfig = {

    principal: {
      label: 'Principal',
      field: 'principal',
      icon: <FaBuilding size={13} />,
    },

    channel: {
      label: 'Channel',
      field: 'channel',
      icon: <FaHospital size={13} />,
    },

    customer: {
      label: 'Customer',
      field: 'customer',
      icon: <FaUsers size={13} />,
    },

    cabang: {
      label: 'Cabang',
      field: 'cabang',
      icon: <FaBuilding size={13} />,
    },

  };


  const currentPerformanceConfig =
    performanceDimensionConfig[
    performanceDimension
    ];


  /* =======================================================
     PERFORMANCE CHART DATA
  ======================================================= */

  const performanceChartData =
    useMemo(() => {

      const grouped = {};

      const field =
        currentPerformanceConfig.field;


      filteredData.forEach((item) => {

        const key =
          item[field];


        if (!key) {
          return;
        }


        if (!grouped[key]) {

          grouped[key] = {
            name: key,
            piutang: 0,
            collection: 0,
            saldo: 0,
          };

        }


        grouped[key].piutang +=
          item.piutang;


        grouped[key].collection +=
          item.collection;


        grouped[key].saldo +=
          item.outstanding;

      });


      return Object.values(grouped);

    }, [
      filteredData,
      currentPerformanceConfig.field,
    ]);


  /* =======================================================
     COLLECTION DIMENSION CONFIG
  ======================================================= */

  const collectionDimensionConfig = {

    principal: {
      label: 'Principal',
      field: 'principal',
      icon: <FaBuilding size={13} />,
    },

    channel: {
      label: 'Channel',
      field: 'channel',
      icon: <FaHospital size={13} />,
    },

    customer: {
      label: 'Customer',
      field: 'customer',
      icon: <FaUsers size={13} />,
    },

  };


  const currentCollectionConfig =
    collectionDimensionConfig[
    collectionDimension
    ];


  /* =======================================================
     COLLECTION CHART DATA
  ======================================================= */

  const collectionChartData =
    useMemo(() => {

      const grouped = {};

      const field =
        currentCollectionConfig.field;


      filteredData.forEach((item) => {

        const key =
          item[field];


        if (!key) {
          return;
        }


        if (!grouped[key]) {

          grouped[key] = {
            name: key,
            collection: 0,
          };

        }


        grouped[key].collection +=
          item.collection;

      });


      return Object.values(grouped);

    }, [
      filteredData,
      currentCollectionConfig.field,
    ]);


  /* =======================================================
     CHANNEL CHART
  ======================================================= */

  const customerGroupChartData =
    useMemo(() => {

      const grouped = {};


      filteredData.forEach((item) => {

        if (!grouped[item.channel]) {

          grouped[item.channel] = {
            name: item.channel,
            value: 0,
          };

        }


        grouped[item.channel].value +=
          item.outstanding;

      });


      return Object.values(grouped);

    }, [filteredData]);


  /* =======================================================
     AGING DATA
  ======================================================= */

  const agingSummary = useMemo(() => {

    const result =
      agingLabels.map((label) => ({
        label,
        value: 0,
      }));


    filteredData.forEach((item) => {

      const category =
        getAgingCategory(
          item.aging
        );


      const index =
        agingLabels.indexOf(
          category
        );


      if (index !== -1) {

        result[index].value +=
          item.outstanding;

      }

    });


    const total =
      result.reduce(
        (sum, item) =>
          sum + item.value,
        0
      );


    return result.map((item) => ({

      ...item,

      percentage:
        total > 0
          ? (
            item.value /
            total
          ) * 100
          : 0,

    }));

  }, [filteredData]);


  /* =======================================================
     CUSTOM TOOLTIP
  ======================================================= */

  const CustomTooltip = ({
    active,
    payload,
    label,
  }) => {

    if (
      !active ||
      !payload ||
      !payload.length
    ) {

      return null;

    }


    return (

      <div className="
        bg-white
        border
        border-gray-100
        rounded-xl
        shadow-xl
        px-4
        py-3
      ">

        <p className="
          text-xs
          font-bold
          text-gray-700
          mb-2
        ">
          {label}
        </p>


        {payload.map(
          (item, index) => (

            <div
              key={index}
              className="
                flex
                items-center
                justify-between
                gap-6
                text-xs
                mb-1
              "
            >

              <span className="text-gray-500">
                {item.name}
              </span>


              <span className="
                font-bold
                text-gray-700
              ">
                {formatShortRupiah(
                  item.value
                )}
              </span>

            </div>

          )
        )}

      </div>

    );

  };


  /* =======================================================
     SUMMARY CARD
  ======================================================= */

  const SummaryCard = ({
    title,
    value,
    label,
    icon,
    iconBg,
    iconColor,
    footer,
    footerColor = 'text-gray-400',
  }) => {

    return (

      <div className="
        bg-white
        border
        border-gray-100
        rounded-2xl
        shadow-sm
        hover:shadow-md
        transition-all
        duration-200
        p-5
        relative
        overflow-hidden
      ">

        <div className="
          absolute
          -right-8
          -top-8
          w-24
          h-24
          rounded-full
          bg-gray-50
        " />


        <div className="relative">

          <div className="
            flex
            items-start
            justify-between
          ">

            <div className={`
              w-11
              h-11
              rounded-xl
              flex
              items-center
              justify-center
              ${iconBg}
              ${iconColor}
            `}>

              {icon}

            </div>


            <span className="
              text-[10px]
              font-bold
              text-gray-400
              uppercase
              tracking-wide
            ">
              {label}
            </span>

          </div>


          <p className="
            text-xs
            text-gray-400
            mt-4
          ">
            {title}
          </p>


          <p className="
            text-xl
            xl:text-2xl
            font-bold
            text-gray-800
            mt-1
            whitespace-nowrap
          ">
            {value}
          </p>


          {footer && (

            <div className={`
              flex
              items-center
              gap-1.5
              mt-2
              text-[11px]
              font-semibold
              ${footerColor}
            `}>

              {footer}

            </div>

          )}

        </div>

      </div>

    );

  };


  /* =======================================================
     AGING TABLE
  ======================================================= */

  const AgingTable = ({
    title,
    icon,
    data,
  }) => {

    return (

      <div className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        shadow-sm
        overflow-hidden
      ">

        <div className="
          px-5
          py-4
          border-b
          border-gray-100
          flex
          items-center
          justify-between
        ">

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              w-10
              h-10
              rounded-xl
              bg-blue-50
              flex
              items-center
              justify-center
              text-blue-600
            ">

              {icon}

            </div>


            <div>

              <h3 className="
                font-bold
                text-gray-800
              ">
                {title}
              </h3>


              <p className="
                text-xs
                text-gray-400
                mt-0.5
              ">
                Ringkasan piutang berdasarkan aging
              </p>

            </div>

          </div>

        </div>


        <div className="overflow-x-auto">

          <table className="
            w-full
            min-w-[950px]
          ">

            <thead>

              <tr className="
                bg-gray-50
                border-b
                border-gray-100
              ">

                <th className="
                  text-left
                  px-5
                  py-3
                  text-xs
                  font-bold
                  text-gray-500
                ">
                  {title}
                </th>


                {agingLabels.map(
                  (label) => (

                    <th
                      key={label}
                      className="
                        text-right
                        px-3
                        py-3
                        text-[11px]
                        font-bold
                        text-gray-500
                        whitespace-nowrap
                      "
                    >
                      {label}
                    </th>

                  )
                )}


                <th className="
                  text-right
                  px-5
                  py-3
                  text-[11px]
                  font-bold
                  text-gray-500
                ">
                  Total
                </th>

              </tr>

            </thead>


            <tbody>

              {data.length === 0 ? (

                <tr>

                  <td
                    colSpan={
                      agingLabels.length + 2
                    }
                    className="
                      px-4
                      py-12
                      text-center
                      text-gray-400
                    "
                  >
                    Tidak ada data
                  </td>

                </tr>

              ) : (

                data.map(
                  (row, index) => {

                    const total =
                      row.aging.reduce(
                        (sum, value) =>
                          sum + value,
                        0
                      );


                    return (

                      <tr
                        key={index}
                        className="
                          border-b
                          border-gray-50
                          hover:bg-blue-50/30
                          transition
                        "
                      >

                        <td className="
                          px-5
                          py-3
                        ">

                          <div className="
                            flex
                            items-center
                            gap-2
                          ">

                            <div className="
                              w-7
                              h-7
                              rounded-lg
                              bg-blue-50
                              text-blue-600
                              flex
                              items-center
                              justify-center
                              shrink-0
                            ">

                              {title ===
                                'Per Channel'
                                ? (
                                  <FaHospital
                                    size={12}
                                  />
                                )
                                : title ===
                                  'Per Customer'
                                  ? (
                                    <FaUsers
                                      size={12}
                                    />
                                  )
                                  : (
                                    <FaBuilding
                                      size={12}
                                    />
                                  )}

                            </div>


                            <span className="
                              text-xs
                              font-semibold
                              text-gray-700
                              whitespace-nowrap
                            ">
                              {row.name}
                            </span>

                          </div>

                        </td>


                        {row.aging.map(
                          (value, i) => (

                            <td
                              key={i}
                              className="
                                px-3
                                py-3
                                text-right
                                text-xs
                                text-gray-600
                                whitespace-nowrap
                              "
                            >
                              {formatRupiah(
                                value
                              )}
                            </td>

                          )
                        )}


                        <td className="
                          px-5
                          py-3
                          text-right
                          text-xs
                          font-bold
                          text-blue-700
                          whitespace-nowrap
                        ">
                          {formatRupiah(total)}
                        </td>

                      </tr>

                    );

                  }
                )

              )}

            </tbody>


            <tfoot>

              <tr className="
                bg-blue-900
                text-white
              ">

                <td className="
                  px-5
                  py-3
                  font-bold
                  text-xs
                ">
                  Grand Total
                </td>


                {agingLabels.map(
                  (_, i) => {

                    const total =
                      data.reduce(
                        (sum, row) =>
                          sum +
                          (
                            row.aging[i] ||
                            0
                          ),
                        0
                      );


                    return (

                      <td
                        key={i}
                        className="
                          px-3
                          py-3
                          text-right
                          font-semibold
                          text-xs
                          whitespace-nowrap
                        "
                      >
                        {formatRupiah(
                          total
                        )}
                      </td>

                    );

                  }
                )}


                <td className="
                  px-5
                  py-3
                  text-right
                  font-bold
                  text-xs
                ">

                  {formatRupiah(
                    data.reduce(
                      (grand, row) =>
                        grand +
                        row.aging.reduce(
                          (sum, value) =>
                            sum + value,
                          0
                        ),
                      0
                    )
                  )}

                </td>

              </tr>

            </tfoot>

          </table>

        </div>

      </div>

    );

  };


  /* =======================================================
     BUILD AGING TABLE DATA
  ======================================================= */

  const buildAgingData = (
    sourceData,
    keyName
  ) => {

    const grouped = {};


    sourceData.forEach((item) => {

      const key =
        item[keyName];


      if (!key) {
        return;
      }


      if (!grouped[key]) {

        grouped[key] = {
          name: key,
          aging: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
          ],
        };

      }


      const agingIndex =
        agingLabels.indexOf(
          getAgingCategory(
            item.aging
          )
        );


      if (agingIndex >= 0) {

        grouped[key].aging[
          agingIndex
        ] += item.outstanding;

      }

    });


    return Object.values(
      grouped
    );

  };


  /* =======================================================
     PRODUK TABLE
  ======================================================= */

  const ProdukTable = ({
    data,
  }) => {

    return (

      <div className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        shadow-sm
        overflow-hidden
      ">

        <div className="
          px-5
          py-4
          border-b
          border-gray-100
          flex
          items-center
          gap-3
        ">

          <div className="
            w-10
            h-10
            rounded-xl
            bg-orange-50
            text-orange-500
            flex
            items-center
            justify-center
          ">
            <FaBox />
          </div>


          <div>

            <h3 className="
              font-bold
              text-gray-800
            ">
              Detail Produk
            </h3>


            <p className="
              text-xs
              text-gray-400
            ">
              Detail transaksi berdasarkan produk
            </p>

          </div>

        </div>


        <div className="overflow-x-auto">

          <table className="
            w-full
            min-w-[1450px]
            text-xs
          ">

            <thead>

              <tr className="
                bg-gray-50
                text-gray-500
              ">

                <th className="px-4 py-3 text-center">
                  No
                </th>

                <th className="px-4 py-3 text-left">
                  Cabang
                </th>

                <th className="px-4 py-3 text-left">
                  Billing No
                </th>

                <th className="px-4 py-3 text-left">
                  Tanggal
                </th>

                <th className="px-4 py-3 text-left">
                  Material
                </th>

                <th className="px-4 py-3 text-left">
                  Nama Produk
                </th>

                <th className="px-4 py-3 text-left">
                  Principal
                </th>

                <th className="px-4 py-3 text-left">
                  Customer
                </th>

                <th className="px-4 py-3 text-left">
                  Channel
                </th>

                <th className="px-4 py-3 text-right">
                  Qty
                </th>

                <th className="px-4 py-3 text-center">
                  Unit
                </th>

                <th className="px-4 py-3 text-right">
                  Harga
                </th>

                <th className="px-4 py-3 text-right">
                  Discount
                </th>

                <th className="px-4 py-3 text-right">
                  Penjualan
                </th>

                <th className="px-4 py-3 text-right">
                  Tax
                </th>

                <th className="px-4 py-3 text-right">
                  COGS
                </th>

                <th className="px-4 py-3 text-center">
                  SLED
                </th>

              </tr>

            </thead>


            <tbody>

              {data.length === 0 ? (

                <tr>

                  <td
                    colSpan={17}
                    className="
                      px-4
                      py-12
                      text-center
                      text-gray-400
                    "
                  >
                    Tidak ada data produk
                  </td>

                </tr>

              ) : (

                data.map(
                  (row, index) => (

                    <tr
                      key={row.id}
                      className="
                        border-t
                        border-gray-100
                        hover:bg-blue-50/30
                        transition
                      "
                    >

                      <td className="
                        px-4
                        py-3
                        text-center
                        text-gray-400
                      ">
                        {index + 1}
                      </td>


                      <td className="
                        px-4
                        py-3
                      ">

                        <div className="
                          flex
                          flex-col
                        ">

                          <span className="
                            font-semibold
                            text-gray-700
                          ">
                            {row.descSalesOffice}
                          </span>


                          <span className="
                            text-[10px]
                            text-gray-400
                          ">
                            {row.salesOffice}
                          </span>

                        </div>

                      </td>


                      <td className="
                        px-4
                        py-3
                        font-semibold
                        text-blue-600
                      ">
                        {row.billingNo}
                      </td>


                      <td className="
                        px-4
                        py-3
                        text-gray-600
                        whitespace-nowrap
                      ">
                        {formatDate(
                          row.tanggal
                        )}
                      </td>


                      <td className="
                        px-4
                        py-3
                        text-gray-600
                      ">
                        {row.material}
                      </td>


                      <td className="
                        px-4
                        py-3
                        font-semibold
                        text-gray-700
                      ">
                        {row.namaProduk}
                      </td>


                      <td className="
                        px-4
                        py-3
                        text-gray-600
                      ">
                        {row.principal}
                      </td>


                      <td className="
                        px-4
                        py-3
                        text-gray-600
                      ">
                        {row.customer}
                      </td>


                      <td className="px-4 py-3">

                        <span className="
                          px-2
                          py-1
                          rounded-full
                          bg-blue-50
                          text-blue-600
                          font-semibold
                        ">
                          {row.channel}
                        </span>

                      </td>


                      <td className="
                        px-4
                        py-3
                        text-right
                        font-semibold
                      ">
                        {formatNumber(
                          row.quantity
                        )}
                      </td>


                      <td className="
                        px-4
                        py-3
                        text-center
                      ">
                        {row.salesUnit}
                      </td>


                      <td className="
                        px-4
                        py-3
                        text-right
                        whitespace-nowrap
                      ">
                        {formatRupiah(
                          row.unitPrice
                        )}
                      </td>


                      <td className="
                        px-4
                        py-3
                        text-right
                        text-orange-500
                        whitespace-nowrap
                      ">
                        {formatRupiah(
                          row.totalDiscount
                        )}
                      </td>


                      <td className="
                        px-4
                        py-3
                        text-right
                        font-bold
                        text-blue-700
                        whitespace-nowrap
                      ">
                        {formatRupiah(
                          row.totalPenjualan
                        )}
                      </td>


                      <td className="
                        px-4
                        py-3
                        text-right
                        whitespace-nowrap
                      ">
                        {formatRupiah(
                          row.taxAmount
                        )}
                      </td>


                      <td className="
                        px-4
                        py-3
                        text-right
                        whitespace-nowrap
                      ">
                        {formatRupiah(
                          row.totalCogs
                        )}
                      </td>


                      <td className="
                        px-4
                        py-3
                        text-center
                        whitespace-nowrap
                      ">
                        {row.sled}
                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    );

  };


  /* =======================================================
     FILTERED PRODUCT
  ======================================================= */

  const filteredProdukData =
    useMemo(() => {

      return produkData.filter(
        (item) => {

          const principalMatch =
            appliedFilter.principal ===
            'Semua Principal' ||
            item.principal ===
            appliedFilter.principal;


          const cabangMatch =
            appliedFilter.cabang ===
            'Semua Cabang' ||
            item.descSalesOffice ===
            appliedFilter.cabang;


          const channelMatch =
            appliedFilter.channel ===
            'Semua Channel' ||
            item.channel ===
            appliedFilter.channel;


          const customerMatch =
            appliedFilter.customer ===
            'Semua Customer' ||
            item.customer ===
            appliedFilter.customer;


          const tanggalMatch =
            !appliedFilter.tanggal ||
            item.tanggal ===
            appliedFilter.tanggal;


          return (
            principalMatch &&
            cabangMatch &&
            channelMatch &&
            customerMatch &&
            tanggalMatch
          );

        }
      );

    }, [appliedFilter]);


  /* =======================================================
     EMPTY STATE
  ======================================================= */

  const EmptyState = () => {

    return (

      <div className="
        bg-white
        border
        border-gray-100
        rounded-2xl
        p-12
        text-center
        shadow-sm
      ">

        <div className="
          w-14
          h-14
          mx-auto
          rounded-2xl
          bg-gray-100
          text-gray-400
          flex
          items-center
          justify-center
          mb-4
        ">
          <FaChartBar size={22} />
        </div>


        <h3 className="
          font-bold
          text-gray-700
        ">
          Data tidak ditemukan
        </h3>


        <p className="
          text-xs
          text-gray-400
          mt-1
        ">
          Silakan ubah kombinasi filter untuk melihat data lainnya.
        </p>

      </div>

    );

  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-orange-50
      to-yellow-50
      p-4
      md:p-5
    ">

      <div className="
        max-w-[1800px]
        mx-auto
      ">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-5
        ">

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              w-12
              h-12
              rounded-2xl
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              shadow-lg
              shadow-blue-200
            ">
              <FaChartBar size={20} />
            </div>


            <div>

              <h1 className="
                text-2xl
                font-bold
                text-gray-800
              ">
                Dashboard
              </h1>


              <p className="
                text-xs
                text-gray-400
                mt-0.5
              ">
                Monitoring penjualan, piutang dan collection
              </p>

            </div>

          </div>


          <div className="
            flex
            items-center
            gap-2
            bg-white
            border
            border-gray-100
            rounded-xl
            px-4
            py-2.5
            shadow-sm
          ">

            <FaCalendarAlt
              className="text-blue-500"
              size={13}
            />


            <div>

              <p className="
                text-[10px]
                text-gray-400
              ">
                Data per tanggal
              </p>


              <p className="
                text-xs
                font-bold
                text-gray-700
              ">
                {formatDate(
                  appliedFilter.tanggal
                )}
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            FILTER
        ================================================= */}

        <div className="
          bg-white
          border
          border-gray-100
          rounded-2xl
          shadow-sm
          p-5
          mb-5
        ">

          <div className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-3
            mb-5
          ">

            <div className="
              flex
              items-center
              gap-3
            ">

              <div className="
                w-9
                h-9
                rounded-xl
                bg-orange-50
                text-orange-500
                flex
                items-center
                justify-center
              ">
                <FaFilter size={14} />
              </div>


              <div>

                <h2 className="
                  text-sm
                  font-bold
                  text-gray-800
                ">
                  Filter Data
                </h2>


                <p className="
                  text-[11px]
                  text-gray-400
                ">
                  Tentukan parameter data yang ingin ditampilkan
                </p>

              </div>

            </div>


            <div className="
              text-[11px]
              text-gray-400
            ">

              Filter aktif:

              <span className="
                ml-1
                font-semibold
                text-blue-600
              ">
                {formatDate(
                  appliedFilter.tanggal
                )}
              </span>

            </div>

          </div>


          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-5
            gap-4
          ">

            {/* CABANG */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-gray-600
                mb-1.5
              ">
                Cabang
              </label>


              <select
                value={filter.cabang}
                onChange={(e) =>
                  handleFilterChange(
                    'cabang',
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-10
                  px-3
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-100
                "
              >

                <option value="Semua Cabang">
                  Semua Cabang
                </option>


                {cabangOptions
                  .filter(
                    (item) =>
                      item !==
                      'Semua Cabang'
                  )
                  .map((item) => (

                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>

                  ))}

              </select>

            </div>


            {/* PRINCIPAL */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-gray-600
                mb-1.5
              ">
                Principal
              </label>


              <select
                value={filter.principal}
                onChange={(e) =>
                  handleFilterChange(
                    'principal',
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-10
                  px-3
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-100
                "
              >

                <option value="Semua Principal">
                  Semua Principal
                </option>


                {principalOptions
                  .filter(
                    (item) =>
                      item !==
                      'Semua Principal'
                  )
                  .map((item) => (

                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>

                  ))}

              </select>

            </div>


            {/* CHANNEL */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-gray-600
                mb-1.5
              ">
                Channel
              </label>


              <select
                value={filter.channel}
                onChange={(e) =>
                  handleFilterChange(
                    'channel',
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-10
                  px-3
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-100
                "
              >

                <option value="Semua Channel">
                  Semua Channel
                </option>


                {channelOptions.map(
                  (item) => (

                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* CUSTOMER */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-gray-600
                mb-1.5
              ">
                Customer
              </label>


              <select
                value={filter.customer}
                onChange={(e) =>
                  handleFilterChange(
                    'customer',
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-10
                  px-3
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-100
                "
              >

                <option value="Semua Customer">
                  Semua Customer
                </option>


                {customerOptions.map(
                  (item) => (

                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>

                  )
                )}

              </select>


              {filter.channel !==
                'Semua Channel' && (

                  <p className="
                    text-[9px]
                    text-blue-500
                    mt-1
                  ">

                    Customer mengikuti Channel{' '}

                    <span className="font-bold">
                      {filter.channel}
                    </span>

                  </p>

                )}

            </div>


            {/* TANGGAL */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-gray-600
                mb-1.5
              ">
                Tanggal
              </label>


              <input
                type="date"
                value={
                  filter.tanggal
                }
                onChange={(e) =>
                  handleFilterChange(
                    'tanggal',
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-10
                  px-3
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-100
                "
              />

            </div>

          </div>


          {/* ACTIVE FILTER */}

          <div className="
            flex
            flex-wrap
            items-center
            gap-2
            mt-4
          ">

            <span className="
              text-[10px]
              text-gray-400
              font-semibold
            ">
              Filter:
            </span>


            <span className="
              px-2.5
              py-1
              rounded-full
              bg-blue-50
              text-blue-600
              text-[10px]
              font-semibold
            ">
              {filter.cabang}
            </span>


            <span className="
              px-2.5
              py-1
              rounded-full
              bg-indigo-50
              text-indigo-600
              text-[10px]
              font-semibold
            ">
              {filter.principal}
            </span>


            <span className="
              px-2.5
              py-1
              rounded-full
              bg-orange-50
              text-orange-600
              text-[10px]
              font-semibold
            ">
              {filter.channel}
            </span>


            <span className="
              px-2.5
              py-1
              rounded-full
              bg-emerald-50
              text-emerald-600
              text-[10px]
              font-semibold
              max-w-[250px]
              truncate
            ">
              {filter.customer}
            </span>


            <span className="
              px-2.5
              py-1
              rounded-full
              bg-gray-100
              text-gray-600
              text-[10px]
              font-semibold
            ">
              {formatDate(
                filter.tanggal
              )}
            </span>

          </div>


          {/* BUTTON */}

          <div className="
            flex
            justify-end
            items-center
            gap-2
            mt-5
            pt-4
            border-t
            border-gray-100
          ">

            <button
              type="button"
              onClick={resetFilter}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                text-xs
                font-semibold
                text-gray-500
                hover:bg-gray-100
                transition
              "
            >

              <FaSyncAlt size={11} />

              Reset

            </button>


            <button
              type="button"
              onClick={applyFilter}
              className="
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-blue-600
                text-white
                text-xs
                font-bold
                shadow-md
                shadow-blue-100
                hover:bg-blue-700
                transition
              "
            >

              <FaFilter size={11} />

              Terapkan Filter

            </button>

          </div>

        </div>


        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-6
          gap-4
          mb-5
        ">

          <SummaryCard
            title="Total Penjualan"
            label="SALES"
            value={formatShortRupiah(
              summary.totalPenjualan
            )}
            icon={<FaMoneyBillWave />}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
            footer={
              <>
                <FaArrowUp size={9} />
                Nilai penjualan
              </>
            }
            footerColor="text-blue-500"
          />


          <SummaryCard
            title="Total Piutang"
            label="RECEIVABLE"
            value={formatShortRupiah(
              summary.totalPiutang
            )}
            icon={<FaFileInvoiceDollar />}
            iconBg="bg-orange-50"
            iconColor="text-orange-500"
            footer={
              <>
                <FaUsers size={9} />
                Saldo piutang
              </>
            }
            footerColor="text-orange-500"
          />


          <SummaryCard
            title="Total Collection"
            label="COLLECTION"
            value={formatShortRupiah(
              summary.totalCollection
            )}
            icon={<FaCheckCircle />}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            footer={
              <>
                <FaArrowUp size={9} />
                {collectionRatio.toFixed(1)}%
                {' '}
                dari piutang
              </>
            }
            footerColor="text-emerald-600"
          />


          <SummaryCard
            title="Saldo Piutang"
            label="OUTSTANDING"
            value={formatShortRupiah(
              summary.saldoPiutang
            )}
            icon={<FaExclamationTriangle />}
            iconBg="bg-red-50"
            iconColor="text-red-500"
            footer={
              <>
                <FaArrowDown size={9} />
                {outstandingRatio.toFixed(1)}%
                {' '}
                outstanding
              </>
            }
            footerColor="text-red-500"
          />


          <SummaryCard
            title="Jumlah Invoice"
            label="INVOICE"
            value={formatNumber(
              summary.jumlahInvoice
            )}
            icon={<FaFileInvoiceDollar />}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-600"
            footer={
              <>
                <FaFileInvoiceDollar size={9} />
                Total invoice
              </>
            }
            footerColor="text-indigo-500"
          />


          <SummaryCard
            title="Invoice Outstanding"
            label="OPEN INVOICE"
            value={formatNumber(
              summary.invoiceOutstanding
            )}
            icon={<FaClock />}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
            footer={
              <>
                <FaClock size={9} />
                Belum lunas
              </>
            }
            footerColor="text-amber-600"
          />

        </div>


        {/* =================================================
            NO DATA
        ================================================= */}

        {filteredData.length === 0 ? (

          <EmptyState />

        ) : (

          <>


            {/* =================================================
                CHART ROW 1
            ================================================= */}

            <div className="
              grid
              grid-cols-1
              xl:grid-cols-3
              gap-5
              mb-5
            ">


              {/* SALDO AKHIR BY JATUH TEMPO */}

              <div className="
                xl:col-span-2
                bg-white
                rounded-2xl
                border
                border-gray-100
                shadow-sm
                p-5
              ">

                <div className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-3
                  mb-2
                ">

                  <div>

                    <div className="
                      flex
                      items-center
                      gap-2
                    ">

                      <div className="
                        w-8
                        h-8
                        rounded-lg
                        bg-blue-50
                        text-blue-600
                        flex
                        items-center
                        justify-center
                      ">
                        <FaClock size={13} />
                      </div>


                      <h2 className="
                        text-sm
                        font-bold
                        text-gray-800
                      ">
                        Saldo Akhir by Jatuh Tempo
                      </h2>

                    </div>


                    <p className="
                      text-[11px]
                      text-gray-400
                      mt-1
                    ">
                      Komposisi saldo akhir berdasarkan status jatuh tempo
                    </p>

                  </div>


                  <div className="
                    bg-gray-50
                    rounded-xl
                    px-3
                    py-2
                    text-right
                  ">

                    <p className="
                      text-[9px]
                      uppercase
                      tracking-wide
                      text-gray-400
                      font-bold
                    ">
                      Total Saldo Akhir
                    </p>


                    <p className="
                      text-sm
                      font-bold
                      text-gray-800
                    ">
                      {formatShortRupiah(
                        totalSaldoJatuhTempo
                      )}
                    </p>

                  </div>

                </div>


                <div className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-3
                  items-center
                ">


                  <div className="h-[300px]">

                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >

                      <PieChart>

                        <Pie
                          data={
                            saldoJatuhTempoData
                          }
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={78}
                          outerRadius={112}
                          paddingAngle={3}
                          stroke="#ffffff"
                          strokeWidth={3}
                        >

                          {saldoJatuhTempoData.map(
                            (entry, index) => (

                              <Cell
                                key={entry.name}
                                fill={[
                                  '#2563eb',
                                  '#f59e0b',
                                  '#ef4444',
                                ][index]}
                              />

                            )
                          )}

                        </Pie>


                        <Tooltip
                          content={
                            <CustomTooltip />
                          }
                        />

                      </PieChart>

                    </ResponsiveContainer>

                  </div>


                  <div className="
                    space-y-3
                    pr-2
                  ">

                    {saldoJatuhTempoData.map(
                      (item, index) => {

                        const percentage =
                          totalSaldoJatuhTempo > 0
                            ? (
                              item.value /
                              totalSaldoJatuhTempo
                            ) * 100
                            : 0;


                        const statusColor =
                          [
                            'bg-blue-500',
                            'bg-amber-500',
                            'bg-red-500',
                          ][index];


                        const statusBg =
                          [
                            'bg-blue-50',
                            'bg-amber-50',
                            'bg-red-50',
                          ][index];


                        const statusText =
                          [
                            'text-blue-600',
                            'text-amber-600',
                            'text-red-600',
                          ][index];


                        const statusDescription =
                          [
                            'Jatuh tempo masih lebih dari 7 hari',
                            'Akan jatuh tempo dalam 7 hari',
                            'Sudah melewati tanggal jatuh tempo',
                          ][index];


                        return (

                          <div
                            key={item.name}
                            className="
                              rounded-xl
                              border
                              border-gray-100
                              p-3.5
                              hover:shadow-sm
                              transition
                            "
                          >

                            <div className="
                              flex
                              items-start
                              justify-between
                              gap-3
                            ">

                              <div className="
                                flex
                                items-start
                                gap-3
                              ">

                                <div className={`
                                  w-9
                                  h-9
                                  rounded-lg
                                  ${statusBg}
                                  flex
                                  items-center
                                  justify-center
                                `}>

                                  <span className={`
                                    w-2.5
                                    h-2.5
                                    rounded-full
                                    ${statusColor}
                                  `} />

                                </div>


                                <div>

                                  <p className="
                                    text-xs
                                    font-bold
                                    text-gray-700
                                  ">
                                    {item.name}
                                  </p>


                                  <p className="
                                    text-[10px]
                                    text-gray-400
                                    mt-0.5
                                  ">
                                    {statusDescription}
                                  </p>

                                </div>

                              </div>


                              <div className="
                                text-right
                              ">

                                <p className="
                                  text-xs
                                  font-bold
                                  text-gray-800
                                  whitespace-nowrap
                                ">
                                  {formatShortRupiah(
                                    item.value
                                  )}
                                </p>


                                <p className={`
                                  text-[10px]
                                  font-bold
                                  ${statusText}
                                `}>
                                  {percentage.toFixed(1)}%
                                </p>

                              </div>

                            </div>


                            <div className="
                              mt-3
                              h-1.5
                              rounded-full
                              bg-gray-100
                              overflow-hidden
                            ">

                              <div
                                className={`
                                  h-full
                                  rounded-full
                                  ${statusColor}
                                `}
                                style={{
                                  width:
                                    `${percentage}%`,
                                }}
                              />

                            </div>

                          </div>

                        );

                      }
                    )}

                  </div>

                </div>

              </div>


              {/* AGING */}

              <div className="
                bg-gradient-to-br
                from-blue-500
                via-indigo-500
                to-orange-400
                rounded-2xl
                border
                border-blue-400
                shadow-md
                p-5
              ">

                <div className="
                  flex
                  items-center
                  gap-2
                  mb-1
                ">

                  <div className="
                    w-8
                    h-8
                    rounded-lg
                    bg-white/20
                    text-white
                    flex
                    items-center
                    justify-center
                  ">
                    <FaClock size={13} />
                  </div>

                  <h2 className="
                    text-sm
                    font-bold
                    text-white
                  ">
                    Aging Piutang
                  </h2>

                </div>

                <p className="
                  text-[11px]
                  text-white/70
                  mb-4
                ">
                  Distribusi saldo berdasarkan umur piutang
                </p>

                <div className="space-y-3">

                  {agingSummary.map((item, index) => (

                    <div key={item.label}>

                      <div className="
                        flex
                        items-center
                        justify-between
                        mb-1
                      ">

                        <span className="
                          text-[11px]
                          font-medium
                          text-white/80
                        ">
                          {item.label}
                        </span>

                        <div className="
                          flex
                          items-center
                          gap-3
                        ">

                          <span className="
                            text-[11px]
                            font-semibold
                            text-white
                          ">
                            {formatShortRupiah(item.value)}
                          </span>

                          <span className="
                            w-10
                            text-right
                            text-[10px]
                            font-bold
                            text-white
                          ">
                            {item.percentage.toFixed(1)}%
                          </span>

                        </div>

                      </div>

                      <div className="
                        h-2
                        bg-white/20
                        rounded-full
                        overflow-hidden
                      ">

                        <div
                          className={`
                            h-full
                            rounded-full
                            transition-all
                            duration-500
                            ${index <= 2
                              ? 'bg-white'
                              : index <= 4
                                ? 'bg-yellow-300'
                                : 'bg-red-300'
                            }
                          `}
                          style={{
                            width: `${item.percentage}%`,
                          }}
                        />

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>


            {/* =================================================
                CHART ROW 2
            ================================================= */}

            <div className="
              grid
              grid-cols-1
              xl:grid-cols-3
              gap-5
              mb-5
            ">


              {/* PERFORMA PIUTANG DINAMIS */}

              <div className="
                bg-white
                rounded-2xl
                border
                border-gray-100
                shadow-sm
                p-5
                xl:col-span-2
              ">

                <div className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-start
                  md:justify-between
                  gap-3
                  mb-1
                ">

                  <div className="
                    flex
                    items-start
                    gap-2
                  ">

                    <div className="
                      w-8
                      h-8
                      rounded-lg
                      bg-blue-50
                      text-blue-600
                      flex
                      items-center
                      justify-center
                      shrink-0
                    ">
                      {currentPerformanceConfig.icon}
                    </div>


                    <div>

                      <h2 className="
                        text-sm
                        font-bold
                        text-gray-800
                      ">
                        Performa Piutang per{' '}
                        {currentPerformanceConfig.label}
                      </h2>


                      <p className="
                        text-[11px]
                        text-gray-400
                        mt-1
                      ">
                        Perbandingan piutang, collection dan saldo berdasarkan{' '}
                        {currentPerformanceConfig.label.toLowerCase()}
                      </p>

                    </div>

                  </div>


                  <div className="
                    flex
                    items-center
                    gap-2
                    shrink-0
                  ">

                    <span className="
                      text-[10px]
                      font-semibold
                      text-gray-400
                      whitespace-nowrap
                    ">
                      Tampilkan per
                    </span>


                    <select
                      value={
                        performanceDimension
                      }
                      onChange={(e) =>
                        setPerformanceDimension(
                          e.target.value
                        )
                      }
                      className="
                        h-9
                        min-w-[145px]
                        px-3
                        pr-8
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        text-xs
                        font-semibold
                        text-gray-700
                        outline-none
                        cursor-pointer
                        focus:border-blue-400
                        focus:ring-2
                        focus:ring-blue-100
                        transition
                      "
                    >

                      <option value="principal">
                        Per Principal
                      </option>

                      <option value="channel">
                        Per Channel
                      </option>

                      <option value="customer">
                        Per Customer
                      </option>

                      <option value="cabang">
                        Per Cabang
                      </option>

                    </select>

                  </div>

                </div>


                <div className="
                  w-full
                  overflow-x-auto
                ">

                  <div
                    style={{
                      width: `${Math.max(
                        performanceChartData.length * 120,
                        800
                      )}px`,
                      height: '300px',
                    }}
                  >

                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >

                      <BarChart
                        data={
                          performanceChartData
                        }
                        margin={{
                          top: 10,
                          right: 20,
                          left: 10,
                          bottom:
                            performanceDimension ===
                              'customer'
                              ? 65
                              : 40,
                        }}
                        barCategoryGap={20}
                      >

                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#eef1f6"
                        />


                        <XAxis
                          dataKey="name"
                          tick={{
                            fontSize: 9,
                            fill: '#6b7280',
                          }}
                          interval={0}
                          angle={
                            performanceDimension ===
                              'customer'
                              ? -35
                              : -20
                          }
                          textAnchor="end"
                          height={
                            performanceDimension ===
                              'customer'
                              ? 80
                              : 60
                          }
                        />


                        <YAxis
                          tick={{
                            fontSize: 9,
                            fill: '#9ca3af',
                          }}
                          tickFormatter={
                            formatShortRupiah
                          }
                        />


                        <Tooltip
                          content={
                            <CustomTooltip />
                          }
                        />


                        <Legend
                          wrapperStyle={{
                            fontSize: '10px',
                          }}
                        />


                        <Bar
                          dataKey="piutang"
                          name="Piutang"
                          fill="#2563eb"
                          barSize={32}
                          radius={[
                            4,
                            4,
                            0,
                            0,
                          ]}
                        />


                        <Bar
                          dataKey="collection"
                          name="Collection"
                          fill="#60a5fa"
                          barSize={32}
                          radius={[
                            4,
                            4,
                            0,
                            0,
                          ]}
                        />


                        <Bar
                          dataKey="saldo"
                          name="Saldo Akhir"
                          fill="#f97316"
                          barSize={32}
                          radius={[
                            4,
                            4,
                            0,
                            0,
                          ]}
                        />

                      </BarChart>

                    </ResponsiveContainer>

                  </div>

                </div>

              </div>


              {/* CHANNEL */}

              <div className="
                bg-white
                rounded-2xl
                border
                border-gray-100
                shadow-sm
                p-5
                xl:col-span-1
              ">

                <div className="
                  flex
                  items-center
                  gap-2
                  mb-1
                ">

                  <div className="
                    w-8
                    h-8
                    rounded-lg
                    bg-orange-50
                    text-orange-500
                    flex
                    items-center
                    justify-center
                  ">
                    <FaHospital size={13} />
                  </div>


                  <h2 className="
                    text-sm
                    font-bold
                    text-gray-800
                  ">
                    Outstanding per Channel
                  </h2>

                </div>


                <p className="
                  text-[11px]
                  text-gray-400
                  mb-2
                ">
                  Komposisi saldo berdasarkan kelompok customer
                </p>


                <div className="h-[300px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <PieChart>

                      <Pie
                        data={
                          customerGroupChartData
                        }
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        innerRadius={65}
                        outerRadius={100}
                        paddingAngle={2}
                      >

                        {customerGroupChartData.map(
                          (_, index) => (

                            <Cell
                              key={index}
                              fill={
                                chartColors[
                                index %
                                chartColors.length
                                ]
                              }
                            />

                          )
                        )}

                      </Pie>


                      <Tooltip
                        content={
                          <CustomTooltip />
                        }
                      />


                      <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        wrapperStyle={{
                          fontSize: '10px',
                        }}
                      />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </div>


            {/* =================================================
                COLLECTION BY PRINCIPAL
            ================================================= */}

            <div className="
              bg-white
              rounded-2xl
              border
              border-gray-100
              shadow-sm
              p-5
              mb-5
            ">

              <div className="
                flex
                flex-col
                md:flex-row
                md:items-start
                md:justify-between
                gap-3
                mb-1
              ">

                <div className="
                  flex
                  items-start
                  gap-2
                ">

                  <div className="
                    w-8
                    h-8
                    rounded-lg
                    bg-emerald-50
                    text-emerald-600
                    flex
                    items-center
                    justify-center
                    shrink-0
                  ">
                    {currentCollectionConfig.icon}
                  </div>


                  <div>

                    <h2 className="
                      text-sm
                      font-bold
                      text-gray-800
                    ">
                      Collection by{' '}
                      {currentCollectionConfig.label}
                    </h2>


                    <p className="
                      text-[11px]
                      text-gray-400
                      mt-1
                    ">
                      Total collection berdasarkan{' '}
                      {currentCollectionConfig.label.toLowerCase()}
                    </p>

                  </div>

                </div>


                {/* DROPDOWN */}

                <div className="
                  flex
                  items-center
                  gap-2
                  shrink-0
                ">

                  <span className="
                    text-[10px]
                    font-semibold
                    text-gray-400
                    whitespace-nowrap
                  ">
                    Tampilkan per
                  </span>


                  <select
                    value={
                      collectionDimension
                    }
                    onChange={(e) =>
                      setCollectionDimension(
                        e.target.value
                      )
                    }
                    className="
                      h-9
                      min-w-[145px]
                      px-3
                      pr-8
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      text-xs
                      font-semibold
                      text-gray-700
                      outline-none
                      cursor-pointer
                      focus:border-emerald-400
                      focus:ring-2
                      focus:ring-emerald-100
                      transition
                    "
                  >

                    <option value="principal">
                      Per Principal
                    </option>

                    <option value="channel">
                      Per Channel
                    </option>

                    <option value="customer">
                      Per Customer
                    </option>

                  </select>

                </div>

              </div>


              {/* COLLECTION CHART */}

              <div className="
  w-full
  overflow-x-auto
  mt-2
">

                <div
                  style={{
                    width: `${Math.max(
                      collectionChartData.length * 130,
                      800
                    )}px`,
                    height: "300px",
                  }}
                >

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <BarChart
                      data={collectionChartData}
                      margin={{
                        top: 15,
                        right: 20,
                        left: 10,
                        bottom:
                          collectionDimension === "customer"
                            ? 70
                            : 45,
                      }}
                      barCategoryGap={25}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#eef1f6"
                      />

                      <XAxis
                        dataKey="name"
                        tick={{
                          fontSize: 9,
                          fill: "#6b7280",
                        }}
                        interval={0}
                        angle={
                          collectionDimension === "customer"
                            ? -35
                            : -20
                        }
                        textAnchor="end"
                        height={
                          collectionDimension === "customer"
                            ? 85
                            : 60
                        }
                      />

                      <YAxis
                        tick={{
                          fontSize: 9,
                          fill: "#9ca3af",
                        }}
                        tickFormatter={formatShortRupiah}
                      />

                      <Tooltip
                        content={<CustomTooltip />}
                      />

                      <Bar
                        dataKey="collection"
                        name="Collection"
                        barSize={45}
                        radius={[6, 6, 0, 0]}
                      >

                        {collectionChartData.map(
                          (entry, index) => {

                            const colors = [
                              "#3B82F6", // Blue
                              "#F59E0B", // Amber
                              "#EF4444", // Red
                              "#8B5CF6", // Violet
                              "#EC4899", // Pink
                              "#06B6D4", // Cyan
                              "#F97316", // Orange
                              "#6366F1", // Indigo
                              "#A855F7", // Purple
                              "#E11D48", // Rose
                            ];

                            return (
                              <Cell
                                key={`collection-cell-${index}`}
                                fill={
                                  colors[
                                  index % colors.length
                                  ]
                                }
                              />
                            );
                          }
                        )}

                      </Bar>

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </div>


            {/* =================================================
                TABLE TABS
            ================================================= */}

            <div className="
              bg-white
              rounded-2xl
              border
              border-gray-100
              shadow-sm
              p-2
              mb-4
            ">

              <div className="
                grid
                grid-cols-2
                md:grid-cols-5
                gap-2
              ">

                {/* PER PRINCIPAL */}

                <button
                  onClick={() =>
                    setActiveTable(
                      'principal'
                    )
                  }
                  className={`
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    py-2.5
                    text-xs
                    font-bold
                    transition
                    ${activeTable ===
                      'principal'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                      : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                    }
                  `}
                >

                  <FaBuilding size={12} />

                  Per Principal

                </button>


                {/* PER CABANG */}

                <button
                  onClick={() =>
                    setActiveTable(
                      'cabang'
                    )
                  }
                  className={`
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    py-2.5
                    text-xs
                    font-bold
                    transition
                    ${activeTable ===
                      'cabang'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                      : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                    }
                  `}
                >

                  <FaBuilding size={12} />

                  Per Cabang

                </button>


                {/* PER CHANNEL */}

                <button
                  onClick={() =>
                    setActiveTable(
                      'channel'
                    )
                  }
                  className={`
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    py-2.5
                    text-xs
                    font-bold
                    transition
                    ${activeTable ===
                      'channel'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                      : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                    }
                  `}
                >

                  <FaHospital size={12} />

                  Per Channel

                </button>


                {/* PER CUSTOMER */}

                <button
                  onClick={() =>
                    setActiveTable(
                      'customer'
                    )
                  }
                  className={`
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    py-2.5
                    text-xs
                    font-bold
                    transition
                    ${activeTable ===
                      'customer'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                      : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                    }
                  `}
                >

                  <FaUsers size={12} />

                  Per Customer

                </button>


                {/* PER PRODUK */}

                <button
                  onClick={() =>
                    setActiveTable(
                      'produk'
                    )
                  }
                  className={`
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    py-2.5
                    text-xs
                    font-bold
                    transition
                    ${activeTable ===
                      'produk'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                      : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                    }
                  `}
                >

                  <FaBoxOpen size={12} />

                  Per Produk

                </button>

              </div>

            </div>


            {/* =================================================
                DETAIL TABLE
            ================================================= */}

            {activeTable ===
              'principal' && (

                <AgingTable
                  title="Per Principal"
                  icon={
                    <FaBuilding
                      size={15}
                    />
                  }
                  data={buildAgingData(
                    filteredData,
                    'principal'
                  )}
                />

              )}


            {activeTable ===
              'cabang' && (

                <AgingTable
                  title="Per Cabang"
                  icon={
                    <FaBuilding
                      size={15}
                    />
                  }
                  data={buildAgingData(
                    filteredData,
                    'cabang'
                  )}
                />

              )}


            {activeTable ===
              'channel' && (

                <AgingTable
                  title="Per Channel"
                  icon={
                    <FaHospital
                      size={15}
                    />
                  }
                  data={buildAgingData(
                    filteredData,
                    'channel'
                  )}
                />

              )}


            {activeTable ===
              'customer' && (

                <AgingTable
                  title="Per Customer"
                  icon={
                    <FaUsers
                      size={15}
                    />
                  }
                  data={buildAgingData(
                    filteredData,
                    'customer'
                  )}
                />

              )}


            {/* PER PRODUK */}

            {activeTable ===
              'produk' && (

                <ProdukTable
                  data={
                    filteredProdukData
                  }
                />

              )}

          </>

        )}


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="
          flex
          flex-col
          sm:flex-row
          items-center
          justify-center
          gap-2
          py-7
          text-[10px]
          text-gray-400
        ">

          <span className="
            font-bold
            text-blue-600
          ">
            KFCOLLS
          </span>


          <span className="
            hidden
            sm:block
          ">
            •
          </span>


          <span>
            Sales & Account Receivable Dashboard
          </span>

        </div>

      </div>

    </div>

  );

};


export default Dashboard;