import React, { useEffect, useState } from 'react'
import { IoEllipsisVertical } from 'react-icons/io5';
import { HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';


const ActionButton = ({ location, navigation, loginAccess, setDropdownOpen, dispatch, v }) => {
  const handleDropdownClick = () => {
    setDropdownOpen(true);
  }
  const handleEdit = async () => {
    navigation("/edit-master-approval", {
      state: {
        ...location.state,
        project: "Edit Flow Approval",
        data: {
          jenis_biaya_id: v?.jenis_biaya_id,
          unit_kerja_pemohon_id: v?.unit_kerja_pemohon_id,
          jabatan_pemohon_id: v?.jabatan_pemohon_id,
        }
      },
    });
  };

  const handleClone = async () => {
    navigation("/edit-master-approval", {
      state: {
        ...location.state,
        project: "Kloning Flow Approval",
        data: {
          jenis_biaya_id: v?.jenis_biaya_id,
          unit_kerja_pemohon_id: v?.unit_kerja_pemohon_id,
          jabatan_pemohon_id: v?.jabatan_pemohon_id,
        }
      },
    });
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
              <div className='pl-0' onClick={handleEdit}>
                <HiOutlinePencilAlt className='text-xl' /> Edit
              </div>
            </li>
          </ul>
          <hr className='my-2' />
          <ul>
            <li>
              <div className='pl-0' onClick={handleClone}>
                <HiOutlinePencilAlt className='text-xl' /> Cloning
              </div>
            </li>
          </ul>
        </>
      </div>
    </div>
  )
}

export default ActionButton