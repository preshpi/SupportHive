import { useEffect, useState } from "react";
import CampaignCard from "./CampaignCard";
import Icon from "../../assets/campaign icon.svg";
import { Link } from "react-router-dom";
import { fetchApprovedCampaigns } from "../../../supporthive/sanity.query";
import { CampaignSkeleton } from "./CampaignLoader";
import { Image } from "../../types/images";
import { calculateTotalAmountForCampaign } from "../../utils/requests/transactions.request";

export type Campaign = {
  _id: string;
  title: string;
  country: string;
  city: string;
  category: string;
  description: string;
  goalAmount: number;
  startDate: string;
  endDate: number;
  raiseMoneyFor: string;
  importance: string;
  impact: string;
  status: string;
  images: Image[];
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
  const [raisedAmounts, setRaisedAmounts] = useState<Record<string, number>>(
    {}
  );

  console.log(raisedAmounts);

  useEffect(() => {
    const getCampaigns = async () => {
      setLoading(true);
      const allCampaigns = await fetchApprovedCampaigns();

      const campaignRaisedAmounts: Record<string, number> = {};
      for (const campaign of allCampaigns) {
        const totalAmount = await calculateTotalAmountForCampaign(campaign._id);
        campaignRaisedAmounts[campaign._id] = totalAmount;
      }

      setRaisedAmounts(campaignRaisedAmounts);
      setAllCampaigns(allCampaigns);
      setLoading(false);
    };

    getCampaigns();
  }, []);

  // Calculate days left for each campaign
  const calculateDaysLeft = (endDate: number | string) => {
    const currentDate = new Date();
    const campaignEndDate = new Date(endDate);
    const timeDiff = campaignEndDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
    return daysLeft;
  };

  return (
    <div className="py-5 w-full">
      <div className="flex w-full justify-between items-center">
        <p className="font-bold text-[20px] ">Campaigns</p>

        <Link to={"/dashboard/campaigns/create"}>
          <button className="flex gap-5 justify-center items-center bg-[#28A745] px-7 py-3 text-[#ffff] mt-5 border-2 border-[#28A745] rounded-xl hover:bg-[#ffff] hover:text-[#28A745]">
            Create Campaign
            <img src={Icon} alt="" className="bg-[#28A745]" />
          </button>
        </Link>
      </div>
      {loading ? (
        <div className="mt-6 w-full grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <CampaignSkeleton key={index} />
            ))}
        </div>
      ) : allCampaigns.length === 0 ? (
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-[20px]">No Campaigns Available</p>
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
              raisedAmount={raisedAmounts[campaign._id] || 0}
              daysLeft={calculateDaysLeft(campaign.endDate)}
              images={campaign.images}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCampaignsTab;
