import React from 'react'
// import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import { Modal } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux';
import { IoCalendarOutline, IoPerson } from 'react-icons/io5';
import { CgNotes } from "react-icons/cg";
import BgModal from 'assets/BgModal.svg';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
import { setToggleModal } from '../../../../../redux/n2n/global';

const ModalLog = ( onClick ) => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);

  const handleRefesh = async () => {
    swal.loading()
    const res = await storeSchema.actions.getLogActivity(toggleModal?.dataX?.PROJECT_ID);
    if(res?.status) {
      swal.close();
      dispatch(setToggleModal({isOpen: true, modal: "logActivity", dataX: res?.data}));
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
          <label className="block text-sm font-bold mb-2">TRACKING DATA</label>
          <input
            type="text"
            value={toggleModal?.dataX?.PROJECT_NO}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <button className="tab tab-bordered border-b-2 border-blue-500 hover:border-blue-700">Riwayat</button>
          <button className="btn btn-primary" onClick={handleRefesh}>Perbarui Status</button>
        </div>
        <div className="overflow-x-auto mt-4">
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
        </div>
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