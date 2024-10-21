import { useState } from "react";
import Arrow from "../../assets/arrow icon.svg";
import CampaignInput from "../CampaignInput";

interface ContactInformationProps {
  hideForm: () => void; // Add hideForm as a prop
}

const ContactInformation: React.FC<ContactInformationProps> = ({ hideForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  function submitHandler() {
    alert("Campaign successfully created!");
    hideForm(); // Call hideForm after the alert
  }

  return (
    <div className="lg:w-[70%]">
      <form>
        <div className="mb-4">
          <CampaignInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
          />
        </div>

        <div className="mb-4">
          <CampaignInput
            label="Email Address"
            placeholder="Enter Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <CampaignInput
            label="Phone Number"
            placeholder="Enter your phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
      </form>

      <div className="flex gap-7">
        <a
          href="#"
          className="rounded-lg bg-[#28A745] py-2 px-16 text-[#FFFFFF] border-2 border-[#28A745] hover:bg-[#FFFFFF] hover:text-[#28A745] hover:border-[#28A745]"
        >
          Preview
        </a>

        <button
          type="button"
          onClick={submitHandler}
          className="flex items-center gap-3 rounded-lg bg-[#28A745] py-2 px-14 text-[#FFFFFF] border-2 border-[#28A745] hover:bg-[#FFFFFF] hover:text-[#28A745] hover:border-[#28A745]"
        >
          <span>Submit</span>
          <img src={Arrow} alt="Arrow" className="hover:text-[#28A745]" />
        </button>
      </div>
    </div>
  );
};

export default ContactInformation;
