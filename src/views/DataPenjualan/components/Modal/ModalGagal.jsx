import React, { useEffect, useRef, useState } from 'react'
import * as XLSX from 'xlsx'

import { Modal } from 'components/atoms'

import { useDispatch, useSelector } from 'react-redux'

import {
  FaCheckCircle,
  FaCloudUploadAlt,
  FaFileExcel,
  FaTrash,
  FaUpload,
  FaBuilding,
  FaMoneyBillWave,
  FaChartPie,
  FaDownload
} from 'react-icons/fa'

import { IoCloudUploadOutline } from 'react-icons/io5'

import { swal } from 'global/helper/swal'

import { setToggleModal } from '../../../../redux/n2n/global'

import { formatCurrency } from 'global/helper/formatCurrency'
import storeSchema from 'global/store'
import Swal from 'sweetalert2'

const REQUIRED_HEADERS = [
  'Profit Center',
  'Account',
  'Bulan',
  'Budget Biaya',
  'Realisasi Biaya'
]

const normalizeHeader = (value = '') => {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
}

const toNumeric = (value = '') => {
  if (value === null || value === undefined) return 0

  const cleaned = String(value)
    .replace(/[^0-9.-]/g, '')
    .trim()

  if (!cleaned) return 0

  return Number(cleaned)
}

const ModalGagal = () => {

  const dispatch = useDispatch()
  const fileInputRef = useRef(null)
  const { toggleModal } = useSelector((state) => state.global)
  const TEMPLATE_EXCEL_URL = process.env.REACT_APP_TEMPLATE_ANGGARAN

  // =========================
  // STATE
  // =========================
  const [fileExcel, setFileExcel] = useState(null)
  const [showTable, setShowTable] = useState(false)
  const [excelData, setExcelData] = useState([])
  const [isLoadingUpload, setIsLoadingUpload] = useState(false)

  const totalBudget = excelData.reduce((sum, item) => sum + Number(item.budget_biaya || 0), 0)
  const totalRealisasi = excelData.reduce((sum, item) => sum + Number(item.realisasi_biaya || 0), 0)
  const totalSisa = totalBudget - totalRealisasi

  useEffect(() => {
    if (toggleModal?.isOpen && toggleModal?.modal === 'modalGagal') {
      setShowTable(true)
      setExcelData(toggleModal?.data)
    }
  }, [toggleModal])

  return (

    <Modal
      title="Data Gagal Upload"

      iconTitle={
        <IoCloudUploadOutline className='text-blue-500 text-3xl' />
      }

      modal={"modalGagal"}

      size={"w-11/12 max-w-7xl"}

      scroll={false}

      buttonFooter={
        <div className="flex justify-end gap-3">

          <button
            onClick={() =>
              dispatch(
                setToggleModal({
                  isOpen: false,
                  modal: ''
                })
              )
            }

            className="
              btn border-none
              bg-gray-200 hover:bg-gray-300
              text-gray-700 rounded-full
              px-6
            "
          >

            Close

          </button>

        </div>
      }
    >

      <div>

        {/* ================= TABLE ================= */}
        {
          showTable && (

            <div className="">

              {/* INFO */}
              <div className="flex items-center justify-between mb-4">

                <div>

                  <h3 className="text-lg font-bold text-gray-700">
                    Data Anggaran Gagal Upload
                  </h3>

                  <p className="text-sm text-gray-500">
                    Total Data : {excelData.length}
                  </p>

                </div>

                <div
                  className="
                    px-4 py-2 rounded-full
                    bg-red-100 text-red-700
                    text-sm font-semibold
                  "
                >

                  Data Gagal Diupload

                </div>

              </div>

              {/* TABLE */}
              <div
                className="
                  overflow-auto border
                  rounded-3xl shadow-sm
                "
              >

                <table className="table w-full">

                  <thead className="bg-blue-600 text-white">

                    <tr>

                      <th>Penyebab Gagal Upload</th>

                      <th>No</th>

                      <th>Profit Center</th>

                      <th>Cabang</th>

                      <th>Account</th>

                      <th>Description</th>

                      <th>Bulan</th>

                      <th>Budget Biaya</th>

                      <th>Realisasi Biaya</th>

                      <th>Sisa Anggaran</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      excelData?.map((item, index) => (

                        <tr
                          key={index}
                          className="hover"
                        >

                          <td className='text-red-500 font-semibold'>{item?.keterangan}</td>

                          <td>{index + 1}</td>

                          <td>

                            <div className="flex items-center gap-2">

                              <FaBuilding className="text-blue-500" />

                              {item.profit_center}

                            </div>

                          </td>

                          <td>

                            <div className="flex items-center gap-2">

                              <FaBuilding className="text-cyan-500" />

                              {item.cabang || '-'}

                            </div>

                          </td>

                          <td className="font-semibold">
                            {item.account}
                          </td>

                          <td>{item.description || '-'}</td>

                          <td>{item.bulan}</td>

                          <td className="text-blue-700 font-semibold">

                            {formatCurrency(item.budget_biaya)}

                          </td>

                          <td className="text-orange-600 font-semibold">

                            {formatCurrency(item.realisasi_biaya)}

                          </td>

                          <td className="text-green-700 font-semibold">

                            {formatCurrency(item.budget_biaya - item?.realisasi_biaya)}

                          </td>

                        </tr>

                      ))
                    }

                  </tbody>

                </table>

              </div>

              {/* SUMMARY */}
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">

                <div
                  className="
                    bg-blue-50 border border-blue-200
                    rounded-2xl p-4
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-12 h-12 rounded-xl
                        bg-blue-100
                        flex items-center justify-center
                      "
                    >

                      <FaMoneyBillWave className="text-blue-600" />

                    </div>

                    <div>

                      <div className="text-sm text-gray-500">
                        Total Budget
                      </div>

                      <div className="font-bold text-blue-700 text-lg">
                        {formatCurrency(totalBudget)}
                      </div>

                    </div>

                  </div>

                </div>

                <div
                  className="
                    bg-orange-50 border border-orange-200
                    rounded-2xl p-4
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-12 h-12 rounded-xl
                        bg-orange-100
                        flex items-center justify-center
                      "
                    >

                      <FaChartPie className="text-orange-600" />

                    </div>

                    <div>

                      <div className="text-sm text-gray-500">
                        Total Realisasi
                      </div>

                      <div className="font-bold text-orange-700 text-lg">
                        {formatCurrency(totalRealisasi)}
                      </div>

                    </div>

                  </div>

                </div>

                <div
                  className="
                    bg-green-50 border border-green-200
                    rounded-2xl p-4
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-12 h-12 rounded-xl
                        bg-green-100
                        flex items-center justify-center
                      "
                    >

                      <FaMoneyBillWave className="text-green-600" />

                    </div>

                    <div>

                      <div className="text-sm text-gray-500">
                        Total Sisa Anggaran
                      </div>

                      <div className="font-bold text-green-700 text-lg">
                        {formatCurrency(totalSisa)}
                      </div>

                    </div>

                  </div>

                </div>

              </div> */}

            </div>

          )
        }

      </div>

    </Modal>

  )

}

export default ModalGagal