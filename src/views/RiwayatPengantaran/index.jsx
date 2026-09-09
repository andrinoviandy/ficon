import React, { useEffect, useState } from "react";

import {
  FaTruck,
} from "react-icons/fa";

import {
  useSelector,
} from "react-redux";

import {
  useLocation,
} from "react-router-dom";

import { decodeData } from "global/helper/jwt";
import { getCookies } from "global/helper/cookie";

import TableRiwayatPengantaran from "./components/TableRiwayatPengantaran";


// =========================
// COMPONENT
// =========================

const RiwayatPengantaran = () => {

  const location = useLocation();

  const {
    dimensionScreenW,
    check,
  } = useSelector(
    (state) => state.global
  );

  const menu = location.state?.menu;

  const [loginAccess, setLoginAccess] =
    useState();


  // =========================
  // GET LOGIN ACCESS
  // =========================

  useEffect(() => {

    const get = async () => {

      const decoded =
        await decodeData(
          getCookies("accountAccess")
        );

      setLoginAccess(decoded);

    };

    get();

  }, []);


  return (

    <div className="bg-white px-6 pt-10 pb-5 min-h-full">

      {/* =========================
          HEADER
      ========================= */}

      <div
        className="
          flex
          lg:flex-row
          flex-col
          justify-between
          gap-5
        "
      >

        {/* =========================
            TITLE
        ========================= */}

        <div className='flex flex-row gap-2 items-center'>
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-md">
            <FaTruck />
          </div>
          <div className="flex flex-col gap-0">

            <h1 className="text-xl font-bold text-gray-800">
              Riwayat Pengantaran
            </h1>

            <p className="text-xs text-gray-400">
              Lihat riwayat pengantaran faktur disini
            </p>

          </div>

        </div>

      </div>


      {/* =========================
          DIVIDER
      ========================= */}

      <hr className="my-5" />


      {/* =========================
          TABLE
      ========================= */}

      <TableRiwayatPengantaran
        check={check}
        dimensionScreenW={dimensionScreenW}
        loginAccess={loginAccess}
      />

    </div>

  );

};

export default RiwayatPengantaran;