import React, { useEffect, useState, useRef } from 'react'
import storeSchema from 'global/store';
import { AiOutlineSave } from "react-icons/ai";
import { RxPlusCircled } from "react-icons/rx";
import { swal } from 'global/helper/swal';
import CurrencyInput from 'components/atoms/CurrencyInput';
import { /*IoMdSend,*/ IoMdTrash, IoMdInformationCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Label } from 'components/atoms';
import { setToggleModal } from '../../../../../redux/n2n/global';
import ModalReject from 'views/Realization/Billing/components/Modal/ModalReject';
import { getCookies } from 'global/helper/cookie';

const BillingCollectionPlan = ({ data, getDetailProject, isDetailModalAkselerasi, isBillingRealization, view }) => {
  const accountAccess = getCookies("accountAccess");
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);
  const fileInputRef = useRef(null);
  const dummyField = {
    project_id: "",
    billing_id: "",
    termin: "",
    desc_termin: "",
    divisi_id: "",
    est_billing: "",
    est_periode_billing: "",
    real_billing: "",
    real_periode_billing: "",
    total_dokumen: 0,
    flag_edit: 1,
    kd_status: '',
    select_id: '',
    status: {
      canUpload: true,
      canDelete: false,
    },
  };
  const dummyFieldDocDelivery = {
    project_id: "",
    billing_id: "",
    jns_dokumen: "",
    no_dokumen: "",
    tgl_dokumen: "",
    lampiran: null,
    status: {
      canUpload: true,
      canDelete: false,
    },
  };

  const headerDocumenDeliveryDetail = ['Jenis Dokumen', 'No/Nama Dokumen', 'Tanggal Dokumen', 'Lampiran Dokumen'];
  const billingRealization = ['Estimasi Periode Billing', 'Nominal Realisasi Billing', 'Realisasi Periode Billing', 'Document Delivery'];
  const [headerTable, setHeaderTable] = useState(['Termin', 'Nomor Project', 'Keterangan', 'SPUC', 'Nominal Estimasi Billing']);
  const [dataFields, setDataFields] = useState([dummyField]);
  const [dataFieldsDocDelivery, setDataFieldsDocDelivery] = useState([dummyFieldDocDelivery]);

  useEffect(() => {
    if (isBillingRealization && !headerTable.includes('Document Delivery')) {
      setHeaderTable([...headerTable, ...billingRealization]);
    };
    // eslint-disable-next-line
  }, [])

  // referensi
  const [optDivisi, setOptDivisi] = useState();
  const [optDocDelivery, setOptDocDelivery] = useState();
  const [optProject, setOptProject] = useState();

  useEffect(() => {
    const getOptDivisi = async () => {
      try {
        const res = await storeSchema.actions.getReferensiByJenis("kd_spuc");
        if (res?.status === true) {
          const option = res?.data?.map((item) => {
            return {
              label: item?.ur_ref,
              value: item?.kd_ref,
              data: item,
            }
          })
          setOptDivisi(option);
        } else {
          setOptDivisi([]);
        };
      } catch (error) {
        console.error(error);
      };
    };
    const getOptDocDelivery = async () => {
      try {
        const res = await storeSchema.actions.getSubReferensiByJenis("tipe_dok", "04");
        if (res?.status === true) {
          const option = res?.data?.map((item) => {
            return {
              label: item?.UR_REF,
              value: item?.KD_REF,
              data: item,
            }
          })
          setOptDocDelivery(option);
        } else {
          setOptDocDelivery([]);
        };
      } catch (error) {
        console.error(error);
      };
    };

    getOptDivisi();
    getOptDocDelivery();
  }, []);

  const handleChange = (e, i) => {
    const values = [...dataFields];
    values[i][e.target.name] = e.target.value;
    setDataFields(values);
  };

  const handleChangeCurrency = (value, name, index) => {
    const values = [...dataFields];
    values[index][name] = value;
    setDataFields(values);
  };

  useEffect(() => {
    const dokumenBilling = data?.DOKUMEN_BILLING;
    const dataAkselerasi = data?.AKSELERASI;
    if (dokumenBilling?.length > 0) {
      const newData = dokumenBilling?.map((value) => {
        return {
          project_id: value?.PROJECT_ID,
          billing_id: value?.BILLING_ID,
          termin: value?.TERMIN,
          desc_termin: value?.DESC_TERMIN,
          divisi_id: value?.DIVISI_ID,
          est_billing: value?.EST_BILLING,
          real_billing: value?.REAL_BILLING,
          est_periode_billing: value?.ESTIMATE_PERIODE_BILLING,
          real_periode_billing: value?.REAL_PERIODE_BILLING + '-' + value?.REAL_BULAN_BILLING,
          total_dokumen: value?.TOTAL_DOKUMEN,
          flag_edit: value?.FLAG_EDIT,
          kd_status: value?.KD_STATUS,
          select_id: value?.NOMOR_PROJECT,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDataFields(newData);
    } else {
      // setDataFields([dummyField]);
      setDataFields([]);
    };

    if (dataAkselerasi?.length > 0) {
      const newData = dataAkselerasi?.map((value) => {
        return {
          project_id: value?.PROJECT_ID,
          project_no: value?.PROJECT_NO,
          project_name: value?.PROJECT_NAME,
          no_po: '',
        }
      })

      setOptProject(newData);
    } else {
      setOptProject([]);
    }
    // eslint-disable-next-line
  }, [data]);

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
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        const confirm = await swal.confirmDelete();
        if (confirm === true) {
          swal.loading();
          const res = await storeSchema.actions.deleteBillingCollection(targetValue?.billing_id);
          if (res?.status === true) {
            await swal.success(res?.data);
          } else {
            await swal.error(res?.message);
          };
          getDetailProject();
        }
      } else {
        values.splice(i, 1);
        setDataFields(values);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const handleUpload = async (e, i) => {
    e.preventDefault();
    try {
      swal.loading();
      const total = data.DOKUMEN_BILLING?.reduce((sum, value) => {
        return sum + (value.EST_BILLING || 0);
      }, 0);

      const value = dataFields[i];

      // if (((total + parseInt(value?.est_billing)) > data.NILAI_KONTRAK) && !isBillingRealization) {
      //   await swal.custom("Tidak Dapat Disimpan !", "Nilai Total Estimasi Billing Tidak Dapat Melebihi Nilai Kontrak", "warning");
      //   getDetailProject();
      // } else {
      const payload = {
        project_id: data?.PROJECT_ID,
        ...(isBillingRealization ? {
          est_billing: value?.est_billing?.toString().replace(",", "."),
          // real_billing: value?.real_billing?.toString().replace(",", "."),
          // real_periode_billing: value?.real_periode_billing,
          billing_id: value?.billing_id,
          est_periode_billing: value?.est_periode_billing,
          termin: value?.termin,
          desc_termin: value?.desc_termin,
          divisi_id: value?.divisi_id,
        } : {
          termin: value?.termin,
          desc_termin: value?.desc_termin,
          divisi_id: value?.divisi_id,
          est_billing: value?.est_billing?.toString().replace(",", "."),
          est_periode_billing: value?.est_periode_billing,
          kategori_billing: '1',
        })
      };

      const res = await storeSchema.actions.billingCollection(payload);
      if (res?.status === true) {
        if (res?.data?.status === false) {
          await swal.warning(res?.data?.message);
        } else {
          await swal.success(res?.message);
        }
      } else {
        await swal.custom('Gagal Simpan', res?.data, 'error');
      };
      getDetailProject();
      // }

    } catch (error) {
      console.error(error);
    };
  };

  // const handleSend = async (e, i) => {
  //   e.preventDefault();
  //   try {
  //     swal.loading();
  //     const value = dataFields[i];
  //     const payload = {
  //       // project_id: value?.project_id,
  //       project_id: value?.billing_id,
  //       billing_id: value?.billing_id,
  //       // id_tab_status: 'FN1',
  //       id_tab_status: 'DL1',
  //       kd_status: '301',
  //       type_status: 'BL01'
  //     }

  //     if (value?.total_dokumen > 0 && value?.real_billing > 0 && (value?.real_periode_billing !== '' || value?.real_periode_billing !== 'null-null')) {
  //       const res = await storeSchema.actions.insertProjectStatus(payload);
  //       if (res?.status === true) {
  //         await swal.success(res?.message);
  //       } else {
  //         await swal.error(res?.message);
  //       };
  //       getDetailProject();
  //     } else {
  //       swal.custom('Tidak Dapat Dikirim !', 'Nominal Realisasi, Realisasi Periode Billing, dan Document Delivery Wajib Terisi', 'warning')
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   };
  // };

  // const handleChangeDocDelivery = (e, i) => {
  //   const values = [...dataFieldsDocDelivery];
  //   if (e.target.files) {
  //     values[i][e.target.name] = e.target.files[0];
  //   } else {
  //     values[i][e.target.name] = e.target.value;
  //   }
  //   setDataFieldsDocDelivery(values);
  // };

  const handleChangeDocDelivery = (e, i) => {
    const maxFileSize = 25 * 1024 * 1024; // 25MB dalam byte
    const values = [...dataFieldsDocDelivery];

    if (e.target.files) {
      const file = e.target.files[0];
      if (file.size > maxFileSize) {
        swal.custom("File Terlalu Besar", "Ukuran file tidak boleh lebih dari 25 MB", "warning");
        values[i][e.target.name] = null;
        fileInputRef.current.value = null;
      } else {
        values[i][e.target.name] = file;
      }
    } else {
      values[i][e.target.name] = e.target.value;
    }

    setDataFieldsDocDelivery(values);
  };

  useEffect(() => {
    // console.log("ini data billing", data);

    // const total = data.DOKUMEN_BILLING?.reduce((sum, value) => {
    //   return sum + (value.EST_BILLING || 0);
    // }, 0);


    // console.log("ini total", total);
    const detailDocDelivery = toggleModal?.data;
    if (detailDocDelivery?.length > 0) {
      const newData = detailDocDelivery?.map((value) => {
        return {
          dokumen_id: value?.DOKUMEN_ID,
          project_id: value?.PROJECT_ID,
          billing_id: toggleModal?.billing_id,
          jns_dokumen: value?.JNS_DOKUMEN,
          no_dokumen: value?.NO_DOKUMEN,
          tgl_dokumen: value?.TGL_DOKUMEN?.substring(0, 10),
          url_dokumen: value?.URL_DOKUMEN,
          kd_status: value?.KD_STATUS,
          lampiran: null,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDataFieldsDocDelivery(newData);
    } else {
      setDataFieldsDocDelivery([dummyFieldDocDelivery]);
    };
    // eslint-disable-next-line
  }, [toggleModal]);

  const handleAddFieldDoc = () => {
    setDataFieldsDocDelivery([
      ...dataFieldsDocDelivery,
      dummyFieldDocDelivery,
    ])
  };

  const handleRemoveFieldDocDelivery = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFieldsDocDelivery];
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        const confirm = await swal.confirmDelete();
        if (confirm === true) {
          swal.loading()
          const res = await storeSchema.actions.deleteDokumen(targetValue?.dokumen_id);
          if (res?.status === true) {
            await swal.success(res?.data);
          } else {
            await swal.error(res?.message);
          };
          getDetailProject();
          handleViewDoc(e, toggleModal?.billing_id, toggleModal?.index, true)
        }
      } else {
        values.splice(i, 1);
        setDataFieldsDocDelivery(values);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const handleUploadDocDelivery = async (e, i) => {
    e.preventDefault();
    try {
      swal.loading()
      const value = dataFieldsDocDelivery[i];
      const payload = {
        tipe_dokumen: "04", // dokumen delivery
        no_dokumen: value?.no_dokumen,
        tgl_dokumen: value?.tgl_dokumen?.substring(0, 10),
        jns_dokumen: value?.jns_dokumen,
        project_id: data?.PROJECT_ID,
        billing_id: toggleModal?.billing_id,
      };

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("lampiran", value?.lampiran);

      const res = await storeSchema.actions.uploadDokumen(formData);
      if (res?.status === true) {
        await swal.success(res?.data?.keterangan);
      } else {
        await swal.error(res?.message);
      };
      getDetailProject();
      handleViewDoc(e, toggleModal?.billing_id, toggleModal?.index, true)
    } catch (error) {
      console.error(error);
    };
  };

  const handleViewDoc = async (e, billing_id, index, callback) => {
    e.preventDefault();
    swal.loading();
    try {
      const res = await storeSchema.actions.getBillingDocument(billing_id);
      if (res?.status === true) {
        swal.close();
        dispatch(setToggleModal({ isOpen: (callback === true ? toggleModal.isOpen : !toggleModal.isOpen), modal: "documentDeliveryDetail", data: res?.data?.DOKUMEN_BILLING, billing_id, index }));
      } else {
        swal.error(res?.message);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const viewReject = async (e, i) => {
    e.preventDefault();
    try {
      swal.loading()
      const value = dataFields[i];
      const res = await storeSchema.actions.getStatusBilling(value?.billing_id);
      if (res?.status === true) {
        swal.close();
        dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "revenueReject", data: res?.data }));
      } else {
        swal.error(res?.message);
      };
    } catch (error) {
      console.error(error);
    }
  };

  console.log(dataFields, 'dataFields');


  return (
    <>
      <Modal
        title="Document Delivery Detail"
        modal={"documentDeliveryDetail"}
        size={'max-w-6xl w-11/12'}
        buttonFooter={
          <>
            <button className='btn rounded-[25px] px-5 ml-3 text-white bg-[#2E66B9]'
              onClick={() => dispatch(setToggleModal({ isOpen: false, modal: "" }))}
            >
              Close
            </button>
          </>
        }
      >
        <div className='mb-5'>
          <div className='sm:flex sm:gap-5 items-end pt-full'>
            <div className='w-full'>
              <Label
                label='Nominal Realisasi Billing'
                children={
                  <CurrencyInput
                    name='real_billing'
                    size=''
                    onChange={(value, name) => {
                      handleChangeCurrency(value, name, toggleModal?.index)
                    }}
                    value={dataFields[toggleModal?.index]?.real_billing}
                    disabled={dataFields[toggleModal?.index]?.flag_edit === 0 || isBillingRealization}
                  />
                }
              />
            </div>
            <div className='w-full'>
              <Label
                label='Realisasi Periode Billing'
                children={
                  <input
                    type="month"
                    name={"real_periode_billing"}
                    className='input input-bordered rounded-[25px] w-full bg-white'
                    value={dataFields[toggleModal?.index]?.real_periode_billing}
                    min={new Date().toISOString().slice(0, 7)}
                    onChange={(e) => {
                      handleChange(e, toggleModal?.index)
                    }}
                    disabled={dataFields[toggleModal?.index]?.flag_edit === 0 || isBillingRealization}
                  />
                }
              />
            </div>
            <div>
              <button
                className='btn rounded-[25px] px-5 ml-3 text-white bg-[#2E66B9]'
                disabled={isBillingRealization}
                onClick={(e) => handleUpload(e, toggleModal?.index)}
                style={{ display: `${dataFields[toggleModal?.index]?.flag_edit === 0 ? "none" : "block"}` }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <table className='table table-sm table-pin-rows'>
          <thead>
            <tr className='bg-white'>
              {headerDocumenDeliveryDetail?.map((title, i) => {
                return (
                  <th key={i} className='w-1/4'>{title}</th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {dataFieldsDocDelivery?.map((item, index) => (
              <tr key={index}>
                <td className={isBillingRealization ? 'min-w-40' : 'w-1/4'}>
                  <select
                    name={"jns_dokumen"}
                    className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                    onChange={(e) => handleChangeDocDelivery(e, index)}
                    value={item?.jns_dokumen}
                    disabled={item?.status?.canDelete || isDetailModalAkselerasi}
                  >
                    <option key={0} value="" disabled></option>
                    {optDocDelivery?.map((data, i) => {
                      return (
                        <option key={i + 1} value={data?.value} selected={data?.value === item?.jns_dokumen}>{data?.label}</option>
                      )
                    })}
                  </select>
                </td>
                <td className={isBillingRealization ? 'min-w-40' : 'w-1/4'} >
                  <input
                    type="text"
                    name={"no_dokumen"}
                    className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                    value={item?.no_dokumen}
                    onChange={(e) => {
                      if (item?.status?.canDelete) {
                        return
                      };
                      handleChangeDocDelivery(e, index)
                    }}
                    disabled={item?.status?.canDelete || isDetailModalAkselerasi}
                  />
                </td>
                <td className='w-1/6'>
                  <input
                    type="date"
                    name={"tgl_dokumen"}
                    className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                    value={item?.tgl_dokumen}
                    onChange={(e) => {
                      if (item?.status?.canDelete) {
                        return
                      };
                      handleChangeDocDelivery(e, index)
                    }}
                    disabled={item?.status?.canDelete || isDetailModalAkselerasi}
                  />
                </td>
                <td className='flex gap-3'>
                  {item?.status?.canDelete ? (
                    <input
                      type="text"
                      name={"lampiran"}
                      className='input input-sm input-bordered text-center rounded-[25px] w-full bg-primary text-white cursor-pointer'
                      value={"Open Dokumen Delivery"}
                      onClick={() => window.open(item?.url_dokumen, "_blank")}
                    />
                  ) : (
                    <input
                      type="file"
                      name={"lampiran"}
                      className='flex-1 file-input file-input-sm file-input-bordered file-input-primary rounded-[25px] bg-white'
                      onChange={(e) => {
                        if (item?.status?.canDelete) {
                          return
                        };
                        handleChangeDocDelivery(e, index)
                      }}
                      ref={fileInputRef}
                      disabled={item?.status?.canDelete || isDetailModalAkselerasi}
                    />
                  )}
                  {/* {(data?.FLAG_EDIT && (isDetailModalAkselerasi !== true)) && ( */}
                  {((isDetailModalAkselerasi !== true && dataFields[toggleModal?.index]?.flag_edit === 1 && !isBillingRealization) || accountAccess?.kode === '4380') && (
                    <div className='flex items-center'>
                      {(item?.status?.canUpload) && (
                        <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUploadDocDelivery(e, index)}>
                          <AiOutlineSave />
                        </div>
                      )}
                      {(item?.kd_status === '' || item?.kd_status === '302') && (
                        <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveFieldDocDelivery(e, index)}>
                          <IoMdTrash />
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div type="button" className='btn btn-sm rounded-[25px] border-none bg-blue-50 text-primary my-3 w-60 ' onClick={handleAddFieldDoc} disabled={((dataFieldsDocDelivery.filter(a => a.status.canUpload === true).length) === 1 || dataFields[toggleModal?.index]?.flag_edit === 0 || isBillingRealization) ? accountAccess?.kode === '4380' ? false : true : false}>
          <RxPlusCircled size='20px' /> Add Document
        </div>
      </Modal>
      <ModalReject getDetailProject={getDetailProject} />
      <div className='card border-2 my-5'>
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Billing Collection Plan</div>
        <div className='card-body'>
          <div className='max-h-64 min-w-6xl overflow-auto'>
            <table className='table table-sm table-pin-rows'>
              <thead>
                <tr className='bg-white'>
                  {headerTable?.map((title, i) => {
                    return (
                      <th key={i}>{title}</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {dataFields?.map((item, index) => (
                  <tr key={index}>
                    <td className={isBillingRealization ? 'min-w-24' : 'w-1/5'} >
                      <input
                        type="number"
                        name={"termin"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.termin}
                        onChange={(e) => {
                          if (item?.status?.canDelete) {
                            return
                          };
                          handleChange(e, index)
                        }}
                        disabled={item?.status?.canDelete || isDetailModalAkselerasi}
                      />
                    </td>
                    <td className={isBillingRealization ? 'min-w-32' : 'w-1/5'}>
                      <select
                        name={"select_id"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        value={item?.select_id}
                        disabled={item?.status?.canDelete || isDetailModalAkselerasi}
                      >
                        <option key={0} value="" disabled></option>
                        {optProject?.map((data, i) => {
                          return (
                            <option key={i + 1} value={data?.project_id}>{`${data?.project_no} - ${data?.project_name}`}</option>
                          )
                        })}
                      </select>
                    </td>
                    <td className={isBillingRealization ? 'min-w-60' : 'w-2/5'} >
                      <input
                        type="text"
                        name={"desc_termin"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.desc_termin}
                        onChange={(e) => {
                          if (item?.status?.canDelete) {
                            return
                          };
                          handleChange(e, index)
                        }}
                        disabled={item?.status?.canDelete || isDetailModalAkselerasi}
                      />
                    </td>
                    <td className={isBillingRealization ? 'min-w-72' : 'w-1/2'}>
                      <select
                        name={"divisi_id"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        value={item?.divisi_id}
                        disabled={item?.status?.canDelete || isDetailModalAkselerasi}
                      >
                        <option key={0} value="" disabled></option>
                        {optDivisi?.map((data, i) => {
                          return (
                            <option key={i + 1} value={data?.value} >{data?.label}</option>
                          )
                        })}
                      </select>
                    </td>
                    <td className={isBillingRealization ? 'min-w-44' : 'w-1/5'}>
                      <CurrencyInput
                        name='est_billing'
                        size='-sm'
                        onChange={(value, name) => {
                          if (item?.status?.canDelete) {
                            return
                          };
                          handleChangeCurrency(value, name, index)
                        }}
                        value={item?.est_billing}
                        disabled={item?.status?.canDelete || isDetailModalAkselerasi}
                      />
                    </td>
                    <td className={isBillingRealization ? 'min-w-40' : 'flex gap-3 w-full'}>
                      {isBillingRealization && (
                        <input
                          type="month"
                          name={"est_periode_billing"}
                          className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                          value={item?.est_periode_billing}
                          onChange={(e) => {
                            // if (item?.status?.canDelete || (data?.FLAG_EDIT === false)) {
                            //   return
                            // };
                            handleChange(e, index)
                          }}
                        // disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                        />
                      )}
                      {((isBillingRealization !== true) && data?.FLAG_EDIT && (isDetailModalAkselerasi !== true) && view === true) && (
                        <div className='flex items-center'>
                          {item?.status?.canUpload && (
                            <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUpload(e, index)}>
                              <AiOutlineSave />
                            </div>
                          )}
                          {(item?.kd_status === '' || item?.kd_status === '302') && (
                            <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveField(e, index)}>
                              <IoMdTrash />
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    {isBillingRealization && (
                      <>
                        <td className='min-w-44'>
                          <CurrencyInput
                            name='real_billing'
                            size='-sm'
                            onChange={(value, name) => {
                              handleChangeCurrency(value, name, index)
                            }}
                            value={item?.real_billing}
                            // disabled={isBillingRealization !== true || item?.flag_edit === 0}
                            disabled={true}
                          />
                        </td>
                        <td className='min-w-40'>
                          <input
                            type="month"
                            name={"real_periode_billing"}
                            className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                            value={item?.real_periode_billing}
                            onChange={(e) => {
                              handleChange(e, index)
                            }}
                            // disabled={isBillingRealization !== true || item?.flag_edit === 0}
                            disabled={true}
                          />
                        </td>
                        <td className='flex gap-3 w-full'>
                          {!item?.status?.canUpload && (
                            <div type="button" className='btn btn-sm rounded-[25px] border-none bg-blue-50 text-primary w-56 hover:bg-blue-100' onClick={(e) => handleViewDoc(e, item?.billing_id, index)}>
                              View Attachment <span className='text-zinc-400'>| {item?.total_dokumen} Files</span> <span className='bg-primary text-blue-50 rounded-[50%] pt-0 p-1 '>{'>'}</span>
                            </div>
                          )}
                          {(item?.flag_edit === 1) && (
                            <div className='flex items-center gap-2 w-full justify-end'>
                              {(item?.kd_status === '302') && (
                                <div className="tooltip" data-tip="Information Rejected">
                                  <div className='btn btn-sm bg-yellow-600 text-white' onClick={(e) => viewReject(e, index)}>
                                    <IoMdInformationCircleOutline size={18} />
                                  </div>
                                </div>
                              )}
                              {(
                                <>
                                  <div className="tooltip" data-tip={item?.status?.canUpload ? "Save" : "Update"}>
                                    {/* <div className='btn btn-sm bg-green-600 text-white' onClick={(e) => handleSend(e, index)}>
                                      <IoMdSend />
                                    </div> */}
                                    <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUpload(e, index)}>
                                      <AiOutlineSave />
                                    </div>
                                  </div>
                                </>
                              )}
                              {(item?.status?.canDelete || item?.status?.canUpload && view === true) && (item?.kd_status === '' || item?.kd_status === '302' || item?.kd_status === null) && (
                                <div className='btn btn-sm bg-red-500 text-white' onClick={(e) => handleRemoveField(e, index)}>
                                  <IoMdTrash />
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {((data?.FLAG_EDIT && (isDetailModalAkselerasi !== true) && view === true) || isBillingRealization) && (
            <div
              type="button"
              disabled={((dataFields.filter(a => a.status.canUpload === true).length) === 1) ? true : false}
              className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-60 '
              onClick={handleAddField}>
              <RxPlusCircled size='20px' /> Add Billing Collection Plan
            </div>
          )}
        </div >
      </div >
    </>
  )
}

export default BillingCollectionPlan