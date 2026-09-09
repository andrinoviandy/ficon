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
import { FaCheckDouble, FaDatabase, FaPlusCircle, FaUsersCog, FaUserShield } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { decodeData } from 'global/helper/jwt';
import { getCookies } from 'global/helper/cookie';
import TableManajemenSession from './components/TableManajemenSession';

const ManajemenSession = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const { dimensionScreenW, check } = useSelector((state) => state.global);
  const menu = location.state?.menu;
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
      <div className='bg-white px-6 pt-10 h-full  '>
        <div className='flex sm:flex-row flex-col gap-5'>
          <div className='flex gap-3 w-full items-center'>
            <div className='rounded-xl bg-gradient-to-tr from-blue-900 to-orange-500 p-1 w-12 h-12 flex items-center justify-center'>
              <FaUserShield className='text-3xl text-white' />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-xl font-bold text-blue-900'>Manajemen Session</div>
              <div className='text-sm font-light'>
                Lihat data session user disini.
              </div>
            </div>
          </div>
          <div className='flex sm:w-full justify-end'>
            
          </div>
        </div>
        <hr className='border-t-2 my-6' />
        {/* TABLE */}
        <TableManajemenSession
          check={check} dimensionScreenW={dimensionScreenW} loginAccess={loginAccess}
        />
      </div>
    </>
  )
}

export default ManajemenSession