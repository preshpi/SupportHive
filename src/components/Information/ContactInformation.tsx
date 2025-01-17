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
import { toast } from "sonner";

const ContactInformation = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useFormContext<TCampaignSchema>();

  const [banks, setBanks] = useState<{ name: string; code: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        toast.error("Error fetching banks");
      }
    };

    fetchBanks();
  }, []);

  const createSubAccount = async (data: TCampaignSchema) => {
    const subAccountData = {
      business_name: data.title,
      settlement_bank: data.bank,
      account_number: data.accountNumber,
      percentage_charge: 30,
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
      const errorResponse = error as {
        response: {
          data: {
            status: boolean;
            message: string;
            meta: {
              nextStep: string;
            };
            type: string;
            code: string;
          };
        };
      };

      if (errorResponse.response.data.type === "validation_error") {
        toast.error(
          `${errorResponse.response.data.message}: ${errorResponse.response.data.meta.nextStep}`
        );
      } else {
        toast.error(errorResponse.response.data.message);
      }
    }
  };

  const onSubmit = async (data: TCampaignSchema) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const isValid = await trigger([
      "bank",
      "accountNumber",
      "name",
      "email",
      "phone",
    ]);

    if (!isValid) {
      toast.error(`Validation Errors: ${JSON.stringify(errors)}`); // Log errors to see the issues
      return;
    }

    const campaignData = {
      ...data,
      startDate,
      endDate,
      userId: sanityID,
      images: data.images,
      // supportingDocuments: data.supportingDocuments,
    };

    if (sanityID) {
      const subAccount = await createSubAccount(campaignData);
      campaignData.subAccountId = subAccount?.subaccount_code;

      console.log(campaignData);

      await createCampaign(campaignData);
    }
    navigate("/dashboard/profile");
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    handleSubmit(onSubmit);
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

        <div className="flex flex-col w-full gap-y-1">
          <Input
            label="Select Your Bank "
            id="bank"
            {...register("bank")}
            placeholder="Select option"
            type="select"
            optionsKey={banks.map((bank) => ({
              key: bank.code,
              value: bank.name,
            }))}
            autoComplete="on"
          />
          {errors.bank && (
            <span className="text-red-500 text-sm">{`${errors.bank.message}`}</span>
          )}
        </div>
      </div>

      <div className="flex gap-7 w-full items-center mt-5">
        <div className="w-[200px]">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="bg-normal-300 w-full text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Submit</span>
          </Button>
        </div>
      </div>

      {/* <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmit}
      /> */}
    </div>
  );
};

export default ContactInformation;
