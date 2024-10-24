import { useEffect, useState } from "react";
import CampaignCard from "../../components/campaign/CampaignCard";
import campaignImage from "../../../public/campaign.svg";
import { fetchApprovedCampaigns } from "../../../supporthive/sanity.query";
import { CampaignSkeleton } from "../../components/campaign/CampaignLoader";
import { SpotLightCard } from "../../components/spolightCards";

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

const Spotlight = () => {
  const [approvedCampaigns, setApprovedCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getApprovedCampaigns = async () => {
      setLoading(true);
      const campaigns = await fetchApprovedCampaigns();
      setApprovedCampaigns(campaigns);
      setLoading(false);
    };

    getApprovedCampaigns();
  }, []);

  return (
    <section
      id="browseCampaigns"
      className="px-5 lg:px-10 lg:mt-[100px] mt-[80px]"
    >
      <h1 className="text-[40px] font-bold">In the Spotlight</h1>
      {loading ? (
        <div className="mt-6 w-full grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <CampaignSkeleton key={index} />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 my-5 py-5 w-full no-scrollbar overflow-x-auto lg:grid-cols-3 justify-center md:grid-cols-2">
          {approvedCampaigns.length > 0 ? (
            approvedCampaigns
              .slice(0, 3)
              .map((campaign) => (
                <SpotLightCard
                  _id={campaign._id}
                  key={campaign._id}
                  title={campaign.title}
                  description={campaign.description}
                  goalAmount={campaign.goalAmount}
                  raisedAmount={0}
                  daysLeft={2}
                  imageUrl={campaignImage}
                />
              ))
          ) : (
            <p>No campaigns available.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Spotlight;
