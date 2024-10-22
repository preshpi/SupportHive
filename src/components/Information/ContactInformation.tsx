import { useFormContext } from "react-hook-form";
import Input from "../Inputs";
import { Button } from "../Button";
import { TCampaignSchema } from "../../types/campaign";
import { useSelector } from "react-redux";
import { createCampaign } from "../../utils/requests/campaign.request";
import { RootState } from "../../redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../UI/Modal/CustomModal";

const ContactInformation = () => {
  const { register, formState: { errors }, handleSubmit } = useFormContext<TCampaignSchema>();
  const [banks, setBanks] = useState<{ name: string; code: string; }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  const userDetails = useSelector((state: RootState) => state.user);
  const sanityID = userDetails.userDetails._id;

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("https://api.paystack.co/bank", {
          headers: { Authorization: `Bearer ${process.env.VITE_PAYSTACK_KEY}` },
        });
        setBanks(response.data.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };
    fetchBanks();
  }, []);

  const createSubAccount = async (data: TCampaignSchema) => {
    const subAccountData = {
      business_name: data.title,
      settlement_bank: data.bank,
      account_number: data.accountNumber,
      percentage_charge: 10,
    };

    try {
      const response = await axios.post("https://api.paystack.co/subaccount", subAccountData, {
        headers: {
          Authorization: `Bearer ${process.env.VITE_PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error creating sub-account");
    }
  };

  const onSubmit = async (data: TCampaignSchema) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    const campaignData = {
      ...data,
      startDate,
      endDate,
      userId: sanityID,
      images: data.images ? (Array.isArray(data.images) ? data.images : [data.images]) : [],
      supportingDocuments: data.supportingDocuments
        ? Array.isArray(data.supportingDocuments)
          ? data.supportingDocuments
          : [data.supportingDocuments]
        : [],
    };

    if (sanityID) {
      const subAccount = await createSubAccount(campaignData);
      campaignData.subAccountId = subAccount.subaccount_code;
      await createCampaign(campaignData);
    }

    navigate("/dashboard/campaigns");
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    handleSubmit(onSubmit)(); // Submit form after confirmation
  };

  return (
    <div className="lg:w-[60%] pb-10 space-y-5">
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
      <div className="flex flex-col gap-y-1">
        <Input
          label="Name"
          {...register("name")}
          placeholder="Enter your name"
          type="text"
          id="name"
          autoComplete="on"
        />
        {errors.name && <span className="text-red-500 text-sm">{`${errors.name.message}`}</span>}
      </div>
      {/* Add other inputs */}
      <div className="flex gap-7 w-full items-center mt-5">
        <div className="w-[200px]">
          <Button
            onClick={() => setIsModalOpen(true)} // Open the modal on submit
            className="bg-normal-300 w-full text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Submit</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
