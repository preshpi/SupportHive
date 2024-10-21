import { useEffect, useState } from "react";
import Tabs from "../../UI/TabComponent/tabs";
import {
  fetchAllCampaigns,
  fetchApprovedCampaigns,
  fetchPendingCampaigns,
  fetchRejectedCampaigns,
} from "../../../supporthive/sanity.query";
import CampaignCard from "./CampaignCard";
import OngoingCampaigns from "./alcampaign";
import Icon from "../../assets/campaign icon.svg";
import { useAppContext } from "../../context/createCampaign.context";
import CampaignForm from "./CampaignForm";

const AllCampaignsTab = () => {
  const [activeStatusTab, setActiveStatusTab] = useState(0);
  const [approvedCampaigns, setApprovedCampaigns] = useState([]); // State to store approved campaigns
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [rejectedCampaigns, setRejectedCampaigns] = useState([]);
  const [AllCampaigns, setAllCampaign] = useState([]);
  const { showForm, setShowForm } = useAppContext();

  const [activeFormTab, setActiveFormTab] = useState(0);

  const handleStatusTabChange = (index: number) => {
    setActiveStatusTab(index);
  };

  const handleFormTabChange = (index: number) => {
    setActiveFormTab(index);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    const getCampaigns = async () => {
      if (activeStatusTab === 0) {
        const allCampaigns = await fetchAllCampaigns();
        console.log(allCampaigns);
        setApprovedCampaigns(allCampaigns);
      } else if (activeStatusTab === 2) {
        const approvedCampaigns = await fetchApprovedCampaigns();
        setPendingCampaigns(approvedCampaigns);
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
    <>
      {showForm ? (
        <CampaignForm hideForm={handleHideForm} />
      ) : (
        <div className="py-10 w-full">
          <div>
            <p className="font-bold text-[20px]">
              All your Campaigns in one place!
            </p>
          </div>

          <Tabs
            tabs={["All", "Approved", "Pending", "Rejected"]}
            activeTab={activeStatusTab}
            onTabChange={handleStatusTabChange}
          />

          <div className="flex flex-col lg:flex-row justify-between">
            <div className="mt-6 lg:w-[60%]">
              {activeStatusTab === 0 && <div></div>}
              {activeStatusTab === 1 && <p>Showing approved campaigns...</p>}
              {activeStatusTab === 2 && <p>Showing pending campaigns...</p>}
              {activeStatusTab === 3 && <p>Showing rejected campaigns...</p>}
            </div>

            <button
              onClick={handleShowForm}
              className="flex gap-5 bg-[#28A745] px-7 py-3 text-[#ffff] mt-5 border-2 border-[#28A745] rounded-xl hover:bg-[#ffff] hover:text-[#28A745]"
            >
              Create Campaign
              <img src={Icon} alt="" />
            </button>

            {/* <div className="lg:w-[40%]">
        <OngoingCampaigns />
      </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default AllCampaignsTab;
