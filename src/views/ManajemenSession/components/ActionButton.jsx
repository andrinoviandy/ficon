import React, { useEffect, useState } from 'react'
import { IoEllipsisVertical } from 'react-icons/io5';
import { HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { FaSignOutAlt } from 'react-icons/fa';
import { swal } from 'global/helper/swal';
import storeSchema from 'global/store';


const ActionButton = ({ location, navigation, loginAccess, setDropdownOpen, dispatch, v, getListManajemenSession }) => {
  const handleDropdownClick = () => {
    setDropdownOpen(true);
  }
  const handleKill = async () => {
    const res = await storeSchema.actions.killSession({ id: v?.s_id })
    if (res?.status === true) {
      await swal.custom('Success !', 'Session berhasil di kill', 'success')
      await getListManajemenSession()
    } else {
      swal.error('Gagal Kill Session')
    }
  };

  return (
    <div className='dropdown dropdown-right' onClick={() => { handleDropdownClick() }}>
      <div tabIndex={0} role='button'>
        <div className={`btn btn-sm rounded-[25px] bg-white`}>
          <IoEllipsisVertical />
        </div>
      </div>
      <div tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-5 border shadow bg-white rounded-box w-64">
        <p className='text-md font-bold'>Action</p>
        <>
          {/* <hr className='my-2' />
          <ul>
            <li>
              <div className='pl-0' onClick={""}>
                <HiOutlineEye className='text-xl' /> View
              </div>
            </li>
          </ul> */}
          <hr className='my-2' />
          <ul>
            <li>
              <div className='pl-0' onClick={handleKill}>
                <FaSignOutAlt className='text-xl' /> Kill Session
              </div>
            </li>
          </ul>
        </>
      </div>
    </div>
  )
}

export default ActionButton