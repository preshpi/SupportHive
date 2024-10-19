
import Charity from '../../assets/charity (2).svg'
import Community from '../../assets/community (2).svg'
import Academic from '../../assets/academic.svg'
import Disaster from '../../assets/disaster.svg'
import Legal from '../../assets/legal.svg'
import Medical from '../../assets/medical.svg'

const Mobilize = () => {
  return (
    <div>
        <div>
            <h1 className='font-extrabold text-4xl ml-9 mb-9'>Mobilize <span className='text-[#28A745]'>Resources</span> for</h1>
        </div>
        <div  className='flex justify-center items-center flex-wrap gap-5 p-3 mb-16 '>
            <div className='group transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg'>
            <img src={Charity} alt="" />
            </div>

            <div className='group transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg'>
            <img src={Community} alt="" />
            </div>

            <div className='group transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg'>
            <img src={Academic} alt="" />
            </div>

            <div className='group transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg'>
            <img src={Disaster} alt="" />
            </div>

            <div className='group transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg'>
            <img src={Legal} alt="" />
            </div>

            <div className='group transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg'>
            <img src={Medical} alt="" />
            </div>
            </div>
    </div>
  );
};

export default Mobilize