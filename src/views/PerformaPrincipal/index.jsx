import React, { useMemo, useState } from 'react';

import * as XLSX from 'xlsx';

import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import {
  FaUpload,
  FaFileExcel,
  FaSyncAlt,
  FaChartBar,
  FaDownload,
} from 'react-icons/fa';


/* =========================================================
   CONSTANT
========================================================= */

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];


/* =========================================================
   HELPER
========================================================= */

const numberValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  if (typeof value === 'number') {
    return value;
  }

  let text = String(value)
    .replace(/Rp/gi, '')
    .replace(/\s/g, '');

  /*
    Support:
    1.234.567
    1,234,567
    1234567
    90,27%
  */

  if (text.includes('%')) {
    text = text.replace('%', '').replace(',', '.');
    return Number(text) || 0;
  }

  /*
    Kalau format Indonesia:
    1.234.567,89
  */

  if (
    text.includes('.') &&
    text.includes(',')
  ) {
    text = text
      .replace(/\./g, '')
      .replace(',', '.');

    return Number(text) || 0;
  }

  /*
    Kalau hanya koma
  */

  if (
    text.includes(',') &&
    !text.includes('.')
  ) {
    const parts = text.split(',');

    if (parts[1]?.length === 3) {
      text = text.replace(/,/g, '');
    } else {
      text = text.replace(',', '.');
    }

    return Number(text) || 0;
  }

  /*
    Kalau hanya titik
  */

  if (
    text.includes('.') &&
    !text.includes(',')
  ) {
    const parts = text.split('.');

    if (
      parts.length > 1 &&
      parts[parts.length - 1].length === 3
    ) {
      text = text.replace(/\./g, '');
    }
  }

  return Number(text) || 0;
};


const formatNumber = (value) => {
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(value || 0);
};


const formatPercent = (value) => {
  return `${Number(value || 0).toFixed(2)}%`;
};


const formatShort = (value) => {
  value = Number(value || 0);

  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(2)}T`;
  }

  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}bn`;
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}m`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}k`;
  }

  return formatNumber(value);
};


const getValue = (
  row,
  aliases
) => {

  for (const alias of aliases) {

    const key = Object.keys(row).find(
      (item) =>
        item
          .toLowerCase()
          .trim()
          .replace(/\s+/g, ' ') ===
        alias
          .toLowerCase()
          .trim()
          .replace(/\s+/g, ' ')
    );

    if (key !== undefined) {
      return row[key];
    }
  }

  return '';
};


const getText = (
  row,
  aliases
) => {

  const value = getValue(
    row,
    aliases
  );

  return value === null ||
    value === undefined
    ? ''
    : String(value).trim();
};


/* =========================================================
   DATE / MONTH
========================================================= */

const parseExcelDate = (value) => {

  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  /*
    Excel serial number
  */

  if (typeof value === 'number') {

    const excelEpoch =
      new Date(1899, 11, 30);

    const date = new Date(
      excelEpoch.getTime() +
      value * 86400000
    );

    return date;
  }

  const text = String(value).trim();

  /*
    YYYY-MM-DD
  */

  if (
    /^\d{4}-\d{2}-\d{2}$/.test(text)
  ) {
    return new Date(`${text}T00:00:00`);
  }

  /*
    DD/MM/YYYY
  */

  if (
    /^\d{2}\/\d{2}\/\d{4}$/.test(text)
  ) {

    const [day, month, year] =
      text.split('/');

    return new Date(
      `${year}-${month}-${day}T00:00:00`
    );
  }

  const date = new Date(text);

  return isNaN(date.getTime())
    ? null
    : date;
};


const getMonthIndex = (row) => {

  const monthText = getText(
    row,
    [
      'Month',
      'Bulan',
      'MONTH',
    ]
  );

  if (monthText) {

    const normalized =
      monthText.toLowerCase();

    const index =
      MONTHS.findIndex(
        (month) =>
          month.toLowerCase() ===
          normalized
      );

    if (index >= 0) {
      return index;
    }

    const shortIndex =
      MONTH_SHORT.findIndex(
        (month) =>
          month.toLowerCase() ===
          normalized
      );

    if (shortIndex >= 0) {
      return shortIndex;
    }

    const numericMonth =
      Number(monthText);

    if (
      numericMonth >= 1 &&
      numericMonth <= 12
    ) {
      return numericMonth - 1;
    }
  }


  const date = parseExcelDate(
    getValue(row, [
      'Tanggal',
      'Date',
      'Posting Date',
      'Billing Date',
    ])
  );


  if (date) {
    return date.getMonth();
  }

  return null;
};


/* =========================================================
   LINE / LINI
========================================================= */

const getLine = (row) => {

  const value = getText(
    row,
    [
      'Lini',
      'Line',
      'Lini Produk',
      'Product Line',
      'Kategori',
      'Category',
      'Group Produk',
    ]
  );

  if (!value) {
    return 'NON ALKES';
  }

  const normalized =
    value.toUpperCase();

  if (
    normalized.includes('ALKES') &&
    !normalized.includes('NON')
  ) {
    return 'ALKES';
  }

  if (
    normalized.includes('NON ALKES') ||
    normalized.includes('NON-ALKES') ||
    normalized.includes('NONALKES')
  ) {
    return 'NON ALKES';
  }

  return normalized;
};


/* =========================================================
   EXCEL NORMALIZER
========================================================= */

const normalizeExcelRow = (row, index) => {

  const principal =
    getText(
      row,
      [
        'Name Principle',
        'Name Principal',
        'Principal',
        'Principle',
        'Nama Principal',
      ]
    ) || `Principal ${index + 1}`;


  const totalPenjualan =
    numberValue(
      getValue(
        row,
        [
          'Total Penjualan',
          'Penjualan',
          'Sales',
          'Total Sales',
          'Revenue',
        ]
      )
    );


  const totalCOGS =
    numberValue(
      getValue(
        row,
        [
          'Total COGS',
          'COGS',
          'Total Cogs',
          'Cost of Goods Sold',
        ]
      )
    );


  const hpp =
    numberValue(
      getValue(
        row,
        [
          'HPP',
          'Total HPP',
          'Harga Pokok Penjualan',
        ]
      )
    ) || totalCOGS;


  const klaim =
    numberValue(
      getValue(
        row,
        [
          'Klaim Lainnya',
          'Klaim LainnyaRcls',
          'Klaim',
          'Rcls',
          'RCLS',
        ]
      )
    );


  const cndn =
    numberValue(
      getValue(
        row,
        [
          'CnDn',
          'CN DN',
          'CN/DN',
          'Credit Note Debit Note',
        ]
      )
    );


  const selHarga =
    numberValue(
      getValue(
        row,
        [
          'Sel. Harga',
          'Sel Harga',
          'Selisih Harga',
          'Price Difference',
        ]
      )
    );


  const margin =
    numberValue(
      getValue(
        row,
        [
          'Margin',
          'Total Margin',
          'Gross Margin',
        ]
      )
    ) ||
    (
      totalPenjualan -
      hpp -
      klaim -
      cndn -
      selHarga
    );


  const percentHPP =
    numberValue(
      getValue(
        row,
        [
          '% HPP',
          'Persentase HPP',
          '%HPP',
        ]
      )
    ) ||
    (
      totalPenjualan > 0
        ? hpp / totalPenjualan * 100
        : 0
    );


  const percentMargin =
    numberValue(
      getValue(
        row,
        [
          '% Margin',
          'Persentase Margin',
          '%Margin',
        ]
      )
    ) ||
    (
      totalPenjualan > 0
        ? margin / totalPenjualan * 100
        : 0
    );


  return {

    id: index + 1,

    principal,

    lini: getLine(row),

    bulan:
      getMonthIndex(row),

    totalPenjualan,

    totalCOGS,

    klaim,

    cndn,

    selHarga,

    hpp,

    margin,

    percentHPP,

    percentMargin,

  };
};


/* =========================================================
   CUSTOM TOOLTIP
========================================================= */

const ChartTooltip = ({
  active,
  payload,
  label,
}) => {

  if (
    !active ||
    !payload ||
    payload.length === 0
  ) {
    return null;
  }

  return (

    <div className="
      bg-white
      border
      border-gray-200
      rounded-lg
      shadow-xl
      px-4
      py-3
    ">

      <div className="
        text-xs
        font-bold
        text-gray-700
        mb-2
      ">
        {label}
      </div>

      {payload.map(
        (item, index) => (

          <div
            key={index}
            className="
              flex
              items-center
              justify-between
              gap-6
              text-xs
              mb-1
            "
          >

            <div className="
              flex
              items-center
              gap-2
            ">

              <span
                className="
                  w-2
                  h-2
                  rounded-full
                "
                style={{
                  backgroundColor:
                    item.color,
                }}
              />

              <span className="text-gray-500">
                {item.name}
              </span>

            </div>

            <strong className="text-gray-800">

              {item.dataKey ===
                'percentHPP'
                ? formatPercent(item.value)
                : formatShort(item.value)
              }

            </strong>

          </div>

        )
      )}

    </div>

  );
};


/* =========================================================
   KPI CARD
========================================================= */

const KpiCard = ({
  title,
  value,
}) => {

  return (

    <div className="
      bg-white
      border
      border-gray-200
      shadow-sm
      px-3
      py-4
      min-w-[175px]
    ">

      <div className="
        text-xs
        text-gray-500
        mb-2
      ">
        {title}
      </div>

      <div className="
        text-2xl
        font-semibold
        text-gray-800
      ">
        {value}
      </div>

    </div>

  );
};


/* =========================================================
   LINE CHART
========================================================= */

const PerformanceChart = ({
  title,
  data,
}) => {

  return (

    <div className="
      bg-transparent
      min-w-0
    ">

      <h2 className="
        text-base
        font-bold
        text-gray-800
        mb-1
      ">
        {title}
      </h2>

      <div className="
        flex
        items-center
        gap-4
        text-[11px]
        text-gray-500
        mb-3
      ">

        <div className="
          flex
          items-center
          gap-1
        ">
          <span className="
            w-2.5
            h-2.5
            rounded-full
            bg-orange-500
          " />
          Total Penjualan
        </div>

        <div className="
          flex
          items-center
          gap-1
        ">
          <span className="
            w-2.5
            h-2.5
            rounded-full
            bg-blue-800
          " />
          HPP
        </div>

        <div className="
          flex
          items-center
          gap-1
        ">
          <span className="
            w-2.5
            h-2.5
            rounded-full
            bg-yellow-400
          " />
          Persentase HPP
        </div>

      </div>


      <div className="h-[270px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <ComposedChart
            data={data}
            margin={{
              top: 15,
              right: 10,
              left: 0,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="1 3"
              vertical={false}
              stroke="#d7dce5"
            />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 10,
                fill: '#4b5563',
              }}
            />

            <YAxis
              yAxisId="money"
              tick={{
                fontSize: 9,
                fill: '#6b7280',
              }}
              tickFormatter={formatShort}
            />

            <YAxis
              yAxisId="percentage"
              orientation="right"
              domain={[0, 100]}
              tick={{
                fontSize: 9,
                fill: '#6b7280',
              }}
              tickFormatter={(value) =>
                `${value}%`
              }
            />

            <Tooltip
              content={<ChartTooltip />}
            />

            <Bar
              yAxisId="money"
              dataKey="sales"
              name="Total Penjualan"
              fill="#ed6b3c"
              barSize={35}
              radius={[2, 2, 0, 0]}
            />

            <Bar
              yAxisId="money"
              dataKey="hpp"
              name="HPP"
              fill="#1729a8"
              barSize={35}
              radius={[2, 2, 0, 0]}
            />

            <Line
              yAxisId="percentage"
              type="monotone"
              dataKey="percentHPP"
              name="Persentase HPP"
              stroke="#ffe600"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: '#ffe600',
                stroke: '#ffe600',
              }}
              activeDot={{
                r: 7,
              }}
            />

          </ComposedChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
};


/* =========================================================
   TABLE
========================================================= */

const PerformanceTable = ({
  data,
}) => {

  return (

    <div className="
      bg-white
      border-t
      border-gray-200
      overflow-x-auto
    ">

      <div className="
        px-4
        py-3
        text-lg
        font-bold
        text-gray-800
      ">
        Rincian Performa
      </div>

      <table className="
        w-full
        min-w-[1100px]
        text-xs
      ">

        <thead>

          <tr className="
            border-b
            border-gray-300
            text-gray-700
          ">

            <th className="
              text-left
              px-3
              py-2
              font-semibold
            ">
              Name Principle
            </th>

            <th className="
              text-right
              px-3
              py-2
              font-semibold
            ">
              Total Penjualan
            </th>

            <th className="
              text-right
              px-3
              py-2
              font-semibold
            ">
              Total COGS
            </th>

            <th className="
              text-right
              px-3
              py-2
              font-semibold
            ">
              Klaim Lainnya
            </th>

            <th className="
              text-right
              px-3
              py-2
              font-semibold
            ">
              CnDn
            </th>

            <th className="
              text-right
              px-3
              py-2
              font-semibold
            ">
              Sel. Harga
            </th>

            <th className="
              text-right
              px-3
              py-2
              font-semibold
            ">
              HPP
            </th>

            <th className="
              text-right
              px-3
              py-2
              font-semibold
            ">
              % HPP
            </th>

            <th className="
              text-right
              px-3
              py-2
              font-semibold
            ">
              Margin
            </th>

            <th className="
              text-right
              px-3
              py-2
              font-semibold
            ">
              % Margin
            </th>

          </tr>

        </thead>


        <tbody>

          {data.map(
            (row, index) => (

              <tr
                key={index}
                className={`
                  border-b
                  border-gray-200
                  ${
                    index % 2 === 1
                      ? 'bg-gray-100'
                      : 'bg-white'
                  }
                  hover:bg-blue-50
                `}
              >

                <td className="
                  px-3
                  py-2
                  font-medium
                  text-gray-700
                ">
                  {row.principal}
                </td>

                <td className="
                  px-3
                  py-2
                  text-right
                ">
                  {formatNumber(
                    row.totalPenjualan
                  )}
                </td>

                <td className="
                  px-3
                  py-2
                  text-right
                ">
                  {formatNumber(
                    row.totalCOGS
                  )}
                </td>

                <td className="
                  px-3
                  py-2
                  text-right
                ">
                  {formatNumber(
                    row.klaim
                  )}
                </td>

                <td className="
                  px-3
                  py-2
                  text-right
                ">
                  {formatNumber(
                    row.cndn
                  )}
                </td>

                <td className="
                  px-3
                  py-2
                  text-right
                ">
                  {formatNumber(
                    row.selHarga
                  )}
                </td>

                <td className="
                  px-3
                  py-2
                  text-right
                ">
                  {formatNumber(
                    row.hpp
                  )}
                </td>

                <td className="
                  px-3
                  py-2
                  text-right
                ">
                  {formatPercent(
                    row.percentHPP
                  )}
                </td>

                <td className="
                  px-3
                  py-2
                  text-right
                ">
                  {formatNumber(
                    row.margin
                  )}
                </td>

                <td className="
                  px-3
                  py-2
                  text-right
                ">
                  {formatPercent(
                    row.percentMargin
                  )}
                </td>

              </tr>

            )
          )}

        </tbody>


        <tfoot>

          <tr className="
            font-bold
            border-t-2
            border-gray-400
            bg-white
          ">

            <td className="
              px-3
              py-2
            ">
              Total
            </td>

            <td className="px-3 py-2 text-right">
              {formatNumber(
                data.reduce(
                  (a, b) =>
                    a + b.totalPenjualan,
                  0
                )
              )}
            </td>

            <td className="px-3 py-2 text-right">
              {formatNumber(
                data.reduce(
                  (a, b) =>
                    a + b.totalCOGS,
                  0
                )
              )}
            </td>

            <td className="px-3 py-2 text-right">
              {formatNumber(
                data.reduce(
                  (a, b) =>
                    a + b.klaim,
                  0
                )
              )}
            </td>

            <td className="px-3 py-2 text-right">
              {formatNumber(
                data.reduce(
                  (a, b) =>
                    a + b.cndn,
                  0
                )
              )}
            </td>

            <td className="px-3 py-2 text-right">
              {formatNumber(
                data.reduce(
                  (a, b) =>
                    a + b.selHarga,
                  0
                )
              )}
            </td>

            <td className="px-3 py-2 text-right">
              {formatNumber(
                data.reduce(
                  (a, b) =>
                    a + b.hpp,
                  0
                )
              )}
            </td>

            <td className="px-3 py-2 text-right">

              {formatPercent(
                (() => {

                  const sales =
                    data.reduce(
                      (a, b) =>
                        a + b.totalPenjualan,
                      0
                    );

                  const hpp =
                    data.reduce(
                      (a, b) =>
                        a + b.hpp,
                      0
                    );

                  return sales > 0
                    ? hpp / sales * 100
                    : 0;

                })()
              )}

            </td>

            <td className="px-3 py-2 text-right">
              {formatNumber(
                data.reduce(
                  (a, b) =>
                    a + b.margin,
                  0
                )
              )}
            </td>

            <td className="px-3 py-2 text-right">

              {formatPercent(
                (() => {

                  const sales =
                    data.reduce(
                      (a, b) =>
                        a + b.totalPenjualan,
                      0
                    );

                  const margin =
                    data.reduce(
                      (a, b) =>
                        a + b.margin,
                      0
                    );

                  return sales > 0
                    ? margin / sales * 100
                    : 0;

                })()
              )}

            </td>

          </tr>

        </tfoot>

      </table>

    </div>

  );
};


/* =========================================================
   MAIN DASHBOARD
========================================================= */

const DashboardPerformaPrincipal = () => {

  const [excelData, setExcelData] =
    useState([]);

  const [fileName, setFileName] =
    useState('');

  const [loading, setLoading] =
    useState(false);


  /* =======================================================
     UPLOAD EXCEL
  ======================================================= */

  const handleExcelUpload = (
    event
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setLoading(true);
    setFileName(file.name);


    const reader =
      new FileReader();


    reader.onload = (e) => {

      try {

        const data =
          new Uint8Array(
            e.target.result
          );


        const workbook =
          XLSX.read(data, {
            type: 'array',
            cellDates: true,
          });


        /*
          Ambil sheet pertama
        */

        const sheetName =
          workbook.SheetNames[0];


        const worksheet =
          workbook.Sheets[
            sheetName
          ];


        const json =
          XLSX.utils.sheet_to_json(
            worksheet,
            {
              defval: '',
            }
          );


        const normalized =
          json.map(
            normalizeExcelRow
          );


        setExcelData(
          normalized
        );

      } catch (error) {

        console.error(
          'Excel error:',
          error
        );

        alert(
          'File Excel tidak dapat dibaca.'
        );

      } finally {

        setLoading(false);

      }

    };


    reader.readAsArrayBuffer(file);

  };


  /* =======================================================
     SUMMARY
  ======================================================= */

  const summary = useMemo(() => {

    const totalPenjualan =
      excelData.reduce(
        (sum, row) =>
          sum + row.totalPenjualan,
        0
      );


    const totalHPP =
      excelData.reduce(
        (sum, row) =>
          sum + row.hpp,
        0
      );


    const totalMargin =
      excelData.reduce(
        (sum, row) =>
          sum + row.margin,
        0
      );


    return {

      totalPenjualan,

      totalHPP,

      percentHPP:
        totalPenjualan > 0
          ? totalHPP /
            totalPenjualan *
            100
          : 0,

      margin:
        totalMargin,

      percentMargin:
        totalPenjualan > 0
          ? totalMargin /
            totalPenjualan *
            100
          : 0,

    };

  }, [excelData]);


  /* =======================================================
     CHART DATA
  ======================================================= */

  const buildChartData = (
    lini
  ) => {

    return MONTHS.map(
      (month, index) => {

        const rows =
          excelData.filter(
            (row) =>
              row.lini === lini &&
              row.bulan === index
          );


        const sales =
          rows.reduce(
            (sum, row) =>
              sum +
              row.totalPenjualan,
            0
          );


        const hpp =
          rows.reduce(
            (sum, row) =>
              sum + row.hpp,
            0
          );


        return {

          month,

          sales,

          hpp,

          percentHPP:
            sales > 0
              ? hpp /
                sales *
                100
              : 0,

        };

      }
    );

  };


  const alkesChartData =
    useMemo(
      () =>
        buildChartData(
          'ALKES'
        ),
      [excelData]
    );


  const nonAlkesChartData =
    useMemo(
      () =>
        buildChartData(
          'NON ALKES'
        ),
      [excelData]
    );


  /* =======================================================
     TABLE DATA
  ======================================================= */

  const principalTable =
    useMemo(() => {

      const grouped = {};


      excelData.forEach(
        (row) => {

          if (
            !grouped[
              row.principal
            ]
          ) {

            grouped[
              row.principal
            ] = {

              principal:
                row.principal,

              totalPenjualan: 0,

              totalCOGS: 0,

              klaim: 0,

              cndn: 0,

              selHarga: 0,

              hpp: 0,

              margin: 0,

            };

          }


          const item =
            grouped[
              row.principal
            ];


          item.totalPenjualan +=
            row.totalPenjualan;

          item.totalCOGS +=
            row.totalCOGS;

          item.klaim +=
            row.klaim;

          item.cndn +=
            row.cndn;

          item.selHarga +=
            row.selHarga;

          item.hpp +=
            row.hpp;

          item.margin +=
            row.margin;

        }
      );


      return Object.values(
        grouped
      ).map((row) => ({

        ...row,

        percentHPP:
          row.totalPenjualan > 0
            ? row.hpp /
              row.totalPenjualan *
              100
            : 0,

        percentMargin:
          row.totalPenjualan > 0
            ? row.margin /
              row.totalPenjualan *
              100
            : 0,

      }));

    }, [excelData]);


  /* =======================================================
     RESET
  ======================================================= */

  const resetData = () => {

    setExcelData([]);

    setFileName('');

  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <div className="
      min-h-screen
      bg-[#e9eef8]
      text-gray-800
    ">


      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="
        px-4
        md:px-8
        pt-5
        pb-3
      ">

        <div className="
          max-w-[1500px]
          mx-auto
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
        ">


          {/* TITLE */}

          <div>

            <h1 className="
              text-xl
              font-bold
              text-gray-800
            ">
              Sales Performance Dashboard
            </h1>

            <p className="
              text-xs
              text-gray-500
              mt-1
            ">
              Monitoring Penjualan, HPP dan Margin
            </p>

          </div>


          {/* UPLOAD */}

          <div className="
            flex
            items-center
            gap-2
          ">

            <label className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-lg
              bg-green-600
              hover:bg-green-700
              text-white
              text-xs
              font-bold
              cursor-pointer
              shadow-sm
            ">

              <FaUpload />

              {loading
                ? 'Membaca Excel...'
                : 'Upload Excel'
              }

              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={
                  handleExcelUpload
                }
                className="hidden"
              />

            </label>


            {excelData.length > 0 && (

              <button
                type="button"
                onClick={resetData}
                className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-lg
                  bg-white
                  border
                  border-gray-200
                  text-gray-600
                  text-xs
                  font-semibold
                  hover:bg-gray-50
                "
              >

                <FaSyncAlt />

                Reset

              </button>

            )}

          </div>

        </div>

      </div>


      <main className="
        max-w-[1500px]
        mx-auto
        px-4
        md:px-8
        pb-8
      ">


        {/* =================================================
            FILE STATUS
        ================================================= */}

        {fileName && (

          <div className="
            mb-4
            bg-green-50
            border
            border-green-200
            rounded-lg
            px-4
            py-2.5
            flex
            items-center
            gap-3
            text-xs
            text-green-700
          ">

            <FaFileExcel />

            <span>
              File aktif:
              <strong className="ml-1">
                {fileName}
              </strong>
            </span>

            <span className="
              ml-auto
              font-semibold
            ">
              {formatNumber(
                excelData.length
              )}{' '}
              baris
            </span>

          </div>

        )}


        {/* =================================================
            KPI
        ================================================= */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-2
          mb-6
        ">

          <KpiCard
            title="Total Penjualan YTD 2026"
            value={
              `${formatShort(
                summary.totalPenjualan
              )}`
            }
          />

          <KpiCard
            title="Total HPP YTD 2026"
            value={
              `${formatShort(
                summary.totalHPP
              )}`
            }
          />

          <KpiCard
            title="% HPP YTD 2026"
            value={
              formatPercent(
                summary.percentHPP
              )
            }
          />

          <KpiCard
            title="% Margin YTD 2026"
            value={
              formatPercent(
                summary.percentMargin
              )
            }
          />

        </div>


        {/* =================================================
            CHARTS
        ================================================= */}

        {excelData.length === 0 ? (

          <div className="
            bg-white
            rounded-lg
            border
            border-gray-200
            min-h-[400px]
            flex
            flex-col
            items-center
            justify-center
            text-center
            shadow-sm
          ">

            <div className="
              w-16
              h-16
              rounded-full
              bg-green-50
              text-green-600
              flex
              items-center
              justify-center
              mb-4
            ">

              <FaFileExcel
                size={28}
              />

            </div>


            <h2 className="
              font-bold
              text-gray-700
            ">
              Silakan Upload Excel
            </h2>


            <p className="
              text-xs
              text-gray-400
              mt-1
              max-w-md
            ">
              Setelah Excel di-upload,
              KPI, grafik Lini Alkes,
              Non Alkes dan tabel
              performa akan otomatis
              menggunakan data tersebut.
            </p>

          </div>

        ) : (

          <>


            <div className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-8
              bg-[#e9eef8]
            ">


              {/* ALKES */}

              <PerformanceChart
                title="LINI ALKES"
                data={
                  alkesChartData
                }
              />


              {/* NON ALKES */}

              <PerformanceChart
                title="LINI NON ALKES"
                data={
                  nonAlkesChartData
                }
              />

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="
              mt-5
              bg-white
              rounded-lg
              shadow-sm
              overflow-hidden
            ">

              <PerformanceTable
                data={
                  principalTable
                }
              />

            </div>

          </>

        )}


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="
          text-center
          text-[10px]
          text-gray-400
          py-5
        ">

          Sales Performance Dashboard

        </div>

      </main>

    </div>

  );
};


export default DashboardPerformaPrincipal;
