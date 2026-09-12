import Select from "react-select";
import React, { useEffect, useState } from 'react'
import { Modal } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux';
import BgModal from 'assets/BgModal.svg';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
import { DateRange } from "react-date-range";

const ModalTaskEdit = ({ getListTask, detailTask, search }) => {
  const dispatch = useDispatch();
  const { toggleModal, setToggleModal } = useSelector(state => state.global);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [options, setOptions] = useState([
    // { value: "11942357", label: "Adi Nugroho" },
    // { value: "11922514", label: "Andri Noviandy" },
  ]);

  const getListAssign = async () => {
    const res = await storeSchema.actions.getListKaryawan({});
    const dataList = res?.data?.list_data?.filter((item) => item.AKTIF === 'Y')?.map((data, index) => {
      return ({
        value: data.NIK,
        label: data.NAMA
      });
    });

    setOptions(dataList);
  }

  useEffect(() => {
    const res = detailTask?.assigned_to?.map((a) => {
      return {
        value: a.nik,
        label: a.nama
      }
    })
    // console.log("RESS",res)
    setSelectedOptions(res)
    setData()
  }, []);

  useEffect(() => {
    if (toggleModal?.isOpen === true && toggleModal?.modal === 'edittask') {
      getListAssign();
    }
  }, [toggleModal])

  const dummy = {
    project_id: "",
    assign_to: "",
    title_task: "",
    task_detail: "",
    start_date: "",
    end_date: "",
    task_category: ""
  }

  const [data, setData] = useState(dummy);

  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      let getListAssign = []
      if (selectedOptions?.length) {
        const assignList = selectedOptions?.map((a) => {
          getListAssign.push(a?.value);
          return 1;
        })
      }
      // console.log("GET", DateRange)
      // console.log("GETLIST",getListAssign)
      if (getListAssign?.length || data?.title_task || data?.task_detail) {
        swal.loading();
        const payload = {
          // project_id: "",
          assign_to: getListAssign,
          title_task: data?.title_task,
          task_detail: data?.task_detail,
          // start_date: toggleModal.start,
          // end_date: toggleModal.end,
          task_category: data?.task_category
        }
        const res = await storeSchema.actions.updateTask({ task_id: detailTask?.task_id, payload })
        if (res?.status === true) {
          swal.success('Berhasil Tersimpan !');
          getListTask()
          setData({
            project_id: "",
            assign_to: "",
            title_task: "",
            task_detail: "",
            start_date: "",
            end_date: "",
            task_category: ""
          })
          setSelectedOptions([]);
          dispatch(setToggleModal({ isOpen: false, modal: "edittask", start: "", end: "" }));
        } else {
          swal.error(res?.message);
        };
      } else {
        swal.warning('Tolong Lengkapi Pengisian Data !')
      }
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <Modal
      title="Edit Task / Agenda"
      modal={"edittask"}
      size={"w-11/12 max-w-3xl"}
      // size={"w-11/12 max-w-5xl"}
      buttonFooter={
        <button className='btn btn-primary rounded-full' onClick={() => handleSubmit()}>Submit</button>
      }
    >
      <div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Category</label>
          <select className='w-full select select-sm bg-white select-bordered' required name='task_category' onChange={(e) => handleChange(e)} value={data?.task_category || detailTask?.task_category}>
            <option value="">...</option>
            <option value={"Task"}>Task</option>
            <option value={"Agenda"}>Agenda</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Title Task</label>
          <input className='w-full input input-sm input-bordered bg-white' required name='title_task' onChange={(e) => handleChange(e)} value={data?.title_task || detailTask?.title_task} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea className='textarea w-full textarea-bordered bg-white' name='task_detail' required onChange={(e) => handleChange(e)} value={data?.task_detail || detailTask?.task_detail}></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Assign To</label>
          {/* <select className='w-full select select-sm select-bordered bg-white' name='assign_to' required onChange={(e) => handleChange(e)}>
            <option>.....</option>
            <option value={"11942357"}>Adi Nugroho</option>
            <option value={"11922514"}>Andri Noviandy</option>
          </select> */}
          <Select
            options={options}
            isMulti
            value={selectedOptions}
            onChange={setSelectedOptions}
          />
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

export default ModalTaskEdit