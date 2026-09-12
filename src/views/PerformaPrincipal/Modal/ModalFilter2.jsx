import React, { useEffect, useMemo, useState } from 'react'
import { Modal } from 'components/atoms'
import { useSelector } from 'react-redux'

import {
  FaFilter,
  FaBuilding,
  FaSitemap,
  FaCalendarAlt,
  FaUniversity,
} from 'react-icons/fa'

const ModalFilter2 = ({ kategori, setKategori, detailFilter, setDetailFilter, periode, setPeriode, handleTerapkanFilter }) => {

  const { toggleModal } = useSelector(state => state.global)

  // ==========================
  // STATE
  // ==========================

  // ==========================
  // TITLE MODAL
  // ==========================
  const [titleCard, setTitleCard] = useState('')
  const [titleIcon, setTitleIcon] = useState(null)

  useEffect(() => {

    setTitleCard('Filter Data Monitoring Pengajuan')
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

    setDetailFilter('')

  }, [kategori])

  return (
    <Modal
      title={titleCard}
      iconTitle={titleIcon}
      modal={"ModalFilter2"}
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
            onClick={() => handleTerapkanFilter}
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

              <option value="pusat">
                Pusat
              </option>

              <option value="cabang">
                Cabang
              </option>

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

              <select
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

              </select>

            </div>
          )}

          {/* PERIODE */}
          <div>

            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <FaCalendarAlt className="text-green-600" />
              Periode
            </label>

            <input
              type="number"
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

        </div>
      </div>

    </Modal>
  )
}

export default ModalFilter2