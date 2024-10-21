import { useEffect, useState } from "react";
import Tabs from "../../UI/TabComponent/tabs";
import {
  fetchAllCampaigns,
  fetchApprovedCampaigns,
  fetchPendingCampaigns,
  fetchRejectedCampaigns,
} from "../../../supporthive/sanity.query";
import CampaignCard from "./CampaignCard";
import Icon from "../../assets/campaign icon.svg";
import { useAppContext } from "../../context/createCampaign.context";
import campaignImage from "../../../public/campaign.svg";


type Campaign = {
  _id: string;
  title: string;
  country: string;
  city: string;
  category: string;
  description: string;
  goalAmount: number;
  startDate: string;
  endDate: string;
  raiseMoneyFor: string;
  importance: string;
  impact: string;
  status: string;
  createdBy: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
};

const AllCampaignsTab = () => {
  const [activeStatusTab, setActiveStatusTab] = useState(0);
  const [approvedCampaigns, setApprovedCampaigns] = useState<Campaign[]>([]);
  const [pendingCampaigns, setPendingCampaigns] = useState<Campaign[]>([]);
  const [rejectedCampaigns, setRejectedCampaigns] = useState<Campaign[]>([]);
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const { showForm, setShowForm } = useAppContext();

  const handleStatusTabChange = (index: number) => {
    setActiveStatusTab(index);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  useEffect(() => {
    const getCampaigns = async () => {
      if (activeStatusTab === 0) {
        const allCampaigns = await fetchAllCampaigns();
        console.log(allCampaigns)
        setAllCampaigns(allCampaigns);
      } else if (activeStatusTab === 1) {
        const approvedCampaigns = await fetchApprovedCampaigns();
        setApprovedCampaigns(approvedCampaigns);
      } else if (activeStatusTab === 2) {
        const pendingCampaigns = await fetchPendingCampaigns();
        setPendingCampaigns(pendingCampaigns);
      } else if (activeStatusTab === 3) {
        const rejectedCampaigns = await fetchRejectedCampaigns();
        setRejectedCampaigns(rejectedCampaigns);
      }
    
    };

    getCampaigns();
  }, [activeStatusTab]);

  return (
    <div className="py-10 w-full">
      <div>
        <p className="font-bold text-[20px]">All your Campaigns in one place!</p>
      </div>

      <Tabs
        tabs={["All", "Approved", "Pending", "Rejected"]}
        activeTab={activeStatusTab}
        onTabChange={handleStatusTabChange}
      />

      <div className="flex flex-col lg:flex-row justify-between">
        <div className="mt-6 lg:w-[70%] grid grid-cols-2 gap-8">
          {activeStatusTab === 0 &&
            allCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign._id}
                title={campaign.title}
                description={campaign.description}
                goalAmount={campaign.goalAmount}
                raisedAmount={0} // Replace with actual data if available
                daysLeft={2}
                imageUrl={campaignImage}
              

              />
            ))}

          {activeStatusTab === 1 &&
            approvedCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign._id}
                title={campaign.title}
                description={campaign.description}
                goalAmount={campaign.goalAmount}
                raisedAmount={0} // Replace with actual data if available
                daysLeft={2}
                imageUrl={campaignImage}
              />
            ))}

          {activeStatusTab === 2 &&
            pendingCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign._id}
                title={campaign.title}
                description={campaign.description}
                goalAmount={campaign.goalAmount}
                raisedAmount={0} // Replace with actual data if available
                daysLeft={2}
                imageUrl=""
              />
            ))}

          {activeStatusTab === 3 &&
            rejectedCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign._id}
                title={campaign.title}
                description={campaign.description}
                goalAmount={campaign.goalAmount}
                raisedAmount={0} // Replace with actual data if available
                daysLeft={2}
                imageUrl={campaignImage}
              />
            ))}
        </div>
        <div>
          <button
            onClick={handleShowForm}
            className="flex gap-5 bg-[#28A745] items-center px-7 py-3 text-[#ffff] mt-5 border-2 border-[#28A745] rounded-xl hover:bg-[#ffff] hover:text-[#28A745]"
          >
            Create Campaign
            <img src={Icon} alt="" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AllCampaignsTab;
