import { Link, NavLink } from "react-router-dom";
import category from "../assets/icons/Category.svg";
import chart from "../assets/icons/Chart.svg";
import wallet from "../assets/icons/Wallet.svg";
import settings from "../assets/icons/Setting.svg";
import { IoClose } from "react-icons/io5";
import { useAppContext } from "../context/sidebar";

type TLinks = {
  name: string;
  path: string;
  icon: string;
};
const Sidebar = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useAppContext();

  const links: TLinks[] = [
    {
      name: "Dashboard",
      path: "/dashboard/overview",
      icon: category,
    },
    {
      name: "Campaigns",
      path: "/dashboard/campaigns",
      icon: chart,
    },
    {
      name: "Transactions",
      path: "/dashboard/transactions",
      icon: wallet,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: settings,
    },
  ];

  return (
    <>
      {isSideBarOpen && (
        <aside className="h-full absolute lg:sticky w-[264px] bg-Dark-700 z-20 top-0">
          <div className="px-6 py-10">
            <div className="flex items-center justify-between">
              <h1 className="text-white font-bold text-[20px] logo">
                <Link to="/dashboard">SupportHive</Link>
              </h1>
              <button
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                className="text-white text-3xl"
              >
                <IoClose />
              </button>
            </div>

            <ul className="flex gap-y-2 flex-col pt-10">
              {links.map(({ name, path, icon }) => (
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white text-normal-300 rounded-lg border border-Light-200 items-center flex flex-row px-4 py-3 cursor-pointer  hover:bg-white hover:text-normal-300 hover:rounded-xl transition-all justify-center xl:justify-start"
                      : " px-4 py-3 text-white"
                  }
                >
                  <li className="flex items-center gap-x-2">
                    <img src={icon} alt={"g"} className="mr-4" />
                    {name}
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
