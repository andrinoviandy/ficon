import CurrencyInput from 'components/atoms/CurrencyInput';
import { swal } from 'global/helper/swal';
import storeSchema from 'global/store';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { RxPlusCircled } from 'react-icons/rx';

const Kontrak = ({ dataFields, setDataFields, getDetailProject, project_id, project_no }) => {
    const dummyField = {
        dokumen_id: "",
        tipe_dokumen: "03", // Dokumen Kontrak
        no_dokumen: "",
        tgl_dokumen: "",
        value_dok: "",
        notes: "",
        jns_dokumen: "",
        url_dokumen: "",
        status: {
            canUpload: true,
            canDelete: false,
        },
    };
    const headerTable = ['Nomor Kontrak', 'Tanggal Kontrak', 'Jenis Kontrak', 'Nilai Kontrak', 'Keterangan', 'Attachment Kontrak']
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

    const handleChangeCurrency = (value, name, index) => {
        const values = [...dataFields];
        values[index][name] = value;
        setDataFields(values);
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

            if (!value.value_dok.trim()) {
                swal.custom("Input Required", "Nilai Kontrak harus diisi!", "warning");
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
                project_id: project_id,
            };

            const formData = new FormData();
            formData.append("payload", JSON.stringify(payload));
            formData.append("lampiran", file);

            const res = await storeSchema.actions.uploadDokumen(formData);
            if (res?.status === true) {
                await storeSchema.actions.updateProject({
                    project_id: project_id,
                    project_no: project_no,
                    contract_no: value?.no_dokumen,
                    nilai_kontrak: value?.value_dok
                });

                await swal.success(res?.data?.keterangan);
            } else {
                await swal.custom('Tidak Dapat Disimpan !', res?.message, 'error');
            };
            getDetailProject(project_id)
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
        setDataFields([dummyField])
    }, [])

    return (
        <div className='mb-5'>
            <div className='overflow-auto mt-2'>
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
                                            if (item?.status?.canDelete) {
                                                return
                                            };
                                            handleChange(e, index)
                                        }}
                                        disabled={item?.status?.canDelete}
                                    />
                                </td>
                                <td className="w-[10%]">
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
                                        disabled={item?.status?.canDelete}
                                    />
                                </td>
                                <td className='min-w-[200px]'>
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
                                        disabled={item?.status?.canDelete}
                                    />
                                </td>
                                <td className="min-w-44">
                                    <input
                                        type="text"
                                        name={"notes"}
                                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                                        value={item?.notes}
                                        onChange={(e) => {
                                            if (item?.status?.canDelete) {
                                                return
                                            };
                                            handleChange(e, index)
                                        }}
                                        disabled={item?.status?.canDelete}
                                    />
                                </td>
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
            <div type="button" disabled={(dataFields?.filter(a => a.status.canUpload === true).length) === 1 ? true : false} className='btn btn-sm ml-3 rounded-[25px] border-none bg-blue-50 text-primary mt-3 w-60 ' onClick={handleAddField}>
                <RxPlusCircled size='20px' /> Add Dokumen
            </div>
        </div>
    )
}

export default Kontrak