import React, { useEffect, useState } from 'react'
import {
  FaArrowLeft,
  FaSave,
  FaBuilding,
  FaListAlt,
  FaToggleOn
} from 'react-icons/fa'

import { useLocation, useNavigate } from 'react-router-dom'
import { Label, Select } from 'components/atoms'
import { swal } from 'global/helper/swal'

const AddEditAnggaran = () => {
  const navigation = useNavigate()
  const location = useLocation()

  const isEditAnggaran =
    location?.state?.project === 'Edit Anggaran'

  // DUMMY EDIT DATA
  const dummyEditData = {
    cabang: {
      value: 'jakarta',
      label: 'Jakarta'
    },

    account_desc: {
      value: '510001',
      label: '510001 - Biaya Operasional Kantor'
    },

    status: {
      value: 'Y',
      label: 'Aktif'
    }
  }

  // INITIAL STATE
  const initialState = {
    cabang: null,
    account_desc: null,
    status: {
      value: 'Y',
      label: 'Aktif'
    }
  }

  const [data, setData] = useState(initialState)

  // SET EDIT
  useEffect(() => {
    if (isEditAnggaran) {
      setData(dummyEditData)
    } else {
      setData(initialState)
    }
  }, [isEditAnggaran])

  // OPTIONS
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
      },
      {
        value: 'semarang',
        label: 'Semarang'
      },
      {
        value: 'makassar',
        label: 'Makassar'
      }
    ],

    accountDesc: [
      {
        value: '510001',
        label: '510001 - Biaya Operasional Kantor'
      },
      {
        value: '510002',
        label: '510002 - Biaya Listrik'
      },
      {
        value: '510003',
        label: '510003 - Biaya Transportasi'
      },
      {
        value: '510004',
        label: '510004 - Biaya Pengiriman'
      },
      {
        value: '510005',
        label: '510005 - Biaya Vendor'
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
        isEditAnggaran
          ? 'Anggaran Berhasil Diupdate'
          : 'Anggaran Berhasil Ditambahkan',

        `
        <div style="font-size:18px">
          Profit Center : <b>${data?.cabang?.label}</b>
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
            {isEditAnggaran
              ? 'Edit Anggaran'
              : 'Tambah Anggaran'}
          </div>

          <div className="text-sm font-light text-gray-500">
            Lengkapi data anggaran dengan benar.
          </div>
        </div>

      </div>

      {/* CARD */}
      <div className="bg-white border shadow-md rounded-2xl p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

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

          {/* ACCOUNT DESC */}
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
          <div className="md:col-span-2">
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

          {/* PREVIEW */}
          <div className="md:col-span-2">

            <div
              className="
                bg-blue-50
                border border-blue-100
                rounded-2xl
                p-4
              "
            >
              <div className="text-sm text-gray-500 mb-1">
                Preview Anggaran
              </div>

              <div className="flex flex-wrap gap-3 mt-3">

                <div
                  className="
                    px-4 py-2 rounded-xl
                    bg-white border
                    text-sm
                  "
                >
                  <span className="font-semibold text-gray-500">
                    Profit Center :
                  </span>{' '}

                  <span className="font-bold text-orange-600">
                    {data?.cabang?.label || '-'}
                  </span>
                </div>

                <div
                  className="
                    px-4 py-2 rounded-xl
                    bg-white border
                    text-sm
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
                    bg-white border
                    text-sm
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
            {isEditAnggaran
              ? 'Simpan Perubahan'
              : 'Simpan'}
          </button>

        </div>

      </div>
    </div>
  )
}

export default AddEditAnggaran