import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaSearch,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaFileInvoiceDollar,
  FaCalendarAlt,
  FaUser,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaChevronLeft,
  FaChevronRight,
  FaSyncAlt,
} from "react-icons/fa";


// =====================================================
// COMPONENT
// =====================================================

const TableDataPiutang = ({
  navigation,
  location,
  dimensionScreenW,
  check,
  loginAccess,
  reloadData,
  setReloadData,
}) => {

  // ===================================================
  // STATE
  // ===================================================

  const [
    data,
    setData,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    filterStatus,
    setFilterStatus,
  ] = useState("ALL");

  const [
    filterAging,
    setFilterAging,
  ] = useState("ALL");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [
    limit,
    setLimit,
  ] = useState(10);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    selectedData,
    setSelectedData,
  ] = useState(null);

  const [
    showDetail,
    setShowDetail,
  ] = useState(false);

  const [
    showFilter,
    setShowFilter,
  ] = useState(false);


  // ===================================================
  // KONFIGURASI
  // ===================================================

  // Berapa hari sebelum jatuh tempo dianggap
  // "Segera Jatuh Tempo"
  const SOON_DUE_DAYS = 7;


  // ===================================================
  // DUMMY DATA
  // ===================================================

  const dummyData = [
    {
      id: 1,
      no_faktur: "010.000-26.00000001",
      no_billing: "BILL-2026-00001",
      customer: "PT Maju Jaya Abadi",
      alamat: "Jakarta Selatan",
      sales: "Andi",
      tanggal_faktur: "2026-08-01",
      jatuh_tempo: "2026-08-31",
      total_piutang: 25000000,
      sudah_dibayar: 10000000,
      outstanding: 15000000,
      aging: 1,
      status: "OUTSTANDING",
    },
    {
      id: 2,
      no_faktur: "010.000-26.00000002",
      no_billing: "BILL-2026-00002",
      customer: "PT Sumber Makmur",
      alamat: "Jakarta Barat",
      sales: "Budi",
      tanggal_faktur: "2026-07-15",
      jatuh_tempo: "2026-08-14",
      total_piutang: 18000000,
      sudah_dibayar: 5000000,
      outstanding: 13000000,
      aging: 18,
      status: "OVERDUE",
    },
    {
      id: 3,
      no_faktur: "010.000-26.00000003",
      no_billing: "BILL-2026-00003",
      customer: "PT Nusantara Sentosa",
      alamat: "Tangerang",
      sales: "Candra",
      tanggal_faktur: "2026-08-05",
      jatuh_tempo: "2026-09-04",
      total_piutang: 32000000,
      sudah_dibayar: 32000000,
      outstanding: 0,
      aging: 0,
      status: "PAID",
    },
    {
      id: 4,
      no_faktur: "010.000-26.00000004",
      no_billing: "BILL-2026-00004",
      customer: "PT Berkah Sejahtera",
      alamat: "Bekasi",
      sales: "Deni",
      tanggal_faktur: "2026-06-10",
      jatuh_tempo: "2026-07-10",
      total_piutang: 45000000,
      sudah_dibayar: 10000000,
      outstanding: 35000000,
      aging: 53,
      status: "OVERDUE",
    },
    {
      id: 5,
      no_faktur: "010.000-26.00000005",
      no_billing: "BILL-2026-00005",
      customer: "PT Karya Utama",
      alamat: "Depok",
      sales: "Eko",
      tanggal_faktur: "2026-08-10",
      jatuh_tempo: "2026-09-09",
      total_piutang: 12500000,
      sudah_dibayar: 0,
      outstanding: 12500000,
      aging: 0,
      status: "OUTSTANDING",
    },
    {
      id: 6,
      no_faktur: "010.000-26.00000006",
      no_billing: "BILL-2026-00006",
      customer: "PT Mitra Bersama",
      alamat: "Jakarta Timur",
      sales: "Fajar",
      tanggal_faktur: "2026-05-01",
      jatuh_tempo: "2026-05-31",
      total_piutang: 60000000,
      sudah_dibayar: 20000000,
      outstanding: 40000000,
      aging: 93,
      status: "OVERDUE",
    },
    {
      id: 7,
      no_faktur: "010.000-26.00000007",
      no_billing: "BILL-2026-00007",
      customer: "PT Global Mandiri",
      alamat: "Jakarta Pusat",
      sales: "Gilang",
      tanggal_faktur: "2026-08-12",
      jatuh_tempo: "2026-09-11",
      total_piutang: 22000000,
      sudah_dibayar: 22000000,
      outstanding: 0,
      aging: 0,
      status: "PAID",
    },
    {
      id: 8,
      no_faktur: "010.000-26.00000008",
      no_billing: "BILL-2026-00008",
      customer: "PT Sejahtera Abadi",
      alamat: "Bogor",
      sales: "Hendra",
      tanggal_faktur: "2026-07-01",
      jatuh_tempo: "2026-07-31",
      total_piutang: 27500000,
      sudah_dibayar: 7500000,
      outstanding: 20000000,
      aging: 32,
      status: "OVERDUE",
    },
    {
      id: 9,
      no_faktur: "010.000-26.00000009",
      no_billing: "BILL-2026-00009",
      customer: "PT Cahaya Abadi",
      alamat: "Karawang",
      sales: "Iwan",
      tanggal_faktur: "2026-08-15",
      jatuh_tempo: "2026-09-14",
      total_piutang: 15500000,
      sudah_dibayar: 5000000,
      outstanding: 10500000,
      aging: 0,
      status: "OUTSTANDING",
    },
    {
      id: 10,
      no_faktur: "010.000-26.00000010",
      no_billing: "BILL-2026-00010",
      customer: "PT Prima Sentosa",
      alamat: "Cikarang",
      sales: "Joko",
      tanggal_faktur: "2026-04-01",
      jatuh_tempo: "2026-05-01",
      total_piutang: 85000000,
      sudah_dibayar: 25000000,
      outstanding: 60000000,
      aging: 123,
      status: "OVERDUE",
    },
  ];


  // ===================================================
  // LOAD DATA
  // ===================================================

  useEffect(() => {

    loadData();

  }, [reloadData]);


  const loadData = async () => {

    setLoading(true);

    try {

      await new Promise(
        (resolve) =>
          setTimeout(resolve, 500)
      );

      setData(dummyData);

    } catch (error) {

      console.error(
        "Error load data piutang:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // ===================================================
  // FORMAT CURRENCY
  // ===================================================

  const formatCurrency = (
    value
  ) => {

    return new Intl.NumberFormat(
      "id-ID"
    ).format(
      Number(value || 0)
    );

  };


  // ===================================================
  // FORMAT DATE
  // ===================================================

  const formatDate = (
    value
  ) => {

    if (!value) {
      return "-";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return value;
    }

    return date.toLocaleDateString(
      "id-ID",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

  };


  // ===================================================
  // NORMALIZE DATE
  // ===================================================

  const normalizeDate = (
    value
  ) => {

    if (!value) {
      return null;
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return null;
    }

    date.setHours(
      0,
      0,
      0,
      0
    );

    return date;

  };


  // ===================================================
  // GET STATUS PIUTANG
  // ===================================================

  const getPiutangStatus = (
    item
  ) => {

    const outstanding =
      Number(
        item?.outstanding || 0
      );

    // Kalau sudah tidak ada outstanding
    // berarti Lunas
    if (
      outstanding <= 0
    ) {

      return "PAID";

    }


    const dueDate =
      normalizeDate(
        item?.jatuh_tempo
      );

    if (!dueDate) {

      return "OUTSTANDING";

    }


    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );


    const diffTime =
      dueDate.getTime() -
      today.getTime();

    const diffDays =
      Math.ceil(
        diffTime /
        (
          1000 *
          60 *
          60 *
          24
        )
      );


    // Sudah lewat jatuh tempo
    if (
      diffDays < 0
    ) {

      return "OVERDUE";

    }


    // Jatuh tempo hari ini
    if (
      diffDays === 0
    ) {

      return "OVERDUE";

    }


    // Segera jatuh tempo
    if (
      diffDays <=
      SOON_DUE_DAYS
    ) {

      return "DUE_SOON";

    }


    // Belum jatuh tempo
    return "NOT_DUE";

  };


  // ===================================================
  // GET STATUS LABEL
  // ===================================================

  const getStatusLabel = (
    item
  ) => {

    const status =
      getPiutangStatus(
        item
      );


    if (
      status === "PAID"
    ) {

      return "Lunas";

    }


    if (
      status === "NOT_DUE"
    ) {

      return "Outstanding / Belum Jatuh Tempo";

    }


    if (
      status === "DUE_SOON"
    ) {

      return "Outstanding / Segera Jatuh Tempo";

    }


    if (
      status === "OVERDUE"
    ) {

      return "Outstanding / Sudah Jatuh Tempo";

    }


    return "Outstanding";

  };


  // ===================================================
  // GET DAYS TO DUE
  // ===================================================

  const getDaysToDue = (
    item
  ) => {

    const dueDate =
      normalizeDate(
        item?.jatuh_tempo
      );

    if (!dueDate) {
      return null;
    }

    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const diffTime =
      dueDate.getTime() -
      today.getTime();

    return Math.ceil(
      diffTime /
      (
        1000 *
        60 *
        60 *
        24
      )
    );

  };


  // ===================================================
  // FILTER DATA
  // ===================================================

  const filteredData = useMemo(() => {

    let result = [
      ...data,
    ];


    // =================================================
    // SEARCH
    // =================================================

    if (
      search &&
      search.trim() !== ""
    ) {

      const keyword =
        search
          .toLowerCase()
          .trim();

      result =
        result.filter(
          (item) => {

            return (

              String(
                item.no_faktur || ""
              )
                .toLowerCase()
                .includes(keyword)

              ||

              String(
                item.no_billing || ""
              )
                .toLowerCase()
                .includes(keyword)

              ||

              String(
                item.customer || ""
              )
                .toLowerCase()
                .includes(keyword)

              ||

              String(
                item.sales || ""
              )
                .toLowerCase()
                .includes(keyword)

            );

          }
        );

    }


    // =================================================
    // STATUS
    // =================================================

    if (
      filterStatus !== "ALL"
    ) {

      result =
        result.filter(
          (item) =>
            getPiutangStatus(
              item
            ) ===
            filterStatus
        );

    }


    // =================================================
    // AGING
    // =================================================

    if (
      filterAging !== "ALL"
    ) {

      result =
        result.filter(
          (item) => {

            const aging =
              Number(
                item.aging || 0
              );


            if (
              filterAging ===
              "CURRENT"
            ) {

              return aging === 0;

            }


            if (
              filterAging ===
              "1-30"
            ) {

              return (
                aging >= 1 &&
                aging <= 30
              );

            }


            if (
              filterAging ===
              "31-60"
            ) {

              return (
                aging >= 31 &&
                aging <= 60
              );

            }


            if (
              filterAging ===
              "61-90"
            ) {

              return (
                aging >= 61 &&
                aging <= 90
              );

            }


            if (
              filterAging ===
              "90+"
            ) {

              return aging > 90;

            }


            return true;

          }
        );

    }


    return result;

  }, [
    data,
    search,
    filterStatus,
    filterAging,
  ]);


  // ===================================================
  // PAGINATION
  // ===================================================

  const totalData =
    filteredData.length;

  const totalPage =
    Math.ceil(
      totalData / limit
    ) || 1;


  const paginatedData =
    useMemo(() => {

      const start =
        (
          currentPage -
          1
        ) *
        limit;

      const end =
        start +
        limit;

      return filteredData.slice(
        start,
        end
      );

    }, [
      filteredData,
      currentPage,
      limit,
    ]);


  // ===================================================
  // RESET PAGE
  // ===================================================

  useEffect(() => {

    setCurrentPage(1);

  }, [
    search,
    filterStatus,
    filterAging,
    limit,
  ]);


  // ===================================================
  // SUMMARY
  // ===================================================

  const summary =
    useMemo(() => {

      return data.reduce(
        (
          result,
          item
        ) => {

          const totalPiutang =
            Number(
              item.total_piutang || 0
            );

          const sudahDibayar =
            Number(
              item.sudah_dibayar || 0
            );

          const outstanding =
            Number(
              item.outstanding || 0
            );

          const status =
            getPiutangStatus(
              item
            );


          // Total
          result.totalPiutang +=
            totalPiutang;


          // Sudah dibayar
          result.sudahDibayar +=
            sudahDibayar;


          // Outstanding
          result.outstanding +=
            outstanding;


          // Jumlah data
          result.totalData += 1;


          // Lunas
          if (
            status === "PAID"
          ) {

            result.paid += 1;

          }


          // Belum jatuh tempo
          if (
            status === "NOT_DUE"
          ) {

            result.notDue += 1;

            result.notDueAmount +=
              outstanding;

          }


          // Segera jatuh tempo
          if (
            status === "DUE_SOON"
          ) {

            result.dueSoon += 1;

            result.dueSoonAmount +=
              outstanding;

          }


          // Sudah jatuh tempo
          if (
            status === "OVERDUE"
          ) {

            result.overdue += 1;

            result.overdueAmount +=
              outstanding;

          }


          return result;

        },
        {
          totalPiutang: 0,
          sudahDibayar: 0,
          outstanding: 0,

          totalData: 0,

          paid: 0,

          notDue: 0,
          notDueAmount: 0,

          dueSoon: 0,
          dueSoonAmount: 0,

          overdue: 0,
          overdueAmount: 0,
        }
      );

    }, [data]);


  // ===================================================
  // DETAIL
  // ===================================================

  const handleDetail = (
    item
  ) => {

    setSelectedData(
      item
    );

    setShowDetail(
      true
    );

  };


  // ===================================================
  // EDIT
  // ===================================================

  const handleEdit = (
    item
  ) => {

    if (
      typeof navigation ===
      "function"
    ) {

      navigation(
        "/add-piutang",
        {
          state: {
            ...location?.state,
            project:
              "Edit Piutang",
            data:
              item,
          },
        }
      );

    }

  };


  // ===================================================
  // DELETE
  // ===================================================

  const handleDelete = (
    item
  ) => {

    const confirmed =
      window.confirm(
        `Apakah Anda yakin ingin menghapus piutang ${item.no_faktur}?`
      );

    if (!confirmed) {
      return;
    }

    setData(
      (prev) =>
        prev.filter(
          (dataItem) =>
            dataItem.id !==
            item.id
        )
    );

  };


  // ===================================================
  // REFRESH
  // ===================================================

  const handleRefresh = () => {

    setReloadData(
      (prev) =>
        !prev
    );

  };


  // ===================================================
  // STATUS BADGE
  // ===================================================

  const renderStatus = (
    item
  ) => {

    const status =
      getPiutangStatus(
        item
      );


    // =================================================
    // LUNAS
    // =================================================

    if (
      status === "PAID"
    ) {

      return (
        <span
          className="
            inline-flex
            items-center
            gap-1.5
            px-3
            py-1.5
            rounded-full
            text-xs
            font-semibold
            bg-green-100
            text-green-700
            whitespace-nowrap
          "
        >

          <FaCheckCircle />

          Lunas

        </span>
      );

    }


    // =================================================
    // BELUM JATUH TEMPO
    // =================================================

    if (
      status === "NOT_DUE"
    ) {

      return (
        <span
          className="
            inline-flex
            items-center
            gap-1.5
            px-3
            py-1.5
            rounded-full
            text-xs
            font-semibold
            bg-blue-100
            text-blue-700
            whitespace-nowrap
          "
        >

          <FaClock />

          Outstanding / Belum Jatuh Tempo

        </span>
      );

    }


    // =================================================
    // SEGERA JATUH TEMPO
    // =================================================

    if (
      status === "DUE_SOON"
    ) {

      const days =
        getDaysToDue(
          item
        );

      return (
        <span
          className="
            inline-flex
            items-center
            gap-1.5
            px-3
            py-1.5
            rounded-full
            text-xs
            font-semibold
            bg-yellow-100
            text-yellow-700
            whitespace-nowrap
          "
        >

          <FaClock />

          Outstanding / Segera Jatuh Tempo

          {days !== null && (
            <span>
              ({days} Hari)
            </span>
          )}

        </span>
      );

    }


    // =================================================
    // SUDAH JATUH TEMPO
    // =================================================

    if (
      status === "OVERDUE"
    ) {

      return (
        <span
          className="
            inline-flex
            items-center
            gap-1.5
            px-3
            py-1.5
            rounded-full
            text-xs
            font-semibold
            bg-red-100
            text-red-700
            whitespace-nowrap
          "
        >

          <FaExclamationCircle />

          Outstanding / Sudah Jatuh Tempo

        </span>
      );

    }


    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          px-3
          py-1.5
          rounded-full
          text-xs
          font-semibold
          bg-gray-100
          text-gray-600
        "
      >

        Outstanding

      </span>
    );

  };


  // ===================================================
  // AGING BADGE
  // ===================================================

  const renderAging = (
    aging
  ) => {

    const value =
      Number(
        aging || 0
      );


    if (
      value === 0
    ) {

      return (
        <span
          className="
            text-xs
            font-semibold
            text-green-600
          "
        >
          Current
        </span>
      );

    }


    if (
      value <= 30
    ) {

      return (
        <span
          className="
            text-xs
            font-semibold
            text-yellow-600
          "
        >
          {value} Hari
        </span>
      );

    }


    if (
      value <= 90
    ) {

      return (
        <span
          className="
            text-xs
            font-semibold
            text-orange-600
          "
        >
          {value} Hari
        </span>
      );

    }


    return (
      <span
        className="
          text-xs
          font-semibold
          text-red-600
        "
      >
        {value} Hari
      </span>
    );

  };


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <div
      className="
        w-full
      "
    >

      {/* ================================================= */}
      {/* SUMMARY */}
      {/* ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-6
          gap-4
          mb-5
        "
      >

        {/* ================================================= */}
        {/* TOTAL PIUTANG */}
        {/* ================================================= */}

        <div
          className="
            bg-blue-50
            border
            border-blue-100
            rounded-xl
            p-4
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-xs
                  text-gray-500
                  mb-1
                "
              >
                Total Piutang
              </p>

              <p
                className="
                  text-lg
                  font-bold
                  text-gray-800
                "
              >
                {formatCurrency(
                  summary.totalPiutang
                )}
              </p>

              <p
                className="
                  text-[10px]
                  text-blue-500
                  mt-1
                "
              >
                {summary.totalData} Data
              </p>

            </div>

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-blue-100
                text-blue-600
                flex
                items-center
                justify-center
                shrink-0
              "
            >

              <FaFileInvoiceDollar />

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* SUDAH DIBAYAR */}
        {/* ================================================= */}

        <div
          className="
            bg-green-50
            border
            border-green-100
            rounded-xl
            p-4
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-xs
                  text-gray-500
                  mb-1
                "
              >
                Sudah Dibayar
              </p>

              <p
                className="
                  text-lg
                  font-bold
                  text-gray-800
                "
              >
                {formatCurrency(
                  summary.sudahDibayar
                )}
              </p>

              <p
                className="
                  text-[10px]
                  text-green-500
                  mt-1
                "
              >
                {summary.paid} Data Lunas
              </p>

            </div>

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-green-100
                text-green-600
                flex
                items-center
                justify-center
                shrink-0
              "
            >

              <FaCheckCircle />

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* OUTSTANDING */}
        {/* ================================================= */}

        <div
          className="
            bg-purple-50
            border
            border-purple-100
            rounded-xl
            p-4
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-xs
                  text-gray-500
                  mb-1
                "
              >
                Outstanding
              </p>

              <p
                className="
                  text-lg
                  font-bold
                  text-gray-800
                "
              >
                {formatCurrency(
                  summary.outstanding
                )}
              </p>

              <p
                className="
                  text-[10px]
                  text-purple-500
                  mt-1
                "
              >
                Piutang Belum Lunas
              </p>

            </div>

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-purple-100
                text-purple-600
                flex
                items-center
                justify-center
                shrink-0
              "
            >

              <FaMoneyBillWave />

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* BELUM JATUH TEMPO */}
        {/* ================================================= */}

        <div
          className="
            bg-blue-50
            border
            border-blue-100
            rounded-xl
            p-4
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-xs
                  text-gray-500
                  mb-1
                "
              >
                Belum Jatuh Tempo
              </p>

              <p
                className="
                  text-lg
                  font-bold
                  text-gray-800
                "
              >
                {formatCurrency(
                  summary.notDueAmount
                )}
              </p>

              <p
                className="
                  text-[10px]
                  text-blue-500
                  mt-1
                "
              >
                {summary.notDue} Data
              </p>

            </div>

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-blue-100
                text-blue-600
                flex
                items-center
                justify-center
                shrink-0
              "
            >

              <FaClock />

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* SEGERA JATUH TEMPO */}
        {/* ================================================= */}

        <div
          className="
            bg-yellow-50
            border
            border-yellow-100
            rounded-xl
            p-4
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-xs
                  text-gray-500
                  mb-1
                "
              >
                Segera Jatuh Tempo
              </p>

              <p
                className="
                  text-lg
                  font-bold
                  text-gray-800
                "
              >
                {formatCurrency(
                  summary.dueSoonAmount
                )}
              </p>

              <p
                className="
                  text-[10px]
                  text-yellow-600
                  mt-1
                "
              >
                {summary.dueSoon} Data
              </p>

            </div>

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-yellow-100
                text-yellow-600
                flex
                items-center
                justify-center
                shrink-0
              "
            >

              <FaClock />

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* SUDAH JATUH TEMPO */}
        {/* ================================================= */}

        <div
          className="
            bg-red-50
            border
            border-red-100
            rounded-xl
            p-4
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-xs
                  text-gray-500
                  mb-1
                "
              >
                Sudah Jatuh Tempo
              </p>

              <p
                className="
                  text-lg
                  font-bold
                  text-gray-800
                "
              >
                {formatCurrency(
                  summary.overdueAmount
                )}
              </p>

              <p
                className="
                  text-[10px]
                  text-red-500
                  mt-1
                "
              >
                {summary.overdue} Data
              </p>

            </div>

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-red-100
                text-red-600
                flex
                items-center
                justify-center
                shrink-0
              "
            >

              <FaExclamationCircle />

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* TOOLBAR */}
      {/* ================================================= */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          gap-3
          justify-between
          mb-4
        "
      >

        {/* SEARCH */}

        <div
          className="
            relative
            w-full
            lg:max-w-md
          "
        >

          <FaSearch
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            value={
              search
            }
            onChange={
              (e) =>
                setSearch(
                  e.target.value
                )
            }
            placeholder="
              Cari No. Faktur, Billing,
              Customer atau Sales...
            "
            className="
              input
              input-bordered
              w-full
              pl-11
              rounded-full
              bg-white
            "
          />

        </div>


        {/* ACTION */}

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >

          <button
            type="button"
            onClick={
              () =>
                setShowFilter(
                  !showFilter
                )
            }
            className="
              btn
              rounded-full
              bg-white
              border
              border-gray-300
              text-gray-600
              gap-2
            "
          >

            <FaFilter />

            Filter

          </button>


          <button
            type="button"
            onClick={
              handleRefresh
            }
            className="
              btn
              rounded-full
              bg-white
              border
              border-gray-300
              text-gray-600
              gap-2
            "
          >

            <FaSyncAlt />

            Refresh

          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/* FILTER */}
      {/* ================================================= */}

      {showFilter && (

        <div
          className="
            bg-gray-50
            border
            border-gray-200
            rounded-xl
            p-4
            mb-4
          "
        >

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >

            {/* STATUS */}

            <div>

              <label
                className="
                  block
                  text-xs
                  font-semibold
                  text-gray-600
                  mb-2
                "
              >
                Status
              </label>

              <select
                value={
                  filterStatus
                }
                onChange={
                  (e) =>
                    setFilterStatus(
                      e.target.value
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

                <option value="ALL">
                  Semua Status
                </option>

                <option value="PAID">
                  Lunas
                </option>

                <option value="NOT_DUE">
                  Outstanding / Belum Jatuh Tempo
                </option>

                <option value="DUE_SOON">
                  Outstanding / Segera Jatuh Tempo
                </option>

                <option value="OVERDUE">
                  Outstanding / Sudah Jatuh Tempo
                </option>

              </select>

            </div>


            {/* AGING */}

            <div>

              <label
                className="
                  block
                  text-xs
                  font-semibold
                  text-gray-600
                  mb-2
                "
              >
                Aging
              </label>

              <select
                value={
                  filterAging
                }
                onChange={
                  (e) =>
                    setFilterAging(
                      e.target.value
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

                <option value="ALL">
                  Semua Aging
                </option>

                <option value="CURRENT">
                  Current
                </option>

                <option value="1-30">
                  1 - 30 Hari
                </option>

                <option value="31-60">
                  31 - 60 Hari
                </option>

                <option value="61-90">
                  61 - 90 Hari
                </option>

                <option value="90+">
                  Lebih dari 90 Hari
                </option>

              </select>

            </div>

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <div
        className="
          w-full
          overflow-x-auto
          border
          border-gray-200
          rounded-xl
        "
      >

        <table
          className="
            table
            table-zebra
            w-full
          "
        >

          <thead>

            <tr
              className="
                bg-gray-50
                text-gray-600
                text-xs
              "
            >

              <th
                className="
                  whitespace-nowrap
                "
              >
                No
              </th>

              <th
                className="
                  whitespace-nowrap
                "
              >
                No. Faktur
              </th>

              <th
                className="
                  whitespace-nowrap
                "
              >
                No. Billing
              </th>

              <th
                className="
                  whitespace-nowrap
                "
              >
                Customer
              </th>

              <th
                className="
                  whitespace-nowrap
                "
              >
                Sales
              </th>

              <th
                className="
                  whitespace-nowrap
                "
              >
                Tanggal Faktur
              </th>

              <th
                className="
                  whitespace-nowrap
                "
              >
                Jatuh Tempo
              </th>

              <th
                className="
                  whitespace-nowrap
                  text-right
                "
              >
                Total Piutang
              </th>

              <th
                className="
                  whitespace-nowrap
                  text-right
                "
              >
                Dibayar
              </th>

              <th
                className="
                  whitespace-nowrap
                  text-right
                "
              >
                Outstanding
              </th>

              <th
                className="
                  whitespace-nowrap
                  text-center
                "
              >
                Aging
              </th>

              <th
                className="
                  whitespace-nowrap
                  text-center
                "
              >
                Status
              </th>

              <th
                className="
                  whitespace-nowrap
                  text-center
                "
              >
                Aksi
              </th>

            </tr>

          </thead>


          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="13"
                  className="
                    text-center
                    py-10
                  "
                >

                  <span
                    className="
                      loading
                      loading-spinner
                      loading-md
                      text-primary
                    "
                  />

                  <p
                    className="
                      text-sm
                      text-gray-400
                      mt-2
                    "
                  >
                    Memuat data...
                  </p>

                </td>

              </tr>

            ) : paginatedData.length === 0 ? (

              <tr>

                <td
                  colSpan="13"
                  className="
                    text-center
                    py-10
                  "
                >

                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      text-gray-400
                    "
                  >

                    <FaFileInvoiceDollar
                      className="
                        text-4xl
                        mb-3
                      "
                    />

                    <p
                      className="
                        text-sm
                      "
                    >
                      Data piutang tidak ditemukan
                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              paginatedData.map(
                (
                  item,
                  index
                ) => {

                  const rowNumber =
                    (
                      (
                        currentPage -
                        1
                      ) *
                      limit
                    ) +
                    index +
                    1;

                  const piutangStatus =
                    getPiutangStatus(
                      item
                    );

                  return (

                    <tr
                      key={
                        item.id
                      }
                      className="
                        hover:bg-blue-50
                      "
                    >

                      {/* NO */}

                      <td
                        className="
                          text-xs
                          text-gray-500
                        "
                      >
                        {rowNumber}
                      </td>


                      {/* FAKTUR */}

                      <td>

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
                              rounded-lg
                              bg-blue-50
                              text-blue-600
                              flex
                              items-center
                              justify-center
                              shrink-0
                            "
                          >

                            <FaFileInvoiceDollar />

                          </div>

                          <div>

                            <p
                              className="
                                text-xs
                                font-semibold
                                text-gray-700
                                whitespace-nowrap
                              "
                            >
                              {
                                item.no_faktur
                              }
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* BILLING */}

                      <td>

                        <span
                          className="
                            text-xs
                            text-gray-600
                            whitespace-nowrap
                          "
                        >
                          {
                            item.no_billing
                          }
                        </span>

                      </td>


                      {/* CUSTOMER */}

                      <td>

                        <div
                          className="
                            min-w-[180px]
                          "
                        >

                          <p
                            className="
                              text-xs
                              font-semibold
                              text-gray-700
                            "
                          >
                            {
                              item.customer
                            }
                          </p>

                          <p
                            className="
                              text-[10px]
                              text-gray-400
                              mt-1
                            "
                          >
                            {
                              item.alamat
                            }
                          </p>

                        </div>

                      </td>


                      {/* SALES */}

                      <td>

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <FaUser
                            className="
                              text-gray-400
                            "
                          />

                          <span
                            className="
                              text-xs
                              text-gray-600
                              whitespace-nowrap
                            "
                          >
                            {
                              item.sales
                            }
                          </span>

                        </div>

                      </td>


                      {/* TANGGAL FAKTUR */}

                      <td>

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            whitespace-nowrap
                          "
                        >

                          <FaCalendarAlt
                            className="
                              text-gray-400
                            "
                          />

                          <span
                            className="
                              text-xs
                              text-gray-600
                            "
                          >
                            {
                              formatDate(
                                item.tanggal_faktur
                              )
                            }
                          </span>

                        </div>

                      </td>


                      {/* JATUH TEMPO */}

                      <td>

                        <div
                          className="
                            flex
                            flex-col
                            gap-1
                          "
                        >

                          <span
                            className="
                              text-xs
                              text-gray-600
                              whitespace-nowrap
                            "
                          >
                            {
                              formatDate(
                                item.jatuh_tempo
                              )
                            }
                          </span>


                          {/* Keterangan jatuh tempo */}

                          {piutangStatus ===
                            "NOT_DUE" && (

                            <span
                              className="
                                text-[10px]
                                text-blue-500
                                whitespace-nowrap
                              "
                            >
                              Belum jatuh tempo
                            </span>

                          )}


                          {piutangStatus ===
                            "DUE_SOON" && (

                            <span
                              className="
                                text-[10px]
                                text-yellow-600
                                font-semibold
                                whitespace-nowrap
                              "
                            >
                              Segera jatuh tempo
                            </span>

                          )}


                          {piutangStatus ===
                            "OVERDUE" && (

                            <span
                              className="
                                text-[10px]
                                text-red-500
                                font-semibold
                                whitespace-nowrap
                              "
                            >
                              Sudah jatuh tempo
                            </span>

                          )}

                        </div>

                      </td>


                      {/* TOTAL PIUTANG */}

                      <td
                        className="
                          text-right
                        "
                      >

                        <span
                          className="
                            text-xs
                            font-semibold
                            text-gray-700
                            whitespace-nowrap
                          "
                        >
                          {
                            formatCurrency(
                              item.total_piutang
                            )
                          }
                        </span>

                      </td>


                      {/* DIBAYAR */}

                      <td
                        className="
                          text-right
                        "
                      >

                        <span
                          className="
                            text-xs
                            text-green-600
                            font-semibold
                            whitespace-nowrap
                          "
                        >
                          {
                            formatCurrency(
                              item.sudah_dibayar
                            )
                          }
                        </span>

                      </td>


                      {/* OUTSTANDING */}

                      <td
                        className="
                          text-right
                        "
                      >

                        <span
                          className={`
                            text-xs
                            font-bold
                            whitespace-nowrap
                            ${
                              Number(
                                item.outstanding ||
                                0
                              ) > 0
                                ? "text-red-600"
                                : "text-green-600"
                            }
                          `}
                        >
                          {
                            formatCurrency(
                              item.outstanding
                            )
                          }
                        </span>

                      </td>


                      {/* AGING */}

                      <td
                        className="
                          text-center
                        "
                      >

                        {
                          renderAging(
                            item.aging
                          )
                        }

                      </td>


                      {/* STATUS */}

                      <td
                        className="
                          text-center
                        "
                      >

                        {
                          renderStatus(
                            item
                          )
                        }

                      </td>


                      {/* AKSI */}

                      <td>

                        <div
                          className="
                            flex
                            items-center
                            justify-center
                            gap-1
                          "
                        >

                          {/* DETAIL */}

                          <button
                            type="button"
                            onClick={
                              () =>
                                handleDetail(
                                  item
                                )
                            }
                            className="
                              btn
                              btn-sm
                              btn-circle
                              bg-blue-50
                              border-none
                              text-blue-600
                              hover:bg-blue-100
                            "
                            title="Detail"
                          >

                            <FaEye />

                          </button>


                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={
                              () =>
                                handleEdit(
                                  item
                                )
                            }
                            className="
                              btn
                              btn-sm
                              btn-circle
                              bg-yellow-50
                              border-none
                              text-yellow-600
                              hover:bg-yellow-100
                            "
                            title="Edit"
                          >

                            <FaEdit />

                          </button>


                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={
                              () =>
                                handleDelete(
                                  item
                                )
                            }
                            className="
                              btn
                              btn-sm
                              btn-circle
                              bg-red-50
                              border-none
                              text-red-600
                              hover:bg-red-100
                            "
                            title="Hapus"
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </td>

                    </tr>

                  );

                }
              )

            )}

          </tbody>

        </table>

      </div>


      {/* ================================================= */}
      {/* PAGINATION */}
      {/* ================================================= */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-3
          mt-4
        "
      >

        <div
          className="
            text-xs
            text-gray-500
          "
        >

          Menampilkan{" "}

          <span
            className="
              font-semibold
              text-gray-700
            "
          >
            {
              totalData === 0
                ? 0
                : (
                    (
                      currentPage -
                      1
                    ) *
                    limit
                  ) +
                  1
            }
          </span>

          {" "}-{" "}

          <span
            className="
              font-semibold
              text-gray-700
            "
          >
            {
              Math.min(
                currentPage *
                  limit,
                totalData
              )
            }
          </span>

          {" "}dari{" "}

          <span
            className="
              font-semibold
              text-gray-700
            "
          >
            {totalData}
          </span>

          {" "}data

        </div>


        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          {/* LIMIT */}

          <select
            value={
              limit
            }
            onChange={
              (e) =>
                setLimit(
                  Number(
                    e.target.value
                  )
                )
            }
            className="
              select
              select-bordered
              select-sm
              rounded-lg
            "
          >

            <option value={10}>
              10
            </option>

            <option value={25}>
              25
            </option>

            <option value={50}>
              50
            </option>

            <option value={100}>
              100
            </option>

          </select>


          {/* PREVIOUS */}

          <button
            type="button"
            disabled={
              currentPage <= 1
            }
            onClick={
              () =>
                setCurrentPage(
                  (prev) =>
                    Math.max(
                      prev - 1,
                      1
                    )
                )
            }
            className="
              btn
              btn-sm
              btn-circle
              bg-white
              border
              border-gray-300
              disabled:opacity-40
            "
          >

            <FaChevronLeft />

          </button>


          {/* PAGE */}

          <span
            className="
              text-xs
              font-semibold
              text-gray-600
              min-w-[70px]
              text-center
            "
          >

            {currentPage}

            {" / "}

            {totalPage}

          </span>


          {/* NEXT */}

          <button
            type="button"
            disabled={
              currentPage >=
              totalPage
            }
            onClick={
              () =>
                setCurrentPage(
                  (prev) =>
                    Math.min(
                      prev + 1,
                      totalPage
                    )
                )
            }
            className="
              btn
              btn-sm
              btn-circle
              bg-white
              border
              border-gray-300
              disabled:opacity-40
            "
          >

            <FaChevronRight />

          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/* DETAIL MODAL */}
      {/* ================================================= */}

      {showDetail &&
        selectedData && (

          <div
            className="
              fixed
              inset-0
              z-[9999]
              bg-black/50
              overflow-y-auto
              p-4
              flex
              items-center
              justify-center
            "
            onClick={
              () =>
                setShowDetail(
                  false
                )
            }
          >

            <div
              className="
                bg-white
                rounded-2xl
                shadow-2xl
                w-full
                max-w-3xl
                overflow-hidden
                my-8
              "
              onClick={
                (e) =>
                  e.stopPropagation()
              }
            >

              {/* HEADER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-6
                  py-4
                  border-b
                  border-gray-200
                "
              >

                <div>

                  <h2
                    className="
                      text-lg
                      font-bold
                      text-gray-800
                    "
                  >
                    Detail Piutang
                  </h2>

                  <p
                    className="
                      text-xs
                      text-gray-400
                      mt-1
                    "
                  >
                    {
                      selectedData.no_faktur
                    }
                  </p>

                </div>


                <button
                  type="button"
                  onClick={
                    () =>
                      setShowDetail(
                        false
                      )
                  }
                  className="
                    btn
                    btn-sm
                    btn-circle
                    bg-gray-100
                    border-none
                    text-gray-500
                  "
                >

                  <FaTimesCircle />

                </button>

              </div>


              {/* BODY */}

              <div
                className="
                  p-6
                  max-h-[70vh]
                  overflow-y-auto
                "
              >

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-4
                  "
                >

                  {/* NO FAKTUR */}

                  <div
                    className="
                      bg-gray-50
                      rounded-xl
                      p-4
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-gray-400
                        mb-1
                      "
                    >
                      No. Faktur
                    </p>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-gray-700
                      "
                    >
                      {
                        selectedData.no_faktur
                      }
                    </p>

                  </div>


                  {/* NO BILLING */}

                  <div
                    className="
                      bg-gray-50
                      rounded-xl
                      p-4
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-gray-400
                        mb-1
                      "
                    >
                      No. Billing
                    </p>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-gray-700
                      "
                    >
                      {
                        selectedData.no_billing
                      }
                    </p>

                  </div>


                  {/* CUSTOMER */}

                  <div
                    className="
                      bg-gray-50
                      rounded-xl
                      p-4
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-gray-400
                        mb-1
                      "
                    >
                      Customer
                    </p>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-gray-700
                      "
                    >
                      {
                        selectedData.customer
                      }
                    </p>

                  </div>


                  {/* SALES */}

                  <div
                    className="
                      bg-gray-50
                      rounded-xl
                      p-4
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-gray-400
                        mb-1
                      "
                    >
                      Sales
                    </p>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-gray-700
                      "
                    >
                      {
                        selectedData.sales
                      }
                    </p>

                  </div>


                  {/* TANGGAL */}

                  <div
                    className="
                      bg-gray-50
                      rounded-xl
                      p-4
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-gray-400
                        mb-1
                      "
                    >
                      Tanggal Faktur
                    </p>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-gray-700
                      "
                    >
                      {
                        formatDate(
                          selectedData.tanggal_faktur
                        )
                      }
                    </p>

                  </div>


                  {/* JATUH TEMPO */}

                  <div
                    className="
                      bg-gray-50
                      rounded-xl
                      p-4
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-gray-400
                        mb-1
                      "
                    >
                      Jatuh Tempo
                    </p>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-gray-700
                      "
                    >
                      {
                        formatDate(
                          selectedData.jatuh_tempo
                        )
                      }
                    </p>

                  </div>


                  {/* TOTAL */}

                  <div
                    className="
                      bg-blue-50
                      rounded-xl
                      p-4
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-gray-400
                        mb-1
                      "
                    >
                      Total Piutang
                    </p>

                    <p
                      className="
                        text-lg
                        font-bold
                        text-blue-600
                      "
                    >
                      {
                        formatCurrency(
                          selectedData.total_piutang
                        )
                      }
                    </p>

                  </div>


                  {/* DIBAYAR */}

                  <div
                    className="
                      bg-green-50
                      rounded-xl
                      p-4
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-gray-400
                        mb-1
                      "
                    >
                      Sudah Dibayar
                    </p>

                    <p
                      className="
                        text-lg
                        font-bold
                        text-green-600
                      "
                    >
                      {
                        formatCurrency(
                          selectedData.sudah_dibayar
                        )
                      }
                    </p>

                  </div>


                  {/* OUTSTANDING */}

                  <div
                    className="
                      bg-red-50
                      rounded-xl
                      p-4
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-gray-400
                        mb-1
                      "
                    >
                      Outstanding
                    </p>

                    <p
                      className="
                        text-lg
                        font-bold
                        text-red-600
                      "
                    >
                      {
                        formatCurrency(
                          selectedData.outstanding
                        )
                      }
                    </p>

                  </div>


                  {/* AGING */}

                  <div
                    className="
                      bg-yellow-50
                      rounded-xl
                      p-4
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-gray-400
                        mb-1
                      "
                    >
                      Aging
                    </p>

                    <p
                      className="
                        text-lg
                        font-bold
                        text-yellow-600
                      "
                    >
                      {
                        selectedData.aging
                      }
                      {" "}
                      Hari
                    </p>

                  </div>

                </div>


                {/* STATUS */}

                <div
                  className="
                    mt-4
                    p-4
                    rounded-xl
                    bg-gray-50
                  "
                >

                  <p
                    className="
                      text-xs
                      text-gray-400
                      mb-2
                    "
                  >
                    Status
                  </p>

                  {
                    renderStatus(
                      selectedData
                    )
                  }

                </div>


                {/* DETAIL JATUH TEMPO */}

                {getPiutangStatus(
                  selectedData
                ) === "DUE_SOON" && (

                  <div
                    className="
                      mt-4
                      p-4
                      rounded-xl
                      bg-yellow-50
                      border
                      border-yellow-100
                    "
                  >

                    <div
                      className="
                        flex
                        items-start
                        gap-3
                      "
                    >

                      <FaClock
                        className="
                          text-yellow-600
                          mt-0.5
                        "
                      />

                      <div>

                        <p
                          className="
                            text-xs
                            font-semibold
                            text-yellow-700
                          "
                        >
                          Perhatian
                        </p>

                        <p
                          className="
                            text-xs
                            text-yellow-600
                            mt-1
                          "
                        >
                          Piutang ini akan jatuh tempo dalam{" "}
                          <strong>
                            {
                              getDaysToDue(
                                selectedData
                              )
                            } hari
                          </strong>.
                        </p>

                      </div>

                    </div>

                  </div>

                )}


                {getPiutangStatus(
                  selectedData
                ) === "OVERDUE" && (

                  <div
                    className="
                      mt-4
                      p-4
                      rounded-xl
                      bg-red-50
                      border
                      border-red-100
                    "
                  >

                    <div
                      className="
                        flex
                        items-start
                        gap-3
                      "
                    >

                      <FaExclamationCircle
                        className="
                          text-red-600
                          mt-0.5
                        "
                      />

                      <div>

                        <p
                          className="
                            text-xs
                            font-semibold
                            text-red-700
                          "
                        >
                          Perhatian
                        </p>

                        <p
                          className="
                            text-xs
                            text-red-600
                            mt-1
                          "
                        >
                          Piutang ini sudah melewati
                          tanggal jatuh tempo.
                        </p>

                      </div>

                    </div>

                  </div>

                )}

              </div>


              {/* FOOTER */}

              <div
                className="
                  flex
                  justify-end
                  px-6
                  py-4
                  border-t
                  border-gray-200
                "
              >

                <button
                  type="button"
                  onClick={
                    () =>
                      setShowDetail(
                        false
                      )
                  }
                  className="
                    btn
                    rounded-full
                    bg-primary
                    text-white
                    px-6
                  "
                >
                  Tutup
                </button>

              </div>

            </div>

          </div>

        )}

    </div>

  );

};


export default TableDataPiutang;