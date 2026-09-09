import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaFileInvoiceDollar,
  FaBuilding,
  FaUser,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaEllipsisV,
  FaHashtag,
  FaInfoCircle,
  FaWhatsapp,
  FaEnvelope,
  FaEye,
  FaFileAlt,
  FaPaperPlane,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";

import {
  IoSearch,
} from "react-icons/io5";

import ReactPaginate
  from "react-paginate";


// =====================================================
// FORMAT DATE
// =====================================================

const formatDate = (
  date
) => {

  if (!date) {
    return "-";
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "-";
  }

  return parsedDate.toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

};


// =====================================================
// FORMAT CURRENCY
// =====================================================

const formatRupiah = (
  value
) => {

  if (
    value === null ||
    value === undefined
  ) {

    return "Rp0";

  }

  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }
  ).format(
    value
  );

};


// =====================================================
// STATUS CONFIG
// =====================================================

const statusConfig = {

  MENUNGGU_KONFIRMASI: {

    label:
      "Menunggu Konfirmasi",

    icon:
      FaClock,

    className:
      "bg-amber-100 text-amber-700",

  },


  DISETUJUI_CUSTOMER: {

    label:
      "Disetujui Customer",

    icon:
      FaCheckCircle,

    className:
      "bg-green-100 text-green-700",

  },


  DITOLAK_CUSTOMER: {

    label:
      "Ditolak Customer",

    icon:
      FaTimesCircle,

    className:
      "bg-red-100 text-red-700",

  },


  DISETUJUI_OTOMATIS: {

    label:
      "Disetujui Otomatis",

    icon:
      FaCheckCircle,

    className:
      "bg-blue-100 text-blue-700",

  },

};


// =====================================================
// DUMMY DATA
// =====================================================

const dummyData = [

  {
    id:
      1,

    no_faktur:
      "10000271521",

    no_billing:
      "BILL-202608-000001",

    customer_id:
      "CUST001",

    nama_customer:
      "Dinas Kesehatan Kota Medan",

    alamat:
      "Jl. Gatot Subroto No. 125, Medan",

    nama_penagih:
      "KFTD Medan",

    nominal_tagihan:
      140000000,

    posting_date:
      "2026-08-01",

    tanggal_kirim_konfirmasi:
      "2026-08-02",

    batas_konfirmasi:
      "2026-08-16",

    tanggal_konfirmasi:
      null,

    media_wa:
      true,

    media_email:
      true,

    no_wa_customer:
      "6281234567890",

    email_customer:
      "customer.medan@example.com",

    sales:
      "Andri Noviandy",

    status:
      "MENUNGGU_KONFIRMASI",

  },


  {
    id:
      2,

    no_faktur:
      "10000271522",

    no_billing:
      "BILL-202608-000002",

    customer_id:
      "CUST002",

    nama_customer:
      "Apotek Maju Djaya",

    alamat:
      "Jl. Sisingamangaraja No. 88, Medan",

    nama_penagih:
      "KFTD Medan",

    nominal_tagihan:
      85000000,

    posting_date:
      "2026-08-02",

    tanggal_kirim_konfirmasi:
      "2026-08-03",

    batas_konfirmasi:
      "2026-08-17",

    tanggal_konfirmasi:
      "2026-08-07",

    media_wa:
      true,

    media_email:
      true,

    no_wa_customer:
      "6281234567891",

    email_customer:
      "customer.maju@example.com",

    sales:
      "Budi Santoso",

    status:
      "DISETUJUI_CUSTOMER",

  },


  {
    id:
      3,

    no_faktur:
      "10000271523",

    no_billing:
      "BILL-202607-000003",

    customer_id:
      "CUST003",

    nama_customer:
      "Apotek Rusli",

    alamat:
      "Jl. Iskandar Muda No. 45, Medan",

    nama_penagih:
      "KFTD Medan",

    nominal_tagihan:
      140000000,

    posting_date:
      "2026-07-20",

    tanggal_kirim_konfirmasi:
      "2026-07-21",

    batas_konfirmasi:
      "2026-08-04",

    tanggal_konfirmasi:
      null,

    media_wa:
      true,

    media_email:
      true,

    no_wa_customer:
      "6281234567892",

    email_customer:
      "customer.rusli@example.com",

    sales:
      "Citra Lestari",

    status:
      "DISETUJUI_OTOMATIS",

  },


  {
    id:
      4,

    no_faktur:
      "10000271524",

    no_billing:
      "BILL-202608-000004",

    customer_id:
      "CUST004",

    nama_customer:
      "RSUD Pasuruan",

    alamat:
      "Jl. Wahidin Sudirohusodo No. 10, Pasuruan",

    nama_penagih:
      "KFTD Pasuruan",

    nominal_tagihan:
      175000000,

    posting_date:
      "2026-08-04",

    tanggal_kirim_konfirmasi:
      "2026-08-05",

    batas_konfirmasi:
      "2026-08-19",

    tanggal_konfirmasi:
      "2026-08-10",

    media_wa:
      true,

    media_email:
      true,

    no_wa_customer:
      "6281234567893",

    email_customer:
      "customer.pasuruan@example.com",

    sales:
      "Dimas Pratama",

    status:
      "DITOLAK_CUSTOMER",

  },


  {
    id:
      5,

    no_faktur:
      "10000271525",

    no_billing:
      "BILL-202608-000005",

    customer_id:
      "CUST005",

    nama_customer:
      "RS Hermina Medan",

    alamat:
      "Jl. Asrama No. 12, Medan",

    nama_penagih:
      "KFTD Medan",

    nominal_tagihan:
      95000000,

    posting_date:
      "2026-08-05",

    tanggal_kirim_konfirmasi:
      "2026-08-06",

    batas_konfirmasi:
      "2026-08-20",

    tanggal_konfirmasi:
      null,

    media_wa:
      true,

    media_email:
      true,

    no_wa_customer:
      "6281234567894",

    email_customer:
      "customer.hermina@example.com",

    sales:
      "Andri Noviandy",

    status:
      "MENUNGGU_KONFIRMASI",

  },


  {
    id:
      6,

    no_faktur:
      "10000271526",

    no_billing:
      "BILL-202608-000006",

    customer_id:
      "CUST006",

    nama_customer:
      "Apotek Sehat Sentosa",

    alamat:
      "Jl. Kelapa Gading Raya No. 21, Jakarta",

    nama_penagih:
      "KFTD Jakarta",

    nominal_tagihan:
      65000000,

    posting_date:
      "2026-08-06",

    tanggal_kirim_konfirmasi:
      "2026-08-07",

    batas_konfirmasi:
      "2026-08-21",

    tanggal_konfirmasi:
      null,

    media_wa:
      true,

    media_email:
      true,

    no_wa_customer:
      "6281234567895",

    email_customer:
      "customer.sehat@example.com",

    sales:
      "Budi Santoso",

    status:
      "MENUNGGU_KONFIRMASI",

  },


  {
    id:
      7,

    no_faktur:
      "10000271527",

    no_billing:
      "BILL-202608-000007",

    customer_id:
      "CUST007",

    nama_customer:
      "RSUP H. Adam Malik",

    alamat:
      "Jl. Bunga Lau No. 17, Medan",

    nama_penagih:
      "KFTD Medan",

    nominal_tagihan:
      225000000,

    posting_date:
      "2026-08-07",

    tanggal_kirim_konfirmasi:
      "2026-08-08",

    batas_konfirmasi:
      "2026-08-22",

    tanggal_konfirmasi:
      "2026-08-12",

    media_wa:
      true,

    media_email:
      true,

    no_wa_customer:
      "6281234567896",

    email_customer:
      "customer.adam@example.com",

    sales:
      "Citra Lestari",

    status:
      "DISETUJUI_CUSTOMER",

  },


  {
    id:
      8,

    no_faktur:
      "10000271528",

    no_billing:
      "BILL-202608-000008",

    customer_id:
      "CUST008",

    nama_customer:
      "Apotek Karya Sehat",

    alamat:
      "Jl. Pemuda No. 45, Jakarta",

    nama_penagih:
      "KFTD Jakarta",

    nominal_tagihan:
      72500000,

    posting_date:
      "2026-08-08",

    tanggal_kirim_konfirmasi:
      "2026-08-09",

    batas_konfirmasi:
      "2026-08-23",

    tanggal_konfirmasi:
      null,

    media_wa:
      true,

    media_email:
      true,

    no_wa_customer:
      "6281234567897",

    email_customer:
      "customer.karya@example.com",

    sales:
      "Dimas Pratama",

    status:
      "MENUNGGU_KONFIRMASI",

  },


  {
    id:
      9,

    no_faktur:
      "10000271529",

    no_billing:
      "BILL-202608-000009",

    customer_id:
      "CUST009",

    nama_customer:
      "Dinas Kesehatan Kota Bogor",

    alamat:
      "Jl. Pajajaran No. 21, Bogor",

    nama_penagih:
      "KFTD Bogor",

    nominal_tagihan:
      185000000,

    posting_date:
      "2026-08-09",

    tanggal_kirim_konfirmasi:
      "2026-08-10",

    batas_konfirmasi:
      "2026-08-24",

    tanggal_konfirmasi:
      "2026-08-15",

    media_wa:
      true,

    media_email:
      true,

    no_wa_customer:
      "6281234567898",

    email_customer:
      "customer.bogor@example.com",

    sales:
      "Dimas Pratama",

    status:
      "DITOLAK_CUSTOMER",

  },


  {
    id:
      10,

    no_faktur:
      "10000271530",

    no_billing:
      "BILL-202608-000010",

    customer_id:
      "CUST010",

    nama_customer:
      "RSUD Cibinong",

    alamat:
      "Jl. KSR Dadi Kusmayadi No. 27, Bogor",

    nama_penagih:
      "KFTD Bogor",

    nominal_tagihan:
      310000000,

    posting_date:
      "2026-08-10",

    tanggal_kirim_konfirmasi:
      "2026-08-11",

    batas_konfirmasi:
      "2026-08-25",

    tanggal_konfirmasi:
      null,

    media_wa:
      true,

    media_email:
      true,

    no_wa_customer:
      "6281234567899",

    email_customer:
      "customer.cibinong@example.com",

    sales:
      "Andri Noviandy",

    status:
      "MENUNGGU_KONFIRMASI",

  },

];


// =====================================================
// COMPONENT
// =====================================================

const TableListKonfirmasiPiutang = ({
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


  // ===================================================
  // TAMBAHAN STATE KIRIM KONFIRMASI
  // ===================================================

  const [
    showSendConfirmation,
    setShowSendConfirmation,
  ] = useState(
    false
  );


  const [
    sendData,
    setSendData,
  ] = useState(
    null
  );


  const [
    sendViaWhatsApp,
    setSendViaWhatsApp,
  ] = useState(
    true
  );


  const [
    sendViaEmail,
    setSendViaEmail,
  ] = useState(
    true
  );


  const [
    isSendingConfirmation,
    setIsSendingConfirmation,
  ] = useState(
    false
  );


  const [
    sendResult,
    setSendResult,
  ] = useState(
    null
  );


  // ===================================================
  // SUMMARY
  // ===================================================

  const summaryData =
    useMemo(
      () => {

        return {

          total:
            allData.length,

          menunggu:
            allData.filter(
              item =>
                item.status ===
                "MENUNGGU_KONFIRMASI"
            ).length,

          disetujui:
            allData.filter(
              item =>
                item.status ===
                "DISETUJUI_CUSTOMER"
            ).length,

          ditolak:
            allData.filter(
              item =>
                item.status ===
                "DITOLAK_CUSTOMER"
            ).length,

          otomatis:
            allData.filter(
              item =>
                item.status ===
                "DISETUJUI_OTOMATIS"
            ).length,

        };

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

                item.no_faktur
                  ?.toLowerCase()
                  .includes(
                    search
                  )

                ||

                item.no_billing
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

                item.nama_penagih
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

            );

        }


        return data;

      },
      [
        allData,
        selectedStatus,
        keyword,
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


  useEffect(
    () => {

      setCurrentPage(
        1
      );

    },
    [
      keyword,
      selectedStatus,
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
  // OPEN DETAIL
  // ===================================================

  const openDetail =
    (
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
  // CLOSE DETAIL
  // ===================================================

  const closeDetail =
    () => {

      setSelectedData(
        null
      );

      setShowDetail(
        false
      );

    };


  // ===================================================
  // OPEN SEND CONFIRMATION
  // ===================================================

  const openSendConfirmation =
    (
      item
    ) => {

      setSendData(
        item
      );

      setSendViaWhatsApp(
        item.media_wa === true
      );

      setSendViaEmail(
        item.media_email === true
      );

      setSendResult(
        null
      );

      setShowSendConfirmation(
        true
      );

    };


  // ===================================================
  // CLOSE SEND CONFIRMATION
  // ===================================================

  const closeSendConfirmation =
    () => {

      if (
        isSendingConfirmation
      ) {

        return;

      }

      setShowSendConfirmation(
        false
      );

      setSendData(
        null
      );

      setSendResult(
        null
      );

    };


  // ===================================================
  // SEND WHATSAPP
  // ===================================================

  const sendConfirmationWhatsApp =
    async (
      item
    ) => {

      console.log(
        "Kirim konfirmasi WhatsApp:",
        item
      );


      /*
       * =================================================
       * GANTI BAGIAN INI DENGAN API BACKEND ANDA
       * =================================================
       *
       * Contoh:
       *
       * const response = await fetch(
       *   "/api/piutang/kirim-konfirmasi-whatsapp",
       *   {
       *     method: "POST",
       *     headers: {
       *       "Content-Type": "application/json",
       *     },
       *     body: JSON.stringify({
       *       id: item.id,
       *       no_faktur: item.no_faktur,
       *       no_billing: item.no_billing,
       *       customer_id: item.customer_id,
       *       nama_customer: item.nama_customer,
       *       nomor_whatsapp: item.no_wa_customer,
       *       nominal_tagihan: item.nominal_tagihan,
       *     }),
       *   }
       * );
       *
       * if (!response.ok) {
       *   throw new Error(
       *     "Gagal mengirim WhatsApp"
       *   );
       * }
       *
       * return await response.json();
       */


      // SIMULASI API
      await new Promise(
        resolve =>
          setTimeout(
            resolve,
            1000
          )
      );


      return {
        success:
          true,

        message:
          "Konfirmasi berhasil dikirim melalui WhatsApp.",
      };

    };


  // ===================================================
  // SEND EMAIL
  // ===================================================

  const sendConfirmationEmail =
    async (
      item
    ) => {

      console.log(
        "Kirim konfirmasi Email:",
        item
      );


      /*
       * =================================================
       * GANTI BAGIAN INI DENGAN API BACKEND ANDA
       * =================================================
       *
       * Contoh:
       *
       * const response = await fetch(
       *   "/api/piutang/kirim-konfirmasi-email",
       *   {
       *     method: "POST",
       *     headers: {
       *       "Content-Type": "application/json",
       *     },
       *     body: JSON.stringify({
       *       id: item.id,
       *       no_faktur: item.no_faktur,
       *       no_billing: item.no_billing,
       *       customer_id: item.customer_id,
       *       nama_customer: item.nama_customer,
       *       email: item.email_customer,
       *       nominal_tagihan: item.nominal_tagihan,
       *     }),
       *   }
       * );
       *
       * if (!response.ok) {
       *   throw new Error(
       *     "Gagal mengirim Email"
       *   );
       * }
       *
       * return await response.json();
       */


      // SIMULASI API
      await new Promise(
        resolve =>
          setTimeout(
            resolve,
            1000
          )
      );


      return {
        success:
          true,

        message:
          "Konfirmasi berhasil dikirim melalui Email.",
      };

    };


  // ===================================================
  // SEND CONFIRMATION
  // ===================================================

  const handleSendConfirmation =
    (
      item
    ) => {

      console.log(
        "Kirim konfirmasi piutang:",
        item
      );


      openSendConfirmation(
        item
      );

    };


  // ===================================================
  // PROCESS SEND CONFIRMATION
  // ===================================================

  const processSendConfirmation =
    async () => {

      if (
        !sendData
      ) {

        return;

      }


      if (
        !sendViaWhatsApp &&
        !sendViaEmail
      ) {

        setSendResult({

          type:
            "error",

          message:
            "Silakan pilih minimal satu media pengiriman.",

        });

        return;

      }


      setIsSendingConfirmation(
        true
      );

      setSendResult(
        null
      );


      try {

        const results =
          [];


        // =============================================
        // WHATSAPP
        // =============================================

        if (
          sendViaWhatsApp
        ) {

          if (
            !sendData.no_wa_customer
          ) {

            throw new Error(
              "Nomor WhatsApp customer belum tersedia."
            );

          }


          const result =
            await sendConfirmationWhatsApp(
              sendData
            );


          results.push(
            {
              media:
                "WhatsApp",

              success:
                result?.success !== false,

              message:
                result?.message ||
                "Berhasil dikirim melalui WhatsApp.",
            }
          );

        }


        // =============================================
        // EMAIL
        // =============================================

        if (
          sendViaEmail
        ) {

          if (
            !sendData.email_customer
          ) {

            throw new Error(
              "Email customer belum tersedia."
            );

          }


          const result =
            await sendConfirmationEmail(
              sendData
            );


          results.push(
            {
              media:
                "Email",

              success:
                result?.success !== false,

              message:
                result?.message ||
                "Berhasil dikirim melalui Email.",
            }
          );

        }


        // =============================================
        // CEK HASIL
        // =============================================

        const failed =
          results.filter(
            item =>
              !item.success
          );


        if (
          failed.length > 0
        ) {

          throw new Error(
            failed
              .map(
                item =>
                  item.message
              )
              .join(
                ", "
              )
          );

        }


        // =============================================
        // TANGGAL KIRIM
        // =============================================

        const today =
          new Date();


        const tanggalKirim =
          today
            .toISOString()
            .split(
              "T"
            )[0];


        const batasKonfirmasi =
          new Date(
            today
          );


        batasKonfirmasi.setDate(
          batasKonfirmasi.getDate() +
          14
        );


        const batasKonfirmasiString =
          batasKonfirmasi
            .toISOString()
            .split(
              "T"
            )[0];


        // =============================================
        // UPDATE DATA TABLE
        // =============================================

        setAllData(
          prevData =>
            prevData.map(
              data => {

                if (
                  data.id !==
                  sendData.id
                ) {

                  return data;

                }


                return {

                  ...data,

                  tanggal_kirim_konfirmasi:
                    tanggalKirim,

                  batas_konfirmasi:
                    batasKonfirmasiString,

                  media_wa:
                    sendViaWhatsApp
                      ? true
                      : data.media_wa,

                  media_email:
                    sendViaEmail
                      ? true
                      : data.media_email,

                  status:
                    "MENUNGGU_KONFIRMASI",

                };

              }
            )
        );


        // =============================================
        // UPDATE SELECTED DATA
        // =============================================

        setSelectedData(
          prev => {

            if (
              !prev ||
              prev.id !==
              sendData.id
            ) {

              return prev;

            }


            return {

              ...prev,

              tanggal_kirim_konfirmasi:
                tanggalKirim,

              batas_konfirmasi:
                batasKonfirmasiString,

              status:
                "MENUNGGU_KONFIRMASI",

            };

          }
        );


        setSendResult({

          type:
            "success",

          message:
            `Konfirmasi berhasil dikirim melalui ${results
              .map(
                item =>
                  item.media
              )
              .join(
                " dan "
              )
            }. Batas konfirmasi sampai ${formatDate(
              batasKonfirmasiString
            )}.`,

        });


      } catch (
      error
      ) {

        console.error(
          "Error kirim konfirmasi:",
          error
        );


        setSendResult({

          type:
            "error",

          message:
            error?.message ||
            "Terjadi kesalahan saat mengirim konfirmasi.",

        });

      } finally {

        setIsSendingConfirmation(
          false
        );

      }

    };


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
        "Status",

      icon:
        <FaInfoCircle />,
    },

    {
      label:
        "No",

      icon:
        <FaHashtag />,
    },

    {
      label:
        "No. Faktur",

      icon:
        <FaFileInvoiceDollar />,
    },

    {
      label:
        "No. Billing",

      icon:
        <FaFileAlt />,
    },

    {
      label:
        "Customer",

      icon:
        <FaBuilding />,
    },

    {
      label:
        "Penagih",

      icon:
        <FaUser />,
    },

    {
      label:
        "Nominal Piutang",

      icon:
        <FaMoneyBillWave />,
    },

    {
      label:
        "Posting Date",

      icon:
        <FaCalendarAlt />,
    },

    {
      label:
        "Batas Konfirmasi",

      icon:
        <FaClock />,
    },

    {
      label:
        "Sales",

      icon:
        <FaUser />,
    }

  ];


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
      {/* SEARCH & FILTER */}
      {/* ================================================= */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          gap-4
          justify-between
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
              Cari faktur / billing / customer / penagih...
            "
            className="
              grow
            "
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


        {/* STATUS */}

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
              text-gray-500
            "
          >
            Status:
          </span>


          <select
            className="
              select
              select-sm
              select-bordered
              rounded-full
              bg-white
              min-w-[220px]
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

            <option value="MENUNGGU_KONFIRMASI">
              Menunggu Konfirmasi
            </option>

            <option value="DISETUJUI_CUSTOMER">
              Disetujui Customer
            </option>

            <option value="DITOLAK_CUSTOMER">
              Ditolak Customer
            </option>

            <option value="DISETUJUI_OTOMATIS">
              Disetujui Otomatis
            </option>

          </select>

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
            p-4
            border
            border-blue-100
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
                Total Konfirmasi
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

              <FaFileInvoiceDollar
                className="
                  text-blue-600
                "
              />

            </div>

          </div>

        </div>


        {/* WAITING */}

        <div
          className="
            rounded-2xl
            bg-amber-50
            p-4
            border
            border-amber-100
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
                  text-amber-700
                "
              >
                Menunggu Konfirmasi
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-amber-900
                "
              >
                {
                  summaryData.menunggu
                }
              </p>

            </div>


            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-amber-100
                flex
                items-center
                justify-center
              "
            >

              <FaClock
                className="
                  text-amber-600
                "
              />

            </div>

          </div>

        </div>


        {/* APPROVED */}

        <div
          className="
            rounded-2xl
            bg-green-50
            p-4
            border
            border-green-100
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
                Disetujui
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-green-900
                "
              >
                {
                  summaryData.disetujui
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


        {/* AUTO */}

        <div
          className="
            rounded-2xl
            bg-indigo-50
            p-4
            border
            border-indigo-100
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
                  text-indigo-700
                "
              >
                Otomatis 14 Hari
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  text-indigo-900
                "
              >
                {
                  summaryData.otomatis
                }
              </p>

            </div>


            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-indigo-100
                flex
                items-center
                justify-center
              "
            >

              <FaClock
                className="
                  text-indigo-600
                "
              />

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* INFO */}
      {/* ================================================= */}

      <div
        className="
          flex
          items-start
          gap-3
          bg-blue-50
          border
          border-blue-200
          rounded-xl
          px-4
          py-3
        "
      >

        <FaInfoCircle
          className="
            text-blue-500
            mt-0.5
          "
        />


        <div>

          <p
            className="
              text-sm
              font-semibold
              text-blue-900
            "
          >
            Ketentuan Konfirmasi Piutang
          </p>


          <p
            className="
              text-xs
              text-blue-700
              mt-1
            "
          >
            Customer menerima permintaan konfirmasi melalui
            WhatsApp dan email. Apabila tidak memberikan
            tanggapan dalam waktu 14 hari kalender sejak
            konfirmasi dikirim, faktur akan dianggap telah
            disetujui sebagai piutang.
          </p>

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
                        i
                      ) => (

                        <th
                          key={
                            i
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

                            <span>
                              {
                                h.icon
                              }
                            </span>

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
                    0
                    ? (

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

                          <FaFileInvoiceDollar
                            className="
                              text-4xl
                              text-gray-300
                              mx-auto
                              mb-3
                            "
                          />

                          Tidak ada data konfirmasi piutang

                        </td>

                      </tr>

                    )
                    : (

                      paginatedData.map(
                        (
                          v,
                          i
                        ) => (

                          <tr
                            key={
                              v.id
                            }
                            className="
                              hover:bg-blue-50
                              transition
                              duration-200
                              border-b
                            "
                          >

                            {/* AKSI */}

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

                                {
                                  v.status ===
                                    "MENUNGGU_KONFIRMASI"
                                    ? (

                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleSendConfirmation(
                                            v
                                          )
                                        }
                                        className="
                                          inline-flex
                                          items-center
                                          gap-2
                                          px-4
                                          py-2
                                          rounded-full
                                          bg-primary
                                          text-white
                                          text-xs
                                          font-semibold
                                          hover:opacity-90
                                          transition
                                          shadow-sm
                                        "
                                      >

                                        <FaWhatsapp />

                                        Kirim Konfirmasi

                                      </button>

                                    )
                                    : (

                                      <button
                                        type="button"
                                        onClick={() =>
                                          openDetail(
                                            v
                                          )
                                        }
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
                                          text-xs
                                          font-semibold
                                          hover:bg-gray-50
                                        "
                                      >

                                        <FaEye />

                                        Detail

                                      </button>

                                    )
                                }

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
                                  v.status
                                )
                              }

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
                                i +
                                1
                              }

                            </td>


                            {/* NO FAKTUR */}

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
                                    w-9
                                    h-9
                                    rounded-lg
                                    bg-blue-50
                                    flex
                                    items-center
                                    justify-center
                                  "
                                >

                                  <FaFileInvoiceDollar
                                    className="
                                      text-primary
                                    "
                                  />

                                </div>


                                <div>

                                  <span
                                    className="
                                      font-semibold
                                      text-primary
                                    "
                                  >
                                    {
                                      v.no_faktur
                                    }
                                  </span>


                                  <p
                                    className="
                                      text-xs
                                      text-gray-400
                                    "
                                  >
                                    ID:
                                    {" "}
                                    {
                                      v.customer_id
                                    }
                                  </p>

                                </div>

                              </div>

                            </td>


                            {/* NO BILLING */}

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
                                    w-9
                                    h-9
                                    rounded-lg
                                    bg-orange-50
                                    flex
                                    items-center
                                    justify-center
                                  "
                                >

                                  <FaFileAlt
                                    className="
                                      text-orange-500
                                    "
                                  />

                                </div>


                                <div>

                                  <span
                                    className="
                                      font-semibold
                                      text-gray-700
                                    "
                                  >
                                    {
                                      v.no_billing ||
                                      "-"
                                    }
                                  </span>


                                  <p
                                    className="
                                      text-xs
                                      text-gray-400
                                    "
                                  >
                                    Nomor Billing
                                  </p>

                                </div>

                              </div>

                            </td>


                            {/* CUSTOMER */}

                            <td
                              className="
                                px-4
                                py-3
                              "
                            >

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-3
                                  min-w-[250px]
                                "
                              >

                                <div
                                  className="
                                    w-9
                                    h-9
                                    rounded-full
                                    bg-blue-50
                                    text-primary
                                    flex
                                    items-center
                                    justify-center
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
                                      v.nama_customer
                                    }
                                  </p>


                                  <p
                                    className="
                                      text-xs
                                      text-gray-400
                                    "
                                  >
                                    {
                                      v.alamat
                                    }
                                  </p>

                                </div>

                              </div>

                            </td>


                            {/* PENAGIH */}

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
                                    v.nama_penagih
                                  }
                                </span>

                              </div>

                            </td>


                            {/* NOMINAL PIUTANG */}

                            <td
                              className="
                                px-4
                                py-3
                                whitespace-nowrap
                              "
                            >

                              <span
                                className="
                                  font-bold
                                  text-gray-700
                                "
                              >
                                {
                                  formatRupiah(
                                    v.nominal_tagihan
                                  )
                                }
                              </span>

                            </td>


                            {/* POSTING DATE */}

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
                                  text-sm
                                  text-gray-600
                                "
                              >

                                <FaCalendarAlt
                                  className="
                                    text-primary
                                  "
                                />

                                {
                                  formatDate(
                                    v.posting_date
                                  )
                                }

                              </div>

                            </td>


                            {/* BATAS KONFIRMASI */}

                            <td
                              className="
                                px-4
                                py-3
                                whitespace-nowrap
                              "
                            >

                              <div>

                                <div
                                  className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                  "
                                >

                                  <FaClock
                                    className="
                                      text-amber-500
                                    "
                                  />

                                  {
                                    formatDate(
                                      v.batas_konfirmasi
                                    )
                                  }

                                </div>


                                <p
                                  className="
                                    text-[11px]
                                    text-gray-400
                                    mt-1
                                  "
                                >
                                  14 hari sejak pengiriman
                                </p>

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
                                    bg-blue-50
                                    flex
                                    items-center
                                    justify-center
                                  "
                                >

                                  <FaUser
                                    className="
                                      text-blue-500
                                    "
                                  />

                                </div>


                                <span
                                  className="
                                    text-sm
                                    text-gray-700
                                    font-medium
                                  "
                                >
                                  {
                                    v.sales
                                  }
                                </span>

                              </div>

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
          {/* FOOTER TABLE */}
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
                      px-3
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
            onClick={
              closeDetail
            }
          >

            <div
              className="
                bg-white
                rounded-2xl
                shadow-2xl
                w-full
                max-w-4xl
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
                  sticky
                  top-0
                  z-10
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
                        bg-white/15
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <FaFileInvoiceDollar />

                    </div>


                    <div>

                      <h3
                        className="
                          font-bold
                          text-lg
                        "
                      >
                        Detail Konfirmasi Piutang
                      </h3>


                      <p
                        className="
                          text-xs
                          text-blue-100
                        "
                      >
                        {
                          selectedData.no_faktur
                        }
                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    onClick={
                      closeDetail
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

                    <FaTimesCircle />

                  </button>

                </div>

              </div>


              {/* BODY */}

              <div
                className="
                  p-6
                  flex
                  flex-col
                  gap-5
                "
              >

                {/* STATUS */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    flex-wrap
                    gap-3
                  "
                >

                  {
                    renderStatus(
                      selectedData.status
                    )
                  }


                  <div
                    className="
                      text-sm
                      text-gray-500
                    "
                  >

                    Batas konfirmasi:
                    {" "}

                    <span
                      className="
                        font-semibold
                        text-gray-700
                      "
                    >
                      {
                        formatDate(
                          selectedData.batas_konfirmasi
                        )
                      }
                    </span>

                  </div>

                </div>


                {/* DETAIL GRID */}

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
                        gap-3
                      "
                    >

                      <div
                        className="
                          w-10
                          h-10
                          rounded-lg
                          bg-white
                          text-primary
                          flex
                          items-center
                          justify-center
                        "
                      >

                        <FaFileInvoiceDollar />

                      </div>


                      <div>

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
                            font-bold
                            text-primary
                          "
                        >
                          {
                            selectedData.no_faktur
                          }
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* NO BILLING */}

                  <div
                    className="
                      bg-orange-50
                      border
                      border-orange-100
                      rounded-xl
                      p-4
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
                          rounded-lg
                          bg-white
                          text-orange-500
                          flex
                          items-center
                          justify-center
                        "
                      >

                        <FaFileAlt />

                      </div>


                      <div>

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
                            font-bold
                            text-gray-700
                          "
                        >
                          {
                            selectedData.no_billing ||
                            "-"
                          }
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* CUSTOMER */}

                  <div
                    className="
                      bg-gray-50
                      border
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
                        font-bold
                        text-gray-700
                      "
                    >
                      {
                        selectedData.nama_customer
                      }
                    </p>


                    <p
                      className="
                        text-xs
                        text-gray-500
                        mt-1
                      "
                    >
                      {
                        selectedData.alamat
                      }
                    </p>

                  </div>


                  {/* NOMINAL */}

                  <div
                    className="
                      bg-gray-50
                      border
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
                      Nominal Piutang
                    </p>


                    <p
                      className="
                        text-xl
                        font-bold
                        text-primary
                      "
                    >
                      {
                        formatRupiah(
                          selectedData.nominal_tagihan
                        )
                      }
                    </p>

                  </div>


                  {/* PENAGIH */}

                  <div
                    className="
                      bg-gray-50
                      border
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
                      Penagih
                    </p>


                    <p
                      className="
                        font-semibold
                        text-gray-700
                      "
                    >
                      {
                        selectedData.nama_penagih
                      }
                    </p>

                  </div>


                  {/* SALES */}

                  <div
                    className="
                      bg-gray-50
                      border
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
                        font-semibold
                        text-gray-700
                      "
                    >
                      {
                        selectedData.sales
                      }
                    </p>

                  </div>


                  {/* POSTING DATE */}

                  <div
                    className="
                      bg-gray-50
                      border
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
                      Posting Date
                    </p>


                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <FaCalendarAlt
                        className="
                          text-primary
                        "
                      />

                      <p
                        className="
                          font-semibold
                          text-gray-700
                        "
                      >
                        {
                          formatDate(
                            selectedData.posting_date
                          )
                        }
                      </p>

                    </div>

                  </div>


                  {/* BATAS KONFIRMASI */}

                  <div
                    className="
                      bg-amber-50
                      border
                      border-amber-100
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
                      Batas Konfirmasi
                    </p>


                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <FaClock
                        className="
                          text-amber-500
                        "
                      />

                      <p
                        className="
                          font-semibold
                          text-gray-700
                        "
                      >
                        {
                          formatDate(
                            selectedData.batas_konfirmasi
                          )
                        }
                      </p>

                    </div>

                  </div>

                </div>


                {/* MEDIA KONFIRMASI */}

                <div
                  className="
                    bg-blue-50
                    border
                    border-blue-100
                    rounded-xl
                    p-4
                  "
                >

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-blue-900
                      mb-3
                    "
                  >
                    Media Konfirmasi
                  </p>


                  <div
                    className="
                      flex
                      flex-wrap
                      gap-3
                    "
                  >

                    {
                      selectedData.media_wa &&
                      (

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            bg-white
                            rounded-full
                            border
                            border-green-200
                            text-green-700
                            text-sm
                            font-semibold
                          "
                        >

                          <FaWhatsapp />

                          WhatsApp

                        </span>

                      )
                    }


                    {
                      selectedData.media_email &&
                      (

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            bg-white
                            rounded-full
                            border
                            border-blue-200
                            text-blue-700
                            text-sm
                            font-semibold
                          "
                        >

                          <FaEnvelope />

                          Email

                        </span>

                      )
                    }

                  </div>

                </div>


                {/* INFO 14 HARI */}

                <div
                  className="
                    flex
                    items-start
                    gap-3
                    bg-amber-50
                    border
                    border-amber-200
                    rounded-xl
                    p-4
                  "
                >

                  <FaClock
                    className="
                      text-amber-500
                      mt-0.5
                    "
                  />


                  <div>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-amber-800
                      "
                    >
                      Ketentuan 14 Hari
                    </p>


                    <p
                      className="
                        text-xs
                        text-amber-700
                        mt-1
                      "
                    >
                      Apabila customer tidak memberikan
                      tanggapan sampai dengan{" "}
                      <b>
                        {
                          formatDate(
                            selectedData.batas_konfirmasi
                          )
                        }
                      </b>
                      , sistem dapat menetapkan faktur
                      sebagai piutang yang telah disetujui
                      secara otomatis.
                    </p>

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
                  gap-3
                "
              >

                {
                  selectedData.status ===
                  "MENUNGGU_KONFIRMASI" &&
                  (

                    <button
                      type="button"
                      onClick={() =>
                        handleSendConfirmation(
                          selectedData
                        )
                      }
                      className="
                        px-5
                        py-2.5
                        rounded-full
                        bg-primary
                        text-white
                        text-sm
                        font-semibold
                        hover:opacity-90
                        inline-flex
                        items-center
                        gap-2
                      "
                    >

                      <FaPaperPlane />

                      Kirim Ulang Konfirmasi

                    </button>

                  )
                }


                <button
                  type="button"
                  onClick={
                    closeDetail
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

                  Tutup

                </button>

              </div>

            </div>

          </div>

        )

      }


      {/* ================================================= */}
      {/* SEND CONFIRMATION MODAL */}
      {/* ================================================= */}

      {
        showSendConfirmation &&
        sendData && (

          <div
            className="
    fixed
    inset-0
    z-[9999]
    bg-black/50
    flex
    items-center
    justify-center
    p-4
    overflow-hidden
  "
            onClick={closeSendConfirmation}
          >

            <div
              className="
      bg-white
      rounded-2xl
      shadow-2xl
      w-full
      max-w-lg
      max-h-[calc(100vh-2rem)]
      flex
      flex-col
      overflow-hidden
    "
              onClick={
                e =>
                  e.stopPropagation()
              }
            >

              {/* ========================================= */}
              {/* HEADER */}
              {/* ========================================= */}

              <div
                className="
        bg-primary
        px-6
        py-5
        text-white
        shrink-0
      "
              >

                <div
                  className="
          flex
          items-center
          justify-between
          gap-3
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
              w-11
              h-11
              rounded-xl
              bg-white/15
              flex
              items-center
              justify-center
            "
                    >

                      <FaPaperPlane />

                    </div>


                    <div>

                      <h3
                        className="
                text-lg
                font-bold
              "
                      >
                        Kirim Konfirmasi Piutang
                      </h3>


                      <p
                        className="
                text-xs
                text-blue-100
                mt-0.5
              "
                      >
                        Pilih media pengiriman ke customer
                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    disabled={
                      isSendingConfirmation
                    }
                    onClick={
                      closeSendConfirmation
                    }
                    className="
            w-9
            h-9
            rounded-full
            flex
            items-center
            justify-center
            hover:bg-white/10
            disabled:opacity-50
            shrink-0
          "
                  >

                    <FaTimes />

                  </button>

                </div>

              </div>


              {/* ========================================= */}
              {/* BODY - SCROLL */}
              {/* ========================================= */}

              <div
                className="
        flex-1
        min-h-0
        overflow-y-auto
        p-6
        flex
        flex-col
        gap-5
      "
              >

                {/* ======================================= */}
                {/* CUSTOMER INFO */}
                {/* ======================================= */}

                <div
                  className="
          bg-gray-50
          border
          border-gray-200
          rounded-xl
          p-4
        "
                >

                  <div
                    className="
            flex
            items-start
            gap-3
          "
                  >

                    <div
                      className="
              w-10
              h-10
              rounded-lg
              bg-blue-100
              text-primary
              flex
              items-center
              justify-center
              shrink-0
            "
                    >

                      <FaBuilding />

                    </div>


                    <div
                      className="
              min-w-0
            "
                    >

                      <p
                        className="
                text-sm
                font-bold
                text-gray-800
              "
                      >
                        {
                          sendData.nama_customer
                        }
                      </p>


                      <p
                        className="
                text-xs
                text-gray-500
                mt-1
              "
                      >
                        {
                          sendData.alamat
                        }
                      </p>

                    </div>

                  </div>

                </div>


                {/* ======================================= */}
                {/* DETAIL TAGIHAN */}
                {/* ======================================= */}

                <div
                  className="
          grid
          grid-cols-2
          gap-3
        "
                >

                  <div
                    className="
            border
            border-blue-100
            bg-blue-50
            rounded-xl
            p-3
          "
                  >

                    <p
                      className="
              text-[11px]
              text-gray-500
            "
                    >
                      No. Faktur
                    </p>


                    <p
                      className="
              text-sm
              font-bold
              text-primary
              mt-1
            "
                    >
                      {
                        sendData.no_faktur
                      }
                    </p>

                  </div>


                  <div
                    className="
            border
            border-orange-100
            bg-orange-50
            rounded-xl
            p-3
          "
                  >

                    <p
                      className="
              text-[11px]
              text-gray-500
            "
                    >
                      No. Billing
                    </p>


                    <p
                      className="
              text-sm
              font-bold
              text-gray-700
              mt-1
            "
                    >
                      {
                        sendData.no_billing ||
                        "-"
                      }
                    </p>

                  </div>


                  <div
                    className="
            col-span-2
            border
            border-gray-200
            bg-white
            rounded-xl
            p-3
          "
                  >

                    <p
                      className="
              text-[11px]
              text-gray-500
            "
                    >
                      Nominal Piutang
                    </p>


                    <p
                      className="
              text-lg
              font-bold
              text-gray-800
              mt-1
            "
                    >
                      {
                        formatRupiah(
                          sendData.nominal_tagihan
                        )
                      }
                    </p>

                  </div>

                </div>


                {/* ======================================= */}
                {/* MEDIA */}
                {/* ======================================= */}

                <div>

                  <p
                    className="
            text-sm
            font-bold
            text-gray-700
            mb-3
          "
                  >
                    Kirim melalui
                  </p>


                  <div
                    className="
            flex
            flex-col
            gap-3
          "
                  >

                    {/* WHATSAPP */}

                    {
                      sendData.media_wa && (

                        <label
                          className={`
                  flex
                  items-center
                  justify-between
                  gap-3
                  border
                  rounded-xl
                  p-4
                  cursor-pointer
                  transition
                  ${sendViaWhatsApp
                              ? "border-green-300 bg-green-50"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                            }
                `}
                        >

                          <div
                            className="
                    flex
                    items-center
                    gap-3
                    min-w-0
                  "
                          >

                            <div
                              className="
                      w-11
                      h-11
                      rounded-xl
                      bg-green-100
                      text-green-600
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                            >

                              <FaWhatsapp
                                className="
                        text-xl
                      "
                              />

                            </div>


                            <div
                              className="
                      min-w-0
                    "
                            >

                              <p
                                className="
                        text-sm
                        font-bold
                        text-gray-800
                      "
                              >
                                WhatsApp
                              </p>


                              <p
                                className="
                        text-xs
                        text-gray-500
                        truncate
                      "
                              >
                                {
                                  sendData.no_wa_customer ||
                                  "Nomor belum tersedia"
                                }
                              </p>

                            </div>

                          </div>


                          <input
                            type="checkbox"
                            className="
                    checkbox
                    checkbox-success
                  "
                            checked={
                              sendViaWhatsApp
                            }
                            onChange={
                              e =>
                                setSendViaWhatsApp(
                                  e.target.checked
                                )
                            }
                            disabled={
                              isSendingConfirmation
                            }
                          />

                        </label>

                      )
                    }


                    {/* EMAIL */}

                    {
                      sendData.media_email && (

                        <label
                          className={`
                  flex
                  items-center
                  justify-between
                  gap-3
                  border
                  rounded-xl
                  p-4
                  cursor-pointer
                  transition
                  ${sendViaEmail
                              ? "border-blue-300 bg-blue-50"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                            }
                `}
                        >

                          <div
                            className="
                    flex
                    items-center
                    gap-3
                    min-w-0
                  "
                          >

                            <div
                              className="
                      w-11
                      h-11
                      rounded-xl
                      bg-blue-100
                      text-blue-600
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                            >

                              <FaEnvelope
                                className="
                        text-xl
                      "
                              />

                            </div>


                            <div
                              className="
                      min-w-0
                    "
                            >

                              <p
                                className="
                        text-sm
                        font-bold
                        text-gray-800
                      "
                              >
                                Email
                              </p>


                              <p
                                className="
                        text-xs
                        text-gray-500
                        truncate
                      "
                              >
                                {
                                  sendData.email_customer ||
                                  "Email belum tersedia"
                                }
                              </p>

                            </div>

                          </div>


                          <input
                            type="checkbox"
                            className="
                    checkbox
                    checkbox-primary
                  "
                            checked={
                              sendViaEmail
                            }
                            onChange={
                              e =>
                                setSendViaEmail(
                                  e.target.checked
                                )
                            }
                            disabled={
                              isSendingConfirmation
                            }
                          />

                        </label>

                      )
                    }

                  </div>

                </div>


                {/* ======================================= */}
                {/* INFO */}
                {/* ======================================= */}

                <div
                  className="
          flex
          items-start
          gap-3
          bg-amber-50
          border
          border-amber-200
          rounded-xl
          p-3
        "
                >

                  <FaInfoCircle
                    className="
            text-amber-500
            mt-0.5
            shrink-0
          "
                  />


                  <p
                    className="
            text-xs
            text-amber-700
          "
                  >
                    Setelah konfirmasi berhasil dikirim,
                    batas waktu customer untuk memberikan
                    tanggapan akan dihitung selama 14 hari
                    kalender sejak tanggal pengiriman.
                  </p>

                </div>


                {/* ======================================= */}
                {/* RESULT */}
                {/* ======================================= */}

                {
                  sendResult && (

                    <div
                      className={`
              rounded-xl
              border
              px-4
              py-3
              flex
              items-start
              gap-3
              ${sendResult.type ===
                          "success"
                          ? "bg-green-50 border-green-200 text-green-700"
                          : "bg-red-50 border-red-200 text-red-700"
                        }
            `}
                    >

                      {
                        sendResult.type ===
                          "success"
                          ? (
                            <FaCheckCircle
                              className="
                      mt-0.5
                      shrink-0
                    "
                            />
                          )
                          : (
                            <FaTimesCircle
                              className="
                      mt-0.5
                      shrink-0
                    "
                            />
                          )
                      }


                      <p
                        className="
                text-xs
                font-medium
              "
                      >
                        {
                          sendResult.message
                        }
                      </p>

                    </div>

                  )
                }

              </div>


              {/* ========================================= */}
              {/* FOOTER */}
              {/* ========================================= */}

              <div
                className="
        border-t
        bg-gray-50
        px-6
        py-4
        flex
        justify-end
        gap-3
        shrink-0
      "
              >

                <button
                  type="button"
                  disabled={
                    isSendingConfirmation
                  }
                  onClick={
                    closeSendConfirmation
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
          disabled:opacity-50
        "
                >

                  {
                    sendResult?.type ===
                      "success"
                      ? "Tutup"
                      : "Batal"
                  }

                </button>


                {
                  sendResult?.type !==
                  "success" && (

                    <button
                      type="button"
                      onClick={
                        processSendConfirmation
                      }
                      disabled={
                        isSendingConfirmation
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
              disabled:opacity-60
              inline-flex
              items-center
              gap-2
            "
                    >

                      {
                        isSendingConfirmation
                          ? (

                            <>

                              <FaSpinner
                                className="
                        animate-spin
                      "
                              />

                              Mengirim...

                            </>

                          )
                          : (

                            <>

                              <FaPaperPlane />

                              Kirim Konfirmasi

                            </>

                          )
                      }

                    </button>

                  )
                }

              </div>

            </div>

          </div>

        )

      }

    </div>

  );

};


export default TableListKonfirmasiPiutang;