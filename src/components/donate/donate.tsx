import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { donationSchema, TDonationSchema } from "../../types/donate";
import { Button } from "../Button";
import Input from "../Inputs";
import { fetchAllCampaigns } from "../../../supporthive/sanity.query";
import { handlePaymentInitialization } from "../../utils/requests/donate.request";

const Donate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TDonationSchema>({ resolver: zodResolver(donationSchema) });

  const onSubmit = async (data: TDonationSchema) => {
    console.log(data);

    try {
      const fetchedCampaigns = await fetchAllCampaigns();
      const singleCampaign = fetchedCampaigns[10];
      console.log(singleCampaign);

      const subAccount = singleCampaign.subaccount_code;
      console.log(subAccount);

      const donationData = {
        amount: data.amount,
        email: data.email,
        subAccountId: "ACCT_cnhjmr3cqvyfe8h",
      };
      console.log(donationData);

      handlePaymentInitialization(donationData);
      reset();
    } catch (error) {
      console.log((error as { message: string }).message);
    }
  };
  return (
    <form className="flex flex-col gap-y-4">
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

      <Button
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        loading={isSubmitting}
        className="bg-normal-300 text-white text-sm disabled:cursor-not-allowed disabled:opacity-40"
      >
        Donate
      </Button>
    </form>
  );
};

export default Donate;
