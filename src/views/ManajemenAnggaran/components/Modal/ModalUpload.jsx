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

const ModalUpload = ({ reloadData, setReloadData }) => {

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
        || !String(row?.account ?? '').trim()
        || !String(row?.bulan ?? '').trim()
        || !String(row?.budget_biaya ?? '').trim()
        || !String(row?.realisasi_biaya ?? '').trim()
    })

    if (invalidRowIndex !== -1) {
      return {
        valid: false,
        message: `Baris ${invalidRowIndex + 2} memiliki data yang belum lengkap. Pastikan Profit Center, Account, Bulan, Budget Biaya, dan Realisasi Biaya terisi.`
      }
    }

    const parsedRows = normalizedRows.map((row, index) => {
      const budget = toNumeric(row?.budget_biaya)
      const realisasi = toNumeric(row?.realisasi_biaya)
      const sisa = budget - realisasi
      const persen = budget === 0 ? '0.00' : ((realisasi / budget) * 100).toFixed(2)

      return {
        id: index + 1,
        profit_center: String(row?.profit_center ?? '').trim(),
        cabang: String(row?.cabang ?? '').trim(),
        account: String(row?.account ?? '').trim(),
        description: String(row?.description ?? '').trim(),
        bulan: String(row?.bulan ?? '').trim(),
        budget_biaya: budget,
        realisasi_biaya: realisasi,
        sisa_anggaran: sisa,
        persen
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

  console.log(excelData, 'excelData');


  // =========================
  // HANDLE TEMPLATE DOWNLOAD
  // =========================
  const handleDownloadTemplate = () => {
    const link = document.createElement('a')
    link.href = TEMPLATE_EXCEL_URL
    link.download = 'template-anggaran.xlsx'
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

  // =========================
  // SUBMIT
  // =========================
  const chunkArray = (array, size) => {
    const chunks = [];

    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }

    return chunks;
  };

  // const handleSubmit = async () => {

  //   if (!excelData.length) {
  //     swal.error('Preview data belum tersedia, silakan upload file excel terlebih dahulu!')
  //     return
  //   }

  //   swal.loading()

  //   try {
  //     const dataExcel = excelData.map(({ sisa_anggaran, persen, ...rest }) => rest)
  //     const chunks = chunkArray(dataExcel, 500)
  //     let result_success = 0
  //     let result_error = 0
  //     let data_error = []
  //     for (const chunk of chunks) {
  //       const res = await storeSchema.actions.insertAnggaranArray(chunk)
  //       result_success += res?.data?.total_success
  //       result_error += res?.data?.total_error
  //       if (res?.data?.data_error && res?.data?.data_error?.length > 0) {
  //         data_error.push(res?.data?.data_error)
  //       }
  //     }

  //     if (result_success > 0) {
  //       swal.close()
  //       if (dataExcel?.length === result_success) {
  //         await swal.success('Semua Data Berhasil Disimpan !')
  //       } else {
  //         const result = await Swal.fire({
  //           title: `Berhasil: ${result_success} , Gagal: ${result_error}`,
  //           // text: `Data Yang Gagal Terdapat Pada Baris : ${res?.data?.data_error?.map(a => { return Number(a.id) + 1 })?.join(", ")}`,
  //           icon: "success",
  //           confirmButtonText: 'Lihat Data Yang Gagal',
  //           cancelButtonText: "Tutup",
  //           showCancelButton: true,
  //           customClass: {
  //             confirmButton:
  //               "bg-red-500 hover:bg-red-600 text-white px-4 py-2 mx-3 rounded",
  //             cancelButton:
  //               "bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded",
  //           },
  //           buttonsStyling: false,
  //         });

  //         if (result.isConfirmed) {
  //           await dispatch(
  //             setToggleModal({
  //               isOpen: true,
  //               modal: 'modalGagal',
  //               data: data_error[0]
  //             })
  //           )
  //         } else {
  //           swal.close()
  //         }
  //       }
  //       setReloadData(true)
  //       // await dispatch(
  //       //   setToggleModal({
  //       //     isOpen: false,
  //       //     modal: ''
  //       //   })
  //       // )
  //     } else {
  //       swal.close()
  //       // await swal.custom('Tidak Dapat Disimpan !', res?.data?.data || res?.message || 'Terjadi kesalahan saat menyimpan data', 'warning')
  //     }
  //   } catch (error) {
  //     swal.close()
  //     swal.error(error?.message || 'Terjadi kesalahan saat mengirim data')
  //   }

  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!excelData.length) {
      swal.error('Preview data belum tersedia, silakan upload file excel terlebih dahulu!');
      return;
    }

    const pilihan = await Swal.fire({
      title: "Pilih Jenis Upload",
      html: `
      <div class="text-gray-600">
        Silakan pilih proses yang ingin dilakukan.
      </div>
    `,
      icon: "question",
      showConfirmButton: true,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `
<div style="display:flex;align-items:center;justify-content:center;gap:6px">
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path d="M12 5v14M5 12h14"/>
  </svg>
  <span>Penambahan</span>
</div>
`,

      denyButtonText: `
<div style="display:flex;align-items:center;justify-content:center;gap:6px">
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path d="M21 2v6h-6"/>
    <path d="M3 12a9 9 0 0 1 15.5-6.36L21 8"/>
    <path d="M3 22v-6h6"/>
    <path d="M21 12a9 9 0 0 1-15.5 6.36L3 16"/>
  </svg>
  <span>Adjustment</span>
</div>
`,

      cancelButtonText: `
<div style="display:flex;align-items:center;justify-content:center;gap:6px">
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path d="M18 6L6 18"/>
    <path d="M6 6l12 12"/>
  </svg>
  <span>Tutup</span>
</div>
`,
      customClass: {
        confirmButton:
          "bg-green-600 hover:bg-green-700 text-white px-4 py-2 mx-2 rounded-2xl",
        denyButton:
          "bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 mx-2 rounded-2xl",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 mx-2 rounded-2xl",
      },
      buttonsStyling: false
    });

    if (pilihan.isDismissed) return;

    const isAdjustment = pilihan.isDenied;

    swal.loading();

    try {

      const dataExcel = excelData.map(({ sisa_anggaran, persen, ...rest }) => rest);

      // ==========================
      // INSERT PER CHUNK
      // ==========================

      const chunks = chunkArray(dataExcel, 500);

      let result_success = 0;
      let result_error = 0;
      let data_error = [];

      if (isAdjustment) {
        for (const chunk of chunks) {
          await storeSchema.actions.updateAnggaranArray(chunk);
        }
      }

      for (const chunk of chunks) {

        const res = await storeSchema.actions.insertAnggaranArray({isAdjustment: isAdjustment ? 'Y' : 'T', data: chunk});

        result_success += res?.data?.total_success || 0;
        result_error += res?.data?.total_error || 0;

        if (res?.data?.data_error?.length) {
          data_error.push(...res.data.data_error);
        }
      }

      swal.close();

      if (result_success > 0) {

        if (dataExcel.length === result_success) {

          dispatch(
            setToggleModal({
              isOpen: false,
              modal: ''
            })
          );

          await swal.success(
            isAdjustment
              ? 'Adjustment Berhasil Disimpan!'
              : 'Semua Data Berhasil Disimpan!'
          );

        } else {

          const result = await Swal.fire({
            title: `Berhasil: ${result_success}, Gagal: ${result_error}`,
            icon: "success",
            confirmButtonText: '<i class="fas fa-eye"></i> Lihat Data Yang Gagal',
            cancelButtonText: '<i class="fas fa-times"></i> Tutup',
            showCancelButton: true,
            customClass: {
              confirmButton:
                "bg-red-500 hover:bg-red-600 text-white px-4 py-2 mx-3 rounded",
              cancelButton:
                "bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded",
            },
            buttonsStyling: false,
          });

          if (result.isConfirmed) {
            dispatch(
              setToggleModal({
                isOpen: true,
                modal: 'modalGagal',
                data: data_error
              })
            );
          }
        }

        setReloadData(true);

      }

    } catch (error) {

      swal.close();

      swal.error(
        error?.message || 'Terjadi kesalahan saat mengirim data'
      );

    }
  };

  const totalBudget = excelData.reduce((sum, item) => sum + Number(item.budget_biaya || 0), 0)
  const totalRealisasi = excelData.reduce((sum, item) => sum + Number(item.realisasi_biaya || 0), 0)
  const totalSisa = totalBudget - totalRealisasi

  return (

    <Modal
      title="Upload Data Anggaran"

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
                Upload Data Anggaran
              </h1>

              <p className="text-sm text-blue-100 mt-1">
                Upload file excel anggaran untuk proses import data budget cabang.
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
              Upload File Excel
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
                    Preview Data Anggaran
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

                      <th>Profit Center</th>

                      <th>Cabang</th>

                      <th>Account</th>

                      <th>Description</th>

                      <th>Bulan</th>

                      <th>Budget Biaya</th>

                      <th>Realisasi Biaya</th>

                      <th>Sisa Anggaran</th>

                      <th>%</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      excelData?.slice(0, 100)?.map((item, index) => (

                        <tr
                          key={index}
                          className="hover"
                        >

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

                            {formatCurrency(item.sisa_anggaran)}

                          </td>

                          <td>

                            <div
                              className="
                                flex items-center gap-2
                              "
                            >

                              <FaChartPie className="text-purple-500" />

                              <span className="font-semibold text-purple-700">

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

              </div>

            </div>

          )
        }

      </div>

    </Modal>

  )

}

export default ModalUpload