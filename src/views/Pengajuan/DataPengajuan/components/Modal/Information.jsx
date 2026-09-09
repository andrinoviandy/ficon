import React from 'react'
import { IoReceiptOutline, IoNewspaperOutline, IoPricetagsOutline, IoPersonOutline, IoPlayOutline, IoStopOutline, IoShieldCheckmarkOutline, IoDocumentsOutline, IoReaderOutline } from 'react-icons/io5'
import { formatCurrency } from 'global/helper/formatCurrency';
import format from 'date-fns/format';

const Information = ({ data, tableDataModal }) => {
    const headerTableBAMK = ["No BAMK", "Tanggal BAMK", "Attachment BAMK"];
    const headerTableDokPendukung = ["Nomor Dokumen", "Klasifikasi Dokumen", "Attachment Dokumen Pendukung"];

    return (
        <>
            <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-y-3 mb-4 text-sm'>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoNewspaperOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Nomor Kontrak</div>
                        <div className='text-gray'>{data?.CONTRACT_NO || '-'}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoReceiptOutline className='rotate-180' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Nilai Kontrak</div>
                        <div className='text-gray'>{formatCurrency(data?.NILAI_KONTRAK, 0)}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoReceiptOutline className='rotate-180' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Nilai Penawaran</div>
                        <div className='text-gray'>{formatCurrency(data?.NILAI_PENAWARAN, 0)}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoReceiptOutline className='rotate-180' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>COGS</div>
                        <div className='text-gray'>{formatCurrency(data?.COGS, 0)}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoReceiptOutline className='rotate-180' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Nilai Gross Margin Kontrak (20%)</div>
                        <div className='text-gray'>{formatCurrency(data?.MARGIN_KONTRAK, 0)}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoReceiptOutline className='rotate-180' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Nilai Gross Margin Penawaran (20%)</div>
                        <div className='text-gray'>{formatCurrency(data?.MARGIN_PENAWARAN, 0)}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoPersonOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Nama Customer</div>
                        <div className='text-gray'>{data?.CUSTOMER_NAME || '-'}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoPricetagsOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Category</div>
                        <div className='text-gray'>{data?.CATEGORY_UR || '-'}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoShieldCheckmarkOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>SPUC</div>
                        <div className='text-gray'>{data?.UR_AREA}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoPlayOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>Start Project</div>
                        <div className='text-gray'>{data?.CONTRACT_START}</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className='p-1 rounded bg-gray-100'>
                            <IoStopOutline />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='font-bold'>End Project</div>
                        <div className='text-gray'>{data?.CONTRACT_END}</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col bg-gray-100 p-4 rounded-lg gap-4 mb-5'>
                <div className='flex flex-row font-bold gap-2 mb-2'>
                    <div className='border rounded'>
                        <div className='p-1 bg-gray-100'>
                            <IoReaderOutline />
                        </div>
                    </div>
                    <div>BAMK</div>
                </div>
                <div className='overflow-auto min-w-content'>
                    <table className='table table-md bg-white rounded-lg text-left mb-4'>
                        <thead >
                            <tr>
                                {headerTableBAMK?.map((header, i) => {
                                    return (
                                        <th key={i} className='border-b-2 px-4 py-2 text-sm'>
                                            {header}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableDataModal?.DOKUMEN_BAMK?.length > 0 ? tableDataModal?.DOKUMEN_BAMK?.map((v, i) => {
                                return (
                                    <>
                                        <tr key={i}>
                                            <td>{v.NO_DOKUMEN || '-'}</td>
                                            <td>{format(new Date(v.TGL_DOKUMEN.substring(0,10)),'dd/MM/yyyy') || '-'}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name={"upload_dokumen"}
                                                    className='input input-sm input-bordered text-center rounded-[25px] w-full bg-primary text-white cursor-pointer'
                                                    value={"Open Dokumen BAMK"}
                                                    onClick={() => window.open(v?.URL_DOKUMEN, "_blank")}
                                                />
                                            </td>
                                        </tr>
                                    </>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={headerTableBAMK?.length}>
                                        <div className='flex justify-center items-center'>
                                            No Data to Display
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='flex flex-col bg-gray-100 p-4 rounded-lg gap-4'>
                <div className='flex flex-row font-bold gap-2 mb-2'>
                    <div className='border rounded'>
                        <div className='p-1 bg-gray-100'>
                            <IoDocumentsOutline />
                        </div>
                    </div>
                    <div>Dokumen Pendukung</div>
                </div>
                <div className='overflow-auto min-w-content'>
                    <table className='table table-md bg-white rounded-lg text-left mb-4'>
                        <thead >
                            <tr>
                                {headerTableDokPendukung?.map((header, i) => {
                                    return (
                                        <th key={i} className='border-b-2 px-4 py-2 text-sm'>
                                            {header}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {tableDataModal?.DOKUMEN_PENDUKUNG?.length > 0 ? tableDataModal?.DOKUMEN_PENDUKUNG?.map((v, i) => {
                                return (
                                    <>
                                        <tr key={i}>
                                            <td>{v.NO_DOKUMEN || '-'}</td>
                                            <td>{v.URAIAN_JENIS || '-'}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name={"upload_dokumen"}
                                                    className='input input-sm input-bordered text-center rounded-[25px] w-full bg-primary text-white cursor-pointer'
                                                    value={"Open Dokumen Pendukung"}
                                                    onClick={() => window.open(v?.URL_DOKUMEN, "_blank")}
                                                />
                                            </td>
                                        </tr>
                                    </>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={headerTableDokPendukung?.length}>
                                        <div className='flex justify-center items-center'>
                                            No Data to Display
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Information