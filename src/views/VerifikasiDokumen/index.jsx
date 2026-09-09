import { formatDateJam } from "global/helper/formatDate";
import { decodeData } from "global/helper/jwt";
import { swal } from "global/helper/swal";
import storeSchema from "global/store";
import React, { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSignInAlt,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
};

export default function VerifikasiDokumen() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [data, setData] = useState()
  const [list, setList] = useState()
  const [isValid, setIsValid] = useState()
  // const isValid = true; // toggle valid / tidak

  // const total = list.reduce((a, b) => a + b.nominal, 0);

  const handleLogin = () => {
    window.location.href = window.location.origin;
  };

  const getDetailPengajuan = async () => {
    try {
      swal.loading()
      const pengajuan_id = await decodeData(token)
      const id = pengajuan_id.replace(/"/g, '')
      const res = await storeSchema.actions.getDetailPengajuanNoAuth(id)
      if (res?.status === true) {
        swal.close()
        setData(res?.data)
        setList(res?.data?.coa)
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
    if (token) {
      getDetailPengajuan()
    }
  }, [token])

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-6xl">

        {/* LOGIN */}
        <div className="mb-4">
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-900 text-white text-sm"
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
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <div className="flex items-center gap-3">
              <FaFileAlt className="text-blue-600 text-2xl" />
              <div>
                <h1 className="text-xl font-bold">
                  Verifikasi Dokumen
                </h1>
                <p className="text-sm text-gray-500">
                  Detail informasi pengajuan berdasarkan QR Code
                </p>
              </div>
            </div>

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

          {/* BODY */}
          {isValid ? (
            <>
              {/* INFO GRID */}
              <div className="grid grid-cols-2 gap-6 text-sm">

                <div>
                  <p className="text-gray-500">No Pengajuan</p>
                  <p className="font-semibold">{data?.no_pengajuan}</p>
                </div>

                <div>
                  <p className="text-gray-500">Jabatan Pembuat</p>
                  <p className="font-semibold">{data?.ur_jabatan_id}</p>
                </div>

                <div>
                  <p className="text-gray-500">Jenis</p>
                  <p className="font-semibold">{data?.ur_jenis_biaya_id}</p>
                </div>

                <div>
                  <p className="text-gray-500">Cabang Pembuat</p>
                  <p className="font-semibold">{data?.ur_cabang_id}</p>
                </div>

                <div>
                  <p className="text-gray-500">Tanggal</p>
                  <p className="font-semibold">{formatDateJam(data?.created_at) || '-'}</p>
                </div>

                <div>
                  <p className="text-gray-500">Nama</p>
                  <p className="font-semibold">{data?.nama_pemohon}</p>
                </div>

                <div>
                  <p className="text-gray-500">Keterangan</p>
                  <p className="font-semibold">{data?.keterangan}</p>
                </div>

              </div>

              {/* DETAIL TABLE */}
              <div className="mt-6 border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2">No</th>
                      <th className="p-2 text-left">Nomor COA</th>
                      <th className="p-2 text-left">Deskripsi</th>
                      <th className="p-2 text-right">Nominal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.map((v, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2 text-center">{i + 1}</td>
                        <td className="p-2">{v.gl_account}</td>
                        <td className="p-2">{v.ur_coa_detail_id}</td>
                        <td className="p-2 text-right font-semibold">
                          {formatRupiah(v.nominal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* TOTAL */}
              <div className="mt-4 text-right font-bold text-lg">
                Total: {formatRupiah(data?.nominal_dpp) || '-'}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FaTimesCircle className="text-red-500 text-6xl mb-3" />
              <h2 className="text-xl font-bold text-red-600">
                Dokumen Tidak Valid
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Data tidak ditemukan atau QR Code tidak valid.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}