import React, { useState } from 'react'

import { Modal } from 'components/atoms'

import { useDispatch } from 'react-redux'

import {
  FaCheckCircle,
  FaCloudUploadAlt,
  FaFileExcel,
  FaTrash,
  FaUpload,
  FaBuilding,
  FaMoneyBillWave,
  FaChartPie
} from 'react-icons/fa'

import { IoCloudUploadOutline } from 'react-icons/io5'

import { swal } from 'global/helper/swal'

import { setToggleModal } from '../../../../redux/n2n/global'

import { formatCurrency } from 'global/helper/formatCurrency'

const ModalUpload = () => {

  const dispatch = useDispatch()

  // =========================
  // STATE
  // =========================
  const [fileExcel, setFileExcel] = useState(null)

  const [showTable, setShowTable] = useState(false)

  // =========================
  // DUMMY DATA
  // =========================
  const dummyData = Array.from({ length: 20 }, (_, i) => {

    const budget = 10000000 + (i * 1500000)

    const realisasi = 3000000 + (i * 700000)

    const sisa = budget - realisasi

    const persen = (
      (realisasi / budget) * 100
    ).toFixed(2)

    return {
      id: i + 1,
      cabang: [
        'Jakarta',
        'Bandung',
        'Surabaya',
        'Semarang',
        'Bekasi'
      ][i % 5],

      account: `23264${i}`,

      description: [
        'Biaya Rapat',
        'Biaya Operasional',
        'Biaya Pengiriman',
        'Biaya Konsumsi',
        'Biaya Transport'
      ][i % 5],

      bulan: [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei'
      ][i % 5],

      budget,
      realisasi,
      sisa,
      persen
    }

  })

  // =========================
  // HANDLE FILE
  // =========================
  const handleFile = (e) => {

    const file = e.target.files[0]

    if (file) {

      setFileExcel(file)

    }

  }

  // =========================
  // HANDLE UPLOAD
  // =========================
  const handleUpload = () => {

    if (!fileExcel) {

      swal.error('File excel wajib dipilih!')

      return

    }

    swal.loading()

    setTimeout(() => {

      swal.close()

      setShowTable(true)

      swal.custom(
        'Berhasil',
        'Data excel berhasil diproses',
        'success'
      )

    }, 1000)

  }

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {

    swal.loading()

    setTimeout(async () => {

      swal.close()

      await dispatch(
        setToggleModal({
          isOpen: false,
          modal: ''
        })
      )

      swal.custom(
        'Berhasil',
        'Data anggaran berhasil disubmit',
        'success'
      )

    }, 1000)

  }

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
              bg-blue-600 hover:bg-blue-700
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

            <label
              className="
                mt-5 cursor-pointer
                bg-blue-600 hover:bg-blue-700
                text-white px-5 py-3
                rounded-full flex items-center gap-2
                transition-all
              "
            >

              <FaUpload />

              Pilih File Excel

              <input
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={handleFile}
              />

            </label>

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
                      setFileExcel(null)
                      setShowTable(false)
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
                    Total Data : {dummyData.length}
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
                      dummyData.map((item, index) => (

                        <tr
                          key={index}
                          className="hover"
                        >

                          <td>{index + 1}</td>

                          <td>

                            <div className="flex items-center gap-2">

                              <FaBuilding className="text-blue-500" />

                              {item.cabang}

                            </div>

                          </td>

                          <td className="font-semibold">
                            {item.account}
                          </td>

                          <td>{item.description}</td>

                          <td>{item.bulan}</td>

                          <td className="text-blue-700 font-semibold">

                            {formatCurrency(item.budget)}

                          </td>

                          <td className="text-orange-600 font-semibold">

                            {formatCurrency(item.realisasi)}

                          </td>

                          <td className="text-green-700 font-semibold">

                            {formatCurrency(item.sisa)}

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
                        Rp 425.000.000
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
                        Rp 198.000.000
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
                        Rp 227.000.000
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