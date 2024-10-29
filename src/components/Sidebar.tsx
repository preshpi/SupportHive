import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useAppContext } from "../context/sidebar.context";
import { CiLogout, CiUser } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { logoutUser } from "../redux/slices/user.slice";
import { useAppDispatch } from "../hook/redux.hook";
import { auth } from "../firebase";
import { toast } from "sonner";
import { TbArrowsTransferUp, TbLayoutDashboardFilled } from "react-icons/tb";
import { IconType } from "react-icons/lib";
import { MdCampaign } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import React from "react";
import { VscFeedback } from "react-icons/vsc";

type TLinks = {
  name: string;
  path: string;
  icon: IconType;
};
const Sidebar = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useAppContext();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const links: TLinks[] = [
    {
      name: "Dashboard",
      path: "/dashboard/overview",
      icon: TbLayoutDashboardFilled,
    },
    {
      name: "Campaigns",
      path: "/dashboard/campaigns",
      icon: MdCampaign,
    },
    {
      name: "Transactions",
      path: "/dashboard/transactions",
      icon: TbArrowsTransferUp,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: IoMdSettings,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: CiUser,
    },
  ];

  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);

      // Clear localStorage or cookie if necessary
      localStorage.removeItem("authToken");

      // Dispatch logout action to reset the Redux state
      dispatch(logoutUser());

      // Redirect user to home page
      navigate("/");
      toast.success("Successfully signed out.");
    } catch (error) {
      toast.error((error as { message: string }).message);
    }
  };

  return (
    <>
      {isSideBarOpen && (
        <aside className="h-full lg:w-[300px] w-[264px] absolute lg:sticky overflow-hidden  bg-Dark-700 z-20 top-0">
          <div className="px-6 py-10 flex flex-col items-center justify-between h-full">
            <div>
              <div className="flex items-center justify-between w-full gap-x-4">
                <Link to="/dashboard/overview">
                  <img src="/Logo3.svg" alt="Logo" />
                </Link>
                <button
                  onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                  className="text-white text-3xl"
                >
                  <IoClose />
                </button>
              </div>

              <ul className="flex gap-y-2 flex-col pt-10">
                {links.map(({ name, path, icon }, index) => (
                  <NavLink
                    key={index}
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-white text-normal-300 rounded-lg border border-Light-200 items-center flex flex-row px-4 py-3 cursor-pointer  hover:bg-white hover:text-normal-300 transition-all justify-start"
                        : " px-4 py-3 text-white flex items-center flex-row  justify-start"
                    }
                  >
                    <li className="flex items-center gap-x-2">
                      {React.createElement(icon)}
                      {name}
                    </li>
                  </NavLink>
                ))}
              </ul>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-x-3 justify- w-full font-bold text-white text-base"
            >
              <CiLogout className="text-base text-white" />
              Log out
            </button>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
