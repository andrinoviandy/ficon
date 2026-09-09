import { api } from '../helper/axiosInstance';

const n2nPutService = {
  updateProject: async (data) => {
    try {
      const response = await api.put("/updateProject", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateProjectNewPID: async (data) => {
    try {
      const response = await api.put("/updateProjectNewPID", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateCustomer: async (data) => {
    try {
      const response = await api.put("/updateCustomer", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateVendorPt: async (data) => {
    try {
      const response = await api.put("/updateVendorPt", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updatePortofolio: async (data) => {
    try {
      const response = await api.put("/updatePortofolio", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateKaryawan: async (data) => {
    try {
      const response = await api.put("/updateKaryawan", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateProjectStatus: async (data) => {
    try {
      const response = await api.put("/updateProjectStatus", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateNotification: async (data) => {
    try {
      const response = await api.put("/updateNotification", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updatePersonilDetail: async (data) => {
    try {
      const response = await api.put("/updatePersonilDetail", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateDokumen: async (data) => {
    try {
      const response = await api.put("/updateDokumen", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateDokumenNoFile: async (data) => {
    try {
      const response = await api.put("/updateDokumenNoFile", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateTask: async (data) => {
    try {
      const response = await api.put("/updateTask", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateTransaction: async (data) => {
    try {
      const response = await api.put("/updateTransaction", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateBillingAdjustment: async (data) => {
    try {
      const response = await api.put("/updateBillingAdjustment", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateHariLibur: async (data) => {
    try {
      const response = await api.put("/updateHariLibur", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateHBilling: async (data) => {
    try {
      const response = await api.put("/updateHBilling", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateHDocReq: async (data) => {
    try {
      const response = await api.put("/updateHDocReq", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateStokMaterai: async (data) => {
    try {
      const response = await api.put("/updateStokMaterai", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  // YANG DIPAKAI
  updatePengajuan: async (data) => {
    try {
      const response = await api.put("/updatePengajuan", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateUser: async (data) => {
    try {
      const response = await api.put("/updateUser", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateMasterApproval: async (data) => {
    try {
      const response = await api.put("/updateMasterApproval", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateMasterData: async (data) => {
    try {
      const response = await api.put("/updateMasterData", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateJenisPajak: async (data) => {
    try {
      const response = await api.put("/updateJenisPajak", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateVendor: async (data) => {
    try {
      const response = await api.put("/updateVendor", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateNotifikasiPush: async (data) => {
    try {
      const response = await api.put("/updateNotifikasiPush", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  readAllNotification: async (data) => {
    try {
      const response = await api.put("/readAllNotification", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateAnggaranArray: async (data) => {
    try {
      const response = await api.post("/updateAnggaranArray", data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
};

export default n2nPutService;