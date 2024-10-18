import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { Outlet } from "react-router-dom";
import { AppProvider } from "../../context/sidebar";

const Dashboardlayout = () => {
  return (
    <AppProvider>
      <main className="w-full h-screen flex">
        <Sidebar />
        <div className="flex flex-col h-full w-full">
          <Topbar />
          <div className={`w-full h-full px-8`}>
            <Outlet />
          </div>
        </div>
      </main>
    </AppProvider>
  );
};

export default Dashboardlayout;
