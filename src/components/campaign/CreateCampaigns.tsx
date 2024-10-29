import { FormProvider, useForm } from "react-hook-form";
import Tabs from "../../UI/TabComponent/tabs";
import BasicInformation from "../Information/BasicInformation";
import CampaignInformation from "../Information/CampaignInformation";
import ContactInformation from "../Information/ContactInformation";
import { useState } from "react";
import { campaignSchema, TCampaignSchema } from "../../types/campaign";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateCampaigns = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabFields: (keyof TCampaignSchema)[][] = [
    ["title", "country", "city", "category", "description"], // Basic Information tab fields
    [
      "goalAmount",
      "startDate",
      "endDate",
      "raiseMoneyFor",
      "importance",
      "impact",
      "images",
    ], // Campaign Information tab fields
    ["bank", "accountNumber", "name", "email", "phone"], // Contact Information tab fields
  ];

  const methods = useForm<TCampaignSchema>({
    resolver: zodResolver(campaignSchema),
  });

  const handleTabChange = async (index: number) => {
    // Validate only the fields for the current active tab
    const isValid = await methods.trigger(tabFields[activeTab]);
    if (isValid) setActiveTab(index);
  };

  return (
    <FormProvider {...methods}>
      <Tabs
        tabs={[
          "Basic Information",
          "Campaign Information",
          "Contact Information",
        ]}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="flex justify-between">
        <div className="mt-6 w-full">
          {activeTab === 0 && (
            <BasicInformation onNext={() => setActiveTab(1)} />
          )}
          {activeTab === 1 && (
            <CampaignInformation onNext={() => setActiveTab(2)} />
          )}
          {activeTab === 2 && <ContactInformation />}
        </div>
      </div>
    </FormProvider>
  );
};

export default CreateCampaigns;
