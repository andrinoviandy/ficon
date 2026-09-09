import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaEllipsisV,
  FaHashtag,
  FaUsers,
  FaUser,
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
  FaPencilAlt,
  FaTrash,
  FaFilter,
  FaTimes,
  FaSave,
  FaClipboardList,
  FaStore,
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

    customer_id:
      "CUST-00001",

    kode_customer:
      "10000271521",

    nama_customer:
      "Dinas Kesehatan Kota Medan",

    jenis_customer:
      "Instansi Pemerintah",

    cabang:
      "KFTD MEDAN",

    alamat:
      "Jl. Gatot Subroto No. 125, Medan",

    kota:
      "Medan",

    provinsi:
      "Sumatera Utara",

    no_telepon:
      "061-456789",

    email:
      "dinkesmedan@gmail.com",

    sales:
      "Andri Noviandy",

    status:
      "AKTIF",

  },


  {
    id: 2,

    customer_id:
      "CUST-00002",

    kode_customer:
      "10000271522",

    nama_customer:
      "Apotek Maju Djaya",

    jenis_customer:
      "Apotek",

    cabang:
      "KFTD MEDAN",

    alamat:
      "Jl. Sisingamangaraja No. 88, Medan",

    kota:
      "Medan",

    provinsi:
      "Sumatera Utara",

    no_telepon:
      "061-667788",

    email:
      "majudjaya@gmail.com",

    sales:
      "Budi Santoso",

    status:
      "AKTIF",

  },


  {
    id: 3,

    customer_id:
      "CUST-00003",

    kode_customer:
      "10000271523",

    nama_customer:
      "Apotek Rusli",

    jenis_customer:
      "Apotek",

    cabang:
      "KFTD MEDAN",

    alamat:
      "Jl. Iskandar Muda No. 45, Medan",

    kota:
      "Medan",

    provinsi:
      "Sumatera Utara",

    no_telepon:
      "061-778899",

    email:
      "apotekrusli@gmail.com",

    sales:
      "Citra Lestari",

    status:
      "AKTIF",

  },


  {
    id: 4,

    customer_id:
      "CUST-00004",

    kode_customer:
      "10000271524",

    nama_customer:
      "RSUD Pasuruan",

    jenis_customer:
      "Rumah Sakit",

    cabang:
      "KFTD PASURUAN",

    alamat:
      "Jl. Wahidin Sudirohusodo No. 10, Pasuruan",

    kota:
      "Pasuruan",

    provinsi:
      "Jawa Timur",

    no_telepon:
      "0343-555888",

    email:
      "rsudpasuruan@gmail.com",

    sales:
      "Dimas Pratama",

    status:
      "AKTIF",

  },


  {
    id: 5,

    customer_id:
      "CUST-00005",

    kode_customer:
      "10000271525",

    nama_customer:
      "RS Hermina Medan",

    jenis_customer:
      "Rumah Sakit",

    cabang:
      "KFTD MEDAN",

    alamat:
      "Jl. Asrama No. 12, Medan",

    kota:
      "Medan",

    provinsi:
      "Sumatera Utara",

    no_telepon:
      "061-889900",

    email:
      "info@herminamedan.com",

    sales:
      "Andri Noviandy",

    status:
      "AKTIF",

  },


  {
    id: 6,

    customer_id:
      "CUST-00006",

    kode_customer:
      "10000271526",

    nama_customer:
      "Apotek Sehat Sentosa",

    jenis_customer:
      "Apotek",

    cabang:
      "KFTD JAKARTA",

    alamat:
      "Jl. Kelapa Gading Raya No. 21, Jakarta",

    kota:
      "Jakarta Utara",

    provinsi:
      "DKI Jakarta",

    no_telepon:
      "021-667788",

    email:
      "sehat.sentosa@gmail.com",

    sales:
      "Budi Santoso",

    status:
      "AKTIF",

  },


  {
    id: 7,

    customer_id:
      "CUST-00007",

    kode_customer:
      "10000271527",

    nama_customer:
      "Klinik Medika Utama",

    jenis_customer:
      "Klinik",

    cabang:
      "KFTD JAKARTA",

    alamat:
      "Jl. Boulevard Barat No. 30, Jakarta",

    kota:
      "Jakarta Utara",

    provinsi:
      "DKI Jakarta",

    no_telepon:
      "021-778899",

    email:
      "medikautama@gmail.com",

    sales:
      "Citra Lestari",

    status:
      "NONAKTIF",

  },


  {
    id: 8,

    customer_id:
      "CUST-00008",

    kode_customer:
      "10000271528",

    nama_customer:
      "RS Siloam Medan",

    jenis_customer:
      "Rumah Sakit",

    cabang:
      "KFTD MEDAN",

    alamat:
      "Jl. Imam Bonjol No. 5, Medan",

    kota:
      "Medan",

    provinsi:
      "Sumatera Utara",

    no_telepon:
      "061-223344",

    email:
      "siloammedan@gmail.com",

    sales:
      "Dimas Pratama",

    status:
      "AKTIF",

  },


  {
    id: 9,

    customer_id:
      "CUST-00009",

    kode_customer:
      "10000271529",

    nama_customer:
      "Dinas Kesehatan Deli Serdang",

    jenis_customer:
      "Instansi Pemerintah",

    cabang:
      "KFTD MEDAN",

    alamat:
      "Jl. Negara No. 100, Deli Serdang",

    kota:
      "Deli Serdang",

    provinsi:
      "Sumatera Utara",

    no_telepon:
      "061-334455",

    email:
      "dinkesdeliserdang@gmail.com",

    sales:
      "Andri Noviandy",

    status:
      "AKTIF",

  },


  {
    id: 10,

    customer_id:
      "CUST-00010",

    kode_customer:
      "10000271530",

    nama_customer:
      "Apotek Kimia Sehat",

    jenis_customer:
      "Apotek",

    cabang:
      "KFTD JAKARTA",

    alamat:
      "Jl. Sunter Agung No. 18, Jakarta",

    kota:
      "Jakarta Utara",

    provinsi:
      "DKI Jakarta",

    no_telepon:
      "021-990011",

    email:
      "kimia.sehat@gmail.com",

    sales:
      "Budi Santoso",

    status:
      "NONAKTIF",

  },


  {
    id: 11,

    customer_id:
      "CUST-00011",

    kode_customer:
      "10000271531",

    nama_customer:
      "RSUD Kota Bogor",

    jenis_customer:
      "Rumah Sakit",

    cabang:
      "KFTD BOGOR",

    alamat:
      "Jl. Pajajaran No. 50, Bogor",

    kota:
      "Bogor",

    provinsi:
      "Jawa Barat",

    no_telepon:
      "0251-667788",

    email:
      "rsudbogor@gmail.com",

    sales:
      "Citra Lestari",

    status:
      "AKTIF",

  },


  {
    id: 12,

    customer_id:
      "CUST-00012",

    kode_customer:
      "10000271532",

    nama_customer:
      "Apotek Berkah Farma",

    jenis_customer:
      "Apotek",

    cabang:
      "KFTD BOGOR",

    alamat:
      "Jl. Merdeka No. 12, Bogor",

    kota:
      "Bogor",

    provinsi:
      "Jawa Barat",

    no_telepon:
      "0251-778899",

    email:
      "berkahfarma@gmail.com",

    sales:
      "Dimas Pratama",

    status:
      "AKTIF",

  },

];


// =====================================================
// STATUS
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
// COMPONENT
// =====================================================

const TableMasterPelanggan = ({
  dimensionScreenW,
  check,
  loginAccess,
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
    showEdit,
    setShowEdit,
  ] = useState(
    false
  );


  const [
    editData,
    setEditData,
  ] = useState(
    null
  );


  // ===================================================
  // CABANG
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
  // FILTER
  // ===================================================

  const filteredData =
    useMemo(
      () => {

        let data =
          [
            ...allData,
          ];


        // SEARCH

        if (
          keyword.trim()
        ) {

          const search =
            keyword
              .toLowerCase();


          data =
            data.filter(
              item =>

                item.customer_id
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.kode_customer
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.nama_customer
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

                item.sales
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


        // STATUS

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


        // CABANG

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
  // SUMMARY
  // ===================================================

  const summaryData =
    useMemo(
      () => {

        const total =
          allData.length;


        const aktif =
          allData.filter(
            item =>
              item.status ===
              "AKTIF"
          ).length;


        const nonaktif =
          allData.filter(
            item =>
              item.status ===
              "NONAKTIF"
          ).length;


        const cabang =
          new Set(
            allData.map(
              item =>
                item.cabang
            )
          ).size;


        return {

          total,

          aktif,

          nonaktif,

          cabang,

        };

      },
      [
        allData,
      ]
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
        !editData?.nama_customer?.trim()
      ) {

        await swal.warning(
          "Nama pelanggan wajib diisi."
        );

        return;

      }


      if (
        !editData?.cabang?.trim()
      ) {

        await swal.warning(
          "Cabang wajib diisi."
        );

        return;

      }


      if (
        !editData?.alamat?.trim()
      ) {

        await swal.warning(
          "Alamat wajib diisi."
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
        "Data pelanggan berhasil diperbarui."
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
          "Hapus Pelanggan",
          `Apakah pelanggan "${data.nama_customer}" akan dihapus?`
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
        "Data pelanggan berhasil dihapus."
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
        "Customer",

      icon:
        <FaUsers />,
    },

    {
      label:
        "Jenis",

      icon:
        <FaBuilding />,
    },

    {
      label:
        "Cabang",

      icon:
        <FaStore />,
    },

    {
      label:
        "Alamat",

      icon:
        <FaMapMarkerAlt />,
    },

    {
      label:
        "Kontak",

      icon:
        <FaPhone />,
    },

    {
      label:
        "Sales",

      icon:
        <FaUser />,
    },

    {
      label:
        "Status",

      icon:
        <FaClipboardList />,
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
            placeholder="
              Cari customer / kode / sales / telepon...
            "
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


          <button
            type="button"
            onClick={() => {

              setKeyword("");

              setSelectedStatus(
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
      {/* SUMMARY */}
      {/* ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4
        "
      >

        {/* TOTAL */}

        <div
          className="
            rounded-2xl
            bg-blue-50
            border
            border-blue-100
            p-4
          "
        >

          <div
            className="
              flex
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-blue-700
                "
              >
                Total Pelanggan
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-blue-900
                "
              >
                {
                  summaryData.total
                }
              </p>

            </div>


            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-blue-100
                flex
                items-center
                justify-center
              "
            >

              <FaUsers
                className="
                  text-blue-600
                "
              />

            </div>

          </div>

        </div>


        {/* AKTIF */}

        <div
          className="
            rounded-2xl
            bg-green-50
            border
            border-green-100
            p-4
          "
        >

          <div
            className="
              flex
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-green-700
                "
              >
                Pelanggan Aktif
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-green-900
                "
              >
                {
                  summaryData.aktif
                }
              </p>

            </div>


            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-green-100
                flex
                items-center
                justify-center
              "
            >

              <FaCheckCircle
                className="
                  text-green-600
                "
              />

            </div>

          </div>

        </div>


        {/* NONAKTIF */}

        <div
          className="
            rounded-2xl
            bg-red-50
            border
            border-red-100
            p-4
          "
        >

          <div
            className="
              flex
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-red-700
                "
              >
                Pelanggan Nonaktif
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-red-900
                "
              >
                {
                  summaryData.nonaktif
                }
              </p>

            </div>


            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-red-100
                flex
                items-center
                justify-center
              "
            >

              <FaTimesCircle
                className="
                  text-red-600
                "
              />

            </div>

          </div>

        </div>


        {/* CABANG */}

        <div
          className="
            rounded-2xl
            bg-purple-50
            border
            border-purple-100
            p-4
          "
        >

          <div
            className="
              flex
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-purple-700
                "
              >
                Cabang
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-purple-900
                "
              >
                {
                  summaryData.cabang
                }
              </p>

            </div>


            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-purple-100
                flex
                items-center
                justify-center
              "
            >

              <FaStore
                className="
                  text-purple-600
                "
              />

            </div>

          </div>

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

                        <FaUsers
                          className="
                            text-4xl
                            text-gray-300
                            mx-auto
                            mb-3
                          "
                        />

                        Tidak ada data pelanggan

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


                          {/* CUSTOMER */}

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

                                <FaBuilding />

                              </div>


                              <div>

                                <p
                                  className="
                                    font-semibold
                                    text-gray-700
                                  "
                                >
                                  {
                                    item.nama_customer
                                  }
                                </p>

                                <p
                                  className="
                                    text-xs
                                    text-gray-400
                                  "
                                >

                                  {
                                    item.customer_id
                                  }

                                  {" • "}

                                  {
                                    item.kode_customer
                                  }

                                </p>

                              </div>

                            </div>

                          </td>


                          {/* JENIS */}

                          <td
                            className="
                              px-4
                              py-3
                              whitespace-nowrap
                            "
                          >

                            <span
                              className="
                                inline-flex
                                px-3
                                py-1.5
                                rounded-full
                                bg-blue-50
                                text-primary
                                text-xs
                                font-semibold
                              "
                            >

                              {
                                item.jenis_customer
                              }

                            </span>

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


                          {/* ALAMAT */}

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
                                items-start
                                gap-2
                                text-sm
                                text-gray-600
                              "
                            >

                              <FaMapMarkerAlt
                                className="
                                  text-orange-500
                                  mt-1
                                  shrink-0
                                "
                              />

                              <span>
                                {
                                  item.alamat
                                }
                              </span>

                            </div>

                          </td>


                          {/* KONTAK */}

                          <td
                            className="
                              px-4
                              py-3
                              min-w-[220px]
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


                          {/* SALES */}

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

                              <div
                                className="
                                  w-8
                                  h-8
                                  rounded-full
                                  bg-orange-50
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                <FaUser
                                  className="
                                    text-orange-500
                                  "
                                />

                              </div>


                              <span
                                className="
                                  text-sm
                                  font-medium
                                  text-gray-700
                                "
                              >
                                {
                                  item.sales
                                }
                              </span>

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

                      <FaUsers />

                    </div>


                    <div>

                      <h3
                        className="
                          font-bold
                          text-lg
                        "
                      >
                        Detail Pelanggan
                      </h3>

                      <p
                        className="
                          text-xs
                          text-blue-100
                        "
                      >
                        {
                          selectedData.customer_id
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

                    <FaTimes />

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

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Customer ID
                  </p>

                  <p className="
                    font-bold
                    text-primary
                  ">
                    {
                      selectedData.customer_id
                    }
                  </p>

                </div>


                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Kode Customer
                  </p>

                  <p className="
                    font-semibold
                    text-gray-700
                  ">
                    {
                      selectedData.kode_customer
                    }
                  </p>

                </div>


                <div
                  className="
                    sm:col-span-2
                  "
                >

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Nama Pelanggan
                  </p>

                  <p className="
                    font-semibold
                    text-gray-700
                  ">
                    {
                      selectedData.nama_customer
                    }
                  </p>

                </div>


                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Jenis Customer
                  </p>

                  <p className="
                    font-semibold
                    text-gray-700
                  ">
                    {
                      selectedData.jenis_customer
                    }
                  </p>

                </div>


                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Cabang
                  </p>

                  <p className="
                    font-semibold
                    text-gray-700
                  ">
                    {
                      selectedData.cabang
                    }
                  </p>

                </div>


                <div
                  className="
                    sm:col-span-2
                  "
                >

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Alamat
                  </p>

                  <p className="
                    text-sm
                    text-gray-600
                  ">
                    {
                      selectedData.alamat
                    }
                  </p>

                </div>


                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Kota
                  </p>

                  <p className="
                    font-medium
                    text-gray-700
                  ">
                    {
                      selectedData.kota
                    }
                  </p>

                </div>


                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Provinsi
                  </p>

                  <p className="
                    font-medium
                    text-gray-700
                  ">
                    {
                      selectedData.provinsi
                    }
                  </p>

                </div>


                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Telepon
                  </p>

                  <p className="
                    font-medium
                    text-gray-700
                  ">
                    {
                      selectedData.no_telepon
                    }
                  </p>

                </div>


                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Email
                  </p>

                  <p className="
                    font-medium
                    text-gray-700
                  ">
                    {
                      selectedData.email
                    }
                  </p>

                </div>


                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Sales
                  </p>

                  <p className="
                    font-medium
                    text-gray-700
                  ">
                    {
                      selectedData.sales
                    }
                  </p>

                </div>


                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Status
                  </p>

                  <div className="mt-1">

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
                        Edit Pelanggan
                      </h3>

                      <p
                        className="
                          text-xs
                          text-blue-100
                        "
                      >
                        {
                          editData.customer_id
                        }
                      </p>

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

                    <FaTimes />

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

                {/* CUSTOMER ID */}

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
                    Customer ID
                  </label>

                  <input
                    type="text"
                    value={
                      editData.customer_id ||
                      ""
                    }
                    disabled
                    className="
                      input
                      input-bordered
                      w-full
                      bg-gray-100
                      rounded-xl
                    "
                  />

                </div>


                {/* KODE */}

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
                    Kode Customer
                  </label>

                  <input
                    type="text"
                    value={
                      editData.kode_customer ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            kode_customer:
                              e.target.value,
                          })
                        )
                    }
                    className="
                      input
                      input-bordered
                      w-full
                      bg-white
                      rounded-xl
                    "
                  />

                </div>


                {/* NAMA */}

                <div
                  className="
                    md:col-span-2
                  "
                >

                  <label
                    className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    "
                  >
                    Nama Pelanggan
                  </label>

                  <input
                    type="text"
                    value={
                      editData.nama_customer ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            nama_customer:
                              e.target.value,
                          })
                        )
                    }
                    className="
                      input
                      input-bordered
                      w-full
                      bg-white
                      rounded-xl
                    "
                  />

                </div>


                {/* JENIS */}

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
                    Jenis Customer
                  </label>

                  <select
                    value={
                      editData.jenis_customer ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            jenis_customer:
                              e.target.value,
                          })
                        )
                    }
                    className="
                      select
                      select-bordered
                      w-full
                      rounded-xl
                      bg-white
                    "
                  >

                    <option value="Apotek">
                      Apotek
                    </option>

                    <option value="Rumah Sakit">
                      Rumah Sakit
                    </option>

                    <option value="Klinik">
                      Klinik
                    </option>

                    <option value="Instansi Pemerintah">
                      Instansi Pemerintah
                    </option>

                    <option value="Distributor">
                      Distributor
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

                  <select
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
                      select
                      select-bordered
                      w-full
                      rounded-xl
                      bg-white
                    "
                  >

                    <option value="KFTD MEDAN">
                      KFTD MEDAN
                    </option>

                    <option value="KFTD JAKARTA">
                      KFTD JAKARTA
                    </option>

                    <option value="KFTD PASURUAN">
                      KFTD PASURUAN
                    </option>

                    <option value="KFTD BOGOR">
                      KFTD BOGOR
                    </option>

                  </select>

                </div>


                {/* KOTA */}

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
                    Kota
                  </label>

                  <input
                    type="text"
                    value={
                      editData.kota ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            kota:
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


                {/* PROVINSI */}

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
                    Provinsi
                  </label>

                  <input
                    type="text"
                    value={
                      editData.provinsi ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            provinsi:
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


                {/* ALAMAT */}

                <div
                  className="
                    md:col-span-2
                  "
                >

                  <label
                    className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    "
                  >
                    Alamat
                  </label>

                  <textarea
                    value={
                      editData.alamat ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            alamat:
                              e.target.value,
                          })
                        )
                    }
                    className="
                      textarea
                      textarea-bordered
                      w-full
                      min-h-[100px]
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


                {/* SALES */}

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
                    Sales
                  </label>

                  <select
                    value={
                      editData.sales ||
                      ""
                    }
                    onChange={
                      e =>
                        setEditData(
                          prev => ({
                            ...prev,
                            sales:
                              e.target.value,
                          })
                        )
                    }
                    className="
                      select
                      select-bordered
                      w-full
                      rounded-xl
                      bg-white
                    "
                  >

                    <option value="Andri Noviandy">
                      Andri Noviandy
                    </option>

                    <option value="Budi Santoso">
                      Budi Santoso
                    </option>

                    <option value="Citra Lestari">
                      Citra Lestari
                    </option>

                    <option value="Dimas Pratama">
                      Dimas Pratama
                    </option>

                  </select>

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
                      bg-white
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
                  px-5
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
                    border
                    border-gray-300
                    bg-white
                    text-gray-600
                    text-sm
                    font-semibold
                    hover:bg-gray-100
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
                    px-6
                    py-2.5
                    rounded-full
                    bg-primary
                    text-white
                    text-sm
                    font-semibold
                    hover:opacity-90
                    shadow-md
                    inline-flex
                    items-center
                    gap-2
                  "
                >

                  <FaSave />

                  Simpan Perubahan

                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>

  );

};


export default TableMasterPelanggan;