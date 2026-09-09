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
// import Profile from 'views/ProfileUser'

// const Dashboard = lazy(() => import('../pages/Dashboard'))
// const Page404 = lazy(() => import('../pages/404'))
// const Blank = lazy(() => import('../pages/Blank'))
const accountAccess = getCookies("accountAccess");  

const routes = [
  {
    path: '/', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/data-faktur',
    component: MasterFaktur,
  },
  {
    path: '/data-penjualan',
    component: DataPenjualan,
  },
  {
    path: '/data-piutang',
    component: DataPiutang,
  },
  {
    path: '/daftar-tugas-harian',
    component: DaftarTugasHarian,
  },
  {
    path: '/riwayat-pengantaran',
    component: RiwayatPengantaran,
  },
  {
    path: '/bayar-faktur',
    component: BayarFaktur,
  },
  {
    path: '/verifikasi-pembayaran',
    component: VerifikasiPembayaran,
  },
  {
    path: '/penugasan-faktur',
    component: PenugasanFaktur,
  },
  {
    path: '/monitoring-penugasan',
    component: MonitoringPenugasan,
  },
  {
    path: '/konfirmasi-piutang',
    component: KonfirmasiPiutang,
  },
  {
    path: '/laporan',
    component: Laporan,
  },
  {
    path: '/manajemen-user',
    component: ManajemenUser,
  },
  {
    path: '/data-pelanggan',
    component: MasterPelanggan,
  },














  {
    path: '/ubah-password',
    component: UbahPassword,
  },

  {
    path: '/perhitungan-pajak',
    component: PerhitunganPajak,
  },
  {
    path: '/data-pengajuan',
    component: DataPengajuan,
  },
  {
    path: '/flow-approval',
    component: FlowApproval,
  },
  {
    path: '/manajemen-session',
    component: ManajemenSession,
  },
  {
    path: '/approval',
    component: Approval,
  },
  {
    path: '/master-vendor',
    component: DataVendor,
  },
  {
    path: '/penjualan',
    component: Penjualan,
  },
  {
    path: '/penandatangan-dokumen',
    component: PenandatanganDokumen,
  },
  {
    path: '/add-penandatangan-dokumen',
    component: AddEditPenandatangan,
  },
  
  {
    path: '/add-vendor',
    component: AddEditVendor,
  },
  {
    path: '/edit-vendor',
    component: AddEditVendor,
  },
  {
    path: '/master-data',
    component: MasterData,
  },
  {
    path: '/reporting',
    component: Reporting,
  },
  {
    path: '/add-pengajuan',
    component: AddEditPengajuan,
  },
  {
    path: '/edit-pengajuan',
    component: AddEditPengajuan,
  },
  {
    path: '/penyelesaian-kasbon',
    component: PenyelesaianKasbon,
  },
  {
    path: '/add-user',
    component: AddEditUserManagement,
  },
  {
    path: '/edit-user',
    component: AddEditUserManagement,
  },
  {
    path: '/add-master-approval',
    component: AddEditMasterApproval,
  },
  {
    path: '/edit-master-approval',
    component: AddEditMasterApproval,
  },
  {
    path: '/add-approval',
    component: AddEditUserApproval,
  },
  {
    path: '/edit-approval',
    component: AddEditUserApproval,
  },
  {
    path: '/add-anggaran',
    component: AddEditAnggaran,
  },
  {
    path: '/edit-anggaran',
    component: AddEditAnggaran,
  },
  {
    path: '/add-master-data',
    component: AddEditMasterData,
  },
  {
    path: '/edit-master-data',
    component: AddEditMasterData,
  },
  // {
  //   path: '/approval-pengajuan',
  //   component: DataPengajuan,
  // },
  {
    path: '/manajemen-anggaran',
    component: ManajemenAnggaran,
  },
  // PROJECT PROFILE
  {
    path: '/history-pengajuan',
    component: HistoryPengajuan,
  },
  {
    path: '/user-management',
    component: UserManagement,
  },
  {
    path: '/master-approval',
    component: MasterApproval,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
