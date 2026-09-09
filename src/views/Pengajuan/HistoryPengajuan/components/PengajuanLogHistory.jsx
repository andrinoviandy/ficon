import React from 'react';
import {
  IoCheckmark,
  IoTime,
  IoEllipsisHorizontal,
} from "react-icons/io5";

const PengajuanLogHistory = ({ data }) => {

  const dummyLogs = data?.status_history?.map((v, i) => {
    return {
      step: i + 1,
      title: v?.kegiatan,
      status: v?.kd_status ? data?.kd_status === 'T' ? 'Proses' : v?.ur_kd_status_id : 'Proses',
      date: v?.date_status,
      role: v?.ur_role_id,
      role_id: v?.role_id,
      unit_kerja: v?.role_id === 'RL01' ? 'Pemohon' : v?.ur_unit_kerja_id ? `SUB UNIT : ${v?.ur_unit_kerja_id}` : v?.ur_jabatan_id,
      jabatan: v?.ur_jabatan_id,
      isDone: ['S1', 'S2', 'VR', 'UR'].includes(v?.kd_status) ? data?.kd_status !== 'T' ? true : v?.role_id === 'RL01' ? true : false : false,
      isCurrent: v?.flag_action_unit === 'Y' ? data?.kd_status !== 'T' ? true : false : false,
      created_by: v?.role_id === 'RL01' ? data?.nama_pemohon : (v?.user?.nip ? v?.user?.nip + ' - ' + v?.user?.nama : `Belum Ada ${v?.ur_jabatan_id} Di Unit Ini !`),
    }
  })

  // =========================
  // DUMMY DATA
  // =========================
  const dummyLogs2 = [
    {
      step: 1,
      role: 'KFTD',
      title: 'Pembuat Ajuan Pengiriman',
      status: 'Selesai',
      date: '03 Mei 2026, 10:00',
      approver: 'Andri Noviandy',
      isDone: true,
      isCurrent: false,
    },
    {
      step: 2,
      role: 'Bag. Anggaran',
      title: 'Cek Budget',
      status: 'Sedang Proses',
      date: '03 Mei 2026, 14:20',
      approver: 'Bag. Anggaran',
      isDone: false,
      isCurrent: true,
    },
    {
      step: 3,
      role: 'Bag. Ficon',
      title: 'Verifikasi',
      status: 'Waiting',
      date: '-',
      approver: '-',
      isDone: false,
      isCurrent: false,
    },
    {
      step: 4,
      role: 'Manager Keuangan',
      title: 'Persetujuan',
      status: 'Waiting',
      date: '-',
      approver: '-',
      isDone: false,
      isCurrent: false,
    },
    {
      step: 5,
      role: 'Direktur',
      title: 'Persetujuan',
      status: 'Waiting',
      date: '-',
      approver: '-',
      isDone: false,
      isCurrent: false,
    },
    {
      step: 6,
      role: 'Bag. Treasury',
      title: 'Proses Pembayaran',
      status: 'Waiting',
      date: '-',
      approver: '-',
      isDone: false,
      isCurrent: false,
    },
  ];

  return (
    <div className="w-full border-2 rounded-[15px] p-6 bg-white shadow-sm">

      {/* ========================= */}
      {/* ANIMATION STYLE */}
      {/* ========================= */}
      <style>
        {`
          @keyframes fillLine {
            0% {
              height: 0%;
              opacity: 0.3;
            }

            30% {
              opacity: 1;
            }

            100% {
              height: 100%;
              opacity: 1;
            }
          }

          .animate-fill-line {
            animation: fillLine 1.8s ease-in-out infinite;
          }
        `}
      </style>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 border-b pb-4">

        <h3 className="font-bold text-gray-800 flex items-center gap-2 tracking-tight">
          <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
          Riwayat Status Pengajuan
        </h3>

        <span className="text-[10px] bg-blue-50 px-3 py-1 rounded-full font-bold text-blue-600 uppercase">
          Track ID: {data?.no_pengajuan}
        </span>

      </div>

      {/* TIMELINE */}
      <div className="flex flex-col w-full relative">

        {dummyLogs?.map((log, index) => (

          <div
            key={index}
            className="relative w-full mb-6 last:mb-0"
          >

            {/* ========================= */}
            {/* GARIS */}
            {/* ========================= */}
            {index !== dummyLogs.length - 1 && (

              <div className="absolute left-[21px] top-12 bottom-[-24px] w-[4px] rounded-full overflow-hidden bg-gray-200">

                {/* DONE */}
                {log.isDone && !log.isCurrent && (
                  <div className="absolute inset-0 bg-green-500"></div>
                )}

                {/* CURRENT */}
                {dummyLogs[index + 1].isCurrent === true && (
                  <>
                    {/* Background */}
                    <div className="absolute inset-0 bg-blue-100"></div>

                    {/* Glow */}
                    <div className="absolute inset-0 blur-[3px] bg-blue-300 opacity-40"></div>

                    {/* Animated Fill */}
                    <div
                      className="
                        absolute
                        top-0
                        left-0
                        w-full
                        bg-blue-500
                        animate-fill-line
                        rounded-full
                      "
                    ></div>
                  </>
                )}

              </div>
            )}

            {/* ========================= */}
            {/* CARD */}
            {/* ========================= */}
            <div
              className={`
                w-full
                p-4
                rounded-xl
                border-2
                transition-all
                duration-300
                ${log.isDone
                  ? 'bg-green-50 border-green-200 ring-1 ring-green-100'
                  : log.isCurrent
                    ? 'bg-blue-50 border-blue-500 shadow-md ring-1 ring-blue-200'
                    : 'bg-gray-50 border-gray-100 opacity-70'
                }
              `}
            >

              <div className="flex items-start gap-4">

                {/* STATUS ICON */}
                <div className="mt-1 flex-shrink-0 z-10">

                  {log.isDone ? (

                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm">
                      <IoCheckmark size={14} />
                    </div>

                  ) : log.isCurrent ? (

                    <div className="relative">

                      <div className="absolute inset-0 rounded-full bg-blue-400 blur-md opacity-70 animate-ping"></div>

                      <div className="relative w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md">
                        <IoTime size={14} />
                      </div>

                    </div>

                  ) : (

                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center text-gray-300">
                      <IoEllipsisHorizontal size={12} />
                    </div>

                  )}

                </div>

                {/* CONTENT */}
                <div className="flex-grow grid grid-cols-1 md:grid-cols-12 items-center gap-4">

                  {/* LEFT */}
                  <div className="md:col-span-3">

                    <div className="flex items-center gap-2 mb-1">

                      <span
                        className={`
                          text-sm
                          text-nowrap
                          font-bold
                          ${log.isCurrent
                            ? 'text-blue-700'
                            : 'text-gray-900'
                          }
                        `}
                      >
                        Step {log.step}
                      </span>

                      {/* <span className="px-2 py-0.5 rounded-md bg-white border border-gray-200 text-[10px] font-bold text-gray-500 uppercase">
                        {log.role}
                      </span> */}

                    </div>

                    <p className="text-xs font-semibold text-gray-600">
                      {log.title}
                    </p>

                  </div>

                  {/* CENTER */}
                  <div className="md:col-span-8 text-xs">

                    {/* {log.role && (
                      <p className="text-gray-700 font-medium">
                        UNIT / ROLE :{' '}
                        <span className="text-gray-900 font-bold">
                          {log?.role?.toUpperCase()}
                        </span>
                      </p>
                    )} */}
                    {log.unit_kerja && (
                      <p className="text-gray-700 font-medium flex flex-col">
                        <span className="text-gray-900 font-bold">
                          {log?.unit_kerja?.toUpperCase()}
                        </span>
                        <span className="text-gray-400 font-bold">
                          {log?.created_by?.toUpperCase()}
                        </span>
                      </p>
                    )}
                    {/* {log.jabatan && (
                      <p className="text-gray-700 font-medium">
                        JABATAN :{' '}
                        <span className="text-gray-900 font-bold">
                          {log?.jabatan?.toUpperCase()}
                        </span>
                      </p>
                    )} */}

                    <p className="text-gray-400 mt-0.5">
                      {
                        log.date !== '-'
                          ? log.date
                          : 'Proses selanjutnya'
                      }
                    </p>

                  </div>

                  {/* RIGHT */}
                  <div className="md:col-span-1 flex justify-start md:justify-end">

                    <span
                      className={`
                        px-4
                        py-1
                        rounded-full
                        text-[10px]
                        font-black
                        uppercase
                        tracking-wider
                        ${log.isDone
                          ? 'bg-green-200 text-green-800'
                          : log.isCurrent
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }
                      `}
                    >
                      {log.status}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default PengajuanLogHistory;