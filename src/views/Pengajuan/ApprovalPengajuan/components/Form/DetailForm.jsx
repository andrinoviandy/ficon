import React, { useState, useEffect } from 'react'
import { AsyncSelect, Label, Select } from 'components/atoms';
import storeSchema from 'global/store';
import CurrencyInput from 'components/atoms/CurrencyInput';

const DetailForm = ({
  options,
  locationState,
  dataDetail,
  setDataDetail,
  customer,
  setCustomer,
  isDetailModalAkselerasi = false,
  loginData,
  handleClickPO,
  selectPO,
  lop,
  setLop,
  selectProductOwner,
  setSelectProductOwner
}) => {

  const [checkNo, setCheckNo] = useState('auto');
  const [displayNo, setDisplayNo] = useState('none');
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  useEffect(() => {
    if (checkNo === 'auto') {
      setDisplayNo('none')
    } else {
      setDisplayNo('block')
    }

    if (lop) {
      setDataDetail((prev) => {
        return {
          ...prev,
          PROJECT_NAME: lop?.projectName,
          CATEGORY_ID: lop?.categoryId,
          CATEGORY_UR: lop?.categoryUr,
          PORTOFOLIO_ID: lop?.portofolioKode,
          PORTOFOLIO_UR: lop?.portofolioNama
        }
      })
      setCustomer({
        label: lop?.customerName,
        value: lop?.customerID
      })
    }
    
  }, [checkNo, lop, setCustomer, setDataDetail])

  const handleChange = (e) => {
    setDataDetail((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleChangeCurrency = (value, name) => {
    if (name === 'NILAI_PENAWARAN' && (dataDetail?.COGS !== '' || dataDetail?.COGS !== 0)) {
      setDataDetail((prev) => {
        return {
          ...prev,
          MARGIN_PENAWARAN: (value - dataDetail?.COGS),
          PERSENTASE_PENAWARAN: ((value - dataDetail?.COGS) / value).toFixed(2) * 100,
        };
      });
    }
    if (name === 'NILAI_KONTRAK' && (dataDetail?.COGS !== '' || dataDetail?.COGS !== 0)) {
      setDataDetail((prev) => {
        return {
          ...prev,
          MARGIN_KONTRAK: (value - dataDetail?.COGS),
          PERSENTASE_KONTRAK: ((value - dataDetail?.COGS) / value).toFixed(2) * 100,
        };
      });
    }
    setDataDetail((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeOpt = (e, name) => {
    setDataDetail((prev) => {
      return {
        ...prev,
        [name === "SPUC" ? ("UR_" + name) : (name + "_UR")]: e.label,
        [name === "SPUC" ? ("KD_" + name) : (name + "_ID")]: e.value,
      };
    });
  };

  const handleChangeNIP = (e) => {
    setDataDetail((prev) => {
      return {
        ...prev,
        NAMA_SALES: e.label,
        NIP_SALES: e.value,
      };
    });
  };

  // Handler untuk checkbox
  const handleCheckboxChange = (e) => {
    const {name,  checked } = e.target;

    setCheckboxChecked(checked);
    setDataDetail(prev => ({
      ...prev,
      [name]: checked ? 'T' : 'F',
    }));
  };

  useEffect(() => {
    if (dataDetail?.FLAG_LOP === 'F') {
      setCheckboxChecked(false)
    } else {
      setCheckboxChecked(true)
    }

  }, [dataDetail?.FLAG_LOP, checkboxChecked, setDataDetail]);

  return (
    <div className='flex flex-col gap-2'>
      {/* {(locationState?.project === "Edit Project" || isDetailModalAkselerasi) && ( */}
      <Label
        label='No Project'
        children={
          <>
            <div style={{ display: `${locationState?.project === 'Add Project' ? 'block' : 'none'}` }}>
              <div className="flex flex-row gap-5">
                <label className="label gap-2">
                  {/* <input type="checkbox" checked={checkNo === 'auto' ? true : false} onClick={(e) => setCheckNo('auto')} className="checkbox checkbox-info bg-red" /> */}
                  <input type="checkbox" checked={true} onClick={(e) => setCheckNo('auto')} className="checkbox checkbox-info bg-red" />
                  <span className="label-text">Auto Generate</span>
                </label>
                {/* <label className="label gap-2">
                  <input type="checkbox" checked={checkNo === 'manual' ? true : false} onClick={(e) => setCheckNo('manual')} className="checkbox checkbox-info bg-green" />
                  <span className="label-text">Manual</span>
                </label> */}
              </div>
            </div>
            <input
              type="text"
              className="input input-bordered rounded-[25px] bg-white w-full"
              name='PROJECT_NO'
              onChange={handleChange}
              value={dataDetail?.PROJECT_NO}
              disabled={(locationState?.project === "Edit Project" || isDetailModalAkselerasi) ? true : false}
              style={{ display: `${locationState?.project === "Edit Project" || isDetailModalAkselerasi ? 'block' : displayNo}` }}
              placeholder='Example : A-BBB-CCCC'
            />
          </>
        }
      />
      {/* )} */}
      <Label
        label='LOP'
        withCheckbox={true}
        checkboxName="FLAG_LOP"
        checkboxChecked={checkboxChecked}
        onCheckboxChange={handleCheckboxChange}
        disabled={!dataDetail.FLAG_LOP} // Select akan disabled jika checkbox dicentang
        children={
          <AsyncSelect
            name='LOP'
            loadOptions={(value, callBack) => {
              const get = async () => {
                try {
                  const res = await storeSchema.actions.getRefLop(value.toUpperCase(), loginData?.KD_SUB);
                  const data = res?.data?.map((v) => {
                    return {
                      label: v.LOP_ID + ' - ' + v.PROJECT_NAME + ' - ' + v.PROJECT_OWNER,
                      value: v.LOP_ID,
                      projectName: v.PROJECT_NAME,
                      customerName: v.CUSTOMER_NAME,
                      customerID: v.CUSTOMER_ID,
                      portofolioKode: v.PORTOFOLIO_ID,
                      portofolioNama: v.PORTOFOLIO_NAMA,
                      projectOwner: v.PROJECT_OWNER,
                      categoryId: v.CATEGORY_ID,
                      categoryUr: v.CATEGORY_UR
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
              handleChangeOpt(e, name);
              setLop(e);
            }}
            value={isDetailModalAkselerasi ? { label: dataDetail?.LOP_ID + ' - ' + dataDetail?.PROJECT_NAME + ' - ' + dataDetail?.KD_SPUC, value: dataDetail?.LOP_ID } : lop}
            isDisabled={!checkboxChecked}
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
            onChange={handleChange}
            value={dataDetail?.PROJECT_NAME}
            disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
          />
        }
      />
      <Label
        label='Keterangan'
        children={
          <textarea
            id="textarea"
            className="input input-bordered rounded-[25px] bg-white h-32 w-full"
            name='KETERANGAN'
            onChange={handleChange}
            value={dataDetail?.KETERANGAN}
            disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
          />
        }
      />
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Tipe Project'
            children={
              <Select
                name='PROJECT_TYPE'
                className='pl-0'
                options={options?.tipeProject}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: dataDetail?.PROJECT_TYPE_UR, value: dataDetail?.PROJECT_TYPE_ID }}
              // isDisabled={locationState?.project === 'Add Project' ? false : locationState?.project === "Edit Project" ? true : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Portofolio'
            children={
              <Select
                name='PORTOFOLIO'
                className='pl-0'
                options={options?.portofolio}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: dataDetail?.PORTOFOLIO_UR, value: dataDetail?.PORTOFOLIO_ID }}
                isDisabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Sub Portofolio'
            children={
              <Select
                name='SUBPORTOFOLIO'
                className='pl-0'
                options={options?.subPortofolio}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: dataDetail?.SUBPORTOFOLIO_UR, value: dataDetail?.SUBPORTOFOLIO_ID }}
                isDisabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Produk Kategori'
            children={
              <Select
                name='PRODUKKATEGORI'
                className='pl-0'
                options={options?.produkKategori}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: dataDetail?.PRODUKKATEGORI_UR, value: dataDetail?.PRODUKKATEGORI_ID }}
                isDisabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
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
                options={options?.area}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={
                  {
                    label: dataDetail?.KD_SPUC !== '' ? dataDetail?.UR_SPUC : options?.area.some(item => item.value === loginData?.KD_SUB) ? `${loginData?.KD_SUB} - ${loginData?.NAMA_SUB}` : '',
                    value: dataDetail?.KD_SPUC !== '' ? dataDetail?.KD_SPUC : options?.area.some(item => item.value === loginData?.KD_SUB) ? loginData?.KD_SUB : ''
                  }
                }
              // isDisabled={options?.area.some(item => item.value === loginData?.KD_SUB) ? true : locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Nama Customer'
            required={true}
            children={
              <AsyncSelect
                name='CUSTOMER'
                loadOptions={(value, callBack) => {
                  const get = async () => {
                    try {
                      const res = await storeSchema.actions.getCustomersBySpuc('', (dataDetail?.KD_SPUC !== '' ? dataDetail?.KD_SPUC : loginData?.KD_SUB), value.toUpperCase());
                      const data = res?.data?.map((v) => {
                        return {
                          label: v.CUSTOMER_NAME,
                          value: v.CUSTOMER_ID,
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
                  handleChangeOpt(e, name);
                  setCustomer(e);
                }}
                value={isDetailModalAkselerasi ? { label: dataDetail?.CUSTOMER_NAME, value: dataDetail?.CUSTOMER_ID } : customer}
                isDisabled={loginData?.KD_SUB !== '' ? false :
                  dataDetail?.KD_SPUC !== '' ? false : locationState?.project !== 'Add Project' ? false : true
                  // locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)
                }
              />
            }
          />
        </div>
      </div>
      {locationState?.project !== 'Add Project' && (
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Start Project'
              children={
                <input
                  type="date"
                  className="input input-bordered rounded-[25px] bg-white w-full"
                  name='CONTRACT_START'
                  onChange={handleChange}
                  value={dataDetail?.CONTRACT_START?.substring(0, 10)}
                  disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
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
                  name='CONTRACT_END'
                  onChange={handleChange}
                  value={dataDetail?.CONTRACT_END?.substring(0, 10)}
                  disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
                />
              }
            />
          </div>
        </div>
      )}
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          <Label
            label='Kategori'
            children={
              <Select
                name='CATEGORY'
                className='pl-0'
                options={options?.kategori}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: dataDetail?.CATEGORY_UR, value: dataDetail?.CATEGORY_ID }}
                isDisabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
              />
            }
          />
        </div>
        <div className='w-full'>
          <Label
            label='Project Model'
            children={
              <Select
                name='PROJECT_MODEL'
                className='pl-0'
                options={options?.kategoriProject}
                onChange={(e, { name }) => handleChangeOpt(e, name)}
                value={{ label: dataDetail?.PROJECT_MODEL_UR, value: dataDetail?.PROJECT_MODEL_ID }}
                isDisabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
              />
            }
          />
        </div>
      </div>
      <div className='sm:flex sm:gap-10'>
        <div className='w-full'>
          {
            dataDetail?.CATEGORY_UR === "Sustain" && (
              <Label
                label='Link PID'
                children={
                  <AsyncSelect
                    name='LINKPID'
                    loadOptions={(value, callBack) => {
                      const get = async () => {
                        try {
                          const res = await storeSchema.actions.getLinkedPID(value);
                          const data = res?.data?.map((v) => {
                            return {
                              label: v.LABEL,
                              value: v.VALUE,
                            };
                          });
                          callBack(data);
                        } catch (err) {
                          callBack([]);
                        }
                      };
                      if (value.length >= 5) {
                        get();
                      }
                    }}
                    onChange={(e, { name }) => {
                      handleChangeOpt(e, name);
                    }}
                    value={{ label: dataDetail?.LINKPID_UR, value: dataDetail?.LINKPID_ID }}
                    isDisabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
                  />
                }
              />
            )
          }
        </div>
        <div className='w-full'>
          
        </div>
      </div>
      {
        (dataDetail?.KD_STATUS === '002' || dataDetail?.KD_STATUS === '003' || dataDetail?.KD_STATUS === '004' || dataDetail?.KD_STATUS === '005') && (
          <>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='COGS'
                  children={
                    <CurrencyInput
                      name='COGS'
                      onChange={handleChangeCurrency}
                      value={dataDetail?.COGS}
                      disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
                    // disabled={true}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Nilai Penawaran'
                  children={
                    <CurrencyInput
                      name='NILAI_PENAWARAN'
                      onChange={handleChangeCurrency}
                      value={dataDetail?.NILAI_PENAWARAN}
                      disabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
                    // disabled={true}
                    />
                  }
                />
              </div>
            </div>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label={
                    <>
                      Product Owner{' '}
                      <span className="text-xs text-red-500 italic">
                        (Pastikan SPUC Anda terpilih)
                      </span>
                    </>
                  }
                  children={
                    <Select
                      options={options?.productOwner}
                      isMulti
                      value={selectProductOwner}
                      onChange={setSelectProductOwner}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Klasifikasi Project'
                  children={
                    <Select
                      name='TYPE_VALIDASI'
                      className='pl-0'
                      options={options?.validasiDokumen}
                      onChange={(e, { name }) => handleChangeOpt(e, name)}
                      value={{ label: dataDetail?.TYPE_VALIDASI_UR, value: dataDetail?.TYPE_VALIDASI_ID }}
                      isDisabled={locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)}
                    />
                  }
                />
              </div>
            </div>
            {/* {dataDetail?.KD_STATUS.includes(["003", "004"]) ? "hidden" : "disabled"} */}
            {
              (dataDetail?.KD_STATUS === '004' || dataDetail?.KD_STATUS === '005') && (
                <div className='sm:flex sm:gap-10'>
                  <div className='w-full'>
                    <Label
                      label='Nomor Kontrak'
                      children={
                        <input
                          type="text"
                          className="input input-bordered rounded-[25px] bg-white w-full"
                          name='CONTRACT_NO'
                          onChange={handleChange}
                          value={dataDetail?.CONTRACT_NO}
                          disabled={(locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)) || (["003", "004", "005"].includes(dataDetail?.KD_STATUS) ? true : false)}
                        // disabled={true}
                        />
                      }
                    />
                  </div>
                  <div className='w-full'>
                    <Label
                      label='Nilai Kontrak'
                      children={
                        <CurrencyInput
                          name='NILAI_KONTRAK'
                          onChange={handleChangeCurrency}
                          value={dataDetail?.NILAI_KONTRAK}
                          // disabled={(locationState?.project === 'Add Project' ? false : ((dataDetail?.FLAG_EDIT === false) || isDetailModalAkselerasi)) || (["003", "004", "005"].includes(dataDetail?.KD_STATUS) ? true : false)}
                        // disabled={true}
                        />
                      }
                    />
                  </div>
                </div>
              )
            }
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label={`Nilai Gross Margin Penawaran (${dataDetail?.PERSENTASE_PENAWARAN}%)`}
                  children={
                    <CurrencyInput
                      name='MARGIN_PENAWARAN'
                      onChange={handleChangeCurrency}
                      value={dataDetail?.MARGIN_PENAWARAN}
                      disabled={true}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label={`Nilai Gross Margin Kontrak (${dataDetail?.PERSENTASE_KONTRAK}%)`}
                  children={
                    <CurrencyInput
                      name='MARGIN_KONTRAK'
                      onChange={handleChangeCurrency}
                      value={dataDetail?.MARGIN_KONTRAK}
                      disabled={true}
                    />
                  }
                />
              </div>
            </div>
          </>
        )
      }
      {
        dataDetail?.FLAG_BE && (
          <div className='sm:flex sm:gap-10'>
            <div className='w-full'>
              <Label
                label='NIP Sales'
                children={
                  <AsyncSelect
                    name='nip_sales'
                    loadOptions={(value, callBack) => {
                      const get = async () => {
                        try {
                          const res = await storeSchema.actions.getListKaryawan({
                            keyword: value
                          });
                          const data = res?.data?.list_data?.map((v) => {
                            return {
                              label: v.NAMA,
                              value: v.NIK,
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
                      handleChangeNIP(e);
                      // setCustomer(e);
                    }}
                    value={{ label: dataDetail?.NAMA_SALES, value: dataDetail?.NIP_SALES }}
                  />
                }
              />
            </div>
          </div>
        )
      }
      {(dataDetail?.KD_STATUS === '005') && (
        <div className='sm:flex sm:gap-10'>
          <div className='w-full'>
            <Label
              label='Nomor PO'
              children={
                <input
                  type="text"
                  className="input input-bordered rounded-[25px] bg-white w-full"
                  name='PO_NUMBER'
                  onClick={handleClickPO}
                  value={selectPO || dataDetail?.PO_NUMBER}
                  readOnly
                />
              }
            />
          </div>
          <div className='w-full'></div>
        </div>
      )}
    </div>
  )
}

export default DetailForm