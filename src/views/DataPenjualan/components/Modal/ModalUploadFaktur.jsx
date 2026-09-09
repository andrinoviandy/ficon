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


  if (!cleaned) {
    return 0;
  }


  return Number(
    cleaned
  );

};


// =====================================================
// COMPONENT
// =====================================================

const ModalUploadFaktur = () => {

  const dispatch = useDispatch();

  const { toggleModal } = useSelector(
    (state) => state.global
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
        "modalUploadFaktur"
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
  // VALIDATE
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


      const normalizedRows =
        rows.map(
          row =>
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
          item =>
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


      const data =
        normalizedRows.map(
          (
            row,
            index
          ) => ({

            id:
              Date.now() +
              index,

            no_faktur:
              String(
                row.no_faktur ??
                ""
              ).trim(),

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

            nominal_tagihan:
              toNumeric(
                row.nominal_tagihan
              ),

            sales:
              String(
                row.sales ??
                ""
              ).trim(),

            status:
              "AKTIF",

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

            const workbook =
              XLSX.read(
                event.target.result,
                {
                  type:
                    "binary",
                }
              );


            const sheet =
              workbook
                .Sheets[
              workbook
                .SheetNames[0]
              ];


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


            setExcelData(
              result.data
            );


            setShowTable(
              true
            );


            swal.success(
              `${result.data.length} data berhasil dibaca`
            );

          } catch (
          error
          ) {

            console.error(
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
        "Template"
      );


      XLSX.writeFile(
        workbook,
        "template-faktur.xlsx"
      );

    };


  // ===================================================
  // SUBMIT DUMMY
  // ===================================================

  const handleSubmit =
    () => {

      if (
        !excelData.length
      ) {

        swal.error(
          "Belum ada data."
        );

        return;

      }


      swal.loading();


      setTimeout(
        async () => {

          swal.close();


          dispatch(
            setToggleModal({
              isOpen:
                false,

              modal:
                "",
            })
          );


          await swal.success(
            `${excelData.length} data siap dimasukkan ke dummy data`
          );


          resetUpload();

        },
        500
      );

    };


  return (

    <Modal
      title="Upload Data Penjualan"
      iconTitle={
        <IoCloudUploadOutline className="text-primary text-3xl" />
      }
      modal="modalUploadFaktur"
      size="w-11/12 max-w-7xl"
      scroll={false}
      buttonFooter={
        <div
          className="
            flex
            justify-end
            gap-3
          "
        >

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

            Simpan Data

          </button>

        </div>
      }
    >

      <div>

        {/* HEADER */}

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

              <h2
                className="
                  text-xl
                  font-bold
                  text-blue-900
                "
              >
                Upload Data Penjualan
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-1
                "
              >
                Import data penjualan menggunakan file Excel.
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


        {/* UPLOAD BOX */}

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


            <h3
              className="
                mt-4
                font-bold
                text-lg
              "
            >
              Upload File Excel
            </h3>


            <p
              className="
                text-sm
                text-gray-500
              "
            >
              .xlsx / .xls
            </p>


            <div
              className="
                flex
                flex-wrap
                justify-center
                gap-3
                mt-5
              "
            >

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
                "
              >

                <FaDownload />

                Template

              </button>


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

                  Membaca file...

                </div>

              )
            }


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
                    "
                  >

                    <FaTrash />

                  </button>

                </div>

              )
            }

          </div>

        </div>


        {/* PREVIEW */}

        {
          showTable &&
          excelData.length > 0 && (

            <div
              className="
                mt-6
              "
            >

              <div
                className="
                  flex
                  justify-between
                  items-center
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
                    Preview Data
                  </h3>

                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    {
                      excelData.length
                    } data

                  </p>

                </div>


                <span
                  className="
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

                      <th>No</th>

                      <th>No. Faktur</th>

                      <th>Customer</th>

                      <th>Cabang</th>

                      <th>Tgl Faktur</th>

                      <th>Jatuh Tempo</th>

                      <th>Nominal</th>

                      <th>Sales</th>

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

                              <td>
                                {
                                  index +
                                  1
                                }
                              </td>

                              <td
                                className="
                                  font-semibold
                                  text-primary
                                "
                              >
                                {
                                  item.no_faktur
                                }
                              </td>

                              <td>
                                {
                                  item.nama_customer
                                }
                              </td>

                              <td>
                                {
                                  item.cabang
                                }
                              </td>

                              <td>
                                {
                                  item.tanggal_faktur
                                }
                              </td>

                              <td>
                                {
                                  item.jatuh_tempo
                                }
                              </td>

                              <td>
                                {
                                  new Intl.NumberFormat(
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
                                    item.nominal_tagihan
                                  )
                                }
                              </td>

                              <td>
                                {
                                  item.sales ||
                                  "-"
                                }
                              </td>

                            </tr>

                          )
                        )
                    }

                  </tbody>

                </table>

              </div>

            </div>

          )
        }

      </div>

    </Modal>

  );

};


export default ModalUploadFaktur;