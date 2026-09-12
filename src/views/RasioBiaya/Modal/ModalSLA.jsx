import React, { useEffect, useMemo, useState } from 'react'
import { Modal } from 'components/atoms'
import { useSelector } from 'react-redux';

import {
  FaFileAlt,
  FaPlusCircle,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaChartBar,
  FaCalendarAlt,
  FaUser,
  FaBuilding,
  FaTags,
  FaClipboardList,
  FaInfoCircle,
  FaMoneyCheckAlt,
  FaTimes,
  FaPercentage,
  FaMemory,
  FaReceipt,
  FaClock,
} from 'react-icons/fa';

import ReactPaginate from "react-paginate";
import { formatDate } from "global/helper/formatDate";
import storeSchema from 'global/store';
import { IoSearch } from 'react-icons/io5';
import { swal } from 'global/helper/swal';
import { exportToExcel } from '../exportToExcel';
import { formatCurrency } from 'global/helper/formatCurrency';

const ModalSLA = () => {

  const { toggleModal } = useSelector(state => state.global);

  const [titleCard, setTitleCard] = useState('')
  const [titleIcon, setTitleIcon] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0)
  const [totalPage, setTotalPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const getListAllPengajuan = async () => {
    try {
      setAllData([])
      setLoading(true);
      const response = await storeSchema.actions.getListAllPengajuanDashboard({
        page: currentPage,
        limit: perPage,
        keyword: keyword,
        tipe: toggleModal?.tipe_card,
        download: false
        // sortBy: sortBy === "Latest" ? "DESC" : "ASC"
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

  useEffect(() => {
    if (toggleModal?.isOpen && toggleModal?.modal === "modalSLA") {
      if (toggleModal?.tipe_card === 'on_sla') {
        setTitleCard('On SLA')
        setTitleIcon(<FaFileAlt className='text-blue-900' />)
      }

      if (toggleModal?.tipe_card === 'over_sla') {
        setTitleCard('Over SLA')
        setTitleIcon(<FaPlusCircle className='text-blue-600' />)
      }

      getListAllPengajuan()
      setCurrentPage(1);
    }
  }, [toggleModal])

  const handleSearch = async (e) => {
    setCurrentPage(1)
    e.preventDefault();
    getListAllPengajuan();
  };

  // ==========================
  // STATUS BADGE
  // ==========================
  const statusBadge = (status) => {

    switch (status) {

      case "Selesai":
        return "bg-gradient-to-r from-green-500 to-emerald-600 ring-green-200";

      case "Ditolak":
        return "bg-gradient-to-r from-red-500 to-rose-600 ring-red-200";

      case "Pencairan":
        return "bg-gradient-to-r from-cyan-500 to-sky-600 ring-cyan-200";

      case "Approval":
        return "bg-gradient-to-r from-indigo-500 to-blue-700 ring-indigo-200";

      case "Verifikasi":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 ring-yellow-200";

      default:
        return "bg-gradient-to-r from-gray-500 to-slate-700 ring-gray-200";
    }
  };

  // ==========================
  // HEADER TABLE
  // ==========================
  const headerTable = [

    { label: "Tanggal Pengajuan", icon: <FaCalendarAlt /> },

    { label: "No. Pengajuan", icon: <FaFileAlt /> },

    { label: "Nama Pemohon", icon: <FaUser /> },

    { label: "Cabang/Unit", icon: <FaBuilding /> },

    { label: "Jenis Biaya", icon: <FaTags /> },
    { label: "Jenis PPN", icon: <FaPercentage /> },

    // { label: "Account Description", icon: <FaNoteSticky /> },

    { label: "Nominal Dpp", icon: <FaMoneyBillWave /> },

    { label: "PPN", icon: <FaMoneyBillWave /> },

    { label: "Pph", icon: <FaMoneyBillWave /> },

    { label: "Jumlah Yang Dibayarkan", icon: <FaMoneyBillWave /> },

    { label: "No Invoice", icon: <FaClipboardList /> },

    { label: "No Kasbon SAP", icon: <FaClipboardList /> },

    { label: "No Faktur Pajak", icon: <FaClipboardList /> },

    { label: "No Voucher SAP", icon: <FaClipboardList /> },

    { label: "No Memo", icon: <FaMemory /> },

    { label: "Tanggal Pembayaran", icon: <FaCalendarAlt /> },
    { label: "No Voucher Payment", icon: <FaReceipt /> },

    // { label: "Anggaran", icon: <FaMoneyBillWave /> },

    // { label: "Sisa Anggaran", icon: <FaMoneyBillWave /> },

    { label: "SLA Penyelesaian", icon: <FaClock /> },

    { label: "Status", icon: <FaInfoCircle /> },

  ];

  const startIndex =
    allData?.length > 0
      ? (currentPage - 1) * perPage + 1
      : 0;

  const endIndex = Math.min(
    currentPage * perPage,
    totalData
  );

  const changePage = (e) => {
    const newPage = e.selected + 1;
    setCurrentPage(newPage);
  };

  const ChangePerPage = (e) => {
    const newPerPage = parseInt(e.target.value);
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  useEffect(() => {
    getListAllPengajuan();
    // eslint-disable-next-line
  }, [currentPage, perPage]);

  const slaBadge = (sla) => {
    if (sla <= 2) {
      return "bg-green-100 text-green-700 border border-green-300";
    }
    if (sla <= 5) {
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    }
    return "bg-red-100 text-red-700 border border-red-300";
  };

  const handleDownload = () => {
    exportToExcel({
      toggleModal,
      getDataFunction: storeSchema.actions.getListAllPengajuanDashboard,
      swal
    });
  }

  return (
    <Modal
      title={titleCard}
      iconTitle={titleIcon}
      modal={"modalSLA"}
      size={"w-11/12 max-w-7xl"}
      scroll={false}
    >

      <div className="bg-white rounded-2xl">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between gap-5 mb-6">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-gradient-to-tr from-blue-900 to-orange-500 p-4">
              <FaChartBar className="text-3xl text-white" />
            </div>

            <div>

              <h1 className="text-2xl font-bold text-blue-900">
                {titleCard}
              </h1>

              <p className="text-sm text-gray-500">
                Detail data berdasarkan kategori card yang dipilih.
              </p>

            </div>

          </div>

          {/* FILTER */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* <select className="select select-bordered rounded-full">

              <option>Semua Status</option>

              <option>Diajukan</option>

              <option>Verifikasi</option>

              <option>Approval</option>

              <option>Pencairan</option>

              <option>Selesai</option>

            </select>
            <input
              type="text"
              defaultValue="April 2026"
              className="input input-bordered rounded-full"
            /> */}
            <form onSubmit={handleSearch} className='input input-md input-bordered flex items-center gap-2 bg-transparent rounded-[25px]'>
              <input
                type="text"
                placeholder='Search...'
                className='grow'
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
              />
              <IoSearch onClick={handleSearch} className='cursor-pointer' />
            </form>

            <button className="btn rounded-full bg-blue-900 hover:bg-blue-800 text-white border-none" onClick={handleDownload}>
              Download
            </button>

          </div>

        </div>

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
          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-300">

            <div className="overflow-auto rounded-2xl max-h-[72vh]">

              <table className="table w-full">

                <thead className="bg-blue-900 text-white sticky top-0 text-[14px]">

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

                <tbody className="bg-white">

                  {allData.map((v, i) => {

                    const jumlahDibayarkan =
                      v.DPP + v.PPN - v.PPH;

                    return (

                      <tr
                        key={i}
                        className="
                      hover:bg-sky-50
                      transition duration-200
                      border-b
                    "
                      >

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.tgl_pengajuan}

                        </td>

                        <td className="px-4 py-3 font-bold text-blue-900 whitespace-nowrap">

                          {v?.no_pengajuan}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.nama_pemohon}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.cabang}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.jenis_biaya}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.tipe_ppn === 'include' ? 'Non WAPU' : v?.tipe_ppn === 'exclude' ? 'WAPU' : '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap font-semibold">

                          {formatCurrency(v?.nominal_dpp)}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {formatCurrency(v?.nominal_ppn) || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-red-600 font-semibold">

                          {formatCurrency(v?.nominal_pph) || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap font-bold text-emerald-700">

                          {formatCurrency(v?.total_dibayarkan) || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.no_invoice || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.no_kasbon_sap || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.no_faktur_pajak || ''}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.no_voucher_sap || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.no_memo || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.tgl_pembayaran_pengajuan || '-'}

                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">

                          {v?.no_voucher_payment || '-'}

                        </td>

                        {/* <td className="px-4 py-3 whitespace-nowrap">

                        Rp {v.ANGGARAN}

                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">

                        Rp {v.SISA_ANGGARAN}

                      </td> */}

                        {/* ==========================
                        SLA PENYELESAIAN
                    ========================== */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-3">
                              <span
                                className={`
                                                                  inline-flex items-center gap-2
                                                                  px-3 py-1
                                                                  rounded-full
                                                                  text-xs font-semibold 
                                                                  ring-2
                                                                  shadow-sm 
                                                                  ${v?.status_selesai === '1' ? 'bg-green-300' : 'bg-yellow-300'}
                                                                  w-fit
                                                                  hover:scale-110 transition
                                                                `}
                              >
                                {v?.status_selesai === '1' ? 'Selesai' : 'Masih Proses'}
                              </span>
                            </div>
                            <div
                              className={`
                              inline-flex items-center
                              gap-2 px-3 py-1
                              rounded-full text-xs
                              font-semibold
                              ${slaBadge(v.cond_sla)}
                            `}
                            >

                              <FaClock />

                              {v.sla_pengajuan}

                            </div>
                          </div>

                        </td>

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

                      </tr>

                    );

                  })}

                </tbody>

              </table>

            </div>

            {/* FOOTER */}
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

    </Modal>
  )
}

export default ModalSLA