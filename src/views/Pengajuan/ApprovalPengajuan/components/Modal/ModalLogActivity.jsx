import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToggleModalLog } from '../../../../../redux/n2n/global';
import { ReactComponent as BgModal } from 'assets/BgModal2.svg';
import { ReactComponent as User } from 'assets/modal/user.svg';
import { ReactComponent as Cogs } from 'assets/modal/cogs.svg';
import { ReactComponent as Estimasi } from 'assets/modal/estimasi.svg';
import { ReactComponent as Category } from 'assets/modal/category.svg';
import { ReactComponent as Area } from 'assets/modal/area.svg';
import { ReactComponent as Status } from 'assets/modal/status.svg';
import { FaCircle } from "react-icons/fa";
import { IoChevronDownCircle, IoChevronUpCircle } from "react-icons/io5";

const ModalLog = ({ toggleModal, location }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [ collapse, setCollapse ]  = useState(false);

  return (
    <dialog className={`modal ${toggleModal ? 'modal-open' : ''}`}>
      <div className="modal-box w-7/12 max-w-5xl">
        <p className='text-lg font-bold'>Log Activity</p>
        <hr className='my-3' />
        <div className='relative'>
          <BgModal width={'-webkit-fill-available'}/>
          <div className='absolute top-3 left-5 border-l-2 pl-5'>
            <h3 className="font-bold text-lg text-white">E-Payment Software</h3>
            <div className='flex gap-3 text-white justify-space-between items-center'>
              <p className="text-sm">test</p>
              <span className="">|</span>
              <p className="text-sm">test</p>
              <span className="">|</span>
              <p className="text-sm">test</p>
            </div>
          </div>

          {/* Status Identified */}
          <div className="flex mt-3 gap-3 items-center">
            {
              collapse ? 
              <FaCircle color="#0F9B71"  size={12.5}/> :
              <FaCircle color="#D9D9D9" size={12.5}/> 
            }
            <p className="text-xs">Status - Identified</p>
            <span className="text-base font-thin">|</span>
            <p className="text-xs font-thin">12:11 PM, 24 Jan 2023</p>

            {!collapse ? 
              <IoChevronDownCircle size={25} color="#387FFB" onClick={() => setCollapse(!collapse)}/> 
              : 
              <IoChevronUpCircle size={25} color="#387FFB" onClick={() => setCollapse(!collapse)}/>}
          </div>
          <div className="border-l-2 ml-1 pl-3 py-3 min-h-3">
            {
              collapse ?
                <div className="w-full bg-[#F8F9FD] rounded-md p-3">
                  <div className="flex flex-wrap mb-10">
                    <div className="flex mr-28">
                      <User />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Nama Customer</p>
                        <p className="text-xs">PT. Prima Pengembang Kawasan</p>
                      </div>
                    </div>

                    <div className="flex mr-28">
                      <Cogs />
                      <div className="ml-2">
                        <p className="text-xs font-bold">COGS Sementara</p>
                        <p className="text-xs">Rp. 500.000.000</p>
                      </div>
                    </div>

                    <div className="flex">
                      <Estimasi />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Estimasi Nilai Penarawan</p>
                        <p className="text-xs">Rp. 500.000.000</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="flex mr-60">
                      <Category />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Category</p>
                        <p className="text-xs">Sustain</p>
                      </div>
                    </div>

                    <div className="flex mr-44">
                      <Area />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Area</p>
                        <p className="text-xs">Jakarta</p>
                      </div>
                    </div>

                    <div className="flex">
                      <Status />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Status Project</p>
                        <p className="text-xs">Identified</p>
                      </div>
                    </div>
                  </div>
                </div> :
                <></>
            }
          </div>

          {/* Status Qualified */}
          <div className="flex gap-3 items-center">
            {
              // collapse ? 
              // <FaCircle color="#0F9B71"  size={12.5}/> :
              <FaCircle color="#D9D9D9" size={12.5}/> 
            }
            <p className="text-xs">Status - Qualified</p>
            {/* <span className="text-base font-thin">|</span>
            <p className="text-xs font-thin">12:11 PM, 24 Jan 2023</p> */}

            {/* {!collapse ? 
              <IoChevronDownCircle size={25} color="#387FFB" onClick={() => setCollapse(!collapse)}/> 
              : 
              <IoChevronUpCircle size={25} color="#387FFB" onClick={() => setCollapse(!collapse)}/>} */}
          </div>
          <div className="border-l-2 ml-1 pl-3 py-3 min-h-3">
            {/* {
              collapse ?
                <div className="w-full bg-[#F8F9FD] rounded-md p-3">
                  <div className="flex flex-wrap mb-10">
                    <div className="flex mr-28">
                      <User />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Nama Customer</p>
                        <p className="text-xs">PT. Prima Pengembang Kawasan</p>
                      </div>
                    </div>

                    <div className="flex mr-28">
                      <Cogs />
                      <div className="ml-2">
                        <p className="text-xs font-bold">COGS Sementara</p>
                        <p className="text-xs">Rp. 500.000.000</p>
                      </div>
                    </div>

                    <div className="flex">
                      <Estimasi />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Estimasi Nilai Penarawan</p>
                        <p className="text-xs">Rp. 500.000.000</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="flex mr-60">
                      <Category />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Category</p>
                        <p className="text-xs">Sustain</p>
                      </div>
                    </div>

                    <div className="flex mr-44">
                      <Area />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Area</p>
                        <p className="text-xs">Jakarta</p>
                      </div>
                    </div>

                    <div className="flex">
                      <Status />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Status Project</p>
                        <p className="text-xs">Identified</p>
                      </div>
                    </div>
                  </div>
                </div> :
                <></>
            } */}
          </div>

          {/* Status Proposal */}
          <div className="flex gap-3 items-center">
            {
              // collapse ? 
              // <FaCircle color="#0F9B71"  size={12.5}/> :
              <FaCircle color="#D9D9D9" size={12.5}/> 
            }
            <p className="text-xs">Status - Proposal</p>
            {/* <span className="text-base font-thin">|</span>
            <p className="text-xs font-thin">12:11 PM, 24 Jan 2023</p> */}

            {/* {!collapse ? 
              <IoChevronDownCircle size={25} color="#387FFB" onClick={() => setCollapse(!collapse)}/> 
              : 
              <IoChevronUpCircle size={25} color="#387FFB" onClick={() => setCollapse(!collapse)}/>} */}
          </div>
          <div className="border-l-2 ml-1 pl-3 py-3 min-h-3">
            {/* {
              collapse ?
                <div className="w-full bg-[#F8F9FD] rounded-md p-3">
                  <div className="flex flex-wrap mb-10">
                    <div className="flex mr-28">
                      <User />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Nama Customer</p>
                        <p className="text-xs">PT. Prima Pengembang Kawasan</p>
                      </div>
                    </div>

                    <div className="flex mr-28">
                      <Cogs />
                      <div className="ml-2">
                        <p className="text-xs font-bold">COGS Sementara</p>
                        <p className="text-xs">Rp. 500.000.000</p>
                      </div>
                    </div>

                    <div className="flex">
                      <Estimasi />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Estimasi Nilai Penarawan</p>
                        <p className="text-xs">Rp. 500.000.000</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="flex mr-60">
                      <Category />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Category</p>
                        <p className="text-xs">Sustain</p>
                      </div>
                    </div>

                    <div className="flex mr-44">
                      <Area />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Area</p>
                        <p className="text-xs">Jakarta</p>
                      </div>
                    </div>

                    <div className="flex">
                      <Status />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Status Project</p>
                        <p className="text-xs">Identified</p>
                      </div>
                    </div>
                  </div>
                </div> :
                <></>
            } */}
          </div>

          {/* Status Won */}
          <div className="flex gap-3 items-center">
            {
              // collapse ? 
              // <FaCircle color="#0F9B71"  size={12.5}/> :
              <FaCircle color="#D9D9D9" size={12.5}/> 
            }
            <p className="text-xs">Status - Won</p>
            {/* <span className="text-base font-thin">|</span>
            <p className="text-xs font-thin">12:11 PM, 24 Jan 2023</p> */}

            {/* {!collapse ? 
              <IoChevronDownCircle size={25} color="#387FFB" onClick={() => setCollapse(!collapse)}/> 
              : 
              <IoChevronUpCircle size={25} color="#387FFB" onClick={() => setCollapse(!collapse)}/>} */}
          </div>
          {/* <div className="border-l-2 ml-1 pl-3 py-3 min-h-3">
            {
              collapse ?
                <div className="w-full bg-[#F8F9FD] rounded-md p-3">
                  <div className="flex flex-wrap mb-10">
                    <div className="flex mr-28">
                      <User />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Nama Customer</p>
                        <p className="text-xs">PT. Prima Pengembang Kawasan</p>
                      </div>
                    </div>

                    <div className="flex mr-28">
                      <Cogs />
                      <div className="ml-2">
                        <p className="text-xs font-bold">COGS Sementara</p>
                        <p className="text-xs">Rp. 500.000.000</p>
                      </div>
                    </div>

                    <div className="flex">
                      <Estimasi />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Estimasi Nilai Penarawan</p>
                        <p className="text-xs">Rp. 500.000.000</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="flex mr-60">
                      <Category />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Category</p>
                        <p className="text-xs">Sustain</p>
                      </div>
                    </div>

                    <div className="flex mr-44">
                      <Area />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Area</p>
                        <p className="text-xs">Jakarta</p>
                      </div>
                    </div>

                    <div className="flex">
                      <Status />
                      <div className="ml-2">
                        <p className="text-xs font-bold">Status Project</p>
                        <p className="text-xs">Identified</p>
                      </div>
                    </div>
                  </div>
                </div> :
                <></>
            }
          </div> */}

        </div>
        <div className="modal-action">
          <form
            method="dialog"
            onSubmit={() => {
              dispatch(setToggleModalLog(!toggleModal))
              navigation('/list-project', { state: location?.state?.menu })
            }}
          >
            {/* if there is a button, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5">✕</button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ModalLog