import React, { useEffect, useState } from 'react'
import {
  FaArrowLeft,
  FaSave,
  FaBuilding,
  FaListAlt,
  FaToggleOn,
  FaCalendar
} from 'react-icons/fa'

import { useLocation, useNavigate } from 'react-router-dom'
import { AsyncSelect, Label, Select } from 'components/atoms'
import { swal } from 'global/helper/swal'
import storeSchema from 'global/store'

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
  const [options, setOptions] = useState([])

  const handleChangeCoa = async (e) => {
    const values = { ...data };
    values[e.target.name] = e.target.value;
    values['ur_' + e.target.name] = e.target.label;
    setData(values);
  };

  const handleChange = async (e) => {
    const values = { ...data };
    values[e.target.name] = e.target.value;
    setData(values);
  };

  // HANDLE SELECT
  const handleSelect = (name, e) => {
    setData({
      ...data,
      [name]: e?.value,
      ['ur_' + name]: e?.label
    })
  }

  // SAVE
  const handleSave = async () => {
    swal.loading()
    try {
      const res = await storeSchema.actions.insertAnggaran(data);
      if (res?.status === true) {
        await swal.success('Data Berhasil Disimpan !')
        navigation("/manajemen-anggaran", {
          state: {
            ...location.state,
          },
        })

      } else {
        console.log('error nih', res?.data);
        await swal.custom('Tidak Dapat Disimpan !', res?.data?.data, 'warning');
      };
    } catch (error) {
      await swal.error(error?.message)
    }
  }

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
    }
    getReferensi()
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
            {isEditAnggaran
              ? 'Edit Anggaran'
              : 'Tambah Anggaran Baru'}
          </div>

          <div className="text-sm font-light text-gray-500">
            Lengkapi data anggaran dengan benar.
          </div>
        </div>

      </div>

      {/* CARD */}
      <div className="bg-white border shadow-md rounded-2xl p-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* CABANG */}
          <div>
            <Label
              icon={<FaBuilding className="text-orange-500" />}
              label="Profit Center"
              children={
                <Select
                  options={options.cabang}
                  value={{ label: data?.ur_cabang_id, value: data.cabang_id }}
                  onChange={(val) =>
                    handleSelect('cabang_id', val)
                  }
                />
              }
            />
          </div>

          {/* ACCOUNT DESC */}
          <div>
            <Label
              icon={<FaListAlt className="text-cyan-500" />}
              label="Gl Account / Account Desc"
              children={
                <AsyncSelect
                  name="coa_detail_id"
                  classNamePrefix="react-select"
                  placeholder="Ketik kata kunci"
                  // defaultOptions={false}
                  cacheOptions
                  // onMenuOpen={handleDropdownOpen}
                  // onMenuClose={handleDropdownClose}
                  // menuPortalTarget={document.body}
                  value={data?.coa_detail_id ? { label: data?.ur_coa_detail_id, value: data?.coa_detail_id } : null}
                  onChange={(selectedOption) => {
                    handleChangeCoa(
                      { target: { name: 'coa_detail_id', value: selectedOption?.value, label: selectedOption?.label, data: selectedOption?.data } }
                    )
                  }}
                  loadOptions={(value, callBack) => {
                    const get = async () => {
                      try {
                        const res = await storeSchema.actions.getListCoaDetail(value.toUpperCase());
                        const data = res?.data?.map((v) => {
                          return {
                            label: v?.gl_account + ' - ' + v?.detail_coa,
                            value: v?.coa_detail_id,
                            data: v
                            // detail: v?.detail
                          };
                        });
                        callBack(data);
                      } catch (err) {
                        callBack([]);
                      }
                    };
                    get();
                  }}
                // styles={{
                //   control: (provided, state) => ({
                //     ...provided,
                //     minHeight: '40px',
                //     minWidth: '200px',
                //     borderRadius: '25px',
                //     backgroundColor: 'white', // neutral-300
                //     // borderColor: '#d1d5db',  input-bordered approximation
                //     fontSize: '0.875rem',
                //   }),
                // }}
                />
              }
            />
          </div>

          {/* STATUS */}
          <div>
            <Label
              icon={<FaCalendar className="text-green-500" />}
              label="Bulan"
              children={
                <input
                  type='month'
                  name='bulan'
                  className='w-full bg-white input input-bordered rounded-[25px]'
                  value={data?.bulan}
                  onChange={handleChange}
                />
                // <Select
                //   options={options.status}
                //   value={data.status}
                //   onChange={(val) =>
                //     handleSelect('status', val)
                //   }
                // />
              }
            />
          </div>

          {/* PREVIEW */}
          <div className="md:col-span-3">

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
                    GL Account / Account Desc. :
                  </span>{' '}

                  <span className="font-bold text-cyan-700">
                    {data?.ur_coa_detail_id || '-'}
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
                    Bulan :
                  </span>{' '}

                  <span
                    className={`
                      font-bold text-green-600
                    `}
                  >
                    {data?.bulan || '-'}
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