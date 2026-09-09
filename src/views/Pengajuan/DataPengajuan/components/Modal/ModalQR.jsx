import React, { useEffect, useState } from 'react'
// import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import { Modal } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux';

import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoInformationCircleOutline,
} from 'react-icons/io5';

import BgModal from 'assets/BgModal.svg';

import { swal } from 'global/helper/swal';

import {
  setToggleModal
} from '../../../../../redux/n2n/global';

import {
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaComment,
  FaCommentAlt,
  FaFileAlt,
  FaFileInvoiceDollar,
  FaHashtag,
  FaListAlt,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaPercent,
  FaRegFileAlt,
  FaTimesCircle,
  FaUser,
  FaUserTag,
} from 'react-icons/fa';

import { HiOutlineTicket } from 'react-icons/hi';

import QRCodeWithLogo from 'components/atoms/QRCodeWithLogo';
import storeSchema from 'global/store';
import { formatCurrency } from 'global/helper/formatCurrency';
import LOGO_LOGIN from 'assets/LOGO_FIX.png';

const ModalQr = () => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);
  const [data, setData] = useState()

  const handleRefresh = async () => {
    swal.loading()

    swal.close();
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
    if (toggleModal?.status && toggleModal?.modal === 'modalQr') {
      getDetailStatus()
    }
  }, [toggleModal])

  const detailData = [
    {
      label: "No. Pengajuan",
      value: data?.no_pengajuan || '-',
      icon: <FaHashtag />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Tanggal Pengajuan",
      value: data?.tgl_pengajuan || '-',
      icon: <FaCalendarAlt />,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Nama Pemohon",
      value: data?.nama_pemohon || '-',
      icon: <FaUser />,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Jabatan",
      value: data?.jabatan || '-',
      icon: <FaUserTag />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "Profit Center",
      value: data?.cabang || '-',
      icon: <FaBuilding />,
      color: "bg-orange-100 text-orange-700",
    },
    {
      label: "Jenis Biaya",
      value: data?.jenis_biaya || '-',
      icon: <FaListAlt />,
      color: "bg-cyan-100 text-cyan-700",
    },
    // {
    //   label: "Account Description",
    //   value: "10020 - Gaji Komisaris",
    //   icon: <FaRegFileAlt />,
    //   color: "bg-indigo-100 text-indigo-700",
    // },
    {
      label: "Nominal DPP",
      value: formatCurrency(data?.nominal_dpp) || '-',
      icon: <FaMoneyBillWave />,
      color: "bg-emerald-100 text-emerald-700",
    },
    // {
    //   label: "Tipe PPN",
    //   value: "Include PPN",
    //   icon: <FaPercent />,
    //   color: "bg-pink-100 text-pink-700",
    // },
    {
      label: "PPN",
      value: `${data?.ppn || '0'}% (${formatCurrency(data?.nominal_ppn) || '-'})`,
      icon: <FaPercent />,
      color: "bg-rose-100 text-rose-700",
    },
    {
      label: "Nilai PPh",
      value: `${data?.pph || '0'}% (${formatCurrency(data?.nominal_pph) || '-'})`,
      icon: <FaPercent />,
      color: "bg-fuchsia-100 text-fuchsia-700",
    },
    {
      label: "Nomor Kasbon SAP",
      value: data?.no_kasbon_sap || '-',
      icon: <FaFileInvoiceDollar />,
      color: "bg-red-100 text-red-700",
    },
    {
      label: "Nomor Invoice",
      value: data?.no_invoice || '-',
      icon: <FaFileInvoiceDollar />,
      color: "bg-sky-100 text-sky-700",
    },
    {
      label: "Nomor Faktur Pajak",
      value: data?.no_faktur_pajak || '-',
      icon: <FaFileAlt />,
      color: "bg-teal-100 text-teal-700",
    },
    {
      label: "Nomor Voucher SAP",
      value: data?.no_voucher_sap || '-',
      icon: <HiOutlineTicket />,
      color: "bg-violet-100 text-violet-700",
    },
    // {
    //   label: "Metode Pembayaran",
    //   value: "Transfer Bank",
    //   icon: <FaMoneyCheckAlt />,
    //   color: "bg-lime-100 text-lime-700",
    // },

    // CARD BERWARNA
    {
      label: data?.kd_status === 'T' ? "Tanggal Ditolak" : "Tanggal Disetujui",
      value: data?.tanggal_aksi || '-',
      icon: data?.kd_status === 'T' ? <FaTimesCircle /> : <FaCheckCircle />,
      color: data?.kd_status === 'T' ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700",
      highlight: data?.kd_status === 'T' ? "bg-red-200 border-red-200" : "bg-green-200 border-green-200"
    },
    {
      label: "Catatan",
      value: data?.catatan_aksi || '-',
      icon: <FaComment />,
      color: data?.kd_status === 'T' ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700",
      highlight: data?.kd_status === 'T' ? "bg-red-200 border-red-200" : "bg-green-200 border-green-200"
    },
    {
      label: data?.kd_status === 'T' ? "Ditolak Oleh" : "Disetujui Oleh",
      value: (
        <>
          {data?.aktor_aksi.split('- ')[1] || '-'}
          <br />

          <span className="text-gray-400 text-xs">
            {data?.user_jabatan_aksi}
          </span>
          <hr className='border-black'/>
          <span className="text-gray-400 text-xs">
            {data?.unit_kerja_aksi ?? data?.cabang}
          </span>
        </>
      ),
      icon: data?.kd_status === 'T' ? <FaTimesCircle /> : <FaCheckCircle />,
      color: data?.kd_status === 'T' ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700",
      highlight: data?.kd_status === 'T' ? "bg-red-200 border-red-200" : "bg-green-200 border-emerald-200"
    },
  ]

  return (
    <Modal
      title="Validasi Approval (QrCode)"
      iconTitle={
        data?.kd_status === 'T' ? <IoCloseCircleSharp className='text-red-500 text-3xl' /> : <IoCheckmarkCircleSharp className='text-green-500 text-3xl' />
      }
      modal={"modalQr"}
      size={"w-11/12 max-w-6xl"}
      scroll={false}
    >

      <div>

        {/* CONTENT */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT */}
          <div className="relative flex-1 p-5 bg-gradient-to-br from-slate-100 via-white to-slate-100 rounded-3xl border shadow-sm overflow-hidden">

            {/* BACKGROUND ICON */}
            {data?.kd_status === 'T' ? (
              <FaTimesCircle className="absolute -top-10 -right-10 text-red-500 text-[180px] opacity-10 pointer-events-none" />
            ) : (
              <FaCheckCircle className="absolute -top-10 -right-10 text-green-500 text-[180px] opacity-10 pointer-events-none" />
            )}

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

              {detailData.map((item, i) => (

                <div
                  key={i}
                  className={`
                    relative
                    flex items-start gap-3
                    p-4
                    rounded-2xl
                    border
                    shadow-lg
                    ${data?.kd_status === 'T' ? 'hover:shadow-red-500' : 'hover:shadow-green-500'}
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    ${item?.highlight || 'bg-white/40 backdrop-blur-sm border-white/30'}
                    ${['Disetujui Oleh', 'Ditolak Oleh'].includes(item?.label) ? 'col-span-2' : ''}
                  `}
                >

                  {/* ICON */}
                  <div
                    className={`
                      min-w-[44px]
                      h-[44px]
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      text-lg
                      shadow-sm
                      ${item.color}
                    `}
                  >
                    {item.icon}
                  </div>

                  {/* TEXT */}
                  <div className="flex-1 overflow-hidden">

                    <p className="text-xs text-gray-500 mb-1">
                      {item.label}
                    </p>

                    <div className="text-sm font-semibold text-gray-800 break-words leading-relaxed">
                      {item.value}
                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* KETERANGAN */}
            <div className="mt-5 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center gap-3 mb-3">

                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                  <FaFileAlt className="text-blue-700 text-lg" />
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

              <div className="bg-white/70 border border-white/40 rounded-2xl p-4 text-sm text-gray-700 leading-relaxed">

                {data?.keterangan}

              </div>

            </div>

            {/* INFO */}
            <div className="mt-5 flex items-center gap-3 bg-blue-50/80 backdrop-blur-sm border border-blue-100 rounded-2xl px-4 py-4 text-sm text-blue-700">

              <IoInformationCircleOutline className="text-2xl min-w-[24px]" />

              <div>
                Dokumen ini merupakan bukti persetujuan pengajuan dan telah
                tervalidasi oleh sistem Cost Tracking.
              </div>

            </div>

          </div>

          {/* RIGHT QR */}
          <div className="w-full lg:w-72">

            <div className="sticky top-0 border border-white/40 rounded-3xl bg-white/70 backdrop-blur-md shadow-xl p-6 flex flex-col items-center">

              <div className={`w-16 h-16 rounded-2xl ${data?.kd_status === 'T' ? 'bg-red-100' : 'bg-green-100'} flex items-center justify-center mb-4`}>
                {data?.kd_status === 'T' ? (
                  <FaTimesCircle className="text-3xl text-red-600" />
                ) : (
                  <FaCheckCircle className="text-3xl text-green-600" />
                )}

              </div>

              <h3 className="text-lg font-bold text-gray-800 text-center">
                QR Validasi
              </h3>

              <p className="text-sm text-gray-500 text-center mt-1 mb-5">
                Scan QR untuk validasi approval pengajuan
              </p>

              <div className="bg-white p-4 rounded-2xl border shadow-sm">

                <QRCodeWithLogo
                  value={data?.qrcode}
                  size={170}
                  logoUrl={LOGO_LOGIN}
                  logoSize={40}
                />

              </div>

              <div className="mt-5 text-center">

                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  Reference ID
                </p>

                <p className="text-sm font-bold text-blue-700 mt-1">
                  {data?.no_pengajuan}
                </p>

              </div>

            </div>

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

export default ModalQr