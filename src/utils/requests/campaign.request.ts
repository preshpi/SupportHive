import { toast } from "sonner";
import { client } from "../../../supporthive/sanity.cli";
import { createCampaignProps } from "../../types/campaign";
import {
  fetchAllCampaigns,
  fetchApprovedCampaigns,
  fetchPendingCampaigns,
  fetchRejectedCampaigns,
} from "../../../supporthive/sanity.query";

export const createCampaign = async (data: createCampaignProps) => {
  const sanityId = data.userId;

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
    return fetchedCampaigns; // Return the fetched campaigns
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};

export const getTotalCampaigns = async (userId: string | undefined) => {
  try {
    const getallCampaigns = await fetchAllCampaigns();
    const userCampaigns = getallCampaigns.filter((campaign: any) => {
      return campaign.createdBy._id === userId;
    });
    const totalCampaigns = userCampaigns.length;
    return totalCampaigns;
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};

// fetch campaign by user who created it in different status
export const userApprovedCampaigns = async (userId: string | undefined) => {
  try {
    const approvedCampaigns = await fetchApprovedCampaigns();

    const userApprovedCampaigns = approvedCampaigns.filter((campaign: any) => {
      return campaign.createdBy._id === userId;
    });
    return userApprovedCampaigns;
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};

export const userPendingCampaigns = async (userId: string | undefined) => {
  try {
    const pendingCampaigns = await fetchPendingCampaigns();

    const userPendingCampaigns = pendingCampaigns.filter((campaign: any) => {
      return campaign.createdBy._id === userId;
    });
    return userPendingCampaigns;
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};

export const userRejectedCampaigns = async (userId: string | undefined) => {
  try {
    const rejectedCampaigns = await fetchRejectedCampaigns();

    const userRejectedCampaigns = rejectedCampaigns.filter((campaign: any) => {
      return campaign.createdBy._id === userId;
    });
    return userRejectedCampaigns;
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};

export const userAllCampaigns = async (userId: string | undefined) => {
  try {
    const allCampaigns = await fetchAllCampaigns();

    const userAllCampaigns = allCampaigns.filter((campaign: any) => {
      return campaign.createdBy._id === userId;
    });
    return userAllCampaigns;
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};

export const userDeletedCampaigns = async (userId: string | undefined) => {
  try {
    const deleteCampaigns = await fetchAllCampaigns();

    const userDeleteCampaigns = deleteCampaigns.filter((campaign: any) => {
      return campaign.createdBy._id === userId;
    });
    return userDeleteCampaigns;
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};
