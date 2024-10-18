export const OverviewCards = ({
  title,
  amount,
}: {
  title: string;
  amount: string;
}) => {
  return (
    <div className="flex flex-col w-full border border-[#EEEEEE] bg-[#FAFAFA] rounded-lg p-4 gap-y-[27px]">
      <h3 className="text-[#777777] text-[16px] ">{title}</h3>
      <p className="text-[24px] font-bold">{amount}</p>
    </div>
  );
};

const Overview = () => {
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

          {/* <div className="bg-[red] w-24 h-8 rounded-md"></div> */}
        </div>
        <div className="pt-[24px] w-full flex lg:flex-row flex-col  items-center gap-6">
          <OverviewCards title="Total Donations" amount="N100,000.00" />
          <OverviewCards title="Total Donors" amount="3" />
          <OverviewCards title="Total Donations" amount="30" />
        </div>
      </div>
      <div className="w-full pt-[24px] gap-5 flex items-center justify-center">
        {/* <div className="bg-[pink] w-2/3 h-full"></div> */}
        <div className="w-full h-full border border-[#D9D9D9] p-6 rounded-md">
          <div className="flex items-center justify-between">
            <p className="text-black font-bold text-base">On-going Campaigns</p>
            <div className="bg-Light-50 flex items-center justify-center rounded-full h-[24px] w-[24px] text-normal-500 text-sm">
              5
            </div>
          </div>

          <div className="pt-8">
            <div className="flex flex-col gap-y-1 border-b py-2 border-[#D0D5DD]">
              <p className="font-bold text-base text-black">Lagos bank</p>
              <p className="text-[#777777] text-sm">
                Donation to fund for non-governm...
              </p>
            </div>

            <div className="flex flex-col gap-y-1 border-b py-2 border-[#D0D5DD]">
              <p className="font-bold text-base text-black">Lagos bank</p>
              <p className="text-[#777777] text-sm">
                Donation to fund for non-governm...
              </p>
            </div>

            <div className="flex flex-col gap-y-1 border-b py-2 border-[#D0D5DD]">
              <p className="font-bold text-base text-black">Lagos bank</p>
              <p className="text-[#777777] text-sm">
                Donation to fund for non-governm...
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Overview;
