const tabWon = [
  {
    name: 'Detail Project',
    tab: 1,
  },
  {
    name: 'CBB Planning',
    tab: 2,
  },
  {
    name: 'Cost Personil Planning',
    tab: 3,
  }
];

const badgeStatus = {
  "001": <div className="badge border-none bg-yellow-100 text-yellow-500 font-semibold p-3">Identified</div>,
  "002": <div className="badge border-none bg-orange-100 text-orange-400 font-semibold p-3">Qualified</div>,
  "003": <div className="badge border-none bg-blue-100 text-blue-800 font-semibold p-3">Proposal</div>,
  "004": <div className="badge border-none bg-green-100 text-green-500 font-semibold p-3">WON</div>,
};

const markAsStatus = [
  {
    ur_status: 'Identified',
    kd_status: '001',
  },
  {
    ur_status: 'Qualified',
    kd_status: '002',
  },
  {
    ur_status: 'Proposal',
    kd_status: '003',
  },
  {
    ur_status: 'WON',
    kd_status: '004',
  },
];

const dummyFieldCbbPlanning = {
  cbb_id: "",
  coa_id: "",
  divisi_id: "",
  direct_cost: "",
  indirect_cost: "",
  status: {
    canUpload: true,
    canDelete: false,
  },
};

const dummyFieldCostPersonilPlanning = {
  position_id: "",
  kualifikasi_id: "",
  qty_person: 0,
  satuan_person: "",
  ur_satuan_person: "",
  qty_date: 0,
  satuan_date: "",
  ur_satuan_date: "",
  cost_unit: "",
  cost_total: "",
  status: {
    canUpload: true,
    canDelete: false,
  },
};

export {
  dummyFieldCostPersonilPlanning,
  dummyFieldCbbPlanning,
  tabWon,
  badgeStatus,
  markAsStatus
};