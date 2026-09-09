import React, { useEffect, useRef, useState } from 'react'
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdTrash } from "react-icons/io";
import { AsyncSelect, Modal } from 'components/atoms';
import { swal } from 'global/helper/swal';
import storeSchema from 'global/store';
import { setDataDetailProject, setToggleModal, setToggleModalPO } from '../../../../../redux/n2n/global';
import { AiOutlineSave } from 'react-icons/ai';
import { RxPlusCircled } from 'react-icons/rx';
import { IoCalendarOutline, IoCheckboxOutline, IoCloseSharp, IoPerson, IoCheckmarkDone, IoCheckmarkCircleSharp, IoDownloadOutline, IoWarningOutline, IoSearch } from 'react-icons/io5';
import { formatDateUS } from 'global/helper/formatDate';
import no_data from 'assets/no_data.png'
import { useLocation } from 'react-router-dom'
import DokumenPendukung from '../TabDokumenModalMarkAs/DokumenPendukung';
import Rfi from '../TabDokumenModalMarkAs/Rfi';
import Cbb from '../TabDokumenModalMarkAs/Cbb';
import Kontrak from '../TabDokumenModalMarkAs/Kontrak';
import ReactPaginate from 'react-paginate';

const ModalMarkAs = ({ getRefStatus, selectedData, tabActive, refStatusTab, currentTabIndex, getListTable, setTabActive, setKeyword, navigation, handleClickPO, selectPO, setSelectPO, getDetailProject2, detailPO }) => {
  const dispatch = useDispatch();
  const { toggleModal, toggleModalPO } = useSelector((state) => state.global)
  const headerTable = ["Nomor PO", "Nomor PR", "Nama Pekerjaan"];

  const location = useLocation();
  const { project, data } = location?.state;

  const [cantMarkAs, setCantMarkAs] = useState(false);
  const [cantAcceleration, setCantAcceleration] = useState(false);
  const [department, setDepartment] = useState({ departmentName: '' });
  const [selectedOptions, setSelectedOptions] = useState([]);

  const dummyFieldTeam = {
    assign_id: "",
    role: "",
    nama: "",
    nip: "",
    status: {
      canUpload: true,
      canDelete: false,
    },
  };

  const dummyField = {
    dokumen_id: "",
    tipe_dokumen: "01",
    no_dokumen: "",
    tgl_dokumen: "",
    jns_dokumen: "",
    uraian_jns: "",
    url_dokumen: "",
    created_at: "",
    status: {
      canUpload: true,
      canDelete: false,
    },
  };

  const [dataFields, setDataFields] = useState([dummyField]);
  const [dataFieldsRfi, setDataFieldsRfi] = useState([]);
  const [dataFieldsCbb, setDataFieldsCbb] = useState([]);
  const [dataFieldsKontrak, setDataFieldsKontrak] = useState([]);
  const [dataFieldsTeam, setDataFieldsTeam] = useState([dummyFieldTeam]);
  const headerTableTeam = ['Role', 'Nama', 'NIP', 'Action']
  const [listKaryawan, setListKaryawan] = useState([]);
  const [remark, setRemark] = useState('');
  const [listRemarks, setListRemarks] = useState([])
  const [documents, setDocuments] = useState([])
  const [dokumenPendukung, setDokumenPendukung] = useState([])
  const [dokumenCBB, setDokumenCBB] = useState([])
  const [dokumenKontrak, setDokumenKontrak] = useState([])
  const [dokumenRfi, setDokumenRfi] = useState([])
  const [tabs, setTabs] = useState(['Dokumen Pendukung']);
  const [activeTab, setActiveTab] = useState('Dokumen Pendukung');
  const [flagValidasi, setFlagValidasi] = useState(false);
  const [jnsKontrak, setJnsKontrak] = useState({});
  const [catRevenue, setCatRevenue] = useState({});
  const [selectContract, setSelectContract] = useState({});
  const [contractStart, setContractStart] = useState('');
  const [contractEnd, setContractEnd] = useState('');
  
  const getListRemarks = async (data) => {
    try {
      const res = await storeSchema.actions.getListRemarks(data)
      if (res?.status) {
        setListRemarks(res?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getDetailProject = async (project_id) => {
    const res = await storeSchema.actions.getDetailProject(project_id);

    if (res?.status) {
      setSelectPO(res?.data?.PO_NUMBER)
      // dokumen pendukung
      const newData = res?.data?.DOKUMEN_PENDUKUNG?.map((value) => {
        return {
          dokumen_id: value?.DOKUMEN_ID,
          tipe_dokumen: value?.TIPE_DOKUMEN,
          no_dokumen: value?.NO_DOKUMEN,
          tgl_dokumen: value?.TGL_DOKUMEN?.substring(0, 10),
          value_dok: value?.VALUE_DOK,
          notes: value?.NOTES,
          jns_dokumen: value?.JNS_DOKUMEN,
          url_dokumen: value?.URL_DOKUMEN,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDokumenPendukung(newData);
      setDataFields(newData);
      // dokumen CBB
      const newDataCBB = res?.data?.DOKUMEN_CBB?.map((value) => {
        return {
          dokumen_id: value?.DOKUMEN_ID,
          tipe_dokumen: value?.TIPE_DOKUMEN,
          no_dokumen: value?.NO_DOKUMEN,
          tgl_dokumen: value?.TGL_DOKUMEN?.substring(0, 10),
          value_dok: value?.VALUE_DOK,
          notes: value?.NOTES,
          jns_dokumen: value?.JNS_DOKUMEN,
          url_dokumen: value?.URL_DOKUMEN,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDokumenCBB(newDataCBB);
      setDataFieldsCbb(newDataCBB);
      // dokumen kontrak
      const newDataKontrak = res?.data?.DOKUMEN_KONTRAK?.map((value) => {
        return {
          dokumen_id: value?.DOKUMEN_ID,
          tipe_dokumen: value?.TIPE_DOKUMEN,
          no_dokumen: value?.NO_DOKUMEN,
          tgl_dokumen: value?.TGL_DOKUMEN?.substring(0, 10),
          value_dok: value?.VALUE_DOK,
          notes: value?.NOTES,
          jns_dokumen: value?.JNS_DOKUMEN,
          url_dokumen: value?.URL_DOKUMEN,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDokumenKontrak(newDataKontrak);
      setDataFieldsKontrak(newDataKontrak);
      // assign team
      const newDataAssign = res?.data?.ASSIGN_PROJECT?.map((value) => {
        return {
          assign_id: value?.ASSIGN_ID,
          role: value?.ROLE_PROJECT,
          nama: value?.NAMA,
          nip: value?.NIP,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDataFieldsTeam(newDataAssign);
      // dokumen rfi
      const newDataRFI = res?.data?.DOKUMEN_RFI?.map((value) => {
        return {
          dokumen_id: value?.DOKUMEN_ID,
          tipe_dokumen: value?.TIPE_DOKUMEN,
          no_dokumen: value?.NO_DOKUMEN,
          tgl_dokumen: value?.TGL_DOKUMEN?.substring(0, 10),
          value_dok: value?.VALUE_DOK,
          notes: value?.NOTES,
          jns_dokumen: value?.JNS_DOKUMEN,
          url_dokumen: value?.URL_DOKUMEN,
          created_at: value?.CREATED_AT,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDokumenRfi(newDataRFI);
      setDataFieldsRfi(newDataRFI);
      dispatch(setDataDetailProject(res?.data));
    } else {
      setDataFields([dummyField]);
      setDataFieldsTeam([dummyFieldTeam]);
      setDokumenCBB([]);
    }
  }
  
  useEffect(() => {
    if (toggleModal?.selectedData?.length > 0) {
      const findCanMarkAs = toggleModal?.selectedData?.findIndex((item) => item.TO_MARK === 0);
      if (findCanMarkAs === -1) {
        setCantMarkAs(false);
      } else {
        setCantMarkAs(true);
      };

      const findCanAcceleration = toggleModal?.selectedData?.findIndex((item) => item.TO_AKSELERASI === 0);
      if (findCanAcceleration === -1) {
        setCantAcceleration(false);
      } else {
        setCantAcceleration(true);
      };
    };
  }, [toggleModal]);

  const markKdStatus = (kd) => {
    let return_kd;
    if (kd === '001') {
      return_kd = '002'
    }
    if (kd === '002') {
      return_kd = '003'
    }
    if (kd === '003') {
      return_kd = '004'
    }
    if (kd === '004') {
      return_kd = '005'
    }
    return return_kd
  }

  const handleMarkAs = async (e) => {
    e.preventDefault();
    try {
      swal.loading()

      const statusTab = project === 'Edit Project' ? selectedData : selectedData[0]

      const isHandover = toggleModal?.data === "Handover";
      const isClone = toggleModal?.data === "Clone";
      const isAkselerasi = toggleModal?.data === "Akselerasi";
      const isArchive = toggleModal?.data === "Archive";
      const isUnarchive = toggleModal?.data === "Unarchive";

      const arrProjectId = toggleModal?.selectedData?.map(item => item.PROJECT_ID);
      const arrProjectNo = toggleModal?.selectedData?.map(item => item.PROJECT_NO);
      const selectedEmpty = selectedData?.length === 0 || toggleModal?.selectedData?.length === 0;

      // Cek jika tidak bisa lanjut
      if (selectedEmpty || (isAkselerasi ? cantAcceleration : (isArchive || isUnarchive ? false : cantMarkAs))) {
        return await swal.custom('Tidak Dapat Disubmit !', 'Tidak Memiliki Ases Untuk Submit', 'warning');;
      }

      // === HANDLE HANDOVER ===
      if (isHandover) {
        const payloadMark = {
          project_id: arrProjectId,
          project_no: arrProjectNo[0],
          status: '005',
          id_tab_status: 'SA1',
        };

        const res = await storeSchema.actions.markAsProject(payloadMark);
        if (res?.status === true) {
          if (['003', '004'].includes(statusTab?.KD_STATUS)) {
            const form = {
              project_id: statusTab?.PROJECT_ID,
              project_no: statusTab?.PROJECT_NO,
              portofolio_id: statusTab?.PORTOFOLIO_ID,
              po_number: selectPO,
            };
            await storeSchema.actions.updateProject(form);
          }
          if (project === 'Edit Project') getDetailProject2()
          await swal.success(res?.message);
        } else {
          return swal.error(res?.message);
        }

        dispatch(setToggleModal({ isOpen: false, modal: "" }));
        setKeyword('');

        if (project === 'Edit Project') {
          return navigation('/list-project', {
            state: {
              ...location.state,
              ...refStatusTab[currentTabIndex + 1]
            }
          });
        }

        setTabActive(refStatusTab[currentTabIndex + 1]);
        navigation('', {
          state: {
            ...location.state,
            ...refStatusTab[currentTabIndex + 1]
          }
        });

        return getListTable(), getRefStatus();
      }

      // === HANDLE CLONE ===
      if (isClone) {
        const res = await storeSchema.actions.markAsClone({ project_id: arrProjectId });
        if (res?.status === true) {
          await swal.success(res?.message);
          dispatch(setToggleModal({ isOpen: false, modal: "" }));
          return getListTable(), getRefStatus();
        }
        return swal.error(res?.message);
      }

      // === HANDLE UNARCHIVE ===
      if (tabActive?.tab_status === "SA2") {
        const res = await storeSchema.actions.markAsUnarchive({ project_id: arrProjectId });
        if (res?.status === true) {
          await swal.success(res?.message);
          dispatch(setToggleModal({ isOpen: false, modal: "" }));
          return getListTable(), getRefStatus();
        }
        return swal.error(res?.message);
      }

      // === HANDLE ARCHIVE ===
      if (toggleModal?.kd_archive) {
        const res = await storeSchema.actions.markAsArchive({
          project_id: arrProjectId,
          project_no: arrProjectNo[0],
          archive: toggleModal.kd_archive,
          id_tab_status: 'SA2',
        });

        if (res?.status === true) {
          await swal.success(res?.message);
        } else {
          swal.error(res?.message);
        }

        dispatch(setToggleModal({ isOpen: false, modal: "" }));
        return getListTable(), getRefStatus();
      }

      // === HANDLE VALIDASI DOKUMEN (untuk kasus lain seperti Approval) ===
      const matchedData = [...dokumenPendukung, ...dokumenCBB, ...dokumenKontrak].filter(d2 =>
        documents.some(d1 => d1.kd_ref === d2.jns_dokumen)
      );

      // open validasi 03-07-2025
      // if (matchedData.length < documents.length) {
      //   return await swal.custom('Tidak Dapat Disubmit !', 'Dokumen Yang Wajib Terupload Belum Terpenuhi', 'error');
      // }

      // === HANDLE AKSELERASI / PROJECT MARKING ===
      if (isAkselerasi) {
        const res = await storeSchema.actions.markAsAcceleration({ project_id: arrProjectId });
        if (res?.status === true) {
          getDetailProject(arrProjectId);
          await swal.success(res?.message);
        } else {
          return swal.error(res?.message);
        }
      } else {
        
        let payloadMark = {
          project_id: arrProjectId,
          status: isHandover
            ? '005'
            : refStatusTab
              ? refStatusTab[currentTabIndex + 1]?.kd_status
              : project === "Edit Project"
                ? await markKdStatus(toggleModal?.kd_status)
                : toggleModal?.kd_status,
          id_tab_status: 'SA1',
        };

        // // off sementara
        // // let listIdPegawai = [];
        // // if (toggleModal?.kd_status === "004") {
        // //   payloadMark.departmentName = department?.departmentName || 'XXX';
        // //   const getPegawai = toggleModal?.pegawaiList?.filter(a => a?.departmentId === department?.departmentName);
        // //   listIdPegawai = getPegawai?.map(item => item?.nrp || '') || [];
        // // }

        const res = await storeSchema.actions.markAsProject(payloadMark);
        
        if (res?.status === true) {
          if (['003'].includes(statusTab?.KD_STATUS)) {
            
            const form = {
              project_id: statusTab?.PROJECT_ID,
              contract_type: jnsKontrak.value,
              po_number: selectPO,
              detailPO: detailPO,
              contract_select: selectContract.value,
              select_id: selectContract.selectId,
              kategori_revenue: catRevenue.value,
              contract_start: contractStart,
              contract_end: contractEnd
            };
            await storeSchema.actions.updateProjectNewPID(form);
          }

          if (['004'].includes(statusTab?.KD_STATUS)) {
            
            const form = {
              project_id: statusTab?.PROJECT_ID,
              project_no: statusTab?.PROJECT_NO,
              portofolio_id: statusTab?.PORTOFOLIO_ID,
              po_number: selectPO,
              detailPO: detailPO,
              kategori_revenue: catRevenue.value,
              contract_start: contractStart,
              contract_end: contractEnd
            };
            await storeSchema.actions.updateProject(form);
          }

          // off kirim notif sementara
          // if (toggleModal?.kd_status === "004" && listIdPegawai.length) {
          //   await storeSchema.actions.insertNotification({
          //     category: 1,
          //     channel: 1,
          //     nip_tujuan: listIdPegawai,
          //     title: "APPROVED",
          //     body: "Billing Termin 1 Sudah Bisa Dilanjutkan",
          //     project_id: arrProjectId?.[0],
          //     link: "",
          //     fcm: "",
          //   });
          // }
          getDetailProject(arrProjectId);
          await swal.success(res?.message);
        } else {
          return swal.error(res?.message);
        }
        dispatch(setToggleModal({ isOpen: false, modal: "" }));

        if (project === 'Edit Project') {
          return navigation('/list-project', {
            state: {
              ...location.state,
              ...refStatusTab[currentTabIndex + 1]
            }
          });
        }

        const nextStatusTab = refStatusTab?.[currentTabIndex + 1];
        if (nextStatusTab) {
          setTabActive(nextStatusTab);
          navigation('', {
            state: {
              ...location.state,
              ...nextStatusTab
            }
          });
        }
      }

      dispatch(setToggleModal({ isOpen: false, modal: "" }));
      getListTable();
      getRefStatus();
    } catch (error) {
      console.error(error)
    };
  };

  const handleSetDepartmentName = (e) => {
    const { name, value } = e.target;
    setDepartment((state) => {
      return {
        ...state,
        [name]: value,
      }
    })
  };

  const handleChangeTeam = (e, i) => {
    const values = [...dataFieldsTeam];
    values[i][e.target.name] = e.target.value;
    setDataFieldsTeam(values);
  };

  const handleChangeTeamSelect = (e, i) => {
    setSelectedOptions(e)
    const values = [...dataFieldsTeam];
    values[i]['nama'] = e.label;
    values[i]['nip'] = e.value;
    setDataFieldsTeam(values);
  };

  useEffect(() => {
    if (Object.keys(selectedOptions).length > 0) {

    }
  }, [selectedOptions])

  const handleUploadTeam = async (e, i) => {
    e.preventDefault();
    try {
      swal.loading();
      const value = dataFieldsTeam[i];
      const payload = {
        nip: value?.nip, // dokumen pendukung
        role_project: value?.role,
        project_id: toggleModal?.selectedData[0]?.PROJECT_ID
      };

      const res = await storeSchema.actions.assignTeam(payload);
      if (res?.status === true) {
        const pay = {
          category: 1,
          channel: 1,
          nip_tujuan: [`${value?.nip}`],
          title: "You Are Assigned to a project (" + toggleModal?.selectedData[0]?.PROJECT_NO + ")",
          body: toggleModal?.selectedData[0]?.PROJECT_NAME,
          project_id: toggleModal?.selectedData[0]?.PROJECT_ID,
          link: "",
          navigate_to: "/project-profile"
        }
        await storeSchema.actions.insertNotification(pay)
        getDetailProject(toggleModal?.selectedData[0]?.PROJECT_ID)
        await swal.success();
      } else {
        await swal.custom('Tidak Dapat Disimpan !', res?.message, 'error');
      };
    } catch (error) {
      console.error(error);
    };
  };

  const handleAddFieldTeam = () => {
    setDataFieldsTeam([
      ...dataFieldsTeam,
      dummyFieldTeam,
    ])
  };

  const handleRemoveFieldTeam = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFieldsTeam];
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        swal.loading();
        const res = await storeSchema.actions.deleteAssignTeam(targetValue?.assign_id);
        if (res?.status === true) {
          const pay = {
            category: 1,
            channel: 1,
            nip_tujuan: [`${targetValue?.nip}`],
            title: "You Are Removed From The Project Assignment List (" + toggleModal?.selectedData[0]?.PROJECT_NO + ")",
            body: toggleModal?.selectedData[0]?.PROJECT_NAME,
            project_id: "",
            link: "",
            navigate_to: "/project-profile"
          }
          await storeSchema.actions.insertNotification(pay)
          await swal.success(res?.data);
        } else {
          await swal.error(res?.message);
        };
      } else {
        values.splice(i, 1);
        setDataFieldsTeam(values);
      };
      getDetailProject(toggleModal?.selectedData[0]?.PROJECT_ID,)
    } catch (error) {
      console.error(error);
    };
  };

  const handleAddRemark = async () => {
    try {
      if (remark.length > 75) {
        swal.error('Remark Tidak Dapat Melebihi 75 Karakter !')
      } else {
        swal.loading()
        const payload = {
          project_id: toggleModal?.selectedData[0]?.PROJECT_ID,
          desc_remark: remark
        }
        const res = await storeSchema.actions.insertRemark(payload)
        if (res?.status) {
          setRemark("")
          swal.success();
          getListRemarks(toggleModal?.selectedData[0]?.PROJECT_ID)
        } else {
          swal.error(res?.message)
        }
      }
    } catch (error) {
      console.log(error);

    }
  }

  const getJenisDocument = async (kd_status, sub_jns_ref) => {
    try {
      let kd_status_to;
      let kd_ref_to;
      if (kd_status === '001') {
        kd_status_to = '002'
      }
      if (kd_status === '002') {
        kd_status_to = '003'
        kd_ref_to = sub_jns_ref
      }
      if (kd_status === '003') {
        kd_status_to = '004'
        kd_ref_to = sub_jns_ref
      }
      if (kd_status === '004') {
        kd_status_to = '005'
        kd_ref_to = null
      }
      const res = await storeSchema.actions.getValidasi('doc_mandatory', kd_status_to, '', kd_ref_to)
      if (res?.status) {
        // const data = await res?.data.map((item, index) => {
        //   return {
        //     dokumen_id: toggleModal?.dataDocument?.filter((a) => a.JNS_DOKUMEN === item.kd_ref).length > 0 ? toggleModal?.dataDocument?.find((a) => a.JNS_DOKUMEN === item.kd_ref)['DOKUMEN_ID'] : '',
        //     kd_ref: item?.kd_ref,
        //     ur_ref: item?.ur_ref,
        //     tipe_dokumen: item?.sub_kd_ref,
        //     jns_dokumen: item?.kd_ref,
        //     isChecked: toggleModal?.dataDocument?.filter((a) => a.JNS_DOKUMEN === item.kd_ref).length > 0 ? true : false,
        //     isUpload: toggleModal?.dataDocument?.filter((a) => a.JNS_DOKUMEN === item.kd_ref && a.URL_DOKUMEN !== null).length > 0 ? true : false,
        //     isDisabled: toggleModal?.dataTermin?.FLAG_FINANCE === 1 ? true : false,
        //     isNew: false
        //   }
        // })
        setDocuments(res?.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getListKaryawan = async () => {
    try {
      const res = await storeSchema.actions.getListKaryawan({
        page: 1,
        limit: 1000,
        order: 'ASC'
      })
      if (res?.status) {
        const dataList = res?.data?.list_data?.filter((item) => item.AKTIF === 'Y').map((data, index) => {
          return ({
            value: data.NIK,
            label: data.NAMA
          });
        });
        setListKaryawan(dataList)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (toggleModal?.selectedData && toggleModal?.selectedData.length > 0) {
      getDetailProject(toggleModal?.selectedData[0]?.PROJECT_ID)
      getListRemarks(toggleModal?.selectedData[0]?.PROJECT_ID)
      getJenisDocument(toggleModal?.kd_status, toggleModal?.selectedData[0]?.TYPE_VALIDASI_ID)
      getListKaryawan()

      if (toggleModal?.selectedData[0].KD_STATUS !== '001' && toggleModal?.selectedData[0]?.TYPE_VALIDASI_ID === null) {
        setFlagValidasi(true)
      } else {
        setFlagValidasi(false)
      }
    }
    // if (toggleModal?.kd_status === '001') {
    //   setTabs(['Dokumen Pendukung', 'RFQ/RFI'])
    // }
    if (toggleModal?.kd_status === '003') {
      setTabs(['Dokumen Pendukung', 'CBB'])
    }
    if (toggleModal?.kd_status === '004') {
      setTabs(['Dokumen Pendukung', 'CBB', 'Kontrak'])
    }

    if (!toggleModal?.isOpen) {
      setJnsKontrak({});
    }

    // eslint-disable-next-line
  }, [toggleModal])

  const handleTabClick = (tab) => setActiveTab(tab);

  const tabComponents = {
    'Dokumen Pendukung':
      <DokumenPendukung dummyField={dummyField} dataFields={dataFields} setDataFields={setDataFields} project_id={(toggleModal?.selectedData && toggleModal?.selectedData.length > 0) ? toggleModal?.selectedData[0]?.PROJECT_ID : ''} getDetailProject={getDetailProject} documents={documents} />,
    'RFQ/RFI':
      <Rfi dummyField={dummyField} dataFieldsRfi={dataFieldsRfi} setDataFieldsRfi={setDataFieldsRfi} project_id={(toggleModal?.selectedData && toggleModal?.selectedData.length > 0) ? toggleModal?.selectedData[0]?.PROJECT_ID : ''} getDetailProject={getDetailProject} />,
    'CBB':
      <Cbb dummyField={dummyField} dataFields={dataFieldsCbb} setDataFields={setDataFieldsCbb} project_id={(toggleModal?.selectedData && toggleModal?.selectedData.length > 0) ? toggleModal?.selectedData[0]?.PROJECT_ID : ''} getDetailProject={getDetailProject} />,
    'Kontrak':
      <Kontrak dataFields={dataFieldsKontrak} setDataFields={setDataFieldsKontrak} project_id={(toggleModal?.selectedData && toggleModal?.selectedData.length > 0) ? toggleModal?.selectedData[0]?.PROJECT_ID : ''} project_no={(toggleModal?.selectedData && toggleModal?.selectedData.length > 0) ? toggleModal?.selectedData[0]?.PROJECT_NO : ''} getDetailProject={getDetailProject} />,
  };

  const handleDate = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    
  }

  const [dataOptionsCatRevenue, setDataOptionsCatRevenue] = useState([])
  useEffect(() => {
    if (selectedData?.length > 0 && (selectedData?.CONTRACT_START !== null || selectedData?.CONTRACT_END)) {
      setContractStart(selectedData?.CONTRACT_START?.substring(0, 10))
      setContractEnd(selectedData?.CONTRACT_END?.substring(0, 10))
    }

    const optionsCatRevenue = async () => {
      const res = await storeSchema.actions.getReferensiByJenis("kategori_revenue")
      if (res?.status === true) {
        const data = res?.data?.sort((a, b) => a?.kd_ref - b?.kd_ref).map((a) => {
          return {
            label: a?.ur_ref,
            value: a?.kd_ref
          }
        })
        setDataOptionsCatRevenue(data)
      }
    }
    optionsCatRevenue()
  }, [selectedData])

  return (
    <>
      <Modal
        title={`Confirmation ${(toggleModal?.data === "Unarchive" ? (toggleModal?.kd_status === "101" ? "Undrop" : "Unclose") : toggleModal?.data)}`}
        modal={"markAs"}
        size={"max-w-screen-lg"}
        buttonFooter={
          <>
            <button className='btn rounded-[25px] px-5 ml-3 bg-ghost'>
              Cancel
            </button>
            <button className='btn rounded-[25px] px-5 ml-3 text-white bg-[#2E66B9]'
              onClick={handleMarkAs}
            // disabled={selectedData?.length === 0 || toggleModal?.selectedData?.length === 0 || (toggleModal?.data === "Akselerasi" ? cantAcceleration : ((toggleModal?.data === "Archive" || toggleModal?.data === "Unarchive") ? false : flagValidasi ? true : cantMarkAs))}
            >
              {toggleModal?.data === "Archive" ? (toggleModal?.ur_archive.charAt(0).toUpperCase() + toggleModal?.ur_archive.slice(1)) : (toggleModal?.data === "Unarchive" ? (toggleModal?.kd_status === "101" ? "Undrop" : "Unclose") : "Submit")}
            </button>
          </>
        }
      >
        {toggleModal?.data !== "Archive" && (
          <p>Are you sure want to mark as <span className='text-[#2E66B9]'>{(toggleModal?.data === "Unarchive" ? (toggleModal?.kd_status === "101" ? "Undrop" : "Unclose") : toggleModal?.data)}</span> all this data?</p>
        )}
        {toggleModal?.data === "Archive" && (
          <p>Are you sure want to archive to <span className='text-[#2E66B9]'>{toggleModal?.ur_archive}</span> all this data?</p>
        )}
        <hr className='my-3' />
        <div className='m-2'>
          <div className="overflow-auto">
            <table className='table table-sm table-pin-rows'>
              <thead className="sticky top-0 bg-white z-10">
                <tr>
                  <th>No</th>
                  <th>No Project</th>
                  <th>Nama Project</th>
                  <th>Keterangan</th>
                  {['003', '004', '005'].includes(toggleModal?.kd_status) && (
                    <th className=''>
                      <div className='indicator'>
                        <span className="indicator-item text-lg text-red-500">*</span>
                        <div>Nomor PO</div>
                      </div>
                    </th>
                  )}
                  {['003'].includes(toggleModal?.kd_status) && (
                    <th style={{ width: '500px' }}>
                      <div className='indicator'>
                        <span className="indicator-item text-lg text-red-500">*</span>
                        <div>Jenis Kontrak</div>
                      </div>
                    </th>
                  )}
                  {
                    jnsKontrak?.value === '01' && (
                      <th style={{ width: '300px' }}>
                        <div className='indicator'>
                          <span className="indicator-item text-lg text-red-500">*</span>
                          <div>Pilih Kontrak</div>
                        </div>
                      </th>
                    )
                  }
                  {['003', '004', '005'].includes(toggleModal?.kd_status) && (
                    <th className=''>
                      <div className='indicator'>
                        <span className="indicator-item text-lg text-red-500">*</span>
                        <div>Kategori Revenue</div>
                      </div>
                    </th>
                  )}
                  {
                    catRevenue.value === '03' && (
                      <>
                        <th className=''>
                          <div className='indicator'>
                            <span className="indicator-item text-lg text-red-500">*</span>
                            <div>Kontrak Awal</div>
                          </div>
                        </th>
                        <th className=''>
                          <div className='indicator'>
                            <span className="indicator-item text-lg text-red-500">*</span>
                            <div>Kontrak Akhir</div>
                          </div>
                        </th>
                      </>
                    )
                  }
                  {/* {(toggleModal?.kd_status === "004" ?
                  <th className='text-center'>Department</th>
                  : <th>{" "}</th>
                )} */}
                </tr>
              </thead>
              <tbody>
                {toggleModal?.selectedData?.map((item, index) => {
                  return (
                    <tr key={index} className='align-top'>
                      <td className={`${(
                        (toggleModal?.data !== "Archive") && (toggleModal?.data !== "Unarchive") && (toggleModal?.data === "Akselerasi" ?
                          (item?.TO_AKSELERASI !== 1) :
                          (item?.TO_MARK !== 1))) ?
                        'text-red-500' : ''} min-w-[10px]`}>{index + 1}</td>
                      <td className={`${(
                        (toggleModal?.data !== "Archive") && (toggleModal?.data !== "Unarchive") && (toggleModal?.data === "Akselerasi" ?
                          (item?.TO_AKSELERASI !== 1) :
                          (item?.TO_MARK !== 1))) ?
                        'text-red-500' : ''} min-w-[150px]`}>{item.PROJECT_NO}</td>
                      <td className={`${(
                        (toggleModal?.data !== "Archive") && (toggleModal?.data !== "Unarchive") && (toggleModal?.data === "Akselerasi" ?
                          (item?.TO_AKSELERASI !== 1) :
                          (item?.TO_MARK !== 1))) ?
                        'text-red-500' : ''} min-w-[350px]`}>{item.PROJECT_NAME}</td>
                      <td className={`${(
                        (toggleModal?.data !== "Archive") && (toggleModal?.data !== "Unarchive") && (toggleModal?.data === "Akselerasi" ?
                          (item?.TO_AKSELERASI !== 1) :
                          (item?.TO_MARK !== 1))) ?
                        'text-red-500 font-bold' : ''} min-w-[200px]`}>{toggleModal?.data === "Akselerasi" ? (item?.TO_AKSELERASI !== 1 ? item?.KET_AKSELERASI : '') : (item?.TO_MARK !== 1 ? item.KET_MARK : '')}</td>
                      {['003', '004', '005'].includes(toggleModal?.kd_status) && (
                        <td className='min-w-[200px]'>
                          <input
                            type="text"
                            className="input input-sm input-bordered rounded-[50px] h-[3rem] bg-white border-primary"
                            name='no_po'
                            // onChange={handleChange}
                            disabled={item?.status?.canDelete || ['005'].includes(toggleModal?.kd_status)}
                            readOnly={true}
                            placeholder=''
                            onClick={(e) => handleClickPO(e, index)}
                            value={selectPO}
                          />
                        </td>
                      )}
                      {['003'].includes(toggleModal?.kd_status) && (
                        <td className='min-w-[200px]'>
                          <Select
                            name='JNS_KONTRAK'
                            className='pl-0'
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                height: '3rem',
                                borderRadius: "25px",
                                ...(state.isDisabled && {
                                  backgroundColor: '#DFDFDF',
                                }),
                              }),
                              menu: (provided) => ({
                                ...provided,
                                borderRadius: "25px",
                                position: 'relative',
                              }),
                              menuList: (provided) => ({
                                ...provided,
                                borderRadius: "25px",
                              }),
                              valueContainer: (provided) => ({
                                ...provided,
                                height: '3rem',
                                borderRadius: "25px",
                                alignContent: 'center',
                                paddingLeft: '1rem',
                              }),
                            }}
                            options={[
                              {
                                label: 'Menggunakan Kontrak Sendiri',
                                value: '00'
                              },
                              {
                                label: 'Menggunakan Kontrak Project Lain',
                                value: '01'
                              }
                            ]}
                            onChange={(e) => setJnsKontrak(e)}
                            value={jnsKontrak}
                          // isDisabled={locationState?.project === 'Add Project' ? false : locationState?.project === "Edit Project" ? true : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
                          />
                        </td>
                      )}
                      {
                        jnsKontrak?.value === '01' && (
                          <td className='min-w-[200px]'>
                            <AsyncSelect
                              name='PILIH_KONTRAK'
                              loadOptions={(value, callBack) => {
                                const get = async () => {
                                  try {
                                    const res = await storeSchema.actions.getListProject({
                                      page: 1,
                                      limit: 10,
                                      status: '004',
                                      tab_status: 'SA1',
                                      order: 'DESC',
                                      keyword: value,
                                    });
                                    const data = res?.data?.list_data?.filter((v) => v.CONTRACT_TYPE === "00").map((v) => {
                                      return {
                                        label: `${v.PROJECT_NO} - ${v.PROJECT_NAME}`,
                                        value: v.PROJECT_NO,
                                        selectId: v.PROJECT_ID,
                                      };
                                    });
                                    callBack(data);
                                  } catch (err) {
                                    callBack([]);
                                  }
                                };
                                get();
                              }}
                              onChange={(e, { name }) => {
                                setSelectContract(e);
                              }}
                              value={selectContract}
                            />
                          </td>
                        )
                      }
                      {['003', '004', '005'].includes(toggleModal?.kd_status) && (
                        <td className='min-w-[200px]'>
                          <Select
                            name='CAT_REVENUE'
                            className='pl-0'
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                height: '3rem',
                                borderRadius: "25px",
                                ...(state.isDisabled && {
                                  backgroundColor: '#DFDFDF',
                                }),
                              }),
                              menu: (provided) => ({
                                ...provided,
                                borderRadius: "25px",
                                position: 'relative',
                              }),
                              menuList: (provided) => ({
                                ...provided,
                                borderRadius: "25px",
                              }),
                              valueContainer: (provided) => ({
                                ...provided,
                                height: '3rem',
                                borderRadius: "25px",
                                alignContent: 'center',
                                paddingLeft: '1rem',
                              }),
                            }}
                            options={dataOptionsCatRevenue}
                            onChange={(e) => setCatRevenue(e)}
                            value={catRevenue}
                          // isDisabled={locationState?.project === 'Add Project' ? false : locationState?.project === "Edit Project" ? true : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
                          />
                        </td>
                      )}
                      {
                        catRevenue.value === '03' && (
                          <>
                            <td>
                              <input
                                type="date"
                                className="input input-bordered rounded-[25px] bg-white w-full"
                                name='CONTRACT_START'
                                onChange={(e) => setContractStart(e.target.value)}
                                value={contractStart}
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                className="input input-bordered rounded-[25px] bg-white w-full"
                                name='CONTRACT_END'
                                onChange={(e) => setContractEnd(e.target.value)}
                                value={contractEnd}
                              />
                            </td>
                          </>
                        )
                      }
                      {/* <td className='flex flex-row justify-center w-full'>
                      {(toggleModal?.kd_status !== "004" ? <></>
                        // <div className='btn btn-sm bg-red-500 text-white' onClick={() => {
                        //   const values = [...toggleModal?.selectedData];
                        //   values.splice(index, 1);
                        //   dispatch(setToggleModal({ ...toggleModal, selectedData: values }));
                        // }}>
                        //   <IoMdTrash />
                        // </div>
                        : <div className="text-center">
                          <select
                            className="select select-bordered bg-white select-xs w-full max-w-[173px]"
                            name="departmentName"
                            onChange={handleSetDepartmentName}
                          >
                            <option value="" selected>-- Select Department --</option>
                            {(toggleModal?.departmentList ?
                              toggleModal?.departmentList?.map((item, i) => {
                                return <option value={item?.departmentId}>{item?.departmentName}</option>
                              })
                              : <></>)}
                          </select>
                        </div>
                      )}

                    </td> */}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Jangan dihapus ya */}
        {/* {(toggleModal?.data === 'Handover') && (
        <div className='card border-2 my-7'>
          <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Assign Team</div>
          <div className='card-body'>
            <div className=''>
              <table className='table table-sm'>
                <thead>
                  <tr>
                    {headerTableTeam?.map((title, i) => {
                      return (
                        <th key={i}>{title}</th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {dataFieldsTeam?.map((item, index) => (
                    <tr key={index}>
                      <td className='w-1/4'>
                        <select
                          name={"role"}
                          className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                          onChange={(e) => handleChangeTeam(e, index)}
                          value={item?.role}
                          disabled={item?.status?.canDelete}
                        >
                          <option key={0} value="" disabled></option>
                          <option key={1} value="Lead PM">Lead PM</option>
                          <option key={2} value="PM">PM</option>
                          <option key={3} value="Admin">Admin</option>
                        </select>
                      </td>
                      <td className='w-1/3'>
                        <div className='rounded-[25px]'>
                          <Select
                            options={listKaryawan}
                            value={({ value: item?.nip, label: item?.nama })}
                            onChange={(e) => handleChangeTeamSelect(e, index)}
                            styles={customStyles}
                            isDisabled={item?.status?.canDelete}
                          />
                        </div>
                      </td>
                      <td className='w-1/4'>
                        <input
                          type="text"
                          name={"nip"}
                          className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                          value={item?.nip}
                          disabled={true}
                        />
                      </td>
                      <td className='flex gap-3'>
                        <div className='flex items-center'>
                          {item?.status?.canUpload && (
                            <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUploadTeam(e, index)}>
                              <AiOutlineSave />
                            </div>
                          )}
                          <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveFieldTeam(e, index)}>
                            <IoMdTrash />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div type="button" disabled={(dataFieldsTeam?.filter(a => a.status.canUpload === true).length) === 1 ? true : false} className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-60 ' onClick={handleAddFieldTeam}>
              <RxPlusCircled size='20px' /> Add New
            </div>
          </div >
        </div >
      )} */}
        {toggleModal?.data !== 'Clone' && toggleModal?.data !== 'Akselerasi' && (
          <>
            {/* <div className='card border-2 my-7'>
            <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Remark</div>
            <div className='card-body'>
              <div className='flex flex-col md:flex-row lg:flex-row gap-2'>
                <div className='flex flex-col gap-2 w-full md:w-1/2 lg:w-1/2'>
                  <div className='w-full bg-gradient-to-r from-primary to-white text-white font-semibold px-3 py-1 rounded-lg text-sm'>Add Remark</div>
                  <textarea className="textarea textarea-bordered bg-white h-[100%]" onChange={(e) => setRemark(e.target.value)}>{remark}</textarea>
                  <div type="button" className='btn btn-sm rounded-[25px] border-none bg-blue-50 text-primary' onClick={() => handleAddRemark()}>
                    <IoCheckboxOutline size='20px' /> Save Remark
                  </div>
                </div>
                <div className='flex flex-col gap-2 w-full md:w-1/2 lg:w-1/2 overflow-auto'>
                  <div className='w-full bg-gradient-to-r from-white to-primary text-white text-end font-semibold px-3 py-1 rounded-lg text-sm'>History Remark</div>
                  <div className='overflow-auto h-[200px] border-2 rounded-lg'>
                    <div className='flex justify-center w-full'>
                      <ul className="steps steps-vertical gap-3">
                        {listRemarks && listRemarks.length > 0 && listRemarks?.map((v, i) => (
                          <li data-content="" className="step" key={i}>
                            <div className='flex flex-col gap-0 text-start rounded-[10px]'>
                              <div className='gap-0'>
                                <div className='text-xs'><strong>{v?.DESC_REMARK}</strong></div>
                              </div>
                              <div className='text-xs font-bold text-gray-500 gap-2 flex flex-row items-center'><IoPerson /> {v?.CREATED_BY}</div>
                              <div className='text-xs font-bold text-gray-500 gap-2 flex flex-row items-center'><IoCalendarOutline /> {formatDateUS(v?.CREATED_DATE)}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      {listRemarks.length === 0 && (
                        <div className='flex justify-center'>
                          <img src={no_data} width={"50%"} className='items-center' />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div >
          </div > */}
            {/* {toggleModal?.data !== 'Handover' && ( */}
            <div className='card border-2 my-7'>
              <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Documents</div>
              <div className='card-body'>
                {(toggleModal?.kd_status === '001' || toggleModal?.kd_status === '002' || toggleModal?.kd_status === '003' || toggleModal?.kd_status === '004') && (
                  <div className='flex flex-col gap-2'>
                    <div className='w-full bg-gradient-to-r from-primary to-white text-white font-semibold px-3 py-1 rounded-lg text-sm'>Wajib Terupload</div>
                    {
                      (toggleModal?.selectedData[0]?.TYPE_VALIDASI_ID === null &&
                        ['002', '003'].includes(toggleModal?.kd_status)) ? (
                        <div className="flex items-start gap-2 bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500 p-3 rounded-md">
                          <IoWarningOutline className="text-yellow-600 mt-0.5 text-4xl" />
                          <span className='text-sm'><strong className='text-yellow-600'>Warning !</strong>  
                          {/* <i className='font-bold'>Product Owner</i> dan  */}
                          <i className='font-bold'> Klasifikasi Project</i> Belum Terisi. Data Ini Dibutuhkan Untuk Mengetahui Dokumen Apa Saja Yang Wajib di Upload. Silakan Isi Terlebih Dahulu Dengan Melakukan Edit Data Pada Project Ini.</span>
                        </div>
                      ) : (
                        <div className='p-3 overflow-auto'>
                          <div className={`grid grid-flow-col ${documents.length > 6 ? 'grid-rows-3' : 'grid-rows-2'} gap-2`}>
                            {documents && documents.length > 0 && documents.map((v, i) => (
                              <div className='flex flex-row items-center'>
                                {[...dokumenPendukung, ...dokumenCBB, ...dokumenKontrak, ...dokumenRfi].some(item => item.jns_dokumen === v?.kd_ref) ? (
                                  <IoCheckmarkDone className='text-xl text-primary' />
                                ) : (
                                  <IoCloseSharp className='text-xl text-error' />
                                )}
                                <div className='text-sm'>
                                  {v.ur_ref}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    }
                  </div>
                )}
                <div role="tablist" className="tabs tabs-lifted bg-white">
                  {tabs?.length > 0 ? tabs?.map((tab, index) => (
                    <>
                      <input
                        key={index}
                        type="radio"
                        name="my_tabsMark"
                        role="tab"
                        className={`tab ${activeTab === tab ? 'text-primary font-bold' : 'font-semibold'} [--tab-bg:white] min-w-[180px]`} aria-label={tab}
                        defaultChecked={index === 0}
                        onClick={() => handleTabClick(tab)}
                      />
                      <div role="tabpanel" className="tab-content bg-white border-base-300 rounded-box px-5 overflow-auto">
                        {tabComponents[activeTab]}
                      </div>
                    </>
                  )) : null}
                </div>
              </div >
            </div >
            {/* )} */}
          </>
        )}
      </Modal>
    </>
  )
}

const customStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "9999px",
    fontSize: "0.875rem",
    borderColor: "1px solid #d1d5db",
  }),
};

export default ModalMarkAs