import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaEllipsisV,
  FaHashtag,
  FaUser,
  FaBuilding,
  FaStore,
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaPencilAlt,
  FaTrash,
  FaFilter,
  FaIdCard,
  FaUserShield,
  FaUsersCog,
} from "react-icons/fa";

import {
  IoSearch,
} from "react-icons/io5";

import ReactPaginate
  from "react-paginate";

import {
  swal,
} from "global/helper/swal";


// =====================================================
// DUMMY DATA
// =====================================================

const dummyData = [

  {
    id: 1,
    username: "admin.pusat",
    nama: "Admin Pusat",
    nip: "10000001",
    email: "admin.pusat@kftd.co.id",
    no_telepon: "021-12345678",
    role: "Admin Pusat",
    cabang: "Kantor Pusat",
    status: "AKTIF",
  },

  {
    id: 2,
    username: "inkaso.medan",
    nama: "Andri Noviandy",
    nip: "10000002",
    email: "andri.noviandy@kftd.co.id",
    no_telepon: "061-123456",
    role: "Inkaso Cabang",
    cabang: "KFTD MEDAN",
    status: "AKTIF",
  },

  {
    id: 3,
    username: "sales.medan",
    nama: "Budi Santoso",
    nip: "10000003",
    email: "budi.santoso@kftd.co.id",
    no_telepon: "061-234567",
    role: "Salesman",
    cabang: "KFTD MEDAN",
    status: "AKTIF",
  },

  {
    id: 4,
    username: "inkaso.jakarta",
    nama: "Citra Lestari",
    nip: "10000004",
    email: "citra.lestari@kftd.co.id",
    no_telepon: "021-456789",
    role: "Inkaso Cabang",
    cabang: "KFTD JAKARTA",
    status: "NONAKTIF",
  },

  {
    id: 5,
    username: "sales.bogor",
    nama: "Dimas Pratama",
    nip: "10000005",
    email: "dimas.pratama@kftd.co.id",
    no_telepon: "0251-555666",
    role: "Salesman",
    cabang: "KFTD BOGOR",
    status: "AKTIF",
  },

  {
    id: 6,
    username: "customer.medan",
    nama: "Customer Medan",
    nip: "10000006",
    email: "customer.medan@kftd.co.id",
    no_telepon: "061-789012",
    role: "Customer",
    cabang: "KFTD MEDAN",
    status: "AKTIF",
  },

];


// =====================================================
// STATUS CONFIG
// =====================================================

const statusConfig = {

  AKTIF: {

    label:
      "Aktif",

    icon:
      FaCheckCircle,

    className:
      "bg-green-100 text-green-700",

  },


  NONAKTIF: {

    label:
      "Nonaktif",

    icon:
      FaTimesCircle,

    className:
      "bg-red-100 text-red-700",

  },

};


// =====================================================
// ROLE CONFIG
// =====================================================

const roleConfig = {

  "Admin Pusat":
    "bg-purple-50 text-purple-700",

  "Inkaso Cabang":
    "bg-blue-50 text-blue-700",

  "Salesman":
    "bg-orange-50 text-orange-700",

};


// =====================================================
// COMPONENT
// =====================================================

const TableManajemenUser = ({
  dimensionScreenW,
  check,
  loginAccess,
  navigation,
  location,
}) => {


  // ===================================================
  // STATE
  // ===================================================

  const [
    allData,
    setAllData,
  ] = useState(
    dummyData
  );


  const [
    keyword,
    setKeyword,
  ] = useState(
    ""
  );


  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState(
    "ALL"
  );


  const [
    selectedRole,
    setSelectedRole,
  ] = useState(
    "ALL"
  );


  const [
    selectedCabang,
    setSelectedCabang,
  ] = useState(
    "ALL"
  );


  const [
    currentPage,
    setCurrentPage,
  ] = useState(
    1
  );


  const [
    perPage,
    setPerPage,
  ] = useState(
    10
  );


  const [
    selectedData,
    setSelectedData,
  ] = useState(
    null
  );


  const [
    showDetail,
    setShowDetail,
  ] = useState(
    false
  );


  const [
    editData,
    setEditData,
  ] = useState(
    null
  );


  const [
    showEdit,
    setShowEdit,
  ] = useState(
    false
  );


  // ===================================================
  // ROLE OPTIONS
  // ===================================================

  const roleOptions =
    useMemo(
      () => {

        return [
          "ALL",
          ...new Set(
            allData.map(
              item =>
                item.role
            )
          ),
        ];

      },
      [
        allData,
      ]
    );


  // ===================================================
  // CABANG OPTIONS
  // ===================================================

  const cabangOptions =
    useMemo(
      () => {

        return [
          "ALL",
          ...new Set(
            allData.map(
              item =>
                item.cabang
            )
          ),
        ];

      },
      [
        allData,
      ]
    );


  // ===================================================
  // FILTER DATA
  // ===================================================

  const filteredData =
    useMemo(
      () => {

        let data =
          [
            ...allData,
          ];


        // =============================================
        // SEARCH
        // =============================================

        if (
          keyword.trim()
        ) {

          const search =
            keyword
              .toLowerCase();


          data =
            data.filter(
              item =>

                item.username
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.nama
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.nip
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.email
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.role
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.cabang
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.no_telepon
                  ?.toLowerCase()
                  .includes(
                    search
                  )

            );

        }


        // =============================================
        // STATUS
        // =============================================

        if (
          selectedStatus !==
          "ALL"
        ) {

          data =
            data.filter(
              item =>
                item.status ===
                selectedStatus
            );

        }


        // =============================================
        // ROLE
        // =============================================

        if (
          selectedRole !==
          "ALL"
        ) {

          data =
            data.filter(
              item =>
                item.role ===
                selectedRole
            );

        }


        // =============================================
        // CABANG
        // =============================================

        if (
          selectedCabang !==
          "ALL"
        ) {

          data =
            data.filter(
              item =>
                item.cabang ===
                selectedCabang
            );

        }


        return data;

      },
      [
        allData,
        keyword,
        selectedStatus,
        selectedRole,
        selectedCabang,
      ]
    );


  // ===================================================
  // PAGINATION
  // ===================================================

  const totalData =
    filteredData.length;


  const totalPage =
    Math.ceil(
      totalData /
      perPage
    );


  const paginatedData =
    filteredData.slice(
      (
        currentPage -
        1
      ) *
        perPage,

      currentPage *
        perPage
    );


  // ===================================================
  // RESET PAGE
  // ===================================================

  useEffect(
    () => {

      setCurrentPage(
        1
      );

    },
    [
      keyword,
      selectedStatus,
      selectedRole,
      selectedCabang,
      perPage,
    ]
  );


  // ===================================================
  // STATUS
  // ===================================================

  const renderStatus =
    (
      status
    ) => {

      const config =
        statusConfig[
          status
        ];


      if (
        !config
      ) {

        return "-";

      }


      const Icon =
        config.icon;


      return (

        <span
          className={`
            inline-flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-full
            text-xs
            font-semibold
            whitespace-nowrap
            ${config.className}
          `}
        >

          <Icon />

          {
            config.label
          }

        </span>

      );

    };


  // ===================================================
  // ROLE
  // ===================================================

  const renderRole =
    (
      role
    ) => {

      return (

        <span
          className={`
            inline-flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-full
            text-xs
            font-semibold
            whitespace-nowrap
            ${
              roleConfig[role] ||
              "bg-gray-50 text-gray-700"
            }
          `}
        >

          <FaUserShield />

          {
            role
          }

        </span>

      );

    };


  // ===================================================
  // DETAIL
  // ===================================================

  const handleDetail =
    (
      data
    ) => {

      setSelectedData(
        data
      );

      setShowDetail(
        true
      );

    };


  // ===================================================
  // EDIT
  // ===================================================

  const handleEdit =
    (
      data
    ) => {

      setEditData(
        {
          ...data,
        }
      );

      setShowEdit(
        true
      );

    };


  // ===================================================
  // CLOSE EDIT
  // ===================================================

  const closeEdit =
    () => {

      setEditData(
        null
      );

      setShowEdit(
        false
      );

    };


  // ===================================================
  // SAVE EDIT
  // ===================================================

  const handleSaveEdit =
    async () => {

      if (
        !editData?.username?.trim()
      ) {

        await swal.warning(
          "Username wajib diisi."
        );

        return;

      }


      if (
        !editData?.nama?.trim()
      ) {

        await swal.warning(
          "Nama user wajib diisi."
        );

        return;

      }


      if (
        !editData?.role?.trim()
      ) {

        await swal.warning(
          "Role wajib dipilih."
        );

        return;

      }


      setAllData(
        prev =>
          prev.map(
            item =>
              item.id ===
              editData.id
                ? {
                    ...editData,
                  }
                : item
          )
      );


      closeEdit();


      await swal.success(
        "Data user berhasil diperbarui."
      );

    };


  // ===================================================
  // DELETE
  // ===================================================

  const handleDelete =
    async (
      data
    ) => {

      const result =
        await swal.confirm(
          "Hapus User",
          `Apakah user "${data.nama}" akan dihapus?`
        );


      if (
        !result
      ) {

        return;

      }


      setAllData(
        prev =>
          prev.filter(
            item =>
              item.id !==
              data.id
          )
      );


      await swal.success(
        "Data user berhasil dihapus."
      );

    };


  // ===================================================
  // PAGINATION INFO
  // ===================================================

  const startIndex =
    totalData > 0
      ? (
          currentPage -
          1
        ) *
          perPage +
        1
      : 0;


  const endIndex =
    Math.min(
      currentPage *
        perPage,
      totalData
    );


  // ===================================================
  // HEADER TABLE
  // ===================================================

  const headerTable = [

    {
      label:
        "Aksi",

      icon:
        <FaEllipsisV />,
    },


    {
      label:
        "No",

      icon:
        <FaHashtag />,
    },


    {
      label:
        "User",

      icon:
        <FaUser />,
    },


    {
      label:
        "NIP",

      icon:
        <FaIdCard />,
    },


    {
      label:
        "Role",

      icon:
        <FaUserShield />,
    },


    {
      label:
        "Cabang",

      icon:
        <FaStore />,
    },


    {
      label:
        "Kontak",

      icon:
        <FaPhone />,
    },


    {
      label:
        "Status",

      icon:
        <FaCheckCircle />,
    },

  ];


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <div
      className="
        flex
        flex-col
        gap-5
      "
    >

      {/* ================================================= */}
      {/* SEARCH + FILTER */}
      {/* ================================================= */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          justify-between
          gap-4
          items-stretch
          lg:items-center
        "
      >

        {/* SEARCH */}

        <div
          className="
            input
            input-sm
            input-bordered
            flex
            items-center
            gap-2
            bg-white
            rounded-full
            border-gray-200
            shadow-sm
            w-full
            lg:w-[420px]
          "
        >

          <IoSearch
            className="
              text-gray-400
              text-lg
            "
          />


          <input
            type="text"
            placeholder="Cari username / nama / NIP / email..."
            className="grow"
            value={
              keyword
            }
            onChange={
              e =>
                setKeyword(
                  e.target.value
                )
            }
          />

        </div>


        {/* FILTER */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >

          {/* STATUS */}

          <select
            className="
              select
              select-sm
              select-bordered
              rounded-full
              bg-white
              min-w-[150px]
            "
            value={
              selectedStatus
            }
            onChange={
              e =>
                setSelectedStatus(
                  e.target.value
                )
            }
          >

            <option value="ALL">
              Semua Status
            </option>

            <option value="AKTIF">
              Aktif
            </option>

            <option value="NONAKTIF">
              Nonaktif
            </option>

          </select>


          {/* ROLE */}

          <select
            className="
              select
              select-sm
              select-bordered
              rounded-full
              bg-white
              min-w-[170px]
            "
            value={
              selectedRole
            }
            onChange={
              e =>
                setSelectedRole(
                  e.target.value
                )
            }
          >

            <option value="ALL">
              Semua Role
            </option>

            {
              roleOptions
                .filter(
                  item =>
                    item !==
                    "ALL"
                )
                .map(
                  role => (

                    <option
                      key={
                        role
                      }
                      value={
                        role
                      }
                    >

                      {
                        role
                      }

                    </option>

                  )
                )
            }

          </select>


          {/* CABANG */}

          <select
            className="
              select
              select-sm
              select-bordered
              rounded-full
              bg-white
              min-w-[180px]
            "
            value={
              selectedCabang
            }
            onChange={
              e =>
                setSelectedCabang(
                  e.target.value
                )
            }
          >

            <option value="ALL">
              Semua Cabang
            </option>

            {
              cabangOptions
                .filter(
                  item =>
                    item !==
                    "ALL"
                )
                .map(
                  cabang => (

                    <option
                      key={
                        cabang
                      }
                      value={
                        cabang
                      }
                    >

                      {
                        cabang
                      }

                    </option>

                  )
                )
            }

          </select>


          {/* RESET */}

          <button
            type="button"
            onClick={() => {

              setKeyword(
                ""
              );

              setSelectedStatus(
                "ALL"
              );

              setSelectedRole(
                "ALL"
              );

              setSelectedCabang(
                "ALL"
              );

            }}
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              border
              border-gray-200
              bg-white
              text-gray-600
              text-sm
              font-semibold
              hover:bg-gray-50
            "
          >

            <FaFilter />

            Reset

          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <div
        className={
          dimensionScreenW <
            768 &&
          check
            ? "bringToBack"
            : ""
        }
      >

        <div
          className="
            bg-white
            rounded-2xl
            shadow-xl
            overflow-hidden
            border
            border-gray-200
          "
        >

          <div
            className="
              overflow-auto
              rounded-2xl
              max-h-[65vh]
            "
          >

            <table
              className="
                table
                w-full
              "
            >

              {/* HEADER */}

              <thead
                className="
                  bg-primary
                  text-white
                  sticky
                  top-0
                  text-[13px]
                  z-10
                "
              >

                <tr>

                  {
                    headerTable.map(
                      (
                        h,
                        index
                      ) => (

                        <th
                          key={
                            index
                          }
                          className="
                            px-4
                            py-3
                            whitespace-nowrap
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              font-semibold
                            "
                          >

                            {
                              h.icon
                            }

                            {
                              h.label
                            }

                          </div>

                        </th>

                      )
                    )
                  }

                </tr>

              </thead>


              {/* BODY */}

              <tbody>

                {
                  paginatedData.length ===
                    0 ? (

                    <tr>

                      <td
                        colSpan={
                          headerTable.length
                        }
                        className="
                          text-center
                          py-16
                          text-gray-500
                        "
                      >

                        <FaUsersCog
                          className="
                            text-4xl
                            text-gray-300
                            mx-auto
                            mb-3
                          "
                        />

                        Tidak ada data user

                      </td>

                    </tr>

                  ) : (

                    paginatedData.map(
                      (
                        item,
                        index
                      ) => (

                        <tr
                          key={
                            item.id
                          }
                          className="
                            border-b
                            hover:bg-blue-50
                            transition
                          "
                        >

                          {/* AKSI */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            <div
                              className="
                                dropdown
                                dropdown-right
                              "
                            >

                              <div
                                tabIndex={
                                  0
                                }
                                role="button"
                                className="
                                  w-9
                                  h-9
                                  rounded-full
                                  bg-blue-50
                                  text-primary
                                  flex
                                  items-center
                                  justify-center
                                  cursor-pointer
                                  hover:bg-primary
                                  hover:text-white
                                  transition
                                "
                              >

                                <FaEllipsisV />

                              </div>


                              <ul
                                tabIndex={
                                  0
                                }
                                className="
                                  dropdown-content
                                  menu
                                  p-2
                                  shadow-xl
                                  bg-white
                                  rounded-box
                                  border
                                  border-gray-100
                                  w-48
                                  z-[30]
                                "
                              >

                                <li>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDetail(
                                        item
                                      )
                                    }
                                  >

                                    <FaEye />

                                    Detail

                                  </button>

                                </li>


                                <li>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleEdit(
                                        item
                                      )
                                    }
                                  >

                                    <FaPencilAlt />

                                    Edit Data

                                  </button>

                                </li>


                                <li>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDelete(
                                        item
                                      )
                                    }
                                    className="
                                      text-red-500
                                    "
                                  >

                                    <FaTrash />

                                    Hapus

                                  </button>

                                </li>

                              </ul>

                            </div>

                          </td>


                          {/* NO */}

                          <td
                            className="
                              px-4
                              py-3
                              font-semibold
                              text-gray-700
                            "
                          >

                            {
                              (
                                currentPage -
                                1
                              ) *
                                perPage +
                              index +
                              1
                            }

                          </td>


                          {/* USER */}

                          <td
                            className="
                              px-4
                              py-3
                              min-w-[280px]
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
                                  bg-blue-50
                                  text-primary
                                  flex
                                  items-center
                                  justify-center
                                  shrink-0
                                "
                              >

                                <FaUser />

                              </div>


                              <div>

                                <p
                                  className="
                                    font-semibold
                                    text-gray-700
                                  "
                                >

                                  {
                                    item.nama
                                  }

                                </p>


                                <p
                                  className="
                                    text-xs
                                    text-gray-400
                                  "
                                >

                                  @
                                  {
                                    item.username
                                  }

                                </p>

                              </div>

                            </div>

                          </td>


                          {/* NIP */}

                          <td
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >

                              <FaIdCard
                                className="
                                  text-blue-500
                                "
                              />

                              <span
                                className="
                                  font-medium
                                  text-gray-700
                                "
                              >

                                {
                                  item.nip
                                }

                              </span>

                            </div>

                          </td>


                          {/* ROLE */}

                          <td
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >

                            {
                              renderRole(
                                item.role
                              )
                            }

                          </td>


                          {/* CABANG */}

                          <td
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >

                              <FaStore
                                className="
                                  text-orange-500
                                "
                              />

                              <span
                                className="
                                  text-sm
                                  font-semibold
                                  text-gray-700
                                "
                              >

                                {
                                  item.cabang
                                }

                              </span>

                            </div>

                          </td>


                          {/* KONTAK */}

                          <td
                            className="
                              px-4
                              py-3
                              min-w-[230px]
                            "
                          >

                            <div
                              className="
                                flex
                                flex-col
                                gap-1
                              "
                            >

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  text-sm
                                "
                              >

                                <FaPhone
                                  className="
                                    text-primary
                                  "
                                />

                                {
                                  item.no_telepon
                                }

                              </div>


                              <div
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  text-xs
                                  text-gray-500
                                "
                              >

                                <FaEnvelope />

                                {
                                  item.email
                                }

                              </div>

                            </div>

                          </td>


                          {/* STATUS */}

                          <td
                            className="
                              px-4
                              py-3
                            "
                          >

                            {
                              renderStatus(
                                item.status
                              )
                            }

                          </td>

                        </tr>

                      )
                    )

                  )
                }

              </tbody>

            </table>

          </div>


          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          <div
            className="
              border-t
              border-gray-100
              bg-slate-50
              py-4
              px-5
            "
          >

            <div
              className="
                flex
                flex-col
                lg:flex-row
                gap-4
                lg:items-center
                lg:justify-between
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-5
                  flex-wrap
                "
              >

                <div
                  className="
                    text-sm
                    text-gray-600
                  "
                >

                  Showing{" "}

                  <span
                    className="
                      font-semibold
                    "
                  >

                    {
                      startIndex
                    }

                  </span>

                  {" "}to{" "}

                  <span
                    className="
                      font-semibold
                    "
                  >

                    {
                      endIndex
                    }

                  </span>

                  {" "}of{" "}

                  <span
                    className="
                      font-semibold
                    "
                  >

                    {
                      totalData
                    }

                  </span>

                  {" "}entries

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <span
                    className="
                      text-sm
                      text-gray-600
                    "
                  >

                    Rows:

                  </span>


                  <select
                    className="
                      select
                      select-bordered
                      select-sm
                      bg-white
                      rounded-full
                    "
                    value={
                      perPage
                    }
                    onChange={
                      e =>
                        setPerPage(
                          parseInt(
                            e.target.value
                          )
                        )
                    }
                  >

                    <option value="5">
                      5
                    </option>

                    <option value="10">
                      10
                    </option>

                    <option value="25">
                      25
                    </option>

                    <option value="50">
                      50
                    </option>

                  </select>

                </div>

              </div>


              {
                totalPage >
                  0 && (

                  <ReactPaginate
                    breakLabel="..."
                    previousLabel="←"
                    nextLabel="→"
                    pageCount={
                      totalPage
                    }
                    onPageChange={
                      e =>
                        setCurrentPage(
                          e.selected +
                          1
                        )
                    }
                    forcePage={
                      currentPage -
                      1
                    }
                    className="
                      flex
                      items-center
                      gap-2
                    "
                    activeClassName="
                      !bg-primary
                      !text-white
                      !border-primary
                    "
                    pageClassName="
                      min-w-9
                      h-9
                      border
                      border-gray-300
                      rounded-full
                      flex
                      items-center
                      justify-center
                      bg-white
                      hover:bg-blue-50
                    "
                    pageLinkClassName="
                      w-full
                      h-full
                      flex
                      items-center
                      justify-center
                    "
                    previousClassName="
                      min-w-9
                      h-9
                      border
                      border-gray-300
                      rounded-full
                      bg-white
                    "
                    nextClassName="
                      min-w-9
                      h-9
                      border
                      border-gray-300
                      rounded-full
                      bg-white
                    "
                    previousLinkClassName="
                      w-full
                      h-full
                      flex
                      items-center
                      justify-center
                    "
                    nextLinkClassName="
                      w-full
                      h-full
                      flex
                      items-center
                      justify-center
                    "
                    breakClassName="
                      px-2
                      text-gray-500
                    "
                    disabledClassName="
                      opacity-50
                      cursor-not-allowed
                    "
                  />

                )
              }

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* DETAIL MODAL */}
      {/* ================================================= */}

      {
        showDetail &&
        selectedData && (

          <div
            className="
              fixed
              inset-0
              z-[999]
              bg-black/40
              backdrop-blur-sm
              flex
              items-center
              justify-center
              p-4
            "
            onClick={() => {

              setShowDetail(
                false
              );

              setSelectedData(
                null
              );

            }}
          >

            <div
              className="
                bg-white
                rounded-2xl
                shadow-2xl
                w-full
                max-w-2xl
                max-h-[90vh]
                overflow-y-auto
              "
              onClick={
                e =>
                  e.stopPropagation()
              }
            >

              {/* HEADER */}

              <div
                className="
                  bg-primary
                  px-6
                  py-4
                  text-white
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
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
                        bg-white/10
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <FaUser />

                    </div>


                    <div>

                      <h3
                        className="
                          font-bold
                          text-lg
                        "
                      >

                        Detail User

                      </h3>


                      <p
                        className="
                          text-xs
                          text-blue-100
                        "
                      >

                        {
                          selectedData.username
                        }

                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    onClick={() => {

                      setShowDetail(
                        false
                      );

                      setSelectedData(
                        null
                      );

                    }}
                    className="
                      w-9
                      h-9
                      rounded-full
                      hover:bg-white/10
                      flex
                      items-center
                      justify-center
                    "
                  >

                    ×

                  </button>

                </div>

              </div>


              {/* BODY */}

              <div
                className="
                  p-6
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-5
                "
              >

                <div>

                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Username
                  </p>

                  <p
                    className="
                      font-bold
                      text-primary
                    "
                  >

                    {
                      selectedData.username
                    }

                  </p>

                </div>


                <div>

                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    NIP
                  </p>

                  <p
                    className="
                      font-semibold
                      text-gray-700
                    "
                  >

                    {
                      selectedData.nip
                    }

                  </p>

                </div>


                <div
                  className="
                    sm:col-span-2
                  "
                >

                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Nama User
                  </p>

                  <p
                    className="
                      font-semibold
                      text-gray-700
                    "
                  >

                    {
                      selectedData.nama
                    }

                  </p>

                </div>


                <div>

                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Role
                  </p>

                  <div
                    className="
                      mt-1
                    "
                  >

                    {
                      renderRole(
                        selectedData.role
                      )
                    }

                  </div>

                </div>


                <div>

                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Cabang
                  </p>

                  <p
                    className="
                      font-semibold
                      text-gray-700
                    "
                  >

                    {
                      selectedData.cabang
                    }

                  </p>

                </div>


                <div>

                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Telepon
                  </p>

                  <p
                    className="
                      font-medium
                      text-gray-700
                    "
                  >

                    {
                      selectedData.no_telepon
                    }

                  </p>

                </div>


                <div>

                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Email
                  </p>

                  <p
                    className="
                      font-medium
                      text-gray-700
                    "
                  >

                    {
                      selectedData.email
                    }

                  </p>

                </div>


                <div>

                  <p
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Status
                  </p>

                  <div
                    className="
                      mt-1
                    "
                  >

                    {
                      renderStatus(
                        selectedData.status
                      )
                    }

                  </div>

                </div>

              </div>


              {/* FOOTER */}

              <div
                className="
                  border-t
                  bg-gray-50
                  px-5
                  py-4
                  flex
                  justify-end
                "
              >

                <button
                  type="button"
                  onClick={() => {

                    setShowDetail(
                      false
                    );

                    setSelectedData(
                      null
                    );

                  }}
                  className="
                    px-5
                    py-2.5
                    rounded-full
                    bg-primary
                    text-white
                    text-sm
                    font-semibold
                    hover:opacity-90
                  "
                >

                  Tutup

                </button>

              </div>

            </div>

          </div>

        )
      }


      {/* ================================================= */}
      {/* EDIT MODAL */}
      {/* ================================================= */}

      {
        showEdit &&
        editData && (

          <div
            className="
              fixed
              inset-0
              z-[999]
              bg-black/40
              backdrop-blur-sm
              flex
              items-center
              justify-center
              p-4
            "
            onClick={
              closeEdit
            }
          >

            <div
              className="
                bg-white
                rounded-2xl
                shadow-2xl
                w-full
                max-w-3xl
                max-h-[90vh]
                overflow-y-auto
              "
              onClick={
                e =>
                  e.stopPropagation()
              }
            >

              {/* HEADER */}

              <div
                className="
                  bg-primary
                  px-6
                  py-4
                  text-white
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
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
                        bg-white/10
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <FaPencilAlt />

                    </div>


                    <div>

                      <h3
                        className="
                          font-bold
                          text-lg
                        "
                      >

                        Edit User

                      </h3>

                    </div>

                  </div>


                  <button
                    type="button"
                    onClick={
                      closeEdit
                    }
                    className="
                      w-9
                      h-9
                      rounded-full
                      hover:bg-white/10
                      flex
                      items-center
                      justify-center
                    "
                  >

                    ×

                  </button>

                </div>

              </div>


              {/* FORM */}

              <div
                className="
                  p-6
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-4
                "
              >

                {/* USERNAME */}

                <div>

                  <label
                    className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    "
                  >

                    Username

                  </label>


                  <input
                    type="text"
                    value={
                      editData.username ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            username:
                              e.target.value,
                          })
                        )
                    }
                    className="
                      input
                      input-bordered
                      w-full
                      rounded-xl
                    "
                  />

                </div>


                {/* NIP */}

                <div>

                  <label
                    className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    "
                  >

                    NIP

                  </label>


                  <input
                    type="text"
                    value={
                      editData.nip ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            nip:
                              e.target.value,
                          })
                        )
                    }
                    className="
                      input
                      input-bordered
                      w-full
                      rounded-xl
                    "
                  />

                </div>


                {/* NAMA */}

                <div>

                  <label
                    className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    "
                  >

                    Nama User

                  </label>


                  <input
                    type="text"
                    value={
                      editData.nama ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            nama:
                              e.target.value,
                          })
                        )
                    }
                    className="
                      input
                      input-bordered
                      w-full
                      rounded-xl
                    "
                  />

                </div>


                {/* EMAIL */}

                <div>

                  <label
                    className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    "
                  >

                    Email

                  </label>


                  <input
                    type="email"
                    value={
                      editData.email ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            email:
                              e.target.value,
                          })
                        )
                    }
                    className="
                      input
                      input-bordered
                      w-full
                      rounded-xl
                    "
                  />

                </div>


                {/* TELEPON */}

                <div>

                  <label
                    className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    "
                  >

                    No. Telepon

                  </label>


                  <input
                    type="text"
                    value={
                      editData.no_telepon ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            no_telepon:
                              e.target.value,
                          })
                        )
                    }
                    className="
                      input
                      input-bordered
                      w-full
                      rounded-xl
                    "
                  />

                </div>


                {/* ROLE */}

                <div>

                  <label
                    className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    "
                  >

                    Role

                  </label>


                  <select
                    value={
                      editData.role ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            role:
                              e.target.value,
                          })
                        )
                    }
                    className="
                      select
                      select-bordered
                      w-full
                      rounded-xl
                    "
                  >

                    <option value="">
                      Pilih Role
                    </option>

                    <option value="Admin Pusat">
                      Admin Pusat
                    </option>

                    <option value="Inkaso Cabang">
                      Inkaso Cabang
                    </option>

                    <option value="Salesman">
                      Salesman
                    </option>

                  </select>

                </div>


                {/* CABANG */}

                <div>

                  <label
                    className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    "
                  >

                    Cabang

                  </label>


                  <input
                    type="text"
                    value={
                      editData.cabang ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            cabang:
                              e.target.value,
                          })
                        )
                    }
                    className="
                      input
                      input-bordered
                      w-full
                      rounded-xl
                    "
                  />

                </div>


                {/* STATUS */}

                <div>

                  <label
                    className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    "
                  >

                    Status

                  </label>


                  <select
                    value={
                      editData.status ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            status:
                              e.target.value,
                          })
                        )
                    }
                    className="
                      select
                      select-bordered
                      w-full
                      rounded-xl
                    "
                  >

                    <option value="AKTIF">
                      Aktif
                    </option>

                    <option value="NONAKTIF">
                      Nonaktif
                    </option>

                  </select>

                </div>

              </div>


              {/* FOOTER */}

              <div
                className="
                  border-t
                  bg-gray-50
                  px-6
                  py-4
                  flex
                  justify-end
                  gap-3
                "
              >

                <button
                  type="button"
                  onClick={
                    closeEdit
                  }
                  className="
                    px-5
                    py-2.5
                    rounded-full
                    bg-gray-200
                    text-gray-700
                    text-sm
                    font-semibold
                  "
                >

                  Batal

                </button>


                <button
                  type="button"
                  onClick={
                    handleSaveEdit
                  }
                  className="
                    px-5
                    py-2.5
                    rounded-full
                    bg-primary
                    text-white
                    text-sm
                    font-semibold
                  "
                >

                  Simpan

                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>

  );

};


export default TableManajemenUser;