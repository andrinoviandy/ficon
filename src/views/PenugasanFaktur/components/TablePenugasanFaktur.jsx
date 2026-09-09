import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaEllipsisV,
  FaHashtag,
  FaFileInvoiceDollar,
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTruck,
  FaClock,
  FaCheckCircle,
  FaUser,
  FaRoute,
  FaUserTie,
  FaUsers,
  FaCheckDouble,
  FaTimes,
  FaClipboardList,
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
// DUMMY PETUGAS
// =====================================================

const dummyPetugas = [

  {
    id: 1,
    nama: "Andri Noviandy",
    tipe: "SALESMAN",
    kode: "SLS001",
  },

  {
    id: 2,
    nama: "Budi Santoso",
    tipe: "SALESMAN",
    kode: "SLS002",
  },

  {
    id: 3,
    nama: "Citra Lestari",
    tipe: "SALESMAN",
    kode: "SLS003",
  },

  {
    id: 4,
    nama: "Dimas Pratama",
    tipe: "SALESMAN",
    kode: "SLS004",
  },

  {
    id: 5,
    nama: "Eko Saputra",
    tipe: "KOLEKTOR",
    kode: "COL001",
  },

  {
    id: 6,
    nama: "Fajar Hidayat",
    tipe: "KOLEKTOR",
    kode: "COL002",
  },

  {
    id: 7,
    nama: "Gilang Ramadhan",
    tipe: "KOLEKTOR",
    kode: "COL003",
  },

];


// =====================================================
// DUMMY DATA FAKTUR
// =====================================================

const dummyData = [

  {
    id: 1,

    no_faktur:
      "INV-2026-00001",

    nama_customer:
      "Dinas Kesehatan Kota Medan",

    alamat:
      "Jl. Gatot Subroto No. 125, Medan",

    jatuh_tempo:
      "2026-08-22",

    nominal:
      140000000,

    status:
      "BELUM_DITUGASKAN",

    petugas_id:
      null,

    nama_petugas:
      null,

    tipe_petugas:
      null,

  },


  {
    id: 2,

    no_faktur:
      "INV-2026-00002",

    nama_customer:
      "Apotek Maju Djaya",

    alamat:
      "Jl. Sisingamangaraja No. 88, Medan",

    jatuh_tempo:
      "2026-08-25",

    nominal:
      85000000,

    status:
      "BELUM_DITUGASKAN",

    petugas_id:
      null,

    nama_petugas:
      null,

    tipe_petugas:
      null,

  },


  {
    id: 3,

    no_faktur:
      "INV-2026-00003",

    nama_customer:
      "Apotek Rusli",

    alamat:
      "Jl. Iskandar Muda No. 45, Medan",

    jatuh_tempo:
      "2026-08-27",

    nominal:
      140000000,

    status:
      "SUDAH_DITUGASKAN",

    petugas_id:
      1,

    nama_petugas:
      "Andri Noviandy",

    tipe_petugas:
      "SALESMAN",

  },


  {
    id: 4,

    no_faktur:
      "INV-2026-00004",

    nama_customer:
      "RSUD Pasuruan",

    alamat:
      "Jl. Wahidin Sudirohusodo No. 10, Pasuruan",

    jatuh_tempo:
      "2026-08-29",

    nominal:
      175000000,

    status:
      "BELUM_DITUGASKAN",

    petugas_id:
      null,

    nama_petugas:
      null,

    tipe_petugas:
      null,

  },


  {
    id: 5,

    no_faktur:
      "INV-2026-00005",

    nama_customer:
      "RS Hermina Medan",

    alamat:
      "Jl. Asrama No. 12, Medan",

    jatuh_tempo:
      "2026-08-30",

    nominal:
      95000000,

    status:
      "SUDAH_DITUGASKAN",

    petugas_id:
      5,

    nama_petugas:
      "Eko Saputra",

    tipe_petugas:
      "KOLEKTOR",

  },


  {
    id: 6,

    no_faktur:
      "INV-2026-00006",

    nama_customer:
      "Apotek Sehat Sentosa",

    alamat:
      "Jl. Kelapa Gading Raya No. 21, Jakarta",

    jatuh_tempo:
      "2026-09-01",

    nominal:
      65000000,

    status:
      "BELUM_DITUGASKAN",

    petugas_id:
      null,

    nama_petugas:
      null,

    tipe_petugas:
      null,

  },


  {
    id: 7,

    no_faktur:
      "INV-2026-00007",

    nama_customer:
      "Klinik Medika Utama",

    alamat:
      "Jl. Boulevard Barat No. 30, Jakarta",

    jatuh_tempo:
      "2026-09-03",

    nominal:
      72500000,

    status:
      "SUDAH_DITUGASKAN",

    petugas_id:
      2,

    nama_petugas:
      "Budi Santoso",

    tipe_petugas:
      "SALESMAN",

  },


  {
    id: 8,

    no_faktur:
      "INV-2026-00008",

    nama_customer:
      "RS Siloam Medan",

    alamat:
      "Jl. Imam Bonjol No. 5, Medan",

    jatuh_tempo:
      "2026-09-05",

    nominal:
      210000000,

    status:
      "BELUM_DITUGASKAN",

    petugas_id:
      null,

    nama_petugas:
      null,

    tipe_petugas:
      null,

  },


  {
    id: 9,

    no_faktur:
      "INV-2026-00009",

    nama_customer:
      "Dinas Kesehatan Deli Serdang",

    alamat:
      "Jl. Negara No. 100, Deli Serdang",

    jatuh_tempo:
      "2026-09-07",

    nominal:
      125000000,

    status:
      "BELUM_DITUGASKAN",

    petugas_id:
      null,

    nama_petugas:
      null,

    tipe_petugas:
      null,

  },


  {
    id: 10,

    no_faktur:
      "INV-2026-00010",

    nama_customer:
      "Apotek Kimia Sehat",

    alamat:
      "Jl. Sunter Agung No. 18, Jakarta",

    jatuh_tempo:
      "2026-09-10",

    nominal:
      45000000,

    status:
      "SUDAH_DITUGASKAN",

    petugas_id:
      6,

    nama_petugas:
      "Fajar Hidayat",

    tipe_petugas:
      "KOLEKTOR",

  },


  {
    id: 11,

    no_faktur:
      "INV-2026-00011",

    nama_customer:
      "RSUD Kota Bogor",

    alamat:
      "Jl. Pajajaran No. 50, Bogor",

    jatuh_tempo:
      "2026-09-12",

    nominal:
      185000000,

    status:
      "BELUM_DITUGASKAN",

    petugas_id:
      null,

    nama_petugas:
      null,

    tipe_petugas:
      null,

  },


  {
    id: 12,

    no_faktur:
      "INV-2026-00012",

    nama_customer:
      "Apotek Berkah Farma",

    alamat:
      "Jl. Merdeka No. 12, Bogor",

    jatuh_tempo:
      "2026-09-15",

    nominal:
      55000000,

    status:
      "BELUM_DITUGASKAN",

    petugas_id:
      null,

    nama_petugas:
      null,

    tipe_petugas:
      null,

  },

];


// =====================================================
// STATUS CONFIG
// =====================================================

const statusConfig = {

  BELUM_DITUGASKAN: {

    label:
      "Belum Ditugaskan",

    icon:
      FaClock,

    className:
      "bg-amber-100 text-amber-700",

  },

  SUDAH_DITUGASKAN: {

    label:
      "Sudah Ditugaskan",

    icon:
      FaCheckCircle,

    className:
      "bg-green-100 text-green-700",

  },

};


// =====================================================
// COMPONENT
// =====================================================

const TablePenugasanFaktur = ({
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
    selectedIds,
    setSelectedIds,
  ] = useState(
    []
  );


  const [
    selectedPetugas,
    setSelectedPetugas,
  ] = useState(
    ""
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
    showAssignmentPanel,
    setShowAssignmentPanel,
  ] = useState(
    false
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

          belum:
            allData.filter(
              item =>
                item.status ===
                "BELUM_DITUGASKAN"
            ).length,

          sudah:
            allData.filter(
              item =>
                item.status ===
                "SUDAH_DITUGASKAN"
            ).length,

        };

      },
      [
        allData,
      ]
    );


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


        // STATUS

        if (
          selectedStatus !==
          "ALL"
        ) {

          data =
            data.filter(
              item =>
                item.status ===
                selectedStatus
            );

        }


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

                item.nama_customer
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.alamat
                  ?.toLowerCase()
                  .includes(
                    search
                  )

            );

        }


        return data;

      },
      [
        allData,
        keyword,
        selectedStatus,
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
      perPage,
    ]
  );


  // ===================================================
  // SELECTABLE
  // ===================================================

  const currentPageSelectableIds =
    paginatedData
      .filter(
        item =>
          item.status ===
          "BELUM_DITUGASKAN"
      )
      .map(
        item =>
          item.id
      );


  const isAllSelected =
    currentPageSelectableIds.length >
    0 &&
    currentPageSelectableIds.every(
      id =>
        selectedIds.includes(
          id
        )
    );


  // ===================================================
  // SELECT ONE
  // ===================================================

  const handleSelectOne = (
    id
  ) => {

    setSelectedIds(
      prev => {

        if (
          prev.includes(
            id
          )
        ) {

          return prev.filter(
            x =>
              x !== id
          );

        }


        return [
          ...prev,
          id,
        ];

      }
    );

  };


  // ===================================================
  // SELECT ALL
  // ===================================================

  const handleSelectAll =
    () => {

      if (
        isAllSelected
      ) {

        setSelectedIds(
          prev =>
            prev.filter(
              id =>
                !currentPageSelectableIds.includes(
                  id
                )
            )
        );

      } else {

        setSelectedIds(
          prev => [

            ...new Set(
              [
                ...prev,
                ...currentPageSelectableIds,
              ]
            ),

          ]
        );

      }

    };


  // ===================================================
  // OPEN ASSIGNMENT
  // ===================================================

  const openAssignment =
    () => {

      if (
        selectedIds.length ===
        0
      ) {

        return;

      }


      setSelectedPetugas(
        ""
      );

      setShowAssignmentPanel(
        true
      );

    };


  // ===================================================
  // CLOSE ASSIGNMENT
  // ===================================================

  const closeAssignment =
    () => {

      setSelectedPetugas(
        ""
      );

      setShowAssignmentPanel(
        false
      );

    };


  // ===================================================
  // ASSIGN FACTUR
  // ===================================================

  const handleAssignment =
    () => {

      if (
        !selectedPetugas
      ) {

        return;

      }


      const petugas =
        dummyPetugas.find(
          item =>
            String(
              item.id
            ) ===
            String(
              selectedPetugas
            )
        );


      if (!petugas) {

        return;

      }


      setAllData(
        prev =>
          prev.map(
            item =>

              selectedIds.includes(
                item.id
              )

                ? {

                  ...item,

                  status:
                    "SUDAH_DITUGASKAN",

                  petugas_id:
                    petugas.id,

                  nama_petugas:
                    petugas.nama,

                  tipe_petugas:
                    petugas.tipe,

                }

                : item

          )
      );


      setSelectedIds(
        []
      );


      closeAssignment();

    };


  // ===================================================
  // STATUS
  // ===================================================

  const renderStatus =
    (
      status
    ) => {

      const config =
        statusConfig[
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
  // PAGINATION
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
  // HEADER TABLE
  // ===================================================

  const headerTable = [

    {
      label:
        "No",

      icon:
        <FaHashtag />,
    },

    {
      label:
        "No. Faktur",

      icon:
        <FaFileInvoiceDollar />,
    },

    {
      label:
        "Customer",

      icon:
        <FaBuilding />,
    },

    {
      label:
        "Alamat",

      icon:
        <FaMapMarkerAlt />,
    },

    {
      label:
        "Jatuh Tempo",

      icon:
        <FaCalendarAlt />,
    },

    {
      label:
        "Petugas",

      icon:
        <FaUser />,
    },

    {
      label:
        "Status",

      icon:
        <FaRoute />,
    },

  ];


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
      {/* SEARCH + STATUS */}
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
            lg:w-[380px]
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
              Cari nomor faktur / customer...
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


        {/* STATUS */}

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
              text-gray-500
            "
          >
            Status:
          </span>


          <select
            className="
              select
              select-sm
              select-bordered
              rounded-full
              bg-white
              min-w-[190px]
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

            <option value="BELUM_DITUGASKAN">
              Belum Ditugaskan
            </option>

            <option value="SUDAH_DITUGASKAN">
              Sudah Ditugaskan
            </option>

          </select>

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
          lg:grid-cols-3
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


        {/* BELUM */}

        <div
          className="
            rounded-2xl
            bg-amber-50
            p-4
            border
            border-amber-100
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
                  text-amber-700
                "
              >
                Belum Ditugaskan
              </p>


              <p
                className="
                  text-2xl
                  font-bold
                  text-amber-900
                "
              >
                {
                  summaryData.belum
                }
              </p>

            </div>


            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-amber-100
                flex
                items-center
                justify-center
              "
            >

              <FaClock
                className="
                  text-amber-600
                "
              />

            </div>

          </div>

        </div>


        {/* SUDAH */}

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
                Sudah Ditugaskan
              </p>


              <p
                className="
                  text-2xl
                  font-bold
                  text-green-900
                "
              >
                {
                  summaryData.sudah
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

      </div>


      {/* ================================================= */}
      {/* BULK ACTION */}
      {/* ================================================= */}

      {
        selectedIds.length >
        0 && (

          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-3
              bg-blue-50
              border
              border-blue-200
              rounded-xl
              px-4
              py-3
            "
          >

            {/* INFO */}

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-blue-900
              "
            >

              <FaCheckDouble />

              <span>

                <b>
                  {
                    selectedIds.length
                  }
                </b>

                {" "}
                faktur dipilih

              </span>

            </div>


            {/* ACTION */}

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <button
                type="button"
                onClick={() =>
                  setSelectedIds(
                    []
                  )
                }
                className="
                  px-4
                  py-2
                  rounded-full
                  border
                  border-gray-300
                  bg-white
                  text-gray-600
                  text-sm
                  font-semibold
                  hover:bg-gray-100
                "
              >

                Batal

              </button>


              <button
                type="button"
                onClick={
                  openAssignment
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-2
                  rounded-full
                  bg-primary
                  text-white
                  text-sm
                  font-semibold
                  hover:opacity-90
                  transition
                  shadow-md
                "
              >

                <FaRoute />

                Tugaskan Faktur
                (
                {
                  selectedIds.length
                }
                )

              </button>

            </div>

          </div>

        )
      }


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
                  text-[13px]
                  z-10
                "
              >

                <tr>

                  {/* SELECT ALL */}

                  <th
                    className="
                      px-4
                      py-3
                      w-12
                    "
                  >

                    <input
                      type="checkbox"
                      className="
                        checkbox
                        checkbox-sm
                        checkbox-white
                      "
                      checked={
                        isAllSelected
                      }
                      disabled={
                        currentPageSelectableIds.length ===
                        0
                      }
                      onChange={
                        handleSelectAll
                      }
                    />

                  </th>


                  {
                    headerTable.map(
                      (
                        h,
                        i
                      ) => (

                        <th
                          key={i}
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
                              font-semibold
                            "
                          >

                            <span>
                              {
                                h.icon
                              }
                            </span>

                            {
                              h.label
                            }

                          </div>

                        </th>

                      )
                    )
                  }

                </tr>

              </thead>


              {/* BODY */}

              <tbody>

                {
                  paginatedData.length ===
                    0 ? (

                    <tr>

                      <td
                        colSpan={
                          headerTable.length +
                          1
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

                        Tidak ada data faktur

                      </td>

                    </tr>

                  ) : (

                    paginatedData.map(
                      (
                        v,
                        i
                      ) => (

                        <tr
                          key={
                            v.id
                          }
                          className={`
                            transition
                            duration-200
                            border-b
                            ${selectedIds.includes(
                            v.id
                          )
                              ? "bg-blue-50"
                              : "hover:bg-blue-50"
                            }
                          `}
                        >

                          {/* CHECKBOX */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            <input
                              type="checkbox"
                              className="
                                checkbox
                                checkbox-sm
                                checkbox-primary
                              "
                              checked={
                                selectedIds.includes(
                                  v.id
                                )
                              }
                              disabled={
                                v.status !==
                                "BELUM_DITUGASKAN"
                              }
                              onChange={() =>
                                handleSelectOne(
                                  v.id
                                )
                              }
                            />

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
                              i +
                              1
                            }

                          </td>


                          {/* NO FAKTUR */}

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
                                  v.no_faktur
                                }
                              </span>

                            </div>

                          </td>


                          {/* CUSTOMER */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-3
                                min-w-[220px]
                              "
                            >

                              <div
                                className="
                                  w-9
                                  h-9
                                  rounded-full
                                  bg-blue-50
                                  text-primary
                                  flex
                                  items-center
                                  justify-center
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
                                    v.nama_customer
                                  }
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* ALAMAT */}

                          <td
                            className="
                              px-4
                              py-3
                              min-w-[270px]
                            "
                          >

                            <div
                              className="
                                flex
                                items-start
                                gap-2
                                text-sm
                                text-gray-600
                              "
                            >

                              <FaMapMarkerAlt
                                className="
                                  text-orange-500
                                  mt-1
                                  shrink-0
                                "
                              />

                              <span>
                                {
                                  v.alamat
                                }
                              </span>

                            </div>

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
                                  v.jatuh_tempo
                                )
                              }

                            </div>

                          </td>


                          {/* PETUGAS */}

                          <td
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >

                            {
                              v.nama_petugas
                                ? (

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
                                        bg-green-50
                                        flex
                                        items-center
                                        justify-center
                                      "
                                    >

                                      {
                                        v.tipe_petugas ===
                                          "KOLEKTOR"
                                          ? (
                                            <FaUserTie
                                              className="
                                                text-green-600
                                              "
                                            />
                                          )
                                          : (
                                            <FaUser
                                              className="
                                                text-blue-600
                                              "
                                            />
                                          )
                                      }

                                    </div>


                                    <div>

                                      <p
                                        className="
                                          text-sm
                                          font-semibold
                                          text-gray-700
                                        "
                                      >
                                        {
                                          v.nama_petugas
                                        }
                                      </p>

                                      <p
                                        className="
                                          text-[10px]
                                          text-gray-400
                                        "
                                      >
                                        {
                                          v.tipe_petugas
                                        }
                                      </p>

                                    </div>

                                  </div>

                                )
                                : (

                                  <span
                                    className="
                                      text-xs
                                      text-gray-400
                                    "
                                  >
                                    Belum ditugaskan
                                  </span>

                                )
                            }

                          </td>


                          {/* STATUS */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            {
                              renderStatus(
                                v.status
                              )
                            }

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
      {/* ASSIGNMENT MODAL */}
      {/* ================================================= */}

      {
        showAssignmentPanel && (

          <div
            className="
        fixed
        inset-0
        z-[9999]
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-3
        sm:p-5
      "
            onClick={closeAssignment}
          >

            <div
              className="
          bg-white
          rounded-2xl
          shadow-2xl
          w-full
          max-w-xl
          max-h-[90vh]
          flex
          flex-col
          overflow-hidden
        "
              onClick={(e) => e.stopPropagation()}
            >

              {/* ============================================= */}
              {/* HEADER */}
              {/* ============================================= */}

              <div
                className="
            bg-primary
            px-5
            sm:px-6
            py-4
            text-white
            shrink-0
          "
              >

                <div
                  className="
              flex
              items-center
              justify-between
              gap-3
            "
                >

                  <div
                    className="
                flex
                items-center
                gap-3
                min-w-0
              "
                  >

                    <div
                      className="
                  w-10
                  h-10
                  shrink-0
                  rounded-xl
                  bg-white/15
                  flex
                  items-center
                  justify-center
                "
                    >

                      <FaRoute />

                    </div>


                    <div className="min-w-0">

                      <h3
                        className="
                    font-bold
                    text-lg
                    truncate
                  "
                      >
                        Penugasan Faktur
                      </h3>

                      <p
                        className="
                    text-xs
                    text-blue-100
                  "
                      >
                        {selectedIds.length} faktur dipilih
                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    onClick={closeAssignment}
                    className="
                w-9
                h-9
                shrink-0
                rounded-full
                hover:bg-white/10
                flex
                items-center
                justify-center
                transition
              "
                  >

                    <FaTimes />

                  </button>

                </div>

              </div>


              {/* ============================================= */}
              {/* BODY */}
              {/* ============================================= */}

              <div
                className="
            p-4
            sm:p-6
            overflow-y-auto
            overscroll-contain
            flex-1
            min-h-0
          "
              >

                <div
                  className="
              flex
              flex-col
              gap-5
            "
                >

                  {/* ========================================= */}
                  {/* INFO */}
                  {/* ========================================= */}

                  <div
                    className="
                rounded-xl
                bg-blue-50
                border
                border-blue-100
                p-4
                flex
                items-start
                gap-3
              "
                  >

                    <FaClipboardList
                      className="
                  text-primary
                  mt-1
                  shrink-0
                "
                    />

                    <div className="min-w-0">

                      <p
                        className="
                    text-sm
                    font-semibold
                    text-blue-900
                  "
                      >
                        {selectedIds.length} faktur siap ditugaskan
                      </p>

                      <p
                        className="
                    text-xs
                    text-blue-700
                    mt-1
                    leading-relaxed
                  "
                      >
                        Pilih salesman atau kolektor
                        yang bertanggung jawab untuk
                        mengantar faktur tersebut.
                      </p>

                    </div>

                  </div>


                  {/* ========================================= */}
                  {/* PETUGAS */}
                  {/* ========================================= */}

                  <div>

                    <label
                      className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
                    >
                      Petugas Pengantaran
                    </label>


                    <select
                      className="
                  select
                  select-bordered
                  w-full
                  bg-white
                  rounded-xl
                "
                      value={selectedPetugas}
                      onChange={(e) =>
                        setSelectedPetugas(
                          e.target.value
                        )
                      }
                    >

                      <option value="">
                        -- Pilih Salesman / Kolektor --
                      </option>


                      <optgroup label="Salesman">

                        {
                          dummyPetugas
                            .filter(
                              item =>
                                item.tipe ===
                                "SALESMAN"
                            )
                            .map(
                              item => (

                                <option
                                  key={item.id}
                                  value={item.id}
                                >
                                  {item.nama}
                                  {" "}
                                  ({item.kode})
                                </option>

                              )
                            )
                        }

                      </optgroup>


                      <optgroup label="Kolektor">

                        {
                          dummyPetugas
                            .filter(
                              item =>
                                item.tipe ===
                                "KOLEKTOR"
                            )
                            .map(
                              item => (

                                <option
                                  key={item.id}
                                  value={item.id}
                                >
                                  {item.nama}
                                  {" "}
                                  ({item.kode})
                                </option>

                              )
                            )
                        }

                      </optgroup>

                    </select>

                  </div>


                  {/* ========================================= */}
                  {/* PETUGAS TERPILIH */}
                  {/* ========================================= */}

                  {
                    selectedPetugas && (

                      <div
                        className="
                    rounded-xl
                    bg-green-50
                    border
                    border-green-100
                    p-4
                    flex
                    items-center
                    gap-3
                  "
                      >

                        <div
                          className="
                      w-10
                      h-10
                      shrink-0
                      rounded-full
                      bg-white
                      flex
                      items-center
                      justify-center
                      shadow-sm
                    "
                        >

                          {
                            dummyPetugas.find(
                              item =>
                                String(item.id) ===
                                String(selectedPetugas)
                            )?.tipe === "KOLEKTOR"

                              ? (

                                <FaUserTie
                                  className="
                              text-green-600
                            "
                                />

                              )

                              : (

                                <FaUser
                                  className="
                              text-primary
                            "
                                />

                              )
                          }

                        </div>


                        <div className="min-w-0">

                          <p
                            className="
                        text-xs
                        text-gray-400
                      "
                          >
                            Petugas terpilih
                          </p>

                          <p
                            className="
                        font-semibold
                        text-gray-700
                        truncate
                      "
                          >

                            {
                              dummyPetugas.find(
                                item =>
                                  String(item.id) ===
                                  String(selectedPetugas)
                              )?.nama
                            }

                          </p>

                        </div>

                      </div>

                    )
                  }


                  {/* ========================================= */}
                  {/* FAKTUR YANG DIPILIH */}
                  {/* ========================================= */}

                  <div>

                    <div
                      className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  mb-2
                "
                    >

                      <p
                        className="
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                      >
                        Faktur yang Ditugaskan
                      </p>

                      <span
                        className="
                    text-xs
                    font-semibold
                    text-primary
                    bg-blue-50
                    px-2.5
                    py-1
                    rounded-full
                  "
                      >
                        {selectedIds.length} Faktur
                      </span>

                    </div>


                    <div
                      className="
                  border
                  border-gray-200
                  rounded-xl
                  overflow-hidden
                "
                    >

                      {/* SCROLL LIST */}

                      <div
                        className="
                    max-h-[220px]
                    sm:max-h-[260px]
                    overflow-y-auto
                    overscroll-contain
                  "
                      >

                        {
                          allData
                            .filter(
                              item =>
                                selectedIds.includes(
                                  item.id
                                )
                            )
                            .map(
                              item => (

                                <div
                                  key={item.id}
                                  className="
                              flex
                              items-center
                              justify-between
                              gap-3
                              px-4
                              py-3
                              border-b
                              last:border-b-0
                              hover:bg-blue-50
                              transition
                            "
                                >

                                  <div
                                    className="
                                min-w-0
                              "
                                  >

                                    <p
                                      className="
                                  font-semibold
                                  text-primary
                                  text-sm
                                  truncate
                                "
                                    >
                                      {item.no_faktur}
                                    </p>

                                    <p
                                      className="
                                  text-xs
                                  text-gray-500
                                  truncate
                                  mt-0.5
                                "
                                    >
                                      {item.nama_customer}
                                    </p>

                                    <p
                                      className="
                                  text-[11px]
                                  text-gray-400
                                  mt-0.5
                                "
                                    >
                                      Jatuh tempo:{" "}
                                      {formatDate(
                                        item.jatuh_tempo
                                      )}
                                    </p>

                                  </div>


                                  <FaFileInvoiceDollar
                                    className="
                                text-gray-300
                                shrink-0
                              "
                                  />

                                </div>

                              )
                            )
                        }

                      </div>

                    </div>

                  </div>

                </div>

              </div>


              {/* ============================================= */}
              {/* FOOTER */}
              {/* ============================================= */}

              <div
                className="
            border-t
            bg-gray-50
            px-4
            sm:px-5
            py-4
            flex
            flex-col-reverse
            sm:flex-row
            justify-end
            gap-2
            shrink-0
          "
              >

                <button
                  type="button"
                  onClick={closeAssignment}
                  className="
              w-full
              sm:w-auto
              px-5
              py-2.5
              rounded-full
              border
              border-gray-300
              bg-white
              text-gray-600
              text-sm
              font-semibold
              hover:bg-gray-100
              transition
            "
                >
                  Batal
                </button>


                <button
                  type="button"
                  disabled={!selectedPetugas}
                  onClick={handleAssignment}
                  className="
              w-full
              sm:w-auto
              px-6
              py-2.5
              rounded-full
              bg-primary
              text-white
              text-sm
              font-semibold
              hover:opacity-90
              shadow-md
              disabled:bg-gray-300
              disabled:cursor-not-allowed
              inline-flex
              items-center
              justify-center
              gap-2
              transition
            "
                >

                  <FaRoute />

                  Tugaskan Faktur

                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>

  );

};


export default TablePenugasanFaktur;