"use client";
import Icon from '../../assets/campaign icon.svg';
import AllCampaigns from './AllCampaigns';
import CampaignForm from './Information';
import { useState } from 'react';

const Campaigns = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [campaignCount, setCampaignCount] = useState<number>(1);


  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };


  return (

    <div>
      {
        showForm ? (
          <CampaignForm hideForm={handleHideForm} />
        ) : (
          campaignCount < 1 ? (
            <div className='flex justify-center items-center flex-col mt-52'>
            <h1 className='font-bold text-2xl mb-2'>Let’s get your story started</h1>
            <p className='text-center'>You do not have any active campaign. Click the <br /><span>button below to create one.</span></p>
            <button onClick={handleShowForm} className='flex gap-5 bg-[#28A745] px-7 py-3 text-[#ffff] mt-5 border-2 border-[#28A745] rounded-xl hover:bg-[#ffff] hover:text-[#28A745]'>
              Create Campaign
              <img src={Icon} alt="" />
            </button>
          </div>
          ) : (
            <div><AllCampaigns /></div>
          )
        )
      }
    </div>
  );
};


export default Campaigns;


