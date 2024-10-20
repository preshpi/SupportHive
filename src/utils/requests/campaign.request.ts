import { toast } from "sonner";
import { client } from "../../../supporthive/sanity.cli";
import { createCampaignProps } from "../../types/campaign";

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
    };

    // Save to Sanity
    const result = await client.create(campaignDoc);
    toast.success("Campaign created:", result);
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};
