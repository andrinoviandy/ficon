import React, {
  useEffect,
  useState,
} from "react";

import {
  FaChartBar,
} from "react-icons/fa";

import {
  useSelector,
} from "react-redux";

import {
  decodeData,
} from "global/helper/jwt";

import {
  getCookies,
} from "global/helper/cookie";

import TableLaporan from "./components/TableLaporan";


// =====================================================
// COMPONENT
// =====================================================

const Laporan = () => {

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

    const get = async () => {

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

            <FaChartBar />

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
              Laporan
            </h1>

            <p
              className="
                text-xs
                text-gray-400
              "
            >
              Laporan dan monitoring aktivitas faktur
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
      {/* TABLE / REPORT */}
      {/* ================================================= */}

      <TableLaporan
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


export default Laporan;