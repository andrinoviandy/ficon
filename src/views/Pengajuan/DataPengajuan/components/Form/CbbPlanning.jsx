import React, { useEffect, useState, useRef } from 'react'
import { AiOutlineSave } from "react-icons/ai";
import { IoMdTrash } from 'react-icons/io';
import { RxPlusCircled } from "react-icons/rx";
import { Label, Select } from 'components/atoms';
import CurrencyInput from 'components/atoms/CurrencyInput';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
import { formatCurrency } from 'global/helper/formatCurrency';
import { optionRefByJenis } from 'global/helper/functionOption';
import { dummyFieldCbbPlanning } from '../DataDummy';
import { ReactComponent as TotalCost } from 'assets/icons/rdTotalCost.svg';
import { getCookies } from 'global/helper/cookie';

const CbbPlanning = ({ data, dataCBB, options, getDetailProject, getCBBPlanning, view }) => {
  const accountAccess = getCookies("accountAccess");
  const headerTable = ['Divisi', 'Direct Cost', 'Indirect Cost'];
  const [dataFields, setDataFields] = useState([dummyFieldCbbPlanning]);
  const [file, setFile] = useState(null);
  const [totalCost, setTotalCost] = useState({
    total_direct_cost: formatCurrency(0),
    total_indirect_cost: formatCurrency(0),
    total_cost: formatCurrency(0)
  });
  const fileInputRef = useRef(null);

  // referensi
  const [optDivisi, setOptDivisi] = useState();

  useEffect(() => {
    const fetchOption = async () => {
      setOptDivisi(await optionRefByJenis('product_owner'));
    };
    fetchOption();
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
    const arrCBB = dataCBB?.cbb_data;
    if (arrCBB?.length > 0) {
      const newData = arrCBB?.map((value) => {
        return {
          cbb_id: value?.CBB_ID,
          coa_id: value?.COA_ID,
          divisi_id: value?.DIVISI_ID,
          direct_cost: value?.DIRECT_COST,
          indirect_cost: value?.INDIRECT_COST,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDataFields(newData);
    } else {
      setDataFields([dummyFieldCbbPlanning]);
    };
    setTotalCost({
      total_direct_cost: formatCurrency(dataCBB?.total_direct_cost),
      total_indirect_cost: formatCurrency(dataCBB?.total_indirect_cost),
      total_cost: formatCurrency(dataCBB?.total_indirect_cost + dataCBB?.total_direct_cost),
    });
    // eslint-disable-next-line
  }, [dataCBB]);

  const handleAddField = () => {
    setDataFields([
      ...dataFields,
      dummyFieldCbbPlanning,
    ])
  };

  const handleRemoveField = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFields];
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        const res = await storeSchema.actions.deleteCBBPlanning(targetValue?.cbb_id);
        if (res?.status === true) {
          await swal.success(res?.data);
        } else {
          await swal.error(res?.message);
        };
        getDetailProject();
        getCBBPlanning();
      } else {
        values.splice(i, 1);
        setDataFields(values);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const handleSubmitCbb = async (e, i) => {
    e.preventDefault();
    try {
      const totalDirectCost = dataFields?.reduce((sum, value) => {
        const directCost = typeof value.direct_cost === 'string' ? parseInt(value.direct_cost) : value.direct_cost;
        return sum + (directCost || 0);
      }, 0);

      const totalIndirectCost = dataFields?.reduce((sum, value) => {
        const indirectCost = typeof value.indirect_cost === 'string' ? parseInt(value.indirect_cost) : value.indirect_cost;
        return sum + (indirectCost || 0);
      }, 0);

      const value = dataFields[i];
      const payload = {
        project_id: data?.PROJECT_ID,
        divisi_id: value?.divisi_id,
        coa_id: "",
        direct_cost: value?.direct_cost?.replace(",", ".") || '0',
        indirect_cost: value?.indirect_cost?.replace(",", ".") || '0',
      };

      if ((totalDirectCost + totalIndirectCost) > data.COGS) {
        await swal.error("Nilai Cost Melebihi Nilai COGS");
      } else {
        const res = await storeSchema.actions.CBBPlanning(payload);
        if (res?.status === true) {
          await swal.success(res?.message);
        } else {
          await swal.error(res?.message);
        };
        getDetailProject();
        getCBBPlanning();
      }
    } catch (error) {
      console.error(error);
    };
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        tipe_dokumen: "04", // Dokumen CBB
        jns_dokumen: "04001", // CBB
        project_id: data?.PROJECT_ID,
      };

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("lampiran", file);

      const res = await storeSchema.actions.uploadDokumen(formData);
      if (res?.status === true) {
        await swal.success(res?.data?.keterangan);
      } else {
        await swal.error(res?.message);
      };
      getDetailProject();
      getCBBPlanning();
    } catch (error) {
      console.error(error);
    };
  };

  const handleDeleteDokumenCBB = async (e) => {
    e.preventDefault();
    try {
      const res = await storeSchema.actions.deleteDokumen(dataCBB?.lampiran?.DOKUMEN_ID);
      if (res?.status === true) {
        await swal.success(res?.data);
      } else {
        await swal.error(res?.message);
      };
      getDetailProject();
      getCBBPlanning();
    } catch (error) {
      console.error(error);
    };
  };

  const handleChangeDoc = (e) => {
    const maxFileSize = 25 * 1024 * 1024; // 25MB dalam byte

    if (e.target.files) {
      const file = e.target.files[0];
      if (file.size > maxFileSize) {
        swal.custom("File Terlalu Besar", "Ukuran file tidak boleh lebih dari 25 MB", "warning");
        setFile(null);
        fileInputRef.current.value = null;
      } else {
        setFile(file);
      }
    } else {
      setFile(null);
    }

  };

  return (
    <>
      <div className='flex flex-col gap-2'>
        <div className='sm:flex sm:gap-10'>
          <div className='w-[20%]'>
            <Label
              label='No Project'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white w-full"
                  name='PROJECT_NO'
                  value={data?.PROJECT_NO}
                  disabled
                />
              }
            />
          </div>
          <div className='w-[80%]'>
            <Label
              label='Nama Project'
              data={data?.PROJECT_NAME ?? false}
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white w-full"
                  name='PROJECT_NAME'
                  value={data?.PROJECT_NAME}
                  disabled
                />
              }
            />
          </div>
        </div>
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Tipe Project'
              data={(data?.PROJECT_TYPE_UR || data?.PROJECT_TYPE_ID) ?? false}
              children={
                <Select
                  name='PROJECT_TYPE'
                  className='pl-0'
                  options={options?.tipeProject}
                  value={{ label: data?.PROJECT_TYPE_UR, value: data?.PROJECT_TYPE_ID }}
                  isDisabled
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Portofolio'
              data={(data?.PORTOFOLIO_UR || data?.PORTOFOLIO_ID) ?? false}
              children={
                <Select
                  name='PORTOFOLIO'
                  className='pl-0'
                  options={options?.portofolio}
                  value={{ label: data?.PORTOFOLIO_UR, value: data?.PORTOFOLIO_ID }}
                  isDisabled
                />
              }
            />
          </div>
        </div>
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Kategori'
              data={(data?.CATEGORY_UR || data?.CATEGORY_ID) ?? false}
              children={
                <Select
                  name='CATEGORY'
                  className='pl-0'
                  options={options?.kategori}
                  value={{ label: data?.CATEGORY_UR, value: data?.CATEGORY_ID }}
                  isDisabled
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Nilai Kontrak'
              data={data?.NILAI_KONTRAK ?? false}
              children={
                // <input
                //   type="number"
                //   className="input input-bordered rounded-[25px] bg-white w-full"
                //   name='NILAI_KONTRAK'
                //   value={data?.NILAI_KONTRAK}
                //   disabled
                // />
                <CurrencyInput
                  name='NILAI_KONTRAK'
                  value={data?.NILAI_KONTRAK}
                  disabled={true}
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
                  name='COGS'
                  value={data?.COGS}
                  disabled={true}
                />
              }
            />
          </div>
          <div className='w-full'>
            <Label
              label='Attachment CBB'
              children={
                (dataCBB?.lampiran?.URL_DOKUMEN) ? (
                  <div className='flex items-center'>
                    <input
                      type="text"
                      name={"upload_dokumen"}
                      className='input input-bordered text-center rounded-[25px] w-full bg-primary text-white cursor-pointer'
                      value={"Open Dokumen Pendukung"}
                      onClick={() => window.open(dataCBB?.lampiran?.URL_DOKUMEN, "_blank")}
                    />
                    {
                      view === true && (
                        <div className='btn bg-red-500 ml-3 text-white' onClick={handleDeleteDokumenCBB}>
                          <IoMdTrash />
                        </div>
                      )
                    }
                  </div>
                ) : (
                  <input
                    type="file"
                    className='file file-input file-input-bordered file-input-primary rounded-[25px] bg-white'
                    name={"upload_dokumen"}
                    accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                    onChange={(e) => handleChangeDoc(e)}
                    ref={fileInputRef}
                    disabled={(data?.FLAG_EDIT === false)}
                  />
                )
              }
            />
          </div>
        </div>
        {(data?.FLAG_EDIT && view === true) && accountAccess?.kode !== '8002' && (
          <div className='flex justify-end mt-5'>
            <button className='btn btn-primary text-white rounded-[25px]' onClick={handleUpload}>
              Save
            </button>
          </div>
        )}
        <hr className='mt-5' />
        <div className="card border-2 my-8">
          <div className="card-body">
            <div className="max-h-64 overflow-auto">
              <table className='table table-md'>
                <thead>
                  <tr className='bg-white'>
                    {headerTable?.map((title, i) => {
                      return (
                        <th key={i} className='w-1/3'>{title}</th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {dataFields?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <select
                          name={"divisi_id"}
                          className='select select-md w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                          onChange={(e) => handleChange(e, index)}
                          disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                        >
                          <option value=""></option>
                          {optDivisi?.map(data => {
                            return (
                              <option value={data?.value} selected={data?.value === item?.divisi_id}>{data?.label}</option>
                            )
                          })}
                        </select>
                      </td>
                      <td >
                        <CurrencyInput
                          name='direct_cost'
                          onChange={(value, name) => {
                            if (item?.status?.canDelete) {
                              return
                            };
                            handleChangeCurrency(value, name, index)
                          }}
                          value={item?.direct_cost}
                          // disabled={
                          //   item?.status?.canDelete || 
                          //   (data?.FLAG_EDIT === false || 
                          //   dataFields[index].divisi_id === 'SSA'
                          // )}
                        />
                      </td>
                      <td >
                        <div className='flex gap-3'>
                          <CurrencyInput
                            name='indirect_cost'
                            onChange={(value, name) => {
                              if (item?.status?.canDelete) {
                                return
                              };
                              handleChangeCurrency(value, name, index)
                            }}
                            value={item?.indirect_cost}
                            // disabled={
                            //   item?.status?.canDelete || 
                            //   (data?.FLAG_EDIT === false) ||
                            //   (dataFields[index].divisi_id === 'HKP') ||
                            //   (dataFields[index].divisi_id === 'PIP') ||
                            //   (dataFields[index].divisi_id === 'PPR') ||
                            //   (dataFields[index].divisi_id === 'PLY')
                            // }
                          />
                          {data?.FLAG_EDIT && accountAccess?.kode !== '8002' && (
                            <div className='flex items-center'>
                              {item?.status?.canUpload && (
                                <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleSubmitCbb(e, index)}>
                                  <AiOutlineSave />
                                </div>
                              )}
                              {
                                view === true && (
                                  <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveField(e, index)}>
                                    <IoMdTrash />
                                  </div>
                                )
                              }
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='flex rounded-[25px] p-2 mx-4 bg-yellow-200 font-bold'>
              <TotalCost />
              {/* <p className='text-sm px-2 self-center'>Total Cost</p>
              <p className='text-sm px-2 self-center ml-auto'>{formatCurrency(totalCost) || '-'}</p> */}
              <div className='w-1/3 pl-1'>
                Sub Total Cost
              </div>
              <div className='w-1/3'>{totalCost?.total_direct_cost}</div>
              <div className='w-1/3'>{totalCost?.total_indirect_cost}</div>
            </div>
            <div className='flex rounded-[25px] p-3 mx-4 bg-yellow-200 font-bold'>
              <TotalCost />
              {/* <p className='text-sm px-2 self-center'>Total Cost</p>
              <p className='text-sm px-2 self-center ml-auto'>{formatCurrency(totalCost) || '-'}</p> */}
              <div className='flex flex-row w-full justify-between'>
                <div className='w-1/3 pl-1'>
                  Total Cost
                </div>
                <div>{totalCost?.total_cost}</div>
              </div>

            </div>
            <div className=''>
            </div>
            {(data?.FLAG_EDIT && view === true) && (
              <div type="button" disabled={(dataFields.filter(a => a.status.canUpload === true).length) === 1 ? true : false} className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-60 ' onClick={handleAddField}>
                <RxPlusCircled size='20px' /> Add CBB Planning
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CbbPlanning