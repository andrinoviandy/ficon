import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaMoneyBillWave,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaFileInvoiceDollar,
  FaBuilding,
  FaCalendarAlt,
  FaUser,
  FaEllipsisV,
  FaHashtag,
  FaInfoCircle,
  FaTimes,
  FaEye,
  FaFileAlt,
  FaUniversity,
  FaCreditCard,
  FaCashRegister,
  FaExclamationTriangle,
  FaCheck,
} from "react-icons/fa";

import {
  IoSearch,
} from "react-icons/io5";

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
// FORMAT CURRENCY
// =====================================================

const formatRupiah = (value) => {

  if (
    value === null ||
    value === undefined
  ) {
    return "Rp0";
  }

  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }
  ).format(value);

};


// =====================================================
// DUMMY DATA
// =====================================================

const dummyData = [

  {
    id: 1,

    no_faktur: "10000271521",

    customer_id: "10000271521",

    nama_customer:
      "Dinas Kesehatan Kota Medan",

    nama_penagih:
      "KFTD Medan",

    alamat:
      "Jl. Gatot Subroto No. 125, Medan",

    nominal_tagihan:
      140000000,

    posting_date:
      "2026-08-01",

    due_date:
      "2026-08-22",

    sales:
      "Andri Noviandy",

    status:
      "MENUNGGU_VERIFIKASI",

    tanggal_pembayaran:
      "2026-08-15",

    metode_pembayaran:
      "GIRO",

    bukti_pembayaran:
      "bukti_10000271521.pdf",

    keterangan_pembayaran:
      "Pembayaran faktur melalui giro.",

  },

  {
    id: 2,

    no_faktur: "10000271522",

    customer_id: "10000271522",

    nama_customer:
      "Apotek Maju Djaya",

    nama_penagih:
      "KFTD Medan",

    alamat:
      "Jl. Sisingamangaraja No. 88, Medan",

    nominal_tagihan:
      85000000,

    posting_date:
      "2026-08-02",

    due_date:
      "2026-08-25",

    sales:
      "Budi Santoso",

    status:
      "MENUNGGU_VERIFIKASI",

    tanggal_pembayaran:
      "2026-08-15",

    metode_pembayaran:
      "DIRECT_TRANSFER",

    bukti_pembayaran:
      "bukti_10000271522.jpg",

    keterangan_pembayaran:
      "Pembayaran melalui transfer bank.",

  },

  {
    id: 3,

    no_faktur: "10000271523",

    customer_id: "10000271523",

    nama_customer:
      "Apotek Rusli",

    nama_penagih:
      "KFTD Medan",

    alamat:
      "Jl. Iskandar Muda No. 45, Medan",

    nominal_tagihan:
      140000000,

    posting_date:
      "2026-08-03",

    due_date:
      "2026-08-27",

    sales:
      "Citra Lestari",

    status:
      "PEMBAYARAN_DITERIMA",

    tanggal_pembayaran:
      "2026-08-14",

    metode_pembayaran:
      "CASH",

    bukti_pembayaran:
      "bukti_10000271523.jpg",

    tanggal_verifikasi:
      "2026-08-15",

    keterangan_verifikasi:
      "Bukti pembayaran sesuai.",

  },

  {
    id: 4,

    no_faktur: "10000271524",

    customer_id: "10000271524",

    nama_customer:
      "RSUD Pasuruan",

    nama_penagih:
      "KFTD Pasuruan",

    alamat:
      "Jl. Wahidin Sudirohusodo No. 10, Pasuruan",

    nominal_tagihan:
      175000000,

    posting_date:
      "2026-08-04",

    due_date:
      "2026-08-29",

    sales:
      "Dimas Pratama",

    status:
      "PEMBAYARAN_DITOLAK",

    tanggal_pembayaran:
      "2026-08-14",

    metode_pembayaran:
      "GIRO",

    bukti_pembayaran:
      "bukti_10000271524.pdf",

    tanggal_verifikasi:
      "2026-08-15",

    keterangan_verifikasi:
      "Bukti pembayaran tidak sesuai dengan nominal faktur.",

  },

  {
    id: 5,

    no_faktur: "10000271525",

    customer_id: "10000271525",

    nama_customer:
      "RS Hermina Medan",

    nama_penagih:
      "KFTD Medan",

    alamat:
      "Jl. Asrama No. 12, Medan",

    nominal_tagihan:
      95000000,

    posting_date:
      "2026-08-05",

    due_date:
      "2026-08-30",

    sales:
      "Andri Noviandy",

    status:
      "MENUNGGU_VERIFIKASI",

    tanggal_pembayaran:
      "2026-08-15",

    metode_pembayaran:
      "DIRECT_TRANSFER",

    bukti_pembayaran:
      "bukti_10000271525.pdf",

    keterangan_pembayaran:
      "Pembayaran invoice bulan Agustus.",

  },

  {
    id: 6,

    no_faktur: "10000271526",

    customer_id: "10000271526",

    nama_customer:
      "Apotek Sehat Sentosa",

    nama_penagih:
      "KFTD Jakarta",

    alamat:
      "Jl. Kelapa Gading Raya No. 21, Jakarta",

    nominal_tagihan:
      65000000,

    posting_date:
      "2026-08-06",

    due_date:
      "2026-09-01",

    sales:
      "Budi Santoso",

    status:
      "MENUNGGU_VERIFIKASI",

    tanggal_pembayaran:
      "2026-08-15",

    metode_pembayaran:
      "CASH",

    bukti_pembayaran:
      "bukti_10000271526.jpg",

    keterangan_pembayaran:
      "Pembayaran tunai oleh collector.",

  },

  {
    id: 7,

    no_faktur: "10000271527",

    customer_id: "10000271527",

    nama_customer:
      "Klinik Medika Utama",

    nama_penagih:
      "KFTD Jakarta",

    alamat:
      "Jl. Boulevard Barat No. 30, Jakarta",

    nominal_tagihan:
      72500000,

    posting_date:
      "2026-08-07",

    due_date:
      "2026-09-03",

    sales:
      "Citra Lestari",

    status:
      "PEMBAYARAN_DITERIMA",

    tanggal_pembayaran:
      "2026-08-14",

    metode_pembayaran:
      "DIRECT_TRANSFER",

    bukti_pembayaran:
      "bukti_10000271527.jpg",

    tanggal_verifikasi:
      "2026-08-15",

    keterangan_verifikasi:
      "Pembayaran telah diverifikasi.",

  },

  {
    id: 8,

    no_faktur: "10000271528",

    customer_id: "10000271528",

    nama_customer:
      "RS Siloam Medan",

    nama_penagih:
      "KFTD Medan",

    alamat:
      "Jl. Imam Bonjol No. 5, Medan",

    nominal_tagihan:
      210000000,

    posting_date:
      "2026-08-08",

    due_date:
      "2026-09-05",

    sales:
      "Dimas Pratama",

    status:
      "MENUNGGU_VERIFIKASI",

    tanggal_pembayaran:
      "2026-08-15",

    metode_pembayaran:
      "GIRO",

    bukti_pembayaran:
      "bukti_10000271528.pdf",

    keterangan_pembayaran:
      "Pembayaran menggunakan giro.",

  },

  {
    id: 9,

    no_faktur: "10000271529",

    customer_id: "10000271529",

    nama_customer:
      "Dinas Kesehatan Deli Serdang",

    nama_penagih:
      "KFTD Medan",

    alamat:
      "Jl. Negara No. 100, Deli Serdang",

    nominal_tagihan:
      125000000,

    posting_date:
      "2026-08-09",

    due_date:
      "2026-09-07",

    sales:
      "Andri Noviandy",

    status:
      "PEMBAYARAN_DITERIMA",

    tanggal_pembayaran:
      "2026-08-14",

    metode_pembayaran:
      "SSP",

    bukti_pembayaran:
      "bukti_10000271529.pdf",

    tanggal_verifikasi:
      "2026-08-15",

    keterangan_verifikasi:
      "Dokumen pembayaran valid.",

  },

  {
    id: 10,

    no_faktur: "10000271530",

    customer_id: "10000271530",

    nama_customer:
      "Apotek Kimia Sehat",

    nama_penagih:
      "KFTD Jakarta",

    alamat:
      "Jl. Sunter Agung No. 18, Jakarta",

    nominal_tagihan:
      45000000,

    posting_date:
      "2026-08-10",

    due_date:
      "2026-09-10",

    sales:
      "Budi Santoso",

    status:
      "MENUNGGU_VERIFIKASI",

    tanggal_pembayaran:
      "2026-08-15",

    metode_pembayaran:
      "DIRECT_TRANSFER",

    bukti_pembayaran:
      "bukti_10000271530.jpg",

    keterangan_pembayaran:
      "Transfer pembayaran faktur.",

  },

];


// =====================================================
// STATUS CONFIG
// =====================================================

const statusConfig = {

  MENUNGGU_VERIFIKASI: {

    label:
      "Menunggu Verifikasi",

    icon:
      FaClock,

    className:
      "bg-amber-100 text-amber-700",

  },

  PEMBAYARAN_DITERIMA: {

    label:
      "Pembayaran Diterima",

    icon:
      FaCheckCircle,

    className:
      "bg-green-100 text-green-700",

  },

  PEMBAYARAN_DITOLAK: {

    label:
      "Pembayaran Ditolak",

    icon:
      FaTimes,

    className:
      "bg-red-100 text-red-700",

  },

};


// =====================================================
// PAYMENT METHOD
// =====================================================

const paymentMethodConfig = {

  DIRECT_TRANSFER: {

    label:
      "Direct Transfer",

    icon:
      FaUniversity,

    className:
      "text-blue-600",

  },

  GIRO: {

    label:
      "Giro",

    icon:
      FaCreditCard,

    className:
      "text-orange-500",

  },

  SSP: {

    label:
      "Surat Setor Pajak",

    icon:
      FaFileInvoiceDollar,

    className:
      "text-purple-500",

  },

  CASH: {

    label:
      "Cash",

    icon:
      FaCashRegister,

    className:
      "text-green-500",

  },

};


// =====================================================
// COMPONENT
// =====================================================

const TableVerifikasiPembayaran = ({
  dimensionScreenW,
  check,
  loginAccess,
}) => {


  // ===================================================
  // STATE
  // ===================================================

  const [allData, setAllData] =
    useState(dummyData);

  const [keyword, setKeyword] =
    useState("");

  const [selectedStatus, setSelectedStatus] =
    useState("ALL");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [perPage, setPerPage] =
    useState(10);

  const [selectedIds, setSelectedIds] =
    useState([]);

  const [selectedData, setSelectedData] =
    useState(null);

  const [showVerificationModal, setShowVerificationModal] =
    useState(false);

  const [verificationDescription, setVerificationDescription] =
    useState("");

  const [verificationAction, setVerificationAction] =
    useState(null);


  // ===================================================
  // SUMMARY
  // ===================================================

  const summaryData = useMemo(() => {

    return {

      total:
        allData.length,

      menunggu_verifikasi:
        allData.filter(
          x =>
            x.status ===
            "MENUNGGU_VERIFIKASI"
        ).length,

      pembayaran_diterima:
        allData.filter(
          x =>
            x.status ===
            "PEMBAYARAN_DITERIMA"
        ).length,

      pembayaran_ditolak:
        allData.filter(
          x =>
            x.status ===
            "PEMBAYARAN_DITOLAK"
        ).length,

      total_nominal_menunggu:
        allData
          .filter(
            x =>
              x.status ===
              "MENUNGGU_VERIFIKASI"
          )
          .reduce(
            (sum, x) =>
              sum +
              x.nominal_tagihan,
            0
          ),

    };

  }, [allData]);


  // ===================================================
  // FILTER
  // ===================================================

  const filteredData = useMemo(() => {

    let data =
      [...allData];


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
              .includes(search)

            ||

            item.nama_customer
              ?.toLowerCase()
              .includes(search)

            ||

            item.nama_penagih
              ?.toLowerCase()
              .includes(search)

            ||

            item.sales
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
      (currentPage - 1) *
      perPage,
      currentPage *
      perPage
    );


  useEffect(() => {

    setCurrentPage(1);

  }, [
    keyword,
    selectedStatus,
    perPage,
  ]);


  // ===================================================
  // CURRENT PAGE SELECTABLE IDS
  // ===================================================

  const currentPageIds =
    paginatedData
      .filter(
        item =>
          item.status ===
          "MENUNGGU_VERIFIKASI"
      )
      .map(
        item =>
          item.id
      );


  // ===================================================
  // CHECK ALL
  // ===================================================

  const isAllSelected =
    currentPageIds.length >
    0 &&
    currentPageIds.every(
      id =>
        selectedIds.includes(
          id
        )
    );


  const handleSelectAll = () => {

    if (
      isAllSelected
    ) {

      setSelectedIds(
        prev =>
          prev.filter(
            id =>
              !currentPageIds.includes(
                id
              )
          )
      );

    } else {

      setSelectedIds(
        prev => [

          ...new Set([
            ...prev,
            ...currentPageIds,
          ]),

        ]
      );

    }

  };


  // ===================================================
  // CHECK ONE
  // ===================================================

  const handleSelectOne = (
    id
  ) => {

    setSelectedIds(
      prev => {

        if (
          prev.includes(id)
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
  // OPEN VERIFICATION
  // ===================================================

  const openVerification = (
    data = null
  ) => {

    let selected;

    if (data) {

      selected = data;

    } else {

      selected =
        allData.filter(
          item =>
            selectedIds.includes(
              item.id
            )
        );

    }


    if (
      !selected ||
      (
        Array.isArray(selected) &&
        selected.length === 0
      )
    ) {

      return;

    }


    setSelectedData(
      selected
    );

    setVerificationDescription(
      ""
    );

    setVerificationAction(
      null
    );

    setShowVerificationModal(
      true
    );

  };


  // ===================================================
  // CLOSE VERIFICATION
  // ===================================================

  const closeVerification = () => {

    setShowVerificationModal(
      false
    );

    setSelectedData(
      null
    );

    setVerificationDescription(
      ""
    );

    setVerificationAction(
      null
    );

  };


  // ===================================================
  // HANDLE VERIFICATION
  // ===================================================

  const handleVerification = (
    action
  ) => {

    const dataToVerify =
      Array.isArray(
        selectedData
      )
        ? selectedData
        : [
          selectedData,
        ];


    const ids =
      dataToVerify
        .filter(
          item =>
            item &&
            item.status ===
            "MENUNGGU_VERIFIKASI"
        )
        .map(
          item =>
            item.id
        );


    if (
      ids.length === 0
    ) {

      return;

    }


    const newStatus =
      action === "TERIMA"
        ? "PEMBAYARAN_DITERIMA"
        : "PEMBAYARAN_DITOLAK";


    setAllData(
      prev =>
        prev.map(
          item =>

            ids.includes(
              item.id
            )

              ? {

                ...item,

                status:
                  newStatus,

                tanggal_verifikasi:
                  new Date()
                    .toISOString(),

                keterangan_verifikasi:
                  verificationDescription,

              }

              : item

        )
    );


    setSelectedIds(
      prev =>
        prev.filter(
          id =>
            !ids.includes(
              id
            )
        )
    );


    closeVerification();

  };


  // ===================================================
  // RENDER STATUS
  // ===================================================

  const renderStatus = (
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

        {config.label}

      </span>

    );

  };


  // ===================================================
  // PAYMENT METHOD
  // ===================================================

  const renderPaymentMethod = (
    method
  ) => {

    const config =
      paymentMethodConfig[
        method
      ];


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
          text-sm
        "
      >

        <Icon
          className={
            config.className
          }
        />

        <span
          className="
            font-medium
            text-gray-700
          "
        >
          {config.label}
        </span>

      </div>

    );

  };


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
        "Penagih",

      icon:
        <FaUser />,

    },

    {
      label:
        "Nominal",

      icon:
        <FaMoneyBillWave />,

    },

    {
      label:
        "Tgl. Pembayaran",

      icon:
        <FaCalendarAlt />,

    },

    {
      label:
        "Metode Pembayaran",

      icon:
        <FaUniversity />,

    },

    {
      label:
        "Status",

      icon:
        <FaInfoCircle />,

    },

    {
      label:
        "Aksi",

      icon:
        <FaEllipsisV />,

    },

  ];


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
  // SELECTED ITEMS
  // ===================================================

  const verificationItems =
    Array.isArray(
      selectedData
    )
      ? selectedData
      : selectedData
        ? [selectedData]
        : [];


  const totalVerification =
    verificationItems.reduce(
      (
        total,
        item
      ) =>
        total +
        (
          item?.nominal_tagihan ||
          0
        ),
      0
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
      {/* SEARCH & FILTER */}
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
              Cari faktur / customer / penagih...
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
              min-w-[210px]
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

            <option value="MENUNGGU_VERIFIKASI">
              Menunggu Verifikasi
            </option>

            <option value="PEMBAYARAN_DITERIMA">
              Pembayaran Diterima
            </option>

            <option value="PEMBAYARAN_DITOLAK">
              Pembayaran Ditolak
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
                Total Pembayaran
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


        {/* WAITING */}

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
                Menunggu Verifikasi
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-amber-900
                "
              >
                {
                  summaryData.menunggu_verifikasi
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


        {/* ACCEPTED */}

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
                  summaryData.pembayaran_diterima
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


        {/* REJECTED */}

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
                Pembayaran Ditolak
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-red-900
                "
              >
                {
                  summaryData.pembayaran_ditolak
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

              <FaTimes
                className="
                  text-red-600
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

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-blue-900
              "
            >

              <FaCheckCircle />

              <span>

                <b>
                  {
                    selectedIds.length
                  }
                </b>

                {" "}
                pembayaran dipilih

              </span>

            </div>


            <div
              className="
                flex
                gap-2
              "
            >

              <button
                type="button"
                onClick={() =>
                  setSelectedIds([])
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
                onClick={() =>
                  openVerification()
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

                <FaCheckCircle />

                Verifikasi Pembayaran (
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

                  {/* CHECK ALL */}

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
                        currentPageIds.length ===
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

                        <FaFileInvoiceDollar
                          className="
                            text-4xl
                            text-gray-300
                            mx-auto
                            mb-3
                          "
                        />

                        Tidak ada data pembayaran

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
                          className="
                            hover:bg-blue-50
                            transition
                            duration-200
                            border-b
                          "
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
                                "MENUNGGU_VERIFIKASI"
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


                              <div>

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

                                <p
                                  className="
                                    text-xs
                                    text-gray-400
                                  "
                                >
                                  ID: {
                                    v.customer_id
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

                                <p
                                  className="
                                    text-xs
                                    text-gray-400
                                  "
                                >
                                  {
                                    v.alamat
                                  }
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* PENAGIH */}

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
                                  v.nama_penagih
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
                                  v.nominal_tagihan
                                )
                              }
                            </span>

                          </td>


                          {/* TANGGAL PEMBAYARAN */}

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
                                  v.tanggal_pembayaran
                                )
                              }

                            </div>

                          </td>


                          {/* METODE */}

                          <td
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >

                            {
                              renderPaymentMethod(
                                v.metode_pembayaran
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


                          {/* AKSI */}

                          <td
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >

                            {
                              v.status ===
                                "MENUNGGU_VERIFIKASI"
                                ? (

                                  <button
                                    type="button"
                                    onClick={() =>
                                      openVerification(
                                        v
                                      )
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
                                      hover:opacity-90
                                      transition
                                      shadow-sm
                                    "
                                  >

                                    <FaCheckCircle />

                                    Verifikasi

                                  </button>

                                )
                                : (

                                  <button
                                    type="button"
                                    onClick={() =>
                                      openVerification(
                                        v
                                      )
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
                                      text-xs
                                      font-semibold
                                      hover:bg-gray-50
                                    "
                                  >

                                    <FaEye />

                                    Detail

                                  </button>

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
      {/* VERIFICATION MODAL */}
      {/* ================================================= */}

      {
        showVerificationModal && (

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
            onClick={
              closeVerification
            }
          >

            <div
              className="
                bg-white
                rounded-2xl
                shadow-2xl
                w-full
                max-w-5xl
                max-h-[90vh]
                overflow-y-auto
              "
              onClick={
                e =>
                  e.stopPropagation()
              }
            >

              {/* ================================================= */}
              {/* MODAL HEADER */}
              {/* ================================================= */}

              <div
                className="
                  bg-primary
                  px-6
                  py-4
                  text-white
                  sticky
                  top-0
                  z-10
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

                      <FaCheckCircle />

                    </div>


                    <div>

                      <h3
                        className="
                          font-bold
                          text-lg
                        "
                      >
                        Verifikasi Pembayaran
                      </h3>


                      <p
                        className="
                          text-xs
                          text-blue-100
                        "
                      >

                        {
                          verificationItems.length
                        }{" "}
                        pembayaran dipilih

                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    onClick={
                      closeVerification
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


              {/* ================================================= */}
              {/* MODAL BODY */}
              {/* ================================================= */}

              <div
                className="
                  p-5
                  flex
                  flex-col
                  gap-5
                "
              >

                {/* TOTAL */}

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
                      sm:flex-row
                      justify-between
                      gap-3
                    "
                  >

                    <div>

                      <p
                        className="
                          text-sm
                          text-blue-700
                        "
                      >
                        Total Pembayaran
                      </p>

                      <p
                        className="
                          text-2xl
                          font-bold
                          text-blue-900
                        "
                      >
                        {
                          formatRupiah(
                            totalVerification
                          )
                        }
                      </p>

                    </div>


                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-blue-700
                      "
                    >

                      <FaClipboardList />

                      {
                        verificationItems.length
                      }{" "}
                      faktur

                    </div>

                  </div>

                </div>


                {/* LIST PEMBAYARAN */}

                <div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mb-4
                    "
                  >

                    <FaFileInvoiceDollar
                      className="
                        text-primary
                      "
                    />

                    <h3
                      className="
                        font-bold
                        text-gray-700
                      "
                    >
                      Detail Pembayaran
                    </h3>

                  </div>


                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-3
                    "
                  >

                    {
                      verificationItems.map(
                        item => (

                          <div
                            key={
                              item.id
                            }
                            className="
                              rounded-2xl
                              border
                              border-gray-200
                              bg-gray-50
                              p-4
                            "
                          >

                            <div
                              className="
                                flex
                                flex-col
                                lg:flex-row
                                justify-between
                                gap-4
                              "
                            >

                              {/* LEFT */}

                              <div
                                className="
                                  flex
                                  gap-3
                                "
                              >

                                <div
                                  className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-white
                                    border
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
                                      text-xs
                                      text-gray-400
                                    "
                                  >
                                    No. Faktur
                                  </p>

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
                                      text-sm
                                      text-gray-600
                                      mt-1
                                    "
                                  >
                                    {
                                      item.nama_customer
                                    }
                                  </p>

                                </div>

                              </div>


                              {/* RIGHT */}

                              <div
                                className="
                                  text-left
                                  lg:text-right
                                "
                              >

                                <p
                                  className="
                                    text-xs
                                    text-gray-400
                                  "
                                >
                                  Nominal Pembayaran
                                </p>

                                <p
                                  className="
                                    text-lg
                                    font-bold
                                    text-primary
                                  "
                                >
                                  {
                                    formatRupiah(
                                      item.nominal_tagihan
                                    )
                                  }
                                </p>

                              </div>

                            </div>


                            {/* DETAIL */}

                            <div
                              className="
                                mt-4
                                pt-4
                                border-t
                                border-gray-200
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-4
                                gap-4
                              "
                            >

                              <div>

                                <p
                                  className="
                                    text-xs
                                    text-gray-400
                                    mb-1
                                  "
                                >
                                  Tanggal Pembayaran
                                </p>

                                <p
                                  className="
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                  "
                                >
                                  {
                                    formatDate(
                                      item.tanggal_pembayaran
                                    )
                                  }
                                </p>

                              </div>


                              <div>

                                <p
                                  className="
                                    text-xs
                                    text-gray-400
                                    mb-1
                                  "
                                >
                                  Metode Pembayaran
                                </p>

                                {
                                  renderPaymentMethod(
                                    item.metode_pembayaran
                                  )
                                }

                              </div>


                              <div>

                                <p
                                  className="
                                    text-xs
                                    text-gray-400
                                    mb-1
                                  "
                                >
                                  Bukti Pembayaran
                                </p>

                                <button
                                  type="button"
                                  className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-semibold
                                    text-primary
                                    hover:underline
                                  "
                                  onClick={() =>
                                    alert(
                                      `Buka bukti: ${item.bukti_pembayaran}`
                                    )
                                  }
                                >

                                  <FaFileAlt />

                                  Lihat Bukti

                                </button>

                              </div>


                              <div>

                                <p
                                  className="
                                    text-xs
                                    text-gray-400
                                    mb-1
                                  "
                                >
                                  Sales
                                </p>

                                <p
                                  className="
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                  "
                                >
                                  {
                                    item.sales
                                  }
                                </p>

                              </div>

                            </div>


                            {/* KETERANGAN PEMBAYARAN */}

                            {
                              item.keterangan_pembayaran && (

                                <div
                                  className="
                                    mt-4
                                    bg-white
                                    rounded-xl
                                    p-3
                                    border
                                    border-gray-100
                                  "
                                >

                                  <p
                                    className="
                                      text-xs
                                      text-gray-400
                                      mb-1
                                    "
                                  >
                                    Keterangan Pembayaran
                                  </p>

                                  <p
                                    className="
                                      text-sm
                                      text-gray-600
                                    "
                                  >
                                    {
                                      item.keterangan_pembayaran
                                    }
                                  </p>

                                </div>

                              )
                            }

                          </div>

                        )
                      )
                    }

                  </div>

                </div>


                {/* VERIFICATION DESCRIPTION */}

                {
                  verificationItems.some(
                    item =>
                      item.status ===
                      "MENUNGGU_VERIFIKASI"
                  ) && (

                    <div
                      className="
                        rounded-2xl
                        bg-gray-50
                        border
                        border-gray-200
                        p-5
                      "
                    >

                      <label
                        className="
                          text-sm
                          font-semibold
                          text-gray-700
                          mb-2
                          block
                        "
                      >

                        Keterangan Verifikasi

                        <span
                          className="
                            text-gray-400
                            font-normal
                          "
                        >
                          {" "}
                          (opsional)
                        </span>

                      </label>


                      <textarea
                        className="
                          textarea
                          textarea-bordered
                          w-full
                          bg-white
                          rounded-xl
                          min-h-[110px]
                        "
                        placeholder="
                          Contoh: Bukti pembayaran sesuai dengan nominal faktur.
                        "
                        value={
                          verificationDescription
                        }
                        onChange={
                          e =>
                            setVerificationDescription(
                              e.target.value
                            )
                        }
                      />

                    </div>

                  )
                }


                {/* WARNING */}

                {
                  verificationItems.some(
                    item =>
                      item.status !==
                      "MENUNGGU_VERIFIKASI"
                  ) && (

                    <div
                      className="
                        flex
                        items-start
                        gap-3
                        bg-amber-50
                        border
                        border-amber-200
                        rounded-xl
                        p-4
                      "
                    >

                      <FaExclamationTriangle
                        className="
                          text-amber-500
                          mt-0.5
                        "
                      />

                      <div>

                        <p
                          className="
                            text-sm
                            font-semibold
                            text-amber-800
                          "
                        >
                          Pembayaran telah diverifikasi
                        </p>

                        <p
                          className="
                            text-xs
                            text-amber-700
                            mt-1
                          "
                        >
                          Data pembayaran yang sudah
                          diterima atau ditolak hanya
                          dapat dilihat detailnya.
                        </p>

                      </div>

                    </div>

                  )
                }

              </div>


              {/* ================================================= */}
              {/* FOOTER */}
              {/* ================================================= */}

              <div
                className="
                  border-t
                  bg-gray-50
                  px-5
                  py-4
                  flex
                  flex-col
                  sm:flex-row
                  justify-end
                  gap-3
                "
              >

                <button
                  type="button"
                  onClick={
                    closeVerification
                  }
                  className="
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
                  "
                >

                  Tutup

                </button>


                {
                  verificationItems.some(
                    item =>
                      item.status ===
                      "MENUNGGU_VERIFIKASI"
                  ) && (

                    <>

                      {/* TOLAK */}

                      <button
                        type="button"
                        onClick={() =>
                          handleVerification(
                            "TOLAK"
                          )
                        }
                        className="
                          px-5
                          py-2.5
                          rounded-full
                          bg-red-500
                          text-white
                          text-sm
                          font-semibold
                          hover:bg-red-600
                          shadow-md
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >

                        <FaTimes />

                        Tolak Pembayaran

                      </button>


                      {/* TERIMA */}

                      <button
                        type="button"
                        onClick={() =>
                          handleVerification(
                            "TERIMA"
                          )
                        }
                        className="
                          px-6
                          py-2.5
                          rounded-full
                          bg-green-600
                          text-white
                          text-sm
                          font-semibold
                          hover:bg-green-700
                          shadow-md
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >

                        <FaCheck />

                        Terima Pembayaran

                      </button>

                    </>

                  )
                }

              </div>

            </div>

          </div>

        )
      }

    </div>

  );

};


export default TableVerifikasiPembayaran;