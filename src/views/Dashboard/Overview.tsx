import { useEffect, useState } from "react";
import { useAppSelector } from "../../hook/redux.hook";
import { RootState } from "../../redux/store";
import { toast } from "sonner";
import {
  calculateTotalDonationForUser,
  getTotalDonors,
} from "../../utils/requests/transactions.request";
import NumberFormat from "../../utils/numberFormat";
import { getTotalCampaigns } from "../../utils/requests/campaign.request";
import { fetchApprovedCampaigns } from "../../../supporthive/sanity.query";

type Campaign = {
  _id: string;
  title: string;
  description: string;
};

export const OverviewCards = ({
  title,
  amount,
  number,
}: {
  title: string;
  amount?: number | null;
  number?: number | null;
}) => {
  return (
    <div className="flex flex-col w-full border border-[#EEEEEE] bg-[#FAFAFA] rounded-lg p-4 gap-y-[27px]">
      <h3 className="text-[#777777] text-[16px] ">{title}</h3>

      {amount ? (
        <NumberFormat
          className="text-[24px] font-semibold"
          value={amount ?? "0"}
        />
      ) : (
        <p className="text-[24px] font-semibold">{number ?? "0"}</p>
      )}
    </div>
  );
};
const Overview = () => {
  const [totalAmount, setTotalAmount] = useState<number | undefined>();
  const [totalDonors, setTotalDonors] = useState<number | undefined>();
  const [totalCampaigns, setTotalCampaigns] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);
  const [approvedCampaigns, setApprovedCampaigns] = useState<Campaign[]>([]);

  const userDetails = useAppSelector((state: RootState) => state.user);
  const userId = userDetails.userDetails._id;

  useEffect(() => {
    const getTotalAmount = async () => {
      try {
        if (userId) {
          const response = await Promise.allSettled([
            calculateTotalDonationForUser(userId),
            getTotalDonors(userId),
            getTotalCampaigns(userId),
          ]);
          setTotalAmount(
            response[0].status === "fulfilled" ? response[0].value : undefined
          );
          setTotalDonors(
            response[1].status === "fulfilled" ? response[1].value : undefined
          );
          setTotalCampaigns(
            response[2].status === "fulfilled" ? response[2].value : undefined
          );
        }
      } catch (error) {
        toast.error((error as { message: string }).message);
      } finally {
        setLoading(false);
      }
    };

    getTotalAmount();
  }, [userId]);

  useEffect(() => {
    const getApprovedCampaigns = async () => {
      setLoading(true);
      const campaigns = await fetchApprovedCampaigns();
      setApprovedCampaigns(campaigns);
      setLoading(false);
    };

    getApprovedCampaigns();
  }, []);

  return (
    <main className="w-full py-10">
      <div className="w-full">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start gap-x-2">
            <h3 className="font-bold text-[24px] text-black">Dashboard</h3>
            <p className="text-[16px] text-black">
              Get an overview of your account!
            </p>
          </div>
        </div>

        <div className="pt-[24px] w-full flex lg:flex-row flex-col  items-center gap-6">
          <OverviewCards title="Total Donations" amount={totalAmount} />
          <OverviewCards title="Total Donors" number={totalDonors} />
          <OverviewCards title="Total Campaigns" number={totalCampaigns} />
        </div>
      </div>

      <div className="w-full pt-[24px] gap-5 flex items-center justify-center">
        <div className="w-full h-full border border-[#D9D9D9] p-6 rounded-md">
          <div className="flex items-center justify-between">
            <p className="text-black font-bold text-base">On-going Campaigns</p>
            <div className="bg-Light-50 flex items-center justify-center rounded-full h-[24px] w-[24px] text-normal-500 text-sm">
              {approvedCampaigns.length}
            </div>
          </div>

          <div className="pt-8">
            {loading ? (
              <p>Loading campaigns...</p>
            ) : (
              approvedCampaigns.map((campaign) => (
                <div
                  key={campaign._id}
                  className="flex flex-col gap-y-1 border-b py-2 border-[#D0D5DD]"
                >
                  <p className="font-bold text-base text-black">
                    {campaign.title}
                  </p>
                  <p className="text-[#777777] text-sm">
                    {campaign.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Overview;
