import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportJurnalPPN = async ({
  periode,
  sortBy,
  getDataFunction,
  swal
}) => {

  if (!periode) {
    swal.error("Pilih periode terlebih dahulu!");
    return;
  }

  const selectedDate = new Date(periode + "-01");
  const minDate = new Date("2025-04-01");

  if (selectedDate < minDate) {
    swal.error("Periode tidak boleh sebelum April 2025!");
    return;
  }

  swal.loading();

  try {
    const [year, month] = periode.split("-");
    const formattedPeriode = `${month}-${year}`;

    const payload = {
      page: 1,
      limit: 1000,
      order: sortBy === "Latest" ? "DESC" : "ASC",
      periode: formattedPeriode
    };

    const res = await getDataFunction(payload);

    if (res?.message !== "Success") {
      throw new Error("Gagal mengambil data");
    }

    const dataForExport = res?.data?.data || [];

    if (dataForExport.length === 0) {
      swal.close();
      swal.error("Tidak ada data untuk periode yang dipilih!");
      return;
    }

    const workbook = XLSX.utils.book_new();
    const worksheetData = [];

    const header = [
      'Document Temp','Header Text','Company Code','Document Date (dd.mm.yyyy)','Posting Date (dd.mm.yyyy)',
      'Period','Document Type','Ledger','Reference Document','Currency','Ref.Key (Header1)','Item_no','GL_Account',
      'Posting Key','Special G/L Ind','Amount Doc','Amount Local','Business Area','Tax Code','Assignment','Profit Center',
      'Item Text','Value Date (dd.mm.yyyy)','Baseline Date (dd.mm.yyyy)','WBS_Element','Cost Center','Order','Payment term',
      'Payment method','Partner Bank','House Bank','Bank ID','Invoice Reference','Exchange Rate','Trading Partner'
    ];

    worksheetData.push(header);

    dataForExport.forEach((v) => {
      worksheetData.push([
        v?.NO,
        v?.HEADER_TEXT,
        v?.COMP_CODE,
        v?.DOCUMENT_DATE,
        v?.POSTING_DATE,
        v?.PERIOD,
        v?.DOCUMENT_TYPE,
        v?.LEDGER,
        v?.REFERENCE_DOCUMENT,
        v?.CURRENCY,
        v?.REF_KEY_HEADER1,
        v?.ITEM_NO,
        v?.GL_ACCOUNT,
        v?.POSTING_KEY,
        v?.SPECIAL_GL_IND,
        v?.AMOUNT,
        v?.AMOUNT_LOCAL,
        v?.BUSINESS_AREA,
        v?.TAX_CODE,
        v?.ASSIGNMENT,
        v?.PROFIT_CENTER,
        v?.ITEM_TEXT,
        v?.VALUE_DATE,
        v?.BASELINE_DATE,
        v?.WBS_ELEMENT,
        v?.COST_CENTER,
        v?.ORDER_NO,
        v?.PAYMENT_TERM,
        v?.PAYMENT_METHOD,
        v?.PARTNER_BANK,
        v?.HOUSE_BANK,
        v?.BANK_ID,
        v?.INVOICE_REFERENCE,
        v?.EXCHANGE_RATE,
        v?.TRADING_PARTNER
      ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    worksheet["!cols"] = Array(35).fill({ wch: 20 });

    XLSX.utils.book_append_sheet(workbook, worksheet, "Jurnal PPN");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, `Jurnal PPN(${periode}).xlsx`);

    swal.close();

  } catch (error) {
    console.error("Error exporting Jurnal PPN:", error);
    swal.close();
    swal.error("Gagal mengekspor Jurnal PPN!");
  }
};