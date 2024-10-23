import React, { useEffect, useState } from "react";
import Input from "../components/Inputs";
import { useForm } from "react-hook-form";
import {
  createvirtualAccountSchema,
  TcreatevirtualAccountSchema,
} from "../types/createVA";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "../components/Button";
import { fetchCampaign } from "../utils/requests/campaign.request";

const CreateVirtualAccount = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TcreatevirtualAccountSchema>({
    resolver: zodResolver(createvirtualAccountSchema),
  });

  const [banks, setBanks] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [campaignId, setCampaignId] = useState<string>("");

  useEffect(() => {
    const fetchBanks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://api.paystack.co/bank", {
          headers: {
            Authorization: `Bearer ${process.env.VITE_PAYSTACK_KEY}`,
          },
        });
        console.log(response.data.data);

        setBanks(response.data.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBanks();
  }, []);

  // Fetch campaigns and get the campaignId
  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const campaigns = await fetchCampaign(); // Fetch the campaigns
        console.log(campaigns, "cajjfjf");

        if (campaigns && campaigns.length > 0) {
          setCampaignId(campaigns[0]._id); // Assuming you want to use the first campaign's _id
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    };

    loadCampaigns();
  }, []);

  const onSubmit = async (data: TcreatevirtualAccountSchema) => {
    try {
      const response = await axios.post(
        "https://api.paystack.co/customer",
        {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.VITE_PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error registering customer with Paystack:", error);
    }
  };

  return (
    <form className="flex flex-col max-w-[500px]  gap-y-6 gap-x-4">
      <div className="flex gap-4 w-full">
        <div className="flex flex-col gap-y-1 w-full">
          <Input
            label="First Name"
            id="first-name"
            {...register("first_name")}
            placeholder="Enter first name"
            type="text"
            autoComplete="on"
          />
          {errors.first_name && (
            <span className="text-red-500 text-sm">{`${errors.first_name.message}`}</span>
          )}
        </div>

        <div className="flex flex-col gap-y-1 w-full">
          <Input
            label="Last Name"
            {...register("last_name")}
            id="last-name"
            placeholder="Enter last name"
            type="text"
            autoComplete="on"
          />
          {errors.last_name && (
            <span className="text-red-500 text-sm">{`${errors.last_name.message}`}</span>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-y-1 w-full">
          <Input
            label="Email Address"
            {...register("email")}
            id="email"
            placeholder="Enter email address"
            type="email"
            autoComplete="on"
          />

          {errors.email && (
            <span className="text-red-500 text-sm">{`${errors.email.message}`}</span>
          )}
        </div>
        <div className="flex flex-col gap-y-1 w-full">
          <Input
            label="Account Number"
            id="account-number"
            {...register("accountNumber")}
            placeholder="Enter account number"
            type="text"
            autoComplete="on"
          />
          {errors.accountNumber && (
            <span className="text-red-500 text-sm">{`${errors.accountNumber.message}`}</span>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-y-1 w-full">
          <Input
            label="Phone Number"
            id="phone-number"
            {...register("phone")}
            placeholder="Enter phone number"
            type="text"
            autoComplete="on"
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{`${errors.phone.message}`}</span>
          )}
        </div>
        <div className="flex flex-col gap-y-1 w-full">
          <Input
            label="Select Your Bank"
            id="selectedBank"
            {...register("selectedBank")}
            placeholder="Select option"
            type="select"
            options={banks.map((bank) => bank.name)}
            autoComplete="on"
          />
          {errors.selectedBank && (
            <span className="text-red-500 text-sm">{`${errors.selectedBank.message}`}</span>
          )}
        </div>
      </div>
      <div className="max-w-[200px] ">
        <Button
          onClick={handleSubmit(onSubmit)}
          className="bg-normal-300 w-full  text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Link Account
        </Button>
      </div>{" "}
    </form>
  );
};

export default CreateVirtualAccount;
