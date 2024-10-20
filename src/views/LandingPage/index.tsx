import Footer from "../../components/Footer";
import NavBar from "../../components/Nav";
import Contact from "./contact";
import HeroSection from "./HeroSection";
import How from "./How";
import Mobilize from "./Mobilize";
import Spotlight from "./Spotlight";

const LandingPage = () => {
  return (
    <div className="flex ">
      <div className="overflow-x-auto min-h-screen w-full bg-[#F8FAFC] ">
        <NavBar />
        <HeroSection />
        <How />
        <Spotlight />
        <Mobilize />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
