import React, { useEffect, useState } from 'react'
import { Label, Modal, Select } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux'

import BgModal from 'assets/BgModal.svg'

import { swal } from 'global/helper/swal'

import { setToggleModal } from '../../../../../redux/n2n/global'

import {
  FaArrowLeft,
  FaBriefcase,
  FaBuilding,
  FaCommentDots,
  FaFileExcel,
  FaFileImage,
  FaFilePdf,
  FaFileUpload,
  FaInfoCircle,
  FaListAlt,
  FaMoneyBillWave,
  FaPercent,
  FaRegFileAlt,
  FaSave,
  FaTag,
  FaUserAlt
} from 'react-icons/fa'

import { HiOutlineTicket } from 'react-icons/hi'

const ModalEditData = ({ loginAccess }) => {

  const dispatch = useDispatch()

  const { toggleModal } = useSelector(state => state.global)

  const [openModal, setOpenModal] = useState(false)

  const [form, setForm] = useState({
    tipe_ppn: {
      value: 'include',
      label: 'Include PPN'
    },

    account_description: null,
    voucher_sap: '',
    nomor_invoice: '',
    nomor_faktur_pajak: ''
  })

  const options = {
    account_description: [
      {
        value: "6101010101",
        label: "10020 - Gaji Komisaris",
      },
      {
        value: "6101010102",
        label: "10021 - Gaji Direksi",
      },
      {
        value: "6101010201",
        label: "10022 - Gaji Dasar I",
      },
      {
        value: "6101010202",
        label: "10023 - Gaji Dasar II",
      },
      {
        value: "6101010301",
        label: "10024 - Tunjangan Keagamaan",
      },
      {
        value: "6101010401",
        label: "10025 - Biaya Tunjangan Lembur",
      },
    ],

    tipe_ppn: [
      {
        value: 'exclude',
        label: 'Exclude PPN'
      },
      {
        value: 'include',
        label: 'Include PPN'
      }
    ]
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSelect = (name, value) => {
    setForm({
      ...form,
      [name]: value
    })
  }

  const onSubmit = async () => {
    swal.success('Data Berhasil Disimpan !')
  }

  useEffect(() => {
    if (openModal === true) {

    }
  }, [openModal])

  return (
    <Modal
      title="Input Kelengkapan Data"
      iconTitle={<FaRegFileAlt className='text-blue-600 text-3xl' />}
      modal={"modalInputVoucherSAP"}
      size={"w-11/12 max-w-4xl"}
      scroll={false}
      buttonFooter={
        <>
          {/* BUTTON */}
          <div className="flex justify-end gap-3">

            <button
              className="px-6 py-2 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center gap-2"
            >
              <FaArrowLeft />
              Batal
            </button>

            <button
              onClick={() => onSubmit()}
              className="px-6 py-2 rounded-full bg-blue-900 text-white flex items-center gap-2 hover:scale-105 btn transition"
            >
              <FaSave />
              Simpan Data
            </button>

          </div>
        </>
      }
    >

      <div className="bg-white rounded-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Kelengkapan Data
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Lengkapi informasi data dengan benar.
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
            <FaRegFileAlt className="text-3xl text-blue-700" />
          </div>

        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* NOMOR PENGAJUAN */}
          <div>
            <Label
              icon={<FaTag className="text-blue-500" />}
              label="Nomor Pengajuan"
              children={
                <input
                  value="PNG-2026-000145"
                  className="input input-bordered bg-gray-100 w-full rounded-full"
                  disabled
                />
              }
            />
          </div>

          {/* NAMA PEMOHON */}
          <div>
            <Label
              icon={<FaUserAlt className="text-green-500" />}
              label="Nama Pemohon"
              children={
                <input
                  value="Andri Noviandy"
                  className="input input-bordered bg-gray-100 w-full rounded-full"
                  disabled
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
                <input
                  value="Staff Finance"
                  className="input input-bordered bg-gray-100 w-full rounded-full"
                  disabled
                />
              }
            />
          </div>

          {/* CABANG */}
          <div>
            <Label
              icon={<FaBuilding className="text-orange-500" />}
              label="Cabang"
              children={
                <input
                  value="Jakarta Selatan"
                  className="input input-bordered bg-gray-100 w-full rounded-full"
                  disabled
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
                <input
                  value="Biaya Pengiriman"
                  className="input input-bordered bg-gray-100 w-full rounded-full"
                  disabled
                />
              }
            />
          </div>

          {/* TIPE PPN */}
          <div>

            <Label
              icon={<FaPercent className="text-pink-500" />}
              label="Tipe PPN"
              children={
                <Select
                  options={options.tipe_ppn}
                  value={form.tipe_ppn}
                  onChange={(val) =>
                    handleSelect('tipe_ppn', val)
                  }
                  placeholder='Pilih tipe PPN'
                  isDisabled={true}
                />
              }
            />

          </div>

          {/* NOMINAL DPP */}
          <div>
            <Label
              icon={<FaMoneyBillWave className="text-emerald-500" />}
              label="Nominal DPP"
              children={
                <input
                  value="Rp 15.000.000"
                  className="input input-bordered bg-gray-100 w-full rounded-full"
                  disabled
                />
              }
            />
          </div>

          {/* PPN */}
          {
            form?.tipe_ppn?.value === 'include' && (
              <div>
                <Label
                  icon={<FaPercent className="text-pink-500" />}
                  label="PPN"
                  children={
                    <input
                      value="Rp 1.650.000"
                      className="input input-bordered bg-gray-100 w-full rounded-full"
                      disabled
                    />
                  }
                />
              </div>
            )
          }

          {/* KARTU INPUT WAJIB */}
          <div className="md:col-span-2">

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">

              {/* HEADER CARD */}
              <div className="flex items-center gap-3 mb-5">

                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <FaInfoCircle className="text-blue-600 text-xl" />
                </div>

                <div>
                  <h1 className="font-bold text-blue-900">
                    Informasi Wajib Diisi
                  </h1>

                  <p className="text-sm text-blue-600">
                    Field berikut wajib dilengkapi
                  </p>
                </div>

              </div>

              {/* FORM */}
              <div className={`grid grid-cols-1 ${['Sub Unit Anggaran'].includes(loginAccess) ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-5`}>

                {['Sub Unit Akuntansi Kantor Pusat', 'Sub Unit Anggaran'].includes(loginAccess) && (
                  <>
                    {/* ACCOUNT DESCRIPTION */}
                    <div>

                      <Label
                        icon={<FaRegFileAlt className="text-yellow-500" />}
                        label={
                          <div className='flex items-center gap-1'>
                            Account Description
                            <span className='text-red-500'>*</span>
                          </div>
                        }
                        children={
                          <Select
                            options={options.account_description}
                            value={form.account_description}
                            onChange={(val) =>
                              handleSelect('account_description', val)
                            }
                            placeholder='Pilih account description'
                          />
                        }
                      />

                    </div>
                  </>
                )}

                {['Sub Unit Akuntansi Kantor Pusat'].includes(loginAccess) && (
                  <>
                    {/* VOUCHER SAP */}
                    <div>

                      <Label
                        icon={<HiOutlineTicket className="text-blue-600" />}
                        label={
                          <div className='flex items-center gap-1'>
                            Nomor Voucher SAP
                            <span className='text-red-500'>*</span>
                          </div>
                        }
                        children={
                          <input
                            name="voucher_sap"
                            value={form.voucher_sap}
                            onChange={handleChange}
                            className="input input-bordered bg-white w-full rounded-full border-blue-200 focus:border-blue-500"
                            placeholder="Masukkan nomor voucher SAP"
                          />
                        }
                      />

                    </div>

                    {/* NOMOR INVOICE */}
                    <div>

                      <Label
                        icon={<FaRegFileAlt className="text-indigo-500" />}
                        label={
                          <div className='flex items-center gap-1'>
                            Nomor Invoice
                            <span className='text-red-500'>*</span>
                          </div>
                        }
                        children={
                          <input
                            name="nomor_invoice"
                            value={form.nomor_invoice}
                            onChange={handleChange}
                            className="input input-bordered bg-white w-full rounded-full"
                            placeholder="Masukkan nomor invoice"
                          />
                        }
                      />

                    </div>

                    {/* NOMOR FAKTUR PAJAK */}
                    {
                      form?.tipe_ppn?.value === 'include' && (
                        <div>

                          <Label
                            icon={<FaFilePdf className="text-red-500" />}
                            label="Nomor Faktur Pajak (Jika Ada)"
                            children={
                              <input
                                name="nomor_faktur_pajak"
                                value={form.nomor_faktur_pajak}
                                onChange={handleChange}
                                className="input input-bordered bg-white w-full rounded-full"
                                placeholder="Masukkan nomor faktur pajak"
                              />
                            }
                          />

                        </div>
                      )
                    }
                  </>
                )}

              </div>

            </div>

          </div>

          {/* KETERANGAN */}
          <div className="md:col-span-2">

            <Label
              icon={<FaCommentDots className="text-blue-500" />}
              label="Keterangan Pengajuan"
              children={
                <textarea
                  disabled
                  value="Pengajuan biaya pengiriman operasional cabang wilayah Jabodetabek periode Mei 2026."
                  className="textarea textarea-bordered bg-gray-100 w-full rounded-2xl h-28"
                />
              }
            />

          </div>

          {/* FILE */}
          <div className="md:col-span-2">

            <Label
              icon={<FaFileUpload className="text-gray-500" />}
              label="Lampiran File"
              children={
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-auto">

                  {/* FILE 1 */}
                  <div className="border rounded-2xl p-4 bg-gray-50 hover:bg-gray-100 transition">

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                        <FaFilePdf className="text-red-600 text-xl" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          invoice_pengiriman.pdf
                        </p>

                        <p className="text-xs text-gray-500">
                          1.2 MB
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* FILE 2 */}
                  <div className="border rounded-2xl p-4 bg-gray-50 hover:bg-gray-100 transition">

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                        <FaFileExcel className="text-green-600 text-xl" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          rincian_biaya.xlsx
                        </p>

                        <p className="text-xs text-gray-500">
                          540 KB
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* FILE 3 */}
                  <div className="border rounded-2xl p-4 bg-gray-50 hover:bg-gray-100 transition">

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                        <FaFileImage className="text-blue-600 text-xl" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          bukti_pengiriman.jpg
                        </p>

                        <p className="text-xs text-gray-500">
                          890 KB
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              }
            />

          </div>

        </div>

      </div>

    </Modal>
  )
}

export default ModalEditData