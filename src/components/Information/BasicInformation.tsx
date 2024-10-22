import React from "react";
import Arrow from "../../assets/arrow icon.svg";
import { useFormContext } from "react-hook-form";
import Input from "../Inputs";

interface BasicInformationProps {
  onNext: () => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ onNext }) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();
  const handleNext = async () => {
    const isValid = await trigger(["title", "country", "city", "category"]);
    if (isValid) onNext();
  };

  return (
    <div className="lg:w-[60%]  gap-y-6 flex flex-col">
      <div className="flex flex-col gap-y-1">
        <Input
          label="Campaign Title"
          {...register("title")}
          id="campaign-title"
          placeholder="Enter Campaign Title"
          type="text"
          autoComplete="on"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{`${errors.title.message}`}</span>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <Input
          label="Campaign Country"
          {...register("country")}
          placeholder="Enter Country"
          type="text"
          id="country"
          autoComplete="on"
        />
        {errors.country && (
          <span className="text-red-500 text-sm">{`${errors.country.message}`}</span>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <Input
          label="Campaign City"
          {...register("city")}
          placeholder="Enter City"
          type="text"
          id="country"
          autoComplete="on"
        />
        {errors.city && (
          <span className="text-red-500 text-sm">{`${errors.city.message}`}</span>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <Input
          label="Campaign Category"
          id="category"
          {...register("category")}
          placeholder="Select option"
          type="select"
          options={[
            "Education",
            "Health",
            "Career",
            "Community Development",
            "other",
          ]}
          autoComplete="on"
        />
        {errors.category && (
          <span className="text-red-500">
            {errors.category?.message as string}
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

export default BasicInformation;
