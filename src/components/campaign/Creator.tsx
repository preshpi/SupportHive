import React from 'react';
import Location from '../../assets/Location.svg';
import Category from '../../assets/Category.svg';
import Time from '../../assets/Time Circle.svg';
import Naira from '../../assets/tabler_currency-naira.svg';
import People from '../../assets/Profile.svg';
import Email from '../../assets/Envelope.svg';
import Call from '../../assets/Call.svg';
import Delete from '../../assets/Delete.svg';
import One from '../../assets/student 1.svg';
import Two from '../../assets/student 2.svg';
import Three from '../../assets/student 3.svg';
import Four from '../../assets/student4.svg';

const Creator = () => {
  return (
    <div>
      <div>
        <h1 className='mt-5 font-extrabold text-2xl'>Sponsor a Child Today: Help Build a Brighter Future</h1>
        <div className='flex gap-6 mt-3 text-[#555657] flex-wrap'>
          <div className='flex gap-2'>
            <img src={Location} alt="" />
            <p>Lagos, Nigeria</p>
          </div>

          <div className='flex gap-2'>
            <img src={Category} alt="" />
            <p>Education</p>
          </div>

          <div className='flex gap-2'>
            <img src={Time} alt="" />
            <p>2 days left</p>
          </div>
        </div>
        <p className='mt-2 '>Many primary school children in underserved communities struggle to afford school fees, uniforms, and learning materials. This campaign raises funds to sponsor their education. Your donation will provide school fees, textbooks, uniforms, and essential supplies, ensuring these children get the education they deserve.

          Every contribution brings them one step closer to a brighter future. No amount is too small to make a difference. Join us in empowering the next generation to learn, grow, and succeed.

          Sponsor a child today—because every child deserves the chance to learn.</p>
      </div>

      <div>
        <h1 className='mt-5 font-bold text-xl'>Campaign Information</h1>
        <div className='flex gap-5 flex-wrap'>
          <div className='flex items-center'>
            <h1>Funding Goal:</h1>
            <img src={Naira} alt="" />
            <h1>5,000,000</h1>
          </div>

          <div className='flex items-center flex-wrap'>
            <h1>Amount Raised:</h1>
            <img src={Naira} alt="" />
            <h1>3,000,000 </h1>
            <div className="w-60 bg-gray-200 rounded-full h-[15px] my-2">
              <div className="bg-[#28A745] h-full rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className='mt-2 font-bold text-xl'>Impact of the Campaign</h1>
        <p className='mt-3 mb-2'>The impact this campaign will have is transformative. By sponsoring a child's education, you are giving them the opportunity to break free from the cycle of poverty. Here's how your support will make a difference:
        </p>
        <p>1. Access to Education: Your contributions will ensure that children can attend school by covering their fees, uniforms, and materials.
        </p>
        <p>2. Improved Future Prospects: Education empowers children with the skills and knowledge they need to pursue better job opportunities and contribute meaningfully to their communities.</p>
        <p>3. Confidence and Hope: When children know they have support, it boosts their self-esteem, motivating them to work harder and dream bigger.
        </p>
        <p className='mt-2 mb-5'>Your donation doesn’t just help a child go to school—it provides hope, opportunity, and the tools for a brighter future. Together, we can empower the next generation to grow, thrive, and succeed.</p>
      </div>

      <div>
        <h1 className='mt-2 font-bold text-xl mb-4'>Contact Information</h1>
        <div className='flex gap-14 flex-wrap'>
          <div className='flex gap-2'>
            <img src={People} alt="" />
            <h1>Creator Name</h1>
          </div>

          <div className='flex gap-2'>
            <img src={Email} alt="" />
            <h1>Creator Name</h1>
          </div>

          <div className='flex gap-2'>
            <img src={Call} alt="" />
            <h1>Creator Name</h1>
          </div>
        </div>
        <div className='flex gap-8 mt-2 flex-wrap'>
          <h1>Ruth Oluwasanni</h1>
          <h1>rutholusanni@gmail.com</h1>
          <h1>+234(0)910877896</h1>
        </div>
      </div>

      <div className='flex  mt-7  flex-wrap'>
        <div className=' flex  gap-2 py-2 px-10 border-2 border-[#CA200D] mb-24 hover:bg-[#CA200D] flex-wrap'>
          <a href="" className='text-[#CA200D] hover:text-[#ffff]'>Delete Campaign</a>
          <img src={Delete} alt="" />
        </div>
      </div>

      <div className='mb-10'>
        <h1 className='text-center font-bold text-2xl'>GALLERY</h1>
        <div className='flex flex-wrap '>
          <img src={One} alt="" />
          <img src={Two} alt="" />
          <img src={Three} alt="" />
          <img src={Four} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Creator;