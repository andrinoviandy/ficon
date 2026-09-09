import React, { useState } from 'react'
import { Modal } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux'

import {
  IoCloseCircleSharp,
} from 'react-icons/io5'

import BgModal from 'assets/BgModal.svg'

import { swal } from 'global/helper/swal'

import { setToggleModal } from '../../../../../redux/n2n/global'

import {
  FaBuilding,
  FaFileAlt,
  FaHashtag,
  FaListAlt,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUser,
  FaBriefcase,
  FaPercent,
  FaFileInvoiceDollar,
  FaFilePdf,
  FaRegFileAlt,
  FaCheckCircle,
} from 'react-icons/fa'

import { HiOutlineTicket } from 'react-icons/hi'

import { formatCurrency } from 'global/helper/formatCurrency'

const ModalReject = () => {

  const dispatch = useDispatch()

  const { toggleModal } = useSelector(state => state.global)

  const [note, setNote] = useState("")

  const onSubmit = async () => {

    swal.loading()

    await dispatch(
      setToggleModal({
        isOpen: false,
        modal: ""
      })
    )

    setTimeout(() => {

      swal.close()

      dispatch(
        setToggleModal({
          isOpen: true,
          modal: "modalAfterReject"
        })
      )

    }, 1000)

  }

  const detailData = [
    {
      label: "No Pengajuan",
      value: "PNG-2026-000145",
      icon: <FaHashtag />,
    },
    {
      label: "Nama Pemohon",
      value: "Andri Noviandy",
      icon: <FaUser />,
    },
    {
      label: "Jabatan",
      value: "Staff Finance",
      icon: <FaBriefcase />,
    },
    {
      label: "Profit Center",
      value: "Jakarta Selatan",
      icon: <FaBuilding />,
    },
    {
      label: "Jenis Biaya",
      value: "Biaya Pengiriman",
      icon: <FaListAlt />,
    },
    {
      label: "Account Description",
      value: "10020 - Gaji Komisaris",
      icon: <FaRegFileAlt />,
    },
    {
      label: "Nominal DPP",
      value: formatCurrency(15000000),
      icon: <FaMoneyBillWave />,
      valueClass: "text-emerald-600 font-bold"
    },
    {
      label: "PPN",
      value: "11% (Rp 1.650.000)",
      icon: <FaPercent />,
      valueClass: "text-pink-600 font-bold"
    },
    {
      label: "PPh",
      value: "2% (Rp 300.000)",
      icon: <FaPercent />,
      valueClass: "text-orange-600 font-bold"
    },
    {
      label: "Nomor Invoice",
      value: "INV/OPS/V/2026/00125",
      icon: <FaFileInvoiceDollar />,
    },
    {
      label: "Nomor Faktur Pajak",
      value: "010.000-26.12345678",
      icon: <FaFilePdf />,
    },
    {
      label: "Voucher SAP",
      value: "SAP-VCH-889123",
      icon: <HiOutlineTicket />,
    },
  ]

  const fileLampiran = [
    {
      name: "Invoice.pdf",
      size: "1.2 MB",
    },
    {
      name: "Foto_Bukti.jpg",
      size: "800 KB",
    },
    {
      name: "Nota_Transport.png",
      size: "500 KB",
    },
    {
      name: "Dokumen_Lain.docx",
      size: "300 KB",
    },
    {
      name: "Rincian_Biaya.xlsx",
      size: "750 KB",
    },
    {
      name: "Bukti_Transfer.pdf",
      size: "1.1 MB",
    },
  ]

  return (
    <Modal
      title="Tolak Pengajuan"
      iconTitle={
        <IoCloseCircleSharp className='text-red-500 text-3xl' />
      }
      modal={"modalReject"}
      size={"w-11/12 max-w-5xl"}
      scroll={false}
      buttonFooter={
        <div className="flex justify-end gap-2">

          <button
            className="btn px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 border-0"
          >
            Batal
          </button>

          <button
            onClick={() => onSubmit()}
            className="btn px-5 py-2 rounded-full text-white flex items-center gap-2 bg-red-500 hover:bg-red-600 border-0"
          >
            <FaTimesCircle />
            Ya, Tolak
          </button>

        </div>
      }
    >

      <div>

        {/* HEADER STATUS */}
        <div className="mb-5">

          <div className="
            flex items-center justify-between
            bg-gradient-to-r from-red-500 to-rose-600
            rounded-2xl
            px-5 py-4
            text-white
            shadow-lg
          ">

            <div>

              <h1 className="text-lg font-bold">
                Tolak Pengajuan
              </h1>

              <p className="text-sm text-red-100 mt-1">
                Pastikan mengisi alasan penolakan agar dapat diperbaiki oleh pemohon
              </p>

            </div>

            <div className="
              w-14 h-14
              rounded-2xl
              bg-white/20
              flex items-center justify-center
            ">
              <FaTimesCircle className="text-3xl" />
            </div>

          </div>

        </div>

        {/* DETAIL */}
        <div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            {detailData.map((item, index) => (

              <div
                key={index}
                className="
                  flex items-center gap-3
                  p-3
                  rounded-2xl
                  border border-red-100
                  bg-white
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >

                {/* ICON */}
                <div className="
                  min-w-[42px]
                  h-[42px]
                  rounded-xl
                  bg-red-50
                  text-red-600
                  flex items-center justify-center
                  text-lg
                ">
                  {item.icon}
                </div>

                {/* CONTENT */}
                <div className="min-w-0">

                  <p className="text-xs text-gray-500">
                    {item.label}
                  </p>

                  <h3 className={`
                    text-sm
                    font-semibold
                    truncate
                    ${item?.valueClass || "text-gray-800"}
                  `}>
                    {item.value}
                  </h3>

                </div>

              </div>

            ))}

            {/* DESKRIPSI */}
            <div className="
              col-span-1
              md:col-span-2
              xl:col-span-3
              p-4
              rounded-2xl
              border border-red-100
              bg-white
              shadow-sm
            ">

              <div className="flex items-start gap-3">

                <div className="
                  min-w-[42px]
                  h-[42px]
                  rounded-xl
                  bg-red-50
                  text-red-600
                  flex items-center justify-center
                  text-lg
                ">
                  <FaFileAlt />
                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Keterangan Pengajuan
                  </p>

                  <div className="
                    mt-2
                    text-sm
                    leading-relaxed
                    text-gray-700
                  ">
                    Pengajuan biaya pengiriman operasional cabang wilayah
                    Jabodetabek periode Mei 2026 untuk kebutuhan distribusi
                    dan pengiriman barang operasional antar cabang.
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* LAMPIRAN */}
        <div className="mt-6">

          <div className="flex items-center justify-between mb-3">

            <h1 className="text-md font-semibold text-gray-800">
              Lampiran File
            </h1>

            <span className="text-xs text-gray-400">
              {fileLampiran.length} File
            </span>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

            {fileLampiran.map((file, index) => (

              <div
                key={index}
                onClick={() => window.open("#", "_blank")}
                className="
                  flex items-center gap-3
                  p-3
                  rounded-2xl
                  border border-red-100
                  bg-white
                  hover:bg-red-50
                  hover:shadow-md
                  transition
                  cursor-pointer
                "
              >

                {/* ICON */}
                <div className="
                  w-11
                  h-11
                  rounded-xl
                  bg-red-100
                  text-red-600
                  flex items-center justify-center
                ">
                  <FaFileAlt />
                </div>

                {/* INFO */}
                <div className="min-w-0">

                  <h1 className="
                    text-sm
                    font-semibold
                    text-gray-800
                    truncate
                  ">
                    {file.name}
                  </h1>

                  <p className="text-xs text-gray-500">
                    {file.size}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* INPUT NOTE */}
        <div className="mt-6">

          <label className="text-md font-semibold text-gray-800">
            Alasan Penolakan
            <span className="text-red-500 ml-1">*</span>
          </label>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Tulis alasan penolakan pengajuan..."
            className="
              w-full
              mt-2
              p-4
              border border-red-200
              rounded-2xl
              outline-none
              focus:ring-2
              focus:ring-red-300
              text-sm
              min-h-[120px]
              bg-white
            "
            maxLength={500}
          />

          <div className="flex justify-between items-center mt-2">

            <div className="text-red-500 text-xs flex items-center gap-1">
              <FaCheckCircle />
              Pengajuan yang ditolak akan dikembalikan ke pemohon
            </div>

            <div className="text-xs text-gray-400">
              {note.length}/500
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
}

export default ModalReject