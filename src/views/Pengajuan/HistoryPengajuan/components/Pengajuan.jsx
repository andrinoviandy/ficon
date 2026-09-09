import { formatDate } from 'global/helper/formatDate';
import React, { useMemo } from 'react'
import { FaBuilding, FaTag } from 'react-icons/fa';
import {
  IoRibbonSharp,
  IoCalendarOutline,
  IoPersonOutline,
  IoBriefcaseOutline
} from "react-icons/io5";

// =======================
// STATUS BADGE
// =======================
const statusBadge = (status) => {
  switch (status) {
    case "S1":
      return "bg-gradient-to-r from-green-500 to-emerald-600 ring-green-200";

    case "S2":
      return "bg-gradient-to-r from-green-500 to-emerald-600 ring-green-200";

    case "T":
      return "bg-gradient-to-r from-red-500 to-rose-600 ring-red-200";

    case "P":
      return "bg-gradient-to-r from-yellow-400 to-orange-500 ring-yellow-200";

    default:
      return "bg-gradient-to-r from-blue-500 to-indigo-600 ring-blue-200";
  }
};

// =======================
// COMPONENT
// =======================
const Pengajuan = ({
  data, totalData, handleClick, pengajuanId
}) => {

  return (
    <div className="max-h-[660px] overflow-y-auto">

      {data?.map((item, index) => {
        const isActive = pengajuanId === item.pengajuan_id;

        return (
          <div key={index} className="mb-0">
            <div
              onClick={(e) => handleClick(e, item?.pengajuan_id)}
              className={`
                relative flex overflow-hidden border
                transition-all duration-200 cursor-pointer
                hover:shadow-md hover:border-blue-300
              `}
            >
              {/* Active Bar */}
              <div
                className={`w-1.5 ${isActive ? "bg-blue-900" : "bg-transparent"
                  }`}
              />

              {/* Content */}
              <div className="relative w-full p-4">

                {/* STATUS AREA */}
                <div className="absolute top-3 right-3 flex flex-col items-end gap-1">

                  {/* Unit Badge */}
                  <span
                    className="
                      inline-flex items-center gap-2
                      rounded-full
                      bg-blue-100
                      text-slate-700
                      px-3 py-1
                      text-xs font-medium
                      shadow-sm
                    "
                  >
                    <FaBuilding />
                    {item?.status_unit}
                  </span>

                  {/* Status Badge */}
                  <span
                    className={`
                      inline-flex items-center gap-2
                      rounded-full
                      px-3 py-1
                      text-xs font-semibold
                      text-white
                      shadow-sm
                      ${statusBadge(item?.kd_status)}
                    `}
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />

                    {item?.status_kegiatan}

                    <span
                      className="
                        bg-white
                        text-gray-800
                        rounded-full
                        px-2 py-0.5
                        text-[10px]
                        font-medium
                      "
                    >
                      {item?.status_pengajuan ?? "Proses"}
                    </span>
                  </span>
                </div>

                {/* HEADER */}
                <div className="flex items-center gap-3 pr-52">

                  {/* Icon */}
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-900 shadow">
                    <IoRibbonSharp className="text-white text-lg" />
                  </div>

                  {/* Info */}
                  {/* <div>
                    <p className="text-xs text-gray-500">
                      {item.no_pengajuan}
                    </p>

                    <h3 className="font-semibold text-gray-800">
                      {item.nama_pemohon || "-"}
                    </h3>
                  </div> */}
                </div>

                {/* FOOTER */}
                <div className="mt-5 flex flex-wrap gap-3 text-xs text-gray-500">
                  <div className='flex flex-wrap w-full justify-between gap-3'>
                    <div className="flex items-center gap-1">
                      <FaTag className="text-gray-400" />
                      <span>{item.no_pengajuan}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoPersonOutline className="text-gray-400" />
                      <span>{item.nama_pemohon || "-"}</span>
                    </div>
                  </div>
                  <div className='flex flex-wrap w-full justify-between gap-3'>
                    <div className="flex items-center gap-1">
                      <IoBriefcaseOutline className="text-gray-400" />
                      <span>{item.jenis_biaya}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoCalendarOutline className="text-gray-400" />
                      <span>{formatDate(item?.created_at)}</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default Pengajuan;