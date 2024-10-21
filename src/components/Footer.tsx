import FooterLogo from "../assets/Frame 1000003275.svg";
import FacebookIcon from "../icons/Facebookicon";
import InstagramIcon from "../icons/InstagramIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import Twittericon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";

const Footer = () => {
  return (
    <div className="bg-[#013B0F] flex flex-col gap-10 w-full  mt-[50px] justify-center items-center h-[270px]">
      <div className="border-t border-[#98A2B3] w-full"></div>
      <div>
        <img src={FooterLogo} alt="" />
      </div>
      <div className="flex gap-10 lg:flex-row flex-col">
        <div className="flex gap-3 justify-center">
          <Twittericon />
          <LinkedinIcon />
          <InstagramIcon />
          <FacebookIcon />
          <YoutubeIcon />
        </div>
        <div>
          <p className="text-[#98A2B3] text-[14px]">
            @ 2024 supporthive.All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
