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
  FaDownload,
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
   GAUGE
============================================================ */

const Gauge = ({
  value = 0,
  target = 0,
}) => {
  const safeValue =
    Math.max(
      0,
      Number(value || 0)
    );

  const maxValue =
    Math.max(
      10,
      target * 1.5,
      safeValue * 1.15
    );

  const percentage =
    Math.min(
      safeValue / maxValue,
      1
    );

  const cx = 100;
  const cy = 100;
  const radius = 72;

  const startAngle =
    -135;

  const endAngle =
    135;

  const valueAngle =
    startAngle +
    percentage *
      (endAngle -
        startAngle);

  const polarToCartesian = (
    centerX,
    centerY,
    radiusValue,
    angle
  ) => {
    const angleInRadians =
      ((angle - 90) *
        Math.PI) /
      180;

    return {
      x:
        centerX +
        radiusValue *
          Math.cos(
            angleInRadians
          ),
      y:
        centerY +
        radiusValue *
          Math.sin(
            angleInRadians
          ),
    };
  };

  const describeArc = (
    start,
    end
  ) => {
    const startPoint =
      polarToCartesian(
        cx,
        cy,
        radius,
        end
      );

    const endPoint =
      polarToCartesian(
        cx,
        cy,
        radius,
        start
      );

    const largeArcFlag =
      end - start <= 180
        ? '0'
        : '1';

    return [
      'M',
      startPoint.x,
      startPoint.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      endPoint.x,
      endPoint.y,
    ].join(' ');
  };

  const needlePoint =
    polarToCartesian(
      cx,
      cy,
      radius - 5,
      valueAngle
    );

  return (
    <div className="w-full flex justify-center">
      <svg
        viewBox="0 0 200 145"
        className="w-[190px] h-[145px]"
      >
        <path
          d={describeArc(
            -135,
            -45
          )}
          fill="none"
          stroke="#16f000"
          strokeWidth="18"
          strokeLinecap="butt"
        />

        <path
          d={describeArc(
            -45,
            45
          )}
          fill="none"
          stroke="#fff000"
          strokeWidth="18"
          strokeLinecap="butt"
        />

        <path
          d={describeArc(
            45,
            135
          )}
          fill="none"
          stroke="#d83b4b"
          strokeWidth="18"
          strokeLinecap="butt"
        />

        <line
          x1={cx}
          y1={cy}
          x2={needlePoint.x}
          y2={needlePoint.y}
          stroke="#6b7280"
          strokeWidth="3"
        />

        <circle
          cx={cx}
          cy={cy}
          r="13"
          fill="white"
          stroke="#374151"
          strokeWidth="3"
        />

        <text
          x="100"
          y="130"
          textAnchor="middle"
          fontSize="15"
          fill="#333"
          fontWeight="500"
        >
          {formatPercent(
            target,
            2
          )}
          {' / '}
          {formatPercent(
            value,
            2
          )}
        </text>
      </svg>
    </div>
  );
};

/* ============================================================
   GAUGE CARD
============================================================ */

const GaugeCard = ({
  title,
  icon,
  value,
  target,
  iconBg,
  iconColor,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-lg
        shadow-[0_3px_15px_rgba(0,0,0,0.18)]
        border
        border-gray-100
        overflow-hidden
      "
    >
      <div className="px-3 pt-2">
        <div className="flex items-center gap-2">
          <div
            className={`
              w-7
              h-7
              rounded-lg
              flex
              items-center
              justify-center
              ${iconBg}
              ${iconColor}
            `}
          >
            {icon}
          </div>

          <div
            className="
              text-[13px]
              font-medium
              text-gray-700
              whitespace-nowrap
            "
          >
            {title}
          </div>
        </div>
      </div>

      <Gauge
        value={value}
        target={target}
      />
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
       YEAR OPTIONS
    ======================================================== */

    const yearOptions =
      useMemo(() => {
        return [
          ...new Set(
            data
              .map(
                (item) =>
                  Number(
                    item.Year
                  )
              )
              .filter(Boolean)
          ),
        ].sort(
          (a, b) =>
            a - b
        );
      }, [data]);

    /* ========================================================
       FILTER DATA
    ======================================================== */

    const filteredData =
      useMemo(() => {
        return data.filter(
          (item) => {
            const yearMatch =
              selectedYear ===
                'ALL' ||
              Number(
                item.Year
              ) ===
                Number(
                  selectedYear
                );

            const monthMatch =
              selectedMonth ===
                'ALL' ||
              String(
                item.Month
              ).toLowerCase() ===
                String(
                  selectedMonth
                ).toLowerCase();

            return (
              yearMatch &&
              monthMatch
            );
          }
        );
      }, [
        data,
        selectedYear,
        selectedMonth,
      ]);

    /* ========================================================
       SORT DATA
    ======================================================== */

    const sortedData =
      useMemo(() => {
        return [
          ...filteredData,
        ].sort((a, b) => {
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
        });
      }, [
        filteredData,
      ]);

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

    const mergedTrendData =
      useMemo(() => {
        const map = {};

        sortedData.forEach(
          (item) => {
            const month =
              item.Month;

            if (
              !map[month]
            ) {
              map[month] = {
                month,
                ratioPreviousYear:
                  null,
                ratioCurrentYear:
                  null,
              };
            }

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

            const ratio =
              calculateRatio(
                totalItem,
                item.Penjualan
              );

            if (
              Number(
                item.Year
              ) ===
              previousYear
            ) {
              map[
                month
              ].ratioPreviousYear =
                ratio;
            }

            if (
              Number(
                item.Year
              ) ===
              currentYear
            ) {
              map[
                month
              ].ratioCurrentYear =
                ratio;
            }
          }
        );

        return MONTHS.filter(
          (month) =>
            map[month]
        ).map(
          (month) =>
            map[month]
        );
      }, [
        sortedData,
        currentYear,
        previousYear,
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

                allNormalizedData =
                  [
                    ...allNormalizedData,
                    ...normalized,
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

            setFileName(
              file.name
            );

            setHasUploadedExcel(
              true
            );

            setSelectedYear(
              'ALL'
            );

            setSelectedMonth(
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
        selectedYear !==
          'ALL' &&
        !yearOptions.includes(
          Number(
            selectedYear
          )
        )
      ) {
        setSelectedYear(
          'ALL'
        );
      }
    }, [
      selectedYear,
      yearOptions,
    ]);

    /* ========================================================
       RENDER
    ======================================================== */

    return (
      <div
        className="
          min-h-screen
          bg-gray-100
          p-3
          md:p-5
        "
      >
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div
          className="
            bg-white
            rounded-xl
            shadow-sm
            border
            border-gray-200
            px-4
            py-3
            mb-4
          "
        >
          <div
            className="
              flex
              flex-col
              xl:flex-row
              xl:items-center
              xl:justify-between
              gap-3
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <div
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-blue-50
                    text-blue-600
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaPercentage
                    size={16}
                  />
                </div>

                <div>
                  <h1
                    className="
                      text-lg
                      font-bold
                      text-gray-800
                    "
                  >
                    Dashboard Rasio Biaya
                  </h1>

                  <p
                    className="
                      text-[11px]
                      text-gray-400
                    "
                  >
                    Monitoring rasio dan kontribusi biaya
                  </p>
                </div>
              </div>
            </div>

            {/* UPLOAD */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <input
                ref={
                  fileInputRef
                }
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={
                  handleUploadExcel
                }
              />

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                disabled={
                  loading
                }
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-emerald-600
                  hover:bg-emerald-700
                  text-white
                  text-xs
                  font-bold
                  shadow-sm
                  transition
                  disabled:opacity-60
                "
              >
                <FaUpload
                  size={12}
                />

                {loading
                  ? 'Membaca Excel...'
                  : 'Upload Excel'}
              </button>

              <button
                type="button"
                onClick={
                  handleDownloadTemplate
                }
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-blue-50
                  hover:bg-blue-100
                  text-blue-600
                  text-xs
                  font-bold
                  transition
                "
              >
                <FaDownload
                  size={12}
                />

                Template Excel
              </button>

              {hasUploadedExcel && (
                <button
                  type="button"
                  onClick={
                    handleResetData
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2.5
                    rounded-xl
                    bg-red-50
                    hover:bg-red-100
                    text-red-500
                    text-xs
                    font-bold
                    transition
                  "
                >
                  <FaTrash
                    size={11}
                  />

                  Reset
                </button>
              )}
            </div>
          </div>

          {/* FILE INFO */}

          {hasUploadedExcel &&
            fileName && (
              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  items-center
                  gap-2
                  bg-emerald-50
                  border
                  border-emerald-100
                  rounded-lg
                  px-3
                  py-2
                  text-xs
                  text-emerald-700
                "
              >
                <FaFileExcel />

                <span>
                  File aktif:
                </span>

                <strong>
                  {fileName}
                </strong>

                <span className="text-emerald-500">
                  • {data.length}{' '}
                  periode data
                </span>

                <span className="text-emerald-500">
                  • Sheet{' '}
                  {previousYear}{' '}
                  &{' '}
                  {currentYear}
                </span>
              </div>
            )}
        </div>

        {/* ====================================================
            BEFORE UPLOAD
        ==================================================== */}

        {!hasUploadedExcel ? (
          <>
            <div
              className="
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
                px-5
              "
            >
              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-green-50
                  text-green-600
                  flex
                  items-center
                  justify-center
                  mb-4
                "
              >
                <FaFileExcel
                  size={28}
                />
              </div>

              <h2
                className="
                  font-bold
                  text-gray-700
                "
              >
                Silakan Upload Excel
              </h2>

              <p
                className="
                  text-xs
                  text-gray-400
                  mt-1
                  max-w-md
                  leading-relaxed
                "
              >
                Upload Excel dengan
                sheet tahun berjalan
                dan tahun sebelumnya.
                Dashboard akan otomatis
                membaca data journal,
                menghitung penjualan,
                biaya SDM, operasional,
                pengiriman dan komitmen.
              </p>

              <p
                className="
                  text-[11px]
                  text-blue-500
                  mt-2
                  font-semibold
                "
              >
                Sheet yang dibaca:{' '}
                {previousYear} &{' '}
                {currentYear}
              </p>

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="
                  mt-5
                  flex
                  items-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-xl
                  bg-emerald-600
                  hover:bg-emerald-700
                  text-white
                  text-xs
                  font-bold
                  shadow-sm
                  transition
                "
              >
                <FaUpload
                  size={12}
                />

                Upload Excel
              </button>

              <button
                type="button"
                onClick={
                  handleDownloadTemplate
                }
                className="
                  mt-2
                  text-[11px]
                  text-blue-600
                  hover:text-blue-700
                  font-semibold
                  transition
                "
              >
                Download Template Excel
              </button>
            </div>

            {/* FOOTER */}

            <div
              className="
                flex
                justify-center
                items-center
                gap-2
                py-5
                text-[10px]
                text-gray-400
              "
            >
              <span
                className="
                  font-bold
                  text-blue-600
                "
              >
                KFCOLLS
              </span>

              <span>
                •
              </span>

              <span>
                Dashboard Rasio Biaya
              </span>
            </div>
          </>
        ) : (
          <>
            {/* =================================================
                FILTER
            ================================================= */}

            <div
              className="
                bg-white
                rounded-xl
                shadow-sm
                border
                border-gray-200
                p-4
                mb-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  mb-3
                "
              >
                <div
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-orange-50
                    text-orange-500
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaFilter
                    size={13}
                  />
                </div>

                <div>
                  <h2
                    className="
                      text-sm
                      font-bold
                      text-gray-700
                    "
                  >
                    Filter Data
                  </h2>

                  <p
                    className="
                      text-[10px]
                      text-gray-400
                    "
                  >
                    Pilih periode data dashboard
                  </p>
                </div>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-3
                "
              >
                {/* YEAR */}

                <div>
                  <label
                    className="
                      block
                      text-[11px]
                      font-semibold
                      text-gray-600
                      mb-1
                    "
                  >
                    Year
                  </label>

                  <select
                    value={
                      selectedYear
                    }
                    onChange={(e) =>
                      setSelectedYear(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      h-9
                      rounded-lg
                      border
                      border-gray-200
                      px-3
                      text-xs
                      outline-none
                      focus:border-blue-400
                    "
                  >
                    <option value="ALL">
                      Semua Tahun
                    </option>

                    {yearOptions.map(
                      (
                        year
                      ) => (
                        <option
                          key={
                            year
                          }
                          value={
                            year
                          }
                        >
                          {year}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* MONTH */}

                <div>
                  <label
                    className="
                      block
                      text-[11px]
                      font-semibold
                      text-gray-600
                      mb-1
                    "
                  >
                    Month
                  </label>

                  <select
                    value={
                      selectedMonth
                    }
                    onChange={(e) =>
                      setSelectedMonth(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      h-9
                      rounded-lg
                      border
                      border-gray-200
                      px-3
                      text-xs
                      outline-none
                      focus:border-blue-400
                    "
                  >
                    <option value="ALL">
                      Semua Bulan
                    </option>

                    {MONTHS.map(
                      (
                        month
                      ) => (
                        <option
                          key={
                            month
                          }
                          value={
                            month
                          }
                        >
                          {month}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* INFO */}

                <div
                  className="
                    flex
                    items-end
                  "
                >
                  <div
                    className="
                      w-full
                      bg-blue-50
                      rounded-lg
                      px-3
                      py-2
                      text-[10px]
                      text-blue-600
                    "
                  >
                    <strong>
                      Data tampil:
                    </strong>{' '}
                    {
                      sortedData.length
                    }{' '}
                    baris
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                GAUGE CARDS
            ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-5
                gap-3
                mb-4
              "
            >
              <GaugeCard
                title="Rasio Biaya Komitmen YTD"
                value={
                  gaugeValues.komitmen
                }
                target={
                  targetValues.komitmen
                }
                icon={
                  <FaCalculator
                    size={13}
                  />
                }
                iconBg="bg-blue-50"
                iconColor="text-blue-600"
              />

              <GaugeCard
                title="Rasio Biaya SDM YTD"
                value={
                  gaugeValues.sdm
                }
                target={
                  targetValues.sdm
                }
                icon={
                  <FaUsers
                    size={13}
                  />
                }
                iconBg="bg-purple-50"
                iconColor="text-purple-600"
              />

              <GaugeCard
                title="Rasio Biaya Operasional YTD"
                value={
                  gaugeValues.operasional
                }
                target={
                  targetValues.operasional
                }
                icon={
                  <FaMoneyBillWave
                    size={13}
                  />
                }
                iconBg="bg-orange-50"
                iconColor="text-orange-500"
              />

              <GaugeCard
                title="Rasio Biaya Pengiriman YTD"
                value={
                  gaugeValues.pengiriman
                }
                target={
                  targetValues.pengiriman
                }
                icon={
                  <FaTruck
                    size={13}
                  />
                }
                iconBg="bg-emerald-50"
                iconColor="text-emerald-600"
              />

              <GaugeCard
                title="Rasio Total Biaya YTD"
                value={
                  gaugeValues.total
                }
                target={
                  targetValues.total
                }
                icon={
                  <FaPercentage
                    size={13}
                  />
                }
                iconBg="bg-red-50"
                iconColor="text-red-600"
              />
            </div>

            {/* =================================================
                CHART ROW
            ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-4
                mb-4
              "
            >
              {/* ===============================================
                  TREND RATIO
              =============================================== */}

              <div
                className="
                  bg-white
                  rounded-xl
                  shadow-sm
                  border
                  border-gray-200
                  p-4
                "
              >
                <SectionTitle
                  icon={
                    <FaChartLine
                      size={14}
                    />
                  }
                  title="Tren ratio"
                  subtitle={`Perbandingan rasio total biaya ${previousYear} dan ${currentYear}`}
                />

                <div
                  className="
                    h-[310px]
                    w-full
                  "
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <LineChart
                      data={
                        mergedTrendData
                      }
                      margin={{
                        top: 20,
                        right: 10,
                        left: 0,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid
                        strokeDasharray="2 4"
                        vertical={false}
                      />

                      <XAxis
                        dataKey="month"
                        tick={{
                          fontSize: 10,
                        }}
                      />

                      <YAxis
                        tick={{
                          fontSize: 10,
                        }}
                        tickFormatter={(
                          value
                        ) =>
                          `${value}%`
                        }
                      />

                      <Tooltip
                        content={
                          <ChartTooltip />
                        }
                      />

                      <Legend
                        wrapperStyle={{
                          fontSize:
                            '11px',
                        }}
                      />

                      {/* TAHUN SEBELUMNYA */}

                      <Line
                        type="monotone"
                        dataKey="ratioPreviousYear"
                        name={`% Total Biaya ${previousYear}`}
                        stroke="#1e40af"
                        strokeWidth={3}
                        dot={{
                          r: 5,
                        }}
                        activeDot={{
                          r: 7,
                        }}
                      >
                        <LabelList
                          dataKey="ratioPreviousYear"
                          position="top"
                          formatter={(
                            value
                          ) =>
                            value ===
                              null ||
                            value ===
                              undefined
                              ? ''
                              : `${Number(
                                  value ||
                                    0
                                ).toFixed(
                                  2
                                )}%`
                          }
                          style={{
                            fontSize: 13,
                            fill: '#555',
                          }}
                        />
                      </Line>

                      {/* TAHUN BERJALAN */}

                      <Line
                        type="monotone"
                        dataKey="ratioCurrentYear"
                        name={`% Total Biaya ${currentYear}`}
                        stroke="#ff8c00"
                        strokeWidth={3}
                        dot={{
                          r: 5,
                        }}
                        activeDot={{
                          r: 7,
                        }}
                      >
                        <LabelList
                          dataKey="ratioCurrentYear"
                          position="top"
                          formatter={(
                            value
                          ) =>
                            value ===
                              null ||
                            value ===
                              undefined
                              ? ''
                              : `${Number(
                                  value ||
                                    0
                                ).toFixed(
                                  2
                                )}%`
                          }
                          style={{
                            fontSize: 13,
                            fill: '#555',
                          }}
                        />
                      </Line>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ===============================================
                  KONTRIBUSI BIAYA
              =============================================== */}

              <div
                className="
                  bg-white
                  rounded-xl
                  shadow-sm
                  border
                  border-gray-200
                  p-4
                "
              >
                <SectionTitle
                  icon={
                    <FaPercentage
                      size={14}
                    />
                  }
                  title="Kontribusi Biaya"
                  subtitle="Kontribusi masing-masing komponen biaya terhadap penjualan"
                />

                <div
                  className="
                    h-[310px]
                    w-full
                  "
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <BarChart
                      data={
                        contributionData
                      }
                      margin={{
                        top: 30,
                        right: 5,
                        left: 0,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid
                        strokeDasharray="2 4"
                        vertical={false}
                      />

                      <XAxis
                        dataKey="name"
                        tick={{
                          fontSize: 9,
                        }}
                        interval={0}
                      />

                      <YAxis
                        tick={{
                          fontSize: 10,
                        }}
                        tickFormatter={(
                          value
                        ) =>
                          `${value}%`
                        }
                      />

                      <Tooltip
                        content={
                          <ChartTooltip />
                        }
                      />

                      <Legend
                        wrapperStyle={{
                          fontSize:
                            '10px',
                        }}
                      />

                      {/* BIAYA SDM */}

                      <Bar
                        dataKey="sdm"
                        name="% Biaya SDM"
                        fill="#ef0000"
                        radius={[
                          2,
                          2,
                          0,
                          0,
                        ]}
                      >
                        <LabelList
                          dataKey="sdm"
                          position="top"
                          formatter={(
                            value
                          ) =>
                            `${Number(
                              value ||
                                0
                            ).toFixed(
                              2
                            )}%`
                          }
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            fill: '#555',
                          }}
                        />
                      </Bar>

                      {/* BIAYA OPERASIONAL */}

                      <Bar
                        dataKey="operasional"
                        name="% Biaya Operasional"
                        fill="#442061"
                        radius={[
                          2,
                          2,
                          0,
                          0,
                        ]}
                      >
                        <LabelList
                          dataKey="operasional"
                          position="top"
                          formatter={(
                            value
                          ) =>
                            `${Number(
                              value ||
                                0
                            ).toFixed(
                              2
                            )}%`
                          }
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            fill: '#555',
                          }}
                        />
                      </Bar>

                      {/* BIAYA PENGIRIMAN */}

                      <Bar
                        dataKey="pengiriman"
                        name="% Biaya Pengiriman"
                        fill="#858585"
                        radius={[
                          2,
                          2,
                          0,
                          0,
                        ]}
                      >
                        <LabelList
                          dataKey="pengiriman"
                          position="top"
                          formatter={(
                            value
                          ) =>
                            `${Number(
                              value ||
                                0
                            ).toFixed(
                              2
                            )}%`
                          }
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            fill: '#555',
                          }}
                        />
                      </Bar>

                      {/* BOP KOMITMEN */}

                      <Bar
                        dataKey="komitmen"
                        name="% BOP Komitmen"
                        fill="#f4f000"
                        radius={[
                          2,
                          2,
                          0,
                          0,
                        ]}
                      >
                        <LabelList
                          dataKey="komitmen"
                          position="top"
                          formatter={(
                            value
                          ) =>
                            `${Number(
                              value ||
                                0
                            ).toFixed(
                              2
                            )}%`
                          }
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            fill: '#555',
                          }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* =================================================
                TABLE
            ================================================= */}

            <div
              className="
                bg-white
                rounded-xl
                shadow-sm
                border
                border-gray-200
                overflow-hidden
              "
            >
              {/* TABLE HEADER */}

              <div
                className="
                  px-4
                  py-3
                  border-b
                  border-gray-100
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-2
                "
              >
                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <div
                      className="
                        w-8
                        h-8
                        rounded-lg
                        bg-blue-50
                        text-blue-600
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <FaMoneyBillWave
                        size={13}
                      />
                    </div>

                    <h2
                      className="
                        text-sm
                        font-bold
                        text-gray-700
                      "
                    >
                      Detail Rasio Biaya
                    </h2>
                  </div>

                  <p
                    className="
                      text-[10px]
                      text-gray-400
                      mt-1
                    "
                  >
                    Data otomatis mengikuti file Excel yang di-upload
                  </p>
                </div>

                <div
                  className="
                    text-[11px]
                    text-gray-500
                  "
                >
                  Total Penjualan:{' '}
                  <strong
                    className="
                      text-gray-800
                    "
                  >
                    {formatRupiah(
                      total.penjualan
                    )}
                  </strong>
                </div>
              </div>

              {/* TABLE */}

              <div
                className="
                  overflow-x-auto
                "
              >
                <table
                  className="
                    min-w-[1400px]
                    w-full
                    text-xs
                  "
                >
                  <thead>
                    <tr
                      className="
                        bg-blue-600
                        text-white
                      "
                    >
                      <th className="px-3 py-2.5 text-left font-semibold">
                        Month
                      </th>

                      <th className="px-3 py-2.5 text-left font-semibold">
                        Year
                      </th>

                      <th className="px-3 py-2.5 text-right font-semibold">
                        Penjualan
                      </th>

                      <th className="px-3 py-2.5 text-right font-semibold">
                        Biaya Komitmen
                      </th>

                      <th className="px-3 py-2.5 text-right font-semibold">
                        % B. Kom
                      </th>

                      <th className="px-3 py-2.5 text-right font-semibold">
                        Biaya SDM
                      </th>

                      <th className="px-3 py-2.5 text-right font-semibold">
                        % B. SDM
                      </th>

                      <th className="px-3 py-2.5 text-right font-semibold">
                        Biaya Operasional
                      </th>

                      <th className="px-3 py-2.5 text-right font-semibold">
                        % B. OPS
                      </th>

                      <th className="px-3 py-2.5 text-right font-semibold">
                        Biaya Pengiriman
                      </th>

                      <th className="px-3 py-2.5 text-right font-semibold">
                        % B. PENG
                      </th>

                      <th className="px-3 py-2.5 text-right font-semibold">
                        Total Biaya
                      </th>

                      <th className="px-3 py-2.5 text-right font-semibold">
                        % Total Biaya
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {tableData.length ===
                    0 ? (
                      <tr>
                        <td
                          colSpan={
                            13
                          }
                          className="
                            text-center
                            py-10
                            text-gray-400
                          "
                        >
                          Tidak ada data
                        </td>
                      </tr>
                    ) : (
                      tableData.map(
                        (
                          item,
                          index
                        ) => (
                          <tr
                            key={`${item.Month}-${item.Year}-${index}`}
                            className={`
                              border-b
                              border-gray-100
                              ${
                                index %
                                  2 ===
                                0
                                  ? 'bg-white'
                                  : 'bg-gray-50'
                              }
                              hover:bg-blue-50
                              transition
                            `}
                          >
                            <td className="px-3 py-2 text-gray-700">
                              {
                                item.Month
                              }
                            </td>

                            <td className="px-3 py-2 text-gray-700">
                              {
                                item.Year
                              }
                            </td>

                            <td className="px-3 py-2 text-right text-gray-700">
                              {formatNumber(
                                item.Penjualan
                              )}
                            </td>

                            <td className="px-3 py-2 text-right text-gray-700">
                              {formatNumber(
                                item.BiayaKomitmen
                              )}
                            </td>

                            <td className="px-3 py-2 text-right font-medium text-blue-600">
                              {formatPercent(
                                item.RatioKomitmen
                              )}
                            </td>

                            <td className="px-3 py-2 text-right text-gray-700">
                              {formatNumber(
                                item.BiayaSDM
                              )}
                            </td>

                            <td className="px-3 py-2 text-right font-medium text-purple-600">
                              {formatPercent(
                                item.RatioSDM
                              )}
                            </td>

                            <td className="px-3 py-2 text-right text-gray-700">
                              {formatNumber(
                                item.BiayaOperasional
                              )}
                            </td>

                            <td className="px-3 py-2 text-right font-medium text-orange-600">
                              {formatPercent(
                                item.RatioOperasional
                              )}
                            </td>

                            <td className="px-3 py-2 text-right text-gray-700">
                              {formatNumber(
                                item.BiayaPengiriman
                              )}
                            </td>

                            <td className="px-3 py-2 text-right font-medium text-gray-600">
                              {formatPercent(
                                item.RatioPengiriman
                              )}
                            </td>

                            <td className="px-3 py-2 text-right font-semibold text-gray-800">
                              {formatNumber(
                                item.TotalBiaya
                              )}
                            </td>

                            <td className="px-3 py-2 text-right font-bold text-blue-700">
                              {formatPercent(
                                item.RatioTotal
                              )}
                            </td>
                          </tr>
                        )
                      )
                    )}
                  </tbody>

                  {/* TOTAL */}

                  {tableData.length >
                    0 && (
                    <tfoot>
                      <tr
                        className="
                          bg-gray-100
                          border-t-2
                          border-blue-500
                        "
                      >
                        <td
                          colSpan={
                            2
                          }
                          className="
                            px-3
                            py-2.5
                            font-bold
                            text-gray-800
                          "
                        >
                          Total
                        </td>

                        <td className="px-3 py-2.5 text-right font-bold text-gray-800">
                          {formatNumber(
                            total.penjualan
                          )}
                        </td>

                        <td className="px-3 py-2.5 text-right font-bold">
                          {formatNumber(
                            total.komitmen
                          )}
                        </td>

                        <td className="px-3 py-2.5 text-right font-bold text-blue-600">
                          {formatPercent(
                            gaugeValues.komitmen
                          )}
                        </td>

                        <td className="px-3 py-2.5 text-right font-bold">
                          {formatNumber(
                            total.sdm
                          )}
                        </td>

                        <td className="px-3 py-2.5 text-right font-bold text-purple-600">
                          {formatPercent(
                            gaugeValues.sdm
                          )}
                        </td>

                        <td className="px-3 py-2.5 text-right font-bold">
                          {formatNumber(
                            total.operasional
                          )}
                        </td>

                        <td className="px-3 py-2.5 text-right font-bold text-orange-600">
                          {formatPercent(
                            gaugeValues.operasional
                          )}
                        </td>

                        <td className="px-3 py-2.5 text-right font-bold">
                          {formatNumber(
                            total.pengiriman
                          )}
                        </td>

                        <td className="px-3 py-2.5 text-right font-bold text-gray-600">
                          {formatPercent(
                            gaugeValues.pengiriman
                          )}
                        </td>

                        <td className="px-3 py-2.5 text-right font-bold text-gray-800">
                          {formatNumber(
                            totalBiaya
                          )}
                        </td>

                        <td className="px-3 py-2.5 text-right font-bold text-blue-700">
                          {formatPercent(
                            gaugeValues.total
                          )}
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>

            {/* =================================================
                FOOTER
            ================================================= */}

            <div
              className="
                flex
                justify-center
                items-center
                gap-2
                py-5
                text-[10px]
                text-gray-400
              "
            >
              <span
                className="
                  font-bold
                  text-blue-600
                "
              >
                KFCOLLS
              </span>

              <span>
                •
              </span>

              <span>
                Dashboard Rasio Biaya
              </span>
            </div>
          </>
        )}
      </div>
    );
  };

export default DashboardRasioBiaya;