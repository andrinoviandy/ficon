import { api } from '../helper/axiosInstance';

const n2nPostService = {
  login: async (data) => {
    try {
      const response = await api.post("/users/login", {}, {
        headers: {
          authorization: data,
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  logout: async (data) => {
    try {
      const response = await api.post("/users/logout", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertNewProject: async (data) => {
    try {
      const response = await api.post("/insertNewProject", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertNewProjectPID: async (data) => {
    try {
      const response = await api.post("/insertNewProjectPID", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertContactCustomer: async (data) => {
    try {
      const response = await api.post("/insertContactCustomer", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertContactVendorPt: async (data) => {
    try {
      const response = await api.post("/insertContactVendorPt", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  markAsAcceleration: async (data) => {
    try {
      const response = await api.post("/markAsAcceleration", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  markAsActualID: async (data) => {
    try {
      const response = await api.post("/markAsActualID", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  markAsActualIDNew: async (data) => {
    try {
      const response = await api.post("/markAsActualIDNew", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  markAsProject: async (data) => {
    try {
      const response = await api.post("/markAsProject", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  markAsArchive: async (data) => {
    try {
      const response = await api.post("/markAsArchive", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  markAsUnarchive: async (data) => {
    try {
      const response = await api.post("/markAsUnarchive", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  markAsClone: async (data) => {
    try {
      const response = await api.post("/markAsClone", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  uploadDokumen: async (data) => {
    try {
      const response = await api.post("/uploadDokumen", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  stampMaterai: async (data) => {
    try {
      const response = await api.post("/stampMaterai", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  stampDokumen: async (data) => {
    try {
      const response = await api.post("/stampDokumen", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  vendorRemind: async (data) => {
    try {
      const response = await api.post("/vendorRemind", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  uploadDokumenBAMK: async (data) => {
    try {
      const response = await api.post("/uploadDokumenBAMK", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  billingCollection: async (data) => {
    try {
      const response = await api.post("/billingCollection", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  vendorPlanning: async (data) => {
    try {
      const response = await api.post("/vendorPlanning", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  CBBPlanning: async (data) => {
    try {
      const response = await api.post("/CBBPlanning", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  costPersonilPlanning: async (data) => {
    try {
      const response = await api.post("/costPersonilPlanning", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  costPersonilDetail: async (data) => {
    try {
      const response = await api.post("/insertPersonilDetail", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  costOperationalDetail: async (data) => {
    try {
      const response = await api.post("/insertOperationalDetail", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  costOperationalDetailDokumen: async (data) => {
    try {
      const response = await api.post("/insertOperationalDetailDokumen", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertProjectStatus: async (data) => {
    try {
      const response = await api.post("/insertProjectStatus", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertBillingDokumen: async (data) => {
    try {
      const response = await api.post("/insertBillingDokumen", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertCustomer: async (data) => {
    try {
      const response = await api.post("/insertCustomer", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertVendorPt: async (data) => {
    try {
      const response = await api.post("/insertVendorPt", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertPortofolio: async (data) => {
    try {
      const response = await api.post("/insertPortofolio", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertKaryawan: async (data) => {
    try {
      const response = await api.post("/insertKaryawan", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  dataRevenueStream: async (data) => {
    try {
      const response = await api.post("/dataRevenueStream", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertNotification: async (data) => {
    try {
      const response = await api.post("/insertNotification", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListPegawai: async (data) => {
    try {
      const response = await api.post("/getListPegawai", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertTask: async (data) => {
    try {
      const response = await api.post("/insertTask", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertRemark: async (data) => {
    try {
      const response = await api.post("/insertRemark", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertReferensi: async (data) => {
    try {
      const response = await api.post("/insertReferensi", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertDokumenNoFile: async (data) => {
    try {
      const response = await api.post("/insertDokumenNoFile", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  assignTeam: async (data) => {
    try {
      const response = await api.post("/assignTeam", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertProgressProject: async (data) => {
    try {
      const response = await api.post("/insertProgressProject", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertProgressBilling: async (data) => {
    try {
      const response = await api.post("/insertProgressBilling", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  addMasterData: async (data) => {
    try {
      const response = await api.post("/addMasterData", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  addAnggaran: async (data) => {
    try {
      const response = await api.post("/addAnggaran", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  minusAnggaran: async (data) => {
    try {
      const response = await api.post("/minusAnggaran", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  sendInvoice: async (data) => {
    try {
      const response = await api.post("/sendInvoice", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  addSuratTagihan: async (data) => {
    try {
      const response = await api.post("/addSuratTagihan", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  addBeritaAcara: async (data) => {
    try {
      const response = await api.post("/addBeritaAcara", data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  insertBillingAdjustment: async (data) => {
    try {
      const response = await api.post("/insertBillingAdjustment", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  stampingCloud: async (data) => {
    try {
      const response = await api.post("/stampingCloud", data, {
        headers: { "Content-Type": "application/json" }, // kirim HTML string
        // responseType: "blob", // << penting
      });
      return response.data;
    } catch (error) {
      console.error("stamping error:", error);
      return error.response;
    }
  },
  stampingProd: async (data) => {
    try {
      const response = await api.post("/stampingProd", data, {
        headers: { "Content-Type": "application/json" }, // kirim HTML string
        // responseType: "blob", // << penting
      });
      return response.data;
    } catch (error) {
      console.error("stamping error:", error);
      return error.response;
    }
  },
  uploadDokumenUnsigned: async (data) => {
    try {
      const response = await api.post("/uploadDokumenUnsigned", data, {
        headers: { "Content-Type": "application/json" }, // kirim HTML string
        // responseType: "blob", // << penting
      });
      return response.data;
    } catch (error) {
      console.error("stamping error:", error);
      return error.response;
    }
  },
  insertHariLibur: async (data) => {
    try {
      const response = await api.post("/insertHariLibur", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  dataRevenueLOP: async (data) => {
    try {
      const response = await api.post("/dataRevenueLOP", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  dataRevenueLOPGroup: async (data) => {
    try {
      const response = await api.post("/dataRevenueLOPGroup", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailLOP: async (data) => {
    console.log("getDetailLOP data:", data);
    try {
      const response = await api.post("/getDetailLOP", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  softDeleteLop: async (data) => {
    console.log("softDeleteLop data:", data);
    try {
      const response = await api.post("/softDeleteLop", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  autogenerateLOP: async (data) => {
    console.log("autogenerateLOP data:", data);
    try {
      const response = await api.post("/autogenerateLOP", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  uploadLOPExcel: async (data) => {
    try {
      const response = await api.post("/uploadLOPExcel", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListLOPID: async (data) => {
    console.log("getListLOPID data:", data);
    try {
      const response = await api.post("/getListLOPID", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertHBilling: async (data) => {
    try {
      const response = await api.post("/insertHBilling", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertProductOwner: async (data) => {
    try {
      const response = await api.post("/insertProductOwner", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getSummaryRevenue: async (data) => {
    console.log("getSummaryRevenue data:", data);
    try {
      const response = await api.post("/getListSummaryLop", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  sendAccrual: async (data) => {
    try {
      const response = await api.post("/sendAccrual", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertHDocReq: async (data) => {
    try {
      const response = await api.post("/insertHDocReq", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListNoProject: async (data) => {
    console.log("getListNoProject data:", data);
    try {
      const response = await api.post("/getListNoProject", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  createLOPFromProject: async (data) => {
    console.log("createLOPFromProject data:", data);
    try {
      const response = await api.post("/createLOPFromProject", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  CheckMaintenance: async () => {
    try {
      const response = await api.post(
        "/users/CheckMaintenance",
        {},
        {
          headers: {
            // kalau ada auth / app-id, taruh di sini
          }
        }
      );

      return response.data;
    } catch (error) {
      // JAGA BIAR FE TETAP AMAN
      return {
        status: false,
        maintenance: true, // ⛔ FAIL SAFE: anggap maintenance
        message: 'Gagal mengecek status maintenance'
      };
    }
  },
  getListBillingCode: async (data) => {
    console.log("getListBillingCode data:", data);
    try {
      const response = await api.post("/getListBillingCode", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertRKeuangan: async (data) => {
    try {
      const response = await api.post("/insertRKeuangan", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateRKeuangan: async (data) => {
    try {
      const response = await api.post("/updateRKeuangan", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  sendBatalNota: async (data) => {
    try {
      const response = await api.post("/sendBatalNota", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  // BATAS YANG DIPAKAI
  penyelesaianKasbon: async (data) => {
    try {
      const response = await api.post("/penyelesaianKasbon", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertPengajuan: async (data) => {
    try {
      const response = await api.post("/insertPengajuan", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertCoaPengajuan: async (data) => {
    try {
      const response = await api.post("/insertCoaPengajuan", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertUser: async (data) => {
    try {
      const response = await api.post("/insertUser", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertMasterApproval: async (data) => {
    try {
      const response = await api.post("/insertMasterApproval", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertAnggaran: async (data) => {
    try {
      const response = await api.post("/insertAnggaran", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertAnggaranArray: async (data) => {
    try {
      const response = await api.post("/insertAnggaranArray", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertPenjualanArray: async (data) => {
    try {
      const response = await api.post("/insertPenjualanArray", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertMasterData: async (data) => {
    try {
      const response = await api.post("/insertMasterData", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertJenisPajak: async (data) => {
    try {
      const response = await api.post("/insertJenisPajak", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertVendor: async (data) => {
    try {
      const response = await api.post("/insertVendor", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertJenisPajakArray: async (data) => {
    try {
      const response = await api.post("/insertJenisPajakArray", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertVendorArray: async (data) => {
    try {
      const response = await api.post("/insertVendorArray", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  insertStatusPengajuan: async (data) => {
    try {
      const response = await api.post("/insertStatusPengajuan", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updatePassword: async (data) => {
    try {
      const response = await api.post("/gantipassword-user", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  downloadPdf: async (data) => {
    try {
      const response = await api.post("/downloadPdf", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  killSession: async (data) => {
    try {
      const response = await api.post("/killSession", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
};

export default n2nPostService;