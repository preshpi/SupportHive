import { Link } from "react-router-dom";
import Logo from "../assets/Frame 1618868431.svg";

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
          <img src={Logo} alt="Logo" />
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
          <Link to="/">How it works</Link>
          <Link to="/">Browse Campaigns</Link>
          <Link to="/signup">
            <button className="w-fit text-white bg-[#28A745] p-3 rounded-[10px]">
              Start a Campaign
            </button>
          </Link>
        </div>
      </div>

      <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col gap-5 items-center py-5">
          <Link to="/" onClick={toggleMenu}>
            How it works
          </Link>
          <Link to="/" onClick={toggleMenu}>
            Browse Campaigns
          </Link>
          <button
            className="w-fit text-white bg-[#28A745] p-3 rounded-[10px]"
            onClick={toggleMenu}
          >
            Start a Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
