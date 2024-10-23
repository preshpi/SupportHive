import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import CampaignCard, {
  CampaignCardProps,
} from "../../components/campaign/CampaignCard";
import {
  userAllCampaigns,
  userApprovedCampaigns,
  userPendingCampaigns,
  userRejectedCampaigns,
} from "../../utils/requests/campaign.request";
import { toast } from "sonner";

const Profile = () => {
  const userDetails = useSelector((state: RootState) => state.user); // Get user details from Redux store
  const userId = userDetails.userDetails._id;

  const { firstname, lastname } = userDetails.userDetails;

  const [timeOnSupportHive, setTimeOnSupportHive] = useState<string>();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const createdAt = user.metadata.creationTime
        ? new Date(user.metadata.creationTime)
        : null;
      if (createdAt) {
        const timeDifference = formatDistanceToNow(createdAt, {
          addSuffix: false,
        });
        setTimeOnSupportHive(timeDifference);
      }
    }
  }, []);

  const navigate = useNavigate();
  const handleNavigateToSettings = () => {
    navigate("/dashboard/settings");
  };
  const [activeStatusTab, setActiveStatusTab] = useState(0);
  const [approvedCampaigns, setApprovedCampaigns] = useState<
    CampaignCardProps[]
  >([]); // State to store approved campaigns
  const [pendingCampaigns, setPendingCampaigns] = useState<CampaignCardProps[]>(
    []
  );
  const [rejectedCampaigns, setRejectedCampaigns] = useState<
    CampaignCardProps[]
  >([]);
  const [allCampaigns, setAllCampaign] = useState<CampaignCardProps[]>([]);

  const handleChangeTab = (tabName: string, tabIndex: number) => {
    switch (tabName) {
      case "all":
        setActiveStatusTab(0);
        localStorage.setItem("selectedTabIndex", tabIndex.toString());
        break;
      case "approved":
        setActiveStatusTab(1);
        localStorage.setItem("selectedTabIndex", tabIndex.toString());
        break;
      case "pending":
        setActiveStatusTab(2);
        localStorage.setItem("selectedTabIndex", tabIndex.toString());
        break;
      case "rejected":
        setActiveStatusTab(3);
        localStorage.setItem("selectedTabIndex", tabIndex.toString());
        break;

      default:
        setActiveStatusTab(0);
        localStorage.setItem("selectedTabIndex", tabIndex.toString());
    }
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("selectedProfileTab");
    if (storedValue !== null) {
      setActiveStatusTab(parseInt(storedValue));
    }
  }, []);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        if (userId) {
          if (activeStatusTab === 0) {
            const allCampaigns = await userAllCampaigns(userId);
            setAllCampaign(allCampaigns);
          } else if (activeStatusTab === 1) {
            const approvedCampaigns = await userApprovedCampaigns(userId);
            setApprovedCampaigns(approvedCampaigns);
          } else if (activeStatusTab === 2) {
            const pendingCampaigns = await userPendingCampaigns(userId);
            setPendingCampaigns(pendingCampaigns);
          } else if (activeStatusTab === 3) {
            const rejectedCampaigns = await userRejectedCampaigns(userId);
            setRejectedCampaigns(rejectedCampaigns);
          }
        }
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    };
    getCampaigns();
  }, [activeStatusTab]);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between w-full">
        <div>
          <h3 className="text-[#101828] text-[24px] font-semibold capitalize">
            {firstname} {lastname}
          </h3>

          <div className="flex lg:flex-row flex-col items-start text-[#555657] pt-2  text-base">
            <p>
              @{firstname}
              {lastname}
            </p>
            <p> ~ {timeOnSupportHive} on SupportHive </p>
          </div>
        </div>

        <div className="max-w-[140px] bg-[#28A745] text-white rounded-lg">
          <Button onClick={handleNavigateToSettings}>Edit Profile</Button>
        </div>
      </div>
      <div className=" pt-[32px]">
        <h3 className="font-bold text-[24px] text-blacks">
          All your Campaigns in one place!
        </h3>
        <div className="flex items-center  pt-[32px] border-b border-gray-100 gap-x-6">
          <button
            onClick={() => handleChangeTab("all", 0)}
            className={`text-[16px] p-2 ${
              activeStatusTab === 0
                ? "text-normal-500 font-medium border-b-2 border-normal-500"
                : "text-[#777777]"
            } `}
          >
            All
          </button>
          <button
            onClick={() => handleChangeTab("approved", 1)}
            className={`text-[16px] p-2 ${
              activeStatusTab === 1
                ? "text-normal-500 font-medium border-b-2 border-normal-500"
                : "text-[#777777]"
            } `}
          >
            Approved
          </button>
          <button
            onClick={() => handleChangeTab("pending", 2)}
            className={`text-[16px] p-2 ${
              activeStatusTab === 2
                ? "text-normal-500 font-medium border-b-2 border-normal-500"
                : "text-[#777777]"
            } `}
          >
            Pending
          </button>
          <button
            onClick={() => handleChangeTab("rejected", 3)}
            className={`text-[16px] p-2 ${
              activeStatusTab === 3
                ? "text-normal-500 font-medium border-b-2 border-normal-500"
                : "text-[#777777]"
            } `}
          >
            Rejected
          </button>
        </div>
        {allCampaigns.length === 0 && activeStatusTab === 0 ? (
          <div className="text-center text-[#777777] w-full flex items-center justify-center h-full">
            <p className="w-full h-full">No campaign</p>
          </div>
        ) : (
          <div className="mt-6  w-full grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {activeStatusTab === 0 &&
              allCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign?._id}
                  title={campaign.title}
                  description={campaign.description}
                  goalAmount={campaign.goalAmount}
                  raisedAmount={0} // Replace with actual data if available
                  daysLeft={2}
                  imageUrl={campaign.imageUrl}
                  _id={campaign._id}
                />
              ))}
          </div>
        )}

        {activeStatusTab === 1 && approvedCampaigns.length === 0 ? (
          <div className="text-center text-[#777777] w-full flex items-center justify-center h-full">
            <p className="w-full h-full">No approved campaigns</p>
          </div>
        ) : (
          <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {activeStatusTab === 1 &&
              approvedCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign._id}
                  title={campaign.title}
                  description={campaign.description}
                  goalAmount={campaign.goalAmount}
                  raisedAmount={0}
                  daysLeft={2}
                  imageUrl={campaign.imageUrl}
                  _id={campaign._id}
                />
              ))}
          </div>
        )}

        {activeStatusTab === 2 &&
          (pendingCampaigns.length === 0 ? (
            <div className="text-center text-[#777777] w-full flex items-center justify-center h-full">
              <p className="w-full h-full">No pending campaigns</p>
            </div>
          ) : (
            <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {activeStatusTab === 2 &&
                pendingCampaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign._id}
                    title={campaign.title}
                    description={campaign.description}
                    goalAmount={campaign.goalAmount}
                    raisedAmount={0}
                    daysLeft={2}
                    imageUrl={campaign.imageUrl}
                    _id={campaign._id}
                  />
                ))}
            </div>
          ))}
        {activeStatusTab === 3 && rejectedCampaigns.length === 0 ? (
          <div className="text-center text-[#777777] w-full flex items-center justify-center">
            <p className="w-full">No pending campaigns</p>
          </div>
        ) : (
          <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {activeStatusTab === 3 &&
              rejectedCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign?._id}
                  title={campaign.title}
                  description={campaign.description}
                  goalAmount={campaign.goalAmount}
                  raisedAmount={0}
                  daysLeft={2}
                  imageUrl={campaign.imageUrl}
                  _id={campaign._id}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
