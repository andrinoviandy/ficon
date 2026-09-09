import { HiOutlinePencilAlt, HiOutlineEye, HiCheck } from "react-icons/hi";
// import storeSchema from 'global/store'
// import { swal } from 'global/helper/swal';
import { setToggleModal } from '../../../../redux/n2n/global'
import React, { useEffect, useState } from 'react'
// import * as XLSX from 'xlsx-js-style';
import { FaCogs, FaDownload, FaEllipsisV, FaQrcode, FaReceipt, FaTimes } from 'react-icons/fa';
import { RiVerifiedBadgeLine } from 'react-icons/ri';
import { useRef } from "react";
// import { swal } from "global/helper/swal";
// import storeSchema from "global/store";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { getCookies } from 'global/helper/cookie';
import PengajuanPdf from "./PengajuanPdf";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import { formatCurrency } from "global/helper/formatCurrency";
import { formatDate, formatDateJam } from "global/helper/formatDate";
import storeSchema from "global/store";
import { swal } from "global/helper/swal";
import { encodeData } from "global/helper/jwt";
import LOGO_LOGIN from 'assets/LOGO_FIX.png'
import { FaCircleXmark } from "react-icons/fa6";
import Swal from "sweetalert2";

const ActionButtonChild = ({ location, navigation, loginAccess, isApprovalPengajuan, setDropdownOpen, dispatch, v, iframeLoading, setIframeLoading, getListPengajuan }) => {
  const pdfRef = useRef();
  const handleEdit = async () => {
    navigation("/edit-pengajuan", {
      state: {
        ...location.state,
        project: "Edit Pengajuan",
        data: {
          pengajuan_id: v?.pengajuan_id,
        }
      },
    });
  };

  const handleBatal = async () => {
    try {
      const result = await Swal.fire({
        title: "Yakin Ingin Membatalkan Pengajuan Ini ?",
        text: "Pengajuan Ini Akan Terhapus Pada Sistem",
        type: "question",
        icon: "question",
        confirmButtonText: "Ya, Yakin",
        cancelButtonText: "Batalkan",
        showCancelButton: true,
        customClass: {
          confirmButton: "bg-red-400 hover:bg-red-500 text-white px-4 py-2 mx-3 rounded", // contoh pakai Tailwind
          cancelButton: "bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded",
        },
        buttonsStyling: false,
      });
      if (result.isConfirmed) {
        swal.loading()
        const payloadStatus = {
          pengajuan_id: v?.pengajuan_id,
          flag_aktif: 'B'
        }
        const formData = new FormData();
        formData.append("payload", JSON.stringify(payloadStatus));
        const resultt = await storeSchema.actions.updatePengajuan(formData);
        if (resultt?.status === true) {
          await swal.success()
          getListPengajuan()
        } else {
          await swal.custom('Pengajuan Gagal Dibatalkan !', resultt?.data, 'error')
        }
      } else if (result.isDismissed) {
        swal.close()
      }
    } catch (error) {
      swal.error(error?.message)
    }
  }

  const handleDropdownClick = () => {
    setDropdownOpen(true);
  }

  const handleView = () => {
    dispatch(
      setToggleModal({
        isOpen: true,
        modal: "modalView",
        pengajuan_id: v?.pengajuan_id
      })
    );
  };

  const handlePenyelesaianKasbon = () => {
    navigation("/penyelesaian-kasbon", {
      state: {
        ...location.state,
        project: "Penyelesaian Kasbon",
        data: {
          pengajuan_id: v?.pengajuan_id
        }
      },
    });
  };

  const handleApprove = () => {
    dispatch(
      setToggleModal({
        isOpen: true,
        modal: "modalApprove",
        pengajuan_id: v?.pengajuan_id
      })
    );
  };

  const handleVerifikasi = () => {
    dispatch(
      setToggleModal({
        isOpen: true,
        modal: "modalVerifikasi",
        pengajuan_id: v?.pengajuan_id
      })
    );
  };

  const handleQr = () => {
    dispatch(
      setToggleModal({
        isOpen: true,
        modal: "modalQr",
        status: v?.history_id
      })
    );
  };

  // const handleReject = () => {
  //   dispatch(
  //     setToggleModal({
  //       isOpen: true,
  //       modal: "modalReject",
  //     })
  //   );
  // };

  // const handleInputVoucherSAP = () => {
  //   dispatch(
  //     setToggleModal({
  //       isOpen: true,
  //       modal: "modalInputVoucherSAP",
  //     })
  //   );
  // };

  // const handleDownloadPdf = async () => {
  //   try {
  //     const res =
  //       await storeSchema.actions.downloadPdf({ pengajuan_id: v?.pengajuan_id });
  //     console.log('ress', res);

  //       if (res?.status) {

  //     }
  //   } catch (error) {
  //     swal.error(error?.message);
  //   }
  // };
  const handleDownloadPdf = () => {
    window.open(
      `${process.env.REACT_APP_BASE_URL_LOCAL}/download-pdf/${v.pengajuan_id}`,
      "_blank"
    );
  };

  const addLogoToQr = async (qrDataUrl, logoUrl, logoScale = 0.22) => {
    return new Promise((resolve, reject) => {
      const qrImg = new Image();
      qrImg.crossOrigin = "anonymous";
      qrImg.src = qrDataUrl;

      qrImg.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const size = qrImg.width;
        canvas.width = size;
        canvas.height = size;

        // gambar QR
        ctx.drawImage(qrImg, 0, 0, size, size);

        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.src = logoUrl;

        logo.onload = () => {
          const logoSize = size * logoScale;

          const x = (size - logoSize) / 2;
          const y = (size - logoSize) / 2;

          // background putih supaya QR tetap mudah discan
          const padding = 8;

          // ctx.fillStyle = "#FFFFFF";
          // ctx.fillRect(
          //   x - padding,
          //   y - padding,
          //   logoSize + padding * 2,
          //   logoSize + padding * 2
          // );

          ctx.drawImage(logo, x, y, logoSize, logoSize);

          resolve(canvas.toDataURL("image/png"));
        };

        logo.onerror = reject;
      };

      qrImg.onerror = reject;
    });
  };

  const drawHeader = (doc, qrDataUrl) => {

    // ==========================
    // LOGO
    // ==========================
    const imgProps = doc.getImageProperties(LOGO_LOGIN);

    const logoHeight = 18;
    const logoWidth = (imgProps.width * logoHeight) / imgProps.height;

    const logoX = 14;
    const logoY = 8;

    doc.addImage(
      LOGO_LOGIN,
      "PNG",
      logoX,
      logoY,
      logoWidth,
      logoHeight
    );

    // ==========================
    // TEXT HEADER
    // ==========================
    const textX = logoX + logoWidth + 8; // otomatis mengikuti lebar logo

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("PT Kimia Farma Trading & Distribution", textX, 15);

    doc.setFontSize(11);
    doc.text("Jl. Budi Utomo No.1, Jakarta Pusat, Indonesia 10710", textX, 21);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(
      "Telp. +62 (021) - 3456059 | business@kftd.co.id",
      textX,
      26
    );

    // ==========================
    // QR CODE
    // ==========================
    doc.addImage(qrDataUrl, "PNG", 178, 10, 18, 18);

    // ==========================
    // GARIS
    // ==========================
    doc.setDrawColor(100);
    doc.setLineWidth(0.4);
    doc.line(14, 33, 196, 33);
  };

  const drawFooter = (doc) => {
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    doc.setDrawColor(150);
    doc.line(14, pageHeight - 15, pageWidth - 14, pageHeight - 15);

    doc.setFontSize(8);
    doc.setTextColor(120);

    doc.text(
      "Dokumen ini dibuat otomatis oleh Cost Tracking System",
      14,
      pageHeight - 8
    );

    doc.text(
      `Halaman ${doc.getCurrentPageInfo().pageNumber}`,
      pageWidth - 14,
      pageHeight - 8,
      {
        align: "right",
      }
    );
  };

  const handleDownloadPdf2 = async () => {
    try {
      swal.loading();

      const doc = new jsPDF("p", "mm", "a4");

      const res = await storeSchema.actions.getDetailPengajuan(
        v?.pengajuan_id
      );

      if (res?.status === true) {
        const data = res?.data;

        const token = await encodeData(data?.pengajuan_id)
        const qrValue = `${window.location.origin}/verifikasi-dokumen?token=${token}`;

        const qrDataUrl = await QRCode.toDataURL(qrValue, {
          errorCorrectionLevel: 'L',
          width: 200
        });

        // =====================================================
        // HEADER
        // =====================================================
        // doc.setFont("helvetica", "bold");
        // doc.setFontSize(15);
        // doc.text("Dokumen Pengajuan", 14, 17);

        // doc.setFont("helvetica", "normal");
        // doc.setFontSize(9);
        // doc.text(
        //   "Ringkasan Data Pengajuan dan Detail Transaksi",
        //   14,
        //   23
        // );

        // // QR CODE
        const qrSize = 16;

        // doc.addImage(
        //   qrDataUrl,
        //   "PNG",
        //   195 - qrSize, // tepat di dalam batas garis kanan
        //   8,
        //   qrSize,
        //   qrSize
        // );

        // // QR CODE LOGO
        // const logoSize = 6;
        // const qrX = 195 - qrSize;
        // const qrY = 8;
        // const logoX = qrX + (qrSize - logoSize) / 2;
        // const logoY = qrY + (qrSize - logoSize) / 2;

        // doc.addImage(
        //   LOGO_LOGIN,
        //   "PNG",
        //   logoX,
        //   logoY,
        //   logoSize,
        //   logoSize
        // );

        // // GARIS HEADER
        // doc.setDrawColor(0);
        // doc.setLineWidth(0.5);
        // doc.line(14, 30, 195, 30);

        drawHeader(doc, qrDataUrl);

        // =====================================================
        // INFORMASI PENGAJUAN
        // =====================================================
        autoTable(doc, {
          startY: 35,
          theme: "plain",

          body: [
            [
              "No Pengajuan",
              ":",
              data?.no_pengajuan ?? "-",
              "Nama Pemohon",
              ":",
              data?.nama_pemohon ?? "-"
            ],
            [
              "Jenis Biaya",
              ":",
              data?.ur_jenis_biaya_id ?? "-",
              "Cabang",
              ":",
              data?.ur_cabang_id ?? "-"
            ],
            [
              "Tanggal",
              ":",
              formatDate(data?.created_at),
              "Keterangan",
              ":",
              data?.keterangan ?? "-"
            ]
          ],

          styles: {
            fontSize: 9,
            overflow: "linebreak",
            valign: "top",
            lineWidth: 0,
            cellPadding: {
              top: 2,
              bottom: 2,
              left: 1,
              right: 1
            }
          },

          columnStyles: {
            // kiri
            0: {
              cellWidth: 28,
              fontStyle: "bold",
              valign: "top"
            },
            1: {
              cellWidth: 4,
              halign: "center",
              valign: "top"
            },
            2: {
              cellWidth: 50,
              valign: "top"
            },

            // kanan
            3: {
              cellWidth: 32,
              fontStyle: "bold",
              valign: "top"
            },
            4: {
              cellWidth: 4,
              halign: "center",
              valign: "top"
            },
            5: {
              cellWidth: 58,
              valign: "top"
            }
          },

          didParseCell: function (hookData) {
            hookData.cell.styles.lineWidth = 0;
          },

          didDrawPage: function () {
            drawHeader(doc, qrDataUrl);
            drawFooter(doc);
          },
        });

        // =====================================================
        // DETAIL COA
        // =====================================================
        autoTable(doc, {
          startY: doc.lastAutoTable.finalY + 6,

          head: [
            [
              "No",
              "GL Account",
              "Account Description",
              "Nominal"
            ]
          ],

          body:
            data?.coa?.map((item, index) => [
              index + 1,
              item?.gl_account,
              item?.ur_coa_detail_id,
              formatCurrency(item?.nominal)
            ]) || [],

          styles: {
            fontSize: 9,
            cellPadding: 3,
            valign: "middle"
          },

          headStyles: {
            fillColor: [240, 240, 240],
            textColor: 0,
            fontStyle: "bold",
            halign: "center"
          },

          columnStyles: {
            0: {
              cellWidth: 12,
              halign: "center"
            },
            1: {
              cellWidth: 35
            },
            2: {
              cellWidth: 98
            },
            3: {
              cellWidth: 35,
              halign: "right"
            }
          },

          didDrawPage: function () {
            drawHeader(doc, qrDataUrl);
            drawFooter(doc);
          },
        });

        // =====================================================
        // RINGKASAN NOMINAL
        // =====================================================
        const totalY = doc.lastAutoTable.finalY + 8;
        const labelX = 100; // geser label ke kiri
        const colonX = 50; // posisi titik dua
        const valueX = 190; // tetap rata kanan
        const lineHeight = 6;

        doc.setFontSize(10);

        // Nominal DPP
        doc.setFont("helvetica", "bold");
        doc.text("Nominal DPP", labelX, totalY);
        doc.text(":", labelX + colonX, totalY);
        doc.text(
          formatCurrency(data?.nominal_dpp) ?? "-",
          valueX,
          totalY,
          { align: "right" }
        );

        // PPN
        doc.setFont("helvetica", "normal");
        doc.text(`PPN (${data?.ppn ?? 0}%)`, labelX, totalY + lineHeight);
        doc.text(":", labelX + colonX, totalY + lineHeight);
        doc.text(
          formatCurrency(data?.nominal_ppn) ?? "-",
          valueX,
          totalY + lineHeight,
          { align: "right" }
        );

        // PPh
        doc.text(`PPh (${data?.pph ?? 0}%)`, labelX, totalY + lineHeight * 2);
        doc.text(":", labelX + colonX, totalY + lineHeight * 2);
        doc.text(
          formatCurrency(data?.nominal_pph) ?? "-",
          valueX,
          totalY + lineHeight * 2,
          { align: "right" }
        );

        // Jumlah Dibayarkan
        doc.setFont("helvetica", "bold");
        doc.text("Jumlah Yang Dibayarkan", labelX, totalY + lineHeight * 3);
        doc.text(":", labelX + colonX, totalY + lineHeight * 3);
        doc.text(
          formatCurrency(data?.total_dibayarkan) ?? "-",
          valueX,
          totalY + lineHeight * 3,
          { align: "right" }
        );

        // =====================================================
        // SIGNATURE
        // =====================================================

        // QR Code signer
        const signerHistory =
          data?.status_history?.filter((item) => item.role_id !== "RL01") || [];

        const signerQr = await Promise.all(
          signerHistory.map(async (item) => {
            let qrData = null, qrDataUrll = null;

            if (item?.history !== null && item?.history?.qrcode && ['S1', 'S2'].includes(item?.kd_status)) {
              qrDataUrll = await QRCode.toDataURL(item?.history?.qrcode, {
                errorCorrectionLevel: "H",
                width: 180,
                margin: 1,
              });
              qrData = await addLogoToQr(qrDataUrll, LOGO_LOGIN, 0.42);
            }

            return {
              ...(data?.cabang_id !== '2000' && item?.role_id === 'RL02' ? {
                ...item, ur_role_id: "Pemohon"
              } : item),
              qrData,
            };
          })
        );


        // total kolom = Dibuat Oleh + seluruh approver
        const totalColumn = signerQr?.length + 1;

        // area yang dipakai
        const tableWidth = 200;
        const columnWidth = tableWidth / totalColumn;

        doc.setFontSize(9);

        // tinggi QR
        const qrSizeSigner = 16;

        const signerName = data?.created_by?.split(" - ");

        const allSigner = [
          {
            ur_role_id: data?.cabang_id !== '2000' ? "Pembuat" : "Pemohon",
            ur_unit_kerja_id: null,
            date_status: formatDateJam(data?.created_at) || "-",
            created_by: data?.cabang_id !== '2000' ? data?.created_by : '1 - ' + data?.nama_pemohon,
            qrData: null,
          },
          ...signerQr,
        ];

        console.log(allSigner, 'allSigner');


        const maxCols = 4;

        const pageWidth = 180;
        const colWidth = pageWidth / maxCols;

        const startX = 15;
        // const startY = totalY + 20;
        const startY = totalY + lineHeight * 5;

        const rowHeight = 36;

        allSigner.forEach((item, index) => {

          const row = Math.floor(index / maxCols);
          const col = index % maxCols;

          const x = startX + col * colWidth;
          const y = startY + row * rowHeight;

          doc.setFont("helvetica", "bold");
          doc.setFontSize(9);

          doc.text(
            item.ur_unit_kerja_id && item.role_id !== 'RL02' ? item.ur_unit_kerja_id : (item.ur_role_id ?? "-"),
            x + colWidth / 2,
            y,
            {
              align: "center",
              maxWidth: colWidth - 4
            }
          );

          doc.setFont("helvetica", "normal");
          doc.setFontSize(8);

          if (item.qrData) {
            doc.addImage(
              item.qrData,
              "PNG",
              x + (colWidth - qrSize) / 2,
              y + 4,
              qrSizeSigner,
              qrSizeSigner
            );
          }

          doc.setFontSize(9);

          doc.text(
            item.date_status && ['S1', 'S2'].includes(item?.kd_status) ? item.date_status : "",
            x + colWidth / 2,
            y + 23,
            {
              align: "center"
            }
          );

          doc.text(
            `${item.created_by?.split(" - ")[1] ?? item?.user?.nama}`,
            x + colWidth / 2,
            y + 26,
            {
              align: "center",
              maxWidth: colWidth - 4
            }
          );

        });

        // =====================================================
        // SAVE
        // =====================================================
        const totalPages = doc.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
          doc.setPage(i);
          drawFooter(doc);
        }
        doc.save(
          `dokumen-pengajuan-${data?.no_pengajuan}.pdf`
        );

        swal.close();
      }

    } catch (error) {
      swal.close();
      swal.error(
        error?.message || "Terjadi kesalahan"
      );
    }
  };

  // const handleDownloadPdf = async () => {
  //   try {

  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL_LOCAL}/download-pdf/${v.pengajuan_id}`,
  //       {
  //         responseType: "blob"
  //       }
  //     );

  //     const url = window.URL.createObjectURL(
  //       new Blob([response.data])
  //     );

  //     const link = document.createElement("a");

  //     link.href = url;

  //     link.setAttribute(
  //       "download",
  //       `Pengajuan-${v.no_pengajuan}.pdf`
  //     );

  //     document.body.appendChild(link);

  //     link.click();

  //     link.remove();

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <div className="dropdown dropdown-right" onClick={() => { handleDropdownClick() }}>

        <div tabIndex={0} role="button">

          <div className="btn btn-sm rounded-full bg-white shadow hover:bg-gray-100">

            <FaEllipsisV className="text-primary" />

          </div>

        </div>

        <div
          tabIndex={0}
          className="menu menu-md dropdown-content mt-3 z-[1] p-5 border shadow bg-white rounded-box w-64"
        >

          <p className="text-md font-bold">
            Action
          </p>

          {['RL07', 'RL08'].includes(loginAccess?.role_id) && isApprovalPengajuan && (
            <>
              {/* <hr className="my-2" />
    
                              <ul>
                                <li>
                                  <div
                                    className="pl-0"
                                    onClick={handleInputVoucherSAP}
                                  >
                                    <FaRegFileAlt className="text-xl" />
                                    Input Kelengkapan Data
                                  </div>
                                </li>
                              </ul> */}
            </>
          )}

          {["RL01"].includes(loginAccess?.role_id) && !isApprovalPengajuan && (
            <>
              {['T'].includes(v?.kd_status) ? (
                <>
                  <hr className="my-2" />

                  <ul>
                    <li>
                      <div className="pl-0" onClick={handleEdit}>
                        <FaCogs className="text-xl" />
                        Perbaikan
                      </div>
                    </li>
                  </ul>
                  <hr className="my-2" />

                  <ul>
                    <li>
                      <div className="pl-0 text-red-400" onClick={handleBatal}>
                        <FaCircleXmark className="text-xl" />
                        Batalkan
                      </div>
                    </li>
                  </ul>

                  {/* <hr className="my-2" />

                  <ul>
                    <li>
                      <div
                        className="pl-0"
                        onClick={handleBatal}
                      >
                        <FaTimes className="text-xl" />
                        Batalkan Pengajuan
                      </div>
                    </li>
                  </ul> */}
                </>
              ) : (
                <>
                  {v?.user_flag_action === 'Y' && (
                    <>
                      <hr className="my-2" />

                      <ul>
                        <li>
                          <div className="pl-0" onClick={handleEdit}>
                            <HiOutlinePencilAlt className="text-xl" />
                            Edit
                          </div>
                        </li>
                      </ul>
                    </>
                  )}
                </>
              )}
            </>
          )}

          <hr className="my-2" />

          <ul>
            <li>
              <div
                className="pl-0"
                onClick={handleView}
              >
                <HiOutlineEye className="text-xl" />
                View
              </div>
            </li>
          </ul>
          <>
            <hr className="my-2" />

            <ul>
              <li>
                <div
                  className="pl-0"
                  onClick={handleDownloadPdf2}
                >
                  <FaDownload className="text-lg" />
                  Download
                </div>
              </li>
            </ul>
          </>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default ActionButtonChild