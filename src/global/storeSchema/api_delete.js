import { api } from '../helper/axiosInstance';

const n2nDeleteService = {
  deleteDokumen: async (id) => {
    try {
      const response = await api.delete(`/deleteDokumen/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteDokumenBAMK: async (project_id, dokumen_id) => {
    try {
      const response = await api.delete(`/deleteDokumenBAMK`, {
        params: {
          project_id,
          dokumen_id,
        },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteBillingCollection: async (id) => {
    try {
      const response = await api.delete(`/deleteBillingCollection/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteBillingDokumen: async (id) => {
    try {
      const response = await api.delete(`/deleteBillingDokumen/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteVendorPlanning: async (id) => {
    try {
      const response = await api.delete(`/deleteVendorPlanning/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteContactCustomer: async (id) => {
    try {
      const response = await api.delete(`/deleteContactCustomer/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteContactVendorPt: async (id) => {
    try {
      const response = await api.delete(`/deleteContactVendorPt/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteCBBPlanning: async (id) => {
    try {
      const response = await api.delete(`/deleteCBBPlanning/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteCostPersonilPlanning: async (id) => {
    try {
      const response = await api.delete(`/deleteCostPersonilPlanning/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteCostOperational: async (id) => {
    try {
      const response = await api.delete(`/deleteOperationalDetail/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteCostPersonilDetail: async (id) => {
    try {
      const response = await api.delete(`/deletePersonilDetail/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteAssignTeam: async (id) => {
    try {
      const response = await api.delete(`/deleteAssignTeam/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/deleteTask/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteHariLibur: async (id) => {
    try {
      const response = await api.delete(`/deleteHariLibur/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteAdjustment: async (id) => {
    try {
      const response = await api.delete(`/deleteBillingAdjustment/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteRKeuangan: async (dokumen_id) => {
    try {
      const response = await api.delete(`/deleteRKeuangan`, {
        params: {
          dokumen_id,
        },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  // YANG DIPAKAI
  deleteCoaPengajuan: async (id) => {
    try {
      const response = await api.delete(`/deleteCoaPengajuan/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteMasterApproval: async (data) => {
    try {
      const response = await api.post(`/deleteMasterApproval`, data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  deletePenjualan: async (id) => {
    try {
      const response = await api.delete(`/deletePenjualan/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
};

export default n2nDeleteService;
