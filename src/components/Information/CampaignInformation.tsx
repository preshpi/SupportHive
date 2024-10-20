import React, { useState } from 'react';
import CampaignInput from "../CampaignInput";

const CampaignInformation :React.FC =() => {
  const [campaignTitle, setCampaignTitle] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');


  return (
    <div className='w-[60%]'>
      <CampaignInput
        label="Campaign Description"
        placeholder="Write Here"
        value={campaignTitle}
        onChange={(e) => setCampaignTitle(e.target.value)}
      />
      <CampaignInput
        label="Country"
        placeholder="Enter Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <CampaignInput
        label="City"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </div>
  );
};

export default CampaignInformation;