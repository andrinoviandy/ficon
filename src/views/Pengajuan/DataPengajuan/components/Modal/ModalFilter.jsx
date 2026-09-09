import React, { useEffect, useMemo, useState } from 'react'
import { AsyncSelect, Modal } from 'components/atoms'
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

const ModalFilter = ({ filterCabang, setFilterCabang, setDataFilterOmset, dataFilterOmset, handleTerapkanFilter, resetFilterOmset, loginAccess }) => {

  const { toggleModal } = useSelector(state => state.global)

  // ==========================
  // TITLE MODAL
  // ==========================
  const [titleCard, setTitleCard] = useState('')
  const [titleIcon, setTitleIcon] = useState(null)

  useEffect(() => {

    setTitleCard('Filter Data')
    setTitleIcon(<FaFilter className='text-primary' />)

  }, [toggleModal])

  const handleChange = (field, value) => {
    setDataFilterOmset(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCabangChange = (selected) => {
    if (!selected) {
      setFilterCabang([]);
      return;
    }

    const hasAll = selected.some(item => item.value === "All");

    if (hasAll) {
      // Jika All dipilih, simpan hanya All
      setFilterCabang([{ label: "All", value: "All" }]);
      return;
    }

    setFilterCabang(selected);
  };

  const handleChangeCabang = (selected) => {
    // Tidak ada yang dipilih
    if (!selected || selected.length === 0) {
      setFilterCabang([]);
      return;
    }

    const isAllSelected = selected.some(item => item.value === "All");

    if (isAllSelected) {
      // Pilih semua (termasuk All)
      setFilterCabang(options?.cabang);
    } else {
      setFilterCabang(selected);
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

  const ValueContainer = ({ children, ...props }) => {
    const count = props.getValue().length;

    return (
      <components.ValueContainer {...props}>
        {count > 0 ? (
          <span>{count} Cabang dipilih</span>
        ) : (
          children[0] // Placeholder
        )}
        {children[1]} {/* Input untuk search */}
      </components.ValueContainer>
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
    }
    getReferensi()
  }, [toggleModal])

  useEffect(() => {
    setDataFilterOmset({
      ...dataFilterOmset,
      cabang: filterCabang
    })
  }, [filterCabang])

  return (
    <Modal
      title={titleCard}
      iconTitle={titleIcon}
      modal={"ModalFilter"}
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
            onClick={resetFilterOmset}
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
              Cabang
            </label>

            {/* <Select
              options={[{ label: 'All', value: 'All' }, ...(options?.cabang ?? [])]}
              height={'25px'}
              isMulti
              value={filterCabang}
              // onChange={(val) => handleChange('cabang', val)}
              // onChange={setFilterCabang}
              onChange={handleCabangChange}
            /> */}
            <div className="flex flex-wrap gap-0 align-items-center border rounded-2xl">

              <div
                className="px-3 py-3 bg-gray-50 rounded-l-2xl border-r bg-light fw-bold"
                style={{ minWidth: 80, textAlign: "center" }}
              >
                {filterCabang?.length} Cabang
              </div>

              <div className="flex-1">
                <Select
                  isMulti
                  options={[{ label: "All", value: "All" }, ...(options?.cabang ? options?.cabang : [])]}
                  value={filterCabang}
                  onChange={handleChangeCabang}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{ Option, MultiValue }}
                  styles={customStyles}
                />
              </div>

            </div>
          </div>

          {/* PERIODE */}
          {/* <div>

            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <FaCalendarAlt className="text-green-600" />
              GL Account / Account Description
            </label>

            <AsyncSelect
              name="coa_detail_id"
              classNamePrefix="react-select"
              placeholder="Ketik kata kunci"
              defaultOptions={false}
              cacheOptions
              // onMenuOpen={handleDropdownOpen}
              // onMenuClose={handleDropdownClose}
              // menuPortalTarget={document.body}
              // isDisabled={row?.canEdit ? false : true}
              value={dataFilterOmset?.coa_detail ? dataFilterOmset?.coa_detail : null}
              onChange={(selectedOption) => {
                handleChange('coa_detail', selectedOption)
              }}
              // onChange={(selectedOption) => {
              //   console.log(selectedOption, 'coa select');

              //   // handleChangeCoa(
              //   //   { target: { name: 'coa_detail_id', value: selectedOption?.value, label: selectedOption?.label, data: selectedOption?.data } },
              //   //   index
              //   // )
              // }}
              loadOptions={(value, callBack) => {
                const get = async () => {
                  try {
                    const res = await storeSchema.actions.getListCoaDetail(value.toUpperCase());
                    const data = res?.data?.map((v) => {
                      return {
                        label: v?.detail_coa,
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
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  minHeight: '25px',
                  minWidth: '200px',
                  borderRadius: '25px',
                  // backgroundColor: row?.canEdit ? 'white' : '#DFDFDF', // neutral-300
                  // borderColor: '#d1d5db',  input-bordered approximation
                  fontSize: '0.875rem',
                }),
              }}
            />

          </div> */}
          <div className="mb-3">

            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <FaCalendarAlt className="text-green-600" />
              Periode
            </label>

            {/* YEAR */}
            <input
              type="month"
              value={dataFilterOmset?.periode}
              className="rounded-[20px] border border-gray-300 px-3 py-2 text-sm outline-none w-full"
              onChange={(e) => handleChange('periode', e.target.value)}
            />

          </div>

          {/* <label className="mt-3 flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dataFilterOmset?.ytd || false}
              onChange={(e) => handleChange("ytd", e.target.checked)}
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
          </label> */}

        </div>
      </div>

    </Modal>
  )
}

export default ModalFilter