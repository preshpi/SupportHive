import { MdMail } from "react-icons/md";

const Contact = () => {
  return (
    <div className="px-6 lg:px-20 w-full lg:mt-[100px] mt-[80px]">
      <div className="bg-[#EAF6EC] py-20 lg:p-[100px] rounded-xl flex flex-col items-center justify-center">
        <p className="text-normal-300 font-semibold text-base">Contact </p>
        <p className="font-bold lg:text-[32px] text-[28px] pt-2">
          Get in Touch With Us
        </p>
        <p className="lg:text-[24px] md:text-[20px] text-[18px] px-5  font-medium text-center pt-6">
          3rd Floor, Nova Building, Off Awolowo Road, Ikoyi, Lagos.
        </p>
        <div className="flex items-center justify-center pt-3 gap-3 lg:text-[24px] md:text-[20px] text-[18px] font-light text-center">
          <MdMail className="text-normal-300" />
          <a href="mailto:ijeomaegwuenu22@gmail.com">support@supporthive.com</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
