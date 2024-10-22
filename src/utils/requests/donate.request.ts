import axios from "axios";

export const handlePaymentInitialization = async (campaignData: any) => {
  console.log(campaignData, "real data");

  const url = "https://api.paystack.co/transaction/initialize";
  const headers = {
    Authorization: `Bearer ${process.env.VITE_PAYSTACK_SECRET_KEY}`, // Use your secret key
    "Content-Type": "application/json",
  };

  const data = {
    email: campaignData.email,
    amount: campaignData.amount * 100,
    subaccount: campaignData.subAccountId,
    transaction_charge: 100,
    bearer: "subaccount",
  };

  try {
    const response = await axios.post(url, data, { headers });
    const { authorization_url } = response.data.data;

    // Redirect the user to Paystack payment page
    window.location.href = authorization_url;
  } catch (error) {
    console.error("Payment initialization error: ", error);
  }
};
