import { HiOutlinePencilAlt, HiOutlineEye, HiCheck } from "react-icons/hi";
// import storeSchema from 'global/store'
// import { swal } from 'global/helper/swal';
import { setToggleModal } from '../../../redux/n2n/global'
import React, { useEffect, useState } from 'react'
// import * as XLSX from 'xlsx-js-style';
import { FaCalculator, FaCogs, FaDownload, FaEllipsisV, FaReceipt, FaTimes } from 'react-icons/fa';
import { RiVerifiedBadgeLine } from 'react-icons/ri';
import { useRef } from "react";

const ActionButton = ({ location, navigation, loginAccess, isApprovalPengajuan, setDropdownOpen, dispatch, v, iframeLoading, setIframeLoading }) => {
  const pdfRef = useRef();

  const handleDropdownClick = () => {
    setDropdownOpen(true);
  }

  const handleHitungPajak = () => {
    dispatch(
      setToggleModal({
        isOpen: true,
        modal: "modalHitungPajak",
        pengajuan_id: v?.pengajuan_id
      })
    );
  };

  return (
    <>
      <div className="dropdown dropdown-right" onClick={() => { handleDropdownClick() }}>

        <div tabIndex={0} role="button">

          <div className="btn btn-sm rounded-full bg-white shadow hover:bg-gray-100">

            <FaEllipsisV className="text-primary" />

          </div>

        </div>

        <div
          tabIndex={0}
          className="menu menu-md dropdown-content mt-3 z-[1] p-5 border shadow bg-white rounded-box w-64"
        >

          <p className="text-md font-bold">
            Action
          </p>

          <hr className="my-2" />

          <ul>
            <li>
              <div
                className="pl-0"
                onClick={handleHitungPajak}
              >
                <FaCalculator className="text-xl" />
                Hitung Pajak
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ActionButton