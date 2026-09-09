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
} from "react-icons/fa";



import {
  HiOutlineTicket,
} from "react-icons/hi2";

import { formatDate, formatDateJam } from "global/helper/formatDate";
import { formatCurrency } from "global/helper/formatCurrency";
import { useDispatch } from "react-redux";
// import { getCookies } from "global/helper/cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { swal } from "global/helper/swal";
import storeSchema from "global/store";
import { IoFilterOutline, IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import ModalHitungPajak from "./Modal/ModalHitungPajak";
import ActionButton from "./ActionButton";

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

const TableListPerhitunganPajak = ({ dimensionScreenW, check, loginAccess }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const isApprovalPengajuan =
    location?.state?.menu?.submenu?.name ===
    "Approval Pengajuan";

  const [allData, setAllData] = useState([]);
  // const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Latest");
  const [selectedCard, setSelectedCard] = useState("ALL");
  const [summaryData, setSummaryData] = useState()
  const [expandedRow, setExpandedRow] = useState(null);

  const headerTable = [
    { label: "Aksi", icon: <FaEllipsisV /> },
    { label: "Status Pengajuan", icon: <FaInfoCircle /> },
    { label: "No. Pengajuan", icon: <FaFileAlt /> },
    { label: "Tanggal", icon: <FaCalendarAlt /> },
    { label: "Pemohon", icon: <FaUser /> },
    { label: "Cabang/Unit", icon: <FaBuilding /> },
    { label: "Jenis Biaya", icon: <FaTags /> },
    { label: "Jumlah", icon: <FaMoneyBillWave /> },
    { label: "Status Perhitungan", icon: <FaInfoCircle /> },
  ];

  const getListPengajuan = async () => {
    try {
      setLoading(true);
      const response = await storeSchema.actions.getListPengajuan({
        page: currentPage,
        limit: perPage,
        status: 'ALL',
        keyword: keyword,
        pengajuan_id: "",
        sortBy: sortBy === "Latest" ? "DESC" : "ASC",
      });

      if (response.status === true) {
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
    setAllData([])
    e.preventDefault();
    getListPengajuan();
  };

  const handleFilter = (status) => {
    setSelectedCard(status);
  }

  const [iframeLoading, setIframeLoading] = useState(false);

  return (
    <>
      <ModalHitungPajak getListPengajuan={getListPengajuan}/>
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

              <div className="btn btn-sm rounded-[25px]">

                <IoFilterOutline />

                Filter

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
                    <li onClick={() => setSortBy('Latest')}><div>Latest</div></li>
                    <li onClick={() => setSortBy('Oldest')}><div>Oldest</div></li>
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
                                    <ActionButton location={location} navigation={navigation} loginAccess={loginAccess} isApprovalPengajuan={isApprovalPengajuan} setDropdownOpen={setDropdownOpen} dispatch={dispatch} v={v} iframeLoading={iframeLoading} setIframeLoading={setIframeLoading} />
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
                                    <FaBuilding /> {v?.status_unit}
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

                                {/* TANGGAL */}
                                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                  {v?.created_at ? formatDateJam(v?.created_at) : "-"}
                                </td>

                                {/* NAMA */}
                                <td className="px-4 py-3 whitespace-nowrap">
                                  {v?.nama_pemohon ?? "-"}
                                </td>

                                {/* CABANG */}
                                <td className="px-4 py-3 whitespace-nowrap">
                                  {v?.cabang ?? "-"}
                                </td>
                                
                                {/* unit kerja */}
                                {/* <td className="px-4 py-3 whitespace-nowrap">
                                  {v?.unit_kerja ?? "-"}
                                </td> */}

                                {/* JABATAN */}
                                {/* <td className="px-4 py-3 whitespace-nowrap">
                                  {v?.jabatan ?? "-"}
                                </td> */}

                                {/* JENIS BIAYA */}
                                <td className="px-4 py-3 whitespace-nowrap">
                                  {v?.jenis_biaya ?? "-"}
                                </td>

                                {/* ACCOUNT DESC */}
                                {/* <td className="px-4 py-3 whitespace-nowrap">
                            {v?.account_description ?? "-"}
                          </td> */}

                                {/* DPP */}
                                <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                                  {formatCurrency(v?.nominal_dpp ?? 0)}
                                </td>
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
                              </tr>
                              {
                                isExpanded && (
                                  <tr className="bg-slate-50">
                                    <td
                                      colSpan={headerTable.length}
                                      className="border border-gray-200 p-4"
                                    >
                                      <div className="rounded-xl overflow-hidden border border-slate-200">

                                        <table className="table table-xs w-full">
                                          <thead>
                                            <tr className="bg-slate-200 text-slate-700">
                                              {headerTable?.filter(a => a.label !== 'Aksi')?.map((h, i) => (

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

                                                      {/* STATUS VERIFIKASI */}
                                                      {!['RL10', 'RL11'].includes(loginAccess?.role_id) && (
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
                                                      )}
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
                                                          <FaBuilding /> {d?.status_unit}
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
                                                          <FaBuilding /> {d?.status_unit}
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

export default TableListPerhitunganPajak;