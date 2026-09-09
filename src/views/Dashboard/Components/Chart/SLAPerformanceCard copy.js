import React from 'react'
import {
  FaBalanceScale,
  FaCalculator,
  FaChartLine,
  FaChartPie,
  FaCheckCircle,
  FaClock,
  FaCoins,
  FaExclamationCircle,
  FaHourglassHalf,
  FaIdBadge,
  FaMoneyBillWave,
  FaPeopleArrows,
  FaTruck,
  FaUserTie,
  FaWallet,
} from 'react-icons/fa'

const slaData = [
  {
    title: 'Sub Unit SDM & Umum',
    percent: 92,
    color: 'green',
    avg: '1.2 Hari',
    over: 5,
    pending: 12,
    icon: <FaUserTie />,
    icon2: <FaPeopleArrows />,
  },
  {
    title: 'Sub Unit Logistik',
    percent: 81,
    color: 'amber',
    avg: '2.7 Hari',
    over: 18,
    pending: 20,
    icon: <FaUserTie />,
    icon2: <FaTruck />,
  },
  {
    title: 'Sub Unit Pajak',
    percent: 71,
    color: 'red',
    avg: '3.4 Hari',
    over: 22,
    pending: 15,
    icon: <FaUserTie />,
    icon2: <FaCalculator />,
  },
  {
    title: 'Sub Unit Financial Controller',
    percent: 95,
    color: 'green',
    avg: '1.1 Hari',
    over: 2,
    pending: 8,
    icon: <FaUserTie />,
    icon2: <FaBalanceScale />
  },
  {
    title: 'Sub Unit Akuntansi Kantor Pusat',
    percent: 88,
    color: 'purple',
    avg: '1.6 Hari',
    over: 4,
    pending: 10,
    icon: <FaUserTie />,
    icon2: <FaCoins />,
  },
  {
    title: 'Sub Unit Anggaran',
    percent: 84,
    color: 'amber',
    avg: '2.1 Hari',
    over: 7,
    pending: 14,
    icon: <FaUserTie />,
    icon2: <FaChartPie />,
  },
  {
    title: 'Manager Keuangan',
    percent: 97,
    color: 'green',
    avg: '0.9 Hari',
    over: 1,
    pending: 5,
    icon: <FaUserTie />,
    icon2: <FaUserTie />,
  },
  {
    title: 'Direktur Keuangan, Manrisk & SDM',
    percent: 90,
    color: 'purple',
    avg: '1.4 Hari',
    over: 3,
    pending: 7,
    icon: <FaUserTie />,
    icon2: <FaUserTie />,
  },
  {
    title: 'Sub Unit Keuangan Treasury',
    percent: 86,
    color: 'red',
    avg: '1.8 Hari',
    over: 6,
    pending: 11,
    icon: <FaUserTie />,
    icon2: <FaWallet />,
  },
]

const colorMap = {
  green: {
    text: 'text-green-600',
    bg: 'bg-green-100',
    border: 'border-green-500',
    ring: 'stroke-green-500',
    soft: 'from-green-50 to-white',
    glow: 'bg-green-500/10',
    bigIcon: 'text-green-200',
  },

  amber: {
    text: 'text-amber-500',
    bg: 'bg-amber-100',
    border: 'border-amber-500',
    ring: 'stroke-amber-500',
    soft: 'from-amber-50 to-white',
    glow: 'bg-amber-500/10',
    bigIcon: 'text-amber-200',
  },

  red: {
    text: 'text-red-500',
    bg: 'bg-red-100',
    border: 'border-red-500',
    ring: 'stroke-red-500',
    soft: 'from-red-50 to-white',
    glow: 'bg-red-500/10',
    bigIcon: 'text-red-200',
  },

  purple: {
    text: 'text-purple-500',
    bg: 'bg-purple-100',
    border: 'border-purple-500',
    ring: 'stroke-purple-500',
    soft: 'from-purple-50 to-white',
    glow: 'bg-purple-500/10',
    bigIcon: 'text-purple-200',
  },
}

const CircularProgress = ({ percent, color }) => {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset =
    circumference - (percent / 100) * circumference

  return (
    <svg
      width="70"
      height="70"
      className="absolute right-0 top-5 rotate-[-90deg]"
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
  )
}

const slaCards = [
  {
    title: 'SLA ACHIEVEMENT',
    value: '89%',
    subtitle: 'Target ≥ 90%',
    icon: <FaCheckCircle />,
    color: 'blue',
    line: 'from-blue-300 to-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-100',
  },
  {
    title: 'ON SLA',
    value: '52 Data',
    subtitle: 'Target ≤ 2 Hari',
    icon: <FaClock />,
    color: 'green',
    line: 'from-green-300 to-green-500',
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-100',
  },
  {
    title: 'OVER SLA',
    value: '32 Data',
    subtitle: 'Target > 2 Hari',
    icon: <FaExclamationCircle />,
    color: 'red',
    line: 'from-red-300 to-red-500',
    bg: 'bg-red-50',
    text: 'text-red-500',
    border: 'border-red-100',
  },
  // {
  //   title: 'PENDING > 2 HARI',
  //   value: '18',
  //   subtitle: 'Data',
  //   icon: <FaHourglassHalf />,
  //   color: 'orange',
  //   line: 'from-orange-300 to-orange-500',
  //   bg: 'bg-orange-50',
  //   text: 'text-orange-500',
  //   border: 'border-orange-100',
  // },
]

const MiniLineChart = ({ color }) => {
  return (
    <svg
      viewBox="0 0 200 40"
      className="w-full h-10 mt-4"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="
          M0 28
          C10 24, 20 32, 30 26
          S50 18, 60 20
          S80 14, 90 18
          S110 22, 120 16
          S140 30, 150 24
          S170 14, 180 18
          S190 20, 200 16
        "
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className={color}
      />
    </svg>
  )
}

const SLAPerformanceCard = () => {
  return (
    <div className="w-full rounded-2xl border border-red-300 bg-white p-4 shadow-sm">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <FaChartLine />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800">
              SLA PERFORMANCE
            </h2>

            <p className="text-xs text-gray-500">
              Monitoring sla performance seluruh unit
            </p>
          </div>
        </div>

        <input
          type="month"
          className="rounded-lg border border-gray-300 px-3 py-1 text-xs outline-none"
        />
      </div>

      {/* CARDS */}
      {/* <div className="flex flex-row gap-4 overflow-auto pb-3">
        {slaData.map((item, index) => (
          <div
            key={index}
            className={`
              relative overflow-hidden rounded-3xl border border-white/40
              bg-gradient-to-br ${colorMap[item.color].soft}
              p-4 shadow-lg backdrop-blur-sm transition-all
              min-w-[300px]
              hover:-translate-y-1 hover:shadow-2xl
            `}
          >
            <div
              className={`
                absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl
                ${colorMap[item.color].glow}
              `}
            />

            <div
              className={`
                absolute bottom-[-10px] right-[-10px]
                text-[200px] 
                ${colorMap[item.color].bigIcon}
              `}
            >
              {item.icon2}
            </div>

            <div className="relative z-10 mb-4 flex items-start justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div
                    className={`
                      flex h-8 w-8 items-center justify-center rounded-xl
                      ${colorMap[item.color].bg}
                      ${colorMap[item.color].text}
                      shadow-sm
                    `}
                  >
                    {item.icon}
                  </div>

                  <h3 className="text-xs font-bold text-gray-700">
                    {item.title}
                  </h3>
                </div>

                <h1
                  className={`text-4xl font-extrabold ${colorMap[item.color].text}`}
                >
                  {item.percent}%
                </h1>

                <p className="text-xs text-gray-500">
                  SLA Achievement
                </p>
              </div>

              <CircularProgress
                percent={item.percent}
                color={item.color}
              />
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-white/70 p-2 backdrop-blur-sm">
                <h4
                  className={`text-sm font-bold ${colorMap[item.color].text}`}
                >
                  {item.avg}
                </h4>

                <p className="text-[10px] text-gray-500">
                  Avg Processing
                </p>
              </div>

              <div className="rounded-xl bg-white/70 p-2 backdrop-blur-sm">
                <h4 className="text-sm font-bold text-gray-700">
                  {item.over}
                </h4>

                <p className="text-[10px] text-gray-500">
                  Over SLA
                </p>
              </div>

              <div className="rounded-xl bg-white/70 p-2 backdrop-blur-sm">
                <h4 className="text-sm font-bold text-gray-700">
                  {item.pending}
                </h4>

                <p className="text-[10px] text-gray-500">
                  Pending
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-4">
              <svg
                viewBox="0 0 100 20"
                className={`h-8 w-full ${colorMap[item.color].text}`}
                preserveAspectRatio="none"
              >
                <path
                  d="M0,15 L10,10 L20,12 L30,8 L40,13 L50,12 L60,16 L70,14 L80,18 L90,11 L100,15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="drop-shadow-sm"
                />
              </svg>
            </div>
          </div>
        ))}
      </div> */}
      <div className="flex flex-row justify-between overflow-auto pb-3 gap-5">

        {slaCards.map((card, index) => (
          <div
            key={index}
            className={`
            relative
            overflow-hidden
            rounded-3xl
            border
            ${card.border}
            bg-white
            p-5
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300 
            min-w-[310px]
          `}
          >

            {/* HEADER */}
            <div className="flex items-start justify-between">

              <div>

                <p className="text-[12px] font-bold tracking-wide text-gray-500 uppercase">
                  {card.title}
                </p>

                <h1 className={`text-2xl font-extrabold mt-3 ${card.text}`}>
                  {card.value}
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                  {card.subtitle}
                </p>

              </div>

              {/* ICON */}
              <div
                className={`
                w-16 h-16
                rounded-2xl
                flex items-center justify-center
                text-3xl
                shadow-inner
                ${card.bg}
                ${card.text}
              `}
              >
                {card.icon}
              </div>

            </div>

            {/* MINI CHART */}
            <MiniLineChart color={card.text} />

            {/* GLOW */}
            <div
              className={`
              absolute
              -top-10
              -right-10
              w-32
              h-32
              rounded-full
              blur-3xl
              opacity-10
              ${card.bg}
            `}
            />

          </div>
        ))}

      </div>
    </div>
  )
}

export default SLAPerformanceCard