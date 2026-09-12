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
  FaMoneyBillWave,
  FaPeopleArrows,
  FaTruck,
  FaUserTie,
  FaWallet,
  FaSmileBeam,
  FaSadTear,
  FaPercentage,
} from 'react-icons/fa'


const SLAPerformanceCard = ({ data, dispatch, setToggleModal }) => {
  const slaCards = [
    {
      title: 'SLA ACHIEVEMENT',
      tipe_card: 'sla_achievement',
      value: (data?.sla_achievement || 0) + '%',
      subtitle: 'Target ≥ 90%',
      icon: <FaCheckCircle />,
      bgIcon: <FaPercentage />,
      color: 'blue',
      line: 'from-blue-300 to-blue-500',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-500',
      bigIcon: 'text-blue-100',
      soft: 'from-blue-300 to-blue-100',
    },
    {
      title: 'ON SLA',
      tipe_card: 'on_sla',
      value: (data?.on_sla || '0') + ' Data',
      subtitle: 'Target ≤ 2 Hari',
      icon: <FaClock />,
      bgIcon: <FaSmileBeam />,
      color: 'green',
      line: 'from-green-300 to-green-500',
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-500',
      bigIcon: 'text-green-100',
      soft: 'from-green-300 to-green-100',
    },
    {
      title: 'OVER SLA',
      tipe_card: 'over_sla',
      value: (data?.over_sla || '0') + ' Data',
      subtitle: 'Target > 2 Hari',
      icon: <FaExclamationCircle />,
      bgIcon: <FaSadTear />,
      color: 'red',
      line: 'from-red-300 to-red-500',
      bg: 'bg-red-50',
      text: 'text-red-500',
      border: 'border-red-500',
      bigIcon: 'text-red-100',
      soft: 'from-red-300 to-red-100',
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
  return (
    <div className="w-full rounded-2xl border border-gray-300 bg-white p-4 shadow-sm">

      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <FaChartLine />
          </div>

          <div>

            <h2 className="text-lg font-bold text-gray-800">
              SLA OVERVIEW
            </h2>

            <p className="text-xs text-gray-500">
              Overview SLA Seluruh Biaya
            </p>

          </div>

        </div>

        {/* <input
          type="month"
          className="rounded-lg border border-gray-300 px-3 py-1 text-xs outline-none"
        /> */}

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

      <div className="flex flex-col overflow-auto gap-5 pb-3">

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
              bg-gradient-to-b ${card.soft} 
              ${card.tipe_card === 'sla_achievement' ? 'pointer-events-none' : 'cursor-pointer'}
            `}
            onClick={() =>
              dispatch(setToggleModal({ isOpen: true, modal: "modalSLA", tipe_card: card.tipe_card, payload: { tipe_card: card.tipe_card } }))
            }
          >

            {/* BACKGROUND ICON */}
            <div
              className={`
                absolute
                bottom-[-30px]
                left-[-10px]
                text-[150px]
                font-black
                opacity-0.1
                ${card.bigIcon}
              `}
            >
              {card.bgIcon}
            </div>

            {/* HEADER */}
            <div className="relative z-10 flex items-start justify-between">

              <div>

                <p className="text-[12px] font-bold tracking-wide text-gray-500 uppercase">
                  {card.title}
                </p>

                <h1 className={`text-2xl font-extrabold mt-1 ${card.text}`}>
                  {card.value}
                </h1>

                <p className="text-sm text-gray-500 mt-1">
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
            {/* <div className="relative z-10">
              <MiniLineChart color={card.text} />
            </div> */}

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