import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { RxPlusCircled } from 'react-icons/rx';
import { useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as CreateProject } from 'assets/CreateProject.svg'
import { ReactComponent as MergeProject } from 'assets/MergeProject.svg'
import { AsyncSelect, Label, Select } from 'components/atoms';
import CurrencyInput from 'components/atoms/CurrencyInput';
import storeSchema from 'global/store';
import { IoMdTrash } from 'react-icons/io';
import { swal } from 'global/helper/swal';
import BillingCollectionPlanProjectActual from './TabDokumen/BillingCollectionPlanProjectActual';
import { ReactComponent as TotalCost } from 'assets/icons/rdTotalCost.svg';
import { formatCurrency } from 'global/helper/formatCurrency';
import { setToggleModal, setToggleModalPO } from '../../../../redux/n2n/global';
import { useDispatch, useSelector } from 'react-redux'
import ModalPO from './Modal/ModalPO';

const MarkAsActual = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const { menu, ur_status, kd_status } = location?.state;
  const dispatch = useDispatch();
  const { toggleModal, toggleModalPO } = useSelector((state) => state.global)

  const dummyField = {
    project_id: '',
    project_no: '',
    project_name: '',
    no_po: '',
  };
  const [dataFields, setDataFields] = useState([dummyField]);
  const [projectType, setProjectType] = useState('Merge');
  const [projectNormal, setProjectNormal] = useState({})
  const [customer, setCustomer] = useState({});
  const [keyword, setKeyword] = useState("");
  const [perPage, setPerPage] = useState(10)
  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [dataPO, setDataPO] = useState([])

  const getDataPO = async () => {
    try {
      const result = await storeSchema.actions.getDataIntegrasi({
        entitas: "EPROC",
        modul: "GET_PO",
        method: "GET",
        search: keyword,
        start: currentPage,
        length: perPage
      })
      if (result?.status) {
        setTotalPage(result?.data?.total_data)
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
        // await dispatch(setToggleModal({ isOpen: true, modal: "modalPO", name: e.target.name, index: index }));
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
    console.log('click', value);
    const values = [...dataFields];
    values[toggleModalPO?.index][toggleModalPO?.name] = value?.nomor_po;
    setDataFields(values);
    // setDataFields((prev) => {
    //   return {
    //     ...prev,
    //     ["kode_io"]: value?.AUFNR,
    //     ["UR_KODE_IO"]: value?.KTEXT
    //   };
    // });
    dispatch(setToggleModalPO({ isOpen: false, modal: "modalPO" }));
  }

  const [dataCreateProject, setDataCreateProject] = useState({
    project_no: '',
    project_name: '',
    project_type_id: '1',
    portofolio_ur: '',
    portofolio_id: '',
    category_ur: '',
    category_id: '',
    // est_cogs: '',
    // est_nilai_penawaran: '',
    cogs: '',
    nilai_penawaran: '',
    contract_no: '',
    nilai_kontrak: '',
    contract_start: '',
    contract_end: '',
    persentase_penawaran: 0,
    persentase_kontrak: 0,
    margin_penawaran: 0,
    margin_kontrak: 0,
    ur_area: '',
    kd_area: '',
    kd_spuc: '',
    id_tab_status: 'SA1',
    kd_status: '003',
  });

  // option list
  const [portofolio, setPortofolio] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [area, setArea] = useState([]);
  const [data, setData] = useState();
  const [dataBillingAkselerasi, setDataBillingAkselerasi] = useState();
  const [termin, setTermin] = useState(true)

  // get option list
  useEffect(() => {
    const optionPortofolio = async () => {
      try {
        const res = await storeSchema.actions.getPortofolio();
        if (res?.status === true) {
          const option = res?.data?.map((item) => {
            return {
              label: item?.portofolio,
              value: item?.portofolio_id,
              data: item,
            }
          })
          setPortofolio(option);
        } else {
          setPortofolio([]);
        };
      } catch (error) {
        console.error(error);
      }
    };
    const optionKategori = async () => {
      try {
        const res = await storeSchema.actions.getReferensiByJenis('category_id');
        if (res?.status === true) {
          const option = res?.data?.map((item) => {
            return {
              label: item?.ur_ref,
              value: item?.kd_ref,
              data: item,
            }
          })
          setKategori(option);
        } else {
          setKategori([]);
        };
      } catch (error) {
        console.error(error);
      }
    };
    const optionArea = async () => {
      try {
        const res = await storeSchema.actions.getReferensiByJenis('kd_spuc');
        if (res?.status === true) {
          const option = res?.data?.map((item) => {
            return {
              label: item?.ur_ref,
              value: item?.kd_ref,
              data: item,
            }
          })
          setArea(option);
        } else {
          setArea([]);
        };
      } catch (error) {
        console.error(error);
      }
    };

    optionPortofolio();
    optionKategori();
    optionArea();
  }, []);

  const handleChangeCreateProject = (e) => {
    setDataCreateProject((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  };

  const handleChangeCurrency = (value, name) => {
    if (name === 'nilai_penawaran' && (dataCreateProject?.cogs !== '' || dataCreateProject?.cogs !== 0)) {
      setDataCreateProject((prev) => {
        return {
          ...prev,
          margin_penawaran: (value - dataCreateProject?.cogs),
          persentase_penawaran: ((value - dataCreateProject?.cogs) / value).toFixed(2) * 100,
        };
      });
    }
    if (name === 'nilai_kontrak' && (dataCreateProject?.cogs !== '' || dataCreateProject?.cogs !== 0)) {
      setDataCreateProject((prev) => {
        return {
          ...prev,
          margin_kontrak: (value - dataCreateProject?.cogs),
          persentase_kontrak: ((value - dataCreateProject?.cogs) / value).toFixed(2) * 100,
        };
      });
    }
    setDataCreateProject((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const valueNaN = (value) => {
    return isNaN(value) ? 0 : value === null ? 0 : parseFloat(value)
  }

  const getDetailProject = async () => {
    // swal.loading();
    try {
      const res = await storeSchema.actions.getDetailProject(projectNormal?.value);
      if (res?.status === true) {
        setData(res?.data);
        // swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  const getDetailProjectByNo = async (project_no) => {
    const res = await storeSchema.actions.getDetailProjectByNo(project_no)
    if (res?.status) {
      const value = res?.data
      setDataCreateProject((prev) => {
        return {
          ...prev,
          "project_name": value?.PROJECT_NAME,
          "portofolio_id": value?.PORTOFOLIO_ID,
          "portofolio_ur": value?.PORTOFOLIO_UR,
          "category_id": value?.CATEGORY_ID,
          "category_ur": value?.CATEGORY_UR,
          "cogs": (value?.COGS !== null && value?.COGS.toString().includes('.') === true) ? value?.COGS.toString().replace('.', ',') : value?.COGS,
          "nilai_penawaran": (value?.NILAI_PENAWARAN !== null && value?.NILAI_PENAWARAN.toString().includes('.') === true) ? value?.NILAI_PENAWARAN.toString().replace('.', ',') : value?.NILAI_PENAWARAN,
          "contract_no": value?.CONTRACT_NO,
          "nilai_kontrak": (value?.NILAI_KONTRAK !== null && value?.NILAI_KONTRAK.toString().includes('.') === true) ? value?.NILAI_KONTRAK.toString().replace('.', ',') : value?.NILAI_KONTRAK,
          "contract_start": value?.CONTRACT_START,
          "contract_end": value?.CONTRACT_END,
          "kd_area": value?.KD_AREA,
          "ur_area": value?.UR_AREA,
          "kd_spuc": value?.KD_SPUC,
          "ur_spuc": value?.UR_SPUC,
          "margin_penawaran": valueNaN(value?.NILAI_PENAWARAN - value?.COGS) < 0 ? null : valueNaN(value?.NILAI_PENAWARAN - value?.COGS),
          "margin_kontrak": valueNaN(value?.NILAI_KONTRAK - value?.COGS) < 0 ? null : valueNaN(value?.NILAI_KONTRAK - value?.COGS),
          "persentase_penawaran": isNaN(valueNaN(((value?.NILAI_PENAWARAN - value?.COGS) / value?.NILAI_PENAWARAN).toFixed(2) * 100)) ? null : valueNaN(((value?.NILAI_PENAWARAN - value?.COGS) / value?.NILAI_PENAWARAN).toFixed(2) * 100),
          "persentase_kontrak": isNaN(valueNaN(((value?.NILAI_KONTRAK - value?.COGS) / value?.NILAI_KONTRAK).toFixed(2) * 100)) ? null : valueNaN(((value?.NILAI_KONTRAK - value?.COGS) / value?.NILAI_KONTRAK).toFixed(2) * 100),
          "nip_sales": value?.NIP_SALES,
          "nama_sales": value?.NAMA_SALES,
          "kd_sub_portofolio": value?.KS_SUB_PORTOFOLIO,
          "kd_cat_product": value?.KD_CAT_PRODUCT,
          "type_validasi_id": value?.TYPE_VALIDASI_ID
        };
      });

      setCustomer({
        label: value?.CUSTOMER_NAME,
        value: value?.CUSTOMER_ID,
      })
    }
  }

  const handleChangeOpt = (e, name) => {
    if (name === "project_no") {
      setDataCreateProject((prev) => {
        return {
          ...prev,
          [name]: e.label,
        };
      });
      getDetailProjectByNo(e.value)
    } else {
      setDataCreateProject((prev) => {
        return {
          ...prev,
          [name === "area" ? ("ur_" + name) : (name + "_ur")]: e.label,
          [name === "area" ? ("kd_" + name) : (name + "_id")]: e.value,
        };
      });
    }
  };

  const getListBillingProjectAkselerasi = async () => {
    const projectIds = dataFields.map(item => `'${item.project_id}'`).join(',');
    const res = await storeSchema.actions.getListBillingProjectAkselerasi(projectIds)
    if (res?.status) {
      setDataBillingAkselerasi(res?.data)
    } else {
      setDataBillingAkselerasi([])
    }
  }

  const handleProjectAkselerasi = (e, i) => {
    const values = [...dataFields];
    values[i].project_id = e?.data?.PROJECT_ID;
    values[i].project_no = e?.data?.PROJECT_NO;
    values[i].project_name = e?.data?.PROJECT_NAME;
    values[i].portofolio_id = e?.data?.PORTOFOLIO_ID;
    values[i].po_number = e?.data?.PO_NUMBER;
    setDataFields(values);
    getListBillingProjectAkselerasi();
  };

  const handleAddField = () => {
    setDataFields([
      ...dataFields,
      dummyField,
    ])
  };

  const handleRemoveField = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFields];
      values.splice(i, 1);
      setDataFields(values);
    } catch (error) {
      console.error(error);
    };
  };

  const handleMarkAsActual = async (e) => {
    e.preventDefault();
    try {
      swal.loading();
      const projectAkselerasi = dataFields?.map((v) => {
        return v?.project_id;
      });
      const form = {
        project_actual_id: projectType === "Merge" ? projectNormal?.value : "",
        project_id: projectAkselerasi,
        ...(projectType === "Create" && {
          new_project: {
            project_kategori_id: "1",
            project_type_id: dataCreateProject?.project_type_id,
            project_name: dataCreateProject?.project_name,
            project_no: dataCreateProject?.project_no,
            id_tab_status: dataCreateProject?.id_tab_status,
            portofolio_id: dataCreateProject?.portofolio_id,
            category_id: dataCreateProject?.category_id,
            // est_nilai_penawaran: dataCreateProject?.est_nilai_penawaran?.replace(",", "."),
            // est_cogs: dataCreateProject?.est_cogs?.replace(",", "."),
            nilai_penawaran: (dataCreateProject?.nilai_penawaran !== null && dataCreateProject?.nilai_penawaran.toString().includes(',') === true) ? parseFloat(dataCreateProject?.nilai_penawaran.toString().replace(',', '.')) : dataCreateProject?.nilai_penawaran,
            cogs: (dataCreateProject?.cogs !== null && dataCreateProject?.cogs.toString().includes(',') === true) ? parseFloat(dataCreateProject?.cogs.toString().replace(',', '.')) : dataCreateProject?.cogs,
            contract_no: dataCreateProject?.contract_no,
            nilai_kontrak: (dataCreateProject?.nilai_kontrak !== null && dataCreateProject?.nilai_kontrak.toString().includes(',') === true) ? parseFloat(dataCreateProject?.nilai_kontrak.toString().replace(',', '.')) : dataCreateProject?.nilai_kontrak,
            contract_start: dataCreateProject?.contract_start,
            contract_end: dataCreateProject?.contract_end,
            customer_id: customer?.value,
            kd_area: dataCreateProject?.kd_area,
            kd_status: dataCreateProject?.kd_status,
            persentase_kontrak: dataCreateProject?.persentase_kontrak,
            persentase_penawaran: dataCreateProject?.persentase_penawaran,
            margin_kontrak: dataCreateProject?.margin_kontrak,
            margin_penawaran: dataCreateProject?.margin_penawaran,
            kd_spuc: dataCreateProject?.kd_spuc,
            kd_sub_portofolio: dataCreateProject?.kd_sub_portofolio,
            kd_cat_product: dataCreateProject?.kd_cat_product,
            type_validasi_id: dataCreateProject?.type_validasi_id,
            nip_sales: dataCreateProject?.nip_sales,
            nama_sales: dataCreateProject?.nama_sales,
            po_number: dataFields.filter((item) => item?.project_no === dataCreateProject?.project_no)[0]?.po_number || ""
          },
        }),
      };

      const res = await storeSchema.actions.markAsActualID(form);
      if (res?.status === true) {
        for (const item of dataFields) {
          const form = {
            project_id: item?.project_id,
            project_no: item?.project_no,
            portofolio_id: item?.portofolio_id,
            po_number: item?.po_number,
          };
          await storeSchema.actions.updateProject(form);
        }
        await swal.success(res?.message);
        navigation("/list-project", { state: { menu, ur_status, kd_status } });
      } else {
        swal.error(res?.message);
      };
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    if (Object.keys(projectNormal).length !== 0) {
      getDetailProject()
        .then(() => {
          setTermin(data?.DOKUMEN_BILLING.length > 0 ? true : false)
        });
    }
    // eslint-disable-next-line
  }, [projectNormal])

  return (
    <>
      <ModalPO dataPO={dataPO} setDataPO={setDataPO} totalPage={totalPage} setTotalPage={setTotalPage} keyword={keyword} setKeyword={setKeyword} perPage={perPage} setPerPage={setPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} handleSelectPO={handleSelectPO} getDataPO={getDataPO} />
      <div className='bg-white px-6 pt-10 h-full   overflow-hidden'>
        <div className='flex gap-5 items-center'>
          <div className='flex items-center gap-4'>
            <FaArrowLeft className='cursor-pointer' onClick={() => navigation("/list-project", { state: { menu, ur_status, kd_status } })} />
            <p className='text-lg font-bold'>Mark as Actual</p>
          </div>
        </div>
        <hr className='my-5' />
        {/* Card Project Akselerasi */}
        <div className='card border-2 my-5'>
          <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>
            Project Akselerasi
          </div>
          <div className='card-body'>
            <div className='max-h-48 overflow-auto'>
              <table className='table table-lg'>
                <thead>
                  <tr className='text-sm'>
                    <th>Project</th>
                    <th>Nomor PO</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataFields?.map((item, index) => (
                    <tr key={index}>
                      <td className='w-[75%]'>
                        <AsyncSelect
                          name='project_name'
                          loadOptions={(value, callBack) => {
                            const get = async () => {
                              try {
                                const res = await storeSchema.actions.getProjectByType('2', value);
                                // filter data yang sudah diselect
                                const filteredRes = res?.data?.filter(vRes =>
                                  !dataFields?.some(vDataFields => vDataFields?.project_id === vRes?.PROJECT_ID)
                                );
                                const data = filteredRes?.map((v) => {
                                  return {
                                    label: v.PROJECT_NO + ' - ' + v.PROJECT_NAME,
                                    value: v.PROJECT_ID,
                                    data: v,
                                  };
                                });
                                callBack(data);
                              } catch (err) {
                                callBack([]);
                              }
                            };
                            get();
                          }}
                          onChange={(e) => {
                            handleProjectAkselerasi(e, index);
                          }}
                          value={item?.project_id ? {
                            label: item?.project_no + ' - ' + item?.project_name,
                            value: item?.project_id
                          } : {}}
                        />
                      </td>
                      <td className='align-top'>
                        <input
                          type="text"
                          className="input input-bordered rounded-[25px] bg-white border-primary"
                          name='po_number'
                          // onChange={handleChange}
                          disabled={item?.status?.canDelete}
                          readOnly={true}
                          placeholder=''
                          onClick={(e) => handleClickPO(e, index)}
                          value={item?.po_number}
                        />
                      </td>
                      <td>
                        <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveField(e, index)}>
                          <IoMdTrash />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div type="button" className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-60 ' onClick={handleAddField}>
              <RxPlusCircled size='20px' /> Add Project Akselerasi
            </div>
          </div>
        </div>

        <div>
          <div className='text-lg font-bold'>
            Select the project type
          </div>
          <div className='flex justify-between items-center gap-5 my-3'>
            <div
              className={`card h-32 border-2 w-full hover:cursor-pointer hover:border-blue-500 ${projectType === 'Merge' ? "border-primary" : ""}`}
              onClick={() => setProjectType('Merge')}
            >
              <div className='card-body items-center'>
                <MergeProject />
                <div>
                  Merge Project
                </div>
              </div>
            </div>
            <div
              className={`card h-32 border-2 w-full hover:cursor-pointer hover:border-blue-500 ${projectType === 'Create' ? "border-primary" : ""}`}
              onClick={() => setProjectType('Create')}
            >
              <div className='card-body items-center'>
                <CreateProject />
                <div>
                  Create Project
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='my-5'>
          <div className='text-lg font-bold'>
            {projectType === 'Merge' ? 'Merge Project To :' : 'Create Project :'}
          </div>
          {projectType === 'Merge' ? (
            <div>
              <Label
                label='Project Actual'
                children={
                  <AsyncSelect
                    name='project_name'
                    loadOptions={(value, callBack) => {
                      const get = async () => {
                        try {
                          const res = await storeSchema.actions.getProjectByType('1', value);
                          const data = res?.data?.map((v) => {
                            return {
                              label: v.PROJECT_NO + ' - ' + v.PROJECT_NAME,
                              value: v.PROJECT_ID,
                              data: v,
                            };
                          });
                          callBack(data);
                        } catch (err) {
                          callBack([]);
                        }
                      };
                      get();
                    }}
                    onChange={(e) => {
                      setProjectNormal({
                        label: e?.label,
                        value: e?.value,
                        data: e?.data,
                      })
                    }}
                    value={projectNormal}
                  />
                }
              />
              <Label
                label='Nama Project'
                children={
                  <input
                    type="text"
                    className="input input-bordered rounded-[25px] bg-white w-full"
                    name='PROJECT_NAME'
                    value={projectNormal?.data?.PROJECT_NAME}
                    disabled
                  />
                }
              />
              <div className='sm:flex sm:gap-10'>
                <div className='w-full'>
                  <Label
                    label='Nama Customer'
                    children={
                      <input
                        type="text"
                        className="input input-bordered rounded-[25px] bg-white w-full"
                        name='CUSTOMER_NAME'
                        value={projectNormal?.data?.CUSTOMER_NAME}
                        disabled
                      />
                    }
                  />
                </div>
                <div className='w-full'>
                  <Label
                    label='Portofolio'
                    children={
                      <input
                        type="text"
                        className="input input-bordered rounded-[25px] bg-white w-full"
                        name='PORTOFOLIO'
                        value={projectNormal?.data?.PORTOFOLIO}
                        disabled
                      />
                    }
                  />
                </div>
              </div>
              <div className='sm:flex sm:gap-10'>
                <div className='w-full'>
                  <Label
                    label='Nomor Kontrak'
                    children={
                      <input
                        type="text"
                        className="input input-bordered rounded-[25px] bg-white w-full"
                        name='contract_no'
                        value={data?.CONTRACT_NO}
                        disabled={true}
                      />
                    }
                  />
                </div>
                <div className='w-full'>
                  <Label
                    label='Nilai Kontrak'
                    children={
                      <CurrencyInput
                        name='nilai_kontrak'
                        value={data?.NILAI_KONTRAK}
                        disabled={true}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              <Label
                label='No Project'
                tooltip
                dataTip='Pilih No Project Akselerasi yang akan digunakan'
                positionTip='right'
                children={
                  <Select
                    name='project_no'
                    className='pl-0'
                    options={dataFields?.filter(item => item.project_no !== "")?.map((v) => {
                      return {
                        label: v?.project_no,
                        value: v?.project_no,
                      }
                    })}
                    onChange={(e, { name }) => handleChangeOpt(e, name)}
                    value={{ label: dataCreateProject?.project_no, value: dataCreateProject?.project_no }}
                  />
                }
              />
              <Label
                label='Nama Project'
                children={
                  <input
                    type="text"
                    className="input input-bordered rounded-[25px] bg-white w-full"
                    name='project_name'
                    onChange={handleChangeCreateProject}
                    value={dataCreateProject?.project_name}
                  />
                }
              />
              <div className='sm:flex sm:gap-10'>
                <div className='w-full'>
                  <Label
                    label='Tipe Project'
                    children={
                      <input
                        type="text"
                        className="input input-bordered rounded-[25px] bg-white w-full"
                        name='project_type_id'
                        value={'Normal'}
                        disabled
                      />
                    }
                  />
                </div>
                <div className='w-full'>
                  <Label
                    label='Portofolio'
                    children={
                      <Select
                        name='portofolio'
                        className='pl-0'
                        options={portofolio}
                        onChange={(e, { name }) => handleChangeOpt(e, name)}
                        value={{ label: dataCreateProject?.portofolio_ur, value: dataCreateProject?.portofolio_id }}
                      />
                    }
                  />
                </div>
              </div>
              <div className='sm:flex sm:gap-10'>
                <div className='w-full'>
                  <Label
                    label='Kategori'
                    children={
                      <Select
                        name='category'
                        className='pl-0'
                        options={kategori}
                        onChange={(e, { name }) => handleChangeOpt(e, name)}
                        value={{ label: dataCreateProject?.category_ur, value: dataCreateProject?.category_id }}
                      />
                    }
                  />
                </div>
                <div className='w-full'>
                  <Label
                    label='Nama Customer'
                    children={
                      <AsyncSelect
                        name='customer'
                        loadOptions={(value, callBack) => {
                          const get = async () => {
                            try {
                              const res = await storeSchema.actions.getCustomers(value);
                              const data = res?.data?.map((v) => {
                                return {
                                  label: v.customer_name,
                                  value: v.customer_id,
                                };
                              });
                              callBack(data);
                            } catch (err) {
                              callBack([]);
                            }
                          };
                          get();
                        }}
                        onChange={(e) => {
                          setCustomer(e);
                        }}
                        value={customer}
                      />
                    }
                  />
                </div>
              </div>
              <div className='sm:flex sm:gap-10'>
                <div className='w-full'>
                  <Label
                    label='COGS'
                    children={
                      <CurrencyInput
                        name='cogs'
                        onChange={handleChangeCurrency}
                        value={dataCreateProject?.cogs}
                      />
                    }
                  />
                </div>
                <div className='w-full'>
                  <Label
                    label='Nilai Penawaran'
                    children={
                      <CurrencyInput
                        name='nilai_penawaran'
                        onChange={handleChangeCurrency}
                        value={dataCreateProject?.nilai_penawaran}
                      />
                    }
                  />
                </div>
                {/* <div className='w-full'>
                <Label
                  label='Estimasi COGS'
                  children={
                    <CurrencyInput
                      name='est_cogs'
                      onChange={handleChangeCurrency}
                      value={dataCreateProject?.est_cogs}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Estimasi Nilai Penawaran'
                  children={
                    <CurrencyInput
                      name='est_nilai_penawaran'
                      onChange={handleChangeCurrency}
                      value={dataCreateProject?.est_nilai_penawaran}
                    />
                  }
                />
              </div> */}
              </div>
              <div className='sm:flex sm:gap-10'>
                <div className='w-full'>
                  <Label
                    label='Nomor Kontrak'
                    children={
                      <input
                        type="text"
                        className="input input-bordered rounded-[25px] bg-white w-full"
                        name='contract_no'
                        onChange={handleChangeCreateProject}
                        value={dataCreateProject?.contract_no}
                      />
                    }
                  />
                </div>
                <div className='w-full'>
                  <Label
                    label='Nilai Kontrak'
                    children={
                      <CurrencyInput
                        name='nilai_kontrak'
                        onChange={handleChangeCurrency}
                        value={dataCreateProject?.nilai_kontrak}
                      />
                    }
                  />
                </div>
              </div>
              <div className='sm:flex sm:gap-10'>
                <div className='w-full'>
                  <Label
                    label='Start Project'
                    children={
                      <input
                        type="date"
                        className="input input-bordered rounded-[25px] bg-white w-full"
                        name='contract_start'
                        onChange={handleChangeCreateProject}
                        value={dataCreateProject?.contract_start?.substring(0, 10)}
                      />
                    }
                  />
                </div>
                <div className='w-full'>
                  <Label
                    label='End Project'
                    children={
                      <input
                        type="date"
                        className="input input-bordered rounded-[25px] bg-white w-full"
                        name='contract_end'
                        onChange={handleChangeCreateProject}
                        value={dataCreateProject?.contract_end?.substring(0, 10)}
                      />
                    }
                  />
                </div>
              </div>
              <div className='sm:flex sm:gap-10'>
                <div className='w-full'>
                  <Label
                    label='SPUC'
                    children={
                      <Select
                        name='SPUC'
                        className='pl-0'
                        options={area}
                        onChange={(e, { name }) => handleChangeOpt(e, name)}
                        value={{ label: dataCreateProject?.ur_spuc, value: dataCreateProject?.kd_spuc }}
                      />
                    }
                  />
                </div>
                <div className='w-full'>
                </div>
              </div>
              <div className='sm:flex sm:gap-10'>
                <div className='w-full'>
                  <Label
                    label={`Nilai Gross Margin Penawaran (${dataCreateProject?.persentase_penawaran}%)`}
                    children={
                      <CurrencyInput
                        name='margin_penawaran'
                        onChange={handleChangeCurrency}
                        value={dataCreateProject?.margin_penawaran}
                        disabled={true}
                      />
                    }
                  />
                </div>
                <div className='w-full'>
                  <Label
                    label={`Nilai Gross Margin Kontrak (${dataCreateProject?.persentase_kontrak}%)`}
                    children={
                      <CurrencyInput
                        name='margin_kontrak'
                        onChange={handleChangeCurrency}
                        value={dataCreateProject?.margin_kontrak}
                        disabled={true}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <hr className='my-5' />
        <div style={{ display: `${projectNormal?.value ? "block" : "none"}` }}>
          <div className='flex flex-row bg-yellow-200 font-bold w-full rounded-full py-2 px-6'>
            <TotalCost />
            <p className='text-sm px-2 self-center'>Total Nilai Estimasi Billing (Project Akselerasi)</p>
            <p className='text-sm px-2 self-center ml-auto'>{formatCurrency(dataBillingAkselerasi?.length > 0 ? dataBillingAkselerasi[0]?.TOTAL_EST_BILLING : 0) || '-'}</p>
          </div>
          <BillingCollectionPlanProjectActual data={data} getDetailProject={getDetailProject} termin={termin} />
        </div>
        <hr className='my-5' />
        <div className='flex justify-end mb-10'>
          <button className='btn btn-primary rounded-[25px]' onClick={handleMarkAsActual}>
            Save
          </button>
        </div>
      </div>
    </>
  )
}

export default MarkAsActual