import React, { useEffect, useState } from 'react'
import storeSchema from 'global/store';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoFilterOutline, IoSearch } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { swal } from 'global/helper/swal';
import { Modal } from 'components/atoms';
import { setToggleModal } from '../../redux/n2n/global';
import { ReactComponent as ProjectID } from 'assets/icons/rdProjectId.svg';
import { ReactComponent as ProjectName } from 'assets/icons/rdProjectName.svg';
import { ReactComponent as TotalCost } from 'assets/icons/rdTotalCost.svg';
import { formatCurrency } from 'global/helper/formatCurrency';
import { Label, Select } from 'components/atoms'
import { FaPlusCircle, FaUsersCog, FaWallet } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import TableManajemenAnggaran from './components/TableManajemenAnggaran';
import ModalUpload from './components/Modal/ModalUpload';
import { getCookies } from 'global/helper/cookie';
import ModalRiwayatAnggaran from './components/Modal/ModalRiwayatAnggaran';
import { decodeData } from 'global/helper/jwt';
import ModalGagal from './components/Modal/ModalGagal';

const ManajemenAnggaran = () => {
  const [loginAccess, setLoginAccess] = useState()
  useEffect(() => {
    const get = async () => {
      const decoded = await decodeData(getCookies('accountAccess'))
      setLoginAccess(decoded)
    }
    get()
  }, [])
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const { toggleModal, dimensionScreenW, check } = useSelector((state) => state.global)

  const headerTableModal = ["No", "Role", "Kualifikasi", "Qty", "UoM", "Qty", "UoM"];

  const [reloadData, setReloadData] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "modalUpload" }));
  };

  return (
    <>
      <ModalUpload reloadData={reloadData} setReloadData={setReloadData} />
      <ModalGagal />
      <ModalRiwayatAnggaran />
      <div className='bg-white px-6 pt-10 h-full  '>
        <div className='flex lg:flex-row flex-col gap-5'>
          <div className='flex gap-3 w-full items-center'>
            <div className='rounded-xl bg-gradient-to-tr from-blue-900 to-orange-500 p-1 w-12 h-12 flex items-center justify-center'>
              <FaWallet className='text-3xl text-white' />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-xl font-bold text-blue-900'>{['RL08', 'RL00'].includes(loginAccess?.role_id) ? 'Manajemen Anggaran' : 'Riwayat Anggaran'}</div>
              <div className='text-sm font-light'>
                {['RL08', 'RL00'].includes(loginAccess?.role_id) ? 'Manajemen' : 'Riwayat'} Anggaran Cabang Anda Disini.
              </div>
            </div>
          </div>
          {['RL08', 'RL00'].includes(loginAccess?.role_id) && (
            <div className='flex sm:w-full justify-end gap-3'>
              {/* <button className='btn btn-ghost rounded-[25px] border-[#ccc] mr-4 px-5'
                              onClick={downloadReportExcel}
                              disabled={!hasPermission("EXPORT")}
                            >Download Report</button> */}
              <button className='btn bg-blue-900 text-white rounded-[25px] px-5 hover:scale-105' onClick={handleUpload}><FaPlusCircle className='' /> Upload Data (.xlsx)</button>
              {
                // (['4416', '8002', '5099', '8003'].includes(accountAccess?.kode) === false) && (
                // (hasPermission("CREATE")) && (
                <button className='btn bg-blue-900 text-white rounded-[25px] px-5 hover:scale-105' onClick={() => navigation('/add-anggaran', { state: { ...location.state, project: 'Add Anggaran' } })}><FaPlusCircle className='' /> Anggaran Baru</button>
                // )
              }
            </div>
          )}
        </div>
        <hr className='border-t-2 my-6' />
        {/* TABLE */}
        <TableManajemenAnggaran navigation={navigation} location={location} dimensionScreenW={dimensionScreenW} check={check} loginAccess={loginAccess} dispatch={dispatch} setToggleModal={setToggleModal} toggleModal={toggleModal} reloadData={reloadData} setReloadData={setReloadData} />
      </div>
    </>
  )
}

export default ManajemenAnggaran