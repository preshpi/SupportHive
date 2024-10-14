import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <>
      <div className="flex ">
        <div className="overflow-x-auto min-h-screen w-full bg-[#F8FAFC]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
