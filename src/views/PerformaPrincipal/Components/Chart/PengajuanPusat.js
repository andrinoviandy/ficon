import React, { useEffect, useState } from 'react'
import { IoBarChartOutline } from 'react-icons/io5';
import { FaFilter, FaProjectDiagram, FaTimesCircle } from 'react-icons/fa';

import {
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell
} from 'recharts';

import { useDispatch, useSelector } from 'react-redux';
import { setToggleModal } from '../../../../redux/n2n/global';

const PengajuanPusat = ({ loading, dataX }) => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);

  const handleClickCard1 = (tipe) => {
    dispatch(
      setToggleModal({
        isOpen: !toggleModal.isOpen,
        modal: "modalCard1",
        tipe_card: tipe
      })
    );
  };

  const handleFilter = (tipe) => {
    dispatch(
      setToggleModal({
        isOpen: !toggleModal.isOpen,
        modal: "ModalFilter1"
      })
    );
  };

  // ==========================
  // DUMMY DATA
  // ==========================
  const projectData = {
    pengajuan_baru: 120,
    menunggu_verifikasi: 80,
    sudah_dibayarkan: 40,
    ditolak: 25,
    menunggu_pembayaran: 60,
  };

  const [dataBar, setDataBar] = useState([]);

  useEffect(() => {

    const data = [
      {
        name: "Total Pengajuan",
        value: Number(dataX?.total),
        tipe: "total_pengajuan",
        color: '#1E3A8A',
      },
      {
        name: "Pengajuan Baru",
        value: Number(dataX?.pengajuan_baru),
        tipe: "pengajuan_baru",
        color: '#3498db',
      },
      {
        name: "Menunggu Verifikasi",
        value: Number(dataX?.menunggu_verifikasi),
        tipe: "menunggu_verifikasi",
        color: '#f39c12',
      },
      {
        name: "Sudah Dibayarkan",
        value: Number(dataX?.sudah_dibayarkan),
        tipe: "sudah_dibayarkan",
        color: '#2ecc71',
      },
      {
        name: "Ditolak",
        value: Number(dataX?.ditolak),
        tipe: "ditolak",
        color: '#e74c3c',
      },
      {
        name: "Menunggu Pembayaran",
        value: Number(dataX?.menunggu_pembayaran),
        tipe: "menunggu_pembayaran",
        color: '#9b59b6',
      },
    ];

    setDataBar(data);

  }, [dataX]);

  // ==========================
  // TOTAL
  // ==========================
  const totalProject = dataBar.reduce((acc, item) => acc + item.value, 0);

  // ==========================
  // % CALC
  // ==========================
  const getPercent = (value) => {
    if (!totalProject) return 0;
    return ((value / totalProject) * 100).toFixed(1);
  };

  return (
    <div className='rounded-xl shadow-md w-full bg-white lg:h-full'>

      {/* HEADER */}
      <div className='py-5 px-5 flex justify-between items-center'>

        <span className='font-bold text-md flex items-center gap-2'>
          <IoBarChartOutline className='w-6 h-6 text-blue-600' />

          <div className='text-blue-800'>
            Grafik Pengajuan
          </div>
        </span>

        {/* FILTER */}
        <div className='flex items-center gap-2 ml-5'>

          {/* CABANG */}
          {/* <select
            className='bg-white p-1 border border-gray-300 rounded-md text-sm w-[100px]'
          >
            <option value="">Semua Unit</option>
            <option value="pusat">Unit Pajak</option>
            <option value="jakarta">Unit Ficon</option>
            <option value="bandung">Unit Anggaran</option>
          </select> */}

          {/* YEAR */}
          {/* <input
            type="number"
            placeholder="YYYY"
            value={yearArea}
            className='w-[80px] bg-white p-2 border border-gray-300 rounded-md input-sm'
            onChange={(e) => setYearArea(e.target.value)}
          /> */}
          {/* <input
            type="month"
            className="rounded-lg border border-gray-300 px-3 py-1 text-xs outline-none"
          /> */}
          <button className='btn btn-sm bg-blue-900 text-white' onClick={handleFilter}>
            <FaFilter />
          </button>
        </div>

      </div>

      <div className='border-t-4 p-0 m-0'></div>

      {/* ==========================
          TOTAL CARD
      ========================== */}
      {/* <div className='px-5 pt-5'>
        {loading ? (
          <div className="animate-pulse rounded-2xl bg-gray-200 h-[88px]" />
        ) : (
          <div
            className='relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg cursor-pointer hover:scale-[1.01] transition'
            onClick={() => handleClickCard1("total_pengajuan")}
          >

            <FaProjectDiagram className='absolute right-[-10px] bottom-[-10px] text-white/10 text-8xl rotate-12' />

            <div className='relative z-10 flex justify-between items-center'>

              <div>

                <div className='text-sm text-white/80'>
                  Total Pengajuan
                </div>

                <div className='text-xs text-white/70 mt-1'>
                  Semua status pengajuan
                </div>

              </div>

              <div className='bg-white/20 backdrop-blur-md p-2 rounded-2xl text-2xl text-white font-semibold'>
                {totalProject || 0}
              </div>

            </div>

          </div>
        )}

      </div> */}

      {/* ==========================
          BAR CHART
      ========================== */}
      <div className='w-full flex flex-col overflow-auto items-center px-2 pt-5'>
        {loading ? (

          <div className="w-full h-[230px] animate-pulse px-5">

            <div className="flex items-end justify-around h-full">

              {[120, 70, 170, 90, 140].map((h, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-t-xl w-10"
                  style={{ height: h }}
                />
              ))}

            </div>

          </div>

        ) : (
          <ResponsiveContainer width="100%" height={230}>

            <BarChart
              data={dataBar}
              margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
            >

              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              {/* <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
            /> */}

              <YAxis />

              {/* TOOLTIP */}
              <Tooltip
                labelFormatter={() => ""}
                formatter={(value) => [
                  `${value} (${getPercent(value)}%)`,
                  "Jumlah"
                ]}
              />

              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
                cursor="pointer"
                barSize={40}
                onClick={(data) => handleClickCard1(data?.tipe)}
              >

                {dataBar.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))}

              </Bar>

            </BarChart>

          </ResponsiveContainer>
        )}

        {/* ==========================
            LEGEND
        ========================== */}
        <div className='mb-5 mt-2 w-full px-3'>
          {loading ? (

            <div className="grid grid-cols-2 gap-2">

              {Array.from({ length: 5 }).map((_, i) => (

                <div
                  key={i}
                  className={`animate-pulse rounded-xl bg-gray-100 p-3 ${i === 4 ? "col-span-2" : ""
                    }`}
                >

                  <div className="flex justify-between">

                    <div className="space-y-2">

                      <div className="h-3 w-24 bg-gray-200 rounded"></div>

                      <div className="h-2 w-14 bg-gray-200 rounded"></div>

                    </div>

                    <div className="h-4 w-8 bg-gray-200 rounded"></div>

                  </div>

                </div>

              ))}

            </div>

          ) : (
            <div className='grid grid-cols-2 gap-1'>

              {dataBar.map((v, i) => (

                <div
                  key={i}
                  // className={`flex items-start justify-between bg-gray-50 hover:bg-gray-100 rounded-xl px-3 py-2 cursor-pointer transition ${v?.tipe === 'menunggu_pembayaran' ? 'col-span-2' : ''}`}
                  className={`flex items-start justify-between bg-gray-50 hover:bg-gray-100 rounded-xl px-3 py-2 cursor-pointer transition`}
                  onClick={() => handleClickCard1(v?.tipe)}
                >

                  {/* LEFT */}
                  <div className='flex items-start gap-2'>

                    <div
                      className='w-3 h-3 rounded-sm flex-shrink-0 mt-1'
                      style={{ backgroundColor: v.color }}
                    />

                    <div className='flex flex-col leading-tight'>

                      <div className='text-xs font-semibold text-gray-700'>
                        {v.name}
                      </div>

                      <div className='text-[11px] text-gray-500 mt-1'>
                        {getPercent(v.value)}%
                      </div>

                    </div>

                  </div>

                  {/* VALUE */}
                  <div className='text-sm font-bold text-gray-700'>
                    {v.value}
                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default PengajuanPusat;