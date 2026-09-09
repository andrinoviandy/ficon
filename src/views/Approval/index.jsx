import React, { useMemo, useState } from "react";

import {
  FaEllipsisV,
  FaUser,
  FaBriefcase,
  FaLayerGroup,
  FaCalendarAlt,
  FaPlusCircle,
  FaUserCheck,
} from "react-icons/fa";

import {
  HiOutlineEye,
  HiOutlinePencilAlt,
} from "react-icons/hi";

import { IoIosArrowDown } from "react-icons/io";

import {
  IoFilterOutline,
  IoSearch,
} from "react-icons/io5";

import ReactPaginate from "react-paginate";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

// =========================
// HELPER
// =========================
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

// =========================
// COMPONENT
// =========================
const Approval = () => {

  const navigation = useNavigate();

  const location = useLocation();

  // =========================
  // STATE
  // =========================
  const [currentPage, setCurrentPage] = useState(1);

  const [perPage, setPerPage] = useState(5);

  // =========================
  // HEADER TABLE
  // =========================
  const headerTable = [
    { label: "Aksi", icon: <FaEllipsisV /> },

    { label: "Nama", icon: <FaUser /> },

    { label: "Jabatan", icon: <FaBriefcase /> },

    { label: "Unit Approval", icon: <FaLayerGroup /> },

    { label: "Created Date", icon: <FaCalendarAlt /> },
  ];

  // =========================
  // DUMMY DATA
  // =========================
  const dummyData = Array.from({ length: 57 }).map(
    (_, i) => ({
      nama: [
        "Andi Pratama",
        "Budi Santoso",
        "Citra Lestari",
        "Dewi Anggraini",
        "Rina Oktavia",
        "Agus Saputra",
        "Tono Wijaya",
      ][i % 7],

      jabatan: [
        "Staff",
        "Supervisor",
        "Manager",
        "HRD",
        "Finance",
      ][i % 5],

      bagian_approval: [
        "Finance",
        "HR",
        "IT",
        "Procurement",
        "Accounting",
      ][i % 5],

      created_date: `2026-05-${String(
        (i % 28) + 1
      ).padStart(2, "0")}`,
    })
  );

  // =========================
  // PAGINATION
  // =========================
  const totalData = dummyData.length;

  const totalPage = Math.ceil(
    totalData / perPage
  );

  const paginatedData = useMemo(() => {

    const start =
      (currentPage - 1) * perPage;

    const end = start + perPage;

    return dummyData.slice(start, end);

  }, [currentPage, perPage]);

  const changePage = (e) => {

    const selectedPage =
      e.selected + 1;

    setCurrentPage(selectedPage);

  };

  const handlePerPage = (e) => {

    setPerPage(Number(e.target.value));

    setCurrentPage(1);

  };

  const startIndex =
    totalData > 0
      ? (currentPage - 1) * perPage + 1
      : 0;

  const endIndex = Math.min(
    currentPage * perPage,
    totalData
  );

  return (
    <div className="bg-white px-6 pt-10">

      {/* HEADER */}
      <div className="flex sm:flex-row flex-col justify-between gap-3 mb-5">

        <div className="flex w-full items-center gap-3">

          <div className="min-w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-900 to-orange-500 flex items-center justify-center">

            <FaUserCheck className="text-white text-2xl" />

          </div>

          <div>

            <h1 className="text-xl font-bold text-blue-900">
              Approval
            </h1>

            <p className="text-sm text-gray-500">
              Lihat data user approval disini
            </p>

          </div>

        </div>

        <div className='flex sm:w-full justify-end'>
          <button
            className="btn bg-blue-900 text-white rounded-full hover:scale-105 gap-1"
            onClick={() =>
              navigation("/add-approval", {
                state: {
                  ...location.state,
                },
              })
            }
          >

            <FaPlusCircle className="mr-2" />

            Tambah Approval

          </button>
        </div>

      </div>

      <hr className="mb-6" />

      <div className="flex flex-col gap-5">

        {/* FILTER */}
        <div className="flex lg:flex-row flex-col gap-5">

          <form className="input input-sm input-bordered flex items-center gap-2 bg-transparent rounded-[25px]">

            <input
              type="text"
              placeholder="Search..."
              className="grow"
            />

            <IoSearch className="cursor-pointer" />

          </form>

          <div className="flex flex-col gap-5 lg:justify-end sm:w-full sm:flex-row sm:items-center">

            <div className="flex gap-3 justify-between">

              <div className="btn btn-sm rounded-[25px]">

                <IoFilterOutline />

                Filter

              </div>

              <div className="flex items-center">

                <span className="mr-2 text-sm font-light">
                  Sort by:
                </span>

                <div className="dropdown dropdown-hover dropdown-end z-20">

                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-sm rounded-[25px] bg-white"
                  >

                    Latest

                    <IoIosArrowDown />

                  </div>

                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-28"
                  >

                    <li>
                      <div>Latest</div>
                    </li>

                    <li>
                      <div>Oldest</div>
                    </li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-300 mb-5">
          <div className="overflow-auto rounded-2xl max-h-[72vh]">

            <table className="table w-full">

              {/* HEADER */}
              <thead className="bg-blue-900 text-white sticky top-0 text-[14px] z-10">

                <tr>

                  {headerTable.map((h, i) => (

                    <th
                      key={i}
                      className="px-4 py-3 whitespace-nowrap"
                    >

                      <div className="flex items-center gap-2 font-semibold">

                        <span className="text-[15px]">
                          {h.icon}
                        </span>

                        {h.label}

                      </div>

                    </th>

                  ))}

                </tr>

              </thead>

              {/* BODY */}
              <tbody>

                {paginatedData.map((v, i) => (

                  <tr
                    key={i}
                    className="hover:bg-sky-50 transition duration-200 border-b"
                  >

                    {/* AKSI */}
                    <td className="px-4 py-3">

                      <div className="dropdown dropdown-right">

                        <div tabIndex={0} role="button">

                          <div className="btn btn-sm rounded-full bg-white shadow hover:bg-gray-100">

                            <FaEllipsisV className="text-green-600" />

                          </div>

                        </div>

                        <div
                          tabIndex={0}
                          className="menu dropdown-content mt-3 p-4 border shadow bg-white rounded-xl w-52"
                        >

                          <p className="font-semibold text-sm">
                            Action
                          </p>

                          <hr className="my-2" />

                          <button className="flex items-center gap-2 hover:text-blue-600">

                            <HiOutlinePencilAlt />

                            Edit

                          </button>

                          <hr className="my-2" />

                          <button className="flex items-center gap-2 hover:text-green-600">

                            <HiOutlineEye />

                            View

                          </button>

                        </div>

                      </div>

                    </td>

                    {/* NAMA */}
                    <td className="px-4 py-3 font-semibold text-primary whitespace-nowrap">

                      {v.nama}

                    </td>

                    {/* JABATAN */}
                    <td className="px-4 py-3 whitespace-nowrap">

                      {v.jabatan}

                    </td>

                    {/* BAGIAN */}
                    <td className="px-4 py-3 whitespace-nowrap">

                      {v.bagian_approval}

                    </td>

                    {/* DATE */}
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">

                      {formatDate(v.created_date)}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* ================= FOOTER TABLE ================= */}
          <div className="border border-gray-100 shadow-xl bg-slate-50 py-4 rounded-b-2xl lg:px-5 md:px-5 px-2">

            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

              {/* LEFT */}
              <div className="flex flex-row items-center gap-3 justify-between flex-wrap">

                <div className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold">
                    {startIndex}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold">
                    {endIndex}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold">
                    {totalData}
                  </span>{" "}
                  entries
                </div>

                <div className="flex items-center gap-2">

                  <span className="text-sm text-gray-600">
                    Rows :
                  </span>

                  <select
                    className="select select-bordered select-sm bg-white rounded-full"
                    onChange={handlePerPage}
                    value={perPage}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>

                </div>

              </div>

              {/* RIGHT PAGINATION */}
              {totalPage > 0 && (
                <div className="overflow-auto pb-2 justify-center flex">

                  <ReactPaginate
                    breakLabel={"..."}
                    previousLabel={"←"}
                    nextLabel={"→"}
                    pageCount={totalPage}
                    onPageChange={changePage}
                    forcePage={currentPage - 1}
                    className={"flex items-center gap-2"}

                    activeClassName={
                      "!bg-blue-900 !text-white !border-blue-900"
                    }

                    pageClassName={
                      "min-w-9 h-9 border border-gray-500 rounded-full flex items-center justify-center bg-white hover:bg-sky-50 transition-all"
                    }

                    pageLinkClassName={
                      "w-full h-full flex items-center justify-center px-3"
                    }

                    previousClassName={
                      "min-w-9 h-9 border border-gray-500 rounded-full bg-white hover:bg-sky-50 transition-all overflow-hidden"
                    }

                    nextClassName={
                      "min-w-9 h-9 border border-gray-500 rounded-full bg-white hover:bg-sky-50 transition-all overflow-hidden"
                    }

                    previousLinkClassName={
                      "w-full h-full flex items-center justify-center px-3"
                    }

                    nextLinkClassName={
                      "w-full h-full flex items-center justify-center px-3"
                    }

                    breakClassName={
                      "px-2 text-gray-500"
                    }

                    disabledClassName={
                      "opacity-50 cursor-not-allowed"
                    }
                  />

                </div>
              )}

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Approval;