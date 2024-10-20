import { Link, NavLink, useNavigate } from "react-router-dom";
import category from "../assets/icons/Category.svg";
import chart from "../assets/icons/Chart.svg";
import wallet from "../assets/icons/Wallet.svg";
import settings from "../assets/icons/Setting.svg";
import { IoClose } from "react-icons/io5";
import { useAppContext } from "../context/sidebar.context";
import { CiLogout } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { logoutUser } from "../redux/slices/user.slice";
import { useAppDispatch } from "../hook/redux.hook";
import { auth } from "../firebase";
import { toast } from "sonner";

type TLinks = {
  name: string;
  path: string;
  icon: string;
};
const Sidebar = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useAppContext();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const links: TLinks[] = [
    {
      name: "Dashboard",
      path: "/dashboard",
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
        <aside className="h-full w-[284px]  bg-Dark-700 z-20 top-0">
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

            <button
              onClick={handleLogout}
              className="flex items-center gap-x-3 justify-center text-white text-base mt-[120px] w-full"
            >
              <CiLogout />
              Log out
            </button>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
