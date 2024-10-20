import Icon from '../../assets/campaign icon.svg'

const Campaigns =() =>{
  return (
    <div>
      <div className='flex justify-center items-center flex-col mt-52'>
    <h1 className='font-bold text-2xl mb-2'>Let’s get your story started</h1>
    <p className='text-center'>You do not have any active campaign. Click the <br /><span>button below to create one.</span></p>
    <div className='flex gap-5 bg-[#28A745] px-7 py-3 text-[#ffff] mt-5 border-2 border-[#28A745] rounded-xl hover:bg-[#ffff] hover:text-[#28A745]'>
      <a href="">Create Campaign</a>
      <img src={Icon} alt="" />
    </div>
   </div>
    </div>
  )
}

export default Campaigns