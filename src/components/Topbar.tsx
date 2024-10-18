import { useAppContext } from "../context/sidebar";
import { FiMenu } from "react-icons/fi";

const Topbar = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useAppContext();

  return (
    <div className="py-4 px-8 border-b border-[#E0E2E5]">
      <div
        className={`flex items-center w-full ${
          isSideBarOpen ? "justify-end" : "justify-between"
        } `}
      >
        {!isSideBarOpen && (
          <button
            className="bg-normal-300 text-white p-2 rounded-md"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          >
            <FiMenu />
          </button>
        )}
        <div className="flex items-center gap-x-8">
          {/* <div className="bg-[#F9FAFB] p-3 rounded-full">
            <VscBellDot className="text-[#667085]" />
          </div> */}
          <div className="flex gap-x-3 items-center">
            <p className="text-[#101828] text-[16px] font-semibold">
              Ruth Ezeneche
            </p>
            <div className="bg-Dark-600 text-white w-[40px] h-[40px] flex items-center justify-center rounded-full">
              <p>RE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
