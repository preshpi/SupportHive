import People from "../../assets/people icon.svg";
import Fund from "../../assets/fund icon.svg";
import Message from "../../assets/message icon.svg";

const How = () => {
  const data = [
    {
      img: Message,
      title: "Get started",
      description:
        "SupportHive helps you along the way, so you can focus on making great things",
    },
    {
      img: People,
      title: "Create your campaign",
      description:
        "Tell your story, set your goal, and download our app to get started",
    },
    {
      img: Fund,
      title: "Receive funding",
      description:
        "Share your campaign and get funded by your friends and family",
    },
  ];
  return (
    <section id="howItWorks" className="px-5 lg:px-10  lg:mt-[100px] mt-[80px]">
      <h1 className="font-extrabold text-5xl mb-9">
        How it <span className="text-[#28A745]">works</span>
      </h1>

      <div className="justify-center  items-center gap-[50px] grid lg:grid-cols-3 md:grid-cols-2 ">
        {data.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border-[#28A745] bg-Light-50 border shadow  text-[#000000] px-3 py-4 group transform transition-transform duration-300 cursor-pointer hover:scale-105 hover:shadow-lg"
          >
            <img src={item.img} alt="icon" className="mb-3" />
            <h1 className="text-black font-extrabold text-2xl mb-3">
              {item.title}{" "}
            </h1>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default How;
