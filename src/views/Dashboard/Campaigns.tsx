import React, { useState } from "react";
import Tabs from "../../UI/TabComponent/tabs";
import BasicInformation from "../../components/Information/BasicInformation";
import CampaignInformation from "../../components/Information/CampaignInformation";
import ContactInformation from "../../components/Information/ContactInformation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campaignSchema, TCampaignSchema } from "../../types/campaign";
import { Button } from "../../components/Button";
import { createCampaign } from "../../utils/requests/campaign.request";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CampaignForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TCampaignSchema>({
    resolver: zodResolver(campaignSchema),
  });

  const userDetails = useSelector((state: RootState) => state.user);

  const sanityID = userDetails.userDetails._id;

  const onSubmit = async (data: TCampaignSchema) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    const campaignData = {
      ...data,
      startDate,
      endDate,
      userId: sanityID,
      images: data.images
        ? Array.isArray(data.images)
          ? data.images
          : [data.images]
        : [],
      supportingDocuments: data.supportingDocuments
        ? Array.isArray(data.supportingDocuments)
          ? data.supportingDocuments
          : [data.supportingDocuments]
        : [],
    };

    if (sanityID) {
      await createCampaign(campaignData);
      reset();
    }
  };

  return (
    <div>
      <Tabs
        tabs={[
          "Basic Information",
          "Campaign Information",
          "Contact Information",
        ]}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* <div className="mt-6">
        {activeTab === 0 && <BasicInformation />}
        {activeTab === 1 && <CampaignInformation />}
        {activeTab === 2 && <ContactInformation />}
      </div> */}

      <form className="flex flex-col gap-4">
        <div>
          <label>Campaign Title</label>
          <input type="text" {...register("title")} />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>
        <div>
          <label>Campaign Country</label>
          <input type="text" {...register("country")} />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </div>
        <div>
          <label>Campaign City</label>
          <input type="text" {...register("city")} />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </div>
        <div>
          <label>Campaign Category</label>
          <select {...register("category")}>
            <option value="">Select Category</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Emergency Assistance">Emergency Assistance</option>
            <option value="Community Development">Community Development</option>
            <option value="Career">Career</option>
          </select>
          {errors.category && (
            <span className="text-red-500">{errors.category.message}</span>
          )}
        </div>
        <div>
          <label>Campaign Description</label>
          <textarea {...register("description")} />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div>
          <label>Campaign Goal Amount</label>
          <input type="text" {...register("goalAmount")} />
          {errors.goalAmount && (
            <span className="text-red-500">{errors.goalAmount.message}</span>
          )}
        </div>
        <div>
          <label>Campaign Start Date</label>
          <input type="datetime-local" {...register("startDate")} />
          {errors.startDate && (
            <span className="text-red-500">{errors.startDate.message}</span>
          )}
        </div>
        <div>
          <label>Campaign End Date</label>
          <input type="datetime-local" {...register("endDate")} />
          {errors.endDate && (
            <span className="text-red-500">{errors.endDate.message}</span>
          )}
        </div>
        <div>
          <label>What do you want to raise money for?</label>
          <textarea {...register("raiseMoneyFor")} />
          {errors.raiseMoneyFor && (
            <span className="text-red-500">{errors.raiseMoneyFor.message}</span>
          )}
        </div>
        <div>
          <label>Why is this campaign important to you?</label>
          <textarea {...register("importance")} />
          {errors.importance && (
            <span className="text-red-500">{errors.importance.message}</span>
          )}
        </div>
        <div>
          <label>What impact will this campaign have?</label>
          <textarea {...register("impact")} />
          {errors.impact && (
            <span className="text-red-500">{errors.impact.message}</span>
          )}
        </div>
        <div>
          <label>Have Images related to your Campaign?</label>
          <input
            type="file"
            accept="image/*"
            {...register("images")}
            multiple
          />
          {errors.images && (
            <span className="text-red-500">
              {errors.images?.message?.toString()}
            </span>
          )}
        </div>
        <div>
          <label>Supporting documents</label>
          <input
            type="file"
            accept=".pdf, .doc, .docx, .ppt, .pptx"
            {...register("supportingDocuments")}
            multiple
          />
          {errors.supportingDocuments && (
            <span className="text-red-500">
              {errors.supportingDocuments?.message?.toString()}
            </span>
          )}
        </div>
        <div>
          <label>Name</label>
          <input type="text" {...register("name")} />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div>
          <label>Email Address</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label>Phone Number</label>
          <input type="text" {...register("phone")} />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          loading={isSubmitting}
          className="bg-blue-500 text-white p-2"
        >
          Submit Campaign
        </Button>
      </form>
    </div>
  );
};

export default CampaignForm;
