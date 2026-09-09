import React, { useState } from 'react'
import Select from 'react-select'
import {
  FaArrowLeft,
  FaFileUpload,
  FaUserAlt,
  FaBuilding,
  FaBriefcase,
  FaMoneyBillWave,
  FaListAlt,
  FaSave,
  FaCommentDots
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const AddEditPengajuan = () => {
  const navigation = useNavigate()

  const [data, setData] = useState({
    nama_pemohon: '',
    jabatan: null,
    cabang: null,
    jumlah_pengajuan: '',
    keterangan: '',
    files: []
  })

  const options = {
    jabatan: [
      { value: 'staff', label: 'Staff' },
      { value: 'supervisor', label: 'Supervisor' },
      { value: 'manager', label: 'Manager' },
    ],
    cabang: [
      { value: 'jakarta', label: 'Jakarta' },
      { value: 'bandung', label: 'Bandung' },
      { value: 'surabaya', label: 'Surabaya' },
    ]
  }

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

  const handleFileChange = (e) => {
    setData({
      ...data,
      files: [...e.target.files]
    })
  }

  const selectStyle = {
    control: (base) => ({
      ...base,
      borderRadius: '9999px',
      minHeight: '42px',
      borderColor: '#e5e7eb',
      boxShadow: 'none',
      paddingLeft: 6
    })
  }

  const Label = ({ icon, text }) => (
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
      <span className="text-lg">{icon}</span>
      {text}
    </label>
  )

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigation(-1)}
          className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition"
        >
          <FaArrowLeft />
        </button>

        <div>
          <div className="text-xl font-bold text-blue-900">
            Form Pengajuan Biaya
          </div>
          <div className="text-sm font-light">
            Lengkapi data anda dengan benar.
          </div>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white border shadow-md rounded-2xl p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* NAMA PEMOHON */}
          <div>
            <Label
              icon={<FaUserAlt className="text-green-500" />}
              text="Nama Pemohon"
            />
            <input
              name="nama_pemohon"
              value={data.nama_pemohon}
              onChange={handleChange}
              className="input input-bordered w-full rounded-full"
              placeholder="Nama lengkap"
            />
          </div>

          {/* JABATAN */}
          <div>
            <Label
              icon={<FaBriefcase className="text-purple-500" />}
              text="Jabatan"
            />
            <Select
              options={options.jabatan}
              value={data.jabatan}
              onChange={(val) => handleSelect('jabatan', val)}
              styles={selectStyle}
            />
          </div>

          {/* CABANG */}
          <div>
            <Label
              icon={<FaBuilding className="text-orange-500" />}
              text="Profit Center"
            />
            <Select
              options={options.cabang}
              value={data.cabang}
              onChange={(val) => handleSelect('cabang', val)}
              styles={selectStyle}
            />
          </div>

          {/* NOMINAL */}
          <div>
            <Label
              icon={<FaMoneyBillWave className="text-yellow-500" />}
              text="Nominal Pengajuan"
            />
            <input
              type="number"
              name="jumlah_pengajuan"
              value={data.jumlah_pengajuan}
              onChange={handleChange}
              className="input input-bordered w-full rounded-full"
              placeholder="0"
            />
          </div>

          {/* KETERANGAN */}
          <div className="md:col-span-2">
            <Label
              icon={<FaCommentDots className="text-blue-500" />}
              text="Keterangan Pengajuan"
            />
            <textarea
              name="keterangan"
              value={data.keterangan}
              onChange={handleChange}
              className="textarea textarea-bordered w-full rounded-2xl h-28"
              placeholder="Masukkan keterangan pengajuan..."
            />
          </div>

          {/* UPLOAD FILE */}
          <div className="md:col-span-2">
            <Label
              icon={<FaFileUpload className="text-gray-500" />}
              text="Upload File"
            />

            <div className="border-2 border-dashed rounded-2xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition">

              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="fileUpload"
              />

              <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center gap-2">
                <FaFileUpload className="text-blue-900 text-2xl" />
                <span className="text-sm text-gray-600">
                  Klik atau drag file ke sini
                </span>
              </label>

              {data.files.length > 0 && (
                <div className="mt-3 text-left text-xs text-gray-600">
                  {Array.from(data.files).map((file, i) => (
                    <div key={i}>• {file.name}</div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>

        {/* BUTTON */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            className="px-6 py-2 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center gap-2"
            onClick={() => navigation(-1)}
          >
            <FaArrowLeft />
            Batal
          </button>

          <button className="px-6 py-2 rounded-full bg-blue-900 text-white flex items-center gap-2 hover:scale-105 transition">
            <FaSave />
            Simpan
          </button>

        </div>

      </div>
    </div>
  )
}

export default AddEditPengajuan