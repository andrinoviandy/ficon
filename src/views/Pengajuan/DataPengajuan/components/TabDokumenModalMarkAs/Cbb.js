import { swal } from 'global/helper/swal';
import storeSchema from 'global/store';
import React, { useRef, useState, useEffect } from 'react'
import { AiOutlineSave } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { RxPlusCircled } from 'react-icons/rx';

const Cbb = ({ dummyField, dataFields, setDataFields, getDetailProject, project_id }) => {
    const headerTable = ['Jenis Dokumen', 'Attachment Dokumen']
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [optJenisDok, setOptJenisDok] = useState([]);

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

    const handleChange = (e, i) => {
        const values = [...dataFields];
        values[i][e.target.name] = e.target.value;
        setDataFields(values);
    };

    const handleUpload = async (e, i) => {
        e.preventDefault();
        try {
            swal.loading();
            const value = dataFields[i];
            const payload = {
                tipe_dokumen: "04", // dokumen cbb
                no_dokumen: value?.no_dokumen,
                tgl_dokumen: value?.tgl_dokumen?.substring(0, 10),
                jns_dokumen: value?.jns_dokumen,
                project_id: project_id,
            };

            const formData = new FormData();
            formData.append("payload", JSON.stringify(payload));
            formData.append("lampiran", file);

            const res = await storeSchema.actions.uploadDokumen(formData);
            if (res?.status === true) {
                getDetailProject(project_id)
                await swal.success(res?.data?.keterangan);
            } else {
                await swal.custom('Tidak Dapat Disimpan !', res?.message, 'error');
            };
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
            } else {
                values.splice(i, 1);
                setDataFields(values);
            };
            getDetailProject(project_id)
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

    useEffect(() => {
        setOptJenisDok([{
            label: "CBB",
            value: "04001"
        }]);
    }, [])

    return (
        <div className='mb-5'>
            <div className='max-h-64 overflow-auto mt-2'>
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
                                <td className='min-w-1/5'>
                                    <select
                                        name={"jns_dokumen"}
                                        className='select select-sm w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                                        onChange={(e) => handleChange(e, index)}
                                        value={item?.jns_dokumen}
                                        disabled={item?.status?.canDelete}
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
                                            value={"Open Dokumen CBB"}
                                            onClick={() => window.open(item?.url_dokumen, "_blank")}
                                        />
                                    ) : (
                                        <input
                                            type="file"
                                            name={"upload_dokumen"}
                                            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
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
                                    {(
                                        //   (isVendorRealization || isBillingRealization) ||
                                        //   (data?.FLAG_EDIT && (isDetailModalAkselerasi !== true))
                                        // ) && (
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
            <div type="button" disabled={(dataFields.length) === 1 ? true : false} className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-60 ' onClick={handleAddField}>
                <RxPlusCircled size='20px' /> Add Dokumen
            </div>
        </div>
    )
}

export default Cbb