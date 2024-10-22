import { fetchAllCampaigns } from "../../../supporthive/sanity.query";
import Icon from "../../assets/campaign icon.svg";
import AllCampaignsTab from "../../components/campaign/AllCampaigns";
import CampaignForm from "../../components/campaign/CampaignForm";
import { useEffect, useState } from "react";
import { fetchCampaign } from "../../types/campaign";
import { toast } from "sonner";
import { useAppContext } from "../../context/createCampaign.context";

const Campaigns = () => {
  const { showForm, setShowForm } = useAppContext();
  const [campaigns, setCampaigns] = useState<fetchCampaign[]>([]);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const fetchedCampaigns = await fetchAllCampaigns();
        setCampaigns(fetchedCampaigns); // Set the data to state
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    };

    loadCampaigns();
  }, []); // Empty dependency array to ensure it runs only once on mount

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      {showForm ? (
        <CampaignForm hideForm={handleHideForm} />
      ) : campaigns.length < 1 ? (
        <div className="flex justify-center items-center flex-col mt-52">
          <h1 className="font-bold text-2xl mb-2">
            Let’s get your story started
          </h1>
          <p className="text-center">
            You do not have any active campaign. Click the <br />
            <span>button below to create one.</span>
          </p>
          
        </div>
      ) : (
        <div>
          <AllCampaignsTab />
        </div>
      )}
    </div>
  );
};

export default Campaigns;
