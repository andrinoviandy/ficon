import React from 'react'

import { Modal } from 'components/atoms'

import { useDispatch } from 'react-redux'

import {
  FaBuilding,
  FaMoneyBillWave,
  FaHistory,
  FaCalendarAlt,
  FaWallet,
  FaReceipt,
  FaChartPie
} from 'react-icons/fa'

import { IoTimeOutline } from 'react-icons/io5'

import { setToggleModal } from '../../../../redux/n2n/global'

import { formatCurrency } from 'global/helper/formatCurrency'

const ModalRiwayatAnggaran = () => {

  const dispatch = useDispatch()

  // =========================
  // HEADER DATA
  // =========================
  const headerData = {
    cabang: 'Jakarta',

    jenis_biaya: 'Biaya Umum',

    anggaran_terpakai: 75000000,

    sisa_anggaran: 125000000
  }

  // =========================
  // DUMMY HISTORY
  // =========================
  const historyAnggaran = Array.from(
    { length: 12 },
    (_, i) => {

      const nominal =
        5000000 + (i * 2500000)

      return {
        id: i + 1,

        tanggal: [
          '01 Januari 2026',
          '10 Januari 2026',
          '22 Januari 2026',
          '05 Februari 2026',
          '15 Februari 2026',
          '28 Februari 2026',
          '10 Maret 2026',
          '18 Maret 2026',
          '02 April 2026',
          '14 April 2026',
          '26 April 2026',
          '05 Mei 2026',
        ][i],

        nominal
      }

    }
  )

  // =========================
  // TOTAL ANGGARAN
  // =========================
  const totalAnggaran =
    historyAnggaran.reduce(
      (acc, item) =>
        acc + item.nominal,
      0
    )

  return (

    <Modal
      title="Riwayat Anggaran"

      iconTitle={
        <IoTimeOutline className='text-blue-500 text-3xl' />
      }

      modal={"modalRiwayatAnggaran"}

      size={"w-11/12 max-w-4xl"}

      scroll={false}

      // buttonFooter={null}
    >

      <div>

        {/* ================= HEADER INFORMATION ================= */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">

          {/* CABANG */}
          <div
            className="
              bg-white border border-blue-100
              rounded-3xl p-5 shadow-sm
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-14 h-14 rounded-2xl
                  bg-blue-100
                  flex items-center justify-center
                "
              >

                <FaBuilding className="text-blue-600 text-2xl" />

              </div>

              <div>

                <div className="text-sm text-gray-500">
                  Cabang
                </div>

                <div className="text-lg font-bold text-gray-700">
                  {headerData.cabang}
                </div>

              </div>

            </div>

          </div>

          {/* JENIS BIAYA */}
          <div
            className="
              bg-white border border-orange-100
              rounded-3xl p-5 shadow-sm
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-14 h-14 rounded-2xl
                  bg-orange-100
                  flex items-center justify-center
                "
              >

                <FaReceipt className="text-orange-600 text-2xl" />

              </div>

              <div>

                <div className="text-sm text-gray-500">
                  Jenis Biaya
                </div>

                <div className="text-lg font-bold text-gray-700">
                  {headerData.jenis_biaya}
                </div>

              </div>

            </div>

          </div>

          {/* ANGGARAN TERPAKAI */}
          <div
            className="
              bg-white border border-red-100
              rounded-3xl p-5 shadow-sm
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-14 h-14 rounded-2xl
                  bg-red-100
                  flex items-center justify-center
                "
              >

                <FaChartPie className="text-red-600 text-2xl" />

              </div>

              <div>

                <div className="text-sm text-gray-500">
                  Anggaran Terpakai
                </div>

                <div className="text-lg font-bold text-red-700">
                  {formatCurrency(
                    headerData.anggaran_terpakai
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* SISA ANGGARAN */}
          <div
            className="
              bg-white border border-green-100
              rounded-3xl p-5 shadow-sm
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-14 h-14 rounded-2xl
                  bg-green-100
                  flex items-center justify-center
                "
              >

                <FaWallet className="text-green-600 text-2xl" />

              </div>

              <div>

                <div className="text-sm text-gray-500">
                  Sisa Anggaran
                </div>

                <div className="text-lg font-bold text-green-700">
                  {formatCurrency(
                    headerData.sisa_anggaran
                  )}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= TABLE ================= */}
        <div className="mt-6">

          {/* TITLE */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">

            <div>

              <h3 className="text-lg font-bold text-gray-700">
                Riwayat Penambahan Anggaran
              </h3>

              <p className="text-sm text-gray-500">
                Total Riwayat : {historyAnggaran.length}
              </p>

            </div>

            <div
              className="
                px-4 py-2 rounded-full
                bg-blue-100 text-blue-700
                text-sm font-semibold
              "
            >

              Total Anggaran :
              {" "}
              {formatCurrency(totalAnggaran)}

            </div>

          </div>

          {/* TABLE */}
          <div
            className="
              overflow-auto
              border
              rounded-3xl
              shadow-sm
            "
          >

            <table className="table w-full">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th>No</th>

                  <th>Tanggal</th>

                  <th>Nominal Anggaran</th>

                </tr>

              </thead>

              <tbody>

                {
                  historyAnggaran.map(
                    (item, index) => (

                      <tr
                        key={index}
                        className="hover"
                      >

                        {/* NO */}
                        <td>
                          {index + 1}
                        </td>

                        {/* TANGGAL */}
                        <td>

                          <div className="flex items-center gap-3">

                            <div
                              className="
                                w-10 h-10 rounded-xl
                                bg-blue-100
                                flex items-center justify-center
                              "
                            >

                              <FaCalendarAlt className="text-blue-600" />

                            </div>

                            <div>

                              <div className="font-semibold text-gray-700">
                                {item.tanggal}
                              </div>

                              <div className="text-xs text-gray-500">
                                Penambahan Anggaran
                              </div>

                            </div>

                          </div>

                        </td>

                        {/* NOMINAL */}
                        <td>

                          <div
                            className="
                              inline-flex items-center gap-3
                              bg-green-50
                              border border-green-200
                              rounded-2xl
                              px-4 py-3
                            "
                          >

                            <FaMoneyBillWave className="text-green-600 text-lg" />

                            <div>

                              <div className="text-xs text-gray-500">
                                Nominal
                              </div>

                              <div className="font-bold text-green-700">
                                {formatCurrency(item.nominal)}
                              </div>

                            </div>

                          </div>

                        </td>

                      </tr>

                    )
                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </Modal>

  )

}

export default ModalRiwayatAnggaran