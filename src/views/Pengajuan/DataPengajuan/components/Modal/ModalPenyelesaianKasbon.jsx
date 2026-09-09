import React, { useEffect, useState } from 'react'

import { Modal, Label, Select } from 'components/atoms'

import { useDispatch, useSelector } from 'react-redux'

import { swal } from 'global/helper/swal'

import { setToggleModal } from '../../../../../redux/n2n/global'

import {
  FaArrowLeft,
  FaUserAlt,
  FaBuilding,
  FaBriefcase,
  FaMoneyBillWave,
  FaSave,
  FaCommentDots,
  FaListAlt,
  FaTag,
  FaPercent,
  FaPaperclip,
  FaFileAlt,
  FaTrash,
  FaFileInvoiceDollar,
  FaReceipt
} from 'react-icons/fa'

import { HiOutlineTicket } from 'react-icons/hi'

const ModalPenyelesaianKasbon = () => {

  const dispatch = useDispatch()

  const { toggleModal } = useSelector(
    state => state.global
  )

  // =========================
  // INITIAL STATE
  // =========================
  const initialState = {

    no_pengajuan: '',

    nama_pemohon: 'Andi Pratama',

    jabatan: {
      value: 'manager',
      label: 'Manager'
    },

    cabang: {
      value: 'jakarta',
      label: 'Jakarta'
    },

    jenis_biaya: {
      value: 'kasbon',
      label: 'Kasbon'
    },

    tipe_ppn: {
      value: 'exclude',
      label: 'Exclude PPN'
    },

    nama_vendor: 'PT Sumber Makmur',

    nomor_invoice: 'INV/2026/VII/001',

    status_pkp: {
      value: 'pkp',
      label: 'PKP'
    },

    nomor_faktur_pajak:
      '010.000-26.12345678',

    npwp: '01.234.567.8-999.000',

    nomor_kasbon_sap: 'KB-889921',

    jumlah_pengajuan: 5000000,

    nominal_ppn: 550000,

    keterangan:
      'Penyelesaian kasbon operasional kantor cabang Jakarta.',

    files: []
  }

  const [data, setData] =
    useState(initialState)

  // =========================
  // OPTIONS
  // =========================
  const options = {

    jabatan: [
      {
        value: 'staff',
        label: 'Staff'
      },
      {
        value: 'supervisor',
        label: 'Supervisor'
      },
      {
        value: 'manager',
        label: 'Manager'
      }
    ],

    cabang: [
      {
        value: 'jakarta',
        label: 'Jakarta'
      },
      {
        value: 'bandung',
        label: 'Bandung'
      },
      {
        value: 'surabaya',
        label: 'Surabaya'
      }
    ],

    jenisBiaya: [
      {
        value: 'biaya_umum',
        label: 'Biaya Umum'
      },
      {
        value: 'biaya_listrik',
        label: 'Biaya Listrik'
      },
      {
        value: 'kasbon',
        label: 'Kasbon'
      },
      {
        value: 'vendor',
        label: 'Vendor'
      },
      {
        value: 'door_to_door',
        label: 'Door To Door (Prioritas)'
      },
      {
        value: 'swakelola',
        label: 'Swakelola'
      },
      {
        value: 'biaya_pengiriman',
        label: 'Biaya Pengiriman'
      },
      {
        value: 'biaya_outsourching',
        label: 'Biaya Outsourching'
      },
      {
        value: 'biaya_memo_sdm',
        label: 'Biaya Memo SDM'
      },
    ],

    tipePPN: [
      {
        value: 'exclude',
        label: 'Exclude PPN'
      },
      {
        value: 'include',
        label: 'Include PPN'
      }
    ],

    statusPKP: [
      {
        value: 'pkp',
        label: 'PKP'
      },
      {
        value: 'non_pkp',
        label: 'Non PKP'
      }
    ]
  }

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value
    })

  }

  const handleSelect = (name, value) => {

    setData({
      ...data,
      [name]: value
    })

  }

  // =========================
  // HANDLE FILE
  // =========================
  const handleFileChange = (e) => {

    const selectedFiles = Array.from(
      e.target.files
    )

    setData({
      ...data,
      files: [
        ...data.files,
        ...selectedFiles
      ]
    })

  }

  const handleRemoveFile = (index) => {

    const newFiles = [...data.files]

    newFiles.splice(index, 1)

    setData({
      ...data,
      files: newFiles
    })

  }

  // =========================
  // SAVE
  // =========================
  const handleSave = async () => {

    swal.loading()

    await dispatch(
      setToggleModal({
        isOpen: false,
        modal: ""
      })
    )

    setTimeout(() => {

      swal.customHtml(
        'Penyelesaian Kasbon Berhasil Disimpan',

        `
        <div style="font-size:18px">
          Nomor Kasbon :
          <b>
            ${data.nomor_kasbon_sap}
          </b>
        </div>
        `,

        'success',
        false
      )

    }, 1000)

  }

  return (
    <Modal
      title="Penyelesaian Kasbon"
      modal={"modalPenyelesaianKasbon"}
      size={"w-11/12 max-w-6xl"}
      scroll={true}
    >

      <div className="p-6 bg-gray-50">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">

          <div
            className="
              w-14 h-14 rounded-2xl
              bg-gradient-to-tr
              from-blue-900 to-cyan-600
              flex items-center justify-center
              text-white shadow-lg
            "
          >

            <FaFileInvoiceDollar className="text-2xl" />

          </div>

          <div>

            <div className="text-2xl font-bold text-blue-900">

              Form Penyelesaian Kasbon

            </div>

            <div className="text-sm text-gray-500">

              Lengkapi data penyelesaian kasbon dengan benar.

            </div>

          </div>

        </div>

        {/* CARD */}
        <div className="bg-white border shadow-md rounded-2xl p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* NOMOR */}
            <div>

              <Label
                icon={<FaTag className="text-blue-500" />}
                label="Nomor Pengajuan"

                children={
                  <input
                    value={data.no_pengajuan}
                    placeholder="Auto Generate"
                    className="
                      input input-bordered
                      bg-gray-100
                      w-full
                      rounded-full
                    "
                    disabled
                  />
                }
              />

            </div>

            {/* NAMA */}
            <div>

              <Label
                icon={<FaUserAlt className="text-green-500" />}
                label="Nama Pemohon"

                children={
                  <input
                    name="nama_pemohon"
                    value={data.nama_pemohon}
                    onChange={handleChange}
                    className="
                      input input-bordered
                      bg-white
                      w-full
                      rounded-full
                    "
                  />
                }
              />

            </div>

            {/* JABATAN */}
            <div>

              <Label
                icon={<FaBriefcase className="text-purple-500" />}
                label="Jabatan"

                children={
                  <Select
                    options={options.jabatan}
                    value={data.jabatan}
                    onChange={(val) =>
                      handleSelect('jabatan', val)
                    }
                  />
                }
              />

            </div>

            {/* CABANG */}
            <div>

              <Label
                icon={<FaBuilding className="text-orange-500" />}
                label="Profit Center"

                children={
                  <Select
                    options={options.cabang}
                    value={data.cabang}
                    onChange={(val) =>
                      handleSelect('cabang', val)
                    }
                  />
                }
              />

            </div>

            {/* JENIS BIAYA */}
            <div>

              <Label
                icon={<FaListAlt className="text-cyan-500" />}
                label="Jenis Biaya"

                children={
                  <Select
                    options={options.jenisBiaya}
                    value={data.jenis_biaya}
                    onChange={(val) =>
                      handleSelect(
                        'jenis_biaya',
                        val
                      )
                    }
                    isDisabled
                  />
                }
              />

            </div>

            {/* NOMOR KASBON */}
            <div>

              <Label
                icon={
                  <HiOutlineTicket className="text-green-500" />
                }

                label="Nomor Kasbon SAP"

                children={
                  <input
                    name="nomor_kasbon_sap"
                    value={data.nomor_kasbon_sap}
                    onChange={handleChange}
                    className="
                      input input-bordered
                      bg-white
                      w-full
                      rounded-full
                    "
                  />
                }
              />

            </div>

            {/* NOMINAL DPP */}
            <div>

              <Label
                icon={
                  <FaMoneyBillWave className="text-yellow-500" />
                }

                label="Nominal DPP"

                children={
                  <input
                    type="number"
                    name="jumlah_pengajuan"
                    value={data.jumlah_pengajuan}
                    onChange={handleChange}
                    className="
                      input bg-white
                      input-bordered
                      w-full
                      rounded-full
                    "
                  />
                }
              />

            </div>

            {/* NOMINAL PPN */}
            <div>

              <Label
                icon={<FaPercent className="text-yellow-500" />}
                label="Nominal PPN"

                children={
                  <input
                    type="number"
                    name="nominal_ppn"
                    value={data.nominal_ppn}
                    onChange={handleChange}
                    className="
                      input bg-white
                      input-bordered
                      w-full
                      rounded-full
                    "
                  />
                }
              />

            </div>

            {/* NAMA VENDOR */}
            <div>

              <Label
                icon={<FaBuilding className="text-indigo-500" />}
                label="Nama Vendor"

                children={
                  <input
                    name="nama_vendor"
                    value={data.nama_vendor}
                    onChange={handleChange}
                    className="
                      input
                      input-bordered
                      bg-white
                      w-full
                      rounded-full
                    "
                    placeholder="Masukkan nama vendor"
                  />
                }
              />

            </div>

            {/* NOMOR INVOICE */}
            <div>

              <Label
                icon={
                  <FaFileInvoiceDollar className="text-sky-500" />
                }

                label="Nomor Invoice"

                children={
                  <input
                    name="nomor_invoice"
                    value={data.nomor_invoice}
                    onChange={handleChange}
                    placeholder="Masukkan nomor invoice"
                    className="
                      input
                      input-bordered
                      bg-white
                      w-full
                      rounded-full
                    "
                  />
                }
              />

            </div>

            {/* STATUS PKP */}
            <div>

              <Label
                icon={<FaBuilding className="text-emerald-500" />}
                label="Status PKP"

                children={
                  <Select
                    options={options.statusPKP}
                    value={data.status_pkp}
                    onChange={(val) =>
                      handleSelect(
                        'status_pkp',
                        val
                      )
                    }
                  />
                }
              />

            </div>

            {/* NOMOR FAKTUR */}
            <div>

              <Label
                icon={<FaReceipt className="text-rose-500" />}
                label="Nomor Faktur Pajak"

                children={
                  <input
                    name="nomor_faktur_pajak"
                    value={data.nomor_faktur_pajak}
                    onChange={handleChange}
                    placeholder="Masukkan nomor faktur pajak"
                    className="
                      input
                      input-bordered
                      bg-white
                      w-full
                      rounded-full
                    "
                  />
                }
              />

            </div>

            {/* NPWP */}
            <div>

              <Label
                icon={<FaTag className="text-blue-500" />}
                label="NPWP/NIK"

                children={
                  <input
                    name="npwp"
                    value={data.npwp}
                    onChange={handleChange}
                    placeholder="Masukkan NPWP"
                    className="
                      input
                      input-bordered
                      bg-white
                      w-full
                      rounded-full
                    "
                  />
                }
              />

            </div>

            {/* KETERANGAN */}
            <div className="md:col-span-2">

              <Label
                icon={<FaCommentDots className="text-blue-500" />}
                label="Keterangan Pengajuan"

                children={
                  <textarea
                    name="keterangan"
                    value={data.keterangan}
                    onChange={handleChange}
                    className="
                      textarea
                      bg-white
                      textarea-bordered
                      w-full
                      rounded-2xl
                      h-28
                    "
                  />
                }
              />

            </div>

            {/* LAMPIRAN */}
            <div className="md:col-span-2">

              <Label
                icon={<FaPaperclip className="text-rose-500" />}
                label="Lampiran"

                children={
                  <div className="space-y-4">

                    {/* INPUT FILE */}
                    <label
                      className="
                        border-2 border-dashed
                        border-blue-200
                        rounded-2xl
                        p-6
                        flex flex-col
                        items-center
                        justify-center
                        gap-3
                        cursor-pointer
                        hover:border-blue-400
                        hover:bg-blue-50
                        transition
                      "
                    >

                      <FaPaperclip className="text-3xl text-blue-500" />

                      <div className="text-sm text-gray-600">

                        Klik untuk upload file

                      </div>

                      <div className="text-xs text-gray-400">

                        PDF, JPG, PNG, XLSX, DOCX

                      </div>

                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                      />

                    </label>

                    {/* LIST FILE */}
                    {
                      data.files.length > 0 && (

                        <div className="space-y-2">

                          {
                            data.files.map((file, index) => (

                              <div
                                key={index}
                                className="
                                  flex items-center
                                  justify-between
                                  bg-gray-50
                                  border
                                  rounded-xl
                                  px-4 py-3
                                "
                              >

                                <div className="flex items-center gap-3">

                                  <div
                                    className="
                                      w-10 h-10
                                      rounded-full
                                      bg-blue-100
                                      flex items-center
                                      justify-center
                                    "
                                  >

                                    <FaFileAlt className="text-blue-600" />

                                  </div>

                                  <div>

                                    <div className="font-medium text-sm">

                                      {file.name}

                                    </div>

                                    <div className="text-xs text-gray-400">

                                      {
                                        (
                                          file.size /
                                          1024 /
                                          1024
                                        ).toFixed(2)
                                      } MB

                                    </div>

                                  </div>

                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveFile(index)
                                  }
                                  className="
                                    w-9 h-9
                                    rounded-full
                                    bg-red-100
                                    text-red-500
                                    flex items-center
                                    justify-center
                                    hover:bg-red-200
                                    transition
                                  "
                                >

                                  <FaTrash />

                                </button>

                              </div>

                            ))
                          }

                        </div>

                      )
                    }

                  </div>
                }
              />

            </div>

          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-3 mt-6">

            <button
              className="
                px-6 py-2 rounded-full
                bg-gray-100 hover:bg-gray-200
                flex items-center gap-2
              "

              onClick={() =>
                dispatch(
                  setToggleModal({
                    isOpen: false,
                    modal: ""
                  })
                )
              }
            >

              <FaArrowLeft />

              Batal

            </button>

            <button
              className="
                px-6 py-2 rounded-full
                bg-blue-900 text-white
                btn flex items-center gap-2
                hover:scale-105 transition
              "

              onClick={handleSave}
            >

              <FaSave />

              Simpan

            </button>

          </div>

        </div>

      </div>

    </Modal>
  )
}

export default ModalPenyelesaianKasbon