import { getCookies } from "global/helper/cookie";
import { decodeData } from "global/helper/jwt";
import { swal } from "global/helper/swal";
import storeSchema from "global/store";
import React, { useEffect, useState } from "react";
import {
  FaEllipsisV,
  FaBuilding,
  FaMoneyBillWave,
  FaWallet,
  FaPlusCircle,
  FaCalendarAlt,
  FaInfoCircle,
  FaTags,
  FaPercent,
  FaClipboardList,
  FaChartLine,
  FaTrash,
  FaFilter,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoFilterOutline, IoSearch } from "react-icons/io5";

import ReactPaginate from "react-paginate";
import ModalFilter from "./Modal/ModalFilter";

// =========================
// FORMAT RUPIAH
// =========================
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

// =========================
// STATUS STYLE
// =========================
const statusBadge = (status) => {
  switch (status) {
    case "Aktif":
      return "bg-gradient-to-r from-green-500 to-emerald-600 ring-green-200";

    case "Non Aktif":
      return "bg-gradient-to-r from-red-500 to-rose-600 ring-red-200";

    default:
      return "bg-gray-400";
  }
};

const TablePenjualan = ({ loginAccess, dispatch, setToggleModal, toggleModal, dimensionScreenW, check, reloadData, setReloadData }) => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("DESC");
  const [loading, setLoading] = useState(false);
  const [filterCabang, setFilterCabang] = useState([])
  const [dataFilterOmset, setDataFilterOmset] = useState({
    // cabang: null,
    periode: '',
  })

  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "modalUpload" }));
  // };
  // =========================
  // HEADER TABLE
  // =========================
  const headerTable = [

    { label: "Aksi", icon: <FaEllipsisV /> },

    { label: "Profit Center", icon: <FaBuilding /> },

    { label: "Bulan", icon: <FaCalendarAlt /> },

    { label: "Target Omset", icon: <FaMoneyBillWave /> },

    { label: "Realisasi Omset", icon: <FaChartLine /> },

    { label: "% Omset", icon: <FaChartLine /> },

  ];

  const getListPenjualan = async () => {
    try {
      setTableData([])
      setLoading(true);

      const response = await storeSchema.actions.getListPenjualan({
        page: currentPage,
        limit: perPage,
        keyword: keyword,
        sortBy: sortBy,
        filter: {
          cabang: filterCabang,
          periode: dataFilterOmset?.periode
        }
      });

      if (response.status === true) {
        setReloadData(false)
        setTableData(response?.data?.list_data || []);
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

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1)
    getListPenjualan()
  };
  // =========================
  // PAGINATION LOGIC
  // =========================
  const startOffset = (currentPage - 1) * perPage;
  const endOffset = startOffset + perPage;

  const changePage = (e) => {
    const selectedPage = e.selected + 1;
    setCurrentPage(selectedPage);
  };

  const ChangePerPage = (e) => {
    const value = parseInt(e.target.value);
    setPerPage(value);
    setCurrentPage(1);
  };

  const startIndex =
    totalData > 0
      ? startOffset + 1
      : 0;

  const endIndex = Math.min(
    currentPage * perPage,
    totalData
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setDropdownOpen(true);
  }

  const handleDelete = async (penjualan_id) => {
    try {
      swal.loading()
      const res = await storeSchema.actions.deletePenjualan(penjualan_id)
      if (res?.status === true) {
        swal.close();
        setReloadData(true)
      } else {
        swal.error('Gagal Mendapatkan Data !')
      }
    } catch (error) {
      await swal.error(error?.message)
    }
  };

  const handleFilter = async () => {
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
      await getListPenjualan()
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

  useEffect(() => {
    getListPenjualan();
    // eslint-disable-next-line
  }, [currentPage, perPage, sortBy]);

  useEffect(() => {
    if (reloadData === true || (filterCabang?.length === 0 && !dataFilterOmset?.periode)) {
      getListPenjualan();
    }
    // eslint-disable-next-line
  }, [reloadData, filterCabang, dataFilterOmset]);

  return (
    <>
      <ModalFilter filterCabang={filterCabang} setFilterCabang={setFilterCabang} setDataFilterOmset={setDataFilterOmset} dataFilterOmset={dataFilterOmset} handleTerapkanFilter={handleTerapkanFilterOmset} resetFilterOmset={resetFilterOmset} />
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

          <div className='flex flex-col gap-5  lg:justify-end  sm:w-full sm:flex-row sm:items-center'>
            <div className='flex gap-3 justify-between'>
              {/* <div className='btn btn-sm rounded-[25px]'>
                <IoFilterOutline /> Filter
              </div> */}
              <div className="flex items-center gap-3">
                <button className="btn btn-sm py-2 rounded-full items-center gap-2 bg-blue-900 text-white font-semibold"
                  onClick={handleFilter}
                >
                  <FaFilter />
                  Filter
                </button>
              </div>
              <div className='flex items-center'>
                <span className='mr-2 text-sm font-light'>Sort by: </span>
                <div className={`dropdown dropdown-hover dropdown-end z-20 ${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
                  <div tabIndex={0} role="button" className="btn btn-sm rounded-[25px] bg-white">{sortBy} <IoIosArrowDown /></div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-28">
                    <li onClick={() => setSortBy('DESC')}><div>DESC</div></li>
                    <li onClick={() => setSortBy('ASC')}><div>ASC</div></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
          <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-5 border border-gray-300">
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
              <div className={`overflow-auto rounded-xl ${dropdownOpen ? 'pb-24' : ''}`}>

                {/* TABLE */}
                <table className="min-w-full table-auto">

                  {/* HEADER */}
                  <thead className="bg-blue-900 text-white sticky top-0 text-[14px] z-10">

                    <tr>

                      {headerTable.map((h, i) => (

                        <th
                          key={i}
                          className="px-4 py-3 text-left whitespace-nowrap text-sm font-semibold"
                        >

                          <div className="flex items-center gap-2">

                            {h.icon}

                            {h.label}

                          </div>

                        </th>

                      ))}

                    </tr>

                  </thead>

                  {/* BODY */}
                  <tbody className="bg-white">

                    {tableData?.map((v, i) => (

                      <tr
                        key={i}
                        className="border-b hover:bg-sky-50 transition"
                      >

                        {/* AKSI */}
                        <td className="px-4 py-3 whitespace-nowrap">

                          <div className="dropdown dropdown-right" onClick={() => { handleDropdownClick() }}>

                            <div tabIndex={0} role="button">

                              <div className="btn btn-sm rounded-full bg-white shadow hover:bg-gray-100">

                                <FaEllipsisV className="text-primary" />

                              </div>

                            </div>

                            <div
                              tabIndex={0}
                              className="menu menu-md dropdown-content mt-3 z-[1] p-5 border shadow bg-white rounded-box w-64"
                            >

                              <p className="text-md font-bold">
                                Action
                              </p>
                              {['RL08', 'RL00'].includes(loginAccess?.role_id) && (
                                <>
                                  <hr className="my-2" />

                                  <ul>
                                    <li>
                                      <div className="pl-0" onClick={() => handleDelete(v?.penjualan_id)}>
                                        <FaTrash className="text-xl" />
                                        Hapus Data
                                      </div>
                                    </li>
                                  </ul>
                                </>
                              )}

                            </div>

                          </div>

                        </td>

                        {/* CABANG */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
                          {v.cabang}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                          {v.month}
                        </td>

                        {/* ANGGARAN TERPAKAI */}
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-semibold text-orange-600">
                          {formatRupiah(v.target_omset)}
                        </td>

                        {/* SISA ANGGARAN */}
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-semibold text-green-700">
                          {formatRupiah(v?.realisasi_omset)}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-semibold text-green-700">
                          {v?.persen_omset + '%'}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>
            </div>

            {/* FOOTER */}
            <div className="border border-gray-100 shadow-xl bg-slate-50 py-4 rounded-b-2xl lg:px-5 md:px-5 px-2">

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

                    </select>

                  </div>

                </div>

                {/* RIGHT */}
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
                        "w-full h-full flex items-center justify-center"
                      }

                      previousClassName={
                        "min-w-9 h-9 border border-gray-500 rounded-full bg-white hover:bg-sky-50 transition-all overflow-hidden"
                      }

                      nextClassName={
                        "min-w-9 h-9 border border-gray-500 rounded-full bg-white hover:bg-sky-50 transition-all overflow-hidden"
                      }

                      previousLinkClassName={
                        "w-full h-full flex items-center justify-center"
                      }

                      nextLinkClassName={
                        "w-full h-full flex items-center justify-center"
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

export default TablePenjualan;