import { Modal } from 'components/atoms';
import { formatCurrency } from 'global/helper/formatCurrency';
import { swal } from 'global/helper/swal';
import storeSchema from 'global/store';
import React, { useEffect, useState } from 'react'
import { HiOutlineEye } from 'react-icons/hi';
import { setToggleModal } from '../../../../../redux/n2n/global';
import { useDispatch, useSelector } from 'react-redux';
import { DetailForm } from '../Form';
import TabDokumen from '.';

const ProjectAkselerasi = ({ data }) => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);

  const dummyField = {
    project_id: "",
    project_no: "",
    project_name: "",
    nilai_penawaran: "",
    portofolio: "",
    customer_name: "",
    area: "",
  };
  const headerTable = ['No Project', 'Nama Project', 'Nilai Kontrak', 'Nama Customer', 'Portofolio'];
  const [dataFields, setDataFields] = useState([dummyField]);

  useEffect(() => {
    const projectAkselerasi = data?.AKSELERASI;
    if (projectAkselerasi?.length > 0) {
      const newData = projectAkselerasi?.map((value) => {
        return {
          project_id: value?.PROJECT_ID,
          project_no: value?.PROJECT_NO,
          project_name: value?.PROJECT_NAME,
          nilai_penawaran: value?.NILAI_PENAWARAN,
          portofolio: value?.PORTOFOLIO,
          customer_name: value?.CUSTOMER_NAME,
          area: value?.NM_AREA,
        }
      })
      setDataFields(newData);
    } else {
      setDataFields([dummyField]);
    };
    // eslint-disable-next-line
  }, [data]);

  const handleView = async (e, project_id) => {
    e.preventDefault();
    swal.loading();
    try {
      const res = await storeSchema.actions.getDetailProject(project_id);
      if (res?.status === true) {
        const dataDetailAkselerasi = res?.data;
        dispatch(setToggleModal({ isOpen: true, modal: "detailProjectAkselerasi", dataDetailAkselerasi }))
        swal.close();
      } else {
        swal.error(res?.message);
      };
      swal.close();
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <>
      <Modal
        title={`Detail Project Akselerasi`}
        modal={"detailProjectAkselerasi"}
        size='fullscreen'
        buttonFooter={
          <>
            <button className='btn rounded-[25px] px-5 ml-3 text-white bg-[#2E66B9]'
              onClick={() => dispatch(setToggleModal({ isOpen: false, modal: "" }))}
            >
              Close
            </button>
          </>
        }
      >
        <DetailForm isDetailModalAkselerasi={true} dataDetail={toggleModal?.dataDetailAkselerasi} />
        <hr className='border-t-2 my-6' />
        <TabDokumen isDetailModalAkselerasi={true} data={toggleModal?.dataDetailAkselerasi} customer={toggleModal?.customer} />
      </Modal>
      <div className='card border-2 my-5'>
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold'>Project Akselerasi</div>
        <div className='card-body'>
          <div className='max-h-64 overflow-auto'>
            <table className='table table-sm table-pin-rows'>
              <thead>
                <tr className='bg-white'>
                  {headerTable?.map((title, i) => {
                    return (
                      <th key={i}>{title}</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {dataFields?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        name="PROJECT_NO"
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.project_no}
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="PROJECT_NAME"
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.project_name}
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="NILAI_PENAWARAN"
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={formatCurrency((item?.nilai_penawaran || 0))}
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="CUSTOMER_NAME"
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.customer_name}
                        disabled
                      />
                    </td>
                    <td className='flex gap-3'>
                      <input
                        type="text"
                        name="PORTOFOLIO"
                        className='input input-sm input-bordered rounded-[25px] w-full bg-white'
                        value={item?.portofolio}
                        disabled
                      />
                      <div className='flex items-center'>
                        <div className='btn btn-sm bg-primary text-white' onClick={(e) => handleView(e, item?.project_id)}>
                          <HiOutlineEye />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div >
      </div >
    </>
  )
}

export default ProjectAkselerasi