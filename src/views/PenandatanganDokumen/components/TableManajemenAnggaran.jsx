import React, { useEffect, useState } from "react";

import {
  FaEllipsisV,
  FaUserTie,
  FaUserCheck,
  FaUsers,
  FaClipboardCheck,
  FaEdit,
  FaInfoCircle,
  FaTags,
} from "react-icons/fa";

import ReactPaginate from "react-paginate";

// =========================
// STATUS STYLE
// =========================
const statusBadge = (status) => {

  switch (status) {

    case "Aktif":
      return "bg-gradient-to-r from-green-500 to-emerald-600 ring-green-200";

    case "Non Aktif":
      return "bg-gradient-to-r from-red-500 to-rose-600 ring-red-200";

    default:
      return "bg-gray-400";

  }

};

const TableManajemenAnggaran = ({
  loginAccess,
  dispatch,
  setToggleModal,
  toggleModal
}) => {

  // =========================
  // STATE PAGINATION
  // =========================
  const [tableData, setTableData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [perPage, setPerPage] = useState(10);

  const [totalData, setTotalData] = useState(0);

  const [totalPage, setTotalPage] = useState(0);

  // =========================
  // HEADER TABLE
  // =========================
  const headerTable = [

    { label: "Aksi", icon: <FaEllipsisV /> },

    { label: "Jenis Biaya", icon: <FaTags /> },

    { label: "Pemohon", icon: <FaUserTie /> },

    { label: "Mengetahui", icon: <FaUsers /> },

    { label: "Pemeriksa", icon: <FaClipboardCheck /> },

    { label: "Menyetujui", icon: <FaUserCheck /> },

    { label: "Mengetahui", icon: <FaUsers /> },

    { label: "Penerima", icon: <FaUserTie /> },

  ];

  // =========================
  // DUMMY DATA
  // =========================
  const jenisBiaya = [
    "Kasbon",
    "Biaya Listrik",
    "Biaya Pengiriman",
    "Biaya Outsourcing",
    "Biaya Memo SDM",
  ];

  const dummyData = Array.from({ length: 25 }).map((_, index) => {

    return {

      id: index + 1,

      jenis_biaya:
        jenisBiaya[index % jenisBiaya.length],

      pemohon: {
        nama: [
          "Budi Santoso",
          "Rina Oktaviani",
          "Agus Saputra",
          "Dewi Lestari",
          "Andi Wijaya",
        ][index % 5],

        jabatan: [
          "Staff Finance",
          "Admin Operasional",
          "Supervisor Pajak",
          "Staff SDM",
          "Staff Akuntansi",
        ][index % 5],
      },

      mengetahui_1: {
        nama: [
          "Hendra Gunawan",
          "Siti Rahma",
          "Robby Kurniawan",
          "Fajar Nugroho",
          "Dina Marlina",
        ][index % 5],

        jabatan: [
          "Kepala Unit",
          "Manager Operasional",
          "Manager Finance",
          "Manager SDM",
          "Kabag Akuntansi",
        ][index % 5],
      },

      pemeriksa: [
        {
          nama: "Rizky Pratama",
          jabatan: "Staff Verifikator",
        },
        {
          nama: "Yoga Saputra",
          jabatan: "Supervisor Verifikasi",
        },
      ],

      menyetujui: [
        {
          nama: "Bambang Setiawan",
          jabatan: "Manager Keuangan",
        },
        {
          nama: "Indra Lesmana",
          jabatan: "Senior Manager",
        },
      ],

      mengetahui_2: {
        nama: [
          "Teguh Firmansyah",
          "Rudi Hartono",
          "Siska Wulandari",
          "Eko Prasetyo",
          "Maya Sari",
        ][index % 5],

        jabatan: [
          "Direktur Operasional",
          "Direktur Keuangan",
          "GM Finance",
          "GM SDM",
          "Direktur Utama",
        ][index % 5],
      },

      penerima: {
        nama: [
          "Rahmat Hidayat",
          "Yuni Kartika",
          "Dimas Prakoso",
          "Lina Marlina",
          "Asep Gunawan",
        ][index % 5],

        jabatan: [
          "Kasir",
          "Finance Staff",
          "Treasury Staff",
          "Admin Finance",
          "Staff Accounting",
        ][index % 5],
      },

      status:
        index % 4 === 0
          ? "Non Aktif"
          : "Aktif",
    };

  });

  // =========================
  // INIT DATA
  // =========================
  useEffect(() => {

    setTableData(dummyData);

    setTotalData(dummyData.length);

    setTotalPage(
      Math.ceil(dummyData.length / perPage)
    );

  }, [perPage]);

  // =========================
  // PAGINATION LOGIC
  // =========================
  const startOffset =
    (currentPage - 1) * perPage;

  const endOffset =
    startOffset + perPage;

  const currentData = tableData.slice(
    startOffset,
    endOffset
  );

  const changePage = (e) => {

    const selectedPage = e.selected + 1;

    setCurrentPage(selectedPage);

  };

  const ChangePerPage = (e) => {

    const value = parseInt(e.target.value);

    setPerPage(value);

    setCurrentPage(1);

  };

  const startIndex =
    totalData > 0
      ? startOffset + 1
      : 0;

  const endIndex = Math.min(
    currentPage * perPage,
    totalData
  );

  // =========================
  // CARD PERSON
  // =========================
  const PersonCard = ({
    nama,
    jabatan
  }) => (

    <div className="flex flex-col">

      <span className="font-semibold text-gray-800 text-sm">
        {nama}
      </span>

      <span className="text-xs text-gray-500">
        {jabatan}
      </span>

    </div>

  );

  return (

    <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-5 border border-gray-300">

      <div className="overflow-auto rounded-xl">

        {/* TABLE */}
        <table className="min-w-full table-auto">

          {/* HEADER */}
          <thead className="bg-blue-900 text-white sticky top-0 text-[14px] z-10">

            <tr>

              {headerTable.map((h, i) => (

                <th
                  key={i}
                  className="px-4 py-3 text-left whitespace-nowrap text-sm font-semibold"
                >

                  <div className="flex items-center gap-2">

                    {h.icon}

                    {h.label}

                  </div>

                </th>

              ))}

            </tr>

          </thead>

          {/* BODY */}
          <tbody className="bg-white">

            {currentData.map((v, i) => (

              <tr
                key={i}
                className="border-b hover:bg-sky-50 transition"
              >

                {/* AKSI */}
                <td className="px-4 py-3 whitespace-nowrap">

                  <button
                    className="
                      btn btn-sm
                      rounded-full
                      bg-blue-900
                      hover:bg-blue-700
                      border-none
                      text-white
                      flex flex-row items-center gap-2
                    "
                  >

                    <FaEdit />

                  </button>

                </td>

                {/* JENIS BIAYA */}
                <td className="px-4 py-3 whitespace-nowrap">

                  <div
                    className="
                      inline-flex items-center
                      px-3 py-2 rounded-xl
                      bg-blue-50
                      text-blue-700
                      text-sm font-semibold
                    "
                  >

                    {v.jenis_biaya}

                  </div>

                </td>

                {/* PEMOHON */}
                <td className="px-4 py-3 min-w-[220px]">
                  <PersonCard
                    nama={v.pemohon.nama}
                    jabatan={v.pemohon.jabatan}
                  />
                </td>

                {/* MENGETAHUI 1 */}
                <td className="px-4 py-3 min-w-[220px]">
                  <PersonCard
                    nama={v.mengetahui_1.nama}
                    jabatan={v.mengetahui_1.jabatan}
                  />
                </td>

                {/* PEMERIKSA */}
                <td className="px-4 py-3 min-w-[250px]">

                  <div className="flex flex-col gap-3">

                    {v.pemeriksa.map((item, idx) => (

                      <div
                        key={idx}
                        className="
                          rounded-xl
                          border border-orange-200
                          bg-orange-50
                          px-3 py-2
                        "
                      >

                        <PersonCard
                          nama={item.nama}
                          jabatan={item.jabatan}
                        />

                      </div>

                    ))}

                  </div>

                </td>

                {/* MENYETUJUI */}
                <td className="px-4 py-3 min-w-[250px]">

                  <div className="flex flex-col gap-3">

                    {v.menyetujui.map((item, idx) => (

                      <div
                        key={idx}
                        className="
                          rounded-xl
                          border border-green-200
                          bg-green-50
                          px-3 py-2
                        "
                      >

                        <PersonCard
                          nama={item.nama}
                          jabatan={item.jabatan}
                        />

                      </div>

                    ))}

                  </div>

                </td>

                {/* MENGETAHUI 2 */}
                <td className="px-4 py-3 min-w-[220px]">
                  <PersonCard
                    nama={v.mengetahui_2.nama}
                    jabatan={v.mengetahui_2.jabatan}
                  />
                </td>

                {/* PENERIMA */}
                <td className="px-4 py-3 min-w-[220px]">
                  <PersonCard
                    nama={v.penerima.nama}
                    jabatan={v.penerima.jabatan}
                  />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* FOOTER */}
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
                onChange={ChangePerPage}
                value={perPage}
              >

                <option value="5">5</option>

                <option value="10">10</option>

                <option value="25">25</option>

                <option value="50">50</option>

              </select>

            </div>

          </div>

          {/* RIGHT */}
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
                  "w-full h-full flex items-center justify-center"
                }

                previousClassName={
                  "min-w-9 h-9 border border-gray-500 rounded-full bg-white hover:bg-sky-50 transition-all overflow-hidden"
                }

                nextClassName={
                  "min-w-9 h-9 border border-gray-500 rounded-full bg-white hover:bg-sky-50 transition-all overflow-hidden"
                }

                previousLinkClassName={
                  "w-full h-full flex items-center justify-center"
                }

                nextLinkClassName={
                  "w-full h-full flex items-center justify-center"
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

  );

};

export default TableManajemenAnggaran;