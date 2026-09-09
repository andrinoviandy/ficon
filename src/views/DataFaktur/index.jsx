import React, {
  useEffect,
  useState,
} from "react";

import {
  FaFileInvoiceDollar,
  FaPlusCircle,
  FaCloudUploadAlt,
} from "react-icons/fa";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  setToggleModal,
} from "../../redux/n2n/global";

import {
  decodeData,
} from "global/helper/jwt";

import {
  getCookies,
} from "global/helper/cookie";

import TableMasterFaktur
  from "./components/TableMasterFaktur";

import ModalUploadFaktur
  from "./components/Modal/ModalUploadFaktur";


// =====================================================
// COMPONENT
// =====================================================

const MasterFaktur = () => {

  const dispatch = useDispatch();

  const navigation = useNavigate();

  const location = useLocation();

  const {
    toggleModal,
    dimensionScreenW,
    check,
  } = useSelector(
    (state) => state.global
  );


  const [
    loginAccess,
    setLoginAccess,
  ] = useState();


  const [
    reloadData,
    setReloadData,
  ] = useState(false);


  // ===================================================
  // LOGIN ACCESS
  // ===================================================

  useEffect(() => {

    const getLoginAccess =
      async () => {

        const decoded =
          await decodeData(
            getCookies(
              "accountAccess"
            )
          );

        setLoginAccess(
          decoded
        );

      };

    getLoginAccess();

  }, []);


  // ===================================================
  // UPLOAD
  // ===================================================

  const handleUpload = (e) => {
    e.preventDefault();

    dispatch(
      setToggleModal({
        isOpen: true,
        modal: "modalUploadFaktur",
      })
    );
  };


  // ===================================================
  // ADD MANUAL
  // ===================================================

  const handleAddFaktur = () => {

    navigation(
      "/add-faktur",
      {
        state: {
          ...location.state,
          project:
            "Tambah Faktur",
        },
      }
    );

  };


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <>

      {/* ================================================= */}
      {/* UPLOAD MODAL */}
      {/* ================================================= */}

      <ModalUploadFaktur
        reloadData={
          reloadData
        }
        setReloadData={
          setReloadData
        }
      />


      {/* ================================================= */}
      {/* PAGE */}
      {/* ================================================= */}

      <div
        className="
          bg-white
          px-6
          pt-10
          pb-5
          min-h-full
        "
      >

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            justify-between
            gap-5
          "
        >

          {/* TITLE */}

          <div className='flex flex-row gap-2 items-center'>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-md">
              <FaFileInvoiceDollar />
            </div>
            <div className="flex flex-col gap-0">

              <h1 className="text-xl font-bold text-gray-800">
                Data Penjualan
              </h1>

              <p className="text-xs text-gray-400">
                Kelola Data Penjualan disini
              </p>

            </div>

          </div>


          {/* ACTION */}

          <div
            className="
              flex
              flex-wrap
              justify-end
              gap-3
            "
          >

            {/* UPLOAD */}

            <button
              type="button"
              onClick={
                handleUpload
              }
              className="
                btn
                rounded-full
                bg-white
                border
                border-primary
                text-primary
                hover:bg-blue-50
                px-5
                gap-2
              "
            >

              <FaCloudUploadAlt />

              Upload Penjualan

            </button>


            {/* TAMBAH */}

            <button
              type="button"
              onClick={
                handleAddFaktur
              }
              className="
                btn
                rounded-full
                bg-primary
                text-white
                hover:opacity-90
                px-5
                gap-2
                shadow-md
              "
            >

              <FaPlusCircle />

              Tambah Penjualan

            </button>

          </div>

        </div>


        {/* ================================================= */}
        {/* DIVIDER */}
        {/* ================================================= */}

        <hr
          className="
            my-5
          "
        />


        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        <TableMasterFaktur
          navigation={
            navigation
          }
          location={
            location
          }
          dimensionScreenW={
            dimensionScreenW
          }
          check={
            check
          }
          loginAccess={
            loginAccess
          }
          reloadData={
            reloadData
          }
          setReloadData={
            setReloadData
          }
        />

      </div>

    </>

  );

};


export default MasterFaktur;