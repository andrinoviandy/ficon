// import { lazy } from 'react'

import Page404 from 'views/404'
import Blank from 'views/Blank'

// DASHBOARD
import Dashboard from 'views/Dashboard'

// PROJECT
// import Project from 'views/Project'
import DataPengajuan from 'views/Pengajuan/DataPengajuan'
import HistoryPengajuan from 'views/Pengajuan/HistoryPengajuan'

// MASTER
import UserManagement from 'views/UserManagement'
import { getCookies } from 'global/helper/cookie'
import FlowApproval from 'views/Pengajuan/FlowApproval'
import Reporting from 'views/Reporting'
import Approval from 'views/Approval'
import MasterData from 'views/MasterData'
import AddEditPengajuan from 'views/Pengajuan/DataPengajuan/components/AddEditPengajuan'
import PerhitunganPajak from 'views/PerhitunganPajak'
import ApprovalPengajuan from 'views/Pengajuan/ApprovalPengajuan'
import ManajemenAnggaran from 'views/ManajemenAnggaran'
import AddEditUserManagement from 'views/UserManagement/components/AddEditUserManagement'
import AddEditUserApproval from 'views/Approval/components/AddEditApproval'
import AddEditAnggaran from 'views/ManajemenAnggaran/components/AddEditAnggaran'
import AddEditMasterData from 'views/MasterData/components/AddEditMasterData'
import Penjualan from 'views/Penjualan'
import PenandatanganDokumen from 'views/PenandatanganDokumen'
import AddEditPenandatangan from 'views/PenandatanganDokumen/components/AddEditPenandatangan'
import PenyelesaianKasbon from 'views/Pengajuan/DataPengajuan/components/PenyelesaianKasbon'
import MasterApproval from 'views/MasterApproval'
import AddEditMasterApproval from 'views/MasterApproval/components/AddEditMasterApproval'
import UbahPassword from 'views/UbahPassword'
import DataVendor from 'views/DataVendor'
import AddEditVendor from 'views/DataVendor/components/AddEditVendor'
import ManajemenSession from 'views/ManajemenSession'
import DaftarTugasHarian from 'views/DaftarTugasHarian'
import RiwayatPengantaran from 'views/RiwayatPengantaran'
import BayarFaktur from 'views/BayarFaktur'
import VerifikasiPembayaran from 'views/VerifikasiPembayaran'
import PenugasanFaktur from 'views/PenugasanFaktur'
import MonitoringPenugasan from 'views/MonitoringPenugasan'
import Laporan from 'views/Laporan'
import MasterFaktur from 'views/DataFaktur'
import MasterPelanggan from 'views/MasterPelanggan'
import ManajemenUser from 'views/ManajemenUser'
import KonfirmasiPiutang from 'views/KonfirmasiPiutang'
import DataPenjualan from 'views/DataPenjualan'
import DataPiutang from 'views/DataPiutang'
import DashboardRasioBiaya from 'views/RasioBiaya'
import DashboardPerformaPrincipal from 'views/PerformaPrincipal'
// import Profile from 'views/ProfileUser'

// const Dashboard = lazy(() => import('../pages/Dashboard'))
// const Page404 = lazy(() => import('../pages/404'))
// const Blank = lazy(() => import('../pages/Blank'))
const accountAccess = getCookies("accountAccess");  

const routes = [
  {
    path: '/', // the url
    component: DashboardRasioBiaya, // view rendered
  },
  {
    path: '/rasio-biaya',
    component: DashboardRasioBiaya,
  },
  {
    path: '/performa-principal',
    component: DashboardPerformaPrincipal,
  },
]

export default routes
