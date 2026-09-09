import React from 'react'
// import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import { Modal } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux';
import { IoCalendarOutline, IoCheckmarkCircleSharp, IoCloseCircleSharp, IoInformationCircleOutline, IoPerson } from 'react-icons/io5';
import { CgNotes } from "react-icons/cg";
import BgModal from 'assets/BgModal.svg';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
import { setToggleModal } from '../../../../../redux/n2n/global';
import { FaBuilding, FaCalendarAlt, FaCheckCircle, FaFileAlt, FaHashtag, FaListAlt, FaMoneyBillWave, FaMoneyCheckAlt, FaTimesCircle, FaUser, FaUserTag } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { formatCurrency } from 'global/helper/formatCurrency';
import { QRCodeCanvas } from 'qrcode.react';

const ModalAfterApprove = () => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);

  const handleRefresh = async () => {
    swal.loading()
    const res = await storeSchema.actions.getLogActivity(toggleModal?.dataX?.PROJECT_ID);
    if (res?.status) {
      swal.close();
      dispatch(setToggleModal({ isOpen: true, modal: "logActivity", dataX: res?.data }));
    } else {
      swal.error(res?.message);
    }
  }

  return (
    <Modal
      title="Pengajuan Berhasil Disetujui"
      iconTitle={<IoCheckmarkCircleSharp className='text-green-500 text-3xl' />}
      modal={"modalAfterApprove"}
      // size={"w-11/12 max-w-3xl"}
      size={"w-11/12 max-w-5xl"}
      scroll={false}
    // buttonFooter={
    //   null
    // }
    >
      <div>
        {/* INFO */}
        {/* CONTENT */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* LEFT */}
          <div className="relative p-4 bg-gray-50 rounded-xl border shadow-sm overflow-hidden">

            {/* BACKGROUND CHECK */}
            <FaCheckCircle className="absolute -top-8 -right-8 text-green-500 text-[160px] opacity-10 pointer-events-none" />

            <div className="flex">
              <div className="flex-1 text-xs">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  {[
                    {
                      label: "No. Pengajuan",
                      value: "PJ-2025-00045",
                      icon: <FaHashtag />,
                      color: "bg-blue-100 text-blue-600",
                    },
                    {
                      label: "Jenis Pengajuan",
                      value: "Kasbon",
                      icon: <FaListAlt />,
                      color: "bg-indigo-100 text-indigo-600",
                    },
                    {
                      label: "Tanggal Pengajuan",
                      value: "16 Mei 2025 10:30",
                      icon: <FaCalendarAlt />,
                      color: "bg-yellow-100 text-yellow-600",
                    },
                    {
                      label: "Metode Pembayaran",
                      value: "Transfer Bank",
                      icon: <FaMoneyCheckAlt />,
                      color: "bg-green-100 text-green-600",
                    },
                    {
                      label: "Nama Pemohon",
                      value: "Budi Santoso",
                      icon: <FaUser />,
                      color: "bg-purple-100 text-purple-600",
                    },
                    {
                      label: "Jabatan",
                      value: "Assistant Manager",
                      icon: <FaUserTag />,
                      color: "bg-pink-100 text-pink-600",
                    },
                    {
                      label: "Profit Center",
                      value: "Jakarta Pusat",
                      icon: <FaBuilding />,
                      color: "bg-orange-100 text-orange-600",
                    },
                    {
                      label: "Tanggal Disetujui",
                      value: "16 Mei 2025 14:25",
                      icon: <FaCheckCircle />,
                      color: "bg-green-100 text-green-600",
                    },
                    {
                      label: "Disetujui Oleh",
                      value: (
                        <>
                          Andi Wijaya <br />
                          <span className="text-gray-400 text-xs">
                            (Manager Keuangan)
                          </span>
                        </>
                      ),
                      icon: <FaCheckCircle />,
                      color: "bg-emerald-100 text-emerald-600",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2 rounded-xl border bg-white hover:shadow-md transition"
                    >
                      {/* ICON */}
                      <div className={`p-1 rounded-lg ${item.color} text-md`}>
                        {item.icon}
                      </div>

                      {/* TEXT */}
                      <div>
                        <p className="text-xs text-gray-500">{item.label}</p>
                        <p className="text-xs font-semibold text-gray-800">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>

                {/* INFO BOX */}
                <div className="mt-5 flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-xs text-blue-700">
                  <IoInformationCircleOutline className="text-lg" />
                  Dokumen ini merupakan bukti persetujuan pengajuan. Silakan simpan atau unduh untuk keperluan arsip.
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT (QR) */}
          <div className="w-full md:w-64 border rounded-xl p-4 flex flex-col items-center justify-center shadow-md shadow-gray-400">
            <p className="text-sm font-semibold mb-2">QR Validasi</p>

            <QRCodeCanvas
              value="PJ-2025-00045|Budi Santoso|20000000"
              size={120}
            />

            <p className="text-xs text-gray-500 mt-2 text-center">
              Scan untuk validasi approval
            </p>

            <p className="text-xs mt-3 font-semibold text-blue-600">
              REF-PJ-2025-00045
            </p>
          </div>

        </div>
      </div>
    </Modal>
  )
}

const modalStyle = {
  backgroundImage: `url(${BgModal})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

export default ModalAfterApprove