import React, { useEffect, useState } from 'react'
import { Modal } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux'

import {
  IoCloseCircleSharp,
  IoInformationCircleOutline
} from 'react-icons/io5'

import BgModal from 'assets/BgModal.svg'

import storeSchema from 'global/store'
import { swal } from 'global/helper/swal'
import { setToggleModal } from '../../../../../redux/n2n/global'

import {
  FaBuilding,
  FaCalendarAlt,
  FaFileAlt,
  FaListAlt,
  FaMoneyBillWave,
  FaPercent,
  FaRegFileAlt,
  FaTimesCircle,
  FaUser,
  FaUserTag,
  FaFileInvoice,
  FaComment
} from 'react-icons/fa'

import { HiOutlineTicket } from 'react-icons/hi'
import { formatCurrency } from 'global/helper/formatCurrency'
import QRCodeWithLogo from 'components/atoms/QRCodeWithLogo'
import LOGO_LOGIN from 'assets/LOGO_FIX.png'

const ModalAfterReject = () => {

  const dispatch = useDispatch()
  const { toggleModal } = useSelector(state => state.global)
  const [data, setData] = useState()

  const handleRefresh = async () => {
    swal.loading()

    const res = await storeSchema.actions.getLogActivity(
      toggleModal?.dataX?.PROJECT_ID
    )

    if (res?.status) {
      swal.close()

      dispatch(
        setToggleModal({
          isOpen: true,
          modal: "logActivity",
          dataX: res?.data
        })
      )
    } else {
      swal.error(res?.message)
    }
  }

  const getDetailStatus = async () => {
    try {
      swal.loading()
      const res = await storeSchema.actions.getDetailStatus(toggleModal?.status)
      if (res?.status === true) {
        swal.close()
        setData(res?.data)
      } else {
        swal.error('Gagal Mendapatkan Data')
      }
    } catch (error) {
      swal.error('Terjadi Kesalahan Pada Server !')
      console.error('Error fetching detail pengajuan:', error)
    }
  }

  useEffect(() => {
    if (toggleModal?.status && toggleModal?.modal === 'modalAfterReject') {
      getDetailStatus()
    }
  }, [toggleModal])

  const detailData = [
    { label: "No. Pengajuan", value: data?.no_pengajuan, icon: <FaFileAlt />, color: "text-blue-600" },
    { label: "Tanggal Pengajuan", value: data?.tgl_pengajuan, icon: <FaCalendarAlt />, color: "text-yellow-600" },
    { label: "Nama Pemohon", value: data?.nama_pemohon, icon: <FaUser />, color: "text-green-600" },
    { label: "Jabatan", value: data?.jabatan || '-', icon: <FaUserTag />, color: "text-purple-600" },
    { label: "Cabang", value: data?.cabang, icon: <FaBuilding />, color: "text-orange-600" },
    { label: "Jenis Biaya", value: data?.jenis_biaya, icon: <FaListAlt />, color: "text-cyan-600" },
    // { label: "Account Description", value: data?.account_desc, icon: <FaRegFileAlt />, color: "text-pink-600" },
    { label: "Nomor Invoice", value: data?.no_invoice || '-', icon: <FaFileInvoice />, color: "text-indigo-600" },
    { label: "Nomor Faktur", value: data?.no_faktur || '-', icon: <FaFileInvoice />, color: "text-red-600" },
    { label: "Nomor Voucher SAP", value: data?.no_voucher_sap || '-', icon: <HiOutlineTicket />, color: "text-blue-800" },
    { label: "Nominal DPP", value: formatCurrency(data?.nominal_dpp) || '-', icon: <FaMoneyBillWave />, color: "text-emerald-600" },
    { label: "PPN", value: `${data?.ppn || '0'}% (${formatCurrency(data?.nominal_ppn) || '-'})`, icon: <FaPercent />, color: "text-pink-600" },
    { label: "PPh", value: `${data?.pph || '0'}% (${formatCurrency(data?.nominal_pph) || '-'})`, icon: <FaPercent />, color: "text-orange-600" },

    // highlight ONLY
    {
      label: "Catatan",
      value: data?.catatan_aksi || '-',
      icon: <FaComment />,
      color: 'bg-red-600 text-white',
      highlight: true
    },
    {
      label: "Tanggal Ditolak",
      value: data?.tanggal_aksi || '-',
      icon: <FaTimesCircle />,
      color: 'bg-red-600 text-white',
      highlight: true
    },
    {
      label: "Ditolak Oleh",
      color: 'bg-red-600 text-white',
      value: (
        <>
          {data?.aktor_aksi.split('- ')[1] || '-'}
          <br />
          <span className="text-xs">
            {data?.user_jabatan_aksi}
          </span>
          <hr className='border-black' />
          <span className="text-xs">
            {data?.unit_kerja_aksi ?? data?.cabang}
          </span>
        </>
      ),
      icon: <FaTimesCircle />,
      highlight: true
    },
  ]

  return (
    <Modal
      title="Pengajuan Ditolak"
      iconTitle={<IoCloseCircleSharp className='text-red-500 text-3xl' />}
      modal={"modalAfterReject"}
      size={"w-11/12 max-w-6xl"}
      scroll={false}
    >
      <div className="flex flex-col lg:flex-row gap-6">

        {/* LEFT */}
        <div className="relative flex-1 p-5 bg-gradient-to-br from-slate-100 via-white to-slate-100 rounded-3xl border shadow-sm overflow-hidden">

          <FaTimesCircle className="absolute -top-10 -right-10 text-red-500 text-[180px] opacity-10 pointer-events-none" />

          {/* GRID 3 COL */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            {detailData?.map((item, i) => (
              <div
                key={i}
                className={`
                  flex items-start gap-3 p-4 rounded-2xl border shadow-lg transition-all duration-300 hover:-translate-y-1
                  ${item.highlight
                    ? "bg-red-200 border-red-200"
                    : "bg-white/40 backdrop-blur-sm border-white/30"
                  }
                `}
              >
                <div className={`min-w-[44px] h-[44px] rounded-xl flex items-center justify-center text-lg shadow-sm ${item.color}`}>
                  {item.icon}
                </div>

                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <div className="text-sm font-semibold text-gray-800 break-words">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* REASON */}
          <div className="mt-5 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                <IoInformationCircleOutline className="text-red-600 text-lg" />
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">
                  Alasan Penolakan
                </p>
                <h3 className="font-semibold text-gray-800">
                  Detail Penolakan
                </h3>
              </div>
            </div>

            <div className="bg-white/70 border border-white/40 rounded-2xl p-4 text-sm text-gray-700">
              {data?.catatan_aksi}
            </div>

          </div>

        </div>

        {/* RIGHT QR */}
        <div className="w-full lg:w-72">

          <div className="sticky top-0 border border-white/40 rounded-3xl bg-white/70 backdrop-blur-md shadow-xl p-6 flex flex-col items-center">

            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mb-4">
              <FaTimesCircle className="text-3xl text-red-600" />
            </div>

            <h3 className="text-lg font-bold text-gray-800 text-center">
              QR Validasi
            </h3>

            <p className="text-sm text-gray-500 text-center mt-1 mb-5">
              Scan QR untuk validasi rejection
            </p>

            <div className="bg-white p-4 rounded-2xl border shadow-sm">
              <QRCodeWithLogo
                value={data?.qrcode}
                size={170}
                logoUrl={LOGO_LOGIN}
                logoSize={35}
              />
            </div>

            <div className="mt-5 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Reference ID
              </p>
              <p className="text-sm font-bold text-red-600 mt-1">
                {data?.no_pengajuan}
              </p>
            </div>

          </div>

        </div>

      </div>
    </Modal>
  )
}

export default ModalAfterReject