import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaHashtag,
  FaFileInvoiceDollar,
  FaBuilding,
  FaStore,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaUndo,
  FaUser,
  FaEllipsisV,
  FaSearch,
  FaFilter,
  FaEye,
  FaRoute,
  FaExclamationTriangle,
  FaClipboardList,
  FaTimes,
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
// FORMAT RUPIAH
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
  ).format(value);

};


// =====================================================
// DUMMY DATA
// =====================================================

const dummyData = [

  {
    id: 1,

    nomor_tagihan:
      "2806205873",

    pelanggan:
      "RSUD H. Sahudin Kutacane",

    cabang:
      "KFTD ACEH",

    sisa_saldo:
      922459,

    tanggal_jatuh_tempo:
      "2023-06-29",

    periode:
      "31 Dec 2025",

    status_penugasan:
      "DIKIRIM",

    tanggal_penugasan:
      "2026-08-01",

    umur_faktur:
      1021,

    jatuh_tempo:
      true,

    kolektor:
      "Irama Fajri",

    status_pengantaran:
      "BELUM_DIANTAR",

  },

  {
    id: 2,

    nomor_tagihan:
      "2806205852",

    pelanggan:
      "RSUD H. Sahudin Kutacane",

    cabang:
      "KFTD ACEH",

    sisa_saldo:
      30000,

    tanggal_jatuh_tempo:
      "2023-06-29",

    periode:
      "31 Dec 2025",

    status_penugasan:
      "DIKIRIM",

    tanggal_penugasan:
      "2026-08-02",

    umur_faktur:
      1021,

    jatuh_tempo:
      true,

    kolektor:
      "Irama Fajri",

    status_pengantaran:
      "SUDAH_DIANTAR",

  },

  {
    id: 3,

    nomor_tagihan:
      "2806205863",

    pelanggan:
      "RSUD H. Sahudin Kutacane",

    cabang:
      "KFTD ACEH",

    sisa_saldo:
      247500,

    tanggal_jatuh_tempo:
      "2023-06-29",

    periode:
      "31 Dec 2025",

    status_penugasan:
      "DIKEMBALIKAN",

    tanggal_penugasan:
      "2026-08-03",

    umur_faktur:
      1021,

    jatuh_tempo:
      true,

    kolektor:
      "Irama Fajri",

    status_pengantaran:
      "GAGAL_DIANTAR",

  },

  {
    id: 4,

    nomor_tagihan:
      "2806275806",

    pelanggan:
      "RSUD H. Sahudin Kutacane",

    cabang:
      "KFTD ACEH",

    sisa_saldo:
      1034550,

    tanggal_jatuh_tempo:
      "2023-07-27",

    periode:
      "31 Dec 2025",

    status_penugasan:
      "DIKIRIM",

    tanggal_penugasan:
      "2026-08-04",

    umur_faktur:
      993,

    jatuh_tempo:
      true,

    kolektor:
      "Irama Fajri",

    status_pengantaran:
      "BELUM_DIANTAR",

  },

  {
    id: 5,

    nomor_tagihan:
      "2806205662",

    pelanggan:
      "RSUD H. Sahudin Kutacane",

    cabang:
      "KFTD ACEH",

    sisa_saldo:
      57600,

    tanggal_jatuh_tempo:
      "2023-06-29",

    periode:
      "31 Dec 2025",

    status_penugasan:
      "DIKIRIM",

    tanggal_penugasan:
      "2026-08-05",

    umur_faktur:
      1021,

    jatuh_tempo:
      true,

    kolektor:
      "Fajar Hidayat",

    status_pengantaran:
      "BELUM_DIANTAR",

  },

  {
    id: 6,

    nomor_tagihan:
      "2806205788",

    pelanggan:
      "Apotek Sehat Medika",

    cabang:
      "KFTD MEDAN",

    sisa_saldo:
      12500000,

    tanggal_jatuh_tempo:
      "2026-08-10",

    periode:
      "31 Jul 2026",

    status_penugasan:
      "DIKIRIM",

    tanggal_penugasan:
      "2026-08-08",

    umur_faktur:
      6,

    jatuh_tempo:
      false,

    kolektor:
      "Eko Saputra",

    status_pengantaran:
      "SUDAH_DIANTAR",

  },

  {
    id: 7,

    nomor_tagihan:
      "2806205791",

    pelanggan:
      "Dinas Kesehatan Medan",

    cabang:
      "KFTD MEDAN",

    sisa_saldo:
      45000000,

    tanggal_jatuh_tempo:
      "2026-07-25",

    periode:
      "31 Jul 2026",

    status_penugasan:
      "DIKEMBALIKAN",

    tanggal_penugasan:
      "2026-08-01",

    umur_faktur:
      22,

    jatuh_tempo:
      true,

    kolektor:
      "Gilang Ramadhan",

    status_pengantaran:
      "GAGAL_DIANTAR",

  },

  {
    id: 8,

    nomor_tagihan:
      "2806205812",

    pelanggan:
      "Apotek Maju Bersama",

    cabang:
      "KFTD JAKARTA",

    sisa_saldo:
      8500000,

    tanggal_jatuh_tempo:
      "2026-08-15",

    periode:
      "31 Jul 2026",

    status_penugasan:
      "DIKIRIM",

    tanggal_penugasan:
      "2026-08-10",

    umur_faktur:
      1,

    jatuh_tempo:
      false,

    kolektor:
      "Fajar Hidayat",

    status_pengantaran:
      "BELUM_DIANTAR",

  },

  {
    id: 9,

    nomor_tagihan:
      "2806205821",

    pelanggan:
      "RSUD Kota Bogor",

    cabang:
      "KFTD BOGOR",

    sisa_saldo:
      125000000,

    tanggal_jatuh_tempo:
      "2026-07-01",

    periode:
      "30 Jun 2026",

    status_penugasan:
      "DIKIRIM",

    tanggal_penugasan:
      "2026-08-02",

    umur_faktur:
      46,

    jatuh_tempo:
      true,

    kolektor:
      "Eko Saputra",

    status_pengantaran:
      "SUDAH_DIANTAR",

  },

  {
    id: 10,

    nomor_tagihan:
      "2806205830",

    pelanggan:
      "Klinik Medika Utama",

    cabang:
      "KFTD JAKARTA",

    sisa_saldo:
      9750000,

    tanggal_jatuh_tempo:
      "2026-08-05",

    periode:
      "31 Jul 2026",

    status_penugasan:
      "DIKIRIM",

    tanggal_penugasan:
      "2026-08-09",

    umur_faktur:
      11,

    jatuh_tempo:
      true,

    kolektor:
      "Fajar Hidayat",

    status_pengantaran:
      "BELUM_DIANTAR",

  },

];


// =====================================================
// STATUS PENUGASAN
// =====================================================

const statusPenugasanConfig = {

  DIKIRIM: {

    label:
      "Dikirim",

    className:
      "bg-green-100 text-green-700",

    icon:
      FaCheckCircle,

  },

  DIKEMBALIKAN: {

    label:
      "Dikembalikan",

    className:
      "bg-orange-100 text-orange-700",

    icon:
      FaUndo,

  },

};


// =====================================================
// STATUS PENGANTARAN
// =====================================================

const statusPengantaranConfig = {

  BELUM_DIANTAR: {

    label:
      "Belum Diantar",

    className:
      "bg-amber-100 text-amber-700",

    icon:
      FaClock,

  },

  SUDAH_DIANTAR: {

    label:
      "Sudah Diantar",

    className:
      "bg-green-100 text-green-700",

    icon:
      FaTruck,

  },

  GAGAL_DIANTAR: {

    label:
      "Gagal Diantar",

    className:
      "bg-red-100 text-red-700",

    icon:
      FaTimes,

  },

};


// =====================================================
// COMPONENT
// =====================================================

const TableMonitoringPenugasan = ({
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
    selectedStatus,
    setSelectedStatus,
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
  // SUMMARY
  // ===================================================

  const summaryData =
    useMemo(
      () => {

        return {

          total:
            allData.length,

          dikirim:
            allData.filter(
              item =>
                item.status_penugasan ===
                "DIKIRIM"
            ).length,

          dikembalikan:
            allData.filter(
              item =>
                item.status_penugasan ===
                "DIKEMBALIKAN"
            ).length,

          belumDiantar:
            allData.filter(
              item =>
                item.status_pengantaran ===
                "BELUM_DIANTAR"
            ).length,

          sudahDiantar:
            allData.filter(
              item =>
                item.status_pengantaran ===
                "SUDAH_DIANTAR"
            ).length,

          kritis:
            allData.filter(
              item =>
                item.umur_faktur >= 90
            ).length,

        };

      },
      [
        allData,
      ]
    );


  // ===================================================
  // OPTIONS FILTER
  // ===================================================

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

                item.nomor_tagihan
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.pelanggan
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

                ||

                item.cabang
                  ?.toLowerCase()
                  .includes(
                    search
                  )

            );

        }


        // STATUS PENUGASAN

        if (
          selectedStatus !==
          "ALL"
        ) {

          data =
            data.filter(
              item =>
                item.status_penugasan ===
                selectedStatus
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


        return data;

      },
      [
        allData,
        keyword,
        selectedStatus,
        selectedCabang,
        selectedKolektor,
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
      selectedStatus,
      selectedCabang,
      selectedKolektor,
      perPage,
    ]
  );


  // ===================================================
  // RESET FILTER
  // ===================================================

  const resetFilter =
    () => {

      setKeyword("");

      setSelectedStatus(
        "ALL"
      );

      setSelectedCabang(
        "ALL"
      );

      setSelectedKolektor(
        "ALL"
      );

      setCurrentPage(
        1
      );

    };


  // ===================================================
  // STATUS PENUGASAN
  // ===================================================

  const renderStatusPenugasan =
    (
      status
    ) => {

      const config =
        statusPenugasanConfig[
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
  // STATUS PENGANTARAN
  // ===================================================

  const renderStatusPengantaran =
    (
      status
    ) => {

      const config =
        statusPengantaranConfig[
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
  // AGE LABEL
  // ===================================================

  const renderUmurFaktur =
    (
      umur
    ) => {

      let className =
        "bg-green-100 text-green-700";


      let label =
        `Normal (${umur} hari)`;


      if (
        umur >= 90
      ) {

        className =
          "bg-red-800 text-white";

        label =
          `Kritis (${umur} hari)`;

      }
      else if (
        umur >= 60
      ) {

        className =
          "bg-orange-100 text-orange-700";

        label =
          `Perhatian (${umur} hari)`;

      }
      else if (
        umur >= 30
      ) {

        className =
          "bg-amber-100 text-amber-700";

        label =
          `Waspada (${umur} hari)`;

      }


      return (

        <span
          className={`
            inline-flex
            items-center
            gap-1
            px-2.5
            py-1.5
            rounded-lg
            text-[11px]
            font-bold
            whitespace-nowrap
            ${className}
          `}
        >

          {
            umur >= 90
              ? (
                <FaExclamationTriangle />
              )
              : null
          }

          {
            label
          }

        </span>

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
      {/* TOP BAR */}
      {/* ================================================= */}

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
            lg:w-[400px]
          "
        >

          <IoSearch
            className="
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="
              Cari nomor tagihan / pelanggan / kolektor...
            "
            className="grow"
            value={
              keyword
            }
            onChange={
              e =>
                setKeyword(
                  e.target.value
                )
            }
          />

        </div>


        {/* FILTER BUTTON */}

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
                flex
                flex-col
                lg:flex-row
                gap-4
              "
            >

              {/* STATUS */}

              <div
                className="
                  flex-1
                "
              >

                <label
                  className="
                    block
                    text-xs
                    font-semibold
                    text-gray-600
                    mb-2
                  "
                >
                  Status Penugasan
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
                    selectedStatus
                  }
                  onChange={
                    e =>
                      setSelectedStatus(
                        e.target.value
                      )
                  }
                >

                  <option value="ALL">
                    Semua Status
                  </option>

                  <option value="DIKIRIM">
                    Dikirim
                  </option>

                  <option value="DIKEMBALIKAN">
                    Dikembalikan
                  </option>

                </select>

              </div>


              {/* CABANG */}

              <div
                className="
                  flex-1
                "
              >

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

              <div
                className="
                  flex-1
                "
              >

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


              {/* RESET */}

              <div
                className="
                  flex
                  items-end
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
                  Reset
                </button>

              </div>

            </div>

          </div>

        )
      }


      {/* ================================================= */}
      {/* SUMMARY CARDS */}
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
            p-4
            border
            border-blue-100
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
                Total Penugasan
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


        {/* DIKIRIM */}

        <div
          className="
            rounded-2xl
            bg-green-50
            p-4
            border
            border-green-100
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
                Dikirim
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-green-900
                "
              >
                {
                  summaryData.dikirim
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


        {/* DIKEMBALIKAN */}

        <div
          className="
            rounded-2xl
            bg-orange-50
            p-4
            border
            border-orange-100
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
                Dikembalikan
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-orange-900
                "
              >
                {
                  summaryData.dikembalikan
                }
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

              <FaUndo
                className="
                  text-orange-600
                "
              />

            </div>

          </div>

        </div>


        {/* KRITIS */}

        <div
          className="
            rounded-2xl
            bg-red-50
            p-4
            border
            border-red-100
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
                  text-red-700
                "
              >
                Faktur Kritis
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-red-900
                "
              >
                {
                  summaryData.kritis
                }
              </p>

            </div>


            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-red-100
                flex
                items-center
                justify-center
              "
            >

              <FaExclamationTriangle
                className="
                  text-red-600
                "
              />

            </div>

          </div>

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

              {/* HEADER */}

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
                  <th
                    className="
                      px-4
                      py-3
                    "
                  >
                    Aksi
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
                    No
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                      whitespace-nowrap
                    "
                  >
                    Nomor Tagihan
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
                    Sisa Saldo
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                      whitespace-nowrap
                    "
                  >
                    Tgl Jatuh Tempo
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                      whitespace-nowrap
                    "
                  >
                    Periode
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                      whitespace-nowrap
                    "
                  >
                    Status Penugasan
                  </th>

                  <th
                    className="
                      px-4
                      py-3
                      whitespace-nowrap
                    "
                  >
                    Umur Faktur
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

                </tr>

              </thead>


              {/* BODY */}

              <tbody>

                {
                  paginatedData.length ===
                    0 ? (

                    <tr>

                      <td
                        colSpan={13}
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

                        Tidak ada data penugasan

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

                          {/* PENGANTARAN */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            {
                              renderStatusPengantaran(
                                item.status_pengantaran
                              )
                            }

                          </td>

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


                          {/* NOMOR TAGIHAN */}

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


                              <span
                                className="
                                  font-semibold
                                  text-primary
                                "
                              >
                                {
                                  item.nomor_tagihan
                                }
                              </span>

                            </div>

                          </td>


                          {/* PELANGGAN */}

                          <td
                            className="
                              px-4
                              py-3
                              min-w-[230px]
                            "
                          >

                            <div
                              className="
                                flex
                                items-start
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
                                  shrink-0
                                "
                              >

                                <FaBuilding />

                              </div>


                              <div>

                                <p
                                  className="
                                    font-semibold
                                    text-gray-700
                                  "
                                >
                                  {
                                    item.pelanggan
                                  }
                                </p>

                              </div>

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


                          {/* SALDO */}

                          <td
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >

                            <span
                              className="
                                font-bold
                                text-gray-700
                              "
                            >
                              {
                                formatRupiah(
                                  item.sisa_saldo
                                )
                              }
                            </span>

                          </td>


                          {/* TANGGAL JATUH TEMPO */}

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
                              "
                            >

                              <FaCalendarAlt
                                className="
                                  text-primary
                                "
                              />

                              {
                                formatDate(
                                  item.tanggal_jatuh_tempo
                                )
                              }

                            </div>

                          </td>


                          {/* PERIODE */}

                          <td
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >

                            <span
                              className="
                                text-sm
                                text-gray-600
                              "
                            >
                              {
                                item.periode
                              }
                            </span>

                          </td>


                          {/* STATUS PENUGASAN */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            {
                              renderStatusPenugasan(
                                item.status_penugasan
                              )
                            }

                          </td>


                          {/* UMUR FAKTUR */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            {
                              renderUmurFaktur(
                                item.umur_faktur
                              )
                            }

                          </td>


                          {/* JATUH TEMPO */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            {
                              item.jatuh_tempo
                                ? (

                                  <span
                                    className="
                                      inline-flex
                                      items-center
                                      justify-center
                                      px-3
                                      py-1.5
                                      rounded-lg
                                      bg-red-100
                                      text-red-600
                                      text-xs
                                      font-bold
                                    "
                                  >

                                    Ya

                                  </span>

                                )
                                : (

                                  <span
                                    className="
                                      inline-flex
                                      items-center
                                      justify-center
                                      px-3
                                      py-1.5
                                      rounded-lg
                                      bg-green-100
                                      text-green-600
                                      text-xs
                                      font-bold
                                    "
                                  >

                                    Tidak

                                  </span>

                                )
                            }

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
                                  font-semibold
                                  text-gray-700
                                "
                              >
                                {
                                  item.kolektor ||
                                  "-"
                                }
                              </span>

                            </div>

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
                        bg-white/10
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <FaRoute />

                    </div>


                    <div>

                      <h3
                        className="
                          font-bold
                          text-lg
                        "
                      >
                        Detail Penugasan
                      </h3>

                      <p
                        className="
                          text-xs
                          text-blue-100
                        "
                      >

                        {
                          selectedData.nomor_tagihan
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
                  grid
                  grid-cols-1
                  lg:grid-cols-2
                  gap-5
                "
              >

                {/* TAGIHAN */}

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
                    Informasi Tagihan
                  </h3>


                  <div
                    className="
                      flex
                      flex-col
                      gap-4
                    "
                  >

                    <div>

                      <p
                        className="
                          text-xs
                          text-gray-400
                        "
                      >
                        Nomor Tagihan
                      </p>

                      <p
                        className="
                          font-bold
                          text-primary
                        "
                      >
                        {
                          selectedData.nomor_tagihan
                        }
                      </p>

                    </div>


                    <div>

                      <p
                        className="
                          text-xs
                          text-gray-400
                        "
                      >
                        Pelanggan
                      </p>

                      <p
                        className="
                          font-semibold
                          text-gray-700
                        "
                      >
                        {
                          selectedData.pelanggan
                        }
                      </p>

                    </div>


                    <div>

                      <p
                        className="
                          text-xs
                          text-gray-400
                        "
                      >
                        Cabang
                      </p>

                      <p
                        className="
                          font-semibold
                          text-gray-700
                        "
                      >
                        {
                          selectedData.cabang
                        }
                      </p>

                    </div>


                    <div>

                      <p
                        className="
                          text-xs
                          text-gray-400
                        "
                      >
                        Sisa Saldo
                      </p>

                      <p
                        className="
                          font-bold
                          text-primary
                        "
                      >
                        {
                          formatRupiah(
                            selectedData.sisa_saldo
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
                      flex
                      flex-col
                      gap-4
                    "
                  >

                    <div>

                      <p
                        className="
                          text-xs
                          text-gray-400
                        "
                      >
                        Kolektor
                      </p>

                      <p
                        className="
                          font-semibold
                          text-gray-700
                        "
                      >
                        {
                          selectedData.kolektor ||
                          "-"
                        }
                      </p>

                    </div>


                    <div>

                      <p
                        className="
                          text-xs
                          text-gray-400
                        "
                      >
                        Tanggal Penugasan
                      </p>

                      <p
                        className="
                          font-semibold
                          text-gray-700
                        "
                      >
                        {
                          formatDate(
                            selectedData.tanggal_penugasan
                          )
                        }
                      </p>

                    </div>


                    <div>

                      <p
                        className="
                          text-xs
                          text-gray-400
                        "
                      >
                        Status Penugasan
                      </p>

                      <div className="mt-1">

                        {
                          renderStatusPenugasan(
                            selectedData.status_penugasan
                          )
                        }

                      </div>

                    </div>


                    <div>

                      <p
                        className="
                          text-xs
                          text-gray-400
                        "
                      >
                        Status Pengantaran
                      </p>

                      <div className="mt-1">

                        {
                          renderStatusPengantaran(
                            selectedData.status_pengantaran
                          )
                        }

                      </div>

                    </div>

                  </div>

                </div>


                {/* UMUR */}

                <div
                  className="
                    lg:col-span-2
                    rounded-2xl
                    bg-gray-50
                    border
                    border-gray-100
                    p-5
                  "
                >

                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-3
                      gap-5
                    "
                  >

                    <div>

                      <p
                        className="
                          text-xs
                          text-gray-400
                        "
                      >
                        Tanggal Jatuh Tempo
                      </p>

                      <p
                        className="
                          font-semibold
                          text-gray-700
                        "
                      >
                        {
                          formatDate(
                            selectedData.tanggal_jatuh_tempo
                          )
                        }
                      </p>

                    </div>


                    <div>

                      <p
                        className="
                          text-xs
                          text-gray-400
                        "
                      >
                        Umur Faktur
                      </p>

                      <div className="mt-1">

                        {
                          renderUmurFaktur(
                            selectedData.umur_faktur
                          )
                        }

                      </div>

                    </div>


                    <div>

                      <p
                        className="
                          text-xs
                          text-gray-400
                        "
                      >
                        Jatuh Tempo
                      </p>

                      <div className="mt-1">

                        {
                          selectedData.jatuh_tempo
                            ? (

                              <span
                                className="
                                  inline-flex
                                  px-3
                                  py-1.5
                                  rounded-lg
                                  bg-red-100
                                  text-red-600
                                  text-xs
                                  font-bold
                                "
                              >
                                Ya
                              </span>

                            )
                            : (

                              <span
                                className="
                                  inline-flex
                                  px-3
                                  py-1.5
                                  rounded-lg
                                  bg-green-100
                                  text-green-600
                                  text-xs
                                  font-bold
                                "
                              >
                                Tidak
                              </span>

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


export default TableMonitoringPenugasan;