import Footer from "../../components/Footer";
import NavBar from "../../components/Nav";
import HeroSection from "./heroSection";
import Spotlight from "./Spotlight";



const Dashboard = () => {
  return (
    <>
      <div className="flex ">
        <div className="overflow-x-auto min-h-screen w-full bg-[#F8FAFC] ">
          <NavBar />
          <HeroSection />
          <Spotlight />
          <Footer />
        </div>
       
      </div>
    </>
  );
};

export default Dashboard;
