import React, { useState } from 'react';
import Tabs from '../../UI/TabComponent/tabs';
import BasicInformation from '../../components/Information/BasicInformation';
import CampaignInformation from '../../components/Information/CampaignInformation';
import ContactInformation from '../../components/Information/ContactInformation';

const CampaignForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      
      <Tabs
        tabs={['Basic Information', 'Campaign Information', 'Contact Information']}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      
      <div className="mt-6">
        {activeTab === 0 && <BasicInformation />}
        {activeTab === 1 && <CampaignInformation />}
        {activeTab === 2 && <ContactInformation />}
      </div>

      
      <div className="flex justify-end mt-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default CampaignForm;
