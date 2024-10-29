import React from "react";
import { Link } from "react-router-dom";
import { urlFor } from "../../../supporthive/sanity.cli";
import { Image } from "../../types/images";
import NumberFormat from "../../utils/numberFormat";

export interface CampaignCardProps {
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number | null;
  daysLeft: number;
  images?: Image[];
  _id: string | undefined;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  title,
  description,
  goalAmount,
  raisedAmount,
  daysLeft,
  images,
  _id,
}) => {
  // const progress = (raisedAmount / goalAmount) * 100;
  const isExpired = daysLeft <= 0;

  return (
    <div className="border border-green-500 rounded-lg p-4 mb-4 flex flex-col gap-2 shadow-sm">
      <img
        src={images ? urlFor(images[0]) : ""}
        alt={title}
        className="w-full h-[150px] object-cover rounded-md"
      />
      <h3 className="font-bold text-lg truncate">{title}</h3>
      <p className="line-clamp-2 text-[#555657] ">{description}</p>
      <div className="space-y-2 flex items-center justify-between border-t w-full border-gray-200">
        <div className="flex flex-col items-start gap-2">
          <p>Goal Amount</p>
          <NumberFormat value={goalAmount !== null ? goalAmount : "N/A"} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <p>Raised Amount</p>
          <NumberFormat value={raisedAmount !== null ? raisedAmount : "N/A"} />
        </div>
      </div>
      <p className={`text-xs ${isExpired ? "text-red-500" : "text-green-500"}`}>
        {isExpired ? "Campaign Expired" : `Expires in ${daysLeft} days`}
      </p>
      <Link to={isExpired ? "#" : `/dashboard/campaign/${_id}`}>
        <button
          className="mt-4 text-green-500 px-4 py-2 rounded-md w-full border border-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isExpired}
        >
          {isExpired ? "Expired" : "View Project"}
        </button>
      </Link>
    </div>
  );
};

export default CampaignCard;
