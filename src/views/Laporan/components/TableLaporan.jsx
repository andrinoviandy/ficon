import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import XLSX from "xlsx-js-style";
import {
  FaChartBar,
  FaClipboardList,
  FaMoneyBillWave,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaHashtag,
  FaFileInvoiceDollar,
  FaBuilding,
  FaStore,
  FaUser,
  FaCalendarAlt,
  FaRoute,
  FaCreditCard,
  FaEye,
  FaFilter,
  FaTimes,
  FaFileAlt,
  FaFileExcel,
} from "react-icons/fa";

import {
  IoSearch,
} from "react-icons/io5";

import ReactPaginate
  from "react-paginate";


// =====================================================
// FORMAT DATE
// =====================================================

const formatDate = (
  date
) => {

  if (!date) {
    return "-";
  }

  return new Date(
    date
  ).toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

};


// =====================================================
// FORMAT CURRENCY
// =====================================================

const formatRupiah = (
  value
) => {

  if (
    value === null ||
    value === undefined
  ) {

    return "Rp0";

  }

  return new Intl.NumberFormat(
    "id-ID",
    {
      style:
        "currency",
      currency:
        "IDR",
      minimumFractionDigits:
        0,
    }
  ).format(
    value
  );

};


// =====================================================
// DUMMY DATA
// =====================================================

const dummyData = [

  {
    id: 1,

    periode:
      "2026-08",

    no_faktur:
      "INV-2026-00001",

    no_tagihan:
      "2806205873",

    customer:
      "Dinas Kesehatan Kota Medan",

    cabang:
      "KFTD MEDAN",

    kolektor:
      "Andri Noviandy",

    nominal:
      140000000,

    tanggal_faktur:
      "2026-08-01",

    jatuh_tempo:
      "2026-08-22",

    tanggal_penugasan:
      "2026-08-02",

    tanggal_pengantaran:
      "2026-08-04",

    tanggal_pembayaran:
      "2026-08-10",

    metode_pembayaran:
      "GIRO",

    status_penugasan:
      "DITUGASKAN",

    status_pengantaran:
      "SUDAH_DIANTAR",

    status_pembayaran:
      "DITERIMA",

  },


  {
    id: 2,

    periode:
      "2026-08",

    no_faktur:
      "INV-2026-00002",

    no_tagihan:
      "2806205852",

    customer:
      "Apotek Maju Djaya",

    cabang:
      "KFTD MEDAN",

    kolektor:
      "Budi Santoso",

    nominal:
      85000000,

    tanggal_faktur:
      "2026-08-02",

    jatuh_tempo:
      "2026-08-25",

    tanggal_penugasan:
      "2026-08-03",

    tanggal_pengantaran:
      "2026-08-05",

    tanggal_pembayaran:
      "2026-08-11",

    metode_pembayaran:
      "DIRECT_TRANSFER",

    status_penugasan:
      "DITUGASKAN",

    status_pengantaran:
      "SUDAH_DIANTAR",

    status_pembayaran:
      "DITERIMA",

  },


  {
    id: 3,

    periode:
      "2026-08",

    no_faktur:
      "INV-2026-00003",

    no_tagihan:
      "2806205863",

    customer:
      "Apotek Rusli",

    cabang:
      "KFTD MEDAN",

    kolektor:
      "Citra Lestari",

    nominal:
      140000000,

    tanggal_faktur:
      "2026-08-03",

    jatuh_tempo:
      "2026-08-27",

    tanggal_penugasan:
      "2026-08-04",

    tanggal_pengantaran:
      null,

    tanggal_pembayaran:
      null,

    metode_pembayaran:
      null,

    status_penugasan:
      "DITUGASKAN",

    status_pengantaran:
      "BELUM_DIANTAR",

    status_pembayaran:
      "BELUM_DIBAYAR",

  },


  {
    id: 4,

    periode:
      "2026-08",

    no_faktur:
      "INV-2026-00004",

    no_tagihan:
      "2806275806",

    customer:
      "RSUD Pasuruan",

    cabang:
      "KFTD PASURUAN",

    kolektor:
      "Dimas Pratama",

    nominal:
      175000000,

    tanggal_faktur:
      "2026-08-04",

    jatuh_tempo:
      "2026-08-29",

    tanggal_penugasan:
      "2026-08-05",

    tanggal_pengantaran:
      "2026-08-07",

    tanggal_pembayaran:
      "2026-08-12",

    metode_pembayaran:
      "CASH",

    status_penugasan:
      "DITUGASKAN",

    status_pengantaran:
      "SUDAH_DIANTAR",

    status_pembayaran:
      "DITOLAK",

  },


  {
    id: 5,

    periode:
      "2026-08",

    no_faktur:
      "INV-2026-00005",

    no_tagihan:
      "2806205662",

    customer:
      "RS Hermina Medan",

    cabang:
      "KFTD MEDAN",

    kolektor:
      "Eko Saputra",

    nominal:
      95000000,

    tanggal_faktur:
      "2026-08-05",

    jatuh_tempo:
      "2026-08-30",

    tanggal_penugasan:
      "2026-08-06",

    tanggal_pengantaran:
      null,

    tanggal_pembayaran:
      null,

    metode_pembayaran:
      null,

    status_penugasan:
      "DITUGASKAN",

    status_pengantaran:
      "BELUM_DIANTAR",

    status_pembayaran:
      "BELUM_DIBAYAR",

  },


  {
    id: 6,

    periode:
      "2026-08",

    no_faktur:
      "INV-2026-00006",

    no_tagihan:
      "2806205788",

    customer:
      "Apotek Sehat Sentosa",

    cabang:
      "KFTD JAKARTA",

    kolektor:
      "Fajar Hidayat",

    nominal:
      65000000,

    tanggal_faktur:
      "2026-08-06",

    jatuh_tempo:
      "2026-09-01",

    tanggal_penugasan:
      "2026-08-07",

    tanggal_pengantaran:
      "2026-08-09",

    tanggal_pembayaran:
      "2026-08-13",

    metode_pembayaran:
      "SURAT_SETOR_PAJAK",

    status_penugasan:
      "DITUGASKAN",

    status_pengantaran:
      "SUDAH_DIANTAR",

    status_pembayaran:
      "DITERIMA",

  },


  {
    id: 7,

    periode:
      "2026-08",

    no_faktur:
      "INV-2026-00007",

    no_tagihan:
      "2806205791",

    customer:
      "Klinik Medika Utama",

    cabang:
      "KFTD JAKARTA",

    kolektor:
      "Gilang Ramadhan",

    nominal:
      72500000,

    tanggal_faktur:
      "2026-08-07",

    jatuh_tempo:
      "2026-09-03",

    tanggal_penugasan:
      "2026-08-08",

    tanggal_pengantaran:
      "2026-08-10",

    tanggal_pembayaran:
      null,

    metode_pembayaran:
      null,

    status_penugasan:
      "DITUGASKAN",

    status_pengantaran:
      "SUDAH_DIANTAR",

    status_pembayaran:
      "BELUM_DIBAYAR",

  },


  {
    id: 8,

    periode:
      "2026-08",

    no_faktur:
      "INV-2026-00008",

    no_tagihan:
      "2806205812",

    customer:
      "RS Siloam Medan",

    cabang:
      "KFTD MEDAN",

    kolektor:
      "Andri Noviandy",

    nominal:
      210000000,

    tanggal_faktur:
      "2026-08-08",

    jatuh_tempo:
      "2026-09-05",

    tanggal_penugasan:
      "2026-08-09",

    tanggal_pengantaran:
      null,

    tanggal_pembayaran:
      null,

    metode_pembayaran:
      null,

    status_penugasan:
      "DITUGASKAN",

    status_pengantaran:
      "BELUM_DIANTAR",

    status_pembayaran:
      "BELUM_DIBAYAR",

  },


  {
    id: 9,

    periode:
      "2026-08",

    no_faktur:
      "INV-2026-00009",

    no_tagihan:
      "2806205821",

    customer:
      "Dinas Kesehatan Deli Serdang",

    cabang:
      "KFTD MEDAN",

    kolektor:
      "Budi Santoso",

    nominal:
      125000000,

    tanggal_faktur:
      "2026-08-09",

    jatuh_tempo:
      "2026-09-07",

    tanggal_penugasan:
      "2026-08-10",

    tanggal_pengantaran:
      "2026-08-12",

    tanggal_pembayaran:
      "2026-08-14",

    metode_pembayaran:
      "DIRECT_TRANSFER",

    status_penugasan:
      "DITUGASKAN",

    status_pengantaran:
      "SUDAH_DIANTAR",

    status_pembayaran:
      "MENUNGGU_VERIFIKASI",

  },


  {
    id: 10,

    periode:
      "2026-08",

    no_faktur:
      "INV-2026-00010",

    no_tagihan:
      "2806205830",

    customer:
      "Apotek Kimia Sehat",

    cabang:
      "KFTD JAKARTA",

    kolektor:
      "Eko Saputra",

    nominal:
      45000000,

    tanggal_faktur:
      "2026-08-10",

    jatuh_tempo:
      "2026-09-10",

    tanggal_penugasan:
      "2026-08-11",

    tanggal_pengantaran:
      "2026-08-13",

    tanggal_pembayaran:
      "2026-08-15",

    metode_pembayaran:
      "GIRO",

    status_penugasan:
      "DITUGASKAN",

    status_pengantaran:
      "SUDAH_DIANTAR",

    status_pembayaran:
      "DITERIMA",

  },


  {
    id: 11,

    periode:
      "2026-08",

    no_faktur:
      "INV-2026-00011",

    no_tagihan:
      "2806205844",

    customer:
      "RSUD Kota Bogor",

    cabang:
      "KFTD BOGOR",

    kolektor:
      "Fajar Hidayat",

    nominal:
      185000000,

    tanggal_faktur:
      "2026-08-11",

    jatuh_tempo:
      "2026-09-12",

    tanggal_penugasan:
      null,

    tanggal_pengantaran:
      null,

    tanggal_pembayaran:
      null,

    metode_pembayaran:
      null,

    status_penugasan:
      "BELUM_DITUGASKAN",

    status_pengantaran:
      "BELUM_DIANTAR",

    status_pembayaran:
      "BELUM_DIBAYAR",

  },


  {
    id: 12,

    periode:
      "2026-08",

    no_faktur:
      "INV-2026-00012",

    no_tagihan:
      "2806205855",

    customer:
      "Apotek Berkah Farma",

    cabang:
      "KFTD BOGOR",

    kolektor:
      "Gilang Ramadhan",

    nominal:
      55000000,

    tanggal_faktur:
      "2026-08-12",

    jatuh_tempo:
      "2026-09-15",

    tanggal_penugasan:
      "2026-08-13",

    tanggal_pengantaran:
      "2026-08-15",

    tanggal_pembayaran:
      null,

    metode_pembayaran:
      null,

    status_penugasan:
      "DITUGASKAN",

    status_pengantaran:
      "SUDAH_DIANTAR",

    status_pembayaran:
      "BELUM_DIBAYAR",

  },

];


// =====================================================
// STATUS
// =====================================================

const statusPembayaranConfig = {

  BELUM_DIBAYAR: {

    label:
      "Belum Dibayar",

    icon:
      FaClock,

    className:
      "bg-amber-100 text-amber-700",

  },

  MENUNGGU_VERIFIKASI: {

    label:
      "Menunggu Verifikasi",

    icon:
      FaClock,

    className:
      "bg-blue-100 text-blue-700",

  },

  DITERIMA: {

    label:
      "Pembayaran Diterima",

    icon:
      FaCheckCircle,

    className:
      "bg-green-100 text-green-700",

  },

  DITOLAK: {

    label:
      "Pembayaran Ditolak",

    icon:
      FaTimesCircle,

    className:
      "bg-red-100 text-red-700",

  },

};


// =====================================================
// COMPONENT
// =====================================================

const TableLaporan = ({
  dimensionScreenW,
  check,
  loginAccess,
}) => {

  // ===================================================
  // STATE
  // ===================================================

  const [
    allData,
    setAllData,
  ] = useState(
    dummyData
  );


  const [
    keyword,
    setKeyword,
  ] = useState(
    ""
  );


  const [
    selectedPeriode,
    setSelectedPeriode,
  ] = useState(
    "ALL"
  );


  const [
    selectedCabang,
    setSelectedCabang,
  ] = useState(
    "ALL"
  );


  const [
    selectedKolektor,
    setSelectedKolektor,
  ] = useState(
    "ALL"
  );


  const [
    selectedStatusPembayaran,
    setSelectedStatusPembayaran,
  ] = useState(
    "ALL"
  );


  const [
    currentPage,
    setCurrentPage,
  ] = useState(
    1
  );


  const [
    perPage,
    setPerPage,
  ] = useState(
    10
  );


  const [
    showFilter,
    setShowFilter,
  ] = useState(
    false
  );


  const [
    selectedData,
    setSelectedData,
  ] = useState(
    null
  );


  // ===================================================
  // FILTER OPTIONS
  // ===================================================

  const periodeOptions =
    [
      "ALL",
      ...new Set(
        allData.map(
          item =>
            item.periode
        )
      ),
    ];


  const cabangOptions =
    [
      "ALL",
      ...new Set(
        allData.map(
          item =>
            item.cabang
        )
      ),
    ];


  const kolektorOptions =
    [
      "ALL",
      ...new Set(
        allData.map(
          item =>
            item.kolektor
        )
      ),
    ];


  // ===================================================
  // FILTER DATA
  // ===================================================

  const filteredData =
    useMemo(
      () => {

        let data =
          [
            ...allData,
          ];


        // SEARCH

        if (
          keyword.trim()
        ) {

          const search =
            keyword
              .toLowerCase();


          data =
            data.filter(
              item =>

                item.no_faktur
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.no_tagihan
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.customer
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.cabang
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.kolektor
                  ?.toLowerCase()
                  .includes(
                    search
                  )

            );

        }


        // PERIODE

        if (
          selectedPeriode !==
          "ALL"
        ) {

          data =
            data.filter(
              item =>
                item.periode ===
                selectedPeriode
            );

        }


        // CABANG

        if (
          selectedCabang !==
          "ALL"
        ) {

          data =
            data.filter(
              item =>
                item.cabang ===
                selectedCabang
            );

        }


        // KOLEKTOR

        if (
          selectedKolektor !==
          "ALL"
        ) {

          data =
            data.filter(
              item =>
                item.kolektor ===
                selectedKolektor
            );

        }


        // STATUS PEMBAYARAN

        if (
          selectedStatusPembayaran !==
          "ALL"
        ) {

          data =
            data.filter(
              item =>
                item.status_pembayaran ===
                selectedStatusPembayaran
            );

        }


        return data;

      },
      [
        allData,
        keyword,
        selectedPeriode,
        selectedCabang,
        selectedKolektor,
        selectedStatusPembayaran,
      ]
    );


  // ===================================================
  // SUMMARY
  // ===================================================

  const summaryData =
    useMemo(
      () => {

        const total =
          filteredData.length;


        const totalNominal =
          filteredData.reduce(
            (
              sum,
              item
            ) =>
              sum +
              item.nominal,
            0
          );


        const sudahDiantar =
          filteredData.filter(
            item =>
              item.status_pengantaran ===
              "SUDAH_DIANTAR"
          ).length;


        const belumDiantar =
          filteredData.filter(
            item =>
              item.status_pengantaran ===
              "BELUM_DIANTAR"
          ).length;


        const pembayaranDiterima =
          filteredData.filter(
            item =>
              item.status_pembayaran ===
              "DITERIMA"
          ).length;


        const pembayaranDitolak =
          filteredData.filter(
            item =>
              item.status_pembayaran ===
              "DITOLAK"
          ).length;


        const menungguVerifikasi =
          filteredData.filter(
            item =>
              item.status_pembayaran ===
              "MENUNGGU_VERIFIKASI"
          ).length;


        const totalDibayar =
          filteredData
            .filter(
              item =>
                item.status_pembayaran ===
                "DITERIMA"
            )
            .reduce(
              (
                sum,
                item
              ) =>
                sum +
                item.nominal,
              0
            );


        const collectionRate =
          totalNominal > 0
            ? (
              totalDibayar /
              totalNominal
            ) *
            100
            : 0;


        return {

          total,

          totalNominal,

          sudahDiantar,

          belumDiantar,

          pembayaranDiterima,

          pembayaranDitolak,

          menungguVerifikasi,

          totalDibayar,

          collectionRate,

        };

      },
      [
        filteredData,
      ]
    );


  // ===================================================
  // PAGINATION
  // ===================================================

  const totalData =
    filteredData.length;


  const totalPage =
    Math.ceil(
      totalData /
      perPage
    );


  const paginatedData =
    filteredData.slice(
      (
        currentPage -
        1
      ) *
      perPage,

      currentPage *
      perPage
    );


  // ===================================================
  // RESET PAGE
  // ===================================================

  useEffect(
    () => {

      setCurrentPage(
        1
      );

    },
    [
      keyword,
      selectedPeriode,
      selectedCabang,
      selectedKolektor,
      selectedStatusPembayaran,
      perPage,
    ]
  );


  // ===================================================
  // RESET FILTER
  // ===================================================

  const resetFilter =
    () => {

      setKeyword("");

      setSelectedPeriode(
        "ALL"
      );

      setSelectedCabang(
        "ALL"
      );

      setSelectedKolektor(
        "ALL"
      );

      setSelectedStatusPembayaran(
        "ALL"
      );

      setCurrentPage(
        1
      );

    };


  // ===================================================
  // STATUS PEMBAYARAN
  // ===================================================

  const renderStatusPembayaran =
    (
      status
    ) => {

      const config =
        statusPembayaranConfig[
        status
        ];


      if (!config) {
        return "-";
      }


      const Icon =
        config.icon;


      return (

        <span
          className={`
            inline-flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-full
            text-xs
            font-semibold
            whitespace-nowrap
            ${config.className}
          `}
        >

          <Icon />

          {
            config.label
          }

        </span>

      );

    };


  // ===================================================
  // PAYMENT METHOD
  // ===================================================

  const renderPaymentMethod =
    (
      method
    ) => {

      if (!method) {
        return (
          <span
            className="
              text-xs
              text-gray-400
            "
          >
            -
          </span>
        );
      }


      const config = {

        GIRO: {
          label:
            "Giro",
          icon:
            FaCreditCard,
          className:
            "text-orange-500",
        },

        CASH: {
          label:
            "Cash",
          icon:
            FaMoneyBillWave,
          className:
            "text-green-500",
        },

        DIRECT_TRANSFER: {
          label:
            "Direct Transfer",
          icon:
            FaMoneyBillWave,
          className:
            "text-blue-600",
        },

        SURAT_SETOR_PAJAK: {
          label:
            "SSP",
          icon:
            FaFileAlt,
          className:
            "text-purple-500",
        },

      }[method];


      if (!config) {
        return "-";
      }


      const Icon =
        config.icon;


      return (

        <div
          className="
            flex
            items-center
            gap-2
            whitespace-nowrap
          "
        >

          <Icon
            className={
              config.className
            }
          />

          <span
            className="
              text-sm
              text-gray-700
            "
          >
            {
              config.label
            }
          </span>

        </div>

      );

    };


  // ===================================================
  // DETAIL
  // ===================================================

  const openDetail =
    (
      data
    ) => {

      setSelectedData(
        data
      );

    };


  // ===================================================
  // PAGINATION INFO
  // ===================================================

  const startIndex =
    totalData > 0
      ? (
        currentPage -
        1
      ) *
      perPage +
      1
      : 0;


  const endIndex =
    Math.min(
      currentPage *
      perPage,
      totalData
    );

  // ===================================================
  // EXPORT EXCEL
  // ===================================================

  const handleExportExcel = () => {

    if (!filteredData || filteredData.length === 0) {
      alert("Tidak ada data untuk diexport.");
      return;
    }

    // =================================================
    // DATA EXCEL
    // =================================================

    const excelData = filteredData.map(
      (item, index) => ({
        "No": index + 1,

        "No. Faktur":
          item.no_faktur || "-",

        "No. Tagihan":
          item.no_tagihan || "-",

        "Pelanggan":
          item.customer || "-",

        "Cabang":
          item.cabang || "-",

        "Kolektor":
          item.kolektor || "-",

        "Nilai Tagihan":
          item.nominal || 0,

        "Tanggal Faktur":
          item.tanggal_faktur || null,

        "Jatuh Tempo":
          item.jatuh_tempo || null,

        "Tanggal Penugasan":
          item.tanggal_penugasan || null,

        "Tanggal Pengantaran":
          item.tanggal_pengantaran || null,

        "Tanggal Pembayaran":
          item.tanggal_pembayaran || null,

        "Metode Pembayaran":
          item.metode_pembayaran === "DIRECT_TRANSFER"
            ? "Direct Transfer"
            : item.metode_pembayaran === "GIRO"
              ? "Giro"
              : item.metode_pembayaran === "CASH"
                ? "Cash"
                : item.metode_pembayaran === "SURAT_SETOR_PAJAK"
                  ? "Surat Setor Pajak"
                  : "-",

        "Status Penugasan":
          item.status_penugasan === "DITUGASKAN"
            ? "Ditugaskan"
            : item.status_penugasan === "BELUM_DITUGASKAN"
              ? "Belum Ditugaskan"
              : "-",

        "Status Pengantaran":
          item.status_pengantaran === "SUDAH_DIANTAR"
            ? "Sudah Diantar"
            : item.status_pengantaran === "GAGAL_DIANTAR"
              ? "Gagal Diantar"
              : "Belum Diantar",

        "Status Pembayaran":
          item.status_pembayaran === "DITERIMA"
            ? "Pembayaran Diterima"
            : item.status_pembayaran === "DITOLAK"
              ? "Pembayaran Ditolak"
              : item.status_pembayaran === "MENUNGGU_VERIFIKASI"
                ? "Menunggu Verifikasi"
                : "Belum Dibayar",

      })
    );


    // =================================================
    // CREATE WORKSHEET
    // =================================================

    const worksheet =
      XLSX.utils.json_to_sheet(
        excelData
      );


    // =================================================
    // HEADER STYLE
    // =================================================

    const headerRange =
      XLSX.utils.decode_range(
        worksheet["!ref"]
      );

    for (
      let col = headerRange.s.c;
      col <= headerRange.e.c;
      col++
    ) {

      const cellAddress =
        XLSX.utils.encode_cell({
          r: 0,
          c: col,
        });

      if (worksheet[cellAddress]) {

        worksheet[cellAddress].s = {

          fill: {
            fgColor: {
              rgb: "000080",
            },
          },

          font: {
            bold: true,
            color: {
              rgb: "FFFFFF",
            },
            sz: 11,
          },

          alignment: {
            horizontal: "center",
            vertical: "center",
          },

          border: {
            top: {
              style: "thin",
              color: {
                rgb: "D1D5DB",
              },
            },
            bottom: {
              style: "thin",
              color: {
                rgb: "D1D5DB",
              },
            },
            left: {
              style: "thin",
              color: {
                rgb: "D1D5DB",
              },
            },
            right: {
              style: "thin",
              color: {
                rgb: "D1D5DB",
              },
            },
          },

        };

      }

    }


    // =================================================
    // COLUMN WIDTH
    // =================================================

    worksheet["!cols"] = [

      { wch: 6 },   // No

      { wch: 20 },  // Faktur

      { wch: 18 },  // Tagihan

      { wch: 30 },  // Customer

      { wch: 18 },  // Cabang

      { wch: 22 },  // Kolektor

      { wch: 18 },  // Nilai

      { wch: 16 },  // Tgl Faktur

      { wch: 16 },  // Jatuh Tempo

      { wch: 20 },  // Penugasan

      { wch: 20 },  // Pengantaran

      { wch: 20 },  // Pembayaran

      { wch: 22 },  // Metode

      { wch: 22 },  // Status Penugasan

      { wch: 22 },  // Status Pengantaran

      { wch: 24 },  // Status Pembayaran

    ];


    // =================================================
    // FORMAT CURRENCY
    // =================================================

    for (
      let row = 1;
      row <= excelData.length;
      row++
    ) {

      const cell =
        worksheet[
        XLSX.utils.encode_cell({
          r: row,
          c: 6,
        })
        ];

      if (cell) {

        cell.z =
          '"Rp" #,##0';

        cell.s = {

          alignment: {
            horizontal: "right",
          },

        };

      }

    }


    // =================================================
    // FREEZE HEADER
    // =================================================

    worksheet["!freeze"] = {
      xSplit: 0,
      ySplit: 1,
    };


    // =================================================
    // WORKBOOK
    // =================================================

    const workbook =
      XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Laporan"
    );


    // =================================================
    // SUMMARY SHEET
    // =================================================

    const summaryExcel = [

      {
        "Informasi":
          "Periode",
        "Nilai":
          selectedPeriode === "ALL"
            ? "Semua Periode"
            : selectedPeriode,
      },

      {
        "Informasi":
          "Cabang",
        "Nilai":
          selectedCabang === "ALL"
            ? "Semua Cabang"
            : selectedCabang,
      },

      {
        "Informasi":
          "Kolektor",
        "Nilai":
          selectedKolektor === "ALL"
            ? "Semua Kolektor"
            : selectedKolektor,
      },

      {
        "Informasi":
          "Status Pembayaran",
        "Nilai":
          selectedStatusPembayaran === "ALL"
            ? "Semua Status"
            : selectedStatusPembayaran,
      },

      {
        "Informasi":
          "Total Faktur",
        "Nilai":
          summaryData.total,
      },

      {
        "Informasi":
          "Total Nilai Tagihan",
        "Nilai":
          summaryData.totalNominal,
      },

      {
        "Informasi":
          "Sudah Diantar",
        "Nilai":
          summaryData.sudahDiantar,
      },

      {
        "Informasi":
          "Belum Diantar",
        "Nilai":
          summaryData.belumDiantar,
      },

      {
        "Informasi":
          "Pembayaran Diterima",
        "Nilai":
          summaryData.pembayaranDiterima,
      },

      {
        "Informasi":
          "Pembayaran Ditolak",
        "Nilai":
          summaryData.pembayaranDitolak,
      },

      {
        "Informasi":
          "Menunggu Verifikasi",
        "Nilai":
          summaryData.menungguVerifikasi,
      },

      {
        "Informasi":
          "Collection Rate",
        "Nilai":
          `${summaryData.collectionRate.toFixed(2)}%`,
      },

    ];


    const summaryWorksheet =
      XLSX.utils.json_to_sheet(
        summaryExcel
      );


    summaryWorksheet["!cols"] = [
      { wch: 28 },
      { wch: 30 },
    ];


    // Header summary

    ["A1", "B1"].forEach(
      (cell) => {

        if (summaryWorksheet[cell]) {

          summaryWorksheet[cell].s = {

            font: {
              bold: true,
              color: {
                rgb: "FFFFFF",
              },
            },

            fill: {
              fgColor: {
                rgb: "000080",
              },
            },

            alignment: {
              horizontal: "center",
            },

          };

        }

      }
    );


    XLSX.utils.book_append_sheet(
      workbook,
      summaryWorksheet,
      "Summary"
    );


    // =================================================
    // FILE NAME
    // =================================================

    const now =
      new Date();

    const tanggal =
      now
        .toISOString()
        .slice(
          0,
          10
        );


    const fileName =
      `Laporan_KFCOLLS_${tanggal}.xlsx`;


    // =================================================
    // DOWNLOAD
    // =================================================

    XLSX.writeFile(
      workbook,
      fileName
    );

  };

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
    lg:flex-row
    justify-between
    gap-4
  "
      >

        {/* SEARCH */}

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
      lg:w-[420px]
    "
        >

          <IoSearch
            className="
        text-gray-400
        text-lg
      "
          />

          <input
            type="text"
            placeholder="
        Cari faktur / pelanggan / kolektor...
      "
            className="grow"
            value={keyword}
            onChange={(e) =>
              setKeyword(
                e.target.value
              )
            }
          />

        </div>


        {/* ACTION */}

        <div
          className="
      flex
      flex-wrap
      items-center
      gap-2
      justify-end
    "
        >

          {/* FILTER */}

          <button
            type="button"
            onClick={() =>
              setShowFilter(
                !showFilter
              )
            }
            className="
        inline-flex
        items-center
        justify-center
        gap-2
        px-5
        py-2.5
        rounded-full
        border
        border-primary
        text-primary
        bg-white
        text-sm
        font-semibold
        hover:bg-blue-50
        transition
      "
          >

            <FaFilter />

            Opsi Filter

          </button>


          {/* EXPORT */}

          <button
            type="button"
            onClick={
              handleExportExcel
            }
            disabled={
              filteredData.length === 0
            }
            className="
        inline-flex
        items-center
        justify-center
        gap-2
        px-5
        py-2.5
        rounded-full
        bg-primary
        text-white
        text-sm
        font-semibold
        shadow-md
        hover:opacity-90
        transition
        disabled:bg-gray-300
        disabled:cursor-not-allowed
      "
          >

            <FaFileExcel />

            Export Excel

          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/* FILTER PANEL */}
      {/* ================================================= */}

      {
        showFilter && (

          <div
            className="
              rounded-2xl
              bg-blue-50
              border
              border-blue-100
              p-5
            "
          >

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-4
                gap-4
              "
            >

              {/* PERIODE */}

              <div>

                <label
                  className="
                    block
                    text-xs
                    font-semibold
                    text-gray-600
                    mb-2
                  "
                >
                  Periode
                </label>


                <select
                  className="
                    select
                    select-bordered
                    select-sm
                    rounded-xl
                    bg-white
                    w-full
                  "
                  value={
                    selectedPeriode
                  }
                  onChange={
                    e =>
                      setSelectedPeriode(
                        e.target.value
                      )
                  }
                >

                  <option value="ALL">
                    Semua Periode
                  </option>


                  {
                    periodeOptions
                      .filter(
                        item =>
                          item !==
                          "ALL"
                      )
                      .map(
                        periode => (

                          <option
                            key={
                              periode
                            }
                            value={
                              periode
                            }
                          >
                            {
                              periode
                            }
                          </option>

                        )
                      )
                  }

                </select>

              </div>


              {/* CABANG */}

              <div>

                <label
                  className="
                    block
                    text-xs
                    font-semibold
                    text-gray-600
                    mb-2
                  "
                >
                  Cabang
                </label>


                <select
                  className="
                    select
                    select-bordered
                    select-sm
                    rounded-xl
                    bg-white
                    w-full
                  "
                  value={
                    selectedCabang
                  }
                  onChange={
                    e =>
                      setSelectedCabang(
                        e.target.value
                      )
                  }
                >

                  <option value="ALL">
                    Semua Cabang
                  </option>


                  {
                    cabangOptions
                      .filter(
                        item =>
                          item !==
                          "ALL"
                      )
                      .map(
                        cabang => (

                          <option
                            key={
                              cabang
                            }
                            value={
                              cabang
                            }
                          >
                            {
                              cabang
                            }
                          </option>

                        )
                      )
                  }

                </select>

              </div>


              {/* KOLEKTOR */}

              <div>

                <label
                  className="
                    block
                    text-xs
                    font-semibold
                    text-gray-600
                    mb-2
                  "
                >
                  Kolektor
                </label>


                <select
                  className="
                    select
                    select-bordered
                    select-sm
                    rounded-xl
                    bg-white
                    w-full
                  "
                  value={
                    selectedKolektor
                  }
                  onChange={
                    e =>
                      setSelectedKolektor(
                        e.target.value
                      )
                  }
                >

                  <option value="ALL">
                    Semua Kolektor
                  </option>


                  {
                    kolektorOptions
                      .filter(
                        item =>
                          item !==
                          "ALL"
                      )
                      .map(
                        kolektor => (

                          <option
                            key={
                              kolektor
                            }
                            value={
                              kolektor
                            }
                          >
                            {
                              kolektor
                            }
                          </option>

                        )
                      )
                  }

                </select>

              </div>


              {/* STATUS */}

              <div>

                <label
                  className="
                    block
                    text-xs
                    font-semibold
                    text-gray-600
                    mb-2
                  "
                >
                  Status Pembayaran
                </label>


                <select
                  className="
                    select
                    select-bordered
                    select-sm
                    rounded-xl
                    bg-white
                    w-full
                  "
                  value={
                    selectedStatusPembayaran
                  }
                  onChange={
                    e =>
                      setSelectedStatusPembayaran(
                        e.target.value
                      )
                  }
                >

                  <option value="ALL">
                    Semua Status
                  </option>

                  <option value="BELUM_DIBAYAR">
                    Belum Dibayar
                  </option>

                  <option value="MENUNGGU_VERIFIKASI">
                    Menunggu Verifikasi
                  </option>

                  <option value="DITERIMA">
                    Pembayaran Diterima
                  </option>

                  <option value="DITOLAK">
                    Pembayaran Ditolak
                  </option>

                </select>

              </div>

            </div>


            {/* RESET */}

            <div
              className="
                flex
                justify-end
                mt-4
              "
            >

              <button
                type="button"
                onClick={
                  resetFilter
                }
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-white
                  border
                  border-gray-200
                  text-gray-600
                  text-sm
                  font-semibold
                  hover:bg-gray-100
                "
              >

                Reset Filter

              </button>

            </div>

          </div>

        )
      }


      {/* ================================================= */}
      {/* SUMMARY */}
      {/* ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4
        "
      >

        {/* TOTAL */}

        <div
          className="
            rounded-2xl
            bg-blue-50
            border
            border-blue-100
            p-4
          "
        >

          <div
            className="
              flex
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-blue-700
                "
              >
                Total Faktur
              </p>


              <p
                className="
                  text-2xl
                  font-bold
                  text-blue-900
                "
              >
                {
                  summaryData.total
                }
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

              <FaClipboardList
                className="
                  text-blue-600
                "
              />

            </div>

          </div>

        </div>


        {/* NILAI TAGIHAN */}

        <div
          className="
            rounded-2xl
            bg-purple-50
            border
            border-purple-100
            p-4
          "
        >

          <div
            className="
              flex
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-purple-700
                "
              >
                Total Nilai Tagihan
              </p>


              <p
                className="
                  text-xl
                  font-bold
                  text-purple-900
                "
              >
                {
                  formatRupiah(
                    summaryData.totalNominal
                  )
                }
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

              <FaMoneyBillWave
                className="
                  text-purple-600
                "
              />

            </div>

          </div>

        </div>


        {/* DITERIMA */}

        <div
          className="
            rounded-2xl
            bg-green-50
            border
            border-green-100
            p-4
          "
        >

          <div
            className="
              flex
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-green-700
                "
              >
                Pembayaran Diterima
              </p>


              <p
                className="
                  text-2xl
                  font-bold
                  text-green-900
                "
              >
                {
                  summaryData.pembayaranDiterima
                }
              </p>


              <p
                className="
                  text-xs
                  text-green-600
                  mt-1
                "
              >
                {
                  formatRupiah(
                    summaryData.totalDibayar
                  )
                }
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

              <FaCheckCircle
                className="
                  text-green-600
                "
              />

            </div>

          </div>

        </div>


        {/* COLLECTION RATE */}

        <div
          className="
            rounded-2xl
            bg-orange-50
            border
            border-orange-100
            p-4
          "
        >

          <div
            className="
              flex
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-orange-700
                "
              >
                Collection Rate
              </p>


              <p
                className="
                  text-2xl
                  font-bold
                  text-orange-900
                "
              >
                {
                  summaryData.collectionRate.toFixed(
                    2
                  )
                }%
              </p>


              <p
                className="
                  text-xs
                  text-orange-600
                  mt-1
                "
              >
                {
                  summaryData.sudahDiantar
                }{" "}
                faktur sudah diantar
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

              <FaChartBar
                className="
                  text-orange-600
                "
              />

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* SECONDARY SUMMARY */}
      {/* ================================================= */}

      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-3
        "
      >

        <div
          className="
            rounded-xl
            border
            border-amber-100
            bg-amber-50
            px-4
            py-3
          "
        >

          <p
            className="
              text-xs
              text-amber-700
            "
          >
            Belum Diantar
          </p>

          <p
            className="
              text-lg
              font-bold
              text-amber-900
            "
          >
            {
              summaryData.belumDiantar
            }
          </p>

        </div>


        <div
          className="
            rounded-xl
            border
            border-blue-100
            bg-blue-50
            px-4
            py-3
          "
        >

          <p
            className="
              text-xs
              text-blue-700
            "
          >
            Menunggu Verifikasi
          </p>

          <p
            className="
              text-lg
              font-bold
              text-blue-900
            "
          >
            {
              summaryData.menungguVerifikasi
            }
          </p>

        </div>


        <div
          className="
            rounded-xl
            border
            border-red-100
            bg-red-50
            px-4
            py-3
          "
        >

          <p
            className="
              text-xs
              text-red-700
            "
          >
            Pembayaran Ditolak
          </p>

          <p
            className="
              text-lg
              font-bold
              text-red-900
            "
          >
            {
              summaryData.pembayaranDitolak
            }
          </p>

        </div>


        <div
          className="
            rounded-xl
            border
            border-green-100
            bg-green-50
            px-4
            py-3
          "
        >

          <p
            className="
              text-xs
              text-green-700
            "
          >
            Sudah Diantar
          </p>

          <p
            className="
              text-lg
              font-bold
              text-green-900
            "
          >
            {
              summaryData.sudahDiantar
            }
          </p>

        </div>

      </div>


      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <div
        className={
          dimensionScreenW <
            768 &&
            check
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
              overflow-auto
              rounded-2xl
              max-h-[65vh]
            "
          >

            <table
              className="
                table
                w-full
              "
            >

              <thead
                className="
                  bg-primary
                  text-white
                  sticky
                  top-0
                  text-[12px]
                  z-10
                "
              >

                <tr>

                  <th className="px-4 py-3">
                    No
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                      whitespace-nowrap
                    "
                  >
                    No. Faktur
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                    "
                  >
                    Pelanggan
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                    "
                  >
                    Cabang
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                      whitespace-nowrap
                    "
                  >
                    Nilai Tagihan
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                      whitespace-nowrap
                    "
                  >
                    Jatuh Tempo
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                    "
                  >
                    Kolektor
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                    "
                  >
                    Pengantaran
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                    "
                  >
                    Pembayaran
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                    "
                  >
                    Metode
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                    "
                  >
                    Aksi
                  </th>

                </tr>

              </thead>


              <tbody>

                {
                  paginatedData.length ===
                    0 ? (

                    <tr>

                      <td
                        colSpan={
                          11
                        }
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

                        Tidak ada data laporan

                      </td>

                    </tr>

                  ) : (

                    paginatedData.map(
                      (
                        item,
                        index
                      ) => (

                        <tr
                          key={
                            item.id
                          }
                          className="
                            border-b
                            hover:bg-blue-50
                            transition
                            duration-200
                          "
                        >

                          {/* NO */}

                          <td
                            className="
                              px-4
                              py-3
                              font-semibold
                              text-gray-700
                            "
                          >

                            {
                              (
                                currentPage -
                                1
                              ) *
                              perPage +
                              index +
                              1
                            }

                          </td>


                          {/* FAKTUR */}

                          <td
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >

                              <div
                                className="
                                  w-9
                                  h-9
                                  rounded-lg
                                  bg-blue-50
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                <FaFileInvoiceDollar
                                  className="
                                    text-primary
                                  "
                                />

                              </div>


                              <div>

                                <p
                                  className="
                                    font-semibold
                                    text-primary
                                  "
                                >
                                  {
                                    item.no_faktur
                                  }
                                </p>

                                <p
                                  className="
                                    text-xs
                                    text-gray-400
                                  "
                                >
                                  {
                                    item.no_tagihan
                                  }
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* CUSTOMER */}

                          <td
                            className="
                              px-4
                              py-3
                              min-w-[220px]
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-3
                              "
                            >

                              <div
                                className="
                                  w-9
                                  h-9
                                  rounded-full
                                  bg-blue-50
                                  flex
                                  items-center
                                  justify-center
                                  text-primary
                                "
                              >

                                <FaBuilding />

                              </div>


                              <p
                                className="
                                  font-semibold
                                  text-gray-700
                                "
                              >
                                {
                                  item.customer
                                }
                              </p>

                            </div>

                          </td>


                          {/* CABANG */}

                          <td
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-gray-700
                              "
                            >

                              <FaStore
                                className="
                                  text-orange-500
                                "
                              />

                              {
                                item.cabang
                              }

                            </div>

                          </td>


                          {/* NILAI */}

                          <td
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >

                            <p
                              className="
                                font-bold
                                text-gray-700
                              "
                            >
                              {
                                formatRupiah(
                                  item.nominal
                                )
                              }
                            </p>

                          </td>


                          {/* JATUH TEMPO */}

                          <td
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >

                              <FaCalendarAlt
                                className="
                                  text-primary
                                "
                              />

                              <span
                                className="
                                  text-sm
                                  text-gray-600
                                "
                              >
                                {
                                  formatDate(
                                    item.jatuh_tempo
                                  )
                                }
                              </span>

                            </div>

                          </td>


                          {/* KOLEKTOR */}

                          <td
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >

                              <div
                                className="
                                  w-8
                                  h-8
                                  rounded-full
                                  bg-orange-50
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                <FaUser
                                  className="
                                    text-orange-500
                                  "
                                />

                              </div>


                              <span
                                className="
                                  text-sm
                                  font-medium
                                  text-gray-700
                                "
                              >
                                {
                                  item.kolektor
                                }
                              </span>

                            </div>

                          </td>


                          {/* PENGANTARAN */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            {
                              item.status_pengantaran ===
                                "SUDAH_DIANTAR"
                                ? (

                                  <span
                                    className="
                                      inline-flex
                                      items-center
                                      gap-2
                                      px-3
                                      py-1.5
                                      rounded-full
                                      bg-green-100
                                      text-green-700
                                      text-xs
                                      font-semibold
                                      whitespace-nowrap
                                    "
                                  >

                                    <FaTruck />

                                    Sudah Diantar

                                  </span>

                                )
                                : (

                                  <span
                                    className="
                                      inline-flex
                                      items-center
                                      gap-2
                                      px-3
                                      py-1.5
                                      rounded-full
                                      bg-amber-100
                                      text-amber-700
                                      text-xs
                                      font-semibold
                                      whitespace-nowrap
                                    "
                                  >

                                    <FaClock />

                                    Belum Diantar

                                  </span>

                                )
                            }

                          </td>


                          {/* PEMBAYARAN */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            {
                              renderStatusPembayaran(
                                item.status_pembayaran
                              )
                            }

                          </td>


                          {/* METODE */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            {
                              renderPaymentMethod(
                                item.metode_pembayaran
                              )
                            }

                          </td>


                          {/* AKSI */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            <button
                              type="button"
                              onClick={() =>
                                openDetail(
                                  item
                                )
                              }
                              className="
                                w-9
                                h-9
                                rounded-full
                                bg-blue-50
                                text-primary
                                flex
                                items-center
                                justify-center
                                hover:bg-primary
                                hover:text-white
                                transition
                              "
                              title="Detail"
                            >

                              <FaEye />

                            </button>

                          </td>

                        </tr>

                      )
                    )

                  )
                }

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

                <div
                  className="
                    text-sm
                    text-gray-600
                  "
                >

                  Showing{" "}

                  <span
                    className="
                      font-semibold
                    "
                  >
                    {
                      startIndex
                    }
                  </span>

                  {" "}to{" "}

                  <span
                    className="
                      font-semibold
                    "
                  >
                    {
                      endIndex
                    }
                  </span>

                  {" "}of{" "}

                  <span
                    className="
                      font-semibold
                    "
                  >
                    {
                      totalData
                    }
                  </span>

                  {" "}entries

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <span
                    className="
                      text-sm
                      text-gray-600
                    "
                  >
                    Rows:
                  </span>


                  <select
                    className="
                      select
                      select-bordered
                      select-sm
                      bg-white
                      rounded-full
                    "
                    value={
                      perPage
                    }
                    onChange={
                      e =>
                        setPerPage(
                          parseInt(
                            e.target.value
                          )
                        )
                    }
                  >

                    <option value="5">
                      5
                    </option>

                    <option value="10">
                      10
                    </option>

                    <option value="25">
                      25
                    </option>

                    <option value="50">
                      50
                    </option>

                  </select>

                </div>

              </div>


              {
                totalPage >
                0 && (

                  <ReactPaginate
                    breakLabel="..."
                    previousLabel="←"
                    nextLabel="→"
                    pageCount={
                      totalPage
                    }
                    onPageChange={
                      e =>
                        setCurrentPage(
                          e.selected +
                          1
                        )
                    }
                    forcePage={
                      currentPage -
                      1
                    }
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
                    "
                    pageLinkClassName="
                      w-full
                      h-full
                      flex
                      items-center
                      justify-center
                      px-3
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

                )
              }

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* DETAIL MODAL */}
      {/* ================================================= */}

      {
        selectedData && (

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
            onClick={() =>
              setSelectedData(
                null
              )
            }
          >

            <div
              className="
                bg-white
                rounded-2xl
                shadow-2xl
                w-full
                max-w-3xl
                max-h-[90vh]
                overflow-y-auto
              "
              onClick={
                e =>
                  e.stopPropagation()
              }
            >

              {/* HEADER */}

              <div
                className="
                  bg-primary
                  px-6
                  py-4
                  text-white
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-white/15
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <FaChartBar />

                    </div>


                    <div>

                      <h3
                        className="
                          font-bold
                          text-lg
                        "
                      >
                        Detail Laporan
                      </h3>

                      <p
                        className="
                          text-xs
                          text-blue-100
                        "
                      >
                        {
                          selectedData.no_faktur
                        }
                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    onClick={() =>
                      setSelectedData(
                        null
                      )
                    }
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

              <div
                className="
                  p-6
                  flex
                  flex-col
                  gap-5
                "
              >

                {/* INFORMASI FAKTUR */}

                <div
                  className="
                    rounded-2xl
                    bg-gray-50
                    border
                    border-gray-100
                    p-5
                  "
                >

                  <h3
                    className="
                      font-bold
                      text-gray-700
                      mb-4
                    "
                  >
                    Informasi Faktur
                  </h3>


                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      gap-4
                    "
                  >

                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                      ">
                        No. Faktur
                      </p>

                      <p className="
                        font-bold
                        text-primary
                      ">
                        {
                          selectedData.no_faktur
                        }
                      </p>

                    </div>


                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                      ">
                        No. Tagihan
                      </p>

                      <p className="
                        font-semibold
                        text-gray-700
                      ">
                        {
                          selectedData.no_tagihan
                        }
                      </p>

                    </div>


                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                      ">
                        Pelanggan
                      </p>

                      <p className="
                        font-semibold
                        text-gray-700
                      ">
                        {
                          selectedData.customer
                        }
                      </p>

                    </div>


                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                      ">
                        Cabang
                      </p>

                      <p className="
                        font-semibold
                        text-gray-700
                      ">
                        {
                          selectedData.cabang
                        }
                      </p>

                    </div>


                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                      ">
                        Nilai Tagihan
                      </p>

                      <p className="
                        font-bold
                        text-primary
                      ">
                        {
                          formatRupiah(
                            selectedData.nominal
                          )
                        }
                      </p>

                    </div>


                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                      ">
                        Jatuh Tempo
                      </p>

                      <p className="
                        font-semibold
                        text-gray-700
                      ">
                        {
                          formatDate(
                            selectedData.jatuh_tempo
                          )
                        }
                      </p>

                    </div>

                  </div>

                </div>


                {/* PENUGASAN */}

                <div
                  className="
                    rounded-2xl
                    bg-gray-50
                    border
                    border-gray-100
                    p-5
                  "
                >

                  <h3
                    className="
                      font-bold
                      text-gray-700
                      mb-4
                    "
                  >
                    Informasi Penugasan
                  </h3>


                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-3
                      gap-4
                    "
                  >

                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                      ">
                        Kolektor
                      </p>

                      <p className="
                        font-semibold
                        text-gray-700
                      ">
                        {
                          selectedData.kolektor
                        }
                      </p>

                    </div>


                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                      ">
                        Tanggal Penugasan
                      </p>

                      <p className="
                        font-semibold
                        text-gray-700
                      ">
                        {
                          formatDate(
                            selectedData.tanggal_penugasan
                          )
                        }
                      </p>

                    </div>


                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                      ">
                        Status Pengantaran
                      </p>

                      <div className="mt-1">

                        {
                          selectedData.status_pengantaran ===
                            "SUDAH_DIANTAR"
                            ? (

                              <span className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-1.5
                                rounded-full
                                bg-green-100
                                text-green-700
                                text-xs
                                font-semibold
                              ">

                                <FaTruck />

                                Sudah Diantar

                              </span>

                            )
                            : (

                              <span className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-1.5
                                rounded-full
                                bg-amber-100
                                text-amber-700
                                text-xs
                                font-semibold
                              ">

                                <FaClock />

                                Belum Diantar

                              </span>

                            )
                        }

                      </div>

                    </div>

                  </div>

                </div>


                {/* PEMBAYARAN */}

                <div
                  className="
                    rounded-2xl
                    bg-gray-50
                    border
                    border-gray-100
                    p-5
                  "
                >

                  <h3
                    className="
                      font-bold
                      text-gray-700
                      mb-4
                    "
                  >
                    Informasi Pembayaran
                  </h3>


                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-3
                      gap-4
                    "
                  >

                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                      ">
                        Tanggal Pembayaran
                      </p>

                      <p className="
                        font-semibold
                        text-gray-700
                      ">
                        {
                          formatDate(
                            selectedData.tanggal_pembayaran
                          )
                        }
                      </p>

                    </div>


                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                      ">
                        Metode Pembayaran
                      </p>

                      <div className="mt-1">

                        {
                          renderPaymentMethod(
                            selectedData.metode_pembayaran
                          )
                        }

                      </div>

                    </div>


                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                      ">
                        Status Pembayaran
                      </p>

                      <div className="mt-1">

                        {
                          renderStatusPembayaran(
                            selectedData.status_pembayaran
                          )
                        }

                      </div>

                    </div>

                  </div>

                </div>

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
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    setSelectedData(
                      null
                    )
                  }
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

        )
      }

    </div>

  );

};


export default TableLaporan;