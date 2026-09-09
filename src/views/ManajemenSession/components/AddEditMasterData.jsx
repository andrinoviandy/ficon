import React, { useEffect, useState } from 'react'
import {
  FaArrowLeft,
  FaSave,
  FaCode,
  FaDatabase,
  FaListAlt,
  FaLayerGroup,
  FaToggleOn
} from 'react-icons/fa'

import { useLocation, useNavigate } from 'react-router-dom'
import { Label, Select } from 'components/atoms'
import { swal } from 'global/helper/swal'
import storeSchema from 'global/store'
import { FaNoteSticky } from 'react-icons/fa6'

const AddEditMasterData = () => {
  const navigation = useNavigate()
  const location = useLocation()

  const isEditMasterData =
    location?.state?.project === 'Edit Master Data'

  // =========================
  // OPTIONS
  // =========================
  const [namaReferensiOptions, setNamaReferensiOptions] = useState([])

  const getReferensi = async (keyword) => {
    const res = await storeSchema.actions.getReferensiByJenisGroup(keyword)
    if (res?.status === true) {
      const data = res?.data?.map(item => ({
        label: item?.ur_jns_ref,
        value: item?.jns_ref,
        data: item
      }))
      setNamaReferensiOptions(data)
    }
  }

  const statusOptions = [
    {
      value: 'Y',
      label: 'Aktif'
    },
    {
      value: 'T',
      label: 'Non Aktif'
    }
  ]

  // =========================
  // DUMMY EDIT DATA
  // =========================
  const dummyEditData = {
    kode_referensi: 'CBG01',

    nama_referensi: {
      value: 'cabang_id',
      label: 'Cabang'
    },

    uraian: 'Jakarta',

    sub_kode_referensi: 'JKT',

    status: {
      value: 'aktif',
      label: 'Aktif'
    }
  }

  // =========================
  // INITIAL STATE
  // =========================
  const initialState = {
    kode_referensi: '',
    nama_referensi: null,
    uraian: '',
    sub_kode_referensi: '',
    status: null
  }

  const [data, setData] = useState({})

  const getDetailData = async () => {
    try {
      const res = await storeSchema.actions.getDetailMasterData(location?.state?.data?.ref_id)
      if (res?.status === true) {
        setData({ ...res?.data, ur_flag_aktif: res?.data?.flag_aktif === 'Y' ? 'Aktif' : 'Non Aktif' })
      } else {
        swal.error(res?.message || 'Gagal mendapatkan data')
      }
    } catch (error) {
      swal.error('Terjadi kesalahan saat mendapatkan data')
      console.error('Error fetching detail:', error)
    }
  }
  // =========================
  // SET EDIT DATA
  // =========================
  useEffect(() => {
    if (isEditMasterData) {
      getDetailData()
    }
  }, [isEditMasterData])

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSelect = async (name, e) => {
    if (name === 'jns_ref') {
      setData((prev) => ({
        ...prev,
        ur_jns_ref: e?.data?.ur_jns_ref ?? '',
        kd_ref_end: e?.data?.kd_ref_end ?? ''
      }))
    }
    setData((prev) => ({
      ...prev,
      [name]: e?.value ?? '',
      ['ur_' + name]: e?.label ?? ''
    }))
  }

  // =========================
  // SAVE
  // =========================
  const handleSave = async () => {
    swal.loading()
    try {
      const res = isEditMasterData ? await storeSchema.actions.updateMasterData(data) : await storeSchema.actions.insertMasterData(data);
      if (res?.status === true) {
        await swal.success('Data Berhasil Disimpan !')
        navigation("/master-data", {
          state: {
            ...location.state,
          },
        })

      } else {
        console.log('error nih', res?.data);
        await swal.custom('Tidak Dapat Disimpan !', res?.data?.data, 'warning');
      };

    } catch (error) {
      console.log('error nih', error);
      swal.error(error?.response?.data)
    }
  }

  useEffect(() => {
    getReferensi('')
  }, [])

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
            {isEditMasterData
              ? 'Edit Master Data'
              : 'Tambah Master Data'}
          </div>

          <div className="text-sm font-light text-gray-500">
            Lengkapi data master referensi dengan benar.
          </div>
        </div>

      </div>

      {/* CARD */}
      <div className="bg-white border shadow-md rounded-2xl p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* NAMA REFERENSI */}
          <div>
            <Label
              icon={<FaDatabase className="text-green-500" />}
              label="Jenis Referensi"
              children={
                <Select
                  options={namaReferensiOptions}
                  value={{ value: data?.jns_ref, label: data?.ur_jns_ref }}
                  onChange={(val) => handleSelect('jns_ref', val)}
                />
              }
            />
          </div>

          {/* KODE REFERENSI END */}
          {!isEditMasterData && (
            <div>
              <Label
                icon={<FaCode className="text-blue-500" />}
                label="Kode Referensi Terakhir"
                children={
                  <input
                    name="kd_ref_end"
                    value={data.kd_ref_end}
                    disabled
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
          )}

          {/* KODE REFERENSI */}
          <div>
            <Label
              icon={<FaCode className="text-blue-500" />}
              label="Kode Referensi"
              children={
                <input
                  name="kd_ref"
                  value={data.kd_ref}
                  onChange={handleChange}
                  placeholder="Contoh : CBG01"
                  className="
                    input input-bordered
                    bg-white
                    w-full
                    rounded-full
                  "
                  disabled={isEditMasterData}
                />
              }
            />
          </div>

          {/* URAIAN */}
          <div>
            <Label
              icon={<FaListAlt className="text-orange-500" />}
              label="Nama Referensi"
              children={
                <input
                  name="ur_ref"
                  value={data?.ur_ref}
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

          {/* SUB KODE */}
          {/* <div>
            <Label
              icon={<FaLayerGroup className="text-purple-500" />}
              label="Sub Kode Referensi"
              children={
                <input
                  name="sub_kd_ref"
                  value={data?.sub_kd_ref}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="
                    input input-bordered
                    bg-white
                    w-full
                    rounded-full
                  "
                />
              }
            />
          </div> */}

          {/* STATUS */}
          <div>
            <Label
              icon={<FaNoteSticky className="text-orange-500" />}
              label="Keterangan"
              children={
                <input
                  name="keterangan"
                  value={data?.keterangan}
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

          <div>
            <Label
              icon={<FaToggleOn className="text-cyan-500" />}
              label="Status"
              children={
                <Select
                  options={statusOptions}
                  value={{ label: data?.ur_flag_aktif, value: data?.flag_aktif }}
                  onChange={(val) => handleSelect('flag_aktif', val)}
                />
              }
            />
          </div>

        </div>

        {/* PREVIEW */}
        <div
          className="
            mt-6
            bg-blue-50
            border border-blue-100
            rounded-2xl
            p-4
          "
        >

          <div className="text-sm text-gray-500 mb-2">
            Preview Data Referensi
          </div>

          <div className="flex flex-wrap gap-3">

            <div
              className="
                px-4 py-2 rounded-xl
                bg-white border
                text-sm
              "
            >
              <span className="font-semibold text-gray-500">
                Referensi :
              </span>{' '}

              <span className="font-bold text-green-700">
                {data?.ur_jns_ref || '-'}
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
                Kode :
              </span>{' '}

              <span className="font-bold text-blue-900">
                {data?.kd_ref || '-'}
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
                Nama Referensi :
              </span>{' '}

              <span className="font-bold text-orange-600">
                {data?.ur_ref || '-'}
              </span>
            </div>

            {/* <div
              className="
                px-4 py-2 rounded-xl
                bg-white border
                text-sm
              "
            >
              <span className="font-semibold text-gray-500">
                Sub Kode :
              </span>{' '}

              <span className="font-bold text-purple-600">
                {data?.sub_kd_ref || '-'}
              </span>
            </div> */}

            <div
              className="
                px-4 py-2 rounded-xl
                bg-white border
                text-sm
              "
            >
              <span className="font-semibold text-gray-500">
                Keterangan :
              </span>{' '}

              <span className="font-bold text-orange-600">
                {data?.keterangan || '-'}
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

              <span className="font-bold text-cyan-600">
                {data?.ur_flag_aktif || '-'}
              </span>
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

            {isEditMasterData
              ? 'Simpan Perubahan'
              : 'Simpan'}
          </button>

        </div>

      </div>
    </div>
  )
}

export default AddEditMasterData