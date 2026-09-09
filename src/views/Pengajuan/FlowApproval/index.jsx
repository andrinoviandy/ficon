import React from "react";
import {
  FaFileAlt,
  FaCheckCircle,
  FaDollarSign,
  FaClipboardList,
  FaProjectDiagram,
  FaUserAlt,
  FaFlag,
  FaUserFriends,
  FaClipboardCheck,
  FaBuilding,
  FaMoneyCheckAlt,
  FaTruck,
} from "react-icons/fa";

const FlowApproval = () => {

  // ================= FLOW REGULER =================
  const steps = [
    {
      id: 1,
      title: "Pemohon",
      desc: "Membuat Pengajuan",
      icon: <FaFileAlt />,
      color: "bg-blue-200 text-blue-700",
    },
    {
      id: 2,
      title: "Atasan Pemohon",
      desc: "Approval Pengajuan",
      icon: <FaUserAlt />,
      color: "bg-green-200 text-green-700",
    },
    {
      id: 3,
      title: "Unit SDM & Umum",
      desc: "Validasi Dokumen",
      icon: <FaClipboardCheck />,
      color: "bg-yellow-200 text-yellow-700",
    },
    {
      id: 4,
      title: "Unit Pajak",
      desc: "Validasi Pajak",
      icon: <FaCheckCircle />,
      color: "bg-orange-200 text-orange-700",
    },
    {
      id: 5,
      title: "Unit Financial Controller",
      desc: "Verifikasi Pengajuan",
      icon: <FaClipboardList />,
      color: "bg-purple-200 text-purple-700",
    },
    {
      id: 6,
      title: "Unit Akuntansi Kantor Pusat",
      desc: "Pencatatan Akuntansi",
      icon: <FaBuilding />,
      color: "bg-pink-200 text-pink-700",
    },
    {
      id: 7,
      title: "Unit Anggaran",
      desc: "Cek Budget",
      icon: <FaClipboardList />,
      color: "bg-cyan-200 text-cyan-700",
    },
    {
      id: 8,
      title: "Unit Keuangan Treasury",
      desc: "Proses Pembayaran",
      icon: <FaDollarSign />,
      color: "bg-indigo-200 text-indigo-700",
    },
  ];

  // ================= FLOW DOOR TO DOOR =================
  const stepsDoorToDoor = [
    {
      id: 1,
      title: "Pemohon",
      desc: "Unit yang Mengajukan",
      icon: <FaFileAlt />,
      color: "bg-blue-200 text-blue-700",
    },
    {
      id: 2,
      title: "Atasan Pemohon",
      desc: "Approval Pengajuan",
      icon: <FaUserAlt />,
      color: "bg-green-200 text-green-700",
    },
    {
      id: 3,
      title: "Unit SDM & Umum",
      desc: "Validasi Dokumen",
      icon: <FaClipboardCheck />,
      color: "bg-yellow-200 text-yellow-700",
    },
    {
      id: 4,
      title: "Unit Pajak",
      desc: "Validasi Pajak",
      icon: <FaCheckCircle />,
      color: "bg-orange-200 text-orange-700",
    },
    {
      id: 5,
      title: "Unit Financial Controller",
      desc: "Verifikasi Pengajuan",
      icon: <FaClipboardList />,
      color: "bg-purple-200 text-purple-700",
    },
    {
      id: 6,
      title: "Unit Akuntansi Kantor Pusat",
      desc: "Pencatatan Akuntansi",
      icon: <FaBuilding />,
      color: "bg-pink-200 text-pink-700",
    },
    {
      id: 7,
      title: "Unit Anggaran",
      desc: "Cek Budget",
      icon: <FaClipboardList />,
      color: "bg-cyan-200 text-cyan-700",
    },
    {
      id: 8,
      title: "Unit Keuangan Treasury",
      desc: "Proses Pembayaran",
      icon: <FaDollarSign />,
      color: "bg-indigo-200 text-indigo-700",
    },
  ];

  // ================= FLOW KASBON =================
  const stepsKasbon = [
    {
      id: 1,
      title: "Pemohon",
      desc: "Unit yang Mengajukan",
      icon: <FaFileAlt />,
      color: "bg-blue-200 text-blue-700",
    },
    {
      id: 2,
      title: "Atasan Pemohon",
      desc: "Approval Pengajuan",
      icon: <FaUserAlt />,
      color: "bg-green-200 text-green-700",
    },
    {
      id: 3,
      title: "Unit SDM & Umum",
      desc: "Validasi Dokumen",
      icon: <FaClipboardCheck />,
      color: "bg-yellow-200 text-yellow-700",
    },
    {
      id: 4,
      title: "Unit Financial Controller",
      desc: "Verifikasi Pengajuan",
      icon: <FaClipboardList />,
      color: "bg-purple-200 text-purple-700",
    },
    {
      id: 5,
      title: "Unit Anggaran",
      desc: "Cek Budget",
      icon: <FaClipboardList />,
      color: "bg-cyan-200 text-cyan-700",
    },
    {
      id: 6,
      title: "Approval Keuangan",
      desc: "Approval Berdasarkan Nominal",
      icon: <FaMoneyCheckAlt />,
      color: "bg-pink-200 text-pink-700",
    },
    {
      id: 7,
      title: "Unit Keuangan Treasury",
      desc: "Proses Pembayaran",
      icon: <FaDollarSign />,
      color: "bg-indigo-200 text-indigo-700",
    },
  ];

  // ================= FLOW BIAYA LISTRIK =================
  const stepsListrik = [
    {
      id: 1,
      title: "Pemohon",
      desc: "Membuat Pengajuan",
      icon: <FaFileAlt />,
      color: "bg-blue-200 text-blue-700",
    },
    {
      id: 2,
      title: "Unit SDM & Umum",
      desc: "Validasi Dokumen",
      icon: <FaClipboardCheck />,
      color: "bg-yellow-200 text-yellow-700",
    },
    {
      id: 3,
      title: "Unit Financial Controller",
      desc: "Verifikasi Pengajuan",
      icon: <FaClipboardList />,
      color: "bg-purple-200 text-purple-700",
    },
    {
      id: 4,
      title: "Unit Anggaran",
      desc: "Cek Budget",
      icon: <FaClipboardList />,
      color: "bg-cyan-200 text-cyan-700",
    },
    {
      id: 5,
      title: "Manager SDM",
      desc: "Approval SDM",
      icon: <FaUserFriends />,
      color: "bg-pink-200 text-pink-700",
    },
    {
      id: 6,
      title: "Manager Keuangan",
      desc: "Approval Keuangan",
      icon: <FaDollarSign />,
      color: "bg-indigo-200 text-indigo-700",
    },
  ];

  // ================= FLOW PENGIRIMAN =================
  const stepsPengiriman = [
    {
      id: 1,
      title: "Pemohon",
      desc: "Membuat Pengajuan",
      icon: <FaFileAlt />,
      color: "bg-blue-200 text-blue-700",
    },
    {
      id: 2,
      title: "Atasan Pemohon",
      desc: "Approval Pengajuan",
      icon: <FaUserAlt />,
      color: "bg-green-200 text-green-700",
    },
    {
      id: 3,
      title: "Unit Logistik",
      desc: "Validasi Pengiriman",
      icon: <FaTruck />,
      color: "bg-yellow-200 text-yellow-700",
    },
    {
      id: 4,
      title: "Unit Pajak",
      desc: "Validasi Pajak",
      icon: <FaCheckCircle />,
      color: "bg-orange-200 text-orange-700",
    },
    {
      id: 5,
      title: "Unit Financial Controller",
      desc: "Verifikasi",
      icon: <FaClipboardList />,
      color: "bg-purple-200 text-purple-700",
    },
    {
      id: 6,
      title: "Unit Anggaran",
      desc: "Cek Budget",
      icon: <FaClipboardList />,
      color: "bg-cyan-200 text-cyan-700",
    },
    {
      id: 7,
      title: "Manager Keuangan",
      desc: "Approval",
      icon: <FaUserFriends />,
      color: "bg-pink-200 text-pink-700",
    },
    {
      id: 8,
      title: "Direktur Keuangan",
      desc: "Approval Direktur",
      icon: <FaFlag />,
      color: "bg-red-200 text-red-700",
    },
    {
      id: 9,
      title: "Unit Keuangan Treasury",
      desc: "Pembayaran",
      icon: <FaDollarSign />,
      color: "bg-indigo-200 text-indigo-700",
    },
  ];

  // ================= FLOW OUTSOURCING =================
  const stepsOutsourcing = [
    {
      id: 1,
      title: "Pemohon",
      desc: "Membuat Pengajuan",
      icon: <FaFileAlt />,
      color: "bg-blue-200 text-blue-700",
    },
    {
      id: 2,
      title: "Atasan Pemohon",
      desc: "Approval Pengajuan",
      icon: <FaUserAlt />,
      color: "bg-green-200 text-green-700",
    },
    {
      id: 3,
      title: "Unit SDM & Umum",
      desc: "Validasi Dokumen",
      icon: <FaClipboardCheck />,
      color: "bg-yellow-200 text-yellow-700",
    },
    {
      id: 4,
      title: "Unit Pajak",
      desc: "Validasi Pajak",
      icon: <FaCheckCircle />,
      color: "bg-orange-200 text-orange-700",
    },
    {
      id: 5,
      title: "Unit Financial Controller",
      desc: "Verifikasi",
      icon: <FaClipboardList />,
      color: "bg-purple-200 text-purple-700",
    },
    {
      id: 6,
      title: "Unit Anggaran",
      desc: "Cek Budget",
      icon: <FaClipboardList />,
      color: "bg-cyan-200 text-cyan-700",
    },
    {
      id: 7,
      title: "Manager Keuangan",
      desc: "Approval",
      icon: <FaUserFriends />,
      color: "bg-pink-200 text-pink-700",
    },
    {
      id: 8,
      title: "Direktur Keuangan",
      desc: "Approval Direktur",
      icon: <FaFlag />,
      color: "bg-red-200 text-red-700",
    },
    {
      id: 9,
      title: "Unit Keuangan Treasury",
      desc: "Pembayaran",
      icon: <FaDollarSign />,
      color: "bg-indigo-200 text-indigo-700",
    },
  ];

  // ================= FLOW MEMO SDM =================
  const stepsMemo = [
    {
      id: 1,
      title: "Pemohon",
      desc: "Membuat Pengajuan",
      icon: <FaFileAlt />,
      color: "bg-blue-200 text-blue-700",
    },
    {
      id: 2,
      title: "Atasan Pemohon",
      desc: "Approval Pengajuan",
      icon: <FaUserAlt />,
      color: "bg-green-200 text-green-700",
    },
    {
      id: 3,
      title: "Unit SDM & Umum",
      desc: "Validasi Dokumen",
      icon: <FaClipboardCheck />,
      color: "bg-yellow-200 text-yellow-700",
    },
    {
      id: 4,
      title: "Unit Pajak",
      desc: "Validasi Pajak",
      icon: <FaCheckCircle />,
      color: "bg-orange-200 text-orange-700",
    },
    {
      id: 5,
      title: "Unit Financial Controller",
      desc: "Verifikasi",
      icon: <FaClipboardList />,
      color: "bg-purple-200 text-purple-700",
    },
    {
      id: 6,
      title: "Unit Anggaran",
      desc: "Cek Budget",
      icon: <FaClipboardList />,
      color: "bg-cyan-200 text-cyan-700",
    },
    {
      id: 7,
      title: "Manager Keuangan",
      desc: "Approval",
      icon: <FaUserFriends />,
      color: "bg-pink-200 text-pink-700",
    },
    {
      id: 8,
      title: "Direktur Keuangan",
      desc: "Approval Direktur",
      icon: <FaFlag />,
      color: "bg-red-200 text-red-700",
    },
    {
      id: 9,
      title: "Unit Keuangan Treasury",
      desc: "Pembayaran",
      icon: <FaDollarSign />,
      color: "bg-indigo-200 text-indigo-700",
    },
  ];

  // ================= END TO END =================
  const stepsD = [
    {
      id: 1,
      title: "Buat Ajuan",
      desc: "User mengajukan biaya & melengkapi data",
      icon: <FaFileAlt />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 2,
      title: "Verifikasi",
      desc: "Pemeriksaan kelengkapan dokumen & data",
      icon: <FaCheckCircle />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      title: "Approval",
      desc: "Persetujuan sesuai mapping",
      icon: <FaUserFriends />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 4,
      title: "Pencairan",
      desc: "Pembuatan nota Treasury",
      icon: <FaDollarSign />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 5,
      title: "Selesai",
      desc: "Dana dicairkan & pengajuan selesai",
      icon: <FaClipboardCheck />,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  const renderFlow = (data) => (
    <div className="overflow-x-auto pb-3">
      <div className="flex items-center min-w-max px-2">

        {data.map((step, index) => (
          <React.Fragment key={step.id}>

            <div className="flex flex-col items-center text-center min-w-[170px]">

              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${step.color}`}
              >
                <span>{step.id}</span>
                {step.icon}
              </div>

              <p className="mt-2 font-semibold text-sm">
                {step.title}
              </p>

              <p className="text-xs text-gray-500 px-2">
                {step.desc}
              </p>

            </div>

            {index !== data.length - 1 && (
              <div className="flex-1 mx-2 flex items-center min-w-[80px]">
                <div className="w-full min-h-[3px] rounded bg-gray-300" />
              </div>
            )}

          </React.Fragment>
        ))}

      </div>
    </div>
  );

  return (
    <div className="bg-white px-6 pt-10 h-full">

      {/* HEADER */}
      <div className="flex sm:flex-row flex-col gap-5">
        <div className="flex gap-3 w-full items-center">

          <div className="rounded-xl bg-gradient-to-tr from-blue-900 to-orange-500 p-1 w-12 h-12 flex items-center justify-center">
            <FaProjectDiagram className="text-3xl text-white" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-xl font-bold text-blue-900">
              Flow Approval
            </div>

            <div className="text-sm font-light">
              Lihat flow approval disini.
            </div>
          </div>

        </div>
      </div>

      <hr className="border-t-2 my-6" />

      {/* ================= KANTOR PUSAT ================= */}
      <div className="bg-white rounded-xl shadow shadow-green-400 p-6 border mb-5">

        <div className="flex items-center gap-3 mb-4">

          <div className="p-2 rounded-lg bg-blue-100 flex items-center justify-center">
            <FaClipboardList className="text-2xl text-blue-600" />
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              Pengajuan Biaya Kantor Pusat
            </h2>

            <p className="text-gray-500 text-sm">
              Flow approval pengajuan kantor pusat
            </p>
          </div>
        </div>

        {/* FLOW REGULER */}
        <p className="text-sm text-gray-600 mb-4">
          A. FLOW REGULER
        </p>

        {renderFlow(steps)}

        {/* FLOW DOOR TO DOOR */}
        <p className="text-sm text-gray-600 mt-8 mb-4">
          B. FLOW DOOR TO DOOR (Prioritas - Diproses lebih dulu)
        </p>

        {renderFlow(stepsDoorToDoor)}

        {/* FLOW KASBON */}
        <p className="text-sm text-gray-600 mt-8 mb-4">
          C. FLOW PENGAJUAN KASBON
        </p>

        {renderFlow(stepsKasbon)}

        {/* RULE KASBON */}
        <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-xl p-4">

          <div className="font-semibold text-yellow-700 mb-3">
            Approval Berdasarkan Nominal
          </div>

          <div className="grid md:grid-cols-3 gap-3 text-sm">

            <div className="bg-white rounded-lg border p-3">
              <div className="font-bold text-blue-900">
                Rp0 - Rp5.000.000
              </div>

              <div className="text-gray-600 mt-1">
                Asman Keuangan & Treasury
              </div>
            </div>

            <div className="bg-white rounded-lg border p-3">
              <div className="font-bold text-blue-900">
                Rp5.000.001 - Rp50.000.000
              </div>

              <div className="text-gray-600 mt-1">
                Manager Keuangan
              </div>
            </div>

            <div className="bg-white rounded-lg border p-3">
              <div className="font-bold text-blue-900">
                &gt; Rp50.000.000
              </div>

              <div className="text-gray-600 mt-1">
                Manager Keuangan & Direktur Keuangan
              </div>
            </div>

          </div>
        </div>

        {/* FLOW BIAYA LISTRIK */}
        <p className="text-sm text-gray-600 mt-8 mb-4">
          D. FLOW PENGAJUAN BIAYA LISTRIK
        </p>

        {renderFlow(stepsListrik)}

      </div>

      {/* ================= CABANG ================= */}
      <div className="bg-white rounded-xl shadow shadow-green-400 p-6 border mb-5">

        <div className="flex items-center gap-3 mb-4">

          <div className="p-2 rounded-lg bg-green-100 flex items-center justify-center">
            <FaClipboardList className="text-2xl text-green-600" />
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              Pengajuan Biaya Cabang
            </h2>

            <p className="text-gray-500 text-sm">
              Flow approval pengajuan cabang
            </p>
          </div>
        </div>

        {/* PENGIRIMAN */}
        <p className="text-sm text-gray-600 mb-4">
          A. FLOW BIAYA PENGIRIMAN
        </p>

        {renderFlow(stepsPengiriman)}

        {/* OUTSOURCING */}
        <p className="text-sm text-gray-600 mt-8 mb-4">
          B. FLOW BIAYA OUTSOURCING
        </p>

        {renderFlow(stepsOutsourcing)}

        {/* MEMO SDM */}
        <p className="text-sm text-gray-600 mt-8 mb-4">
          C. FLOW BIAYA MEMO SDM
        </p>

        {renderFlow(stepsMemo)}

      </div>

      {/* ================= END TO END ================= */}
      <div className="bg-white rounded-xl shadow shadow-green-400 p-6 border mb-5">

        <div className="mb-6">
          <h2 className="text-xl font-bold">
            Proses End-to-End (Berlaku untuk Semua Jenis Pengajuan)
          </h2>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-blue-200">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

            {stepsD.map((step, index) => (
              <div
                key={step.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition relative items-center text-center flex flex-col"
              >

                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full mb-3 text-xl ${step.color}`}
                >
                  {step.icon}
                </div>

                <h3 className="font-bold text-sm mb-1">
                  {step.id}. {step.title}
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed">
                  {step.desc}
                </p>

                {index !== stepsD.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-[-10px] w-5 border-t-2 border-dashed border-gray-300"></div>
                )}

              </div>
            ))}

          </div>
        </div>
      </div>

    </div>
  );
};

export default FlowApproval;