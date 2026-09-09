import { swal } from "global/helper/swal";
import storeSchema from "global/store";
import React, { useEffect, useMemo, useState } from "react";
import {
  FaEllipsisV,
  FaUser,
  FaCalendarAlt,
  FaBuilding,
  FaEnvelope,
  FaInfoCircle,
  FaIdCard,
  FaUserShield,
  FaBriefcase,
  FaKey,
  FaUniversity,
  FaClipboardList,
  FaMoneyBillWave,
  FaHashtag,
  FaEye,
  FaStar,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";

import {
  HiOutlinePencilAlt,
  HiOutlineEye,
} from "react-icons/hi";

import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";
import { IoFilterOutline, IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

// =========================
// HELPER
// =========================
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

const statusBadge = (status) => {
  switch (status) {
    case "Y":
      return "bg-green-500";

    case "T":
      return "bg-red-500";

    default:
      return "bg-gray-400";
  }
};

const roleBadge = (role) => {
  switch (role) {
    case "Super Admin":
      return "bg-red-500";

    case "Pemohon":
      return "bg-blue-500";

    case "Atasan Pemohon":
      return "bg-purple-500";

    default:
      return "bg-cyan-500";
  }
};

// =========================
// COMPONENT
// =========================
const TableMasterApproval = ({ dimensionScreenW, check, loginAccess }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
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

  const headerTable = [
    { label: "Aksi", icon: <FaEllipsisV /> },
    { label: "Jenis Pengajuan", icon: <FaClipboardList /> },
    { label: "Jenis Biaya", icon: <FaMoneyBillWave /> },
    // { label: "Unit Kerja Pemohon", icon: <FaUserShield /> },
    { label: "Jabatan Pemohon", icon: <FaBriefcase /> },
    { label: "Approval", icon: <FaInfoCircle /> }
  ];
  const headerTableChild = [
    { label: "No Urut", icon: <FaHashtag /> },
    { label: "Unit Role", icon: <FaClipboardList /> },
    { label: "Sub Unit", icon: <FaBuilding /> },
    { label: "Jabatan", icon: <FaUserShield /> },
    { label: "Jenis User", icon: <FaCheckCircle /> },
    { label: "Kegiatan", icon: <FaBriefcase /> },
    // { label: "Diwajibkan Verifikasi", icon: <FaInfoCircle /> },
    { label: "View Only", icon: <FaEye /> },
    { label: "Aktif", icon: <FaStar /> }
  ];

  const getListMasterApproval = async () => {
    try {
      setAllData([])
      setLoading(true);

      const response = await storeSchema.actions.getListMasterApproval({
        page: currentPage,
        limit: perPage,
        keyword: keyword,
        sortBy: sortBy,
      });

      if (response.status === true) {
        setAllData(response?.data?.list_data || []);
        setTotalData(response?.data?.total_data || 0);
        setTotalPage(response?.data?.total_halaman || 0);
      }
    } catch (error) {
      console.error("Error fetching pengajuan data:", error);
      swal.error("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListMasterApproval();
    // eslint-disable-next-line
  }, [currentPage, perPage, sortBy]);

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
    e.preventDefault();
    getListMasterApproval();
  };

  // const handleFilter = (status) => {
  //   setSelectedCard(status);
  //   getSummaryPengajuan();
  // }

  const handleDelete = async (v) => {
    const confirm = await swal.confirmDelete();
    if (confirm === true) {
      const res = await storeSchema.actions.deleteMasterApproval(v);
      if (res?.status === true) {
        getListMasterApproval()
        swal.success('Data Berhasil Dihapus')
      } else {
        swal.error('Data Gagal Dihapus')
      }
    }
  }

  return (
    <>
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

              {/* <div className="btn btn-sm rounded-[25px]">

                <IoFilterOutline />

                Filter

              </div> */}

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
                    <li onClick={() => setSortBy('ASC')}><div>Asc</div></li>
                    <li onClick={() => setSortBy('DESC')}><div>Desc</div></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-300">

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
                          const isExpanded = expandedRow === i;
                          return (
                            <React.Fragment>
                              <tr
                                key={i}
                                className="hover:bg-sky-50 transition duration-200 border-b"
                              >

                                {/* AKSI */}
                                <td className="px-4 py-3 align-middle">
                                  <ActionButton location={location} navigation={navigation} loginAccess={loginAccess} setDropdownOpen={setDropdownOpen} dispatch={dispatch} v={v} />
                                </td>

                                {/* NIK */}
                                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-700">
                                  {v?.jenis_pengajuan}
                                </td>

                                {/* NAMA */}
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="font-semibold text-gray-800">
                                    {v?.jenis_biaya}
                                  </div>
                                </td>

                                {/* USERNAME */}
                                {/* <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center gap-2">

                                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                                      <FaBuilding className="text-blue-700 text-xs" />
                                    </div>

                                    <span className="font-medium text-blue-900">
                                      {v?.unit_kerja_pemohon}
                                    </span>

                                  </div>
                                </td> */}
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center gap-2">

                                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                                      <FaUserShield className="text-blue-700 text-xs" />
                                    </div>

                                    <span className="font-medium text-blue-900">
                                      {v?.jabatan_pemohon}
                                    </span>

                                  </div>
                                </td>
                                <td className="px-4 py-3 flex gap-3">
                                  <button
                                    className="btn btn-sm btn-circle bg-blue-900 border-none hover:bg-sky-700 text-white w-fit px-5"
                                    onClick={() =>
                                      setExpandedRow(isExpanded ? null : i)
                                    }
                                  > View
                                    <IoIosArrowDown
                                      className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''
                                        }`}
                                    />
                                  </button>
                                  <button
                                    className="btn btn-sm btn-circle bg-red-500 w-fit px-5 border-none hover:bg-red-600 text-white"
                                    onClick={() => handleDelete(v)}
                                  > Hapus
                                    <FaTrash />
                                  </button>
                                </td>
                              </tr>
                              {
                                isExpanded && (
                                  <tr className="bg-slate-50">
                                    <td
                                      colSpan={headerTable.length}
                                      className="border border-gray-200 p-4 bg-slate-200"
                                    >
                                      <div className="rounded-xl overflow-hidden border border-blue-900 bg-white">

                                        <table className="table table-xs w-full">
                                          <thead>
                                            <tr className="bg-slate-200 text-slate-700">
                                              {headerTableChild?.map((h, i) => (
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
                                            {v?.detail_data?.length > 0 && (
                                              v?.detail_data?.map((d, idx) => (
                                                <tr
                                                  key={idx}
                                                  className="hover:bg-sky-50 transition duration-200 border-b"
                                                >
                                                  <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                                    {d?.no_urut ?? "-"}
                                                  </td>
                                                  <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                                    {d?.role ?? "-"}
                                                  </td>
                                                  <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                                    {d?.unit_kerja ?? "-"}
                                                  </td>
                                                  <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                                    {d?.jabatan ?? "-"}
                                                  </td>
                                                  <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                                    {d?.jenis_user ?? "-"}
                                                  </td>
                                                  <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                                    {d?.kegiatan ?? "-"}
                                                  </td>
                                                  {/* <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                                    {d?.wajib_verifikasi === 'Y' ? 'YA' : d?.wajib_verifikasi === 'T' ? 'TIDAK' : "-"}
                                                  </td> */}
                                                  <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                                    {d?.view_only === 'Y' ? 'YA' : d?.view_only === 'T' ? 'TIDAK' : "-"}
                                                  </td>
                                                  <td className="px-4 py-3 font-bold text-primary whitespace-nowrap">
                                                    {d?.flag_aktif === 'Y' ? 'YA' : d?.flag_aktif === 'T' ? 'TIDAK' : "-"}
                                                  </td>
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

export default TableMasterApproval;