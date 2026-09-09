import React, { useEffect, useState } from 'react'
import { IoEllipsisVertical } from 'react-icons/io5';
import { HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';


const ActionButton = ({dimensionScreenW, check, selectedData}) => {

  return (
    <div className='dropdown dropdown-right'>
    <div tabIndex={0} role='button'>
      <div className={`btn btn-sm rounded-[25px] bg-white ${(dimensionScreenW < 768 && check) ? 'bringToBack' : ''}`}>
         <IoEllipsisVertical />
      </div>
    </div>
    <div tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-5 border shadow bg-white rounded-box w-64">
      <p className='text-md font-bold'>Action</p>
      {selectedData?.length === 1 && (
        <>
          <hr className='my-2' />
          <ul>
            <li>
              <div className='pl-0' onClick={""}>
                <HiOutlineEye className='text-xl' /> View
              </div>
            </li>
            <li>
              <div className='pl-0' onClick={""}>
                <HiOutlinePencilAlt className='text-xl' /> Edit
              </div>
            </li>
            <li>
              <div className='pl-0' onClick={""}>
                <HiOutlineTrash className='text-xl' /> Hapus
              </div>
            </li>
          </ul>
        </>
      )}
    </div>
  </div>
  )
}

export default ActionButton