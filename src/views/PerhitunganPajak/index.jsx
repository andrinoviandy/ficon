import React, { useEffect, useState } from "react";
import {
  FaCalculator,
} from "react-icons/fa";

import { useSelector } from "react-redux";
import TableListPerhitunganPajak from "./components/TablePerhitunganPajak";
import { decodeData } from "global/helper/jwt";
import { getCookies } from "global/helper/cookie";
import { useLocation, useNavigate } from "react-router-dom";

// ==========================
// STATUS STYLE
// ==========================
const statusBadge = (status) => {
  switch (status) {
    case "Sudah Dihitung":
      return "bg-gradient-to-r from-green-500 to-emerald-600 ring-green-200";

    case "Belum Dihitung":
      return "bg-gradient-to-r from-orange-400 to-amber-500 ring-orange-200";

    default:
      return "bg-gradient-to-r from-gray-400 to-gray-500 ring-gray-200";
  }
};

const PerhitunganPajak = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const { dimensionScreenW, check } = useSelector((state) => state.global);
  const menu = location.state?.menu;
  const [loginAccess, setLoginAccess] = useState()

  useEffect(() => {
    const get = async () => {
      const decoded = await decodeData(getCookies('accountAccess'))
      setLoginAccess(decoded)
    }
    get()
  }, [])

  return (
    <>
      <div className="bg-white px-6 pt-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-900 to-orange-500 flex items-center justify-center">
              <FaCalculator className="text-white text-2xl" />
            </div>

            <div>

              <h1 className="text-xl font-bold text-blue-900">
                Perhitungan Pajak
              </h1>

              <p className="text-sm text-gray-500">
                Data pengajuan perhitungan pajak
              </p>

            </div>

          </div>

        </div>

        <hr className="mb-6" />

        <TableListPerhitunganPajak check={check} dimensionScreenW={dimensionScreenW} loginAccess={loginAccess} />

      </div>
    </>
  );
};

export default PerhitunganPajak;