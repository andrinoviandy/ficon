import React, { useEffect, useState } from 'react'
import {
  FaArrowLeft,
  FaSave,
  FaUserAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaUserShield,
  FaToggleOn,
  FaLock,
  FaBuilding,
  FaBriefcase,
  FaIdCard,
  FaUserTie,
  FaUniversity,
  FaHistory,
  FaCheckCircle,
  FaHome
} from 'react-icons/fa'

import { useLocation, useNavigate } from 'react-router-dom'
import { Label, Select } from 'components/atoms'
import { swal } from 'global/helper/swal'
import storeSchema from 'global/store'
import { formatDate } from 'global/helper/formatDate'
import { object } from 'prop-types'

const AddEditUserManagement = () => {
  const navigation = useNavigate()
  const location = useLocation()

  const isEditUser = location?.state?.project === 'Edit User'

  const [data, setData] = useState({})

  const getDetailUser = async () => {
    try {
      const res = await storeSchema.actions.getDetailUser(location?.state?.data?.user_id)
      if (res?.status === true) {
        setData(res?.data)
      } else {
        swal.error(res?.message || 'Gagal mendapatkan data pengajuan')
      }
    } catch (error) {
      swal.error('Terjadi kesalahan saat mendapatkan data pengajuan')
      console.error('Error fetching detail pengajuan:', error)
    }
  }

  useEffect(() => {
    if (isEditUser) {
      getDetailUser()
    }
  }, [isEditUser])

  // =========================
  // OPTIONS
  // =========================

  const [options, setOptions] = useState({
    cabang: [],
    jabatan: [],
    role: [],
    status: [
      {
        label: 'Aktif',
        value: 'Y'
      },
      {
        label: 'Non Aktif',
        value: 'T'
      }
    ],
    tipeUser: []
  })

  // =========================
  // HANDLE
  // =========================

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSelect = async (name, e) => {
    if (name === 'cabang_id') {
      const refJabatan = await storeSchema.actions.getReferensiByJenis('jabatan_id', '', e?.value)
      if (refJabatan?.status === true) {
        const data = refJabatan?.data?.map((item) => {
          return {
            label: item?.ur_ref,
            value: item?.kd_ref,
            data: item
          }
        })
        setOptions(prev => ({ ...prev, jabatan: data }))
      }
      const refRole = await storeSchema.actions.getReferensiByJenis('role_id', '', e?.value)
      if (refRole?.status === true) {
        const data = refRole?.data?.filter(a => !['RL00'].includes(a?.kd_ref))?.sort((a, b) => a.kd_ref - b.kd_ref)?.map((item) => {
          return {
            label: item?.ur_ref,
            value: item?.kd_ref,
          }
        })
        setOptions(prev => ({ ...prev, roleUser: data }))
      }
    }
    if (name === 'unit_id') {
      delete data?.unit_kerja_id
      delete data?.ur_unit_kerja_id
      const refUnitKerja = await storeSchema.actions.getSubReferensiByJenis('unit_kerja_id', e?.value)
      if (refUnitKerja?.status === true) {
        const data = refUnitKerja?.data?.map((item) => {
          return {
            label: item?.ur_ref,
            value: item?.kd_ref,
          }
        })
        setOptions(prev => ({ ...prev, unitKerja: data }))
      }
    }
    setData((prev) => ({
      ...prev,
      [name]: e?.value ?? '',
      ['ur_' + name]: e?.label ?? ''
    }))
  }

  const handleSave = async () => {
    swal.loading()
    try {
      if (data?.cabang_id) {
        if (data?.role_id === 'RL01' && data?.jenis_user_id) {
          delete data?.jenis_user_id;
          Object.assign(data, { jenis_user_id: "" })
        }
        if (data?.cabang_id === '2000' && data?.tipe_user === '2') {
          if (!data?.role_id) {
            await swal.warning('Kantor Pusat Wajib Isian Role !')
            return
          }
          if (!data?.unit_id) {
            await swal.warning('Kantor Pusat Wajib Mengisi Unit !')
            return
          }
          if (!data?.unit_kerja_id) {
            await swal.warning('Kantor Pusat Wajib Mengisi Sub Unit !')
            return
          }
          if (!data?.jabatan_id) {
            await swal.warning('Kantor Pusat Wajib Mengisi Jabatan !')
            return
          }
        }
        if (data?.cabang_id !== '2000' && data?.tipe_user === '2') {
          if (!data?.role_id) {
            await swal.warning('Wajib Mengisi Role !')
            return
          }
          if (!data?.jabatan_id) {
            await swal.warning('Wajib Mengisi Jabatan !')
            return
          }
        }
      }
      const res = isEditUser ? await storeSchema.actions.updateUser(data) : await storeSchema.actions.insertUser(data);
      if (res?.status === true) {
        await swal.success('Data Berhasil Disimpan !')
        navigation("/user-management", {
          state: {
            ...location.state,
          },
        })

      } else {
        console.log('error nih', res?.data);
        await swal.error(res?.data?.data);
      };

    } catch (error) {
      console.log('error nih', error);
      swal.error(error?.response?.data)
    }
  }

  console.log('data', data);


  useEffect(() => {
    const getReferensi = async () => {
      const refCabang = await storeSchema.actions.getReferensiByJenis('cabang_id')
      if (refCabang?.status === true) {
        const data = refCabang?.data?.map((item) => {
          return {
            label: item?.ur_ref,
            value: item?.kd_ref,
          }
        })
        setOptions(prev => ({ ...prev, cabang: data }))
      }
      const refRoleAtasan = await storeSchema.actions.getReferensiByJenis('role_id')
      if (refRoleAtasan?.status === true) {
        const data = refRoleAtasan?.data?.filter(a => ['RL15', 'RL16'].includes(a?.kd_ref))?.map((item) => {
          return {
            label: item?.ur_ref,
            value: item?.kd_ref,
          }
        })
        setOptions(prev => ({ ...prev, roleAtasan: data }))
      }
      const refUnitId = await storeSchema.actions.getReferensiByJenis('unit_id')
      if (refUnitId?.status === true) {
        const data = refUnitId?.data?.map((item) => {
          return {
            label: item?.ur_ref,
            value: item?.kd_ref,
          }
        })
        setOptions(prev => ({ ...prev, unitId: data }))
      }
      const refTipeUser = await storeSchema.actions.getReferensiByJenis('tipe_user')
      if (refTipeUser?.status === true) {
        const data = refTipeUser?.data?.map((item) => {
          return {
            label: item?.ur_ref,
            value: item?.kd_ref,
          }
        })
        setOptions(prev => ({ ...prev, tipeUser: data }))
      }
      const refJenisUser = await storeSchema.actions.getReferensiByJenis('jenis_user_id')
      if (refJenisUser?.status === true) {
        const data = refJenisUser?.data?.map((item) => {
          return {
            label: item?.ur_ref,
            value: item?.kd_ref,
          }
        })
        setOptions(prev => ({ ...prev, jenisUser: data }))
      }
    }
    getReferensi()
    // eslint-disable-next-line
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
          <div className="text-2xl font-bold text-blue-900">
            {isEditUser ? 'Edit User' : 'Tambah User'}
          </div>

          <div className="text-sm font-light text-gray-500">
            Lengkapi data user dengan benar.
          </div>
        </div>

      </div>

      {/* ========================= */}
      {/* DATA USER */}
      {/* ========================= */}

      <div className="bg-white border shadow-md rounded-2xl p-6 mb-6">

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
            <FaUserAlt className="text-blue-900" />
          </div>

          <div>
            <div className="font-bold text-lg text-blue-900">
              Data User
            </div>

            <div className="text-sm text-gray-500">
              Informasi utama user.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* NIP */}
          <Label
            icon={<FaIdCard className="text-blue-500" />}
            label="NIP"
            children={
              <input
                name="nip"
                value={data.nip}
                onChange={handleChange}
                placeholder="Masukkan NIP"
                className="input input-bordered bg-white w-full rounded-full"
              />
            }
          />

          {/* NAMA */}
          <Label
            icon={<FaUserAlt className="text-green-500" />}
            label="Nama"
            children={
              <input
                name="nama"
                value={data.nama}
                onChange={handleChange}
                placeholder="Masukkan nama"
                className="input input-bordered bg-white w-full rounded-full"
              />
            }
          />

          {/* TANGGAL LAHIR */}
          <Label
            icon={<FaCalendarAlt className="text-pink-500" />}
            label="Tanggal Lahir"
            children={
              <input
                type="date"
                name="tgl_lahir"
                value={data?.tgl_lahir}
                onChange={handleChange}
                className="input input-bordered bg-white w-full rounded-full"
              />
            }
          />

          {/* EMAIL */}
          <Label
            icon={<FaEnvelope className="text-cyan-500" />}
            label="Email"
            children={
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className="input input-bordered bg-white w-full rounded-full"
              />
            }
          />

          {/* STATUS */}
          <Label
            icon={<FaToggleOn className="text-green-500" />}
            label="Status"
            children={
              <Select
                options={options?.status}
                value={{ value: data?.flag_aktif, label: data?.ur_flag_aktif }}
                onChange={(val) => handleSelect('flag_aktif', val)}
              />
            }
          />

          {/* Tipe */}
          <Label
            icon={<FaUserTie className="text-green-500" />}
            label="Tipe User"
            children={
              <Select
                options={options?.tipeUser}
                value={{ label: data?.ur_tipe_user, value: data?.tipe_user }}
                onChange={(val) => handleSelect('tipe_user', val)}
              />
            }
          />

        </div>
      </div>

      {/* ========================= */}
      {/* AKUN LOGIN */}
      {/* ========================= */}
      {data?.tipe_user === '2' && (
        <div className="bg-white border shadow-md rounded-2xl p-6 mb-6 border-blue-200">

          <div className="flex items-center gap-3 mb-5">

            <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">
              <FaLock className="text-red-500" />
            </div>

            <div>
              <div className="font-bold text-lg text-red-500">
                Akun Login Anda
              </div>

              <div className="text-sm text-gray-500">
                Username dan password wajib diisi.
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* USERNAME */}
            <Label
              icon={<FaUserShield className="text-orange-500" />}
              label="Username"
              children={
                <input
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="Masukkan username"
                  className="
                  input input-bordered
                  bg-red-50
                  border-red-300
                  w-full
                  rounded-full
                "
                />
              }
            />

            {/* PASSWORD */}
            <Label
              icon={<FaLock className="text-red-500" />}
              label="Password"
              children={
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  className="
                  input input-bordered
                  bg-red-50
                  border-red-300
                  w-full
                  rounded-full
                "
                />
              }
            />

          </div>
        </div>
      )}

      {/* ========================= */}
      {/* PEKERJAAN */}
      {/* ========================= */}

      <div className="bg-white border shadow-md rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center">
            <FaUserTie className="text-purple-600" />
          </div>

          <div>
            <div className="font-bold text-lg text-purple-700">
              Pekerjaan Saat Ini
            </div>

            <div className="text-sm text-gray-500">
              Informasi pekerjaan aktif user.
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* CABANG */}
          <Label
            icon={<FaBuilding className="text-blue-500" />}
            label="Cabang Aktif"
            children={
              <Select
                options={options.cabang}
                value={{ value: data?.cabang_id, label: data?.ur_cabang_id }}
                onChange={(val) => handleSelect('cabang_id', val)}
              />
            }
          />

          {/* ROLE */}
          {data?.tipe_user === '2' && (
            <>
              <Label
                icon={<FaUserShield className="text-orange-500" />}
                label="Role User"
                children={
                  <Select
                    options={options.roleUser}
                    value={{ value: data?.role_id, label: data?.ur_role_id }}
                    onChange={(val) => handleSelect('role_id', val)}
                  />
                }
              />
              {/* {data?.cabang_id === '2000' && ['RL01'].includes(data?.role_id) && (
                <Label
                  icon={<FaUserAlt className="text-red-500" />}
                  label="Role Atasan"
                  children={
                    <Select
                      options={options.roleAtasan}
                      value={{ value: data?.role_atasan_id, label: data?.ur_role_atasan_id }}
                      onChange={(val) => handleSelect('role_atasan_id', val)}
                    />
                  }
                />
              )} */}
            </>
          )}

          {Number(data?.cabang_id) === 2000 && (
            <>
              <Label
                icon={<FaUniversity className="text-blue-500" />}
                label="Unit"
                children={
                  <Select
                    options={options.unitId}
                    value={{ value: data?.unit_id, label: data?.ur_unit_id }}
                    onChange={(val) => handleSelect('unit_id', val)}
                  />
                }
              />
              <Label
                icon={<FaUniversity className="text-blue-500" />}
                label="Sub Unit"
                children={
                  <Select
                    options={options?.unitKerja}
                    isDisabled={!data?.unit_id}
                    value={{ value: data?.unit_kerja_id, label: data?.ur_unit_kerja_id }}
                    onChange={(val) => handleSelect('unit_kerja_id', val)}
                  />
                }
              />
            </>
          )}

          {/* JABATAN */}
          <Label
            icon={<FaBriefcase className="text-purple-500" />}
            label="Jabatan Aktif"
            children={
              <Select
                options={options.jabatan}
                value={{ value: data?.jabatan_id, label: data?.ur_jabatan_id }}
                onChange={(val) => handleSelect('jabatan_id', val)}
              />
            }
          />

          {data?.tipe_user === '2' && (
            <>
              {!['RL01'].includes(data?.role_id) && data?.role_id && (
                <Label
                  icon={<FaCheckCircle className="text-orange-500" />}
                  label="Jenis User"
                  children={
                    <Select
                      // options={[
                      //   {
                      //     label: 'Approval',
                      //     value: 'T'
                      //   },
                      //   {
                      //     label: 'Verifikator',
                      //     value: 'Y'
                      //   },
                      // ]}
                      options={options.jenisUser}
                      value={{ value: data?.jenis_user_id, label: data?.ur_jenis_user_id }}
                      onChange={(val) => handleSelect('jenis_user_id', val)}
                    />
                  }
                />
              )}
              {/* {data?.cabang_id === '2000' && ['RL01'].includes(data?.role_id) && (
                <Label
                  icon={<FaUserAlt className="text-red-500" />}
                  label="Role Atasan"
                  children={
                    <Select
                      options={options.roleAtasan}
                      value={{ value: data?.role_atasan_id, label: data?.ur_role_atasan_id }}
                      onChange={(val) => handleSelect('role_atasan_id', val)}
                    />
                  }
                />
              )} */}
            </>
          )}

          {/* TGL AKTIF */}
          <Label
            icon={<FaCalendarAlt className="text-pink-500" />}
            label="Tanggal Aktif Bekerja"
            children={
              <input
                type="date"
                name="tgl_aktif_bekerja"
                value={data.tgl_aktif_bekerja}
                onChange={handleChange}
                className="input input-bordered bg-white w-full rounded-full"
              />
            }
          />

        </div>

        {isEditUser && (
          <div className="bg-white border shadow-md rounded-2xl p-6 mt-6">

            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-indigo-100 flex items-center justify-center">
                <FaHistory className="text-indigo-600" />
              </div>

              <div>
                <div className="font-bold text-lg text-indigo-700">
                  Riwayat Penempatan
                </div>

                <div className="text-sm text-gray-500">
                  Histori mutasi dan penempatan pegawai.
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border">

              <table className="table table-zebra">

                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th>No</th>
                    <th>
                      <div className="flex items-center gap-2">
                        <FaBuilding />
                        Cabang
                      </div>
                    </th>
                    <th>
                      <div className="flex items-center gap-2">
                        <FaUserShield />
                        Role User
                      </div>
                    </th>
                    <th>
                      <div className="flex items-center gap-2">
                        <FaUniversity />
                        Unit
                      </div>
                    </th>
                    <th>
                      <div className="flex items-center gap-2">
                        <FaHome />
                        Sub Unit
                      </div>
                    </th>

                    <th>
                      <div className="flex items-center gap-2">
                        <FaBriefcase />
                        Jabatan
                      </div>
                    </th>
                    <th>
                      <div className="flex items-center gap-2">
                        <FaCheckCircle />
                        Approval / Verifikator
                      </div>
                    </th>

                    <th>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt />
                        Tgl Aktif
                      </div>
                    </th>

                    {/* <th>
                      <div className="flex items-center gap-2">
                        <FaUserTie />
                        Role Atasan
                      </div>
                    </th> */}

                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {data?.role?.length > 0 ? (
                    data.role.map((item, index) => (
                      <tr
                        key={item.role_user_id}
                        className={
                          item.is_aktif === "Y"
                            ? "bg-green-50 hover:bg-green-100"
                            : ""
                        }
                      >
                        <td>{index + 1}</td>

                        <td>
                          <div className="font-medium">
                            {item.ur_cabang_id}
                          </div>
                        </td>

                        <td>
                          {item.ur_role_id}
                        </td>

                        <td>
                          {item.ur_unit_id}
                        </td>

                        <td>
                          {item.ur_unit_kerja_id || "-"}
                        </td>

                        <td>
                          {item.ur_jabatan_id}
                        </td>

                        <td>
                          {item.ur_jenis_user_id || '-'}
                        </td>

                        <td>
                          {formatDate(item.tgl_aktif_bekerja)}
                        </td>

                        {/* <td>
                          {item.ur_role_atasan_id || '-'}
                        </td> */}

                        <td>
                          {item.is_aktif === "Y" ? (
                            <span className="badge badge-success gap-2 text-white">
                              <FaCheckCircle size={12} />
                              Aktif
                            </span>
                          ) : (
                            <span className="badge badge-error gap-2 text-white text-nowrap">
                              <FaHistory size={12} />
                              Non Aktif
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-10">
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                          <FaHistory size={28} />
                          <span>Belum ada riwayat penempatan</span>
                        </div>
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>
        )}
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
            {isEditUser ? 'Simpan Perubahan' : 'Simpan'}
          </button>

        </div>

      </div>
    </div>
  )
}

export default AddEditUserManagement