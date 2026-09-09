import React, { useEffect, useState } from 'react'
import {
  FaArrowLeft,
  FaSave,
  FaUserAlt,
  FaUserShield,
  FaBuilding,
  FaBriefcase,
  FaUserTie,
  FaCheckCircle,
  FaPlus,
  FaSortNumericDown,
  FaClipboardList,
  FaTrash,
  FaEye,
  FaBullseye,
  FaStar,
  FaCopy,
  FaArrowDown,
  FaArrowUp
} from 'react-icons/fa'

import { useLocation, useNavigate } from 'react-router-dom'
import { Label, Select } from 'components/atoms'
import { swal } from 'global/helper/swal'
import storeSchema from 'global/store'

const AddEditMasterApproval = () => {
  const navigation = useNavigate()
  const location = useLocation()

  const isEditData = location?.state?.project === 'Edit Flow Approval'
  const isCloneData = location?.state?.project === 'Kloning Flow Approval'

  const [data, setData] = useState({})
  const dummyDetailApproval = {
    no_urut: 1,
    role_id: '',
    unit_kerja_id: '',
    jabatan_id: '',
    jenis_user_id: '',
    kegiatan: '',
    target_sla: '',
    view_only: '',
    flag_aktif: 'Y'
  }
  const [detailApproval, setDetailApproval] = useState([]);
  const [detailApprovalOld, setDetailApprovalOld] = useState([]);

  const reOrderNoUrut = (data) => {
    return data.map((item, index) => ({
      ...item,
      no_urut: index + 1
    }));
  };

  const getDetailData = async () => {
    try {
      const payload = {
        jenis_biaya_id: location?.state?.data?.jenis_biaya_id,
        unit_kerja_pemohon_id: location?.state?.data?.unit_kerja_pemohon_id,
        jabatan_pemohon_id: location?.state?.data?.jabatan_pemohon_id
      }
      const res = await storeSchema.actions.getDataMasterApprovalAll(payload)
      if (res?.status === true) {
        setData(res?.data)
        setDetailApproval(res?.data?.detail_data)
        setDetailApprovalOld(res?.data?.detail_data)
      } else {
        swal.error(res?.message || 'Gagal mendapatkan data')
      }
    } catch (error) {
      swal.error('Terjadi kesalahan saat mendapatkan data')
      console.error('Error fetching detail:', error)
    }
  }

  useEffect(() => {
    if (isEditData || isCloneData) {
      getDetailData()
    }
  }, [isEditData, isCloneData])

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
    setData((prev) => ({
      ...prev,
      [name]: e?.value ?? '',
      ['ur_' + name]: e?.label ?? ''
    }))
  }

  const handleSelectDetail = (index, name, e) => {
    setDetailApproval(prev =>
      prev.map((item, idx) =>
        idx === index
          ? {
            ...item,
            [name]: e?.value ?? '',
            ['ur_' + name]: e?.label ?? ''
          }
          : item
      )
    )
  }

  const handleSave = async () => {
    swal.loading()
    try {
      if (detailApproval?.filter(a => a.jenis_biaya_id === '' || !a.jenis_user_id).length > 0) {
        return swal.custom('Tidak Dapat Disimpan !', 'Jenis User Tidak Boleh Kosong', 'warning');
      }
      const detail = detailApproval.map((item, index) => ({
        ...item,
        jenis_biaya_id: data?.jenis_biaya_id,
        unit_kerja_pemohon_id: data?.unit_kerja_pemohon_id,
        jabatan_pemohon_id: data?.jabatan_pemohon_id,
        no_urut: index + 1
      }));

      const detailOld = detailApprovalOld;

      const res = isEditData ? await storeSchema.actions.updateMasterApproval({ detail: detail, detailOld: detailOld }) : await storeSchema.actions.insertMasterApproval(detail);
      if (res?.status === true) {
        await swal.success('Data Berhasil Disimpan !')
        navigation("/master-approval", {
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

  const handleAddRow = () => {
    setDetailApproval(prev =>
      reOrderNoUrut([
        ...prev,
        dummyDetailApproval
      ])
    );
  };

  const handleRemoveRow = (index) => {
    setDetailApproval(prev =>
      reOrderNoUrut(
        prev.filter((_, i) => i !== index)
      )
    );
  };

  const handleCopyRow = (index, position) => {
    setDetailApproval(prev => {
      if (!prev[index]) return prev;

      const copiedItem = JSON.parse(JSON.stringify(prev[index]));
      const insertIndex = position === 'above' ? index : index + 1;
      const newData = [...prev];

      newData.splice(insertIndex, 0, copiedItem);
      return reOrderNoUrut(newData);
    });
  };

  const handleMoveRow = (index, direction) => {
    setDetailApproval(prev => {
      const newData = [...prev];

      if (direction === "up" && index > 0) {
        [newData[index - 1], newData[index]] = [
          newData[index],
          newData[index - 1],
        ];
      }

      if (direction === "down" && index < newData.length - 1) {
        [newData[index], newData[index + 1]] = [
          newData[index + 1],
          newData[index],
        ];
      }

      return reOrderNoUrut(newData);
    });
  };

  const handleChangeDetail = (index, field, value) => {
    const temp = [...detailApproval];

    temp[index] = {
      ...temp[index],
      [field]:
        ['view_only', 'flag_aktif'].includes(field)
          ? (value ? 'Y' : 'T')
          : value
    };

    setDetailApproval(temp);
  };

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
      const refRole = await storeSchema.actions.getReferensiByJenis('role_id', '', '')
      if (refRole?.status === true) {
        const data = refRole?.data?.filter(a => !['RL00'].includes(a?.kd_ref))?.map((item) => {
          return {
            label: item?.ur_ref,
            value: item?.kd_ref,
          }
        })
        setOptions(prev => ({ ...prev, roleUser: data }))
      }
      const refJabatan = await storeSchema.actions.getReferensiByJenis('jabatan_id', '', '')
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
      const refJenisBiaya = await storeSchema.actions.getReferensiByJenis('jenis_biaya_id')
      if (refJenisBiaya?.status === true) {
        const data = refJenisBiaya?.data?.map((item) => {
          return {
            label: item?.ur_ref,
            value: item?.kd_ref,
          }
        })
        setOptions(prev => ({ ...prev, jenisBiaya: data }))
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
      const refUnitKerja = await storeSchema.actions.getReferensiByJenis('unit_kerja_id')
      if (refUnitKerja?.status === true) {
        const data = refUnitKerja?.data?.map((item) => {
          return {
            label: item?.ur_ref,
            value: item?.kd_ref,
          }
        })
        setOptions(prev => ({ ...prev, unitKerja: data }))
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
            {location?.state?.project}
          </div>

          <div className="text-sm font-light text-gray-500">
            Lengkapi data approval dengan benar.
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
              Data Pemohon
            </div>

            <div className="text-sm text-gray-500">
              Informasi Utama Pemohon.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Label
            icon={<FaBuilding className="text-blue-500" />}
            label="Jenis Biaya"
            children={
              <Select
                options={options?.jenisBiaya}
                value={{ value: data?.jenis_biaya_id, label: data?.ur_jenis_biaya_id }}
                onChange={(val) => handleSelect('jenis_biaya_id', val)}
              />
            }
          />
          {/* <Label
            icon={<FaBuilding className="text-blue-500" />}
            label="Unit Kerja Pemohon"
            children={
              <Select
                options={options?.unitKerja}
                value={{ value: data?.unit_kerja_pemohon_id, label: data?.ur_unit_kerja_pemohon_id }}
                onChange={(val) => handleSelect('unit_kerja_pemohon_id', val)}
              />
            }
          /> */}
          <Label
            icon={<FaBriefcase className="text-blue-500" />}
            label="Jabatan Pemohon"
            children={
              <Select
                options={options?.jabatan}
                value={{ value: data?.jabatan_pemohon_id, label: data?.ur_jabatan_pemohon_id }}
                onChange={(val) => handleSelect('jabatan_pemohon_id', val)}
              />
            }
          />

        </div>
      </div>

      {/* ========================= */}
      {/* PEKERJAAN */}
      {/* ========================= */}

      <div className="bg-white border shadow-md rounded-2xl p-6">


        <div>

          <div className="flex justify-between items-center mb-5">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center">
                <FaUserTie className="text-purple-600" />
              </div>

              <div>
                <div className="font-bold text-lg text-purple-700">
                  Detail Flow Approval
                </div>

                <div className="text-sm text-gray-500">
                  Atur urutan approval dan pihak yang terlibat.
                </div>
              </div>

            </div>

            <button
              type="button"
              onClick={handleAddRow}
              className="
        btn btn-outline text-white btn-primary
        rounded-full
        gap-2
        shadow-md
        hover:scale-105
        transition-all
      "
            >
              <FaPlus />
              Tambah Flow
            </button>

          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">

            <table className="table">

              <thead className="bg-slate-100 text-slate-700">

                <tr>

                  <th>
                    <div className="flex items-center gap-2">
                      <FaSortNumericDown />
                      Approval Ke-
                    </div>
                  </th>

                  <th>
                    <div className="flex items-center gap-2">
                      <FaUserShield />
                      Unit / Role
                    </div>
                  </th>

                  <th>
                    <div className="flex items-center gap-2">
                      <FaBuilding />
                      Sub Unit
                    </div>
                  </th>

                  <th>
                    <div className="flex items-center gap-2">
                      <FaUserTie />
                      Jabatan
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle />
                      Jenis User
                    </div>
                  </th>

                  <th>
                    <div className="flex items-center gap-2">
                      <FaClipboardList />
                      Kegiatan
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center gap-2">
                      <FaBullseye />
                      Target SLA (Hari)
                    </div>
                  </th>

                  {/* <th>
                    <div className="flex items-center gap-2">
                      <FaCheckCircle />
                      Wajib Verifikasi
                    </div>
                  </th> */}

                  <th>
                    <div className="flex items-center gap-2">
                      <FaEye />
                      View Only
                    </div>
                  </th>

                  <th>
                    <div className="flex items-center gap-2">
                      <FaStar />
                      Aktif
                    </div>
                  </th>

                  <th className="text-center">
                    Aksi
                  </th>

                </tr>

              </thead>

              <tbody>

                {detailApproval.map((item, index) => (

                  <tr
                    key={index}
                    className="hover:bg-slate-50 transition-colors"
                  >

                    <td className="font-semibold text-center">
                      {item.no_urut}
                    </td>

                    <td className="min-w-[220px]">

                      <Select
                        options={options?.roleUser}
                        value={{
                          value: item?.role_id,
                          label: item?.ur_role_id
                        }}
                        onChange={(e) =>
                          handleSelectDetail(
                            index,
                            'role_id',
                            e
                          )
                        }
                        menuPortalTarget={document.body}
                      />

                    </td>

                    <td className="min-w-[350px]">

                      <Select
                        options={[
                          { label: '', value: '' },
                          ...(options?.unitKerja || [])
                        ]}
                        value={
                          item?.unit_kerja_id || item?.ur_unit_kerja_id
                            ? {
                              value: item?.unit_kerja_id || '',
                              label: item?.ur_unit_kerja_id || ''
                            }
                            : { label: '', value: '' }
                        }
                        onChange={(e) =>
                          handleSelectDetail(
                            index,
                            'unit_kerja_id',
                            e
                          )
                        }
                        menuPortalTarget={document.body}
                      />

                    </td>

                    <td className="min-w-[220px]">

                      <Select
                        options={options?.jabatan}
                        value={{
                          value: item?.jabatan_id,
                          label: item?.ur_jabatan_id
                        }}
                        onChange={(e) =>
                          handleSelectDetail(
                            index,
                            'jabatan_id',
                            e
                          )
                        }
                        menuPortalTarget={document.body}
                      />

                    </td>
                    <td className="min-w-[220px]">

                      <Select
                        options={options?.jenisUser}
                        value={{
                          value: item?.jenis_user_id,
                          label: item?.ur_jenis_user_id
                        }}
                        onChange={(e) =>
                          handleSelectDetail(
                            index,
                            'jenis_user_id',
                            e
                          )
                        }
                        menuPortalTarget={document.body}
                      />

                    </td>

                    <td className="min-w-[280px]">

                      <input
                        type="text"
                        className="bg-white input input-bordered input-md w-full rounded-full"
                        value={item.kegiatan}
                        onChange={(e) =>
                          handleChangeDetail(
                            index,
                            "kegiatan",
                            e.target.value
                          )
                        }
                        menuPortalTarget={document.body}
                      />

                    </td>
                    <td className="min-w-[150px]">

                      <input
                        type="number"
                        className="bg-white input input-bordered input-md w-full rounded-full"
                        value={item.target_sla}
                        onChange={(e) =>
                          handleChangeDetail(
                            index,
                            "target_sla",
                            e.target.value
                          )
                        }
                      />

                    </td>

                    {/* <td className="text-center">

                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={item.wajib_verifikasi === 'Y'}
                        onChange={(e) =>
                          handleChangeDetail(
                            index,
                            "wajib_verifikasi",
                            e.target.checked
                          )
                        }
                      />

                    </td> */}
                    <td className="text-center">

                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={item.view_only === 'Y'}
                        onChange={(e) =>
                          handleChangeDetail(
                            index,
                            "view_only",
                            e.target.checked
                          )
                        }
                      />

                    </td>

                    <td className="text-center">

                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={item.flag_aktif === 'Y'}
                        onChange={(e) =>
                          handleChangeDetail(
                            index,
                            "flag_aktif",
                            e.target.checked
                          )
                        }
                      />

                    </td>

                    <td>

                      <div className="flex justify-center gap-2">

                        <button
                          type="button"
                          onClick={() => handleMoveRow(index, "up")}
                          disabled={index === 0}
                          className="
                            w-10 h-10
                            rounded-full
                            bg-yellow-100
                            text-yellow-600
                            hover:bg-yellow-500
                            hover:text-white
                            flex
                            items-center
                            justify-center
                            transition-all
                            hover:scale-110
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                          "
                          title="Pindah ke atas"
                        >
                          <FaArrowUp />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMoveRow(index, "down")}
                          disabled={index === detailApproval.length - 1}
                          className="
                            w-10 h-10
                            rounded-full
                            bg-indigo-100
                            text-indigo-600
                            hover:bg-indigo-600
                            hover:text-white
                            flex
                            items-center
                            justify-center
                            transition-all
                            hover:scale-110
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                          "
                          title="Pindah ke bawah"
                        >
                          <FaArrowDown />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopyRow(index, 'above')}
                          className="
                    w-10 h-10
                    rounded-full
                    bg-blue-100
                    text-blue-600
                    hover:bg-blue-600
                    hover:text-white
                    flex
                    items-center
                    justify-center
                    transition-all
                    hover:scale-110
                  "
                          title="Copy ke atas"
                        >
                          <FaCopy />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyRow(index, 'below')}
                          className="
                    w-10 h-10
                    rounded-full
                    bg-green-100
                    text-green-600
                    hover:bg-green-600
                    hover:text-white
                    flex
                    items-center
                    justify-center
                    transition-all
                    hover:scale-110
                  "
                          title="Copy ke bawah"
                        >
                          <FaCopy />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveRow(index)}
                          className="
                    w-10 h-10
                    rounded-full
                    bg-red-100
                    text-red-500
                    hover:bg-red-500
                    hover:text-white
                    flex
                    items-center
                    justify-center
                    transition-all
                    hover:scale-110
                  "
                          title="Hapus baris"
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

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
            {isEditData ? 'Simpan Perubahan' : 'Simpan'}
          </button>

        </div>

      </div>
    </div>
  )
}

export default AddEditMasterApproval