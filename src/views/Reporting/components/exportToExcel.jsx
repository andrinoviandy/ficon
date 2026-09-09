import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

export const exportToExcel = async ({
    data,
    selectedOptions,
    getDataFunction,
    swal
}) => {

    if (!data) {
        swal.warning("Pilih cabang dan bulan terlebih dahulu!");
        return;
    }

    swal.loading();

    try {

        const payload = {
            page: 1,
            limit: 1000,
            download: {
                ...data,
                selectedCabang: selectedOptions
            },
            toDownload: true
        };

        const res = await getDataFunction(payload);

        if (res?.message !== "Success") {
            throw new Error("Gagal Mengambil Data");
        }

        const dataForExport = res?.data?.list_data || [];

        if (dataForExport.length === 0) {
            swal.custom(
                "Tidak Dapat Di-Download !",
                "Data Masih Kosong Untuk Ditampilkan",
                "info"
            );
            return;
        }

        const workbook = XLSX.utils.book_new();

        const worksheetData = [];

        const inCabang = selectedOptions?.map(item => item.label).join(", ");
        const bulan = data?.bulan ?? "";

        // ===============================
        // Header Report
        // ===============================
        worksheetData.push(["REPORT PENGAJUAN BIAYA"]);
        worksheetData.push(["Cabang", inCabang]);
        worksheetData.push(["Bulan", bulan]);
        worksheetData.push([]);

        const header = [
            "Tanggal Pengajuan",
            "No. Pengajuan",
            "Nama Pemohon",
            "Cabang/Unit",
            "Jenis Biaya",
            "Vendor",
            "Jenis PPN",
            "Nominal DPP",
            "PPN",
            "PPh",
            "Keterangan",
            "Jumlah Yang Dibayarkan",
            "No Invoice",
            "No Kasbon SAP",
            "No Faktur Pajak",
            "No Voucher SAP",
            "No Memo",
            "Tanggal Pembayaran",
            "No Voucher Payment",
            "SLA Penyelesaian",
            "Status"
        ];

        worksheetData.push(header);

        dataForExport.forEach((v) => {

            worksheetData.push([
                v?.tgl_pengajuan ?? "",
                v?.no_pengajuan ?? "",
                v?.nama_pemohon ?? "",
                v?.cabang ?? "",
                v?.jenis_biaya ?? "",
                v?.nama_vendor || '-',
                v?.tipe_ppn === "include"
                    ? "Non-WAPU"
                    : v?.tipe_ppn === "exclude"
                        ? "WAPU"
                        : "",
                v?.nominal_dpp ?? 0,
                v?.nominal_ppn ?? 0,
                v?.nominal_pph ?? 0,
                v?.keterangan || '-',
                v?.total_dibayarkan ?? 0,
                v?.no_invoice ?? "",
                v?.no_kasbon_sap ?? "",
                v?.no_faktur_pajak ?? "",
                v?.no_voucher_sap ?? "",
                v?.no_memo ?? "",
                v?.tgl_pembayaran_pengajuan ?? "",
                v?.no_voucher_payment ?? "",
                `${v?.status_selesai === "1" ? "Selesai" : "Masih Proses"} - ${v?.sla_pengajuan ?? "-"}`,
                `${v?.status_unit_kerja ?? v?.status_unit} - ${v?.status_kegiatan ?? ""} - ${v?.status_pengajuan ?? "Proses"}`
            ]);

        });

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // ===============================
        // Merge Judul
        // ===============================

        worksheet["!merges"] = [
            {
                s: { r: 0, c: 0 },
                e: { r: 0, c: 18 }
            }
        ];

        // ===============================
        // Tinggi Baris
        // ===============================

        worksheet["!rows"] = [
            { hpx: 30 },
            { hpx: 22 },
            { hpx: 22 },
            { hpx: 10 },
            { hpx: 25 }
        ];

        // ===============================
        // Style Judul
        // ===============================

        worksheet["A1"].s = {
            font: {
                bold: true,
                sz: 16,
                color: {
                    rgb: "1E3A8A"
                }
            },
            alignment: {
                horizontal: "center",
                vertical: "center"
            }
        };

        worksheet["A2"].s = {
            font: {
                bold: true
            }
        };

        worksheet["A3"].s = {
            font: {
                bold: true
            }
        };

        // ===============================
        // Style Header
        // ===============================

        const HEADER_ROW = 4;

        const range = XLSX.utils.decode_range(worksheet["!ref"]);

        for (let C = range.s.c; C <= range.e.c; C++) {

            const cellAddress = XLSX.utils.encode_cell({
                r: HEADER_ROW,
                c: C
            });

            if (!worksheet[cellAddress]) continue;

            worksheet[cellAddress].s = {
                font: {
                    bold: true,
                    color: {
                        rgb: "FFFFFF"
                    }
                },
                fill: {
                    patternType: "solid",
                    fgColor: {
                        rgb: "1E3A8A"
                    }
                },
                alignment: {
                    horizontal: "center",
                    vertical: "center",
                    wrapText: true
                },
                border: {
                    top: {
                        style: "thin",
                        color: {
                            rgb: "FFFFFF"
                        }
                    },
                    bottom: {
                        style: "thin",
                        color: {
                            rgb: "FFFFFF"
                        }
                    },
                    left: {
                        style: "thin",
                        color: {
                            rgb: "FFFFFF"
                        }
                    },
                    right: {
                        style: "thin",
                        color: {
                            rgb: "FFFFFF"
                        }
                    }
                }
            };

        }

        // ===============================
        // Lebar Kolom
        // ===============================

        worksheet["!cols"] = [
            { wch: 18 },
            { wch: 18 },
            { wch: 30 },
            { wch: 18 },
            { wch: 25 },
            { wch: 30 },
            { wch: 15 },
            { wch: 18 },
            { wch: 18 },
            { wch: 18 },
            { wch: 35 },
            { wch: 22 },
            { wch: 18 },
            { wch: 18 },
            { wch: 18 },
            { wch: 18 },
            { wch: 30 },
            { wch: 20 },
            { wch: 18 },
            { wch: 30 },
            { wch: 50 }
        ];

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Report Pengajuan Biaya"
        );

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });

        const blob = new Blob(
            [excelBuffer],
            {
                type: "application/octet-stream"
            }
        );

        saveAs(
            blob,
            `Report Pengajuan Biaya ${bulan}.xlsx`
        );

        swal.close();

    } catch (error) {

        console.error(error);

        swal.close();

        swal.error("Gagal mengekspor !");

    }
};