import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import * as XLSX from "xlsx";

import {
  Modal,
} from "components/atoms";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  FaCheckCircle,
  FaCloudUploadAlt,
  FaFileExcel,
  FaTrash,
  FaUpload,
  FaDownload,
  FaFileInvoiceDollar,
  FaBuilding,
  FaMoneyBillWave,
  FaUser,
} from "react-icons/fa";

import {
  IoCloudUploadOutline,
} from "react-icons/io5";

import {
  swal,
} from "global/helper/swal";

import {
  setToggleModal,
} from "../../../../redux/n2n/global";


// =====================================================
// REQUIRED HEADERS
// =====================================================

const REQUIRED_HEADERS = [
  "No Faktur",
  "Customer ID",
  "Customer",
  "Cabang",
  "Alamat",
  "Tanggal Faktur",
  "Jatuh Tempo",
  "Nominal Tagihan",
  "Sales",
];


// =====================================================
// NORMALIZE HEADER
// =====================================================

const normalizeHeader = (
  value = ""
) => {

  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(
      /\s+/g,
      "_"
    )
    .replace(
      /[^a-z0-9_]/g,
      ""
    );

};


// =====================================================
// NUMERIC
// =====================================================

const toNumeric = (
  value
) => {

  if (
    value === null ||
    value === undefined
  ) {

    return 0;

  }


  const cleaned =
    String(value)
      .replace(
        /[^0-9.-]/g,
        ""
      )
      .trim();


  if (
    !cleaned
  ) {

    return 0;

  }


  return Number(
    cleaned
  );

};


// =====================================================
// COMPONENT
// =====================================================

const ModalUploadPiutang = ({
  reloadData,
  setReloadData,
}) => {

  const dispatch = useDispatch();


  const {
    toggleModal,
  } = useSelector(
    (state) =>
      state.global
  );


  const fileInputRef =
    useRef(null);


  const [
    fileExcel,
    setFileExcel,
  ] = useState(null);


  const [
    excelData,
    setExcelData,
  ] = useState([]);


  const [
    showTable,
    setShowTable,
  ] = useState(false);


  const [
    loading,
    setLoading,
  ] = useState(false);


  // ===================================================
  // RESET
  // ===================================================

  const resetUpload =
    () => {

      setFileExcel(
        null
      );

      setExcelData(
        []
      );

      setShowTable(
        false
      );

      setLoading(
        false
      );


      if (
        fileInputRef.current
      ) {

        fileInputRef
          .current
          .value = "";

      }

    };


  // ===================================================
  // OPEN MODAL
  // ===================================================

  useEffect(
    () => {

      if (
        toggleModal?.isOpen &&
        toggleModal?.modal ===
        "modalUploadPiutang"
      ) {

        resetUpload();

      }

    },
    [
      toggleModal?.isOpen,
      toggleModal?.modal,
    ]
  );


  // ===================================================
  // VALIDATE EXCEL
  // ===================================================

  const validateExcel =
    (rows) => {

      if (
        !rows?.length
      ) {

        return {
          valid: false,
          message:
            "File Excel tidak memiliki data.",
        };

      }


      // =================================================
      // NORMALIZE ROW
      // =================================================

      const normalizedRows =
        rows.map(
          (row) =>
            Object.keys(
              row
            ).reduce(
              (
                acc,
                key
              ) => {

                acc[
                  normalizeHeader(
                    key
                  )
                ] =
                  row[key];

                return acc;

              },
              {}
            )
        );


      // =================================================
      // HEADER
      // =================================================

      const headers =
        Object.keys(
          normalizedRows[0]
        );


      const required =
        REQUIRED_HEADERS.map(
          normalizeHeader
        );


      const missing =
        required.filter(
          (item) =>
            !headers.includes(
              item
            )
        );


      if (
        missing.length
      ) {

        return {
          valid: false,

          message:
            `Kolom wajib: ${REQUIRED_HEADERS.join(", ")}`,
        };

      }


      // =================================================
      // MAPPING DATA PIUTANG
      // =================================================

      const data =
        normalizedRows.map(
          (
            row,
            index
          ) => ({

            id:
              Date.now() +
              index,


            // =========================================
            // IDENTITAS FAKTUR
            // =========================================

            no_faktur:
              String(
                row.no_faktur ??
                ""
              ).trim(),


            // =========================================
            // CUSTOMER
            // =========================================

            customer_id:
              String(
                row.customer_id ??
                ""
              ).trim(),


            nama_customer:
              String(
                row.customer ??
                ""
              ).trim(),


            // =========================================
            // CABANG
            // =========================================

            cabang:
              String(
                row.cabang ??
                ""
              ).trim(),


            alamat:
              String(
                row.alamat ??
                ""
              ).trim(),


            // =========================================
            // TANGGAL
            // =========================================

            tanggal_faktur:
              String(
                row.tanggal_faktur ??
                ""
              ).trim(),


            jatuh_tempo:
              String(
                row.jatuh_tempo ??
                ""
              ).trim(),


            // =========================================
            // NOMINAL PIUTANG
            // =========================================

            nominal_tagihan:
              toNumeric(
                row.nominal_tagihan
              ),


            // =========================================
            // SALES
            // =========================================

            sales:
              String(
                row.sales ??
                ""
              ).trim(),


            // =========================================
            // DATA PIUTANG
            // =========================================

            total_piutang:
              toNumeric(
                row.nominal_tagihan
              ),

            sudah_dibayar:
              0,

            outstanding:
              toNumeric(
                row.nominal_tagihan
              ),

            aging:
              0,

            status:
              "OUTSTANDING",

          })
        );


      return {
        valid: true,
        data,
      };

    };


  // ===================================================
  // FILE
  // ===================================================

  const handleFile =
    (e) => {

      const file =
        e.target.files?.[0];


      if (
        !file
      ) {

        return;

      }


      // =================================================
      // EXTENSION
      // =================================================

      const extension =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase();


      if (
        ![
          "xlsx",
          "xls",
        ].includes(
          extension
        )
      ) {

        swal.error(
          "Format file harus .xlsx atau .xls"
        );

        return;

      }


      setLoading(
        true
      );


      setFileExcel(
        file
      );


      const reader =
        new FileReader();


      reader.onload =
        (event) => {

          try {

            // =========================================
            // READ WORKBOOK
            // =========================================

            const workbook =
              XLSX.read(
                event.target.result,
                {
                  type:
                    "binary",
                }
              );


            // =========================================
            // FIRST SHEET
            // =========================================

            const sheet =
              workbook
                .Sheets[
                  workbook
                    .SheetNames[0]
                ];


            // =========================================
            // SHEET TO JSON
            // =========================================

            const rows =
              XLSX.utils.sheet_to_json(
                sheet,
                {
                  defval:
                    "",

                  raw:
                    false,
                }
              );


            // =========================================
            // VALIDATE
            // =========================================

            const result =
              validateExcel(
                rows
              );


            if (
              !result.valid
            ) {

              swal.error(
                result.message
              );

              resetUpload();

              return;

            }


            // =========================================
            // SET DATA
            // =========================================

            setExcelData(
              result.data
            );


            setShowTable(
              true
            );


            swal.success(
              `${result.data.length} data piutang berhasil dibaca`
            );

          } catch (
            error
          ) {

            console.error(
              "Error membaca Excel:",
              error
            );


            swal.error(
              "Gagal membaca file Excel"
            );


            resetUpload();

          } finally {

            setLoading(
              false
            );

          }

        };


      reader.readAsBinaryString(
        file
      );

    };


  // ===================================================
  // DOWNLOAD TEMPLATE
  // ===================================================

  const handleDownloadTemplate =
    () => {

      const data = [

        {

          "No Faktur":
            "INV-2026-00001",

          "Customer ID":
            "10000271521",

          "Customer":
            "Dinas Kesehatan Kota Medan",

          "Cabang":
            "KFTD MEDAN",

          "Alamat":
            "Jl. Gatot Subroto No. 125, Medan",

          "Tanggal Faktur":
            "2026-08-01",

          "Jatuh Tempo":
            "2026-08-22",

          "Nominal Tagihan":
            140000000,

          "Sales":
            "Andri Noviandy",

        },

      ];


      const worksheet =
        XLSX.utils.json_to_sheet(
          data
        );


      const workbook =
        XLSX.utils.book_new();


      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Template Piutang"
      );


      XLSX.writeFile(
        workbook,
        "template-piutang.xlsx"
      );

    };


  // ===================================================
  // SUBMIT
  // ===================================================

  const handleSubmit =
    () => {

      if (
        !excelData.length
      ) {

        swal.error(
          "Belum ada data piutang."
        );

        return;

      }


      swal.loading();


      setTimeout(
        async () => {

          swal.close();


          // =============================================
          // CLOSE MODAL
          // =============================================

          dispatch(
            setToggleModal({
              isOpen:
                false,

              modal:
                "",
            })
          );


          // =============================================
          // RELOAD DATA
          // =============================================

          if (
            typeof setReloadData ===
            "function"
          ) {

            setReloadData(
              (prev) =>
                !prev
            );

          }


          await swal.success(
            `${excelData.length} data piutang siap dimasukkan`
          );


          resetUpload();

        },
        500
      );

    };


  // ===================================================
  // FORMAT CURRENCY
  // ===================================================

  const formatCurrency =
    (value) => {

      return new Intl.NumberFormat(
        "id-ID",
        {
          style:
            "currency",

          currency:
            "IDR",

          minimumFractionDigits:
            0,
        }
      ).format(
        Number(
          value || 0
        )
      );

    };


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <Modal

      title="Upload Data Piutang"

      iconTitle={
        <IoCloudUploadOutline
          className="
            text-primary
            text-3xl
          "
        />
      }

      modal="modalUploadPiutang"

      size="
        w-11/12
        max-w-7xl
      "

      scroll={false}

      buttonFooter={

        <div
          className="
            flex
            justify-end
            gap-3
          "
        >

          {/* ========================================= */}
          {/* BATAL */}
          {/* ========================================= */}

          <button
            type="button"
            onClick={() =>
              dispatch(
                setToggleModal({
                  isOpen:
                    false,

                  modal:
                    "",
                })
              )
            }
            className="
              btn
              border-none
              bg-gray-200
              text-gray-700
              rounded-full
              px-6
            "
          >

            Batal

          </button>


          {/* ========================================= */}
          {/* SIMPAN */}
          {/* ========================================= */}

          <button
            type="button"
            onClick={
              handleSubmit
            }
            disabled={
              !excelData.length
            }
            className="
              btn
              border-none
              bg-primary
              text-white
              rounded-full
              px-6
              disabled:bg-gray-300
            "
          >

            <FaCheckCircle />

            Simpan Data Piutang

          </button>

        </div>

      }

    >

      <div>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div
          className="
            bg-blue-50
            border
            border-blue-100
            rounded-3xl
            p-6
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

              <div
                className="
                  flex
                  items-center
                  gap-2
                  mb-1
                "
              >

                <FaFileInvoiceDollar
                  className="
                    text-primary
                  "
                />

                <h2
                  className="
                    text-xl
                    font-bold
                    text-blue-900
                  "
                >
                  Upload Data Piutang
                </h2>

              </div>


              <p
                className="
                  text-sm
                  text-gray-500
                  mt-1
                "
              >
                Import data piutang menggunakan
                file Excel.
              </p>

            </div>


            <FaCloudUploadAlt
              className="
                text-5xl
                text-primary
                opacity-30
              "
            />

          </div>

        </div>


        {/* ================================================= */}
        {/* UPLOAD BOX */}
        {/* ================================================= */}

        <div
          className="
            mt-6
            bg-white
            border
            rounded-3xl
            p-6
          "
        >

          <div
            className="
              border-2
              border-dashed
              border-blue-200
              rounded-3xl
              p-10
              flex
              flex-col
              items-center
            "
          >

            {/* ICON */}

            <div
              className="
                w-20
                h-20
                rounded-full
                bg-blue-50
                flex
                items-center
                justify-center
              "
            >

              <FaFileExcel
                className="
                  text-4xl
                  text-green-600
                "
              />

            </div>


            {/* TITLE */}

            <h3
              className="
                mt-4
                font-bold
                text-lg
              "
            >
              Upload File Excel Piutang
            </h3>


            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Format yang didukung: .xlsx / .xls
            </p>


            {/* BUTTON */}

            <div
              className="
                flex
                flex-wrap
                justify-center
                gap-3
                mt-5
              "
            >

              {/* TEMPLATE */}

              <button
                type="button"
                onClick={
                  handleDownloadTemplate
                }
                className="
                  px-5
                  py-3
                  rounded-full
                  bg-gray-700
                  text-white
                  flex
                  items-center
                  gap-2
                  hover:bg-gray-800
                "
              >

                <FaDownload />

                Download Template

              </button>


              {/* UPLOAD */}

              <label
                className="
                  cursor-pointer
                  px-5
                  py-3
                  rounded-full
                  bg-primary
                  text-white
                  flex
                  items-center
                  gap-2
                  hover:opacity-90
                "
              >

                <FaUpload />

                Pilih Excel

                <input
                  ref={
                    fileInputRef
                  }
                  type="file"
                  accept="
                    .xlsx,
                    .xls
                  "
                  className="
                    hidden
                  "
                  onChange={
                    handleFile
                  }
                />

              </label>

            </div>


            {/* LOADING */}

            {
              loading && (

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    gap-2
                    text-primary
                    text-sm
                  "
                >

                  <span
                    className="
                      loading
                      loading-spinner
                      loading-sm
                    "
                  />

                  Membaca file Excel...

                </div>

              )
            }


            {/* FILE */}

            {
              fileExcel && (

                <div
                  className="
                    mt-5
                    bg-green-50
                    border
                    border-green-200
                    rounded-2xl
                    p-4
                    flex
                    items-center
                    gap-3
                    w-full
                    max-w-xl
                  "
                >

                  <FaFileExcel
                    className="
                      text-green-600
                      text-xl
                    "
                  />


                  <div>

                    <p
                      className="
                        font-semibold
                        text-sm
                      "
                    >
                      {
                        fileExcel.name
                      }
                    </p>

                    <p
                      className="
                        text-xs
                        text-gray-500
                      "
                    >
                      {
                        (
                          fileExcel.size /
                          1024 /
                          1024
                        ).toFixed(2)
                      } MB
                    </p>

                  </div>


                  <button
                    type="button"
                    onClick={
                      resetUpload
                    }
                    className="
                      ml-auto
                      text-red-500
                      hover:text-red-700
                    "
                    title="Hapus file"
                  >

                    <FaTrash />

                  </button>

                </div>

              )
            }

          </div>

        </div>


        {/* ================================================= */}
        {/* PREVIEW */}
        {/* ================================================= */}

        {
          showTable &&
          excelData.length > 0 && (

            <div
              className="
                mt-6
              "
            >

              {/* HEADER */}

              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:justify-between
                  md:items-center
                  gap-3
                  mb-4
                "
              >

                <div>

                  <h3
                    className="
                      text-lg
                      font-bold
                      text-gray-700
                    "
                  >
                    Preview Data Piutang
                  </h3>


                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >

                    {
                      excelData.length
                    } data piutang berhasil
                    dibaca

                  </p>

                </div>


                <span
                  className="
                    w-fit
                    px-4
                    py-2
                    rounded-full
                    bg-green-100
                    text-green-700
                    text-sm
                    font-semibold
                  "
                >

                  Siap Disimpan

                </span>

              </div>


              {/* SUMMARY PREVIEW */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-3
                  mb-4
                "
              >

                {/* DATA */}

                <div
                  className="
                    bg-blue-50
                    border
                    border-blue-100
                    rounded-2xl
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
                        rounded-xl
                        bg-blue-100
                        text-blue-600
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
                          text-gray-500
                        "
                      >
                        Total Data
                      </p>

                      <p
                        className="
                          text-lg
                          font-bold
                          text-gray-700
                        "
                      >
                        {
                          excelData.length
                        }
                      </p>

                    </div>

                  </div>

                </div>


                {/* NOMINAL */}

                <div
                  className="
                    bg-green-50
                    border
                    border-green-100
                    rounded-2xl
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
                        rounded-xl
                        bg-green-100
                        text-green-600
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <FaMoneyBillWave />

                    </div>


                    <div>

                      <p
                        className="
                          text-xs
                          text-gray-500
                        "
                      >
                        Total Piutang
                      </p>

                      <p
                        className="
                          text-lg
                          font-bold
                          text-gray-700
                        "
                      >

                        {
                          formatCurrency(
                            excelData.reduce(
                              (
                                total,
                                item
                              ) =>
                                total +
                                Number(
                                  item.total_piutang ||
                                  0
                                ),
                              0
                            )
                          )
                        }

                      </p>

                    </div>

                  </div>

                </div>


                {/* OUTSTANDING */}

                <div
                  className="
                    bg-yellow-50
                    border
                    border-yellow-100
                    rounded-2xl
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
                        rounded-xl
                        bg-yellow-100
                        text-yellow-600
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <FaMoneyBillWave />

                    </div>


                    <div>

                      <p
                        className="
                          text-xs
                          text-gray-500
                        "
                      >
                        Outstanding
                      </p>

                      <p
                        className="
                          text-lg
                          font-bold
                          text-gray-700
                        "
                      >

                        {
                          formatCurrency(
                            excelData.reduce(
                              (
                                total,
                                item
                              ) =>
                                total +
                                Number(
                                  item.outstanding ||
                                  0
                                ),
                              0
                            )
                          )
                        }

                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* TABLE */}

              <div
                className="
                  overflow-auto
                  max-h-[400px]
                  border
                  rounded-3xl
                "
              >

                <table
                  className="
                    table
                    w-full
                  "
                >

                  <thead
                    className="
                      bg-primary
                      text-white
                      sticky
                      top-0
                      z-10
                    "
                  >

                    <tr>

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
                        Customer ID
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
                        Cabang
                      </th>

                      <th
                        className="
                          whitespace-nowrap
                        "
                      >
                        Alamat
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
                        Nominal Tagihan
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
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {
                      excelData
                        .slice(
                          0,
                          100
                        )
                        .map(
                          (
                            item,
                            index
                          ) => (

                            <tr
                              key={
                                item.id
                              }
                              className="
                                hover:bg-blue-50
                              "
                            >

                              {/* NO */}

                              <td>
                                {
                                  index +
                                  1
                                }
                              </td>


                              {/* FAKTUR */}

                              <td
                                className="
                                  font-semibold
                                  text-primary
                                "
                              >
                                {
                                  item.no_faktur ||
                                  "-"
                                }
                              </td>


                              {/* CUSTOMER ID */}

                              <td>

                                {
                                  item.customer_id ||
                                  "-"
                                }

                              </td>


                              {/* CUSTOMER */}

                              <td>

                                <div
                                  className="
                                    min-w-[180px]
                                  "
                                >

                                  <div
                                    className="
                                      flex
                                      items-center
                                      gap-2
                                    "
                                  >

                                    <FaBuilding
                                      className="
                                        text-gray-400
                                      "
                                    />

                                    <span
                                      className="
                                        font-semibold
                                      "
                                    >
                                      {
                                        item.nama_customer ||
                                        "-"
                                      }
                                    </span>

                                  </div>

                                </div>

                              </td>


                              {/* CABANG */}

                              <td>

                                {
                                  item.cabang ||
                                  "-"
                                }

                              </td>


                              {/* ALAMAT */}

                              <td>

                                <span
                                  className="
                                    text-xs
                                    text-gray-500
                                    min-w-[200px]
                                    block
                                  "
                                >
                                  {
                                    item.alamat ||
                                    "-"
                                  }
                                </span>

                              </td>


                              {/* TANGGAL FAKTUR */}

                              <td>

                                {
                                  item.tanggal_faktur ||
                                  "-"
                                }

                              </td>


                              {/* JATUH TEMPO */}

                              <td>

                                {
                                  item.jatuh_tempo ||
                                  "-"
                                }

                              </td>


                              {/* NOMINAL */}

                              <td
                                className="
                                  text-right
                                  font-semibold
                                "
                              >

                                {
                                  formatCurrency(
                                    item.nominal_tagihan
                                  )
                                }

                              </td>


                              {/* SALES */}

                              <td>

                                <div
                                  className="
                                    flex
                                    items-center
                                    gap-2
                                    whitespace-nowrap
                                  "
                                >

                                  <FaUser
                                    className="
                                      text-gray-400
                                    "
                                  />

                                  {
                                    item.sales ||
                                    "-"
                                  }

                                </div>

                              </td>


                              {/* OUTSTANDING */}

                              <td
                                className="
                                  text-right
                                  font-bold
                                  text-red-600
                                "
                              >

                                {
                                  formatCurrency(
                                    item.outstanding
                                  )
                                }

                              </td>


                              {/* STATUS */}

                              <td
                                className="
                                  text-center
                                "
                              >

                                <span
                                  className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    px-3
                                    py-1
                                    rounded-full
                                    bg-yellow-100
                                    text-yellow-700
                                    text-xs
                                    font-semibold
                                    whitespace-nowrap
                                  "
                                >

                                  <FaCheckCircle />

                                  Outstanding

                                </span>

                              </td>

                            </tr>

                          )
                        )
                    }

                  </tbody>

                </table>

              </div>


              {/* INFO */}

              {
                excelData.length >
                100 && (

                  <p
                    className="
                      text-xs
                      text-gray-400
                      mt-3
                    "
                  >

                    Menampilkan 100 data pertama
                    dari{" "}
                    {
                      excelData.length
                    } data.

                  </p>

                )
              }

            </div>

          )
        }

      </div>

    </Modal>

  );

};


export default ModalUploadPiutang;