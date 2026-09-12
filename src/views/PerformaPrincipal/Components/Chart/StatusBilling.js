import storeSchema from 'global/store';
import React, { useEffect, useState } from 'react'
import { HiOutlineChartPie } from 'react-icons/hi';
import { Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const StatusBilling = ({ yearArea, setYearArea }) => {
    const [dataRadial, setDataRadial] = useState({});

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border rounded shadow-md">
                    <p className="text-gray-700 font-semibold">{payload[0].payload.name}</p>
                    <p className="text-gray-600">Count : {payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    const getDataRadialChart = async () => {
        try {
            const res = await storeSchema.actions.getDataRadialChart(yearArea)
            if (res?.status) {
                const value = res?.data
                setDataRadial([
                    {
                        name: "Total",
                        uv: value?.total,
                        fill: "#8884d8"
                    },
                    {
                        name: "Submitted",
                        uv: value?.submit,
                        fill: "#83a6ed"
                    },
                    {
                        name: "Reject",
                        uv: value?.reject,
                        fill: "#8dd1e1"
                    },
                    {
                        name: "PYMAD",
                        uv: value?.pymad,
                        fill: "#82ca9d"
                    },
                    {
                        name: "Dok.Lengkap",
                        uv: value?.dokumen_lengkap,
                        fill: "#a4de6c"
                    },
                    {
                        name: "Invoice",
                        uv: value?.invoice,
                        fill: "#d0ed57"
                    },
                    {
                        name: "Paid",
                        uv: value?.paid,
                        fill: "#ffc658"
                    },
                ])
            } else {
                setDataRadial([])
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDataRadialChart()
    }, [yearArea])

    return (
        <>
            <div className='py-5 px-5 flex justify-between items-center'>
                <span className='font-bold text-lg flex flex-row align-content-center items-center gap-2'><HiOutlineChartPie className='w-6 h-6 text-orange-500' /> <div className='text-primary'>Status Billing</div></span>
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
            <div className='w-full flex flex-col overflow-auto items-center pt-10 pb-5'>
                <ResponsiveContainer width="100%" height={320} className={"relative"}>
                    <RadialBarChart
                        innerRadius="15%"
                        outerRadius="110%"
                        data={dataRadial}
                        startAngle={180}
                        endAngle={0}
                    >
                        <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' />
                        <Tooltip content={<CustomTooltip />} wrapperStyle={{ pointerEvents: 'auto', zIndex: 9999 }}/>
                    </RadialBarChart>
                    <div className='absolute bottom-0 left-0 flex justify-center w-full'>
                        <div className='mt-5 flex items-center'>
                            <div className='grid grid-cols-2 gap-5 justify-between text-sm'>
                                {dataRadial && dataRadial.length > 0 && dataRadial.map((v, i) => (
                                    <div className='flex flex-row items-center gap-2'>
                                        <div className={`w-3 h-3 rounded-sm`} style={{ backgroundColor: v.fill }}></div>
                                        <div>{v?.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default StatusBilling