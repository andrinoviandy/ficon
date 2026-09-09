import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
import { setToggleModal } from '../../../../../redux/n2n/global';
import * as XLSX from 'xlsx-js-style';
import { saveAs } from 'file-saver';
import { Label, Select } from 'components/atoms'
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { formatDate, formatDate2, formatTanggalIndonesia } from 'global/helper/formatDate';

const ModalReport = () => {
  const [month, setMonth] = useState('');
  const [status, setStatus] = useState({});
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  function getShortMonth(monthNumber) {
    const months = {
      "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
      "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
      "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
    };
  
    return months[monthNumber] || "Invalid month";
  };

  function formatRupiah(number) {
    if (isNaN(number)) {
      return 'Invalid number';
    }
    
    // Convert number to string and add thousand separators
    return Number(number)
    .toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })
    .replace(/\s/g, ''); // menghilangkan spasi setelah Rp
    // .replace('IDR', '')
    // .trim();
  }

  const date = month?.split('-');

  const handleDownloadBiling = async () => {
    swal.loading();
    const res = await storeSchema.actions.getListBillingCollections({
      page: 1,
      limit: 10000,
      // monthYear: month,
      year: date[0],
      month: date[1]
    });
  
    if (res?.status) {
      swal.close();
      
      // Membuat array dari data
      const data = res?.data?.list_data.map((item, index) => {
        return {
          "No": index + 1,
          "Nomor Project": item.PROJECT_NO,
          "Nama Project": item.PROJECT_NAME,
          "Termin": `Termin ${item.TERMIN}`,
          "Deskripsi": item.PROJECT_NAME,
          "Divisi": item.PROJECT_NAME,
          "Est Periode Billing": `${getShortMonth(item.EST_BULAN_BILLING)}-${item.EST_PERIODE_BILLING}`,
          "Est Billing": item.REAL_BILLING, // Simpan nilai asli (tanpa format Rupiah) untuk total
          "Est Billing (Rp.)": `${formatRupiah(item.REAL_BILLING)}`, // Format rupiah untuk tampilan
        };
      });
  
      // Menghitung total dari kolom "Est Billing"
      const totalBilling = data.reduce((total, item) => total + item["Est Billing"], 0);
  
      // Menambahkan baris total ke dalam data
      data.push({
        "No": "",
        "Nomor Project": "",
        "Nama Project": "",
        "Termin": "",
        "Deskripsi": "",
        "Divisi": "",
        "Est Periode Billing": "Total",
        "Est Billing": totalBilling, // Total asli
        "Est Billing (Rp.)": `${formatRupiah(totalBilling)}`, // Total dengan format Rupiah
      });
  
      // Hapus kolom asli "Est Billing" untuk tidak ditampilkan
      const formattedData = data.map(({ "Est Billing": _, ...rest }) => rest);
  
      // Membuat worksheet dari data
      const worksheet = XLSX.utils.json_to_sheet(formattedData, {
        origin: 'A4'
      });

      // Menambahkan judul di baris pertama
      XLSX.utils.sheet_add_aoa(worksheet, [[`Report List Billing`]], { origin: 'A1' });
      XLSX.utils.sheet_add_aoa(worksheet, [[`Periode: ${month}`]], { origin: 'A2' });
  
      // Mengatur lebar kolom sesuai dengan data
      const columnWidths = [
        { wch: 3 },   // No
        { wch: 30 },  // Nomor Project
        { wch: 30 },  // Nama Project
        { wch: 10 },  // Termin
        { wch: 40 },  // Deskripsi
        { wch: 30 },  // Divisi
        { wch: 15 },  // Est Periode Billing
        { wch: 20 },  // Est Billing (Rp.)
      ];

      worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 7 } },
      ];
      worksheet['!cols'] = columnWidths;
      worksheet['!autofilter'] = { ref: "A4:H4" };
  
      // Memberi warna background pada header dan total
      const headerCellStyle = {
        fill: {
          patternType: "solid",
          fgColor: { rgb: "FFCC00" }, // Background kuning untuk header
        },
        font: {
          bold: true,
        },
      };
  
      // Apply styling for the first row (headers)
      const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
      for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: headerRange.s.r, c: C });
        if (!worksheet[cellAddress]) continue; // Skip if cell doesn't exist
        worksheet[cellAddress].s = headerCellStyle;
      }
  
      // Apply styling for the last row (Total)
      const totalRowIndex = data.length; // Last row index
      for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: totalRowIndex, c: C });
        if (!worksheet[cellAddress]) continue; // Skip if cell doesn't exist
        worksheet[cellAddress].s = {
          fill: {
            patternType: "solid",
            fgColor: { rgb: "FFDD99" }, // Background kuning muda untuk total
          },
          font: {
            bold: true,
          },
        };
      }
  
      // Membuat workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      // Membuat buffer binary dari workbook
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
  
      // Membuat file dan mengunduhnya
      saveExcelFile(excelBuffer, `Report_List_Billing_${month}.xlsx`);
  
    } else {
      swal.error(res?.message);
    }
  };

  const handleDownloadProject = async () => {
    swal.loading();
    const res = await storeSchema.actions.getListProject({
      page: 1,
      limit: 10000,
      startDate: formatDate2(dateRange[0]?.startDate),
      endDate: formatDate2(dateRange[0]?.endDate),
      status: status?.value,
      tab_status: 'SA1',
    });
  
    if (res?.status) {
      swal.close();
      
      // Membuat array dari data
      const data = res?.data?.list_data.map((item, index) => {
        return {
          "No": index + 1,
          "Nomor Project": item.PROJECT_NO,
          "Nomor Project LAMA": item.PROJECT_NO_OLD,
          "Nama Project": item.PROJECT_NAME,
          "Nama Sales": item.NAMA_SALES,
          "Portofolio": item.PORTOFOLIO_UR,
          "Type Project": item.PROJECT_TYPE_UR,
          "Nilai Kontrak": `${formatRupiah(item.NILAI_KONTRAK)}`,
          "Nomor Kontrak": item.CONTRACT_NO,
          "Nama Customer": item.CUSTOMER_NAME,
          "Category": item.CATEGORY_UR,
          "SPUC": item.SPUC_UR,
          "Margin": `${formatRupiah(item.NILAI_PENAWARAN)}`,
          "COGS": `${formatRupiah(item.COGS)}`,
          "SLA": item.SLA,
          "Status Project": item.UR_STATUS,
          "Tanggal Create": `${formatDate(item.CREATED_AT)}`,
        };
      });
  
      // Membuat worksheet dari data
      const worksheet = XLSX.utils.json_to_sheet(data, {
        origin: 'A4'
      });

      // Menambahkan judul di baris pertama
      XLSX.utils.sheet_add_aoa(worksheet, [[`Report List Project`]], { origin: 'A1' });
      XLSX.utils.sheet_add_aoa(worksheet, [[`Periode: ${formatTanggalIndonesia(dateRange[0]?.startDate)} - ${formatTanggalIndonesia(dateRange[0]?.endDate)}`]], { origin: 'A2' });
  
      // Mengatur lebar kolom sesuai dengan data
      const columnWidths = [
        { wch: 3 },   // No
        { wch: 15 },  // Nomor Project
        { wch: 15 },  // Nomor Project LAMA
        { wch: 70 },  // Nama Project
        { wch: 30 },  // Nama Sales
        { wch: 20 },  // Portofolio
        { wch: 10 },  // Type Project
        { wch: 20 },  // Nilai Kontrak
        { wch: 30 },  // Nomor Kontrak
        { wch: 50 },  // Nama Customer
        { wch: 10 },  // Category
        { wch: 50 },  // SPUC
        { wch: 25 },  // Margin
        { wch: 25 },  // COGS
        { wch: 10 },  // SLA
        { wch: 15 },  // Status Project
        { wch: 15 },  // tanggal create
      ];

      worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 16 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 16 } },
      ];
      worksheet['!cols'] = columnWidths;
      worksheet['!autofilter'] = { ref: "A4:H4" };
  
      // Memberi warna background pada header dan total
      const headerCellStyle = {
        fill: {
          patternType: "solid",
          fgColor: { rgb: "FFCC00" }, // Background kuning untuk header
        },
        font: {
          bold: true,
        },
      };
  
      // Apply styling for the first row (headers)
      const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
      for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: headerRange.s.r, c: C });
        if (!worksheet[cellAddress]) continue; // Skip if cell doesn't exist
        worksheet[cellAddress].s = headerCellStyle;
      }
  
      // Apply styling for the last row (Total)
      // const totalRowIndex = data.length; // Last row index
      // for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      //   const cellAddress = XLSX.utils.encode_cell({ r: totalRowIndex, c: C });
      //   if (!worksheet[cellAddress]) continue; // Skip if cell doesn't exist
      //   worksheet[cellAddress].s = {
      //     fill: {
      //       patternType: "solid",
      //       fgColor: { rgb: "FFDD99" }, // Background kuning muda untuk total
      //     },
      //     font: {
      //       bold: true,
      //     },
      //   };
      // }
  
      // Membuat workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      // Membuat buffer binary dari workbook
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
  
      // Membuat file dan mengunduhnya
      saveExcelFile(excelBuffer, `Report_List_Project_${month}.xlsx`);
  
    } else {
      swal.error(res?.message);
    }
  };
  
  const saveExcelFile = (buffer, fileName) => {
    const data = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(data, fileName);
    dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "downloadReport" }));
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange([ranges.selection]);

    // Jika startDate dan endDate sudah terisi, close calendar
    if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
      setShowDatePicker(false);
    }
  };

  return (
    <Modal
      title="Download Report"
      modal={"downloadReport"}
      size={"w-11/12 max-w-5xl"}
      buttonFooter={null}
    >
      <div className="flex h-screen justify-between items-start">
        <div className='flex flex-row items-center gap-6 relative'>
          {/* Status Dropdown */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Status</label>
              <Select
                name='flag_aktif'
                className='pl-0 min-w-48 mr-3'
                options={[
                  {value: '001', label: 'Identified'},
                  {value: '002', label: 'Qualified'},
                  {value: '003', label: 'Proposal'},
                  {value: '004', label: 'Won'},
                  {value: '005', label: 'Handover'},
                  {value: '101', label: 'Drop'},
                  {value: '102', label: 'Close'},
                  {value: '103', label: 'Lose'},
                  {value: '', label: 'ALL'},
                ]}
                onChange={(e) => {
                  setStatus(e)
                }}
                value={status}
              />
          </div>

          {/* Range Date */}
          <div className="flex flex-col relative">
            <label className="font-semibold mb-1">Range Date</label>
            <div
              onClick={() => {
                setShowDatePicker(!showDatePicker)
              }}
              className="border rounded-full px-4 py-2 text-gray-700 cursor-pointer flex items-center w-64 h-12"
            >
              <span className="mr-2">📅</span>
              {`${format(dateRange[0].startDate, "dd/MM/yyyy")} to ${format(
                dateRange[0].endDate,
                "dd/MM/yyyy"
              )}`}
            </div>

            {showDatePicker && (
              <div className="absolute top-20 z-50 bg-white shadow-lg rounded-lg">
                <DateRange
                  editableDateInputs={true}
                  onChange={handleSelect}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  rangeColors={["#4F46E5"]}
                />
              </div>
            )}
          </div>

        </div>
        {/* <button className="btn btn-primary" onClick={status?.value === 1 ? handleDownloadBiling : handleDownloadProject}>Download</button> */}
        <button className="btn btn-primary mt-7" onClick={handleDownloadProject}>Download</button>
      </div>

    </Modal>
  )
}

export default ModalReport