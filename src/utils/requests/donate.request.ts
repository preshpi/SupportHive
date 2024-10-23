import axios from "axios";
import { donateSchema } from "../../types/donate";
import { toast } from "sonner";

export const handlePaymentInitialization = async (
  campaignData: donateSchema
) => {
  const url = "https://api.paystack.co/transaction/initialize";
  const headers = {
    Authorization: `Bearer ${process.env.VITE_PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const data = {
    email: campaignData.email,
    amount: campaignData.amount * 100,
    subaccount: campaignData.subAccountId,
    transaction_charge: 100,
    bearer: "subaccount",
    callback_url: "http://localhost:5001/dashboard/transactions",
    metadata: {
      userId: campaignData.userId,
    },
  };

  try {
    const response = await axios.post(url, data, { headers });
    const { authorization_url } = response.data.data;

    window.location.href = authorization_url;
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};
