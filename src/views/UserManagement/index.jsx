import React, { useEffect, useState } from 'react'
import storeSchema from 'global/store';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoFilterOutline, IoSearch } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import TableUserManagement from './components/TableUserManagement';
import { swal } from 'global/helper/swal';
import { Modal } from 'components/atoms';
import { setToggleModal } from '../../redux/n2n/global';
import { ReactComponent as ProjectID } from 'assets/icons/rdProjectId.svg';
import { ReactComponent as ProjectName } from 'assets/icons/rdProjectName.svg';
import { ReactComponent as TotalCost } from 'assets/icons/rdTotalCost.svg';
import { formatCurrency } from 'global/helper/formatCurrency';
import { Label, Select } from 'components/atoms'
import { FaPlusCircle, FaUsersCog } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { decodeData } from 'global/helper/jwt';
import { getCookies } from 'global/helper/cookie';

const UserManagement = () => {
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
      {/* <Modal
        title={toggleModal?.title + "User"}
        modal={"resourceDetail"}
        size={"w-11/12 max-w-5xl"}
        buttonFooter={
          <>
            <button className='btn rounded-[25px] px-5 ml-3 bg-ghost'>
              Cancel
            </button>
            <button className='btn rounded-[25px] px-5 ml-3 text-white bg-[#2E66B9]'
            // onClick={handleMarkAs}
            // disabled={selectedData?.length === 0 || toggleModal?.selectedData?.length === 0 || (toggleModal?.data === "Akselerasi" ? cantAcceleration : ((toggleModal?.data === "Archive" || toggleModal?.data === "Unarchive") ? false : cantMarkAs))}
            >
              {toggleModal?.title === "Edit" ? "Update" : "Save"}
            </button>
          </>
        }
      >
        <div className='flex flex-col gap-2'>
          <div className='sm:flex sm:gap-10'>
            <div className='w-full'>
              <Label
                label='Name'
                children={
                  <input
                    type="text"
                    className="input input-bordered rounded-[25px] bg-white w-full"
                    name='name'
                  // value={dataDetail?.TERMIN}
                  />
                }
              />
            </div>
            <div className='w-full'>
              <Label
                label='Email'
                children={
                  <input
                    type="email"
                    className="input input-bordered rounded-[25px] bg-white w-full"
                    name='email'
                  // value={dataDetail?.PROJECT_NAME}
                  />
                }
              />
            </div>
            <div className='w-full'>
              <Label
                label='Role'
                children={
                  <Select
                    name='role'
                    className='pl-0'
                  // options={options}
                  // onChange={(e, { name }) => handleChangeOpt(e, name)}
                  // value={{ label: (dataDetail?.STATUS_PYMAD === null ? dataDetail?.STATUS_PYMAD : (dataDetail?.STATUS_PYMAD === 'T' ? 'Yes' : 'No')), value: dataDetail?.STATUS_PYMAD }}
                  />
                }
              />
            </div>
          </div>
        </div>
        <div className='card border-2 mt-5'>
          <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Permission</div>
          <div className='card-body'>
            <div className='max-h-64 overflow-auto flex-row gap-2'>
              <div className='flex flex-col gap-2'>
                <div className='sm:flex sm:gap-10'>
                  <div className='w-full'>
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                      <label className="label-text">Create</label>
                    </div>
                  </div>
                  <div className='w-full'>
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                      <label className="label-text">Update</label>
                    </div>
                  </div>
                  <div className='w-full'>
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                      <label className="label-text">View</label>
                    </div>
                  </div>
                  <div className='w-full'>
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                      <label className="label-text">Delete</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal> */}

      <div className='bg-white px-6 pt-10 h-full  '>
        <div className='flex sm:flex-row flex-col gap-5'>
          <div className='flex gap-3 w-full items-center'>
            <div className='rounded-xl bg-gradient-to-tr from-blue-900 to-orange-500 p-1 w-12 h-12 flex items-center justify-center'>
              <FaUsersCog className='text-3xl text-white' />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='text-xl font-bold text-blue-900'>User Management</div>
              <div className='text-sm font-light'>
                Lihat data user disini.
              </div>
            </div>
          </div>
          <div className='flex sm:w-full justify-end'>
            {/* <button className='btn btn-ghost rounded-[25px] border-[#ccc] mr-4 px-5'
                              onClick={downloadReportExcel}
                              disabled={!hasPermission("EXPORT")}
                            >Download Report</button> */}
            {
              // (['4416', '8002', '5099', '8003'].includes(accountAccess?.kode) === false) && (
              // (hasPermission("CREATE")) && (
              <button className='btn bg-blue-900 text-white rounded-[25px] px-5 hover:scale-105' onClick={() => navigation('/add-user', { state: { ...location.state, project: 'Add User' } })}><FaPlusCircle className='' /> Tambah User</button>
              // )
            }
          </div>
        </div>
        <hr className='border-t-2 my-6' />
        {/* TABLE */}
        <TableUserManagement
          check={check} dimensionScreenW={dimensionScreenW} loginAccess={loginAccess}
        />
      </div>
    </>
  )
}

export default UserManagement