import React, { useState } from "react";
import CampaignInput from "../CampaignInput";
import Arrow from "../../assets/arrow icon.svg";

interface BasicInformationProps {
  onNext: () => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ onNext }) => {
  const [campaignTitle, setCampaignTitle] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="lg:w-[70%]">
      <CampaignInput
        label="Campaign Title"
        placeholder="Enter Campaign Title"
        value={campaignTitle}
        onChange={(e) => setCampaignTitle(e.target.value)}
      />
      <CampaignInput
        label="Country"
        placeholder="Enter Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <CampaignInput
        label="City"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <div className="mt-8 justify-end flex">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-md flex items-center"
          onClick={onNext}
        >
          Next
          <img src={Arrow} alt="Next Arrow" className="ml-2 hover:text-[#28A745]" />
        </button>
      </div>
    </div>
  );
};

export default BasicInformation;
