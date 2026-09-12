import React, { useEffect, useState } from 'react'
import {
  FaChartLine,
  FaUsers,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaCalculator,
  FaBriefcase,
  FaUniversity,
  FaUserTie,
  FaWallet,
  FaTasks,
  FaCheckCircle,
  FaExclamationTriangle,
} from 'react-icons/fa'

// =========================
// COLOR BY SLA ACHIEVEMENT
// =========================
const getColorByAchievement = (achievement) => {
  if (achievement > 90) {
    return 'green'
  }

  if (achievement >= 80 && achievement <= 90) {
    return 'amber'
  }

  return 'red'
}

const colorMap = {
  green: {
    text: 'text-green-600',
    bg: 'bg-green-100',
    border: 'border-green-500',
    ring: 'stroke-green-500',
    gradient: 'from-green-500 to-emerald-600',
    soft: 'from-green-50 to-white',
  },

  amber: {
    text: 'text-amber-500',
    bg: 'bg-amber-100',
    border: 'border-amber-500',
    ring: 'stroke-amber-500',
    gradient: 'from-yellow-400 to-orange-500',
    soft: 'from-amber-50 to-white',
  },

  red: {
    text: 'text-red-500',
    bg: 'bg-red-100',
    border: 'border-red-500',
    ring: 'stroke-red-500',
    gradient: 'from-red-500 to-rose-600',
    soft: 'from-red-50 to-white',
  },
}

// =========================
// CIRCULAR PROGRESS
// =========================
const CircularProgress = ({ percent, color }) => {
  const radius = 28

  const circumference = 2 * Math.PI * radius

  const strokeDashoffset =
    circumference - (percent / 100) * circumference

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width="70"
        height="70"
        className="rotate-[-90deg]"
      >
        <circle
          cx="35"
          cy="35"
          r={radius}
          strokeWidth="6"
          className="stroke-gray-200"
          fill="transparent"
        />

        <circle
          cx="35"
          cy="35"
          r={radius}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${colorMap[color].ring} transition-all duration-500`}
        />
      </svg>

      <div className="absolute text-center">
        <div
          className={`text-sm font-bold ${colorMap[color].text}`}
        >
          {percent}%
        </div>
      </div>
    </div>
  )
}

const SkeletonCard = () => (
  <div className="relative min-w-[300px] overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-sm animate-pulse">

    {/* Header */}
    <div className="mb-5 flex items-start justify-between">

      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-gray-200" />

        <div>
          <div className="h-4 w-36 rounded bg-gray-200" />
          <div className="mt-2 h-3 w-20 rounded bg-gray-100" />
        </div>
      </div>

      <div className="h-[70px] w-[70px] rounded-full bg-gray-200" />
    </div>

    {/* Footer */}
    <div className="grid grid-cols-3 gap-3">

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="rounded-2xl border bg-gray-50 p-3 text-center"
        >
          <div className="mx-auto h-9 w-9 rounded-xl bg-gray-200" />

          <div className="mx-auto mt-3 h-6 w-10 rounded bg-gray-200" />

          <div className="mx-auto mt-2 h-3 w-14 rounded bg-gray-100" />
        </div>
      ))}

    </div>
  </div>
)

const KPIPerformanceCard = ({ data, handleChangeFilterKPI, filterKPI, loading }) => {
  const [kpiData, setKpiData] = useState([])
  const getIcon = (role_id) => {
    const iconMap = {
      RL00: <FaUserTie />,          // Super Admin
      RL01: <FaUsers />,            // Pemohon
      RL02: <FaUserTie />,          // Atasan Pemohon
      RL03: <FaUsers />,            // Unit SDM & Umum
      RL04: <FaClipboardCheck />,   // Unit Logistik
      RL05: <FaMoneyBillWave />,    // Unit Pajak
      RL06: <FaChartLine />,        // Unit Financial Controller
      RL07: <FaUniversity />,       // Unit Akuntansi Kantor Pusat
      RL08: <FaCalculator />,       // Unit Anggaran
      RL09: <FaWallet />,           // Unit Keuangan Treasury
      RL10: <FaBriefcase />,        // Manajer Keuangan
      RL11: <FaUserTie />,          // Direktur Keuangan, Manrisk & SDM
      RL13: <FaUsers />,            // Manajer SDM
      RL14: <FaWallet />,           // Kasir
      RL15: <FaMoneyBillWave />,    // Pembayaran
    }

    return iconMap[role_id] || <FaTasks />
  }

  useEffect(() => {
    if (data.length > 0) {
      const result = data?.map(item => {
        return {
          title: item?.nama_role,
          totalTask: item?.task,
          onSla: item?.on_sla,
          overSla: item?.over_sla,
          icon: getIcon(item?.role_id),
        }
      })
      setKpiData(result)
    } else {
      const dataDummy = [
        {
          title: 'Sub Unit SDM & Umum',
          totalTask: 0,
          onSla: 0,
          overSla: 0,
          icon: <FaUsers />,
        },

        {
          title: 'Sub Unit Logistik',
          totalTask: 0,
          onSla: 0,
          overSla: 0,
          icon: <FaClipboardCheck />,
        },

        {
          title: 'Sub Unit Pajak',
          totalTask: 0,
          onSla: 0,
          overSla: 0,
          icon: <FaMoneyBillWave />,
        },

        {
          title: 'Sub Unit Financial Controller',
          totalTask: 0,
          onSla: 0,
          overSla: 0,
          icon: <FaChartLine />,
        },

        {
          title: 'Sub Unit Akuntansi Kantor Pusat',
          totalTask: 0,
          onSla: 0,
          overSla: 0,
          icon: <FaUniversity />,
        },

        {
          title: 'Sub Unit Anggaran',
          totalTask: 0,
          onSla: 0,
          overSla: 0,
          icon: <FaCalculator />,
        },

        {
          title: 'Manager Keuangan',
          totalTask: 0,
          onSla: 0,
          overSla: 0,
          icon: <FaBriefcase />,
        },

        {
          title: 'Direktur Keuangan, Manrisk & SDM',
          totalTask: 0,
          onSla: 0,
          overSla: 0,
          icon: <FaUserTie />,
        },

        {
          title: 'Sub Unit Keuangan Treasury',
          totalTask: 0,
          onSla: 0,
          overSla: 0,
          icon: <FaWallet />,
        },
      ]
      setKpiData(dataDummy)
    }
  }, [data])

  // =========================
  // FINAL DATA WITH SLA
  // =========================
  const finalData = kpiData.sort((a, b) => (a.onSla / a.totalTask * 100) - (b.onSla / b.totalTask * 100)).map((item) => {

    const slaAchievement = Math.round(
      (item.onSla / item.totalTask) * 100
    )

    return {
      ...item,
      slaAchievement,
      color: getColorByAchievement(slaAchievement),
    }

  })

  return (
    <div className="w-full rounded-2xl border border-gray-300 bg-white p-5 shadow-sm">

      {/* HEADER */}
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-2">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <FaChartLine />
          </div>

          <div>

            <h2 className="text-lg font-bold text-gray-800">
              SLA PERFORMANCE ROLE
            </h2>

            <p className="text-xs text-gray-500">
              Monitoring SLA Unit Kerja
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-2">

          {/* <div
            className="
              rounded-xl
              bg-blue-50
              border border-blue-200
              px-4 py-2
            "
          >

            <div className="text-[11px] text-blue-600 font-semibold">
              SLA TARGET
            </div>

            <div className="text-sm font-bold text-blue-900">
              2 Hari
            </div>

          </div> */}

          <input
            type="month"
            name='periode'
            onChange={handleChangeFilterKPI}
            value={filterKPI?.periode}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
          />

        </div>

      </div>

      {/* INFO RULE */}
      <div
        className="
          mb-6
          rounded-2xl
          border border-gray-200
          bg-gray-50
          p-4
        "
      >

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

          <div className="rounded-xl bg-white p-3 border">

            <div className="text-sm font-bold text-gray-700">
              On SLA
            </div>

            <div className="mt-1 text-xs text-gray-500">
              Processing Time &lt; 2 Hari
            </div>

          </div>

          <div className="rounded-xl bg-white p-3 border">

            <div className="text-sm font-bold text-gray-700">
              Over SLA
            </div>

            <div className="mt-1 text-xs text-gray-500">
              Processing Time &gt; 2 Hari
            </div>

          </div>

          <div className="rounded-xl bg-white p-3 border">

            <div className="text-sm font-bold text-gray-700">
              SLA Achievement
            </div>

            <div className="mt-1 text-xs text-gray-500">
              (On SLA / Total Task) x 100%
            </div>

          </div>

        </div>

      </div>

      {/* KPI GRID */}
      <div className="flex flex-row overflow-auto gap-4 pb-3">
        {
          loading
            ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
            :
            finalData.map((item, index) => (

              <div
                key={index}
                className={`
              relative overflow-hidden
              group rounded-3xl border
              bg-gradient-to-br ${colorMap[item.color].soft}
              p-5 shadow-sm
              transition-all duration-300
              hover:shadow-xl 
              min-w-[300px]
              ${colorMap[item.color].border}
            `}
              >

                {/* BIG BACKGROUND ICON */}
                <div
                  className={`
                absolute bottom-[-25px] right-[-15px]
                text-[170px]
                opacity-[0.7]
                pointer-events-none
                ${colorMap[item.color].text}
              `}
                >
                  {item.icon}
                </div>

                {/* TOP */}
                <div className="relative z-10 mb-5 flex items-start justify-between gap-3">

                  <div className="flex-1">

                    <div className="mb-3 flex items-center gap-3">

                      <div
                        className={`
                      flex h-11 w-11 items-center justify-center
                      rounded-2xl
                      ${colorMap[item.color].bg}
                      ${colorMap[item.color].text}
                    `}
                      >

                        {item.icon}

                      </div>

                      <div>

                        <h3 className="text-sm font-bold leading-snug text-gray-700">
                          {item.title}
                        </h3>

                        <p className="text-[11px] text-gray-500">
                          SLA Achievement
                        </p>

                      </div>

                    </div>

                    {/* <div className="flex items-end gap-2">

                  <h1
                    className={`
                      text-4xl font-extrabold
                      ${colorMap[item.color].text}
                    `}
                  >

                    {item.slaAchievement}%

                  </h1>

                  <span className="mb-1 text-xs text-gray-500">
                    SLA Achievement
                  </span>

                </div> */}

                  </div>

                  <CircularProgress
                    percent={item.slaAchievement || 0}
                    color={item.color}
                  />

                </div>

                {/* TASK INFO */}
                <div className="relative z-10 grid grid-cols-3 gap-3">

                  {/* TOTAL TASK */}
                  <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-3 text-center">

                    <div className="mb-2 flex justify-center">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <FaTasks />
                      </div>

                    </div>

                    <h4 className="text-lg font-bold text-gray-700">
                      {item.totalTask}
                    </h4>

                    <p className="mt-1 text-[11px] text-gray-500">
                      Total Task
                    </p>

                  </div>

                  {/* ON SLA */}
                  <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-3 text-center">

                    <div className="mb-2 flex justify-center">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-600">
                        <FaCheckCircle />
                      </div>

                    </div>

                    <h4 className="text-lg font-bold text-green-600">
                      {item.onSla}
                    </h4>

                    <p className="mt-1 text-[11px] text-gray-500">
                      On SLA
                    </p>

                  </div>

                  {/* OVER SLA */}
                  <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-3 text-center">

                    <div className="mb-2 flex justify-center">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-600">
                        <FaExclamationTriangle />
                      </div>

                    </div>

                    <h4 className="text-lg font-bold text-red-600">
                      {item.overSla}
                    </h4>

                    <p className="mt-1 text-[11px] text-gray-500">
                      Over SLA
                    </p>

                  </div>

                </div>

              </div>

            ))
        }
      </div>

    </div>
  )
}

export default KPIPerformanceCard