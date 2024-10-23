import React from "react";
import { Link } from "react-router-dom";

export interface CampaignCardProps {
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  daysLeft: number;
  imageUrl: string;
  _id: string | undefined;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  title,
  description,
  goalAmount,
  raisedAmount,
  daysLeft,
  imageUrl,
  _id,
}) => {
  const progress = (raisedAmount / goalAmount) * 100;
  const isExpired = daysLeft <= 0;

  return (
    <div className="border border-green-500 rounded-lg p-4 mb-4 flex flex-col gap-2 shadow-sm">
      <img
        src={imageUrl}
        alt={title}
        className="w-full object-cover rounded-md"
      />
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="line-clamp-2 text-[#555657]">{description}</p>
      <div className="space-y-2">
        <p className="text-sm">Goal: ₦{goalAmount.toLocaleString()}</p>
        <div className="w-full bg-gray-200 h-2 rounded-md overflow-hidden mt-1">
          <div
            className="bg-green-500 h-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-1 text-sm">{`₦${raisedAmount.toLocaleString()} Raised`}</p>

        <p
          className={`text-xs ${isExpired ? "text-red-500" : "text-green-500"}`}
        >
          {isExpired ? "Campaign Expired" : `Expires in ${daysLeft} days`}
        </p>
      </div>

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
