import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoListOutline } from "react-icons/io5";
import TableListPengajuan from './components/TableListPengajuan'
import ModalLog from './components/Modal/ModalLog';
import ModalReport from './components/Modal/ModalDownloadReport';
import ModalProgressProject from './components/Modal/ModalProgressProject';
import ModalNoted from './components/Modal/ModalNoted';
import { FaPlusCircle } from 'react-icons/fa';
import ModalReject from './components/Modal/ModalReject';
import ModalApprove from './components/Modal/ModalApprove';
import ModalAfterApprove from './components/Modal/ModalAfterApprove';
import ModalView from './components/Modal/ModalView';
import ModalAfterReject from './components/Modal/ModalAfterReject';
import ModalEditData from './components/Modal/ModalEditData';
import { getCookies } from 'global/helper/cookie';
import ModalPenyelesaianKasbon from './components/Modal/ModalPenyelesaianKasbon';
import { decodeData } from 'global/helper/jwt';
import ModalQr from './components/Modal/ModalQR';

const ListPengajuan = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const { dimensionScreenW, check } = useSelector((state) => state.global);
  const menu = location.state?.menu;
  const project = location.state?.project;
  const [loginAccess, setLoginAccess] = useState()

  useEffect(() => {
    const get = async () => {
      const decoded = await decodeData(getCookies('accountAccess'))
      setLoginAccess(decoded)
    }
    get()
  }, [])

  return (
    <>
      <ModalLog />
      <ModalReport />
      <ModalProgressProject />
      <ModalNoted />
      <ModalReject />
      <ModalAfterApprove />
      <ModalQr />
      <ModalAfterReject />
      <ModalEditData loginAccess={loginAccess} />
      <ModalPenyelesaianKasbon />
      <div className='bg-white px-6 pt-10 h-full'>
        <div className='flex sm:flex-row flex-col gap-5 '>
          {/* <ModalLog toggleModal={toggleModalLog} location={location} /> */}
          <div className='flex gap-3 w-full items-center'>
            <div className='rounded-xl bg-gradient-to-tl from-blue-900 to-orange-500 p-1 w-12 h-12 flex items-center justify-center'>
              <IoListOutline className='text-3xl text-white' />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-xl font-bold text-blue-900'>
                {(menu?.submenu?.name === 'Approval Pengajuan' || project === 'Approval Pengajuan') ? 'Approval Pengajuan' : 'Data Pengajuan'}
              </div>
              <div className='text-sm font-light'>Lihat data {(menu?.submenu?.name === 'Approval Pengajuan' || project === 'Approval Pengajuan') ? 'approval' : ''} pengajuan anda disini.</div>
            </div>
          </div>
          <div className='flex sm:w-full justify-end'>
            {/* <button className='btn btn-ghost rounded-[25px] border-[#ccc] mr-4 px-5'
              onClick={downloadReportExcel}
              disabled={!hasPermission("EXPORT")}
            >Download Report</button> */}
            {menu?.submenu?.name === 'Data Pengajuan' && !['RL00', 'RL16', 'RL17'].includes(loginAccess?.role_id) && (
              // (['4416', '8002', '5099', '8003'].includes(accountAccess?.kode) === false) && (
              // (hasPermission("CREATE")) && (
              <button className='btn bg-blue-900 text-white rounded-[25px] px-5 hover:scale-105' onClick={() => navigation('/add-pengajuan', { state: { ...location.state, project: 'Add Pengajuan' } })}><FaPlusCircle className='' /> Pengajuan Baru</button>
              // )
            )}

          </div>
        </div>
        <hr className='border-t-2 my-6' />
        {/* TABLE */}
        <TableListPengajuan
          check={check} dimensionScreenW={dimensionScreenW} loginAccess={loginAccess}
        />
      </div>
    </>
  )
}

export default ListPengajuan