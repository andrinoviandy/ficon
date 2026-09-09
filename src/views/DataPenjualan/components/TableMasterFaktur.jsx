import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaEllipsisV,
  FaHashtag,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUser,
  FaBox,
  FaClipboardList,
  FaEye,
  FaTimes,
  FaSearch,
  FaFilter,
  FaFileInvoiceDollar,
  FaChartLine,
  FaWarehouse,
  FaTag,
  FaPercentage,
} from "react-icons/fa";

import ReactPaginate from "react-paginate";

import { swal } from "global/helper/swal";

// =====================================================
// DUMMY DATA - DIAMBIL DARI Data Penjualann.xlsx
// 100 baris x 60 kolom
// =====================================================

const dummyData = [
  {
    "No": 1,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-01",
    "Billing No": 2809361541,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007405,
    "Name Bill to": "APOTEK MURAH FARMA 2",
    "Address": "JL. IRIAN NO.04 IMBI KEL. GURABESI KEC. JAYAPURA UTARA",
    "Material": 13076374,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "ARTESUNATE INJ",
    "Quantity": 5,
    "Sales Unit": "VL",
    "Unit Price Penjualan": 109998,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 5.0,
    "DisAmt (ZD03)": 27500,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 549990,
    "Tax Amount": 60499,
    "Total COGS": 481241,
    "Unit Price Pembelian": 96248,
    "Bill Qty in SKU": 5,
    "UoM SKU": "VL",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "ETHICAL",
    "Principle": 7000000004,
    "Name Principle": "BHINNEKA USADA RAYA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80427,
    "Name Salesman": "WILLY BRODUS JANSAS",
    "PO Number": "02/VIII/2026.",
    "Quotation Number": 2012394400
  },
  {
    "No": 2,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-01",
    "Billing No": 2809361542,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007405,
    "Name Bill to": "APOTEK MURAH FARMA 2",
    "Address": "JL. IRIAN NO.04 IMBI KEL. GURABESI KEC. JAYAPURA UTARA",
    "Material": 11001530,
    "Material Group 1": 103,
    "Desc Material Group 1": "ETIKAL",
    "Text Material": "NITROKAF RETARD (DUS 100 KAPS)-BJN",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 264450,
    "Dis% (ZD01)": 33.4,
    "DisAmt (ZD01)": 176653,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 23.4,
    "Disc. Upfront Amt (ZD07)": 123763,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 23.4,
    "Disc. Pengembalian Upf Amt (ZD10)": 123763,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 528900,
    "Tax Amount": 58179,
    "Total COGS": 295397,
    "Unit Price Pembelian": 1477,
    "Bill Qty in SKU": 200,
    "UoM SKU": "KPS",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "ETHICAL",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80427,
    "Name Salesman": "WILLY BRODUS JANSAS",
    "PO Number": "02/VIII/2026",
    "Quotation Number": 2012394401
  },
  {
    "No": 3,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-01",
    "Billing No": 2809361542,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007405,
    "Name Bill to": "APOTEK MURAH FARMA 2",
    "Address": "JL. IRIAN NO.04 IMBI KEL. GURABESI KEC. JAYAPURA UTARA",
    "Material": 11002323,
    "Material Group 1": 105,
    "Desc Material Group 1": "KOSMETIK",
    "Text Material": "MARCKS CLASSIC CREME 40GR (NEW)",
    "Quantity": 2,
    "Sales Unit": "PC",
    "Unit Price Penjualan": 17300,
    "Dis% (ZD01)": 16.5,
    "DisAmt (ZD01)": 5709,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 6.0,
    "Disc. Upfront Amt (ZD07)": 2076,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 6.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 2076,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 34600,
    "Tax Amount": 3806,
    "Total COGS": 25650,
    "Unit Price Pembelian": 12825,
    "Bill Qty in SKU": 2,
    "UoM SKU": "PC",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "KOSMETIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80427,
    "Name Salesman": "WILLY BRODUS JANSAS",
    "PO Number": "02/VIII/2026",
    "Quotation Number": 2012394401
  },
  {
    "No": 4,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-01",
    "Billing No": 2809361543,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10109288,
    "Name Bill to": "APOTEK SURYA",
    "Address": "JL TANJUNGRIA DOX IX KEL TANJUNGRIA KEC JAYAPURA UTARA KEL TANJUNGRIA KEC JAYAPURA UTARA",
    "Material": 11000296,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "MICONAZOLE 2 % CR(DUS 24 TUBE@10 GRAM)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 3750,
    "Dis% (ZD01)": 31.5,
    "DisAmt (ZD01)": 28350,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 23.5,
    "Disc. Upfront Amt (ZD07)": 21150,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 23.5,
    "Disc. Pengembalian Upf Amt (ZD10)": 21150,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 90000,
    "Tax Amount": 9900,
    "Total COGS": 66168,
    "Unit Price Pembelian": 2757,
    "Bill Qty in SKU": 24,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80427,
    "Name Salesman": "WILLY BRODUS JANSAS",
    "PO Number": "REG/APS/2608/001.",
    "Quotation Number": 2012394404
  },
  {
    "No": 5,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-01",
    "Billing No": 2809361543,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10109288,
    "Name Bill to": "APOTEK SURYA",
    "Address": "JL TANJUNGRIA DOX IX KEL TANJUNGRIA KEC JAYAPURA UTARA KEL TANJUNGRIA KEC JAYAPURA UTARA",
    "Material": 11000384,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "BETASON N CREAM (DUS 1 TUB @5 G)",
    "Quantity": 6,
    "Sales Unit": "TUB",
    "Unit Price Penjualan": 16500,
    "Dis% (ZD01)": 26.5,
    "DisAmt (ZD01)": 26235,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 18.5,
    "Disc. Upfront Amt (ZD07)": 18315,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 18.5,
    "Disc. Pengembalian Upf Amt (ZD10)": 18315,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 99000,
    "Tax Amount": 10890,
    "Total COGS": 88001,
    "Unit Price Pembelian": 14667,
    "Bill Qty in SKU": 6,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80427,
    "Name Salesman": "WILLY BRODUS JANSAS",
    "PO Number": "REG/APS/2608/001.",
    "Quotation Number": 2012394404
  },
  {
    "No": 6,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-01",
    "Billing No": 2809361543,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10109288,
    "Name Bill to": "APOTEK SURYA",
    "Address": "JL TANJUNGRIA DOX IX KEL TANJUNGRIA KEC JAYAPURA UTARA KEL TANJUNGRIA KEC JAYAPURA UTARA",
    "Material": 11001558,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "SIMVASTATIN 20 MG (DUS 50 TAB)-BJN",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 20270,
    "Dis% (ZD01)": 59.0,
    "DisAmt (ZD01)": 11959,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 51.0,
    "Disc. Upfront Amt (ZD07)": 10338,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 51.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 10338,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 20270,
    "Tax Amount": 2230,
    "Total COGS": 19256,
    "Unit Price Pembelian": 385,
    "Bill Qty in SKU": 50,
    "UoM SKU": "TAB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80427,
    "Name Salesman": "WILLY BRODUS JANSAS",
    "PO Number": "REG/APS/2608/001.",
    "Quotation Number": 2012394404
  },
  {
    "No": 7,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-01",
    "Billing No": 2809361544,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10109288,
    "Name Bill to": "APOTEK SURYA",
    "Address": "JL TANJUNGRIA DOX IX KEL TANJUNGRIA KEC JAYAPURA UTARA KEL TANJUNGRIA KEC JAYAPURA UTARA",
    "Material": 12002383,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "DOMPERIDONE 10MG TAB@100 (NOVA)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 13874,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 13874,
    "Tax Amount": 1526,
    "Total COGS": 12613,
    "Unit Price Pembelian": 126,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000034,
    "Name Principle": "NOVAPHARIN",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80427,
    "Name Salesman": "WILLY BRODUS JANSAS",
    "PO Number": "REG/APS/2608/001",
    "Quotation Number": 2012394406
  },
  {
    "No": 8,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-01",
    "Billing No": 2809361545,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007414,
    "Name Bill to": "APOTEK PAPUA JAYA FARMA",
    "Address": "JL JERUK NIPIS ( RS BAYANGKARA) ABEPURA",
    "Material": 13076374,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "ARTESUNATE INJ",
    "Quantity": 15,
    "Sales Unit": "VL",
    "Unit Price Penjualan": 109998,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 5.0,
    "DisAmt (ZD03)": 82499,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 1649970,
    "Tax Amount": 181497,
    "Total COGS": 1443724,
    "Unit Price Pembelian": 96248,
    "Bill Qty in SKU": 15,
    "UoM SKU": "VL",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "ETHICAL",
    "Principle": 7000000004,
    "Name Principle": "BHINNEKA USADA RAYA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80427,
    "Name Salesman": "WILLY BRODUS JANSAS",
    "PO Number": "225/VIII/2026",
    "Quotation Number": 2012394408
  },
  {
    "No": 9,
    "Sales Office": 2244,
    "Desc. S.Office": "KFTD Ambon",
    "Posting Date": "2026-08-01",
    "Billing No": 2809361547,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10000824,
    "Name Bill to": "APOTEK 17",
    "Address": "JLN. JERUK RT 10 KEL. AMPERA APUI MASOHI KEL. AMPERA KEC. KOTA MASOHI",
    "Material": 12017088,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "PHENYTOIN SODIUM 50MG/ML AMP@30 (PEHA)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 150000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 150000,
    "Tax Amount": 16500,
    "Total COGS": 111000,
    "Unit Price Pembelian": 111000,
    "Bill Qty in SKU": 30,
    "UoM SKU": "AMP",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000344,
    "Name Principle": "PHAPROS, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82663,
    "Name Salesman": "LUCAS MAILUHU",
    "PO Number": "{No:01/ap 172026,,)",
    "Quotation Number": 2012394595
  },
  {
    "No": 10,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-01",
    "Billing No": 2809361621,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 20000813,
    "Name Bill to": "PT. KIMIA FARMA APOTEK",
    "Address": "JL. BUDI UTOMO NO.1",
    "Material": 11001426,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "PREGABALINE 150 MG (DUS 30 KPS)",
    "Quantity": 8,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 270000,
    "Dis% (ZD01)": 58.0,
    "DisAmt (ZD01)": 1252800,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 50.0,
    "Disc. Upfront Amt (ZD07)": 1080000,
    "Disc. Beban KFTD Upf % (ZD08)": 12.5,
    "Disc. Beban KFTD Upf Amt (ZD08)": 270000,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 37.5,
    "Disc. Pengembalian Upf Amt (ZD10)": 810000,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 270000,
    "Total Penjualan": 1890000,
    "Tax Amount": 207900,
    "Total COGS": 1945944,
    "Unit Price Pembelian": 243243,
    "Bill Qty in SKU": 240,
    "UoM SKU": "KPS",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "KFA",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "IL1112Q401820998C",
    "Quotation Number": 2012394425
  },
  {
    "No": 11,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-01",
    "Billing No": 2809361621,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 20000813,
    "Name Bill to": "PT. KIMIA FARMA APOTEK",
    "Address": "JL. BUDI UTOMO NO.1",
    "Material": 11001426,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "PREGABALINE 150 MG (DUS 30 KPS)",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 270000,
    "Dis% (ZD01)": 58.0,
    "DisAmt (ZD01)": 313200,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 50.0,
    "Disc. Upfront Amt (ZD07)": 270000,
    "Disc. Beban KFTD Upf % (ZD08)": 12.5,
    "Disc. Beban KFTD Upf Amt (ZD08)": 67500,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 37.5,
    "Disc. Pengembalian Upf Amt (ZD10)": 202500,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 67500,
    "Total Penjualan": 472500,
    "Tax Amount": 51975,
    "Total COGS": 486486,
    "Unit Price Pembelian": 243243,
    "Bill Qty in SKU": 60,
    "UoM SKU": "KPS",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "KFA",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "IL1112Q401820998C",
    "Quotation Number": 2012394425
  },
  {
    "No": 12,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-01",
    "Billing No": 2809361621,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 20000813,
    "Name Bill to": "PT. KIMIA FARMA APOTEK",
    "Address": "JL. BUDI UTOMO NO.1",
    "Material": 11001425,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "PREGABALINE 75 MG (DUS 30 KPS)",
    "Quantity": 10,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 32850,
    "Dis% (ZD01)": 8.0,
    "DisAmt (ZD01)": 26280,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 16.44,
    "Disc. Upfront Amt (ZD07)": 54005,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 16.44,
    "Disc. Pengembalian Upf Amt (ZD10)": 54005,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 328500,
    "Tax Amount": 36135,
    "Total COGS": 1852500,
    "Unit Price Pembelian": 185250,
    "Bill Qty in SKU": 300,
    "UoM SKU": "KPS",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "KFA",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "IL1112Q401820998C",
    "Quotation Number": 2012394425
  },
  {
    "No": 13,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-01",
    "Billing No": 2809361625,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 20000813,
    "Name Bill to": "PT. KIMIA FARMA APOTEK",
    "Address": "JL. BUDI UTOMO NO.1",
    "Material": 12015328,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "NIPRO IV CATHETER 24GX3/4\" ETFE",
    "Quantity": 4,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 5000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 1000000,
    "Tax Amount": 110000,
    "Total COGS": 900000,
    "Unit Price Pembelian": 225000,
    "Bill Qty in SKU": 200,
    "UoM SKU": "PC",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "ALKES & PKRT",
    "Principle": 7000000043,
    "Name Principle": "SINAR RODA UTAMA, PT",
    "Desc. Cust. Grp4": "KFA",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "IL1112Q401820998C",
    "Quotation Number": 2012394428
  },
  {
    "No": 14,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361676,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10062450,
    "Name Bill to": "RS. BETHESDA GMIH",
    "Address": "JL. KEMAKMURAN, GAMSUNGI, KEC. TOBELO KEL. GAMSUNGI KEC. TOBELO",
    "Material": 12007260,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "ALBUNORM 25% 100 ML",
    "Quantity": 1,
    "Sales Unit": "BT",
    "Unit Price Penjualan": 1914000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 1914000,
    "Tax Amount": 210540,
    "Total COGS": 1780020,
    "Unit Price Pembelian": 1780020,
    "Bill Qty in SKU": 1,
    "UoM SKU": "BT",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "ETHICAL",
    "Principle": 7000000100,
    "Name Principle": "SATYA ABADI PHARMA, PT",
    "Desc. Cust. Grp4": "Rumah Sakit Swasta",
    "Salesman": 82560,
    "Name Salesman": "MUH. RIDHO TAGOR BIMA SAKTI MANSUR",
    "PO Number": "136/IF/RSBETH-HT/VII",
    "Quotation Number": 2012394803
  },
  {
    "No": 15,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361677,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10113004,
    "Name Bill to": "KIOS LANCAR JAYA",
    "Address": "HAMADI GUNUNG NO.37 KEL. HAMADI KEC. JAYAPURA SELATAN",
    "Material": 12015471,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "SELENSIA HAND WASH FRESH FRUITY 5000ML",
    "Quantity": 2,
    "Sales Unit": "BT",
    "Unit Price Penjualan": 85400,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 50,
    "DisAmt (ZD04)": 85400,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 85400,
    "Total Penjualan": 85400,
    "Tax Amount": 9394,
    "Total COGS": 145180,
    "Unit Price Pembelian": 72590,
    "Bill Qty in SKU": 2,
    "UoM SKU": "BT",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "Kosmetik",
    "Principle": 7000000813,
    "Name Principle": "SINKONA INDONESIA LESTARI, PT",
    "Desc. Cust. Grp4": "Toko/Warung",
    "Salesman": 80427,
    "Name Salesman": "WILLY BRODUS JANSAS",
    "PO Number": "030826",
    "Quotation Number": 2012394807
  },
  {
    "No": 16,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361678,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 20000813,
    "Name Bill to": "PT. KIMIA FARMA APOTEK",
    "Address": "JL. BUDI UTOMO NO.1",
    "Material": 11000106,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "MORPHINE 10 MG (BTL 30 TAB)",
    "Quantity": 10,
    "Sales Unit": "BT",
    "Unit Price Penjualan": 69351,
    "Dis% (ZD01)": 36.8,
    "DisAmt (ZD01)": 255212,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 28.8,
    "Disc. Upfront Amt (ZD07)": 199731,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 28.8,
    "Disc. Pengembalian Upf Amt (ZD10)": 199731,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 693510,
    "Tax Amount": 76286,
    "Total COGS": 345021,
    "Unit Price Pembelian": 34502,
    "Bill Qty in SKU": 300,
    "UoM SKU": "TAB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "KFA",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "10/SP-NARKO/APT.PEL/",
    "Quotation Number": 2012394805
  },
  {
    "No": 17,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361679,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10026499,
    "Name Bill to": "APOTEK VARIA FARMA",
    "Address": "JL. RAYA BASTIONG NO. 20 KEL. MALIARO KEC. KOTA TERNATE TENGAH",
    "Material": 11000296,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "MICONAZOLE 2 % CR(DUS 24 TUBE@10 GRAM)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 3750,
    "Dis% (ZD01)": 31.5,
    "DisAmt (ZD01)": 28350,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 23.5,
    "Disc. Upfront Amt (ZD07)": 21150,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 23.5,
    "Disc. Pengembalian Upf Amt (ZD10)": 21150,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 90000,
    "Tax Amount": 9900,
    "Total COGS": 66168,
    "Unit Price Pembelian": 66168,
    "Bill Qty in SKU": 24,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82560,
    "Name Salesman": "MUH. RIDHO TAGOR BIMA SAKTI MANSUR",
    "PO Number": "AVF/440/SP-019/2026",
    "Quotation Number": 2012394815
  },
  {
    "No": 18,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361679,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10026499,
    "Name Bill to": "APOTEK VARIA FARMA",
    "Address": "JL. RAYA BASTIONG NO. 20 KEL. MALIARO KEC. KOTA TERNATE TENGAH",
    "Material": 11000395,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "KETOCONAZOLE 2 % CR (DUS 25 TUB @10 G)",
    "Quantity": 25,
    "Sales Unit": "TUB",
    "Unit Price Penjualan": 4000,
    "Dis% (ZD01)": 29.0,
    "DisAmt (ZD01)": 29000,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 21.0,
    "Disc. Upfront Amt (ZD07)": 21000,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 21.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 21000,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 100000,
    "Tax Amount": 11000,
    "Total COGS": 77160,
    "Unit Price Pembelian": 3086,
    "Bill Qty in SKU": 25,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82560,
    "Name Salesman": "MUH. RIDHO TAGOR BIMA SAKTI MANSUR",
    "PO Number": "AVF/440/SP-019/2026",
    "Quotation Number": 2012394815
  },
  {
    "No": 19,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361679,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10026499,
    "Name Bill to": "APOTEK VARIA FARMA",
    "Address": "JL. RAYA BASTIONG NO. 20 KEL. MALIARO KEC. KOTA TERNATE TENGAH",
    "Material": 11000391,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "GENTAMYCIN 0.1 % (DUS 10 TUBE @ 5 GRAM)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 2670,
    "Dis% (ZD01)": 26.5,
    "DisAmt (ZD01)": 7076,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 18.5,
    "Disc. Upfront Amt (ZD07)": 4940,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 18.5,
    "Disc. Pengembalian Upf Amt (ZD10)": 4940,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 26700,
    "Tax Amount": 2937,
    "Total COGS": 21235,
    "Unit Price Pembelian": 21235,
    "Bill Qty in SKU": 10,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82560,
    "Name Salesman": "MUH. RIDHO TAGOR BIMA SAKTI MANSUR",
    "PO Number": "AVF/440/SP-019/2026",
    "Quotation Number": 2012394815
  },
  {
    "No": 20,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361679,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10026499,
    "Name Bill to": "APOTEK VARIA FARMA",
    "Address": "JL. RAYA BASTIONG NO. 20 KEL. MALIARO KEC. KOTA TERNATE TENGAH",
    "Material": 11000394,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "HYDROCORTISONE 2.5%CR(DUS 24TUBE@ 5GRAM)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 3458,
    "Dis% (ZD01)": 33.0,
    "DisAmt (ZD01)": 27387,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 25.0,
    "Disc. Upfront Amt (ZD07)": 20748,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 25.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 20748,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 82992,
    "Tax Amount": 9129,
    "Total COGS": 59514,
    "Unit Price Pembelian": 59514,
    "Bill Qty in SKU": 24,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82560,
    "Name Salesman": "MUH. RIDHO TAGOR BIMA SAKTI MANSUR",
    "PO Number": "AVF/440/SP-019/2026",
    "Quotation Number": 2012394815
  },
  {
    "No": 21,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361680,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 20000813,
    "Name Bill to": "PT. KIMIA FARMA APOTEK",
    "Address": "JL. BUDI UTOMO NO.1",
    "Material": 12005968,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "DARYANT-TULLE STERILE DUS 10 PC",
    "Quantity": 30,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 239088,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 7172640,
    "Tax Amount": 788990,
    "Total COGS": 6539760,
    "Unit Price Pembelian": 217992,
    "Bill Qty in SKU": 300,
    "UoM SKU": "PC",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "ETHICAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "KFA",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "IL1112404018217408",
    "Quotation Number": 2012394817
  },
  {
    "No": 22,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361681,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 20000813,
    "Name Bill to": "PT. KIMIA FARMA APOTEK",
    "Address": "JL. BUDI UTOMO NO.1",
    "Material": 12015706,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "NIPRO SYRINGE 50ML CATHETER TIP (SRU)",
    "Quantity": 90,
    "Sales Unit": "PC",
    "Unit Price Penjualan": 4600,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 414000,
    "Tax Amount": 45540,
    "Total COGS": 372600,
    "Unit Price Pembelian": 4140,
    "Bill Qty in SKU": 90,
    "UoM SKU": "PC",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "ALKES & PKRT",
    "Principle": 7000000043,
    "Name Principle": "SINAR RODA UTAMA, PT",
    "Desc. Cust. Grp4": "KFA",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "IL1112404018217408",
    "Quotation Number": 2012394821
  },
  {
    "No": 23,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361681,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 20000813,
    "Name Bill to": "PT. KIMIA FARMA APOTEK",
    "Address": "JL. BUDI UTOMO NO.1",
    "Material": 12003649,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "NIPRO SAFELET CATH IV PU 20GX1\"",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 5000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 500000,
    "Tax Amount": 55000,
    "Total COGS": 450000,
    "Unit Price Pembelian": 225000,
    "Bill Qty in SKU": 100,
    "UoM SKU": "PC",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "ALKES & PKRT",
    "Principle": 7000000043,
    "Name Principle": "SINAR RODA UTAMA, PT",
    "Desc. Cust. Grp4": "KFA",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "IL1112404018217408",
    "Quotation Number": 2012394821
  },
  {
    "No": 24,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361682,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10113683,
    "Name Bill to": "KLINIK MEDIKA UTAMA",
    "Address": "JL. IYANTOA DESA GELTOLI KEC. MABA",
    "Material": 12008263,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "RINGER LACTATE 500 ML (SATORIA)",
    "Quantity": 60,
    "Sales Unit": "BT",
    "Unit Price Penjualan": 8040,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 482400,
    "Tax Amount": 53064,
    "Total COGS": 429336,
    "Unit Price Pembelian": 7156,
    "Bill Qty in SKU": 60,
    "UoM SKU": "BT",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000212,
    "Name Principle": "SATORIA ANEKA INDUSTRI, PT",
    "Desc. Cust. Grp4": "Klinik",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "0106/MYU_SP/VII/2026",
    "Quotation Number": 2012354934
  },
  {
    "No": 25,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361682,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10113683,
    "Name Bill to": "KLINIK MEDIKA UTAMA",
    "Address": "JL. IYANTOA DESA GELTOLI KEC. MABA",
    "Material": 12008262,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "SODIUM CHLORIDE 0.9% 500 ML (SATORIA)",
    "Quantity": 40,
    "Sales Unit": "BT",
    "Unit Price Penjualan": 7260,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 290400,
    "Tax Amount": 31944,
    "Total COGS": 258456,
    "Unit Price Pembelian": 6461,
    "Bill Qty in SKU": 40,
    "UoM SKU": "BT",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000212,
    "Name Principle": "SATORIA ANEKA INDUSTRI, PT",
    "Desc. Cust. Grp4": "Klinik",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "0106/MYU_SP/VII/2026",
    "Quotation Number": 2012354934
  },
  {
    "No": 26,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361682,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10113683,
    "Name Bill to": "KLINIK MEDIKA UTAMA",
    "Address": "JL. IYANTOA DESA GELTOLI KEC. MABA",
    "Material": 12011709,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "WATER FOR INJECTION 25 ML (SATORIA)",
    "Quantity": 12,
    "Sales Unit": "AMP",
    "Unit Price Penjualan": 2662,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 31944,
    "Tax Amount": 3514,
    "Total COGS": 28430,
    "Unit Price Pembelian": 2369,
    "Bill Qty in SKU": 12,
    "UoM SKU": "AMP",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000212,
    "Name Principle": "SATORIA ANEKA INDUSTRI, PT",
    "Desc. Cust. Grp4": "Klinik",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "0106/MYU_SP/VII/2026",
    "Quotation Number": 2012354934
  },
  {
    "No": 27,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361682,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10113683,
    "Name Bill to": "KLINIK MEDIKA UTAMA",
    "Address": "JL. IYANTOA DESA GELTOLI KEC. MABA",
    "Material": 12019127,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "PARASETAMOL 10% 100 ML (SATORIA)",
    "Quantity": 6,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 11880,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 71280,
    "Tax Amount": 7841,
    "Total COGS": 63439,
    "Unit Price Pembelian": 10573,
    "Bill Qty in SKU": 6,
    "UoM SKU": "BT",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000212,
    "Name Principle": "SATORIA ANEKA INDUSTRI, PT",
    "Desc. Cust. Grp4": "Klinik",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "0106/MYU_SP/VII/2026",
    "Quotation Number": 2012354934
  },
  {
    "No": 28,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361682,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10113683,
    "Name Bill to": "KLINIK MEDIKA UTAMA",
    "Address": "JL. IYANTOA DESA GELTOLI KEC. MABA",
    "Material": 12018520,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "OBIMIN AF NEW TAB @30 (DVL)",
    "Quantity": 3,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 74500,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 223500,
    "Tax Amount": 24585,
    "Total COGS": 207855,
    "Unit Price Pembelian": 69285,
    "Bill Qty in SKU": 90,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Klinik",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "0106/MYU_SP/VII/2026",
    "Quotation Number": 2012354934
  },
  {
    "No": 29,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361682,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10113683,
    "Name Bill to": "KLINIK MEDIKA UTAMA",
    "Address": "JL. IYANTOA DESA GELTOLI KEC. MABA",
    "Material": 12000275,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "BISOLVON EXTRA SYR 125ML",
    "Quantity": 6,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 72991,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 437946,
    "Tax Amount": 48174,
    "Total COGS": 407290,
    "Unit Price Pembelian": 67882,
    "Bill Qty in SKU": 6,
    "UoM SKU": "BT",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000042,
    "Name Principle": "OPELLA HEALTHCARE INDONESIA, PT",
    "Desc. Cust. Grp4": "Klinik",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "0106/MYU_SP/VII/2026",
    "Quotation Number": 2012354934
  },
  {
    "No": 30,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361682,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10113683,
    "Name Bill to": "KLINIK MEDIKA UTAMA",
    "Address": "JL. IYANTOA DESA GELTOLI KEC. MABA",
    "Material": 12019790,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "PARACETAMOL 500MG DUS@100KPL (TRIMAN)",
    "Quantity": 3,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 28100,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 84300,
    "Tax Amount": 9273,
    "Total COGS": 32433,
    "Unit Price Pembelian": 10811,
    "Bill Qty in SKU": 300,
    "UoM SKU": "KPL",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000002854,
    "Name Principle": "TRIMAN",
    "Desc. Cust. Grp4": "Klinik",
    "Salesman": 82684,
    "Name Salesman": "ALFIAN R. PATUMA",
    "PO Number": "0106/MYU_SP/VII/2026",
    "Quotation Number": 2012354934
  },
  {
    "No": 31,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361683,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 20000813,
    "Name Bill to": "PT. KIMIA FARMA APOTEK",
    "Address": "JL. BUDI UTOMO NO.1",
    "Material": 12004222,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "CENDO XITROL EYE DROP 5 ML",
    "Quantity": 25,
    "Sales Unit": "BT",
    "Unit Price Penjualan": 31395,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 784875,
    "Tax Amount": 86336,
    "Total COGS": 679058,
    "Unit Price Pembelian": 27162,
    "Bill Qty in SKU": 25,
    "UoM SKU": "BT",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "ETHICAL",
    "Principle": 7000000110,
    "Name Principle": "CENDO, PT",
    "Desc. Cust. Grp4": "KFA",
    "Salesman": 82560,
    "Name Salesman": "MUH. RIDHO TAGOR BIMA SAKTI MANSUR",
    "PO Number": "IL1112QE018199025",
    "Quotation Number": 2012394851
  },
  {
    "No": 32,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361684,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 20000813,
    "Name Bill to": "PT. KIMIA FARMA APOTEK",
    "Address": "JL. BUDI UTOMO NO.1",
    "Material": 12014631,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "AKSAMED LATEX STERIL GLOVES POWDERED 7.0",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 8000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 800000,
    "Tax Amount": 88000,
    "Total COGS": 578800,
    "Unit Price Pembelian": 289400,
    "Bill Qty in SKU": 100,
    "UoM SKU": "PAA",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "ALKES & PKRT",
    "Principle": 7000000005,
    "Name Principle": "BIO AXION HEALTHINDO, PT",
    "Desc. Cust. Grp4": "KFA",
    "Salesman": 82560,
    "Name Salesman": "MUH. RIDHO TAGOR BIMA SAKTI MANSUR",
    "PO Number": "IL1112QE018199025",
    "Quotation Number": 2012394861
  },
  {
    "No": 33,
    "Sales Office": 2245,
    "Desc. S.Office": "KFTD Ternate",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361684,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 20000813,
    "Name Bill to": "PT. KIMIA FARMA APOTEK",
    "Address": "JL. BUDI UTOMO NO.1",
    "Material": 12014661,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "AKSAMED LATEX STERIL GLOVES POWDERED 7.5",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 8000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 400000,
    "Tax Amount": 44000,
    "Total COGS": 289399,
    "Unit Price Pembelian": 289399,
    "Bill Qty in SKU": 50,
    "UoM SKU": "PAA",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "ALKES & PKRT",
    "Principle": 7000000005,
    "Name Principle": "BIO AXION HEALTHINDO, PT",
    "Desc. Cust. Grp4": "KFA",
    "Salesman": 82560,
    "Name Salesman": "MUH. RIDHO TAGOR BIMA SAKTI MANSUR",
    "PO Number": "IL1112QE018199025",
    "Quotation Number": 2012394861
  },
  {
    "No": 34,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361686,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007649,
    "Name Bill to": "APOTEK DAHSYAT FARMA",
    "Address": "JL.RAYA KEMIRI HINEKOMBE SENTANI KEL. HINEKOMBE KEC. SENTANI",
    "Material": 11000384,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "BETASON N CREAM (DUS 1 TUB @5 G)",
    "Quantity": 24,
    "Sales Unit": "TUB",
    "Unit Price Penjualan": 16500,
    "Dis% (ZD01)": 26.5,
    "DisAmt (ZD01)": 104940,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 18.5,
    "Disc. Upfront Amt (ZD07)": 73260,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 18.5,
    "Disc. Pengembalian Upf Amt (ZD10)": 73260,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 396000,
    "Tax Amount": 43560,
    "Total COGS": 352004,
    "Unit Price Pembelian": 14667,
    "Bill Qty in SKU": 24,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82708,
    "Name Salesman": "PASCALIS JINGKAL",
    "PO Number": "03/08/26",
    "Quotation Number": 2012394830
  },
  {
    "No": 35,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361687,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10055019,
    "Name Bill to": "APOTEK FAJAR INDAH 2",
    "Address": "JL. PROTOKOL KOYA BARAT KEL. KOYA BARAT MUARATAMI",
    "Material": 12009904,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "PRIMAQUINE 15 MG @100 TAB (PEHA)",
    "Quantity": 8,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 100000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 800000,
    "Tax Amount": 88000,
    "Total COGS": 592000,
    "Unit Price Pembelian": 740,
    "Bill Qty in SKU": 800,
    "UoM SKU": "TAB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000344,
    "Name Principle": "PHAPROS, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80427,
    "Name Salesman": "WILLY BRODUS JANSAS",
    "PO Number": "02082026",
    "Quotation Number": 2012394839
  },
  {
    "No": 36,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361687,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10055019,
    "Name Bill to": "APOTEK FAJAR INDAH 2",
    "Address": "JL. PROTOKOL KOYA BARAT KEL. KOYA BARAT MUARATAMI",
    "Material": 11000296,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "MICONAZOLE 2 % CR(DUS 24 TUBE@10 GRAM)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 3750,
    "Dis% (ZD01)": 31.5,
    "DisAmt (ZD01)": 28350,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 23.5,
    "Disc. Upfront Amt (ZD07)": 21150,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 23.5,
    "Disc. Pengembalian Upf Amt (ZD10)": 21150,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 90000,
    "Tax Amount": 9900,
    "Total COGS": 66168,
    "Unit Price Pembelian": 2757,
    "Bill Qty in SKU": 24,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80427,
    "Name Salesman": "WILLY BRODUS JANSAS",
    "PO Number": "02082026",
    "Quotation Number": 2012394839
  },
  {
    "No": 37,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361688,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10083285,
    "Name Bill to": "APOTEK K-24 WAHNO",
    "Address": "JL RAYA ABEPURA-KOTARAJA, WAHNO, ABEPURA",
    "Material": 11000395,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "KETOCONAZOLE 2 % CR (DUS 25 TUB @10 G)",
    "Quantity": 75,
    "Sales Unit": "TUB",
    "Unit Price Penjualan": 4000,
    "Dis% (ZD01)": 29.0,
    "DisAmt (ZD01)": 87000,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 21.0,
    "Disc. Upfront Amt (ZD07)": 63000,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 21.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 63000,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 300000,
    "Tax Amount": 33000,
    "Total COGS": 231480,
    "Unit Price Pembelian": 3086,
    "Bill Qty in SKU": 75,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80427,
    "Name Salesman": "WILLY BRODUS JANSAS",
    "PO Number": "1694",
    "Quotation Number": 2012394867
  },
  {
    "No": 38,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361688,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10083285,
    "Name Bill to": "APOTEK K-24 WAHNO",
    "Address": "JL RAYA ABEPURA-KOTARAJA, WAHNO, ABEPURA",
    "Material": 11001571,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "VITAMIN B KOMPLEKS(SPLMN)(DUS100TAB)-BJN",
    "Quantity": 3,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 15000,
    "Dis% (ZD01)": 34.52,
    "DisAmt (ZD01)": 15534,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 26.52,
    "Disc. Upfront Amt (ZD07)": 11934,
    "Disc. Beban KFTD Upf % (ZD08)": 2.5,
    "Disc. Beban KFTD Upf Amt (ZD08)": 1125,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 24.02,
    "Disc. Pengembalian Upf Amt (ZD10)": 10809,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 1125,
    "Total Penjualan": 43875,
    "Tax Amount": 4826,
    "Total COGS": 29466,
    "Unit Price Pembelian": 98,
    "Bill Qty in SKU": 300,
    "UoM SKU": "TAB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80427,
    "Name Salesman": "WILLY BRODUS JANSAS",
    "PO Number": "1694",
    "Quotation Number": 2012394867
  },
  {
    "No": 39,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361703,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007705,
    "Name Bill to": "RS. BHAYANGKARA",
    "Address": "JL. JERUK NIPIS KOTARAJA",
    "Material": 12011708,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "OMEPRAZOLE SODIUM 40MG INJ @10 VL",
    "Quantity": 90,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 85000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 7650000,
    "Tax Amount": 841500,
    "Total COGS": 10531170,
    "Unit Price Pembelian": 11701,
    "Bill Qty in SKU": 900,
    "UoM SKU": "VL",
    "Code Pelayanan": 82,
    "Dec. Pelayanan": "Ekatalog",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000344,
    "Name Principle": "PHAPROS, PT",
    "Desc. Cust. Grp4": "Rumah Sakit Polri",
    "Salesman": 82100,
    "Name Salesman": "HERRIYANTO",
    "PO Number": "SP/2408/VII/2026",
    "Quotation Number": 2012394922
  },
  {
    "No": 40,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361704,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007705,
    "Name Bill to": "RS. BHAYANGKARA",
    "Address": "JL. JERUK NIPIS KOTARAJA",
    "Material": 12011724,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "CEFTRIAXONE SODIUM 1GR INJ @10 VL (PEHA)",
    "Quantity": 64,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 100000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 6400000,
    "Tax Amount": 704000,
    "Total COGS": 5328000,
    "Unit Price Pembelian": 8325,
    "Bill Qty in SKU": 640,
    "UoM SKU": "VL",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000344,
    "Name Principle": "PHAPROS, PT",
    "Desc. Cust. Grp4": "Rumah Sakit Polri",
    "Salesman": 82100,
    "Name Salesman": "HERRIYANTO",
    "PO Number": "SP/2408/VII/2026.",
    "Quotation Number": 2012394936
  },
  {
    "No": 41,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361704,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007705,
    "Name Bill to": "RS. BHAYANGKARA",
    "Address": "JL. JERUK NIPIS KOTARAJA",
    "Material": 13011641,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "KETOROLAC 30MG INJ AMP@12 GPH (PEHA)",
    "Quantity": 100,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 28000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 2800000,
    "Tax Amount": 308000,
    "Total COGS": 2590000,
    "Unit Price Pembelian": 2158,
    "Bill Qty in SKU": 1200,
    "UoM SKU": "AMP",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000344,
    "Name Principle": "PHAPROS, PT",
    "Desc. Cust. Grp4": "Rumah Sakit Polri",
    "Salesman": 82100,
    "Name Salesman": "HERRIYANTO",
    "PO Number": "SP/2408/VII/2026.",
    "Quotation Number": 2012394936
  },
  {
    "No": 42,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361704,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007705,
    "Name Bill to": "RS. BHAYANGKARA",
    "Address": "JL. JERUK NIPIS KOTARAJA",
    "Material": 12009883,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "METHYLPREDNISOLONE SERB INJ 125 MG(PEHA)",
    "Quantity": 20,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 21000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 420000,
    "Tax Amount": 46200,
    "Total COGS": 342260,
    "Unit Price Pembelian": 17113,
    "Bill Qty in SKU": 20,
    "UoM SKU": "VL",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000344,
    "Name Principle": "PHAPROS, PT",
    "Desc. Cust. Grp4": "Rumah Sakit Polri",
    "Salesman": 82100,
    "Name Salesman": "HERRIYANTO",
    "PO Number": "SP/2408/VII/2026.",
    "Quotation Number": 2012394936
  },
  {
    "No": 43,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361704,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007705,
    "Name Bill to": "RS. BHAYANGKARA",
    "Address": "JL. JERUK NIPIS KOTARAJA",
    "Material": 12008909,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "PHYTOMENADION INJ 2 MG/ML (PEHA)",
    "Quantity": 3,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 144000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 432000,
    "Tax Amount": 47520,
    "Total COGS": 286380,
    "Unit Price Pembelian": 3182,
    "Bill Qty in SKU": 90,
    "UoM SKU": "AMP",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000344,
    "Name Principle": "PHAPROS, PT",
    "Desc. Cust. Grp4": "Rumah Sakit Polri",
    "Salesman": 82100,
    "Name Salesman": "HERRIYANTO",
    "PO Number": "SP/2408/VII/2026.",
    "Quotation Number": 2012394936
  },
  {
    "No": 44,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361704,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007705,
    "Name Bill to": "RS. BHAYANGKARA",
    "Address": "JL. JERUK NIPIS KOTARAJA",
    "Material": 13027070,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "LIDOCAINE 2%/2ML AMP GPH (PEHA)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 230000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 230000,
    "Tax Amount": 25300,
    "Total COGS": 196350,
    "Unit Price Pembelian": 1964,
    "Bill Qty in SKU": 100,
    "UoM SKU": "AMP",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000344,
    "Name Principle": "PHAPROS, PT",
    "Desc. Cust. Grp4": "Rumah Sakit Polri",
    "Salesman": 82100,
    "Name Salesman": "HERRIYANTO",
    "PO Number": "SP/2408/VII/2026.",
    "Quotation Number": 2012394936
  },
  {
    "No": 45,
    "Sales Office": 2242,
    "Desc. S.Office": "KFTD Kendari",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361723,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10060983,
    "Name Bill to": "APOTEK LASER JAYA FARMA",
    "Address": "JLN. POROS KENDARI - PUNGGALUKU DESA LEBO JAYA, KEC. KONDA KEL. LEBO JAYA KEC. KONDA",
    "Material": 13083777,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "STRIATAMIN CAP 10 X 3",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 165000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 165000,
    "Tax Amount": 18150,
    "Total COGS": 148500,
    "Unit Price Pembelian": 4950,
    "Bill Qty in SKU": 30,
    "UoM SKU": "KPS",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "Obat Bahan Alam",
    "Principle": 7000000027,
    "Name Principle": "MEGA MEDICA PHARMACEUTICALS, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82327,
    "Name Salesman": "ARJUNA",
    "PO Number": "03",
    "Quotation Number": 2012395128
  },
  {
    "No": 46,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361724,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007687,
    "Name Bill to": "PUSKESMAS SENTANI",
    "Address": "JL. KEMIRI 1 KEL. HINEKOMBE KEC. DISTRIK SENTANI",
    "Material": 11001448,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "AMLODIPINE 5 MG (DUS 50 TAB)-BJN",
    "Quantity": 43,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 6450,
    "Dis% (ZD01)": 81.6,
    "DisAmt (ZD01)": 226318,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 73.6,
    "Disc. Upfront Amt (ZD07)": 204130,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 73.6,
    "Disc. Pengembalian Upf Amt (ZD10)": 204130,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 277350,
    "Tax Amount": 30509,
    "Total COGS": 255162,
    "Unit Price Pembelian": 119,
    "Bill Qty in SKU": 2150,
    "UoM SKU": "TAB",
    "Code Pelayanan": 82,
    "Dec. Pelayanan": "Ekatalog",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Puskesmas",
    "Salesman": 82100,
    "Name Salesman": "HERRIYANTO",
    "PO Number": "004/SPO/PKM-STN/VIII",
    "Quotation Number": 2012394835
  },
  {
    "No": 47,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361724,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007687,
    "Name Bill to": "PUSKESMAS SENTANI",
    "Address": "JL. KEMIRI 1 KEL. HINEKOMBE KEC. DISTRIK SENTANI",
    "Material": 11001448,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "AMLODIPINE 5 MG (DUS 50 TAB)-BJN",
    "Quantity": 57,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 6450,
    "Dis% (ZD01)": 81.6,
    "DisAmt (ZD01)": 300002,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 73.6,
    "Disc. Upfront Amt (ZD07)": 270590,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 73.6,
    "Disc. Pengembalian Upf Amt (ZD10)": 270590,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 367650,
    "Tax Amount": 40441,
    "Total COGS": 290586,
    "Unit Price Pembelian": 102,
    "Bill Qty in SKU": 2850,
    "UoM SKU": "TAB",
    "Code Pelayanan": 82,
    "Dec. Pelayanan": "Ekatalog",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Puskesmas",
    "Salesman": 82100,
    "Name Salesman": "HERRIYANTO",
    "PO Number": "004/SPO/PKM-STN/VIII",
    "Quotation Number": 2012394835
  },
  {
    "No": 48,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361725,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10014147,
    "Name Bill to": "APOTEK BERKAH FARMA",
    "Address": "JLN. SYAMOR KEL. MARARENA KEC. SARMI",
    "Material": 13076707,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "D-ARTEPP TAB@9",
    "Quantity": 20,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 88461,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 5.0,
    "DisAmt (ZD03)": 88461,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 1769220,
    "Tax Amount": 194614,
    "Total COGS": 1548068,
    "Unit Price Pembelian": 8600,
    "Bill Qty in SKU": 180,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "ETHICAL",
    "Principle": 7000000004,
    "Name Principle": "BHINNEKA USADA RAYA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80965,
    "Name Salesman": "TAMIN",
    "PO Number": "Xx",
    "Quotation Number": 2012395077
  },
  {
    "No": 49,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361751,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10079676,
    "Name Bill to": "PT. HOKY MANDIRI FARMA",
    "Address": "JL. ARFAK NO.16B RT.003 RW.007 KAMPUNG BARU SORONG KOTA SORONG PAPUA BARAT",
    "Material": 12000886,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "VICEE GRAPE TAB @ 100 (UN)",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 60655,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 121310,
    "Tax Amount": 13344,
    "Total COGS": 112818,
    "Unit Price Pembelian": 564,
    "Bill Qty in SKU": 200,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Izin PBF",
    "Salesman": 82719,
    "Name Salesman": "SINTIKHE HASIANA PUTRI SITUMORANG",
    "PO Number": "090",
    "Quotation Number": 2012394812
  },
  {
    "No": 50,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361751,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10079676,
    "Name Bill to": "PT. HOKY MANDIRI FARMA",
    "Address": "JL. ARFAK NO.16B RT.003 RW.007 KAMPUNG BARU SORONG KOTA SORONG PAPUA BARAT",
    "Material": 12000887,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "VICEE LEMON TAB @ 100 (UN)",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 60655,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 121310,
    "Tax Amount": 13344,
    "Total COGS": 112819,
    "Unit Price Pembelian": 564,
    "Bill Qty in SKU": 200,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Izin PBF",
    "Salesman": 82719,
    "Name Salesman": "SINTIKHE HASIANA PUTRI SITUMORANG",
    "PO Number": "090",
    "Quotation Number": 2012394812
  },
  {
    "No": 51,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361751,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10079676,
    "Name Bill to": "PT. HOKY MANDIRI FARMA",
    "Address": "JL. ARFAK NO.16B RT.003 RW.007 KAMPUNG BARU SORONG KOTA SORONG PAPUA BARAT",
    "Material": 12000888,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "VICEE ORANGE TAB @ 100 (UN)",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 60655,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 121310,
    "Tax Amount": 13344,
    "Total COGS": 112818,
    "Unit Price Pembelian": 564,
    "Bill Qty in SKU": 200,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Izin PBF",
    "Salesman": 82719,
    "Name Salesman": "SINTIKHE HASIANA PUTRI SITUMORANG",
    "PO Number": "090",
    "Quotation Number": 2012394812
  },
  {
    "No": 52,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361751,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10079676,
    "Name Bill to": "PT. HOKY MANDIRI FARMA",
    "Address": "JL. ARFAK NO.16B RT.003 RW.007 KAMPUNG BARU SORONG KOTA SORONG PAPUA BARAT",
    "Material": 12000889,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "VICEE STRAWBERY TAB @ 100 (UN)",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 60655,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 121310,
    "Tax Amount": 13344,
    "Total COGS": 112818,
    "Unit Price Pembelian": 564,
    "Bill Qty in SKU": 200,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Izin PBF",
    "Salesman": 82719,
    "Name Salesman": "SINTIKHE HASIANA PUTRI SITUMORANG",
    "PO Number": "090",
    "Quotation Number": 2012394812
  },
  {
    "No": 53,
    "Sales Office": 2244,
    "Desc. S.Office": "KFTD Ambon",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361761,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10095795,
    "Name Bill to": "APOTEK DALE",
    "Address": "JL LAKSDYA LEO WATTIMENA RUKO MEGA MAS BLOK C NO.2 BAGUALA",
    "Material": 12008262,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "SODIUM CHLORIDE 0.9% 500 ML (SATORIA)",
    "Quantity": 40,
    "Sales Unit": "BT",
    "Unit Price Penjualan": 7260,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 290400,
    "Tax Amount": 31944,
    "Total COGS": 246103,
    "Unit Price Pembelian": 6153,
    "Bill Qty in SKU": 40,
    "UoM SKU": "BT",
    "Code Pelayanan": 0,
    "Dec. Pelayanan": "E-Catalog Reguler",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000212,
    "Name Principle": "SATORIA ANEKA INDUSTRI, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80411,
    "Name Salesman": "JACOBIS NAHUMURY",
    "PO Number": "03....../.../..../..",
    "Quotation Number": 2012394965
  },
  {
    "No": 54,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361824,
    "Posting Status": "C",
    "Bill.Cancel": "X",
    "Bill to party": 10116153,
    "Name Bill to": "APOTEK SYAFA FARMA",
    "Address": "JL. PENDIDIKAN KEL. MALAINGKEDI KEC. MATAMSISMA",
    "Material": 12013051,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "CETIRIZINE 10MG TAB@100 (NOVA)",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 7928,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 15856,
    "Tax Amount": 1744,
    "Total COGS": 14414,
    "Unit Price Pembelian": 72,
    "Bill Qty in SKU": 200,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000034,
    "Name Principle": "NOVAPHARIN",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82719,
    "Name Salesman": "SINTIKHE HASIANA PUTRI SITUMORANG",
    "PO Number": "092",
    "Quotation Number": 2012394822
  },
  {
    "No": 55,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361824,
    "Posting Status": "C",
    "Bill.Cancel": "X",
    "Bill to party": 10116153,
    "Name Bill to": "APOTEK SYAFA FARMA",
    "Address": "JL. PENDIDIKAN KEL. MALAINGKEDI KEC. MATAMSISMA",
    "Material": 12012216,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "LORATADINE 10MG TAB@100 (NOVA)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 13874,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 13874,
    "Tax Amount": 1526,
    "Total COGS": 11261,
    "Unit Price Pembelian": 113,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000034,
    "Name Principle": "NOVAPHARIN",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82719,
    "Name Salesman": "SINTIKHE HASIANA PUTRI SITUMORANG",
    "PO Number": "092",
    "Quotation Number": 2012394822
  },
  {
    "No": 56,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361824,
    "Posting Status": "C",
    "Bill.Cancel": "X",
    "Bill to party": 10116153,
    "Name Bill to": "APOTEK SYAFA FARMA",
    "Address": "JL. PENDIDIKAN KEL. MALAINGKEDI KEC. MATAMSISMA",
    "Material": 12019796,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "ANTASIDA DOEN DUS@100TAB (TRIMAN)",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 11000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 22000,
    "Tax Amount": 2420,
    "Total COGS": 15406,
    "Unit Price Pembelian": 77,
    "Bill Qty in SKU": 200,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000002854,
    "Name Principle": "TRIMAN",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82719,
    "Name Salesman": "SINTIKHE HASIANA PUTRI SITUMORANG",
    "PO Number": "092",
    "Quotation Number": 2012394822
  },
  {
    "No": 57,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361824,
    "Posting Status": "C",
    "Bill.Cancel": "X",
    "Bill to party": 10116153,
    "Name Bill to": "APOTEK SYAFA FARMA",
    "Address": "JL. PENDIDIKAN KEL. MALAINGKEDI KEC. MATAMSISMA",
    "Material": 12000789,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "ENERVON C FC TAB @ 100 (UN)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 109109,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 109109,
    "Tax Amount": 12002,
    "Total COGS": 98516,
    "Unit Price Pembelian": 985,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82719,
    "Name Salesman": "SINTIKHE HASIANA PUTRI SITUMORANG",
    "PO Number": "092",
    "Quotation Number": 2012394822
  },
  {
    "No": 58,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361825,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10116153,
    "Name Bill to": "APOTEK SYAFA FARMA",
    "Address": "JL. PENDIDIKAN KEL. MALAINGKEDI KEC. MATAMSISMA",
    "Material": 11000011,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "AMOXICILLIN 500 MG (DUS 100 TAB)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 65000,
    "Dis% (ZD01)": 31.09,
    "DisAmt (ZD01)": 20209,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 23.09,
    "Disc. Upfront Amt (ZD07)": 15009,
    "Disc. Beban KFTD Upf % (ZD08)": 10.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 6500,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 13.09,
    "Disc. Pengembalian Upf Amt (ZD10)": 8509,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 6500,
    "Total Penjualan": 58500,
    "Tax Amount": 6435,
    "Total COGS": 44791,
    "Unit Price Pembelian": 448,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82719,
    "Name Salesman": "SINTIKHE HASIANA PUTRI SITUMORANG",
    "PO Number": "093",
    "Quotation Number": 2012394823
  },
  {
    "No": 59,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361826,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10117810,
    "Name Bill to": "APOTEK SINAR MEDIKA",
    "Address": "JL. BRAWIJAYA KEL. KAIBUS KEC. TEMINABUAN",
    "Material": 12000889,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "VICEE STRAWBERY TAB @ 100 (UN)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 60655,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 60655,
    "Tax Amount": 6672,
    "Total COGS": 56409,
    "Unit Price Pembelian": 564,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82661,
    "Name Salesman": "EFINDA SARI TUMANGGER",
    "PO Number": "03082026",
    "Quotation Number": 2012394856
  },
  {
    "No": 60,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361826,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10117810,
    "Name Bill to": "APOTEK SINAR MEDIKA",
    "Address": "JL. BRAWIJAYA KEL. KAIBUS KEC. TEMINABUAN",
    "Material": 12000887,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "VICEE LEMON TAB @ 100 (UN)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 60655,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 60655,
    "Tax Amount": 6672,
    "Total COGS": 56410,
    "Unit Price Pembelian": 564,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82661,
    "Name Salesman": "EFINDA SARI TUMANGGER",
    "PO Number": "03082026",
    "Quotation Number": 2012394856
  },
  {
    "No": 61,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361826,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10117810,
    "Name Bill to": "APOTEK SINAR MEDIKA",
    "Address": "JL. BRAWIJAYA KEL. KAIBUS KEC. TEMINABUAN",
    "Material": 12000886,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "VICEE GRAPE TAB @ 100 (UN)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 60655,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 60655,
    "Tax Amount": 6672,
    "Total COGS": 56409,
    "Unit Price Pembelian": 564,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82661,
    "Name Salesman": "EFINDA SARI TUMANGGER",
    "PO Number": "03082026",
    "Quotation Number": 2012394856
  },
  {
    "No": 62,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361826,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10117810,
    "Name Bill to": "APOTEK SINAR MEDIKA",
    "Address": "JL. BRAWIJAYA KEL. KAIBUS KEC. TEMINABUAN",
    "Material": 12008496,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "MOLAFATE SYR 60ML MOL",
    "Quantity": 3,
    "Sales Unit": "BT",
    "Unit Price Penjualan": 20000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 60000,
    "Tax Amount": 6600,
    "Total COGS": 55800,
    "Unit Price Pembelian": 18600,
    "Bill Qty in SKU": 3,
    "UoM SKU": "BT",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "ETHICAL",
    "Principle": 7000000080,
    "Name Principle": "MOLEX AYUS, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82661,
    "Name Salesman": "EFINDA SARI TUMANGGER",
    "PO Number": "03082026",
    "Quotation Number": 2012394856
  },
  {
    "No": 63,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361826,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10117810,
    "Name Bill to": "APOTEK SINAR MEDIKA",
    "Address": "JL. BRAWIJAYA KEL. KAIBUS KEC. TEMINABUAN",
    "Material": 12008464,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "MOLAPECT TAB@100 MOL",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 70000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 70000,
    "Tax Amount": 7700,
    "Total COGS": 65100,
    "Unit Price Pembelian": 651,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "ETHICAL",
    "Principle": 7000000080,
    "Name Principle": "MOLEX AYUS, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82661,
    "Name Salesman": "EFINDA SARI TUMANGGER",
    "PO Number": "03082026",
    "Quotation Number": 2012394856
  },
  {
    "No": 64,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361827,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10050846,
    "Name Bill to": "APOTEK KEYEN FARMA",
    "Address": "KAMPUNG KEYEN",
    "Material": 12000889,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "VICEE STRAWBERY TAB @ 100 (UN)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 60655,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 60655,
    "Tax Amount": 6672,
    "Total COGS": 56409,
    "Unit Price Pembelian": 564,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82661,
    "Name Salesman": "EFINDA SARI TUMANGGER",
    "PO Number": "03082026",
    "Quotation Number": 2012394858
  },
  {
    "No": 65,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361827,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10050846,
    "Name Bill to": "APOTEK KEYEN FARMA",
    "Address": "KAMPUNG KEYEN",
    "Material": 12000887,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "VICEE LEMON TAB @ 100 (UN)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 60655,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 60655,
    "Tax Amount": 6672,
    "Total COGS": 56409,
    "Unit Price Pembelian": 564,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82661,
    "Name Salesman": "EFINDA SARI TUMANGGER",
    "PO Number": "03082026",
    "Quotation Number": 2012394858
  },
  {
    "No": 66,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361827,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10050846,
    "Name Bill to": "APOTEK KEYEN FARMA",
    "Address": "KAMPUNG KEYEN",
    "Material": 12000886,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "VICEE GRAPE TAB @ 100 (UN)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 60655,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 60655,
    "Tax Amount": 6672,
    "Total COGS": 56409,
    "Unit Price Pembelian": 564,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82661,
    "Name Salesman": "EFINDA SARI TUMANGGER",
    "PO Number": "03082026",
    "Quotation Number": 2012394858
  },
  {
    "No": 67,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361828,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10097650,
    "Name Bill to": "APOTEK PAPUA SEHAT APUSE",
    "Address": "JL BASUKI RAHMAT KM.12 KLAWUYUK SORONG TIMUR",
    "Material": 12008508,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "CHANNA STRIATA 500 MG @ 30 KPS",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 181500,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 181500,
    "Tax Amount": 19965,
    "Total COGS": 163350,
    "Unit Price Pembelian": 5445,
    "Bill Qty in SKU": 30,
    "UoM SKU": "KPS",
    "Code Pelayanan": 0,
    "Dec. Pelayanan": "E-Catalog Reguler",
    "Prod. Hierarchy3": "Obat Bahan Alam",
    "Principle": 7000000027,
    "Name Principle": "MEGA MEDICA PHARMACEUTICALS, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82822,
    "Name Salesman": "ULLAN DEATRIS HERMAWAN",
    "PO Number": "030826",
    "Quotation Number": 2012394859
  },
  {
    "No": 68,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361829,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10096208,
    "Name Bill to": "APOTEK VALENCIA 2",
    "Address": "JL SELE BE SOLU, KLAWALU, SORONG TIMUR",
    "Material": 11002298,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "BISOPROLOL 2.5 MG TSS (DUS 100 TAB)",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 85000,
    "Dis% (ZD01)": 83.85,
    "DisAmt (ZD01)": 142545,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 6.47,
    "Disc. Upfront Amt (ZD07)": 10999,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 6.47,
    "Disc. Pengembalian Upf Amt (ZD10)": 10999,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 170000,
    "Tax Amount": 18700,
    "Total COGS": 26559,
    "Unit Price Pembelian": 133,
    "Bill Qty in SKU": 200,
    "UoM SKU": "TAB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82822,
    "Name Salesman": "ULLAN DEATRIS HERMAWAN",
    "PO Number": "030826 2",
    "Quotation Number": 2012394862
  },
  {
    "No": 69,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361829,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10096208,
    "Name Bill to": "APOTEK VALENCIA 2",
    "Address": "JL SELE BE SOLU, KLAWALU, SORONG TIMUR",
    "Material": 11002299,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "BISOPROLOL 5 MG TSS (DUS 100 TAB)",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 125000,
    "Dis% (ZD01)": 84.36,
    "DisAmt (ZD01)": 210900,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 18.73,
    "Disc. Upfront Amt (ZD07)": 46825,
    "Disc. Beban KFTD Upf % (ZD08)": 5.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 12500,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 13.73,
    "Disc. Pengembalian Upf Amt (ZD10)": 34325,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 12500,
    "Total Penjualan": 237500,
    "Tax Amount": 26125,
    "Total COGS": 38247,
    "Unit Price Pembelian": 191,
    "Bill Qty in SKU": 200,
    "UoM SKU": "TAB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82822,
    "Name Salesman": "ULLAN DEATRIS HERMAWAN",
    "PO Number": "030826 2",
    "Quotation Number": 2012394862
  },
  {
    "No": 70,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361830,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10096208,
    "Name Bill to": "APOTEK VALENCIA 2",
    "Address": "JL SELE BE SOLU, KLAWALU, SORONG TIMUR",
    "Material": 12014774,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "NATUR-E WHITE SOFT CAPSULE 32S (DVL)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 79335,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 79335,
    "Tax Amount": 8727,
    "Total COGS": 73782,
    "Unit Price Pembelian": 2306,
    "Bill Qty in SKU": 32,
    "UoM SKU": "KPS",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82822,
    "Name Salesman": "ULLAN DEATRIS HERMAWAN",
    "PO Number": "030826",
    "Quotation Number": 2012394863
  },
  {
    "No": 71,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361830,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10096208,
    "Name Bill to": "APOTEK VALENCIA 2",
    "Address": "JL SELE BE SOLU, KLAWALU, SORONG TIMUR",
    "Material": 12000827,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "NATUR E ADVANCED 32 S",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 67300,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 134600,
    "Tax Amount": 14806,
    "Total COGS": 125178,
    "Unit Price Pembelian": 1956,
    "Bill Qty in SKU": 64,
    "UoM SKU": "KPS",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82822,
    "Name Salesman": "ULLAN DEATRIS HERMAWAN",
    "PO Number": "030826",
    "Quotation Number": 2012394863
  },
  {
    "No": 72,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361831,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10014968,
    "Name Bill to": "APOTEK DUNIA FARMA",
    "Address": "JL. SOEKARNO - HATTA, TEMINABUAN",
    "Material": 12000886,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "VICEE GRAPE TAB @ 100 (UN)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 60655,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 60655,
    "Tax Amount": 6672,
    "Total COGS": 56409,
    "Unit Price Pembelian": 564,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82661,
    "Name Salesman": "EFINDA SARI TUMANGGER",
    "PO Number": "03082026/AP.DUNIA",
    "Quotation Number": 2012394864
  },
  {
    "No": 73,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361831,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10014968,
    "Name Bill to": "APOTEK DUNIA FARMA",
    "Address": "JL. SOEKARNO - HATTA, TEMINABUAN",
    "Material": 12000887,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "VICEE LEMON TAB @ 100 (UN)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 60655,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 60655,
    "Tax Amount": 6672,
    "Total COGS": 56409,
    "Unit Price Pembelian": 564,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82661,
    "Name Salesman": "EFINDA SARI TUMANGGER",
    "PO Number": "03082026/AP.DUNIA",
    "Quotation Number": 2012394864
  },
  {
    "No": 74,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361831,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10014968,
    "Name Bill to": "APOTEK DUNIA FARMA",
    "Address": "JL. SOEKARNO - HATTA, TEMINABUAN",
    "Material": 12000889,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "VICEE STRAWBERY TAB @ 100 (UN)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 60655,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 60655,
    "Tax Amount": 6672,
    "Total COGS": 56409,
    "Unit Price Pembelian": 564,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000000009,
    "Name Principle": "DARYA VARIA, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82661,
    "Name Salesman": "EFINDA SARI TUMANGGER",
    "PO Number": "03082026/AP.DUNIA",
    "Quotation Number": 2012394864
  },
  {
    "No": 75,
    "Sales Office": 2242,
    "Desc. S.Office": "KFTD Kendari",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361832,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10008462,
    "Name Bill to": "DINAS KESEHATAN KAB. KOLAKA UTARA",
    "Address": "LASUSUA - KOLUT KEL. LASUSUA KEC. LASUSUA",
    "Material": 12019650,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "FOLIC ACID 1MG DUS@100TAB (TRIMAN)",
    "Quantity": 500,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 7000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 3500000,
    "Tax Amount": 385000,
    "Total COGS": 2723000,
    "Unit Price Pembelian": 54,
    "Bill Qty in SKU": 50000,
    "UoM SKU": "TAB",
    "Code Pelayanan": 0,
    "Dec. Pelayanan": "E-Catalog Reguler",
    "Prod. Hierarchy3": "OTC & HERBAL",
    "Principle": 7000002854,
    "Name Principle": "TRIMAN",
    "Desc. Cust. Grp4": "Dinkes",
    "Salesman": 80405,
    "Name Salesman": "ICKSAN JAMAL",
    "PO Number": "EP-01KTJPN7748EFW0N7",
    "Quotation Number": 2012394834
  },
  {
    "No": 76,
    "Sales Office": 2242,
    "Desc. S.Office": "KFTD Kendari",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361832,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10008462,
    "Name Bill to": "DINAS KESEHATAN KAB. KOLAKA UTARA",
    "Address": "LASUSUA - KOLUT KEL. LASUSUA KEC. LASUSUA",
    "Material": 12019330,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "SUPERHOID DUS@6SUPPOS (TRIMAN)",
    "Quantity": 100,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 53957,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 5395700,
    "Tax Amount": 593527,
    "Total COGS": 3729700,
    "Unit Price Pembelian": 6216,
    "Bill Qty in SKU": 600,
    "UoM SKU": "SUP",
    "Code Pelayanan": 0,
    "Dec. Pelayanan": "E-Catalog Reguler",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000002854,
    "Name Principle": "TRIMAN",
    "Desc. Cust. Grp4": "Dinkes",
    "Salesman": 80405,
    "Name Salesman": "ICKSAN JAMAL",
    "PO Number": "EP-01KTJPN7748EFW0N7",
    "Quotation Number": 2012394834
  },
  {
    "No": 77,
    "Sales Office": 2242,
    "Desc. S.Office": "KFTD Kendari",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361832,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10008462,
    "Name Bill to": "DINAS KESEHATAN KAB. KOLAKA UTARA",
    "Address": "LASUSUA - KOLUT KEL. LASUSUA KEC. LASUSUA",
    "Material": 12019789,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "PREDNISON BLT 5MG DUS@100TAB (TRIMAN)",
    "Quantity": 200,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 9200,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 1840000,
    "Tax Amount": 202400,
    "Total COGS": 1574800,
    "Unit Price Pembelian": 79,
    "Bill Qty in SKU": 20000,
    "UoM SKU": "TAB",
    "Code Pelayanan": 0,
    "Dec. Pelayanan": "E-Catalog Reguler",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000002854,
    "Name Principle": "TRIMAN",
    "Desc. Cust. Grp4": "Dinkes",
    "Salesman": 80405,
    "Name Salesman": "ICKSAN JAMAL",
    "PO Number": "EP-01KTJPN7748EFW0N7",
    "Quotation Number": 2012394834
  },
  {
    "No": 78,
    "Sales Office": 2242,
    "Desc. S.Office": "KFTD Kendari",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361832,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10008462,
    "Name Bill to": "DINAS KESEHATAN KAB. KOLAKA UTARA",
    "Address": "LASUSUA - KOLUT KEL. LASUSUA KEC. LASUSUA",
    "Material": 12019788,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "METRONIDAZOLE 500MG DUS@100TAB  (TRIMAN)",
    "Quantity": 200,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 31900,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.4,
    "DisAmt (ZD03)": 25520,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.4,
    "DisAmt (ZD05)": 25520,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 25520,
    "Total Penjualan": 6354480,
    "Tax Amount": 698993,
    "Total COGS": 4971000,
    "Unit Price Pembelian": 249,
    "Bill Qty in SKU": 20000,
    "UoM SKU": "TAB",
    "Code Pelayanan": 0,
    "Dec. Pelayanan": "E-Catalog Reguler",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000002854,
    "Name Principle": "TRIMAN",
    "Desc. Cust. Grp4": "Dinkes",
    "Salesman": 80405,
    "Name Salesman": "ICKSAN JAMAL",
    "PO Number": "EP-01KTJPN7748EFW0N7",
    "Quotation Number": 2012394834
  },
  {
    "No": 79,
    "Sales Office": 2242,
    "Desc. S.Office": "KFTD Kendari",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361834,
    "Posting Status": "C",
    "Bill.Cancel": "X",
    "Bill to party": 10008413,
    "Name Bill to": "KLINIK SARLINA SAF",
    "Address": "JL. PATTIMURA NO. 5",
    "Material": 12008250,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "DEXTROESE 5% 500 ML (SATORIA)",
    "Quantity": 160,
    "Sales Unit": "BT",
    "Unit Price Penjualan": 7271,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 1163360,
    "Tax Amount": 127970,
    "Total COGS": 1035390,
    "Unit Price Pembelian": 6471,
    "Bill Qty in SKU": 160,
    "UoM SKU": "BT",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000212,
    "Name Principle": "SATORIA ANEKA INDUSTRI, PT",
    "Desc. Cust. Grp4": "Klinik",
    "Salesman": 82327,
    "Name Salesman": "ARJUNA",
    "PO Number": "99/SP/IFSAF",
    "Quotation Number": 2012395251
  },
  {
    "No": 80,
    "Sales Office": 2244,
    "Desc. S.Office": "KFTD Ambon",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361861,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10100877,
    "Name Bill to": "APOTEK CINDY FARMA",
    "Address": "JL WOLTER MONGINSIDI RT.05/04 LATERI, BAGUALA KEL. LATERI KEC. BAGUALA",
    "Material": 11000291,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "ANTIHEMOROID (DUS 10 SUPP)",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 36600,
    "Dis% (ZD01)": 35.6,
    "DisAmt (ZD01)": 26059,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 27.6,
    "Disc. Upfront Amt (ZD07)": 20203,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 27.6,
    "Disc. Pengembalian Upf Amt (ZD10)": 20203,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 73200,
    "Tax Amount": 8052,
    "Total COGS": 58351,
    "Unit Price Pembelian": 29176,
    "Bill Qty in SKU": 20,
    "UoM SKU": "SUP",
    "Code Pelayanan": 82,
    "Dec. Pelayanan": "Ekatalog",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80411,
    "Name Salesman": "JACOBIS NAHUMURY",
    "PO Number": "...--",
    "Quotation Number": 2012395777
  },
  {
    "No": 81,
    "Sales Office": 2244,
    "Desc. S.Office": "KFTD Ambon",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361861,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10100877,
    "Name Bill to": "APOTEK CINDY FARMA",
    "Address": "JL WOLTER MONGINSIDI RT.05/04 LATERI, BAGUALA KEL. LATERI KEC. BAGUALA",
    "Material": 11000394,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "HYDROCORTISONE 2.5%CR(DUS 24TUBE@ 5GRAM)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 2901,
    "Dis% (ZD01)": 33.0,
    "DisAmt (ZD01)": 22976,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 25.0,
    "Disc. Upfront Amt (ZD07)": 17406,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 25.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 17406,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 69624,
    "Tax Amount": 7659,
    "Total COGS": 59513,
    "Unit Price Pembelian": 59513,
    "Bill Qty in SKU": 24,
    "UoM SKU": "TUB",
    "Code Pelayanan": 82,
    "Dec. Pelayanan": "Ekatalog",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80411,
    "Name Salesman": "JACOBIS NAHUMURY",
    "PO Number": "...--",
    "Quotation Number": 2012395777
  },
  {
    "No": 82,
    "Sales Office": 2244,
    "Desc. S.Office": "KFTD Ambon",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361861,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10100877,
    "Name Bill to": "APOTEK CINDY FARMA",
    "Address": "JL WOLTER MONGINSIDI RT.05/04 LATERI, BAGUALA KEL. LATERI KEC. BAGUALA",
    "Material": 13011641,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "KETOROLAC 30MG INJ AMP@12 GPH (PEHA)",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 28000,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 56000,
    "Tax Amount": 6160,
    "Total COGS": 51800,
    "Unit Price Pembelian": 25900,
    "Bill Qty in SKU": 24,
    "UoM SKU": "AMP",
    "Code Pelayanan": 82,
    "Dec. Pelayanan": "Ekatalog",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000344,
    "Name Principle": "PHAPROS, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80411,
    "Name Salesman": "JACOBIS NAHUMURY",
    "PO Number": "...--",
    "Quotation Number": 2012395777
  },
  {
    "No": 83,
    "Sales Office": 2242,
    "Desc. S.Office": "KFTD Kendari",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361876,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10008436,
    "Name Bill to": "APOTEK WUA-WUA FARMA",
    "Address": "JL. MT. HARYONO NO. 23 KEL. BENDE KEC. KADIA",
    "Material": 11002238,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "ACETYLCYSTEINE 200 MG (DUS 100 KPS)",
    "Quantity": 2,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 110000,
    "Dis% (ZD01)": 26.97,
    "DisAmt (ZD01)": 59334,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 18.97,
    "Disc. Upfront Amt (ZD07)": 41734,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 18.97,
    "Disc. Pengembalian Upf Amt (ZD10)": 41734,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 220000,
    "Tax Amount": 24200,
    "Total COGS": 160666,
    "Unit Price Pembelian": 803,
    "Bill Qty in SKU": 200,
    "UoM SKU": "KPS",
    "Code Pelayanan": 82,
    "Dec. Pelayanan": "Ekatalog",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80400,
    "Name Salesman": "MUHAMMAD RADJIB. K,SE",
    "PO Number": "005/wwf/03/VII/2026",
    "Quotation Number": 2012395258
  },
  {
    "No": 84,
    "Sales Office": 2242,
    "Desc. S.Office": "KFTD Kendari",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361876,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10008436,
    "Name Bill to": "APOTEK WUA-WUA FARMA",
    "Address": "JL. MT. HARYONO NO. 23 KEL. BENDE KEC. KADIA",
    "Material": 12017224,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "GABAPENTIN 300MG KAPS@100 (PEHA)",
    "Quantity": 5,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 59900,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 299500,
    "Tax Amount": 32945,
    "Total COGS": 268715,
    "Unit Price Pembelian": 537,
    "Bill Qty in SKU": 500,
    "UoM SKU": "KPS",
    "Code Pelayanan": 82,
    "Dec. Pelayanan": "Ekatalog",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000344,
    "Name Principle": "PHAPROS, PT",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 80400,
    "Name Salesman": "MUHAMMAD RADJIB. K,SE",
    "PO Number": "005/wwf/03/VII/2026",
    "Quotation Number": 2012395258
  },
  {
    "No": 85,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361904,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10063028,
    "Name Bill to": "APOTEK SEJAHTERA",
    "Address": "JL. BARU PASAR LAMA ABEPURA, YOBE, ABEPURA, JAYAPURA",
    "Material": 11000004,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "ACICLOVIR CREAM 5%(DUS 25 TUBE @ 5 GRAM)",
    "Quantity": 3,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 3764,
    "Dis% (ZD01)": 17.0,
    "DisAmt (ZD01)": 47991,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 9.0,
    "Disc. Upfront Amt (ZD07)": 25407,
    "Disc. Beban KFTD Upf % (ZD08)": 7.5,
    "Disc. Beban KFTD Upf Amt (ZD08)": 21173,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 1.5,
    "Disc. Pengembalian Upf Amt (ZD10)": 4234,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 21173,
    "Total Penjualan": 261127,
    "Tax Amount": 28725,
    "Total COGS": 268185,
    "Unit Price Pembelian": 3576,
    "Bill Qty in SKU": 75,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82708,
    "Name Salesman": "PASCALIS JINGKAL",
    "PO Number": "1433/apt.sjh",
    "Quotation Number": 2012395246
  },
  {
    "No": 86,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361904,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10063028,
    "Name Bill to": "APOTEK SEJAHTERA",
    "Address": "JL. BARU PASAR LAMA ABEPURA, YOBE, ABEPURA, JAYAPURA",
    "Material": 11000383,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "BETAMETASON 0.1% CR(DUS 25 TUBE@5 GRAM)",
    "Quantity": 3,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 2217,
    "Dis% (ZD01)": 28.0,
    "DisAmt (ZD01)": 46557,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 20.0,
    "Disc. Upfront Amt (ZD07)": 33255,
    "Disc. Beban KFTD Upf % (ZD08)": 2.5,
    "Disc. Beban KFTD Upf Amt (ZD08)": 4157,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 17.5,
    "Disc. Pengembalian Upf Amt (ZD10)": 29098,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 4157,
    "Total Penjualan": 162118,
    "Tax Amount": 17833,
    "Total COGS": 128250,
    "Unit Price Pembelian": 1710,
    "Bill Qty in SKU": 75,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82708,
    "Name Salesman": "PASCALIS JINGKAL",
    "PO Number": "1433/apt.sjh",
    "Quotation Number": 2012395246
  },
  {
    "No": 87,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361904,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10063028,
    "Name Bill to": "APOTEK SEJAHTERA",
    "Address": "JL. BARU PASAR LAMA ABEPURA, YOBE, ABEPURA, JAYAPURA",
    "Material": 11000391,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "GENTAMYCIN 0.1 % (DUS 10 TUBE @ 5 GRAM)",
    "Quantity": 5,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 2670,
    "Dis% (ZD01)": 26.5,
    "DisAmt (ZD01)": 35378,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 18.5,
    "Disc. Upfront Amt (ZD07)": 24698,
    "Disc. Beban KFTD Upf % (ZD08)": 2.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 2670,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 16.5,
    "Disc. Pengembalian Upf Amt (ZD10)": 22028,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 2670,
    "Total Penjualan": 130830,
    "Tax Amount": 14391,
    "Total COGS": 106172,
    "Unit Price Pembelian": 2123,
    "Bill Qty in SKU": 50,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82708,
    "Name Salesman": "PASCALIS JINGKAL",
    "PO Number": "1433/apt.sjh",
    "Quotation Number": 2012395246
  },
  {
    "No": 88,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361904,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10063028,
    "Name Bill to": "APOTEK SEJAHTERA",
    "Address": "JL. BARU PASAR LAMA ABEPURA, YOBE, ABEPURA, JAYAPURA",
    "Material": 11000394,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "HYDROCORTISONE 2.5%CR(DUS 24TUBE@ 5GRAM)",
    "Quantity": 3,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 3458,
    "Dis% (ZD01)": 33.0,
    "DisAmt (ZD01)": 82162,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 25.0,
    "Disc. Upfront Amt (ZD07)": 62244,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 25.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 62244,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 248976,
    "Tax Amount": 27387,
    "Total COGS": 198428,
    "Unit Price Pembelian": 2756,
    "Bill Qty in SKU": 72,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82708,
    "Name Salesman": "PASCALIS JINGKAL",
    "PO Number": "1433/apt.sjh",
    "Quotation Number": 2012395246
  },
  {
    "No": 89,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361906,
    "Posting Status": "C",
    "Bill.Cancel": "X",
    "Bill to party": 10063028,
    "Name Bill to": "APOTEK SEJAHTERA",
    "Address": "JL. BARU PASAR LAMA ABEPURA, YOBE, ABEPURA, JAYAPURA",
    "Material": 12005444,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "ANTASIDA DOEN TAB@100 (NOVA)",
    "Quantity": 1,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 15856,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 15856,
    "Tax Amount": 1744,
    "Total COGS": 14414,
    "Unit Price Pembelian": 144,
    "Bill Qty in SKU": 100,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000034,
    "Name Principle": "NOVAPHARIN",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82708,
    "Name Salesman": "PASCALIS JINGKAL",
    "PO Number": "1433/apt.sjh.",
    "Quotation Number": 2012395247
  },
  {
    "No": 90,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809361906,
    "Posting Status": "C",
    "Bill.Cancel": "X",
    "Bill to party": 10063028,
    "Name Bill to": "APOTEK SEJAHTERA",
    "Address": "JL. BARU PASAR LAMA ABEPURA, YOBE, ABEPURA, JAYAPURA",
    "Material": 12006352,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "GUAIFENESIN 100MG TAB@100 (NOVA)",
    "Quantity": 10,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 7432,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 74320,
    "Tax Amount": 8175,
    "Total COGS": 67570,
    "Unit Price Pembelian": 68,
    "Bill Qty in SKU": 1000,
    "UoM SKU": "TAB",
    "Code Pelayanan": 99,
    "Dec. Pelayanan": "Rutin",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000034,
    "Name Principle": "NOVAPHARIN",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82708,
    "Name Salesman": "PASCALIS JINGKAL",
    "PO Number": "1433/apt.sjh.",
    "Quotation Number": 2012395247
  },
  {
    "No": 91,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809362009,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 20000814,
    "Name Bill to": "PT. KIMIA FARMA APOTEK",
    "Address": "JL. BUDI UTOMO NO.1",
    "Material": 12008262,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "SODIUM CHLORIDE 0.9% 500 ML (SATORIA)",
    "Quantity": 40,
    "Sales Unit": "BT",
    "Unit Price Penjualan": 7260,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 290400,
    "Tax Amount": 31944,
    "Total COGS": 258456,
    "Unit Price Pembelian": 6461,
    "Bill Qty in SKU": 40,
    "UoM SKU": "BT",
    "Code Pelayanan": 0,
    "Dec. Pelayanan": "E-Catalog Reguler",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000212,
    "Name Principle": "SATORIA ANEKA INDUSTRI, PT",
    "Desc. Cust. Grp4": "KFA",
    "Salesman": 82719,
    "Name Salesman": "SINTIKHE HASIANA PUTRI SITUMORANG",
    "PO Number": "POIL76962497",
    "Quotation Number": 2012395460
  },
  {
    "No": 92,
    "Sales Office": 2246,
    "Desc. S.Office": "KFTD Sorong",
    "Posting Date": "2026-08-03",
    "Billing No": 2809362009,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 20000814,
    "Name Bill to": "PT. KIMIA FARMA APOTEK",
    "Address": "JL. BUDI UTOMO NO.1",
    "Material": 12008263,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "RINGER LACTATE 500 ML (SATORIA)",
    "Quantity": 40,
    "Sales Unit": "BT",
    "Unit Price Penjualan": 8040,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 321600,
    "Tax Amount": 35376,
    "Total COGS": 286224,
    "Unit Price Pembelian": 7156,
    "Bill Qty in SKU": 40,
    "UoM SKU": "BT",
    "Code Pelayanan": 0,
    "Dec. Pelayanan": "E-Catalog Reguler",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000212,
    "Name Principle": "SATORIA ANEKA INDUSTRI, PT",
    "Desc. Cust. Grp4": "KFA",
    "Salesman": 82719,
    "Name Salesman": "SINTIKHE HASIANA PUTRI SITUMORANG",
    "PO Number": "POIL76962497",
    "Quotation Number": 2012395460
  },
  {
    "No": 93,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809362010,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007498,
    "Name Bill to": "DINAS KESEHATAN KOTA JAYAPURA",
    "Address": "JL. MEGAPURA SKYLINE KEL. MANDALA KEC. JAYAPURA UTARA",
    "Material": 11000395,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "KETOCONAZOLE 2 % CR (DUS 25 TUB @10 G)",
    "Quantity": 2189,
    "Sales Unit": "TUB",
    "Unit Price Penjualan": 3480,
    "Dis% (ZD01)": 29.0,
    "DisAmt (ZD01)": 2209139,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 21.0,
    "Disc. Upfront Amt (ZD07)": 1599721,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 21.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 1599721,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 7617720,
    "Tax Amount": 837949,
    "Total COGS": 6756130,
    "Unit Price Pembelian": 3086,
    "Bill Qty in SKU": 2189,
    "UoM SKU": "TUB",
    "Code Pelayanan": 82,
    "Dec. Pelayanan": "Ekatalog",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Dinkes",
    "Salesman": 82674,
    "Name Salesman": "NANDA SUHADINATA KUSUMA PUTRA",
    "PO Number": "EP-01KW8V8Z56DZ4401C",
    "Quotation Number": 2012395799
  },
  {
    "No": 94,
    "Sales Office": 2242,
    "Desc. S.Office": "KFTD Kendari",
    "Posting Date": "2026-08-03",
    "Billing No": 2809362011,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10008588,
    "Name Bill to": "TOKO KOSMETIK BEAUTY",
    "Address": "MT. HARYONO NO. 27 KEL. BENDE KEC. KADIA",
    "Material": 11002215,
    "Material Group 1": 105,
    "Desc Material Group 1": "KOSMETIK",
    "Text Material": "MARCKS TEENS CP PINK (NEW)",
    "Quantity": 9,
    "Sales Unit": "PC",
    "Unit Price Penjualan": 20000,
    "Dis% (ZD01)": 14.56,
    "DisAmt (ZD01)": 26208,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 4.06,
    "Disc. Upfront Amt (ZD07)": 7308,
    "Disc. Beban KFTD Upf % (ZD08)": 2.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 3600,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 2.06,
    "Disc. Pengembalian Upf Amt (ZD10)": 3708,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 3600,
    "Total Penjualan": 176400,
    "Tax Amount": 19404,
    "Total COGS": 153792,
    "Unit Price Pembelian": 17088,
    "Bill Qty in SKU": 9,
    "UoM SKU": "PC",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "KOSMETIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Wholesaler",
    "Salesman": 80400,
    "Name Salesman": "MUHAMMAD RADJIB. K,SE",
    "PO Number": "01/abs-26073100",
    "Quotation Number": 2012391442
  },
  {
    "No": 95,
    "Sales Office": 2242,
    "Desc. S.Office": "KFTD Kendari",
    "Posting Date": "2026-08-03",
    "Billing No": 2809362011,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10008588,
    "Name Bill to": "TOKO KOSMETIK BEAUTY",
    "Address": "MT. HARYONO NO. 27 KEL. BENDE KEC. KADIA",
    "Material": 11002217,
    "Material Group 1": 105,
    "Desc Material Group 1": "KOSMETIK",
    "Text Material": "MARCKS TEENS CP NATURAL BEIGE (NEW)",
    "Quantity": 24,
    "Sales Unit": "PC",
    "Unit Price Penjualan": 20000,
    "Dis% (ZD01)": 14.41,
    "DisAmt (ZD01)": 69168,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 3.91,
    "Disc. Upfront Amt (ZD07)": 18768,
    "Disc. Beban KFTD Upf % (ZD08)": 2.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 9600,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 1.91,
    "Disc. Pengembalian Upf Amt (ZD10)": 9168,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 9600,
    "Total Penjualan": 470400,
    "Tax Amount": 51744,
    "Total COGS": 410832,
    "Unit Price Pembelian": 17118,
    "Bill Qty in SKU": 24,
    "UoM SKU": "PC",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "KOSMETIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Wholesaler",
    "Salesman": 80400,
    "Name Salesman": "MUHAMMAD RADJIB. K,SE",
    "PO Number": "01/abs-26073100",
    "Quotation Number": 2012391442
  },
  {
    "No": 96,
    "Sales Office": 2242,
    "Desc. S.Office": "KFTD Kendari",
    "Posting Date": "2026-08-03",
    "Billing No": 2809362011,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10008588,
    "Name Bill to": "TOKO KOSMETIK BEAUTY",
    "Address": "MT. HARYONO NO. 27 KEL. BENDE KEC. KADIA",
    "Material": 11002763,
    "Material Group 1": 105,
    "Desc Material Group 1": "KOSMETIK",
    "Text Material": "MARCKS CLASSIC ROSE 40GR (NEW FORM)",
    "Quantity": 13,
    "Sales Unit": "PC",
    "Unit Price Penjualan": 17300,
    "Dis% (ZD01)": 16.5,
    "DisAmt (ZD01)": 37109,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 6.0,
    "Disc. Upfront Amt (ZD07)": 13494,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 6.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 13494,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 224900,
    "Tax Amount": 24739,
    "Total COGS": 164716,
    "Unit Price Pembelian": 12670,
    "Bill Qty in SKU": 13,
    "UoM SKU": "PC",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "KOSMETIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Wholesaler",
    "Salesman": 80400,
    "Name Salesman": "MUHAMMAD RADJIB. K,SE",
    "PO Number": "01/abs-26073100",
    "Quotation Number": 2012391442
  },
  {
    "No": 97,
    "Sales Office": 2247,
    "Desc. S.Office": "KFTD Jayapura",
    "Posting Date": "2026-08-03",
    "Billing No": 2809362012,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10007498,
    "Name Bill to": "DINAS KESEHATAN KOTA JAYAPURA",
    "Address": "JL. MEGAPURA SKYLINE KEL. MANDALA KEC. JAYAPURA UTARA",
    "Material": 12020170,
    "Material Group 1": 250,
    "Desc Material Group 1": "PIHAK 3",
    "Text Material": "CLINDAMYCIN 150 MG (NOVA)",
    "Quantity": 148,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 66900,
    "Dis% (ZD01)": 0.0,
    "DisAmt (ZD01)": 0,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 0.0,
    "Disc. Upfront Amt (ZD07)": 0,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 0.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 0,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 9901200,
    "Tax Amount": 1089132,
    "Total COGS": 6933208,
    "Unit Price Pembelian": 468,
    "Bill Qty in SKU": 14800,
    "UoM SKU": "KPS",
    "Code Pelayanan": 20,
    "Dec. Pelayanan": "Kontrak -E-KATALOG",
    "Prod. Hierarchy3": "Generik",
    "Principle": 7000000034,
    "Name Principle": "NOVAPHARIN",
    "Desc. Cust. Grp4": "Dinkes",
    "Salesman": 82674,
    "Name Salesman": "NANDA SUHADINATA KUSUMA PUTRA",
    "PO Number": "EP-01KSKRXC9RF31TV5X",
    "Quotation Number": 2012395841
  },
  {
    "No": 98,
    "Sales Office": 2242,
    "Desc. S.Office": "KFTD Kendari",
    "Posting Date": "2026-08-03",
    "Billing No": 2809362013,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10078533,
    "Name Bill to": "APOTEK RAWUA FARMA",
    "Address": "KEL. RAWUA, SAMPARA",
    "Material": 11001448,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "AMLODIPINE 5 MG (DUS 50 TAB)-BJN",
    "Quantity": 108,
    "Sales Unit": "DUS",
    "Unit Price Penjualan": 28500,
    "Dis% (ZD01)": 81.6,
    "DisAmt (ZD01)": 2511648,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 55.0,
    "Disc. Upfront Amt (ZD07)": 1692900,
    "Disc. Beban KFTD Upf % (ZD08)": 40.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 1231200,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 15.0,
    "Disc. Pengembalian Upf Amt (ZD10)": 461700,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 1231200,
    "Total Penjualan": 1846800,
    "Tax Amount": 203148,
    "Total COGS": 550584,
    "Unit Price Pembelian": 102,
    "Bill Qty in SKU": 5400,
    "UoM SKU": "TAB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82327,
    "Name Salesman": "ARJUNA",
    "PO Number": "1483",
    "Quotation Number": 2012395298
  },
  {
    "No": 99,
    "Sales Office": 2242,
    "Desc. S.Office": "KFTD Kendari",
    "Posting Date": "2026-08-03",
    "Billing No": 2809362013,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10078533,
    "Name Bill to": "APOTEK RAWUA FARMA",
    "Address": "KEL. RAWUA, SAMPARA",
    "Material": 11002221,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "PERMETHRIN KRIM 5% (PACK 16 TUBE @ 10 G)",
    "Quantity": 14,
    "Sales Unit": "TUB",
    "Unit Price Penjualan": 18000,
    "Dis% (ZD01)": 65.19,
    "DisAmt (ZD01)": 164279,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 57.19,
    "Disc. Upfront Amt (ZD07)": 144119,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 57.19,
    "Disc. Pengembalian Upf Amt (ZD10)": 144119,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 252000,
    "Tax Amount": 27720,
    "Total COGS": 87721,
    "Unit Price Pembelian": 6266,
    "Bill Qty in SKU": 14,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82327,
    "Name Salesman": "ARJUNA",
    "PO Number": "1483",
    "Quotation Number": 2012395298
  },
  {
    "No": 100,
    "Sales Office": 2242,
    "Desc. S.Office": "KFTD Kendari",
    "Posting Date": "2026-08-03",
    "Billing No": 2809362013,
    "Posting Status": "C",
    "Bill.Cancel": null,
    "Bill to party": 10078533,
    "Name Bill to": "APOTEK RAWUA FARMA",
    "Address": "KEL. RAWUA, SAMPARA",
    "Material": 11002221,
    "Material Group 1": 106,
    "Desc Material Group 1": "OGB",
    "Text Material": "PERMETHRIN KRIM 5% (PACK 16 TUBE @ 10 G)",
    "Quantity": 2,
    "Sales Unit": "TUB",
    "Unit Price Penjualan": 18000,
    "Dis% (ZD01)": 65.19,
    "DisAmt (ZD01)": 23468,
    "Dis% (ZD02)": 0,
    "DisAmt (ZD02)": 0,
    "Dis% (ZD03)": 0.0,
    "DisAmt (ZD03)": 0,
    "Dis% (ZD04)": 0,
    "DisAmt (ZD04)": 0,
    "Dis% (ZD05)": 0.0,
    "DisAmt (ZD05)": 0,
    "Dis% (ZD06)": 0,
    "DisAmt (ZD06)": 0,
    "Disc. Upfront % (ZD07)": 57.19,
    "Disc. Upfront Amt (ZD07)": 20588,
    "Disc. Beban KFTD Upf % (ZD08)": 0.0,
    "Disc. Beban KFTD Upf Amt (ZD08)": 0,
    "Disc. Beban Principle Upf % (ZD09)": 0,
    "Disc. Beban Principle Upf Amt (ZD09)": 0,
    "Disc. Pengembalian Upf % (ZD10)": 57.19,
    "Disc. Pengembalian Upf Amt (ZD10)": 20588,
    "Dis% (ZD12)": 0,
    "DisAmt (ZD12)": 0,
    "Dis% (ZD14)": 0,
    "DisAmt (ZD14)": 0,
    "Dis% (ZD15)": 0,
    "DisAmt (ZD15)": 0,
    "Total Discount": 0,
    "Total Penjualan": 36000,
    "Tax Amount": 3960,
    "Total COGS": 12532,
    "Unit Price Pembelian": 6266,
    "Bill Qty in SKU": 2,
    "UoM SKU": "TUB",
    "Code Pelayanan": 81,
    "Dec. Pelayanan": "Reguler",
    "Prod. Hierarchy3": "GENERIK",
    "Principle": 7000000000,
    "Name Principle": "KIMIA FARMA",
    "Desc. Cust. Grp4": "Apotek",
    "Salesman": 82327,
    "Name Salesman": "ARJUNA",
    "PO Number": "1483",
    "Quotation Number": 2012395298
  }
];

// =====================================================
// DATA TAMBAHAN - TOP & TANGGAL JATUH TEMPO
// =====================================================
// TOP belum tersedia di data dummy sumber.
// Untuk kebutuhan tampilan, setiap transaksi menggunakan TOP 30 hari.
// Jika nanti TOP berasal dari API/Excel, cukup ganti nilai "TOP"
// pada masing-masing item dan Tanggal Jatuh Tempo akan otomatis dihitung.
const dummyDataWithTOP = dummyData.map((item) => ({
  ...item,
  TOP:
    item["TOP"] !== undefined &&
    item["TOP"] !== null &&
    item["TOP"] !== ""
      ? Number(item["TOP"])
      : 30,
}));

// =====================================================
// HELPER
// =====================================================

const formatNumber = (value) => {
  if (value === null || value === undefined || value === "") return "-";

  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 2,
  }).format(Number(value));
};

const formatRupiah = (value) => {
  if (value === null || value === undefined || value === "") {
    return "Rp0";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(value));
};

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const addDaysToDate = (dateValue, days) => {
  if (!dateValue) return null;

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return null;

  date.setDate(date.getDate() + Number(days || 0));

  return date.toISOString().split("T")[0];
};

const getTanggalJatuhTempo = (item) => {
  if (!item) return null;

  return addDaysToDate(
    item["Posting Date"],
    item["TOP"]
  );
};

const formatTOP = (value) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return `${Number(value)} Hari`;
};

const displayValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return value;
};

// =====================================================
// STATUS
// =====================================================

const renderPostingStatus = (status) => {
  const statusMap = {
    C: {
      label: "Posted",
      className: "bg-green-100 text-green-700",
    },
    D: {
      label: "Draft",
      className: "bg-yellow-100 text-yellow-700",
    },
    X: {
      label: "Cancelled",
      className: "bg-red-100 text-red-700",
    },
  };

  const current = statusMap[status] || {
    label: status || "-",
    className: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1.5
        rounded-full
        text-xs
        font-semibold
        whitespace-nowrap
        ${current.className}
      `}
    >
      {current.label}
    </span>
  );
};

// =====================================================
// KOLOM UTAMA
// =====================================================

const mainColumns = [
  {
    key: "No",
    label: "No",
    icon: <FaHashtag />,
    type: "number",
  },
  {
    key: "Sales Office",
    label: "Sales Office",
    icon: <FaBuilding />,
    type: "plainNumber",
  },
  {
    key: "Desc. S.Office",
    label: "Nama Sales Office",
    icon: <FaBuilding />,
  },
  {
    key: "Posting Date",
    label: "Posting Date",
    icon: <FaCalendarAlt />,
    type: "date",
  },
  {
    key: "TOP",
    label: "TOP",
    icon: <FaCalendarAlt />,
    type: "top",
  },
  {
    key: "Tanggal Jatuh Tempo",
    label: "Tanggal Jatuh Tempo",
    icon: <FaCalendarAlt />,
    type: "dueDate",
  },
  {
    key: "Billing No",
    label: "Billing No",
    icon: <FaFileInvoiceDollar />,
    type: "plainNumber",
  },
  {
    key: "Posting Status",
    label: "Status",
    icon: <FaClipboardList />,
    type: "status",
  },
  {
    key: "Bill.Cancel",
    label: "Bill Cancel",
    icon: <FaTimes />,
  },
  {
    key: "Bill to party",
    label: "Bill to Party",
    icon: <FaBuilding />,
    type: "plainNumber",
  },
  {
    key: "Name Bill to",
    label: "Customer",
    icon: <FaBuilding />,
  },
  {
    key: "Address",
    label: "Address",
    icon: <FaBuilding />,
  },
  {
    key: "Material",
    label: "Material",
    icon: <FaBox />,
    type: "plainNumber",
  },
  {
    key: "Material Group 1",
    label: "Material Group",
    icon: <FaTag />,
    type: "number",
  },
  {
    key: "Desc Material Group 1",
    label: "Desc. Material Group",
    icon: <FaTag />,
  },
  {
    key: "Text Material",
    label: "Text Material",
    icon: <FaBox />,
  },
  {
    key: "Quantity",
    label: "Quantity",
    icon: <FaChartLine />,
    type: "number",
  },
  {
    key: "Sales Unit",
    label: "Sales Unit",
    icon: <FaBox />,
  },
  {
    key: "Unit Price Penjualan",
    label: "Harga Jual",
    icon: <FaMoneyBillWave />,
    type: "currency",
  },
  {
    key: "Total Discount",
    label: "Total Discount",
    icon: <FaPercentage />,
    type: "currency",
  },
  {
    key: "Total Penjualan",
    label: "Total Penjualan",
    icon: <FaMoneyBillWave />,
    type: "currency",
  },
  {
    key: "Tax Amount",
    label: "Tax Amount",
    icon: <FaMoneyBillWave />,
    type: "currency",
  },
  {
    key: "Total COGS",
    label: "Total COGS",
    icon: <FaMoneyBillWave />,
    type: "currency",
  },
  {
    key: "Persentase COGS",
    label: "Persentase COGS",
    icon: <FaPercentage />,
    type: "calculatedPercentCOGS",
  },
  {
    key: "Margin",
    label: "Margin",
    icon: <FaMoneyBillWave />,
    type: "calculatedMargin",
  },
  {
    key: "Persentase Margin",
    label: "Persentase Margin",
    icon: <FaPercentage />,
    type: "calculatedPercentMargin",
  },
  {
    key: "Principle",
    label: "Principle",
    icon: <FaBuilding />,
    type: "plainNumber",
  },
  {
    key: "Name Principle",
    label: "Nama Principle",
    icon: <FaBuilding />,
  },
  {
    key: "Desc. Cust. Grp4",
    label: "Customer Group",
    icon: <FaBuilding />,
  },
  {
    key: "Salesman",
    label: "Salesman",
    icon: <FaUser />,
    type: "plainNumber",
  },
  {
    key: "Name Salesman",
    label: "Nama Salesman",
    icon: <FaUser />,
  },
  {
    key: "PO Number",
    label: "PO Number",
    icon: <FaFileInvoiceDollar />,
  },
  {
    key: "Quotation Number",
    label: "Quotation Number",
    icon: <FaFileInvoiceDollar />,
    type: "plainNumber",
  },
];

// =====================================================
// DETAIL - SELURUH KOLOM EXCEL
// =====================================================

const detailGroups = [
  {
    title: "Informasi Billing",
    fields: [
      ["No", "No", "number"],
      ["Sales Office", "Sales Office", "plainNumber"],
      ["Desc. S.Office", "Desc. S.Office"],
      ["Posting Date", "Posting Date", "date"],
      ["TOP", "TOP", "top"],
      ["Tanggal Jatuh Tempo", "Tanggal Jatuh Tempo", "dueDate"],
      ["Billing No", "Billing No", "plainNumber"],
      ["Posting Status", "Posting Status"],
      ["Bill.Cancel", "Bill.Cancel"],
    ],
  },
  {
    title: "Customer",
    fields: [
      ["Bill to party", "Bill to party", "plainNumber"],
      ["Name Bill to", "Name Bill to"],
      ["Address", "Address"],
    ],
  },
  {
    title: "Material & Penjualan",
    fields: [
      ["Material", "Material", "plainNumber"],
      ["Material Group 1", "Material Group 1", "number"],
      ["Desc Material Group 1", "Desc Material Group 1"],
      ["Text Material", "Text Material"],
      ["Quantity", "Quantity", "number"],
      ["Sales Unit", "Sales Unit"],
      ["Unit Price Penjualan", "Unit Price Penjualan", "currency"],
    ],
  },
  {
    title: "Discount ZD01 - ZD06",
    fields: [
      ["Dis% (ZD01)", "Dis% (ZD01)", "percent"],
      ["DisAmt (ZD01)", "DisAmt (ZD01)", "currency"],
      ["Dis% (ZD02)", "Dis% (ZD02)", "percent"],
      ["DisAmt (ZD02)", "DisAmt (ZD02)", "currency"],
      ["Dis% (ZD03)", "Dis% (ZD03)", "percent"],
      ["DisAmt (ZD03)", "DisAmt (ZD03)", "currency"],
      ["Dis% (ZD04)", "Dis% (ZD04)", "percent"],
      ["DisAmt (ZD04)", "DisAmt (ZD04)", "currency"],
      ["Dis% (ZD05)", "Dis% (ZD05)", "percent"],
      ["DisAmt (ZD05)", "DisAmt (ZD05)", "currency"],
      ["Dis% (ZD06)", "Dis% (ZD06)", "percent"],
      ["DisAmt (ZD06)", "DisAmt (ZD06)", "currency"],
    ],
  },
  {
    title: "Discount Upfront ZD07 - ZD10",
    fields: [
      ["Disc. Upfront % (ZD07)", "Disc. Upfront % (ZD07)", "percent"],
      ["Disc. Upfront Amt (ZD07)", "Disc. Upfront Amt (ZD07)", "currency"],
      ["Disc. Beban KFTD Upf % (ZD08)", "Disc. Beban KFTD Upf % (ZD08)", "percent"],
      ["Disc. Beban KFTD Upf Amt (ZD08)", "Disc. Beban KFTD Upf Amt (ZD08)", "currency"],
      ["Disc. Beban Principle Upf % (ZD09)", "Disc. Beban Principle Upf % (ZD09)", "percent"],
      ["Disc. Beban Principle Upf Amt (ZD09)", "Disc. Beban Principle Upf Amt (ZD09)", "currency"],
      ["Disc. Pengembalian Upf % (ZD10)", "Disc. Pengembalian Upf % (ZD10)", "percent"],
      ["Disc. Pengembalian Upf Amt (ZD10)", "Disc. Pengembalian Upf Amt (ZD10)", "currency"],
    ],
  },
  {
    title: "Discount ZD12 - ZD15",
    fields: [
      ["Dis% (ZD12)", "Dis% (ZD12)", "percent"],
      ["DisAmt (ZD12)", "DisAmt (ZD12)", "currency"],
      ["Dis% (ZD14)", "Dis% (ZD14)", "percent"],
      ["DisAmt (ZD14)", "DisAmt (ZD14)", "currency"],
      ["Dis% (ZD15)", "Dis% (ZD15)", "percent"],
      ["DisAmt (ZD15)", "DisAmt (ZD15)", "currency"],
      ["Total Discount", "Total Discount", "currency"],
    ],
  },
  {
    title: "Nilai Transaksi",
    fields: [
      ["Total Penjualan", "Total Penjualan", "currency"],
      ["Tax Amount", "Tax Amount", "currency"],
      ["Total COGS", "Total COGS", "currency"],
      ["Persentase COGS", "Persentase COGS", "calculatedPercentCOGS"],
      ["Margin", "Margin", "calculatedMargin"],
      ["Persentase Margin", "Persentase Margin", "calculatedPercentMargin"],
      ["Unit Price Pembelian", "Unit Price Pembelian", "currency"],
      ["Bill Qty in SKU", "Bill Qty in SKU", "number"],
      ["UoM SKU", "UoM SKU"],
    ],
  },
  {
    title: "Pelayanan & Produk",
    fields: [
      ["Code Pelayanan", "Code Pelayanan", "number"],
      ["Dec. Pelayanan", "Dec. Pelayanan"],
      ["Prod. Hierarchy3", "Prod. Hierarchy3"],
      ["Principle", "Principle", "plainNumber"],
      ["Name Principle", "Name Principle"],
      ["Desc. Cust. Grp4", "Desc. Cust. Grp4"],
    ],
  },
  {
    title: "Sales & Referensi",
    fields: [
      ["Salesman", "Salesman", "plainNumber"],
      ["Name Salesman", "Name Salesman"],
      ["PO Number", "PO Number"],
      ["Quotation Number", "Quotation Number", "plainNumber"],
    ],
  },
];

// =====================================================
// CALCULATION - COGS & MARGIN
// =====================================================

const getCalculatedValue = (item, key) => {
  const totalPenjualan = Number(item?.["Total Penjualan"] || 0);
  const totalCOGS = Number(item?.["Total COGS"] || 0);

  if (key === "Persentase COGS") {
    return totalPenjualan !== 0
      ? (totalCOGS / totalPenjualan) * 100
      : 0;
  }

  if (key === "Margin") {
    return totalPenjualan - totalCOGS;
  }

  if (key === "Persentase Margin") {
    const margin = totalPenjualan - totalCOGS;
    return totalPenjualan !== 0
      ? (margin / totalPenjualan) * 100
      : 0;
  }

  return 0;
};

const formatPercent = (value) => {
  if (value === null || value === undefined || value === "") {
    return "0%";
  }

  return `${new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value))}%`;
};

// =====================================================
// FORMAT DETAIL
// =====================================================

const formatFieldValue = (value, type, item = null) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (type === "date") {
    return formatDate(value);
  }

  if (type === "top") {
    return formatTOP(value);
  }

  if (type === "dueDate") {
    return formatDate(
      item ? getTanggalJatuhTempo(item) : value
    );
  }

  if (type === "currency") {
    return formatRupiah(value);
  }

  if (type === "plainNumber") {
    return String(value);
  }

  if (type === "percent") {
    return formatPercent(value);
  }

  if (type === "calculatedPercentCOGS") {
    return formatPercent(getCalculatedValue(item, "Persentase COGS"));
  }

  if (type === "calculatedMargin") {
    return formatRupiah(getCalculatedValue(item, "Margin"));
  }

  if (type === "calculatedPercentMargin") {
    return formatPercent(getCalculatedValue(item, "Persentase Margin"));
  }

  if (type === "number") {
    return formatNumber(value);
  }

  return value;
};

// =====================================================
// COMPONENT
// =====================================================

const TableMasterFaktur = ({
  dimensionScreenW,
  check,
  loginAccess,
  reloadData,
  setReloadData,
}) => {
  const [tableData, setTableData] = useState(dummyDataWithTOP);

  const [keyword, setKeyword] = useState("");
  const [filterSalesOffice, setFilterSalesOffice] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterCustomerGroup, setFilterCustomerGroup] = useState("ALL");
  const [filterPrinciple, setFilterPrinciple] = useState("ALL");

  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [loading, setLoading] = useState(false);

  const [selectedData, setSelectedData] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  // ===================================================
  // OPTIONS FILTER
  // ===================================================

  const salesOfficeOptions = useMemo(() => {
    return [
      "ALL",
      ...new Set(
        tableData
          .map((item) => item["Desc. S.Office"])
          .filter(Boolean)
      ),
    ];
  }, [tableData]);

  const statusOptions = useMemo(() => {
    return [
      "ALL",
      ...new Set(
        tableData
          .map((item) => item["Posting Status"])
          .filter(Boolean)
      ),
    ];
  }, [tableData]);

  const customerGroupOptions = useMemo(() => {
    return [
      "ALL",
      ...new Set(
        tableData
          .map((item) => item["Desc. Cust. Grp4"])
          .filter(Boolean)
      ),
    ];
  }, [tableData]);

  const principleOptions = useMemo(() => {
    return [
      "ALL",
      ...new Set(
        tableData
          .map((item) => item["Name Principle"])
          .filter(Boolean)
      ),
    ];
  }, [tableData]);

  // ===================================================
  // FILTER DATA
  // ===================================================

  const filteredData = useMemo(() => {
    let data = [...tableData];

    if (keyword.trim()) {
      const search = keyword.toLowerCase().trim();

      data = data.filter((item) => {
        return [
          "Billing No",
          "Bill to party",
          "Name Bill to",
          "Address",
          "Material",
          "Text Material",
          "Principle",
          "Name Principle",
          "Salesman",
          "Name Salesman",
          "PO Number",
          "Quotation Number",
          "Desc. S.Office",
        ].some((key) =>
          String(item[key] ?? "")
            .toLowerCase()
            .includes(search)
        );
      });
    }

    if (filterSalesOffice !== "ALL") {
      data = data.filter(
        (item) =>
          item["Desc. S.Office"] === filterSalesOffice
      );
    }

    if (filterStatus !== "ALL") {
      data = data.filter(
        (item) =>
          item["Posting Status"] === filterStatus
      );
    }

    if (filterCustomerGroup !== "ALL") {
      data = data.filter(
        (item) =>
          item["Desc. Cust. Grp4"] ===
          filterCustomerGroup
      );
    }

    if (filterPrinciple !== "ALL") {
      data = data.filter(
        (item) =>
          item["Name Principle"] === filterPrinciple
      );
    }

    // FILTER TANGGAL POSTING DATE
    if (filterStartDate) {
      data = data.filter((item) => {
        const postingDate = String(
          item["Posting Date"] || ""
        ).slice(0, 10);

        return postingDate >= filterStartDate;
      });
    }

    if (filterEndDate) {
      data = data.filter((item) => {
        const postingDate = String(
          item["Posting Date"] || ""
        ).slice(0, 10);

        return postingDate <= filterEndDate;
      });
    }

    return data;
  }, [
    tableData,
    keyword,
    filterSalesOffice,
    filterStatus,
    filterCustomerGroup,
    filterPrinciple,
    filterStartDate,
    filterEndDate,
  ]);

  // ===================================================
  // PAGINATION
  // ===================================================

  const totalData = filteredData.length;

  const totalPage = Math.ceil(
    totalData / perPage
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // ===================================================
  // SUMMARY
  // ===================================================

  const summaryData = useMemo(() => {
    const total = filteredData.length;

    const totalPenjualan = filteredData.reduce(
      (sum, item) =>
        sum + Number(item["Total Penjualan"] || 0),
      0
    );

    const totalTax = filteredData.reduce(
      (sum, item) =>
        sum + Number(item["Tax Amount"] || 0),
      0
    );

    const totalCOGS = filteredData.reduce(
      (sum, item) =>
        sum + Number(item["Total COGS"] || 0),
      0
    );

    const totalMargin =
      totalPenjualan - totalCOGS;

    const totalDiscount = filteredData.reduce(
      (sum, item) =>
        sum + Number(item["Total Discount"] || 0),
      0
    );

    const totalQuantity = filteredData.reduce(
      (sum, item) =>
        sum + Number(item["Quantity"] || 0),
      0
    );

    const totalBilling = new Set(
      filteredData
        .map((item) => item["Billing No"])
        .filter(Boolean)
    ).size;

    const totalCustomer = new Set(
      filteredData
        .map((item) => item["Bill to party"])
        .filter(Boolean)
    ).size;

    return {
      total,
      totalBilling,
      totalCustomer,
      totalQuantity,
      totalPenjualan,
      totalTax,
      totalCOGS,
      totalMargin,
      totalDiscount,
    };
  }, [filteredData]);

  // ===================================================
  // RESET PAGE
  // ===================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    keyword,
    filterSalesOffice,
    filterStatus,
    filterCustomerGroup,
    filterPrinciple,
    filterStartDate,
    filterEndDate,
    perPage,
  ]);

  // ===================================================
  // LOADING
  // ===================================================

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [
    currentPage,
    perPage,
    keyword,
    filterSalesOffice,
    filterStatus,
    filterCustomerGroup,
    filterPrinciple,
  ]);

  // ===================================================
  // RELOAD
  // ===================================================

  useEffect(() => {
    if (reloadData) {
      setTableData(dummyDataWithTOP);

      if (setReloadData) {
        setReloadData(false);
      }
    }
  }, [reloadData, setReloadData]);

  // ===================================================
  // RESET FILTER
  // ===================================================

  const resetFilter = () => {
    setKeyword("");
    setFilterSalesOffice("ALL");
    setFilterStatus("ALL");
    setFilterCustomerGroup("ALL");
    setFilterPrinciple("ALL");
    setFilterStartDate("");
    setFilterEndDate("");
    setCurrentPage(1);
  };

  // ===================================================
  // DELETE
  // ===================================================

  const handleDelete = async (data) => {
    const billingNo = data["Billing No"];

    const result = await swal.confirm(
      "Hapus Data Penjualan",
      `Apakah transaksi Billing No ${billingNo} akan dihapus?`
    );

    if (!result) return;

    setLoading(true);

    setTimeout(async () => {
      setTableData((prev) =>
        prev.filter(
          (item) =>
            !(
              item["No"] === data["No"] &&
              item["Billing No"] === billingNo
            )
        )
      );

      setLoading(false);

      await swal.success(
        "Data penjualan berhasil dihapus"
      );
    }, 300);
  };

  // ===================================================
  // DETAIL
  // ===================================================

  const handleDetail = (data) => {
    setSelectedData(data);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedData(null);
  };

  // ===================================================
  // PAGINATION INFO
  // ===================================================

  const startIndex =
    totalData > 0
      ? (currentPage - 1) * perPage + 1
      : 0;

  const endIndex = Math.min(
    currentPage * perPage,
    totalData
  );

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div
      className="
        flex
        flex-col
        gap-5
      "
    >
      {/* ================================================= */}
      {/* SEARCH + FILTER */}
      {/* ================================================= */}

      <div
        className="
          flex
          flex-col
          gap-4
        "
      >
        <div
          className="
            flex
            flex-col
            lg:flex-row
            justify-between
            gap-4
            items-stretch
            lg:items-center
          "
        >
          <div
            className="
              input
              input-sm
              input-bordered
              flex
              items-center
              gap-2
              bg-white
              rounded-full
              border-gray-200
              shadow-sm
              w-full
              lg:w-[460px]
            "
          >
            <FaSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="
                Cari billing / customer / material / salesman...
              "
              className="grow"
              value={keyword}
              onChange={(e) =>
                setKeyword(e.target.value)
              }
            />
          </div>

          <button
            type="button"
            onClick={resetFilter}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-4
              py-2
              rounded-full
              border
              border-gray-200
              bg-white
              text-gray-600
              text-sm
              font-semibold
              hover:bg-gray-50
            "
          >
            <FaFilter />
            Reset Filter
          </button>
        </div>

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <select
            className="
              select
              select-sm
              select-bordered
              rounded-full
              bg-white
              min-w-[190px]
            "
            value={filterSalesOffice}
            onChange={(e) =>
              setFilterSalesOffice(e.target.value)
            }
          >
            <option value="ALL">
              Semua Sales Office
            </option>

            {salesOfficeOptions
              .filter((item) => item !== "ALL")
              .map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>

          <select
            className="
              select
              select-sm
              select-bordered
              rounded-full
              bg-white
              min-w-[170px]
            "
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value)
            }
          >
            <option value="ALL">
              Semua Status
            </option>

            {statusOptions
              .filter((item) => item !== "ALL")
              .map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>

          <select
            className="
              select
              select-sm
              select-bordered
              rounded-full
              bg-white
              min-w-[180px]
            "
            value={filterCustomerGroup}
            onChange={(e) =>
              setFilterCustomerGroup(e.target.value)
            }
          >
            <option value="ALL">
              Semua Customer Group
            </option>

            {customerGroupOptions
              .filter((item) => item !== "ALL")
              .map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>

          <select
            className="
              select
              select-sm
              select-bordered
              rounded-full
              bg-white
              min-w-[180px]
            "
            value={filterPrinciple}
            onChange={(e) =>
              setFilterPrinciple(e.target.value)
            }
          >
            <option value="ALL">
              Semua Principle
            </option>

            {principleOptions
              .filter((item) => item !== "ALL")
              .map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>

          <div
            className="
              flex
              items-center
              gap-2
              bg-white
              border
              border-gray-200
              rounded-full
              px-3
              h-8
              shadow-sm
            "
          >
            <FaCalendarAlt className="text-primary text-sm" />

            <input
              type="date"
              value={filterStartDate}
              max={filterEndDate || undefined}
              onChange={(e) =>
                setFilterStartDate(e.target.value)
              }
              className="
                text-sm
                bg-transparent
                outline-none
                text-gray-600
                w-[125px]
              "
              title="Tanggal mulai"
            />

            <span className="text-gray-300">-</span>

            <input
              type="date"
              value={filterEndDate}
              min={filterStartDate || undefined}
              onChange={(e) =>
                setFilterEndDate(e.target.value)
              }
              className="
                text-sm
                bg-transparent
                outline-none
                text-gray-600
                w-[125px]
              "
              title="Tanggal akhir"
            />
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* SUMMARY */}
      {/* ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-5
          gap-4
        "
      >
        <div
          className="
            rounded-2xl
            bg-blue-50
            border
            border-blue-100
            p-4
          "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-blue-700">
                Total Transaksi
              </p>

              <p className="text-2xl font-bold text-blue-900">
                {summaryData.total}
              </p>
            </div>

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-blue-100
                flex
                items-center
                justify-center
              "
            >
              <FaClipboardList className="text-blue-600" />
            </div>
          </div>
        </div>

        <div
          className="
            rounded-2xl
            bg-green-50
            border
            border-green-100
            p-4
          "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-green-700">
                Total Billing
              </p>

              <p className="text-2xl font-bold text-green-900">
                {summaryData.totalBilling}
              </p>
            </div>

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-green-100
                flex
                items-center
                justify-center
              "
            >
              <FaFileInvoiceDollar className="text-green-600" />
            </div>
          </div>
        </div>

        <div
          className="
            rounded-2xl
            bg-purple-50
            border
            border-purple-100
            p-4
          "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-purple-700">
                Total Penjualan
              </p>

              <p className="text-xl font-bold text-purple-900">
                {formatRupiah(
                  summaryData.totalPenjualan
                )}
              </p>
            </div>

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-purple-100
                flex
                items-center
                justify-center
              "
            >
              <FaMoneyBillWave className="text-purple-600" />
            </div>
          </div>
        </div>

        <div
          className="
            rounded-2xl
            bg-orange-50
            border
            border-orange-100
            p-4
          "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-orange-700">
                Total COGS
              </p>

              <p className="text-xl font-bold text-orange-900">
                {formatRupiah(
                  summaryData.totalCOGS
                )}
              </p>
            </div>

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-orange-100
                flex
                items-center
                justify-center
              "
            >
              <FaWarehouse className="text-orange-600" />
            </div>
          </div>
        </div>

        <div
          className="
            rounded-2xl
            bg-emerald-50
            border
            border-emerald-100
            p-4
          "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-emerald-700">
                Total Margin
              </p>

              <p className="text-xl font-bold text-emerald-900">
                {formatRupiah(
                  summaryData.totalMargin
                )}
              </p>
            </div>

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-emerald-100
                flex
                items-center
                justify-center
              "
            >
              <FaChartLine className="text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* EXTRA SUMMARY */}
      {/* ================================================= */}

      <div
        className="
          flex
          flex-wrap
          gap-3
          text-sm
        "
      >
        <span
          className="
            px-4
            py-2
            rounded-full
            bg-gray-100
            text-gray-700
            font-semibold
          "
        >
          Customer: {summaryData.totalCustomer}
        </span>

        <span
          className="
            px-4
            py-2
            rounded-full
            bg-gray-100
            text-gray-700
            font-semibold
          "
        >
          Quantity: {formatNumber(summaryData.totalQuantity)}
        </span>

        <span
          className="
            px-4
            py-2
            rounded-full
            bg-gray-100
            text-gray-700
            font-semibold
          "
        >
          Tax: {formatRupiah(summaryData.totalTax)}
        </span>

        <span
          className="
            px-4
            py-2
            rounded-full
            bg-gray-100
            text-gray-700
            font-semibold
          "
        >
          Discount: {formatRupiah(summaryData.totalDiscount)}
        </span>
      </div>

      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <div
        className={
          dimensionScreenW < 768 && check
            ? "bringToBack"
            : ""
        }
      >
        <div
          className="
            bg-white
            rounded-2xl
            shadow-xl
            overflow-hidden
            border
            border-gray-200
          "
        >
          <div
            className="
              relative
              overflow-auto
              rounded-2xl
              max-h-[65vh]
            "
          >
            {loading && (
              <div
                className="
                  absolute
                  inset-0
                  z-50
                  flex
                  items-center
                  justify-center
                  bg-white/70
                  backdrop-blur-sm
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    gap-3
                  "
                >
                  <span
                    className="
                      loading
                      loading-spinner
                      loading-lg
                      text-primary
                    "
                  />

                  <span className="text-sm text-gray-600">
                    Memuat data penjualan...
                  </span>
                </div>
              </div>
            )}

            <table className="table w-full">
              <thead
                className="
                  bg-primary
                  text-white
                  sticky
                  top-0
                  text-[13px]
                  z-10
                "
              >
                <tr>
                  <th
                    className="
                      px-4
                      py-3
                      whitespace-nowrap
                    "
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <FaEllipsisV />
                      Aksi
                    </div>
                  </th>

                  {mainColumns.map((column) => (
                    <th
                      key={column.key}
                      className="
                        px-4
                        py-3
                        whitespace-nowrap
                      "
                    >
                      <div className="flex items-center gap-2 font-semibold">
                        {column.icon}
                        {column.label}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={mainColumns.length + 1}
                      className="
                        text-center
                        py-16
                        text-gray-500
                      "
                    >
                      <FaClipboardList
                        className="
                          text-4xl
                          text-gray-300
                          mx-auto
                          mb-3
                        "
                      />

                      Tidak ada data penjualan
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => (
                    <tr
                      key={`${item["No"]}-${item["Billing No"]}-${index}`}
                      className="
                        border-b
                        hover:bg-blue-50
                        transition
                        duration-200
                      "
                    >
                      {/* AKSI */}
                      <td className="px-4 py-3">
                        <div className="dropdown dropdown-right">
                          <div
                            tabIndex={0}
                            role="button"
                            className="
                              w-9
                              h-9
                              rounded-full
                              bg-blue-50
                              text-primary
                              flex
                              items-center
                              justify-center
                              cursor-pointer
                              hover:bg-primary
                              hover:text-white
                              transition
                            "
                          >
                            <FaEllipsisV />
                          </div>

                          <ul
                            tabIndex={0}
                            className="
                              dropdown-content
                              menu
                              p-2
                              shadow-xl
                              bg-white
                              rounded-box
                              border
                              border-gray-100
                              w-44
                              z-[20]
                            "
                          >
                            <li>
                              <button
                                type="button"
                                onClick={() =>
                                  handleDetail(item)
                                }
                              >
                                <FaEye />
                                Detail
                              </button>
                            </li>

                            <li>
                              <button
                                type="button"
                                onClick={() =>
                                  console.log(
                                    "Edit dummy:",
                                    item
                                  )
                                }
                              >
                                Edit
                              </button>
                            </li>

                            <li>
                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(item)
                                }
                                className="text-red-500"
                              >
                                Hapus
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>

                      {mainColumns.map((column) => {
                        const value = [
                          "Persentase COGS",
                          "Margin",
                          "Persentase Margin",
                        ].includes(column.key)
                          ? getCalculatedValue(item, column.key)
                          : column.key === "Tanggal Jatuh Tempo"
                          ? getTanggalJatuhTempo(item)
                          : item[column.key];

                        return (
                          <td
                            key={column.key}
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >
                            {column.type === "status" ? (
                              renderPostingStatus(value)
                            ) : column.type === "date" ? (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaCalendarAlt className="text-primary" />
                                {formatDate(value)}
                              </div>
                            ) : column.type === "top" ? (
                              <span className="font-semibold text-gray-700">
                                {formatTOP(value)}
                              </span>
                            ) : column.type === "dueDate" ? (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaCalendarAlt className="text-primary" />
                                {formatDate(value)}
                              </div>
                            ) : column.type === "currency" ? (
                              <span className="font-bold text-gray-700">
                                {formatRupiah(value)}
                              </span>
                            ) : column.type === "plainNumber" ? (
                              <span className="text-gray-700">
                                {String(value)}
                              </span>
                            ) : column.type === "calculatedPercentCOGS" ||
                              column.type === "calculatedPercentMargin" ? (
                              <span className="font-bold text-gray-700">
                                {formatPercent(value)}
                              </span>
                            ) : column.type === "calculatedMargin" ? (
                              <span className="font-bold text-gray-700">
                                {formatRupiah(value)}
                              </span>
                            ) : column.type === "number" ? (
                              <span className="text-gray-700">
                                {formatNumber(value)}
                              </span>
                            ) : (
                              <span
                                className="
                                  text-gray-700
                                  max-w-[280px]
                                  block
                                  truncate
                                "
                                title={String(
                                  displayValue(value)
                                )}
                              >
                                {displayValue(value)}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          <div
            className="
              border-t
              border-gray-100
              bg-slate-50
              py-4
              px-5
            "
          >
            <div
              className="
                flex
                flex-col
                lg:flex-row
                gap-4
                lg:items-center
                lg:justify-between
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-5
                  flex-wrap
                "
              >
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold">
                    {startIndex}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold">
                    {endIndex}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold">
                    {totalData}
                  </span>{" "}
                  entries
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Rows:
                  </span>

                  <select
                    className="
                      select
                      select-bordered
                      select-sm
                      rounded-full
                      bg-white
                    "
                    value={perPage}
                    onChange={(e) =>
                      setPerPage(
                        parseInt(e.target.value, 10)
                      )
                    }
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>

              {totalPage > 0 && (
                <ReactPaginate
                  breakLabel="..."
                  previousLabel="←"
                  nextLabel="→"
                  pageCount={totalPage}
                  onPageChange={(e) =>
                    setCurrentPage(e.selected + 1)
                  }
                  forcePage={currentPage - 1}
                  className="
                    flex
                    items-center
                    gap-2
                  "
                  activeClassName="
                    !bg-primary
                    !text-white
                    !border-primary
                  "
                  pageClassName="
                    min-w-9
                    h-9
                    border
                    border-gray-300
                    rounded-full
                    flex
                    items-center
                    justify-center
                    bg-white
                    hover:bg-blue-50
                    transition
                  "
                  pageLinkClassName="
                    w-full
                    h-full
                    flex
                    items-center
                    justify-center
                  "
                  previousClassName="
                    min-w-9
                    h-9
                    border
                    border-gray-300
                    rounded-full
                    bg-white
                  "
                  nextClassName="
                    min-w-9
                    h-9
                    border
                    border-gray-300
                    rounded-full
                    bg-white
                  "
                  previousLinkClassName="
                    w-full
                    h-full
                    flex
                    items-center
                    justify-center
                  "
                  nextLinkClassName="
                    w-full
                    h-full
                    flex
                    items-center
                    justify-center
                  "
                  breakClassName="
                    px-2
                    text-gray-500
                  "
                  disabledClassName="
                    opacity-50
                    cursor-not-allowed
                  "
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* DETAIL MODAL - SEMUA FIELD EXCEL */}
      {/* ================================================= */}

      {showDetail && selectedData && (
        <div
          className="
            fixed
            inset-0
            z-[999]
            bg-black/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
          onClick={closeDetail}
        >
          <div
            className="
              bg-white
              rounded-2xl
              shadow-2xl
              w-full
              max-w-6xl
              max-h-[92vh]
              overflow-y-auto
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div
              className="
                bg-primary
                px-6
                py-4
                text-white
                sticky
                top-0
                z-20
              "
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-white/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <FaFileInvoiceDollar />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      Detail Penjualan
                    </h3>

                    <p className="text-xs text-blue-100">
                      Billing No:{" "}
                      {displayValue(
                        selectedData["Billing No"]
                      )}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeDetail}
                  className="
                    w-9
                    h-9
                    rounded-full
                    hover:bg-white/10
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* BODY */}
            <div className="p-6">
              {detailGroups.map((group) => (
                <div
                  key={group.title}
                  className="mb-7"
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mb-4
                      pb-2
                      border-b
                      border-gray-200
                    "
                  >
                    <FaClipboardList className="text-primary" />

                    <h4 className="font-bold text-gray-800">
                      {group.title}
                    </h4>
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      lg:grid-cols-3
                      gap-4
                    "
                  >
                    {group.fields.map(
                      ([key, label, type]) => (
                        <div
                          key={key}
                          className="
                            rounded-xl
                            bg-gray-50
                            border
                            border-gray-100
                            p-3
                          "
                        >
                          <p
                            className="
                              text-xs
                              text-gray-400
                              mb-1
                            "
                          >
                            {label}
                          </p>

                          <p
                            className="
                              font-semibold
                              text-gray-700
                              break-words
                            "
                          >
                            {formatFieldValue(
                              key === "Tanggal Jatuh Tempo"
                                ? getTanggalJatuhTempo(selectedData)
                                : selectedData[key],
                              type,
                              selectedData
                            )}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div
              className="
                border-t
                bg-gray-50
                px-5
                py-4
                flex
                justify-end
                sticky
                bottom-0
              "
            >
              <button
                type="button"
                onClick={closeDetail}
                className="
                  px-5
                  py-2.5
                  rounded-full
                  bg-primary
                  text-white
                  text-sm
                  font-semibold
                  hover:opacity-90
                "
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableMasterFaktur;