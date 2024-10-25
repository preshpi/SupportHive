import axios from "axios";
import { toast } from "sonner";

export const fetchUserTransactions = async (userId: string | undefined) => {
  const url = `https://api.paystack.co/transaction`;
  const headers = {
    Authorization: `Bearer ${process.env.VITE_PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(url, {
      headers,
    });

    const transactions = response.data.data;
    const userTransactions = transactions.filter((transaction: any) => {
      return transaction.metadata && transaction.metadata.userId === userId;
    });

    return userTransactions;
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};

export const calculateTotalDonationForUser = async (
  userId: string | undefined
) => {
  try {
    const userTransactions = await fetchUserTransactions(userId);

    // Calculate total donation amount for the user
    const totalAmount = userTransactions.reduce(
      (acc: number, transaction: any) => {
        return acc + transaction.amount;
      },
      0
    );

    return totalAmount / 100; // Convert kobo to Naira
  } catch (error) {
    toast.error((error as { message: string }).message);
    return 0;
  }
};

export const getTotalDonors = async (userId: string | undefined) => {
  try {
    const userTransactions = await fetchUserTransactions(userId);
    const donors: number = userTransactions.length;

    return donors;
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};

export const calculateTotalAmountForCampaign = async (
  campaignId: string | undefined
) => {
  const url = `https://api.paystack.co/transaction`;
  const headers = {
    Authorization: `Bearer ${process.env.VITE_PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(url, { headers });
    const transactions = response.data.data;

    // Filter transactions by campaignId
    const campaignTransactions = transactions.filter((transaction: any) => {
      return (
        transaction.metadata &&
        transaction.metadata.campaignId === campaignId &&
        transaction.status === "success"
      );
    });

    // Calculate total amount for the campaign
    const totalAmount = campaignTransactions.reduce(
      (acc: number, transaction: any) => {
        return acc + transaction.amount;
      },
      0
    );

    return totalAmount / 100; // Convert kobo to Naira
  } catch (error) {
    toast.error((error as { message: string }).message);
    return 0;
  }
};
