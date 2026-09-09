import React, { useEffect, useMemo, useState } from 'react'
import { Modal } from 'components/atoms'
import Select, { components } from "react-select";
import { useSelector } from 'react-redux'

import {
  FaFilter,
  FaBuilding,
  FaSitemap,
  FaCalendarAlt,
  FaUniversity,
} from 'react-icons/fa'
import storeSchema from 'global/store'

const ModalFilter1 = ({ loginAccess, resetFilter1, kategori, setKategori, detailFilter, setDetailFilter, periode, setPeriode, handleTerapkanFilter, setYtd, ytd }) => {

  const { toggleModal } = useSelector(state => state.global)

  // ==========================
  // TITLE MODAL
  // ==========================
  const [titleCard, setTitleCard] = useState('')
  const [titleIcon, setTitleIcon] = useState(null)

  const handleCabangChange = (selected) => {
    if (!selected) {
      setDetailFilter([]);
      return;
    }

    const hasAll = selected.some(item => item.value === "All");

    if (hasAll) {
      // Jika All dipilih, simpan hanya All
      setDetailFilter([{ label: "All", value: "All" }]);
      return;
    }

    setDetailFilter(selected);
  };

  const handleChangeCabang = (selected) => {
    // Tidak ada yang dipilih
    if (!selected || selected.length === 0) {
      setDetailFilter([]);
      return;
    }

    const isAllSelected = selected.some(item => item.value === "All");

    if (isAllSelected) {
      // Pilih semua (termasuk All)
      setDetailFilter(options?.cabang);
    } else {
      setDetailFilter(selected);
    }
  };

  const handleChangeYtd = (value) => {
    setYtd(value);
  }

  const handleChangeUnit = (selected) => {
    // Tidak ada yang dipilih
    if (!selected || selected.length === 0) {
      setDetailFilter([]);
      return;
    }

    const isAllSelected = selected.some(item => item.value === "All");

    if (isAllSelected) {
      // Pilih semua (termasuk All)
      setDetailFilter(options?.unit);
    } else {
      setDetailFilter(selected);
    }
  };

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          readOnly
          style={{ marginRight: 10 }}
        />
        <label>{props.label}</label>
      </components.Option>
    );
  };

  const MultiValue = () => null;

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 49,
      borderRadius: '0px 20px 20px 0px',
      border: 'none'
    }),

    indicatorsContainer: (base) => ({
      ...base,
      height: 49,
      display: "flex",
      alignItems: "center",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      padding: "0px 10px 0px 0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
  };

  useEffect(() => {

    setTitleCard('Filter Data Pengajuan')
    setTitleIcon(<FaFilter className='text-primary' />)

  }, [toggleModal])

  // ==========================
  // OPTION UNIT
  // ==========================
  const unitOptions = useMemo(() => {

    return [
      'Semua Unit',
      'Unit Financial Controller',
      'Unit Anggaran',
    ]

  }, [])

  // ==========================
  // OPTION CABANG
  // ==========================
  const cabangOptions = useMemo(() => {

    return [
      'Semua Cabang',
      'Cabang Jakarta',
      'Cabang Bandung',
      'Cabang Surabaya',
      'Cabang Medan',
      'Cabang Makassar',
    ]

  }, [])

  // ==========================
  // RESET INPUT KEDUA
  // ==========================
  useEffect(() => {

    setDetailFilter([])
    setDetailFilter([])

  }, [kategori])

  const [options, setOptions] = useState()
  useEffect(() => {
    const getReferensi = async () => {
      const refCabang = await storeSchema.actions.getReferensiByJenis('cabang_id')
      if (refCabang?.status === true) {
        if (loginAccess?.cabang_id !== '2000') {
          const data = refCabang?.data?.filter(item => item?.kd_ref === loginAccess?.cabang_id)?.map((item) => {
            return {
              label: item?.ur_ref,
              value: item?.kd_ref,
            }
          })
          setOptions(prev => ({ ...prev, cabang: data }))
        } else {
          const data = refCabang?.data?.map((item) => {
            return {
              label: item?.ur_ref,
              value: item?.kd_ref,
            }
          })
          setOptions(prev => ({ ...prev, cabang: data }))
        }
      }
      const refUnit = await storeSchema.actions.getReferensiByJenis('unit_id')
      if (refUnit?.status === true) {
        if (['RL10', 'RL11', 'RL13', 'RL00'].includes(loginAccess?.role_id)) {
          const data = refUnit?.data?.map((item) => {
            return {
              label: item?.ur_ref,
              value: item?.kd_ref,
            }
          })
          setOptions(prev => ({ ...prev, unit: data }))
        } else {
          const data = refUnit?.data?.filter(item => item?.kd_ref === loginAccess?.unit_id)?.map((item) => {
            return {
              label: item?.ur_ref,
              value: item?.kd_ref,
            }
          })
          setOptions(prev => ({ ...prev, unit: data }))
        }
      }
    }
    if (toggleModal?.isOpen && toggleModal?.modal === 'ModalFilter1') {
      getReferensi()
    }
  }, [toggleModal])

  return (
    <Modal
      title={titleCard}
      iconTitle={titleIcon}
      modal={"ModalFilter1"}
      size={"max-w-2xl"}
      scroll={false}
      buttonFooter={
        <div className='flex gap-3'>
          <button
            className="
              btn
              rounded-full
              px-8
              bg-gray-200
              hover:bg-gray-300
              border-none
              text-gray-700
            "
            onClick={resetFilter1}
          >
            Reset
          </button>

          <button
            className="
              btn
              rounded-full
              px-8
              bg-blue-900
              hover:bg-blue-800
              border-none
              text-white
              shadow-lg
            "
            onClick={handleTerapkanFilter}
          >
            Terapkan Filter
          </button>
        </div>
      }
    >

      <div className="bg-white rounded-3xl">

        {/* FORM */}
        <div className="space-y-6">

          {/* PILIHAN PUSAT / CABANG */}
          <div>

            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <FaBuilding className="text-blue-800" />
              Pilih Lokasi Data
            </label>

            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="
                select select-bordered
                w-full
                rounded-2xl
                h-10
                border-gray-300
                focus:border-blue-700
                focus:outline-none
              "
            >

              <option value="">
                -- Pilih Data --
              </option>
              {loginAccess?.cabang_id === '2000' && (
                <option value="pusat">
                  Pusat
                </option>
              )}
              {(loginAccess?.cabang_id !== '2000' || ['RL10', 'RL11', 'RL13', 'RL00', 'RL16', 'RL03', 'RL04', 'RL05', 'RL06', 'RL07', 'RL08', 'RL09', 'RL15'].includes(loginAccess?.role_id)) && (
                <option value="cabang">
                  Cabang
                </option>
              )}

            </select>

          </div>

          {/* DROPDOWN DINAMIS */}
          {kategori && (
            <div>

              <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">

                {
                  kategori === 'pusat'
                    ? <FaSitemap className="text-cyan-700" />
                    : <FaUniversity className="text-orange-500" />
                }

                {
                  kategori === 'pusat'
                    ? 'Pilih Unit'
                    : 'Pilih Cabang'
                }

              </label>

              {kategori === 'pusat' ? (
                // <Select
                //   options={[{ label: 'All', value: 'All' }, ...options.unit]}
                //   value={detailFilter}
                //   isMulti
                //   // onChange={(val) =>
                //   //   setDetailFilter(val)
                //   // }
                //   // onChange={
                //   //   setDetailFilter
                //   // }
                //   onChange={
                //     handleCabangChange
                //   }
                // />
                <div className="flex flex-col w-full">
                  <div className="flex flex-wrap gap-0 align-items-center border rounded-2xl">

                    <div
                      className="px-3 py-3 bg-gray-50 rounded-l-2xl border-r bg-light fw-bold"
                      style={{ minWidth: 80, textAlign: "center" }}
                    >
                      {detailFilter?.length} Unit
                    </div>

                    <div className="flex-1">
                      <Select
                        isMulti
                        options={[{ label: "All", value: "All" }, ...options?.unit]}
                        value={detailFilter}
                        onChange={handleChangeUnit}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ Option, MultiValue }}
                        styles={customStyles}
                      />
                    </div>

                  </div>
                </div>
              ) : (
                // <Select
                //   options={[{ label: 'All', value: 'All' }, ...options.cabang]}
                //   value={detailFilter}
                //   isMulti
                //   // onChange={(val) =>
                //   //   setDetailFilter(val)
                //   //   //   handleSelect('cabang_id', val)
                //   // }
                //   // onChange={setDetailFilter
                //   //   //   handleSelect('cabang_id', val)
                //   // }
                //   onChange={handleCabangChange}
                // />
                <div className="flex flex-col w-full">
                  <div className="flex flex-wrap gap-0 align-items-center border rounded-2xl">

                    <div
                      className="px-3 py-3 bg-gray-50 rounded-l-2xl border-r bg-light fw-bold"
                      style={{ minWidth: 80, textAlign: "center" }}
                    >
                      {detailFilter.length} Cabang
                    </div>

                    <div className="flex-1">
                      <Select
                        isMulti
                        options={[{ label: "All", value: "All" }, ...options?.cabang]}
                        value={detailFilter}
                        onChange={handleChangeCabang}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ Option, MultiValue }}
                        styles={customStyles}
                      />
                    </div>

                  </div>
                </div>
              )}
              {/* <select
                value={detailFilter}
                onChange={(e) => setDetailFilter(e.target.value)}
                className="
                  select select-bordered
                  w-full
                  rounded-2xl
                  h-10
                  border-gray-300
                  focus:border-blue-700
                  focus:outline-none
                "
              >

                <option value="">
                  {
                    kategori === 'pusat'
                      ? '-- Pilih Unit --'
                      : '-- Pilih Cabang --'
                  }
                </option>

                {
                  kategori === 'pusat'
                    ? (
                      unitOptions.map((v, i) => (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      ))
                    )
                    : (
                      cabangOptions.map((v, i) => (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      ))
                    )
                }

              </select> */}

            </div>
          )}

          {/* PERIODE */}
          <div>

            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <FaCalendarAlt className="text-green-600" />
              Periode
            </label>

            <input
              type="month"
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
              className="
                input input-bordered
                w-full
                rounded-2xl
                h-11
                border-gray-300
                focus:border-blue-700
                focus:outline-none
              "
            />

          </div>

          <label className="mt-3 flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={ytd || false}
              onChange={(e) => handleChangeYtd(e.target.checked)}
              className="checkbox checkbox-primary checkbox-sm"
            />

            <div className="flex flex-col">
              <span className="font-medium text-gray-700">
                Year To Date (YTD)
              </span>

              <span className="text-xs text-gray-500">
                Menampilkan data dari Januari sampai periode yang dipilih.
              </span>
            </div>
          </label>

        </div>
      </div>

    </Modal>
  )
}

export default ModalFilter1