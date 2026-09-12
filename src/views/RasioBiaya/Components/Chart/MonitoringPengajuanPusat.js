import React, { useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa';
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

const MonitoringPengajuanPusat = ({ dataX, dimensionScreenW, loading }) => {

  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);

  const [dataArea, setDataArea] = useState([]);

  // ✅ DUMMY DATA
  useEffect(() => {
    const dummy = dataX;

    setDataArea(dummy);
  }, [dataX]);

  const handleFilter = (tipe) => {
    dispatch(
      setToggleModal({
        isOpen: !toggleModal.isOpen,
        modal: "ModalFilter1"
      })
    );
  };

  console.log('setDataArea', dataArea);
  

  return (
    <div className='w-full rounded-xl bg-white shadow-md'>
      {/* HEADER */}
      <div className='py-5 px-5 flex justify-between items-center'>
        <span className='font-bold text-md flex items-center gap-2'>
          <IoStatsChartOutline className='w-6 h-6 text-blue-600' />
          <div className='text-blue-800'>Monitoring Pengajuan</div>
        </span>

        <div className='flex items-center gap-2 ml-5'>

          {/* CABANG */}
          {/* <select
            className='bg-white p-1 border border-gray-300 rounded-md text-sm w-28'
          // value={selectedCabang}
          // onChange={(e) => setSelectedCabang(e.target.value)}
          >
            <option value="">Semua Unit</option>
            <option value="pusat">Unit Pajak</option>
            <option value="jakarta">Unit Ficon</option>
            <option value="bandung">Unit Anggaran</option>
          </select> */}

          {/* PERIODE (MONTH PICKER) */}
          {/* <input
                type="month"
                className='bg-white p-2 border border-gray-300 rounded-md text-sm'
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              /> */}

          {/* <input
            type="number"
            placeholder="YYYY"
            value={yearArea}
            className='w-[70px] bg-white p-2 border border-gray-300 rounded-md input-sm'
            onChange={(e) => setYearArea(e.target.value)}
          /> */}
          <button className='btn btn-sm bg-blue-900 text-white' onClick={handleFilter}>
            <FaFilter />
          </button>
        </div>
      </div>

      <div className='border-t-4'></div>

      <div className='w-full flex flex-col overflow-auto'>

        {/* LEGEND */}
        <div className='flex flex-wrap gap-4 justify-end px-4 pt-2 text-xs'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-[#3498db] rounded-sm'></div>
            <div>Total Pengajuan</div>
          </div>

          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-[#2ecc71] rounded-sm'></div>
            <div>Sudah Dibayarkan</div>
          </div>

          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-[#f39c12] rounded-sm'></div>
            <div>Menunggu Verifikasi</div>
          </div>

          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-[#e74c3c] rounded-sm'></div>
            <div>Ditolak</div>
          </div>
        </div>

        {/* CHART */}
        <ResponsiveContainer 
        width="100%" 
        height={dimensionScreenW > 450 ? 428 : 330}
        // height="450px"
        >
          <AreaChart
            data={dataArea}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >

            <defs>
              <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3498db" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="c2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2ecc71" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="c3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f39c12" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f39c12" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="c4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e74c3c" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#e74c3c" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="bulan" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />

            {/* ✅ TOOLTIP SUDAH RAPI */}
            <Tooltip
              formatter={(value, name) => [
                new Intl.NumberFormat('id-ID').format(value),
                name
              ]}
            />

            {/* ✅ AREA DENGAN NAME */}
            <Area
              type="monotone"
              dataKey="total_pengajuan"
              name="Total Pengajuan"
              stroke="#3498db"
              fillOpacity={1}
              fill="url(#c1)"
            />

            <Area
              type="monotone"
              dataKey="sudah_dibayarkan"
              name="Sudah Dibayarkan"
              stroke="#2ecc71"
              fillOpacity={1}
              fill="url(#c2)"
            />

            <Area
              type="monotone"
              dataKey="menunggu_verifikasi"
              name="Menunggu Verifikasi"
              stroke="#f39c12"
              fillOpacity={1}
              fill="url(#c3)"
            />

            <Area
              type="monotone"
              dataKey="ditolak"
              name="Ditolak"
              stroke="#e74c3c"
              fillOpacity={1}
              fill="url(#c4)"
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>
    </div>
  )
}

export default MonitoringPengajuanPusat;