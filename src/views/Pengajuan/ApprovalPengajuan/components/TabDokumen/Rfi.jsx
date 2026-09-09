import React, { useEffect, useState, useRef } from 'react'
import storeSchema from 'global/store';
import { AiOutlineSave } from "react-icons/ai";
import { RxPlusCircled } from "react-icons/rx";
import { swal } from 'global/helper/swal';
import { IoMdTrash } from 'react-icons/io';
import { IoCheckmarkCircleSharp, IoDownload, IoDownloadOutline } from 'react-icons/io5';
import { formatDate } from 'global/helper/formatDate';

const Rfi = ({ location, data, getDetailProject, isDetailModalAkselerasi, isVendorRealization, isBillingRealization, view }) => {
  let sub_pro = isBillingRealization ? location?.state?.sub_project ? true : false : false;
  const fileInputRef = useRef(null);
  const dummyField = {
    dokumen_id: "",
    tipe_dokumen: "05",
    no_dokumen: "",
    tgl_dokumen: "",
    jns_dokumen: "",
    uraian_jns: "",
    url_dokumen: "",
    created_at: "",
    status: {
      canUpload: true,
      canDelete: false,
    },
  };

  const headerTable = ['Deskripsi', 'Tanggal', 'Jenis RFI', 'Attachment Dokumen']
  const [dataFields, setDataFields] = useState([dummyField]);
  const [dataRfi, setDataRfi] = useState(dummyField);
  const [file, setFile] = useState(null);

  // referensi
  const [optJenisDok, setOptJenisDok] = useState([]);

  useEffect(() => {
    const getOptJenisDok = async () => {
      try {
        const res = await storeSchema.actions.getSubReferensiByJenis("tipe_dok", '05');
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

  const handleChange = (e) => {
    setDataRfi((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

  }

  useEffect(() => {
    const dokumenRfi = data?.DOKUMEN_RFI;
    if (dokumenRfi?.length > 0) {
      const newData = dokumenRfi?.map((value) => {
        return {
          dokumen_id: value?.DOKUMEN_ID,
          tipe_dokumen: "05",
          no_dokumen: value?.NO_DOKUMEN,
          tgl_dokumen: value?.TGL_DOKUMEN?.substring(0, 10),
          jns_dokumen: value?.JNS_DOKUMEN,
          uraian_jns: value?.URAIAN_JENIS,
          url_dokumen: value?.URL_DOKUMEN,
          created_at: value?.CREATED_AT,
          status: {
            canUpload: false,
            canDelete: true,
          }
        }
      })
      setDataFields(newData);
    } else {
      setDataFields([]);
    };
    // eslint-disable-next-line
  }, [data]);

  // const handleAddField = () => {
  //   setDataFields([
  //     ...dataFields,
  //     dummyField,
  //   ])
  // };

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

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const value = dataRfi;

      if (!value.tgl_dokumen.trim()) {
        swal.custom("Input Required", "Tanggal RFQ/RFI harus diisi!", "warning");
        return;
      }

      if (!value.jns_dokumen.trim()) {
        swal.custom("Input Required", "Jenis RFI harus diisi!", "warning");
        return;
      }

      if (!file) {
        swal.custom("File Required", "Silakan pilih file untuk diupload!", "warning");
        return;
      }

      swal.loading();

      const payload = {
        tipe_dokumen: "05", // dokumen Rfi
        no_dokumen: value?.no_dokumen,
        tgl_dokumen: value?.tgl_dokumen?.substring(0, 10),
        jns_dokumen: value?.jns_dokumen,
        project_id: (isVendorRealization || (isBillingRealization && sub_pro)) ? data?.PROJECT_VENDOR_ID : data?.PROJECT_ID,
      };

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("lampiran", file);

      const res = await storeSchema.actions.uploadDokumen(formData);
      if (res?.status === true) {
        setDataRfi(dummyField)
        setFile(null);
        fileInputRef.current.value = null;
        await swal.success(res?.data?.keterangan);
      } else {
        await swal.custom('Tidak Dapat Disimpan !', res?.message, 'error');
      };
      getDetailProject();
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

  console.log('view', view);
  

  return (
    <>
      <div className='card border-2 my-3'>
        <div className='card-body'>
          {((!isVendorRealization && view === true) || isBillingRealization) && (
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
                  <tr>
                    <td className='w-1/3'>
                      <input
                        type="text"
                        name={"no_dokumen"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={dataRfi?.no_dokumen}
                        onChange={(e) => {
                          handleChange(e)
                        }}
                      // disabled={item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                      />
                    </td>
                    <td className='w-1/6'>
                      <input
                        type="date"
                        name={"tgl_dokumen"}
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={dataRfi?.tgl_dokumen}
                        onChange={(e) => {
                          handleChange(e)
                        }}
                      // disabled={item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                      />
                    </td>
                    <td className='w-1/5'>
                      <select
                        name={"jns_dokumen"}
                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                        onChange={(e) => handleChange(e)}
                        value={dataRfi?.jns_dokumen}
                      // disabled={item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
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
                      <input
                        type="file"
                        name={"upload_dokumen"}
                        className='flex-1 file-input file-input-sm file-input-bordered file-input-primary rounded-[25px] bg-white'
                        onChange={(e) => {
                          handleChangeDoc(e)
                        }}
                        ref={fileInputRef}
                      // disabled={item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                      />
                      <div className='flex items-center'>
                        {/* {item?.status?.canUpload && ( */}
                        <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUpload(e)}>
                          <AiOutlineSave />
                        </div>
                        {/* )} */}
                        {/* <div className='btn btn-sm bg-red-500 ml-3 text-white' onClick={(e) => handleRemoveField(e, index)}>
                              <IoMdTrash />
                            </div> */}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {dataFields && dataFields.length > 0 && (
            <div className='border-t-2 my-3 h-48 overflow-auto p-3'>
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                {dataFields && dataFields.length > 0 && dataFields?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))?.map((item, index) => {
                  return item?.jns_dokumen === '05001' ? (
                    <li>
                      <hr />
                      <div className="timeline-middle">
                        <IoCheckmarkCircleSharp className='text-2xl text-primary' />
                      </div>
                      <div className="timeline-start md:text-end gap-1">
                        <time className="font-mono italic">{(item?.tgl_dokumen)}</time>
                        <div className="text-base font-black flex flex-row gap-3 justify-end items-center">
                          <div
                            className="btn btn-xs bg-primary text-white tooltip"
                            data-tip="Download File"
                            onClick={() => window.open(item?.url_dokumen, "_blank")}
                          >
                            <IoDownloadOutline className="text-xl" />
                          </div>

                          {view === true && (
                            <div
                              className="btn btn-xs bg-red-500 text-white tooltip flex items-center"
                              data-tip="Delete"
                              onClick={(e) => handleRemoveField(e, index)}
                              disabled={!view}
                            >
                              <IoMdTrash />
                            </div>
                          )}

                          <span>Request for RFI</span>
                        </div>
                        <div className='text-base text-gray-500 font-semibold'>{item?.no_dokumen}</div>
                      </div>
                      <hr />
                    </li>
                  ) : (
                    <li>
                      <div className="timeline-middle">
                        <IoCheckmarkCircleSharp className='text-2xl text-primary' />
                      </div>
                      <div className="timeline-end">
                        <time className="font-mono italic">{(item?.tgl_dokumen)}</time>
                        <div className="text-base font-black flex flex-row gap-3 justify-start">Response for RFI <div className='btn btn-xs bg-red-500 text-white tooltip items-center flex' data-tip='Delete' onClick={(e) => handleRemoveField(e, index)}><IoMdTrash /></div> <div className='btn btn-xs bg-primary text-white tooltip' data-tip='Download File' onClick={() => window.open(item?.url_dokumen, "_blank")}><IoDownloadOutline className='text-xl' /></div></div>
                        <div className='text-base text-gray-500 font-semibold'>{item?.no_dokumen}</div>
                      </div>
                      <hr />
                    </li>
                  )
                }
                )}
              </ul>
            </div>
          )}
          {dataFields && dataFields.length === 0 && (
            <div className='flex justify-center font-semibold text-gray-500'>
              No Data To Display
            </div>
          )}
        </div >
      </div >
    </>
  )
}

export default Rfi