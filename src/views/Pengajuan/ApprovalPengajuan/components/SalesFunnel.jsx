import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { BsLightningCharge } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { swal } from 'global/helper/swal';
import storeSchema from 'global/store';
import { CbbPlanning, CostPersonilPlanning, DetailForm, CostOperationPlanning, CostVendorPlanning } from './Form';
import TabDokumen from './TabDokumen';
import { setDataDetailProject, setToggleModal, setToggleModalPO } from '../../../../redux/n2n/global';
import ModalCreateUpdateProject from './Modal/ModalCreateUpdateProject';
import { badgeStatus, markAsStatus, tabWon } from './DataDummy'
import { optionPortofolio, optionRefByJenis, optionSubReferensiByJenis } from 'global/helper/functionOption';
import ModalMarkAs from './Modal/ModalMarkAs';
import { getCookies } from "global/helper/cookie";
import { decodeData } from "global/helper/jwt";
import ModalPO from './Modal/ModalPO';

const SalesFunnel = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { toggleModal, data_detail_project } = useSelector(state => state.global);
  const { project, menu, ur_status, kd_status, tab_status, data, view } = location?.state;
  document.title = 'POTTER | ' + project;
  const accountAccess = getCookies("accountAccess");
  const [loginData, setLoginData] = useState();
  const [markAs, setMarkAs] = useState({});
  const [tabActive, setTabActive] = useState(1);
  const [dataDetail, setDataDetail] = useState({
    PROJECT_ID: "",
    PROJECT_NO: "",
    PROJECT_KATEGORI_ID: "1",
    PROJECT_TYPE_UR: "",
    PROJECT_TYPE_ID: "",
    PROJECT_NAME: "",
    PORTOFOLIO_UR: "",
    PORTOFOLIO_ID: "",
    SUBPORTOFOLIO_UR: "",
    SUBPORTOFOLIO_ID: "",
    PRODUKKATEGORI_UR: "",
    PRODUKKATEGORI_ID: "",
    CATEGORY_ID: "",
    CATEGORY_PROJECT_ID: "",
    EST_NILAI_PENAWARAN: "",
    // EST_COGS: "",
    NILAI_PENAWARAN: "",
    COGS: "",
    CONTRACT_NO: "",
    NILAI_KONTRAK: "",
    CUSTOMER_ID: "",
    KD_AREA: "",
    KD_SPUC: "",
    KD_STATUS: "",
    CONTRACT_START: "",
    CONTRACT_END: "",
    // MARGIN_PRESENTASE: "",
    MARGIN_PENAWARAN: "0",
    MARGIN_KONTRAK: "0",
    PERSENTASE_PENAWARAN: "0",
    PERSENTASE_KONTRAK: "0",
    PROJECT_OWNER_ID: '',
    PO_NUMBER: '',
    FLAG_EDIT: false,
    FLAG_BE: false,
    FLAG_LOP: 'F',
    LOP_ID: '',
    PROJECT_MODEL_ID: '',
  });
  const [dataCBB, setDataCBB] = useState({});
  const [dataCostPersonilPlanning, setDataCostPersonilPlanning] = useState({});
  const [customer, setCustomer] = useState([]);
  const [lop, setLop] = useState([]);

  // option list
  const [portofolio, setPortofolio] = useState([]);
  const [tipeProject, setTipeProject] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [kategoriProject, setKategoriProject] = useState([]);
  const [area, setArea] = useState([]);
  const [linkPID, setLinkPID] = useState([]);
  const [detail, setDetail] = useState({});
  const [subPortofolio, setSubPortofolio] = useState([]);
  const [produkKategori, setProdukKategori] = useState([]);
  const [productOwner, setProductOwner] = useState([]);
  const [validasiDokumen, setValidasiDokumen] = useState([]);
  const [keywordPO, setKeywordPO] = useState("");
  const [perPagePO, setPerPagePO] = useState(10)
  const [totalPagePO, setTotalPagePO] = useState(0)
  const [currentPagePO, setCurrentPagePO] = useState(0)
  const [dataPO, setDataPO] = useState([])
  const [selectPO, setSelectPO] = useState();
  const [selectProductOwner, setSelectProductOwner] = useState([]);

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
    } catch (error) {
      swal.close()
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
    dispatch(setToggleModalPO({ isOpen: false, modal: "modalPO" }));
  }

  useEffect(() => {
    getDataPO()
  }, [currentPagePO])

  useEffect(() => {
    setCurrentPagePO(0)
  }, [perPagePO])

  // get option list
  useEffect(() => {
    const fetchOption = async () => {
      setPortofolio(await optionPortofolio());
      setTipeProject(await optionRefByJenis('project_type_id'));
      setProductOwner(await optionRefByJenis('product_owner_id'));
      setValidasiDokumen(await optionRefByJenis('type_validasi'));
      setKategori(await optionRefByJenis('category_id'));
      setKategoriProject(await optionRefByJenis('category_project'));
      setArea(await optionRefByJenis('kd_spuc'));
      setSubPortofolio(await optionSubReferensiByJenis('sub_portofolio', dataDetail.PORTOFOLIO_ID));
      const decode = await decodeData(getCookies("loginData"));
      setLoginData(decode);
    };
    fetchOption();
  }, [dataDetail.PORTOFOLIO_ID]);

  useEffect(() => {
    const fetchOptionSubPortofolio = async () => {
      setSubPortofolio(await optionSubReferensiByJenis('sub_portofolio', dataDetail?.PORTOFOLIO_ID?.toString()));
    };

    const fetchOptionCatProduk = async () => {
      setProdukKategori(await optionSubReferensiByJenis('cat_product', dataDetail?.SUBPORTOFOLIO_ID?.toString()));
    };
    if (dataDetail?.PORTOFOLIO_ID != "") {
      fetchOptionSubPortofolio();
    }
    if (dataDetail?.SUBPORTOFOLIO_ID != "") {
      fetchOptionCatProduk();
    }
    
  }, [dataDetail?.PORTOFOLIO_ID, dataDetail?.SUBPORTOFOLIO_ID]);

  const getDetailProject = async () => {
    // swal.loading();
    try {
      const res = await storeSchema.actions.getDetailProject(data?.project_id);

      if (res?.status === true) {
        dispatch(setDataDetailProject(res?.data))
        setDataDetail(res?.data);
        setCustomer({ label: res?.data?.CUSTOMER_NAME, value: res?.data?.CUSTOMER_ID });
        // swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  const getDetailCostOperational = async () => {
    // swal.loading();
    try {
      const res = await storeSchema.actions.getDetailCostOperational(data?.project_id);
      if (res?.status === true) {
        setDataDetail(res?.data);
        setCustomer({ label: res?.data?.CUSTOMER_NAME, value: res?.data?.CUSTOMER_ID });
        // swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  const getCBBPlanning = async () => {
    swal.loading();
    try {
      const res = await storeSchema.actions.getCBBPlanning(data?.project_id);
      if (res?.status === true) {
        setDataCBB(res?.data);
        swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  const getCostPersonilPlanning = async () => {
    swal.loading();
    try {
      const res = await storeSchema.actions.getCostPersonilPlanning(data?.project_id);
      if (res?.status === true) {
        setDataCostPersonilPlanning(res?.data);
        swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  let formComp;
  switch (tabActive) {
    case 1:
      formComp = <DetailForm
        options={{ portofolio, tipeProject, kategori, area, subPortofolio, produkKategori, productOwner, validasiDokumen, kategoriProject }}
        locationState={{ project, menu, ur_status, kd_status }}
        navigation={navigation}
        customer={customer}
        setCustomer={setCustomer}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loginData={loginData}
        handleClickPO={handleClickPO}
        selectPO={selectPO}
        lop={lop}
        setLop={setLop}
        selectProductOwner={selectProductOwner}
        setSelectProductOwner={setSelectProductOwner}
      />
      break;
    case 2:
      formComp = <CbbPlanning
        data={dataDetail}
        dataCBB={dataCBB}
        options={{ portofolio, tipeProject, kategori, area }}
        getDetailProject={getDetailProject}
        getCBBPlanning={getCBBPlanning}
        view={view}
      />
      break;
    case 3:
      formComp = <CostPersonilPlanning
        data={dataDetail}
        dataCostPersonilPlanning={dataCostPersonilPlanning}
        getDetailProject={getDetailProject}
        getCostPersonilPlanning={getCostPersonilPlanning}
        dataCBB={dataCBB}
        view={view}
      />
      break;
    case 4:
      formComp = <CostVendorPlanning
        data={dataDetail}
        dataCostPersonilPlanning={dataCostPersonilPlanning}
        getDetailProject={getDetailProject}
        getCostPersonilPlanning={getCostPersonilPlanning}
        dataCBB={dataCBB}
      />
      break;
    case 5:
      formComp = <CostOperationPlanning
        dataDetail={dataDetail}
        getDetailProject={getDetailCostOperational}
      />
      break;
    default:
      formComp = null;
      break;
  };

  useEffect(() => {
    if (project === "Edit Project") {
      getDetailProject();
      getCBBPlanning();
      getCostPersonilPlanning();
    };
    // eslint-disable-next-line
  }, [project]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      swal.loading();
      const form = {
        ...(project === "Edit Project" && {
          project_id: data?.project_id ? data?.project_id : dataDetail?.PROJECT_ID,
        }),
        project_no: dataDetail?.PROJECT_NO,
        project_kategori_id: dataDetail?.PROJECT_KATEGORI_ID,
        project_type_id: dataDetail?.PROJECT_TYPE_ID,
        project_name: dataDetail?.PROJECT_NAME,
        keterangan: dataDetail?.KETERANGAN,
        portofolio_id: dataDetail?.PORTOFOLIO_ID,
        category_id: dataDetail?.CATEGORY_ID,
        est_nilai_penawaran: dataDetail?.EST_NILAI_PENAWARAN?.toString().replace(",", ".") ?? null,
        est_cogs: dataDetail?.EST_COGS?.toString().replace(",", "."),
        nilai_penawaran: dataDetail?.NILAI_PENAWARAN?.toString().replace(",", ".") ?? null,
        cogs: dataDetail?.COGS?.toString().replace(",", ".") ?? null,
        contract_no: dataDetail?.CONTRACT_NO,
        nilai_kontrak: dataDetail?.NILAI_KONTRAK?.toString().replace(",", ".") ?? null,
        customer_id: dataDetail?.CUSTOMER_ID || customer?.value,
        kd_area: dataDetail?.KD_AREA,
        kd_spuc: dataDetail?.KD_SPUC !== '' ? dataDetail?.KD_SPUC : area.some(item => item.value === loginData?.KD_SUB) ? loginData?.KD_SUB : '',
        kd_sub_portofolio: dataDetail?.SUBPORTOFOLIO_ID,
        kd_cat_product: dataDetail?.PRODUKKATEGORI_ID,
        kd_status: dataDetail?.KD_STATUS,
        contract_start: dataDetail?.CONTRACT_START,
        contract_end: dataDetail?.CONTRACT_END,
        margin_presentase: dataDetail?.MARGIN_PRESENTASE ?? '',
        margin_penawaran: (parseInt(dataDetail?.NILAI_PENAWARAN) - parseInt(dataDetail?.COGS)),
        margin_kontrak: (parseInt(dataDetail?.NILAI_KONTRAK) - parseInt(dataDetail?.COGS)),
        persentase_penawaran: ((parseInt(dataDetail?.NILAI_PENAWARAN) - parseInt(dataDetail?.COGS)) / parseInt(dataDetail?.NILAI_PENAWARAN)).toFixed(2) * 100,
        persentase_kontrak: ((parseInt(dataDetail?.NILAI_KONTRAK) - parseInt(dataDetail?.COGS)) / parseInt(dataDetail?.NILAI_KONTRAK)).toFixed(2) * 100,
        project_owner: dataDetail?.PROJECT_OWNER_ID,
        type_validasi_id: dataDetail?.TYPE_VALIDASI_ID ?? null,
        id_tab_status: 'SA1',
        nip_sales: dataDetail?.NIP_SALES ?? null,
        nama_sales: dataDetail?.NAMA_SALES ?? null,
        flag_lop: dataDetail?.FLAG_LOP,
        lop_id: lop?.value ?? null,
        project_model_id: dataDetail?.PROJECT_MODEL_ID,
        ...(project === "Add Project" && {
          project_kategori_id: dataDetail?.PROJECT_KATEGORI_ID,
          kd_status: dataDetail?.PROJECT_TYPE_ID === "1" ? "001" : (dataDetail?.PROJECT_TYPE_ID === "2" ? "002" : null),
        }),
        ...(selectPO && { po_number: selectPO })
      };

      let getListProductOwner = [];
      let getListKodeProductOwner = [];

      if (selectProductOwner?.length) {
        selectProductOwner?.map((a) => {
          getListProductOwner.push(a?.value);
          getListKodeProductOwner.push(a?.label);
          return 1;
        })
      }

      const formProductOwner = {
        projectId: data?.project_id ? data?.project_id : dataDetail?.PROJECT_ID,
        poList: getListProductOwner,
        pid: dataDetail?.PROJECT_NO,
        poKodeList: getListKodeProductOwner,
      }

      // Validasi form berdasarkan list yang diminta
      const validations = [
        { field: 'project_name', label: 'Nama Project', value: form?.project_name },
        { field: 'keterangan', label: 'Keterangan', value: form?.keterangan },
        { field: 'project_type_id', label: 'Tipe Project', value: form?.project_type_id },
        { field: 'portofolio_id', label: 'Portofolio', value: form?.portofolio_id },
        { field: 'kd_sub_portofolio', label: 'Sub Portofolio', value: form?.kd_sub_portofolio },
        { field: 'kd_cat_product', label: 'Produk Kategori', value: form?.kd_cat_product },
        { field: 'kd_spuc', label: 'SPUC', value: form?.kd_spuc },
        { field: 'customer_id', label: 'Nama Customer', value: form?.customer_id },
        { field: 'category_id', label: 'Kategori', value: form?.category_id },
        { field: 'project_model_id', label: 'Project Model', value: form?.project_model_id },
      ];

      // Loop validasi
      for (const validation of validations) {
        if (!validation.value || validation.value === '' || validation.value === null || validation.value === undefined) {
          swal.error(`Data ${validation.label} tidak boleh kosong`);
          return; // Hentikan eksekusi jika ada validasi yang gagal
        }
      }

      const res =
          project === "Add Project" ?
            await storeSchema.actions.insertNewProjectPID(form) :
            (
              await storeSchema.actions.insertProductOwner(formProductOwner),
              await storeSchema.actions.updateProject(form)
            );

        if (res?.status === true) {
          swal.close();
          if (project === "Add Project") {
            setDetail(res?.data?.project)
          }
          dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "createUpdateProject" }));
          if (project === "Edit Project") {
            getDetailProject();
          };
        } else {
          swal.error(res?.message === 'Error' ? "Tolong Periksa Data Inputan" : res?.message);
        };

    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    const indexStatus = markAsStatus?.findIndex(item => item.kd_status === data_detail_project?.KD_STATUS);
    setMarkAs(markAsStatus[indexStatus + 1]);
    // eslint-disable-next-line
  }, [data_detail_project?.KD_STATUS]);

  const handleMarkAs = async (e) => {
    // edit disini
    // e.preventDefault();
    // try {
    //   const res = await storeSchema.actions.markAsProject({
    //     project_id: [(data?.project_id ?? dataDetail?.PROJECT_ID)],
    //     status: markAs?.kd_status,
    //     id_tab_status: 'SA1',
    //   });
    //   if (res?.status === true) {
    //     await swal.success(res?.message);
    //     navigation('/list-project', { state: { menu, ur_status, kd_status } })
    //   } else {
    //     swal.error(res?.message);
    //   }
    // } catch (error) {
    //   console.error(error);
    // };
    dispatch(setToggleModal({ isOpen: !toggleModal?.isOpen, modal: "markAs", selectedData: [dataDetail], kd_status: kd_status, data: markAs?.ur_status }))
  };

  const filterTabs = () => {
    if (!["002", "003", "004", "005"].includes(kd_status)) {
      return tabWon?.filter((item) => item?.name.includes("Detail Project"));
    }

    if (["002", "003"].includes(kd_status)) {
      return tabWon?.filter(
        (item) =>
          !["Cost Personil Planning", "Cost Vendor Planning", "Cost Operational Planning"].includes(item?.name)
      );
    }

    if (["004", "005"].includes(kd_status)) {
      // if (dataCBB?.cbb_data?.length !== 0 && dataDetail?.VENDOR_PLANNING?.length !== 0) {
      //     return tabWon;
      // }

      // if (dataCBB?.cbb_data?.length !== 0) {
      //     return tabWon?.filter((item) => item?.name !== "Cost Vendor Planning");
      // }

      // if (dataDetail?.VENDOR_PLANNING?.length !== 0) {
      //     return tabWon?.filter(
      //         (item) =>
      //             !["Cost Personil Planning", "Cost Operational Planning"].includes(item?.name)
      //     );
      // }

      return tabWon?.filter(
        (item) =>
          !["Cost Vendor Planning", "Cost Operational Planning"].includes(item?.name)
      );
    }

    return tabWon?.filter(
      (item) =>
        !["Cost Personil Planning", "Cost Vendor Planning", "Cost Operational Planning"].includes(item?.name)
    );
  };

  const filteredTabs = filterTabs();

  useEffect(() => {

    const getProductOwner = async () => {
      const result = await storeSchema.actions.getProductOwnerByPID(data?.project_id || dataDetail?.PROJECT_ID)

      setSelectProductOwner(result?.data?.map((item) => {
        return {
          label: item?.po_kode,
          value: item?.po_id,
          data: item
        }
      }))
      
    }

    if (data?.project_id || dataDetail?.PROJECT_ID) {
      getProductOwner()
    }

  }, [data?.project_id, dataDetail?.PROJECT_ID]);

  return (
    <>
      <ModalMarkAs selectedData={dataDetail} tabActive={tabActive} navigation={navigation} handleClickPO={handleClickPO} setSelectPO={setSelectPO} selectPO={selectPO} getDetailProject2={getDetailProject} />
      <ModalPO dataPO={dataPO} setDataPO={setDataPO} totalPage={totalPagePO} setTotalPage={setTotalPagePO} perPage={perPagePO} setPerPage={setPerPagePO} currentPage={currentPagePO} setCurrentPage={setCurrentPagePO} setKeyword={setKeywordPO} keyword={keywordPO} handleSelectPO={handleSelectPO} getDataPO={getDataPO} />
      <ModalCreateUpdateProject dataDetail={dataDetail} detail={detail} />
      <div className='bg-white px-6 pt-10 h-full   overflow-hidden'>
        <div className='flex gap-5 items-center mb-5'>
          <div className='flex items-center gap-4'>
            <FaArrowLeft className='cursor-pointer' onClick={() => navigation("/list-project", { state: { menu, ur_status, kd_status, tab_status } })} />
            <p className='text-lg font-bold'>{view === false ? "View" : project === "Edit Project" ? "Edit" : "Add"} Sales Funnel</p>
          </div>
          {project === "Edit Project" && (
            <>
              {badgeStatus[data_detail_project?.KD_STATUS]}
              <div className='flex ml-auto gap-3'>
                {dataDetail?.TO_AKSELERASI === 1 && (
                  <button className='btn btn-sm bg-primary text-white rounded-[25px]' >
                    Mark as Akselerasi <BsLightningCharge />
                  </button>
                )}
                {dataDetail?.TO_MARK === 1 && (
                  <button className='btn btn-sm bg-green-700 text-white rounded-[25px]' onClick={handleMarkAs}>
                    Mark as {markAs?.ur_status} <FaArrowRight />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        {/* FORM */}
        {filteredTabs?.map((item) => (
          <div
            key={item.tab}
            className={`btn btn-sm ${item?.tab !== 1 && project === "Add Project" ? "btn-disabled" : ""} rounded-[25px] mr-3 ${tabActive === item.tab ? "bg-primary text-white" : "bg-white text-black"}`}
            onClick={() => setTabActive(item.tab)}
          >
            {item.name}
          </div>
        ))}
        <div className='border-t-2 mt-5'></div>
        <div className={accountAccess?.kode === '8002' ? "pointer-events-none" : ""}>
          {formComp}
        </div>
        {(tabActive === 1 && (project === 'Add Project' || dataDetail?.FLAG_EDIT === true || dataDetail?.FLAG_BE === true) && view !== false) && (
          <div className='flex justify-end' style={{ display: `${accountAccess?.kode === '8002' ? "none" : "block"}` }}>
            <button className='btn btn-primary text-white rounded-[25px] px-5 my-5' onClick={handleSave}>
              Save
            </button>
          </div>
        )}
        {(data?.project_id && tabActive === 1) && (
          <>
            <hr className={view === false ? 'border-t-2 mb-6 mt-6' : dataDetail?.FLAG_EDIT ? 'border-t-2 mb-6' : 'border-t-2 mb-6 mt-6'} />
            <TabDokumen
              data={dataDetail}
              getDetailProject={getDetailProject}
              isProject={true}
            />
          </>
        )}
        <div className='mb-36'></div>
      </div>
    </>
  )
}

export default SalesFunnel