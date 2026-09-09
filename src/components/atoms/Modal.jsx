import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToggleModal } from '../../redux/n2n/global';
// import { ReactComponent as BgModal } from 'assets/BgModal.svg';

const Modal = ({
  scroll = true,
  closeToggle = true,
  children,
  title,
  subTitle = '',
  modal,
  size,
  iconTitle = '',
  buttonFooter = <button className="btn rounded-full">Close</button>,
}) => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);
  return (
    <dialog className={`modal ${toggleModal?.isOpen && (toggleModal?.modal === modal) ? 'modal-open' : ''}`}>
      <div className={`modal-box bg-white ${size === 'fullscreen' ? 'max-w-screen-2xl' : size}`}>
        <div className='flex w-full justify-between items-center'>
        <p className='text-lg font-bold flex items-center gap-2'>{iconTitle} {title}&nbsp;</p>
        {subTitle !== '' && (
          <div className='mr-10'>Status Billing : {subTitle}</div>
        )}
        </div>
        <hr className='my-3' />
        <div className={`${scroll ? 'overflow-y-auto max-h-96' : ''} p-3`}>
          {children}
        </div>
        <hr className='my-3' />
        <div className="modal-action">
          <form method="dialog" onSubmit={() => dispatch(setToggleModal({ isOpen: false, modal: toggleModal?.modal === 'documentDeliveryDetail' ? 'documentDeliveryDetail' : (toggleModal?.modal === 'keterlambatanInvoice' ? 'keterlambatanInvoice' : ((toggleModal?.modal === 'previewTransaction' ? 'previewTransaction' : ''))), dataX: [] }))}>
            {closeToggle && (
              <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5">✕</button>
            )}
            {/* if there is a button, it will close the modal */}
            {buttonFooter}
            {/* <button className="btn ml-3">check</button> */}
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default Modal