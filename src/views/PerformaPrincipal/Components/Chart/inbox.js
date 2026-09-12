import { formatDate } from 'global/helper/formatDate';
import React, { useEffect, useState } from 'react';
import { FaBuilding, FaEye, FaFilter, FaHourglassHalf, FaInbox, FaMoneyBill, FaTags, FaUserTag } from 'react-icons/fa';
import { FaListCheck } from 'react-icons/fa6';
import { IoNewspaper, IoPerson, IoCalendarOutline } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';
import BgModal from 'assets/bg_cito.jpeg';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';

export default function Inbox({ loginAccess }) {

  const [activeTab, setActiveTab] = useState("DIAJUKAN");
  const [dataTable, setDataTable] = useState([]);
  const [range, setRange] = useState({
    start: null,
    end: null,
  })
  const [loadingMenungguPembayaran, setLoadingMenungguPembayaran] = useState(true);
  const [loadingPengajuan, setLoadingPengajuan] = useState(true);
  const perPage = 4;
  const [currentPageMP, setCurrentPageMP] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataMenungguPembayaran, setDataMenungguPembayaran] = useState([])
  const [dataPengajuan, setDataPengajuan] = useState([])
  const [totalPageMP, setTotalPageMP] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [summary, setSummary] = useState()

  const getMenungguPembayaran = async () => {
    try {
      setLoadingMenungguPembayaran(true);

      const response = await storeSchema.actions.getMenungguPembayaran({ page: currentPageMP, limit: 4, range });

      if (response.status) {
        setDataMenungguPembayaran(response.data?.list_data);
        setTotalPageMP(response?.data?.total_halaman || 0);
      }
    } catch (err) {
      console.error(err);
      swal.error("Gagal mengambil data dashboard");
    } finally {
      setLoadingMenungguPembayaran(false);
    }
  };

  const getPengajuanDashboard = async () => {
    try {
      // setLoadingMenungguPembayaran(true);

      const response = await storeSchema.actions.getPengajuanDashboard({ page: currentPage, limit: 4, status: activeTab });

      if (response.status) {
        setSummary(response?.data?.summary)
        setDataPengajuan(response.data?.list_data);
        setTotalPage(response?.data?.total_halaman || 0);
      }
    } catch (err) {
      console.error(err);
      swal.error("Gagal mengambil data dashboard");
    } finally {
      // setLoadingMenungguPembayaran(false);
    }
  };

  const handleFilterMenungguPembayaran = () => {
    if (!range?.start && !range?.end) {
      getMenungguPembayaran()
    }
    else if (!range?.start) {
      swal.warning('Start Date Wajib Diisi !')
      return
    }
    else if (!range?.end) {
      swal.warning('End Date Wajib Diisi !')
      return
    } else {
      getMenungguPembayaran()
    }
  }

  const changePageMP = (e) => {
    const newPage = e.selected + 1;
    setCurrentPageMP(newPage);
  };

  useEffect(() => {
    getMenungguPembayaran();
    // eslint-disable-next-line
  }, [currentPageMP]);

  useEffect(() => {
    getPengajuanDashboard();
    // eslint-disable-next-line
  }, [currentPage]);

  // =========================
  // TAB DUMMY (bg primary)
  // =========================
  const refStatusTab = [
    { KD_STATUS: "DIAJUKAN", URAIAN: "Diajukan", TOTAL: 12 },
    { KD_STATUS: "VERIFIKASI", URAIAN: "Verifikasi", TOTAL: 8 },
    { KD_STATUS: "APPROVAL", URAIAN: "Approval", TOTAL: 5 },
    { KD_STATUS: "SELESAI", URAIAN: "Selesai", TOTAL: 10 },
    { KD_STATUS: "DITOLAK", URAIAN: "Ditolak", TOTAL: 2 },
  ];

  // =========================
  // DATA DUMMY TABLE
  // =========================
  const jenisList = [
    "Kasbon",
    "Swakelola",
    "Door To Door",
    "Pengiriman",
  ];

  const dummyData = [
    {
      id: 1,
      PENGAJU: "Budi Santoso",
      CABANG: "Cabang Jakarta",
      NOMINAL_PENGAJUAN: 15000000,
      TANGGAL: "2026-05-01",
      JENIS: jenisList[Math.floor(Math.random() * jenisList.length)],
    },
    {
      id: 2,
      PENGAJU: "Rina Oktaviani",
      CABANG: "Cabang Bandung",
      NOMINAL_PENGAJUAN: 27500000,
      TANGGAL: "2026-05-02",
      JENIS: jenisList[Math.floor(Math.random() * jenisList.length)],
    },
    {
      id: 3,
      PENGAJU: "Dewi Lestari",
      CABANG: "Cabang Surabaya",
      NOMINAL_PENGAJUAN: 32000000,
      TANGGAL: "2026-05-03",
      JENIS: jenisList[Math.floor(Math.random() * jenisList.length)],
    },
    {
      id: 4,
      PENGAJU: "Agus Salim",
      CABANG: "Cabang Medan",
      NOMINAL_PENGAJUAN: 18000000,
      TANGGAL: "2026-05-04",
      JENIS: jenisList[Math.floor(Math.random() * jenisList.length)],
    },
    {
      id: 5,
      PENGAJU: "Siti Aminah",
      CABANG: "Cabang Makassar",
      NOMINAL_PENGAJUAN: 22000000,
      TANGGAL: "2026-05-05",
      JENIS: jenisList[Math.floor(Math.random() * jenisList.length)],
    },
  ];

  useEffect(() => {
    getPengajuanDashboard()
  }, [activeTab]);

  // =========================
  // PAGINATION LOGIC
  // =========================
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentItems = dataTable.slice(indexOfFirst, indexOfLast);
  const pageCount = Math.ceil(dataTable.length / perPage);

  const changePage = (e) => {
    setCurrentPage(e.selected + 1);
  };

  // =========================
  // RANDOM COLOR (stable)
  // =========================
  const colors = [
    "bg-sky-50 border-sky-200",
    "bg-blue-50 border-blue-200",
    "bg-yellow-50 border-yellow-200",
    "bg-purple-50 border-purple-200",
    "bg-pink-50 border-pink-200",
    "bg-indigo-50 border-indigo-200",
    "bg-orange-50 border-orange-200",
  ];

  const badgeColors = [
    "bg-sky-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
  ];

  const getColorById = (id) => colors[id % colors.length];
  const getBadgeById = (id) => badgeColors[id % badgeColors.length];

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);

  useEffect(() => {
    getMenungguPembayaran()
    getPengajuanDashboard()
  }, [])

  return (
    <>
      <div className="p-4 bg-white rounded-xl shadow mb-4">
        <div className="flex flex-wrap gap-3 justify-between items-center mb-5 sm:mb-3">

          {/* STATUS */}
          <div className='rounded-lg flex flex-row gap-2 items-center bg-blue-200 w-fit px-3 py-2'>
            <FaHourglassHalf className='text-md text-blue-900' />
            <span className='text-sm font-semibold text-gray-800'>
              Menunggu Pembayaran
            </span>
            <span className='text-xs font-semibold text-white rounded-full bg-red-500 px-2 py-0.5'>
              {dataMenungguPembayaran?.length || 0}
            </span>
          </div>

          {/* RANGE TANGGAL */}
          <div className="flex items-center gap-1 bg-white border shadow-sm rounded-full px-3 py-1 border-blue-300">

            <input
              type="date"
              value={range?.start}
              className="text-xs outline-none w-24 bg-transparent"
              onChange={(e) => {
                setRange({
                  ...range,
                  start: e.target.value
                })
              }}
            />

            <span className="text-gray-400 text-xs">s/d</span>

            <input
              type="date"
              value={range?.end}
              onChange={(e) => {
                setRange({
                  ...range,
                  end: e.target.value
                })
              }}
              className="text-xs outline-none w-24 bg-transparent"
            />

            <button className="ml-1 flex gap-1 items-center text-xs bg-blue-900 text-white px-3 py-1 rounded-full hover:opacity-90"
              onClick={handleFilterMenungguPembayaran}
            >
              <FaFilter /> Filter
            </button>

          </div>

        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 pb-3">
          {dataMenungguPembayaran?.length > 0 ?
            dataMenungguPembayaran && dataMenungguPembayaran?.map((item, index) => (
              <div
                key={index}
                className="ml-4 relative border border-gray-200 rounded-xl shadow-lg hover:shadow-blue-300 transition-all duration-300"
              >

                {/* DOT */}
                <div
                  className={`absolute -left-[12px] top-5 w-4 h-4 rounded-full ${getBadgeById(index)}`}
                ></div>

                {/* CARD */}
                <div className="bg-white p-4 rounded-xl">

                  {/* TOP */}
                  <div className="flex justify-between items-start gap-3">

                    {/* LEFT */}
                    <div>
                      <div className="font-semibold text-gray-800">
                        {item.nama_pemohon}
                      </div>

                      <div className="text-xs text-gray-500">
                        <div className='flex flex-wrap gap-5'>
                          <div className='flex flex-row gap-2 items-center'>
                            <FaBuilding />
                            {item.cabang}
                          </div>
                          <div className='flex flex-row gap-2 items-center'>
                            <FaTags />
                            {item.no_pengajuan}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="text-right">
                      <div className="text-blue-900 font-bold text-sm">
                        {formatRupiah(item.nominal_dpp)}
                      </div>

                      <div className="text-xs text-gray-400">
                        {formatDate(item.created_at)}
                      </div>
                    </div>
                  </div>

                  {/* DETAIL */}
                  <div className="flex flex-wrap gap-5 mt-4 text-xs text-gray-600">

                    <div className="flex items-center gap-1">
                      <FaUserTag />
                      {item?.jabatan}
                    </div>

                    <div className="flex items-center gap-1">
                      <FaListCheck />
                      {item?.jenis_biaya}
                    </div>

                  </div>

                </div>
              </div>
            ))
            :
            <div className="col-span-full flex flex-col items-center justify-center py-6 text-center">
              <div
                className="
                  flex h-24 w-24 items-center justify-center
                  rounded-full
                  bg-blue-50
                  border border-blue-100
                  shadow-sm
                "
              >
                <FaInbox className="text-5xl text-blue-400" />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-gray-700">
                Tidak ada data
              </h3>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                Belum ada pengajuan yang sesuai dengan filter atau kriteria yang dipilih.
              </p>
            </div>
          }

        </div>

        {/* ================= PAGINATION ================= */}
        {dataMenungguPembayaran?.length > 0 && (
          <div className="overflow-auto pb-2 justify-center flex mt-5">

            <ReactPaginate
              breakLabel={"..."}
              previousLabel={"←"}
              nextLabel={"→"}
              pageCount={totalPageMP}
              onPageChange={changePageMP}
              forcePage={currentPageMP - 1}
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
      <div className="p-4 bg-white rounded-xl shadow">
        {/* ================= TAB ================= */}
        <div className="flex border-b mb-4 gap-2 overflow-auto pb-2">

          {refStatusTab.map((tab) => (
            <button
              key={tab.KD_STATUS}
              onClick={() => {
                setActiveTab(tab.KD_STATUS);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-t-lg text-sm whitespace-nowrap transition-all duration-200
              ${activeTab === tab.KD_STATUS
                  ? "bg-blue-900 text-white font-semibold shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
            `}
            >
              {tab.URAIAN}

              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full
              ${activeTab === tab.KD_STATUS
                  ? "bg-white text-blue-900"
                  : "bg-red-500 text-white"
                }
            `}
              >
                {
                  tab?.KD_STATUS === 'DIAJUKAN' ? (summary?.total_diajukan ?? 0) : (tab?.KD_STATUS === 'VERIFIKASI' ? (summary?.total_verifikasi ?? 0) : (tab?.KD_STATUS === 'APPROVAL' ? (summary?.total_approval ?? 0) : (tab?.KD_STATUS === 'SELESAI' ? (summary?.total_selesai ?? 0) : (tab?.KD_STATUS === 'DITOLAK' ? (summary?.total_ditolak ?? 0) : 0))))
                }
              </span>

            </button>
          ))}

        </div>

        {/* ================= LIST ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 pb-3">
          {dataPengajuan?.length > 0 ?
            dataPengajuan?.map((item, index) => (
              <div
                key={index}
                className="ml-4 relative border border-gray-200 rounded-xl shadow-lg hover:shadow-blue-300 transition-all duration-300"
              >

                {/* DOT */}
                <div
                  className={`absolute -left-[12px] top-5 w-4 h-4 rounded-full ${getBadgeById(index)}`}
                ></div>

                {/* CARD */}
                <div className="bg-white p-4 rounded-xl">

                  {/* TOP */}
                  <div className="flex justify-between items-start gap-3">

                    {/* LEFT */}
                    <div className="flex items-start gap-3">

                      <div className="bg-blue-100 p-2 rounded-lg">
                        <IoNewspaper className="text-blue-900 text-lg" />
                      </div>

                      <div>
                        <div className="font-semibold text-gray-800">
                          {item.nama_pemohon}
                        </div>

                        <div className="text-xs text-gray-500">
                          <div className='flex flex-wrap gap-5'>
                            <div className='flex flex-row gap-2 items-center'>
                              <FaBuilding />
                              {item.cabang}
                            </div>
                            <div className='flex flex-row gap-2 items-center'>
                              <FaTags />
                              {item.no_pengajuan}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* RIGHT */}
                    <div className="text-right">
                      <div className="text-blue-900 font-bold text-sm">
                        {formatRupiah(item.nominal_dpp)}
                      </div>

                      <div className="text-xs text-gray-400">
                        {formatDate(item.created_at)}
                      </div>
                    </div>

                  </div>

                  {/* DETAIL */}
                  <div className="flex flex-wrap gap-5 mt-4 text-xs text-gray-600">

                    <div className="flex items-center gap-1">
                      <FaUserTag />
                      {item?.jabatan}
                    </div>

                    <div className="flex items-center gap-1">
                      <FaListCheck />
                      {item?.jenis_biaya}
                    </div>

                  </div>

                </div>
              </div>
            ))
            :
            <div className="col-span-full flex flex-col items-center justify-center py-6 text-center">
              <div
                className="
                  flex h-24 w-24 items-center justify-center
                  rounded-full
                  bg-blue-50
                  border border-blue-100
                  shadow-sm
                "
              >
                <FaInbox className="text-5xl text-blue-400" />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-gray-700">
                Tidak ada data
              </h3>
            </div>
          }

        </div>

        {/* ================= PAGINATION ================= */}
        {dataPengajuan?.length > 0 && (
          <div className="overflow-auto pb-2 justify-center flex mt-5">

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
    </>
  );
}

const cardStyle = {
  backgroundImage: `
        linear-gradient(
            rgba(255,255,255,0.75),
            rgba(255,255,255,0.75)
        ),
        url(${BgModal})
    `,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};