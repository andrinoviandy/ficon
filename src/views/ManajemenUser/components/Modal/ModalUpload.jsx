import React, { useEffect, useRef, useState } from 'react'
import * as XLSX from 'xlsx'

import { Modal } from 'components/atoms'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  FaCheckCircle,
  FaCloudUploadAlt,
  FaFileExcel,
  FaTrash,
  FaUpload,
  FaPercent,
  FaFileInvoiceDollar,
  FaMoneyCheckAlt,
  FaDownload
} from 'react-icons/fa'

import { IoCloudUploadOutline } from 'react-icons/io5'

import { swal } from 'global/helper/swal'
import storeSchema from 'global/store'

import { setToggleModal } from '../../../../redux/n2n/global'

const ModalUpload = () => {

  const dispatch = useDispatch()
  const navigation = useNavigate()
  const location = useLocation()
  const fileInputRef = useRef(null)
  const { toggleModal } = useSelector((state) => state.global)
  const TEMPLATE_EXCEL_URL = process.env.REACT_APP_TEMPLATE_JENIS_PAJAK || 'https://api-hub.ilcs.co.id/api/v1/n2n/files/template.xlsx'

  const REQUIRED_HEADERS = ['Jenis Jasa', 'Kode Objek', 'Jenis PPh', 'Tarif']

  // =========================
  // STATE
  // =========================
  const [fileExcel, setFileExcel] = useState(null)
  const [showTable, setShowTable] = useState(false)
  const [excelData, setExcelData] = useState([])
  const [isLoadingUpload, setIsLoadingUpload] = useState(false)

  useEffect(() => {
    if (toggleModal?.isOpen && toggleModal?.modal === 'modalUpload') {
      resetUploadSelection()
    }
  }, [toggleModal?.isOpen, toggleModal?.modal])

  const resetUploadSelection = () => {
    setFileExcel(null)
    setExcelData([])
    setShowTable(false)
    setIsLoadingUpload(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const normalizeHeader = (value = '') => {
    return value
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '')
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
      return !String(row?.jenis_jasa ?? '').trim()
        || !String(row?.kode_objek ?? '').trim()
        || !String(row?.jenis_pph ?? '').trim()
        || !String(row?.tarif ?? '').trim()
    })

    if (invalidRowIndex !== -1) {
      return {
        valid: false,
        message: `Baris ${invalidRowIndex + 2} memiliki data yang belum lengkap. Pastikan semua kolom terisi.`
      }
    }

    return {
      valid: true,
      data: normalizedRows
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
        const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' })

        const validation = validateExcelTemplate(rows)

        if (!validation.valid) {
          swal.close()
          await swal.error(validation.message)
          resetUploadSelection()
          return
        }

        const normalizedRows = validation.data.map((row, index) => ({
          id: index + 1,
          jenis_jasa: String(row.jenis_jasa ?? '').trim(),
          kode_objek: String(row.kode_objek ?? '').trim(),
          jenis_pph: String(row.jenis_pph ?? '').trim(),
          tarif: String(row.tarif ?? '').trim()
        }))

        setExcelData(normalizedRows)
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
    link.download = 'template-jenis-pajak.xlsx'
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

      swal.custom(
        'Berhasil',
        'Data jenis pajak berhasil diproses',
        'success'
      )

    }, 500)

  }

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {

    if (!excelData.length) {
      swal.error('Preview data belum tersedia, silakan upload file excel terlebih dahulu!')
      return
    }

    swal.loading()

    try {
      const dataExcel = excelData.map(({ id, ...rest }) => rest)
      const res = await storeSchema.actions.insertJenisPajakArray(dataExcel)

      if (res?.status === true) {
        swal.close()
        await swal.success('Data Berhasil Disimpan !')

        await dispatch(
          setToggleModal({
            isOpen: false,
            modal: ''
          })
        )
      } else {
        swal.close()
        await swal.custom('Tidak Dapat Disimpan !', res?.data?.data || res?.message || 'Terjadi kesalahan saat menyimpan data', 'warning')
      }
    } catch (error) {
      swal.close()
      swal.error(error?.message || 'Terjadi kesalahan saat mengirim data')
    }

  }

  return (

    <Modal
      title="Upload Data Jenis Pajak"

      iconTitle={
        <IoCloudUploadOutline className='text-blue-500 text-3xl' />
      }

      modal={"modalUpload"}

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

            Batal

          </button>

          <button
            onClick={handleSubmit}

            className="
              btn border-none
              bg-blue-900 hover:bg-blue-700
              text-white rounded-full
              px-6 flex items-center gap-2
            "
          >

            <FaCheckCircle />

            Submit Data

          </button>

        </div>
      }
    >

      <div>

        {/* ================= HEADER ================= */}
        <div
          className="
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            rounded-3xl
            p-6 text-white shadow-lg
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-2xl font-bold">
                Upload Data Jenis Pajak
              </h1>

              <p className="text-sm text-blue-100 mt-1">
                Upload file excel master jenis pajak untuk proses import data perpajakan.
              </p>

            </div>

            <FaCloudUploadAlt className="text-5xl opacity-90" />

          </div>

        </div>

        {/* ================= UPLOAD ================= */}
        <div className="mt-6 bg-white border rounded-3xl p-6 shadow-sm">

          <div
            className="
              border-2 border-dashed
              border-blue-300
              rounded-3xl
              p-10
              flex flex-col
              items-center
              justify-center
              text-center
              hover:border-blue-500
              hover:bg-blue-50
              transition-all
            "
          >

            <div
              className="
                w-20 h-20 rounded-full
                bg-blue-100
                flex items-center justify-center
                mb-4
              "
            >

              <FaFileExcel className="text-4xl text-green-600" />

            </div>

            <h3 className="font-bold text-lg text-gray-700">
              Upload File Excel Pajak
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Format file : .xlsx / .xls
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="
                  bg-slate-700 hover:bg-slate-800
                  text-white px-5 py-3
                  rounded-full flex items-center gap-2
                  transition-all
                "
              >
                <FaDownload />
                Download Template
              </button>

              <label
                className={`
                  cursor-pointer
                  bg-blue-600 hover:bg-blue-700
                  text-white px-5 py-3
                  rounded-full flex items-center gap-2
                  transition-all
                  ${isLoadingUpload ? 'pointer-events-none opacity-60' : ''}
                `}
              >

              <FaUpload />

              Upload File Excel

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={handleFile}
                />

              </label>
            </div>

            {
              isLoadingUpload && (
                <div
                  className="
                    mt-5 flex items-center gap-3
                    rounded-2xl border border-blue-200
                    bg-blue-50 px-4 py-3 text-sm text-blue-700
                  "
                >
                  <span
                    className="
                      inline-block h-4 w-4
                      animate-spin rounded-full
                      border-2 border-blue-600 border-r-transparent
                    "
                  />
                  <span className="font-semibold">
                    Sedang memproses file Excel...
                  </span>
                </div>
              )
            }

            {
              fileExcel && (

                <div
                  className="
                    mt-5 bg-green-50
                    border border-green-200
                    rounded-2xl px-4 py-3
                    flex items-center gap-3
                  "
                >

                  <FaFileExcel className="text-green-600 text-xl" />

                  <div className="text-left">

                    <div className="font-semibold text-sm text-gray-700">
                      {fileExcel.name}
                    </div>

                    <div className="text-xs text-gray-500">
                      {
                        (
                          fileExcel.size /
                          1024 /
                          1024
                        ).toFixed(2)
                      } MB
                    </div>

                  </div>

                  <button
                    onClick={() => {
                      resetUploadSelection()
                    }}

                    className="
                      ml-2 text-red-500
                      hover:text-red-700
                    "
                  >

                    <FaTrash />

                  </button>

                </div>

              )
            }

            <button
              onClick={handleUpload}

              className="
                mt-6 btn border-none
                bg-green-500 hover:bg-green-600
                text-white rounded-full
                px-6 flex items-center gap-2
              "
            >

              <FaCloudUploadAlt />

              Preview Data

            </button>

          </div>

        </div>

        {/* ================= TABLE ================= */}
        {
          showTable && (

            <div className="mt-6">

              {/* INFO */}
              <div className="flex items-center justify-between mb-4">

                <div>

                  <h3 className="text-lg font-bold text-gray-700">
                    Preview Data Jenis Pajak
                  </h3>

                  <p className="text-sm text-gray-500">
                    Total Data : {excelData.length}
                  </p>

                </div>

                <div
                  className="
                    px-4 py-2 rounded-full
                    bg-green-100 text-green-700
                    text-sm font-semibold
                  "
                >

                  Data Siap Diupload

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

                      <th>No</th>

                      <th>Jenis Jasa</th>

                      <th>Kode Objek</th>

                      <th>Jenis PPh</th>

                      <th>Tarif</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      excelData.map((item, index) => (

                        <tr
                          key={index}
                          className="hover"
                        >

                          <td>{index + 1}</td>

                          {/* JENIS JASA */}
                          <td>

                            <div className="flex items-center gap-2">

                              <FaFileInvoiceDollar className="text-blue-500" />

                              <span className="font-medium">
                                {item.jenis_jasa}
                              </span>

                            </div>

                          </td>

                          {/* KODE OBJEK */}
                          <td className="font-semibold text-gray-700">

                            {item.kode_objek}

                          </td>

                          {/* JENIS PPH */}
                          <td>

                            <div
                              className={`
                                inline-flex items-center
                                gap-2 px-3 py-1
                                rounded-full text-xs
                                font-semibold text-white
                                ${item.jenis_pph === 'PPh 23'
                                  ? 'bg-orange-500'
                                  : 'bg-green-600'
                                }
                              `}
                            >

                              <FaMoneyCheckAlt />

                              {item.jenis_pph}

                            </div>

                          </td>

                          {/* TARIF */}
                          <td>

                            <div
                              className="
                                flex items-center gap-2
                              "
                            >

                              <FaPercent className="text-purple-500" />

                              <span className="font-semibold text-purple-700">

                                {item.tarif}%

                              </span>

                            </div>

                          </td>

                        </tr>

                      ))
                    }

                  </tbody>

                </table>

              </div>

            </div>

          )
        }

      </div>

    </Modal>

  )

}

export default ModalUpload