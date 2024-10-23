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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<TCampaignSchema>();

  const [banks, setBanks] = useState<{ name: string; code: string; }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [campaignData, setCampaignData] = useState<TCampaignSchema | null>(null); 
  const navigate = useNavigate();
  const userDetails = useSelector((state: RootState) => state.user);
  const sanityID = userDetails.userDetails._id;

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("https://api.paystack.co/bank", {
          headers: {
            Authorization: `Bearer ${process.env.VITE_PAYSTACK_KEY}`,
          },
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
      const response = await axios.post(
        "https://api.paystack.co/subaccount",
        subAccountData,
        {
          headers: {
            Authorization: `Bearer ${process.env.VITE_PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating sub-account");
    }
  };

 
  const handleConfirmSubmit = async () => {
    if (!campaignData || !sanityID) return;

    const startDate = new Date(campaignData.startDate);
    const endDate = new Date(campaignData.endDate);

    const campaignPayload = {
      ...campaignData,
      startDate,
      endDate,
      userId: sanityID,
      images: campaignData.images
        ? Array.isArray(campaignData.images)
          ? campaignData.images
          : [campaignData.images]
        : [],
      supportingDocuments: campaignData.supportingDocuments
        ? Array.isArray(campaignData.supportingDocuments)
          ? campaignData.supportingDocuments
          : [campaignData.supportingDocuments]
        : [],
    };

    
    const subAccount = await createSubAccount(campaignPayload);
    campaignPayload.subAccountId = subAccount.subaccount_code;
    await createCampaign(campaignPayload);

    
    navigate("/dashboard/campaigns");
    setIsModalOpen(false); 
  };

  
  const handleOpenModal = (data: TCampaignSchema) => {
    setCampaignData(data); 
    setIsModalOpen(true); 
  };

  return (
    <div className="lg:w-[60%] pb-10 space-y-5">
     
      <div className="flex flex-col gap-y-1">
        <Input
          label="Name"
          {...register("name")}
          placeholder="Enter your name"
          type="text"
          id="name"
          autoComplete="on"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{`${errors.name.message}`}</span>
        )}
      </div>
      <div className="flex w-full gap-4">
        <div className="flex flex-col gap-y-1 w-full">
          <Input
            label="Email Address"
            {...register("email")}
            placeholder="Enter your Email Address"
            type="text"
            id="email"
            autoComplete="on"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{`${errors.email.message}`}</span>
          )}
        </div>
        <div className="flex flex-col gap-y-1 w-full">
          <Input
            label="Phone Number"
            {...register("phone")}
            placeholder="Enter your phone number"
            type="text"
            id="number"
            autoComplete="on"
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{`${errors.phone.message}`}</span>
          )}
        </div>
      </div>
      <div className="flex w-full gap-4">
        <div className="flex flex-col gap-y-1 w-full">
          <Input
            label="Account Number"
            {...register("accountNumber")}
            placeholder="Enter your account number"
            type="text"
            id="number"
            autoComplete="on"
          />
          {errors.accountNumber && (
            <span className="text-red-500 text-sm">{`${errors.accountNumber.message}`}</span>
          )}
        </div>
        <div className="flex flex-col gap-y-1 w-full">
          <label className="text-left font-light capitalize text-black text-[14px]">
            Select Your Bank <span className="text-red-500">*</span>
          </label>
          <select
            id="bank"
            {...register("bank")}
            className="w-full rounded-md border border-gray-100 bg-transparent px-4 py-4 text-base font-light  focus:ring-1 ring-black outline-none"
          >
            <option value="" disabled>
              Select option
            </option>
            {banks.map((bank, index) => (
              <option key={index} value={bank.code}>
                {bank.name}
              </option>
            ))}
          </select>
          {errors.bank && (
            <span className="text-red-500 text-sm">{`${errors.bank.message}`}</span>
          )}
        </div>
      </div>

     
      <div className="flex gap-7 w-full items-center mt-5">
        <div className="w-[200px]">
          <Button
            onClick={handleSubmit(handleOpenModal)} 
            className="bg-normal-300 w-full text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Submit</span>
          </Button>
        </div>
      </div>

     
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmSubmit} 
      />
    </div>
  );
};

export default ContactInformation;
