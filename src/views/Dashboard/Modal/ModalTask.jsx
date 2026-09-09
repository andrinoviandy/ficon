import React, { useEffect, useMemo, useState } from 'react'
import { Modal } from 'components/atoms'
import { useDispatch } from 'react-redux'
import BgModal from 'assets/bg_cito.jpeg';

import {
  FaTasks,
  FaClipboardList,
  FaUserAlt,
  FaExclamationTriangle,
  FaBuilding,
  FaClock,
  FaArrowRight,
  FaFire,
  FaFolderOpen,
  FaTags,
} from 'react-icons/fa'

import {
  IoWarningSharp
} from 'react-icons/io5'

import { setToggleModal } from '../../../redux/n2n/global'
import { swal } from 'global/helper/swal';
import storeSchema from 'global/store';
import { formatCurrency } from 'global/helper/formatCurrency';
import { formatDateJam } from 'global/helper/formatDate';
import { useLocation, useNavigate } from 'react-router-dom';

const ModalTask = () => {

  const dispatch = useDispatch()
  const location = useLocation();
  const navigation = useNavigate();
  // ======================================
  // PAGINATION
  // ======================================
  const [currentPage, setCurrentPage] = useState(1)
  const [taskData, setTaskData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)

  const perPage = 4

  const getListPengajuan = async () => {
    try {
      setTaskData([])
      setLoading(true);
      const response = await storeSchema.actions.getListPengajuanPriority({
        page: currentPage,
        limit: perPage,
        sortBy: "ASC",
      });

      if (response.status === true) {
        setTaskData(response?.data?.list_data);
        // setTotalData(response?.data?.total_data || 0);
        setTotalPage(
          Math.ceil((response?.data?.total_data || 0) / perPage)
        )
        // setTotalPage(response?.data?.total_halaman || 0);
      }
    } catch (error) {
      console.error("Error fetching pengajuan data:", error);
      swal.error("Gagal mengambil data pengajuan");
    } finally {
      setLoading(false);
    }
  };
  // ======================================
  // DATA PRIORITAS
  // ======================================
  // const taskData = [
  //   {
  //     nama: 'Andri Noviandy',
  //     cabang: 'Jakarta Selatan',
  //     nominal: 'Rp 15.000.000',
  //     tanggal: '24 Mei 2026 • 09:20',
  //     jabatan: 'Staff Finance',
  //     jenis: 'Door To Door',
  //     keterlambatan: 'Terlambat 3 Hari'
  //   },
  //   {
  //     nama: 'Budi Santoso',
  //     cabang: 'Bandung',
  //     nominal: 'Rp 8.500.000',
  //     tanggal: '24 Mei 2026 • 08:10',
  //     jabatan: 'Tax Officer',
  //     jenis: 'Kasbon',
  //     keterlambatan: 'Terlambat 2 Hari'
  //   },
  //   {
  //     nama: 'Rina Amelia',
  //     cabang: 'Surabaya',
  //     nominal: 'Rp 20.000.000',
  //     tanggal: '23 Mei 2026 • 07:30',
  //     jabatan: 'Supervisor',
  //     jenis: 'Biaya Umum',
  //     keterlambatan: 'Terlambat 5 Hari'
  //   },
  //   {
  //     nama: 'Dewi Lestari',
  //     cabang: 'Semarang',
  //     nominal: 'Rp 4.500.000',
  //     tanggal: '23 Mei 2026 • 18:20',
  //     jabatan: 'Admin Cabang',
  //     jenis: 'Biaya Memo SDM',
  //     keterlambatan: 'Terlambat 1 Hari'
  //   },
  //   {
  //     nama: 'Ahmad Fauzi',
  //     cabang: 'Jakarta Barat',
  //     nominal: 'Rp 12.000.000',
  //     tanggal: '22 Mei 2026 • 15:00',
  //     jabatan: 'Tax Staff',
  //     jenis: 'Vendor',
  //     keterlambatan: 'Terlambat 4 Hari'
  //   },
  //   {
  //     nama: 'Siti Nurhaliza',
  //     cabang: 'Bekasi',
  //     nominal: 'Rp 18.000.000',
  //     tanggal: '22 Mei 2026 • 13:00',
  //     jabatan: 'Staff Gudang',
  //     jenis: 'Biaya Pengiriman',
  //     keterlambatan: 'Terlambat 2 Hari'
  //   },
  //   {
  //     nama: 'Yoga Pratama',
  //     cabang: 'Depok',
  //     nominal: 'Rp 7.000.000',
  //     tanggal: '21 Mei 2026',
  //     jabatan: 'Marketing',
  //     jenis: 'Biaya Memo SDM',
  //     keterlambatan: 'Terlambat 6 Hari'
  //   },
  //   {
  //     nama: 'Fajar Ramadhan',
  //     cabang: 'Bogor',
  //     nominal: 'Rp 2.500.000',
  //     tanggal: '21 Mei 2026',
  //     jabatan: 'Kasir',
  //     jenis: 'Biaya Listrik',
  //     keterlambatan: 'Terlambat 2 Hari'
  //   },
  //   {
  //     nama: 'Rizky Maulana',
  //     cabang: 'Tangerang',
  //     nominal: 'Rp 5.500.000',
  //     tanggal: '20 Mei 2026',
  //     jabatan: 'Driver',
  //     jenis: 'Swakelola',
  //     keterlambatan: 'Terlambat 7 Hari'
  //   },
  //   {
  //     nama: 'Dimas Saputra',
  //     cabang: 'Yogyakarta',
  //     nominal: 'Rp 50.000.000',
  //     tanggal: '20 Mei 2026',
  //     jabatan: 'Manager',
  //     jenis: 'Biaya Outsourching',
  //     keterlambatan: 'Terlambat 5 Hari'
  //   },
  // ]

  // ======================================
  // PAGINATION
  // ======================================
  // const totalPage = Math.ceil(taskData.length / perPage)

  // const paginatedData = useMemo(() => {

  //   return taskData.slice(
  //     (currentPage - 1) * perPage,
  //     currentPage * perPage
  //   )

  // }, [currentPage])

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

  useEffect(() => {
    getListPengajuan()
  }, [currentPage])

  return (

    <Modal
      title="Task Prioritas"
      iconTitle={
        <IoWarningSharp className='text-red-500 text-3xl' />
      }

      modal={"modalTask"}

      size={"w-11/12 max-w-7xl"}

      scroll={false}

      buttonFooter={
        <div className="flex justify-end gap-2">

          <button
            onClick={() =>
              dispatch(
                setToggleModal({
                  isOpen: false,
                  modal: ""
                })
              )
            }
            className="btn px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 border-none"
          >
            Tutup
          </button>

        </div>
      }
    >

      <div className="bg-gradient-to-b from-red-50 to-white p-5 rounded-2xl border border-red-100">
        {loading ? (

          <div className="flex flex-col items-center justify-center py-24">

            <span className="loading loading-spinner loading-lg text-red-500"></span>

            <p className="mt-4 text-gray-500 text-sm">
              Memuat data task...
            </p>

          </div>

        ) : (
          <>
            {/* ================= HEADER ================= */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

              {/* LEFT */}
              <div className="flex items-start gap-4">

                <div className="bg-gradient-to-br from-red-500 to-red-700 text-white p-4 rounded-2xl shadow-lg">

                  <FaFire className="text-2xl" />

                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h1 className="text-2xl font-bold text-gray-800">
                      Data Yang Harus Segera Diselesaikan
                    </h1>

                    <FaExclamationTriangle className="text-red-500" />

                  </div>

                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">

                    Terdapat beberapa pengajuan yang sudah melewati
                    batas waktu proses dan harus segera ditindaklanjuti.

                  </p>

                </div>

              </div>

              {/* RIGHT */}
              <div className="bg-red-500 text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3 w-fit">

                <FaTasks className="text-xl" />

                <div className='flex flex-row gap-3'>

                  <div className="text-xl font-bold">
                    {taskData.length} Task
                  </div>

                  {/* <div className="text-xs text-red-100">
                    Total Task
                  </div> */}

                </div>

              </div>

            </div>

            {/* ================= LIST ================= */}
            {taskData?.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                {taskData?.map((item, index) => (

                  <div
                    key={index}
                    className="
                relative bg-white border border-gray-200
                rounded-2xl p-5 shadow-md transition-all
                hover:shadow-red-200
              "
                  // style={item?.jenis === 'Door To Door' ? cardStyle : {}}
                  >

                    {/* PRIORITY DOT */}
                    <div
                      className="
                  absolute -left-2 top-6
                  w-4 h-4 rounded-full shadow-md
                  bg-red-500
                "
                    ></div>

                    {/* TOP */}
                    <div className="flex justify-between items-start gap-4">

                      <div>

                        <div className="font-bold text-gray-800 text-[16px]">
                          {item.nama_pemohon}
                        </div>

                        <div className='flex flex-wrap gap-5'>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">

                            <FaBuilding />

                            {item.cabang}

                          </div>
                          <div className="flex items-center font-bold text-primary gap-2 text-xs mt-2">

                            <FaTags />

                            {item.no_pengajuan}

                          </div>
                        </div>

                      </div>

                      <div className="text-right">

                        <div className="text-red-600 font-bold text-lg">
                          {formatCurrency(item.nominal_dpp)}
                        </div>

                        <div className="text-xs text-gray-400 mt-1">
                          {formatDateJam(item.created_at)}
                        </div>

                      </div>

                    </div>

                    {/* DETAIL */}
                    <div className="mt-5 flex flex-wrap gap-4 text-xs">

                      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl text-gray-700">

                        <FaUserAlt />

                        {item.jabatan}

                      </div>

                      <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl text-blue-700">

                        <FaClipboardList />

                        {item.jenis_biaya}

                      </div>

                      <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-xl text-red-600 font-semibold">

                        <FaClock />

                        {item.keterlambatan}

                      </div>

                    </div>

                    {/* FOOTER */}
                    <div className="mt-5 flex justify-end">

                      <button
                        className="
                    flex items-center gap-2
                    bg-gradient-to-r from-blue-900 to-blue-700
                    hover:from-blue-800 hover:to-blue-600
                    text-white px-4 py-2 rounded-xl
                    text-sm shadow-md transition-all
                  "
                        onClick={() => navigation('/approval-pengajuan', {
                          state: {
                            ...location.state,
                            project: 'Approval Pengajuan',
                            no_pengajuan: item?.no_pengajuan,
                          },
                        })}
                      >

                        Kerjakan Sekarang

                        <FaArrowRight className="text-xs" />

                      </button>

                    </div>

                  </div>

                ))}

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaFolderOpen className="text-5xl text-gray-400" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-700">
                  Belum Ada Task Prioritas
                </h3>

                <p className="mt-2 text-sm text-gray-500 text-center max-w-md leading-relaxed">
                  Saat ini tidak ada pengajuan yang memerlukan tindakan segera.
                  Semua task prioritas telah selesai diproses.
                </p>
              </div>
            )}
            {/* ================= PAGINATION ================= */}
            {taskData.length > 0 && (
              <div className="flex justify-center mt-8 gap-2 flex-wrap">

                <button
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage <= 1}
                  className="
    px-4 py-2 rounded-full border bg-white
    hover:bg-gray-100 disabled:opacity-50
  "
                >
                  {"<"}
                </button>

                {Array.from({ length: totalPage }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`
      px-4 py-2 rounded-full text-sm transition-all
      ${currentPage === i + 1
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-white border hover:bg-gray-100"
                      }
    `}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage >= totalPage}
                  className="
    px-4 py-2 rounded-full border bg-white
    hover:bg-gray-100 disabled:opacity-50
  "
                >
                  {">"}
                </button>

              </div>
            )}
          </>
        )}

      </div>

    </Modal >

  )
}

export default ModalTask