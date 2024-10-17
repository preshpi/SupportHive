import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Frame 1618868431.svg";
import { Button } from "./Button";
import { FaBars, FaTimes } from "react-icons/fa"; 

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
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
          <Link to="/">Login/SignUp</Link>
          <Button className="w-fit text-white bg-[#28A745]">Start a Campaign</Button>
        </div>
      </div>

      
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col gap-5 items-center py-5">
          <Link to="/" onClick={toggleMenu}>How it works</Link>
          <Link to="/" onClick={toggleMenu}>Browse Campaigns</Link>
          <Link to="/" onClick={toggleMenu}>Login/SignUp</Link>
          <Button className="w-fit text-white bg-[#28A745]" onClick={toggleMenu}>
            Start a Campaign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
