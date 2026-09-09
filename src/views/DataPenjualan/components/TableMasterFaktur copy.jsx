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
  FaMoneyBillWave,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaPencilAlt,
  FaTrash,
  FaFilter,
  FaClipboardList,
  FaTimes,
} from "react-icons/fa";

import {
  IoSearch,
} from "react-icons/io5";

import ReactPaginate
  from "react-paginate";

import {
  swal,
} from "global/helper/swal";


// =====================================================
// DUMMY DATA
// =====================================================

const dummyData = [

  {
    id: 1,
    no_faktur: "INV-2026-00001",
    customer_id: "10000271521",
    nama_customer: "Dinas Kesehatan Kota Medan",
    cabang: "KFTD MEDAN",
    alamat: "Jl. Gatot Subroto No. 125, Medan",
    tanggal_faktur: "2026-08-01",
    jatuh_tempo: "2026-08-22",
    nominal_tagihan: 140000000,
    sales: "Andri Noviandy",
    status: "AKTIF",
  },

  {
    id: 2,
    no_faktur: "INV-2026-00002",
    customer_id: "10000271522",
    nama_customer: "Apotek Maju Djaya",
    cabang: "KFTD MEDAN",
    alamat: "Jl. Sisingamangaraja No. 88, Medan",
    tanggal_faktur: "2026-08-02",
    jatuh_tempo: "2026-08-25",
    nominal_tagihan: 85000000,
    sales: "Budi Santoso",
    status: "AKTIF",
  },

  {
    id: 3,
    no_faktur: "INV-2026-00003",
    customer_id: "10000271523",
    nama_customer: "Apotek Rusli",
    cabang: "KFTD MEDAN",
    alamat: "Jl. Iskandar Muda No. 45, Medan",
    tanggal_faktur: "2026-08-03",
    jatuh_tempo: "2026-08-27",
    nominal_tagihan: 140000000,
    sales: "Citra Lestari",
    status: "AKTIF",
  },

  {
    id: 4,
    no_faktur: "INV-2026-00004",
    customer_id: "10000271524",
    nama_customer: "RSUD Pasuruan",
    cabang: "KFTD PASURUAN",
    alamat: "Jl. Wahidin Sudirohusodo No. 10, Pasuruan",
    tanggal_faktur: "2026-08-04",
    jatuh_tempo: "2026-08-29",
    nominal_tagihan: 175000000,
    sales: "Dimas Pratama",
    status: "AKTIF",
  },

  {
    id: 5,
    no_faktur: "INV-2026-00005",
    customer_id: "10000271525",
    nama_customer: "RS Hermina Medan",
    cabang: "KFTD MEDAN",
    alamat: "Jl. Asrama No. 12, Medan",
    tanggal_faktur: "2026-08-05",
    jatuh_tempo: "2026-08-30",
    nominal_tagihan: 95000000,
    sales: "Andri Noviandy",
    status: "LUNAS",
  },

  {
    id: 6,
    no_faktur: "INV-2026-00006",
    customer_id: "10000271526",
    nama_customer: "Apotek Sehat Sentosa",
    cabang: "KFTD JAKARTA",
    alamat: "Jl. Kelapa Gading Raya No. 21, Jakarta",
    tanggal_faktur: "2026-08-06",
    jatuh_tempo: "2026-09-01",
    nominal_tagihan: 65000000,
    sales: "Budi Santoso",
    status: "AKTIF",
  },

  {
    id: 7,
    no_faktur: "INV-2026-00007",
    customer_id: "10000271527",
    nama_customer: "Klinik Medika Utama",
    cabang: "KFTD JAKARTA",
    alamat: "Jl. Boulevard Barat No. 30, Jakarta",
    tanggal_faktur: "2026-08-07",
    jatuh_tempo: "2026-09-03",
    nominal_tagihan: 72500000,
    sales: "Citra Lestari",
    status: "AKTIF",
  },

  {
    id: 8,
    no_faktur: "INV-2026-00008",
    customer_id: "10000271528",
    nama_customer: "RS Siloam Medan",
    cabang: "KFTD MEDAN",
    alamat: "Jl. Imam Bonjol No. 5, Medan",
    tanggal_faktur: "2026-08-08",
    jatuh_tempo: "2026-09-05",
    nominal_tagihan: 210000000,
    sales: "Dimas Pratama",
    status: "DIBATALKAN",
  },

  {
    id: 9,
    no_faktur: "INV-2026-00009",
    customer_id: "10000271529",
    nama_customer: "Dinas Kesehatan Deli Serdang",
    cabang: "KFTD MEDAN",
    alamat: "Jl. Negara No. 100, Deli Serdang",
    tanggal_faktur: "2026-08-09",
    jatuh_tempo: "2026-09-07",
    nominal_tagihan: 125000000,
    sales: "Andri Noviandy",
    status: "AKTIF",
  },

  {
    id: 10,
    no_faktur: "INV-2026-00010",
    customer_id: "10000271530",
    nama_customer: "Apotek Kimia Sehat",
    cabang: "KFTD JAKARTA",
    alamat: "Jl. Sunter Agung No. 18, Jakarta",
    tanggal_faktur: "2026-08-10",
    jatuh_tempo: "2026-09-10",
    nominal_tagihan: 45000000,
    sales: "Budi Santoso",
    status: "LUNAS",
  },

  {
    id: 11,
    no_faktur: "INV-2026-00011",
    customer_id: "10000271531",
    nama_customer: "RSUD Kota Bogor",
    cabang: "KFTD BOGOR",
    alamat: "Jl. Pajajaran No. 50, Bogor",
    tanggal_faktur: "2026-08-11",
    jatuh_tempo: "2026-09-12",
    nominal_tagihan: 185000000,
    sales: "Citra Lestari",
    status: "AKTIF",
  },

  {
    id: 12,
    no_faktur: "INV-2026-00012",
    customer_id: "10000271532",
    nama_customer: "Apotek Berkah Farma",
    cabang: "KFTD BOGOR",
    alamat: "Jl. Merdeka No. 12, Bogor",
    tanggal_faktur: "2026-08-12",
    jatuh_tempo: "2026-09-15",
    nominal_tagihan: 55000000,
    sales: "Dimas Pratama",
    status: "AKTIF",
  },

];


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
  ).format(
    value
  );

};


// =====================================================
// FORMAT DATE
// =====================================================

const formatDate = (
  value
) => {

  if (!value) {
    return "-";
  }

  return new Date(
    value
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
// STATUS
// =====================================================

const renderStatus = (
  status
) => {

  if (
    status ===
    "AKTIF"
  ) {

    return (

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

        <FaCheckCircle />

        Aktif

      </span>

    );

  }


  if (
    status ===
    "LUNAS"
  ) {

    return (

      <span
        className="
          inline-flex
          items-center
          gap-2
          px-3
          py-1.5
          rounded-full
          bg-blue-100
          text-blue-700
          text-xs
          font-semibold
          whitespace-nowrap
        "
      >

        <FaCheckCircle />

        Lunas

      </span>

    );

  }


  if (
    status ===
    "DIBATALKAN"
  ) {

    return (

      <span
        className="
          inline-flex
          items-center
          gap-2
          px-3
          py-1.5
          rounded-full
          bg-red-100
          text-red-700
          text-xs
          font-semibold
          whitespace-nowrap
        "
      >

        <FaTimesCircle />

        Dibatalkan

      </span>

    );

  }


  return (

    <span
      className="
        inline-flex
        items-center
        gap-2
        px-3
        py-1.5
        rounded-full
        bg-gray-100
        text-gray-600
        text-xs
        font-semibold
      "
    >

      <FaClock />

      {status || "-"}

    </span>

  );

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

  // ===================================================
  // STATE
  // ===================================================

  const [
    tableData,
    setTableData,
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
    filterStatus,
    setFilterStatus,
  ] = useState(
    "ALL"
  );


  const [
    filterCabang,
    setFilterCabang,
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
    loading,
    setLoading,
  ] = useState(
    false
  );


  const [
    selectedData,
    setSelectedData,
  ] = useState(
    null
  );


  const [
    showDetail,
    setShowDetail,
  ] = useState(
    false
  );


  // ===================================================
  // CABANG OPTIONS
  // ===================================================

  const cabangOptions =
    useMemo(
      () => {

        return [
          "ALL",
          ...new Set(
            tableData.map(
              item =>
                item.cabang
            )
          ),
        ];

      },
      [
        tableData,
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
            ...tableData,
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

                item.customer_id
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

                item.cabang
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.sales
                  ?.toLowerCase()
                  .includes(
                    search
                  )

            );

        }


        // STATUS

        if (
          filterStatus !==
          "ALL"
        ) {

          data =
            data.filter(
              item =>
                item.status ===
                filterStatus
            );

        }


        // CABANG

        if (
          filterCabang !==
          "ALL"
        ) {

          data =
            data.filter(
              item =>
                item.cabang ===
                filterCabang
            );

        }


        return data;

      },
      [
        tableData,
        keyword,
        filterStatus,
        filterCabang,
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
  // SUMMARY
  // ===================================================

  const summaryData =
    useMemo(
      () => {

        const total =
          tableData.length;


        const aktif =
          tableData.filter(
            item =>
              item.status ===
              "AKTIF"
          ).length;


        const lunas =
          tableData.filter(
            item =>
              item.status ===
              "LUNAS"
          ).length;


        const dibatalkan =
          tableData.filter(
            item =>
              item.status ===
              "DIBATALKAN"
          ).length;


        const totalTagihan =
          tableData.reduce(
            (
              sum,
              item
            ) =>
              sum +
              Number(
                item.nominal_tagihan ||
                0
              ),
            0
          );


        const totalAktif =
          tableData
            .filter(
              item =>
                item.status ===
                "AKTIF"
            )
            .reduce(
              (
                sum,
                item
              ) =>
                sum +
                Number(
                  item.nominal_tagihan ||
                  0
                ),
              0
            );


        return {

          total,

          aktif,

          lunas,

          dibatalkan,

          totalTagihan,

          totalAktif,

        };

      },
      [
        tableData,
      ]
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
      filterStatus,
      filterCabang,
      perPage,
    ]
  );


  // ===================================================
  // SIMULATE LOADING
  // ===================================================

  useEffect(
    () => {

      setLoading(
        true
      );


      const timer =
        setTimeout(
          () => {

            setLoading(
              false
            );

          },
          300
        );


      return () =>
        clearTimeout(
          timer
        );

    },
    [
      currentPage,
      perPage,
      keyword,
      filterStatus,
      filterCabang,
    ]
  );


  // ===================================================
  // RELOAD DARI UPLOAD
  // ===================================================

  useEffect(
    () => {

      if (
        reloadData
      ) {

        setReloadData(
          false
        );

      }

    },
    [
      reloadData,
      setReloadData,
    ]
  );


  // ===================================================
  // SEARCH
  // ===================================================

  const handleSearch =
    (e) => {

      e.preventDefault();

      setCurrentPage(
        1
      );

    };


  // ===================================================
  // RESET FILTER
  // ===================================================

  const resetFilter =
    () => {

      setKeyword("");

      setFilterStatus(
        "ALL"
      );

      setFilterCabang(
        "ALL"
      );

      setCurrentPage(
        1
      );

    };


  // ===================================================
  // DELETE
  // ===================================================

  const handleDelete =
    async (
      data
    ) => {

      const result =
        await swal.confirm(
          "Hapus Faktur",
          `Apakah faktur ${data.no_faktur} akan dihapus?`
        );


      if (
        !result
      ) {

        return;

      }


      setLoading(
        true
      );


      setTimeout(
        async () => {

          setTableData(
            prev =>
              prev.filter(
                item =>
                  item.id !==
                  data.id
              )
          );


          setLoading(
            false
          );


          await swal.success(
            "Data faktur berhasil dihapus"
          );

        },
        400
      );

    };


  // ===================================================
  // DETAIL
  // ===================================================

  const handleDetail =
    (
      data
    ) => {

      setSelectedData(
        data
      );

      setShowDetail(
        true
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
  // TABLE HEADER
  // ===================================================

  const headerTable = [

    {
      label:
        "Aksi",

      icon:
        <FaEllipsisV />,
    },

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
        "Cabang",

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
        "Tgl Faktur",

      icon:
        <FaCalendarAlt />,
    },

    {
      label:
        "Jatuh Tempo",

      icon:
        <FaClock />,
    },

    {
      label:
        "Nominal Tagihan",

      icon:
        <FaMoneyBillWave />,
    },

    {
      label:
        "Sales",

      icon:
        <FaUser />,
    },

    {
      label:
        "Status",

      icon:
        <FaClipboardList />,
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
      {/* SEARCH */}
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

        <form
          onSubmit={
            handleSearch
          }
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
              Cari nomor faktur / customer / sales...
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

        </form>


        {/* FILTER */}

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
              min-w-[180px]
            "
            value={
              filterStatus
            }
            onChange={
              e =>
                setFilterStatus(
                  e.target.value
                )
            }
          >

            <option value="ALL">
              Semua Status
            </option>

            <option value="AKTIF">
              Aktif
            </option>

            <option value="LUNAS">
              Lunas
            </option>

            <option value="DIBATALKAN">
              Dibatalkan
            </option>

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
            value={
              filterCabang
            }
            onChange={
              e =>
                setFilterCabang(
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
                  (
                    cabang
                  ) => (

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


          <button
            type="button"
            onClick={
              resetFilter
            }
            className="
              inline-flex
              items-center
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

            Reset

          </button>

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

              <FaFileInvoiceDollar
                className="
                  text-blue-600
                "
              />

            </div>

          </div>

        </div>


        {/* AKTIF */}

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
                Faktur Aktif
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-green-900
                "
              >
                {
                  summaryData.aktif
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


        {/* LUNAS */}

        <div
          className="
            rounded-2xl
            bg-amber-50
            border
            border-amber-100
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
                  text-amber-700
                "
              >
                Faktur Lunas
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-amber-900
                "
              >
                {
                  summaryData.lunas
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

              <FaMoneyBillWave
                className="
                  text-amber-600
                "
              />

            </div>

          </div>

        </div>


        {/* TOTAL TAGIHAN */}

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
                Total Tagihan
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
                    summaryData.totalTagihan
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
              relative
              overflow-auto
              rounded-2xl
              max-h-[65vh]
            "
          >

            {/* LOADING */}

            {
              loading && (

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

                    <span
                      className="
                        text-sm
                        text-gray-600
                      "
                    >
                      Memuat data faktur...
                    </span>

                  </div>

                </div>

              )
            }


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

                  {
                    headerTable.map(
                      (
                        h,
                        index
                      ) => (

                        <th
                          key={
                            index
                          }
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

                            {
                              h.icon
                            }

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
                          headerTable.length
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

                            <div
                              className="
                                dropdown
                                dropdown-right
                              "
                            >

                              <div
                                tabIndex={
                                  0
                                }
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
                                tabIndex={
                                  0
                                }
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
                                      handleDetail(
                                        item
                                      )
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

                                    <FaPencilAlt />

                                    Edit

                                  </button>

                                </li>


                                <li>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDelete(
                                        item
                                      )
                                    }
                                    className="
                                      text-red-500
                                    "
                                  >

                                    <FaTrash />

                                    Hapus

                                  </button>

                                </li>

                              </ul>

                            </div>

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
                                gap-3
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
                                    font-bold
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
                                  ID: {
                                    item.customer_id
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


                              <p
                                className="
                                  font-semibold
                                  text-gray-700
                                "
                              >
                                {
                                  item.nama_customer
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

                            <span
                              className="
                                inline-flex
                                px-3
                                py-1.5
                                rounded-full
                                bg-blue-50
                                text-primary
                                text-xs
                                font-semibold
                              "
                            >

                              {
                                item.cabang
                              }

                            </span>

                          </td>


                          {/* ALAMAT */}

                          <td
                            className="
                              px-4
                              py-3
                              min-w-[280px]
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
                                  item.alamat
                                }
                              </span>

                            </div>

                          </td>


                          {/* TGL FAKTUR */}

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
                                text-gray-600
                              "
                            >

                              <FaCalendarAlt
                                className="
                                  text-primary
                                "
                              />

                              {
                                formatDate(
                                  item.tanggal_faktur
                                )
                              }

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
                              "
                            >

                              <FaClock
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

                                {
                                  formatDate(
                                    item.jatuh_tempo
                                  )
                                }

                              </span>

                            </div>

                          </td>


                          {/* NOMINAL */}

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
                                  item.nominal_tagihan
                                )
                              }

                            </span>

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
                                {
                                  item.sales
                                }
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

                            {
                              renderStatus(
                                item.status
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

                  <span className="font-semibold">
                    {
                      startIndex
                    }
                  </span>

                  {" "}to{" "}

                  <span className="font-semibold">
                    {
                      endIndex
                    }
                  </span>

                  {" "}of{" "}

                  <span className="font-semibold">
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
                      rounded-full
                      bg-white
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
                totalPage > 0 && (

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
                          e.selected + 1
                        )
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
        showDetail &&
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
            onClick={() => {

              setShowDetail(
                false
              );

              setSelectedData(
                null
              );

            }}
          >

            <div
              className="
                bg-white
                rounded-2xl
                shadow-2xl
                w-full
                max-w-2xl
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

                      <FaFileInvoiceDollar />

                    </div>


                    <div>

                      <h3
                        className="
                          font-bold
                          text-lg
                        "
                      >
                        Detail Faktur
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
                    onClick={() => {

                      setShowDetail(
                        false
                      );

                      setSelectedData(
                        null
                      );

                    }}
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
                  sm:grid-cols-2
                  gap-5
                "
              >

                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Nomor Faktur
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
                    Customer ID
                  </p>

                  <p className="
                    font-semibold
                    text-gray-700
                  ">
                    {
                      selectedData.customer_id
                    }
                  </p>

                </div>


                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Customer
                  </p>

                  <p className="
                    font-semibold
                    text-gray-700
                  ">
                    {
                      selectedData.nama_customer
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


                <div
                  className="
                    sm:col-span-2
                  "
                >

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Alamat
                  </p>

                  <p className="
                    text-sm
                    text-gray-600
                  ">
                    {
                      selectedData.alamat
                    }
                  </p>

                </div>


                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Tanggal Faktur
                  </p>

                  <p className="
                    font-semibold
                    text-gray-700
                  ">
                    {
                      formatDate(
                        selectedData.tanggal_faktur
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


                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Nominal Tagihan
                  </p>

                  <p className="
                    font-bold
                    text-primary
                  ">
                    {
                      formatRupiah(
                        selectedData.nominal_tagihan
                      )
                    }
                  </p>

                </div>


                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Sales
                  </p>

                  <p className="
                    font-semibold
                    text-gray-700
                  ">
                    {
                      selectedData.sales
                    }
                  </p>

                </div>


                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Status
                  </p>

                  <div className="mt-1">

                    {
                      renderStatus(
                        selectedData.status
                      )
                    }

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
                  onClick={() => {

                    setShowDetail(
                      false
                    );

                    setSelectedData(
                      null
                    );

                  }}
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


export default TableMasterFaktur;