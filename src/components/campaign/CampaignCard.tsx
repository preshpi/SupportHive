import React from "react";
import { Link } from "react-router-dom";


interface CampaignCardProps {
    title: string;
    description: string;
    goalAmount: number;
    raisedAmount: number;
    daysLeft: number;
    imageUrl: string;
     _id: string | undefined
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

    return (
        <div className="border border-green-500 rounded-lg p-4 mb-4 shadow-sm ">
            <img src={imageUrl} alt={title} className="w-full object-cover rounded-md mb-2" />
            <h3 className="font-bold text-lg">{title}</h3>
            <p>{description}</p>
            <div className="mt-2">
                <p className="text-sm">Goal: ₦{goalAmount.toLocaleString()}</p>
                <div className="w-full bg-gray-200 h-2 rounded-md overflow-hidden mt-1">
                    <div className="bg-green-500 h-full" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="mt-1 text-sm">{`₦${raisedAmount.toLocaleString()} Raised`}</p>
                <p className="text-red-500 text-xs">{`Expires in ${daysLeft} days`}</p>
            </div>
            
            <Link to={`/dashboard/campaign/${_id}`}>
            <button className="mt-4 text-green-500 px-4 py-2 rounded-md w-full border border-green-500 ">
                View Project
            </button>
            </Link>
        </div>
    );
};

export default CampaignCard;
