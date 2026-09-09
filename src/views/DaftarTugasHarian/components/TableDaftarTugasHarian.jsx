import React, {
  useEffect,
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
  FaCheckCircle,
  FaClock,
  FaUser,
  FaClipboardList,
  FaClipboardCheck,
  FaRoute,
  FaChevronDown,
} from "react-icons/fa";

import ReactPaginate from "react-paginate";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  IoSearch,
} from "react-icons/io5";

import storeSchema from "global/store";
import { swal } from "global/helper/swal";


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
// COMPONENT
// =====================================================

const TableDaftarTugasHarian = ({
  dimensionScreenW,
  check,
  loginAccess,
}) => {

  const navigation = useNavigate();
  const location = useLocation();


  // ===================================================
  // STATE
  // ===================================================

  const [allData, setAllData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [perPage, setPerPage] = useState(10);

  const [totalPage, setTotalPage] = useState(0);

  const [totalData, setTotalData] = useState(0);
  const [selectedCard, setSelectedCard] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [actionOpen, setActionOpen] = useState(false);

  const dummyTugasHarian = [
    {
      id: 1,
      no_faktur: "INV-2026-0001",
      nama_customer: "PT Sumber Makmur",
      alamat: "Jl. Raya Kelapa Gading No. 12, Jakarta Utara",
      jatuh_tempo: "2026-08-18",
      status: "BELUM_DIANTAR",
    },
    {
      id: 2,
      no_faktur: "INV-2026-0002",
      nama_customer: "CV Maju Bersama",
      alamat: "Jl. Boulevard Barat No. 25, Jakarta Utara",
      jatuh_tempo: "2026-08-19",
      status: "BELUM_DIANTAR",
    },
    {
      id: 3,
      no_faktur: "INV-2026-0003",
      nama_customer: "PT Cahaya Abadi",
      alamat: "Jl. Sunter Agung No. 8, Jakarta Utara",
      jatuh_tempo: "2026-08-20",
      status: "BELUM_DIANTAR",
    },
    {
      id: 4,
      no_faktur: "INV-2026-0004",
      nama_customer: "PT Sejahtera Sentosa",
      alamat: "Jl. Pegangsaan Dua No. 17, Jakarta Utara",
      jatuh_tempo: "2026-08-21",
      status: "SEDANG_DIANTAR",
    },
    {
      id: 5,
      no_faktur: "INV-2026-0005",
      nama_customer: "PT Karya Nusantara",
      alamat: "Jl. Pluit Selatan No. 33, Jakarta Utara",
      jatuh_tempo: "2026-08-22",
      status: "BELUM_DIANTAR",
    },
    {
      id: 6,
      no_faktur: "INV-2026-0006",
      nama_customer: "CV Berkah Jaya",
      alamat: "Jl. Danau Sunter Utara No. 5",
      jatuh_tempo: "2026-08-23",
      status: "SUDAH_DIANTAR",
    },
    {
      id: 7,
      no_faktur: "INV-2026-0007",
      nama_customer: "PT Mitra Dagang",
      alamat: "Jl. Yos Sudarso No. 44, Jakarta Utara",
      jatuh_tempo: "2026-08-24",
      status: "BELUM_DIANTAR",
    },
    {
      id: 8,
      no_faktur: "INV-2026-0008",
      nama_customer: "PT Prima Sejahtera",
      alamat: "Jl. Kelapa Nias Raya No. 10",
      jatuh_tempo: "2026-08-25",
      status: "SEDANG_DIANTAR",
    },
    {
      id: 9,
      no_faktur: "INV-2026-0009",
      nama_customer: "PT Anugerah Mandiri",
      alamat: "Jl. Gading Kirana No. 18",
      jatuh_tempo: "2026-08-26",
      status: "SUDAH_DIANTAR",
    },
    {
      id: 10,
      no_faktur: "INV-2026-0010",
      nama_customer: "CV Sinar Harapan",
      alamat: "Jl. Boulevard Timur No. 20",
      jatuh_tempo: "2026-08-27",
      status: "BELUM_DIANTAR",
    },
  ];

  // ===================================================
  // HEADER TABLE
  // ===================================================

  const headerTable = [
    {
      label: "Aksi",
      icon: <FaEllipsisV />,
    },
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
      label: "Jatuh Tempo",
      icon: <FaCalendarAlt />,
    },
    {
      label: "Status",
      icon: <FaTruck />,
    },
  ];


  // ===================================================
  // GET DATA
  // ===================================================

  // const getListTugasHarian = async () => {
  //   try {
  //     setLoading(true);

  //     await new Promise((resolve) =>
  //       setTimeout(resolve, 500)
  //     );

  //     let data = [...dummyTugasHarian];

  //     // SEARCH
  //     if (keyword) {
  //       const search = keyword.toLowerCase();

  //       data = data.filter(
  //         (item) =>
  //           item.no_faktur
  //             .toLowerCase()
  //             .includes(search) ||
  //           item.nama_customer
  //             .toLowerCase()
  //             .includes(search)
  //       );
  //     }

  //     // FILTER STATUS
  //     if (filterStatus) {
  //       data = data.filter(
  //         (item) =>
  //           item.status === filterStatus
  //       );
  //     }

  //     setAllData(data);
  //     setTotalData(data.length);
  //     setTotalPage(
  //       Math.ceil(data.length / perPage)
  //     );

  //   } catch (error) {

  //     console.error(error);

  //     swal.error(
  //       "Gagal mengambil data tugas harian"
  //     );

  //   } finally {

  //     setLoading(false);

  //   }
  // };

  const getListTugasHarian = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      let data = [...dummyTugasHarian];

      // SEARCH
      if (keyword) {
        const search = keyword.toLowerCase();

        data = data.filter(
          (item) =>
            item.no_faktur
              .toLowerCase()
              .includes(search) ||
            item.nama_customer
              .toLowerCase()
              .includes(search)
        );
      }

      // FILTER STATUS
      if (filterStatus) {
        data = data.filter(
          (item) =>
            item.status === filterStatus
        );
      }

      setAllData(data);
      setTotalData(data.length);
      setTotalPage(
        Math.ceil(data.length / perPage)
      );

    } catch (error) {

      console.error(error);

      swal.error(
        "Gagal mengambil data tugas harian"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleSelectRow = (id) => {

    setSelectedRows((prev) => {

      if (prev.includes(id)) {
        return prev.filter(
          (item) => item !== id
        );
      }

      return [...prev, id];

    });

  };

  const handleSelectAll = () => {

    if (
      selectedRows.length === allData.length
    ) {

      setSelectedRows([]);

    } else {

      setSelectedRows(
        allData.map((item) => item.id)
      );

    }

  };

  const handleBulkAction = async (action) => {

    if (selectedRows.length === 0) {

      swal.warning(
        "Pilih faktur terlebih dahulu"
      );

      return;

    }

    setActionOpen(false);

    const selectedData =
      allData.filter((item) =>
        selectedRows.includes(item.id)
      );

    if (action === "ANTAR") {

      const result =
        await swal.confirm(
          "Antar Faktur",
          `Antar ${selectedData.length} faktur yang dipilih sekarang?`
        );

      if (!result) return;

      setAllData((prev) =>
        prev.map((item) =>
          selectedRows.includes(item.id)
            ? {
              ...item,
              status: "SEDANG_DIANTAR",
            }
            : item
        )
      );

      setSelectedRows([]);

      swal.success(
        `${selectedData.length} faktur sedang diproses untuk pengantaran`
      );

    }

    if (action === "SELESAI") {

      const result =
        await swal.confirm(
          "Selesaikan Pengantaran",
          `Tandai ${selectedData.length} faktur sebagai sudah diantar?`
        );

      if (!result) return;

      setAllData((prev) =>
        prev.map((item) =>
          selectedRows.includes(item.id)
            ? {
              ...item,
              status: "SUDAH_DIANTAR",
            }
            : item
        )
      );

      setSelectedRows([]);

      swal.success(
        `${selectedData.length} faktur berhasil ditandai sudah diantar`
      );

    }

  };

  // ===================================================
  // INITIAL / PAGINATION
  // ===================================================

  useEffect(() => {

    getListTugasHarian();

    // eslint-disable-next-line
  }, [
    currentPage,
    perPage,
    filterStatus
  ]);


  // ===================================================
  // SEARCH
  // ===================================================

  const handleSearch = async (e) => {

    e.preventDefault();

    setCurrentPage(1);

    getListTugasHarian();

  };


  // ===================================================
  // PAGE
  // ===================================================

  const changePage = (e) => {

    const newPage =
      e.selected + 1;

    setCurrentPage(newPage);

  };


  // ===================================================
  // PER PAGE
  // ===================================================

  const changePerPage = (e) => {

    const newPerPage =
      parseInt(e.target.value);

    setPerPage(newPerPage);

    setCurrentPage(1);

  };


  // ===================================================
  // ANTAR FAKTUR
  // ===================================================

  const handleAntarFaktur = async (data) => {

    const result =
      await swal.confirm(
        "Antar Faktur",
        `Apakah faktur ${data.no_faktur} akan diantar?`
      );

    if (!result) return;


    try {

      setLoading(true);

      /*
       * TODO:
       *
       * Panggil API update status pengantaran
       *
       * await storeSchema.actions.antarkanFaktur({
       *   faktur_id: data.id,
       * });
       */

      await storeSchema.actions.antarkanFaktur({
        faktur_id: data.id,
      });


      swal.success(
        "Faktur berhasil diproses untuk pengantaran"
      );


      getListTugasHarian();

    } catch (error) {

      console.error(error);

      swal.error(
        "Gagal memproses pengantaran faktur"
      );

    } finally {

      setLoading(false);

    }

  };


  // ===================================================
  // PAGINATION INFO
  // ===================================================

  const startIndex =
    allData?.length > 0
      ? (currentPage - 1) * perPage + 1
      : 0;

  const endIndex =
    Math.min(
      currentPage * perPage,
      totalData
    );

  const cards = [
    {
      title: "Total Tugas",
      value: totalData,
      description: "Semua faktur yang harus diantar",
      icon: FaClipboardList,
      bgIcon: FaClipboardList,
      color: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        icon: "text-blue-500",
        bgIcon: "text-blue-200",
      },
      onClick: () => handleFilter("ALL"),
      key: "ALL",
    },

    {
      title: "Belum Diantar",
      value: totalData,
      description: "Faktur belum diantar",
      icon: FaClock,
      bgIcon: FaClock,
      color: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        icon: "text-amber-500",
        bgIcon: "text-amber-200",
      },
      onClick: () => handleFilter("BELUM_DIANTAR"),
      key: "BELUM_DIANTAR",
    },

    // {
    //   title: "Sedang Diantar",
    //   value: 0,
    //   description: "Faktur sedang diantar",
    //   icon: FaRoute,
    //   bgIcon: FaRoute,
    //   color: {
    //     bg: "bg-purple-50",
    //     text: "text-purple-700",
    //     icon: "text-purple-500",
    //     bgIcon: "text-purple-200",
    //   },
    //   onClick: () => handleFilter("SEDANG_DIANTAR"),
    //   key: "SEDANG_DIANTAR",
    // },

    {
      title: "Sudah Diantar",
      value: 0,
      description: "Faktur sudah diterima customer",
      icon: FaCheckCircle,
      bgIcon: FaCheckCircle,
      color: {
        bg: "bg-green-50",
        text: "text-green-700",
        icon: "text-green-500",
        bgIcon: "text-green-200",
      },
      onClick: () => handleFilter("SUDAH_DIANTAR"),
      key: "SUDAH_DIANTAR",
    },
  ];

  const handleFilter = (status) => {

    setSelectedCard(status);

    if (status === "ALL") {
      setFilterStatus("");
    } else {
      setFilterStatus(status);
    }

    setCurrentPage(1);
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="flex flex-col gap-5">

      {/* ================================================= */}
      {/* SUMMARY CARDS */}
      {/* ================================================= */}

      <div className="flex gap-4 overflow-x-auto px-2 pt-2 pb-2">

        {cards.map((item, index) => {

          const Icon = item.icon;
          const BgIcon = item.bgIcon;

          return (

            <div
              key={index}
              onClick={item.onClick}
              className={`
              ${item.color.bg}
              relative
              overflow-hidden
              rounded-2xl
              p-3
              cursor-pointer
              border
              border-gray-100
              shadow-sm
              hover:shadow-lg
              hover:-translate-y-1
              transition-all
              duration-300

              ${selectedCard === item.key
                  ? `
                    ring-2
                    ring-offset-2
                    ring-blue-500
                    shadow-xl
                  `
                  : ""
                }

              min-w-[220px]
              h-[82px]
              flex-shrink-0
            `}
            >

              {/* BACKGROUND ICON */}

              <BgIcon
                className={`
                absolute
                right-[-10px]
                top-1/2
                -translate-y-1/2
                text-[80px]
                opacity-70
                ${item.color.bgIcon}
                z-0
                pointer-events-none
                rotate-12
              `}
              />


              {/* CONTENT */}

              <div className="relative z-10 flex flex-row gap-3">

                {/* VALUE */}

                <div
                  className="
                  w-12
                  h-12
                  rounded-xl
                  bg-white
                  shadow
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
                >

                  <div
                    className={`
                    text-xl
                    font-bold
                    ${item.color.icon}
                  `}
                  >
                    {item.value}
                  </div>

                </div>


                {/* TITLE */}

                <div>

                  <h6
                    className={`
                    text-sm
                    font-semibold
                    ${item.color.text}
                  `}
                  >
                    {item.title}
                  </h6>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.description}
                  </p>

                </div>

              </div>

            </div>

          );

        })}

      </div>


      {/* ================================================= */}
      {/* SEARCH */}
      {/* ================================================= */}

      <div
        className="
    flex
    flex-col
    lg:flex-row
    gap-4
    justify-between
    items-start
    lg:items-center
  "
      >

        {/* SEARCH */}

        <form
          onSubmit={handleSearch}
          className="
      input
      input-md
      input-bordered
      flex
      items-center
      gap-2
      bg-white
      rounded-full
      border-gray-200
      shadow-sm
      w-full
      lg:w-[350px]
    "
        >

          <IoSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Cari nomor faktur / customer..."
            className="grow"
            onChange={(e) =>
              setKeyword(e.target.value)
            }
            value={keyword}
          />

        </form>


        {/* ACTION */}

        <div className="relative">

          <button
            type="button"
            disabled={selectedRows.length === 0}
            onClick={() =>
              setActionOpen(
                !actionOpen
              )
            }
            className="
        btn btn-md
        bg-primary
        hover:bg-blue-800
        text-white
        rounded-full
        gap-2
        disabled:bg-gray-300
        disabled:text-gray-500
        disabled:border-gray-300
      "
          >

            <FaEllipsisV />

            Action

            {selectedRows.length > 0 && (
              <span
                className="
            bg-orange-500
            text-white
            rounded-full
            px-2
            py-0.5
            text-xs
          "
              >
                {selectedRows.length}
              </span>
            )}

            <FaChevronDown
              className={`
          transition-transform
          ${actionOpen
                  ? "rotate-180"
                  : ""
                }
        `}
            />

          </button>


          {/* DROPDOWN */}

          {actionOpen && (
            <>

              <div
                className="
            fixed
            inset-0
            z-40
          "
                onClick={() =>
                  setActionOpen(false)
                }
              />

              <div
                className="
            absolute
            right-0
            mt-2
            w-56
            bg-white
            rounded-xl
            shadow-xl
            border
            border-gray-100
            overflow-hidden
            z-50
          "
              >

                {/* ANTAR */}

                <button
                  type="button"
                  onClick={() =>
                    handleBulkAction(
                      "ANTAR"
                    )
                  }
                  className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              text-sm
              text-gray-700
              hover:bg-blue-50
              hover:text-blue-900
              transition
            "
                >

                  <div
                    className="
                w-8
                h-8
                rounded-lg
                bg-blue-50
                text-blue-700
                flex
                items-center
                justify-center
              "
                  >
                    <FaTruck />
                  </div>

                  <div className="text-left">

                    <p className="font-semibold">
                      Antar Sekarang
                    </p>

                    <p className="text-xs text-gray-400">
                      Mulai pengantaran faktur
                    </p>

                  </div>

                </button>


                {/* SELESAI */}

                <button
                  type="button"
                  onClick={() =>
                    handleBulkAction(
                      "SELESAI"
                    )
                  }
                  className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              text-sm
              text-gray-700
              hover:bg-green-50
              hover:text-green-700
              transition
            "
                >

                  <div
                    className="
                w-8
                h-8
                rounded-lg
                bg-green-50
                text-green-700
                flex
                items-center
                justify-center
              "
                  >
                    <FaCheckCircle />
                  </div>

                  <div className="text-left">

                    <p className="font-semibold">
                      Sudah Diantar
                    </p>

                    <p className="text-xs text-gray-400">
                      Tandai faktur selesai
                    </p>

                  </div>

                </button>

              </div>

            </>
          )}

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

            {/* LOADING */}

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
                  backdrop-blur-[1px]
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
                      text-blue-900
                    "
                  />

                  <span className="text-sm text-gray-600">
                    Memuat daftar tugas...
                  </span>

                </div>

              </div>

            )}


            <div
              className="
                overflow-auto
                rounded-2xl
                max-h-[65vh]
              "
            >

              <table className="table w-full">


                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

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

                    {/* CHECK ALL */}

                    <th className="px-4 py-3 w-[50px]">

                      <input
                        type="checkbox"
                        className="
          checkbox
          checkbox-sm
          checkbox-primary
        "
                        checked={
                          allData.length > 0 &&
                          selectedRows.length === allData.length
                        }
                        onChange={handleSelectAll}
                      />

                    </th>


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

                            <span className="text-sm">
                              {h.icon}
                            </span>

                            {h.label}

                          </div>

                        </th>

                      )
                    )}

                  </tr>
                </thead>


                {/* ================================================= */}
                {/* BODY */}
                {/* ================================================= */}

                <tbody>


                  {allData.length === 0 ? (

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

                          <FaClipboardList
                            className="
                              text-4xl
                              text-gray-300
                            "
                          />

                          <span>
                            Tidak ada tugas pengantaran
                          </span>

                        </div>

                      </td>

                    </tr>

                  ) : (

                    allData.map(
                      (v, i) => (

                        <tr
                          key={v.id || i}
                          className={`
    transition
    duration-200
    border-b

    ${selectedRows.includes(v.id)
                              ? "bg-blue-50"
                              : "hover:bg-blue-50"
                            }
  `}
                        >

                          {/* CHECKBOX */}

                          <td className="px-4 py-3">

                            <input
                              type="checkbox"
                              className="checkbox checkbox-sm checkbox-primary"
                              checked={selectedRows.includes(v.id)}
                              onChange={() =>
                                handleSelectRow(v.id)
                              }
                            />

                          </td>
                          <td className="px-4 py-3">

                            <button
                              type="button"
                              onClick={() =>
                                handleAntarFaktur(v)
                              }
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-full
                                bg-primary
                                text-white
                                text-xs
                                font-semibold
                                hover:bg-primary
                                hover:scale-[1.02]
                                transition
                                shadow-sm
                                whitespace-nowrap
                              "
                            >

                              <FaTruck />

                              Antar Faktur

                            </button>

                          </td>


                          {/* ============================== */}
                          {/* NO */}
                          {/* ============================== */}

                          <td
                            className="
                              px-4
                              py-3
                              font-semibold
                              text-gray-700
                            "
                          >

                            {
                              (currentPage - 1)
                              * perPage
                              + i
                              + 1
                            }

                          </td>


                          {/* ============================== */}
                          {/* NO FAKTUR */}
                          {/* ============================== */}

                          <td
                            className="
                              px-4
                              py-3
                              font-semibold
                              text-blue-900
                              whitespace-nowrap
                            "
                          >

                            {v.no_faktur || "-"}

                          </td>


                          {/* ============================== */}
                          {/* CUSTOMER */}
                          {/* ============================== */}

                          <td className="px-4 py-3">

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
                                  text-blue-900
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
                                  {v.nama_customer || "-"}
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* ============================== */}
                          {/* ALAMAT */}
                          {/* ============================== */}

                          <td className="px-4 py-3 min-w-[250px]">

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
                                {v.alamat || "-"}
                              </span>

                            </div>

                          </td>


                          {/* ============================== */}
                          {/* JATUH TEMPO */}
                          {/* ============================== */}

                          <td className="px-4 py-3">

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                whitespace-nowrap
                              "
                            >

                              <FaCalendarAlt
                                className="text-blue-700"
                              />

                              <span>
                                {formatDate(
                                  v.jatuh_tempo
                                )}
                              </span>

                            </div>

                          </td>


                          {/* ============================== */}
                          {/* STATUS */}
                          {/* ============================== */}

                          <td className="px-4 py-3">

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-1.5
                                rounded-full
                                bg-orange-100
                                text-orange-700
                                text-xs
                                font-semibold
                                whitespace-nowrap
                              "
                            >

                              <FaClock />

                              Belum Diantar

                            </span>

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

                <div className="text-sm text-gray-600">

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


                <div className="flex items-center gap-2">

                  <span className="text-sm text-gray-600">
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
                    onChange={changePerPage}
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

                    <option value="100">
                      100
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

                    onPageChange={changePage}

                    forcePage={
                      currentPage - 1
                    }

                    className="
                      flex
                      items-center
                      gap-2
                    "

                    activeClassName="
                      !bg-blue-900
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

    </div>
  );
};

export default TableDaftarTugasHarian;