import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

export const campaignSchema = z.object({
  title: z.string().min(1, "Campaign Title is required"),
  country: z.string().min(1, "Campaign Country is required"),
  city: z.string().min(1, "Campaign City is required"),
  category: z.enum(
    [
      "Education",
      "Health",
      "Emergency Assistance",
      "Community Development",
      "Career",
      "other",
    ],
    { required_error: "Campaign Category is required" }
  ),
  description: z.string().min(1, "Campaign Description is required"),
  goalAmount: z.string().min(1, "Campaign Goal Amount is required"),
  startDate: z.coerce
    .date()
    .min(new Date(), "Campaign Start Date must be in the future"),
  endDate: z.coerce
    .date()
    .refine(
      (val) => val > new Date(),
      "Campaign End Date must be after the Start Date"
    ),
  raiseMoneyFor: z.string().min(200, "must be at least 200 words"),
  importance: z.string().min(200, "must be at least 200 words"),
  impact: z.string().min(200, "must be at least 200 words"),
  images: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  supportingDocuments: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max document size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_DOCUMENT_TYPES.includes(files?.[0]?.type),
      "Only flipdf, doc, docx, ppt, pptx formats are supported."
    ),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone Number must be at least 10 characters"),
  bank: z.string().min(1, "bank code is required"),
  accountNumber: z.string().min(1, "account number is required"),
  subAccountId: z.string().optional(),
});

export type TCampaignSchema = z.infer<typeof campaignSchema>;

export type createCampaignProps = {
  title: string;
  country: string;
  city: string;
  category:
    | "Education"
    | "Health"
    | "other"
    | "Emergency Assistance"
    | "Community Development"
    | "Career";
  description: string;
  goalAmount: string;
  startDate: Date;
  endDate: Date;
  importance: string;
  raiseMoneyFor: string;
  impact: string;
  images: FileList;
  supportingDocuments: FileList;
  name: string;
  email: string;
  phone: string;
  userId: string | undefined;
  bank: string | undefined;
  accountNumber: string | undefined;
  subAccountId?: string;
  status?: "pending" | "approved" | "rejected";
};

export interface fetchCampaign {
  _id: string;
  importance: string;
  createdBy: {
    _id: string;
    email: string;
  };
  title: string;
  category: string;
  endDate: string;
  impact: string;
  status: string;
  city: string;
  description: string;
  startDate: string;
  country: string;
  goalAmount: any;
  raiseMoneyFor: string;
  bank: string | undefined;
  accountNumber: string | undefined;
  subAccountId?: string;
  name?: string;
  phone?: string;
  images?: Image[];
  supportingDocuments?: FileDocument[];
}

interface ImageAsset {
  _ref: string;
  _type: "reference";
}

interface Image {
  _type: "image";
  _key: string;
  asset: ImageAsset;
}

interface FileAsset {
  _ref: string;
  _type: "reference";
}

interface FileDocument {
  _type: "file";
  _key: string;
  asset: FileAsset;
}
