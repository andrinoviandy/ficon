import React, { useEffect, useState, useRef } from 'react'
import storeSchema from 'global/store';
import { AiOutlineSave } from "react-icons/ai";
import { RxPlusCircled } from "react-icons/rx";
import { swal } from 'global/helper/swal';
import CurrencyInput from 'components/atoms/CurrencyInput';
import { IoMdSend, IoMdTrash, IoMdInformationCircleOutline } from 'react-icons/io';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Label } from 'components/atoms';
import { setToggleModal } from '../../../../../redux/n2n/global';

const BillingCollectionPlanProjectActual = ({ data, getDetailProject, isDetailModalAkselerasi, isBillingRealization, termin, isMarkAsActual, optProject }) => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);
  const fileInputRef = useRef(null);
  const dummyField = {
    project_id: "",
    billing_id: "",
    termin: "",
    desc_termin: "",
    divisi_id: "",
    divisi: "",
    est_billing: "",
    est_periode_billing: "",
    real_billing: "",
    real_periode_billing: "",
    total_dokumen: 0,
    flag_edit: 1,
    kd_status: '',
    project_no: '',
    project_name: '',
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
  const [headerTable, setHeaderTable] = useState(isMarkAsActual
    ? ['Termin', 'Nomor Project', 'Keterangan', 'Divisi', 'Nominal Estimasi Billing']
    : ['Termin', 'Keterangan', 'Divisi', 'Nominal Estimasi Billing']);
  const [dataFields, setDataFields] = useState([dummyField]);
  const [dataFieldsDocDelivery, setDataFieldsDocDelivery] = useState([dummyFieldDocDelivery]);
  const [estBilling, setEstBilling] = useState();

  useEffect(() => {
    if (isBillingRealization && !headerTable.includes('Document Delivery')) {
      setHeaderTable([...headerTable, ...billingRealization]);
    };
    // eslint-disable-next-line
  }, [data])

  // referensi
  const [optDivisi, setOptDivisi] = useState();
  const [optDocDelivery, setOptDocDelivery] = useState();

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

  const getBillingCollectionProjectActual = async () => {
    // swal.loading();
    try {
      const res = await storeSchema.actions.getBillingCollectionProjectActual(data?.PROJECT_ID);
      if (res?.status === true) {
        const newData = res?.data?.map((value) => {
          return {
            project_id: value?.PROJECT_ID,
            billing_id: value?.BILLING_ID,
            termin: value?.TERMIN,
            desc_termin: value?.DESC_TERMIN,
            divisi_id: value?.DIVISI_ID,
            divisi: value?.DIVISI,
            est_billing: value?.EST_BILLING,
            real_billing: value?.REAL_BILLING,
            est_periode_billing: value?.ESTIMATE_PERIODE_BILLING,
            real_periode_billing: value?.REAL_PERIODE_BILLING + '-' + value?.REAL_BULAN_BILLING,
            total_dokumen: value?.TOTAL_DOKUMEN,
            flag_edit: value?.FLAG_EDIT,
            kd_status: value?.KD_STATUS,
            project_no: value?.PROJECT_NO,
            project_name: value?.PROJECT_NAME,
            status: {
              canUpload: false,
              canDelete: true,
            }
          }
        })
        setDataFields(newData);
      } else {
        setDataFields([])
      }
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    // const dokumenBilling = data?.DOKUMEN_BILLING;
    // if (dokumenBilling?.length > 0) {
    //   const newData = dokumenBilling?.map((value) => {
    //     return {
    //       project_id: value?.PROJECT_ID,
    //       billing_id: value?.BILLING_ID,
    //       termin: value?.TERMIN,
    //       desc_termin: value?.DESC_TERMIN,
    //       divisi_id: value?.DIVISI_ID,
    //       est_billing: value?.EST_BILLING,
    //       real_billing: value?.REAL_BILLING,
    //       est_periode_billing: value?.ESTIMATE_PERIODE_BILLING,
    //       real_periode_billing: value?.REAL_PERIODE_BILLING + '-' + value?.REAL_BULAN_BILLING,
    //       total_dokumen: value?.TOTAL_DOKUMEN,
    //       flag_edit: value?.FLAG_EDIT,
    //       kd_status: value?.KD_STATUS,
    //       status: {
    //         canUpload: false,
    //         canDelete: true,
    //       }
    //     }
    //   })
    //   setDataFields(newData);
    // } else {
    //   // setDataFields([dummyField]);
    //   setDataFields([]);
    // };
    if (data !== undefined) {
      getBillingCollectionProjectActual();
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
        swal.loading();
        const res = await storeSchema.actions.deleteBillingCollection(targetValue?.billing_id);
        if (res?.status === true) {
          await swal.success(res?.data);
        } else {
          await swal.error(res?.message);
        };
        getDetailProject();
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
      // const total = data.DOKUMEN_BILLING?.reduce((sum, value) => {
      //   return sum + (value.EST_BILLING || 0);
      // }, 0);

      const value = dataFields[i];      

      // if (((total + parseFloat(value?.est_billing?.toString().replace(",", "."))) > data.NILAI_KONTRAK)) {
      //   await swal.custom("Tidak Dapat Disimpan !", "Nilai Total Estimasi Billing Tidak Dapat Melebihi Nilai Kontrak", "warning");
      //   getDetailProject();
      // } else {
        const payload = {
          project_id: data?.PROJECT_ID,
          ...(isBillingRealization ? {
            real_billing: value?.real_billing?.toString().replace(",", "."),
            real_periode_billing: value?.real_periode_billing,
            billing_id: value?.billing_id,
          } : {
            termin: value?.termin,
            desc_termin: value?.desc_termin,
            divisi_id: value?.divisi_id,
            est_billing: value?.est_billing?.toString().replace(",", "."),
            est_periode_billing: value?.est_periode_billing,
            kategori_billing: '1',
            source_project_id: value?.select_id,
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
          await swal.error(res?.message);
        };
        getDetailProject();
      // }

    } catch (error) {
      console.error(error);
    };
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

  const handleEditField = async (e, index) => {
    e.preventDefault();
    try {
      setEstBilling(dataFields[index]?.est_billing)
      dispatch(setToggleModal({ isOpen: true, modal: "estimasiBilling", item: dataFields[index], index }));
    } catch (error) {
      console.error(error);
    };
  };

  const handleUploadEstimasi = async (e) => {
    e.preventDefault();
    try {
      swal.loading();
      const total = data?.DOKUMEN_BILLING.filter((item) => item?.billing_id !== toggleModal?.item?.billing_id)?.reduce((sum, value) => {
        return sum + (value.EST_BILLING || 0);
      }, 0);

      if (((total + parseFloat(estBilling?.toString().replace(",", "."))) > data.NILAI_KONTRAK)) {
        await swal.custom("Tidak Dapat Disimpan !", "Nilai Total Estimasi Billing Tidak Dapat Melebihi Nilai Kontrak", "warning");
        getDetailProject();
      } else {
        const payload = {
          project_id: toggleModal?.item?.project_id,
          billing_id: toggleModal?.item?.billing_id,
          termin: toggleModal?.item?.termin,
          desc_termin: toggleModal?.item?.desc_termin,
          divisi_id: toggleModal?.item?.divisi_id,
          est_billing: estBilling?.toString().replace(",", "."),
          est_periode_billing: toggleModal?.item?.est_periode_billing,
        };

        const res = await storeSchema.actions.billingCollection(payload);
        if (res?.status === true) {
          if (res?.data?.status === false) {
            await swal.warning(res?.data?.message);
          } else {
            await swal.success(res?.message);
          }
          dispatch(setToggleModal({ isOpen: false, modal: "" }))
        } else {
          await swal.error(res?.message);
        };
        getDetailProject();
      }

    } catch (error) {
      console.error(error);
    };
  };

  return (
    <>
      <Modal
        title="Estimasi Billing"
        modal={"estimasiBilling"}
        size={'max-w-6xl w-11/12'}
        buttonFooter={
          <>
            <button className='btn rounded-[25px] px-5 ml-3 btn-default'
              onClick={() => dispatch(setToggleModal({ isOpen: false, modal: "" }))}
            >
              Close
            </button>
            <button className='btn rounded-[25px] px-5 ml-3 btn-primary' onClick={handleUploadEstimasi}>
              Save
            </button>
          </>
        }
      >
        <div className='mb-5'>
          <div className='sm:flex sm:gap-5 items-end pt-full'>
            <div className='w-full'>
              <Label
                label='Termin'
                children={
                  <input
                    type="text"
                    name={"termin"}
                    className='input input-bordered rounded-[25px] w-full bg-white'
                    value={toggleModal?.item?.termin}
                    disabled={true}
                  />
                }
              />
            </div>
            <div className='w-full'>
              <Label
                label='Keterangan'
                children={
                  <input
                    type="text"
                    name={"keterangan"}
                    className='input input-bordered rounded-[25px] w-full bg-white'
                    value={toggleModal?.item?.desc_termin}
                    disabled={true}
                  />
                }
              />
            </div>
          </div>
          <div className='sm:flex sm:gap-5 items-end pt-full'>
            <div className='w-full'>
              <Label
                label='Divisi'
                children={
                  <input
                    type="text"
                    name={"divisi_id"}
                    className='input input-bordered rounded-[25px] w-full bg-white'
                    value={toggleModal?.item?.divisi}
                    disabled={true}
                  />
                }
              />
            </div>
            <div className='w-full'>
              <Label
                label='Nominal Estimasi Billing'
                children={
                  <CurrencyInput
                    name='est_billing'
                    size='-'
                    onChange={(value, name) => {
                      setEstBilling(value)
                    }}
                    value={estBilling}
                  // disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                  />
                }
              />
            </div>
          </div>
        </div>
      </Modal>
      <div className='card border-2 my-5'>
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Billing Collection Plan (Project Actual)</div>
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
                          if (item?.status?.canDelete || (data?.FLAG_EDIT === false)) {
                            return
                          };
                          handleChange(e, index)
                        }}
                        disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                      />
                    </td>
                    {
                      isMarkAsActual && (
                        <td className={isBillingRealization ? 'min-w-32' : 'w-1/5'}>
                          <select
                            name={"select_id"}
                            className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                            onChange={(e) => handleChange(e, index)}
                            value={item?.select_id}
                            disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                          >
                            <option key={0} value="" disabled></option>
                            {optProject?.map((data, i) => {
                              return (
                                <option key={i + 1} value={data?.project_id}>{`${data?.project_no} - ${data?.project_name}`}</option>
                              )
                            })}
                          </select>
                        </td>
                      )
                    }
                    <td className={isBillingRealization ? 'min-w-60' : 'w-2/5'} >
                      <input
                        type="text"
                        name={"desc_termin"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.desc_termin}
                        onChange={(e) => {
                          if (item?.status?.canDelete || (data?.FLAG_EDIT === false)) {
                            return
                          };
                          handleChange(e, index)
                        }}
                        disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                      />
                    </td>
                    <td className={isBillingRealization ? 'min-w-32' : 'w-1/5'}>
                      <select
                        name={"divisi_id"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        value={item?.divisi_id}
                        disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
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
                          if (item?.status?.canDelete || (data?.FLAG_EDIT === false)) {
                            return
                          };
                          handleChangeCurrency(value, name, index)
                        }}
                        value={item?.est_billing}
                        disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                      />
                    </td>
                    <td className={isBillingRealization ? 'min-w-40' : 'flex gap-3 w-full'}>
                      {((isBillingRealization !== true) && data?.FLAG_EDIT && (isDetailModalAkselerasi !== true)) && (
                        <div className='flex items-center'>
                          {item?.status?.canUpload && (
                            <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUpload(e, index)}>
                              <AiOutlineSave />
                            </div>
                          )}
                          {!item?.status?.canUpload && (
                            <div className='btn btn-sm bg-white' onClick={(e) => handleEditField(e, index)}>
                              {/* <div className='btn btn-sm bg-white'> */}
                              <HiOutlinePencilAlt />
                            </div>
                          )}
                          <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveField(e, index)}>
                            <IoMdTrash />
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* {termin === false && ( */}
          <div
            type="button"
            // disabled={((dataFields.filter(a => a.status.canUpload === true).length) === 1 || isBillingRealization) ? true : false}
            className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-60 '
            onClick={handleAddField}>
            <RxPlusCircled size='20px' /> Add Billing Collection Plan
          </div>
          {/* )} */}
        </div >
      </div >
    </>
  )
}

export default BillingCollectionPlanProjectActual