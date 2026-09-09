import { BsLightningCharge } from 'react-icons/bs';
import { HiOutlinePencilAlt, HiOutlineEye, HiOutlinePencil } from "react-icons/hi";
import { ReactComponent as Archive } from 'assets/icons/archive.svg';
import storeSchema from 'global/store'
import { swal } from 'global/helper/swal';
import { setToggleModal } from '../../../../redux/n2n/global'
import { IoEllipsisVertical } from 'react-icons/io5';
import React from 'react'
// import { RiProgress2Line } from 'react-icons/ri';
import * as XLSX from 'xlsx-js-style';
import { saveAs } from 'file-saver';
// import { getCookies } from 'global/helper/cookie';
import { createPermissionChecker } from 'global/helper/permission';

const ActionButton = ({ dispatch, navigation, location, noKontrak, setNoKontrak, setSelectedData, currentTabIndex, tabActive, refStatusTab, dimensionScreenW, check, toggleModal, tableData, departmentList = [], pegawaiList = [] }) => {

  const menu = location.state?.menu;
  
  const hasPermission = createPermissionChecker(menu.submenu?.actions);

  // const accountAccess = getCookies("accountAccess");
  // const [tableDataModal, setTableDataModal] = useState([]);
  const handleEdit = async (e) => {
    e.preventDefault();

    navigation("/edit-project", {
      state: {
        ...location.state,
        project: "Edit Project",
        kd_status: tableData[0]?.KD_STATUS,
        data: {
          project_id: tableData[0]?.PROJECT_ID,
          kd_status: tableData[0]?.KD_STATUS,
          refStatusTab: refStatusTab,
          currentTabIndex: currentTabIndex
        },
        view: true
      },
    });
  };


  const handleView = async (e) => {
    e.preventDefault();
    navigation("/edit-project", {
      state: {
        ...location.state,
        project: "Edit Project",
        kd_status: tableData[0]?.KD_STATUS,
        data: {
          project_id: tableData[0]?.PROJECT_ID,
          kd_status: tableData[0]?.KD_STATUS,
          refStatusTab: refStatusTab,
          currentTabIndex: currentTabIndex
        },
        view: false
      },
    });
    // swal.loading();
    // try {
    //   let selectId = tableData[0]?.PROJECT_ID
    //   const res = await storeSchema.actions.getDetailProject(selectId);
    //   if (res?.status === true) {
    //     console.log(res?.data)
    //     swal.close()
    //     setTableDataModal(res?.data);
    //     dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "projectDetail", dataSelect: tableData[0] }));
    //   } else {
    //     swal.error(res?.message);
    //   }
    // } catch (error) {
    //   console.error(error)
    // }
  };

  // const handleProgress = async (e) => {
  //   e.preventDefault();
  //   swal.loading();
  //   try {
  //     let selectId = tableData[0]?.PROJECT_ID
  //     const res = await storeSchema.actions.getDetailProject(selectId);
  //     if (res?.status === true) {
  //       swal.close()
  //       setTableDataModal(res?.data);
  //       dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "progressProject", dataSelect: tableData[0] }));
  //     } else {
  //       swal.error(res?.message);
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // };

  const handleMarkAsActual = async (e) => {
    e.preventDefault();
    console.log(location)
    navigation("/mark-actual-new", {
      state: {
        ...location.state,
        project: "Mark as Actual",
      },
    });
  };

  const handleLogActivity = async (e) => {
    e.preventDefault();
    swal.loading();
    try {
      const res = await storeSchema.actions.getLogActivity(
        tableData[0]?.PROJECT_ID
      );
      if (res?.status === true) {
        swal.close();
        dispatch(
          setToggleModal({
            isOpen: !toggleModal.isOpen,
            modal: "logActivity",
            dataX: res?.data,
          })
        );
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNoted = async (e) => {
    e.preventDefault();
    dispatch(
      setToggleModal({
        isOpen: !toggleModal.isOpen,
        modal: "modalNoted",
        selectedData: tableData,
      })
    );

    // try {
    //   const res = await storeSchema.actions.getLogActivity(
    //     tableData[0]?.PROJECT_ID
    //   );
    //   if (res?.status === true) {
    //     swal.close();
    //     dispatch(
    //       setToggleModal({
    //         isOpen: !toggleModal.isOpen,
    //         modal: "noted",
    //         dataX: res?.data,
    //       })
    //     );
    //   } else {
    //     swal.error(res?.message);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  // download cbb
  const handleDownloadCbb = async () => {
    swal.loading();
    try {
      // const res = await storeSchema.actions.getListBillingCollections({
      //   page: 1,
      //   limit: 10000,
      //   // monthYear: month,
      //   year: date[0],
      //   month: date[1]
      // });

      if (1 === 1) {
        swal.close();
        const dataArray = []
        const data = [
          {
            "No": "GENERAL",
            "Item": "",
            "Summary": ""
          },
          {
            "No": "",
            "Item": "Project Name",
            "Summary": "PEKERJAAN TRANSFORMASI DIGITAL SISTEM PENCATATAN DAN PENYALURAN BBM UNTUK ALAT BONGKAR MUAT BERBASIS IOT"
          },
          {
            "No": "",
            "Item": "Project ID",
            "Summary": "xxx-xxx-xxxx"
          },
          {
            "No": "",
            "Item": "Customer",
            "Summary": "PT. PELABUHAN INDONESIA (PERSERO)"
          },
          {
            "No": "",
            "Item": "Delivery Time",
            "Summary": "2 bulan"
          },
          {
            "No": "",
            "Item": "Project Duration",
            "Summary": "2 bulan"
          },
          {
            "No": "",
            "Item": "No. SPK Customer",
            "Summary": ""
          },
          {
            "No": "",
            "Item": "No. Kontrak Customer",
            "Summary": ""
          },
          {
            "No": "",
            "Item": "Tanggal Kontrak",
            "Summary": ""
          },
          {
            "No": "",
            "Item": "Tanggal Target Pekerjaan Mulai",
            "Summary": ""
          },
          {
            "No": "",
            "Item": "Target Pekerjaan Selesai",
            "Summary": ""
          },
          {
            "No": "",
            "Item": "Kandidat Mitra",
            "Summary": "Tim ETDS sebagai project management pekerjaan dan tim yang supervisilingkup pekerjaan dari resource eksternal"
          },
          {
            "No": "",
            "Item": "Keterangan Lainnya",
            "Summary": ""
          },
          {
            "No": "TECHNICAL",
            "Item": "",
            "Summary": ""
          },
          {
            "No": "",
            "Item": "Scope of Work",
            "Summary": ""
          },
          {
            "No": "BUDGET PLAN",
            "Item": "",
            "Summary": ""
          },
          {
            "No": "",
            "Item": "TOTAL CBB",
            "Summary": 474560000
          },
          {
            "No": "A",
            "Item": "Contract Budget Base ETDS",
            "Summary": 158440000
          },
          {
            "No": "",
            "Item": "Beban Project - Vendor",
            "Summary": 0
          },
          {
            "No": "",
            "Item": "Beban Project - Personal",
            "Summary": 113340000
          },
          {
            "No": "",
            "Item": "Beban Project - CA",
            "Summary": 45100000
          },
          {
            "No": "",
            "Item": "Beban Project - SPPD",
            "Summary": 0
          },
          {
            "No": "",
            "Item": "Beban Project - At Cost",
            "Summary": 0
          },
          {
            "No": "B",
            "Item": "Contract Budget Base DGIS",
            "Summary": 316120000
          },
          {
            "No": "",
            "Item": "Beban Project - Vendor",
            "Summary": 293000000
          },
          {
            "No": "",
            "Item": "Beban Project - Personal",
            "Summary": 15120000
          },
          {
            "No": "",
            "Item": "Beban Project - CA",
            "Summary": 8000000
          },
          {
            "No": "",
            "Item": "Beban Project - SPPD",
            "Summary": 0
          },
          {
            "No": "",
            "Item": "Beban Project - At Cost",
            "Summary": 0
          },
          {
            "No": "C",
            "Item": "At Cost / Reimbursement Cost (if any)",
            "Summary": 0
          },
        ]

        // Membuat worksheet dari data
        const worksheet = XLSX.utils.json_to_sheet(data, {
          origin: 'A4'
        });

        // Menambahkan judul di baris pertama
        XLSX.utils.sheet_add_aoa(worksheet, [[`CONTRACT BUDGET BASE`]], { origin: 'A1' });
        XLSX.utils.sheet_add_aoa(worksheet, [[`PEKERJAAN TRANSFORMASI DIGITAL`]], { origin: 'A2' });
        XLSX.utils.sheet_add_aoa(worksheet, [[``]], { origin: 'A3' });

        // Mengatur lebar kolom sesuai dengan data
        const columnWidths = [
          { wch: 10 },   // No
          { wch: 50 },  // ITEM
          { wch: 70 },  // SUMMARY
        ];

        worksheet['!merges'] = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
          { s: { r: 1, c: 0 }, e: { r: 1, c: 2 } },
          { s: { r: 2, c: 0 }, e: { r: 2, c: 2 } },
          { s: { r: 4, c: 0 }, e: { r: 4, c: 2 } },
          { s: { r: 17, c: 0 }, e: { r: 17, c: 2 } },
          { s: { r: 19, c: 0 }, e: { r: 19, c: 2 } },
        ];
        worksheet['!cols'] = columnWidths;
        // worksheet['!autofilter'] = { ref: "A4:H4" };

        // Menentukan style untuk header table (baris pertama)
        const headerStyle = {
          fill: {
            patternType: "solid",
          },
          font: {
            bold: true,
          },
          alignment: {
            horizontal: "center",
            vertical: "center"
          },
        };

        // Memberi warna background pada header dan total
        const headerCellStyle = {
          fill: {
            patternType: "solid",
            fgColor: { rgb: "004673" }, // Background biru untuk header
          },
          font: {
            bold: true,
            color: { rgb: "ffffff" }
          },
          alignment: {
            horizontal: "center",
            vertical: "center"
          },
          border: {
            top: { style: 'thin', color: { rgb: '000000' } },
            bottom: { style: 'thin', color: { rgb: '000000' } },
            left: { style: 'thin', color: { rgb: '000000' } },
            right: { style: 'thin', color: { rgb: '000000' } },
          }
        };

        const subHeaderCellStyle = {
          fill: {
            patternType: "solid",
            fgColor: { rgb: "d8f0ff" }, // Background biru pudar untuk header
          },
          font: {
            bold: true,
          },
          alignment: {
            horizontal: "center",
            vertical: "center"
          },
          border: {
            top: { style: 'thin', color: { rgb: '000000' } },
            bottom: { style: 'thin', color: { rgb: '000000' } },
            left: { style: 'thin', color: { rgb: '000000' } },
            right: { style: 'thin', color: { rgb: '000000' } },
          }
        };

        const subSubHeaderCellStyle = {
          fill: {
            patternType: "solid",
          },
          font: {
            bold: true,
          },
          border: {
            top: { style: 'thin', color: { rgb: '000000' } },
            bottom: { style: 'thin', color: { rgb: '000000' } },
            left: { style: 'thin', color: { rgb: '000000' } },
            right: { style: 'thin', color: { rgb: '000000' } },
          }
        };

        // Style untuk sel biasa
        const normalStyle = {
          border: {
            top: { style: 'thin', color: { rgb: '000000' } },
            bottom: { style: 'thin', color: { rgb: '000000' } },
            left: { style: 'thin', color: { rgb: '000000' } },
            right: { style: 'thin', color: { rgb: '000000' } },
          }
        };

        //hanya tengah
        const justCenterBold = {
          alignment: {
            horizontal: "center",
            vertical: "center"
          },
          border: {
            top: { style: 'thin', color: { rgb: '000000' } },
            bottom: { style: 'thin', color: { rgb: '000000' } },
            left: { style: 'thin', color: { rgb: '000000' } },
            right: { style: 'thin', color: { rgb: '000000' } },
          },
          font: {
            bold: true,
          },
        }

        // Menerapkan style ke setiap sel
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let R = range.s.r; R <= range.e.r; R++) {
          for (let C = range.s.c; C <= range.e.c; C++) {
            const cellRef = XLSX.utils.encode_cell({ r: R, c: C });

            if (!worksheet[cellRef]) {
              worksheet[cellRef] = { v: '', t: 's' };
            }

            // Terapkan style berdasarkan posisi sel
            if ([0, 1, 2].includes(R)) {
              // Header style untuk baris pertama
              worksheet[cellRef].s = headerStyle;
            } else if ([3].includes(R)) {
              // Header style untuk baris pertama
              worksheet[cellRef].s = headerCellStyle;
            } else if ([4, 17, 19].includes(R)) {
              // Header style untuk baris pertama
              worksheet[cellRef].s = subHeaderCellStyle;
            } else if ([20, 21, 27, 33].includes(R)) {
              // Header style untuk baris pertama
              worksheet[cellRef].s = subSubHeaderCellStyle;
              if ([0].includes(C)) {
                worksheet[cellRef].s = justCenterBold;
              }
            } else if ([0].includes(C)) {
              // Header style untuk baris pertama
              worksheet[cellRef].s = justCenterBold;
            } else {
              // Normal style untuk sel lainnya
              worksheet[cellRef].s = normalStyle;
            }
          }
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
        saveExcelFile(excelBuffer, `Report_CBB.xlsx`);

      } else {
        swal.error('error');
      }
    } catch (error) {
      swal.error(error?.msg || error?.message);
    }
  };

  const saveExcelFile = (buffer, fileName) => {
    const data = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(data, fileName);
  };

  return (
    <div className="dropdown dropdown-right" onClick={() => {
      setNoKontrak(noKontrak)
      setSelectedData(tableData)
    }}>
      <div tabIndex={0} role="button">
        <div
          className={`btn btn-sm rounded-[25px] bg-white ${dimensionScreenW < 768 && check ? "bringToBack" : ""
            }`}
        >
          <IoEllipsisVertical />
        </div>
      </div>
      <div
        tabIndex={0}
        className="menu menu-md dropdown-content mt-3 z-[1] p-5 border shadow bg-white rounded-box w-64"
      >
        <p className="text-md font-bold">Action</p>
        {/* {tabActive?.tab_status !== "SA2" && (['8002', '5099', '8003'].includes(accountAccess?.kode) === false) && ( */}
        {tabActive?.tab_status !== "SA2" && hasPermission("ARCHIVE") && (
          <>
            <hr className="my-2" />
            <ul className="menu p-0 bg-white rounded-box">
              <li>
                <details>
                  <summary className="pl-0">
                    <Archive /> Archive
                  </summary>
                  <ul>
                    {(
                      <li>
                        <div
                          onClick={() =>
                            dispatch(
                              setToggleModal({
                                isOpen: !toggleModal?.isOpen,
                                modal: "markAs",
                                selectedData: tableData,
                                data: "Archive",
                                ur_archive: "drop",
                                kd_archive: "101",
                              })
                            )
                          }
                        >
                          Drop
                        </div>
                      </li>
                    )}
                    <li>
                      <div
                        onClick={() =>
                          dispatch(
                            setToggleModal({
                              isOpen: !toggleModal?.isOpen,
                              modal: "markAs",
                              selectedData: tableData,
                              data: "Archive",
                              ur_archive: "close",
                              kd_archive: "102",
                            })
                          )
                        }
                      >
                        Close
                      </div>
                    </li>
                    {(
                      <li>
                        <div
                          onClick={() =>
                            dispatch(
                              setToggleModal({
                                isOpen: !toggleModal?.isOpen,
                                modal: "markAs",
                                selectedData: tableData,
                                data: "Archive",
                                ur_archive: "lose",
                                kd_archive: "103",
                              })
                            )
                          }
                        >
                          Lose
                        </div>
                      </li>
                    )}
                  </ul>
                </details>
              </li>
            </ul>
          </>
        )}
        {/* {tabActive?.kd_status === '005' && (
          <>
            <hr className="my-2" />
            <ul>
              <li>
                <div className="pl-0" onClick={handleProgress}>
                  <RiProgress2Line className='text-xl' /> Input Progress
                </div>
              </li>
            </ul>
          </>
        )} */}
        {/* {tabActive?.tab_status !== "SA2" && ( */}
          <>
            {/* {(['8002', '5099', '8003'].includes(accountAccess?.kode) === false) && ( */}
            {hasPermission("UPDATE") && (
              <>
                <hr className="my-2" />
                <ul>
                  <li>
                    <div className="pl-0" onClick={handleEdit}>
                      <HiOutlinePencilAlt className="text-xl" /> Edit
                    </div>
                  </li>
                </ul>
              </>
            )}
            {hasPermission("READ") && (
              <>
                <hr className="my-2" />
                <ul>
                  <li>
                    <div className="pl-0" onClick={handleView}>
                      <HiOutlineEye className="text-xl" /> View
                    </div>
                  </li>
                </ul>
              </>
            )}
            {/* {(['8002', '5099', '8003'].includes(accountAccess?.kode) === true) && (
              <>
                <hr className="my-2" />
                <ul>
                  <li>
                    <div className="pl-0" onClick={handleView}>
                      <HiOutlineEye className="text-xl" /> View
                    </div>
                  </li>
                </ul>
              </>
            )} */}
          </>
        {/* )} */}
        {/* {tabActive?.tab_status === "SA2" && (
          <>
            {(['4382', '4416'].includes(accountAccess?.kode) === true) && (
              <>
                <hr className="my-2" />
                <ul>
                  <li>
                    <div className="pl-0" onClick={handleView}>
                      <HiOutlineEye className="text-xl" /> View
                    </div>
                  </li>
                </ul>
              </>
            )}
          </>
        )} */}
        {/* {(
          <>
            <hr className="my-2" />
            <ul>
              <li>
                <div className="pl-0" onClick={handleLogActivity}>
                  <HiOutlineEye className="text-xl" /> Log Activity
                </div>
              </li>
            </ul>
            {(['8002', '5099', '8003'].includes(accountAccess?.kode) === false) && (
              <>
                <hr className="my-2" />
                <ul>
                  <li>
                    <div className="pl-0" onClick={handleNoted}>
                      <HiOutlinePencil className="text-xl" /> Noted / Remark
                    </div>
                  </li>
                </ul>
              </>
            )}
          </>
        )} */}
        {hasPermission("LOG") && (
          <>
            <hr className="my-2" />
            <ul>
              <li>
                <div className="pl-0" onClick={handleLogActivity}>
                  <HiOutlineEye className="text-xl" /> Log Activity
                </div>
              </li>
            </ul>
          </>
        )}
        {hasPermission("REMARK") && (
          <>
            <hr className="my-2" />
            <ul>
              <li>
                <div className="pl-0" onClick={handleNoted}>
                  <HiOutlinePencil className="text-xl" /> Noted / Remark
                </div>
              </li>
            </ul>
          </>
        )}
        {/* {tabActive?.kd_status !== "004" && (['8002', '5099', '8003'].includes(accountAccess?.kode) === false) && ( */}
        {tabActive?.kd_status !== "004" && hasPermission("MARK AS") && (
          <>
            {tabActive?.tab_status === "SA1" && (
              <>
                <hr className="my-2" />
                <button
                  className="btn btn-sm rounded-[25px] bg-sky-500 hover:bg-sky-600 text-white"
                  onClick={() =>
                    dispatch(
                      setToggleModal({
                        isOpen: !toggleModal?.isOpen,
                        modal: "markAs",
                        selectedData: tableData,
                        data: "Akselerasi",
                      })
                    )
                  }

                >
                  Mark as Akselerasi <BsLightningCharge />
                </button>
              </>
            )}
            {
              hasPermission("MARK AS") && (
                <>
                  <hr className="my-2" />
                  <button
                    className="btn btn-sm rounded-[25px] bg-gray-700 hover:bg-sky-800 text-white"
                    onClick={() =>
                      dispatch(
                        setToggleModal({
                          isOpen: !toggleModal?.isOpen,
                          modal: "markAs",
                          selectedData: tableData,
                          kd_status: tabActive?.kd_status,
                          data: "Clone",
                        })
                      )
                    }

                  >
                    Mark as Clone
                  </button>
                </>
              )
            }
            {tabActive?.kd_status !== '103' && hasPermission("MARK AS") && (
              <>
                <hr className='my-2' />
                <button
                  className='btn btn-sm rounded-[25px] bg-primary hover:bg-sky-800 text-white'
                  onClick={() => dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "markAs", selectedData: tableData, kd_status: tabActive?.kd_status, data: (tabActive?.tab_status === 'SA2' ? "Unarchive" : refStatusTab[currentTabIndex + 1]?.ur_status) }))}
                >
                  Mark as {tabActive?.tab_status === 'SA2' ? (tabActive?.kd_status === "101" ? "Undrop" : "Unclose") : refStatusTab[currentTabIndex + 1]?.ur_status}
                </button>
              </>
            )}
          </>
        )}
        {/* {(tabActive?.kd_status === "004" && ['8002', '5099'].includes(accountAccess?.kode) === false && tableData[0]?.PROJECT_TYPE_ID === '1') && ( */}
        {(tabActive?.kd_status === "004" && hasPermission("MARK AS") && tableData[0]?.PROJECT_TYPE_ID === '1') && (
          <>
            {tabActive?.tab_status === "SA1" && (
              <>
                <hr className="my-2" />
                <button
                  className="btn btn-sm rounded-[25px] bg-primary hover:bg-sky-600 text-white"
                  onClick={() =>
                    dispatch(
                      setToggleModal({
                        isOpen: !toggleModal?.isOpen,
                        modal: "markAs",
                        selectedData: tableData,
                        data: "Handover",
                        kd_status: tabActive?.kd_status,
                        departmentList: departmentList,
                        pegawaiList: pegawaiList,
                      })
                    )
                  }

                >
                  Mark as Handover
                </button>
              </>
            )}
          </>
        )}
        {/* {(['8002', '5099'].includes(accountAccess?.kode) === false && ["003"].includes(tabActive?.kd_status) && tableData[0]?.PROJECT_TYPE_ID === '2') && ( */}
        {(hasPermission("MARK AS") && ["003"].includes(tabActive?.kd_status) && tableData[0]?.PROJECT_TYPE_ID === '2') && (
          <>
            <hr className="my-2" />
            <button
              className="btn btn-sm rounded-[25px] bg-green-500 hover:bg-green-600 text-white"
              onClick={handleMarkAsActual}
            >
              Mark as Actual
            </button>
          </>
        )}

        {/* add report  */}
        {/* {["004", "005"].includes(tabActive?.kd_status) && accountAccess?.kode !== '8002' && ( */}
        {["004", "005"].includes(tabActive?.kd_status) && hasPermission("EXPORT") && (
          <>
            {tabActive?.tab_status === "SA1" && (
              <>
                <hr className="my-2" />
                <button
                  className="btn btn-sm rounded-[25px] bg-info hover:bg-sky-600 text-white"
                  onClick={() =>
                    handleDownloadCbb()
                  }
                >
                  Download Report CBB
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ActionButton