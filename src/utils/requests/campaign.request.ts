import { toast } from "sonner";
import { client } from "../../../supporthive/sanity.cli";
import { createCampaignProps } from "../../types/campaign";
import { fetchAllCampaigns } from "../../../supporthive/sanity.query";

export const createCampaign = async (data: createCampaignProps) => {
  const sanityId = data.userId;

  if (!sanityId) {
    console.log("User ID is undefined");
    return;
  }

  const query = `*[_type == "user" && _id == $_id][0]`;

  const checkSanityId = await client.fetch(query, { _id: sanityId });

  if (!checkSanityId) {
    console.log("user not found");
    return;
  }

  try {
    const campaignDoc = {
      _type: "campaign", // The schema type you're saving to
      title: data.title,
      country: data.country,
      city: data.city,
      category: data.category,
      description: data.description,
      goalAmount: data.goalAmount,
      startDate: data.startDate,
      endDate: data.endDate,
      raiseMoneyFor: data.raiseMoneyFor,
      importance: data.importance,
      impact: data.impact,
      status: "pending", // Campaign starts as pending
      createdBy: {
        _type: "reference",
        _ref: sanityId, // Reference the user who created the campaign
      },
      name: data.name,
      email: data.email,
      phone: data.phone,
      bank: data.bank,
      accountNumber: data.accountNumber,
      subAccountId: data.subAccountId,
    };

    // Save to Sanity
    await client.create(campaignDoc);
    toast.success("Campaign created");
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};

export const fetchCampaign = async () => {
  try {
    const fetchedCampaigns = await fetchAllCampaigns(); // Assuming this returns an array of campaigns
    console.log(fetchedCampaigns);
    return fetchedCampaigns; // Return the fetched campaigns
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};
