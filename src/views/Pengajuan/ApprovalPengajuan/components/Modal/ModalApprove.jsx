import React from 'react'
// import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import { Modal } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux';
import { IoCalendarOutline, IoCheckmarkCircleSharp, IoCloseCircleSharp, IoPerson } from 'react-icons/io5';
import { CgNotes } from "react-icons/cg";
import BgModal from 'assets/BgModal.svg';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
import { setToggleModal } from '../../../../../redux/n2n/global';
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHashtag, FaListAlt, FaMoneyBillWave, FaTimesCircle, FaUser, FaUserTag } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { formatCurrency } from 'global/helper/formatCurrency';

const ModalApprove = (onClick) => {
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
      title="Setujui Pengajuan"
      iconTitle={<IoCheckmarkCircleSharp className='text-green-500 text-3xl' />}
      modal={"modalApprove"}
      size={"w-11/12 max-w-3xl"}
      // size={"w-11/12 max-w-5xl"}
      scroll={false}
      buttonFooter={
        <>
          <div className="flex justify-end gap-2">
            <button
              // onClick={onClose}
              className="btn px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-200"
            >
              Batal
            </button>

            <button
              // onClick={() => onSubmit(note)}
              // disabled={!isApprove && !note}
              className={`btn px-4 py-2 rounded-full text-white flex items-center gap-2 ${"bg-green-500 hover:bg-green-600 disabled:bg-green-300"
                }`}
            >
              <>
                <FaCheckCircle /> Ya, Setujui
              </>
            </button>
          </div>
        </>
      }
    >
      <div>
        {/* INFO */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-0 text-xs">

            {[
              {
                label: "No Pengajuan",
                value: "PJ-2025-00045",
                icon: <FaHashtag />,
              },
              {
                label: "Nama Pemohon",
                value: "Budi Santoso",
                icon: <FaUser />,
              },
              {
                label: "Nominal Pengajuan",
                value: formatCurrency(20000000),
                icon: <FaMoneyBillWave />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-xl shadow-md border border-green-200 hover:shadow-lg shadow-green-200 transition bg-gray-50"
              >
                {/* Icon */}
                <div className="min-w-8 min-h-8 flex items-center justify-center rounded-xl bg-blue-100 text-blue-900 text-lg shadow-sm">
                  {item.icon}
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-medium">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}

            {/* DESKRIPSI FULL WIDTH */}
            <div className="col-span-1 md:col-span-3 flex items-start gap-4 p-3 rounded-xl shadow-md shadow-green-200 border border-green-200 bg-gray-50">
              {/* Icon */}
              <div className="min-w-8 min-h-8 flex items-center justify-center rounded-xl bg-blue-100 text-blue-900 text-lg shadow-sm">
                <FaFileAlt />
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 font-medium">
                  Deskripsi
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  Pengajuan dana kasbon untuk kebutuhan operasional kantor selama
                  bulan berjalan, termasuk biaya transportasi dan konsumsi tim.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* LAMPIRAN */}
        <div className="mt-5">
          <label className="text-md font-medium">
            Lampiran
          </label>

          <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {[
              { name: "Invoice.pdf", size: "1.2 MB" },
              { name: "Foto_Bukti.jpg", size: "800 KB" },
              { name: "Nota_Transport.png", size: "500 KB" },
              { name: "Dokumen_Lain.docx", size: "300 KB" },
            ].map((file, index) => (
              <div
                key={index}
                className="min-w-[180px] flex items-center gap-3 p-3 rounded-xl border border-blue-200 bg-white shadow-sm hover:shadow-md transition"
              >
                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <FaFileAlt />
                </div>

                {/* Info */}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800 truncate max-w-[100px]">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {file.size}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* INPUT */}
        <div className="mb-4 mt-5">
          <label className="text-md font-medium">
            {"Catatan Persetujuan (Optionals)"}
          </label>

          <textarea
            // value={note}
            // onChange={(e) => setNote(e.target.value)}
            placeholder={
              "Tulis Catatan Persetujuan..."
            }
            className={`w-full mt-2 p-3 border rounded-lg outline-none focus:ring-2 text-sm ${"focus:ring-green-400 border-green-300"
              }`}
            maxLength={500}
          />

          <div className="text-right text-xs text-gray-400">
            {/* {note.length}/500 */}
          </div>
        </div>

        {/* WARNING REJECT */}
        {/* {!isApprove && ( */}

        {/* )} */}

        {/* ACTION */}
      </div>
    </Modal>
  )
}

const modalStyle = {
  backgroundImage: `url(${BgModal})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

export default ModalApprove