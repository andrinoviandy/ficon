import React from 'react'
// import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import { Modal } from 'components/atoms'
import { useSelector } from 'react-redux';
import { IoCalendarOutline, IoPerson } from 'react-icons/io5';
import { CgNotes } from "react-icons/cg";
import BgModal from 'assets/BgModal.svg';

const ModalLogProject = () => {
  const { toggleModal } = useSelector(state => state.global);

  return (
    <Modal
      title="Log Activity"
      modal={"logActivity"}
      size={"w-11/12 max-w-3xl"}
      // size={"w-11/12 max-w-5xl"}
      buttonFooter={null}
    >
      <div className='relative'>
        <div className='flex flex-row p-4 rounded-[20px] text-white gap-5' style={modalStyle}>
          <div className='border-l-2'></div>
          <div className='flex flex-col gap-3'>
            <div className='font-bold'>
              {toggleModal?.dataX?.PROJECT_NAME}
            </div>
            <div className="flex flex-wrap gap-3 text-sm items-center">
              <div>{toggleModal?.dataX?.PROJECT_NO}</div>
              <div>|</div>
              <div>{toggleModal?.dataX?.PORTOFOLIO_UR}</div>
              <div>|</div>
              <div>{toggleModal?.dataX?.NAMA_SALES}</div>
            </div>
          </div>
        </div>
        <div className='overflow-y-auto mt-5 mb-3'>
          {/* <ul className="timeline timeline-vertical lg:timeline-horizontal">
            {toggleModal?.dataX?.LOG_ACTIVITY.length > 0 && toggleModal?.dataX?.LOG_ACTIVITY.map((item, index) => (
              <li>
                {index > 0 && (
                  <hr />
                )}
                <div className="timeline-start mx-8 font-bold text-sm">{item?.STATUS_DATE}</div>
                <div className="timeline-middle">
                  <IoCalendarOutline size={30} />
                </div>
                <div className="timeline-end timeline-box">
                  <div className='flex flex-col gap-1'>
                    <div className='font-bold text-sm'>
                      <div className='flex flex-row items-center gap-1'>
                        <div>
                          <IoPerson />
                        </div>
                        <div>
                          {item?.CREATED_BY !== null ? item?.CREATED_BY || '-' : item?.UPDATED_BY || '-'}
                        </div>
                      </div>
                    </div>
                    <div className='text-sm'>
                      <div className='flex flex-row items-center gap-1'>
                        <div>
                          <CgNotes />
                        </div>
                        <div>
                          {item?.URAIAN_STATUS}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {(toggleModal?.dataX?.LOG_ACTIVITY.length !== (index + 1)) && (
                  <hr />
                )}
              </li>
            ))}
          </ul> */}
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical timeline-col-start">
            {toggleModal?.dataX?.LOG_ACTIVITY?.length > 0 && toggleModal?.dataX?.LOG_ACTIVITY?.map((item, index) => (
              <>
                {(index + 1) % 2 !== 0 ? (
                  <li>
                    <hr className='bg-primary' />
                    <div className="timeline-middle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="text-primary h-5 w-5">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="timeline-start mb-4 md:text-end">
                      <time className="font-mono italic">{item?.STATUS_DATE}</time>
                      <div className="text-lg font-black">Status : {item?.URAIAN_STATUS}</div>
                      {item?.CREATED_BY !== null ? item?.CREATED_BY || '-' : item?.UPDATED_BY || '-'}
                    </div>
                    <hr className='bg-primary' />
                  </li>
                ) : (
                  <li>
                    <hr className='bg-primary' />
                    <div className="timeline-middle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="text-primary h-5 w-5">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="timeline-end mb-4">
                      <time className="font-mono italic">{item?.STATUS_DATE}</time>
                      <div className="text-lg font-black">Status : {item?.URAIAN_STATUS}</div>
                      {item?.CREATED_BY !== null ? item?.CREATED_BY || '-' : item?.UPDATED_BY || '-'}
                    </div>
                    <hr className='bg-primary' />
                  </li>
                )}
              </>
            ))}
          </ul>
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

export default ModalLogProject