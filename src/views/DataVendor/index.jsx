import React, { useMemo, useState, useEffect } from "react";

import {
  FaPercent,
  FaInfoCircle,
  FaPlusCircle,
  FaDatabase,
  FaStore,
} from "react-icons/fa";

import { IoIosArrowDown } from "react-icons/io";

import {
  IoFilterOutline,
  IoSearch,
} from "react-icons/io5";

import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { setToggleModal } from '../../redux/n2n/global';
import ModalUpload from "./components/Modal/ModalUpload";
import { decodeData } from "global/helper/jwt";
import { getCookies } from "global/helper/cookie";
import TableVendor from "./components/TableVendor";

// =========================
// COMPONENT
// =========================
const DataVendor = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate();
  const location = useLocation();

  const { dimensionScreenW, check, toggleModal } = useSelector((state) => state.global);
  const menu = location.state?.menu;
  const [loginAccess, setLoginAccess] = useState()

  useEffect(() => {
    const get = async () => {
      const decoded = await decodeData(getCookies('accountAccess'))
      setLoginAccess(decoded)
    }
    get()
  }, [])

  const handleUpload = async (e) => {
    e.preventDefault();
    dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "modalUpload" }));
  };

  return (
    <>
      <ModalUpload />
      <div className="bg-white px-6 pt-10 pb-5">

        {/* =========================
          HEADER
      ========================= */}
        <div className="flex lg:flex-row flex-col justify-between gap-5">

          <div className="flex w-full items-center gap-3">

            <div
              className="
              w-12
              h-12
              rounded-xl
              bg-gradient-to-tr
              from-blue-900
              to-orange-500
              flex
              items-center
              justify-center
            "
            >

              <FaStore className="text-white text-2xl" />

            </div>

            <div>

              <h1 className="text-xl font-bold text-blue-900">
                Master Data Vendor
              </h1>

              <p className="text-sm text-gray-500">
                Lihat data vendor disini
              </p>

            </div>

          </div>

          <div className="flex sm:w-full justify-end gap-3">
            <button className='btn bg-blue-900 text-white rounded-[25px] px-5 hover:scale-105' onClick={handleUpload}><FaPlusCircle className='' /> Upload Data (.xlsx)</button>
            <button
              className="
              btn
              bg-blue-900
              text-white
              rounded-full
              hover:scale-105
              gap-0
            "
              onClick={() =>
                navigation("/add-vendor", {
                  state: {
                    ...location.state,
                    project: "Add Vendor",
                  },
                })
              }
            >

              <FaPlusCircle className="mr-2" />

              Tambah Vendor

            </button>

          </div>

        </div>

        <hr className="my-5" />
        <TableVendor
          check={check} dimensionScreenW={dimensionScreenW} loginAccess={loginAccess}
        />

      </div>
    </>
  );
};

export default DataVendor;