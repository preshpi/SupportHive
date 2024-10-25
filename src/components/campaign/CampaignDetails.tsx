import { useEffect, useState } from "react";
import { fetchCampaignById } from "../../../supporthive/sanity.query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { fetchCampaign } from "../../types/campaign";
import { GrLocationPin } from "react-icons/gr";
import { TbCategory } from "react-icons/tb";
import { BiTimeFive } from "react-icons/bi";
import { FaNairaSign } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { Button } from "../Button";
import { client, urlFor } from "../../../supporthive/sanity.cli";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { calculateTotalAmountForCampaign } from "../../utils/requests/transactions.request";
import NumberFormat from "../../utils/numberFormat";

function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState<fetchCampaign>();
  const [loading, setLoading] = useState(false);

  const userDetails = useSelector((state: RootState) => state.user);
  const userId = userDetails.userDetails._id;

  // const getDownloadLink = (ref) => {
  //   if (!ref) return '#';
  //   return getFileAssetUrl({ projectId: "yourProjectId", dataset: "yourDataset" }, ref);
  // };

  const handleDelete = async () => {
    try {
      const campaignId = campaign?._id;

      if (campaignId) {
        await client.delete(campaignId);
      } else {
        toast.error("Campaign ID is undefined");
      }
      toast.success("Campaign deleted successfully");
      navigate("/dashboard/campaigns");
    } catch (error) {
      toast.error("Error deleting campaign");
    }
  };

  const [totalAmountForCampaign, setTotalAmountForCampaign] = useState<
    number | null
  >(null);

  // const progressPercentage = totalAmountForCampaign
  //   ? (totalAmountForCampaign / (campaign?.goalAmount ?? 1)) * 100
  //   : 0;

  useEffect(() => {
    const getCampaignDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchCampaignById(id);
        setCampaign(data);
        const totalAmount = await calculateTotalAmountForCampaign(id);
        setTotalAmountForCampaign(totalAmount);

        setLoading(false);
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    };

    getCampaignDetail();
  }, [id]);

  const navigate = useNavigate();
  const handleDonation = () => {
    navigate(`/dashboard/campaign/${id}/donate`);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="fetchingSpinner "></div>
        </div>
      ) : (
        <div className="pt-6 pb-10">
          <div>
            <div>
              <h1 className="mt-5 font-extrabold text-2xl">
                {campaign?.title}
              </h1>
              <div className="flex gap-6 mt-3 text-[#555657] flex-wrap">
                <div className="flex gap-2 items-center">
                  <GrLocationPin />
                  <p>{`${campaign?.city}, ${campaign?.country}`}</p>
                </div>

                <div className="flex gap-2 items-center">
                  <TbCategory />
                  <p>{campaign?.category}</p>
                </div>

                <div className="flex gap-2 items-center">
                  <BiTimeFive />
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
              <div className="flex gap-3 flex-wrap mt-3">
                <div className="flex items-center">
                  <h1>Funding Goal:</h1>
                  <NumberFormat value={campaign?.goalAmount} />
                </div>

                <div className="flex items-center flex-wrap gap-3">
                  <div className="flex items-center">
                    <h1>Amount Raised:</h1>
                    <NumberFormat
                      value={
                        totalAmountForCampaign !== null
                          ? totalAmountForCampaign
                          : "N/A"
                      }
                    />
                  </div>
                  {/* <div className="w-60 bg-gray-200 rounded-full h-[15px] my-2">
        <div
          className="bg-green-500 h-full rounded-full transition-width duration-300"
          style={{ width: `${Math.min(progressPercentage, 100)}%` }} // Cap at 100%
        ></div>
      </div> */}
                </div>
              </div>
            </div>

            <div>
              <h1 className="mt-2 font-bold text-xl">Impact of the Campaign</h1>
              <p className="mt-3 mb-2 text-[#555657]">{campaign?.impact}</p>
            </div>

            <div>
              <h1 className="mt-2 font-bold text-xl">
                Why this Campaign is Important
              </h1>
              <p className="mt-3 mb-2 text-[#555657]">{campaign?.importance}</p>
            </div>

            <div>
              <h1 className="mt-2 font-bold text-xl">Contact Information</h1>
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex gap-2 items-center">
                  <CiUser />
                  <h1>{campaign?.name ?? "Unknown Name"}</h1>
                </div>

                <div className="flex gap-2 items-center">
                  <MdOutlineMailOutline />
                  <a href={`mailto:${campaign?.createdBy.email}`}>
                    {campaign?.createdBy.email ?? "Unknown Email"}
                  </a>
                </div>

                <div className="flex gap-2 items-center">
                  <IoCallOutline />
                  <a href={`tel:${campaign?.phone}`}>{campaign?.phone}</a>
                </div>
              </div>
            </div>

            <div className="m-10 space-y-3 flex items-center justify-center flex-col">
              <h1 className="text-center font-bold text-2xl">GALLERY</h1>
              <div className="flex flex-wrap gap-5 justify-center">
                {campaign?.images?.map((image, index) => (
                  <img
                    key={image._key}
                    src={urlFor(image)}
                    alt={`Campaign image ${index + 1}`}
                    className="w-60  rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex pt-6 gap-5 max-w-[400px] mx-auto w-full justify-center">
            <Button
              onClick={handleDonation}
              className="bg-normal-300 text-white text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Donate
            </Button>
          </div>

          {userId === campaign?._id && (
            <Button
              onClick={() => handleDelete()}
              className="hover:bg-[#CA200D] text-[#CA200D] bg-transparent border-[#CA200D]  border-2 hover:text-white text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Delete Campaign
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default CampaignDetails;
