import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

export const exportToExcel = async ({
    toggleModal,
    getDataFunction,
    swal
}) => {

    swal.loading();

    try {

        const payload = {
            page: 1,
            limit: 1000,
            download: true,
            tipe: toggleModal?.tipe_card
        };

        const res = await getDataFunction(payload);

        if (res?.status === false) {
            throw new Error("Gagal Mengambil Data");
        } else {
            const dataForExport = res?.data || [];

            if (dataForExport.length === 0) {
                swal.custom("Tidak Dapat Di-Download !", 'Data Masih Kosong Untuk Ditampilkan', 'info');
                return;
            }

            const workbook = XLSX.utils.book_new();
            const worksheetData = [];

            const header = [
                "Tanggal Pengajuan",
                "No. Pengajuan",
                "Nama Pemohon",
                "Cabang/Unit",
                "Jenis Biaya",
                "Jenis PPN",
                "Nominal DPP",
                "PPN",
                "PPh",
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
                    v?.tipe_ppn === 'include' ? 'Non-WAPU' : v?.tipe_ppn === 'exclude' ? 'WAPU' : "",
                    v?.nominal_dpp ?? 0,
                    v?.nominal_ppn ?? 0,
                    v?.nominal_pph ?? 0,
                    v?.total_dibayarkan ?? 0,
                    v?.no_invoice ?? "",
                    v?.no_kasbon_sap ?? "",
                    v?.no_faktur_pajak ?? "",
                    v?.no_voucher_sap ?? "",
                    v?.no_memo ?? "",
                    v?.tgl_pembayaran_pengajuan ?? "",
                    v?.no_voucher_payment ?? "",
                    `${v?.status_selesai === '1' ? 'Selesai' : 'Masih Proses'} - ${v?.sla_pengajuan ?? '-'}`,
                    `${v?.status_unit_kerja ?? v?.status_unit} - ${v?.status_kegiatan ?? ""} - ${v?.status_pengajuan ?? "Proses"}`
                ]);
            });

            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

            worksheet["!rows"] = [
                { hpx: 25 } // tinggi header 35px
            ];
            // Style Header
            const range = XLSX.utils.decode_range(worksheet["!ref"]);

            for (let C = range.s.c; C <= range.e.c; C++) {
                const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });

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
                            rgb: "1E3A8A" // Tailwind bg-blue-900
                        }
                    },
                    alignment: {
                        horizontal: "center",
                        vertical: "center",
                        wrapText: true
                    },
                    border: {
                        top: { style: "thin", color: { rgb: "FFFFFF" } },
                        bottom: { style: "thin", color: { rgb: "FFFFFF" } },
                        left: { style: "thin", color: { rgb: "FFFFFF" } },
                        right: { style: "thin", color: { rgb: "FFFFFF" } }
                    }
                };
            }

            // worksheet["!cols"] = Array(35).fill({ wch: 20 });
            worksheet["!cols"] = [
                { wch: 18 }, // tgl
                { wch: 18 }, // no
                { wch: 30 }, // nama
                { wch: 18 }, // cabang
                { wch: 35 }, // jenis biaya
                { wch: 15 }, // jenis ppn
                { wch: 18 }, // dpp
                { wch: 18 }, // ppn
                { wch: 18 }, // pph
                { wch: 22 }, // dibayarkan
                { wch: 18 }, // no invocie
                { wch: 18 }, // no kasbon sap
                { wch: 18 }, // no faktur pajak
                { wch: 18 }, // no voucher sap
                { wch: 30 }, // no memo
                { wch: 20 }, // tgl pembayaran
                { wch: 18 }, // no voucher payment
                { wch: 30 }, // sla penye
                { wch: 50 } // status
            ];

            let nama = '';
            if (toggleModal?.tipe_card === 'total_pengajuan') {
                nama = 'Semua'
            }
            if (toggleModal?.tipe_card === 'sudah_dibayarkan') {
                nama = 'Sudah Dibayarkan'
            }
            if (toggleModal?.tipe_card === 'pengajuan_baru') {
                nama = 'Pengajuan Baru'
            }
            if (toggleModal?.tipe_card === 'menunggu_verifikasi') {
                nama = 'Menunggu Verifikasi'
            }
            if (toggleModal?.tipe_card === 'menunggu_pembayaran') {
                nama = 'Menunggu Pembayaran'
            }
            if (toggleModal?.tipe_card === 'ditolak') {
                nama = 'Ditolak'
            }
            if (toggleModal?.tipe_card === 'on_sla') {
                nama = 'On SLA'
            }
            if (toggleModal?.tipe_card === 'over_sla') {
                nama = 'Over SLA'
            }

            XLSX.utils.book_append_sheet(workbook, worksheet, nama);

            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

            saveAs(blob, `Data Pengajuan (${nama}).xlsx`);

            swal.close();
        }


    } catch (error) {
        console.error("Error exporting :", error);
        swal.close();
        swal.error("Gagal mengekspor !");
    }
};