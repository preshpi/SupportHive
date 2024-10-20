import Footer from "../../components/Footer";
import NavBar from "../../components/Nav";
import Spotlight from "../LandingPage/Spotlight";




const Dashboard = () => {
  return (
    <>
      <div className="flex ">
        <div className="overflow-x-auto min-h-screen w-full bg-[#F8FAFC] ">
          <NavBar />
          <Spotlight />
          <Footer />
        </div>
       
      </div>
    </>
  );
};

export default Dashboard;
