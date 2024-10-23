import { useAppContext } from "../context/sidebar.context";
import { FiMenu } from "react-icons/fi";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { getInitials } from "../utils/userInitials";
import { Link, useNavigate } from "react-router-dom";

const Topbar = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useAppContext();
  const userDetails = useSelector((state: RootState) => state.user); // Get user details from Redux store

  const { firstname, lastname } = userDetails.userDetails;
  const initials = getInitials(firstname, lastname); // Get initials

  const navigate = useNavigate();
  const handleGOBack = () => {
    navigate(-1);
  };
  return (
    <div className="py-4 px-8 border-b border-[#E0E2E5]">
      <div className="flex items-center w-full justify-between ">
        <div className="flex items-center gap-x-3">
          {!isSideBarOpen && (
            <button
              className="bg-normal-300 text-white p-2 rounded-md"
              onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            >
              <FiMenu />
            </button>
          )}
          <button onClick={handleGOBack} className="text-base fontmedium">
            {" "}
            Go back
          </button>
        </div>

        <Link to="/dashboard/settings">
          <div className="flex items-center gap-x-8">
            {/* <div className="bg-[#F9FAFB] p-3 rounded-full">
            <VscBellDot className="text-[#667085]" />
          </div> */}
            <div className="flex gap-x-3 items-center">
              <p className="text-[#101828] text-[16px] font-semibold">
                {firstname} {lastname}
              </p>
              <div className="bg-Dark-600 text-white w-[40px] h-[40px] flex items-center justify-center rounded-full">
                <p>{initials}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
