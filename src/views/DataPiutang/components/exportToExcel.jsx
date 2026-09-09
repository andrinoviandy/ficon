import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";
import { formatDateJam } from "global/helper/formatDate";
import { formatCurrency } from "global/helper/formatCurrency";

export const exportToExcel = async ({
    toggleModal,
    swal
}) => {

    const data = toggleModal?.data;
    const history = data?.history || [];

    if (history.length === 0) {
        swal.warning("Data riwayat masih kosong!");
        return;
    }

    swal.loading();

    try {

        const workbook = XLSX.utils.book_new();

        const worksheetData = [];

        // ===============================
        // Header
        // ===============================

        worksheetData.push(["RIWAYAT ANGGARAN"]);
        worksheetData.push(["Cabang : " + (data?.cabang ?? "-")]);
        worksheetData.push(["GL Account : " + (data?.gl_account ?? "-")]);
        worksheetData.push(["Account Desc : " + (data?.detail_coa ?? "-")]);
        worksheetData.push(["Bulan : " + (data?.month ?? "-")]);
        worksheetData.push(["Anggaran Terpakai : " + (formatCurrency(data?.realisasi_biaya ?? 0))]);
        worksheetData.push(["Sisa Anggaran : " + (formatCurrency(data?.sisa_anggaran ?? 0))]);
        worksheetData.push([]);

        const header = [
            "No",
            "Tanggal",
            "Aktor",
            "Nominal Penambahan",
            "Keterangan Penambahan",
            "Nominal Pemakaian",
            "Keterangan Pemakaian"
        ];

        worksheetData.push(header);

        history.forEach((item, index) => {

            worksheetData.push([
                index + 1,
                formatDateJam(item?.tanggal ?? ""),
                item?.aktor ?? "",
                item?.nominal_penambahan ?? 0,
                item?.keterangan_penambahan ?? "",
                item?.nominal_pemakaian ?? 0,
                item?.keterangan_pemakaian ?? ""
            ]);

        });

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // ===============================
        // Merge Judul
        // ===============================

        worksheet["!merges"] = [
            {
                s: { r: 0, c: 0 },
                e: { r: 0, c: 6 }
            },
            {
                s: { r: 1, c: 0 },
                e: { r: 1, c: 6 }
            },
            {
                s: { r: 2, c: 0 },
                e: { r: 2, c: 6 }
            },
            {
                s: { r: 3, c: 0 },
                e: { r: 3, c: 6 }
            },
            {
                s: { r: 4, c: 0 },
                e: { r: 4, c: 6 }
            },
            {
                s: { r: 5, c: 0 },
                e: { r: 5, c: 6 }
            },
            {
                s: { r: 6, c: 0 },
                e: { r: 6, c: 6 }
            },

        ];

        // ===============================
        // Tinggi Baris
        // ===============================

        worksheet["!rows"] = [
            { hpx: 30 },
            { hpx: 22 },
            { hpx: 22 },
            { hpx: 22 },
            { hpx: 22 },
            { hpx: 22 },
            { hpx: 22 },
            { hpx: 10 },
            { hpx: 25 }
        ];

        // Tambahkan tinggi untuk seluruh data
        for (let i = 9; i < worksheetData.length; i++) {
            worksheet["!rows"][i] = {
                hpx: 28
            };
        }

        // ===============================
        // Style Judul
        // ===============================

        worksheet["A1"].s = {
            font: {
                bold: true,
                sz: 16,
                color: { rgb: "1E3A8A" }
            },
            alignment: {
                horizontal: "center",
                vertical: "center"
            }
        };

        // ===============================
        // Header Style
        // ===============================

        const HEADER_ROW = 8;

        const range = XLSX.utils.decode_range(worksheet["!ref"]);

        for (let c = range.s.c; c <= range.e.c; c++) {

            const cell = XLSX.utils.encode_cell({
                r: HEADER_ROW,
                c
            });

            if (!worksheet[cell]) continue;

            worksheet[cell].s = {
                font: {
                    bold: true,
                    color: { rgb: "FFFFFF" }
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
                    top: { style: "thin" },
                    bottom: { style: "thin" },
                    left: { style: "thin" },
                    right: { style: "thin" }
                }
            };

        }

        // ===============================
        // Style Data
        // ===============================

        const DATA_START_ROW = HEADER_ROW + 1;

        for (let r = DATA_START_ROW; r <= range.e.r; r++) {

            for (let c = range.s.c; c <= range.e.c; c++) {

                const cellAddress = XLSX.utils.encode_cell({
                    r,
                    c
                });

                if (!worksheet[cellAddress]) continue;

                worksheet[cellAddress].s = {
                    ...worksheet[cellAddress].s,

                    alignment: {
                        vertical: "center",
                        horizontal: c === 0 ? "center" : "left",
                        wrapText: true
                    },

                    border: {
                        top: {
                            style: "thin",
                            color: { rgb: "D1D5DB" }
                        },
                        bottom: {
                            style: "thin",
                            color: { rgb: "D1D5DB" }
                        },
                        left: {
                            style: "thin",
                            color: { rgb: "D1D5DB" }
                        },
                        right: {
                            style: "thin",
                            color: { rgb: "D1D5DB" }
                        }
                    }

                };

            }

        }
        // ===============================
        // Format Currency
        // ===============================

        for (let i = 9; i < worksheetData.length; i++) {

            ["D", "F"].forEach(col => {

                const cell = worksheet[`${col}${i + 1}`];

                if (cell) {
                    cell.t = "n";
                    cell.z = '#,##0';
                }

            });

        }

        // ===============================
        // Lebar Kolom
        // ===============================

        worksheet["!cols"] = [
            { wch: 8 },
            { wch: 25 },
            { wch: 25 },
            { wch: 20 },
            { wch: 45 },
            { wch: 20 },
            { wch: 45 }
        ];

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            (data?.detail_coa ?? "")
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
            `Riwayat Anggaran ${data?.detail_coa ?? ""} ${data?.month ?? ""}.xlsx`
        );

        swal.close();

    } catch (err) {

        console.error(err);

        swal.close();

        swal.error("Gagal mengekspor!");

    }

};