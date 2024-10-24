import NumberFormat from "../utils/numberFormat";

type SpotLightCardProps = {
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  daysLeft: number;
  imageUrl: string;
  _id: string | undefined;
};

export const SpotLightCard: React.FC<SpotLightCardProps> = ({
  title,
  description,
  goalAmount,
  raisedAmount,
  daysLeft,
  imageUrl,
  _id,
}) => {
  return (
    <div className="bg-white border border-[#F9F9F9] space-y-2 rounded-lg p-4 group transform transition-transform duration-300 group-hover:shadow-lg shadow-sm">
      <img
        src={imageUrl}
        alt={title}
        className="w-[366px] h-[271px] rounded-lg group-hover:scale-105 transition-transform duration-300"
      />
      <p className="font-semibold text-[20px]">{title}</p>
      <p className="text-black/80 text-[16px] line-clamp-2">{description}</p>
      <p className="text-[14px] border-t border-Light-200 py-2">
        By{" "}
        <span className="semi-bold text-[#28A745]">
          community Health Initiatives
        </span>
      </p>

      <div className="w-full bg-gray-200 rounded-full h-[5px]">
        <div className="bg-[#28A745] h-full rounded-full" />
      </div>
      <div className="flex items-center gap-x-2">
        <p>Goal amount - </p>
        <NumberFormat
          className="text-[16px] font-semibold"
          value={goalAmount}
        />
      </div>
    </div>
  );
};
