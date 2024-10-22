import axios from "axios";
import { client } from "../../../supporthive/sanity.cli";

export const fetchUserTransactions = async (userId: string | undefined) => {
  console.log(userId);

  if (!userId) {
    console.log("User ID is undefined");
    return;
  }

  const query = `*[_type == "user" && _id == $_id][0]`;

  const checkSanityId = await client.fetch(query, { _id: userId });

  if (!checkSanityId) {
    console.log("user not found");
    return;
  }

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
    console.error("Error fetching user transactions:", error);
  }
};
