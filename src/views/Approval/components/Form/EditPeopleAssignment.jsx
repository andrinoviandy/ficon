import { Label } from 'components/atoms'
import CurrencyInput from 'components/atoms/CurrencyInput'
import React, { useEffect, useState, useCallback } from 'react'
import { AiOutlineSave } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { RxPlusCircled } from 'react-icons/rx';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
import { formatCurrency } from 'global/helper/formatCurrency';
import { optionRefByJenis } from 'global/helper/functionOption';
import { IoIosArrowDown } from 'react-icons/io';
import { ReactComponent as TotalCost } from 'assets/icons/rdTotalCost.svg';
import { RiDraftLine } from 'react-icons/ri';
import { decodeData } from "global/helper/jwt";
import { getCookies } from "global/helper/cookie";
import Select from "react-select";
import * as XLSX from 'xlsx-js-style';

const EditPeopleAssignment = ({ dataDetail, getDetailProject, getCBBPlanning, setListNotif, dataCBB }) => {
  const headerTable = ['Role', 'Kualifikasi', 'Qty', 'UoM', 'Qty', 'UoM', 'Unit Cost', 'Cost'];
  const headerExpandTable = ['Nama Employee', 'NIP', 'Divisi', 'Manday', ''];
  const dataDummy = {
    position_id: "",
    kualifikasi_id: "",
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
  }

//   const dataFieldsPerDivisi = (divisi_id) => {
//     const dummyFieldCostPersonilPlanning = {
//       position_id: "",
//       kualifikasi_id: "",
//       divisi_id: divisi_id,
//       qty_person: 0,
//       satuan_person: "",
//       ur_satuan_person: "",
//       qty_date: 0,
//       satuan_date: "",
//       ur_satuan_date: "",
//       cost_unit: "",
//       cost_total: "",
//       status: {
//         canUpload: true,
//         canDelete: false,
//       },
//     };

//     return dummyFieldCostPersonilPlanning
//   }

  const dataDummyExpand = {
    personel_id: "",
    user_id: "",
    nik: "",
    nama_personil: "",
    divisi_id: "",
    qty_date: "",
    satuan_date: "1",
    flag_personil: "",
    status: {
      canUpload: true,
      canDelete: false,
    },
  }

  const [dataFields, setDataFields] = useState([]);
  const [dataDivisi, setDataDivisi] = useState("");
  const [dataFieldsExpand, setDataFieldsExpand] = useState([dataDummyExpand]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalCostDivisi, setTotalCostDivisi] = useState({});
  const [personelId, setPersonelId] = useState();

  // referensi
  const [optPosition, setOptPosition] = useState();
  const [optDivisi, setOptDivisi] = useState();
  const [optKualifikasi, setOptKualifikasi] = useState();
  const [optSatuanPerson, setOptSatuanPerson] = useState();
  const [optSatuanDate, setOptSatuanDate] = useState();
  const [expandTable, setExpandTable] = useState({ project_id: null, isExpand: false });
  const [loginData, setLoginData] = useState({});
  const [listKaryawan, setListKaryawan] = useState([]);
  const [dataExcel, setDataExcel] = useState([]);
  const [cbb, setCBB] = useState([]);

  const handleChange = (e, i) => {
    const values = [...dataFields];
    values[i][e.target.name] = e.target.value;
    setDataFields(values);
  };

  const handleChangeAddDivisi =  (e, i) => {
    setDataDivisi(e.target.value);
  }

  const handleChangeExpand = (e, i) => {
    const values = [...dataFieldsExpand];
    values[i][e.target.name] = e.target.value;
    setDataFieldsExpand(values);
  };

  const handleChangeCurrency = (value, name, index) => {
    const values = [...dataFields];
    values[index][name] = value;
    if (name === 'cost_unit') {
      setDataFields((prev) => {
        const newValues = [...prev];
        newValues[index]['cost_total'] = value * newValues[index]['qty_date'] * newValues[index]['qty_person'];
        return newValues;
      })
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

    if (name === 'qty_date' || name === 'qty_person') {
      setDataFields((prev) => {
        const newValues = [...prev];
        newValues[i]['cost_total'] = values[i]['cost_unit'] * values[i]['qty_date'] * values[i]['qty_person'];
        return newValues;
      })
    }
    setDataFields(values);
  };

  const handleAddField = (divisiId) => {
    setDataFields((prev) => [
      ...prev,
      {
        ...dataDummy,
        divisi_id: divisiId
      }
    ]);
  };

  const handleAddDivisi = useCallback(() => {
    setCBB((prev)=>{
        if (["",null,undefined].includes(dataDivisi)) {
            swal.error("Divisi Sudah Tersedia");
            return prev;
        } else if (prev.find(e=>e.DIVISI_ID===dataDivisi)) {
            swal.error("Divisi Sudah Tersedia");
            return prev;
        } else {
            return [
                ...prev,
                {
                  DIVISI_ID: dataDivisi,
                  TOTAL_DIRECT: 0,
                  TOTAL_INDIRECT: 0,
                },
            ];
        }
    })
  },[dataDivisi])

  const uploadCostPersonilPlanning = async (e, i) => {
    e.preventDefault();
    try {
        swal.loading();
        const value = dataFields[i];
        const payloadCBB = {
            project_id: dataDetail?.PROJECT_ID,
            divisi_id: value?.divisi_id,
            coa_id: "",
            direct_cost: '0',
            indirect_cost: '0',
        };
        const resCBB = await storeSchema.actions.CBBPlanning(payloadCBB);
        if (resCBB?.status === true) {
            await swal.success(resCBB?.message);
            const payload = {
                project_id: dataDetail?.PROJECT_ID,
                position_id: value?.position_id,
                kualifikasi_id: value?.kualifikasi_id,
                qty_person: value?.qty_person,
                satuan_person: value?.satuan_person,
                qty_date: value?.qty_date,
                satuan_date: value?.satuan_date,
                cost_unit: value?.cost_unit,
                cost_total: value?.cost_total,
                divisi_id: value?.divisi_id,
            };

            const res = await storeSchema.actions.costPersonilPlanning(payload);
            if (res?.status === true) {
                await swal.success(res?.message);
            } else {
                await swal.error(res?.message);
            };
        } else {
            await swal.error(resCBB?.message);
        };
      getDetailProject();
      getCBBPlanning();
      // getCostPersonilPlanning();
    } catch (error) {
      console.error(error);
    };
  };

  const uploadCostPersonilDetail = async (e, i, flag) => {
    e.preventDefault();
    try {
      swal.loading();
      const value = dataFieldsExpand[i];
      const payload = flag === 'U' ? {
        dpersonel_id: value?.dpersonel_id,
        flag_personil: "Y"
      } : {
        sub_dpersonel_id: "",
        personel_id: personelId,
        user_id: value?.user_id,
        nik: value?.nik,
        nama_personil: value?.nama_personil,
        divisi_id: value?.divisi_id,
        qty_date: value?.qty_date,
        satuan_date: "1",
        flag_personil: flag
      };

      const res = flag === 'U' ? await storeSchema.actions.updatePersonilDetail(payload) : await storeSchema.actions.costPersonilDetail(payload);
      if (res?.status === true) {
        setListNotif([])

        await swal.success(res?.message);
        if (flag === 'Y' || flag === 'U') {
          const pay = {
            category: 1,
            channel: 1,
            nip_tujuan: [`${value?.nik}`],
            title: "Assigned to the project (" + dataDetail?.PROJECT_NO + ")",
            body: dataDetail?.PROJECT_NAME,
            project_id: dataDetail?.PROJECT_ID,
            link: "",
            navigate_to: "/project-profile"
          }
          await storeSchema.actions.insertNotification(pay)
        }
      } else {
        await swal.error(res?.message);
      };
      getCostPersonilDetail(personelId)
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    const get = async () => {
      // const decode = await decodeData(localStorage.getItem('loginData'));
      const decode = await decodeData(getCookies("loginData"));
      setLoginData(decode);
    };
    get();
  }, [])

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

  }, [dataCBB]);

  useEffect(() => {
    const fetchOption = async () => {
      setOptDivisi(await optionRefByJenis('product_owner'));
    };
    fetchOption();
  }, []);

  const handleRemoveField = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFields];
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        swal.loading();
        const res = await storeSchema.actions.deleteCostPersonilPlanning(targetValue?.personel_id);
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

  const handleRemoveFieldExpand = async (e, i) => {
    e.preventDefault();
    try {
      const values = [...dataFieldsExpand];
      const targetValue = values[i];
      if (targetValue?.status?.canDelete === true) {
        swal.loading();
        const res = await storeSchema.actions.deleteCostPersonilDetail(targetValue?.dpersonel_id);
        if (res?.status === true) {
          await swal.success(res?.data);
        } else {
          await swal.error(res?.message);
        };
        getCostPersonilDetail(personelId)
      } else {
        values.splice(i, 1);
        setDataFieldsExpand(values);
      };
    } catch (error) {
      console.error(error);
    };
  };

  const handleAddFieldExpand = () => {
    setDataFieldsExpand([
      ...dataFieldsExpand,
      dataDummyExpand,
    ])
  };

  useEffect(() => {
    setTotalCostDivisi({});
    setTotalCost(0);
    const valueCostPersonilDetail = dataDetail?.DETAIL_COST;
    if (valueCostPersonilDetail?.length > 0) {
      const subTotalPerDiv = valueCostPersonilDetail.reduce((acc, curr) => {
        const kategori = curr.DIVISI_ID;
        if (!acc[kategori]) {
            acc[kategori] = 0;
        }
        acc[kategori] += curr.COST_TOTAL;
        return acc;
      }, {});
      setTotalCostDivisi(subTotalPerDiv);
      const newData = valueCostPersonilDetail?.map((value) => {
        setTotalCost((prev) => (prev + value?.COST_TOTAL));
        return {
          personel_id: value?.PERSONEL_ID,
          ur_position: value?.POSITION,
          position_id: value?.POSITION_ID,
          ur_kualifikasi: value?.KUALIFIKASI,
          kualifikasi_id: value?.KUALIFIKASI_ID,
          qty_person: value?.QTY_PERSON,
          ur_satuan_person: value?.UR_SATUAN_PERSON,
          satuan_person: value?.SATUAN_PERSON,
          qty_date: value?.QTY_DATE,
          ur_satuan_date: value?.UR_SATUAN_DATE,
          satuan_date: value?.SATUAN_DATE,
          cost_unit: value?.COST_UNIT,
          cost_total: value?.COST_TOTAL,
          divisi_id: value?.DIVISI_ID,
          status: {
            canUpload: false,
            canDelete: false,
          }
        }
      })
      setDataFields(newData);
    } else {
      // setDataFields([dummyFieldCostPersonilPlanning]);
      setDataFields([]);
    };
    // eslint-disable-next-line
  }, [dataDetail,dataCBB]);

  const getCostPersonilDetail = async (id) => {
    const res = await storeSchema.actions.getDetailCostPersonilDetail(id);
    if (res?.status === true) {
      const newData = res?.data?.map((value) => {
        return {
          dpersonel_id: value?.DPERSONEL_ID,
          personel_id: value?.PERSONEL_ID,
          user_id: value?.USER_ID,
          nik: value?.NIK,
          nama_personil: value?.NAMA_PERSONIL,
          divisi_id: value?.DIVISI_ID,
          qty_date: value?.QTY_DATE,
          satuan_date: value?.SATUAN_DATE,
          flag_personil: value?.FLAG_PERSONIL,
          status: {
            canUpload: false,
            canDelete: false,
          }
        }
      })
      setDataFieldsExpand(newData)
    } else {
      setDataFieldsExpand([])
    }
  }

  const handleExpand = async (e, value) => {
    e.preventDefault();
    setExpandTable(prev => {
      if (prev.personel_id === value.personel_id) {
        return {
          personel_id: value.personel_id,
          isExpand: !prev?.isExpand,
        };
      } else {
        return {
          personel_id: value.personel_id,
          isExpand: true,
        }
      }
    })
    setPersonelId(value.personel_id)
    getCostPersonilDetail(value?.personel_id)
  }

  const handleChangeTeamSelect = (e, i) => {
    const values = [...dataFieldsExpand];
    values[i]['nama_personil'] = e.label;
    values[i]['nik'] = e.value;
    values[i]['divisi_id'] = e.divisi;
    setDataFieldsExpand(values);
  };

  useEffect(() => {
    const fetchOption = async () => {
      setOptPosition(await optionRefByJenis('position_id'));
      setOptDivisi(await optionRefByJenis('kd_spuc'));
      setOptKualifikasi(await optionRefByJenis('kualifikasi_id'));
      setOptSatuanPerson(await optionRefByJenis('satuan_person'));
      setOptSatuanDate(await optionRefByJenis('satuan_date'));
    };
    fetchOption();
    const getListKaryawan = async () => {
      const res = await storeSchema.actions.getListKaryawan({
        page: 1,
        limit: 2000,
        order: 'ASC'
      })
      if (res?.status) {
        const dataList = res?.data?.list_data?.filter((item) => item.AKTIF === 'Y').map((data, index) => {
          return ({
            value: data.NIK,
            label: data.NAMA,
            divisi: data.DIVISI_ID
          });
        });
        setListKaryawan(dataList)
      } else {
        setListKaryawan([])
      }
    }
    getListKaryawan()
  }, []);

  const downloadTemplate = async () => {
    const url = 'https://api-hub.ilcs.co.id/api/v1/n2n/files/template.xlsx';
    const link = document.createElement('a');
    link.href = url;
    link.download = 'template.xlsx';
    link.target = '_blank';
    link.click();
  };

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

  const calculateTotalCostByDivisi = (data, divisiId) => {
    return data.reduce((total, item) => {
      if (item.divisi_id === divisiId) {
        total += item.cost_total || 0;
      }
      return total;
    }, 0);
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
          project_id: dataDetail?.PROJECT_ID,
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
        getCBBPlanning();
      }

    } else {
      swal.warning("Mohon Upload Data Excel Terlebih Dahulu ...");
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='sm:flex sm:gap-10 py-4'>
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

      <div className="flex gap-3 pt-2 items-end">
        <Label
            label='Divisi'
            children={
                <select
                    name="divisi_id"
                    className="select select-md w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500"
                    onChange={(e) => handleChangeAddDivisi(e)}
                >
                    <option value=""></option>
                    {optDivisi?.map((data) => (
                        <option key={data?.value} value={data?.value}>
                            {data?.label}
                        </option>
                    ))}
                </select>
            }
        />
        <button
            type="button"
            className="btn select select-md rounded-[25px] border-none bg-blue-50 text-primary flex items-center gap-2"
            onClick={handleAddDivisi}
        >
            <RxPlusCircled size="18px" />
            Add CBB Planning
        </button>
      </div>

      {cbb && cbb.length > 0 && cbb?.map((v, ii) => {
      return (
      <>
      <div className="card border-2 p-5 my-5">
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-bold'>Role {v?.DIVISI_ID}</div>
        <div className='overflow-x-auto'>
          <table className='table table-sm'>
            <thead>
              <tr className='bg-white'>
                {headerTable?.map((title, i) => {
                  return (
                    <th key={i} className={headerTable.length === (i + 1) ? 'sticky right-0' : ''}>{title}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {dataFields && dataFields.length > 0 && dataFields?.map((item, index) => {
              if (item.divisi_id === v?.DIVISI_ID) return (
                <>
                  <tr key={index}>
                    <td className='min-w-48'>
                      <select
                        name={"position_id"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
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
                        disabled={item?.status?.canDelete}
                      >
                        <option value=""></option>
                        {optKualifikasi?.map(data => {
                          return (
                            <option value={data?.value} selected={data?.value === item?.kualifikasi_id}>{data?.label}</option>
                          )
                        })}
                      </select>
                    </td>
                    <td className='min-w-36'>
                      <div className='relative'>
                        {item?.status?.canDelete ? (
                          null
                        ) : (
                          <>
                            <div
                              className='absolute btn btn-xs top-1 left-3 size-6'
                              onClick={() => handleCounter('qty_person', index, 'minus')}
                              disabled={item?.status?.canDelete}
                            >
                              -
                            </div>
                            <div
                              className='absolute btn btn-xs top-1 right-3 size-6 btn-primary'
                              onClick={() => handleCounter('qty_person', index, 'plus')}
                              disabled={item?.status?.canDelete}
                            >
                              +
                            </div>
                          </>
                        )}
                        <input
                            type="number"
                            className="input input-sm input-bordered rounded-[25px] bg-white text-center"
                            name='qty_person'
                            value={item?.qty_person}
                            onChange={(e) => handleChange(e, index)}
                            disabled={false}
                        />
                      </div>
                    </td>
                    <td className='min-w-32'>
                      <select
                        name={"satuan_person"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
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
                        {item?.status?.canDelete ? (
                          null
                        ) : (
                          <>
                            <div
                              className='absolute btn btn-xs top-1 left-3 size-6'
                              onClick={() => handleCounter('qty_date', index, 'minus')}
                              disabled={item?.status?.canDelete}
                            >
                              -
                            </div>
                            <div
                              className='absolute btn btn-xs top-1 right-3 size-6 btn-primary'
                              onClick={() => handleCounter('qty_date', index, 'plus')}
                              disabled={item?.status?.canDelete}
                            >
                              +
                            </div>
                          </>
                        )}
                        <input
                            type="number"
                            className="input input-sm input-bordered rounded-[25px] bg-white text-center"
                            name='qty_date'
                            value={item?.qty_date}
                            onChange={(e) => handleChange(e, index)}
                            disabled={false}
                        />
                      </div>
                    </td>
                    <td className='min-w-32'>
                      <select
                        name={"satuan_date"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        disabled={item?.status?.canDelete}
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
                        disabled={true}
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
                      {item?.status && (
                        <div className='flex items-center'>
                          {item?.status?.canUpload && (
                            <div className='btn btn-sm bg-primary text-white' onClick={(e) => uploadCostPersonilPlanning(e, index)}>
                              <AiOutlineSave />
                            </div>
                          )}
                          <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveField(e, index)}>
                            <IoMdTrash />
                          </div>
                        </div>
                      )}
                    </td>
                    {/* <td>
                        <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveField(e, index)}>
                            <IoMdTrash />
                        </div>
                    </td> */}
                    <td className='flex justify-center sticky right-0 bg-white'>
                      {item?.status?.canUpload === false && (
                        <span className={`border-2 rounded-[50%] bg-primary p-1 arrow ${(expandTable.personel_id === item.personel_id && expandTable.isExpand === true) ? 'rotate' : ''}`} onClick={(e) => handleExpand(e, item)}>
                          <IoIosArrowDown className='text-white text-lg' />
                        </span>
                      )}
                    </td>
                  </tr>
                  {(expandTable.personel_id === item.personel_id && expandTable.isExpand === true) && (
                    <tr className='bg-sky-50'>
                      <td colSpan={10} className='pb-5'>
                        <table className='table table-xs'>
                          <thead>
                            <tr>
                              {headerExpandTable?.map((header, i) => {
                                return (
                                  <th key={i} className='text-xs'>
                                    {header}
                                  </th>
                                )
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {dataFieldsExpand?.map((vExpand, iExpand) => {
                              return (
                                <tr key={iExpand}>
                                  <td className='min-w-[250px]'>
                                    {/* <input
                                      type="text"
                                      name={"nama_personil"}
                                      className="input input-sm input-bordered rounded-[25px] bg-white w-full"
                                      // size='-sm'
                                      onChange={(value, name) => {
                                        if (vExpand?.status?.canDelete) {
                                          return
                                        };
                                        handleChangeExpand(value, iExpand)
                                      }}
                                      value={vExpand?.nama_personil}
                                      disabled={vExpand?.status?.canDelete}
                                    /> */}
                                    <Select
                                      options={listKaryawan}
                                      value={({ value: vExpand?.nik, label: vExpand?.nama_personil })}
                                      onChange={(e) => handleChangeTeamSelect(e, iExpand)}
                                      styles={customStyles}
                                      isDisabled={vExpand?.status?.canDelete}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      name={"nik"}
                                      className="input input-sm input-bordered rounded-[25px] bg-white w-full"
                                      // size='-sm'
                                      onChange={(value, name) => {
                                        if (vExpand?.status?.canDelete) {
                                          return
                                        };
                                        handleChangeExpand(value, iExpand)
                                      }}
                                      value={vExpand?.nik}
                                      disabled={true}
                                    // disabled={vExpand?.status?.canDelete}
                                    />
                                  </td>
                                  <td>
                                    <select
                                      name={"divisi_id"}
                                      className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                                      onChange={(e) => handleChangeExpand(e, iExpand)}
                                      disabled={vExpand?.status?.canDelete}
                                    >
                                      <option value=""></option>
                                      {optDivisi?.map(data => {
                                        return (
                                          <option value={data?.value} selected={data?.value === vExpand?.divisi_id}>{data?.label}</option>
                                        )
                                      })}
                                    </select>
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      name={"qty_date"}
                                      className="input input-sm input-bordered rounded-[25px] bg-white w-[100px]"
                                      // size='-sm'
                                      onChange={(value, name) => {
                                        if (vExpand?.status?.canDelete) {
                                          return
                                        };
                                        handleChangeExpand(value, iExpand)
                                      }}
                                      value={vExpand?.qty_date}
                                      disabled={vExpand?.status?.canDelete}
                                    />
                                  </td>
                                  <td className='flex justify-end sticky right-0'>
                                    {vExpand?.status && (
                                      <div className='flex items-center'>
                                        {vExpand?.status?.canUpload && (
                                          <>
                                            <div className='tooltip mx-3' data-tip="Draft">
                                              <div className='btn btn-sm bg-primary text-white' onClick={(e) => uploadCostPersonilDetail(e, iExpand, "N")}>
                                                <RiDraftLine />
                                              </div>
                                            </div>
                                            {item?.position_id === '1' && (
                                              <div className='tooltip' data-tip="Submit">
                                                <div className='btn btn-sm bg-success text-white' onClick={(e) => uploadCostPersonilDetail(e, iExpand, "Y")}>
                                                  <AiOutlineSave />
                                                </div>
                                              </div>
                                            )}
                                          </>
                                        )}
                                        {vExpand?.flag_personil === 'N' && item?.position_id === '1' && (
                                          <div className='tooltip' data-tip="Submit">
                                            <div className='btn btn-sm bg-success text-white' onClick={(e) => uploadCostPersonilDetail(e, iExpand, "U")}>
                                              <AiOutlineSave />
                                            </div>
                                          </div>
                                        )}
                                        <div className='tooltip' data-tip="Delete">
                                          <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveFieldExpand(e, iExpand)}>
                                            <IoMdTrash />
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                        <div type="button" disabled={(dataFieldsExpand.filter(a => a.status.canUpload === true).length) === 1 ? true : parseInt(item?.qty_person) === dataFieldsExpand.length ? true : false} className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-42' onClick={handleAddFieldExpand}>
                          <RxPlusCircled size='20px' /> Add Employee
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              )})}
              {dataFields && dataFields.length === 0 && (
                <tr>
                  <td colSpan={headerTable.length} className='text-gray-500 text-center'>
                    Belum Ada Role Yang Dipilih Oleh AM / BE
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {(
        // data?.FLAG_EDIT && 
        <div
          type="button"
          disabled={false}
          // disabled={(dataFields.filter(a => a.status.canUpload === true).length) === 1 ? true : false}
          className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-32'
          onClick={() => handleAddField(v.DIVISI_ID)}>
          <RxPlusCircled size='20px' /> Add Role
        </div>
        )}
        <hr className='my-3' />
        <div className='flex flex-row bg-blue-200 font-bold w-full rounded-full py-2 px-6'>
          <TotalCost />
          <p className='text-sm px-2 self-center'>Total Cost {"("+v?.DIVISI_ID+")"}</p>
          <p className='text-sm px-2 self-center ml-auto'>{formatCurrency(totalCostDivisi[v?.DIVISI_ID]) || '-'}</p>
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
            <p className='text-sm px-2 self-center'>Total Cost</p>
            <p className='text-sm px-2 self-center ml-auto'>{formatCurrency(totalCost) || '-'}</p>
        </div>
    </div>
  )
}

const customStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "9999px",
    // fontSize: "0.875rem",
    borderColor: "1px solid #d1d5db",
  }),
};

export default EditPeopleAssignment