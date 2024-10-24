import { Link } from "react-router-dom";

import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-30">
      <div className="flex justify-between items-center mx-auto container px-10 py-5">
        <div>
          <img src="/Logo.svg" alt="Logo" />
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex gap-5 items-center">
          <a href="#howItWorks">How it works</a>
          <a href="#browseCampaigns">Browse Campaigns</a>
          <Link to="/login">
            <button className="w-fit text-white bg-[#28A745] p-3 rounded-[10px]">
              Create account
            </button>
          </Link>
        </div>
      </div>

      <div
        className={`lg:hidden absolute w-full bg-white ${isOpen ? "block" : "hidden"}`}
      >
        <div className="flex flex-col gap-5 items-center py-5">
          <a href="#howItWorks"> How it works</a>
          <a href="#browseCampaigns"> Browse Campaigns</a>
          <Link to="/login">
            <button className="w-fit text-white bg-[#28A745] p-3 rounded-[10px]">
              Create account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
