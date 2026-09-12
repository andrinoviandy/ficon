import React, { useEffect, useState } from 'react'
import { IoStatsChartOutline } from 'react-icons/io5';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const MonitoringPengajuanCabang = ({ yearArea, setYearArea, dimensionScreenW }) => {

  const [dataArea, setDataArea] = useState([]);

  // ✅ DUMMY DATA
  useEffect(() => {
    const dummy = [
      { name: "Jan", total_pengajuan: 120, sudah_dibayarkan: 80, menunggu_pembayaran: 30, ditolak: 10 },
      { name: "Feb", total_pengajuan: 150, sudah_dibayarkan: 90, menunggu_pembayaran: 40, ditolak: 20 },
      { name: "Mar", total_pengajuan: 180, sudah_dibayarkan: 120, menunggu_pembayaran: 40, ditolak: 20 },
      { name: "Apr", total_pengajuan: 200, sudah_dibayarkan: 140, menunggu_pembayaran: 40, ditolak: 20 },
      { name: "Mei", total_pengajuan: 170, sudah_dibayarkan: 110, menunggu_pembayaran: 40, ditolak: 20 },
      { name: "Jun", total_pengajuan: 220, sudah_dibayarkan: 160, menunggu_pembayaran: 40, ditolak: 20 },
      { name: "Jul", total_pengajuan: 250, sudah_dibayarkan: 180, menunggu_pembayaran: 50, ditolak: 20 },
      { name: "Agu", total_pengajuan: 230, sudah_dibayarkan: 170, menunggu_pembayaran: 40, ditolak: 20 },
      { name: "Sep", total_pengajuan: 210, sudah_dibayarkan: 150, menunggu_pembayaran: 40, ditolak: 20 },
      { name: "Okt", total_pengajuan: 260, sudah_dibayarkan: 200, menunggu_pembayaran: 40, ditolak: 20 },
      { name: "Nov", total_pengajuan: 280, sudah_dibayarkan: 220, menunggu_pembayaran: 40, ditolak: 20 },
      { name: "Des", total_pengajuan: 300, sudah_dibayarkan: 240, menunggu_pembayaran: 40, ditolak: 20 },
    ];

    setDataArea(dummy);
  }, []);

  return (
    <div className='w-full rounded-xl bg-white shadow-md'>
      {/* HEADER */}
      <div className='py-5 px-5 flex justify-between items-center'>
        <span className='font-bold text-md flex items-center gap-2'>
          <IoStatsChartOutline className='w-6 h-6 text-blue-600' />
          <div className='text-blue-800'>Monitoring Pengajuan Cabang</div>
        </span>

        <div className='flex items-center gap-2 ml-5'>

          {/* CABANG */}
          <select
            className='bg-white p-1 border border-gray-300 rounded-md text-sm'
          // value={selectedCabang}
          // onChange={(e) => setSelectedCabang(e.target.value)}
          >
            <option value="">Semua</option>
            <option value="pusat">Pusat</option>
            <option value="jakarta">Jakarta</option>
            <option value="bandung">Bandung</option>
            <option value="surabaya">Surabaya</option>
          </select>

          {/* PERIODE (MONTH PICKER) */}
          {/* <input
                type="month"
                className='bg-white p-2 border border-gray-300 rounded-md text-sm'
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              /> */}

          <input
            type="number"
            placeholder="YYYY"
            value={yearArea}
            className='w-[80px] bg-white p-2 border border-gray-300 rounded-md input-sm'
            onChange={(e) => setYearArea(e.target.value)}
          />
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
            <div>Menunggu Pembayaran</div>
          </div>

          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-[#e74c3c] rounded-sm'></div>
            <div>Ditolak</div>
          </div>
        </div>

        {/* CHART */}
        <ResponsiveContainer width="100%" height={dimensionScreenW > 450 ? 510 : 330}>
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

            <XAxis dataKey="name" />
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
              dataKey="menunggu_pembayaran"
              name="Menunggu Pembayaran"
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

export default MonitoringPengajuanCabang;