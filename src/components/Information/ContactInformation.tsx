import Arrow from "../../assets/arrow icon.svg";

const ContactInformation = () => {
  return (
    <div>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter Your Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Email Address</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Enter Your Email Address"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Phone Number</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Enter your phone number"
          />
        </div>
      </form>
      <div className="flex gap-7">
        <a
          href=""
          className="rounded-lg bg-[#28A745] py-2 px-16 text-[#FFFFFF] border-2 border-[#28A745] hover:bg-[#FFFFFF] hover:text-[#28A745] hover:border-[#28A745]"
        >
          Preview
        </a>
        <div className="flex gap-3 rounded-lg bg-[#28A745] py-2 px-14 text-[#FFFFFF] border-2 border-[#28A745] hover:bg-[#FFFFFF] hover:text-[#28A745] hover:border-[#28A745]">
          <a href="" className="">
            Submit
          </a>
          <img src={Arrow} alt="" className="hover:text-[#28A745]" />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
