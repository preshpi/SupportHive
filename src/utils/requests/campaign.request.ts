import { toast } from "sonner";
import { client } from "../../../supporthive/sanity.cli";
import { createCampaignProps } from "../../types/campaign";
import {
  fetchAllCampaigns,
  fetchApprovedCampaigns,
  fetchPendingCampaigns,
  fetchRejectedCampaigns,
} from "../../../supporthive/sanity.query";
import { v4 as uuidv4 } from "uuid";
import { Buffer } from "buffer";

export const createCampaign = async (data: createCampaignProps) => {
  const sanityId = data.userId;

  const readFileAsDataURL = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  async function uploadImage(file: File | null) {
    if (!file) {
      toast.error("No file provided.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("One or more files are not valid images.");
      return;
    }

    const image = await readFileAsDataURL(file);
    const contentType = file.type;
    const fileName = file.name;

    try {
      const buffer = Buffer.from(image.split(",")[1], "base64");
      const asset = await client.assets.upload("image", buffer, {
        filename: fileName,
        contentType: contentType,
      });
      return asset;
    } catch (error) {
      toast.error((error as { message: string }).message);
    }
  }

  async function uploadFile(file: File | null) {
    if (!file) {
      toast.error("No file provided.");
      return;
    }
    if (!file.type.startsWith("application/")) {
      toast.error("One or more files are not valid images.");
    }
    const contentType = file.type;
    const fileName = file.name;

    try {
      const asset = await client.assets.upload("file", file, {
        filename: fileName,
        contentType: contentType,
      });
      return asset;
    } catch (error) {
      toast.error("error");
    }
  }

  // const fileData = data.supportingDocuments;
  // const filesArray = Array.from({ length: fileData.length }, (_, index) =>
  //   fileData.item(index)
  // );
  // uploadFile(filesArray[0]);

  const imagesData = data.images;
  const imagesArray = Array.from({ length: imagesData.length }, (_, index) =>
    imagesData.item(index)
  );

  async function campaignRequest(data: createCampaignProps) {
    const { status } = data;
    const campaignStatus = !status ? "pending" : status;
    try {
      const images = await Promise.all(
        imagesArray.map((file: any) => uploadImage(file))
      );

      // const supportingDocuments = await Promise.all(
      //   filesArray.map((file) => uploadFile(file))
      // );

      const result = await client.create({
        _type: "campaign",
        createdBy: {
          _type: "reference",
          _ref: sanityId,
        },
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
        images: images.map((image: any) => ({
          _key: uuidv4(),
          _type: "image",
          asset: {
            _ref: image._id,
            _type: "reference",
          },
        })),
        // supportingDocuments: supportingDocuments.map((doc) => ({
        //   _key: uuidv4(),
        //   _type: "file",
        //   asset: {
        //     _ref: doc?._id,
        //     _type: "reference",
        //   },
        // })),
        name: data.name,
        email: data.email,
        phone: data.phone,
        bank: data.bank,
        accountNumber: data.accountNumber,
        subAccountId: data.subAccountId,
        status: campaignStatus,
      });
      return result;
    } catch (error) {
      toast.error((error as { message: string }).message);
    }
  }

  campaignRequest(data);
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
