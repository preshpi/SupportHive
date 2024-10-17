import Footer from "../../components/Footer";
import NavBar from "../../components/Nav";



const Dashboard = () => {
  return (
    <>
      <div className="flex ">
        <div className="overflow-x-auto min-h-screen w-full bg-[#F8FAFC] ">
          <NavBar />
          <Footer />
        </div>
       
      </div>
    </>
  );
};

export default Dashboard;
