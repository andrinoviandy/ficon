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
  FaMoneyBillWave,
  FaChartLine,
  FaStore,
  FaDownload
} from 'react-icons/fa'

import { IoCloudUploadOutline } from 'react-icons/io5'

import { swal } from 'global/helper/swal'
import storeSchema from 'global/store'

import { setToggleModal } from '../../../../redux/n2n/global'

import { formatCurrency } from 'global/helper/formatCurrency'
import Swal from 'sweetalert2'

const REQUIRED_HEADERS = [
  'Profit Center',
  'Cabang',
  'Target Omset Ytd',
  'Realisasi Omset Ytd',
  '% Omset',
  'Bulan'
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
  const TEMPLATE_EXCEL_URL = process.env.REACT_APP_TEMPLATE_PENJUALAN

  // =========================
  // STATE
  // =========================
  const [fileExcel, setFileExcel] = useState(null)
  const [showTable, setShowTable] = useState(false)
  const [excelData, setExcelData] = useState([])
  const [isLoadingUpload, setIsLoadingUpload] = useState(false)

  useEffect(() => {
    if (toggleModal?.isOpen && toggleModal?.modal === 'modalGagal') {
      setShowTable(true)
      setExcelData(toggleModal?.data)
    }
  }, [toggleModal])

  const resetUploadSelection = () => {
    setFileExcel(null)
    setExcelData([])
    setShowTable(false)
    setIsLoadingUpload(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const validateExcelTemplate = (rows) => {
    if (!Array.isArray(rows) || !rows.length) {
      return {
        valid: false,
        message: 'File excel tidak memiliki data yang bisa diproses.'
      }
    }

    const normalizedRows = rows.map((row) => {
      return Object.keys(row).reduce((acc, key) => {
        const normalizedKey = normalizeHeader(key)
        acc[normalizedKey] = row[key]
        return acc
      }, {})
    })

    const headers = Object.keys(normalizedRows[0])
    const normalizedRequiredHeaders = REQUIRED_HEADERS.map(normalizeHeader)
    const missingHeaders = normalizedRequiredHeaders.filter((header) => !headers.includes(header))

    if (missingHeaders.length) {
      return {
        valid: false,
        message: `Format file tidak sesuai template. Kolom yang wajib ada: ${REQUIRED_HEADERS.join(', ')}.`
      }
    }

    const invalidRowIndex = normalizedRows.findIndex((row) => {
      return !String(row?.profit_center ?? '').trim()
        || !String(row?.cabang ?? '').trim()
        || !String(row?.target_omset_ytd ?? '').trim()
        || !String(row?.realisasi_omset_ytd ?? '').trim()
        || !String(row?.bulan ?? '').trim()
    })

    if (invalidRowIndex !== -1) {
      return {
        valid: false,
        message: `Baris ${invalidRowIndex + 2} memiliki data yang belum lengkap. Pastikan Cabang, Bulan, Target Omset, dan Realisasi Omset terisi.`
      }
    }

    const parsedRows = normalizedRows.map((row, index) => {

      const targetOmset = toNumeric(row?.target_omset_ytd)
      const realisasiOmset = toNumeric(row?.realisasi_omset_ytd)

      const persen =
        targetOmset === 0
          ? 0
          : ((realisasiOmset / targetOmset) * 100).toFixed(2)

      return {
        id: index + 1,
        profit_center: String(row?.profit_center ?? '').trim(),
        cabang: String(row?.cabang ?? '').trim(),
        target_omset_ytd: targetOmset,
        realisasi_omset_ytd: realisasiOmset,
        persen,
        bulan: String(row?.bulan ?? '').trim()
      }
    })

    return {
      valid: true,
      data: parsedRows
    }
  }

  // =========================
  // HANDLE FILE
  // =========================
  const handleFile = async (e) => {

    const file = e.target.files[0]

    if (!file) return

    const fileExtension = file.name.split('.').pop()?.toLowerCase()

    if (!['xlsx', 'xls'].includes(fileExtension)) {
      await swal.error('Format file harus .xlsx atau .xls')
      resetUploadSelection()
      return
    }

    setIsLoadingUpload(true)
    swal.loading('Memproses file Excel...')
    setFileExcel(file)
    setExcelData([])
    setShowTable(false)

    const reader = new FileReader()

    reader.onload = async (event) => {
      try {
        const binaryStr = event.target.result
        const workbook = XLSX.read(binaryStr, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '', raw: false })

        const validation = validateExcelTemplate(rows)

        if (!validation.valid) {
          swal.close()
          await swal.error(validation.message)
          resetUploadSelection()
          return
        }

        setExcelData(validation.data)
        swal.close()
      } catch (error) {
        swal.close()
        await swal.error('Gagal membaca file excel')
        console.error(error)
        resetUploadSelection()
      } finally {
        setIsLoadingUpload(false)
      }
    }

    reader.onerror = async () => {
      swal.close()
      await swal.error('Gagal membaca file excel')
      resetUploadSelection()
      setIsLoadingUpload(false)
    }

    reader.readAsBinaryString(file)

  }

  // =========================
  // HANDLE TEMPLATE DOWNLOAD
  // =========================
  const handleDownloadTemplate = () => {
    const link = document.createElement('a')
    link.href = TEMPLATE_EXCEL_URL
    link.download = 'template-penjualan.xlsx'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // =========================
  // HANDLE UPLOAD
  // =========================
  const handleUpload = () => {

    if (!fileExcel) {
      swal.error('File excel wajib dipilih!')
      return
    }

    if (!excelData.length) {
      swal.error('File excel tidak memiliki data yang bisa dipreview!')
      return
    }

    swal.loading()

    setTimeout(() => {
      swal.close()
      setShowTable(true)
    }, 300)

  }

  const totalTarget = excelData.reduce((acc, item) => acc + Number(item.target_omset_ytd || 0), 0)
  const totalRealisasi = excelData.reduce((acc, item) => acc + Number(item.realisasi_omset_ytd || 0), 0)
  const totalPersen = totalTarget === 0 ? '0.00' : ((totalRealisasi / totalTarget) * 100).toFixed(2)

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

            <div className="mt-6">

              {/* INFO */}
              <div className="flex items-center justify-between mb-4">

                <div>

                  <h3 className="text-lg font-bold text-gray-700">
                    Data Penjualan Yang Gagal Diupload
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
                      <th>Keterangan</th>
                      <th>No</th>
                      <th>Profit Center</th>
                      <th>Cabang</th>
                      <th>Bulan</th>
                      <th>Target Omset YTD</th>
                      <th>Realisasi Omset YTD</th>
                      <th>% Omset</th>
                    </tr>

                  </thead>

                  <tbody>

                    {
                      excelData.map((item, index) => (

                        <tr
                          key={index}
                          className="hover"
                        >

                          <td className='text-red-500 font-semibold'>{item?.keterangan}</td>

                          <td>{index + 1}</td>

                          <td>{item.profit_center}</td>

                          <td>
                            <div className="flex items-center gap-2">
                              <FaStore className="text-blue-500" />
                              {item.cabang}
                            </div>
                          </td>

                          <td>{item.bulan}</td>

                          <td className="text-blue-700 font-semibold">
                            {formatCurrency(item.target_omset_ytd)}
                          </td>

                          <td className="text-green-700 font-semibold">
                            {formatCurrency(item.realisasi_omset_ytd)}
                          </td>

                          <td>
                            <div className="flex items-center gap-2">
                              <FaChartLine className="text-purple-500" />
                              <span
                                className={`font-semibold ${Number(item.persen) >= 100
                                  ? 'text-green-600'
                                  : 'text-orange-600'
                                  }`}
                              >
                                {item.persen}%
                              </span>
                            </div>
                          </td>

                        </tr>

                      ))
                    }

                  </tbody>

                </table>

              </div>

              {/* SUMMARY */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">

                {/* TOTAL TARGET */}
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
                        Total Target Omset
                      </div>

                      <div className="font-bold text-blue-700 text-lg">
                        {formatCurrency(totalTarget)}
                      </div>

                    </div>

                  </div>

                </div>

                {/* TOTAL REALISASI */}
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

                      <FaChartLine className="text-green-600" />

                    </div>

                    <div>

                      <div className="text-sm text-gray-500">
                        Total Realisasi Omset
                      </div>

                      <div className="font-bold text-green-700 text-lg">
                        {formatCurrency(totalRealisasi)}
                      </div>

                    </div>

                  </div>

                </div>

                {/* PERSENTASE */}
                <div
                  className="
                    bg-purple-50 border border-purple-200
                    rounded-2xl p-4
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-12 h-12 rounded-xl
                        bg-purple-100
                        flex items-center justify-center
                      "
                    >

                      <FaChartLine className="text-purple-600" />

                    </div>

                    <div>

                      <div className="text-sm text-gray-500">
                        Pencapaian Omset
                      </div>

                      <div className="font-bold text-purple-700 text-lg">
                        {totalPersen}%
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          )
        }

      </div>

    </Modal>

  )

}

export default ModalGagal