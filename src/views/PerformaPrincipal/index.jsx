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
  ReferenceLine,
  Cell,
} from 'recharts';

import {
  FaUpload,
  FaFileExcel,
  FaSyncAlt,
  FaChartBar,
  FaChartLine,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaPercentage,
  FaCalculator,
  FaTable,
  FaShoppingCart,
  FaArrowUp,
  FaArrowDown,
  FaBuilding,
  FaMapMarkerAlt,
  FaBoxes,
  FaCoins,
  FaTrophy,
  FaExclamationTriangle,
  FaLightbulb,
  FaCheckCircle,
  FaDownload,
} from 'react-icons/fa';

/* =========================================================
   CONSTANT
========================================================= */

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const MONTH_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

/* =========================================================
   HELPER
========================================================= */

const normalizeKey = (value) =>
  String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');

const percentOf = (value, denominator) => {
  const numerator = Number(value || 0);
  const base = Number(denominator || 0);

  return base > 0 ? (numerator / base) * 100 : 0;
};

const numberValue = (value) => {
  if (value === null || value === undefined || value === '') return 0;
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;

  let text = String(value)
    .replace(/Rp/gi, '')
    .replace(/\s/g, '')
    .trim();

  if (!text) return 0;

  if (text.includes('%')) {
    text = text.replace('%', '').replace(',', '.');
    return Number(text) || 0;
  }

  if (text.includes('.') && text.includes(',')) {
    text = text.replace(/\./g, '').replace(',', '.');
    return Number(text) || 0;
  }

  if (text.includes(',') && !text.includes('.')) {
    const parts = text.split(',');
    if (parts[1]?.length === 3) text = text.replace(/,/g, '');
    else text = text.replace(',', '.');
    return Number(text) || 0;
  }

  if (text.includes('.') && !text.includes(',')) {
    const parts = text.split('.');
    if (parts.length > 1 && parts[parts.length - 1].length === 3) {
      text = text.replace(/\./g, '');
    }
  }

  return Number(text) || 0;
};

const formatNumber = (value) =>
  new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const formatPercent = (value) =>
  `${Number(value || 0).toFixed(2)}%`;

const formatSignedPercent = (value) => {
  const n = Number(value || 0);
  return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;
};

const formatShort = (value) => {
  const n = Number(value || 0);
  const abs = Math.abs(n);
  const sign = n < 0 ? '-' : '';

  if (abs >= 1_000_000_000_000) return `${sign}Rp ${(abs / 1_000_000_000_000).toFixed(2)} T`;
  if (abs >= 1_000_000_000) return `${sign}Rp ${(abs / 1_000_000_000).toFixed(1)} M`;
  if (abs >= 1_000_000) return `${sign}Rp ${(abs / 1_000_000).toFixed(1)} jt`;
  if (abs >= 1_000) return `${sign}Rp ${(abs / 1_000).toFixed(1)} rb`;
  return `Rp ${formatNumber(abs)}`;
};

const formatAxisMoney = (value) => {
  const n = Number(value || 0);
  const abs = Math.abs(n);
  const sign = n < 0 ? '-' : '';
  if (abs >= 1e12) return `${sign}${(abs / 1e12).toFixed(1)}T`;
  if (abs >= 1e9) return `${sign}${(abs / 1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `${sign}${(abs / 1e6).toFixed(1)}M`;
  return formatNumber(n);
};

const getValue = (row, aliases) => {
  const keys = Object.keys(row || {});
  for (const alias of aliases) {
    const target = normalizeKey(alias);
    const key = keys.find((item) => normalizeKey(item) === target);
    if (key !== undefined) return row[key];
  }
  return '';
};

const getText = (row, aliases) => {
  const value = getValue(row, aliases);
  return value === null || value === undefined ? '' : String(value).trim();
};

const parseExcelDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value;

  if (typeof value === 'number') {
    const epoch = new Date(1899, 11, 30);
    return new Date(epoch.getTime() + value * 86400000);
  }

  const text = String(value).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    const d = new Date(`${text}T00:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(text)) {
    const [day, month, year] = text.split('/');
    const d = new Date(`${year}-${month}-${day}T00:00:00`);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  const d = new Date(text);
  return Number.isNaN(d.getTime()) ? null : d;
};

const getMonthIndex = (row) => {
  const monthText = getText(row, ['Month', 'Bulan', 'MONTH', 'Nama Bulan']);
  if (monthText) {
    const normalized = normalizeKey(monthText);

    const longIndex = MONTHS.findIndex(
      (m) => normalizeKey(m) === normalized
    );
    if (longIndex >= 0) return longIndex;

    const shortIndex = MONTH_SHORT.findIndex(
      (m) => normalizeKey(m) === normalized
    );
    if (shortIndex >= 0) return shortIndex;

    const idIndex = MONTH_ID.findIndex(
      (m) => normalizeKey(m) === normalized
    );
    if (idIndex >= 0) return idIndex;

    const numeric = Number(monthText);
    if (numeric >= 1 && numeric <= 12) return numeric - 1;
  }

  const date = parseExcelDate(
    getValue(row, [
      'Tanggal',
      'Date',
      'Posting Date',
      'Billing Date',
      'Transaction Date',
      'Tanggal Transaksi',
    ])
  );

  return date ? date.getMonth() : null;
};

const getYearValue = (row) => {
  const explicitYear = numberValue(
    getValue(row, ['Year', 'Tahun', 'YEAR'])
  );

  if (explicitYear >= 1900 && explicitYear <= 2100) {
    return explicitYear;
  }

  const date = parseExcelDate(
    getValue(row, [
      'Tanggal',
      'Date',
      'Posting Date',
      'Billing Date',
      'Transaction Date',
      'Tanggal Transaksi',
    ])
  );

  return date ? date.getFullYear() : new Date().getFullYear();
};

const getLine = (row) => {
  const value = getText(row, [
    'Lini',
    'Line',
    'Lini Produk',
    'Product Line',
    'Kategori',
    'Category',
    'Group Produk',
  ]);

  if (!value) return 'NON ALKES';

  const normalized = value.toUpperCase();

  if (normalized.includes('NON ALKES') ||
      normalized.includes('NON-ALKES') ||
      normalized.includes('NONALKES')) {
    return 'NON ALKES';
  }

  if (normalized.includes('ALKES')) return 'ALKES';

  return value.toUpperCase();
};

const getRegional = (row) =>
  getText(row, [
    'Regional/Area',
    'Regional Area',
    'Regional',
    'Area',
    'Region',
    'Nama Area',
    'Nama Regional',
    'Cabang',
  ]) || 'Tidak Ada Regional';

const normalizeExcelRow = (row, index) => {
  const principal =
    getText(row, [
      'Name Principle',
      'Name Principal',
      'Principal',
      'Principle',
      'Nama Principal',
    ]) || `Principal ${index + 1}`;

  const totalPenjualan = numberValue(
    getValue(row, [
      'Total Penjualan',
      'Penjualan',
      'Sales',
      'Total Sales',
      'Revenue',
      'Total Revenue',
    ])
  );

  const totalCOGS = numberValue(
    getValue(row, [
      'Total COGS',
      'COGS',
      'Total Cogs',
      'Cost of Goods Sold',
    ])
  );

  const hpp =
    numberValue(
      getValue(row, [
        'HPP',
        'Total HPP',
        'Harga Pokok Penjualan',
      ])
    ) || totalCOGS;

  const klaim = numberValue(
    getValue(row, [
      'Klaim Lainnya',
      'Klaim LainnyaRcls',
      'Klaim',
      'Rcls',
      'RCLS',
    ])
  );

  const cndn = numberValue(
    getValue(row, [
      'CnDn',
      'CN DN',
      'CN/DN',
      'Credit Note Debit Note',
    ])
  );

  const selHarga = numberValue(
    getValue(row, [
      'Sel. Harga',
      'Sel Harga',
      'Selisih Harga',
      'Price Difference',
    ])
  );

  const explicitMargin = numberValue(
    getValue(row, [
      'Margin',
      'Total Margin',
      'Gross Margin',
      'Gross Profit',
    ])
  );

  const margin =
    explicitMargin ||
    (totalPenjualan - hpp - klaim - cndn - selHarga);

  const explicitPercentHPP = numberValue(
    getValue(row, ['% HPP', 'Persentase HPP', '%HPP'])
  );

  const percentHPP =
    explicitPercentHPP ||
    (totalPenjualan > 0 ? (hpp / totalPenjualan) * 100 : 0);

  const explicitPercentMargin = numberValue(
    getValue(row, [
      '% Margin',
      'Persentase Margin',
      '%Margin',
    ])
  );

  const percentMargin =
    explicitPercentMargin ||
    (totalPenjualan > 0 ? (margin / totalPenjualan) * 100 : 0);

  return {
    id: index + 1,
    principal,
    lini: getLine(row),
    regional: getRegional(row),
    bulan: getMonthIndex(row),
    tahun: getYearValue(row),
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
   GENERIC COMPONENTS
========================================================= */

const SelectFilter = ({
  label,
  icon,
  value,
  onChange,
  options,
  disabled = false,
  darkHeader = false,
}) => (
  <div className={darkHeader ? 'min-w-0 xl:min-w-[138px]' : 'min-w-[145px]'}>
    <div
      className={`mb-1 flex items-center gap-1.5 text-[9px] font-semibold ${
        darkHeader ? 'text-blue-100' : 'text-slate-500'
      }`}
    >
      <span className={darkHeader ? 'text-white' : 'text-blue-600'}>
        {icon}
      </span>
      {label}
    </div>

    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full rounded-lg border px-2.5 py-2 text-[10px] font-semibold outline-none transition ${
        darkHeader
          ? 'border-white/20 bg-white text-slate-700 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 disabled:bg-slate-100'
          : 'border-slate-200 bg-white text-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50'
      }`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const KpiCard = ({
  title,
  value,
  change,
  subtitle = 'vs. tahun sebelumnya',
  icon,
  iconClass = 'bg-blue-50 text-blue-600',
  accentClass = 'bg-blue-500',
  positive = true,
}) => (
  <div className="relative min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[11px] font-semibold text-slate-600">{title}</div>
        <div className="mt-2 whitespace-nowrap text-[20px] font-bold leading-none text-[#153b68]">
          {value}
        </div>
        <div className={`mt-3 flex items-center gap-1.5 text-[10px] font-bold ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
          {positive ? <FaArrowUp /> : <FaArrowDown />}
          {formatSignedPercent(change)}
          <span className="font-normal text-slate-400">{subtitle}</span>
        </div>
      </div>

      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
        {icon}
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-0.5">
      <div className={`h-full w-2/3 ${accentClass}`} />
    </div>
  </div>
);

const SectionTitle = ({ icon, title, subtitle }) => (
  <div className="mb-2.5 flex items-center gap-2.5">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
      {icon}
    </div>
    <div className="min-w-0">
      <h2 className="text-sm font-bold text-slate-800">{title}</h2>
      {subtitle && (
        <p className="text-[9px] text-slate-400">{subtitle}</p>
      )}
    </div>
  </div>
);

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-xl">
      <div className="mb-1.5 text-[10px] font-bold text-slate-700">{label}</div>
      {payload.map((item, index) => (
        <div
          key={`${item.dataKey}-${index}`}
          className="flex items-center justify-between gap-5 text-[10px]"
        >
          <span className="flex items-center gap-1.5 text-slate-500">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </span>
          <strong className="text-slate-800">
            {item.dataKey === 'percentMargin' || item.dataKey === 'percentHPP'
              ? formatPercent(item.value)
              : formatShort(item.value)}
          </strong>
        </div>
      ))}
    </div>
  );
};

/* =========================================================
   MAIN
========================================================= */

const DashboardPerformaPrincipal = () => {
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();

  const [filters, setFilters] = useState({
    tahun: String(currentYear),
    bulan: 'YTD',
    lini: 'ALL',
    principal: 'ALL',
    regional: 'ALL',
  });

  /* =======================================================
     UPLOAD
  ======================================================= */

  const handleExcelUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {
          type: 'array',
          cellDates: true,
        });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const json = XLSX.utils.sheet_to_json(worksheet, {
          defval: '',
        });

        const normalized = json
          .map(normalizeExcelRow)
          .filter(
            (row) =>
              row.principal ||
              row.totalPenjualan !== 0 ||
              row.hpp !== 0
          );

        setExcelData(normalized);

        const years = [...new Set(normalized.map((row) => row.tahun))]
          .filter(Boolean)
          .sort((a, b) => b - a);

        if (years.length) {
          setFilters((prev) => ({
            ...prev,
            tahun: String(years[0]),
            bulan: 'YTD',
          }));
        }
      } catch (error) {
        console.error('Excel error:', error);
        alert('File Excel tidak dapat dibaca.');
        setFileName('');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const resetData = () => {
    setExcelData([]);
    setFileName('');
    setFilters({
      tahun: String(currentYear),
      bulan: 'YTD',
      lini: 'ALL',
      principal: 'ALL',
      regional: 'ALL',
    });
  };

  /* =======================================================
     FILTER OPTIONS
  ======================================================= */

  const yearOptions = useMemo(() => {
    const years = [...new Set(excelData.map((row) => row.tahun))]
      .filter(Boolean)
      .sort((a, b) => b - a);

    return years.map((year) => ({
      value: String(year),
      label: String(year),
    }));
  }, [excelData]);

  const principalOptions = useMemo(() => {
    const values = [...new Set(excelData.map((row) => row.principal))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    return [
      { value: 'ALL', label: 'Semua Principal' },
      ...values.map((value) => ({
        value,
        label: value,
      })),
    ];
  }, [excelData]);

  const regionalOptions = useMemo(() => {
    const values = [...new Set(excelData.map((row) => row.regional))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    return [
      { value: 'ALL', label: 'Semua Area' },
      ...values.map((value) => ({
        value,
        label: value,
      })),
    ];
  }, [excelData]);

  const lineOptions = useMemo(() => {
    const values = [...new Set(excelData.map((row) => row.lini))]
      .filter(Boolean)
      .sort();

    return [
      { value: 'ALL', label: 'Semua Lini' },
      ...values.map((value) => ({
        value,
        label: value,
      })),
    ];
  }, [excelData]);

  const availableMonths = useMemo(() => {
    const year = Number(filters.tahun);

    const values = excelData
      .filter((row) => row.tahun === year)
      .map((row) => row.bulan)
      .filter((value) => value !== null && value !== undefined);

    return [...new Set(values)].sort((a, b) => a - b);
  }, [excelData, filters.tahun]);

  const monthOptions = useMemo(() => {
    const maxMonth =
      availableMonths.length > 0
        ? Math.max(...availableMonths)
        : new Date().getMonth();

    return [
      {
        value: 'YTD',
        label: `Januari - ${MONTH_ID[maxMonth]}`,
      },
      ...MONTH_ID.map((month, index) => ({
        value: String(index),
        label: month,
      })),
    ];
  }, [availableMonths]);

  /* =======================================================
     FILTERED DATA
  ======================================================= */

  const filteredRows = useMemo(() => {
    const year = Number(filters.tahun);

    return excelData.filter((row) => {
      if (row.tahun !== year) return false;

      if (filters.bulan !== 'YTD') {
        if (row.bulan !== Number(filters.bulan)) return false;
      }

      if (filters.lini !== 'ALL' && row.lini !== filters.lini) {
        return false;
      }

      if (
        filters.principal !== 'ALL' &&
        row.principal !== filters.principal
      ) {
        return false;
      }

      if (
        filters.regional !== 'ALL' &&
        row.regional !== filters.regional
      ) {
        return false;
      }

      return true;
    });
  }, [excelData, filters]);

  /* =======================================================
     PRIOR YEAR DATA
  ======================================================= */

  const previousYearRows = useMemo(() => {
    const year = Number(filters.tahun) - 1;

    return excelData.filter((row) => {
      if (row.tahun !== year) return false;

      if (filters.bulan !== 'YTD') {
        return row.bulan === Number(filters.bulan);
      }

      return true;
    });
  }, [excelData, filters]);

  const sum = (rows, key) =>
    rows.reduce((total, row) => total + Number(row[key] || 0), 0);

  const growth = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / Math.abs(previous)) * 100;
  };

  /* =======================================================
     SUMMARY
  ======================================================= */

  const summary = useMemo(() => {
    const totalPenjualan = sum(filteredRows, 'totalPenjualan');
    const totalHPP = sum(filteredRows, 'hpp');
    const totalMargin = sum(filteredRows, 'margin');

    const prevSales = sum(previousYearRows, 'totalPenjualan');
    const prevHPP = sum(previousYearRows, 'hpp');
    const prevMargin = sum(previousYearRows, 'margin');

    const percentHPP = percentOf(totalHPP, totalPenjualan);
    const percentMargin = percentOf(totalMargin, totalPenjualan);

    const prevPercentHPP = percentOf(prevHPP, prevSales);
    const prevPercentMargin = percentOf(prevMargin, prevSales);

    return {
      totalPenjualan,
      totalHPP,
      totalMargin,
      percentHPP,
      percentMargin,

      growthSales: growth(totalPenjualan, prevSales),
      growthHPP: growth(totalHPP, prevHPP),
      growthMargin: growth(totalMargin, prevMargin),

      changeHPPPercent: percentHPP - prevPercentHPP,
      changeMarginPercent: percentMargin - prevPercentMargin,
    };
  }, [filteredRows, previousYearRows]);

  /* =======================================================
     TREND CHART
  ======================================================= */

  const trendData = useMemo(() => {
    const year = Number(filters.tahun);

    let maxMonth = 11;

    if (filters.bulan === 'YTD') {
      const months = excelData
        .filter((row) => row.tahun === year)
        .map((row) => row.bulan)
        .filter((m) => m !== null);

      maxMonth = months.length
        ? Math.max(...months)
        : new Date().getMonth();
    } else {
      maxMonth = Number(filters.bulan);
    }

    const result = [];

    for (let month = 0; month <= maxMonth; month += 1) {
      const rows = excelData.filter(
        (row) =>
          row.tahun === year &&
          row.bulan === month &&
          (filters.lini === 'ALL' || row.lini === filters.lini) &&
          (filters.principal === 'ALL' || row.principal === filters.principal) &&
          (filters.regional === 'ALL' || row.regional === filters.regional)
      );

      const sales = sum(rows, 'totalPenjualan');
      const hpp = sum(rows, 'hpp');
      const margin = sum(rows, 'margin');

      result.push({
        month: MONTH_SHORT[month],
        sales,
        hpp,
        margin,
        percentMargin: percentOf(margin, sales),
        percentHPP: percentOf(hpp, sales),
      });
    }

    return result;
  }, [excelData, filters]);

  /* =======================================================
     ALKES VS NON ALKES
  ======================================================= */

  const lineSummary = useMemo(() => {
    return ['ALKES', 'NON ALKES'].map((lini) => {
      const rows = filteredRows.filter((row) => row.lini === lini);
      const sales = sum(rows, 'totalPenjualan');
      const margin = sum(rows, 'margin');

      return {
        lini,
        sales,
        grossProfit: margin,
        marginPercent: percentOf(margin, sales),
      };
    });
  }, [filteredRows]);

  /* =======================================================
     WATERFALL
  ======================================================= */

  const waterfall = useMemo(() => {
    const sales = summary.totalPenjualan;
    const hpp = summary.totalHPP;
    const grossProfit = summary.totalMargin;

    return [
      { name: 'Penjualan', value: sales, base: 0, display: sales },
      { name: 'HPP', value: hpp, base: sales - hpp, display: -hpp },
      { name: 'Gross Profit', value: grossProfit, base: 0, display: grossProfit },
    ];
  }, [summary]);

  /* =======================================================
     PRINCIPAL TABLE
  ======================================================= */

  const principalTable = useMemo(() => {
    const grouped = {};

    filteredRows.forEach((row) => {
      if (!grouped[row.principal]) {
        grouped[row.principal] = {
          principal: row.principal,
          totalPenjualan: 0,
          totalCOGS: 0,
          klaim: 0,
          cndn: 0,
          selHarga: 0,
          hpp: 0,
          margin: 0,
        };
      }

      const item = grouped[row.principal];

      item.totalPenjualan += row.totalPenjualan;
      item.totalCOGS += row.totalCOGS;
      item.klaim += row.klaim;
      item.cndn += row.cndn;
      item.selHarga += row.selHarga;
      item.hpp += row.hpp;
      item.margin += row.margin;
    });

    return Object.values(grouped).map((row) => ({
      ...row,
      percentSales: percentOf(
        row.totalPenjualan,
        summary.totalPenjualan
      ),
      percentHPP: percentOf(
        row.hpp,
        row.totalPenjualan
      ),
      percentMargin: percentOf(
        row.margin,
        row.totalPenjualan
      ),
    }));
  }, [filteredRows, summary.totalPenjualan]);

  const topSales = useMemo(
    () =>
      [...principalTable]
        .sort((a, b) => b.totalPenjualan - a.totalPenjualan)
        .slice(0, 10),
    [principalTable]
  );

  const topMargin = useMemo(
    () =>
      [...principalTable]
        .sort((a, b) => b.percentMargin - a.percentMargin)
        .slice(0, 10),
    [principalTable]
  );

  const bottomMargin = useMemo(
    () =>
      [...principalTable]
        .sort((a, b) => a.percentMargin - b.percentMargin)
        .slice(0, 5),
    [principalTable]
  );

  /* =======================================================
     INSIGHTS
  ======================================================= */

  const insights = useMemo(() => {
    const prev = previousYearRows;

    const prevSales = sum(prev, 'totalPenjualan');
    const prevHPP = sum(prev, 'hpp');
    const prevMargin = sum(prev, 'margin');

    const prevHPPPercent = percentOf(prevHPP, prevSales);
    const prevMarginPercent = percentOf(prevMargin, prevSales);

    const hppChange = summary.percentHPP - prevHPPPercent;
    const marginChange = summary.percentMargin - prevMarginPercent;

    const principalBest =
      [...principalTable].sort(
        (a, b) => b.percentMargin - a.percentMargin
      )[0];

    const principalWorst =
      [...principalTable].sort(
        (a, b) => a.percentMargin - b.percentMargin
      )[0];

    const lineBest =
      [...lineSummary].sort(
        (a, b) => b.marginPercent - a.marginPercent
      )[0];

    return {
      hppChange,
      marginChange,
      principalBest,
      principalWorst,
      lineBest,
    };
  }, [previousYearRows, summary, principalTable, lineSummary]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#edf2f9] text-slate-800">
      <main className="mx-auto max-w-[1500px] px-4 pb-8 pt-4 md:px-6">
        {/* =====================================================
            UPLOAD EXCEL - CARD TERPISAH
        ====================================================== */}
        <section className="mb-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FaFileExcel size={18} />
              </div>

              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-800">
                  Data Dashboard
                </div>
                <div className="truncate text-[10px] text-slate-400">
                  Upload file Excel terlebih dahulu untuk menampilkan dashboard
                  dan mengaktifkan filter.
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <label className="flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-emerald-500 px-4 text-[11px] font-bold text-white shadow-sm transition hover:bg-emerald-600">
                <FaUpload />
                {loading ? 'Membaca Excel...' : 'Upload Excel'}
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleExcelUpload}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  const template = [
                    {
                      'Name Principal': '',
                      'Lini Produk': '',
                      'Regional/Area': '',
                      'Month': 'January',
                      'Year': currentYear,
                      'Total Penjualan': 0,
                      'Total COGS': 0,
                      HPP: 0,
                      Klaim: 0,
                      CnDn: 0,
                      'Sel. Harga': 0,
                    },
                  ];

                  const worksheet = XLSX.utils.json_to_sheet(template);
                  const workbook = XLSX.utils.book_new();

                  XLSX.utils.book_append_sheet(
                    workbook,
                    worksheet,
                    'Data'
                  );

                  XLSX.writeFile(
                    workbook,
                    'Template_Sales_Profitability.xlsx'
                  );
                }}
                className="flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-[11px] font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                <FaDownload />
                Template Excel
              </button>

              {excelData.length > 0 && (
                <button
                  type="button"
                  onClick={resetData}
                  title="Reset data"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
                >
                  <FaSyncAlt />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            SALES & PROFITABILITY HEADER
            STYLE: rounded blue dashboard header seperti referensi
        ====================================================== */}
        <header className="mb-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1d3578] via-[#23459a] to-[#2048ae] text-white shadow-md">
          <div className="p-4 md:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              {/* TITLE */}
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                  <FaChartBar size={27} />
                </div>

                <div className="min-w-0">
                  <h1 className="text-xl font-bold tracking-wide md:text-2xl">
                    SALES &amp; PROFITABILITY DASHBOARD
                  </h1>

                  <div className="mt-1 text-xs text-blue-100 md:text-sm">
                    YTD {filters.tahun}
                    <span className="ml-2 text-blue-200">
                      Monitoring Penjualan, HPP &amp; Margin
                    </span>
                  </div>
                </div>
              </div>

              {/* FILTER */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 xl:flex xl:flex-wrap xl:items-end">
                <SelectFilter
                  label="Tahun"
                  icon={<FaCalendarAlt />}
                  value={filters.tahun}
                  onChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      tahun: value,
                      bulan: 'YTD',
                    }))
                  }
                  options={
                    yearOptions.length
                      ? yearOptions
                      : [
                          {
                            value: String(currentYear),
                            label: String(currentYear),
                          },
                        ]
                  }
                  disabled={!excelData.length}
                  darkHeader
                />

                <SelectFilter
                  label="Bulan"
                  icon={<FaCalendarAlt />}
                  value={filters.bulan}
                  onChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      bulan: value,
                    }))
                  }
                  options={monthOptions}
                  disabled={!excelData.length}
                  darkHeader
                />

                <SelectFilter
                  label="Lini Produk"
                  icon={<FaBoxes />}
                  value={filters.lini}
                  onChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      lini: value,
                    }))
                  }
                  options={lineOptions}
                  disabled={!excelData.length}
                  darkHeader
                />

                <SelectFilter
                  label="Principal"
                  icon={<FaBuilding />}
                  value={filters.principal}
                  onChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      principal: value,
                    }))
                  }
                  options={principalOptions}
                  disabled={!excelData.length}
                  darkHeader
                />

                <SelectFilter
                  label="Regional/Area"
                  icon={<FaMapMarkerAlt />}
                  value={filters.regional}
                  onChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      regional: value,
                    }))
                  }
                  options={regionalOptions}
                  disabled={!excelData.length}
                  darkHeader
                />
              </div>
            </div>
          </div>
        </header>

        {/* BEFORE UPLOAD */}
        {excelData.length === 0 ? (
          <div className="flex min-h-[520px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <FaFileExcel size={38} />
            </div>

            <h2 className="text-xl font-bold text-slate-700">
              Upload Data Excel Terlebih Dahulu
            </h2>

            <p className="mt-2 max-w-lg text-center text-sm text-slate-400">
              Dashboard tidak akan menampilkan KPI, grafik, tabel, maupun
              insight sebelum file Excel berhasil di-upload.
            </p>
          </div>
        ) : (
          <>
            {/* FILE STATUS */}
            <div className="mx-auto mb-3 flex w-full max-w-[1420px] items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs text-emerald-700">
              <FaFileExcel />
              <span>
                File aktif:
                <strong className="ml-1">{fileName}</strong>
              </span>
              <span className="ml-auto font-semibold">
                {formatNumber(excelData.length)} baris
              </span>
            </div>

            {/* KPI ROW */}
            <div className="mx-auto grid w-full max-w-[1420px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              <KpiCard
                title="Total Penjualan"
                value={formatShort(summary.totalPenjualan)}
                change={summary.growthSales}
                icon={<FaCoins size={18} />}
                iconClass="bg-blue-50 text-blue-600"
                accentClass="bg-blue-500"
              />

              <KpiCard
                title="Total HPP"
                value={formatShort(summary.totalHPP)}
                change={summary.growthHPP}
                icon={<FaShoppingCart size={18} />}
                iconClass="bg-orange-50 text-orange-500"
                accentClass="bg-orange-500"
              />

              <KpiCard
                title="% HPP"
                value={formatPercent(summary.percentHPP)}
                change={summary.changeHPPPercent}
                icon={<FaPercentage size={18} />}
                iconClass="bg-indigo-50 text-indigo-600"
                accentClass="bg-indigo-500"
                positive={summary.changeHPPPercent <= 0}
              />

              <KpiCard
                title="Gross Profit"
                value={formatShort(summary.totalMargin)}
                change={summary.growthMargin}
                icon={<FaMoneyBillWave size={18} />}
                iconClass="bg-emerald-50 text-emerald-600"
                accentClass="bg-emerald-500"
              />

              <KpiCard
                title="% Margin"
                value={formatPercent(summary.percentMargin)}
                change={summary.changeMarginPercent}
                icon={<FaPercentage size={18} />}
                iconClass="bg-cyan-50 text-cyan-600"
                accentClass="bg-cyan-500"
              />

              <KpiCard
                title="Growth Penjualan (YoY)"
                value={formatSignedPercent(summary.growthSales)}
                change={summary.growthSales}
                subtitle="vs. periode yang sama"
                icon={<FaArrowUp size={18} />}
                iconClass="bg-sky-50 text-sky-600"
                accentClass="bg-sky-500"
              />

              <KpiCard
                title="Growth Margin (YoY)"
                value={formatSignedPercent(summary.growthMargin)}
                change={summary.growthMargin}
                subtitle="vs. periode yang sama"
                icon={<FaArrowUp size={18} />}
                iconClass="bg-violet-50 text-violet-600"
                accentClass="bg-violet-500"
              />
            </div>

            {/* MAIN CHART ROW */}
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-12">
              {/* TREND */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm xl:col-span-5">
                <SectionTitle
                  icon={<FaChartBar size={15} />}
                  title="Tren Penjualan, HPP & Margin"
                  subtitle={`Pergerakan bulanan YTD ${filters.tahun}`}
                />

                <div className="mb-2 flex flex-wrap items-center gap-4 text-[10px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    Penjualan
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                    HPP
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    % Margin
                  </span>
                </div>

                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={trendData}
                      margin={{ top: 18, right: 8, left: 4, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="2 3"
                        vertical={false}
                        stroke="#dbe2ec"
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 9, fill: '#475569' }}
                      />
                      <YAxis
                        yAxisId="money"
                        tick={{ fontSize: 8, fill: '#64748b' }}
                        tickFormatter={formatAxisMoney}
                      />
                      <YAxis
                        yAxisId="percent"
                        orientation="right"
                        domain={[0, 30]}
                        tick={{ fontSize: 8, fill: '#64748b' }}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <Tooltip content={<ChartTooltip />} />
                      <Legend
                        wrapperStyle={{
                          fontSize: 9,
                          paddingTop: 8,
                        }}
                      />

                      <Bar
                        yAxisId="money"
                        dataKey="sales"
                        name="Penjualan"
                        fill="#1477d4"
                        barSize={27}
                        radius={[2, 2, 0, 0]}
                      />
                      <Bar
                        yAxisId="money"
                        dataKey="hpp"
                        name="HPP"
                        fill="#f47b3f"
                        barSize={27}
                        radius={[2, 2, 0, 0]}
                      />
                      <Line
                        yAxisId="percent"
                        type="monotone"
                        dataKey="percentMargin"
                        name="% Margin"
                        stroke="#f2bd18"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ALKES VS NON ALKES */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm xl:col-span-4">
                <div className="flex items-start justify-between gap-2">
                  <SectionTitle
                    icon={<FaBoxes size={15} />}
                    title="Alkes vs Non Alkes"
                    subtitle="Perbandingan penjualan, gross profit dan margin"
                  />

                  <div className="rounded-md bg-blue-600 px-3 py-1.5 text-[9px] font-bold text-white">
                    Penjualan
                  </div>
                </div>

                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={lineSummary}
                      margin={{ top: 25, right: 8, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="2 3"
                        vertical={false}
                        stroke="#dbe2ec"
                      />
                      <XAxis
                        dataKey="lini"
                        tick={{ fontSize: 9, fill: '#475569' }}
                      />
                      <YAxis
                        tick={{ fontSize: 8, fill: '#64748b' }}
                        tickFormatter={formatAxisMoney}
                      />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar
                        dataKey="sales"
                        name="Total Penjualan"
                        fill="#1477d4"
                        barSize={28}
                        radius={[2, 2, 0, 0]}
                      />
                      <Bar
                        dataKey="grossProfit"
                        name="Gross Profit"
                        fill="#ef7545"
                        barSize={28}
                        radius={[2, 2, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {lineSummary.map((item) => (
                    <div
                      key={item.lini}
                      className="rounded-lg border border-slate-100 bg-slate-50 p-2.5"
                    >
                      <div className="text-[10px] font-bold text-slate-700">
                        LINI {item.lini}
                      </div>
                      <div className="mt-1 text-sm font-bold text-[#173d69]">
                        {formatShort(item.sales)}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[9px]">
                        <span className="text-slate-400">Gross Profit</span>
                        <strong className="text-emerald-600">
                          {formatShort(item.grossProfit)}
                        </strong>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[9px]">
                        <span className="text-slate-400">Margin</span>
                        <strong className="text-amber-600">
                          {formatPercent(item.marginPercent)}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WATERFALL */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm xl:col-span-3">
                <SectionTitle
                  icon={<FaCalculator size={15} />}
                  title="Waterfall: Penjualan → HPP → Gross Profit"
                  subtitle="Komponen pembentuk gross profit"
                />

                <div className="h-[255px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={waterfall}
                      margin={{ top: 25, right: 8, left: 0, bottom: 10 }}
                    >
                      <CartesianGrid
                        strokeDasharray="2 3"
                        vertical={false}
                        stroke="#dbe2ec"
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 8, fill: '#475569' }}
                      />
                      <YAxis
                        tick={{ fontSize: 8, fill: '#64748b' }}
                        tickFormatter={formatAxisMoney}
                      />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar
                        dataKey="base"
                        stackId="waterfall"
                        fill="transparent"
                        legendType="none"
                      />
                      <Bar
                        dataKey="value"
                        stackId="waterfall"
                        name="Nilai"
                        barSize={40}
                        radius={[2, 2, 0, 0]}
                      >
                        {waterfall.map((item, index) => (
                          <Cell
                            key={index}
                            fill={
                              index === 0
                                ? '#1477d4'
                                : index === 1
                                  ? '#f47b3f'
                                  : '#40aa71'
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <div className="text-[10px] font-semibold text-blue-700">
                    Margin
                  </div>
                  <div className="mt-1 text-2xl font-bold text-[#153b68]">
                    {formatPercent(summary.percentMargin)}
                  </div>
                  <div className="mt-1 text-[9px] text-slate-500">
                    Gross profit {formatShort(summary.totalMargin)}
                  </div>
                </div>
              </div>
            </div>

            {/* PRINCIPAL TABLES */}
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-12">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm xl:col-span-4">
                <SectionTitle
                  icon={<FaTrophy size={15} />}
                  title="Top 10 Principal by Penjualan"
                  subtitle="Principal dengan kontribusi penjualan terbesar"
                />

                <PrincipalMiniTable
                  data={topSales}
                  type="sales"
                  totalSales={summary.totalPenjualan}
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm xl:col-span-4">
                <SectionTitle
                  icon={<FaChartLine size={15} />}
                  title="Top 10 Principal by Margin"
                  subtitle="Margin tertinggi berdasarkan principal"
                />

                <PrincipalMiniTable
                  data={topMargin}
                  type="margin"
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm xl:col-span-4">
                <SectionTitle
                  icon={<FaExclamationTriangle size={15} />}
                  title="Bottom 5 Principal by Margin"
                  subtitle="Principal dengan margin terendah"
                />

                <PrincipalMiniTable
                  data={bottomMargin}
                  type="bottom"
                />
              </div>
            </div>

            {/* DETAIL + INSIGHT */}
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-12">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-9">
                <div className="border-b border-slate-100 px-4 py-3">
                  <SectionTitle
                    icon={<FaTable size={15} />}
                    title="Rincian Performa Principal"
                    subtitle="Detail penjualan, HPP, gross profit dan margin"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1100px] text-[9px]">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600">
                        <th className="px-3 py-2 text-left">No</th>
                        <th className="px-3 py-2 text-left">Nama Principal</th>
                        <th className="px-3 py-2 text-right">Total Penjualan</th>
                        <th className="px-3 py-2 text-right">% Total Penjualan</th>
                        <th className="px-3 py-2 text-right">Total COGS</th>
                        <th className="px-3 py-2 text-right">Klaim</th>
                        <th className="px-3 py-2 text-right">CnDn</th>
                        <th className="px-3 py-2 text-right">Sel. Harga</th>
                        <th className="px-3 py-2 text-right">HPP</th>
                        <th className="px-3 py-2 text-right">% HPP</th>
                        <th className="px-3 py-2 text-right">Gross Profit</th>
                        <th className="px-3 py-2 text-right">% Margin</th>
                      </tr>
                    </thead>

                    <tbody>
                      {principalTable.length === 0 ? (
                        <tr>
                          <td
                            colSpan={12}
                            className="py-8 text-center text-slate-400"
                          >
                            Tidak ada data sesuai filter
                          </td>
                        </tr>
                      ) : (
                        principalTable.map((row, index) => (
                          <tr
                            key={row.principal}
                            className={`border-b border-slate-100 ${
                              index % 2 ? 'bg-slate-50/70' : 'bg-white'
                            } hover:bg-blue-50`}
                          >
                            <td className="px-3 py-2">{index + 1}</td>
                            <td className="px-3 py-2 font-semibold text-slate-700">
                              {row.principal}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {formatNumber(row.totalPenjualan)}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {formatPercent(row.percentSales)}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {formatNumber(row.totalCOGS)}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {formatNumber(row.klaim)}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {formatNumber(row.cndn)}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {formatNumber(row.selHarga)}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {formatNumber(row.hpp)}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {formatPercent(row.percentHPP)}
                            </td>
                            <td className="px-3 py-2 text-right font-semibold">
                              {formatNumber(row.margin)}
                            </td>
                            <td
                              className={`px-3 py-2 text-right font-bold ${
                                row.percentMargin < 0
                                  ? 'text-red-500'
                                  : 'text-emerald-600'
                              }`}
                            >
                              {formatPercent(row.percentMargin)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>

                    {principalTable.length > 0 && (
                      <tfoot>
                        <tr className="border-t-2 border-slate-300 bg-slate-50 font-bold text-slate-700">
                          <td colSpan={2} className="px-3 py-2">
                            Total
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatNumber(sum(principalTable, 'totalPenjualan'))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            100.00%
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatNumber(sum(principalTable, 'totalCOGS'))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatNumber(sum(principalTable, 'klaim'))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatNumber(sum(principalTable, 'cndn'))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatNumber(sum(principalTable, 'selHarga'))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatNumber(sum(principalTable, 'hpp'))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatPercent(summary.percentHPP)}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatNumber(sum(principalTable, 'margin'))}
                          </td>
                          <td className="px-3 py-2 text-right">
                            {formatPercent(summary.percentMargin)}
                          </td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </div>

              <InsightPanel
                summary={summary}
                insights={insights}
              />
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-[9px] text-slate-400">
              <FaChartBar className="text-blue-600" />
              Sales & Profitability Dashboard
              <span>•</span>
              YTD {filters.tahun}
              <span>•</span>
              Better Insight • Better Decision • Higher Profit
            </div>
          </>
        )}
      </main>
    </div>
  );
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

const PrincipalMiniTable = ({
  data,
  type,
  totalSales = 0,
}) => (
  <div className="overflow-hidden rounded-lg border border-slate-100">
    <table className="w-full text-[9px]">
      <thead>
        <tr className="bg-slate-50 text-slate-500">
          <th className="w-8 px-2 py-2 text-left">No</th>
          <th className="px-2 py-2 text-left">Nama Principal</th>
          <th className="px-2 py-2 text-right">
            {type === 'sales' ? 'Penjualan' : 'Margin %'}
          </th>
          <th className="px-2 py-2 text-right">
            {type === 'sales' ? '% Total' : 'Gross Profit'}
          </th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={4} className="py-6 text-center text-slate-400">
              Tidak ada data
            </td>
          </tr>
        ) : (
          data.map((row, index) => (
            <tr
              key={row.principal}
              className={`border-b border-slate-100 ${
                index % 2 ? 'bg-slate-50/70' : 'bg-white'
              }`}
            >
              <td className="px-2 py-2 text-slate-400">
                {index + 1}
              </td>

              <td className="max-w-[180px] truncate px-2 py-2 font-medium text-slate-700">
                {row.principal}
              </td>

              <td className="px-2 py-2 text-right font-semibold">
                {type === 'sales'
                  ? formatShort(row.totalPenjualan)
                  : formatPercent(row.percentMargin)}
              </td>

              <td className="px-2 py-2 text-right">
                {type === 'sales'
                  ? formatPercent(
                      percentOf(row.totalPenjualan, totalSales)
                    )
                  : formatShort(row.margin)}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

const InsightPanel = ({ summary, insights }) => {
  const changeClass = (value, inverse = false) => {
    const good = inverse ? value > 0 : value < 0;
    return good ? 'text-emerald-600' : 'text-red-500';
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm xl:col-span-3">
      <div className="mb-2 flex items-center gap-2 border-b border-slate-100 pb-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <FaLightbulb size={13} />
        </div>
        <h2 className="text-sm font-bold text-slate-800">
          Insight & Rekomendasi
        </h2>
      </div>

      <div className="space-y-2">
        <InsightBox
          icon={<FaExclamationTriangle />}
          title="Margin Negatif"
          className="border-red-200 bg-red-50"
          iconClass="text-red-500"
          titleClass="text-red-600"
          text={
            insights.principalWorst
              ? `${insights.principalWorst.principal} memiliki margin ${formatPercent(insights.principalWorst.percentMargin)}. Perlu evaluasi harga jual, diskon, atau biaya tambahan.`
              : 'Tidak ada data principal untuk dianalisis.'
          }
        />

        <InsightBox
          icon={<FaShoppingCart />}
          title="HPP"
          className="border-amber-200 bg-amber-50"
          iconClass="text-amber-500"
          titleClass="text-amber-600"
          text={`Total HPP ${formatShort(summary.totalHPP)} dengan rasio ${formatPercent(summary.percentHPP)} terhadap penjualan. Perubahan rasio ${formatSignedPercent(summary.changeHPPPercent)} dibanding periode tahun sebelumnya.`}
        />

        <InsightBox
          icon={<FaTrophy />}
          title="Margin Terbaik"
          className="border-emerald-200 bg-emerald-50"
          iconClass="text-emerald-600"
          titleClass="text-emerald-600"
          text={
            insights.principalBest
              ? `${insights.principalBest.principal} memiliki margin ${formatPercent(insights.principalBest.percentMargin)} pada periode terpilih.`
              : 'Belum ada principal yang dapat dianalisis.'
          }
        />

        <InsightBox
          icon={<FaArrowUp />}
          title="Peluang Pertumbuhan"
          className="border-blue-200 bg-blue-50"
          iconClass="text-blue-600"
          titleClass="text-blue-600"
          text={`Growth penjualan ${formatSignedPercent(summary.growthSales)} dan growth gross profit ${formatSignedPercent(summary.growthMargin)} dibanding periode yang sama tahun sebelumnya.`}
        />
      </div>

      <div className="mt-3 rounded-lg border border-amber-200 bg-[#fff8df] p-3">
        <div className="flex items-center gap-2 text-[10px] font-bold text-amber-700">
          <FaLightbulb />
          Rekomendasi
        </div>

        <ul className="mt-2 space-y-1.5 text-[9px] leading-relaxed text-slate-600">
          <li>• Evaluasi principal dengan margin rendah atau negatif.</li>
          <li>• Pantau perubahan rasio HPP terhadap penjualan.</li>
          <li>• Fokus pada lini/principal dengan margin dan pertumbuhan yang baik.</li>
        </ul>
      </div>
    </div>
  );
};

const InsightBox = ({
  icon,
  title,
  text,
  className,
  iconClass,
  titleClass,
}) => (
  <div className={`rounded-lg border p-2.5 ${className}`}>
    <div className="flex items-start gap-2">
      <div className={`mt-0.5 shrink-0 ${iconClass}`}>{icon}</div>
      <div className="min-w-0">
        <div className={`text-[10px] font-bold ${titleClass}`}>
          {title}
        </div>
        <div className="mt-1 text-[9px] leading-relaxed text-slate-600">
          {text}
        </div>
      </div>
      <FaCheckCircle className="ml-auto mt-0.5 shrink-0 text-[11px] text-emerald-500" />
    </div>
  </div>
);

export default DashboardPerformaPrincipal;