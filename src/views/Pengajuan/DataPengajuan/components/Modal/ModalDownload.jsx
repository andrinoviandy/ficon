import React, { useEffect, useState } from 'react'
// import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import { AsyncSelect, Modal, Select } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux';
import { IoCalendarOutline, IoCheckmarkCircleSharp, IoCloseCircleSharp, IoPerson } from 'react-icons/io5';
import { CgNotes } from "react-icons/cg";
import BgModal from 'assets/BgModal.svg';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
import { setToggleModal } from '../../../../../redux/n2n/global';
import { FaBalanceScale, FaBriefcase, FaBuilding, FaCalendar, FaCheckCircle, FaCommentDots, FaEye, FaFileAlt, FaFileExcel, FaFileImage, FaFileInvoiceDollar, FaFilePdf, FaFileUpload, FaFileWord, FaHashtag, FaListAlt, FaMoneyBillWave, FaPercent, FaRegFileAlt, FaTag, FaTags, FaTimesCircle, FaUser, FaUserAlt, FaUserTag } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { formatCurrency } from 'global/helper/formatCurrency';
import { HiOutlineTicket } from 'react-icons/hi';
import CurrencyInput from 'components/atoms/CurrencyInput';
import { formatDate } from 'global/helper/formatDate';

const ModalDownload = ({ iframeLoading, setIframeLoading }) => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);
  const [data, setData] = useState([])

  return (
    <Modal
      title="Download Dokumen Pengajuan"
      // iconTitle={<IoCheckmarkCircleSharp className='text-green-500 text-3xl' />}
      modal={"modalDownload"}
      size={"w-11/12 max-w-5xl"}
      // size={"w-11/12 max-w-5xl"}
      scroll={false}
    >
      <div className={`relative w-full ${toggleModal?.url_download && iframeLoading === false ? 'lg:h-[770px] sm:h-[300px]' : 'h-100px'} overflow-hidden rounded-xl bg-white`}>

        {/* LOADING OVERLAY */}
        {iframeLoading && toggleModal?.url_download && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white">

            {/* Spinner */}
            <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"></div>

            <div className="mt-4 text-sm font-semibold text-gray-600">
              Loading Data...
            </div>
          </div>
        )}

        {/* IFRAME */}
        {toggleModal?.url_download ? (
          <iframe
            src={toggleModal?.url_download}
            title="Dokumen Pengajuan"
            className={`w-full h-full bg-white transition-opacity duration-300 ${iframeLoading ? "opacity-0" : "opacity-100"
              }`}
            style={{
              border: "none",
              overflow: "hidden",
            }}
            scrolling="no"
            allowFullScreen
            onLoad={() => setIframeLoading(false)}
          />
        ) : (
          <div className='text-gray-400 my-4 text-center'>Gagal Memuat Data Pengajuan</div>
        )}
      </div>
    </Modal>
  )
}

export default ModalDownload