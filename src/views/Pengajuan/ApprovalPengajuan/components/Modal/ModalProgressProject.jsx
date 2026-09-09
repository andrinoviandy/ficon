import React, { useState, useEffect, useRef } from 'react'
// import { ReactComponent as BgModal } from 'assets/BgModal.svg';
import { Modal } from 'components/atoms'
import { useDispatch, useSelector } from 'react-redux';
import { IoBusinessOutline, IoCalendarOutline, IoCheckboxOutline, IoCubeOutline, IoDownloadOutline, IoPerson, IoRibbonOutline, IoRibbonSharp, IoTodayOutline } from 'react-icons/io5';
import { CgNotes } from "react-icons/cg";
import BgModal from 'assets/BgModal.svg';
import storeSchema from 'global/store';
import { swal } from 'global/helper/swal';
import { setToggleModal } from '../../../../../redux/n2n/global';

const ModalProgressProject = (onClick) => {
  const dispatch = useDispatch();
  const { toggleModal } = useSelector(state => state.global);
  const [optJenisDok, setOptJenisDok] = useState([])
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [dataProgress, setDataProgress] = useState({});
  const [data, setData] = useState([]);

  const handleRefesh = async () => {
    swal.loading()
    const res = await storeSchema.actions.getLogActivity(toggleModal?.dataX?.PROJECT_ID);
    if (res?.status) {
      swal.close();
      dispatch(setToggleModal({ isOpen: true, modal: "logActivity", dataX: res?.data }));
    } else {
      swal.error(res?.message);
    }
  }

  const handleChange = (e) => {
    setDataProgress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeDoc = (e) => {
    const maxFileSize = 25 * 1024 * 1024; // 25MB dalam byte

    if (e.target.files) {
      const file = e.target.files[0];
      if (file.size > maxFileSize) {
        swal.custom("File Terlalu Besar", "Ukuran file tidak boleh lebih dari 25 MB", "warning");
        setFile(null);
        fileInputRef.current.value = null;
      } else {
        setFile(file);
      }
    } else {
      setFile(null);
    }
  };

  const getDetailProgress = async () => {
    try {
      const res = await storeSchema.actions.getListProgressProject(toggleModal?.dataSelect?.PROJECT_ID)
      if (res?.status) {
        setData(res?.data)
      } else {
        setData([])
      }
    } catch (error) {
      console.log(error);

    }
  }

  const handleSubmit = async (e, i) => {
    e.preventDefault();
    try {
      swal.loading();
      const value = dataProgress;
      const payload = {
        project_id: toggleModal?.dataSelect?.PROJECT_ID,
        status_progress_id: dataProgress?.status_progress,
        percentage: dataProgress?.percentage,
        remark: dataProgress?.remark
      };

      const formData = new FormData();
      formData.append("payload", JSON.stringify(payload));
      formData.append("lampiran", file);

      const res = await storeSchema.actions.insertProgressProject(formData);
      if (res?.status === true) {
        setDataProgress({})
        setFile(null)
        fileInputRef.current.value = null
        await swal.success('Berhasil Disimpan !');
      } else {
        await swal.custom('Tidak Dapat Disimpan !', res?.message, 'error');
      };
      getDetailProgress();
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    const getOptJenisDok = async () => {
      try {
        const res = await storeSchema.actions.getReferensiByJenis("status_progres_project");
        if (res?.status === true) {
          const option = res?.data?.map((item) => {
            return {
              label: item?.ur_ref,
              value: item?.kd_ref,
              data: item,
            }
          })
          setOptJenisDok(option);
        } else {
          setOptJenisDok([]);
        };
      } catch (error) {
        console.error(error);
      };
    };
    getOptJenisDok();
  }, [])

  useEffect(() => {
    if (toggleModal?.dataSelect?.PROJECT_ID) getDetailProgress();
  }, [toggleModal])

  return (
    <Modal
      title="Progress Project"
      modal={"progressProject"}
      // size={"w-11/12 max-w-3xl"}
      size={"w-12/12 max-w-6xl"}
      buttonFooter={null}
    >
      <div>
        <div className='flex flex-row gap-5 p-4 rounded-[20px] items-center justify-between text-white mb-4' style={modalStyle}>
          <div className='ml-2'>
            <div className='flex flex-col gap-3'>
              <div className='font-bold'>
                {toggleModal?.dataSelect?.PROJECT_NAME}
              </div>
              <div className="flex flex-wrap gap-10 text-sm items-center">
                <div className="flex flex-row gap-1 items-center"><IoRibbonOutline /> {toggleModal?.dataSelect?.PROJECT_NO}</div>
                {/* <div className='divider divider-horizontal'></div> */}
                <div className="flex flex-row gap-1 items-center"><IoCubeOutline /> {toggleModal?.dataSelect?.PORTOFOLIO_UR}</div>
                {/* <div className='divider divider-horizontal'></div> */}
                <div className="flex flex-row gap-1 items-center"><IoTodayOutline /> {toggleModal?.dataSelect?.PROJECT_TYPE_UR}</div>
              </div>
            </div>
          </div>
          <div className='text-5xl font-bold'>
            {data[0]?.PERCENTAGE}%
          </div>
        </div>
        <div className=''>
          <div className='flex flex-col md:flex-row lg:flex-row gap-2'>
            <div className='flex flex-col gap-2 w-full md:w-[65%] lg:w-[65%]'>
              <div className='w-full bg-gradient-to-r from-primary to-white text-white font-semibold px-3 py-1 rounded-lg'>Add Progress</div>
              <div className='flex flex-col gap-3 border-2 p-3 rounded-lg h-[100%]'>
                <div className='flex flex-row justify-between gap-4'>
                  <div className='flex flex-row gap-2 items-center'>
                    <div>Progress : </div>
                    <div>
                      <input type='number' className='input input-sm input-bordered bg-white w-[70px]' name='percentage' value={dataProgress?.percentage || ""} onChange={(e) => handleChange(e)} />
                    </div>
                    <div>
                      %
                    </div>
                    {/* <input type="range" min={0} max="100" value="70" className="range range-primary range-xl" /> */}
                  </div>
                  <div className='flex flex-row gap-2 items-center'>
                    <div>Status : </div>
                    <div>
                      <select
                        name={"status_progress"}
                        className={`select select-sm w-full input-bordered rounded-[25px]  disabled:bg-neutral-300 disabled:text-gray-500 ${dataProgress?.status_progress && dataProgress?.status_progress === '1' ? 'bg-green-300' : dataProgress?.status_progress === '2' ? 'bg-red-300' : dataProgress?.status_progress === '3' ? 'bg-yellow-300' : ''}`}
                        onChange={(e) => handleChange(e)}
                        value={dataProgress?.status_progress || ""}
                      >
                        <option key={0} value="" disabled></option>
                        {optJenisDok?.map((data, i) => {
                          return (
                            <option key={i} value={data?.value}>{data?.label}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className='input-group flex-col flex'>
                  <label>Remark :</label>
                  <input type='text' className='input input-sm input-bordered bg-white w-full' name='remark' value={dataProgress?.remark || ""} onChange={(e) => handleChange(e)} />
                </div>
                <div className='input-group flex items-center gap-4'>
                  <label>Document Weekly : </label>
                  <input
                    type='file'
                    name='dok_weekly'
                    className='flex-1 file-input file-input-sm file-input-bordered file-input-primary bg-white'
                    onChange={(e) => {
                      handleChangeDoc(e)
                    }}
                    ref={fileInputRef}
                  />
                </div>
                <hr />
                <div type="button" className='btn rounded-[25px] w-[100px] btn-primary' onClick={handleSubmit}>
                  <IoCheckboxOutline size='20px' /> Save
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 w-full md:w-[35%] lg:w-[35%] overflow-auto'>
              <div className='w-full bg-gradient-to-r from-white to-primary text-white text-end font-semibold px-3 py-1 rounded-lg'>History Progress</div>
              <div className='overflow-auto h-[250px] border-2 rounded-lg px-7 pt-5'>
                <div className='flex justify-center w-full'>
                  <div className="w-full flex justify-center items-center">
                    <ul className="steps steps-vertical overflow-y-auto gap-3 w-full">
                      {data && data.length > 0 && data?.map((v, i) => (
                        <li data-content={i === 0 ? "★" : ""} className="step step-primary" key={i}>
                          <div className='flex flex-col gap-1 text-start'>
                            <div className='gap-0'>
                              <div className='text-sm'><strong>{v?.REMARK}</strong></div>
                              <div className='flex flex-row gap-2'>
                              <div className='text-xs flex flex-row gap-1 items-center'><IoCalendarOutline/>{v?.CREATED_AT}</div>
                              <button className='badge text-white badge-sm bg-primary' onClick={() => window.open(v?.DOK_WEEKLY, '_blank')}><IoDownloadOutline/></button>
                              </div>
                            </div>
                            <div className='text-xs font-bold text-gray-500 gap-2 flex flex-row'>
                              <span className={`badge badge-sm ${v?.STATUS_PROGRESS_ID && v?.STATUS_PROGRESS_ID === '1' ? 'bg-green-300' : v?.STATUS_PROGRESS_ID === '2' ? 'bg-red-300' : 'bg-yellow-300'}`}>
                                {v?.STATUS_PROGRESS}
                              </span>
                              <div className='font-semibold'>{v?.CREATED_BY}</div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default ModalProgressProject