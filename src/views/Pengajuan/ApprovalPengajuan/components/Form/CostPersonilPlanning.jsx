import React, { useEffect, useState, useRef } from 'react'
import { AiOutlineSave, AiOutlineCloudDownload } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { RxPlusCircled } from 'react-icons/rx';
import { Label } from 'components/atoms';
import CurrencyInput from 'components/atoms/CurrencyInput';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
import { formatCurrency } from 'global/helper/formatCurrency';
import { dummyFieldCostPersonilPlanning } from '../DataDummy';
import { optionRefByJenis } from 'global/helper/functionOption';
import { ReactComponent as TotalCost } from 'assets/icons/rdTotalCost.svg';
import * as XLSX from 'xlsx-js-style';
import { getCookies } from 'global/helper/cookie';

const CostPersonilPlanning = ({ data, dataCostPersonilPlanning, getDetailProject, getCostPersonilPlanning, dataCBB, view }) => {
  const headerTable = ['Role', 'Kualifikasi', 'Qty', 'UoM', 'Qty', 'UoM', 'Unit Cost', 'Cost', ''];
  const [dataFields, setDataFields] = useState([dummyFieldCostPersonilPlanning]);
  const [totalCost, setTotalCost] = useState(0);
  const accountAccess = getCookies("accountAccess");
  // referensi
  const [optPosition, setOptPosition] = useState();
  const [optKualifikasi, setOptKualifikasi] = useState();
  const [optSatuanPerson, setOptSatuanPerson] = useState();
  const [optSatuanDate, setOptSatuanDate] = useState();
  const [cbb, setCBB] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);

  const dataFieldsPerDivisi = (divisi_id) => {
    const dummyFieldCostPersonilPlanning = {
      position_id: "",
      kualifikasi_id: "",
      divisi_id: divisi_id,
      qty_person: 0,
      satuan_person: "",
      ur_satuan_person: "",
      qty_date: 0,
      satuan_date: "",
      ur_satuan_date: "",
      cost_unit: "",
      cost_total: "",
      status: {
        canUpload: true,
        canDelete: false,
      },
    };

    return dummyFieldCostPersonilPlanning
  }

  useEffect(() => {
    const fetchOption = async () => {
      const position = await optionRefByJenis('position_id');

      const sort = position.sort((a, b) => 
      (a.label || '').toString().localeCompare((b.label || '').toString())
    );

      setOptPosition(sort);
      setOptKualifikasi(await optionRefByJenis('kualifikasi_id'));
      setOptSatuanPerson(await optionRefByJenis('satuan_person'));
      setOptSatuanDate(await optionRefByJenis('satuan_date'));
    };
    fetchOption();
  }, []);

  useEffect(() => {
    const groupedData = dataCBB?.cbb_data?.reduce((accumulator, current) => {
      const existingGroup = accumulator.find(item => item.DIVISI_ID === current.DIVISI_ID);

      if (existingGroup) {
        // Jika sudah ada group untuk DIVISI_ID, tambahkan biaya
        existingGroup.TOTAL_DIRECT += current.DIRECT_COST || 0;
        existingGroup.TOTAL_INDIRECT += current.INDIRECT_COST || 0;
      } else {
        // Jika belum ada, buat group baru
        accumulator.push({
          DIVISI_ID: current.DIVISI_ID,
          TOTAL_DIRECT: current.DIRECT_COST || 0,
          TOTAL_INDIRECT: current.INDIRECT_COST || 0
        });
      }

      return accumulator;
    }, []);

    setCBB(groupedData)

  }, [dataCBB])

  const handleChange = (e, i) => {
    const values = [...dataFields];
    values[i][e.target.name] = e.target.value;
    setDataFields(values);
  };

  const handleChangeQty = (e, i) => {
    const values = [...dataFields];
    const { name, value } = e.target;
    values[i][name] = value;
    if (dataFields?.cost_unit !== '' && values[i]['qty_date'] > 0 && name === 'qty_person') {
      values[i]['cost_total'] =  values[i]['cost_unit'] * value * values[i]['qty_date']
    }

    if (dataFields?.cost_unit !== '' && values[i]['qty_person'] > 0 && name === 'qty_date') {
      values[i]['cost_total'] =  values[i]['cost_unit'] * value * values[i]['qty_person']
    }
    
    setDataFields(values);
  };

  const handleChangeCurrency = (value, name, index) => {
    const values = [...dataFields];
    values[index][name] = value;
    if (name === 'cost_unit' && values[index]['qty_person'] > 0 && values[index]['qty_date'] > 0) {
      values[index]['cost_total'] = value * values[index]['qty_person'] * values[index]['qty_date']
    }
    setDataFields(values);
  };

  const handleCounter = (name, i, action) => {
    const values = [...dataFields];
    if (action === 'plus') {
      values[i][name] = ++values[i][name];
    } else if (action === 'minus' && values[i][name] > 0) {
      values[i][name] = --values[i][name];
    };
    if (name === 'qty_person' && values[i]['cost_unit'] > 0 && values[i]['qty_date'] > 0) {
      values[i]['cost_total'] = values[i][name] * values[i]['cost_unit'] * values[i]['qty_date']
    }
    if (name === 'qty_date' && values[i]['cost_unit'] > 0 && values[i]['qty_person'] > 0) {
      values[i]['cost_total'] = values[i][name] * values[i]['cost_unit'] * values[i]['qty_person']
    }
    setDataFields(values);
  };

  useEffect(() => {
    setTotalCost(0);
    const valueCostPersonilPlanning = dataCostPersonilPlanning?.PERSONEL;
    if (valueCostPersonilPlanning?.length > 0) {
      const newData = valueCostPersonilPlanning?.map((value) => {
        setTotalCost((prev) => (prev + value?.COST_TOTAL));
        return {
          personel_id: value?.PERSONEL_ID,
          ur_position: value?.UR_POSITION,
          position_id: value?.POSITION_ID,
          ur_kualifikasi: value?.UR_KUALIFIKASI,
          kualifikasi_id: value?.KUALIFIKASI_ID,
          divisi_id: value?.DIVISI_ID,
          qty_person: value?.QTY_PERSON,
          ur_satuan_person: value?.UR_SATUAN_PERSON,
          satuan_person: value?.SATUAN_PERSON,
          qty_date: value?.QTY_DATE,
          ur_satuan_date: value?.UR_SATUAN_DATE,
          satuan_date: value?.SATUAN_DATE,
          cost_unit: value?.COST_UNIT,
          cost_total: value?.COST_TOTAL,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDataFields(newData);
    } else {
      setDataFields([dummyFieldCostPersonilPlanning]);
    };
    // eslint-disable-next-line
  }, [dataCostPersonilPlanning]);

  const handleAddField = (divisi_id) => {
    const dataDummy = dataFieldsPerDivisi(divisi_id)
    setDataFields([
      ...dataFields,
      dataDummy,
    ])
  };

  const handleRemoveField = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFields];
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        const res = await storeSchema.actions.deleteCostPersonilPlanning(targetValue?.personel_id);
        if (res?.status === true) {
          await swal.success(res?.data);
        } else {
          await swal.error(res?.message);
        };
        getDetailProject();
        getCostPersonilPlanning();
      } else {
        values.splice(i, 1);
        setDataFields(values);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const uploadCostPersonilPlanning = async (e, i, divisi_id) => {
    e.preventDefault();
    try {
      const value = dataFields[i];
      const payload = {
        project_id: data?.PROJECT_ID,
        position_id: value?.position_id,
        kualifikasi_id: value?.kualifikasi_id,
        divisi_id: divisi_id,
        qty_person: value?.qty_person,
        satuan_person: value?.satuan_person,
        qty_date: value?.qty_date,
        satuan_date: value?.satuan_date,
        cost_unit: value?.cost_unit,
        cost_total: value?.cost_total,
      };

      const totalCostDivisi = calculateTotalCostByDivisi(dataFields, divisi_id);
      const cbbData = cbb.filter(a => a.DIVISI_ID === divisi_id)

      if (divisi_id === 'SSA') {
        if (totalCostDivisi > cbbData[0]?.TOTAL_INDIRECT) {
          swal.custom('Tidak Dapat Disimpan', `Jumlah Cost (${divisi_id}) Melebihi Total Cost Di CBB Planning (${divisi_id})`, 'error')
        } else if (totalCostDivisi === 0) {
          swal.custom('Tidak Dapat Disimpan', `Jumlah Cost (${divisi_id}) Tidak Boleh Kosong,`, 'error')
        } else {
          const res = await storeSchema.actions.costPersonilPlanning(payload);
          if (res?.status === true) {
            await swal.success(res?.message);
          } else {
            await swal.error(res?.message);
          };
          getDetailProject();
          getCostPersonilPlanning();
        }
      } else {
        if (totalCostDivisi > cbbData[0]?.TOTAL_DIRECT || totalCostDivisi === 0) {
          swal.custom('Tidak Dapat Disimpan', `Jumlah Cost (${divisi_id}) Melebihi Total Cost Di CBB Planning (${divisi_id}),`, 'error')
        } else if (totalCostDivisi === 0) {
          swal.custom('Tidak Dapat Disimpan', `Jumlah Cost (${divisi_id}) Tidak Boleh Kosong,`, 'error')
        } else {
          const res = await storeSchema.actions.costPersonilPlanning(payload);
          if (res?.status === true) {
            await swal.success(res?.message);
          } else {
            await swal.error(res?.message);
          };
          getDetailProject();
          getCostPersonilPlanning();
        }
      }
    } catch (error) {
      console.error(error);
    };
  };

  const calculateTotalCostByDivisi = (data, divisiId) => {
    return data.reduce((total, item) => {
      if (item.divisi_id === divisiId) {
        total += item.cost_total || 0;
      }
      return total;
    }, 0);
  };

  // const fileInputRef = useRef(null);

  // Fungsi untuk clear file input
  // const handleClearFile = () => {
  //   setDataExcel(null); // Mengosongkan state dataExcel
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = ""; // Mengosongkan input file
  //   }
  // };

  // Fungsi untuk membaca file Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    // Cek apakah file ada
    if (!file) {
      console.log("No file selected or file upload was canceled");
      return; // Hentikan eksekusi jika tidak ada file
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      // Ambil sheet pertama
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert sheet ke JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setDataExcel(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const uploadDataExcel = async (dataExcel) => {
    if (dataExcel.length !== 0) {

      // Lakukan validasi terlebih dahulu sebelum melanjutkan proses
      for (let item of dataExcel) {

        // Cek apakah data divisi ada di cbb
        const cbbData = cbb.filter(a => a.DIVISI_ID === item.Divisi);

        // Jika data divisi tidak ditemukan, tampilkan swal.error dan hentikan proses
        if (cbbData.length === 0) {
          swal.error(`Mohon Periksa Data di dalam Excel, Data tidak ditemukan untuk divisi: ${item.Divisi}`);
          return;  // Hentikan fungsi jika ada data yang tidak ditemukan
        }

        // Cek apakah total cost divisi melebihi total di CBB planning
        const totalCostDivisi = calculateTotalCostByDivisi(dataFields, item?.Divisi);

        if (item.Divisi === 'SSA') {
          if (item.Total_Cost > cbbData[0].TOTAL_INDIRECT) {
            swal.custom('Tidak Dapat Disimpan', `Jumlah Cost (${item.Divisi}) Melebihi Total Cost Di CBB Planning (${item.Divisi})`, 'error');
            return;  // Hentikan jika melebihi total cost
          } else if (totalCostDivisi >= item.Total_Cost) {
            swal.error(`Mohon Periksa Data di dalam Excel, Melebihi Total Cost Di CBB Planning (${item.Divisi})`);
            return;  // Hentikan jika total cost divisi melebihi
          }
        } else {
          if (item.Total_Cost > cbbData[0].TOTAL_DIRECT) {
            swal.custom('Tidak Dapat Disimpan', `Jumlah Cost (${item.Divisi}) Melebihi Total Cost Di CBB Planning (${item.Divisi})`, 'error');
            return;  // Hentikan jika melebihi total cost
          } else if (totalCostDivisi >= item.Total_Cost) {
            swal.error(`Mohon Periksa Data di dalam Excel, Melebihi Total Cost Di CBB Planning (${item.Divisi})`);
            return;  // Hentikan jika total cost divisi melebihi
          }
        }
      }

      // Jika semua validasi lulus, lanjutkan proses penyimpanan
      for (let item of dataExcel) {
        const res = await storeSchema.actions.costPersonilPlanning({
          project_id: data?.PROJECT_ID,
          position_id: item?.Role.split("_")[0],
          kualifikasi_id: item?.Kualifikasi[0],
          divisi_id: item?.Divisi,
          qty_person: parseInt(item?.QTY_Employe[0]),
          satuan_person: "1",
          qty_date: parseInt(item?.QTY_Time),
          satuan_date: item?.Type_Time === "Days" ? "1" : "2",
          cost_unit: parseInt(item?.Unit_Cost),
          cost_total: item?.Total_Cost,
        });

        if (res?.status === true) {
          await swal.success(res?.message);
        } else {
          await swal.error(res?.message);
          return;  // Hentikan proses jika ada error dari API
        }

        // Refresh data jika berhasil
        getDetailProject();
        getCostPersonilPlanning();
      }

    } else {
      swal.warning("Mohon Upload Data Excel Terlebih Dahulu ...");
    }
  };

  const downloadTemplate = async () => {
    const url = 'https://api-hub.ilcs.co.id/api/v1/n2n/files/template.xlsx';
    const link = document.createElement('a');
    link.href = url;
    link.download = 'template.xlsx';
    link.target = '_blank';
    link.click();
  };


  return (
    <div className='flex flex-col gap-2'>
      <div className='sm:flex sm:gap-10 mb-5'>
        <div className='w-full'>
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
        <div className='w-full'>
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
      {
        view === true && (
          <div className="flex justify-between items-center space-x-4">
            <div className="btn btn-sm bg-primary text-white flex items-center gap-2" onClick={() => downloadTemplate()}>
              Download Template <AiOutlineCloudDownload />
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="file-input file-input-sm file-input-bordered file-input-primary rounded-[25px] bg-white"
              />
              <div className="btn btn-sm bg-primary text-white flex items-center gap-2" onClick={() => uploadDataExcel(dataExcel)}>
                Upload Data Excel <AiOutlineSave />
              </div>
            </div>
          </div>
        )
      }
      {cbb && cbb.length > 0 && cbb?.map((v, ii) => {
        return (
          <>
            <div className="card border-2 p-5 my-3">
              <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-bold'>ROLE {v?.DIVISI_ID}</div>
              <div className='overflow-x-auto'>
                <table className='table table-sm'>
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
                    {dataFields?.map((item, index) =>
                    (item?.divisi_id === v?.DIVISI_ID && (
                      <tr key={index}>
                        <td className='min-w-48'>
                          <select
                            name={"position_id"}
                            className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                            onChange={(e) => handleChange(e, index)}
                            disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                          >
                            <option value=""></option>
                            {optPosition?.map(data => {
                              return (
                                <option value={data?.value} selected={data?.value === item?.position_id}>{data?.label}</option>
                              )
                            })}
                          </select>
                        </td>
                        <td className='min-w-40'>
                          <select
                            name={"kualifikasi_id"}
                            className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                            onChange={(e) => handleChange(e, index)}
                            disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                          >
                            <option value=""></option>
                            {optKualifikasi?.map(data => {
                              return (
                                <option value={data?.value} selected={data?.value === item?.kualifikasi_id}>{data?.label}</option>
                              )
                            })}
                          </select>
                        </td>
                        {/* <td className='min-w-36'>
                          <div className='relative'>
                            {item?.status?.canDelete ? (
                              null
                            ) : (
                              <>
                                <div
                                  className='absolute btn btn-xs top-1 left-3 size-6'
                                  onClick={() => handleCounter('qty_person', index, 'minus')}
                                  disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                                >
                                  -
                                </div>
                                <div
                                  className='absolute btn btn-xs top-1 right-3 size-6 btn-primary'
                                  onClick={() => handleCounter('qty_person', index, 'plus')}
                                  disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                                >
                                  +
                                </div>
                              </>
                            )}
                            <div className='input input-sm input-bordered rounded-[25px] bg-white text-center' disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}>
                              {item?.qty_person}
                            </div>
                          </div>
                        </td> */}
                        <td className='min-w-36'>
                          <div className='relative'>
                            {item?.status?.canDelete ? null : (
                              <>
                                <button
                                  type="button"
                                  className='absolute btn btn-xs top-1 left-3 size-6'
                                  onClick={() => handleCounter('qty_person', index, 'minus')}
                                  disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                                >
                                  -
                                </button>

                                <button
                                  type="button"
                                  className='absolute btn btn-xs top-1 right-3 size-6 btn-primary'
                                  onClick={() => handleCounter('qty_person', index, 'plus')}
                                  disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                                >
                                  +
                                </button>
                              </>
                            )}

                            {/* ==== INPUT QTY PERSON ==== */}
                            <input
                              type="number"
                              name="qty_person"
                              className='input input-sm input-bordered rounded-[25px] bg-white text-center w-full'
                              value={item?.qty_person}
                              onChange={(e) => handleChangeQty(e, index)}
                              min={0}
                              disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                            />
                          </div>
                        </td>
                        <td className='min-w-32'>
                          <select
                            name={"satuan_person"}
                            className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                            onChange={(e) => handleChange(e, index)}
                            disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                          >
                            <option value=""></option>
                            {optSatuanPerson?.map(data => {
                              return (
                                <option value={data?.value} selected={data?.value === item?.satuan_person}>{data?.label}</option>
                              )
                            })}
                          </select>
                        </td>
                        <td className='min-w-36'>
                          <div className='relative'>
                            {item?.status?.canDelete ? null : (
                              <>
                                <button
                                  type="button"
                                  className='absolute btn btn-xs top-1 left-3 size-6'
                                  onClick={() => handleCounter('qty_date', index, 'minus')}
                                  disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                                >
                                  -
                                </button>

                                <button
                                  type="button"
                                  className='absolute btn btn-xs top-1 right-3 size-6 btn-primary'
                                  onClick={() => handleCounter('qty_date', index, 'plus')}
                                  disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                                >
                                  +
                                </button>
                              </>
                            )}

                            {/* ==== INPUT QTY PERSON ==== */}
                            <input
                              type="number"
                              name="qty_date"
                              className='input input-sm input-bordered rounded-[25px] bg-white text-center w-full'
                              value={item?.qty_date}
                              onChange={(e) => handleChangeQty(e, index)}
                              min={0}
                              disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                            />
                          </div>
                        </td>
                        {/* <td className='min-w-36'>
                          <div className='relative'>
                            {item?.status?.canDelete ? (
                              null
                            ) : (
                              <>
                                <div
                                  className='absolute btn btn-xs top-1 left-3 size-6'
                                  onClick={() => handleCounter('qty_date', index, 'minus')}
                                  disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                                >
                                  -
                                </div>
                                <div
                                  className='absolute btn btn-xs top-1 right-3 size-6 btn-primary'
                                  onClick={() => handleCounter('qty_date', index, 'plus')}
                                  disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                                >
                                  +
                                </div>
                              </>
                            )}
                            <div className='input input-sm input-bordered rounded-[25px] bg-white text-center' disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}>
                              {item?.qty_date}
                            </div>
                          </div>
                        </td> */}
                        <td className='min-w-32'>
                          <select
                            name={"satuan_date"}
                            className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                            onChange={(e) => handleChange(e, index)}
                            disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                          >
                            <option value=""></option>
                            {optSatuanDate?.map(data => {
                              return (
                                <option value={data?.value} selected={data?.value === item?.satuan_date}>{data?.label}</option>
                              )
                            })}
                          </select>
                        </td>
                        <td className='min-w-48'>
                          <CurrencyInput
                            name={"cost_unit"}
                            size='-sm'
                            onChange={(value, name) => {
                              if (item?.status?.canDelete) {
                                return
                              };
                              handleChangeCurrency(value, name, index)
                            }}
                            value={item?.cost_unit}
                            disabled={item?.status?.canDelete || (data?.FLAG_EDIT === false)}
                          />
                        </td>
                        <td className='min-w-48'>
                          <CurrencyInput
                            name={"cost_total"}
                            size='-sm'
                            onChange={(value, name) => {
                              if (item?.status?.canDelete) {
                                return
                              };
                              handleChangeCurrency(value, name, index)
                            }}
                            value={item?.cost_total}
                            disabled={true}
                          />
                        </td>
                        <td>
                          {(data?.FLAG_EDIT && view === true) && accountAccess?.kode !== '8002' && (
                            <div className='flex items-center'>
                              {item?.status?.canUpload && (
                                <div className='btn btn-sm bg-primary text-white' onClick={(e) => uploadCostPersonilPlanning(e, index, v?.DIVISI_ID)}>
                                  <AiOutlineSave />
                                </div>
                              )}
                              <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveField(e, index)}>
                                <IoMdTrash />
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                    )}
                  </tbody>
                </table>
              </div>
              {(data?.FLAG_EDIT && view === true) && (
                <div type="button" disabled={(dataFields.filter(a => a.status.canUpload === true && a.divisi_id === v?.DIVISI_ID).length) === 1 ? true : false} className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-32' onClick={() => handleAddField(v?.DIVISI_ID)}>
                  <RxPlusCircled size='20px' /> Add Role
                </div>
              )}
              <hr className='my-3' />
              {/* <div className='flex justify-between w-full bg-yellow-500 rounded-[25px] px-5 py-1 mb-5'>
                    <p>Total Cost</p>
                    <p>{formatCurrency(totalCost)}</p>
                  </div> */}
              <div className='flex flex-row bg-blue-200 font-bold w-full rounded-full py-2 px-6'>
                <TotalCost />
                <p className='text-sm px-2 self-center'>Total Cost ({v?.DIVISI_ID})</p>
                <p className='text-sm px-2 self-center ml-auto'>{formatCurrency(calculateTotalCostByDivisi(dataFields, v?.DIVISI_ID)) || '-'}</p>
              </div>
            </div>
          </>
        )
      })}
      {cbb && cbb.length === 0 && (
        <div className='flex justify-center my-5'>
          <div className='text-gray-500'>
            Belum Memasukan Direct Cost And Indirect Cost Pada Tab CBB Planning
          </div>
        </div>
      )}
      <div className='flex flex-row bg-yellow-200 font-bold w-full rounded-full py-2 px-6'>
        <TotalCost />
        <p className='text-sm px-2 self-center'>Total Cost Keseluruhan</p>
        <p className='text-sm px-2 self-center ml-auto'>{formatCurrency(totalCost) || '-'}</p>
      </div>
    </div>
  )
}

export default CostPersonilPlanning