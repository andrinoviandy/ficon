import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  FaEllipsisV,
  FaFileAlt,
  FaCalendarAlt,
  FaUser,
  FaBuilding,
  FaMoneyBillWave,
  FaTags,
  FaInfoCircle,
} from "react-icons/fa";
import { HiCheck, HiOutlineEye, HiOutlinePencilAlt } from "react-icons/hi";
import { formatDate } from "global/helper/formatDate";
import { FaCircleXmark, FaFileCircleXmark } from "react-icons/fa6";
import { HiOutlineXMark } from "react-icons/hi2";
import { setToggleModal } from "../../../../redux/n2n/global";
import { useDispatch } from "react-redux";

// ==========================
// DUMMY DATA
// ==========================
const dummyTableData = {
  total_data: 10,
  list_data: Array.from({ length: 10 }).map((_, i) => ({
    ROW_NUMBER: i + 1,
    NO_PENGAJUAN: `PJ-2026-${String(i + 1).padStart(3, "0")}`,
    TANGGAL: "2026-05-02",
    PEMOHON: ["Budi Santoso", "Rina Oktaviani", "Dewi Lestari", "Agus Pratama", "Siti Aisyah"][i % 5],
    CABANG: ["Jakarta", "Bandung", "Surabaya", "Medan"][i % 4],
    JENIS_BIAYA: ["Transport", "ATK", "Operasional", "Konsumsi"][i % 4],
    JUMLAH: 150000 * (i + 1),
    STATUS: ["Diajukan", "Approved", "Rejected", "Pending"][i % 4],
  })),
};

// ==========================
// STATUS STYLE
// ==========================
const statusBadge = (status) => {
  switch (status) {
    case "Approved":
      return "bg-gradient-to-r from-green-500 to-emerald-600 ring-green-200";
    case "Rejected":
      return "bg-gradient-to-r from-red-500 to-rose-600 ring-red-200";
    case "Pending":
      return "bg-gradient-to-r from-yellow-400 to-orange-500 ring-yellow-200";
    default:
      return "bg-gradient-to-r from-blue-500 to-indigo-600 ring-blue-200";
  }
};

const TableListProject = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  // ==========================
  // HEADER + ICON (FA ONLY)
  // ==========================
  const headerTable = [
    { label: "Aksi", icon: <FaEllipsisV /> },
    { label: "No. Pengajuan", icon: <FaFileAlt /> },
    { label: "Tanggal", icon: <FaCalendarAlt /> },
    { label: "Pemohon", icon: <FaUser /> },
    { label: "Cabang/Unit", icon: <FaBuilding /> },
    { label: "Jenis Biaya", icon: <FaTags /> },
    { label: "Jumlah", icon: <FaMoneyBillWave /> },
    { label: "Status", icon: <FaInfoCircle /> },
  ];

  useEffect(() => {
    setTableData(dummyTableData.list_data);
    setTotalPage(Math.ceil(dummyTableData.total_data / 10));
  }, []);

  const handleReject = () => {
    dispatch(setToggleModal({ isOpen: true, modal: "modalReject" }));
  };
  const handleApprove = () => {
    dispatch(setToggleModal({ isOpen: true, modal: "modalApprove" }));
  };

  const handleView = () => {
    dispatch(setToggleModal({ isOpen: true, modal: "modalAfterApprove" }));
  }

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border-t-4">
      {/* TABLE */}
      <div className="overflow-auto">
        <table className="table w-full">

          {/* HEADER */}
          <thead className="bg-blue-900 text-white sticky top-0 text-[14px]">
            <tr>
              {headerTable.map((h, i) => (
                <th key={i} className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2 font-semibold">
                    <span className="text-[15px]">{h.icon}</span>
                    {h.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {tableData.map((v, i) => (
              <tr
                key={i}
                className="hover:bg-sky-50 transition duration-200 border-b"
              >

                {/* AKSI */}
                <td className="px-4 py-3 align-middle">
                  <div className="dropdown dropdown-right">
                    <div tabIndex={0} role="button">
                      <div className="btn btn-sm rounded-full bg-white shadow hover:bg-gray-100">
                        <FaEllipsisV className="text-primary" />
                      </div>
                    </div>

                    <div
                      tabIndex={0}
                      className="menu menu-md dropdown-content mt-3 z-[1] p-5 border shadow bg-white rounded-box w-64"
                    >
                      <p className="text-md font-bold">Action</p>
                      <>
                        <>
                          <hr className="my-2" />
                          <ul>
                            <li>
                              <div className="pl-0">
                                <HiOutlinePencilAlt className="text-xl" /> Edit
                              </div>
                            </li>
                          </ul>
                        </>
                        <>
                          <hr className="my-2" />
                          <ul>
                            <li>
                              <div className="pl-0" onClick={handleView}>
                                <HiOutlineEye className="text-xl" /> View
                              </div>
                            </li>
                          </ul>
                        </>
                        <>
                          <hr className="my-2" />
                          <ul>
                            <li>
                              <div className="pl-0" onClick={handleReject}>
                                <HiOutlineXMark className="text-xl" /> Reject
                              </div>
                            </li>
                          </ul>
                        </>
                        <>
                          <hr className="my-2" />
                          <ul>
                            <li>
                              <div className="pl-0" onClick={handleApprove}>
                                <HiCheck className="text-xl" /> Approve
                              </div>
                            </li>
                          </ul>
                        </>

                      </>
                    </div>
                  </div>
                </td>

                {/* DATA */}
                <td className="px-4 py-3 font-bold text-primary">
                  {v.NO_PENGAJUAN}
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {formatDate(v.TANGGAL)}
                </td>

                <td className="px-4 py-3">{v.PEMOHON}</td>

                <td className="px-4 py-3">{v.CABANG}</td>

                <td className="px-4 py-3">{v.JENIS_BIAYA}</td>

                <td className="px-4 py-3 font-semibold text-gray-800">
                  Rp {v.JUMLAH.toLocaleString("id-ID")}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`
                      inline-flex items-center gap-2
                      px-3 py-1
                      rounded-full
                      text-xs font-semibold text-white
                      ring-2
                      shadow-sm
                      ${statusBadge(v.STATUS)}
                      hover:scale-110 transition
                    `}
                  >
                    <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
                    {v.STATUS}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <div className="text-[10px] text-gray-400 font-medium">
          <i className="fa-solid fa-circle-info mr-1"></i> Data diperbarui secara berkala
        </div>
        <div className="flex justify-center">
          <ReactPaginate
            pageCount={totalPage}
            containerClassName="flex gap-2 items-center"
            pageClassName="px-3 py-1 rounded rounded-full bg-gray-100 hover:bg-gray-200"
            activeClassName="bg-primary text-white"
            previousLabel="<"
            nextLabel=">"
          />
        </div>
        <span className="text-[10px] text-gray-400 italic font-bold uppercase tracking-widest">
          Cost Tracking System • 2026
        </span>
      </div>

    </div>
  );
};

export default TableListProject;