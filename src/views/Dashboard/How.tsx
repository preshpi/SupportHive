import React from 'react'
import People from '../../assets/people icon.svg'
import Fund from '../../assets/fund icon.svg'
import Message from '../../assets/message icon.svg'

const How = () => {
  return (
    <div>
     <div>
        <h1 className='font-extrabold text-5xl ml-9 mb-9'>How it <span className='text-[#28A745]'>works</span></h1>
         </div>
         <div className='flex justify-center items-center gap-14 mb-10 flex-wrap'>
         <div className='rounded-md border-[#28A745] bg-[#97d69979]  text-[#000000] p-3 group transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg'>
          <img src={People} alt="" className='mb-3' />
          <h1 className='text-black font-extrabold text-2xl mb-3'>Create your campaign </h1>
          <p>Tell your story, set your goal, and  download <br />our app to get started</p>
         </div>

         <div className='rounded-md border-[#28A745] bg-[#97d69979]  text-[#000000] p-5 group transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg'>
          <img src={Fund} alt="" className='mb-3' />
          <h1 className='text-black font-extrabold text-2xl mb-3'>Receive funding </h1>
          <p>Share your campaign and get funded by your <br />friends and family</p>
         </div>

         <div className='rounded-md border-[#28A745] bg-[#97d69979]  text-[#000000] p-3 group transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg'>
          <img src={Message} alt=""  className='mb-3'/>
          <h1 className='text-black font-extrabold text-2xl mb-3'>Get started </h1>
          <p>SupportHive helps you along the way, so you  <br />can focus on making great things</p>
         </div>
         </div>
    </div>
  )
}

export default How