import { useEffect, useState } from "react";
import { fetchCampaignById } from "../../../supporthive/sanity.query";
import { useParams } from "react-router-dom";
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
import { toast } from "sonner";
import { fetchCampaign } from "../../types/campaign";
import { client } from "../../../supporthive/sanity.cli";

function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState<fetchCampaign>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCampaignDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchCampaignById(id);
        setCampaign(data);
        setLoading(false);
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    };

    // Function to delete a campaign from Sanity
    //   const handleDeleteCampaign = async (campaignId: string) => {
    //     try {
    //       // Delete the campaign from Sanity
    //       await client.delete(campaignId); // Use the campaign's _id as the ID to delete
    //       setCampaign(campaignId.filter((campaign: { _id: string; }) => campaign._id !== campaignId)); // Update local state
    //     } catch (error) {
    //       toast.error((error as { message: string }).message);
    //     }
    //   };

    getCampaignDetail();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="spinner h-screen"></div>
      ) : (
        <div>
          <div>
            <h1 className="mt-5 font-extrabold text-2xl">{campaign?.title}</h1>
            <div className="flex gap-6 mt-3 text-[#555657] flex-wrap">
              <div className="flex gap-2">
                <img src={Location} alt="" />
                <p>{`${campaign?.city}, ${campaign?.country}`}</p>
              </div>

              <div className="flex gap-2">
                <img src={Category} alt="" />
                <p>{campaign?.category}</p>
              </div>

              <div className="flex gap-2">
                <img src={Time} alt="" />
                <p>
                  {campaign?.endDate
                    ? new Date(campaign.endDate).toLocaleDateString()
                    : "No end date"}{" "}
                  left
                </p>
              </div>
            </div>
            <p className="mt-2">{campaign?.description}</p>
          </div>

          <div>
            <h1 className="mt-5 font-bold text-xl">Campaign Information</h1>
            <div className="flex gap-5 flex-wrap">
              <div className="flex items-center">
                <h1>Funding Goal:</h1>
                <img src={Naira} alt="" />
                <h1>{campaign?.goalAmount}</h1>
              </div>

              <div className="flex items-center flex-wrap">
                <h1>Amount Raised:</h1>
                <img src={Naira} alt="" />
                <h1>3,000,000 </h1>
                <div className="w-60 bg-gray-200 rounded-full h-[15px] my-2">
                  <div className="bg-[#28A745] h-full rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="mt-2 font-bold text-xl">Impact of the Campaign</h1>
            <p className="mt-3 mb-2">{campaign?.impact}</p>
          </div>

          <div>
            <h1 className="mt-2 font-bold text-xl">
              Why this Campaign is Important
            </h1>
            <p className="mt-3 mb-2">{campaign?.importance}</p>
          </div>

          <div>
            <h1 className="mt-2 font-bold text-xl">Contact Information</h1>
            <div className="flex gap-14 flex-wrap">
              <div className="flex gap-2">
                <img src={People} alt="" />
                <h1>
                  {campaign?.createdBy?.firstname &&
                  campaign?.createdBy?.lastname
                    ? `${campaign.createdBy.firstname} ${campaign.createdBy.lastname}`
                    : "Unknown Creator"}
                </h1>
              </div>

              <div className="flex gap-2">
                <img src={Email} alt="" />
                <h1>{campaign?.createdBy.email}</h1>
              </div>

              <div className="flex gap-2">
                <img src={Call} alt="" />
                <h1>+234(0)910877896</h1>{" "}
              </div>
            </div>
          </div>

          {/* <div className="flex  mt-7  flex-wrap">
                  <div className="flex gap-2 py-2 px-10 border-2 border-[#CA200D] mb-24 hover:bg-[#CA200D] flex-wrap">
                      <button onClick={handleDeleteCampaign} className="text-[#CA200D] hover:text-[#ffff]">Delete</button>
                      <img src={Delete} alt="" />
                  </div>
              </div> */}

          <div className="mb-10">
            <h1 className="text-center font-bold text-2xl">GALLERY</h1>
            <div className="flex flex-wrap ">
              <img src={One} alt="" />
              <img src={Two} alt="" />
              <img src={Three} alt="" />
              <img src={Four} alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CampaignDetails;
