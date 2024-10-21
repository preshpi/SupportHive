import Location from "../../assets/Location.svg";
import Category from "../../assets/Category.svg";
import Time from "../../assets/Time Circle.svg";
import Naira from "../../assets/tabler_currency-naira.svg";
import People from "../../assets/Profile.svg";
import Email from "../../assets/Envelope.svg";
import Call from "../../assets/Call.svg";
import Delete from "../../assets/Delete.svg";
import One from "../../assets/student 1.svg";
import Two from "../../assets/student 2.svg";
import Three from "../../assets/student 3.svg";
import Four from "../../assets/student4.svg";
import { useEffect, useState } from "react";
import { fetchAllCampaigns } from "../../../supporthive/sanity.query";
import { toast } from "sonner";
import { fetchCampaign } from "../../types/campaign";
import { client } from "../../../supporthive/sanity.cli";

const Creator = () => {
  const [campaigns, setCampaigns] = useState<fetchCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        setLoading(true);
        const fetchedCampaigns = await fetchAllCampaigns();
        console.log(fetchedCampaigns); // This will log the campaigns to the console
        setCampaigns(fetchedCampaigns); // Set the data to state
      } catch (error) {
        toast.error((error as { message: string }).message);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []); //

  if (loading) return <p>Loading campaigns...</p>;

  // Function to delete a campaign from Sanity
  const handleDeleteCampaign = async (campaignId: string) => {
    try {
      // Delete the campaign from Sanity
      await client.delete(campaignId); // Use the campaign's _id as the ID to delete
      setCampaigns(campaigns.filter((campaign) => campaign._id !== campaignId)); // Update local state
    } catch (error) {
      toast.error((error as { message: string }).message);
    }
  };

  return (
    <div>
      {campaigns.map((campaign) => (
        <div key={campaign._id}>
          <h1 className="mt-5 font-extrabold text-2xl">{campaign.title}</h1>
          <div className="flex gap-6 mt-3 text-[#555657] flex-wrap">
            <div className="flex gap-2">
              <img src={Location} alt="" />
              <p>
                {campaign.city}, {campaign.country}
              </p>
            </div>

            <div className="flex gap-2">
              <img src={Category} alt="" />
              <p>{campaign.category}</p>
            </div>

            <div className="flex gap-2">
              <img src={Time} alt="" />
              <p>
                {Math.ceil(
                  (new Date(campaign.endDate).getTime() -
                    new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days left
              </p>
            </div>
          </div>
          <p className="mt-2 ">{campaign.description}</p>

          <hr className="w-full mt-6 text-gray-50" />

          <div>
            <h1 className="mt-5 font-bold text-xl">Campaign Information</h1>
            <div className="flex gap-5 flex-wrap mt-3">
              <div className="flex items-center">
                <h1>Funding Goal:</h1>
                <img src={Naira} alt="naira" />
                <h1>{campaign.goalAmount}</h1>
              </div>

              <div className="flex items-center flex-wrap">
                <h1>Amount Raised:</h1>
                <img src={Naira} alt="" />
                <h1>3,000,000 </h1> {/* You can update this with actual data */}
                <div className="w-60 bg-gray-200 rounded-full h-[15px] mx-3 my-2">
                  <div className="bg-[#28A745] h-full rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="mt-2 font-bold text-xl">
              What impact will this campaign have?
            </h1>
            <p className="mt-3 mb-2">{campaign.impact}</p>
          </div>

          <hr className="w-full mt-6 text-gray-50" />

          <div>
            <h1 className="mt-2 font-bold text-xl">
              Why is this campaign important to you?
            </h1>
            <p className="mt-3 mb-2">{campaign.importance}</p>
          </div>

          <hr className="w-full mt-6 text-gray-50" />

          <div>
            <h1 className="mt-2 font-bold text-xl">
              What do you want to raise money for?
            </h1>
            <p className="mt-3 mb-2">{campaign.raiseMoneyFor}</p>
          </div>
          <hr className="w-full mt-6 text-gray-50" />

          <div>
            <h1 className="mt-2 font-bold text-xl mb-4">Contact Information</h1>
            <div className="flex gap-14 flex-wrap">
              <div className="flex gap-2">
                <img src={People} alt="" />
                <h1>
                  {campaign.createdBy.firstname} {campaign.createdBy.lastname}
                </h1>
              </div>

              <div className="flex gap-2">
                <img src={Email} alt="" />
                <h1>{campaign.createdBy.email}</h1>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleDeleteCampaign(campaign._id)}
            className="flex gap-2 py-2 px-10 border rounded-lg border-[#CA200D] mb-24 hover:bg-[#CA200D] hover:text-white items-center mt-[48px] flex-wrap"
          >
            Delete Campaign
            <img src={Delete} alt="" />
          </button>

          <div className="mb-10">
            <h1 className="text-center font-bold text-2xl">GALLERY</h1>
            <div className="flex flex-wrap">
              <img src={One} alt="" />
              <img src={Two} alt="" />
              <img src={Three} alt="" />
              <img src={Four} alt="" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Creator;
