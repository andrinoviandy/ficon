import React from 'react'
// import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import { Modal } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux';
import { IoCalendarOutline, IoCheckmarkCircleSharp, IoPerson } from 'react-icons/io5';
import { CgNotes } from "react-icons/cg";
import BgModal from 'assets/BgModal.svg';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
import { setToggleModal } from '../../../../../redux/n2n/global';

const ModalLog = (onClick) => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);

  const handleRefresh = async () => {
    swal.loading()
    const res = await storeSchema.actions.getLogActivity(toggleModal?.dataX?.PROJECT_ID);
    if (res?.status) {
      swal.close();
      dispatch(setToggleModal({ isOpen: true, modal: "logActivity", dataX: res?.data }));
    } else {
      swal.error(res?.message);
    }
  }

  return (
    <Modal
      title="Log Activity"
      modal={"logActivity"}
      size={"w-11/12 max-w-3xl"}
      // size={"w-11/12 max-w-5xl"}
      buttonFooter={null}
    >
      <div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Project Number </label>
          <input
            type="text"
            value={toggleModal?.dataX?.PROJECT_NO}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-[25px]"
          />
        </div>
        <div className="flex justify-between">
          <button className="tab tab-bordered border-b-2 border-blue-500 hover:border-blue-700">Riwayat</button>
          <button className="btn btn-primary btn-xs" onClick={handleRefresh}>Perbarui Status</button>
        </div>
        <div className='border-t-2 my-3 h-48 overflow-auto p-3'>
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {toggleModal?.dataX?.LOG_ACTIVITY?.map((item, index) => {
              return index % 2 === 0 ? (
                <li>
                  <hr />
                  <div className="timeline-middle">
                    <IoCheckmarkCircleSharp className='text-2xl text-primary' />
                  </div>
                  <div className="timeline-start md:text-end gap-1">
                    <time className="font-mono italic">{(item?.TANGGAL_STATUS)}</time>
                    <div className="text-base font-black flex flex-row gap-3 justify-end">
                      {item?.STATUS}
                    </div>
                    <div className='text-base text-gray-500 font-semibold'>{toggleModal?.dataX?.UPDATED_BY || '-'}</div>
                    <div className='text-base text-gray-500 font-semibold'>{item?.NOTES || '-'}</div>
                  </div>
                  <hr />
                </li>
              ) : (
                <li>
                  <div className="timeline-middle">
                    <IoCheckmarkCircleSharp className='text-2xl text-primary' />
                  </div>
                  <div className="timeline-end">
                    <time className="font-mono italic">{(item?.TANGGAL_STATUS)}</time>
                    <div className="text-base font-black flex flex-row gap-3 justify-start">
                      {item?.STATUS}
                    </div>
                    <div className='text-base text-gray-500 font-semibold'>{toggleModal?.dataX?.UPDATED_BY || '-'}</div>
                    <div className='text-base text-gray-500 font-semibold'>{item?.NOTES || '-'}</div>
                  </div>
                  <hr />
                </li>
              )
            }
            )}
          </ul>
        </div>
        {/* <div className="overflow-x-auto mt-4">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Status</th>
                <th>Tanggal Status</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              {toggleModal?.dataX?.LOG_ACTIVITY?.map((item, index) => (
                <tr key={index}>
                  <td>{item.STATUS}</td>
                  <td>{item.TANGGAL_STATUS}</td>
                  <td>{item.NOTES || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </Modal>
  )
}

const modalStyle = {
  backgroundImage: `url(${BgModal})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

export default ModalLog