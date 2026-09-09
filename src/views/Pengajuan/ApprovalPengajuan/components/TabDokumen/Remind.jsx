import React, { useEffect, useState, useRef } from 'react'
import storeSchema from 'global/store';
import { IoCloseCircleOutline, IoCheckmarkDoneSharp, IoCloseSharp } from 'react-icons/io5';
import { AiOutlineSave } from "react-icons/ai";
import { RxPlusCircled } from "react-icons/rx";
import { swal } from 'global/helper/swal';
import { IoMdTrash } from 'react-icons/io';
import { Label } from 'components/atoms'

const Remind = ({ location, data, getDetailProject, isDetailModalAkselerasi, isVendorRealization, isBillingRealization }) => {
  let sub_pro = isBillingRealization ? location?.state?.sub_project ? true : false : false;
  const fileInputRef = useRef(null);
  const dummyField = {
    remind_id: "",
    remind_type: "",
    limit_time: "",
    limit_unit: "",
    project_id: "",
    project_kategori_id: "",
    subyek: "",
    content: "",
    email_send: "",
    email_send_cc: [],
    flag_send: "",
  };
  const headerTable = ['Limit Time', 'Limit Unit', 'Subjek', 'Konten', 'Penerima', 'CC']
  const [dataFields, setDataFields] = useState(dummyField);
  const [content, setContent] = useState(null);

  // referensi
  const [optJenisDok, setOptJenisDok] = useState([]);

  useEffect(() => {
    const getOptJenisDok = async () => {
      try {
        const res = await storeSchema.actions.getSubReferensiByJenis("tipe_dok", '01');
        if (res?.status === true) {
          const option = res?.data?.map((item) => {
            return {
              label: item?.UR_REF,
              value: item?.KD_REF,
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataFields((prevFields) => ({
      ...prevFields,
      [name]: value,  // Mengupdate field berdasarkan name dari input
    }));

  };

  const deleteCc = (e, i) => {
    e.preventDefault()
    const values = dataFields['email_send_cc'];
    values.splice(i, 1)
    setDataFields((prev) => ({ ...prev, ['email_send_cc']: values }));
  };

  const handleCc = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    if (value.includes(',') || value.includes(' ')) {
      if (value.includes('@')) {
        if (value.split('@')[1].includes('.')) {
          const values = [...dataFields['email_send_cc']];
          values.push(value.replaceAll(',', '').replaceAll(' ', ''))
          setDataFields((prev) => ({ ...prev, ['email_send_cc']: values }));
          e.target.value = null;
        } else {
          swal.error("Email tidak valid")
        }
      } else {
        swal.error("Email tidak valid")
      }
    }
  }

  useEffect(() => {
    const value = data?.REMIND;
    if (data?.REMIND !== null) {
      const newData = {
        remind_id: value?.REMIND_ID || "",
        remind_type: value?.REMINT_TYPE || "",
        limit_time: value?.LIMIT_TIME,
        limit_unit: value?.LIMIT_UNIT,
        project_id: data?.PROJECT_ID,
        project_kategori_id: value?.PROJECT_KATEGORI_ID,
        subyek: value?.SUBYEK,
        content: value?.CONTENT,
        email_send: value?.EMAIL_SEND,
        email_send_cc: value?.EMAIL_SEND_CC !== null ? value?.EMAIL_SEND_CC.split(',') : '',
        flag_send: value?.FLAG_SEND
      }
      setContent(value?.CONTENT)
      setDataFields(newData);
    } else {
      setDataFields(dummyField);
    };
    // eslint-disable-next-line
  }, [data]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const value = dataFields;
      if (value?.email_send.includes('@')) {
        if (value?.email_send.split('@')[1].includes('.')) {
          swal.loading();
          const payload = {
            remind_id: value?.remind_id,
            remind_type: value?.remind_type,
            limit_time: value?.limit_time,
            limit_unit: value?.limit_unit,
            project_id: data?.PROJECT_VENDOR_ID,
            project_kategori_id: data?.PROJECT_KATEGORI_ID,
            subyek: value?.subyek,
            content: content,
            email_send: value?.email_send,
            email_send_cc: value?.email_send_cc.length > 0 ? value?.email_send_cc.join(',') : '',
            flag_send: value?.flag_send,
          }
          const res = await storeSchema.actions.vendorRemind(payload);
          if (res?.status === true) {
            await swal.success('Reminder Berhasil Disimpan');
          } else {
            await swal.custom('Tidak Dapat Disimpan !', res?.message, 'error');
          };
          getDetailProject();
        } else {
          swal.error('Email Penerima Tidak Valid')
        }
      } else {
        swal.error('Email Penerima Tidak Valid')
      }
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <>
      <div className='card border-2 my-5'>
        <div className='absolute left-10 -top-3 px-2 bg-white text-sm font-semibold flex flex-row items-center gap-3'>
          <div>
            Reminder
          </div>
          {data?.REMIND?.FLAG_SEND === 'T' ? (
            <div className='rounded-full bg-green-400 text-white px-2 gap-1 flex flex-row items-center'>
              <IoCheckmarkDoneSharp />
              Sent
            </div>
          ) : (
            <div className='rounded-full bg-red-400 text-white px-2 gap-1 flex flex-row items-center'>
              <IoCloseSharp />
              Has not been sent
            </div>
          )}
        </div>
        <div className='card-body'>
          <div className='flex flex-col gap-2'>
            <div className='sm:flex sm:gap-10'>
              <div className='w-full'>
                <Label
                  label='Limit Time'
                  children={
                    <input
                      type="number"
                      name={"limit_time"}
                      className='input input-md input-bordered rounded-[25px] w-full bg-white'
                      value={dataFields?.limit_time}
                      onChange={(e) => handleChange(e)}
                    />
                  }
                />
              </div>
              <div className='w-full'>
                <Label
                  label='Limit Unit'
                  children={
                    <select
                      name={"limit_unit"}
                      className='select select-md w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                      onChange={(e) => handleChange(e)}
                      value={dataFields?.limit_unit}
                    >
                      <option key={0} value="" disabled></option>
                      <option value={"days"}>Days</option>
                      <option value={"month"}>Month</option>
                      <option value={"year"}>Year</option>
                      {/* {optJenisDok?.map((data, i) => {
                          return (
                            <option key={i} value={data?.value}>{data?.label}</option>
                          )
                        })} */}
                    </select>
                  }
                />
              </div>
            </div>
            {/* <div className='sm:flex sm:gap-10'> */}
            <div className='w-full'>
              <Label
                label='Subjek'
                children={
                  <input
                    type="text"
                    name={"subyek"}
                    className='input input-md input-bordered rounded-[25px] w-full bg-white'
                    value={dataFields['subyek']}
                    onChange={(e) =>
                      handleChange(e)
                    }
                  />
                }
              />
            </div>
            <div className='w-full'>
              <Label
                label='Content'
                children={
                  <textarea
                    className="textarea textarea-bordered w-full bg-white rounded-[25px]"
                    name='content'
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    value={content}
                  />
                }
              />
            </div>
            {/* </div> */}
            <div className='sm:flex sm:gap-10'>
              <div className='w-1/3'>
                <Label
                  label='Penerima'
                  children={
                    <input
                      type="email"
                      name={"email_send"}
                      className='input input-md input-bordered rounded-[25px] w-full bg-white'
                      value={dataFields?.email_send}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    />
                  }
                />
              </div>
              <div className='w-2/3'>
                <Label
                  label='Cc'
                  children={
                    <div className="input-container border border-gray-300 rounded-[25px] p-3 flex flex-wrap gap-2">
                      {dataFields?.email_send_cc?.length > 0 && dataFields?.email_send_cc.map((tag, index) => (
                        <div key={index} className="tag bg-blue-100 rounded-full flex items-center">
                          <div className='m-0 items-center btn-sm btn btn-primary rounded-full cursor-default'>
                            {tag.substring(0, 1).toUpperCase()}
                          </div>
                          <span className='pl-2 py-1'>{tag}</span>
                          <div
                            className="ml-2 text-red-500 cursor-pointer pr-2 py-1"
                            onClick={(e) => deleteCc(e, index)}
                          >
                            <IoCloseCircleOutline size={20} />
                          </div>
                        </div>
                      ))}
                      <input
                        type="text"
                        className="bg-transparent outline-none flex-grow"
                        placeholder="Type and Koma/Spasi"
                        // value={inputValue}
                        // onChange={(e) => setInputValue(e.target.value)}
                        onChange={(e) => handleCc(e)}
                      />
                    </div>
                    // <div className='overflow-auto py-3 min-h-40 border-2 bg-transparent rounded-[25px]'>
                    //   <div className='input bg-transparent'>
                    //     <div className='flex flex-wrap items-center gap-2'>
                    //       {dataFields?.email_send_cc?.length > 0 && dataFields?.email_send_cc.map((dt, i) => (
                    //         <div className='flex flex-row bg-gray-200 gap-2 px-2 items-center rounded-full'>
                    //           <div>
                    //             {dt}
                    //           </div>
                    //           <IoCloseCircleOutline
                    //             size={20}
                    //             className='cursor-pointer'
                    //             onClick={(e) => deleteCc(i)}
                    //           />
                    //         </div>
                    //       ))}
                    //       <input
                    //         type="text"
                    //         className='  border-0'
                    //         onChange={(e) => handleCc(e)}
                    //         placeholder='Masukkan...'
                    //       // value={keyword}
                    //       />
                    //     </div>
                    //   </div>
                    // </div>
                  }
                />
              </div>
            </div>
            <div className='w-full'>
                <Label
                  label='Status'
                  children={
                    <select
                      name={"flag_send"}
                      className='select select-md w-full input-bordered rounded-[25px] bg-white disabled:bg-neutral-300 disabled:text-gray-500'
                      onChange={(e) => handleChange(e)}
                      value={dataFields?.flag_send}
                    >
                      <option value={"T"}>Sudah Terkirim</option>
                      <option value={"F"}>Belum Terkirim</option>
                      {/* {optJenisDok?.map((data, i) => {
                          return (
                            <option key={i} value={data?.value}>{data?.label}</option>
                          )
                        })} */}
                    </select>
                  }
                />
              </div>
          </div>
          <div className='flex justify-end'>
            <button className='btn btn-primary text-white rounded-[25px] px-5 my-5' onClick={handleSave}>
              Save
            </button>
          </div>
        </div >
      </div >
    </>
  )
}

export default Remind