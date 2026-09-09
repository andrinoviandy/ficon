import { swal } from 'global/helper/swal';
import storeSchema from 'global/store';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { IoCheckmarkCircleSharp, IoDownloadOutline } from 'react-icons/io5';

const Rfi = ({ dummyField, dataFieldsRfi, setDataFieldsRfi, getDetailProject, project_id }) => {
    const headerTableRfi = ['Deskripsi', 'Tanggal', 'Jenis RFI', 'Attachment Dokumen']
    const fileInputRefRfi = useRef(null);
    const [fileRfi, setFileRfi] = useState(null);
    const [dataRfi, setDataRfi] = useState(dummyField);
    const [optJenisDok, setOptJenisDok] = useState([]);

    const handleChangeDocRfi = (e, i) => {
        const maxFileSize = 25 * 1024 * 1024; // 25MB dalam byte
        if (e.target.files) {
            const file = e.target.files[0];
            if (file.size > maxFileSize) {
                swal.custom("File Terlalu Besar", "Ukuran file tidak boleh lebih dari 25 MB", "warning");
                setFileRfi(null);
                fileInputRefRfi.current.value = null;
            } else {
                setFileRfi(file);
            }
        } else {
            setFileRfi(null);
        }

    };

    const handleChangeRfi = (e) => {
        setDataRfi((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleRemoveFieldRfi = async (e, i) => {
        e.preventDefault();
        try {
            const values = [...dataFieldsRfi];
            const targetValue = values[i];
            if (targetValue?.status?.canDelete === true) {
                swal.loading();
                const res = await storeSchema.actions.deleteDokumen(targetValue?.dokumen_id);
                if (res?.status === true) {
                    await swal.success(res?.data);
                } else {
                    await swal.error(res?.message);
                };
            } else {
                values.splice(i, 1);
                setDataFieldsRfi(values);
            };
            getDetailProject(project_id)
        } catch (error) {
            console.error(error);
        };
    };

    const handleUploadRfi = async (e, i) => {
        e.preventDefault();
        try {
            const value = dataRfi;

            if (!value.no_dokumen.trim()) {
                swal.custom("Input Required", "Deskripsi harus diisi!", "warning");
                return;
            }

            if (!value.tgl_dokumen.trim()) {
                swal.custom("Input Required", "Tanggal harus diisi!", "warning");
                return;
            }

            if (!value.jns_dokumen.trim()) {
                swal.custom("Input Required", "Jenis RFI harus diisi!", "warning");
                return;
            }

            if (!fileRfi) {
                swal.custom("File Required", "Silakan pilih file untuk diupload!", "warning");
                return;
            }

            swal.loading();
            const payload = {
                tipe_dokumen: "05", // dokumen Rfi
                no_dokumen: value?.no_dokumen,
                tgl_dokumen: value?.tgl_dokumen?.substring(0, 10),
                jns_dokumen: value?.jns_dokumen,
                project_id: project_id,
            };

            const formData = new FormData();
            formData.append("payload", JSON.stringify(payload));
            formData.append("lampiran", fileRfi);

            const res = await storeSchema.actions.uploadDokumen(formData);
            if (res?.status === true) {
                setDataRfi(dummyField)
                setFileRfi(null);
                fileInputRefRfi.current.value = null;
                await swal.success(res?.data?.keterangan);
            } else {
                await swal.custom('Tidak Dapat Disimpan !', res?.message, 'error');
            };
            getDetailProject(project_id)
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        const getOptJenisDokRfi = async () => {
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

        getOptJenisDokRfi();
    }, [])


    return (
        <div className='mb-5 mt-3'>
            <div className='max-h-64 overflow-auto'>
                <table className='table table-sm table-pin-rows'>
                    <thead>
                        <tr className='bg-white'>
                            {headerTableRfi?.map((title, i) => {
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
                                        handleChangeRfi(e)
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
                                        handleChangeRfi(e)
                                    }}
                                // disabled={item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                                />
                            </td>
                            <td className='w-1/5'>
                                <select
                                    name={"jns_dokumen"}
                                    className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                                    onChange={(e) => handleChangeRfi(e)}
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
                                        handleChangeDocRfi(e)
                                    }}
                                    ref={fileInputRefRfi}
                                // disabled={item?.status?.canDelete || (!isBillingRealization && data?.FLAG_EDIT === false) || isDetailModalAkselerasi}
                                />
                                <div className='flex items-center'>
                                    {/* {item?.status?.canUpload && ( */}
                                    <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleUploadRfi(e)}>
                                        <AiOutlineSave />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='border-t-2 my-3 h-48 overflow-auto p-3'>
                <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                    {dataFieldsRfi && dataFieldsRfi.length > 0 && dataFieldsRfi?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))?.map((item, index) => {
                        return item?.jns_dokumen === '05001' ? (
                            <li>
                                <hr />
                                <div className="timeline-middle">
                                    <IoCheckmarkCircleSharp className='text-2xl text-primary' />
                                </div>
                                <div className="timeline-start md:text-end gap-1">
                                    <time className="font-mono italic">{(item?.tgl_dokumen)}</time>
                                    <div className="text-base font-black flex flex-row gap-3 justify-end">
                                        <div className='btn btn-xs bg-primary text-white tooltip' data-tip='Download File' onClick={() => window.open(item?.url_dokumen, "_blank")}><IoDownloadOutline className='text-xl' /></div>
                                        <div className='btn btn-xs bg-red-500 text-white tooltip items-center flex' data-tip='Delete' onClick={(e) => handleRemoveFieldRfi(e, index)}><IoMdTrash /></div> Request for RFI
                                    </div>
                                    <div className='text-base text-gray-500 font-semibold'>{item?.no_dokumen}</div>
                                </div>
                                <hr />
                            </li>
                        ) : item?.jns_dokumen === '05002' ? (
                            <li>
                                <div className="timeline-middle">
                                    <IoCheckmarkCircleSharp className='text-2xl text-primary' />
                                </div>
                                <div className="timeline-end">
                                    <time className="font-mono italic">{(item?.tgl_dokumen)}</time>
                                    <div className="text-base font-black flex flex-row gap-3 justify-start">Response for RFI <div className='btn btn-xs bg-red-500 text-white tooltip items-center flex' data-tip='Delete' onClick={(e) => handleRemoveFieldRfi(e, index)}><IoMdTrash /></div> <div className='btn btn-xs bg-primary text-white tooltip' data-tip='Download File' onClick={() => window.open(item?.url_dokumen, "_blank")}><IoDownloadOutline className='text-xl' /></div></div>
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
                                    <div className="text-base font-black flex flex-row gap-3 justify-start">Response for RFI (Final)<div className='btn btn-xs bg-red-500 text-white tooltip items-center flex' data-tip='Delete' onClick={(e) => handleRemoveFieldRfi(e, index)}><IoMdTrash /></div> <div className='btn btn-xs bg-primary text-white tooltip' data-tip='Download File' onClick={() => window.open(item?.url_dokumen, "_blank")}><IoDownloadOutline className='text-xl' /></div></div>
                                    <div className='text-base text-gray-500 font-semibold'>{item?.no_dokumen}</div>
                                </div>
                                <hr />
                            </li>
                        )
                    }
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Rfi