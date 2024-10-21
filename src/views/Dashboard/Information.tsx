import React, { useState } from 'react';
import Tabs from '../../UI/TabComponent/tabs';
import BasicInformation from '../../components/Information/BasicInformation';
import CampaignInformation from '../../components/Information/CampaignInformation';
import ContactInformation from '../../components/Information/ContactInformation';

interface CampaignFormProps {
  hideForm: () => void; 
}

const CampaignForm: React.FC<CampaignFormProps> = ({ hideForm }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="">
      <Tabs
        tabs={['Basic Information', 'Campaign Information', 'Contact Information']}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="mt-6">
        {activeTab === 0 && (
          <BasicInformation onNext={() => setActiveTab(1)} />
        )}
        {activeTab === 1 && (
          <CampaignInformation onNext={() => setActiveTab(2)} />
        )}
        {activeTab === 2 && <ContactInformation hideForm={hideForm} />}
      </div>
    </div>
  );
};

export default CampaignForm;
