import React, {
  useEffect,
  useState,
} from "react";

import {
  FaUsers,
  FaPlusCircle,
} from "react-icons/fa";

import {
  useSelector,
} from "react-redux";

import {
  useLocation,
} from "react-router-dom";

import {
  decodeData,
} from "global/helper/jwt";

import {
  getCookies,
} from "global/helper/cookie";

import TableMasterPelanggan
  from "./components/TableMasterPelanggan";


// =====================================================
// COMPONENT
// =====================================================

const MasterPelanggan = () => {

  const location =
    useLocation();

  const {
    dimensionScreenW,
    check,
  } = useSelector(
    (state) => state.global
  );


  const [
    loginAccess,
    setLoginAccess,
  ] = useState();


  // ===================================================
  // LOGIN ACCESS
  // ===================================================

  useEffect(() => {

    const get =
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

    get();

  }, []);


  // ===================================================
  // RENDER
  // ===================================================

  return (

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
          lg:flex-row
          flex-col
          justify-between
          gap-5
        "
      >

        {/* TITLE */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-blue-100
              flex
              items-center
              justify-center
              text-primary
              shadow-md
            "
          >

            <FaUsers />

          </div>


          <div
            className="
              flex
              flex-col
              gap-0
            "
          >

            <h1
              className="
                text-xl
                font-bold
                text-gray-800
              "
            >
              Master Pelanggan
            </h1>

            <p
              className="
                text-xs
                text-gray-400
              "
            >
              Kelola data pelanggan dan customer
            </p>

          </div>

        </div>


        {/* ACTION */}

        <div
          className="
            flex
            justify-end
          "
        >

          <button
            type="button"
            className="
              btn
              bg-primary
              text-white
              rounded-full
              px-5
              hover:opacity-90
              gap-2
              shadow-md
            "
          >

            <FaPlusCircle />

            Tambah Pelanggan

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

      <TableMasterPelanggan
        check={
          check
        }
        dimensionScreenW={
          dimensionScreenW
        }
        loginAccess={
          loginAccess
        }
      />

    </div>

  );

};


export default MasterPelanggan;