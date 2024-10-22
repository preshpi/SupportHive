import { useFormContext } from "react-hook-form";
import Input from "../Inputs";
import { Button } from "../Button";
import { TCampaignSchema } from "../../types/campaign";
import { useSelector } from "react-redux";
import { createCampaign } from "../../utils/requests/campaign.request";
import { RootState } from "../../redux/store";
import axios from "axios";
import { useEffect, useState } from "react";

interface ContactInformationProps {
  hideForm: () => void; // Add hideForm as a prop
}

const ContactInformation: React.FC<ContactInformationProps> = ({
  hideForm,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<TCampaignSchema>();
  const [banks, setBanks] = useState<{ name: string; code: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const userDetails = useSelector((state: RootState) => state.user);

  const sanityID = userDetails.userDetails._id;

  useEffect(() => {
    const fetchBanks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://api.paystack.co/bank", {
          headers: {
            Authorization: `Bearer ${process.env.VITE_PAYSTACK_KEY}`,
          },
        });
        setBanks(response.data.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBanks();
  }, []);

  const createSubAccount = async (data: TCampaignSchema) => {
    const subAccountData = {
      business_name: data.title, // campaign's name
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

  const onSubmit = async (data: TCampaignSchema) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    const campaignData = {
      ...data,
      startDate,
      endDate,
      userId: sanityID,
      images: data.images
        ? Array.isArray(data.images)
          ? data.images
          : [data.images]
        : [],
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

    // hideForm();
  };

  return (
    <div className="lg:w-[70%] space-y-5">
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
              </option> // Display name, use code as value
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
            onClick={handleSubmit(onSubmit)}
            className="bg-normal-300 w-full  text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Submit</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
