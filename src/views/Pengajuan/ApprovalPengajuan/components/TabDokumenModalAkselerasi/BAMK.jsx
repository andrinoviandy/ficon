import React, { useEffect, useState, useRef } from 'react'
import storeSchema from 'global/store';
import { AiOutlineSave } from "react-icons/ai";
import { RxPlusCircled } from "react-icons/rx";
import { swal } from 'global/helper/swal';
import { IoMdTrash } from 'react-icons/io';
import { getCookies } from 'global/helper/cookie';

const BAMK = ({ location, data, getDetailProject, isVendorRealization, isBillingRealization }) => {
  let sub_pro = isBillingRealization ? location?.state?.sub_project ? true : false : false;
  const fileInputRef = useRef(null);
  const dummyField = {
    dokumen_id: "",
    tipe_dokumen: "02", // Dokumen BAMK
    no_dokumen: "",
    tgl_dokumen: "",
    jns_dokumen: "01006", // BAMK
    url_dokumen: "",
    status: {
      canUpload: true,
      canDelete: false,
    },
  };
  const headerTable = ['Nomor BAMK', 'Tanggal BAMK', 'Attachment BAMK']
  const [dataFields, setDataFields] = useState([dummyField]);
  const [file, setFile] = useState(null);

  const accessAccount = getCookies('accountAccess')

  const handleChange = (e, i) => {
    const values = [...dataFields];
    values[i][e.target.name] = e.target.value;
    setDataFields(values);
  };

  useEffect(() => {
    const dokumenBamk = data?.DOKUMEN_BAMK;
    if (dokumenBamk?.length > 0) {
      const newData = dokumenBamk?.map((value) => {
        return {
          dokumen_id: value?.DOKUMEN_ID,
          tipe_dokumen: value?.TIPE_DOKUMEN,
          no_dokumen: value?.NO_DOKUMEN,
          tgl_dokumen: value?.TGL_DOKUMEN?.substring(0, 10),
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
        const res = await storeSchema.actions.deleteDokumenBAMK(data?.PROJECT_ID, targetValue?.dokumen_id);
        if (res?.status === true) {
          await swal.success(res?.data?.delete_dokumen);
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
      const value = dataFields[i];
      const payload = {
        tipe_dokumen: value?.tipe_dokumen,
        no_dokumen: value?.no_dokumen,
        tgl_dokumen: value?.tgl_dokumen?.substring(0, 10),
        jns_dokumen: value?.jns_dokumen,
        project_vendor_id: (isVendorRealization === true || sub_pro === true) ? location?.state?.sub_data?.project_vendor_id : "",
        project_id: (isVendorRealization === true || sub_pro === true) ? location?.state?.sub_data?.project_vendor_id : data?.PROJECT_ID,
        kode: accessAccount?.kode
      };

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("lampiran", file);

      const res = await storeSchema.actions.uploadDokumenBAMK(formData);
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
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>BAMK</div>
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
                          if (item?.status?.canDelete) {
                            return
                          };
                          handleChange(e, index)
                        }}
                        disabled={item?.status?.canDelete || isVendorRealization}
                      />
                    </td>
                    <td className='w-1/3'>
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
                        disabled={item?.status?.canDelete || isVendorRealization}
                      />
                    </td>
                    <td className='flex gap-3'>
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
                            if (item?.status?.canDelete) {
                              return
                            };
                            // setFile(e.target.files[0])
                            handleChangeDoc(e, index)
                          }}
                          ref={fileInputRef}
                          disabled={item?.status?.canDelete}
                        />
                      )}
                      {((isVendorRealization === false || isBillingRealization) || data?.FLAG_EDIT) && (
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
          {((isVendorRealization === false || isBillingRealization) || data?.FLAG_EDIT) && (
            <div type="button" disabled={(dataFields.length) === 1 ? true : false} className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-60 ' onClick={handleAddField}>
              <RxPlusCircled size='20px' /> Add Dokumen BAMK
            </div>
          )}
        </div >
      </div >
    </>
  )
}

export default BAMK