import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { Outlet, useNavigate } from "react-router-dom";
import { AppProvider } from "../../context/sidebar.context";
import { useEffect } from "react";
import { auth } from "../../firebase";
import { Toaster } from "sonner";

const Dashboardlayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (user && !user.emailVerified) {
      navigate("/email-verification");
    }
  }, [navigate]);
  return (
    <AppProvider>
      <main className="w-full h-screen flex">
        <Sidebar />
        <div className="flex flex-col h-full w-full">
          <Topbar />
          <div className={`w-full h-full px-8 overflow-y-scroll`}>
            <Outlet />
          </div>
        </div>
      </main>
      <Toaster position="top-right" richColors />
    </AppProvider>
  );
};

export default Dashboardlayout;
