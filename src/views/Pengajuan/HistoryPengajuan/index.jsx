import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IoCubeOutline, IoBusinessOutline, IoTodayOutline, IoRibbonSharp, IoSearch } from "react-icons/io5";
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
import { useLocation, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FaBuilding, FaHistory, FaSyncAlt } from 'react-icons/fa';
import AttachmentList from './components/AttachmentList';
import Pengajuan from './components/Pengajuan';
import { formatDate } from 'global/helper/formatDate';
import { formatCurrency } from 'global/helper/formatCurrency';
import PengajuanLogHistory from './components/PengajuanLogHistory';
import CoaList from './components/CoaList';

const ProjectProfile = () => {
  const { state } = useLocation();
  const { akunakses } = useSelector((state) => state.global)

  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [pengajuanId, setPengajuanId] = useState('');
  const [tabActive, setTabActive] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [totalPage, setTotalPage] = useState(0)
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);

  const getListPengajuan = async () => {
    swal.loading();
    try {
      const payload = {
        page: currentPage,
        limit: perPage,
        status: 'ALL',
        keyword: keyword,
        pengajuan_id: "",
        sortBy: "DESC",
      };
      const res = await storeSchema.actions.getListPengajuan(payload);
      if (res.status === true) {
        if (!state?.data?.pengajuan_id) setPengajuanId(res?.data?.list_data[0]?.pengajuan_id)
        setData(res?.data);
        setTotalData(res?.data?.total_data || 0);
        setTotalPage(res?.data?.total_halaman || 0);
      } else {
        setData([]);
      };
      // setTimeout(() => {
      // }, 1000);
    } catch (error) {
      console.error(error);
    } finally {
      swal.close()
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getListPengajuan();
  };


  const getDetailPengajuan = async (id) => {
    try {
      setLoading(true);
      const res = await storeSchema.actions.getDetailPengajuan(id);
      if (res.message === 'Success') {
        setDetail(res?.data);
      } else {
        setDetail([]);
      };
    } catch (error) {
      console.error(error);
      swal.error(error?.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListPengajuan();
    // eslint-disable-next-line
  }, [sortBy, currentPage, perPage]);

  useEffect(() => {
    if (pengajuanId) {
      getDetailPengajuan(pengajuanId);
    }
    // eslint-disable-next-line
  }, [pengajuanId]);

  const handleReload = () => {
    getDetailPengajuan(pengajuanId)
  }

  const handleClick = (e, id) => {
    e.preventDefault();
    // swal.loading();
    if (id) {
      setPengajuanId(id)
    }
  }

  const changePage = async (e) => {
    const newPage = e.selected + 1;
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (data?.total_data) {
      setTotalPage(Math.ceil(data?.total_data / perPage));
    }

  }, [data?.total_data, perPage])

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

  return (
    <>
      <div className="bg-white px-6 pt-10 h-full mb-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-900 to-orange-500 flex items-center justify-center">
              <FaHistory className="text-white text-2xl" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-blue-900">
                History Pengajuan
              </h1>
              <p className="text-sm text-gray-500">
                Lihat data pengajuan anda secara lengkap disini
              </p>
            </div>

          </div>

        </div>

        <hr className="border-t-2 my-6" />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row md:max-h-96 lg:max-h-[780px] gap-6 mb-5">
          {/* Left Column */}
          <div className="w-full lg:w-1/3 rounded-lg shadow-lg shadow-blue-900">

            {/* Search & Filter */}
            <div className="flex rounded-t-lg flex-col gap-3 px-3 py-4 bg-blue-900">
              {/* Baris untuk Kategori dan Sort */}
              {/* Baris untuk Input Pencarian */}
              <form
                onSubmit={handleSearch}
                // Secara dinamis mengubah class container
                className={`flex items-center rounded-full py-2 px-3 gap-2 w-full bg-white`}
              >

                <input
                  type="text"
                  placeholder={`Masukan Kata Kunci...`}
                  className="grow bg-transparent focus:outline-none"
                  onChange={(e) => setKeyword(e.target.value)}
                  value={keyword}
                />
                <button type="submit" aria-label="Search">
                  <IoSearch className="cursor-pointer" />
                </button>
              </form>
            </div>
            <Pengajuan data={data?.list_data} totalData={data?.total_data} handleClick={handleClick} pengajuanId={pengajuanId} />
            {/* pagenation */}
            <div className='flex flex-col sm:flex-row justify-center sm:items-center gap-3 px-3 py-2'>
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
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-2/3 w-full flex flex-col gap-6">
            {/* Detail Card */}
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
              <div className="card bg-white shadow-lg shadow-blue-900/20 rounded-xl p-4 border border-blue-200">

                {/* HEADER */}
                <div className="flex items-center gap-3 mb-4">

                  <div className="w-11 h-11 bg-blue-900 rounded-xl flex items-center justify-center">
                    <IoRibbonSharp className="text-white text-lg" />
                  </div>

                  <div>
                    <div className="text-xs text-gray-500">
                      {detail?.no_pengajuan}
                    </div>
                    <div className="font-bold text-base text-gray-800">
                      {detail?.keterangan || '-'}
                    </div>
                  </div>

                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">

                  {/* PEMOHON */}
                  <div>
                    <div className="text-[11px] text-gray-400">Nama Pemohon</div>
                    <div className="font-semibold text-gray-700">{detail?.nama_pemohon}</div>
                  </div>

                  {/* JABATAN */}
                  <div>
                    <div className="text-[11px] text-gray-400">Jabatan</div>
                    <div className="font-semibold text-gray-700">{detail?.ur_jabatan_id}</div>
                  </div>

                  {/* TANGGAL */}
                  <div>
                    <div className="text-[11px] text-gray-400">Tanggal Pengajuan</div>
                    <div className="font-semibold text-gray-700">{formatDate(detail?.created_at)}</div>
                  </div>

                  {/* CABANG */}
                  <div>
                    <div className="text-[11px] text-gray-400">Cabang</div>
                    <div className="font-semibold text-gray-700">{detail?.ur_cabang_id}</div>
                  </div>

                  {/* JENIS BIAYA */}
                  <div>
                    <div className="text-[11px] text-gray-400">Jenis Biaya</div>
                    <div className="font-semibold text-gray-700">{detail?.ur_jenis_biaya_id}</div>
                  </div>

                  {/* ACCOUNT */}
                  <div>
                    <div className="text-[11px] text-gray-400">Vendor</div>
                    <div className="font-semibold text-gray-700">
                      {detail?.nama_vendor || '-'}
                    </div>
                  </div>

                  {/* DPP */}
                  <div>
                    <div className="text-[11px] text-gray-400">Nominal DPP</div>
                    <div className="font-semibold text-blue-700 whitespace-nowrap">
                      {formatCurrency(detail?.nominal_dpp)}
                    </div>
                  </div>

                  {/* PPN */}
                  <div>
                    <div className="text-[11px] text-gray-400">PPN</div>
                    <div className="font-semibold text-pink-600 whitespace-nowrap">
                      {detail?.nominal_ppn ? <>
                        {detail?.ppn}% ({formatCurrency(detail?.nominal_ppn)})
                      </> : '-'}
                    </div>
                  </div>

                  {/* PPH */}
                  <div>
                    <div className="text-[11px] text-gray-400">PPh</div>
                    <div className="font-semibold text-red-600 whitespace-nowrap">
                      {detail?.nominal_pph ? <>
                        {detail?.pph}% ({formatCurrency(detail?.nominal_pph)})
                      </> : '-'}
                    </div>
                  </div>

                  {/* JUMLAH DIBAYARKAN */}
                  <div>
                    <div className="text-[11px] text-gray-400">Jumlah Dibayarkan</div>
                    <div className="font-bold text-green-600 whitespace-nowrap">
                      {formatCurrency(detail?.total_dibayarkan) || '-'}
                    </div>
                  </div>

                  {/* INVOICE */}
                  <div>
                    <div className="text-[11px] text-gray-400">No Invoice</div>
                    <div className="font-semibold text-gray-700">
                      {detail?.no_invoice || '-'}
                    </div>
                  </div>

                  {/* KASBON */}
                  <div>
                    <div className="text-[11px] text-gray-400">No Kasbon SAP</div>
                    <div className="font-semibold text-gray-700">
                      {detail?.no_kasbon_sap || '-'}
                    </div>
                  </div>

                  {/* FAKTUR */}
                  <div>
                    <div className="text-[11px] text-gray-400">No Faktur Pajak</div>
                    <div className="font-semibold text-gray-700">
                      {detail?.no_faktur_pajak || '-'}
                    </div>
                  </div>

                  {/* VOUCHER */}
                  <div>
                    <div className="text-[11px] text-gray-400">No Voucher SAP</div>
                    <div className="font-semibold text-gray-700">
                      {detail?.no_voucher_sap || '-'}
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className='col-span-3'>
                    <div className="text-[11px] text-gray-400">Status</div>
                    {/* STATUS */}
                    <div className="flex flex-row items-end gap-1">

                      {/* Unit Badge */}
                      <span
                        className="
                                      inline-flex items-center gap-2
                                      rounded-full
                                      bg-blue-100
                                      text-slate-700
                                      px-3 py-1
                                      text-xs font-medium
                                      shadow-sm
                                    "
                      >
                        <FaBuilding />
                        {detail?.status_unit}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`
                                      inline-flex items-center gap-2
                                      rounded-full
                                      px-3 py-1
                                      text-xs font-semibold
                                      text-white
                                      shadow-sm
                                      ${statusBadge(detail?.kd_status)}
                                    `}
                      >
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />

                        {detail?.status_kegiatan}

                        <span
                          className="
                                        bg-white
                                        text-gray-800
                                        rounded-full
                                        px-2 py-0.5
                                        text-[10px]
                                        font-medium
                                      "
                        >
                          {detail?.status_pengajuan ?? "Proses"}
                        </span>
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
            {/* Tabs Section */}
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
              <div className="card bg-white shadow-lg shadow-blue-900 h-full">
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md p-4 flex items-center justify-between rounded-t-xl">

                  <div>
                    <h3 className="font-bold text-lg tracking-wide">
                      History Pengajuan
                    </h3>
                    <p className="text-xs text-white/80">
                      Riwayat pengajuan yang telah diproses
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleReload}
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-full
                      bg-white/20
                      hover:bg-white/30
                      active:scale-95
                      transition-all duration-200
                      backdrop-blur-sm
                      border border-white/20
                    "
                  >
                    <FaSyncAlt
                      className={`text-white ${loading ? 'animate-spin' : ''}`}
                    />
                  </button>
                </div>
                <div role="tablist" className="tabs tabs-bordered font-semibold flex flex-col md:flex-row lg:flex-row">
                  <div
                    role="tab"
                    className={`flex tab text-nowrap w-full h-10 ${tabActive === 0 ? 'tab-active text-blue-900 bg-blue-200' : ''}`}
                    onClick={() => setTabActive(0)}
                  >
                    Flow Tracking
                  </div>
                  <div
                    role="tab"
                    className={`flex tab text-nowrap w-full h-10 ${tabActive === 1 ? 'tab-active text-blue-900 bg-blue-200' : ''}`}
                    onClick={() => setTabActive(1)}
                  >
                    Lampiran
                  </div>
                  <div
                    role="tab"
                    className={`flex tab text-nowrap w-full h-10 ${tabActive === 2 ? 'tab-active text-blue-900 bg-blue-200' : ''}`}
                    onClick={() => setTabActive(2)}
                  >
                    Account Description
                  </div>
                </div>

                <div className="p-4 overflow-auto">
                  {tabActive === 0 && <PengajuanLogHistory data={detail} />}
                  {tabActive === 1 && <AttachmentList data={detail?.lampiran} />}
                  {tabActive === 2 && <CoaList data={detail?.coa} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectProfile