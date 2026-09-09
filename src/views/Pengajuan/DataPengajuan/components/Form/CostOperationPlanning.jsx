import { Label } from 'components/atoms'
import CurrencyInput from 'components/atoms/CurrencyInput'
import React, { useEffect, useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { RxPlusCircled } from 'react-icons/rx';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
import { formatCurrency } from 'global/helper/formatCurrency';
import { optionRefByJenis, optionSubReferensiByJenis } from 'global/helper/functionOption';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'components/atoms';
import { setToggleModal } from '../../../../../redux/n2n/global';
import { ReactComponent as TotalCost } from 'assets/icons/rdTotalCost.svg';

const CostOperationPlanning = ({ dataDetail, getDetailProject }) => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);

  const headerTable = ['Category Pengajuan', 'Mata Anggaran', 'Divisi', 'Jenis Pengajuan', 'Nominal Pengajuan', 'Keterangan', ''];
  const headerDokumen = ["Jenis Dokumen", "No Dokumen", "Tanggal Pengajuan", "Attachment Dokumen Pengajuan"];
  const dummyField = {
    cost_detail_id: "",
    dokumen_id: "",
    tipe_dokumen: "04",
    no_dokumen: "",
    tgl_dokumen: "",
    jns_dokumen: "",
    url_dokumen: "",
    status: {
      canUpload: true,
      canDelete: false,
    },
  };
  const costFields = {
    cost_id: "",
    project_id: "",
    kategori_cost: "",
    mata_anggaran: "",
    divisi_id: "",
    jenis_cost: "",
    nilai_cost: "",
  }

  const [dataFields, setDataFields] = useState([dummyField]);
  const [dataCost, setDataCost] = useState(costFields);
  const [totalCost, setTotalCost] = useState(0);

  // referensi
  const [optCategoryPengajuan, setOptCategoryPengajuan] = useState();
  const [optDivisi, setOptDivisi] = useState();
  const [optMataAnggaran, setOptMataAnggaran] = useState();
  const [optJenisPengajuan, setOptJenisPengajuan] = useState();
  const [optJenisDok, setOptJenisDok] = useState([]);
  const [file, setFile] = useState(null);
  const [action, setAction] = useState('');

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

  const handleChangeCost = (e) => {
    setDataCost((prev) => { return { ...prev, [e.target.name]: e.target.value } });
  };

  const handleChangeCurrencyCost = (value, name) => {
    setDataCost((prev) => { return { ...prev, [name]: value } });
  };

  const handleUpload = async (e, i) => {
    e.preventDefault();
    try {
      swal.loading();
      const value = dataFields[i];
      const payload = {
        tipe_dokumen: "04", // dokumen pengajuan
        no_dokumen: value?.no_dokumen,
        tgl_dokumen: value?.tgl_dokumen?.substring(0, 10),
        jns_dokumen: value?.jns_dokumen,
        project_id: dataDetail?.PROJECT_ID,
      };

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("lampiran", file);

      const res = await storeSchema.actions.uploadDokumen(formData);
      if (res?.status === true) {
        await swal.success(res?.data?.keterangan);
        if (action === 'edit') {
          const value = res?.data?.dokumen_id[0];
          const payloadDetail = {
            cost_id: dataCost?.cost_id,
            dokumen_id: value?.dokumen_id,
          }
          const resDetail = await storeSchema.actions.costOperationalDetailDokumen(payloadDetail)
          if (resDetail?.status === true) {
            const newData = {
              cost_detail_id: resDetail?.data?.cost_detail_id,
              dokumen_id: value?.dokumen_id,
              tipe_dokumen: value?.tipe_dokumen,
              no_dokumen: value?.no_dokumen,
              tgl_dokumen: value?.tgl_dokumen.substring(0, 10),
              jns_dokumen: value?.jns_dokumen,
              url_dokumen: value?.url_dokumen,
              status: {
                canUpload: false,
                canDelete: true,
              }
            }
            setDataFields([newData, ...dataFields.filter((a) => a.status.canUpload === false)])
          }
        } else {
          const value = res?.data?.dokumen_id[0];
          const newData = {
            cost_detail_id: '',
            dokumen_id: value?.dokumen_id,
            tipe_dokumen: value?.tipe_dokumen,
            no_dokumen: value?.no_dokumen,
            tgl_dokumen: value?.tgl_dokumen.substring(0, 10),
            jns_dokumen: value?.jns_dokumen,
            url_dokumen: value?.url_dokumen,
            status: {
              canUpload: false,
              canDelete: true,
            }
          }
          setDataFields([newData, ...dataFields.filter((a) => a.status.canUpload === false)])
        }
      } else {
        await swal.error(res?.message);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const uploadCostOperational = async (e) => {
    try {
      swal.loading();
      const value = dataCost;
      const payload = {
        project_id: dataDetail?.PROJECT_ID,
        kategori_cost: value?.kategori_cost,
        mata_anggaran: value?.mata_anggaran,
        divisi_id: value?.divisi_id,
        jenis_cost: value?.jenis_cost,
        nilai_cost: value?.nilai_cost,
        keterangan: value?.keterangan
      };
      if (action === 'edit') {
        Object.assign(payload, {
          cost_id: value?.cost_id
        })
      }

      const res = await storeSchema.actions.costOperationalDetail(payload);
      if (res?.status === true) {
        if (action === 'create') {
          const dokumen = dataFields.filter((a) => a.status.canUpload === false)
          dokumen.map(async (item) => {
            const payloadDetail = {
              cost_id: res?.data?.cost?.cost_id,
              dokumen_id: item?.dokumen_id,
            }
            await storeSchema.actions.costOperationalDetailDokumen(payloadDetail)
          })
        }
        await swal.success(res?.message);
      } else {
        await swal.error(res?.message);
      };
      getDetailProject();
      dispatch(setToggleModal({ isOpen: false, modal: "" }))
    } catch (error) {
      console.error(error);
    };
  };

  const handleRemoveField = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFields];
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        swal.loading();
        const res = await storeSchema.actions.deleteDokumen(targetValue?.dokumen_id);
        if (res?.status === true) {
          await swal.success(res?.data);
        } else {
          await swal.error(res?.message);
        };
        // create
        values.splice(i, 1);
        setDataFields(values);
      } else {
        values.splice(i, 1);
        setDataFields(values);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const handleRemoveDetail = async (e, id) => {
    e.preventDefault();
    try {
      swal.loading();
      const res = await storeSchema.actions.deleteCostOperational(id);
      if (res?.status === true) {
        await swal.success(res?.data);
      } else {
        await swal.error(res?.message);
      };
      getDetailProject();
    } catch (error) {
      console.error(error);
    };
  };

  const handleAddField = () => {
    setDataFields([
      ...dataFields,
      dummyField,
    ])
  };

  const handleAddPengajuan = async (e, cost_id, callback) => {
    e.preventDefault();
    await setDataCost(costFields)
    await setDataFields([dummyField])
    setAction('create')
    setDataCost((prev) => { return { ...prev, project_id: dataDetail?.PROJECT_ID } });
    dispatch(setToggleModal({ isOpen: (callback === true ? toggleModal.isOpen : !toggleModal.isOpen), modal: "addPengajuan", cost_id }));
  };

  const getDetailCostOperationalWithDokumen = async (cost_id) => {
    try {
      const res = await storeSchema.actions.getDetailCostOperationalWithDokumen(cost_id)
      if (res?.status === true) {
        const newData = {
          cost_id: res?.data?.COST_ID,
          project_id: res?.data?.PROJECT_ID,
          kategori_cost: res?.data?.KATEGORI_COST,
          mata_anggaran: res?.data?.MATA_ANGGARAN,
          divisi_id: res?.data?.DIVISI_ID,
          jenis_cost: res?.data?.JENIS_COST,
          nilai_cost: res?.data?.NILAI_COST,
          keterangan: res?.data?.KETERANGAN,
        }
        setDataCost(newData)
        const dokumen = []
        const detail = res?.data?.DOKUMEN
        detail?.map((item) => {
          const newData = {
            cost_detail_id: item?.COST_DETAIL_ID,
            dokumen_id: item?.DOKUMEN_ID,
            tipe_dokumen: item?.TIPE_DOKUMEN,
            no_dokumen: item?.NO_DOKUMEN,
            tgl_dokumen: item?.TGL_DOKUMEN.substring(0, 10),
            jns_dokumen: item?.JNS_DOKUMEN,
            url_dokumen: item?.URL_DOKUMEN,
            status: {
              canUpload: false,
              canDelete: true,
            },
          }
          return dokumen.push(newData)
        })
        setDataFields(dokumen)
      } else {
        setDataCost(costFields)
        setDataFields([dummyField])
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditDetail = async (e, cost_id, callback) => {
    e.preventDefault();
    setAction('edit')
    await getDetailCostOperationalWithDokumen(cost_id)
    dispatch(setToggleModal({ isOpen: (callback === true ? toggleModal.isOpen : !toggleModal.isOpen), modal: "addPengajuan", cost_id }));
  };

  useEffect(() => {
    setTotalCost(0);
    const valueCostPersonilDetail = dataDetail?.DETAIL_COST;
    if (valueCostPersonilDetail?.length > 0) {
      const sum = valueCostPersonilDetail
        .filter(obj => obj.NILAI_COST)
        .reduce((acc, obj) => acc + obj.NILAI_COST, 0);
      setTotalCost(sum);

    } else {
      setDataFields([]);
    };
    // eslint-disable-next-line
  }, [dataDetail]);

  useEffect(() => {
    const fetchOption = async () => {
      setOptCategoryPengajuan(await optionRefByJenis('cost_activity'));
      setOptDivisi(await optionRefByJenis('kd_spuc'));
      setOptMataAnggaran(await optionRefByJenis('mata_anggaran'));
      // setOptJenisPengajuan(await optionRefByJenis('jenis_cost'));
    };
    fetchOption();

    const getOptJenisDok = async () => {
      try {
        const res = await storeSchema.actions.getSubReferensiByJenis("tipe_dok", '04');
        if (res?.status === true) {
          const option = res?.data?.map((item) => {
            return {
              label: item?.UR_REF,
              value: item?.KD_REF,
              data: item,
            }
          })
          setOptJenisDok(option);
        } else {
          setOptJenisDok([]);
        };
      } catch (error) {
        console.error(error);
      };
    };

    getOptJenisDok();
    getDetailProject()
  }, []);

  useEffect(() => {
    if (dataCost.kategori_cost && dataCost.kategori_cost !== '') {
      const getJenisPengajuan = async () => {
        setOptJenisPengajuan(await optionSubReferensiByJenis("sub_cost_activity", dataCost?.kategori_cost))
      }
      getJenisPengajuan()
    } else {
      setOptJenisPengajuan([])
    }
  }, [dataCost])

  return (
    <>
      <Modal
        title="Add Pengajuan"
        modal={"addPengajuan"}
        size={'max-w-6xl w-11/12'}
        buttonFooter={
          <>
            <button className='btn rounded-[25px] px-5 ml-3 text-white bg-[#2E66B9]'
              onClick={() => dispatch(setToggleModal({ isOpen: false, modal: "" }))}
            >
              Close
            </button>
            <button className='btn rounded-[25px] px-5 ml-3 text-white bg-[#2E66B9]'
              onClick={() => uploadCostOperational()}
            >
              Submit
            </button>
          </>
        }
      >
        <div className='flex flex-col gap-2 mb-7'>
          <div className='sm:flex sm:gap-10'>
            <div className='w-1/5'>
              <Label
                label='No Project'
                children={
                  <input
                    type="text"
                    className="input input-bordered rounded-[25px] bg-white w-full"
                    name='id_project'
                    value={dataDetail?.PROJECT_NO}
                    disabled={true}
                  />
                }
              />
            </div>
            <div className='w-4/5'>
              <Label
                label='Nama Projek'
                children={
                  <input
                    type="text"
                    className="input input-bordered rounded-[25px] bg-white w-full"
                    name='project_name'
                    value={dataDetail?.PROJECT_NAME}
                    disabled={true}
                  />
                }
              />
            </div>
          </div>
          <div className='sm:flex sm:gap-10'>
            <div className='w-full'>
              <Label
                label='Divisi'
                children={
                  <select
                    name={"divisi_id"}
                    className='select w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                    onChange={(e) => handleChangeCost(e)}
                    value={dataCost?.divisi_id}
                  // disabled={dataDetail?.status?.canDelete}
                  >
                    <option key={0} value=""></option>
                    {optDivisi?.map((data, i) => {
                      return (
                        <option key={i} value={data?.value}>{data?.label}</option>
                      )
                    })}
                  </select>
                }
              />
            </div>
            <div className='w-full'>
              <Label
                label='Mata Anggaran'
                children={
                  <select
                    name={"mata_anggaran"}
                    className='select w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                    onChange={(e) => handleChangeCost(e)}
                    value={dataCost?.mata_anggaran}
                  // disabled={dataDetail?.status?.canDelete}
                  >
                    <option key={0} value=""></option>
                    {optMataAnggaran?.map((data, i) => {
                      return (
                        <option key={i} value={data?.value}>{data?.label}</option>
                      )
                    })}
                  </select>
                }
              />
            </div>
          </div>
          <div className='sm:flex sm:gap-10'>
            <div className='w-full'>
              <Label
                label='Kategori Pengajuan'
                children={
                  <select
                    name={"kategori_cost"}
                    className='select w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                    onChange={(e) => handleChangeCost(e)}
                    value={dataCost?.kategori_cost}
                  // disabled={dataDetail?.status?.canDelete}
                  >
                    <option key={0} value=""></option>
                    {optCategoryPengajuan?.map((data, i) => {
                      return (
                        <option key={i} value={data?.value}>{data?.label}</option>
                      )
                    })}
                  </select>
                }
              />
            </div>
            <div className='w-full'>
              <Label
                label='Jenis Pengajuan'
                children={
                  <select
                    name={"jenis_cost"}
                    className='select w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                    onChange={(e) => handleChangeCost(e)}
                    value={dataCost?.jenis_cost}
                    disabled={((dataCost?.kategori_cost && dataCost?.kategori_cost !== '') ? false : true)}
                  >
                    <option key={0} value=""></option>
                    {optJenisPengajuan?.map((data, i) => {
                      return (
                        <option key={i} value={data?.value}>{data?.label}</option>
                      )
                    })}
                  </select>
                }
              />
            </div>
          </div>
          <div className='sm:flex sm:gap-10'>
            <div className='w-full'>
              <Label
                label='Nominal Pengajuan'
                children={
                  <CurrencyInput
                    name='nilai_cost'
                    size=''
                    onChange={(value, name) => {
                      handleChangeCurrencyCost(value, name)
                    }}
                    value={dataCost?.nilai_cost}
                  // disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
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
                    className="input input-bordered rounded-[25px] bg-white w-full"
                    name='keterangan'
                    value={dataCost?.keterangan}
                    onChange={(e) => handleChangeCost(e)}
                  // disabled={true}
                  />
                }
              />
            </div>
          </div>
        </div>
        <div className="card border-2 p-5">
          <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-bold'>Dokumen Pengajuan</div>
          <div className='overflow-x-auto'></div>
          <table className='table table-sm table-pin-rows'>
            <thead>
              <tr className='bg-white'>
                {headerDokumen?.map((title, i) => {
                  return (
                    <th key={i}>{title}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {dataFields?.map((item, index) => (
                <tr key={index}>
                  <td className='w-1/5'>
                    <select
                      name={"jns_dokumen"}
                      className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                      onChange={(e) => handleChange(e, index)}
                      value={item?.jns_dokumen}
                      disabled={item?.status?.canDelete}
                    >
                      <option key={0} value=""></option>
                      {optJenisDok?.map((data, i) => {
                        return (
                          <option key={i} value={data?.value}>{data?.label}</option>
                        )
                      })}
                    </select>
                  </td>
                  <td className='w-1/3'>
                    <input
                      type="text"
                      name={"no_dokumen"}
                      className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                      value={item?.no_dokumen}
                      onChange={(e) => {
                        if (item?.status?.canDelete) {
                          return
                        };
                        handleChange(e, index)
                      }}
                      disabled={item?.status?.canDelete}
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
                        handleChange(e, index)
                      }}
                      disabled={item?.status?.canDelete}
                    />
                  </td>
                  <td className='flex gap-3'>
                    {item?.status?.canDelete ? (
                      <input
                        type="text"
                        name={"upload_dokumen"}
                        className='input input-sm input-bordered text-center rounded-[25px] w-full bg-primary text-white cursor-pointer'
                        value={"Open Dokumen Pendukung"}
                        onClick={() => window.open(item?.url_dokumen, "_blank")}
                      />
                    ) : (
                      <input
                        type="file"
                        name={"upload_dokumen"}
                        className='flex-1 file-input file-input-sm file-input-bordered file-input-primary rounded-[25px] bg-white'
                        onChange={(e) => {
                          if (item?.status?.canDelete) {
                            return
                          };
                          setFile(e.target.files[0])
                        }}
                        disabled={item?.status?.canDelete}
                      />
                    )}
                    <div className='flex items-center'>
                      {item?.status?.canUpload && (
                        <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUpload(e, index)}>
                          <AiOutlineSave />
                        </div>
                      )}
                      <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveField(e, index)}>
                        <IoMdTrash />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div type="button" disabled={(dataFields.filter(a => a.status.canUpload === true).length) === 1 ? true : false} className='btn btn-sm rounded-[25px] border-none bg-blue-50 text-primary my-3 w-60 ' onClick={handleAddField}>
            <RxPlusCircled size='20px' /> Add Document
          </div>
        </div>
      </Modal>
      <div className='flex flex-col gap-2'>
        <div className='sm:flex sm:gap-10'>
          <div className='w-1/2'>
            <Label
              label='No Project'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white w-full"
                  name='PROJECT_NO'
                  value={dataDetail?.PROJECT_NO}
                  disabled
                />
              }
            />
          </div>
          <div className='w-1/2'>
            <Label
              label='Nama Project'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white w-full"
                  name='PROJECT_NAME'
                  value={dataDetail?.PROJECT_NAME}
                  disabled
                />
              }
            />
          </div>
          <div className='w-1/2'>
            <Label
              label='Nilai Kontrak'
              children={
                <CurrencyInput
                  name='NILAI_KONTRAK'
                  value={dataDetail?.NILAI_KONTRAK}
                  disabled
                />
              }
            />
          </div>
        </div>
        <div className="card border-2 p-5 my-10">
          <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-bold'>Detail Pengajuan</div>
          <div className='overflow-x-auto'>
            <table className='table table-sm'>
              <thead>
                <tr className='bg-white'>
                  {headerTable?.map((title, i) => {
                    return (
                      <th key={i} className={headerTable.length === (i + 1) ? 'bg-white sticky right-0' : ''}>{title}</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {dataDetail?.DETAIL_COST?.map((item, index) => (
                  <>
                    <tr key={index}>
                      <td className='min-w-60'>
                        <select
                          name={"kategori_cost"}
                          className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                          onChange={(e) => handleChange(e, index)}
                          disabled={true}
                        >
                          <option value=""></option>
                          {optCategoryPengajuan?.map(data => {
                            return (
                              <option value={data?.value} selected={data?.value === item?.KATEGORI_COST}>{data?.label}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td className='min-w-36'>
                        <select
                          name={"mata_anggaran"}
                          className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                          onChange={(e) => handleChange(e, index)}
                          disabled={true}
                        >
                          <option value=""></option>
                          {optMataAnggaran?.map(data => {
                            return (
                              <option value={data?.value} selected={data?.value === item?.MATA_ANGGARAN}>{data?.label}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td className='min-w-80'>
                        <select
                          name={"divisi_id"}
                          className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                          onChange={(e) => handleChange(e, index)}
                          disabled={true}
                        >
                          <option value=""></option>
                          {optDivisi?.map(data => {
                            return (
                              <option value={data?.value} selected={data?.value === item?.DIVISI_ID}>{data?.label}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td className='min-w-60'>
                        <select
                          name={"jenis_cost"}
                          className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                          onChange={(e) => handleChange(e, index)}
                          disabled={true}
                        >
                          <option value=""></option>
                          {optJenisPengajuan?.map(data => {
                            return (
                              <option value={data?.value} selected={data?.value === item?.JENIS_COST}>{data?.label}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td className='min-w-48'>
                        <CurrencyInput
                          name={"nilai_cost"}
                          size='-sm'
                          onChange={(value, name) => {
                            if (item?.status?.canDelete) {
                              return
                            };
                            handleChangeCurrency(value, name, index)
                          }}
                          value={item?.NILAI_COST}
                          disabled={true}
                        />
                      </td>
                      <td className='min-w-48'>
                        <input
                          name={"keterangan"}
                          className='input input-sm input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                          onChange={(e) =>
                            handleChange(e, index)
                          }
                          value={item?.KETERANGAN}
                          disabled={true}
                        />
                      </td>
                      <td className='bg-white sticky right-0'>
                        {/* {item?.status && ( */}
                        <div className='flex items-center'>
                          {/* {item?.status?.canUpload && ( */}
                          <div className='btn btn-sm bg-white' onClick={(e) => handleEditDetail(e, item?.COST_ID, index)}>
                            <HiOutlinePencilAlt />
                          </div>
                          {/* )} */}
                          <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveDetail(e, item?.COST_ID)}>
                            <IoMdTrash />
                          </div>
                        </div>
                        {/* )} */}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          {/* {data?.FLAG_EDIT && ( */}
          <div type="button" className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-40' onClick={handleAddPengajuan}>
            <RxPlusCircled size='20px' /> Add Pengajuan
          </div>
          {/* )} */}
          <hr className='my-3' />
          <div className='flex flex-row bg-yellow-200 font-bold w-full rounded-full py-2 px-6'>
            <TotalCost />
            <p className='text-sm px-2 self-center'>Total Pengajuan</p>
            <p className='text-sm px-2 self-center ml-auto'>{formatCurrency(totalCost) || '-'}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CostOperationPlanning