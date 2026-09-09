import storeSchema from 'global/store';
import { IoEllipsisVertical, IoFilterOutline, IoSearch } from 'react-icons/io5';
import { HiOutlineEye, HiOutlinePencilAlt } from 'react-icons/hi';
import { swal } from 'global/helper/swal';
import { setToggleModal } from '../../../../redux/n2n/global';
import { getCookies } from 'global/helper/cookie';
import { createPermissionChecker } from 'global/helper/permission';


const ActionButton = ({selectedData, setTableDataModal, dispatch, toggleModal, navigation, location}) => {
  const accountAccess = getCookies("accountAccess");
  const handleView = async (e) => {
    e.preventDefault();
    swal.loading();
    try {
      const res = await storeSchema.actions.getCostPersonilPlanning(selectedData[0]?.PROJECT_ID);
      if (res?.status === true) {
        swal.close()
        setTableDataModal(res?.data);
        dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "resourceDetail", dataSelect: selectedData[0] }));
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error)
    }
  };

  const handleLogActivity = async (e) => {
    e.preventDefault();
    swal.loading()
    try {
      const res = await storeSchema.actions.getLogActivity(selectedData[0]?.PROJECT_ID);
      if (res?.status === true) {
        swal.close();
        dispatch(setToggleModal({ isOpen: !toggleModal.isOpen, modal: "logActivity", dataX: res?.data }));
      } else {
        swal.error(res?.message);
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    navigation('/edit-people-assignment', {
      state: {
        ...location.state,
        project: 'Edit People Assignment',
        data: { project_id: selectedData[0]?.PROJECT_ID },
        // tabActive: tabActive
      },
    });
  };

  const menu = location.state?.menu;
  
  const hasPermission = createPermissionChecker(menu.submenu?.actions);

  return (
    <div className='dropdown dropdown-right'>
        <div tabIndex={0} role='button'>
        <div className={`btn btn-sm rounded-[25px] bg-white`}>
            <IoEllipsisVertical />
        </div>
        </div>
        <div tabIndex={0} className="menu menu-md dropdown-content mt-3 z-[1] p-5 border shadow bg-white rounded-box w-64">
        <p className='text-md font-bold'>Action</p>
        {selectedData?.length === 1 && (
            <>
            {
              // kondisi role SSA / AM tidak bisa edit
              // accountAccess?.kode !== '4382' && accountAccess?.kode !== '8003' && (
              hasPermission('UPDATE') && (
                <>
                  <hr className='my-2' />
                  <ul>
                    <li>
                      <div className='pl-0' onClick={handleEdit} >
                        <HiOutlinePencilAlt className='text-xl' /> Edit 
                      </div>
                    </li>
                  </ul>
                </>
              )
            }
            {
              hasPermission('READ') && (
                <>
                  <hr className='my-2' />
                  <ul>
                      <li>
                      <div className='pl-0' onClick={handleView}>
                          <HiOutlineEye className='text-xl' /> View
                      </div>
                      </li>
                  </ul>
                </>
              )
            }
            {
              hasPermission('READ') && (
                <>
                  <hr className='my-2' />
                  <ul>
                      <li>
                      <div className='pl-0' onClick={handleLogActivity}>
                          <HiOutlineEye className='text-xl' /> Log Activity
                      </div>
                      </li>
                  </ul>
                </>
              )
            }
            </>
        )}
        </div>
    </div>
  )
}

export default ActionButton