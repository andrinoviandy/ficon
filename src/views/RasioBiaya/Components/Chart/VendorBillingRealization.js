import storeSchema from 'global/store';
import React, { useEffect, useState } from 'react'
import { IoStatsChartOutline } from 'react-icons/io5';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const VendorBillingRealization = ({ yearArea, setYearArea, formatRupiahForArea }) => {
    const [dataArea, setDataArea] = useState([]);
    const getDataAreaChart = async () => {
        try {
            const res = await storeSchema.actions.getDataAreaChart(yearArea, 'vendor')
            if (res?.status) {
                setDataArea(res?.data)
            } else {
                setDataArea([])
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDataAreaChart()
    }, [yearArea])
    return (
        <>
            <div className='py-5 px-5 flex justify-between items-center'>
                <span className='font-bold text-lg flex flex-row align-content-center items-center gap-2'>
                    <IoStatsChartOutline className='w-6 h-6 text-yellow-600' /> <div className='text-primary'>Vendor Billing Realization</div>
                </span>
                <div className=''>
                    <input
                        type="number" placeholder="YYYY"
                        value={yearArea}
                        className='w-[80px] bg-white p-2 border border-gray-300 rounded-md input-sm'
                        onChange={(e) => {
                            const selectedValue = e.target.value; // yyyy
                            setYearArea(selectedValue);
                        }}
                    />
                </div>
            </div>
            <div className='border-t-4 p-0 m-0'></div>
            <div className='w-full flex flex-col h-vh overflow-auto'>
                <div className='flex flex-row gap-3 justify-end px-4 pt-2'>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='w-3 h-3 rounded-sm bg-[#8884d8]'></div>
                        <div>Belum Realisasi</div>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='w-3 h-3 rounded-sm bg-[#82ca9d]'></div>
                        <div>Sudah Realisasi</div>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={360} className={"overflow-auto"}>
                    <AreaChart data={dataArea}
                        margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="name"
                        />
                        <YAxis
                            tickFormatter={formatRupiahForArea}
                        />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip
                            formatter={(value) => {
                                return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
                            }
                            }
                        />
                        <Area type="monotone" dataKey="belum_realisasi" name="Belum Realisasi" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="sudah_realisasi" name="Sudah Realisasi" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default VendorBillingRealization