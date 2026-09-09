import React, { useEffect, useMemo, useState } from "react";

import {
  FaTruck,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaFileInvoiceDollar,
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaEllipsisV,
  FaHashtag,
  FaEye,
  FaInfoCircle,
} from "react-icons/fa";

import { IoSearch } from "react-icons/io5";

import ReactPaginate from "react-paginate";


// =====================================================
// FORMAT DATE
// =====================================================

const formatDate = (date) => {

  if (!date) return "-";

  return new Date(date).toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

};


// =====================================================
// DUMMY DATA
// =====================================================

const dummyData = [
  {
    id: 1,
    no_faktur: "INV-2026-00001",
    nama_customer: "PT. Maju Bersama",
    alamat: "Jl. Raya Kelapa Gading No. 15, Jakarta Utara",
    sales: "Andri Noviandy",
    tanggal_penugasan: "2026-08-01",
    tanggal_pengantaran: "2026-08-02",
    status: "SUDAH_DIANTAR",
  },

  {
    id: 2,
    no_faktur: "INV-2026-00002",
    nama_customer: "PT. Sumber Makmur",
    alamat: "Jl. Boulevard Barat No. 21, Jakarta Utara",
    sales: "Budi Santoso",
    tanggal_penugasan: "2026-08-02",
    tanggal_pengantaran: "2026-08-03",
    status: "SUDAH_DIANTAR",
  },

  {
    id: 3,
    no_faktur: "INV-2026-00003",
    nama_customer: "CV. Cahaya Abadi",
    alamat: "Jl. Sunter Agung No. 10, Jakarta Utara",
    sales: "Citra Lestari",
    tanggal_penugasan: "2026-08-04",
    tanggal_pengantaran: "2026-08-05",
    status: "SUDAH_DIANTAR",
  },

  {
    id: 4,
    no_faktur: "INV-2026-00004",
    nama_customer: "PT. Sejahtera Sentosa",
    alamat: "Jl. Pulo Gadung No. 45, Jakarta Timur",
    sales: "Dimas Pratama",
    tanggal_penugasan: "2026-08-05",
    tanggal_pengantaran: "2026-08-06",
    status: "SUDAH_DIANTAR",
  },

  {
    id: 5,
    no_faktur: "INV-2026-00005",
    nama_customer: "PT. Karya Utama",
    alamat: "Jl. Cakung Cilincing No. 12, Jakarta Timur",
    sales: "Andri Noviandy",
    tanggal_penugasan: "2026-08-07",
    tanggal_pengantaran: null,
    status: "SEDANG_DIANTAR",
  },

  {
    id: 6,
    no_faktur: "INV-2026-00006",
    nama_customer: "PT. Mitra Usaha",
    alamat: "Jl. Pegangsaan Dua No. 30, Jakarta Utara",
    sales: "Budi Santoso",
    tanggal_penugasan: "2026-08-08",
    tanggal_pengantaran: null,
    status: "SEDANG_DIANTAR",
  },

  {
    id: 7,
    no_faktur: "INV-2026-00007",
    nama_customer: "CV. Berkah Jaya",
    alamat: "Jl. Kelapa Nias Raya No. 8, Jakarta Utara",
    sales: "Citra Lestari",
    tanggal_penugasan: "2026-08-09",
    tanggal_pengantaran: null,
    status: "BELUM_DIANTAR",
  },

  {
    id: 8,
    no_faktur: "INV-2026-00008",
    nama_customer: "PT. Nusantara Abadi",
    alamat: "Jl. Bekasi Raya No. 90, Jakarta Timur",
    sales: "Dimas Pratama",
    tanggal_penugasan: "2026-08-10",
    tanggal_pengantaran: null,
    status: "BELUM_DIANTAR",
  },

  {
    id: 9,
    no_faktur: "INV-2026-00009",
    nama_customer: "PT. Sentosa Jaya",
    alamat: "Jl. Danau Sunter Selatan No. 14",
    sales: "Andri Noviandy",
    tanggal_penugasan: "2026-08-11",
    tanggal_pengantaran: null,
    status: "GAGAL_DIANTAR",
  },

  {
    id: 10,
    no_faktur: "INV-2026-00010",
    nama_customer: "PT. Harapan Baru",
    alamat: "Jl. Kelapa Gading Boulevard No. 100",
    sales: "Budi Santoso",
    tanggal_penugasan: "2026-08-11",
    tanggal_pengantaran: null,
    status: "GAGAL_DIANTAR",
  },

  {
    id: 11,
    no_faktur: "INV-2026-00011",
    nama_customer: "PT. Global Mandiri",
    alamat: "Jl. Yos Sudarso No. 20, Jakarta Utara",
    sales: "Citra Lestari",
    tanggal_penugasan: "2026-08-12",
    tanggal_pengantaran: "2026-08-13",
    status: "SUDAH_DIANTAR",
  },

  {
    id: 12,
    no_faktur: "INV-2026-00012",
    nama_customer: "CV. Makmur Sentosa",
    alamat: "Jl. Pulogadung Industri No. 18",
    sales: "Dimas Pratama",
    tanggal_penugasan: "2026-08-13",
    tanggal_pengantaran: null,
    status: "BELUM_DIANTAR",
  },

  {
    id: 13,
    no_faktur: "INV-2026-00013",
    nama_customer: "PT. Prima Niaga",
    alamat: "Jl. Boulevard Timur No. 17",
    sales: "Andri Noviandy",
    tanggal_penugasan: "2026-08-14",
    tanggal_pengantaran: null,
    status: "SEDANG_DIANTAR",
  },

  {
    id: 14,
    no_faktur: "INV-2026-00014",
    nama_customer: "PT. Abadi Jaya",
    alamat: "Jl. Raya Cakung No. 55",
    sales: "Budi Santoso",
    tanggal_penugasan: "2026-08-14",
    tanggal_pengantaran: "2026-08-15",
    status: "SUDAH_DIANTAR",
  },

  {
    id: 15,
    no_faktur: "INV-2026-00015",
    nama_customer: "PT. Sinar Mas",
    alamat: "Jl. Sunter Jaya No. 25",
    sales: "Citra Lestari",
    tanggal_penugasan: "2026-08-15",
    tanggal_pengantaran: null,
    status: "BELUM_DIANTAR",
  },
];


// =====================================================
// STATUS CONFIG
// =====================================================

const statusConfig = {

  BELUM_DIANTAR: {
    label: "Belum Diantar",
    icon: FaClock,
    className: "bg-amber-100 text-amber-700",
  },

  SUDAH_DIANTAR: {
    label: "Sudah Diantar",
    icon: FaCheckCircle,
    className: "bg-green-100 text-green-700",
  },

  GAGAL_DIANTAR: {
    label: "Gagal Diantar",
    icon: FaTimesCircle,
    className: "bg-red-100 text-red-700",
  },

};


// =====================================================
// COMPONENT
// =====================================================

const TableRiwayatPengantaran = ({
  dimensionScreenW,
  check,
  loginAccess,
}) => {

  // ===================================================
  // STATE
  // ===================================================

  const [allData] = useState(dummyData);

  const [keyword, setKeyword] = useState("");

  const [selectedStatus, setSelectedStatus] =
    useState("ALL");

  const [selectedCard, setSelectedCard] =
    useState("ALL");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [perPage, setPerPage] =
    useState(10);

  const [selectedData, setSelectedData] =
    useState(null);


  // ===================================================
  // SUMMARY
  // ===================================================

  const summaryData = useMemo(() => {

    return {

      total: allData.length,

      belum_diantar:
        allData.filter(
          x => x.status === "BELUM_DIANTAR"
        ).length,

      sedang_diantar:
        allData.filter(
          x => x.status === "SEDANG_DIANTAR"
        ).length,

      sudah_diantar:
        allData.filter(
          x => x.status === "SUDAH_DIANTAR"
        ).length,

      gagal_diantar:
        allData.filter(
          x => x.status === "GAGAL_DIANTAR"
        ).length,

    };

  }, [allData]);


  // ===================================================
  // FILTER DATA
  // ===================================================

  const filteredData = useMemo(() => {

    let data = [...allData];


    // FILTER STATUS

    if (selectedStatus !== "ALL") {

      data = data.filter(
        item =>
          item.status === selectedStatus
      );

    }


    // SEARCH

    if (keyword.trim()) {

      const search =
        keyword.toLowerCase();

      data = data.filter(item =>

        item.no_faktur
          ?.toLowerCase()
          .includes(search)

        ||

        item.nama_customer
          ?.toLowerCase()
          .includes(search)

        ||

        item.sales
          ?.toLowerCase()
          .includes(search)

        ||

        item.alamat
          ?.toLowerCase()
          .includes(search)

      );

    }


    return data;

  }, [
    allData,
    selectedStatus,
    keyword,
  ]);


  // ===================================================
  // PAGINATION DATA
  // ===================================================

  const totalData =
    filteredData.length;

  const totalPage =
    Math.ceil(
      totalData / perPage
    );


  const paginatedData =
    filteredData.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );


  // ===================================================
  // RESET PAGE
  // ===================================================

  useEffect(() => {

    setCurrentPage(1);

  }, [
    keyword,
    selectedStatus,
    perPage,
  ]);


  // ===================================================
  // CARD FILTER
  // ===================================================

  const handleFilterCard = (key) => {

    setSelectedCard(key);

    setCurrentPage(1);

    if (key === "ALL") {

      setSelectedStatus("ALL");

    } else {

      setSelectedStatus(key);

    }

  };


  // ===================================================
  // PAGINATION
  // ===================================================

  const changePage = (e) => {

    setCurrentPage(
      e.selected + 1
    );

  };


  // ===================================================
  // HEADER TABLE
  // ===================================================

  const headerTable = [

    {
      label: "No",
      icon: <FaHashtag />,
    },

    {
      label: "No. Faktur",
      icon: <FaFileInvoiceDollar />,
    },

    {
      label: "Customer",
      icon: <FaBuilding />,
    },

    {
      label: "Alamat",
      icon: <FaMapMarkerAlt />,
    },

    {
      label: "Sales",
      icon: <FaUser />,
    },

    {
      label: "Tgl Penugasan",
      icon: <FaCalendarAlt />,
    },

    {
      label: "Tgl Pengantaran",
      icon: <FaTruck />,
    },

    {
      label: "Status",
      icon: <FaInfoCircle />,
    },

    {
      label: "Aksi",
      icon: <FaEllipsisV />,
    },

  ];


  // ===================================================
  // CARDS
  // ===================================================

  const cards = [

    {
      title: "Total Pengantaran",
      value: summaryData.total,
      description: "Semua riwayat faktur",
      icon: FaClipboardList,
      bgIcon: FaClipboardList,

      color: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        icon: "text-blue-500",
        bgIcon: "text-blue-200",
      },

      key: "ALL",

    },

    {
      title: "Belum Diantar",
      value: summaryData.belum_diantar,
      description: "Menunggu pengantaran",
      icon: FaClock,
      bgIcon: FaClock,

      color: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        icon: "text-amber-500",
        bgIcon: "text-amber-200",
      },

      key: "BELUM_DIANTAR",

    },

    {
      title: "Sudah Diantar",
      value: summaryData.sudah_diantar,
      description: "Faktur telah diterima",
      icon: FaCheckCircle,
      bgIcon: FaCheckCircle,

      color: {
        bg: "bg-green-50",
        text: "text-green-700",
        icon: "text-green-500",
        bgIcon: "text-green-200",
      },

      key: "SUDAH_DIANTAR",

    },

    {
      title: "Gagal Diantar",
      value: summaryData.gagal_diantar,
      description: "Pengantaran gagal",
      icon: FaTimesCircle,
      bgIcon: FaTimesCircle,

      color: {
        bg: "bg-red-50",
        text: "text-red-700",
        icon: "text-red-500",
        bgIcon: "text-red-200",
      },

      key: "GAGAL_DIANTAR",

    },

  ];


  // ===================================================
  // RENDER STATUS
  // ===================================================

  const renderStatus = (status) => {

    const config =
      statusConfig[status];

    if (!config) return "-";

    const Icon = config.icon;

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

        {config.label}

      </span>

    );

  };


  // ===================================================
  // DETAIL
  // ===================================================

  const handleDetail = (data) => {

    setSelectedData(data);

  };


  // ===================================================
  // START / END
  // ===================================================

  const startIndex =
    totalData > 0
      ? (currentPage - 1) * perPage + 1
      : 0;

  const endIndex =
    Math.min(
      currentPage * perPage,
      totalData
    );


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <div className="flex flex-col gap-5">

      {/* ================================================= */}
      {/* SEARCH + FILTER */}
      {/* ================================================= */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          gap-4
          justify-between
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
              text-lg
            "
          />

          <input
            type="text"
            placeholder="Cari faktur / customer / sales..."
            className="grow"
            value={keyword}
            onChange={(e) =>
              setKeyword(
                e.target.value
              )
            }
          />

        </div>


        {/* FILTER */}

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
              min-w-[180px]
            "
            value={selectedStatus}
            onChange={(e) => {

              const value =
                e.target.value;

              setSelectedStatus(value);

              setSelectedCard(
                value
              );

            }}
          >

            <option value="ALL">
              Semua Status
            </option>

            <option value="BELUM_DIANTAR">
              Belum Diantar
            </option>

            <option value="SUDAH_DIANTAR">
              Sudah Diantar
            </option>

            <option value="GAGAL_DIANTAR">
              Gagal Diantar
            </option>

          </select>

        </div>

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

          <div className="relative">

            <div
              className="
                overflow-auto
                rounded-2xl
                max-h-[65vh]
              "
            >

              <table className="table w-full">


                {/* =============================== */}
                {/* HEADER */}
                {/* =============================== */}

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

                    {headerTable.map(
                      (h, i) => (

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

                            <span
                              className="
                                text-sm
                              "
                            >
                              {h.icon}
                            </span>

                            {h.label}

                          </div>

                        </th>

                      )
                    )}

                  </tr>

                </thead>


                {/* =============================== */}
                {/* BODY */}
                {/* =============================== */}

                <tbody>

                  {paginatedData.length === 0 ? (

                    <tr>

                      <td
                        colSpan={
                          headerTable.length
                        }
                        className="
                          text-center
                          py-16
                          text-gray-500
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

                          <FaTruck
                            className="
                              text-4xl
                              text-gray-300
                            "
                          />

                          <span>
                            Tidak ada riwayat
                            pengantaran
                          </span>

                        </div>

                      </td>

                    </tr>

                  ) : (

                    paginatedData.map(
                      (v, i) => (

                        <tr
                          key={v.id}
                          className="
                            hover:bg-blue-50
                            transition
                            duration-200
                            border-b
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

                            {(currentPage - 1)
                              * perPage
                              + i
                              + 1}

                          </td>


                          {/* NO FAKTUR */}

                          <td
                            className="
                              px-4
                              py-3
                              font-semibold
                              text-blue-900
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
                                  rounded-lg
                                  bg-blue-50
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                <FaFileInvoiceDollar
                                  className="
                                    text-blue-700
                                  "
                                />

                              </div>

                              {v.no_faktur}

                            </div>

                          </td>


                          {/* CUSTOMER */}

                          <td className="px-4 py-3">

                            <div
                              className="
                                flex
                                items-center
                                gap-3
                                min-w-[180px]
                              "
                            >

                              <div
                                className="
                                  w-9
                                  h-9
                                  rounded-full
                                  bg-blue-50
                                  text-blue-900
                                  flex
                                  items-center
                                  justify-center
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
                                  {v.nama_customer}
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* ALAMAT */}

                          <td
                            className="
                              px-4
                              py-3
                              min-w-[250px]
                            "
                          >

                            <div
                              className="
                                flex
                                items-start
                                gap-2
                                text-gray-600
                                text-sm
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
                                {v.alamat}
                              </span>

                            </div>

                          </td>


                          {/* SALES */}

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
                                {v.sales}
                              </span>

                            </div>

                          </td>


                          {/* TANGGAL PENUGASAN */}

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
                                  text-blue-700
                                "
                              />

                              <span
                                className="
                                  text-sm
                                  text-gray-600
                                "
                              >
                                {formatDate(
                                  v.tanggal_penugasan
                                )}
                              </span>

                            </div>

                          </td>


                          {/* TANGGAL PENGANTARAN */}

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

                              <FaTruck
                                className="
                                  text-orange-500
                                "
                              />

                              <span
                                className="
                                  text-sm
                                  text-gray-600
                                "
                              >
                                {formatDate(
                                  v.tanggal_pengantaran
                                )}
                              </span>

                            </div>

                          </td>


                          {/* STATUS */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            {renderStatus(
                              v.status
                            )}

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
                                handleDetail(v)
                              }
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-2
                                rounded-full
                                bg-blue-50
                                text-blue-700
                                text-xs
                                font-semibold
                                hover:bg-primary
                                hover:text-white
                                transition
                              "
                            >

                              <FaEye />

                              Detail

                            </button>

                          </td>

                        </tr>

                      )
                    )

                  )}

                </tbody>

              </table>

            </div>

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

              {/* INFO */}

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

                  <span className="font-semibold">
                    {startIndex}
                  </span>

                  {" "}to{" "}

                  <span className="font-semibold">
                    {endIndex}
                  </span>

                  {" "}of{" "}

                  <span className="font-semibold">
                    {totalData}
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
                    onChange={(e) =>
                      setPerPage(
                        parseInt(
                          e.target.value
                        )
                      )
                    }
                    value={perPage}
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


              {/* PAGINATION */}

              {totalPage > 0 && (

                <div
                  className="
                    overflow-auto
                    pb-1
                    flex
                    justify-center
                  "
                >

                  <ReactPaginate

                    breakLabel="..."

                    previousLabel="←"

                    nextLabel="→"

                    pageCount={totalPage}

                    onPageChange={
                      changePage
                    }

                    forcePage={
                      currentPage - 1
                    }

                    className="
                      flex
                      items-center
                      gap-2
                    "

                    activeClassName="
                      !bg-primary
                      !text-white
                      !border-blue-900
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
                      transition-all
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
                      hover:bg-blue-50
                      transition-all
                    "

                    nextClassName="
                      min-w-9
                      h-9
                      border
                      border-gray-300
                      rounded-full
                      bg-white
                      hover:bg-blue-50
                      transition-all
                    "

                    previousLinkClassName="
                      w-full
                      h-full
                      flex
                      items-center
                      justify-center
                      px-3
                    "

                    nextLinkClassName="
                      w-full
                      h-full
                      flex
                      items-center
                      justify-center
                      px-3
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

                </div>

              )}

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* DETAIL MODAL */}
      {/* ================================================= */}

      {selectedData && (

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
            setSelectedData(null)
          }
        >

          <div
            className="
              bg-white
              rounded-2xl
              shadow-2xl
              w-full
              max-w-lg
              overflow-hidden
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div
              className="
                bg-primary
                px-5
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

                    <FaTruck />

                  </div>

                  <div>

                    <h3
                      className="
                        font-bold
                      "
                    >
                      Detail Pengantaran
                    </h3>

                    <p
                      className="
                        text-xs
                        text-blue-100
                      "
                    >
                      Informasi faktur
                    </p>

                  </div>

                </div>


                <button
                  onClick={() =>
                    setSelectedData(null)
                  }
                  className="
                    text-white
                    text-xl
                    hover:text-orange-300
                  "
                >
                  ×
                </button>

              </div>

            </div>


            {/* MODAL BODY */}

            <div className="p-5">

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
                    No. Faktur
                  </p>

                  <p
                    className="
                      font-bold
                      text-blue-900
                    "
                  >
                    {selectedData.no_faktur}
                  </p>

                </div>


                <div>

                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Customer
                  </p>

                  <p
                    className="
                      font-semibold
                      text-gray-700
                    "
                  >
                    {selectedData.nama_customer}
                  </p>

                </div>


                <div>

                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Alamat
                  </p>

                  <p
                    className="
                      text-sm
                      text-gray-600
                    "
                  >
                    {selectedData.alamat}
                  </p>

                </div>


                <div
                  className="
                    grid
                    grid-cols-2
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
                      Sales
                    </p>

                    <p
                      className="
                        font-semibold
                        text-gray-700
                      "
                    >
                      {selectedData.sales}
                    </p>

                  </div>


                  <div>

                    <p
                      className="
                        text-xs
                        text-gray-400
                      "
                    >
                      Status
                    </p>

                    <div className="mt-1">

                      {renderStatus(
                        selectedData.status
                      )}

                    </div>

                  </div>

                </div>


                <div
                  className="
                    grid
                    grid-cols-2
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
                      Tanggal Penugasan
                    </p>

                    <p
                      className="
                        text-sm
                        font-medium
                        text-gray-700
                      "
                    >
                      {formatDate(
                        selectedData.tanggal_penugasan
                      )}
                    </p>

                  </div>


                  <div>

                    <p
                      className="
                        text-xs
                        text-gray-400
                      "
                    >
                      Tanggal Pengantaran
                    </p>

                    <p
                      className="
                        text-sm
                        font-medium
                        text-gray-700
                      "
                    >
                      {formatDate(
                        selectedData.tanggal_pengantaran
                      )}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* MODAL FOOTER */}

            <div
              className="
                px-5
                py-4
                bg-gray-50
                border-t
                flex
                justify-end
              "
            >

              <button
                onClick={() =>
                  setSelectedData(null)
                }
                className="
                  px-5
                  py-2
                  rounded-full
                  bg-primary
                  text-white
                  text-sm
                  font-semibold
                  hover:bg-blue-800
                  transition
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


export default TableRiwayatPengantaran;