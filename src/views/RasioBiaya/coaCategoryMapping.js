/*
 * COA CATEGORY MAPPING
 * Source: Mapping Coa Ficon.xlsx
 *
 * Key   : Account (COA)
 * Value : kategori internal dashboard
 *
 * Kategori internal:
 * - BiayaSDM
 * - BiayaOperasional
 * - BiayaPengiriman
 *
 * Catatan:
 * - Account dari Excel dinormalisasi terlebih dahulu supaya
 *   angka, string, dan scientific notation tetap bisa dicocokkan.
 * - Account yang tidak ada di mapping tetapi diawali angka 4
 *   dikategorikan sebagai Penjualan.
 * - Account biaya yang tidak ada di mapping akan masuk
 *   BiayaOperasional sebagai fallback.
 */

export const COA_CATEGORY_MAP = {
  // ============================================================
  // BIAYA SDM
  // ============================================================

  '6101010101': 'BiayaSDM',
  '6101010102': 'BiayaSDM',
  '6101010103': 'BiayaSDM',
  '6101010104': 'BiayaSDM',
  '6101010105': 'BiayaSDM',
  '6101010106': 'BiayaSDM',

  '6101010201': 'BiayaSDM',
  '6101010202': 'BiayaSDM',
  '6101010203': 'BiayaSDM',
  '6101010204': 'BiayaSDM',
  '6101010205': 'BiayaSDM',
  '6101010206': 'BiayaSDM',
  '6101010207': 'BiayaSDM',
  '6101010208': 'BiayaSDM',
  '6101010209': 'BiayaSDM',
  '6101010210': 'BiayaSDM',
  '6101010211': 'BiayaSDM',
  '6101010212': 'BiayaSDM',
  '6101010213': 'BiayaSDM',
  '6101010214': 'BiayaSDM',

  '6101010301': 'BiayaSDM',
  '6101010302': 'BiayaSDM',
  '6101010303': 'BiayaSDM',
  '6101010304': 'BiayaSDM',
  '6101010305': 'BiayaSDM',
  '6101010306': 'BiayaSDM',
  '6101010307': 'BiayaSDM',
  '6101010308': 'BiayaSDM',
  '6101010309': 'BiayaSDM',
  '6101010310': 'BiayaSDM',
  '6101010311': 'BiayaSDM',

  '6101010401': 'BiayaSDM',
  '6101010402': 'BiayaSDM',
  '6101010403': 'BiayaSDM',
  '6101010404': 'BiayaSDM',
  '6101010405': 'BiayaSDM',
  '6101010406': 'BiayaSDM',
  '6101010407': 'BiayaSDM',
  '6101010408': 'BiayaSDM',
  '6101010410': 'BiayaSDM',
  '6101010411': 'BiayaSDM',
  '6101010412': 'BiayaSDM',
  '6101010413': 'BiayaSDM',
  '6101010414': 'BiayaSDM',
  '6101010415': 'BiayaSDM',
  '6101010419': 'BiayaSDM',

  '6101010501': 'BiayaSDM',

  '6101020101': 'BiayaSDM',
  '6101020102': 'BiayaSDM',
  '6101020103': 'BiayaSDM',
  '6101020104': 'BiayaSDM',

  // ============================================================
  // BIAYA OPERASIONAL
  // ============================================================

  '6201010101': 'BiayaOperasional',
  '6201010102': 'BiayaOperasional',
  '6201010103': 'BiayaOperasional',
  '6201010104': 'BiayaOperasional',

  '6202010101': 'BiayaOperasional',
  '6202010103': 'BiayaOperasional',

  '6203010101': 'BiayaOperasional',
  '6203010102': 'BiayaOperasional',
  '6203010103': 'BiayaOperasional',

  '6204010103': 'BiayaOperasional',
  '6204010104': 'BiayaOperasional',

  '6205010101': 'BiayaSDM',
  '6205010102': 'BiayaOperasional',

  '6301010101': 'BiayaOperasional',
  '6301010102': 'BiayaOperasional',
  '6301010103': 'BiayaOperasional',
  '6301010104': 'BiayaOperasional',
  '6301010105': 'BiayaOperasional',

  '6301010201': 'BiayaOperasional',
  '6301010202': 'BiayaOperasional',

  '6301010301': 'BiayaOperasional',
  '6301010302': 'BiayaOperasional',
  '6301010303': 'BiayaOperasional',

  '6301010401': 'BiayaOperasional',
  '6301010402': 'BiayaOperasional',

  '6301010501': 'BiayaOperasional',
  '6301010502': 'BiayaOperasional',
  '6301010503': 'BiayaOperasional',
  '6301010511': 'BiayaOperasional',
  '6301010512': 'BiayaOperasional',

  '6301010601': 'BiayaOperasional',
  '6301010602': 'BiayaOperasional',

  '6301020102': 'BiayaOperasional',

  '6401010101': 'BiayaOperasional',
  '6401010102': 'BiayaOperasional',
  '6401010103': 'BiayaOperasional',
  '6401010104': 'BiayaOperasional',
  '6401010105': 'BiayaOperasional',
  '6401010108': 'BiayaOperasional',

  '6501010101': 'BiayaOperasional',
  '6501010102': 'BiayaOperasional',
  '6501010103': 'BiayaOperasional',
  '6501010105': 'BiayaOperasional',

  '6601010101': 'BiayaOperasional',
  '6601010102': 'BiayaOperasional',
  '6601010103': 'BiayaOperasional',

  '6601010201': 'BiayaOperasional',
  '6601010202': 'BiayaOperasional',

  '6601010301': 'BiayaOperasional',

  '6601010401': 'BiayaOperasional',
  '6601010402': 'BiayaOperasional',
  '6601010403': 'BiayaOperasional',
  '6601010404': 'BiayaOperasional',

  '6601010501': 'BiayaOperasional',
  '6601010601': 'BiayaOperasional',
  '6601010801': 'BiayaOperasional',

  // ============================================================
  // BIAYA SDM / OPERASIONAL - ACCOUNT 67
  // ============================================================

  '6701010102': 'BiayaSDM',
  '6701010103': 'BiayaSDM',
  '6701010105': 'BiayaSDM',

  '6702010101': 'BiayaSDM',
  '6702010102': 'BiayaSDM',

  '6703010102': 'BiayaSDM',
  '6703010104': 'BiayaSDM',
  '6703010106': 'BiayaOperasional',

  '6704010101': 'BiayaOperasional',
  '6704010102': 'BiayaOperasional',
  '6704010103': 'BiayaOperasional',
  '6704010104': 'BiayaOperasional',
  '6704010105': 'BiayaOperasional',

  '6705010101': 'BiayaOperasional',
  '6705010102': 'BiayaOperasional',
  '6705010103': 'BiayaOperasional',
  '6705010104': 'BiayaOperasional',

  '6706010101': 'BiayaOperasional',

  '6707010101': 'BiayaOperasional',
  '6707010102': 'BiayaOperasional',
  '6707010103': 'BiayaOperasional',
  '6707010104': 'BiayaOperasional',
  '6707010201': 'BiayaOperasional',
  '6707010301': 'BiayaOperasional',

  '6709010101': 'BiayaSDM',
  '6709010102': 'BiayaSDM',
  '6709010103': 'BiayaSDM',

  '6709020101': 'BiayaOperasional',
  '6709020102': 'BiayaOperasional',
  '6709020103': 'BiayaOperasional',
  '6709020104': 'BiayaOperasional',
  '6709020109': 'BiayaOperasional',

  '6709030101': 'BiayaOperasional',
  '6709030102': 'BiayaOperasional',

  '6709040102': 'BiayaOperasional',
  '6709040103': 'BiayaOperasional',

  '6709050101': 'BiayaOperasional',

  // ============================================================
  // BIAYA OPERASIONAL / SDM - ACCOUNT 68
  // ============================================================

  '6801010101': 'BiayaOperasional',
  '6801010102': 'BiayaOperasional',

  '6802010101': 'BiayaSDM',
  '6802010102': 'BiayaSDM',

  '6803010101': 'BiayaOperasional',
  '6803010102': 'BiayaSDM',
  '6803010103': 'BiayaSDM',

  '6804010101': 'BiayaOperasional',

  '6805010101': 'BiayaOperasional',
  '6805010102': 'BiayaOperasional',
  '6805010103': 'BiayaOperasional',

  '6806010101': 'BiayaOperasional',

  '6807010101': 'BiayaOperasional',

  '6808010101': 'BiayaSDM',

  '6810010101': 'BiayaOperasional',
  '6810010102': 'BiayaOperasional',
  '6810010103': 'BiayaOperasional',

  // ============================================================
  // BIAYA PENGIRIMAN
  // ============================================================

  '6901010101': 'BiayaPengiriman',
  '6901010102': 'BiayaPengiriman',
  '6901010104': 'BiayaPengiriman',

  '6902010101': 'BiayaPengiriman',

  // ============================================================
  // BIAYA OPERASIONAL / SDM - ACCOUNT 69
  // ============================================================

  '6903010102': 'BiayaOperasional',
  '6903010103': 'BiayaOperasional',
  '6903010104': 'BiayaOperasional',
  '6903010105': 'BiayaOperasional',
  '6903010106': 'BiayaOperasional',
  '6903010107': 'BiayaOperasional',
  '6903010108': 'BiayaOperasional',

  '6903010110': 'BiayaSDM',

  '6903010113': 'BiayaOperasional',
  '6903010114': 'BiayaOperasional',
  '6903010115': 'BiayaOperasional',
  '6903010116': 'BiayaOperasional',
  '6903010117': 'BiayaOperasional',
  '6903010118': 'BiayaOperasional',

  '6904010101': 'BiayaOperasional',

  '6908010104': 'BiayaOperasional',

  '6911010101': 'BiayaOperasional',
};