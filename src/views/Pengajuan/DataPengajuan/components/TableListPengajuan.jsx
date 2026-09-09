import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import {
  FaEllipsisV,
  FaFileAlt,
  FaCalendarAlt,
  FaUser,
  FaBuilding,
  FaMoneyBillWave,
  FaTags,
  FaInfoCircle,
  FaBriefcase,
  FaPercent,
  FaRegFileAlt,
  FaTimesCircle,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaClipboardList,
  FaSyncAlt,
  FaFilter,
  FaCommentAlt,
} from "react-icons/fa";



import {
  HiOutlineTicket,
} from "react-icons/hi2";

import { formatDate } from "global/helper/formatDate";
import { formatCurrency } from "global/helper/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
// import { getCookies } from "global/helper/cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { swal } from "global/helper/swal";
import storeSchema from "global/store";
import { IoFilterOutline, IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import ActionButton from "./ActionButton";
import ModalVerifikasi from "./Modal/ModalVerifikasi";
import ModalApprove from "./Modal/ModalApprove";
import ModalView from "./Modal/ModalView";
import ModalDownload from "./Modal/ModalDownload";
import { FaUserCheck } from "react-icons/fa6";
import ActionButtonChild from "./ActionButtonChild";
import { setToggleModal } from '../../../../redux/n2n/global';
import ModalFilter from "./Modal/ModalFilter";

// ==========================
// DUMMY DATA
// ==========================
// const dummyTableData = {
//   total_data: 200,

//   list_data: Array.from({ length: 200 }).map((_, i) => {

//     const dpp = 2500000 * (i + 1);

//     const ppn = 275000 * (i + 1);

//     const pph = i % 2 === 0 ? 50000 * (i + 1) : 0;

//     // ==========================
//     // STATUS PPN
//     // ==========================
//     const statusPPN =
//       i % 2 === 0 ? "Include" : "Exclude";

//     // ==========================
//     // CONDITIONAL DATA
//     // ==========================
//     const nomorFakturPajak =
//       statusPPN === "Include"
//         ? `010-202-39496${1000 + i}`
//         : "-";

//     const namaVendor =
//       statusPPN === "Include"
//         ? [
//           "PT Maju Jaya",
//           "PT Sumber Rejeki",
//           "CV Mitra Abadi",
//           "PT Nusantara Teknologi",
//         ][i % 4]
//         : "-";

//     const nomorInvoice =
//       statusPPN === "Include"
//         ? `INV-2026-${1000 + i}`
//         : "-";

//     return {

//       ROW_NUMBER: i + 1,

//       NO_PENGAJUAN:
//         `PNG-2026-${String(i + 1).padStart(4, "0")}`,

//       TANGGAL: "2026-05-10",

//       STATUS_VERIFIKASI:
//         i % 2 === 0
//           ? "Verified"
//           : "Unverified",

//       NAMA_PEMOHON: [
//         "Andri Noviandy",
//         "Budi Santoso",
//         "Rina Oktaviani",
//         "Dewi Lestari",
//         "Agus Pratama",
//       ][i % 5],

//       JABATAN: [
//         "Staff Finance",
//         "Supervisor",
//         "Manager",
//         "Staff Accounting",
//         "Admin Operasional",
//       ][i % 5],

//       CABANG: [
//         "Jakarta Selatan",
//         "Bandung",
//         "Surabaya",
//         "Medan",
//       ][i % 4],

//       JENIS_BIAYA: [
//         "Biaya Kasbon",
//         "Biaya Pengiriman",
//         "Biaya Outsourcing",
//         "Biaya Operasional",
//         "Biaya Konsumsi",
//       ][i % 4],

//       ACCOUNT_DESCRIPTION: [
//         "10020 - Operational Expense",
//         "10021 - Transport Expense",
//         "10022 - Office Expense",
//         "10023 - Delivery Expense",
//       ][i % 4],

//       NOMINAL_DPP: dpp,

//       STATUS_PPN: statusPPN,

//       PPN:
//         statusPPN === "Include"
//           ? {
//             percent: 11,
//             nominal: ppn,
//           }
//           : {
//             percent: "-",
//             nominal: "-",
//           },

//       STATUS_PKP:
//         i % 2 === 0
//           ? "PKP"
//           : "Non PKP",

//       NPWP:
//         i % 2 === 0
//           ? "01.234.567.8-091.000"
//           : "-",

//       PPH: {
//         is_calculated: i % 2 === 0,
//         percent: 2,
//         nominal: pph,
//       },

//       JUMLAH_DIBAYARKAN:
//         dpp + ppn - pph,

//       NOMOR_KASBON_SAP:
//         i % 2 === 0
//           ? `KSB-2026-${1000 + i}`
//           : "-",

//       // ==========================
//       // CONDITIONAL PPN DATA
//       // ==========================
//       NOMOR_FAKTUR_PAJAK:
//         nomorFakturPajak,

//       NAMA_VENDOR:
//         namaVendor,

//       NOMOR_INVOICE:
//         nomorInvoice,

//       NOMOR_VOUCHER_SAP:
//         i % 2 === 0
//           ? `SAP-2026-${1000 + i}`
//           : "-",

//       STATUS: [
//         "Selesai",
//         "Diajukan",
//         "Approval",
//         "Verifikasi",
//         "Rejected",
//       ][i % 4],
//     };

//   }),
// };

// ==========================
// STATUS STYLE
// ==========================
const statusBadge = (status) => {
  switch (status) {
    case "S1":
      return "bg-gradient-to-r from-green-500 to-emerald-600 ring-green-200";

    case "S2":
      return "bg-gradient-to-r from-green-500 to-emerald-600 ring-green-200";

    case "T":
      return "bg-gradient-to-r from-red-500 to-rose-600 ring-red-200";

    case "P":
      return "bg-gradient-to-r from-yellow-400 to-orange-500 ring-yellow-200";

    default:
      return "bg-gradient-to-r from-blue-500 to-indigo-600 ring-blue-200";
  }
};

const TableListPengajuan = ({ dimensionScreenW, check, loginAccess }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const { toggleModal } = useSelector((state) => state.global)
  const isApprovalPengajuan =
    (location?.state?.menu?.submenu?.name ===
      "Approval Pengajuan" || location?.state?.project === 'Approval Pengajuan');

  const [allData, setAllData] = useState([]);
  // const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState("ASC");
  const [selectedCard, setSelectedCard] = useState("ALL");
  const [summaryData, setSummaryData] = useState()
  const [expandedRow, setExpandedRow] = useState(null);
  const [filterCabang, setFilterCabang] = useState([])
  const [dataFilterOmset, setDataFilterOmset] = useState({
    // cabang: null,
    periode: '',
  })

  const headerTable = [
    { label: "Aksi", icon: <FaEllipsisV /> },

    ...(isApprovalPengajuan
      ? [
        ...(!['RL10', 'RL11'].includes(loginAccess?.role_id) ? [
          {
            label: "Status Verifikasi",
            icon: <RiVerifiedBadgeLine />,
          }
        ] : [])
        ,
        {
          label: "Status Pengajuan",
          icon: <FaInfoCircle />,
        },
        {
          label: "No Pengajuan",
          icon: <FaFileAlt />,
        },
        {
          label: "Jenis Pengajuan",
          icon: <FaTags />,
        },
        {
          label: "Tanggal Pengajuan",
          icon: <FaCalendarAlt />,
        },
        {
          label: "Nama Pemohon",
          icon: <FaUser />,
        },
        {
          label: "Profit Center",
          icon: <FaBuilding />,
        },
        {
          label: "Jenis Biaya",
          icon: <FaTags />,
        },
        {
          label: "Nominal DPP",
          icon: <FaMoneyBillWave />,
        },
        {
          label: "PPN",
          icon: <FaPercent />,
        },
        {
          label: "PPh",
          icon: <FaPercent />,
        },
        {
          label: "Jumlah Di Bayarkan",
          icon: <FaMoneyBillWave />,
        },
        {
          label: "Nama Vendor",
          icon: <FaBuilding />,
        },
        {
          label: "Keterangan",
          icon: <FaCommentAlt />,
        },
      ]
      : [
        { label: "Status Pengajuan", icon: <FaInfoCircle /> },
        { label: "No Pengajuan", icon: <FaFileAlt /> },
        { label: "Jenis Pengajuan", icon: <FaTags /> },
        { label: "Tanggal", icon: <FaCalendarAlt /> },
        { label: "Nama Pemohon", icon: <FaUser /> },
        { label: "Jabatan", icon: <FaBriefcase /> },
        { label: "Profit Center", icon: <FaBuilding /> },
        { label: "Jenis Biaya", icon: <FaTags /> },
        // { label: "Account Desc", icon: <FaRegFileAlt /> },
        { label: "Nominal DPP", icon: <FaMoneyBillWave /> },
        { label: "Status PPN", icon: <FaPercent /> },
        { label: "PPN", icon: <FaPercent /> },
        { label: "Status PKP", icon: <FaPercent /> },
        { label: "NPWP", icon: <FaRegFileAlt /> },
        { label: "Perhitungan PPh", icon: <FaPercent /> },
        { label: "Nilai PPh", icon: <FaMoneyBillWave /> },
        { label: "Jumlah Dibayarkan", icon: <FaMoneyBillWave /> },
        { label: "No Kasbon SAP", icon: <HiOutlineTicket /> },
        { label: "No Faktur Pajak", icon: <HiOutlineTicket /> },
        { label: "Nama Vendor", icon: <FaBuilding /> },
        { label: "No Invoice", icon: <HiOutlineTicket /> },
        { label: "Voucher SAP", icon: <HiOutlineTicket /> },
        {
          label: "Keterangan",
          icon: <FaCommentAlt />,
        },
      ]),
  ];

  const getSummaryPengajuan = async () => {
    try {
      const response = await storeSchema.actions.getSummaryPengajuan();
      if (response.status === true) {
        setSummaryData(response?.data);
      }
    } catch (error) {
      console.error("Error fetching pengajuan data:", error);
      swal.error("Gagal mengambil data pengajuan");
    }
  };

  const getListPengajuan = async () => {
    try {
      setAllData([])
      setLoading(true);
      const response = await storeSchema.actions.getListPengajuan({
        page: currentPage,
        limit: perPage,
        status: selectedCard,
        keyword: location?.state?.no_pengajuan ? location?.state?.no_pengajuan : keyword,
        pengajuan_id: "",
        sortBy: sortBy,
        filter: {
          cabang: filterCabang,
          periode: dataFilterOmset?.periode
        }
      });

      if (response.status === true) {
        delete location?.state?.no_pengajuan
        setAllData(response?.data?.list_data);
        setTotalData(response?.data?.total_data || 0);
        setTotalPage(response?.data?.total_halaman || 0);
      }
    } catch (error) {
      console.error("Error fetching pengajuan data:", error);
      swal.error("Gagal mengambil data pengajuan");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // HANDLE PAGINATION DATA
  // ==========================
  useEffect(() => {

    // const offset = (currentPage - 1) * perPage;

    // const currentData = allData.slice(
    //   offset,
    //   offset + perPage
    // );

    // setTableData(currentData);

    // setTotalPage(
    //   Math.ceil(allData.length / perPage)
    // );
    getListPengajuan();
    // eslint-disable-next-line
  }, [currentPage, perPage, sortBy, selectedCard]);

  // ==========================
  // PAGINATION
  // ==========================
  const changePage = (e) => {
    const newPage = e.selected + 1;
    setCurrentPage(newPage);
  };

  const handleFilterData = async () => {
    // await getListCoaDetailDashboard(filter)
    dispatch(
      setToggleModal({
        isOpen: !toggleModal.isOpen,
        modal: "ModalFilter"
      })
    );
  }

  const handleTerapkanFilterOmset = async () => {
    if (!dataFilterOmset?.cabang || !dataFilterOmset?.periode) {
      swal.warning('Mohon Lengkapi Isian Data !')
      return
    } else {
      setCurrentPage(1)
      await getListPengajuan()
    }
  }

  const resetFilterOmset = (e) => {
    e.preventDefault()
    setFilterCabang([])
    setCurrentPage(1)
    setDataFilterOmset({
      // cabang: [],
      periode: ''
    })
  }

  const ChangePerPage = (e) => {
    const newPerPage = parseInt(e.target.value);
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const startIndex =
    allData?.length > 0
      ? (currentPage - 1) * perPage + 1
      : 0;

  const endIndex = Math.min(
    currentPage * perPage,
    totalData
  );

  const handleSearch = async (e) => {
    setCurrentPage(1)
    e.preventDefault();
    getListPengajuan();
  };

  const handleFilter = (status) => {
    setCurrentPage(1)
    setSelectedCard(status);
    getSummaryPengajuan();
  }

  const cards = [
    {
      title: "Total Pengajuan",
      value: summaryData?.total_pengajuan,
      description: "Semua pengajuan",
      icon: FaClipboardList,
      bgIcon: FaClipboardList,
      color: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        icon: "text-blue-500",
        bgIcon: "text-blue-200",
      },
      onClick: () => handleFilter("ALL"),
      key: "ALL"
    },
    {
      title: "Pending Verifikasi",
      value: summaryData?.pending_verifikasi,
      description: "Belum diverifikasi",
      icon: FaClock,
      bgIcon: FaClock,
      color: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        icon: "text-amber-500",
        bgIcon: "text-amber-200",
      },
      onClick: () => handleFilter("PENDING_VERIFIKASI"),
      key: "PENDING_VERIFIKASI"
    },
    {
      title: "Sudah Diverifikasi",
      value: summaryData?.sudah_verifikasi,
      description: "Menunggu approval",
      icon: FaShieldAlt,
      bgIcon: FaShieldAlt,
      color: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        icon: "text-purple-500",
        bgIcon: "text-purple-200",
      },
      onClick: () => handleFilter("VERIFIED"),
      key: "VERIFIED"
    },
    {
      title: "Sudah Di-approve",
      value: summaryData?.sudah_approve,
      description: "Pengajuan disetujui",
      icon: FaCheckCircle,
      bgIcon: FaCheckCircle,
      color: {
        bg: "bg-green-50",
        text: "text-green-700",
        icon: "text-green-500",
        bgIcon: "text-green-200",
      },
      onClick: () => handleFilter("APPROVED"),
      key: "APPROVED"
    },
    {
      title: "Ditolak",
      value: summaryData?.ditolak,
      description: "Pengajuan ditolak",
      icon: FaTimesCircle,
      bgIcon: FaTimesCircle,
      color: {
        bg: "bg-red-50",
        text: "text-red-700",
        icon: "text-red-500",
        bgIcon: "text-red-200",
      },
      onClick: () => handleFilter("REJECT"),
      key: "REJECT"
    },
    ...(['RL10', 'RL11', 'RL13'].includes(loginAccess?.role_id) ? [{
      title: "Semua Pengajuan",
      // value: summaryData?.total_pengajuan,
      description: "List Data Semua Pengajuan",
      icon: FaClipboardList,
      bgIcon: FaClipboardList,
      color: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        icon: "text-blue-500",
        bgIcon: "text-blue-200",
      },
      onClick: () => handleFilter("ALL2"),
      key: "ALL2"
    }] : [])
  ];

  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: "bg-blue-100 text-blue-600",
      border: "hover:border-blue-300",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      icon: "bg-amber-100 text-amber-600",
      border: "hover:border-amber-300",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      icon: "bg-purple-100 text-purple-600",
      border: "hover:border-purple-300",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-700",
      icon: "bg-green-100 text-green-600",
      border: "hover:border-green-300",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-700",
      icon: "bg-red-100 text-red-600",
      border: "hover:border-red-300",
    },
  };

  useEffect(() => {
    getSummaryPengajuan()
  }, [])

  useEffect(() => {
    if (location?.state?.no_pengajuan) {
      getListPengajuan()
    }
  }, [location?.state?.no_pengajuan])

  const [iframeLoading, setIframeLoading] = useState(false);

  useEffect(() => {
    if (filterCabang?.length === 0 && !dataFilterOmset?.periode) {
      getListPengajuan();
    }
    // eslint-disable-next-line
  }, [filterCabang, dataFilterOmset]);

  return (
    <>
      <ModalView loginAccess={loginAccess} />
      <ModalApprove loginAccess={loginAccess} getListPengajuan={getListPengajuan} getSummaryPengajuan={getSummaryPengajuan} />
      <ModalVerifikasi loginAccess={loginAccess} getListPengajuan={getListPengajuan} getSummaryPengajuan={getSummaryPengajuan} />
      <ModalDownload iframeLoading={iframeLoading} setIframeLoading={setIframeLoading} />
      <ModalFilter filterCabang={filterCabang} setFilterCabang={setFilterCabang} setDataFilterOmset={setDataFilterOmset} dataFilterOmset={dataFilterOmset} handleTerapkanFilter={handleTerapkanFilterOmset} resetFilterOmset={resetFilterOmset} loginAccess={loginAccess} />
      {isApprovalPengajuan && (
        <div className="flex gap-4 overflow-x-auto px-2 pt-2 pb-4 mb-5">
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
                    : `
                      border
                      border-gray-100
                      shadow-sm
                      hover:shadow-lg
                      hover:-translate-y-1
                    `
                  }
                w-fit
                h-[73px]
                min-w-fit
                flex-shrink-0
              `}
              >
                {/* Background Icon */}
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

                {/* Content */}
                <div className="relative z-10 flex flex-row gap-4">
                  {item?.key !== 'ALL2' && (
                    <div
                      className="
                    w-fit
                    min-w-12
                    px-2
                    h-12
                    rounded-xl
                    bg-white
                    shadow
                    flex
                    items-center
                    justify-center
                  "
                    >
                      <div
                        className={`
                        text-xl
                        font-semibold 
                        ${item.color.icon}
                      `}
                      >
                        {item.value}
                      </div>
                    </div>
                  )}

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
      )}
      <div className='flex flex-col gap-5'>
        <div className='flex lg:flex-row flex-col gap-5'>
          <form onSubmit={handleSearch} className='input input-sm input-bordered flex items-center gap-2 bg-transparent rounded-[25px]'>
            <input
              type="text"
              placeholder='Search...'
              className='grow'
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
            <IoSearch onClick={handleSearch} className='cursor-pointer' />
          </form>
          <div className="flex flex-col gap-5 lg:justify-end sm:w-full sm:flex-row sm:items-center">

            <div className="flex gap-3 justify-between">

              <div className="btn btn-sm bg-white rounded-[25px]" onClick={() => {
                getSummaryPengajuan();
                getListPengajuan();
              }}>

                <FaSyncAlt />

                Reload Data

              </div>

              <div className="flex items-center gap-3">
                <button className="btn btn-sm py-2 rounded-full items-center gap-2 bg-blue-900 text-white font-semibold"
                  onClick={handleFilterData}
                >
                  <FaFilter />
                  Filter
                </button>
              </div>

              <div className="flex items-center">

                <span className="mr-2 text-sm font-light">
                  Sort by:
                </span>

                <div className="dropdown dropdown-hover dropdown-end z-20">

                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-sm rounded-[25px] bg-white"
                  >
                    {sortBy}
                    <IoIosArrowDown />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-28"
                  >
                    <li onClick={() => setSortBy('ASC')}><div>ASC</div></li>
                    <li onClick={() => setSortBy('DESC')}><div>DESC</div></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-300">

            {/* TABLE */}
            <div className="relative">
              {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
                  <div className="flex flex-col items-center gap-3">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <span className="text-sm text-gray-600">
                      Memuat data...
                    </span>
                  </div>
                </div>
              )}
              <div className={`overflow-auto rounded-2xl max-h-[72vh] transition ${dropdownOpen ? 'pb-24' : ''}`}>

                <table className="table w-full">

                  {/* HEADER */}
                  <thead className="bg-blue-900 text-white sticky top-0 text-[14px] z-10">

                    <tr>

                      {headerTable.map((h, i) => (

                        <th
                          key={i}
                          className="px-4 py-3 whitespace-nowrap"
                        >

                          <div className="flex items-center gap-2 font-semibold">

                            <span className="text-[15px]">
                              {h.icon}
                            </span>

                            {h.label}

                          </div>

                        </th>

                      ))}

                    </tr>

                  </thead>

                  {/* BODY */}
                  <tbody className="bg-white">

                    {allData.length === 0 ? (
                      <tr>
                        <td
                          colSpan={headerTable.length}
                          className="text-center py-10 text-gray-500"
                        >
                          Tidak ada data
                        </td>
                      </tr>
                    ) : (
                      <>
                        {allData?.map((v, i) => {
                          const isExpanded = expandedRow === v.pengajuan_id;
                          return (
                            <React.Fragment key={v.pengajuan_id}>
                              <tr
                                key={i}
                                className="hover:bg-sky-50 transition duration-200 border-b"
                              >

                                {/* AKSI */}
                                <td className="px-4 py-3 align-middle">
                                  <div className="flex flex-row gap-1">
                                    <ActionButton location={location} navigation={navigation} loginAccess={loginAccess} isApprovalPengajuan={isApprovalPengajuan} setDropdownOpen={setDropdownOpen} dispatch={dispatch} v={v} iframeLoading={iframeLoading} setIframeLoading={setIframeLoading} getListPengajuan={getListPengajuan} parent={true} />
                                    {v?.child && v?.child.length > 0 && (
                                      <button
                                        className="btn btn-sm btn-circle bg-sky-600 border-none hover:bg-sky-700 text-white"
                                        onClick={() =>
                                          setExpandedRow(isExpanded ? null : v.pengajuan_id)
                                        }
                                      >
                                        <IoIosArrowDown
                                          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''
                                            }`}
                                        />
                                      </button>
                                    )}
                                  </div>
                                </td>

                                {/* ========================= */}
                                {/* KHUSUS APPROVAL */}
                                {/* ========================= */}
                                {isApprovalPengajuan ? (
                                  <>

                                    {/* STATUS VERIFIKASI */}
                                    {!['RL10', 'RL11'].includes(loginAccess?.role_id) && (
                                      <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="flex flex-col gap-1">
                                          {['Y', 'VR'].includes(v?.status_verifikasi) && (
                                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200">

                                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>

                                              Verified

                                            </span>
                                          )}
                                          {['T', 'UR'].includes(v?.status_verifikasi) && (
                                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold border border-red-200">

                                              <span className="w-2 h-2 rounded-full bg-red-500"></span>

                                              Unverified

                                            </span>
                                          )}
                                          {(v?.status_verifikasi === null || v?.status_verifikasi === "") && (
                                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200">

                                              Belum Verifikasi

                                            </span>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                    {/* STATUS */}
                                    <td className="px-4 py-3 whitespace-nowrap flex flex-col gap-2">
                                      <div className="flex flex-row gap-3">
                                        <span
                                          className={`
                                            inline-flex items-center gap-2
                                            px-3 py-1
                                            rounded-full
                                            text-xs font-semibold 
                                            ring-2
                                            shadow-sm 
                                            w-fit
                                            hover:scale-110 transition
                                          `}
                                        >
                                          <FaBuilding /> {v?.status_unit_kerja ?? v?.status_unit}
                                        </span>
                                        <span
                                          className={`
                                            inline-flex items-center gap-2
                                            px-3 py-1
                                            rounded-full
                                            text-xs font-semibold 
                                            ring-2
                                            shadow-sm 
                                            w-fit
                                            hover:scale-110 transition
                                          `}
                                        >
                                          <FaUserCheck /> {v?.status_ur_jenis_user_id}
                                        </span>
                                      </div>
                                      <span
                                        className={`
                                    inline-flex items-center gap-2
                                    px-3 py-1
                                    rounded-full
                                    text-xs font-semibold text-white
                                    ring-2
                                    shadow-sm 
                                    w-fit
                                    ${statusBadge(v?.kd_status ?? null)}
                                    hover:scale-110 transition
                                  `}
                                      >
                                        <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
                                        {v?.status_kegiatan}
                                        <span className="
                                  inline-flex items-center gap-2
                                    px-3 py-1
                                    rounded-full
                                    text-xs font-semibold 
                                    bg-white
                                    text-black
                                  ">
                                          {v?.status_pengajuan ?? "Proses"}
                                        </span>
                                      </span>
                                    </td>

                                    {/* NO PENGAJUAN */}
                                    <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                      {v?.no_pengajuan ?? "-"}
                                    </td>
                                    {/* Jenis PENGAJUAN */}
                                    <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                      <div className="flex flex-col gap-1">
                                        <span className="flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-emerald-200">
                                          {v?.pembetulan_ke === 0 ? (
                                            <>
                                              <span className={`w-2 h-2 rounded-full bg-blue-500 animate-pulse`}>
                                              </span>
                                              Pengajuan Baru
                                            </>
                                          ) : (
                                            <>
                                              <span className={`w-2 h-2 rounded-full bg-yellow-500 animate-pulse`}>
                                              </span>
                                              Pembetulan Ke-{v?.pembetulan_ke}
                                            </>
                                          )}
                                        </span>
                                      </div>
                                    </td>

                                    {/* TANGGAL */}
                                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                      {v?.created_at ? formatDate(v?.created_at) : "-"}
                                    </td>

                                    {/* NAMA */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.nama_pemohon ?? "-"}
                                    </td>

                                    {/* PROFIT CENTER */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.cabang ?? "-"}
                                    </td>

                                    {/* JENIS BIAYA */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.jenis_biaya ?? "-"}
                                      {['KC03', 'KC06'].includes(v?.jenis_biaya_id) && v?.no_memo && (
                                        <div className="flex flex-col gap-1">
                                          <span className="flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-emerald-200">
                                            {v?.no_memo}
                                          </span>
                                        </div>
                                      )}
                                    </td>

                                    {/* DPP */}
                                    <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                                      {formatCurrency(v?.nominal_dpp ?? 0)}
                                    </td>

                                    {/* PPN */}
                                    <td className="px-4 py-3 whitespace-nowrap">

                                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-semibold border border-pink-200">

                                        {v?.ppn ?? 0}%

                                        <span className="text-gray-400">
                                          (
                                          {formatCurrency(v?.nominal_ppn ?? 0)}
                                          )
                                        </span>

                                      </span>

                                    </td>

                                    {/* PPH */}
                                    <td className="px-4 py-3 whitespace-nowrap">

                                      {v?.nominal_pph ? (
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200">

                                          {v?.pph ?? 0}%

                                          <span className="text-gray-400">
                                            (
                                            {formatCurrency(v?.nominal_pph ?? 0)}
                                            )
                                          </span>

                                        </span>
                                      ) : (
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs">
                                          Belum Ada
                                        </span>
                                      )}

                                    </td>

                                    {/* JUMLAH DIBAYARKAN */}
                                    <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                                      {formatCurrency(v?.total_dibayarkan ?? 0)}
                                    </td>

                                    {/* NAMA VENDOR */}
                                    <td className="px-4 py-3 whitespace-nowrap font-medium">
                                      {v?.nama_vendor ?? "-"}
                                    </td>

                                    {/* KETERANGAN */}
                                    <td className="px-4 py-3 whitespace-nowrap font-medium">
                                      {v?.keterangan ?? "-"}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    {/* STATUS */}
                                    <td className="px-4 py-3 whitespace-nowrap flex flex-col gap-2">
                                      <span
                                        className={`
                                    inline-flex items-center gap-2
                                    px-3 py-1
                                    rounded-full
                                    text-xs font-semibold 
                                    ring-2
                                    shadow-sm 
                                    w-fit
                                    hover:scale-110 transition
                                  `}
                                      >
                                        <FaBuilding /> {v?.status_unit_kerja ?? v?.status_unit}
                                      </span>
                                      <span
                                        className={`
                                    inline-flex items-center gap-2
                                    px-3 py-1
                                    rounded-full
                                    text-xs font-semibold text-white
                                    ring-2
                                    shadow-sm 
                                    w-fit
                                    ${statusBadge(v?.kd_status ?? null)}
                                    hover:scale-110 transition
                                  `}
                                      >
                                        <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
                                        {v?.status_kegiatan}
                                        <span className="
                                  inline-flex items-center gap-2
                                    px-3 py-1
                                    rounded-full
                                    text-xs font-semibold 
                                    bg-white
                                    text-black
                                  ">
                                          {v?.status_pengajuan ?? "Proses"}
                                        </span>
                                      </span>
                                    </td>

                                    {/* NO PENGAJUAN */}
                                    <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                      {v?.no_pengajuan ?? "-"}
                                    </td>

                                    {/* Jenis PENGAJUAN */}
                                    <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                      <div className="flex flex-col gap-1">
                                        <span className="flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-emerald-200">
                                          {v?.pembetulan_ke === 0 ? (
                                            <>
                                              <span className={`w-2 h-2 rounded-full bg-blue-500 animate-pulse`}>
                                              </span>
                                              Pengajuan Baru
                                            </>
                                          ) : (
                                            <>
                                              <span className={`w-2 h-2 rounded-full bg-yellow-500 animate-pulse`}>
                                              </span>
                                              Pembetulan Ke-{v?.pembetulan_ke}
                                            </>
                                          )}
                                        </span>
                                      </div>
                                    </td>

                                    {/* TANGGAL */}
                                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                      {v?.created_at ? formatDate(v?.created_at) : "-"}
                                    </td>

                                    {/* NAMA */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.nama_pemohon ?? "-"}
                                    </td>

                                    {/* JABATAN */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.jabatan ?? "-"}
                                    </td>

                                    {/* CABANG */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.cabang ?? "-"}
                                    </td>

                                    {/* JENIS BIAYA */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.jenis_biaya ?? "-"}
                                      {['KC03', 'KC06'].includes(v?.jenis_biaya_id) && v?.no_memo && (
                                        <div className="flex flex-col gap-1">
                                          <span className="flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-emerald-200">
                                            {v?.no_memo}
                                          </span>
                                        </div>
                                      )}
                                    </td>

                                    {/* ACCOUNT DESC */}
                                    {/* <td className="px-4 py-3 whitespace-nowrap">
                            {v?.account_description ?? "-"}
                          </td> */}

                                    {/* DPP */}
                                    <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                                      {formatCurrency(v?.nominal_dpp ?? 0)}
                                    </td>

                                    {/* STATUS PPN */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      <span
                                        className={`
      px-3 py-1 rounded-full text-xs font-semibold
      ${v?.tipe_ppn === "include"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-gray-100 text-gray-700"}
    `}
                                      >
                                        {v?.tipe_ppn ? v?.tipe_ppn === 'include' ? 'Include' : 'Exclude' : "-"}
                                      </span>
                                    </td>

                                    {/* PPN */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-semibold border border-pink-200">
                                        {v?.ppn ?? 0}%
                                        <span className="text-gray-400">
                                          ({formatCurrency(v?.nominal_ppn ?? 0)})
                                        </span>
                                      </span>
                                    </td>

                                    {/* STATUS PKP */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      <span
                                        className={`
      px-3 py-1 rounded-full text-xs font-semibold
      ${v?.status_pkp === "Y"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-orange-100 text-orange-700"}
    `}
                                      >
                                        {v?.status_pkp === 'Y' ? 'Pkp' : v?.status_pkp === 'T' ? "Non Pkp" : '-'}
                                      </span>
                                    </td>

                                    {/* NPWP */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.npwp_nik ?? "-"}
                                    </td>

                                    {/* PERHITUNGAN PPH */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.nominal_pph ? (
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200">
                                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                          Sudah Dihitung
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold border border-red-200">
                                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                          Belum Dihitung
                                        </span>
                                      )}
                                    </td>

                                    {/* NILAI PPH */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.nominal_pph ? (
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200">
                                          {v?.pph ?? 0}%
                                          <span className="text-gray-400">
                                            ({formatCurrency(v?.nominal_pph ?? 0)})
                                          </span>
                                        </span>
                                      ) : (
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs">
                                          Belum Ada
                                        </span>
                                      )}
                                    </td>

                                    {/* NILAI DIBAYARKAN */}
                                    <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                                      {formatCurrency(v?.total_dibayarkan ?? 0)}
                                    </td>

                                    {/* KASBON SAP */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.no_kasbon_sap ?? "-"}
                                    </td>

                                    {/* FAKTUR */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.no_faktur_pajak ?? "-"}
                                    </td>

                                    {/* NAMA VENDOR */}
                                    <td className="px-4 py-3 whitespace-nowrap font-medium">
                                      {v?.nama_vendor ?? "-"}
                                    </td>

                                    {/* INVOICE */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.no_invoice ?? "-"}
                                    </td>

                                    {/* VOUCHER SAP */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.no_voucher_sap ? (
                                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                          {v?.no_voucher_sap}
                                        </span>
                                      ) : (
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs">
                                          Belum Input
                                        </span>
                                      )}
                                    </td>

                                    {/* KETERANGAN */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                      {v?.keterangan ?? "-"}
                                    </td>
                                  </>
                                )}

                              </tr>
                              {
                                isExpanded && (
                                  <tr className="bg-slate-100">
                                    <td
                                      colSpan={headerTable.length}
                                      className="border border-gray-200 p-4"
                                    >
                                      <div className={`rounded-xl overflow-hidden border border-slate-200 ${dropdownOpen ? 'pb-32' : ''}`}>

                                        <table className="table table-xs w-full">
                                          <thead>
                                            <tr className="bg-slate-200 text-slate-700">
                                              {headerTable?.filter(a => a.label !== 'Status Verifikasi')?.map((h, i) => (

                                                <th
                                                  key={i}
                                                  className="px-4 py-3 whitespace-nowrap"
                                                >

                                                  <div className="flex items-center gap-2 font-semibold">

                                                    <span className="text-[15px]">
                                                      {h.icon}
                                                    </span>

                                                    {h.label}

                                                  </div>

                                                </th>

                                              ))}
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {v?.child?.length > 0 && (
                                              v?.child?.map((d, idx) => (
                                                <tr
                                                  key={idx}
                                                  className="hover:bg-sky-50 transition duration-200 border-b"
                                                >

                                                  {isApprovalPengajuan ? (
                                                    <>
                                                      <td className="px-4 py-3 align-middle">
                                                        <div className="flex flex-row gap-1">
                                                          <ActionButtonChild location={location} navigation={navigation} loginAccess={loginAccess} isApprovalPengajuan={isApprovalPengajuan} setDropdownOpen={setDropdownOpen} dispatch={dispatch} v={d} iframeLoading={iframeLoading} setIframeLoading={setIframeLoading} getListPengajuan={getListPengajuan} parent={false} />
                                                        </div>
                                                      </td>
                                                      {/* STATUS VERIFIKASI */}
                                                      {/* {!['RL10', 'RL11'].includes(loginAccess?.role_id) && (
                                                        <td className="px-4 py-3 whitespace-nowrap">

                                                          {d?.status_verifikasi === "Y" && (
                                                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200">

                                                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>

                                                              Verified

                                                            </span>
                                                          )}
                                                          {d?.status_verifikasi === 'T' && (
                                                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold border border-red-200">

                                                              <span className="w-2 h-2 rounded-full bg-red-500"></span>

                                                              Unverified

                                                            </span>
                                                          )}
                                                          {d?.status_verifikasi === null && (
                                                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200">

                                                              Belum Verifikasi

                                                            </span>
                                                          )}

                                                        </td>
                                                      )} */}
                                                      {/* STATUS */}
                                                      <td className="px-4 py-3 whitespace-nowrap flex flex-col gap-2">
                                                        <span
                                                          className={`
                                    inline-flex items-center gap-2
                                    px-3 py-1
                                    rounded-full
                                    text-xs font-semibold 
                                    ring-2
                                    shadow-sm 
                                    w-fit
                                    hover:scale-110 transition
                                  `}
                                                        >
                                                          <FaBuilding /> {d?.status_unit_kerja ?? d?.status_unit}
                                                        </span>
                                                        <span
                                                          className={`
                                    inline-flex items-center gap-2
                                    px-3 py-1
                                    rounded-full
                                    text-xs font-semibold text-white
                                    ring-2
                                    shadow-sm 
                                    w-fit
                                    ${statusBadge(d?.kd_status ?? null)}
                                    hover:scale-110 transition
                                  `}
                                                        >
                                                          <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
                                                          {d?.status_kegiatan}
                                                          <span className="
                                  inline-flex items-center gap-2
                                    px-3 py-1
                                    rounded-full
                                    text-xs font-semibold 
                                    bg-white
                                    text-black
                                  ">
                                                            {d?.status_pengajuan ?? "Proses"}
                                                          </span>
                                                        </span>
                                                      </td>

                                                      {/* NO PENGAJUAN */}
                                                      <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                                        {d?.no_pengajuan ?? "-"}
                                                      </td>
                                                      <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                                        <div className="flex flex-col gap-1">
                                                          <span className="flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-emerald-200">
                                                            {d?.pembetulan_ke === 0 ? (
                                                              <>
                                                                <span className={`w-2 h-2 rounded-full bg-blue-500 animate-pulse`}>
                                                                </span>
                                                                Pengajuan Baru
                                                              </>
                                                            ) : (
                                                              <>
                                                                <span className={`w-2 h-2 rounded-full bg-yellow-500 animate-pulse`}>
                                                                </span>
                                                                Pembetulan Ke-{d?.pembetulan_ke}
                                                              </>
                                                            )}
                                                          </span>
                                                        </div>
                                                      </td>
                                                      {/* TANGGAL */}
                                                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                                        {d?.created_at ? formatDate(d?.created_at) : "-"}
                                                      </td>

                                                      {/* NAMA */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        {d?.nama_pemohon ?? "-"}
                                                      </td>

                                                      {/* PROFIT CENTER */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        {d?.cabang ?? "-"}
                                                      </td>

                                                      {/* JENIS BIAYA */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        {d?.jenis_biaya ?? "-"}
                                                      </td>

                                                      {/* DPP */}
                                                      <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                                                        {formatCurrency(d?.nominal_dpp ?? 0)}
                                                      </td>

                                                      {/* PPN */}
                                                      <td className="px-4 py-3 whitespace-nowrap">

                                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-semibold border border-pink-200">

                                                          {d?.ppn ?? 0}%

                                                          <span className="text-gray-400">
                                                            (
                                                            {formatCurrency(d?.nominal_ppn ?? 0)}
                                                            )
                                                          </span>

                                                        </span>

                                                      </td>

                                                      {/* PPH */}
                                                      <td className="px-4 py-3 whitespace-nowrap">

                                                        {d?.nominal_pph ? (
                                                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200">

                                                            {d?.pph ?? 0}%

                                                            <span className="text-gray-400">
                                                              (
                                                              {formatCurrency(d?.nominal_pph ?? 0)}
                                                              )
                                                            </span>

                                                          </span>
                                                        ) : (
                                                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs">
                                                            Belum Ada
                                                          </span>
                                                        )}

                                                      </td>

                                                      {/* JUMLAH DIBAYARKAN */}
                                                      <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                                                        {formatCurrency(d?.total_dibayarkan ?? 0)}
                                                      </td>

                                                      {/* NAMA VENDOR */}
                                                      <td className="px-4 py-3 whitespace-nowrap font-medium">
                                                        {d?.nama_vendor ?? "-"}
                                                      </td>
                                                      {/* KETERANGAN */}
                                                      <td className="px-4 py-3 whitespace-nowrap font-medium">
                                                        {d?.keterangan ?? "-"}
                                                      </td>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <td className="px-4 py-3 align-middle">
                                                        <div className="flex flex-row gap-1">
                                                          <ActionButtonChild location={location} navigation={navigation} loginAccess={loginAccess} isApprovalPengajuan={isApprovalPengajuan} setDropdownOpen={setDropdownOpen} dispatch={dispatch} v={d} iframeLoading={iframeLoading} setIframeLoading={setIframeLoading} getListPengajuan={getListPengajuan} parent={false} />
                                                        </div>
                                                      </td>
                                                      {/* STATUS */}
                                                      <td className="px-4 py-3 whitespace-nowrap flex flex-col gap-2">
                                                        <span
                                                          className={`
                                    inline-flex items-center gap-2
                                    px-3 py-1
                                    rounded-full
                                    text-xs font-semibold 
                                    ring-2
                                    shadow-sm 
                                    w-fit
                                    hover:scale-110 transition
                                  `}
                                                        >
                                                          <FaBuilding /> {d?.status_unit_kerja ?? d?.status_unit}
                                                        </span>
                                                        <span
                                                          className={`
                                    inline-flex items-center gap-2
                                    px-3 py-1
                                    rounded-full
                                    text-xs font-semibold text-white
                                    ring-2
                                    shadow-sm 
                                    w-fit
                                    ${statusBadge(d?.kd_status ?? null)}
                                    hover:scale-110 transition
                                  `}
                                                        >
                                                          <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
                                                          {d?.status_kegiatan}
                                                          <span className="
                                                                          inline-flex items-center gap-2
                                                                            px-3 py-1
                                                                            rounded-full
                                                                            text-xs font-semibold 
                                                                            bg-white
                                                                            text-black
                                                                          ">
                                                            {d?.status_pengajuan ?? "Proses"}
                                                          </span>
                                                        </span>
                                                      </td>

                                                      {/* NO PENGAJUAN */}
                                                      <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                                        {d?.no_pengajuan ?? "-"}
                                                      </td>

                                                      <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                                        <div className="flex flex-col gap-1">
                                                          <span className="flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold border border-emerald-200">
                                                            {d?.pembetulan_ke === 0 ? (
                                                              <>
                                                                <span className={`w-2 h-2 rounded-full bg-blue-500 animate-pulse`}>
                                                                </span>
                                                                Pengajuan Baru
                                                              </>
                                                            ) : (
                                                              <>
                                                                <span className={`w-2 h-2 rounded-full bg-yellow-500 animate-pulse`}>
                                                                </span>
                                                                Pembetulan Ke-{d?.pembetulan_ke}
                                                              </>
                                                            )}
                                                          </span>
                                                        </div>
                                                      </td>

                                                      {/* TANGGAL */}
                                                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                                        {d?.created_at ? formatDate(v?.created_at) : "-"}
                                                      </td>

                                                      {/* NAMA */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        {d?.nama_pemohon ?? "-"}
                                                      </td>

                                                      {/* JABATAN */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        {d?.jabatan ?? "-"}
                                                      </td>

                                                      {/* CABANG */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        {d?.cabang ?? "-"}
                                                      </td>

                                                      {/* JENIS BIAYA */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        {d?.jenis_biaya ?? "-"}
                                                      </td>

                                                      {/* ACCOUNT DESC */}
                                                      {/* <td className="px-4 py-3 whitespace-nowrap">
                            {v?.account_description ?? "-"}
                          </td> */}

                                                      {/* DPP */}
                                                      <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                                                        {formatCurrency(d?.nominal_dpp ?? 0)}
                                                      </td>

                                                      {/* STATUS PPN */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        <span
                                                          className={`
      px-3 py-1 rounded-full text-xs font-semibold
      ${d?.tipe_ppn === "include"
                                                              ? "bg-blue-100 text-blue-700"
                                                              : "bg-gray-100 text-gray-700"}
    `}
                                                        >
                                                          {d?.tipe_ppn ? d?.tipe_ppn === 'include' ? 'Include' : 'Exclude' : "-"}
                                                        </span>
                                                      </td>

                                                      {/* PPN */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-semibold border border-pink-200">
                                                          {d?.ppn ?? 0}%
                                                          <span className="text-gray-400">
                                                            ({formatCurrency(d?.nominal_ppn ?? 0)})
                                                          </span>
                                                        </span>
                                                      </td>

                                                      {/* STATUS PKP */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        <span
                                                          className={`
      px-3 py-1 rounded-full text-xs font-semibold
      ${d?.status_pkp === "Y"
                                                              ? "bg-emerald-100 text-emerald-700"
                                                              : "bg-orange-100 text-orange-700"}
    `}
                                                        >
                                                          {d?.status_pkp === 'Y' ? 'Pkp' : d?.status_pkp === 'T' ? "Non Pkp" : '-'}
                                                        </span>
                                                      </td>

                                                      {/* NPWP */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        {d?.npwp_nik ?? "-"}
                                                      </td>

                                                      {/* PERHITUNGAN PPH */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        {d?.nominal_pph ? (
                                                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200">
                                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                                            Sudah Dihitung
                                                          </span>
                                                        ) : (
                                                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold border border-red-200">
                                                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                                            Belum Dihitung
                                                          </span>
                                                        )}
                                                      </td>

                                                      {/* NILAI PPH */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        {d?.nominal_pph ? (
                                                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200">
                                                            {d?.pph ?? 0}%
                                                            <span className="text-gray-400">
                                                              ({formatCurrency(d?.nominal_pph ?? 0)})
                                                            </span>
                                                          </span>
                                                        ) : (
                                                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs">
                                                            Belum Ada
                                                          </span>
                                                        )}
                                                      </td>

                                                      {/* NILAI DIBAYARKAN */}
                                                      <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                                                        {formatCurrency(d?.total_dibayarkan ?? 0)}
                                                      </td>

                                                      {/* KASBON SAP */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        {d?.no_kasbon_sap ?? "-"}
                                                      </td>

                                                      {/* FAKTUR */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        {d?.no_faktur_pajak ?? "-"}
                                                      </td>

                                                      {/* NAMA VENDOR */}
                                                      <td className="px-4 py-3 whitespace-nowrap font-medium">
                                                        {d?.nama_vendor ?? "-"}
                                                      </td>

                                                      {/* INVOICE */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        {d?.no_invoice ?? "-"}
                                                      </td>

                                                      {/* VOUCHER SAP */}
                                                      <td className="px-4 py-3 whitespace-nowrap">
                                                        {d?.no_voucher_sap ? (
                                                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                                            {d?.no_voucher_sap}
                                                          </span>
                                                        ) : (
                                                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs">
                                                            Belum Input
                                                          </span>
                                                        )}
                                                      </td>
                                                      {/* KETERANGAN */}
                                                      <td className="px-4 py-3 whitespace-nowrap font-medium">
                                                        {d?.keterangan ?? "-"}
                                                      </td>
                                                    </>
                                                  )}

                                                </tr>
                                              ))
                                            )}
                                          </tbody>
                                        </table>

                                      </div>
                                    </td>
                                  </tr>
                                )
                              }
                            </React.Fragment>
                          )
                        })}
                      </>
                    )}

                  </tbody>

                </table>

              </div>
            </div>

            {/* ================= FOOTER TABLE ================= */}
            <div className="border border-gray-100 shadow-xl bg-slate-50 py-4 mb-5 rounded-b-2xl lg:px-5 md:px-5 px-2">

              <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

                {/* LEFT */}
                <div className="flex flex-row items-center gap-3 justify-between flex-wrap">

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
                      Rows :
                    </span>

                    <select
                      className="select select-bordered select-sm bg-white rounded-full"
                      onChange={ChangePerPage}
                      value={perPage}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>

                  </div>

                </div>

                {/* RIGHT PAGINATION */}
                {totalPage > 0 && (
                  <div className="overflow-auto pb-2 justify-center flex">

                    <ReactPaginate
                      breakLabel={"..."}
                      previousLabel={"←"}
                      nextLabel={"→"}
                      pageCount={totalPage}
                      onPageChange={changePage}
                      forcePage={currentPage - 1}
                      className={"flex items-center gap-2"}

                      activeClassName={
                        "!bg-blue-900 !text-white !border-blue-900"
                      }

                      pageClassName={
                        "min-w-9 h-9 border border-gray-500 rounded-full flex items-center justify-center bg-white hover:bg-sky-50 transition-all"
                      }

                      pageLinkClassName={
                        "w-full h-full flex items-center justify-center px-3"
                      }

                      previousClassName={
                        "min-w-9 h-9 border border-gray-500 rounded-full bg-white hover:bg-sky-50 transition-all overflow-hidden"
                      }

                      nextClassName={
                        "min-w-9 h-9 border border-gray-500 rounded-full bg-white hover:bg-sky-50 transition-all overflow-hidden"
                      }

                      previousLinkClassName={
                        "w-full h-full flex items-center justify-center px-3"
                      }

                      nextLinkClassName={
                        "w-full h-full flex items-center justify-center px-3"
                      }

                      breakClassName={
                        "px-2 text-gray-500"
                      }

                      disabledClassName={
                        "opacity-50 cursor-not-allowed"
                      }
                    />

                  </div>
                )}

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TableListPengajuan;