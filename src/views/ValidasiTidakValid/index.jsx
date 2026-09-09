import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaFileInvoice,
  FaSignInAlt,
} from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
};

export default function ValidasiTidakValid() {
  const isValid = false;

  const data = {
    no: "PJ-2025-00045",
    nama: "Budi Santoso",
    jabatan: "Assistant Manager",
    cabang: "Jakarta Pusat",
    tanggal: "16 Mei 2025",
  };

  const list = [
    {
      jenis: "Konsumsi",
      desc: "Makan & meeting",
      nominal: 3000000,
    },
  ];

  const total = list.reduce((a, b) => a + b.nominal, 0);

  const handleLogin = () => {
    alert("Redirect ke login...");
    // arahkan ke halaman login
  };

  return (
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
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                isValid
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
  );
}