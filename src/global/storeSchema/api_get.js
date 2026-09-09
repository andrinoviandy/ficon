// import { decodeData } from 'global/helper/jwt';
import { api } from '../helper/axiosInstance';
import { getCookies } from 'global/helper/cookie';

const accountAccess = getCookies("accountAccess");
// const decode = await decodeData(getCookies("loginData"));

const n2nGetService = {
  getListMenu: async (kd_ref) => {
    try {
      const response = await api.get("/getListMenu", {
        params: {
          kd_ref,
        },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getPermissionCrud: async (kd_ref) => {
    try {
      const response = await api.get("/getPermissionCrud", {
        params: {
          jns_ref: 'acl_has_permissions',
          kd_ref,
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getRefStatusProject: async ({ isAdmin = ((accountAccess?.kode === '4380' || accountAccess?.kode === '8002') ? true : false) }) => {
    try {
      const response = await api.get("/getRefStatusProject", {
        params: {
          isAdmin
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getRefStatusRevenue: async ({ keyword, startDate, endDate }) => {
    try {
      const response = await api.get("/getRefStatusRevenue", {
        params: {
          keyword,
          startDate,
          endDate
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getRefStatusInvoiceNonProject: async ({ keyword, startDate, endDate }) => {
    try {
      const response = await api.get("/getRefStatusInvoiceNonProject", {
        params: {
          keyword,
          startDate,
          endDate
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListTask: async (keyword) => {
    try {
      const response = await api.get("/getListTask", {
        params: {
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  searchProject: async (keyword, startDate, endDate) => {
    try {
      const response = await api.get("/searchProject", {
        params: {
          keyword,
          startDate,
          endDate
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListBillingProjectAkselerasi: async (project_id) => {
    try {
      const response = await api.get("/getListBillingProjectAkselerasi", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListBillingRealization: async ({
    page,
    limit,
    status,
    order = "DESC",
    keyword = "",
    startDate = '',
    endDate = '',
    isAdmin = (accountAccess?.kode === '4380' || accountAccess?.kode === '5097') ? true : false,
    // nik = (accountAccess?.kode === '6010') ? decode?.USERNAME : '',
  }) => {
    try {
      const response = await api.get("/getListBillingRealization", {
        params: {
          page,
          limit,
          status,
          order,
          keyword,
          startDate,
          endDate,
          isAdmin,
          // nik
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListBillingCollections: async ({ page, limit, billing_id, status, order = "DESC", filter = "", keyword = "", monthYear = '', month, year, kd_status, start_date = '', end_date = '', customer_id = '', role_kode = null, spuc = '', searchHeader = {},
    // nik = (accountAccess?.kode === '6010') ? decode?.USERNAME : '' 
    billing_code,
    is_billing_realisasi,
  }) => {
    try {
      const response = await api.post("/getListBillingCollections", { searchHeader }, {
        params: {
          page,
          limit,
          billing_id,
          status,
          order,
          keyword,
          billing_code,
          filter,
          monthYear,
          month,
          year,
          kd_status,
          start_date,
          end_date,
          customer_id,
          role_kode,
          spuc,
          is_billing_realisasi,
          // nik
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListBillingProject: async ({ page, limit, status, order = "DESC", keyword = "", project_id }) => {
    try {
      const response = await api.get("/getListBillingProject", {
        params: {
          page,
          limit,
          status,
          order,
          keyword,
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListProjectForCostAdvanced: async ({ page, limit, status, tab_status, order = "DESC", keyword = "", startDate = '', endDate = '' }) => {
    try {
      const response = await api.get("/getListProjectForCostAdvanced", {
        params: {
          page,
          limit,
          status,
          tab_status,
          order,
          keyword,
          startDate,
          endDate
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListProjectForCostPersonil: async ({
    page,
    limit,
    status,
    tab_status,
    order = "DESC",
    keyword = "",
    startDate = '',
    endDate = '',
    isAdmin = (accountAccess?.kode === '4380' || accountAccess?.kode === '5097') ? true : false,
    // nik = (accountAccess?.kode === '6010' || accountAccess?.kode === '4384') ? decode?.USERNAME : '', 
  }) => {
    try {
      const response = await api.get("/getListProjectForCostPersonil", {
        params: {
          page,
          limit,
          status,
          tab_status,
          order,
          keyword,
          startDate,
          endDate,
          isAdmin,
          // nik
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListProjectForCostOperasional: async ({
    page,
    limit,
    status,
    tab_status,
    order = "DESC",
    keyword = "",
    startDate = '',
    endDate = '',
    isAdmin = (accountAccess?.kode === '4380' || accountAccess?.kode === '5097') ? true : false,
    // nik = (accountAccess?.kode === '6010' || accountAccess?.kode === '4384') ? decode?.USERNAME : '', 
  }) => {
    try {
      const response = await api.get("/getListProjectForCostOperasional", {
        params: {
          page,
          limit,
          status,
          tab_status,
          order,
          keyword,
          startDate,
          endDate,
          isAdmin,
          // nik
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListProjectForVendorProjectBilling: async ({
    page,
    limit,
    status,
    tab_status,
    order = "DESC",
    keyword = "",
    startDate = '',
    endDate = '',
    isAdmin = (accountAccess?.kode === '4380' || accountAccess?.kode === '5097') ? true : false,
    // nik = (accountAccess?.kode === '6010' || accountAccess?.kode === '4384') ? decode?.USERNAME : '', 
  }) => {
    try {
      const response = await api.get("/getListProjectForVendorProjectBilling", {
        params: {
          page,
          limit,
          status,
          tab_status,
          order,
          keyword,
          startDate,
          endDate,
          isAdmin,
          // nik
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListProjectForTagihanVendor: async ({ page, limit, status, tab_status, order = "DESC", keyword = "", startDate = '', endDate = '' }) => {
    try {
      const response = await api.get("/getListProjectForTagihanVendor", {
        params: {
          page,
          limit,
          status,
          tab_status,
          order,
          keyword,
          startDate,
          endDate
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListBillingByTermin: async ({ page, limit, status, tab_status, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListBillingByTermin", {
        params: {
          page,
          limit,
          status,
          tab_status,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getReferensiByJenis: async (jns_ref, keyword = '', cabang_id) => {
    try {
      const response = await api.get("/getReferensiByJenis", {
        params: {
          jns_ref,
          keyword,
          cabang_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getReferensiByJenisGroup: async (keyword = '') => {
    try {
      const response = await api.get("/getReferensiByJenisGroup", {
        params: {
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getSubReferensiByJenis: async (jns_ref, kd_ref, keyword = '') => {
    try {
      const response = await api.get("/getSubReferensiByJenis", {
        params: {
          jns_ref,
          kd_ref,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getSubReferensiByJenis2: async (jns_ref, kd_ref, keyword = '') => {
    try {
      const response = await api.get("/getSubReferensiByJenis2", {
        params: {
          jns_ref,
          kd_ref,
          keyword,
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getValidasi: async (jns_ref, kd_ref, keyword = '', sub_jns_ref = '') => {
    try {
      const response = await api.get("/getValidasi", {
        params: {
          jns_ref,
          kd_ref,
          keyword,
          sub_jns_ref
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getPortofolio: async () => {
    try {
      const response = await api.get("/getPortofolio");
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getRefLop: async (keyword, kd_spuc) => {
    try {
      const response = await api.get("/getRefLop", {
        params: {
          keyword,
          kd_spuc
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getLinkedPID: async (keyword) => {
    try {
      const response = await api.get("/getLinkedPID", {
        params: {
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getCustomers: async (keyword) => {
    try {
      const response = await api.get("/getCustomers", {
        params: {
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getCustomersBySpuc: async (portofolio_id, divisi, keyword) => {
    try {
      const response = await api.get("/getCustomerBySpuc", {
        params: {
          portofolio_id,
          divisi,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getTaskDetail: async (task_id) => {
    try {
      const response = await api.get("/getTaskDetail", {
        params: {
          task_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailProject: async (project_id) => {
    try {
      const accessAccount = getCookies('accountAccess')
      const response = await api.get("/getDetailProject", {
        params: {
          project_id,
          kode: accessAccount?.kode
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailProjectByNo: async (project_no) => {
    try {
      const accessAccount = getCookies('accountAccess')
      const response = await api.get("/getDetailProjectByNo", {
        params: {
          project_no,
          kode: accessAccount?.kode
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailProjectProfile: async (project_id) => {
    try {
      const response = await api.get("/getDetailProjectProfile", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailCostPersonil: async (project_id) => {
    try {
      const response = await api.get("/getDetailCostPersonil", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailCostAdvance: async (cost_revenue_id) => {
    try {
      const response = await api.get("/getDetailCostAdvance", {
        params: {
          cost_revenue_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailTagihanVendor: async (billing_id) => {
    try {
      const response = await api.get("/getDetailTagihanVendor", {
        params: {
          billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailCostOperational: async (project_id) => {
    try {
      const response = await api.get("/getDetailCostOperasional", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailVendorProjectBilling: async (billing_id) => {
    try {
      const response = await api.get("/getDetailVendorProjectBilling", {
        params: {
          billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailCostOperationalWithDokumen: async (cost_id) => {
    try {
      const response = await api.get("/getDetailCostOperasionalWithDokumenByCostId", {
        params: {
          cost_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailCostPersonilDetail: async (personel_id) => {
    try {
      const response = await api.get("/getDetailCostPersonilDetail", {
        params: {
          personel_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getBillingCollection: async (project_id) => {
    try {
      const response = await api.get("/getBillingCollection", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getBillingCollectionProjectActual: async (project_id) => {
    try {
      const response = await api.get("/getBillingCollectionProjectActual", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getStatusBilling: async (billing_id) => {
    try {
      const response = await api.get("/getStatusBilling", {
        params: {
          billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getVendorPlanning: async (project_id) => {
    try {
      const response = await api.get("/getVendorPlanning", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getCBBPlanning: async (project_id) => {
    try {
      const response = await api.get("/getCBBPlanning", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getCostPersonilPlanning: async (project_id) => {
    try {
      const response = await api.get("/getCostPersonilPlanning", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListVendor: async (keyword = "") => {
    try {
      const response = await api.get("/getListVendor", {
        params: {
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListVendorPt: async ({ page = 1, limit = 10, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListVendorPt", {
        params: {
          page,
          limit,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getRefStatus: async (id_tab_status) => {
    try {
      const response = await api.get("/getRefStatus", {
        params: {
          id_tab_status
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getProjectByType: async (type, keyword = "", kd_status = '') => {
    try {
      const response = await api.get("/getProjectByType", {
        params: {
          kd_status,
          type,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListProjectVendor: async ({ page, limit, order, keyword, project_type_id, startDate = '', endDate = '' }) => {
    try {
      const response = await api.get("/getListProjectVendor", {
        params: {
          page,
          limit,
          order,
          keyword,
          project_type_id,
          startDate,
          endDate
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListDokumen: async ({ jns_dok, tipe_dok }) => {
    try {
      const response = await api.get("/getListDokumen", {
        params: {
          jns_dok,
          tipe_dok
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailProjectVendor: async (project_id) => {
    try {
      const response = await api.get("/getDetailProjectVendor", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailVendorRealization: async (project_vendor_id) => {
    try {
      const response = await api.get("/getDetailVendorRealization", {
        params: {
          project_vendor_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getBillingRealization: async () => {
    try {
      const response = await api.get("/getBillingRealization");
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getBillingDocument: async (billing_id) => {
    try {
      const response = await api.get("/getBillingDocument", {
        params: {
          billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListBillingMonitoring: async ({ page, limit, order = "DESC", periode = "", filter, kd_status }) => {
    try {
      const response = await api.post("/getListBillingMonitoring", { filter }, {
        params: {
          page,
          limit,
          order,
          periode,
          kd_status
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListDetailBillingMonitoring: async ({ page, limit, order = "DESC", periode = "", filter, kd_status, keyword, customer_name }) => {
    try {
      const response = await api.post("/getListDetailBillingMonitoring", { filter }, {
        params: {
          page,
          limit,
          order,
          periode,
          kd_status,
          keyword,
          customer_name
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListNoFaktur: async ({ page, limit, order = "DESC", periode = "", filter, stBilling, status, divisi, kd_status, statusDokumen, wajibFaktur, keyword, customer_name, billing_id }) => {
    try {
      const response = await api.post("/getListNoFaktur", { filter }, {
        params: {
          page,
          limit,
          status,
          divisi,
          order,
          periode,
          kd_status,
          keyword,
          stBilling,
          wajibFaktur,
          statusDokumen,
          customer_name,
          billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListBillingRevenue: async ({ page, limit, billing_id, order = "DESC", keyword = "", startDate = '', endDate = '', searchHeader = {}, kd_status }, month = '') => {
    try {
      const response = await api.post("/getListBillingRevenue", { searchHeader }, {
        params: {
          page,
          limit,
          billing_id,
          order,
          keyword,
          startDate,
          endDate,
          month,
          kd_status
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListBillingNonProject: async ({ page, limit, billing_id, order = "DESC", keyword = "", startDate = '', endDate = '', searchHeader = {}, kd_status }, month = '') => {
    try {
      const response = await api.post("/getListBillingNonProject", { searchHeader }, {
        params: {
          page,
          limit,
          billing_id,
          order,
          keyword,
          startDate,
          endDate,
          month,
          kd_status
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getReportBillingRevenue: async (month, status) => {
    try {
      const response = await api.get("/getReportBillingRevenue", {
        params: {
          month,
          status
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailBillingRevenue: async (billing_id) => {
    try {
      console.log('billing_id', billing_id);
      const response = await api.get("/getDetailBillingRevenue", {
        params: {
          billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getLogActivity: async (project_id) => {
    try {
      const response = await api.get("/getLogActivity", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getLogBillingActivity: async (billing_id) => {
    try {
      const response = await api.get("/getLogBillingActivity", {
        params: {
          billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getLogBillingSuratTagihan: async (billing_id) => {
    try {
      const response = await api.get("/getLogBillingSuratTagihan", {
        params: {
          billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getProjectLog: async (project_id, keyword) => {
    try {
      const response = await api.get("/getProjectLog", {
        params: {
          project_id,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailCustomer: async (customer_id) => {
    try {
      const response = await api.get("/getDetailCustomer", {
        params: {
          customer_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailVendorPt: async (vendor_id) => {
    try {
      const response = await api.get("/getDetailVendorPt", {
        params: {
          vendor_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailPortofolio: async (portofolio_id) => {
    try {
      const response = await api.get("/getDetailPortofolio", {
        params: {
          portofolio_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListCustomer: async ({ page, limit, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListCustomer", {
        params: {
          page,
          limit,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListKaryawan: async ({ page = 1, limit = 10000, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListKaryawan", {
        params: {
          page,
          limit,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListPortofolio: async ({ page, limit, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListPortofolio", {
        params: {
          page,
          limit,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListReferensi: async ({ page, limit, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListReferensi", {
        params: {
          page,
          limit,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailReferensi: async ({ kd_ref = '', ur_ref = '', jns_ref = '', status = '' }) => {
    try {
      const response = await api.get("/getDetailReferensi", {
        params: {
          kd_ref,
          ur_ref,
          jns_ref,
          status
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListUserActivity: async ({ page, limit, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListUserActivity", {
        params: {
          page,
          limit,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListUser: async ({ page, limit, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListUser", {
        params: {
          page,
          limit,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListApproval: async (keyword) => {
    try {
      const response = await api.get("/getListApproval", {
        params: {
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListLokasi: async (keyword) => {
    try {
      const response = await api.get("/getListLokasi", {
        params: {
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getNotificationFaktur: async (id) => {
    try {
      const response = await api.get("/getNotificationFaktur", {
        params: {
          id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getRefDepartment: async () => {
    try {
      const response = await api.get("/getRefDepartment");
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListRemarks: async (project_id) => {
    try {
      const response = await api.get("/getListRemarks", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListProgressProject: async (project_id) => {
    try {
      const response = await api.get("/getListProgressProject", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListProgressProjectBilling: async (project_id) => {
    try {
      const response = await api.get("/getListProgressProjectBilling", {
        params: {
          project_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getOverall: async () => {
    try {
      const response = await api.get("/getOverall");
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDataAreaChart: async (year, type) => {
    try {
      const response = await api.get("/getDataAreaChart", {
        params: {
          year,
          type
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDataRadialChart: async (year) => {
    try {
      const response = await api.get("/getDataRadialChart", {
        params: {
          year
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDataRemote: async ({ entitas, modul, method, search, start, length, trans_id = '', kode_bayar = '' }) => {
    try {
      const response = await api.get("/getDataRemote", {
        params: {
          entitas,
          modul,
          method,
          search,
          start,
          length,
          trans_id,
          kode_bayar
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDataIntegrasi: async ({ entitas, modul, method, search, start, length, trans_id = '' }) => {
    try {
      const response = await api.get("/getDataIntegrasi", {
        params: {
          entitas,
          modul,
          method,
          search,
          start,
          length,
          trans_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getSettingDok: async (jenis_dok) => {
    try {
      const response = await api.get("/getSettingDok", {
        params: {
          jenis_dok
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getLogApprovalSuratTagihan: async (kode) => {
    try {
      const response = await api.get("/getLogApprovalSuratTagihan", {
        params: {
          kode
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDataPeo: async (state, payload) => {
    try {
      const response = await api.get("/getDataPeo", {
        params: {
          state,
          payload
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListBillingAdjustment: async ({ page, limit, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListBillingAdjustment", {
        params: {
          page,
          limit,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailBillingAdjustment: async (billing_id) => {
    try {
      const response = await api.get("/getDetailBillingAdjustment", {
        params: {
          billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListHariLibur: async ({ page, limit, order = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListHariLibur", {
        params: {
          page,
          limit,
          order,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListAllBilling: async (keyword, project_id, project_no, billing_id) => {
    try {
      const response = await api.get("/getListAllBilling", {
        params: {
          keyword, project_id, project_no, billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListBillingLOP: async ({ page, limit, order = "DESC", keyword = "", tahun, jenis_lop, status_revenue, spuc, real_periode, real_periode_start, real_periode_end, est_periode, est_periode_start, est_periode_end, submit_potter }) => {
    try {
      const response = await api.get("/getListBillingLOP", {
        params: {
          page,
          limit,
          order,
          keyword,
          tahun,
          jenis_lop,
          status_revenue,
          spuc,
          real_periode,
          real_periode_start,
          real_periode_end,
          est_periode,
          est_periode_start,
          est_periode_end,
          submit_potter,
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getSummaryRevenue: async ({ periode }) => {
    try {
      const response = await api.get("/getSummaryRevenue", {
        params: {
          periode,
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailBillingLOP: async (lop_detail_id) => {
    try {
      const response = await api.get("/getDetailBillingLOP", {
        params: {
          lop_detail_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getProductOwnerByPID: async (projectId) => {
    try {
      const response = await api.get("/getProductOwnerByPID", {
        params: {
          projectId,
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  generateNoRef: async () => {
    try {
      const response = await api.get("/generateNoRef", {
        params: {

        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  exportBillingLOPExcel: async (params) => {
    return api.get('/exportBillingLOPExcel', {
      params,
      responseType: 'blob', // ⬅️ PENTING
    });
  },
  getListBillingFakturPajak: async ({ page, limit, order = "DESC", periode = "", filter, kd_status }) => {
    try {
      const response = await api.get("/getListBillingFakturPajak", {
        params: {
          page,
          limit,
          order,
          periode,
          kd_status
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListNoFakturExcel: async ({ page, limit, order = "DESC", periode = "", filter, stBilling, status, divisi, kd_status, statusDokumen, wajibFaktur, keyword, customer_name, billing_id }) => {
    try {
      const response = await api.post("/getListNoFakturExcel", { filter }, {
        params: {
          page,
          limit,
          status,
          divisi,
          order,
          periode,
          kd_status,
          keyword,
          stBilling,
          wajibFaktur,
          statusDokumen,
          customer_name,
          billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListPID: async (PID) => {
    try {
      const response = await api.get("/getListPID", {
        params: {
          PID
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getStokMaterai: async ({ jenis_materai }) => {
    try {
      const response = await api.get("/getStokMaterai", {
        params: {
          jenis_materai
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getNIPByRoleId: async (role) => {
    try {
      const response = await api.get("/getNIPByRoleId", {
        params: {
          role
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListAllBillingForLop: async (keyword, project_id, project_no, billing_id) => {
    try {
      const response = await api.get("/getListAllBillingForLop", {
        params: {
          keyword, project_id, project_no, billing_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  //YANG DIPAKAI
  getSummaryPengajuan: async () => {
    try {
      const response = await api.get("/getSummaryPengajuan", {
        params: {
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListPengajuan: async ({ page, limit, status, sortBy = "DESC", keyword = "", pengajuan_id = null, filter = {} }) => {
    try {
      const response = await api.get("/getListPengajuan", {
        params: {
          page,
          limit,
          status,
          sortBy,
          keyword,
          pengajuan_id,
          filter
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListPengajuanPriority: async ({ page, limit, sortBy = "DESC" }) => {
    try {
      const response = await api.get("/getListPengajuanPriority", {
        params: {
          page,
          limit,
          sortBy
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDashboardSummary: async ({
    kategori = '',
    detailFilter = {},
    periode = '',
    ytd
  }) => {
    try {
      const response = await api.get("/getDashboardSummary", {
        params: {
          kategori,
          detailFilter,
          periode,
          ytd
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getMenungguPembayaran: async ({ page, limit, range }) => {
    try {
      const response = await api.get("/getMenungguPembayaran", {
        params: {
          page,
          limit,
          range
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getPengajuanDashboard: async ({ page, limit, status }) => {
    try {
      const response = await api.get("/getPengajuanDashboard", {
        params: {
          page,
          limit,
          status
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getTaskAktifMingguIni: async ({ page, limit, status }) => {
    try {
      const response = await api.get("/getTaskAktifMingguIni", {
        params: {
          page,
          limit,
          status
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getPengajuanSummary: async ({
    kategori = '',
    detailFilter = {},
    periode = '',
    ytd
  }) => {
    try {
      const response = await api.get("/getPengajuanSummary", {
        params: {
          kategori,
          detailFilter,
          periode,
          ytd
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getPengajuanOmset: async ({
    cabang_id = [],
    periode = ''
  }) => {
    try {
      const response = await api.get("/getPengajuanOmset", {
        params: {
          cabang_id,
          periode
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getSLAOverview: async () => {
    try {
      const response = await api.get("/getSLAOverview", {
        params: {}
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getSLAPerformance: async ({ periode }) => {
    try {
      const response = await api.get("/getSLAPerformance", {
        params: {
          periode
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getMonitoringSummary: async ({
    kategori = '',
    detailFilter = {},
    periode = '',
    ytd
  }) => {
    try {
      const response = await api.get("/getMonitoringSummary", {
        params: {
          kategori,
          detailFilter,
          periode,
          ytd
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListAllPengajuan: async ({ page, limit, sortBy = "ASC", keyword = "", download = {}, toDownload = false }) => {
    try {
      const response = await api.get("/getListAllPengajuan", {
        params: {
          page,
          limit,
          sortBy,
          keyword,
          download,
          toDownload
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListAllPengajuanDashboard: async ({ page, limit, keyword = "", tipe, download = false }) => {
    try {
      const response = await api.get("/getListAllPengajuanDashboard", {
        params: {
          page,
          limit,
          keyword,
          tipe,
          download
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailPengajuan: async (pengajuan_id) => {
    try {
      const response = await api.get("/getDetailPengajuan", {
        params: {
          pengajuan_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDataOmset: async () => {
    try {
      const response = await api.get("/getDataOmset", {
        params: {

        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailPengajuanNoAuth: async (pengajuan_id) => {
    try {
      const response = await api.get("/getDetailPengajuanNoAuth", {
        params: {
          pengajuan_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailUser: async (user_id) => {
    try {
      const response = await api.get("/getDetailUser", {
        params: {
          user_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDataMasterApprovalByHeader: async (payload) => {
    try {
      const response = await api.get("/getDataMasterApprovalByHeader", {
        params: {
          payload
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDataMasterApproval: async (payload) => {
    try {
      const response = await api.get("/getDataMasterApproval", {
        params: {
          payload
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDataMasterApprovalAll: async (payload) => {
    try {
      const response = await api.get("/getDataMasterApprovalAll", {
        params: {
          payload
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailMasterData: async (ref_id) => {
    try {
      const response = await api.get("/getDetailMasterData", {
        params: {
          ref_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailJenisPajak: async (jenis_pajak_id) => {
    try {
      const response = await api.get("/getDetailJenisPajak", {
        params: {
          jenis_pajak_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailVendor: async (vendor_id) => {
    try {
      const response = await api.get("/getDetailVendor", {
        params: {
          vendor_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailAnggaran: async (anggaran_id) => {
    try {
      const response = await api.get("/getDetailAnggaran", {
        params: {
          anggaran_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailAnggaranByCoa: async ({ coa_detail_id, cabang_id }) => {
    try {
      const response = await api.get("/getDetailAnggaranByCoa", {
        params: {
          coa_detail_id,
          cabang_id
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDetailStatus: async (status) => {
    try {
      const response = await api.get("/getDetailStatus", {
        params: {
          status
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDataUser: async (tipe_user) => {
    try {
      const response = await api.get("/getDataUser", {
        params: {
          tipe_user
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getDataVendor: async (tipe_user) => {
    try {
      const response = await api.get("/getDataVendor", {
        params: {
          tipe_user
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListUserManagement: async ({ page, limit, sortBy = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListUserManagement", {
        params: {
          page,
          limit,
          sortBy,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListMasterApproval: async ({ page, limit, sortBy = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListMasterApproval", {
        params: {
          page,
          limit,
          sortBy,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListMasterData: async ({ page, limit, sortBy = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListMasterData", {
        params: {
          page,
          limit,
          sortBy,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListManajemenSession: async ({ page, limit, sortBy = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListManajemenSession", {
        params: {
          page,
          limit,
          sortBy,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListAnggaran: async ({ page, limit, sortBy = "DESC", keyword = "", filter = {} }) => {
    try {
      const response = await api.get("/getListAnggaran", {
        params: {
          page,
          limit,
          sortBy,
          keyword,
          filter
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListPenjualan: async ({ page, limit, sortBy = "DESC", keyword = "", filter }) => {
    try {
      const response = await api.get("/getListPenjualan", {
        params: {
          page,
          limit,
          sortBy,
          keyword,
          filter
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListJenisPajak: async ({ page, limit, sortBy = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListJenisPajak", {
        params: {
          page,
          limit,
          sortBy,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListVendor: async ({ page, limit, sortBy = "DESC", keyword = "" }) => {
    try {
      const response = await api.get("/getListVendor", {
        params: {
          page,
          limit,
          sortBy,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListCoa: async (keyword) => {
    try {
      const response = await api.get("/getListCoa", {
        params: {
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListCoaDetail: async (keyword) => {
    try {
      const response = await api.get("/getListCoaDetail", {
        params: {
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListCoaDetailDashboard: async ({ cabang_id = [], periode, ytd }) => {
    try {
      const response = await api.get("/getListCoaDetailDashboard", {
        params: {
          cabang_id,
          periode,
          ytd
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListCoaDetailByDashboard: async (keyword) => {
    try {
      const response = await api.get("/getListCoaDetailByDashboard", {
        params: {
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListCoaDetailByCabang: async (cabang_id, keyword) => {
    try {
      const response = await api.get("/getListCoaDetailByCabang", {
        params: {
          cabang_id,
          keyword
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  getListNotification: async ({ page, limit }) => {
    try {
      const response = await api.get("/getListNotification", {
        params: {
          page,
          limit
        }
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
};

export default n2nGetService;