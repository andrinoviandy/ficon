import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaFileInvoice,
  FaSignInAlt,
  FaDownload,
} from "react-icons/fa";

import {
  FaUser,
  FaUserTag,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaPercent,
  FaFileAlt,
  FaRegFileAlt,
} from "react-icons/fa";

import { HiOutlineTicket } from "react-icons/hi";
import { QRCodeCanvas } from "qrcode.react";
import storeSchema from "global/store";
import { swal } from "global/helper/swal";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdVerified } from "react-icons/md";

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
};

export default function ValidasiApproval() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const [data, setData] = useState()
  const [isValid, setIsValid] = useState()

  const list = [
    {
      jenis: "Konsumsi",
      desc: "Makan & meeting operasional",
      nominal: 3000000,
    },
    {
      jenis: "Transportasi",
      desc: "Transport perjalanan dinas",
      nominal: 5000000,
    },
    {
      jenis: "Pengiriman",
      desc: "Biaya pengiriman dokumen",
      nominal: 7000000,
    },
  ];

  const total = list.reduce((a, b) => a + b.nominal, 0);

  const handleLogin = () => {
    window.location.href = window.location.origin;
  };

  const getDetailStatus = async () => {
    try {
      swal.loading()
      const res = await storeSchema.actions.getDetailStatus(status)
      if (res?.status === true) {
        swal.close()
        setData(res?.data)
        if (res?.data?.no_pengajuan) setIsValid(true)
        else setIsValid(false)
      } else {
        swal.close()
      }
    } catch (error) {
      swal.close()
      console.error('Error fetching detail pengajuan:', error)
    }
  }

  useEffect(() => {
    if (status) {
      getDetailStatus()
    }
  }, [status])

  return (
    <>
      {isValid === true ? (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
          <div className="w-full max-w-6xl">

            {/* ACTION BAR */}
            <div className="flex justify-between mb-3">
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900 text-white text-sm transition hover:bg-blue-800"
              >
                <FaSignInAlt />
                Login For More Details
              </button>

              <button
                onClick={() => window.open(`${process.env.REACT_APP_BASE_URL_LOCAL}/download-pdf/${data?.pengajuan_id}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition"
              >
                <FaDownload />
                Download PDF
              </button>
            </div>

            {/* CARD */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 relative overflow-hidden border border-gray-200">

              {/* WATERMARK */}
              {isValid && (
                <FaCheckCircle className="absolute top-10 right-10 text-green-500 text-[180px] opacity-10" />
              )}

              {/* HEADER */}
              <div className="flex justify-between items-center border-b pb-4 mb-5">

                <div className="flex items-center gap-3">

                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <FaFileInvoice className="text-blue-700 text-2xl" />
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      Verifikasi Approval Pengajuan
                    </h1>

                    <p className="text-sm text-gray-500">
                      Verifikasi approval berdasarkan QR Code
                    </p>
                  </div>

                </div>

                {/* STATUS */}
                <div
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold shadow-md ${isValid
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                >
                  {isValid ? <FaCheckCircle /> : <FaTimesCircle />}
                  {isValid ? "VALID" : "TIDAK VALID"}
                </div>

              </div>

              {/* CONTENT */}
              <div className="flex flex-col lg:flex-row gap-6">

                {/* LEFT */}
                <div className="flex-1">
                  <div className={`
                            bg-gradient-to-r
                            ${data?.kd_status === 'S1' ? `
                              from-green-600
                              via-green-700
                              to-green-800
                              ` : `
                              from-red-700
                              via-red-700
                              to-red-800
                              `}
                            rounded-3xl
                            p-6
                            text-white
                            shadow-xl mb-5
                          `}>

                    <div className="
                              flex items-center justify-between
                            ">

                      <div>

                        <h1 className="
                                  text-2xl font-bold tracking-wide
                                ">
                          {data?.kd_status === 'S1' ? 'Pengajuan Disetujui' : 'Pengajuan Ditolak'}
                        </h1>

                        <p className="
                                  text-sm text-blue-200 mt-1
                                ">
                          {data?.kd_status === 'S1' ? 'Pengajuan telah disetujui dan berhasil diproses. Terima kasih atas pengajuan yang telah disampaikan.' : 'Pengajuan belum dapat diproses. Silakan periksa catatan penolakan di bawah ini dan lakukan perbaikan yang diperlukan.'}
                        </p>

                      </div>

                      <div className="
                                w-14 h-14 rounded-2xl
                                bg-white/10
                                flex items-center justify-center
                              ">

                        <MdVerified className="
                                  text-4xl text-blue-100
                                " />

                      </div>

                    </div>

                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-sm overflow-auto">

                    {[
                      {
                        label: "No. Pengajuan",
                        value: data?.no_pengajuan,
                        icon: <FaFileAlt className="text-blue-600" />,
                      },
                      {
                        label: "Tanggal Pengajuan",
                        value: data?.tgl_pengajuan,
                        icon: <FaCalendarAlt className="text-yellow-600" />,
                      },
                      {
                        label: "Nama Pemohon",
                        value: data?.nama_pemohon,
                        icon: <FaUser className="text-green-600" />,
                      },
                      {
                        label: "Jabatan",
                        value: data?.jabatan,
                        icon: <FaUserTag className="text-purple-600" />,
                      },
                      {
                        label: "Profit Center",
                        value: data?.cabang,
                        icon: <FaBuilding className="text-orange-600" />,
                      },
                      {
                        label: "Jenis Biaya",
                        value: data?.jenis_biaya,
                        icon: <FaFileAlt className="text-cyan-600" />,
                      },
                      // {
                      //   label: "Account Description",
                      //   value: data?.account_desc,
                      //   icon: <FaRegFileAlt className="text-pink-600" />,
                      // },
                      // {
                      //   label: "Metode Pembayaran",
                      //   value: data?.metode_pembayaran,
                      //   icon: <FaMoneyBillWave className="text-emerald-600" />,
                      // },
                      {
                        label: "Nomor Invoice",
                        value: data?.no_invoice || '-',
                        icon: <FaFileInvoice className="text-indigo-600" />,
                      },
                      {
                        label: "Nomor Faktur",
                        value: data?.no_faktur_pajak || '-',
                        icon: <FaFileInvoice className="text-red-600" />,
                      },
                      {
                        label: "Nomor Voucher SAP",
                        value: data?.no_voucher_sap || '-',
                        icon: <HiOutlineTicket className="text-blue-800" />,
                      },
                      {
                        label: "Nominal DPP",
                        value: formatRupiah(data?.nominal_dpp) || '-',
                        icon: <FaMoneyBillWave className="text-green-700" />,
                      },
                      {
                        label: "PPN",
                        value: `${data?.ppn || '0'}% (${formatRupiah(
                          data?.nominal_ppn
                        ) || '-'})`,
                        icon: <FaPercent className="text-pink-700" />,
                      },
                      {
                        label: "PPh",
                        value: `${data?.pph || '0'}% (${formatRupiah(
                          data?.nominal_pph
                        ) || '-'})`,
                        icon: <FaPercent className="text-orange-700" />,
                      },
                      {
                        label: data?.kd_status === 'S1' ? "Tanggal Disetujui" : "Tanggal Ditolak",
                        value: data?.tanggal_aksi || '-',
                        icon: data?.kd_status === 'S1' ? <FaCheckCircle className="text-emerald-700" /> : <FaTimesCircle className="text-red-700" />,
                      },
                      {
                        label: data?.kd_status === 'S1' ? "Disetujui Oleh" : "Ditolak Oleh",
                        value: (
                          <>
                            {data?.aktor_aksi.split('- ')[1] || '-'}
                            <br />
                            <span className="text-xs text-gray-400">
                              ({data?.unit_aksi})
                            </span>
                          </>
                        ),
                        icon: data?.kd_status === 'S1' ? <FaCheckCircle className="text-emerald-700" /> : <FaTimesCircle className="text-red-700" />,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start py-1.5 border-b border-dashed border-gray-200"
                      >

                        <div className="w-6 mt-[2px] text-base">
                          {item.icon}
                        </div>

                        <div className="w-52 text-gray-500 text-nowrap">
                          {item.label}
                        </div>

                        <div className="px-2 text-gray-400">:</div>

                        <div className="flex-1 font-semibold text-gray-800 text-nowrap">
                          {item.value}
                        </div>

                      </div>
                    ))}

                  </div>

                </div>

                {/* QR */}
                <div className="w-full lg:w-64">

                  <div className="border rounded-2xl p-5 flex flex-col items-center bg-gray-50 shadow-lg sticky top-5">

                    <p className="text-sm font-bold mb-3 text-gray-700">
                      QR Validasi
                    </p>

                    <QRCodeCanvas
                      value={`${data?.qrcode}`}
                      size={140}
                    />

                    <p className="text-xs mt-3 text-gray-500 text-center">
                      Scan QR untuk validasi approval
                    </p>

                    <p className="text-xs font-bold text-blue-700 mt-3">
                      {data?.no_pengajuan}
                    </p>

                  </div>

                </div>

              </div>

              {/* TABLE */}
              <div className="overflow-x-auto mt-8 rounded-xl border">

                <table className="w-full text-sm">

                  <thead className="bg-blue-900 text-white">

                    <tr>
                      <th className="p-3 text-center">No</th>
                      <th className="p-3 text-left">Jenis Biaya</th>
                      <th className="p-3 text-left">Deskripsi</th>
                      <th className="p-3 text-right">Nominal</th>
                    </tr>

                  </thead>

                  <tbody>

                    {/* {list.map((item, i) => ( */}
                    <tr
                      key={0}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3 text-center">
                        1
                      </td>

                      <td className="p-3">
                        {data?.jenis_biaya}
                      </td>

                      <td className="p-3">
                        {data?.keterangan}
                      </td>

                      <td className="p-3 text-right font-semibold">
                        {formatRupiah(data?.nominal_dpp)}
                      </td>
                    </tr>
                    {/* ))} */}

                  </tbody>

                </table>

              </div>

              {/* TOTAL */}
              <div className="flex justify-end mt-5">

                <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 shadow-sm">

                  <p className="text-sm text-gray-500">
                    Total Pengajuan
                  </p>

                  <p className="text-2xl font-bold text-blue-700">
                    {formatRupiah(data?.nominal_dpp)}
                  </p>

                </div>

              </div>

              {/* FOOTER */}
              <div className="mt-8 text-center text-xs text-gray-500 border-t pt-4">

                {isValid
                  ? "Data approval ini telah diverifikasi dan dinyatakan valid oleh sistem."
                  : "Dokumen tidak ditemukan atau tidak valid."}

              </div>

            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
          <div className="w-full max-w-5xl">

            {/* LOGIN BUTTON */}
            <div className="mb-3">
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900 text-white text-sm transition"
              >
                <FaSignInAlt />
                Login For More Details
              </button>
            </div>

            {/* CARD */}
            <div className="bg-white rounded-2xl shadow-xl p-6 relative overflow-hidden">

              {/* WATERMARK */}
              {isValid ? (
                <FaCheckCircle className="absolute top-10 right-10 text-green-500 text-[180px] opacity-10" />
              ) : (
                <FaTimesCircle className="absolute top-10 right-10 text-red-500 text-[180px] opacity-10" />
              )}

              {/* HEADER */}
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <FaFileInvoice className="text-blue-600 text-2xl" />
                  <div>
                    <h1 className="text-xl font-bold">
                      Verifikasi Approval Pengajuan
                    </h1>
                    <p className="text-sm text-gray-500">
                      Verifikasi approval berdasarkan QR Code
                    </p>
                  </div>
                </div>

                {/* STATUS */}
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${isValid
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                    }`}
                >
                  {isValid ? <FaCheckCircle /> : <FaTimesCircle />}
                  {isValid ? "VALID" : "TIDAK VALID"}
                </div>
              </div>

              {/* ❌ JIKA TIDAK VALID */}
              {!isValid && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <FaTimesCircle className="text-red-500 text-6xl mb-4" />

                  <h2 className="text-xl font-bold text-red-600 mb-2">
                    Approval Tidak Valid
                  </h2>

                  <p className="text-gray-500 text-sm max-w-md">
                    QR Code yang Anda scan tidak terdaftar atau data approval ini tidak valid.
                    Silakan periksa kembali atau hubungi administrator.
                  </p>
                </div>
              )}

              {/* ✅ JIKA VALID */}
              {isValid && (
                <>
                  {/* (tetap sama, tidak diubah) */}
                </>
              )}

              {/* FOOTER */}
              <div className="mt-6 text-center text-xs text-gray-500">
                {isValid
                  ? "Data Approval ini telah diverifikasi dan valid."
                  : "Data Approval tidak ditemukan atau sudah tidak berlaku."}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}