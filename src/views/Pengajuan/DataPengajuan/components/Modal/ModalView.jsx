import React, { useEffect, useState } from 'react'
// import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import { AsyncSelect, Modal, Select } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux';
import { IoCalendarOutline, IoCheckmarkCircleSharp, IoCloseCircleSharp, IoPerson } from 'react-icons/io5';
import { CgNotes } from "react-icons/cg";
import BgModal from 'assets/BgModal.svg';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
import { setToggleModal } from '../../../../../redux/n2n/global';
import { FaBalanceScale, FaBriefcase, FaBuilding, FaCalendar, FaCalendarAlt, FaCheckCircle, FaCommentDots, FaEye, FaFileAlt, FaFileExcel, FaFileImage, FaFileInvoiceDollar, FaFilePdf, FaFileUpload, FaFileWord, FaHashtag, FaListAlt, FaMoneyBillWave, FaPercent, FaPercentage, FaRegFileAlt, FaStore, FaTag, FaTags, FaTimesCircle, FaUser, FaUserAlt, FaUserTag, FaUserTie } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { formatCurrency } from 'global/helper/formatCurrency';
import { HiOutlineTicket } from 'react-icons/hi';
import CurrencyInput from 'components/atoms/CurrencyInput';
import { formatDate, formatDateJam } from 'global/helper/formatDate';

const ModalView = ({ loginAccess }) => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);
  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState([])
  const [coaRows, setCoaRows] = useState([])
  const [optCoaDetail, setOptCoaDetail] = useState([])

  const onSubmit = async () => {
    swal.loading()
    await dispatch(setToggleModal({ isOpen: false, modal: "" }));
    setTimeout(() => {
      swal.close()
      dispatch(setToggleModal({ isOpen: true, modal: "modalAfterApprove" }));
    }, 1000);
    // setOpenModal(true)
  }

  const getDetailPengajuan = async () => {
    try {
      swal.loading()
      const res = await storeSchema.actions.getDetailPengajuan(toggleModal?.pengajuan_id)
      if (res?.status === true) {
        swal.close()
        setData(res?.data)
        if (res?.data?.coa && res?.data?.coa.length > 0) {
          const coaData = res?.data?.coa?.map(v => (
            {
              pengajuan_coa_id: v?.pengajuan_coa_id,
              coa_id: v?.coa_id,
              ur_coa_id: v?.ur_coa_id,
              coa_detail_id: v?.coa_detail_id,
              ur_coa_detail_id: v?.ur_coa_detail_id,
              nominal: v?.nominal,
              sisa_anggaran: v?.sisa_anggaran,
              canEdit: false
            }
          ))
          setCoaRows(coaData)
        } else {
          setCoaRows([])
        }
      } else {
        swal.error(res?.message || 'Gagal mendapatkan data pengajuan')
      }
    } catch (error) {
      swal.error('Terjadi kesalahan saat mendapatkan data pengajuan')
      console.error('Error fetching detail pengajuan:', error)
    }
  }

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

  useEffect(() => {
    if (toggleModal?.pengajuan_id && toggleModal?.modal === 'modalView') {
      getDetailPengajuan()
    }
  }, [toggleModal])

  return (
    <Modal
      title="View Detail Pengajuan"
      // iconTitle={<IoCheckmarkCircleSharp className='text-green-500 text-3xl' />}
      modal={"modalView"}
      size={"w-11/12 max-w-5xl"}
      // size={"w-11/12 max-w-5xl"}
      scroll={false}
    >
      <div className="">

        <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-900 from-[70%] to-blue-700 px-6 py-5 text-white flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold tracking-wide">
                {data?.pembetulan_ke > 0 ? 'Perbaikan' : 'Detail'} Pengajuan
              </h2>

              <p className="text-sm text-blue-100 mt-1">
                Informasi lengkap data pengajuan biaya
              </p>
            </div>

            <div className="rounded-2xl bg-white/20 flex items-center justify-center">
              <div className="px-4 py-3 whitespace-nowrap flex flex-col gap-2">
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
                  <FaBuilding /> {data?.status_unit}
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
                                                  ${statusBadge(data?.kd_status ?? null)}
                                                  hover:scale-110 transition
                                                `}
                >
                  <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
                  {data?.status_kegiatan}
                  <span className="
                                                inline-flex items-center gap-2
                                                  px-3 py-1
                                                  rounded-full
                                                  text-xs font-semibold 
                                                  bg-white
                                                  text-black
                                                ">
                    {data?.status_pengajuan ?? "Proses"}
                  </span>
                </span>
              </div>
            </div>

          </div>

          {/* BODY */}
          {data?.kd_status === 'T' && (
            <div
              className="
                  bg-red-50
                  border-l-4
                  border-red-500
                  rounded-xl
                  p-5
                  m-5
                  shadow-sm
                "
            >

              <div className="flex items-center gap-3 mb-4">

                <FaTimesCircle className="text-red-600 text-2xl" />

                <div>
                  <h5 className="font-semibold text-red-700">
                    Pengajuan Ditolak
                  </h5>

                  <p className="text-sm text-red-500">
                    Pengajuan memerlukan perbaikan sebelum diajukan kembali.
                  </p>
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">

                <div
                  className="
                      flex items-center
                      gap-2
                      text-sm
                      text-gray-700
                    "
                >
                  <FaUserTie className="text-red-500" />
                  <span>
                    <strong>Ditolak Oleh :</strong>{" "}
                    {data?.ur_role_id}
                  </span>
                </div>

                <div
                  className="
                      flex items-center
                      gap-2
                      text-sm
                      text-gray-700
                    "
                >
                  <FaCalendarAlt className="text-red-500" />
                  <span>
                    <strong>Tanggal :</strong>{" "}
                    {data?.date_status || '-'}
                  </span>
                </div>

              </div>

              <div
                className="
                    bg-white
                    border
                    border-red-200
                    rounded-lg
                    p-4
                  "
              >

                <div
                  className="
                      flex items-center
                      gap-2
                      mb-2
                      text-red-600
                      font-medium
                    "
                >
                  <FaCommentDots />
                  Catatan Penolakan
                </div>

                <p className="text-gray-700 whitespace-pre-line">
                  {data?.notes || ''}
                </p>

              </div>

            </div>
          )}
          {data?.history_penolakan?.length > 0 && data?.kd_status !== 'T' && (
            <div
              className="
                                    bg-red-50
                                    border-l-4
                                    border-red-500
                                    rounded-xl
                                    p-5
                                    m-5
                                    shadow-sm
                                  "
            >

              <div className="flex items-center gap-3 mb-4">

                <FaTimesCircle className="text-red-600 text-2xl" />

                <div>
                  <h5 className="font-semibold text-red-700">
                    Pengajuan Pernah Ditolak
                  </h5>

                  <p className="text-sm text-red-500">
                    Berikut Catatan Penolakan
                  </p>
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">

                <div
                  className="
                                        flex items-center
                                        gap-2
                                        text-sm
                                        text-gray-700
                                      "
                >
                  <FaUserTie className="text-red-500" />
                  <span>
                    <strong>Ditolak Oleh :</strong>{" "}
                    {data?.history_penolakan[0]?.ur_role_id}
                  </span>
                </div>

                <div
                  className="
                                        flex items-center
                                        gap-2
                                        text-sm
                                        text-gray-700
                                      "
                >
                  <FaCalendarAlt className="text-red-500" />
                  <span>
                    <strong>Tanggal :</strong>{" "}
                    {formatDateJam(data?.history_penolakan[0]?.created_at) || '-'}
                  </span>
                </div>

              </div>

              <div
                className="
                                      bg-white
                                      border
                                      border-red-200
                                      rounded-lg
                                      p-4
                                    "
              >

                <div
                  className="
                                        flex items-center
                                        gap-2
                                        mb-2
                                        text-red-600
                                        font-medium
                                      "
                >
                  <FaCommentDots />
                  Catatan Penolakan
                </div>

                <p className="text-gray-700 whitespace-pre-line">
                  {data?.history_penolakan[0]?.catatan || ''}
                </p>

              </div>

            </div>
          )}

          <div className="p-6 bg-gray-50">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                    <FaCalendar className="text-red-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Tanggal Pengajuan
                    </p>

                    <h3 className="font-bold text-red-700 text-md">
                      {formatDate(data?.created_at) || '-'}
                    </h3>
                  </div>

                </div>

              </div>
              {/* NOMOR PENGAJUAN */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                    <FaTag className="text-blue-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Nomor Pengajuan
                    </p>

                    <h3 className="text-md font-semibold text-gray-800">
                      {data?.no_pengajuan || '-'}
                    </h3>
                  </div>

                </div>

              </div>

              {/* NAMA PEMOHON */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                    <FaUserAlt className="text-green-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Nama Pemohon
                    </p>

                    <h3 className="text-md font-semibold text-gray-800">
                      {data?.nama_pemohon || '-'}
                    </h3>
                  </div>

                </div>

              </div>

              {/* JABATAN */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                    <FaBriefcase className="text-purple-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Jabatan
                    </p>

                    <h3 className="text-md font-semibold text-gray-800">
                      {data?.ur_jabatan_id || '-'}
                    </h3>
                  </div>

                </div>

              </div>

              {/* CABANG */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                    <FaBuilding className="text-orange-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Cabang
                    </p>

                    <h3 className="text-md font-semibold text-gray-800">
                      {data?.ur_cabang_id || '-'}
                    </h3>
                  </div>

                </div>

              </div>
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                    <FaBuilding className="text-orange-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Sub Unit
                    </p>

                    <h3 className="text-md font-semibold text-gray-800">
                      {data?.unit_kerja_pemohon || '-'}
                    </h3>
                  </div>

                </div>

              </div>

              {/* JENIS BIAYA */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-cyan-100 flex items-center justify-center">
                    <FaListAlt className="text-cyan-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Jenis Biaya
                    </p>

                    <h3 className="text-md font-semibold text-gray-800">
                      {data?.ur_jenis_biaya_id || '-'}
                    </h3>
                  </div>

                </div>

              </div>

              {/* NOMINAL DPP */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <FaMoneyBillWave className="text-emerald-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Nominal DPP
                    </p>

                    <h3 className="font-bold text-emerald-700 text-md">
                      {formatCurrency(data?.nominal_dpp) || '-'}
                    </h3>
                  </div>

                </div>

              </div>

              {/* PPN */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center">
                    <FaPercentage className="text-pink-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Jenis PPN
                    </p>

                    <h3 className="font-bold text-pink-700 text-md">
                      {data?.tipe_ppn === 'exclude' ? 'PPN WAPU' : data?.tipe_ppn === 'include' ? 'PPN Non-WAPU' : '-'}
                    </h3>
                  </div>

                </div>

              </div>
              {/* PPN */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center">
                    <FaPercent className="text-pink-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      PPN ({parseFloat(data?.ppn ?? 0)?.toFixed(1) || '0'}%)
                    </p>

                    <h3 className="font-bold text-pink-700 text-md">
                      {formatCurrency(data?.nominal_ppn) || '-'}
                    </h3>
                  </div>

                </div>

              </div>

              {/* VOUCHER SAP */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <HiOutlineTicket className="text-indigo-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Nomor Voucher SAP
                    </p>

                    <h3 className="text-md font-semibold text-gray-800">
                      {data?.no_voucher_sap || '-'}
                    </h3>
                  </div>

                </div>

              </div>
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <HiOutlineTicket className="text-indigo-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Nomor Kasbon SAP
                    </p>

                    <h3 className="text-md font-semibold text-gray-800">
                      {data?.no_kasbon_sap || '-'}
                    </h3>
                  </div>

                </div>

              </div>

              {/* NOMOR INVOICE */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
                    <FaFileAlt className="text-amber-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Nomor Invoice
                    </p>

                    <h3 className="text-md font-semibold text-gray-800">
                      {data?.no_invoice || '-'}
                    </h3>
                  </div>

                </div>

              </div>

              {/* NOMOR FAKTUR PAJAK */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center">
                    <FaFilePdf className="text-rose-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Nomor Faktur Pajak
                    </p>

                    <h3 className="text-md font-semibold text-gray-800">
                      {data?.no_faktur_pajak || '-'}
                    </h3>
                  </div>

                </div>

              </div>

              {/* PPH */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
                    <FaPercent className="text-violet-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      PPh ({parseFloat(data?.pph ?? 0)?.toFixed(1) || '0'}%)
                    </p>

                    <h3 className="font-bold text-violet-700 text-md">
                      {formatCurrency(data?.nominal_pph) || '-'}
                    </h3>
                  </div>

                </div>

              </div>
              {/* Vendor */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
                    <FaStore className="text-violet-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Nama Vendor
                    </p>

                    <h3 className="font-bold text-violet-700 text-md">
                      {data?.nama_vendor}
                    </h3>
                  </div>

                </div>

              </div>

              {/* NILAI DIBAYARKAN */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                    <FaMoneyBillWave className="text-red-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Nominal Dibayarkan
                    </p>

                    <h3 className="font-bold text-red-700 text-md">
                      {formatCurrency(data?.total_dibayarkan) || '-'}
                    </h3>
                  </div>

                </div>

              </div>
              {/* TANGGAL PEMBAYARAN */}
              {/* {data?.kd_status === 'S2' && ( */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                    <FaCalendar className="text-red-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Tanggal Pembayaran
                    </p>

                    <h3 className="font-bold text-red-700 text-md">
                      {formatDate(data?.tgl_pembayaran) || '-'}
                    </h3>
                  </div>

                </div>

              </div>
              {/* )} */}
              {/* Voucher Payment */}
              <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center">
                    <FaTags className="text-rose-700 text-lg" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      No Voucher Payment
                    </p>

                    <h3 className="text-md font-semibold text-gray-800">
                      {data?.no_voucher_payment || '-'}
                    </h3>
                  </div>

                </div>

              </div>

            </div>

            {/* KETERANGAN */}
            <div className="mt-5 bg-white rounded-2xl border shadow-sm p-5">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center">
                  <FaCommentDots className="text-sky-700 text-lg" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase">
                    Keterangan Pengajuan
                  </p>

                  <h3 className="font-semibold text-gray-800">
                    Detail Keterangan
                  </h3>
                </div>

              </div>

              <div className="bg-gray-50 border rounded-2xl p-4 text-gray-700 leading-relaxed">

                {data?.keterangan || '-'}

              </div>

            </div>

            {/* FILE LAMPIRAN */}
            <div className="mt-5 bg-white rounded-2xl border shadow-sm p-5">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-11 h-11 rounded-xl bg-gray-200 flex items-center justify-center">
                  <FaFileUpload className="text-gray-700 text-lg" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase">
                    Lampiran File
                  </p>

                  <h3 className="font-semibold text-gray-800">
                    Dokumen Pengajuan
                  </h3>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-3 overflow-auto pt-3">
                {data?.lampiran && data?.lampiran.length > 0 && data?.lampiran?.map((v, i) => (
                  <div className="indicator">
                    {v?.jenis_user === 'Pemohon' && (
                      <span className="text-white indicator-item badge badge-primary text-xs">
                        {v?.jenis_user}
                      </span>
                    )}
                    {v?.jenis_user === 'Approval' && (
                      <span className="text-white indicator-item badge badge-success text-xs">
                        Logistik
                      </span>
                    )}
                    <div className="flex items-center justify-between border rounded-xl px-3 py-2 bg-gray-50 hover:bg-gray-100 transition">

                      <div className="flex items-center gap-3 min-w-0">

                        <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                          {['pdf'].includes(v?.nama_dokumen.split(".")[((v?.nama_dokumen.split(".").length) - 1)]) && (
                            <FaFilePdf className="text-red-500 text-lg" />
                          )}
                          {['doc', 'docx', 'rtf'].includes(v?.nama_dokumen.split(".")[((v?.nama_dokumen.split(".").length) - 1)]) && (
                            <FaFileWord className="text-blue-500 text-lg" />
                          )}
                          {['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'].includes(v?.nama_dokumen.split(".")[((v?.nama_dokumen.split(".").length) - 1)]) && (
                            <FaFileImage className="text-blue-500 text-lg" />
                          )}
                          {['xls', 'xlsx'].includes(v?.nama_dokumen.split(".")[((v?.nama_dokumen.split(".").length) - 1)]) && (
                            <FaFileExcel className="text-green-500 text-lg" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-sm text-gray-800 truncate">
                            {v?.nama_dokumen || '-'}
                          </p>

                          <p className="text-xs text-gray-500">
                            {v?.created_at || '-'}
                          </p>
                        </div>

                      </div>

                      <button className="ml-2 w-8 h-8 rounded-lg hover:bg-white hover:text-blue-700 flex items-center justify-center transition flex-shrink-0" onClick={() => window.open(v?.url_file, '_blank')}>
                        <FaEye className="text-gray-400 text-sm hover:text-blue-700" />
                      </button>

                    </div>
                  </div>
                ))}

              </div>

            </div>

            {/* Account Description */}
            {/* {['RL07'].includes(loginAccess?.role_id) && ((['RL08'].includes(loginAccess?.role_id) && data?.jenis_biaya_id && data?.jenis_biaya_id?.substring(0, 2) === 'KC')) && ( */}
            <div className="mt-5 bg-white rounded-2xl border shadow-sm p-5">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-11 h-11 rounded-xl bg-gray-200 flex items-center justify-center">
                  <FaBalanceScale className="text-gray-700 text-lg" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase">
                    Account Description
                  </p>

                  <h3 className="font-semibold text-gray-800">
                    Deskripsi Coa Pengajuan
                  </h3>
                </div>

              </div>

              <div className={`overflow-x-auto transition`}>
                <table className="table table-xs">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>COA Detail</th>
                      <th>COA Header</th>
                      {/* <th>Sisa Anggaran</th> */}
                      <th>Nominal</th>
                    </tr>
                  </thead>

                  <tbody>
                    {coaRows?.map((row, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>
                          <input
                            type='text'
                            name='coa_detail'
                            className='input h-[40px] bg-white rounded-[25px] w-full'
                            value={row?.ur_coa_detail_id}
                            disabled={row?.canEdit ? false : true}
                          />
                          {/* <Select
                              options={optCoaDetail}
                              height={"20px"}
                              isDisabled={row?.canEdit === true ? false : true}
                              value={optCoaDetail.find((item) => item.value === row.coa_detail_id) || null}
                              onChange={(val) => {
                                const values = [...coaRows];
                                values[index].coa_detail_id = val?.value || '';
                                values[index].ur_coa_detail_id = val?.label || '';
                                setCoaRows(values);
                              }}
                              // onMenuOpen={handleDropdownOpen}
                              // onMenuClose={handleDropdownClose}
                              placeholder="Pilih COA Detail"
                              className={"min-w-[300px]"}
                            /> */}
                        </td>
                        <td>
                          <AsyncSelect
                            name="coa_id"
                            classNamePrefix="react-select"
                            placeholder="Ketik kata kunci"
                            defaultOptions={false}
                            cacheOptions
                            // onMenuOpen={handleDropdownOpen}
                            // onMenuClose={handleDropdownClose}
                            // menuPortalTarget={document.body}
                            isDisabled={row?.canEdit ? false : true}
                            value={row?.coa_id ? { label: row?.ur_coa_id, value: row?.coa_id } : null}
                            // onChange={(selectedOption) => handleChangeCoa(
                            //   { target: { name: 'coa_id', value: selectedOption?.value, label: selectedOption?.label, detail: selectedOption?.detail } },
                            //   index
                            // )}
                            loadOptions={(value, callBack) => {
                              const get = async () => {
                                try {
                                  const res = await storeSchema.actions.getListCoa(value.toUpperCase());
                                  const data = res?.data?.map((v) => {
                                    return {
                                      label: v?.header_coa,
                                      value: v?.coa_id,
                                      detail: v?.detail
                                    };
                                  });
                                  callBack(data);
                                } catch (err) {
                                  callBack([]);
                                }
                              };
                              get();
                            }}
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                minHeight: '20px',
                                minWidth: '200px',
                                borderRadius: '25px',
                                backgroundColor: row?.canEdit ? 'white' : '#DFDFDF', // neutral-300
                                // borderColor: '#d1d5db',  input-bordered approximation
                                fontSize: '0.875rem',
                              }),
                            }}
                          />
                        </td>
                        {/* <td>
                          <CurrencyInput
                            name='sisa_anggaran'
                            // size='-[20px]'
                            height={"h-[40px]"}
                            // onChange={(value, name) => {
                            //   handleChangeCurrencyCoa(value, name, index)
                            // }}
                            value={row?.sisa_anggaran}
                            disabled={true}
                          />
                        </td> */}
                        <td>
                          <CurrencyInput
                            name='nominal'
                            // size='-[20px]'
                            height={"h-[40px]"}
                            // onChange={(value, name) => {
                            //   handleChangeCurrencyCoa(value, name, index)
                            // }}
                            value={row?.nominal}
                            disabled={row?.canEdit ? false : true}
                          />
                        </td>
                      </tr>
                    ))}

                    {coaRows.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-4">
                          Tidak ada data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
            {/* )} */}

            {/* <div className="mt-5 bg-white border rounded-2xl p-5 shadow-sm">

              <h3 className="font-semibold mb-3">
                Catatan Verifikator
              </h3>

              <div className="flex flex-row w-full gap-3">
                <p className="text-gray-500 text-sm">
                  {data?.catatan_verifikator || 'Tidak ada catatan verifikator'}
                </p>
              </div>

            </div> */}

          </div>

        </div>

      </div>
    </Modal>
  )
}

const modalStyle = {
  backgroundImage: `url(${BgModal})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

export default ModalView