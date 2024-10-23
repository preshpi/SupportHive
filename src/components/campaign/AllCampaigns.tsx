import { useEffect, useState } from "react";
import CampaignCard from "./CampaignCard";
import Icon from "../../assets/campaign icon.svg";
import campaignImage from "../../../public/campaign.svg";
import { Link } from "react-router-dom";
import { fetchApprovedCampaigns } from "../../../supporthive/sanity.query";

export type Campaign = {
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
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getCampaigns = async () => {
      setLoading(true);
      const allCampaigns = await fetchApprovedCampaigns();
      setAllCampaigns(allCampaigns);
      setLoading(false);
    };

    getCampaigns();
  }, []);

  return (
    <div className="py-5 w-full">
      <div className="flex justify-between items-center flex-col lg:flex-row md:flex-row">
        <div className="mr-60">
          <p className="font-bold text-[20px] ">Campaigns</p>
        </div>
        <Link to={"/dashboard/campaigns/create"}>
          <button className="flex gap-5 justify-center items-center bg-[#28A745] px-7 py-3 text-[#ffff] mt-5 border-2 border-[#28A745] rounded-xl hover:bg-[#ffff] hover:text-[#28A745]  ml-40">
            Create Campaign
            <img src={Icon} alt="" className="bg-[#28A745]" />
          </button>
        </Link>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="fetchingSpinner "></div>
        </div>
      ) : (
        <div className="mt-6 lg:w-[100%] grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 ">
          {allCampaigns.map((campaign) => (
            <CampaignCard
              _id={campaign._id}
              key={campaign._id}
              title={campaign.title}
              description={campaign.description}
              goalAmount={campaign.goalAmount}
              raisedAmount={50000}
              daysLeft={2}
              imageUrl={campaignImage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCampaignsTab;
