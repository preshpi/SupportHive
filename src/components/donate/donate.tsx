import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { donationSchema, TDonationSchema } from "../../types/donate";
import { Button } from "../Button";
import Input from "../Inputs";
import { fetchCampaignById } from "../../../supporthive/sanity.query";
import { handlePaymentInitialization } from "../../utils/requests/donate.request";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppSelector } from "../../hook/redux.hook";
import { RootState } from "../../redux/store";

const Donate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TDonationSchema>({ resolver: zodResolver(donationSchema) });
  const [subAccount, setSubAccount] = useState<string>("");
  const userDetails = useAppSelector((state: RootState) => state.user);
  const sanityID = userDetails.userDetails._id;
  const { id } = useParams();

  useEffect(() => {
    const getCampaignDetail = async () => {
      try {
        const data = await fetchCampaignById(id);
        setSubAccount(data.subAccountId);
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    };

    getCampaignDetail();
  }, [id]);

  const onSubmit = async (data: TDonationSchema) => {
    try {
      if (sanityID) {
        const donationData = {
          amount: data.amount,
          email: data.email,
          subAccountId: subAccount,
          userId: sanityID,
          campaignId: id,
        };
        handlePaymentInitialization(donationData);
        reset();
      }
    } catch (error) {
      toast.error((error as { message: string }).message);
    }
  };
  return (
    <form className="flex flex-col gap-y-4 py-10 max-w-[500px]">
      <div className="flex flex-col gap-y-1">
        <Input
          label="How much do you want to donate?"
          id="amount"
          {...register("amount")}
          placeholder="Enter amount"
          type="number"
          autoComplete="on"
        />

        {errors.amount && (
          <span className="text-red-500 text-sm">{`${errors.amount.message}`}</span>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
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
      <div className="w-[200px]">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          loading={isSubmitting}
          className="bg-normal-300 text-white text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Pay now!
        </Button>
      </div>
    </form>
  );
};

export default Donate;
