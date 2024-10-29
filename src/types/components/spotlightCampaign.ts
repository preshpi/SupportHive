import { Image } from "../images";

export type spotlightCampaign = {
  _id: string;
  title: string;
  country: string;
  city: string;
  category: string;
  description: string;
  goalAmount: number;
  startDate: string;
  endDate: string;
  raiseMoneyFor: string;
  importance: string;
  images: Image[];
  impact: string;
  status: string;
  createdBy: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
};
