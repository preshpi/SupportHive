import React from "react";
import Arrow from "../../assets/arrow icon.svg";
import { useFormContext } from "react-hook-form";
import Input from "../Inputs";

interface CampaignInformationProps {
  onNext: () => void;
}

const CampaignInformation: React.FC<CampaignInformationProps> = ({
  onNext,
}) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();
  const handleNext = async () => {
    const isValid = await trigger([
      "description",
      "goalAmount",
      "startDate",
      "endDate",
      "raiseMoneyFor",
      "importance",
      "impact",
      "images",
      "bank",
    ]);
    if (isValid) onNext();
  };

  return (
    <div className="lg:w-[60%] gap-y-6 flex flex-col pb-10">
      <div className="flex flex-col gap-y-1">
        <Input
          label="Campaign Description"
          {...register("description")}
          id="campaign-description"
          placeholder="Enter Campaign Description"
          type="text"
          autoComplete="on"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">{`${errors.description.message}`}</span>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <Input
          label="Campaign Goal Amount"
          {...register("goalAmount")}
          id="campaign-goalAmount"
          placeholder="Enter Goal Amount"
          type="text"
          autoComplete="on"
        />
        {errors.goalAmount && (
          <span className="text-red-500 text-sm">{`${errors.goalAmount.message}`}</span>
        )}
      </div>

      <div className="flex lg:flex-row flex-col justify-between lg:gap-10">
        <div className="flex flex-col gap-y-1 w-full">
          <Input
            label="Campaign Goal startDate"
            {...register("startDate")}
            id="campaign-startDate"
            placeholder="DD/MM/YY"
            type="date"
            autoComplete="on"
          />
          {errors.startDate && (
            <span className="text-red-500 text-sm">{`${errors.startDate.message}`}</span>
          )}
        </div>
        <div className="flex flex-col gap-y-1 w-full">
          <Input
            label="Campaign Goal end Date"
            {...register("endDate")}
            id="campaign-endDate"
            placeholder="DD/MM/YY"
            type="date"
            autoComplete="on"
          />
          {errors.endDate && (
            <span className="text-red-500 text-sm">{`${errors.endDate.message}`}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-1 w-full">
        <label
          htmlFor=""
          className="text-left font-light capitalize text-black text-[14px]"
        >
          What do you want to raise money for?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          id="campaign-raiseMoney"
          {...register("raiseMoneyFor")}
          className="w-full outline-none focus:ring-1 ring-black rounded-md border border-gray-100 bg-transparent px-4 py-4 text-[14px] font-light"
        ></textarea>

        {errors.raiseMoneyFor && (
          <span className="text-red-500 text-sm">{`${errors.raiseMoneyFor.message}`}</span>
        )}
      </div>
      <div className="flex flex-col gap-y-1 w-full">
        <label
          className="text-left font-light capitalize text-black text-[14px]"
          htmlFor=""
        >
          Why is this campaign important to you?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          className="w-full outline-none focus:ring-1 ring-black rounded-md border border-gray-100 bg-transparent px-4 py-4 text-[14px] font-light"
          id="campaign-important"
          {...register("importance")}
        ></textarea>
        {errors.importance && (
          <span className="text-red-500 text-sm">{`${errors.importance.message}`}</span>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <label
          htmlFor=""
          className="text-left font-light capitalize text-black text-[14px]"
        >
          What impact will this campaign have?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          className="w-full outline-none focus:ring-1 ring-black rounded-md border border-gray-100 bg-transparent px-4 py-4 text-[14px] font-light"
          id="campaign-impact"
          {...register("impact")}
        ></textarea>

        {errors.impact && (
          <span className="text-red-500 text-sm">{`${errors.impact.message}`}</span>
        )}
      </div>
      <div className="mt-4">
        <Input
          label=" Have Images related to your Campaign?"
          type="file"
          id="campaign-images"
          autoComplete="on"
          accept="image/*"
          {...register("images")}
          multiple
        />
        {errors.images && (
          <span className="text-red-500">
            {errors.images?.message?.toString()}
          </span>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-black font-bold mb-2">
          Supporting documents
        </label>

        <input
          type="file"
          accept=".pdf, .doc, .docx, .ppt, .pptx"
          {...register("supportingDocuments")}
          multiple
        />
        {errors.supportingDocuments && (
          <span className="text-red-500">
            {errors.supportingDocuments?.message?.toString()}
          </span>
        )}
      </div>

      <div className="mt-8 justify-end flex">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-md flex items-center"
          onClick={handleNext}
        >
          Next
          <img src={Arrow} alt="arrow" className="ml-2 hover:text-[#28A745]" />
        </button>
      </div>
    </div>
  );
};

export default CampaignInformation;
