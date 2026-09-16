import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  LabelList,
} from 'recharts';

import {
  FaUpload,
  FaFileExcel,
  FaTrash,
  FaFilter,
  FaChartLine,
  FaPercentage,
  FaMoneyBillWave,
  FaUsers,
  FaTruck,
  FaCalculator,
  FaCog,
  FaDownload,
  FaCalendarAlt,
  FaBuilding,
  FaTags,
  FaLightbulb,
  FaBullseye,
} from 'react-icons/fa';

import * as XLSX from 'xlsx';

/* ============================================================
   DEFAULT TARGET
============================================================ */

const DEFAULT_TARGET = {
  komitmen: 0.5,
  sdm: 5,
  operasional: 3,
  pengiriman: 1,
  total: 8,
};

/* ============================================================
   MONTH
============================================================ */

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

/* ============================================================
   EXCEL REQUIRED COLUMNS
   ------------------------------------------------------------
   Struktur Excel yang digunakan:

   Profit Center
   Profit Center Desc
   Cost Center
   Cost Center Desc
   Account
   Account Desc
   Amount in local currency
   Assignment
   Document Number
   Document type
   Document Date
   Posting Key
   Text
   Posting Date
   Month
============================================================ */

const REQUIRED_COLUMNS = [
  'Profit Center',
  'Profit Center Desc',
  'Cost Center',
  'Cost Center Desc',
  'Account',
  'Account Desc',
  'Amount in local currency',
  'Assignment',
  'Document Number',
  'Document type',
  'Document Date',
  'Posting Key',
  'Text',
  'Posting Date',
  'Month',
];

/* ============================================================
   HEADER NORMALIZER
============================================================ */

const normalizeHeader = (value) => {
  return String(value ?? '')
    .replace(/\u00A0/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[._-]/g, '');
};

/* ============================================================
   GET EXCEL VALUE
============================================================ */

const getExcelValue = (
  row,
  aliases = []
) => {
  const keys = Object.keys(row);

  const foundKey = keys.find((key) => {
    const normalizedKey =
      normalizeHeader(key);

    return aliases.some(
      (alias) =>
        normalizedKey ===
        normalizeHeader(alias)
    );
  });

  return foundKey !== undefined
    ? row[foundKey]
    : null;
};

/* ============================================================
   VALIDATE EXCEL HEADER
============================================================ */

const validateExcelHeaders = (
  worksheet
) => {
  const headerRows =
    XLSX.utils.sheet_to_json(
      worksheet,
      {
        header: 1,
        defval: '',
        raw: true,
      }
    );

  if (
    !headerRows ||
    !headerRows.length
  ) {
    return {
      valid: false,
      missing: REQUIRED_COLUMNS,
    };
  }

  const headers =
    headerRows[0] || [];

  const normalizedHeaders =
    headers.map((item) =>
      normalizeHeader(item)
    );

  const missing =
    REQUIRED_COLUMNS.filter(
      (required) =>
        !normalizedHeaders.includes(
          normalizeHeader(required)
        )
    );

  return {
    valid: missing.length === 0,
    missing,
  };
};

/* ============================================================
   NUMBER PARSER
   ------------------------------------------------------------
   Support:
   1. 123456789
   2. 1,234,567
   3. 1.234.567
   4. 1.234,56
   5. 1,234.56
   6. 6,1E+09
   7. 6.1E+09
============================================================ */

const parseNumber = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return 0;
  }

  if (
    typeof value === 'number'
  ) {
    return Number.isFinite(value)
      ? value
      : 0;
  }

  let stringValue = String(value)
    .replace(/\u00A0/g, ' ')
    .trim();

  if (!stringValue) {
    return 0;
  }

  /*
    Excel bisa mengeluarkan scientific notation
    seperti:

    6,1E+09
    6.1E+09

    Normalisasi terlebih dahulu.
  */

  stringValue = stringValue.replace(
    /\s+/g,
    ''
  );

  /*
    Scientific notation dengan comma:

    6,1E+09
    menjadi
    6.1E+09
  */

  if (
    /,\d+[eE][+-]?\d+$/.test(
      stringValue
    )
  ) {
    stringValue =
      stringValue.replace(
        ',',
        '.'
      );
  }

  /*
    Jika setelah normalisasi masih
    berupa scientific notation.
  */

  if (
    /^[+-]?\d+(\.\d+)?[eE][+-]?\d+$/.test(
      stringValue
    )
  ) {
    const scientificValue =
      Number(stringValue);

    return Number.isFinite(
      scientificValue
    )
      ? scientificValue
      : 0;
  }

  /*
    Format Indonesia / international.
  */

  if (
    stringValue.includes('.') &&
    stringValue.includes(',')
  ) {
    if (
      stringValue.lastIndexOf(',') >
      stringValue.lastIndexOf('.')
    ) {
      stringValue =
        stringValue
          .replace(/\./g, '')
          .replace(',', '.');
    } else {
      stringValue =
        stringValue.replace(
          /,/g,
          ''
        );
    }
  } else if (
    stringValue.includes(',') &&
    !stringValue.includes('.')
  ) {
    const commaParts =
      stringValue.split(',');

    if (
      commaParts.length === 2 &&
      commaParts[1].length <= 2
    ) {
      stringValue =
        stringValue.replace(
          ',',
          '.'
        );
    } else {
      stringValue =
        stringValue.replace(
          /,/g,
          ''
        );
    }
  } else if (
    stringValue.includes('.')
  ) {
    /*
      Contoh:
      1.234.567
      dianggap ribuan.

      Sedangkan:
      123.45
      dianggap decimal.
    */

    const dotParts =
      stringValue.split('.');

    if (
      dotParts.length > 2
    ) {
      stringValue =
        stringValue.replace(
          /\./g,
          ''
        );
    }
  }

  /*
    Hilangkan karakter non-number,
    tetapi tetap mempertahankan minus
    dan decimal.
  */

  stringValue =
    stringValue.replace(
      /[^\d.-]/g,
      ''
    );

  const numberValue =
    Number(stringValue);

  return Number.isFinite(
    numberValue
  )
    ? numberValue
    : 0;
};

/* ============================================================
   FORMAT NUMBER
============================================================ */

const formatNumber = (value) => {
  return new Intl.NumberFormat(
    'id-ID'
  ).format(
    Number(value || 0)
  );
};

/* ============================================================
   FORMAT RUPIAH
============================================================ */

const formatRupiah = (value) => {
  return `Rp ${formatNumber(
    value
  )}`;
};

/* ============================================================
   FORMAT PERCENTAGE
============================================================ */

const formatPercent = (
  value,
  decimal = 2
) => {
  return `${Number(
    value || 0
  ).toFixed(decimal)}%`;
};

/* ============================================================
   CALCULATE RATIO
============================================================ */

const calculateRatio = (
  cost,
  sales
) => {
  if (
    !sales ||
    Number(sales) === 0
  ) {
    return 0;
  }

  return (
    (Number(cost || 0) /
      Number(sales || 0)) *
    100
  );
};

/* ============================================================
   MONTH SORT
============================================================ */

const getMonthIndex = (
  month
) => {
  return MONTHS.findIndex(
    (item) =>
      item.toLowerCase() ===
      String(
        month || ''
      ).toLowerCase()
  );
};

/* ============================================================
   NORMALIZE MONTH
============================================================ */

const normalizeMonth = (
  value
) => {
  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return '';
  }

  const stringValue =
    String(value)
      .trim()
      .toLowerCase();

  const found =
    MONTHS.find(
      (month) =>
        month.toLowerCase() ===
        stringValue
    );

  if (found) {
    return found;
  }

  /*
    Support angka bulan:
    1 -> January
    2 -> February
    dst.
  */

  const numericMonth =
    Number(value);

  if (
    numericMonth >= 1 &&
    numericMonth <= 12
  ) {
    return MONTHS[
      numericMonth - 1
    ];
  }

  /*
    Support nama bulan Indonesia.
  */

  const indonesiaMonths = {
    januari: 'January',
    februari: 'February',
    maret: 'March',
    april: 'April',
    mei: 'May',
    juni: 'June',
    juli: 'July',
    agustus: 'August',
    september: 'September',
    oktober: 'October',
    november: 'November',
    desember: 'December',
  };

  return (
    indonesiaMonths[
      stringValue
    ] || ''
  );
};

/* ============================================================
   DATE PARSER
============================================================ */

const getYearFromDate = (
  value
) => {
  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return null;
  }

  /*
    Jika Date object.
  */

  if (
    value instanceof Date &&
    !Number.isNaN(
      value.getTime()
    )
  ) {
    return value.getFullYear();
  }

  const stringValue =
    String(value).trim();

  /*
    YYYY-MM-DD
    YYYY/MM/DD
    YYYYMMDD
  */

  const yyyyMatch =
    stringValue.match(
      /^(\d{4})[-/]?\d{2}[-/]?\d{2}/
    );

  if (yyyyMatch) {
    return Number(
      yyyyMatch[1]
    );
  }

  /*
    DD/MM/YYYY
    DD-MM-YYYY
  */

  const ddMatch =
    stringValue.match(
      /^\d{1,2}[-/]\d{1,2}[-/](\d{4})/
    );

  if (ddMatch) {
    return Number(
      ddMatch[1]
    );
  }

  /*
    Fallback Date.
  */

  const parsedDate =
    new Date(stringValue);

  if (
    !Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return parsedDate.getFullYear();
  }

  return null;
};

/* ============================================================
   GET CURRENT + PREVIOUS YEAR
============================================================ */

const getDashboardYears = () => {
  const currentYear =
    new Date().getFullYear();

  return {
    currentYear,
    previousYear:
      currentYear - 1,
  };
};

/* ============================================================
   STRING SEARCH HELPER
============================================================ */

const containsAny = (
  value,
  keywords
) => {
  const text = String(
    value || ''
  )
    .toLowerCase()
    .replace(/\u00A0/g, ' ')
    .trim();

  return keywords.some(
    (keyword) =>
      text.includes(
        String(
          keyword
        ).toLowerCase()
      )
  );
};

/* ============================================================
   ACCOUNT CLASSIFICATION
   ------------------------------------------------------------
   Excel journal tidak mempunyai kolom:

   Penjualan
   Biaya Komitmen
   Biaya SDM
   Biaya Operasional
   Biaya Pengiriman

   Maka jurnal diklasifikasikan berdasarkan:
   - Account
   - Account Desc
   - Cost Center Desc
   - Text
   - Document type
============================================================ */

const classifyJournalRow = ({
  account,
  accountDesc,
  costCenterDesc,
  text,
  documentType,
}) => {
  const accountString =
    String(
      account || ''
    )
      .replace(/\s/g, '')
      .trim();

  const combinedText = [
    accountDesc,
    costCenterDesc,
    text,
    documentType,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  /* ========================================================
     PENJUALAN / REVENUE
  ======================================================== */

  const revenueKeywords = [
    'penjualan',
    'pendapatan',
    'revenue',
    'sales',
    'income',
    'pendapatan jasa',
    'pendapatan usaha',
  ];

  if (
    containsAny(
      combinedText,
      revenueKeywords
    )
  ) {
    return 'Penjualan';
  }

  /*
    Pada struktur COA umum,
    Account 4xxxxxxx sering digunakan
    untuk revenue / pendapatan.

    Kita gunakan sebagai fallback.
  */

  if (
    /^4/.test(
      accountString
    )
  ) {
    return 'Penjualan';
  }

  /* ========================================================
     BIAYA SDM
  ======================================================== */

  const sdmKeywords = [
    'gaji',
    'salary',
    'upah',
    'wages',
    'tunjangan',
    'allowance',
    'honor',
    'honorarium',
    'lembur',
    'overtime',
    'thr',
    'bpjs',
    'jamsostek',
    'pesangon',
    'pesangon',
    'karyawan',
    'pegawai',
    'personalia',
    'kepegawaian',
    'direktur',
    'direksi',
    'komisaris',
    'dewan komisaris',
    'fasilitas dekom',
    'employee',
    'manpower',
  ];

  if (
    containsAny(
      combinedText,
      sdmKeywords
    )
  ) {
    return 'BiayaSDM';
  }

  /* ========================================================
     BIAYA PENGIRIMAN
  ======================================================== */

  const shippingKeywords = [
    'pengiriman',
    'freight',
    'ekspedisi',
    'ongkir',
    'delivery',
    'transport pengiriman',
    'angkutan',
    'angkutan barang',
    'logistik',
    'logistic',
    'shipping',
    'cargo',
  ];

  if (
    containsAny(
      combinedText,
      shippingKeywords
    )
  ) {
    return 'BiayaPengiriman';
  }

  /* ========================================================
     BIAYA KOMITMEN
  ======================================================== */

  const commitmentKeywords = [
    'komitmen',
    'bop komitmen',
    'bop komit',
    'biaya komitmen',
  ];

  if (
    containsAny(
      combinedText,
      commitmentKeywords
    )
  ) {
    return 'BiayaKomitmen';
  }

  /* ========================================================
     BIAYA OPERASIONAL
     --------------------------------------------------------
     Semua biaya lain yang tidak termasuk:
     - Revenue
     - SDM
     - Pengiriman
     - Komitmen

     masuk ke Operasional.
  ======================================================== */

  return 'BiayaOperasional';
};

/* ============================================================
   GET POSITIVE COST VALUE
   ------------------------------------------------------------
   Untuk dashboard biaya, nominal biaya dibuat positif.

   Jika Excel mengandung nilai negatif akibat credit/reversal,
   nominal tersebut tetap mempertahankan tanda untuk revenue,
   tetapi biaya menggunakan nilai absolut.

   Ini membuat ratio biaya tetap terbaca sebagai persentase
   biaya terhadap penjualan.
============================================================ */

const getCostAmount = (
  value
) => {
  return Math.abs(
    parseNumber(value)
  );
};

/* ============================================================
   NORMALIZE EXCEL DATA
   ------------------------------------------------------------
   INI BAGIAN UTAMA.

   Setiap sheet tahun:
   2026
   2025

   dibaca kemudian seluruh journal
   dikelompokkan:

   Year + Month

   sehingga hasil akhirnya tetap mempunyai
   struktur yang sama seperti dashboard lama:

   Month
   Year
   Penjualan
   BiayaKomitmen
   BiayaSDM
   BiayaOperasional
   BiayaPengiriman
============================================================ */

const normalizeExcelData = (
  rows,
  sheetYear
) => {
  const grouped = {};

  rows.forEach((row) => {
    const amount =
      parseNumber(
        getExcelValue(row, [
          'Amount in local currency',
          'Amount in local currency ',
          'Amount',
        ])
      );

    /*
      Skip baris yang tidak mempunyai
      nominal.
    */

    if (
      amount === 0
    ) {
      return;
    }

    const monthValue =
      getExcelValue(row, [
        'Month',
      ]);

    const month =
      normalizeMonth(
        monthValue
      );

    if (!month) {
      return;
    }

    /*
      Tahun utama berasal dari nama sheet.

      Contoh:
      Sheet "2026"
      -> Year = 2026
    */

    const year =
      Number(sheetYear);

    if (!year) {
      return;
    }

    const account =
      getExcelValue(row, [
        'Account',
      ]);

    const accountDesc =
      getExcelValue(row, [
        'Account Desc',
      ]);

    const costCenterDesc =
      getExcelValue(row, [
        'Cost Center Desc',
      ]);

    const text =
      getExcelValue(row, [
        'Text',
      ]);

    const documentType =
      getExcelValue(row, [
        'Document type',
        'Document Type',
      ]);

    const category =
      classifyJournalRow({
        account,
        accountDesc,
        costCenterDesc,
        text,
        documentType,
      });

    const key =
      `${year}-${month}`;

    if (!grouped[key]) {
      grouped[key] = {
        Month: month,
        Year: year,

        Penjualan: 0,

        BiayaKomitmen: 0,

        BiayaSDM: 0,

        BiayaOperasional: 0,

        BiayaPengiriman: 0,

        TargetKomitmen:
          DEFAULT_TARGET.komitmen,

        TargetSDM:
          DEFAULT_TARGET.sdm,

        TargetOperasional:
          DEFAULT_TARGET.operasional,

        TargetPengiriman:
          DEFAULT_TARGET.pengiriman,

        TargetTotal:
          DEFAULT_TARGET.total,

        /*
          Tambahan informasi internal.
          Tidak mengubah tampilan dashboard.
        */

        TransactionCount: 0,
      };
    }

    grouped[
      key
    ].TransactionCount += 1;

    /* ======================================================
       REVENUE
    ====================================================== */

    if (
      category ===
      'Penjualan'
    ) {
      /*
        Revenue mengikuti nominal asli.

        Jika Excel menghasilkan revenue
        dengan tanda negatif, kita gunakan
        absolute agar penjualan tetap positif
        pada dashboard.
      */

      grouped[
        key
      ].Penjualan +=
        Math.abs(amount);

      return;
    }

    /* ======================================================
       COST
    ====================================================== */

    const costAmount =
      getCostAmount(
        amount
      );

    if (
      category ===
      'BiayaKomitmen'
    ) {
      grouped[
        key
      ].BiayaKomitmen +=
        costAmount;
    }

    if (
      category ===
      'BiayaSDM'
    ) {
      grouped[
        key
      ].BiayaSDM +=
        costAmount;
    }

    if (
      category ===
      'BiayaPengiriman'
    ) {
      grouped[
        key
      ].BiayaPengiriman +=
        costAmount;
    }

    if (
      category ===
      'BiayaOperasional'
    ) {
      grouped[
        key
      ].BiayaOperasional +=
        costAmount;
    }
  });

  return Object.values(
    grouped
  ).sort((a, b) => {
    if (
      Number(a.Year) !==
      Number(b.Year)
    ) {
      return (
        Number(a.Year) -
        Number(b.Year)
      );
    }

    return (
      getMonthIndex(
        a.Month
      ) -
      getMonthIndex(
        b.Month
      )
    );
  });
};

/* ============================================================
   RAW JOURNAL DATA FOR FILTERS
   ------------------------------------------------------------
   Unit Kerja  : Profit Center Desc, fallback Profit Center
   Kategori    : hasil classifyJournalRow()
============================================================ */

const normalizeJournalRows = (rows, sheetYear) => {
  return rows
    .map((row) => {
      const amount = parseNumber(
        getExcelValue(row, [
          'Amount in local currency',
          'Amount in local currency ',
          'Amount',
        ])
      );

      const month = normalizeMonth(
        getExcelValue(row, ['Month'])
      );

      const year = Number(sheetYear);

      if (!amount || !month || !year) {
        return null;
      }

      const account = getExcelValue(row, ['Account']);
      const accountDesc = getExcelValue(row, ['Account Desc']);
      const costCenterDesc = getExcelValue(row, ['Cost Center Desc']);
      const text = getExcelValue(row, ['Text']);
      const documentType = getExcelValue(row, [
        'Document type',
        'Document Type',
      ]);

      const category = classifyJournalRow({
        account,
        accountDesc,
        costCenterDesc,
        text,
        documentType,
      });

      const unitKerja =
        getExcelValue(row, [
          'Profit Center Desc',
          'Profit Center',
        ]) ||
        getExcelValue(row, [
          'Cost Center Desc',
          'Cost Center',
        ]) ||
        'Tidak Diketahui';

      return {
        Month: month,
        Year: year,
        Amount: amount,
        UnitKerja: String(unitKerja).trim() || 'Tidak Diketahui',
        KategoriBiaya: category,
      };
    })
    .filter(Boolean);
};

const aggregateJournalRows = (rows) => {
  const grouped = {};

  rows.forEach((row) => {
    const key = `${row.Year}-${row.Month}`;

    if (!grouped[key]) {
      grouped[key] = {
        Month: row.Month,
        Year: Number(row.Year),
        Penjualan: 0,
        BiayaKomitmen: 0,
        BiayaSDM: 0,
        BiayaOperasional: 0,
        BiayaPengiriman: 0,
        TargetKomitmen: DEFAULT_TARGET.komitmen,
        TargetSDM: DEFAULT_TARGET.sdm,
        TargetOperasional: DEFAULT_TARGET.operasional,
        TargetPengiriman: DEFAULT_TARGET.pengiriman,
        TargetTotal: DEFAULT_TARGET.total,
        TransactionCount: 0,
      };
    }

    const item = grouped[key];
    item.TransactionCount += 1;

    if (row.KategoriBiaya === 'Penjualan') {
      item.Penjualan += Math.abs(Number(row.Amount || 0));
      return;
    }

    const costAmount = Math.abs(Number(row.Amount || 0));

    if (row.KategoriBiaya === 'BiayaKomitmen') {
      item.BiayaKomitmen += costAmount;
    } else if (row.KategoriBiaya === 'BiayaSDM') {
      item.BiayaSDM += costAmount;
    } else if (row.KategoriBiaya === 'BiayaPengiriman') {
      item.BiayaPengiriman += costAmount;
    } else {
      item.BiayaOperasional += costAmount;
    }
  });

  return Object.values(grouped).sort((a, b) => {
    if (Number(a.Year) !== Number(b.Year)) {
      return Number(a.Year) - Number(b.Year);
    }

    return getMonthIndex(a.Month) - getMonthIndex(b.Month);
  });
};

const CATEGORY_OPTIONS = [
  { value: 'ALL', label: 'Semua Kategori Biaya' },
  { value: 'BiayaSDM', label: 'Biaya SDM' },
  { value: 'BiayaOperasional', label: 'Biaya Operasional' },
  { value: 'BiayaPengiriman', label: 'Biaya Pengiriman' },
  { value: 'BiayaKomitmen', label: 'BOP Komitmen' },
];

/* ============================================================
   SUMMARY CARD
============================================================ */

const SummaryCard = ({
  title,
  value,
  ratio,
  icon,
  iconBg,
  iconColor,
  suffix,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-blue-100 via-blue-500 to-blue-100" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold text-slate-500 leading-tight">
              {title}
            </p>
            <p className="mt-2 text-xl font-bold text-slate-800">
              {value}
            </p>
            {ratio !== undefined && (
              <div className="mt-1 flex items-center gap-1.5 text-[10px]">
                <span className="font-bold text-emerald-600">
                  {ratio}
                </span>
                <span className="text-slate-400">vs. {suffix}</span>
              </div>
            )}
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SECTION TITLE
============================================================ */

const SectionTitle = ({
  icon,
  title,
  subtitle,
}) => {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2">
        <div
          className="
            w-8
            h-8
            rounded-lg
            bg-blue-50
            text-blue-700
            flex
            items-center
            justify-center
          "
        >
          {icon}
        </div>

        <h2
          className="
            text-[16px]
            font-semibold
            text-gray-700
          "
        >
          {title}
        </h2>
      </div>

      {subtitle && (
        <p
          className="
            text-[11px]
            text-gray-400
            mt-1
          "
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

/* ============================================================
   INSIGHT UTAMA
============================================================ */

const InsightCard = ({
  total,
  ratioTotal,
  previousTotal,
  previousRatio,
  currentYear,
  previousYear,
}) => {
  const number = (value) => Number(value || 0);

  const getRatioDiff = (currentValue, previousValue) => {
    if (!previousValue || Number(previousValue) === 0) return null;
    return calculateRatio(currentValue, total.penjualan) -
      calculateRatio(previousValue, previousTotal?.penjualan);
  };

  const totalDiff =
    previousRatio !== null && previousRatio !== undefined
      ? ratioTotal - previousRatio
      : null;

  const sdmDiff = getRatioDiff(
    total.sdm,
    previousTotal?.sdm
  );

  const operationalDiff = getRatioDiff(
    total.operasional,
    previousTotal?.operasional
  );

  const shippingDiff = getRatioDiff(
    total.pengiriman,
    previousTotal?.pengiriman
  );

  const isDown = (diff) => diff !== null && diff < 0;

  const renderChange = (diff) => {
    if (diff === null || diff === undefined) {
      return (
        <span className="text-[10px] font-bold text-slate-400">
          —
        </span>
      );
    }

    return (
      <span
        className={`inline-flex items-center gap-1 text-[10px] font-bold ${
          isDown(diff) ? 'text-emerald-600' : 'text-rose-500'
        }`}
      >
        <span className="text-[12px] leading-none">
          {isDown(diff) ? '▼' : '▲'}
        </span>
        {Math.abs(diff).toFixed(2)}%
      </span>
    );
  };

  const getStatusText = (diff, type) => {
    if (diff === null || diff === undefined) {
      return `Perbandingan ${previousYear} belum tersedia.`;
    }

    if (type === 'total') {
      return isDown(diff)
        ? `lebih rendah dibanding ${previousYear}.`
        : `lebih tinggi dibanding ${previousYear}.`;
    }

    if (type === 'sdm') {
      return isDown(diff)
        ? 'penurunan signifikan, efisiensi SDM semakin baik.'
        : 'mengalami kenaikan dibanding periode sebelumnya.';
    }

    if (type === 'operasional') {
      return ratioTotal <= DEFAULT_TARGET.total
        ? 'terkendali dan sesuai target.'
        : 'perlu perhatian karena berada di atas target.';
    }

    return isDown(diff)
      ? 'menunjukkan perbaikan proses logistik.'
      : 'perlu evaluasi pada proses logistik.';
  };

  const rows = [
    {
      icon: <FaMoneyBillWave size={13} />,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-700',
      title: `Total Biaya YTD ${currentYear}`,
      value: ratioTotal,
      diff: totalDiff,
      description: getStatusText(totalDiff, 'total'),
    },
    {
      icon: <FaUsers size={13} />,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-700',
      title: 'Rasio Biaya SDM',
      value: calculateRatio(total.sdm, total.penjualan),
      diff: sdmDiff,
      description: getStatusText(sdmDiff, 'sdm'),
    },
    {
      icon: <FaCog size={13} />,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-700',
      title: 'Rasio Biaya Operasional',
      value: calculateRatio(total.operasional, total.penjualan),
      diff: operationalDiff,
      description: getStatusText(operationalDiff, 'operasional'),
    },
    {
      icon: <FaTruck size={13} />,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-700',
      title: 'Rasio Biaya Pengiriman',
      value: calculateRatio(total.pengiriman, total.penjualan),
      diff: shippingDiff,
      description: getStatusText(shippingDiff, 'pengiriman'),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* HEADER */}
      <div className="px-3.5 py-3 border-b border-slate-100 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FaLightbulb size={13} />
          </div>
          <h2 className="text-sm font-bold text-slate-700">
            Insight Utama
          </h2>
        </div>
      </div>

      {/* INSIGHT ROWS */}
      <div className="divide-y divide-slate-100">
        {rows.map((item) => (
          <div
            key={item.title}
            className="px-3.5 py-3"
          >
            <div className="flex gap-2.5">
              <div
                className={`w-7 h-7 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 mt-0.5`}
              >
                {item.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[10px] font-semibold text-slate-500 leading-tight">
                    {item.title}
                  </p>

                  <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold">✓</span>
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-[15px] font-extrabold text-slate-800 leading-none">
                    {item.value.toFixed(2)}%
                  </span>
                  {renderChange(item.diff)}
                </div>

                <p className="text-[9px] text-slate-500 leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RECOMMENDATION */}
      <div className="mx-2.5 mb-2.5 mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-[13px]">💡</span>
          <span className="text-[10px] font-bold text-amber-700">
            Rekomendasi
          </span>
        </div>

        <ul className="space-y-1 text-[9px] leading-relaxed text-slate-600 list-disc pl-3">
          <li>Pertahankan efisiensi biaya operasional.</li>
          <li>Lakukan evaluasi lebih lanjut pada bulan dengan kenaikan biaya.</li>
          <li>Fokus pada optimalisasi biaya pengiriman di area tertentu.</li>
        </ul>
      </div>
    </div>
  );
};

/* ============================================================
   CUSTOM TOOLTIP
============================================================ */

const ChartTooltip = ({
  active,
  payload,
  label,
}) => {
  if (
    !active ||
    !payload ||
    !payload.length
  ) {
    return null;
  }

  return (
    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-lg
        shadow-lg
        px-3
        py-2
      "
    >
      <p
        className="
          text-xs
          font-bold
          text-gray-700
          mb-1
        "
      >
        {label}
      </p>

      {payload.map(
        (item) => (
          <div
            key={
              item.dataKey
            }
            className="
              flex
              justify-between
              gap-5
              text-[11px]
            "
          >
            <span className="text-gray-500">
              {item.name}
            </span>

            <span className="font-bold">
              {formatPercent(
                item.value,
                2
              )}
            </span>
          </div>
        )
      )}
    </div>
  );
};

/* ============================================================
   MAIN COMPONENT
============================================================ */

const DashboardRasioBiaya =
  () => {
    const fileInputRef =
      useRef(null);

    const [
      data,
      setData,
    ] = useState([]);

    const [
      rawJournalData,
      setRawJournalData,
    ] = useState([]);

    const [
      fileName,
      setFileName,
    ] = useState('');

    const [
      loading,
      setLoading,
    ] = useState(false);

    const [
      hasUploadedExcel,
      setHasUploadedExcel,
    ] = useState(false);

    const [
      selectedYear,
      setSelectedYear,
    ] = useState('ALL');

    const [
      selectedMonth,
      setSelectedMonth,
    ] = useState('ALL');

    const [
      selectedUnitKerja,
      setSelectedUnitKerja,
    ] = useState('ALL');

    const [
      selectedCategory,
      setSelectedCategory,
    ] = useState('ALL');

    /* ========================================================
       CURRENT + PREVIOUS YEAR
    ======================================================== */

    const {
      currentYear,
      previousYear,
    } =
      useMemo(
        () =>
          getDashboardYears(),
        []
      );

    /* ========================================================
       FILTER OPTIONS
    ======================================================== */

    const yearOptions = useMemo(() => {
      return [
        ...new Set(
          rawJournalData
            .map((item) => Number(item.Year))
            .filter(Boolean)
        ),
      ].sort((a, b) => a - b);
    }, [rawJournalData]);

    const unitOptions = useMemo(() => {
      return [
        ...new Set(
          rawJournalData
            .map((item) => item.UnitKerja)
            .filter(Boolean)
        ),
      ].sort((a, b) => String(a).localeCompare(String(b), 'id'));
    }, [rawJournalData]);

    /* ========================================================
       FILTER RAW JOURNAL -> SUMMARY MONTHLY DATA
    ======================================================== */

    const filteredData = useMemo(() => {
      if (!rawJournalData.length) {
        return data.filter((item) => {
          const yearMatch =
            selectedYear === 'ALL' ||
            Number(item.Year) === Number(selectedYear);
          const monthMatch =
            selectedMonth === 'ALL' ||
            String(item.Month).toLowerCase() === String(selectedMonth).toLowerCase();
          return yearMatch && monthMatch;
        });
      }

      const filteredRaw = rawJournalData.filter((item) => {
        const yearMatch =
          selectedYear === 'ALL' ||
          Number(item.Year) === Number(selectedYear);

        const monthMatch =
          selectedMonth === 'ALL' ||
          String(item.Month).toLowerCase() === String(selectedMonth).toLowerCase();

        const unitMatch =
          selectedUnitKerja === 'ALL' ||
          item.UnitKerja === selectedUnitKerja;

        /* Revenue tetap ikut sebagai denominator ketika kategori biaya dipilih. */
        const categoryMatch =
          selectedCategory === 'ALL' ||
          item.KategoriBiaya === 'Penjualan' ||
          item.KategoriBiaya === selectedCategory;

        return yearMatch && monthMatch && unitMatch && categoryMatch;
      });

      return aggregateJournalRows(filteredRaw);
    }, [
      data,
      rawJournalData,
      selectedYear,
      selectedMonth,
      selectedUnitKerja,
      selectedCategory,
    ]);

    /* ========================================================
       SORT DATA
    ======================================================== */

    const sortedData = useMemo(() => {
      return [...filteredData].sort((a, b) => {
        if (Number(a.Year) !== Number(b.Year)) {
          return Number(a.Year) - Number(b.Year);
        }

        return getMonthIndex(a.Month) - getMonthIndex(b.Month);
      });
    }, [filteredData]);

    /* ========================================================
       TOTAL
    ======================================================== */

    const total =
      useMemo(() => {
        return sortedData.reduce(
          (
            acc,
            item
          ) => {
            acc.penjualan +=
              Number(
                item.Penjualan ||
                  0
              );

            acc.komitmen +=
              Number(
                item.BiayaKomitmen ||
                  0
              );

            acc.sdm +=
              Number(
                item.BiayaSDM ||
                  0
              );

            acc.operasional +=
              Number(
                item.BiayaOperasional ||
                  0
              );

            acc.pengiriman +=
              Number(
                item.BiayaPengiriman ||
                  0
              );

            return acc;
          },
          {
            penjualan: 0,
            komitmen: 0,
            sdm: 0,
            operasional: 0,
            pengiriman: 0,
          }
        );
      }, [
        sortedData,
      ]);

    /* ========================================================
       TOTAL BIAYA
    ======================================================== */

    const totalBiaya =
      total.komitmen +
      total.sdm +
      total.operasional +
      total.pengiriman;

    /* ========================================================
       GAUGE VALUES
    ======================================================== */

    const gaugeValues =
      useMemo(() => {
        return {
          komitmen:
            calculateRatio(
              total.komitmen,
              total.penjualan
            ),

          sdm:
            calculateRatio(
              total.sdm,
              total.penjualan
            ),

          operasional:
            calculateRatio(
              total.operasional,
              total.penjualan
            ),

          pengiriman:
            calculateRatio(
              total.pengiriman,
              total.penjualan
            ),

          total:
            calculateRatio(
              totalBiaya,
              total.penjualan
            ),
        };
      }, [
        total,
        totalBiaya,
      ]);

    /* ========================================================
       TARGET
    ======================================================== */

    const targetValues =
      useMemo(() => {
        const latest =
          sortedData[
            sortedData.length -
              1
          ];

        return {
          komitmen:
            latest?.TargetKomitmen ??
            DEFAULT_TARGET.komitmen,

          sdm:
            latest?.TargetSDM ??
            DEFAULT_TARGET.sdm,

          operasional:
            latest?.TargetOperasional ??
            DEFAULT_TARGET.operasional,

          pengiriman:
            latest?.TargetPengiriman ??
            DEFAULT_TARGET.pengiriman,

          total:
            latest?.TargetTotal ??
            DEFAULT_TARGET.total,
        };
      }, [
        sortedData,
      ]);

    /* ========================================================
       MERGE TREND BY MONTH
       --------------------------------------------------------
       Otomatis menggunakan:

       tahun berjalan
       tahun sebelumnya

       Misalnya sekarang 2026:

       ratio2025
       ratio2026
    ======================================================== */

    const mergedTrendData = useMemo(() => {
      const map = {};

      const trendRaw = rawJournalData.filter((item) => {
        const unitMatch =
          selectedUnitKerja === 'ALL' ||
          item.UnitKerja === selectedUnitKerja;

        const categoryMatch =
          selectedCategory === 'ALL' ||
          item.KategoriBiaya === 'Penjualan' ||
          item.KategoriBiaya === selectedCategory;

        const monthMatch =
          selectedMonth === 'ALL' ||
          String(item.Month).toLowerCase() === String(selectedMonth).toLowerCase();

        const yearMatch =
          Number(item.Year) === previousYear ||
          Number(item.Year) === currentYear;

        return unitMatch && categoryMatch && monthMatch && yearMatch;
      });

      aggregateJournalRows(trendRaw).forEach((item) => {
        const month = item.Month;

        if (!map[month]) {
          map[month] = {
            month,
            ratioPreviousYear: null,
            ratioCurrentYear: null,
          };
        }

        const totalItem =
          Number(item.BiayaKomitmen || 0) +
          Number(item.BiayaSDM || 0) +
          Number(item.BiayaOperasional || 0) +
          Number(item.BiayaPengiriman || 0);

        const ratio = calculateRatio(totalItem, item.Penjualan);

        if (Number(item.Year) === previousYear) {
          map[month].ratioPreviousYear = ratio;
        }

        if (Number(item.Year) === currentYear) {
          map[month].ratioCurrentYear = ratio;
        }
      });

      return MONTHS.filter((month) => map[month]).map((month) => map[month]);
    }, [
      rawJournalData,
      previousYear,
      currentYear,
      selectedMonth,
      selectedUnitKerja,
      selectedCategory,
    ]);

    /* ========================================================
       CONTRIBUTION DATA
    ======================================================== */

    const contributionData =
      useMemo(() => {
        const grouped = {};

        sortedData.forEach(
          (item) => {
            const key =
              `${item.Month} ${item.Year}`;

            if (
              !grouped[key]
            ) {
              grouped[key] = {
                name: key,
                sdm: 0,
                operasional: 0,
                pengiriman: 0,
                komitmen: 0,
                penjualan: 0,
              };
            }

            grouped[
              key
            ].sdm +=
              Number(
                item.BiayaSDM ||
                  0
              );

            grouped[
              key
            ].operasional +=
              Number(
                item.BiayaOperasional ||
                  0
              );

            grouped[
              key
            ].pengiriman +=
              Number(
                item.BiayaPengiriman ||
                  0
              );

            grouped[
              key
            ].komitmen +=
              Number(
                item.BiayaKomitmen ||
                  0
              );

            grouped[
              key
            ].penjualan +=
              Number(
                item.Penjualan ||
                  0
              );
          }
        );

        return Object.values(
          grouped
        ).map(
          (item) => ({
            name:
              item.name,

            sdm:
              calculateRatio(
                item.sdm,
                item.penjualan
              ),

            operasional:
              calculateRatio(
                item.operasional,
                item.penjualan
              ),

            pengiriman:
              calculateRatio(
                item.pengiriman,
                item.penjualan
              ),

            komitmen:
              calculateRatio(
                item.komitmen,
                item.penjualan
              ),
          })
        );
      }, [
        sortedData,
      ]);

    /* ========================================================
       TABLE DATA
    ======================================================== */

    const tableData =
      useMemo(() => {
        return sortedData.map(
          (item) => {
            const ratioKomitmen =
              calculateRatio(
                item.BiayaKomitmen,
                item.Penjualan
              );

            const ratioSDM =
              calculateRatio(
                item.BiayaSDM,
                item.Penjualan
              );

            const ratioOperasional =
              calculateRatio(
                item.BiayaOperasional,
                item.Penjualan
              );

            const ratioPengiriman =
              calculateRatio(
                item.BiayaPengiriman,
                item.Penjualan
              );

            const totalItem =
              Number(
                item.BiayaKomitmen ||
                  0
              ) +
              Number(
                item.BiayaSDM ||
                  0
              ) +
              Number(
                item.BiayaOperasional ||
                  0
              ) +
              Number(
                item.BiayaPengiriman ||
                  0
              );

            const ratioTotal =
              calculateRatio(
                totalItem,
                item.Penjualan
              );

            return {
              ...item,

              RatioKomitmen:
                ratioKomitmen,

              RatioSDM:
                ratioSDM,

              RatioOperasional:
                ratioOperasional,

              RatioPengiriman:
                ratioPengiriman,

              TotalBiaya:
                totalItem,

              RatioTotal:
                ratioTotal,
            };
          }
        );
      }, [
        sortedData,
      ]);

    /* ========================================================
       UPLOAD EXCEL
       --------------------------------------------------------
       Membaca otomatis sheet:

       currentYear
       previousYear

       Contoh pada tahun 2026:

       2026
       2025
    ======================================================== */

    const handleUploadExcel =
      (event) => {
        const file =
          event.target
            .files?.[0];

        if (!file) {
          return;
        }

        setLoading(true);

        const reader =
          new FileReader();

        reader.onload = (
          e
        ) => {
          try {
            const binary =
              e.target.result;

            const workbook =
              XLSX.read(
                binary,
                {
                  type: 'binary',
                  cellDates: true,
                }
              );

            /*
              Nama sheet yang wajib dicari.
            */

            const targetYears = [
              previousYear,
              currentYear,
            ];

            const availableSheets =
              workbook.SheetNames;

            const selectedSheets =
              targetYears
                .map(
                  (year) => ({
                    year,
                    sheetName:
                      availableSheets.find(
                        (
                          sheetName
                        ) =>
                          String(
                            sheetName
                          )
                            .trim() ===
                          String(
                            year
                          )
                      ),
                  })
                )
                .filter(
                  (item) =>
                    item.sheetName
                );

            /*
              Kalau tidak ditemukan sheet
              tahun berjalan maupun sebelumnya.
            */

            if (
              selectedSheets.length ===
              0
            ) {
              alert(
                `Sheet Excel tidak ditemukan.\n\n` +
                `Sistem mencari sheet:\n` +
                `- ${currentYear}\n` +
                `- ${previousYear}\n\n` +
                `Contoh:\n` +
                `${currentYear}\n` +
                `${previousYear}`
              );

              setLoading(
                false
              );

              return;
            }

            let allNormalizedData =
              [];

            let allRawJournalData =
              [];

            const validationErrors =
              [];

            /* ==================================================
               LOOP SHEET
            ================================================== */

            selectedSheets.forEach(
              ({
                year,
                sheetName,
              }) => {
                const worksheet =
                  workbook.Sheets[
                    sheetName
                  ];

                /*
                  VALIDASI HEADER
                */

                const validation =
                  validateExcelHeaders(
                    worksheet
                  );

                if (
                  !validation.valid
                ) {
                  validationErrors.push(
                    {
                      sheet:
                        sheetName,
                      missing:
                        validation.missing,
                    }
                  );

                  return;
                }

                /*
                  Baca data.
                */

                const rows =
                  XLSX.utils.sheet_to_json(
                    worksheet,
                    {
                      defval: '',
                      raw: false,
                    }
                  );

                const normalized =
                  normalizeExcelData(
                    rows,
                    year
                  );

                const rawNormalized =
                  normalizeJournalRows(
                    rows,
                    year
                  );

                allNormalizedData =
                  [
                    ...allNormalizedData,
                    ...normalized,
                  ];

                allRawJournalData =
                  [
                    ...allRawJournalData,
                    ...rawNormalized,
                  ];
              }
            );

            /* ==================================================
               VALIDATION ERROR
            ================================================== */

            if (
              validationErrors.length >
              0
            ) {
              const errorMessage =
                validationErrors
                  .map(
                    (item) =>
                      `Sheet ${item.sheet}:\n- ${item.missing.join(
                        '\n- '
                      )}`
                  )
                  .join(
                    '\n\n'
                  );

              alert(
                `Format kolom Excel tidak sesuai.\n\nKolom yang tidak ditemukan:\n\n${errorMessage}`
              );

              setLoading(
                false
              );

              return;
            }

            /* ==================================================
               NO DATA
            ================================================== */

            if (
              allNormalizedData.length ===
              0
            ) {
              alert(
                `Data Excel tidak ditemukan pada sheet ${currentYear} atau ${previousYear}.`
              );

              setLoading(
                false
              );

              return;
            }

            /*
              Sort semua data.
            */

            allNormalizedData.sort(
              (a, b) => {
                if (
                  Number(
                    a.Year
                  ) !==
                  Number(
                    b.Year
                  )
                ) {
                  return (
                    Number(
                      a.Year
                    ) -
                    Number(
                      b.Year
                    )
                  );
                }

                return (
                  getMonthIndex(
                    a.Month
                  ) -
                  getMonthIndex(
                    b.Month
                  )
                );
              }
            );

            /* ==================================================
               SET DATA
            ================================================== */

            setData(
              allNormalizedData
            );

            setRawJournalData(
              allRawJournalData
            );

            setFileName(
              file.name
            );

            setHasUploadedExcel(
              true
            );

            setSelectedYear(
              String(currentYear)
            );

            setSelectedMonth(
              'ALL'
            );

            setSelectedUnitKerja(
              'ALL'
            );

            setSelectedCategory(
              'ALL'
            );
          } catch (error) {
            console.error(
              'Error read Excel:',
              error
            );

            alert(
              'Gagal membaca file Excel.'
            );
          } finally {
            setLoading(
              false
            );
          }
        };

        reader.onerror =
          () => {
            setLoading(
              false
            );

            alert(
              'File Excel gagal dibaca.'
            );
          };

        reader.readAsBinaryString(
          file
        );
      };

    /* ========================================================
       RESET DATA
    ======================================================== */

    const handleResetData =
      () => {
        setData([]);

        setRawJournalData([]);

        setFileName('');

        setHasUploadedExcel(
          false
        );

        setSelectedYear(
          'ALL'
        );

        setSelectedMonth(
          'ALL'
        );

        setSelectedUnitKerja(
          'ALL'
        );

        setSelectedCategory(
          'ALL'
        );

        if (
          fileInputRef.current
        ) {
          fileInputRef.current.value =
            '';
        }
      };

    /* ========================================================
       DOWNLOAD TEMPLATE
       --------------------------------------------------------
       Template mengikuti struktur Excel jurnal baru.
    ======================================================== */

    const handleDownloadTemplate =
      () => {
        const template = [
          {
            'Profit Center':
              '2000',

            'Profit Center Desc':
              'KFTD Pusat',

            'Cost Center':
              '20000000',

            'Cost Center Desc':
              'DEWAN KOMISARIS',

            Account:
              '6100000000',

            'Account Desc':
              'Gaji Komisaris',

            'Amount in local currency':
              100000000,

            Assignment:
              '20260125',

            'Document Number':
              '3300000000',

            'Document type':
              'HR',

            'Document Date':
              '2026-01-25',

            'Posting Key':
              '40',

            Text: '',

            'Posting Date':
              '2026-01-25',

            Month:
              'January',
          },
        ];

        const worksheet =
          XLSX.utils.json_to_sheet(
            template
          );

        const workbook =
          XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          String(
            currentYear
          )
        );

        XLSX.writeFile(
          workbook,
          `Template_Rasio_Biaya_${currentYear}_${previousYear}.xlsx`
        );
      };

    /* ========================================================
       FILTER YEAR
    ======================================================== */

    useEffect(() => {
      if (
        selectedYear !== 'ALL' &&
        !yearOptions.includes(Number(selectedYear))
      ) {
        setSelectedYear(yearOptions.includes(currentYear) ? String(currentYear) : 'ALL');
      }
    }, [selectedYear, yearOptions, currentYear]);

    /* ========================================================
       INSIGHT COMPARISON DATA
    ======================================================== */

    const insightComparison = useMemo(() => {
      if (!rawJournalData.length) {
        return {
          totalBiaya: 0,
          penjualan: 0,
          ratio: null,
        };
      }

      const compareYear = previousYear;

      const rows = rawJournalData.filter((item) => {
        const yearMatch = Number(item.Year) === compareYear;
        const monthMatch =
          selectedMonth === 'ALL' ||
          String(item.Month).toLowerCase() === String(selectedMonth).toLowerCase();
        const unitMatch =
          selectedUnitKerja === 'ALL' ||
          item.UnitKerja === selectedUnitKerja;
        const categoryMatch =
          selectedCategory === 'ALL' ||
          item.KategoriBiaya === 'Penjualan' ||
          item.KategoriBiaya === selectedCategory;

        return yearMatch && monthMatch && unitMatch && categoryMatch;
      });

      const comparison = aggregateJournalRows(rows).reduce(
        (acc, item) => {
          acc.penjualan += Number(item.Penjualan || 0);
          acc.komitmen += Number(item.BiayaKomitmen || 0);
          acc.sdm += Number(item.BiayaSDM || 0);
          acc.operasional += Number(item.BiayaOperasional || 0);
          acc.pengiriman += Number(item.BiayaPengiriman || 0);
          return acc;
        },
        {
          penjualan: 0,
          komitmen: 0,
          sdm: 0,
          operasional: 0,
          pengiriman: 0,
        }
      );

      comparison.totalBiaya =
        comparison.komitmen +
        comparison.sdm +
        comparison.operasional +
        comparison.pengiriman;

      comparison.ratio = calculateRatio(
        comparison.totalBiaya,
        comparison.penjualan
      );

      return comparison;
    }, [
      rawJournalData,
      previousYear,
      selectedMonth,
      selectedUnitKerja,
      selectedCategory,
    ]);

    /* ========================================================
       RENDER
    ======================================================== */

    const ratioTotal = calculateRatio(totalBiaya, total.penjualan);
    const ratioSDM = calculateRatio(total.sdm, total.penjualan);
    const ratioOperasional = calculateRatio(total.operasional, total.penjualan);
    const ratioPengiriman = calculateRatio(total.pengiriman, total.penjualan);

    const formatShortRupiah = (value) => {
      const number = Number(value || 0);
      if (Math.abs(number) >= 1000000000) {
        return `Rp ${(number / 1000000000).toFixed(2)} M`;
      }
      if (Math.abs(number) >= 1000000) {
        return `Rp ${(number / 1000000).toFixed(2)} Jt`;
      }
      if (Math.abs(number) >= 1000) {
        return `Rp ${(number / 1000).toFixed(1)} Rb`;
      }
      return formatRupiah(number);
    };

    const efficiencyText =
      ratioTotal <= DEFAULT_TARGET.total
        ? 'Rasio total biaya berada dalam batas target.'
        : 'Rasio total biaya berada di atas target.';

    return (
      <div className="min-h-screen bg-slate-100 p-3 md:p-5">
        {/* HEADER + UPLOAD */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 rounded-2xl shadow-md border border-blue-900 px-4 md:px-6 py-4 mb-4 text-white">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                <FaChartLine size={21} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                  Rasio Biaya YTD {currentYear}
                </h1>
                <p className="text-[11px] md:text-xs text-blue-100 mt-0.5">
                  Monitoring efisiensi biaya operasional & kinerja keuangan
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={handleUploadExcel}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition disabled:opacity-60"
              >
                <FaUpload size={12} />
                {loading ? 'Membaca Excel...' : 'Upload Excel'}
              </button>

              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
              >
                <FaDownload size={12} />
                Template Excel
              </button>

              {hasUploadedExcel && (
                <button
                  type="button"
                  onClick={handleResetData}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-white text-xs font-bold transition"
                >
                  <FaTrash size={11} />
                  Reset
                </button>
              )}
            </div>
          </div>

          {hasUploadedExcel && fileName && (
            <div className="mt-3 flex flex-wrap items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-[11px] text-blue-50">
              <FaFileExcel />
              <span>File aktif:</span>
              <strong>{fileName}</strong>
              <span className="text-blue-200">• {rawJournalData.length} transaksi</span>
              <span className="text-blue-200">• Sheet {previousYear} & {currentYear}</span>
            </div>
          )}
        </div>

        {!hasUploadedExcel ? (
          <div className="bg-white rounded-2xl border border-slate-200 min-h-[500px] flex flex-col items-center justify-center text-center shadow-sm px-5">
            <div className="w-20 h-20 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
              <FaFileExcel size={34} />
            </div>
            <h2 className="text-lg font-bold text-slate-700">Silakan Upload Data Excel</h2>
            <p className="text-xs text-slate-400 mt-2 max-w-lg leading-relaxed">
              Dashboard akan menampilkan grafik dan ringkasan setelah data Excel berhasil dibaca.
              Gunakan sheet tahun berjalan dan tahun sebelumnya sesuai template.
            </p>
            <p className="text-[11px] text-blue-600 mt-3 font-semibold">
              Sheet yang dibaca: {previousYear} & {currentYear}
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
            >
              <FaUpload size={12} />
              Upload Excel
            </button>
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="mt-3 text-[11px] text-blue-600 hover:text-blue-700 font-semibold transition"
            >
              Download Template Excel
            </button>
          </div>
        ) : (
          <>
            {/* =================================================
                SUMMARY CARDS - SESUAI DESIGN GAMBAR
                Total Biaya s/d Biaya Pengiriman dibuat 1 row
            ================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-4">
              {/* TOTAL BIAYA */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[108px]">
                <div className="h-1 bg-gradient-to-r from-blue-100 via-blue-500 to-blue-100" />
                <div className="p-3.5 h-full flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <FaMoneyBillWave size={23} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-slate-500 leading-tight">
                      Total Biaya YTD {selectedYear === 'ALL' ? currentYear : selectedYear}
                    </p>
                    <p className="mt-1 text-[21px] font-extrabold leading-none text-slate-800">
                      {formatShortRupiah(totalBiaya)}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 whitespace-nowrap">
                      <span className="text-[10px] font-bold text-emerald-600">
                        ▼ {Math.abs(
                          insightComparison && insightComparison.totalBiaya > 0
                            ? ((totalBiaya - insightComparison.totalBiaya) / insightComparison.totalBiaya) * 100
                            : 0
                        ).toFixed(2)}%
                      </span>
                      <span className="text-[9px] text-slate-400">vs. {previousYear}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BIAYA SDM */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[108px]">
                <div className="h-1 bg-gradient-to-r from-purple-100 via-purple-500 to-purple-100" />
                <div className="p-3.5 h-full flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <FaUsers size={23} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-slate-500 leading-tight">
                      Biaya SDM YTD {selectedYear === 'ALL' ? currentYear : selectedYear}
                    </p>
                    <p className="mt-1 text-[21px] font-extrabold leading-none text-slate-800">
                      {formatShortRupiah(total.sdm)}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 whitespace-nowrap">
                      <span className="text-[10px] font-bold text-emerald-600">
                        ▼ {ratioSDM.toFixed(2)}%
                      </span>
                      <span className="text-[9px] text-slate-400">vs. {previousYear}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BIAYA OPERASIONAL */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[108px]">
                <div className="h-1 bg-gradient-to-r from-slate-100 via-slate-500 to-slate-100" />
                <div className="p-3.5 h-full flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <FaCog size={23} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-slate-500 leading-tight">
                      Biaya Operasional YTD {selectedYear === 'ALL' ? currentYear : selectedYear}
                    </p>
                    <p className="mt-1 text-[21px] font-extrabold leading-none text-slate-800">
                      {formatShortRupiah(total.operasional)}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 whitespace-nowrap">
                      <span className="text-[10px] font-bold text-emerald-600">
                        ▼ {ratioOperasional.toFixed(2)}%
                      </span>
                      <span className="text-[9px] text-slate-400">vs. {previousYear}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BIAYA PENGIRIMAN */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[108px]">
                <div className="h-1 bg-gradient-to-r from-emerald-100 via-emerald-500 to-emerald-100" />
                <div className="p-3.5 h-full flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <FaTruck size={23} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-slate-500 leading-tight">
                      Biaya Pengiriman YTD {selectedYear === 'ALL' ? currentYear : selectedYear}
                    </p>
                    <p className="mt-1 text-[21px] font-extrabold leading-none text-slate-800">
                      {formatShortRupiah(total.pengiriman)}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 whitespace-nowrap">
                      <span className="text-[10px] font-bold text-emerald-600">
                        ▼ {ratioPengiriman.toFixed(2)}%
                      </span>
                      <span className="text-[9px] text-slate-400">vs. {previousYear}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* EFISIENSI */}
              <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 rounded-xl shadow-sm overflow-hidden min-h-[108px] text-white">
                <div className="p-3.5 h-full flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                    <FaBullseye size={24} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-white leading-tight">
                      Efisiensi Biaya Berkelanjutan
                    </p>
                    <p className="mt-1 text-[10px] leading-relaxed text-blue-100">
                      Menjaga profitabilitas dengan pengendalian biaya yang lebih baik.
                    </p>
                    <div className="mt-1.5 flex justify-end">
                      <FaChartLine size={18} className="text-blue-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CHARTS + SIDEBAR */}
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_315px] gap-4 mb-4 items-start">
              {/* LEFT: CHARTS */}
              <div className="space-y-4">
                {/* TREND RATIO */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                  <SectionTitle
                    icon={<FaChartLine size={14} />}
                    title={`Tren Rasio Biaya YTD ${previousYear} vs ${currentYear}`}
                    subtitle="Perbandingan rasio total biaya terhadap penjualan per bulan"
                  />

                  <div className="h-[330px] w-full overflow-x-auto">
                    <div className="h-full min-w-[680px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mergedTrendData} margin={{ top: 35, right: 15, left: 0, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="2 4" vertical={false} />
                          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} tickFormatter={(value) => `${value}%`} />
                          <Tooltip content={<ChartTooltip />} />
                          <Legend wrapperStyle={{ fontSize: '11px' }} />
                          <Line type="monotone" dataKey="ratioPreviousYear" name={`% Total Biaya ${previousYear}`} stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }}>
                            <LabelList
                              dataKey="ratioPreviousYear"
                              position="top"
                              formatter={(value) => value === null || value === undefined ? '' : `${Number(value || 0).toFixed(2)}%`}
                              style={{ fontSize: 12, fontWeight: 700, fill: '#1d4ed8', paintOrder: 'stroke', stroke: '#fff', strokeWidth: 4 }}
                            />
                          </Line>
                          <Line type="monotone" dataKey="ratioCurrentYear" name={`% Total Biaya ${currentYear}`} stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }}>
                            <LabelList
                              dataKey="ratioCurrentYear"
                              position="top"
                              formatter={(value) => value === null || value === undefined ? '' : `${Number(value || 0).toFixed(2)}%`}
                              style={{ fontSize: 12, fontWeight: 700, fill: '#d97706', paintOrder: 'stroke', stroke: '#fff', strokeWidth: 4 }}
                            />
                          </Line>
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* KONTRIBUSI BIAYA */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                  <SectionTitle
                    icon={<FaPercentage size={14} />}
                    title="Kontribusi Biaya per Kategori"
                    subtitle="Kontribusi masing-masing komponen biaya terhadap penjualan"
                  />

                  <div className="h-[330px] w-full overflow-x-auto">
                    <div className="h-full min-w-[900px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={contributionData} barCategoryGap="18%" barGap={6} margin={{ top: 48, right: 18, left: 0, bottom: 45 }}>
                          <CartesianGrid strokeDasharray="2 4" vertical={false} />
                          <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#475569' }} interval={0} angle={-20} textAnchor="end" tickMargin={8} />
                          <YAxis tick={{ fontSize: 10 }} tickFormatter={(value) => `${value}%`} />
                          <Tooltip content={<ChartTooltip />} />
                          <Bar dataKey="sdm" name="% Biaya SDM" fill="#ef4444" barSize={32} radius={[2, 2, 0, 0]}>
                            <LabelList dataKey="sdm" position="top" formatter={(value) => `${Number(value || 0).toFixed(2)}%`} style={{ fontSize: 9, fontWeight: 600, fill: '#334155', paintOrder: 'stroke', stroke: '#fff', strokeWidth: 3 }} />
                          </Bar>
                          <Bar dataKey="operasional" name="% Biaya Operasional" fill="#4338ca" barSize={32} radius={[2, 2, 0, 0]}>
                            <LabelList dataKey="operasional" position="top" formatter={(value) => `${Number(value || 0).toFixed(2)}%`} style={{ fontSize: 9, fontWeight: 600, fill: '#334155', paintOrder: 'stroke', stroke: '#fff', strokeWidth: 3 }} />
                          </Bar>
                          <Bar dataKey="pengiriman" name="% Biaya Pengiriman" fill="#64748b" barSize={32} radius={[2, 2, 0, 0]}>
                            <LabelList dataKey="pengiriman" position="top" formatter={(value) => `${Number(value || 0).toFixed(2)}%`} style={{ fontSize: 9, fontWeight: 600, fill: '#334155', paintOrder: 'stroke', stroke: '#fff', strokeWidth: 3 }} />
                          </Bar>
                          <Bar dataKey="komitmen" name="% BOP Komitmen" fill="#eab308" barSize={32} radius={[2, 2, 0, 0]}>
                            <LabelList dataKey="komitmen" position="top" formatter={(value) => `${Number(value || 0).toFixed(2)}%`} style={{ fontSize: 9, fontWeight: 600, fill: '#334155', paintOrder: 'stroke', stroke: '#fff', strokeWidth: 3 }} />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2 text-[10px] font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-red-500" />% Biaya SDM</span>
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-indigo-700" />% Biaya Operasional</span>
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-slate-500" />% Biaya Pengiriman</span>
                    <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-yellow-500" />% BOP Komitmen</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: FILTER + INSIGHT */}
              <div className="space-y-4">
                {/* FILTER DATA */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                      <FaFilter size={13} />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-700">Filter Data</h2>
                      <p className="text-[10px] text-slate-400">Pilih periode dan kategori biaya</p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <label className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600 mb-1"><FaCalendarAlt className="text-slate-400" /> Tahun</label>
                      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-9 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-blue-400 bg-white">
                        <option value="ALL">Semua Tahun</option>
                        {yearOptions.map((year) => <option key={year} value={year}>{year}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600 mb-1"><FaCalendarAlt className="text-slate-400" /> Bulan</label>
                      <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full h-9 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-blue-400 bg-white">
                        <option value="ALL">Semua Bulan</option>
                        {MONTHS.map((month) => <option key={month} value={month}>{month}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600 mb-1"><FaBuilding className="text-slate-400" /> Unit Kerja</label>
                      <select value={selectedUnitKerja} onChange={(e) => setSelectedUnitKerja(e.target.value)} className="w-full h-9 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-blue-400 bg-white">
                        <option value="ALL">Semua Unit Kerja</option>
                        {unitOptions.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600 mb-1"><FaTags className="text-slate-400" /> Kategori Biaya</label>
                      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full h-9 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-blue-400 bg-white">
                        {CATEGORY_OPTIONS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="mt-3 bg-blue-50 rounded-lg px-3 py-2 text-[10px] text-blue-700">
                    <strong>Data tampil:</strong> {sortedData.length} periode
                  </div>
                </div>

                {/* INSIGHT UTAMA */}
                <InsightCard
                  total={{ ...total, totalBiaya }}
                  ratioTotal={ratioTotal}
                  previousTotal={
                    insightComparison && insightComparison.totalBiaya > 0
                      ? insightComparison
                      : null
                  }
                  previousRatio={
                    insightComparison && insightComparison.penjualan > 0
                      ? insightComparison.ratio
                      : null
                  }
                  currentYear={selectedYear === 'ALL' ? currentYear : selectedYear}
                  previousYear={previousYear}
                  selectedCategory={selectedCategory}
                />
              </div>
            </div>

            {/* DETAIL TABLE */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FaMoneyBillWave size={13} />
                    </div>
                    <h2 className="text-sm font-bold text-slate-700">Detail Rasio Biaya</h2>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Data mengikuti filter dan file Excel yang di-upload
                  </p>
                </div>
                <div className="text-[11px] text-slate-500">
                  Total Penjualan: <strong className="text-slate-800">{formatShortRupiah(total.penjualan)}</strong>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-[1400px] w-full text-xs">
                  <thead>
                    <tr className="bg-blue-700 text-white">
                      <th className="px-3 py-2.5 text-left font-semibold">Bulan</th>
                      <th className="px-3 py-2.5 text-left font-semibold">Tahun</th>
                      <th className="px-3 py-2.5 text-right font-semibold">Penjualan</th>
                      <th className="px-3 py-2.5 text-right font-semibold">Biaya Komitmen</th>
                      <th className="px-3 py-2.5 text-right font-semibold">% B. Kom</th>
                      <th className="px-3 py-2.5 text-right font-semibold">Biaya SDM</th>
                      <th className="px-3 py-2.5 text-right font-semibold">% B. SDM</th>
                      <th className="px-3 py-2.5 text-right font-semibold">Biaya Operasional</th>
                      <th className="px-3 py-2.5 text-right font-semibold">% B. OPS</th>
                      <th className="px-3 py-2.5 text-right font-semibold">Biaya Pengiriman</th>
                      <th className="px-3 py-2.5 text-right font-semibold">% B. PENG</th>
                      <th className="px-3 py-2.5 text-right font-semibold">Total Biaya</th>
                      <th className="px-3 py-2.5 text-right font-semibold">% Total Biaya</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.length === 0 ? (
                      <tr>
                        <td colSpan={13} className="text-center py-10 text-slate-400">Tidak ada data</td>
                      </tr>
                    ) : (
                      tableData.map((item, index) => (
                        <tr
                          key={`${item.Month}-${item.Year}-${index}`}
                          className={`border-b border-slate-100 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50 transition`}
                        >
                          <td className="px-3 py-2 text-slate-700">{item.Month}</td>
                          <td className="px-3 py-2 text-slate-700">{item.Year}</td>
                          <td className="px-3 py-2 text-right text-slate-700">{formatNumber(item.Penjualan)}</td>
                          <td className="px-3 py-2 text-right text-slate-700">{formatNumber(item.BiayaKomitmen)}</td>
                          <td className="px-3 py-2 text-right font-medium text-blue-600">{formatPercent(item.RatioKomitmen)}</td>
                          <td className="px-3 py-2 text-right text-slate-700">{formatNumber(item.BiayaSDM)}</td>
                          <td className="px-3 py-2 text-right font-medium text-purple-600">{formatPercent(item.RatioSDM)}</td>
                          <td className="px-3 py-2 text-right text-slate-700">{formatNumber(item.BiayaOperasional)}</td>
                          <td className="px-3 py-2 text-right font-medium text-orange-600">{formatPercent(item.RatioOperasional)}</td>
                          <td className="px-3 py-2 text-right text-slate-700">{formatNumber(item.BiayaPengiriman)}</td>
                          <td className="px-3 py-2 text-right font-medium text-slate-600">{formatPercent(item.RatioPengiriman)}</td>
                          <td className="px-3 py-2 text-right font-semibold text-slate-800">{formatNumber(item.TotalBiaya)}</td>
                          <td className="px-3 py-2 text-right font-bold text-blue-700">{formatPercent(item.RatioTotal)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  {tableData.length > 0 && (
                    <tfoot>
                      <tr className="bg-slate-100 border-t-2 border-blue-500">
                        <td colSpan={2} className="px-3 py-2.5 font-bold text-slate-800">Total</td>
                        <td className="px-3 py-2.5 text-right font-bold text-slate-800">{formatNumber(total.penjualan)}</td>
                        <td className="px-3 py-2.5 text-right font-bold">{formatNumber(total.komitmen)}</td>
                        <td className="px-3 py-2.5 text-right font-bold text-blue-600">{formatPercent(calculateRatio(total.komitmen, total.penjualan))}</td>
                        <td className="px-3 py-2.5 text-right font-bold">{formatNumber(total.sdm)}</td>
                        <td className="px-3 py-2.5 text-right font-bold text-purple-600">{formatPercent(ratioSDM)}</td>
                        <td className="px-3 py-2.5 text-right font-bold">{formatNumber(total.operasional)}</td>
                        <td className="px-3 py-2.5 text-right font-bold text-orange-600">{formatPercent(ratioOperasional)}</td>
                        <td className="px-3 py-2.5 text-right font-bold">{formatNumber(total.pengiriman)}</td>
                        <td className="px-3 py-2.5 text-right font-bold text-slate-600">{formatPercent(ratioPengiriman)}</td>
                        <td className="px-3 py-2.5 text-right font-bold text-slate-800">{formatNumber(totalBiaya)}</td>
                        <td className="px-3 py-2.5 text-right font-bold text-blue-700">{formatPercent(ratioTotal)}</td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 py-5 text-[10px] text-slate-400">
              <span className="font-bold text-blue-600">KFCOLLS</span>
              <span>•</span>
              <span>Dashboard Rasio Biaya</span>
            </div>
          </>
        )}
      </div>
    );
  };

export default DashboardRasioBiaya;