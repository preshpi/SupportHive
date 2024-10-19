import Charity from "../../assets/charity (2).svg";
import Community from "../../assets/community (2).svg";
import Academic from "../../assets/academic.svg";
import Disaster from "../../assets/disaster.svg";
import Legal from "../../assets/legal.svg";
import Medical from "../../assets/medical.svg";

const Mobilize = () => {
  const data = [
    {
      img: Charity,
      title: "Charity",
    },
    {
      img: Community,
      title: "Community",
    },
    {
      img: Academic,
      title: "Academic",
    },
    {
      img: Disaster,
      title: "Disaster",
    },
    {
      img: Legal,
      title: "Legal",
    },
    {
      img: Medical,
      title: "Medical",
    },
  ];
  return (
    <div className="px-5 lg:px-10">
      <h1 className="font-extrabold text-4xl">
        Mobilize <span className="text-[#28A745]">Resources</span> for
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center gap-10 p-3 mt-[48px]">
        {data.map((item, index) => (
          <div
            key={index}
            className="group transform transition-transform duration-300 hover:scale-105 shadow rounded-lg hover:shadow-lg"
          >
            <img src={item.img} alt={item.title} className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mobilize;
