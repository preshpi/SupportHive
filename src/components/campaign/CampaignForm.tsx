import React, { useState } from "react";
import Tabs from "../../UI/TabComponent/tabs";
import BasicInformation from "../Information/BasicInformation";
import CampaignInformation from "../Information/CampaignInformation";
import ContactInformation from "../Information/ContactInformation";
import { FormProvider, useForm } from "react-hook-form";
import { campaignSchema, TCampaignSchema } from "../../types/campaign";
import { zodResolver } from "@hookform/resolvers/zod";

interface CampaignFormProps {
  hideForm: () => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ hideForm }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const methods = useForm<TCampaignSchema>({
    resolver: zodResolver(campaignSchema),
    // mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <div className="">
        <Tabs
          tabs={[
            "Basic Information",
            "Campaign Information",
            "Contact Information",
          ]}
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
    </FormProvider>
  );
};

export default CampaignForm;
