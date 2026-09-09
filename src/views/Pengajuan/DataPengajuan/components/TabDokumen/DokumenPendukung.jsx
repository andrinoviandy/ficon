import React, { useEffect, useState, useRef } from 'react'
import storeSchema from 'global/store';
import { AiOutlineSave } from "react-icons/ai";
import { RxPlusCircled } from "react-icons/rx";
import { swal } from 'global/helper/swal';
import { IoMdTrash } from 'react-icons/io';

const DokumenPendukung = ({ location, data, getDetailProject, isDetailModalAkselerasi, isVendorRealization, isBillingRealization, view }) => {
  let sub_pro = isBillingRealization ? location?.state?.sub_project ? true : false : false;
  const fileInputRef = useRef(null);
  const dummyField = {
    dokumen_id: "",
    tipe_dokumen: "01",
    no_dokumen: "",
    tgl_dokumen: "",
    jns_dokumen: "",
    uraian_jns: "",
    url_dokumen: "",
    status: {
      canUpload: true,
      canDelete: false,
    },
  };
  const headerTable = ['Nama Dokumen', 'Tanggal Dokumen', 'Jenis Dokumen', 'Attachment Dokumen Pendukung']
  const [dataFields, setDataFields] = useState([dummyField]);
  const [file, setFile] = useState(null);

  // referensi
  const [optJenisDok, setOptJenisDok] = useState([]);

  useEffect(() => {
    const getOptJenisDok = async () => {
      try {
        const res = await storeSchema.actions.getSubReferensiByJenis("tipe_dok", '01');
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
  }, []);

  const handleChange = (e, i) => {
    const values = [...dataFields];
    values[i][e.target.name] = e.target.value;
    setDataFields(values);
  };

  useEffect(() => {
    const dokumenPendukung = data?.DOKUMEN_PENDUKUNG;
    if (dokumenPendukung?.length > 0) {
      const newData = dokumenPendukung?.map((value) => {
        return {
          dokumen_id: value?.DOKUMEN_ID,
          tipe_dokumen: "01",
          no_dokumen: value?.NO_DOKUMEN,
          tgl_dokumen: value?.TGL_DOKUMEN?.substring(0, 10),
          jns_dokumen: value?.JNS_DOKUMEN,
          uraian_jns: value?.URAIAN_JENIS,
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
        swal.custom("Input Required", "Nama Dokumen harus diisi!", "warning");
        return;
      }
      
      if (!value.tgl_dokumen.trim()) {
        swal.custom("Input Required", "Tanggal Dokumen harus diisi!", "warning");
        return;
      }
      
      if (!value.jns_dokumen.trim()) {
        swal.custom("Input Required", "Jenis Dokumen harus diisi!", "warning");
        return;
      }
      
      if (!file) {
        swal.custom("File Required", "Silakan pilih file untuk diupload!", "warning");
        return;
      }
  
      swal.loading();

      const payload = {
        tipe_dokumen: "01", // dokumen pendukung
        no_dokumen: value?.no_dokumen,
        tgl_dokumen: value?.tgl_dokumen?.substring(0, 10),
        jns_dokumen: value?.jns_dokumen,
        project_id: (isVendorRealization === true || sub_pro === true) ? location?.state?.sub_data?.project_vendor_id : data?.PROJECT_ID,
      };

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("lampiran", file);

      const res = await storeSchema.actions.uploadDokumen(formData);
      if (res?.status === true) {
        await swal.success(res?.data?.keterangan);
      } else {
        await swal.custom('Tidak Dapat Disimpan !', res?.message, 'error');
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
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Dokumen Pendukung</div>
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
                    <td className='w-1/3'>
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
                    <td className='w-1/6'>
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
                    <td className='w-1/5'>
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
                            <option key={i} value={data?.value}>{data?.label}</option>
                          )
                        })}
                      </select>
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
                        (data?.FLAG_EDIT && (isDetailModalAkselerasi !== true) && view === true)
                      ) && (
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
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(
            (isVendorRealization || isBillingRealization) ||
            (data?.FLAG_EDIT && isDetailModalAkselerasi !== true) && view === true
          ) && (
              <div type="button" disabled={(dataFields.filter(a => a.status.canUpload === true).length) === 1 ? true : false} className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-60 ' onClick={handleAddField}>
                <RxPlusCircled size='20px' /> Add Dokumen Pendukung
              </div>
            )}
        </div >
      </div >
    </>
  )
}

export default DokumenPendukung