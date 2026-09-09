import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsLightningCharge } from 'react-icons/bs';
import { HiOutlinePencilAlt, HiOutlineEye } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { IoFilterOutline, IoListOutline, IoSearch } from "react-icons/io5";
import { ReactComponent as Archive } from 'assets/icons/archive.svg';
// import DateRange from 'components/atoms/DateRange';
import storeSchema from 'global/store'
import { swal } from 'global/helper/swal';
// import { getCookies } from 'global/helper/cookie';
import ModalMarkAs from './components/Modal/ModalMarkAs';
import ModalPO from './components/Modal/ModalPO';
// import ModalLog from './components/Modal/ModalLogActivity';
import TableListProject from './components/TableListProject'
import { setToggleModal, setToggleModalPO } from '../../../redux/n2n/global'
// import ModalLogProject from './components/Modal/ModalLogProject';
import ModalLog from './components/Modal/ModalLog';
import ModalReport from './components/Modal/ModalDownloadReport';
import { Modal } from 'components/atoms';
import BgModal from 'assets/BgModal.svg';
import Information from './components/Modal/Information'
import ModalProgressProject from './components/Modal/ModalProgressProject';
import ModalNoted from './components/Modal/ModalNoted';
import { createPermissionChecker } from 'global/helper/permission';
import { FaListAlt, FaPlusCircle } from 'react-icons/fa';
import ModalReject from './components/Modal/ModalReject';
import ModalApprove from './components/Modal/ModalApprove';
import ModalAfterApprove from './components/Modal/ModalAfterApprove';

const ApprovalPengajuan = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const { dimensionScreenW, check, toggleModal } = useSelector((state) => state.global);
  const menu = location.state?.menu;

  const hasPermission = createPermissionChecker(menu.submenu?.actions);

  // const accountAccess = getCookies("accountAccess");

  // const [permission, setPermission] = useState([]);
  const dataRefStatusTab = [
    {
      ur_status: "Diajukan",
      kd_status: "001",
      tab_status: "DIAJUKAN",
      total_data: 12,
    },
    {
      ur_status: "Verifikasi",
      kd_status: "002",
      tab_status: "VERIFIKASI",
      total_data: 8,
    },
    {
      ur_status: "Approval",
      kd_status: "003",
      tab_status: "APPROVAL",
      total_data: 5,
    },
    {
      ur_status: "Pencairan",
      kd_status: "004",
      tab_status: "PENCAIRAN",
      total_data: 3,
    },
    {
      ur_status: "Selesai",
      kd_status: "005",
      tab_status: "SELESAI",
      total_data: 10,
    },
    {
      ur_status: "Ditolak",
      kd_status: "006",
      tab_status: "DITOLAK",
      total_data: 2,
    },
  ];
  const [refStatusTab, setRefStatusTab] = useState(dataRefStatusTab);
  const [tabActive, setTabActive] = useState({});
  const [dataTable, setDataTable] = useState(null);
  const [currentTabIndex, setCurrentTabIndex] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  // const [listStatusProject, setListStatusProject] = useState([]);
  const [keyword, setKeyword] = useState("");
  const prevKeyword = useRef(keyword);
  const [sortBy, setSortBy] = useState("Latest");
  const [noKontrak, setNoKontrak] = useState('');
  const [rangeDate, setRangeDate] = useState({
    startDate: '',
    endDate: ''
  })
  const [departmentList, setDepartmentList] = useState([]);
  const [pegawaiList, setPegawaiList] = useState([]);
  const [tableDataModal, setTableDataModal] = useState([]);
  const [dataSearch, setDataSearch] = useState({});
  const [totalSearch, setTotalSearch] = useState(0);
  const [triggerSearch, setTriggerSearch] = useState(false);

  const [keywordPO, setKeywordPO] = useState("");
  const [perPagePO, setPerPagePO] = useState(10)
  const [totalPagePO, setTotalPagePO] = useState(0)
  const [currentPagePO, setCurrentPagePO] = useState(0)
  const [dataPO, setDataPO] = useState([])
  const [selectPO, setSelectPO] = useState();
  const [detailPO, setDetailPO] = useState();

  const getDataPO = async () => {
    try {
      // swal.loading()
      const result = await storeSchema.actions.getDataIntegrasi({
        entitas: "EPROC",
        modul: "GET_PO",
        method: "GET",
        search: keywordPO,
        start: currentPagePO,
        length: perPagePO
      })
      if (result?.status) {
        setTotalPagePO(result?.data?.total_data)
        setDataPO(result?.data?.list_data)
      } else {
        setDataPO([])
      }
      return result
      // swal.close()
    } catch (error) {
      // swal.close()
      console.log(error);
    }
  }

  const handleClickPO = async (e, index) => {
    swal.loading()
    try {
      const result = await getDataPO()
      if (result?.status === true) {
        // await dispatch(setToggleModal({ isOpen: false, modal: "markAs" }));
        await dispatch(setToggleModalPO({ isOpen: true, modal: "modalPO", name: e.target.name, index: index }));
      }
      swal.close()
    } catch (error) {
      swal.error('Error Get Nomor PO From E-Proc')
      console.log(error);
    }
  }

  const handleSelectPO = (i) => {
    const value = dataPO[i]
    setSelectPO(value?.nomor_po);
    setDetailPO(value)
    dispatch(setToggleModalPO({ isOpen: false, modal: "modalPO" }));
  }

  useEffect(() => {
    getDataPO()
  }, [currentPagePO])

  useEffect(() => {
    setCurrentPagePO(0)
  }, [perPagePO])

  // const getPermission = async () => {
  //   try {
  //     const res = await storeSchema.actions.getPermissionCrud(accountAccess?.kode);
  //     if (res.message === 'Success') {
  //       setPermission(res.data);
  //     };
  //   } catch (error) {
  //     console.error(error);
  //   };
  // };
  const getRefStatus = async () => {
    try {
      const res = await storeSchema.actions.getRefStatusProject({});
      if (res.message === 'Success') {
        // setRefStatusTab(res.data);
        if (location?.state?.kd_status && location?.state?.ur_status && location?.state?.tab_status) {
          setTabActive({
            ur_status: location?.state?.ur_status,
            kd_status: location?.state?.kd_status,
            tab_status: location?.state?.tab_status,
          });
        } else {
          setTabActive({
            ur_status: res.data[0].ur_status,
            kd_status: res.data[0].kd_status,
            tab_status: res.data[0].tab_status,
          });
        };
      };
    } catch (error) {
      console.error(error);
    };
  };

  const getListTable = async () => {
    await swal.loading();
    try {
      if (tabActive?.kd_status) {
        const res = await storeSchema.actions.getListProject({
          page: 1,
          limit: 10,
          // status: (keyword === undefined || keyword === "") ? tabActive?.kd_status : null,
          status: tabActive?.kd_status,
          tab_status: tabActive?.tab_status,
          order: sortBy === 'Latest' ? 'DESC' : 'ASC',
          keyword: keyword,
          startDate: rangeDate?.startDate,
          endDate: rangeDate?.endDate,
        });

        if (res.message === 'Success') {
          swal.close();
          setDataTable(res.data);
          // if (keyword !== undefined && keyword !== "") {
          //   setTabActive({
          //     ur_status: res.data?.list_data[0].UR_STATUS,
          //     kd_status: res.data?.list_data[0].KD_STATUS,
          //     tab_status: location?.state?.tab_status || 'SA1'
          //   });
          // }
        } else {
          setDataTable({});
        };

        setTimeout(() => {
          setTriggerSearch(false)
          swal.close();
        }, 1000);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const getRefDepartment = async () => {
    try {
      const res = await storeSchema.actions.getRefDepartment();
      if (res.message === 'Success') {
        setDepartmentList(res.data);
      };
    } catch (error) {
      console.error(error);
    };
  };

  // const getListPegawai = async () => {
  //   try {
  //     const payload = {
  //       // departmentId: '2884C6EBDBBC7C7BE0632901080A1366',
  //       kelas: ['0', '1']
  //     }
  //     const res = await storeSchema.actions.getListPegawai(payload);
  //     if (res.message === 'Success') {
  //       setPegawaiList(res.data);
  //     };
  //   } catch (error) {
  //     console.error(error);
  //   };
  // };

  useEffect(() => {
    // getPermission();
    getRefStatus();
    getRefDepartment();
    // getListPegawai();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if ((tabActive?.kd_status && tabActive?.tab_status) || triggerSearch === true) {
      getListTable();
      const index = refStatusTab?.findIndex((v) => (v.kd_status === tabActive?.kd_status && v.tab_status === tabActive?.tab_status))
      setCurrentTabIndex(index);
    };
    // eslint-disable-next-line
  }, [tabActive?.kd_status, sortBy, refStatusTab, triggerSearch]);

  const getProjectSearchResult = async (keyword, start, end) => {
    try {
      const res = await storeSchema.actions.searchProject(keyword, start, end);
      return res;
    } catch (error) {
      console.error("Error saat search project:", error);
      return { status: false, data: [] };
    }
  };

  // const handleSearch = e => setKeyword(e.target.value);
  const handleSearch = async (e) => {
    e.preventDefault();
    const projectCheck = await getProjectSearchResult(keyword, rangeDate?.startDate, rangeDate?.endDate)

    if (projectCheck?.status) {
      const countMap = projectCheck?.data?.reduce((acc, item) => {
        const key = item.ur_status;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      const updated = refStatusTab.map(item => {
        const count = countMap[item.ur_status] || 0;
        return {
          ...item,
          total_data: count
        };
      });

      // setRefStatusTab(updated);

      // if(keyword !== '') {
      //   setRefStatusTab(updated);
      // } else {
      //   setRefStatusTab(updated);
      //   getRefStatus();
      // }

      setTotalSearch(projectCheck?.data.length)
      if (projectCheck.data.length > 0) {
        if (projectCheck.data.length === 1) {
          setTabActive({
            ur_status: projectCheck.data[0].ur_status,
            kd_status: projectCheck.data[0].status,
            tab_status: projectCheck.data[0].tab_status
          });
        } else {
          if ((keyword !== '' || keyword !== null) && (prevKeyword.current === keyword)) {
            const indexList = projectCheck.data.findIndex((item) => item.status === tabActive?.kd_status)
            if ((indexList + 1) === projectCheck.data.length) {
              setTabActive({
                ur_status: projectCheck.data[0].ur_status,
                kd_status: projectCheck.data[0].status,
                tab_status: projectCheck.data[0].tab_status
              });
            } else {
              setTabActive({
                ur_status: projectCheck.data[indexList + 1].ur_status,
                kd_status: projectCheck.data[indexList + 1].status,
                tab_status: projectCheck.data[indexList + 1].tab_status
              });
            }
          } else {
            setTabActive({
              ur_status: projectCheck.data[0].ur_status,
              kd_status: projectCheck.data[0].status,
              tab_status: projectCheck.data[0].tab_status
            });
          }
        }
        prevKeyword.current = keyword
        setTriggerSearch(true);
      } else {
        await swal.error('Project Tidak Ditemukan !')
      }
    } else {
      await swal.error('Project Tidak Ditemukan !')
    }
    setDataSearch({})
  };

  // useEffect(() => {
  //   if (rangeDate.startDate !== '') {
  //     const getData = setTimeout(() => {
  //       // getListTable();
  //       setKeyword(keyword);
  //     }, 1000);

  //     return () => clearTimeout(getData)
  //   }
  //   // eslint-disable-next-line
  // }, [rangeDate]);

  useEffect(() => {
    const getRef = async () => {
      const projectCheck = await getProjectSearchResult(keyword, rangeDate?.startDate, rangeDate?.endDate)

      if (projectCheck.status) {
        const countMap = projectCheck?.data?.reduce((acc, item) => {
          const key = item.ur_status;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});

        const updated = refStatusTab.map(item => {
          const count = countMap[item.ur_status] || 0;
          return {
            ...item,
            total_data: count
          };
        });

        if (updated?.length === 0) {
          getRefStatus();
        } else {
          // setRefStatusTab(updated);
        }
      }
    }


    getRef();

  }, [rangeDate?.startDate, rangeDate?.endDate])

  const handleEdit = async (e) => {
    e.preventDefault();
    navigation('/edit-project', {
      state: {
        ...location.state,
        project: 'Edit Project',
        kd_status: selectedData[0]?.KD_STATUS,
        data: {
          project_id: selectedData[0]?.PROJECT_ID,
          kd_status: selectedData[0]?.KD_STATUS
        },
      },
    });
  };

  const handleMarkAsActual = async (e) => {
    e.preventDefault();
    navigation('/mark-actual-new', {
      state: {
        ...location.state,
        project: 'Mark as Actual',
      },
    });
  };

  const handleLogActivity = async (e) => {
    e.preventDefault();
    swal.loading();
    try {
      const res = await storeSchema.actions.getLogActivity(selectedData[0]?.PROJECT_ID);
      if (res?.status === true) {
        swal.close();
        dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "logActivity", dataX: res?.data }));
      } else {
        swal.error(res?.message);
      };
    } catch (error) {
      console.error(error);
    }
  };

  const downloadReportExcel = async (e) => {
    e.preventDefault();
    dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "downloadReport" }));
  }

  return (
    <>
      <ModalMarkAs getRefStatus={getRefStatus} selectedData={selectedData} tabActive={tabActive} refStatusTab={refStatusTab} currentTabIndex={currentTabIndex} getListTable={getListTable} setTabActive={setTabActive} setKeyword={setKeyword} navigation={navigation} handleClickPO={handleClickPO} selectPO={selectPO} setSelectPO={setSelectPO} detailPO={detailPO} />
      {/* <Modal View Project /> */}
      <ModalPO dataPO={dataPO} setDataPO={setDataPO} totalPage={totalPagePO} setTotalPage={setTotalPagePO} perPage={perPagePO} setPerPage={setPerPagePO} currentPage={currentPagePO} setCurrentPage={setCurrentPagePO} setKeyword={setKeywordPO} keyword={keywordPO} handleSelectPO={handleSelectPO} getDataPO={getDataPO} />
      <Modal
        title={"Project Detail"}
        modal={"projectDetail"}
        size={"w-11/12 max-w-5xl"}
      >
        <div className='flex flex-row p-4 rounded-[20px] text-white gap-5 mb-4' style={modalStyle}>
          <div className='border-l-2'></div>
          <div className='flex flex-col gap-3'>
            <div className='font-bold'>
              {toggleModal?.dataSelect?.PROJECT_NAME}
            </div>
            <div className="flex flex-wrap gap-3 text-sm items-center">
              <div>{toggleModal?.dataSelect?.PROJECT_NO}</div>
              <div>|</div>
              <div>{toggleModal?.dataSelect?.PORTOFOLIO_UR}</div>
              <div>|</div>
              <div>{toggleModal?.dataSelect?.PROJECT_TYPE_UR}</div>
            </div>
          </div>
        </div>
        <div className='overflow-auto pb-1'>
          <div role="tablist" className="tabs tabs-bordered font-semibold">
            <div role="tab" className={`tab min-w-24 text-primary ${tabActive === 0 ? 'tab-active' : ''}`} onClick={() => setTabActive(0)}>Information</div>
            {/* <div role="tab" className={`tab min-w-44 text-primary ${tabActive === 1 ? 'tab-active' : ''}`} onClick={() => setTabActive(1)}>Billing Collection Plan</div>
            <div role="tab" className={`tab min-w-32 text-primary ${tabActive === 2 ? 'tab-active' : ''}`} onClick={() => setTabActive(2)}>Vendor Billing</div>
            <div role="tab" className={`tab min-w-44 text-primary ${tabActive === 3 ? 'tab-active' : ''}`} onClick={() => setTabActive(3)}>Dokumen Pendukung</div>
            <div role="tab" className={`tab min-w-44 text-primary ${tabActive === 4 ? 'tab-active' : ''}`} onClick={() => setTabActive(4)}>Status Billing</div> */}
          </div>
        </div>
        <div className='my-5'>
          {/* {tabActive === 0 && ( */}
          {(
            <Information data={toggleModal?.dataSelect} tableDataModal={tableDataModal} />
          )}
          {/* {tabActive === 1 && (
            <BillingCollectionPlan data={toggleModal?.dataSelect} tableDataModal={tableDataModal} />
          )}
          {tabActive === 2 && (
            <VendorBilling data={toggleModal?.dataSelect} tableDataModal={tableDataModal} />
          )}
          {tabActive === 3 && (
            <DokumenPendukung data={toggleModal?.dataSelect} tableDataModal={tableDataModal} />
          )}
          {tabActive === 4 && (
            <StatusBilling data={toggleModal?.dataSelect} tableDataModal={tableDataModal} />
          )} */}
        </div>
      </Modal>
      {/* <ModalLogProject /> */}
      <ModalLog />
      <ModalReport />
      <ModalProgressProject />
      <ModalNoted />
      <ModalReject />
      <ModalApprove />
      <ModalAfterApprove />
      <div className='bg-white px-6 pt-10 h-full'>
        <div className='flex sm:flex-row flex-col gap-5 '>
          {/* <ModalLog toggleModal={toggleModalLog} location={location} /> */}
          <div className='flex gap-3 w-full items-center'>
            <div className='rounded-xl bg-gradient-to-tl from-blue-900 to-orange-500 p-1 w-12 h-12 flex items-center justify-center'>
              <IoListOutline className='text-3xl text-white'/>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-xl font-bold text-blue-900'>Data Pengajuan</div>
              <div className='text-sm font-light'>Lihat data pengajuan anda disini.</div>
            </div>
          </div>
          <div className='flex sm:w-full sm:justify-end'>
            {/* <button className='btn btn-ghost rounded-[25px] border-[#ccc] mr-4 px-5'
              onClick={downloadReportExcel}
              disabled={!hasPermission("EXPORT")}
            >Download Report</button> */}
            {
              // (['4416', '8002', '5099', '8003'].includes(accountAccess?.kode) === false) && (
              // (hasPermission("CREATE")) && (
              <button className='btn bg-blue-900 text-white rounded-[25px] px-5 hover:scale-105' onClick={() => navigation('/add-pengajuan', { state: { ...location.state, project: 'Add Project' } })}><FaPlusCircle className=''/> Pengajuan Baru</button>
              // )
            }
          </div>
        </div>
        <hr className='border-t-2 my-6' />
        {/* TABLE */}
        <div className='flex flex-col gap-5'>
          <div className='flex lg:flex-row flex-col gap-5 items-center'>
            <form onSubmit={handleSearch} className='input input-sm input-bordered flex items-center gap-2 bg-transparent rounded-[25px]'>
              <input
                type="text"
                placeholder='Search...'
                className='grow'
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
              />
              <IoSearch onClick={handleSearch} className='cursor-pointer' />
            </form>
            {totalSearch !== 0 && (
              <div className='text-sm text-gray-500 w-[260px] lg:w-full'>
                Search Tab Results : ({totalSearch})
              </div>
            )}
            <div className='flex flex-col gap-5 lg:justify-end  sm:w-full sm:flex-row sm:items-center'>
              {/* <div className="relative">
                <DateRange className={`${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`} setRangeDate={setRangeDate} handleSearch={handleSearch} />
              </div> */}
              <div className='flex gap-3'>
                <div className='btn btn-sm rounded-[25px]'>
                  <IoFilterOutline /> Filter
                </div>
                <div className='flex sm:items-center'>
                  <span className='mr-2 text-sm font-light'>Sort by: </span>
                  <div className={`dropdown dropdown-hover dropdown-end ${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
                    <div tabIndex={0} role="button" className="btn btn-sm rounded-[25px] bg-white">{sortBy} <IoIosArrowDown /></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-28">
                      <li onClick={() => setSortBy('Latest')}><div>Latest</div></li>
                      <li onClick={() => setSortBy('Oldest')}><div>Oldest</div></li>
                    </ul>
                  </div>
                </div>
                <div className='dropdown dropdown-end'>
                  <div tabIndex={0} role='button'>
                    {/* <div className={`btn btn-sm rounded-[25px] bg-white ${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
                      Actions <IoIosArrowDown />
                    </div> */}
                  </div>
                  <div tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-5 border shadow bg-white rounded-box w-64">
                    <p className='text-md font-bold'>Actions</p>
                    {(tabActive?.tab_status !== "SA2" && selectedData?.length > 0) && (
                      <>
                        <hr className='my-2' />
                        <ul className="menu p-0 bg-white rounded-box">
                          <li>
                            <details>
                              <summary className='pl-0'>
                                <Archive /> Archive
                              </summary>
                              <ul>
                                {(noKontrak === '' || noKontrak === null) && (
                                  <li>
                                    <div onClick={() => dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "markAs", selectedData, data: "Archive", ur_archive: "drop", kd_archive: "101" }))}>Drop</div>
                                  </li>
                                )}
                                <li>
                                  <div onClick={() => dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "markAs", selectedData, data: "Archive", ur_archive: "close", kd_archive: "102" }))}>Close</div>
                                </li>
                                {(noKontrak === '' || noKontrak === null) && (
                                  <li>
                                    <div onClick={() => dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "markAs", selectedData, data: "Archive", ur_archive: "lose", kd_archive: "103" }))}>Lose</div>
                                  </li>
                                )}
                              </ul>
                            </details>
                          </li>
                        </ul>
                      </>
                    )}
                    {(tabActive?.tab_status !== "SA2" && selectedData?.length === 1) && (
                      <>
                        <hr className='my-2' />
                        <ul>
                          <li>
                            <div className='pl-0' onClick={handleEdit}>
                              <HiOutlinePencilAlt className='text-xl' /> Edit
                            </div>
                          </li>
                        </ul>
                      </>
                    )}
                    {selectedData?.length === 1 && (
                      <>
                        <hr className='my-2' />
                        <ul>
                          <li>
                            <div className='pl-0' onClick={handleLogActivity}>
                              <HiOutlineEye className='text-xl' /> Log Activity
                            </div>
                          </li>
                        </ul>
                      </>
                    )}
                    {tabActive?.kd_status !== '004' && selectedData?.length > 0 && (
                      <>
                        {tabActive?.tab_status === "SA1" && (
                          <>
                            <hr className='my-2' />
                            <button
                              className='btn btn-sm rounded-[25px] bg-sky-500 hover:bg-sky-600 text-white'
                              onClick={() => dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "markAs", selectedData, data: 'Akselerasi' }))}
                              disabled={selectedData?.length === 0 || selectedData === undefined}
                            >
                              Mark as Akselerasi <BsLightningCharge />
                            </button>
                          </>
                        )}
                        <>
                          <hr className='my-2' />
                          <button
                            className='btn btn-sm rounded-[25px] bg-gray-700 hover:bg-sky-800 text-white'
                            onClick={() => dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "markAs", selectedData, kd_status: tabActive?.kd_status, data: "Clone" }))}
                            disabled={selectedData?.length === 0 || selectedData === undefined}
                          >
                            Mark as Clone
                          </button>
                        </>
                        {tabActive?.kd_status !== '103' && (
                          <>
                            <hr className='my-2' />
                            <button
                              className='btn btn-sm rounded-[25px] bg-primary hover:bg-sky-800 text-white'
                              onClick={() => dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "markAs", selectedData, kd_status: tabActive?.kd_status, data: (tabActive?.tab_status === 'SA2' ? "Unarchive" : refStatusTab[currentTabIndex + 1]?.ur_status) }))}
                              disabled={selectedData?.length === 0 || selectedData === undefined}
                            >
                              Mark as {tabActive?.tab_status === 'SA2' ? (tabActive?.kd_status === "101" ? "Undrop" : "Unclose") : refStatusTab[currentTabIndex + 1]?.ur_status}
                            </button>
                          </>
                        )}
                      </>
                    )}
                    {tabActive?.kd_status === '004' && selectedData?.length > 0 && (
                      <>
                        {tabActive?.tab_status === "SA1" && (
                          <>
                            <hr className='my-2' />
                            <button
                              className='btn btn-sm rounded-[25px] bg-primary hover:bg-sky-600 text-white'
                              onClick={() => dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "markAs", selectedData, data: 'Handover' }))}
                              disabled={selectedData?.length === 0 || selectedData === undefined}
                            >
                              Mark as Handover
                            </button>
                          </>
                        )}
                      </>
                    )}
                    <hr className='my-2' />
                    <button
                      className='btn btn-sm rounded-[25px] bg-blue-500 hover:bg-blue-600 text-white'
                      onClick={handleMarkAsActual}
                    >
                      Mark as Actual
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
            <TableListProject navigation={navigation} location={location} refStatusTab={refStatusTab}
              tabActive={tabActive} data={dataTable} setData={setDataTable} setSelectedData={setSelectedData}
              sortBy={sortBy} setNoKontrak={setNoKontrak} rangeDate={rangeDate} noKontrak={noKontrak} currentTabIndex={currentTabIndex} dispatch={dispatch}
              check={check} dimensionScreenW={dimensionScreenW} selectedData={selectedData} toggleModal={toggleModal} departmentList={departmentList} pegawaiList={pegawaiList}
              dataSearch={dataSearch} setDataSearch={setDataSearch}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const modalStyle = {
  backgroundImage: `url(${BgModal})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

export default ApprovalPengajuan