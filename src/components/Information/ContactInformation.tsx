import { useState } from "react";
import Arrow from "../../assets/arrow icon.svg";
import CampaignInput from "../CampaignInput";

const ContactInformation: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] =useState("")

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
          href=""
          className="rounded-lg bg-[#28A745] py-2 px-16 text-[#FFFFFF] border-2 border-[#28A745] hover:bg-[#FFFFFF] hover:text-[#28A745] hover:border-[#28A745]"
        >
          Preview
        </a>
        <div className="flex gap-3 rounded-lg bg-[#28A745] py-2 px-14 text-[#FFFFFF] border-2 border-[#28A745] hover:bg-[#FFFFFF] hover:text-[#28A745] hover:border-[#28A745]">
          <a href="" className="">
            Submit
          </a>
          <img src={Arrow} alt="" className="hover:text-[#28A745]" />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
