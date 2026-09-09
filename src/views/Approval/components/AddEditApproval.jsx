import React, { useEffect, useState } from 'react'
import {
  FaArrowLeft,
  FaSave,
  FaUserAlt,
  FaBriefcase,
  FaBuilding,
  FaUserCheck
} from 'react-icons/fa'

import { useLocation, useNavigate } from 'react-router-dom'
import { Label, Select } from 'components/atoms'
import { swal } from 'global/helper/swal'

const AddEditUserApproval = () => {
  const navigation = useNavigate()
  const location = useLocation()

  const isEditApproval =
    location?.state?.project === 'Edit User Approval'

  // DUMMY USER
  const dummyUsers = [
    {
      value: 'andi',
      label: 'Andi Pratama',
      jabatan: 'Manager Finance'
    },
    {
      value: 'budi',
      label: 'Budi Santoso',
      jabatan: 'Supervisor Pajak'
    },
    {
      value: 'rina',
      label: 'Rina Oktaviani',
      jabatan: 'Staff Treasury'
    },
    {
      value: 'dimas',
      label: 'Dimas Saputra',
      jabatan: 'Financial Controller'
    }
  ]

  // DUMMY EDIT
  const dummyEditData = {
    nama: {
      value: 'andi',
      label: 'Andi Pratama',
      jabatan: 'Manager Finance'
    },

    jabatan: 'Manager Finance',

    unit_approval: {
      value: 'financial_controller',
      label: 'Unit Financial Controller'
    }
  }

  // INITIAL
  const initialState = {
    nama: null,
    jabatan: '',
    unit_approval: null
  }

  const [data, setData] = useState(initialState)

  // SET EDIT DATA
  useEffect(() => {
    if (isEditApproval) {
      setData(dummyEditData)
    } else {
      setData(initialState)
    }
  }, [isEditApproval])

  // OPTIONS
  const options = {
    user: dummyUsers,

    unitApproval: [
      {
        value: 'financial_controller',
        label: 'Unit Financial Controller'
      },
      {
        value: 'keuangan_treasury',
        label: 'Unit Keuangan dan Treasury'
      },
      {
        value: 'unit_pajak',
        label: 'Unit Pajak'
      },
      {
        value: 'unit_logistik',
        label: 'Unit Logistik'
      },
      {
        value: 'unit_sdm',
        label: 'Unit SDM & Umum'
      },
      {
        value: 'unit_anggaran',
        label: 'Unit Anggaran'
      },
      {
        value: 'direktur_keuangan',
        label: 'Direktur Keuangan'
      }
    ]
  }

  // HANDLE USER SELECT
  const handleUserChange = (val) => {
    setData({
      ...data,
      nama: val,
      jabatan: val?.jabatan || ''
    })
  }

  // HANDLE SELECT
  const handleSelect = (name, value) => {
    setData({
      ...data,
      [name]: value
    })
  }

  // SAVE
  const handleSave = async () => {
    swal.loading()

    setTimeout(() => {
      swal.customHtml(
        isEditApproval
          ? 'User Approval Berhasil Diupdate'
          : 'User Approval Berhasil Ditambahkan',

        `
        <div style="font-size:18px">
          Nama User : <b>${data?.nama?.label}</b>
        </div>
        `,
        'success',
        false
      )
    }, 1000)
  }

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
            {isEditApproval
              ? 'Edit User Approval'
              : 'Tambah User Approval'}
          </div>

          <div className="text-sm font-light text-gray-500">
            Lengkapi data approval user dengan benar.
          </div>
        </div>

      </div>

      {/* CARD */}
      <div className="bg-white border shadow-md rounded-2xl p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* NAMA USER */}
          <div>
            <Label
              icon={<FaUserAlt className="text-green-500" />}
              label="Nama User"
              children={
                <Select
                  options={options.user}
                  value={data.nama}
                  onChange={handleUserChange}
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
                  value={data.jabatan}
                  disabled
                  className="
                    input input-bordered
                    bg-gray-100
                    w-full
                    rounded-full
                    text-gray-600
                  "
                />
              }
            />
          </div>

          {/* UNIT APPROVAL */}
          <div className="md:col-span-2">
            <Label
              icon={<FaBuilding className="text-orange-500" />}
              label="Unit Approval"
              children={
                <Select
                  options={options.unitApproval}
                  value={data.unit_approval}
                  onChange={(val) =>
                    handleSelect('unit_approval', val)
                  }
                />
              }
            />
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
            {isEditApproval
              ? 'Simpan Perubahan'
              : 'Simpan'}
          </button>

        </div>

      </div>
    </div>
  )
}

export default AddEditUserApproval