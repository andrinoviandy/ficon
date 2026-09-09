import React from 'react'
import { IoIosConstruct } from "react-icons/io";

const UnderConstruction = () => {
  return (
    <div className='flex h-full justify-center items-center'>
      <div className='flex flex-col justify-center items-center border-primary border-4 rounded-[25px] p-5 gap-5 shadow-2xl'>
        <p className='text-5xl text-primary font-semibold'>This Page is</p>
        <IoIosConstruct className='text-5xl text-primary font-semibold' />
        <p className='text-5xl text-primary font-semibold'>Under Construction</p>
      </div>
    </div>
  )
}

export default UnderConstruction