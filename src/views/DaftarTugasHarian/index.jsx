import React, { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaCalendarDay,
  FaTruck,
} from "react-icons/fa";

import { useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { decodeData } from "global/helper/jwt";
import { getCookies } from "global/helper/cookie";

import TableDaftarTugasHarian from "./components/TableDaftarTugasHarian";

const DaftarTugasHarian = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const {
    dimensionScreenW,
    check,
  } = useSelector((state) => state.global);

  const [loginAccess, setLoginAccess] = useState();

  useEffect(() => {
    const get = async () => {
      const decoded = await decodeData(
        getCookies("accountAccess")
      );

      setLoginAccess(decoded);
    };

    get();
  }, []);

  return (
    <div className="bg-white px-6 pt-8 pb-5 min-h-full">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex lg:flex-row flex-col justify-between gap-5">

        <div className='flex flex-row gap-2 items-center'>
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-md">
            <FaClipboardList />
          </div>
          <div className="flex flex-col gap-0">

            <h1 className="text-xl font-bold text-gray-800">
              Daftar Tugas Harian
            </h1>

            <p className="text-xs text-gray-400">
              Daftar faktur yang harus Anda antar hari ini
            </p>

          </div>

        </div>

        {/* DATE */}
        <div
          className="
            flex
            items-center
            gap-3
            px-4
            py-2
            rounded-xl
            bg-blue-50
            border
            border-blue-100
            text-blue-900
          "
        >
          <FaCalendarDay />

          <div>
            <p className="text-xs text-gray-500">
              Tanggal
            </p>

            <p className="text-sm font-semibold">
              {new Date().toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

        </div>

      </div>

      <hr className="my-5" />

      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <TableDaftarTugasHarian
        check={check}
        dimensionScreenW={dimensionScreenW}
        loginAccess={loginAccess}
      />

    </div>
  );
};

export default DaftarTugasHarian;