import React from "react";
import Icon from '../../assets/campaign icon (2).svg'


const Campaigns = () => {
  return <div>
    <div className="flex justify-center items-center flex-col mt-48">
      <h1 className="font-extrabold text-3xl mb-4">Let’s get your story started</h1>
      <p className="text-center text-lg font-medium mb-6">You do not have any active campaign. Click the <br /> button below to create one.</p>
      <div className="flex gap-3 bg-[#28A745] rounded-md p-4">
        <a href="" className="text-[#FFFFFF]">Create Campaign</a>
        <img src={Icon} alt="" />
      </div>
    </div>
  </div>;
};

export default Campaigns;
