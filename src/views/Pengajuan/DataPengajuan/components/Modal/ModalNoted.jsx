import { Modal } from "components/atoms";
import { formatDateUS } from "global/helper/formatDate";
import { swal } from "global/helper/swal";
import storeSchema from "global/store";
import React, { useEffect, useState } from "react";
import { IoCalendarOutline, IoCheckboxOutline, IoPerson } from "react-icons/io5";
import { useSelector } from "react-redux";
import no_data from 'assets/no_data.png';

const ModalNoted = () => {
  const { toggleModal } = useSelector((state) => state.global)


  const [remark, setRemark] = useState('');
  const [listRemarks, setListRemarks] = useState([]);

  useEffect(() => {
    if (toggleModal?.selectedData && toggleModal?.selectedData.length > 0) {
      getListRemarks(toggleModal?.selectedData[0]?.PROJECT_ID)
    }
  }, [toggleModal])
  

  const getListRemarks = async (data) => {
    try {
      const res = await storeSchema.actions.getListRemarks(data)
      if (res?.status) {
        setListRemarks(res?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddRemark = async () => {
    try {
      // if (remark.length > 75) {
      //   swal.error('Remark Tidak Dapat Melebihi 75 Karakter !')
      // } else {
        swal.loading()
        const payload = {
          project_id: toggleModal?.selectedData[0]?.PROJECT_ID,
          desc_remark: remark
        }

        const pay = {
          category: 1,
          channel: 1,
          nip_tujuan: [`${toggleModal?.selectedData[0]?.NIP_SALES}`],
          title: "Could you give me an update on this project? (" + toggleModal?.selectedData[0]?.PROJECT_NO + ")",
          body: remark,
          project_id: toggleModal?.selectedData[0]?.PROJECT_ID,
          link: "",
          navigate_to: "/project-profile"
        }
        
        const res = await storeSchema.actions.insertRemark(payload)
        if (res?.status === true) {
          setRemark('');
          await swal.success(res?.message);
          await storeSchema.actions.insertNotification(pay);
          getListRemarks(toggleModal?.selectedData[0]?.PROJECT_ID);

        } else {
          swal.error(res?.message);
        }
      // }
    } catch (error) {
      swal.error(error);
    }
  }
  
  return (
    <Modal
      title={"Noted / Remark"}
      modal={"modalNoted"}
      size={"w-11/12 max-w-3xl"}
      buttonFooter={null}
    >
      <div>
        <div className='card border-2 my-7'>
            <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Remark</div>
            <div className='card-body'>
              <div className='flex flex-col md:flex-row lg:flex-row gap-2'>
                <div className='flex flex-col gap-2 w-full md:w-1/2 lg:w-1/2'>
                  <div className='w-full bg-gradient-to-r from-primary to-white text-white font-semibold px-3 py-1 rounded-lg text-sm'>Add Remark</div>
                  <textarea className="textarea textarea-bordered bg-white h-[100%]" onChange={(e) => setRemark(e.target.value)} value={remark}></textarea>
                  <div type="button" className='btn btn-sm rounded-[25px] border-none bg-blue-50 text-primary' onClick={() => handleAddRemark()}>
                    <IoCheckboxOutline size='20px' /> Save Remark
                  </div>
                </div>
                <div className='flex flex-col gap-2 w-full md:w-1/2 lg:w-1/2 overflow-auto'>
                  <div className='w-full bg-gradient-to-r from-white to-primary text-white text-end font-semibold px-3 py-1 rounded-lg text-sm'>History Remark</div>
                  <div className='overflow-auto h-[200px] border-2 rounded-lg'>
                    <div className='flex justify-center w-full'>
                      <ul className="steps steps-vertical gap-3">
                        {listRemarks && listRemarks.length > 0 && listRemarks?.map((v, i) => (
                          <li data-content="" className="step" key={i}>
                            <div className='flex flex-col gap-0 text-start rounded-[10px]'>
                              <div className='gap-0'>
                                <div className='text-xs'><strong>{v?.DESC_REMARK}</strong></div>
                              </div>
                              <div className='text-xs font-bold text-gray-500 gap-2 flex flex-row items-center'><IoPerson /> {v?.CREATED_BY}</div>
                              <div className='text-xs font-bold text-gray-500 gap-2 flex flex-row items-center'><IoCalendarOutline /> {formatDateUS(v?.CREATED_DATE)}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      {listRemarks.length === 0 && (
                        <div className='flex justify-center'>
                          <img src={no_data} width={"50%"} className='items-center' />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div >
          </div >
      </div>
    </Modal>
  )
}

export default ModalNoted