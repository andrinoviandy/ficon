import React, { useEffect, useState } from 'react'
import {
  FaArrowLeft,
  FaSave,
  FaListAlt,
  FaUserTie,
  FaUsers,
  FaPlusCircle,
  FaTrash,
  FaFileSignature,
  FaToggleOn
} from 'react-icons/fa'

import { useLocation, useNavigate } from 'react-router-dom'
import { Label, Select } from 'components/atoms'
import { swal } from 'global/helper/swal'

const AddEditPenandatangan = () => {

  const navigation = useNavigate()

  const location = useLocation()

  const isEditPenandatangan =
    location?.state?.project === 'Edit Penandatangan'

  // =========================
  // DUMMY EDIT DATA
  // =========================
  const dummyEditData = {

    jenis_biaya: {
      value: 'biaya_umum',
      label: 'Biaya Umum'
    },

    status: {
      value: 'Y',
      label: 'Aktif'
    },

    pemohon: {
      nama: 'Andri Noviandy',
      jabatan: 'Staff Finance'
    },

    mengetahui_1: {
      nama: 'Budi Santoso',
      jabatan: 'Supervisor Finance'
    },

    pemeriksa: [
      {
        nama: 'Rina Oktaviani',
        jabatan: 'Sub Unit Financial Controller'
      },
      {
        nama: 'Agus Pratama',
        jabatan: 'Manager Accounting'
      }
    ],

    menyetujui: [
      {
        nama: 'Siti Aisyah',
        jabatan: 'Manager Keuangan'
      }
    ],

    mengetahui_2: {
      nama: 'Dewi Lestari',
      jabatan: 'Direktur Keuangan'
    },

    penerima: {
      nama: 'Joko Susilo',
      jabatan: 'Staff Operasional'
    }
  }

  // =========================
  // INITIAL STATE
  // =========================
  const initialState = {

    jenis_biaya: null,

    status: {
      value: 'Y',
      label: 'Aktif'
    },

    pemohon: {
      nama: '',
      jabatan: ''
    },

    mengetahui_1: {
      nama: '',
      jabatan: ''
    },

    pemeriksa: [
      {
        nama: '',
        jabatan: ''
      }
    ],

    menyetujui: [
      {
        nama: '',
        jabatan: ''
      }
    ],

    mengetahui_2: {
      nama: '',
      jabatan: ''
    },

    penerima: {
      nama: '',
      jabatan: ''
    }
  }

  const [data, setData] = useState(initialState)

  // =========================
  // SET EDIT
  // =========================
  useEffect(() => {

    if (isEditPenandatangan) {

      setData(dummyEditData)

    } else {

      setData(initialState)

    }

  }, [isEditPenandatangan])

  // =========================
  // OPTIONS
  // =========================
  const options = {

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
        label: 'Door To Door'
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
        value: 'biaya_outsourcing',
        label: 'Biaya Outsourcing'
      },
      {
        value: 'biaya_memo_sdm',
        label: 'Biaya Memo SDM'
      }
    ],

    status: [
      {
        value: 'Y',
        label: 'Aktif'
      },
      {
        value: 'T',
        label: 'Non Aktif'
      }
    ]
  }

  // =========================
  // HANDLE SELECT
  // =========================
  const handleSelect = (name, value) => {

    setData({
      ...data,
      [name]: value
    })

  }

  // =========================
  // HANDLE INPUT
  // =========================
  const handleInputPenandatangan = (
    section,
    field,
    value,
    index = null
  ) => {

    // ARRAY
    if (
      section === 'pemeriksa' ||
      section === 'menyetujui'
    ) {

      const updated = [...data[section]]

      updated[index][field] = value

      setData({
        ...data,
        [section]: updated
      })

      return

    }

    // OBJECT
    setData({
      ...data,
      [section]: {
        ...data[section],
        [field]: value
      }
    })

  }

  // =========================
  // ADD PERSON
  // =========================
  const handleAddPerson = (section) => {

    setData({
      ...data,
      [section]: [
        ...data[section],
        {
          nama: '',
          jabatan: ''
        }
      ]
    })

  }

  // =========================
  // REMOVE PERSON
  // =========================
  const handleRemovePerson = (
    section,
    index
  ) => {

    const filtered = data[section].filter(
      (_, i) => i !== index
    )

    setData({
      ...data,
      [section]: filtered
    })

  }

  // =========================
  // SAVE
  // =========================
  const handleSave = async () => {

    swal.loading()

    setTimeout(() => {

      swal.customHtml(
        isEditPenandatangan
          ? 'Data Penandatangan Berhasil Diupdate'
          : 'Data Penandatangan Berhasil Ditambahkan',

        `
        <div style="font-size:18px">
          Jenis Biaya : <b>${data?.jenis_biaya?.label}</b>
        </div>
        `,
        'success',
        false
      )

    }, 1000)

  }

  // =========================
  // COMPONENT CARD
  // =========================
  const CardPenandatangan = ({
    title,
    icon,
    children
  }) => (
    <div
      className="
        border rounded-2xl
        p-5 bg-gray-50
      "
    >
      <div className="flex items-center gap-2 mb-4">

        <div
          className="
            w-10 h-10 rounded-xl
            bg-blue-100
            flex items-center justify-center
            text-blue-700
          "
        >
          {icon}
        </div>

        <h3 className="font-bold text-gray-700">
          {title}
        </h3>

      </div>

      {children}

    </div>
  )

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">

        <button
          onClick={() => navigation(-1)}
          className="
            w-10 h-10 rounded-full
            bg-white shadow
            flex items-center justify-center
            hover:bg-gray-100 transition
          "
        >
          <FaArrowLeft />
        </button>

        <div>

          <div className="text-xl font-bold text-blue-900">

            {
              isEditPenandatangan
                ? 'Edit Penandatangan'
                : 'Tambah Penandatangan'
            }

          </div>

          <div className="text-sm font-light text-gray-500">
            Lengkapi data penandatangan dengan benar.
          </div>

        </div>

      </div>

      {/* CARD */}
      <div className="bg-white border shadow-md rounded-2xl p-6">

        {/* ===================== */}
        {/* MASTER DATA */}
        {/* ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

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
                    handleSelect('jenis_biaya', val)
                  }
                />
              }
            />

          </div>

          {/* STATUS */}
          <div>

            <Label
              icon={<FaToggleOn className="text-green-500" />}
              label="Status"
              children={
                <Select
                  options={options.status}
                  value={data.status}
                  onChange={(val) =>
                    handleSelect('status', val)
                  }
                />
              }
            />

          </div>

        </div>

        {/* ===================== */}
        {/* PENANDATANGAN */}
        {/* ===================== */}
        <div className="mt-8">

          <div className="flex items-center gap-2 mb-5">

            <FaFileSignature className="text-blue-700 text-xl" />

            <h2 className="text-lg font-bold text-gray-700">
              Data Penandatangan
            </h2>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* PEMOHON */}
            <CardPenandatangan
              title="Pemohon"
              icon={<FaUserTie />}
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="Nama"
                  value={data.pemohon.nama}
                  onChange={(e) =>
                    handleInputPenandatangan(
                      'pemohon',
                      'nama',
                      e.target.value
                    )
                  }
                  className="input input-bordered rounded-xl w-full"
                />

                <input
                  type="text"
                  placeholder="Jabatan"
                  value={data.pemohon.jabatan}
                  onChange={(e) =>
                    handleInputPenandatangan(
                      'pemohon',
                      'jabatan',
                      e.target.value
                    )
                  }
                  className="input input-bordered rounded-xl w-full"
                />

              </div>

            </CardPenandatangan>

            {/* MENGETAHUI 1 */}
            <CardPenandatangan
              title="Mengetahui"
              icon={<FaUsers />}
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="Nama"
                  value={data.mengetahui_1.nama}
                  onChange={(e) =>
                    handleInputPenandatangan(
                      'mengetahui_1',
                      'nama',
                      e.target.value
                    )
                  }
                  className="input input-bordered rounded-xl w-full"
                />

                <input
                  type="text"
                  placeholder="Jabatan"
                  value={data.mengetahui_1.jabatan}
                  onChange={(e) =>
                    handleInputPenandatangan(
                      'mengetahui_1',
                      'jabatan',
                      e.target.value
                    )
                  }
                  className="input input-bordered rounded-xl w-full"
                />

              </div>

            </CardPenandatangan>

          </div>

          {/* PEMERIKSA */}
          <div className="mt-5">

            <CardPenandatangan
              title="Pemeriksa"
              icon={<FaUsers />}
            >

              <div className="space-y-4">

                {
                  data.pemeriksa.map((item, index) => (

                    <div
                      key={index}
                      className="
                        grid grid-cols-1
                        md:grid-cols-2
                        gap-4 relative
                        border rounded-2xl
                        p-4 bg-white
                      "
                    >

                      <input
                        type="text"
                        placeholder="Nama"
                        value={item.nama}
                        onChange={(e) =>
                          handleInputPenandatangan(
                            'pemeriksa',
                            'nama',
                            e.target.value,
                            index
                          )
                        }
                        className="input input-bordered rounded-xl w-full"
                      />

                      <input
                        type="text"
                        placeholder="Jabatan"
                        value={item.jabatan}
                        onChange={(e) =>
                          handleInputPenandatangan(
                            'pemeriksa',
                            'jabatan',
                            e.target.value,
                            index
                          )
                        }
                        className="input input-bordered rounded-xl w-full"
                      />

                      {
                        data.pemeriksa.length > 1 && (
                          <button
                            onClick={() =>
                              handleRemovePerson(
                                'pemeriksa',
                                index
                              )
                            }
                            className="
                              absolute top-3 right-3
                              text-red-500
                            "
                          >
                            <FaTrash />
                          </button>
                        )
                      }

                    </div>

                  ))
                }

                <button
                  onClick={() =>
                    handleAddPerson('pemeriksa')
                  }
                  className="
                    btn bg-blue-600 hover:bg-blue-700
                    text-white rounded-full
                    border-none
                  "
                >

                  <FaPlusCircle />

                  Tambah Pemeriksa

                </button>

              </div>

            </CardPenandatangan>

          </div>

          {/* MENYETUJUI */}
          <div className="mt-5">

            <CardPenandatangan
              title="Menyetujui"
              icon={<FaUsers />}
            >

              <div className="space-y-4">

                {
                  data.menyetujui.map((item, index) => (

                    <div
                      key={index}
                      className="
                        grid grid-cols-1
                        md:grid-cols-2
                        gap-4 relative
                        border rounded-2xl
                        p-4 bg-white
                      "
                    >

                      <input
                        type="text"
                        placeholder="Nama"
                        value={item.nama}
                        onChange={(e) =>
                          handleInputPenandatangan(
                            'menyetujui',
                            'nama',
                            e.target.value,
                            index
                          )
                        }
                        className="input input-bordered rounded-xl w-full"
                      />

                      <input
                        type="text"
                        placeholder="Jabatan"
                        value={item.jabatan}
                        onChange={(e) =>
                          handleInputPenandatangan(
                            'menyetujui',
                            'jabatan',
                            e.target.value,
                            index
                          )
                        }
                        className="input input-bordered rounded-xl w-full"
                      />

                      {
                        data.menyetujui.length > 1 && (
                          <button
                            onClick={() =>
                              handleRemovePerson(
                                'menyetujui',
                                index
                              )
                            }
                            className="
                              absolute top-3 right-3
                              text-red-500
                            "
                          >
                            <FaTrash />
                          </button>
                        )
                      }

                    </div>

                  ))
                }

                <button
                  onClick={() =>
                    handleAddPerson('menyetujui')
                  }
                  className="
                    btn bg-green-600 hover:bg-green-700
                    text-white rounded-full
                    border-none
                  "
                >

                  <FaPlusCircle />

                  Tambah Menyetujui

                </button>

              </div>

            </CardPenandatangan>

          </div>

          {/* BOTTOM */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">

            {/* MENGETAHUI FINAL */}
            <CardPenandatangan
              title="Mengetahui Final"
              icon={<FaUsers />}
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="Nama"
                  value={data.mengetahui_2.nama}
                  onChange={(e) =>
                    handleInputPenandatangan(
                      'mengetahui_2',
                      'nama',
                      e.target.value
                    )
                  }
                  className="input input-bordered rounded-xl w-full"
                />

                <input
                  type="text"
                  placeholder="Jabatan"
                  value={data.mengetahui_2.jabatan}
                  onChange={(e) =>
                    handleInputPenandatangan(
                      'mengetahui_2',
                      'jabatan',
                      e.target.value
                    )
                  }
                  className="input input-bordered rounded-xl w-full"
                />

              </div>

            </CardPenandatangan>

            {/* PENERIMA */}
            <CardPenandatangan
              title="Penerima"
              icon={<FaUserTie />}
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="Nama"
                  value={data.penerima.nama}
                  onChange={(e) =>
                    handleInputPenandatangan(
                      'penerima',
                      'nama',
                      e.target.value
                    )
                  }
                  className="input input-bordered rounded-xl w-full"
                />

                <input
                  type="text"
                  placeholder="Jabatan"
                  value={data.penerima.jabatan}
                  onChange={(e) =>
                    handleInputPenandatangan(
                      'penerima',
                      'jabatan',
                      e.target.value
                    )
                  }
                  className="input input-bordered rounded-xl w-full"
                />

              </div>

            </CardPenandatangan>

          </div>

        </div>

        {/* ===================== */}
        {/* PREVIEW */}
        {/* ===================== */}
        <div className="mt-8">

          <div
            className="
              bg-blue-50
              border border-blue-100
              rounded-2xl
              p-5
            "
          >

            <div className="text-sm text-gray-500 mb-3">
              Preview Data
            </div>

            <div className="flex flex-wrap gap-3">

              <div
                className="
                  px-4 py-2 rounded-xl
                  bg-white border text-sm
                "
              >

                <span className="font-semibold text-gray-500">
                  Jenis Biaya :
                </span>{' '}

                <span className="font-bold text-cyan-700">
                  {data?.jenis_biaya?.label || '-'}
                </span>

              </div>

              <div
                className="
                  px-4 py-2 rounded-xl
                  bg-white border text-sm
                "
              >

                <span className="font-semibold text-gray-500">
                  Status :
                </span>{' '}

                <span
                  className={`
                    font-bold
                    ${data?.status?.value === 'Y'
                      ? 'text-green-600'
                      : 'text-red-600'}
                  `}
                >
                  {data?.status?.label || '-'}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* BUTTON */}
        <div className="flex justify-end gap-3 mt-8">

          <button
            className="
              px-6 py-2 rounded-full
              bg-gray-100
              hover:bg-gray-200
              flex items-center gap-2
            "
            onClick={() => navigation(-1)}
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

            {
              isEditPenandatangan
                ? 'Simpan Perubahan'
                : 'Simpan'
            }

          </button>

        </div>

      </div>

    </div>
  )
}

export default AddEditPenandatangan