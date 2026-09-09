import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import {
  FaFilter,
  FaSyncAlt,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaClock,
  FaExclamationTriangle,
  FaChartBar,
  FaBuilding,
  FaHospital,
  FaChevronDown,
  FaBox,
  FaBoxOpen,
} from 'react-icons/fa';


/* =========================================================
   DUMMY DATA
========================================================= */

const dummyCabang = [
  {
    cabang: 'KFTD Aceh',
    sudahJTO: 672232,
    belumJTO: 435284,
  },
  {
    cabang: 'KFTD Ambon',
    sudahJTO: 2390,
    belumJTO: 29175,
  },
  {
    cabang: 'KFTD Balikpapan',
    sudahJTO: 8637,
    belumJTO: 347876,
  },
  {
    cabang: 'KFTD Bandung',
    sudahJTO: 240812,
    belumJTO: 600963,
  },
  {
    cabang: 'KFTD Banjarmasin',
    sudahJTO: 99316,
    belumJTO: 1407,
  },
  {
    cabang: 'KFTD Batam',
    sudahJTO: 31710,
    belumJTO: 422056,
  },
  {
    cabang: 'KFTD Bekasi',
    sudahJTO: 49974,
    belumJTO: 177680,
  },
  {
    cabang: 'KFTD Bengkulu',
    sudahJTO: 248035,
    belumJTO: 839381,
  },
  {
    cabang: 'KFTD Bogor',
    sudahJTO: 4913,
    belumJTO: 423165,
  },
  {
    cabang: 'KFTD Cirebon',
    sudahJTO: 332240,
    belumJTO: 1045,
  },
  {
    cabang: 'KFTD Denpasar',
    sudahJTO: 292043,
    belumJTO: 1335,
  },
  {
    cabang: 'KFTD Jakarta 1',
    sudahJTO: 532683,
    belumJTO: 212824,
  },
  {
    cabang: 'KFTD Jakarta 2',
    sudahJTO: 162447,
    belumJTO: 1284,
  },
  {
    cabang: 'KFTD Jambi',
    sudahJTO: 133232,
    belumJTO: 650327,
  },
  {
    cabang: 'KFTD Jayapura',
    sudahJTO: 88458,
    belumJTO: 256925,
  },
  {
    cabang: 'KFTD Jember',
    sudahJTO: 95394,
    belumJTO: 760098,
  },
];


const principalData = [
  {
    name: 'BIOFARMA',
    aging: [
      21414027399,
      6524062171,
      1347084784,
      3528099402,
      4979031034,
      1637306721,
      2079533429,
    ],
  },
];


const cabangData = [
  {
    name: 'KFTD Sidoarjo',
    aging: [
      2475835293,
      683474181,
      161550817,
      1265188181,
      2851681554,
      91849376,
      0,
    ],
  },
  {
    name: 'KFTD Lampung',
    aging: [
      1295202335,
      938990987,
      21375050,
      93270026,
      151435471,
      125068019,
      11364091,
    ],
  },
  {
    name: 'KFTD Palembang',
    aging: [
      1207770647,
      329928692,
      55344893,
      97044963,
      214582301,
      90277258,
      0,
    ],
  },
  {
    name: 'KFTD Padang',
    aging: [
      1006315845,
      43592181,
      100577146,
      436544874,
      117010539,
      72576480,
      161361614,
    ],
  },
  {
    name: 'KFTD Serang',
    aging: [
      420704655,
      221824787,
      4700850,
      0,
      1217260202,
      123783,
      0,
    ],
  },
  {
    name: 'KFTD Pekanbaru',
    aging: [
      1045248219,
      188500719,
      137692535,
      23819490,
      70204184,
      131451565,
      92719242,
    ],
  },
  {
    name: 'KFTD Denpasar',
    aging: [
      889424024,
      213299648,
      40597046,
      227353068,
      237550029,
      18467625,
      0,
    ],
  },
  {
    name: 'KFTD Banjarmasin',
    aging: [
      1223866445,
      157156819,
      46899877,
      56884060,
      22404170,
      0,
      0,
    ],
  },
];


const channelData = [
  {
    name: 'RS Pemerintah',
    aging: [
      3129269771,
      2498027686,
      528701273,
      2223703610,
      2568653568,
      948311086,
      167597616,
    ],
  },
  {
    name: 'Dinkes',
    aging: [
      3493587444,
      1619547805,
      164280000,
      831442238,
      1796107382,
      343497475,
      294367443,
    ],
  },
  {
    name: 'Apotek',
    aging: [
      4650993320,
      725445423,
      161115935,
      108412985,
      180493309,
      55906899,
      136918636,
    ],
  },
  {
    name: 'RS Swasta',
    aging: [
      4266209468,
      767553032,
      186043539,
      74766825,
      41604150,
      5391212,
      16395040,
    ],
  },
  {
    name: 'Klinik',
    aging: [
      4169520911,
      473088482,
      69947671,
      34886322,
      171809594,
      16712305,
      267591521,
    ],
  },
  {
    name: 'RS BUMN',
    aging: [
      1035712428,
      179430769,
      142148599,
      161564613,
      33425892,
      11449928,
      6882044,
    ],
  },
  {
    name: 'KFD',
    aging: [
      0,
      0,
      0,
      0,
      0,
      98226676,
      950590497,
    ],
  },
  {
    name: 'RS Polri',
    aging: [
      213415184,
      14396478,
      15902039,
      25483800,
      54233688,
      0,
      0,
    ],
  },
  {
    name: 'PBF',
    aging: [
      234812372,
      85444470,
      0,
      0,
      0,
      0,
      0,
    ],
  },
  {
    name: 'Puskesmas',
    aging: [
      103006050,
      31813231,
      4521350,
      16951863,
      100360640,
      0,
      0,
    ],
  },
  {
    name: 'RS TNI',
    aging: [
      73587288,
      13111320,
      72424379,
      33262146,
      28839124,
      2289986,
      17797504,
    ],
  },
  {
    name: 'PBF Terpusat',
    aging: [
      0,
      0,
      0,
      0,
      0,
      0,
      221293128,
    ],
  },
  {
    name: 'Lembaga',
    aging: [
      38107801,
      116203475,
      2000000,
      17625000,
      0,
      5121154,
      0,
    ],
  },
  {
    name: 'Specialities',
    aging: [
      5805362,
      0,
      0,
      0,
      3503687,
      0,
      0,
    ],
  },
];

const produkData = [
  {
    salesOffice: '2247',
    descSalesOffice: 'KFTD Jayapura',
    billingNo: '2809361541',
    postingDate: '01/08/2026',
    material: '13076374',
    namaProduk: 'ARTESUNATE INJ',
    principal: 'GUILIN PHARMA',
    customer: 'APOTEK MURAH FARMA 2',
    channel: 'Apotek',
    quantity: 5,
    salesUnit: 'VL',
    unitPrice: 109998,
    totalDiscount: 0,
    totalPenjualan: 549990,
    taxAmount: 60499,
    totalCogs: 481241,
    sled: '31/10/2028',
  },
  {
    salesOffice: '2247',
    descSalesOffice: 'KFTD Jayapura',
    billingNo: '2809361542',
    postingDate: '01/08/2026',
    material: '11001530',
    namaProduk: 'NITROKAF RETARD (DUS 100 KAPS)-BJN',
    principal: 'KIMIA FARMA',
    customer: 'APOTEK MURAH FARMA 2',
    channel: 'Apotek',
    quantity: 2,
    salesUnit: 'DUS',
    unitPrice: 264450,
    totalDiscount: 176653,
    totalPenjualan: 528900,
    taxAmount: 58179,
    totalCogs: 295397,
    sled: '06/04/2028',
  },
  {
    salesOffice: '2247',
    descSalesOffice: 'KFTD Jayapura',
    billingNo: '2809361542',
    postingDate: '01/08/2026',
    material: '11002323',
    namaProduk: 'MARCKS CLASSIC CREME 40GR (NEW)',
    principal: 'KIMIA FARMA',
    customer: 'APOTEK MURAH FARMA 2',
    channel: 'Apotek',
    quantity: 2,
    salesUnit: 'PC',
    unitPrice: 17300,
    totalDiscount: 5709,
    totalPenjualan: 34600,
    taxAmount: 3806,
    totalCogs: 25650,
    sled: '04/06/2031',
  },
];

const agingLabels = [
  '0 - 30 hari',
  '31 - 45 hari',
  '46 - 60 hari',
  '61 - 90 hari',
  '91 - 180 hari',
  '181 - 360 hari',
  '>360 hari',
];


/* =========================================================
   HELPER
========================================================= */

const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(value || 0);
};


const formatShortRupiah = (value) => {
  if (value >= 1000000000) {
    return `Rp ${(value / 1000000000).toFixed(1)} M`;
  }

  if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(1)} Jt`;
  }

  if (value >= 1000) {
    return `Rp ${(value / 1000).toFixed(1)} Rb`;
  }

  return `Rp ${formatRupiah(value)}`;
};


/* =========================================================
   COMPONENT
========================================================= */

const Dashboard = () => {

  const [filter, setFilter] = useState({
    principal: 'BIOFARMA',
    cabang: 'ALL',
    periode: '2026-06',
  });


  const [activeTable, setActiveTable] = useState('principal');


  /* =======================================================
     SUMMARY
  ======================================================= */

  const summary = {
    totalPenjualan: 91138685679,
    totalPiutang: 41509144940,
    jatuhTempo: 7117340889,
    belumJatuhTempo: 34391804051,
  };


  const rasioPiutang =
    (summary.totalPiutang / summary.totalPenjualan) * 100;


  const rasioJTO =
    (summary.jatuhTempo / summary.totalPiutang) * 100;


  const rasioBelumJTO =
    (summary.belumJatuhTempo / summary.totalPiutang) * 100;


  /* =======================================================
     AGING SUMMARY
  ======================================================= */

  const agingSummary = useMemo(() => {

    const values = principalData[0].aging;

    const total = values.reduce(
      (sum, value) => sum + value,
      0
    );

    return values.map((value, index) => ({
      label: agingLabels[index],
      value,
      percentage: total
        ? (value / total) * 100
        : 0,
    }));

  }, []);


  /* =======================================================
     HANDLER
  ======================================================= */

  const handleFilterChange = (name, value) => {
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const resetFilter = () => {
    setFilter({
      principal: 'BIOFARMA',
      cabang: 'ALL',
      periode: '2026-06',
    });
  };


  /* =======================================================
     CUSTOM TOOLTIP
  ======================================================= */

  const CustomTooltip = ({ active, payload, label }) => {

    if (!active || !payload || !payload.length) {
      return null;
    }

    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-xl p-3">
        <p className="font-semibold text-gray-700 mb-2">
          {label}
        </p>

        {payload.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-5 text-sm"
          >
            <span className="text-gray-500">
              {item.name}
            </span>

            <span className="font-semibold text-gray-700">
              {formatShortRupiah(item.value)}
            </span>
          </div>
        ))}
      </div>
    );
  };


  /* =======================================================
     TABLE COMPONENT
  ======================================================= */

  const AgingTable = ({
    title,
    icon,
    data,
  }) => {

    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">

        {/* TABLE HEADER */}

        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              {icon}
            </div>

            <div>
              <h3 className="font-bold text-gray-800">
                {title}
              </h3>

              <p className="text-xs text-gray-400">
                Distribusi saldo piutang berdasarkan aging
              </p>
            </div>

          </div>

          <button
            className="text-xs text-blue-600 font-medium hover:text-orange-500 transition"
          >
            Lihat Detail
          </button>

        </div>


        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>

              <tr className="bg-blue-50/60">

                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-600">
                  {title === 'Data Principal'
                    ? 'Nama Principal'
                    : title === 'Data Cabang'
                      ? 'Nama Cabang'
                      : 'Channel'}
                </th>

                {agingLabels.map((label, index) => (
                  <th
                    key={index}
                    className="text-right px-3 py-3 text-xs font-semibold text-gray-600"
                  >
                    {label}
                  </th>
                ))}

                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-600">
                  Grand Total
                </th>

              </tr>

            </thead>


            <tbody>

              {data.map((row, index) => {

                const total = row.aging.reduce(
                  (sum, value) => sum + value,
                  0
                );

                return (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-orange-50/30 transition"
                  >

                    <td className="px-5 py-3">

                      <div className="flex items-center gap-2">

                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                          {title === 'Data Principal'
                            ? <FaBuilding size={13} />
                            : title === 'Data Cabang'
                              ? <FaBuilding size={13} />
                              : <FaHospital size={13} />
                          }
                        </div>

                        <span className="font-semibold text-gray-700 text-sm">
                          {row.name}
                        </span>

                      </div>

                    </td>


                    {row.aging.map((value, i) => (

                      <td
                        key={i}
                        className="px-3 py-3 text-right text-sm text-gray-600"
                      >
                        {formatRupiah(value)}
                      </td>

                    ))}


                    <td className="px-5 py-3 text-right">

                      <span className="font-bold text-blue-700 text-sm">
                        {formatRupiah(total)}
                      </span>

                    </td>

                  </tr>
                );

              })}

            </tbody>


            {/* GRAND TOTAL */}

            <tfoot>

              <tr className="bg-blue-900 text-white">

                <td className="px-5 py-3 font-bold text-sm">
                  Grand Total
                </td>

                {agingLabels.map((_, i) => {

                  const total = data.reduce(
                    (sum, row) =>
                      sum + (row.aging[i] || 0),
                    0
                  );

                  return (
                    <td
                      key={i}
                      className="px-3 py-3 text-right font-semibold text-sm"
                    >
                      {formatRupiah(total)}
                    </td>
                  );

                })}

                <td className="px-5 py-3 text-right font-bold text-sm">
                  {formatRupiah(
                    data.reduce(
                      (grand, row) =>
                        grand +
                        row.aging.reduce(
                          (sum, value) => sum + value,
                          0
                        ),
                      0
                    )
                  )}
                </td>

              </tr>

            </tfoot>

          </table>

        </div>

      </div>
    );
  };

  const ProdukTable = ({ data }) => {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
              <FaBox />
            </div>

            <div>
              <h3 className="font-bold text-gray-800">
                Data Produk
              </h3>

              <p className="text-xs text-gray-400">
                Detail transaksi penjualan berdasarkan produk
              </p>
            </div>

          </div>

          <button
            className="
            text-xs
            text-blue-600
            font-semibold
            hover:text-orange-500
            transition
          "
          >
            Lihat Detail
          </button>

        </div>


        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[1500px] text-sm">

            <thead>

              <tr className="bg-blue-50/70 text-gray-600">

                <th className="px-4 py-3 text-center whitespace-nowrap">
                  No
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Sales Office
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Billing No
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Posting Date
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Material
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Nama Produk
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Principal
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Customer
                </th>

                <th className="px-4 py-3 text-left whitespace-nowrap">
                  Channel
                </th>

                <th className="px-4 py-3 text-right whitespace-nowrap">
                  Qty
                </th>

                <th className="px-4 py-3 text-center whitespace-nowrap">
                  Unit
                </th>

                <th className="px-4 py-3 text-right whitespace-nowrap">
                  Unit Price
                </th>

                <th className="px-4 py-3 text-right whitespace-nowrap">
                  Discount
                </th>

                <th className="px-4 py-3 text-right whitespace-nowrap">
                  Total Penjualan
                </th>

                <th className="px-4 py-3 text-right whitespace-nowrap">
                  Tax Amount
                </th>

                <th className="px-4 py-3 text-right whitespace-nowrap">
                  Total COGS
                </th>

                <th className="px-4 py-3 text-center whitespace-nowrap">
                  SLED
                </th>

              </tr>

            </thead>


            <tbody>

              {data.map((row, index) => (

                <tr
                  key={index}
                  className="
                  border-t
                  border-gray-100
                  hover:bg-orange-50/30
                  transition
                "
                >

                  {/* NO */}
                  <td className="px-4 py-3 text-center text-gray-500">
                    {index + 1}
                  </td>


                  {/* SALES OFFICE */}
                  <td className="px-4 py-3">

                    <div className="flex flex-col">

                      <span className="font-semibold text-gray-700">
                        {row.descSalesOffice}
                      </span>

                      <span className="text-[11px] text-gray-400">
                        {row.salesOffice}
                      </span>

                    </div>

                  </td>


                  {/* BILLING */}
                  <td className="px-4 py-3">

                    <span className="font-semibold text-blue-600">
                      {row.billingNo}
                    </span>

                  </td>


                  {/* POSTING DATE */}
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {row.postingDate}
                  </td>


                  {/* MATERIAL */}
                  <td className="px-4 py-3 text-gray-600">
                    {row.material}
                  </td>


                  {/* PRODUCT */}
                  <td className="px-4 py-3">

                    <div className="max-w-[260px]">

                      <span
                        className="
                        font-semibold
                        text-gray-700
                        line-clamp-2
                      "
                        title={row.namaProduk}
                      >
                        {row.namaProduk}
                      </span>

                    </div>

                  </td>


                  {/* PRINCIPAL */}
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {row.principal}
                  </td>


                  {/* CUSTOMER */}
                  <td className="px-4 py-3">

                    <div className="max-w-[220px]">

                      <span
                        className="
                        text-gray-700
                        font-medium
                        line-clamp-2
                      "
                        title={row.customer}
                      >
                        {row.customer}
                      </span>

                    </div>

                  </td>


                  {/* CHANNEL */}
                  <td className="px-4 py-3">

                    <span className="
                    px-2
                    py-1
                    rounded-full
                    bg-blue-50
                    text-blue-600
                    text-xs
                    font-semibold
                  ">
                      {row.channel}
                    </span>

                  </td>


                  {/* QTY */}
                  <td className="px-4 py-3 text-right font-semibold text-gray-700">
                    {formatRupiah(row.quantity)}
                  </td>


                  {/* UNIT */}
                  <td className="px-4 py-3 text-center text-gray-600">
                    {row.salesUnit}
                  </td>


                  {/* UNIT PRICE */}
                  <td className="px-4 py-3 text-right text-gray-600 whitespace-nowrap">
                    Rp {formatRupiah(row.unitPrice)}
                  </td>


                  {/* DISCOUNT */}
                  <td className="px-4 py-3 text-right text-orange-500 whitespace-nowrap">
                    Rp {formatRupiah(row.totalDiscount)}
                  </td>


                  {/* TOTAL PENJUALAN */}
                  <td className="px-4 py-3 text-right">

                    <span className="font-bold text-blue-700 whitespace-nowrap">
                      Rp {formatRupiah(row.totalPenjualan)}
                    </span>

                  </td>


                  {/* TAX */}
                  <td className="px-4 py-3 text-right text-gray-600 whitespace-nowrap">
                    Rp {formatRupiah(row.taxAmount)}
                  </td>


                  {/* COGS */}
                  <td className="px-4 py-3 text-right text-gray-600 whitespace-nowrap">
                    Rp {formatRupiah(row.totalCogs)}
                  </td>


                  {/* SLED */}
                  <td className="px-4 py-3 text-center whitespace-nowrap">

                    <span className="text-xs text-gray-600">
                      {row.sled}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>


            {/* FOOTER */}
            <tfoot>

              <tr className="bg-blue-900 text-white">

                <td
                  colSpan={9}
                  className="px-4 py-3 font-bold text-sm"
                >
                  Grand Total
                </td>


                <td className="px-4 py-3 text-right font-bold">
                  {formatRupiah(
                    data.reduce(
                      (sum, row) =>
                        sum + (row.quantity || 0),
                      0
                    )
                  )}
                </td>


                <td></td>


                <td className="text-nowrap px-4 py-3 text-right font-semibold">
                  Rp {formatRupiah(
                    data.reduce(
                      (sum, row) =>
                        sum + (row.unitPrice || 0),
                      0
                    )
                  )}
                </td>


                <td className="text-nowrap px-4 py-3 text-right font-semibold text-orange-300">
                  Rp {formatRupiah(
                    data.reduce(
                      (sum, row) =>
                        sum + (row.totalDiscount || 0),
                      0
                    )
                  )}
                </td>


                <td className="text-nowrap px-4 py-3 text-right font-bold">
                  Rp {formatRupiah(
                    data.reduce(
                      (sum, row) =>
                        sum + (row.totalPenjualan || 0),
                      0
                    )
                  )}
                </td>


                <td className="text-nowrap px-4 py-3 text-right font-semibold">
                  Rp {formatRupiah(
                    data.reduce(
                      (sum, row) =>
                        sum + (row.taxAmount || 0),
                      0
                    )
                  )}
                </td>


                <td className="text-nowrap px-4 py-3 text-right font-semibold">
                  Rp {formatRupiah(
                    data.reduce(
                      (sum, row) =>
                        sum + (row.totalCogs || 0),
                      0
                    )
                  )}
                </td>


                <td></td>

              </tr>

            </tfoot>

          </table>

        </div>

      </div>
    );
  };

  return (
    <div className='flex flex-col p-5 bg-white'>
      <div className="min-h-screen">

        {/* =================================================
          PAGE HEADER
      ================================================= */}

        <div className="mb-5">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div className='flex flex-row gap-2 items-center'>
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-md">
                <FaChartBar />
              </div>
              <div className="flex flex-col gap-0">

                <h1 className="text-xl font-bold text-gray-800">
                  Dashboard
                </h1>

                <p className="text-xs text-gray-400">
                  Monitoring saldo piutang dan collection faktur
                </p>

              </div>

            </div>


            {/* PERIOD */}

            <div className="flex items-center gap-2 text-sm">

              <span className="text-gray-400">
                Per tanggal
              </span>

              <span className="font-semibold text-blue-700">
                30 Jun 2026
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
          FILTER
      ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-4 mb-5">

          <div className="flex items-center gap-2 mb-4">

            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
              <FaFilter size={13} />
            </div>

            <div>

              <h3 className="text-sm font-bold text-gray-700">
                Filter Data
              </h3>

              <p className="text-xs text-gray-400">
                Pilih parameter dashboard
              </p>

            </div>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* PRINCIPAL */}

            <div>

              <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                Principal
              </label>

              <div className="relative">

                <select
                  value={filter.principal}
                  onChange={(e) =>
                    handleFilterChange(
                      'principal',
                      e.target.value
                    )
                  }
                  className="
                  appearance-none
                  w-full
                  bg-white
                  border border-gray-200
                  rounded-xl
                  px-4 py-2.5
                  text-sm text-gray-700
                  outline-none
                  focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-50
                  transition
                "
                >

                  <option value="BIOFARMA">
                    BIOFARMA
                  </option>

                  <option value="ALL">
                    Semua Principal
                  </option>

                </select>

                <FaChevronDown
                  size={11}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />

              </div>

            </div>


            {/* CABANG */}

            <div>

              <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                Cabang
              </label>

              <div className="relative">

                <select
                  value={filter.cabang}
                  onChange={(e) =>
                    handleFilterChange(
                      'cabang',
                      e.target.value
                    )
                  }
                  className="
                  appearance-none
                  w-full
                  bg-white
                  border border-gray-200
                  rounded-xl
                  px-4 py-2.5
                  text-sm text-gray-700
                  outline-none
                  focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-50
                  transition
                "
                >

                  <option value="ALL">
                    Semua Cabang
                  </option>

                  {dummyCabang.map((item) => (
                    <option
                      key={item.cabang}
                      value={item.cabang}
                    >
                      {item.cabang}
                    </option>
                  ))}

                </select>

                <FaChevronDown
                  size={11}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />

              </div>

            </div>


            {/* PERIODE */}

            <div>

              <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                Periode
              </label>

              <input
                type="month"
                value={filter.periode}
                onChange={(e) =>
                  handleFilterChange(
                    'periode',
                    e.target.value
                  )
                }
                className="
                w-full
                bg-white
                border border-gray-200
                rounded-xl
                px-4 py-2.5
                text-sm text-gray-700
                outline-none
                focus:border-blue-400
                focus:ring-2
                focus:ring-blue-50
                transition
              "
              />

            </div>

          </div>


          {/* FILTER ACTION */}

          <div className="flex justify-end mt-4">

            <button
              onClick={resetFilter}
              className="
              flex items-center gap-2
              px-4 py-2
              rounded-xl
              text-xs font-semibold
              text-gray-500
              hover:text-blue-600
              hover:bg-blue-50
              transition
            "
            >

              <FaSyncAlt size={11} />

              Reset Filter

            </button>

          </div>

        </div>


        {/* =================================================
          SUMMARY HEADER - 1 ROW
      ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">

          {/* TOTAL PENJUALAN */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-4 relative overflow-hidden">

            <div className="absolute right-0 top-0 w-20 h-20 rounded-bl-full bg-blue-50" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FaMoneyBillWave />
                </div>

                <span className="text-[10px] font-semibold text-gray-400">
                  SALES
                </span>

              </div>

              <p className="text-xs text-gray-400 mt-3">
                Total Penjualan
              </p>

              <p className="text-xl font-bold text-gray-800 mt-1">
                Rp {formatRupiah(summary.totalPenjualan)}
              </p>

            </div>

          </div>


          {/* TOTAL PIUTANG */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-4 relative overflow-hidden">

            <div className="absolute right-0 top-0 w-20 h-20 rounded-bl-full bg-orange-50" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                  <FaFileInvoiceDollar />
                </div>

                <span className="text-[10px] font-semibold text-gray-400">
                  RECEIVABLE
                </span>

              </div>

              <p className="text-xs text-gray-400 mt-3">
                Total Piutang
              </p>

              <p className="text-xl font-bold text-gray-800 mt-1">
                Rp {formatRupiah(summary.totalPiutang)}
              </p>

              <p className="text-[11px] text-orange-500 font-semibold mt-1">
                {rasioPiutang.toFixed(1)}% dari penjualan
              </p>

            </div>

          </div>


          {/* JATUH TEMPO */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-4">

            <div className="flex items-center justify-between">

              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                <FaExclamationTriangle />
              </div>

              <span className="text-[10px] font-semibold text-gray-400">
                JTO
              </span>

            </div>

            <p className="text-xs text-gray-400 mt-3">
              Piutang Jatuh Tempo
            </p>

            <p className="text-xl font-bold text-gray-800 mt-1">
              Rp {formatRupiah(summary.jatuhTempo)}
            </p>

            <div className="flex items-center gap-2 mt-2">

              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-orange-400 rounded-full"
                  style={{
                    width: `${rasioJTO}%`,
                  }}
                />

              </div>

              <span className="text-[11px] font-bold text-orange-500">
                {rasioJTO.toFixed(1)}%
              </span>

            </div>

          </div>


          {/* BELUM JTO */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-4">

            <div className="flex items-center justify-between">

              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FaClock />
              </div>

              <span className="text-[10px] font-semibold text-gray-400">
                NOT DUE
              </span>

            </div>

            <p className="text-xs text-gray-400 mt-3">
              Piutang Belum Jatuh Tempo
            </p>

            <p className="text-xl font-bold text-gray-800 mt-1">
              Rp {formatRupiah(summary.belumJatuhTempo)}
            </p>

            <div className="flex items-center gap-2 mt-2">

              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${rasioBelumJTO}%`,
                  }}
                />

              </div>

              <span className="text-[11px] font-bold text-blue-600">
                {rasioBelumJTO.toFixed(1)}%
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
          CHART
      ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-5 mb-5">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

            <div>

              <div className="flex items-center gap-2">

                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FaChartBar size={15} />
                </div>

                <div>

                  <h2 className="font-bold text-gray-800">
                    Saldo Piutang per Cabang
                  </h2>

                  <p className="text-xs text-gray-400">
                    Perbandingan piutang sudah dan belum jatuh tempo
                  </p>

                </div>

              </div>

            </div>


            <div className="flex items-center gap-4 text-xs">

              <div className="flex items-center gap-2">

                <span className="w-3 h-3 rounded-sm bg-orange-400" />

                <span className="text-gray-500">
                  Sudah JTO
                </span>

              </div>

              <div className="flex items-center gap-2">

                <span className="w-3 h-3 rounded-sm bg-blue-500" />

                <span className="text-gray-500">
                  Belum JTO
                </span>

              </div>

            </div>

          </div>


          <div className="w-full h-[360px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={dummyCabang}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 60,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#edf0f5"
                />

                <XAxis
                  dataKey="cabang"
                  angle={-35}
                  textAnchor="end"
                  height={80}
                  tick={{
                    fontSize: 10,
                    fill: '#6b7280',
                  }}
                />

                <YAxis
                  tick={{
                    fontSize: 10,
                    fill: '#9ca3af',
                  }}
                  tickFormatter={(value) =>
                    formatShortRupiah(value)
                  }
                />

                <Tooltip
                  content={<CustomTooltip />}
                />

                <Bar
                  dataKey="belumJTO"
                  name="Belum JTO"
                  stackId="a"
                  fill="#2563eb"
                  radius={[0, 0, 0, 0]}
                />

                <Bar
                  dataKey="sudahJTO"
                  name="Sudah JTO"
                  stackId="a"
                  fill="#fb923c"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* =================================================
          AGING PIUTANG
      ================================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">

          {/* AGING TABLE */}

          <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">

            <div className="px-5 py-4 border-b border-gray-100">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                  <FaClock size={15} />
                </div>

                <div>

                  <h2 className="font-bold text-gray-800">
                    Aging Piutang
                  </h2>

                  <p className="text-xs text-gray-400">
                    Distribusi saldo berdasarkan umur piutang
                  </p>

                </div>

              </div>

            </div>


            <div className="p-4">

              <div className="space-y-3">

                {agingSummary.map((item, index) => (

                  <div key={index}>

                    <div className="flex items-center justify-between mb-1">

                      <span className="text-xs font-medium text-gray-500">
                        {item.label}
                      </span>

                      <div className="flex items-center gap-3">

                        <span className="text-xs font-semibold text-gray-700">
                          Rp {formatRupiah(item.value)}
                        </span>

                        <span className="w-10 text-right text-xs font-bold text-blue-600">
                          {item.percentage.toFixed(0)}%
                        </span>

                      </div>

                    </div>


                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

                      <div
                        className={`
                        h-full rounded-full
                        ${index === 0
                            ? 'bg-blue-500'
                            : index <= 2
                              ? 'bg-blue-400'
                              : index <= 4
                                ? 'bg-orange-400'
                                : 'bg-orange-500'
                          }
                      `}
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>


          {/* AGING SUMMARY */}

          <div className="bg-blue-900 rounded-2xl shadow-lg p-5 text-white relative overflow-hidden">

            <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-blue-800" />

            <div className="absolute -right-20 bottom-0 w-40 h-40 rounded-full bg-orange-400/10" />


            <div className="relative">

              <p className="text-blue-200 text-xs">
                Total Saldo Piutang
              </p>

              <p className="text-2xl font-bold mt-1">
                Rp {formatRupiah(summary.totalPiutang)}
              </p>


              <div className="mt-7">

                <p className="text-blue-200 text-xs">
                  Piutang Jatuh Tempo
                </p>

                <p className="text-xl font-bold mt-1">
                  Rp {formatRupiah(summary.jatuhTempo)}
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <div className="flex-1 h-1.5 bg-white/10 rounded-full">

                    <div
                      className="h-full bg-orange-400 rounded-full"
                      style={{
                        width: `${rasioJTO}%`,
                      }}
                    />

                  </div>

                  <span className="text-xs font-bold text-orange-300">
                    {rasioJTO.toFixed(1)}%
                  </span>

                </div>

              </div>


              <div className="mt-6 pt-5 border-t border-white/10">

                <p className="text-blue-200 text-xs">
                  Piutang Belum Jatuh Tempo
                </p>

                <p className="text-xl font-bold mt-1">
                  Rp {formatRupiah(summary.belumJatuhTempo)}
                </p>

                <p className="text-xs text-blue-200 mt-1">
                  {rasioBelumJTO.toFixed(1)}% dari total piutang
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
          TABS
      ================================================= */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-2 mb-4">

          <div className="grid grid-cols-4 gap-2">

            {/* PRINCIPAL */}
            <button
              onClick={() => setActiveTable("principal")}
              className={`
      flex items-center justify-center gap-2
      rounded-xl
      py-2.5
      text-sm
      font-semibold
      transition-all
      duration-200
      ${activeTable === "principal"
                  ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                  : "text-gray-500 hover:bg-orange-50 hover:text-orange-500"
                }
    `}
            >
              <FaBuilding size={13} />
              Per Principal
            </button>

            {/* CABANG */}
            <button
              onClick={() => setActiveTable("cabang")}
              className={`
      flex items-center justify-center gap-2
      rounded-xl
      py-2.5
      text-sm
      font-semibold
      transition-all
      duration-200
      ${activeTable === "cabang"
                  ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                  : "text-gray-500 hover:bg-orange-50 hover:text-orange-500"
                }
    `}
            >
              <FaBuilding size={13} />
              Per Cabang
            </button>

            {/* CHANNEL */}
            <button
              onClick={() => setActiveTable("channel")}
              className={`
      flex items-center justify-center gap-2
      rounded-xl
      py-2.5
      text-sm
      font-semibold
      transition-all
      duration-200
      ${activeTable === "channel"
                  ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                  : "text-gray-500 hover:bg-orange-50 hover:text-orange-500"
                }
    `}
            >
              <FaHospital size={13} />
              Per Channel
            </button>

            {/* PRODUK */}
            <button
              onClick={() => setActiveTable("produk")}
              className={`
      flex items-center justify-center gap-2
      rounded-xl
      py-2.5
      text-sm
      font-semibold
      transition-all
      duration-200
      ${activeTable === "produk"
                  ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                  : "text-gray-500 hover:bg-orange-50 hover:text-orange-500"
                }
    `}
            >
              <FaBoxOpen size={13} />
              Per Produk
            </button>

          </div>

        </div>


        {/* =================================================
          DETAIL TABLE
      ================================================= */}

        {activeTable === 'principal' && (

          <AgingTable
            title="Per Principal"
            icon={<FaBuilding size={15} />}
            data={principalData}
          />

        )}


        {activeTable === 'cabang' && (

          <AgingTable
            title="Per Cabang"
            icon={<FaBuilding size={15} />}
            data={cabangData}
          />

        )}


        {activeTable === 'channel' && (

          <AgingTable
            title="Per Channel"
            icon={<FaHospital size={15} />}
            data={channelData}
          />

        )}

        {activeTable === 'produk' && (
          <ProdukTable data={produkData} />
        )}


        {/* =================================================
          FOOTER
      ================================================= */}

        <div className="flex items-center justify-center gap-2 py-6 text-xs text-gray-300">

          <span className="font-semibold">
            KFCOLLS
          </span>

          <span>•</span>

          <span>
            Collection System
          </span>

        </div>

      </div>
    </div>
  );
};


export default Dashboard;