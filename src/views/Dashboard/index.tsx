import Footer from "../../components/Footer";
import NavBar from "../../components/Nav";
import HeroSection from "./heroSection";
import Spotlight from "./Spotlight";
import How from './How'
import Mobilize from "./Mobilize";


const Dashboard = () => {
  return (
    <>
      <div className="flex ">
        <div className="overflow-x-auto min-h-screen w-full bg-[#F8FAFC] ">
          <NavBar />
          <HeroSection />
          <How />
          <Spotlight />
          <Mobilize />
          <Footer />
        </div>
       
      </div>
    </>
  );
};

export default Dashboard;
