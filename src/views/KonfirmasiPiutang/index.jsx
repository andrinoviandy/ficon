import React, {
  useEffect,
  useState,
} from "react";

import {
  FaFileInvoiceDollar,
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

import TableListKonfirmasiPiutang
  from "./components/TableListKonfirmasiPiutang";


// =====================================================
// COMPONENT
// =====================================================

const KonfirmasiPiutang = () => {

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
  // GET LOGIN ACCESS
  // ===================================================

  useEffect(() => {

    const getLoginAccess =
      async () => {

        try {

          const decoded =
            await decodeData(
              getCookies(
                "accountAccess"
              )
            );

          setLoginAccess(
            decoded
          );

        } catch (error) {

          console.error(
            "Gagal mendapatkan login access:",
            error
          );

        }

      };


    getLoginAccess();

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
            flex-row
            gap-3
            items-center
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

            <FaFileInvoiceDollar />

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
              Kirim Konfirmasi Piutang
            </h1>


            <p
              className="
                text-xs
                text-gray-400
              "
            >
              Konfirmasi faktur kepada customer sebagai dasar pencatatan piutang.
            </p>

          </div>

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

      <TableListKonfirmasiPiutang
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


export default KonfirmasiPiutang;