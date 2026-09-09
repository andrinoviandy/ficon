import React, { useEffect, useState, useRef } from 'react'
import storeSchema from 'global/store';
import { AiOutlineSave } from "react-icons/ai";
import { RxPlusCircled } from "react-icons/rx";
import { swal } from 'global/helper/swal';
import CurrencyInput from 'components/atoms/CurrencyInput';
import { IoMdTrash } from 'react-icons/io';

const Kontrak = ({ location, data, getDetailProject, isDetailModalAkselerasi, isVendorRealization, isBillingRealization, isProject, view }) => {
  let sub_pro = isBillingRealization ? location?.state?.sub_project ? true : false : false;
  const fileInputRef = useRef(null);
  const dummyField = {
    dokumen_id: "",
    tipe_dokumen: "03", // Dokumen Kontrak
    no_dokumen: "",
    tgl_dokumen: "",
    value_dok: "",
    notes: "",
    jns_dokumen: "", // Kontrak Addendum
    url_dokumen: "",
    status: {
      canUpload: true,
      canDelete: false,
    },
  };
  const headerTable = ['Nomor Kontrak', 'Jenis Dokumen', 'Tanggal Kontrak', 'Jenis Kontrak', 'Nilai Kontrak', 'Attachment Kontrak']
  const [dataFields, setDataFields] = useState([dummyField]);
  const [file, setFile] = useState(null);
  const [optJenisDok, setOptJenisDok] = useState([]);
  const [optJenisDok2, setOptJenisDok2] = useState([]);

  useEffect(() => {
    const getOptJenisDok = async () => {
      try {
        const res = await storeSchema.actions.getSubReferensiByJenis("tipe_dok", '03');
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

    const getOptJenisDok2 = async () => {
      try {
        const res = await storeSchema.actions.getSubReferensiByJenis2("jenis_dok", '06');
        if (res?.status === true) {
          if (res?.data && res?.data.length > 0) {
            const option = res?.data.map((item) => {
              return {
                label: item?.ur_ref,
                value: item?.ur_ref,
                data: item,
              }
            })
            setOptJenisDok2(option);
          } else {
            setOptJenisDok2([]);
          }
        } else {
          setOptJenisDok2([]);
        };
      } catch (error) {
        console.error(error);
      };
    };

    getOptJenisDok2();
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
    const dokumenKontrak = data?.DOKUMEN_KONTRAK;
    if (dokumenKontrak?.length > 0) {
      const newData = dokumenKontrak?.map((value) => {
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
      setDataFields(newData);
    } else {
      setDataFields([dummyField]);
    };
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
        const res = await storeSchema.actions.deleteDokumen(targetValue?.dokumen_id);
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
      const value = dataFields[i];

      if (!value.no_dokumen.trim()) {
        swal.custom("Input Required", "Nomor Kontrak harus diisi!", "warning");
        return;
      }

      if (!value.tgl_dokumen.trim()) {
        swal.custom("Input Required", "Tanggal Kontrak harus diisi!", "warning");
        return;
      }

      if (!value.jns_dokumen.trim()) {
        swal.custom("Input Required", "Jenis Kontrak harus diisi!", "warning");
        return;
      }

      if (!file) {
        swal.custom("File Required", "Silakan pilih file untuk diupload!", "warning");
        return;
      }

      swal.loading();
      const payload = {
        tipe_dokumen: value?.tipe_dokumen,
        no_dokumen: value?.no_dokumen,
        tgl_dokumen: value?.tgl_dokumen?.substring(0, 10),
        value_dok: value?.value_dok?.replace(",", "."),
        notes: value?.notes,
        jns_dokumen: value?.jns_dokumen,
        project_id: (isVendorRealization === true || sub_pro === true) ? location?.state?.sub_data?.project_vendor_id : data?.PROJECT_ID,
      };

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("lampiran", file);

      const res = await storeSchema.actions.uploadDokumen(formData);
      if (res?.status === true) {
        if (isProject) {
          await storeSchema.actions.updateProject({
            project_id: data?.PROJECT_ID,
            project_no: data?.PROJECT_NO,
            contract_no: value?.no_dokumen,
            nilai_kontrak: value?.value_dok
          });
        }
        if (isVendorRealization) {
          await storeSchema.actions.vendorPlanning({
            project_vendor_id: data?.PROJECT_VENDOR_ID,
            no_kontrak: value?.no_dokumen,
            nilai_kontrak: value?.value_dok
          })
        }
        await swal.success(res?.data?.keterangan);
      } else {
        await swal.error(res?.message);
      };
      getDetailProject();
    } catch (error) {
      console.error(error);
    };
  };

  const handleChangeDoc = (e, i) => {
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
      <div className='card border-2 my-5'>
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Kontrak</div>
        <div className='card-body'>
          <div className='max-h-64 overflow-auto'>
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
                    <td className="min-w-44">
                      <input
                        type="text"
                        name={"no_dokumen"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.no_dokumen}
                        onChange={(e) => {
                          if (item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false)) {
                            return
                          };
                          handleChange(e, index)
                        }}
                        disabled={item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                      />
                    </td>
                    <td className={'min-w-40'}>
                      <select
                        name={"notes"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        value={item?.notes}
                        disabled={item?.status?.canDelete}
                      >
                        <option key={0} value="" disabled></option>
                        {optJenisDok2?.map((data, i) => {
                          return (
                            <option key={i} value={data?.value}>{data?.label}</option>
                          )
                        })}
                      </select>
                    </td>
                    <td className="w-[10%]">
                      <input
                        type="date"
                        name={"tgl_dokumen"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.tgl_dokumen}
                        onChange={(e) => {
                          if (item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false)) {
                            return
                          };
                          handleChange(e, index)
                        }}
                        disabled={item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                      />
                    </td>
                    <td className='min-w-[200px]'>
                      <select
                        name={"jns_dokumen"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e, index)}
                        value={item?.jns_dokumen}
                        disabled={item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                      >
                        <option key={0} value="" disabled></option>
                        {optJenisDok?.map((data, i) => {
                          return (
                            <option key={i} value={data?.value} disabled={dataFields.length === 1 && item?.status?.canUpload && data?.value === '03002' ? true : dataFields.length > 1 && data?.value === '03001' ? true : false}>{data?.label}</option>
                          )
                        })}
                      </select>
                    </td>
                    <td className="min-w-44">
                      <CurrencyInput
                        name='value_dok'
                        size='-sm'
                        onChange={(value, name) => handleChangeCurrency(value, name, index)}
                        value={item?.value_dok}
                        disabled={item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                      />
                    </td>
                    {/* <td className="min-w-44">
                      <input
                        type="text"
                        name={"notes"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.notes}
                        onChange={(e) => {
                          if (item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false)) {
                            return
                          };
                          handleChange(e, index)
                        }}
                        disabled={item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                      />
                    </td> */}
                    <td className='flex gap-3 min-w-72'>
                      {item?.status?.canDelete ? (
                        <input
                          type="text"
                          name={"upload_dokumen"}
                          className='input input-sm input-bordered text-center rounded-[25px] w-full bg-primary text-white cursor-pointer'
                          value={"Open Dokumen Kontrak"}
                          onClick={() => window.open(item?.url_dokumen, "_blank")}
                        />
                      ) : (
                        <input
                          type="file"
                          name={"upload_dokumen"}
                          className='flex-1 file-input file-input-sm file-input-bordered file-input-primary rounded-[25px] bg-white'
                          onChange={(e) => {
                            if (item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false)) {
                              return
                            };
                            // setFile(e.target.files[0])
                            handleChangeDoc(e, index)
                          }}
                          ref={fileInputRef}
                          disabled={item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                        />
                      )}
                      {(
                        (isVendorRealization || isBillingRealization) ||
                        (data?.FLAG_EDIT &&
                          (isDetailModalAkselerasi !== true)
                        ) && view === true
                      ) && (
                          <div className='flex items-center'>
                            {item?.status?.canUpload && (
                              <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUpload(e, index)}>
                                <AiOutlineSave />
                              </div>
                            )}
                            {!sub_pro && (
                              <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveField(e, index)}>
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
          </div>
          {(
            (isVendorRealization || (isBillingRealization && !sub_pro)) ||
            (
              data?.FLAG_EDIT &&
              (isDetailModalAkselerasi !== true)
            ) && view === true
          ) && (
              <div type="button" disabled={(dataFields.filter(a => a.status.canUpload === true).length) === 1 ? true : false} className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-60 ' onClick={handleAddField}>
                <RxPlusCircled size='20px' /> Add Dokumen Kontrak
              </div>
            )}
        </div >
      </div >
    </>
  )
}

export default Kontrak