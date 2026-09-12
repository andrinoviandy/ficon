import React, { useEffect, useState } from 'react'
import { FaBuilding, FaBullseye, FaChartLine, FaChartPie, FaFilter, FaTruck } from 'react-icons/fa';
import { IoStatsChartOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleModal } from '../../../../redux/n2n/global';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { formatCurrency } from 'global/helper/formatCurrency';

const OmsetCard = ({ dataOmset, dimensionScreenW, loading }) => {

  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);

  const handleFilter = (tipe) => {
    dispatch(
      setToggleModal({
        isOpen: !toggleModal.isOpen,
        modal: "ModalFilterOmset"
      })
    );
  };

  const summaryInfo = [
    {
      title: "Omset Cabang (YTD)",
      value: formatCurrency(dataOmset?.omset) || '-',
      icon: <FaBuilding />,
      bg: "bg-blue-100",
      text: "text-blue-700",
      valueColor: "text-blue-700"
    },
    {
      title: "Persentase Omset Terhadap Target",
      value: dataOmset?.persentase_omset_terhadap_target ? dataOmset?.persentase_omset_terhadap_target + "%" : '-',
      icon: <FaChartLine />,
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      valueColor: "text-emerald-700"
    },
    {
      title: "Target Omset (YTD)",
      value: formatCurrency(dataOmset?.target_omset) || '-',
      icon: <FaBullseye />,
      bg: "bg-indigo-100",
      text: "text-indigo-700",
      valueColor: "text-indigo-700"
    },
    {
      title: "Total Biaya",
      value: formatCurrency(dataOmset?.total_biaya) || '-',
      icon: <FaTruck />,
      bg: "bg-cyan-100",
      text: "text-cyan-700",
      valueColor: "text-cyan-700"
    },
    {
      title: "Rasio Biaya Terhadap Omset",
      value: dataOmset?.rasio_biaya ? dataOmset?.rasio_biaya + "%" : '-',
      icon: <FaChartPie />,
      bg: "bg-purple-100",
      text: "text-purple-700",
      valueColor: "text-purple-700"
    },
  ];

  return (
    <div className='flex flex-wrap lg:flex-nowrap w-full lg:gap-4 gap-y-6'>
      <div className='w-full p-5 rounded-2xl bg-white shadow-lg border border-gray-300'>
        <div className="">

          <div className="flex justify-between items-center gap-2 mb-3">

            <div className='flex gap-2 items-center'>
              <FaChartLine className="text-blue-700" />

              <h3 className="font-semibold text-gray-800">
                Informasi Omset & Rasio Biaya
              </h3>
            </div>
            <div className='flex items-center gap-2 ml-5'>
              <button className='btn btn-sm bg-blue-900 text-white' onClick={handleFilter}>
                <FaFilter />
              </button>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            {summaryInfo?.map((item, index) => (

              <div
                key={index}
                className={`
                            bg-white border rounded-2xl
                            p-4 shadow-sm hover:shadow-md
                            transition-all duration-300 
                            ${index === 4 ? 'lg:col-span-2' : ''}
                          `}
              >

                <div className="flex items-start gap-3">

                  <div
                    className={`
                                w-11 h-11 rounded-xl
                                flex items-center justify-center
                                ${item.bg}
                              `}
                  >

                    <div className={`${item.text}`}>
                      {item.icon}
                    </div>

                  </div>

                  <div className="flex-1">

                    <p className="text-[11px] uppercase text-gray-500 leading-relaxed">
                      {item.title}
                    </p>

                    <h3 className={`font-bold text-lg mt-1 ${item.valueColor}`}>
                      {item.value}
                    </h3>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>
      </div>
    </div>
  )
}

export default OmsetCard;