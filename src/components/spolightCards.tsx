import { Link } from "react-router-dom";
import { urlFor } from "../../supporthive/sanity.cli";
import { Image } from "../types/images";
import NumberFormat from "../utils/numberFormat";

type SpotLightCardProps = {
  title: string;
  description: string;
  goalAmount: number;
  images: Image[];
  raisedAmount: number | null;
  _id: string;
  createdBy: string;
};

export const SpotLightCard: React.FC<SpotLightCardProps> = ({
  title,
  description,
  goalAmount,
  images,
  _id,
  createdBy,
}) => {
  // const amount = raisedAmount && raisedAmount * 100;
  // console.log(amount, "amount");

  // const progressPercentage = ((raisedAmount ?? 0) / goalAmount) * 100;
  // console.log(progressPercentage, "progressPercentage");

  return (
    <Link to={`/dashboard/campaign/${_id}`}>
      <div className="bg-white border border-[#F9F9F9] space-y-2 rounded-lg p-4 group transform transition-transform duration-300 group-hover:shadow-lg shadow-sm">
        <img
          src={images ? urlFor(images[0]) : ""}
          alt={title}
          className="h-[300px] w-full rounded-lg group-hover:scale-105 transition-transform duration-300 object-cover"
        />
        <p className="font-semibold text-[20px] truncate">{title}</p>
        <p className="text-black/80 text-[16px] line-clamp-2">{description}</p>
        <p className="text-[14px] border-t border-Light-200 py-2">
          By <span className="semi-bold text-[#28A745]">{createdBy}</span>
        </p>
        {/* 
      <input
        type="range"
        min="0"
        max="100"
        value={Math.min(progressPercentage, 100)}
        className="w-60 h-[15px] appearance-none bg-gray-200 rounded-full my-2"
        style={{
          background: `linear-gradient(to right, #28A745 ${progressPercentage}%, #E5E7EB ${progressPercentage}%)`, // Green progress and gray for the rest
        }}
        disabled
      /> */}
        <div className="flex items-center gap-x-2">
          <p>Goal amount - </p>
          <NumberFormat
            className="text-[16px] font-semibold"
            value={goalAmount}
          />
        </div>
      </div>
    </Link>
  );
};
