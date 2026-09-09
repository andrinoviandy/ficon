import React, { useEffect, useState } from 'react'
import storeSchema from 'global/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { swal } from 'global/helper/swal';
import { FaArrowLeft } from 'react-icons/fa6';
import EditPeopleAssignment from './Form/EditPeopleAssignment';
// import EditCostRealizationOperational from './Form/EditCostRealizationOperational';
// import EditCostRealizationVendor from './Form/EditCostRealizationVendor';
// import TabDokumen from 'views/Project/ListProject/components/TabDokumen';

const AddEditPeopleAssignment = ({setListNotif}) => {
  const location = useLocation();
  const navigation = useNavigate();
  const { project, menu, data } = location?.state;
  const [dataDetail, setDataDetail] = useState({});
  const [dataCBB, setDataCBB] = useState({});

  const getDetailProject = async () => {
    swal.loading();
    try {
      const res = 
    //   project === "Edit People Assignment" ? 
      await storeSchema.actions.getDetailCostPersonil(data?.project_id) 
            // : project === "Edit Cost Operational" 
        // ? await storeSchema.actions.getDetailCostOperational(data?.project_id) : 
            // await storeSchema.actions.getDetailVendorProjectBilling(data?.billing_id);
      if (res?.status === true) {
        setDataDetail(res?.data);
        swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  const getCBBPlanning = async () => {
    swal.loading();
    try {
      const res = await storeSchema.actions.getCBBPlanning(data?.project_id);
      if (res?.status === true) {
        setDataCBB(res?.data);
        swal.close();
      } else {
        swal.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    // if (project === "Edit Cost Personil" || project === "Edit Cost Operational" || project === "Edit Vendor Project Billing" || project === "View Vendor Project Billing") {
      getDetailProject();
      getCBBPlanning();
    // };
    // eslint-disable-next-line
  }, [project,menu]);

  return (
    <>
      <div className='bg-white px-6 pt-10 h-full   overflow-hidden'>
        <div className='flex gap-5 items-center mb-5'>
          <div className='flex items-center gap-4'>
            <FaArrowLeft className='cursor-pointer' onClick={() => navigation("/people-assignment", { state: { menu } })} />
            <p className='text-lg font-bold'>{project}</p>
          </div>
        </div>
        {/* FORM */}
        <EditPeopleAssignment 
            dataDetail={dataDetail} 
            getDetailProject={getDetailProject} 
            getCBBPlanning={getCBBPlanning} 
            setListNotif={setListNotif}
            dataCBB={dataCBB}
        />
        <div className='mb-36'></div>
      </div>
    </>
  )
}

export default AddEditPeopleAssignment